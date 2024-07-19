"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { loadContract } from "@utils/load-contract";
import { SetupHooks } from "./web3/hooks/setupHooks";

interface Web3State {
  web3: Web3 | null;
  provider: any;
  contract: any;
  isLoading: boolean;
  connect?: () => void;
  hooks: () => ReturnType<typeof SetupHooks>;
  requireInstall: boolean;
}
interface Web3ProviderProps {
  children: ReactNode;
}

const Web3Context = createContext<Web3State | undefined>(undefined);

const createWeb3State = ({
  web3,
  provider,
  contract,
  isLoading,
  requireInstall,
}: Partial<Web3State>): Web3State => {
  return {
    web3: web3 || null,
    provider: provider || null,
    contract: contract || null,
    isLoading: isLoading ?? true,
    hooks: () => SetupHooks({ web3: web3 || null, provider: provider }),
    requireInstall: requireInstall ?? false,
  };
};

export default function Web3Provider({ children }: Web3ProviderProps) {
  const [web3Api, setWeb3Api] = useState<Web3State>(
    createWeb3State({
      web3: null,
      provider: null,
      contract: null,
      isLoading: true,
      hooks: () => SetupHooks({ web3: null, provider: null }),
      requireInstall: false,
    })
  );

  const loadProvider = async () => {
    const provider = (await detectEthereumProvider()) as any;
    if (provider) {
      const web3 = new Web3(provider);
      const contract = await loadContract("CourseMarketplace", web3);

      setWeb3Api(
        createWeb3State({
          web3,
          provider,
          contract: contract,
          isLoading: false,
          hooks: () => SetupHooks({ web3, provider }),
        })
      );
    } else {
      setWeb3Api((api) => ({
        ...api,
        isLoading: false,
      }));
      console.error("Please, install Metamask.");
    }
  };

  useEffect(() => {
    loadProvider();
  }, []);

  const _web3Api = useMemo(() => {
    const { provider, web3, isLoading } = web3Api;
    return {
      ...web3Api,
      requireInstall: !isLoading && !web3,
      connect: provider
        ? async () => {
            try {
              await provider.request({ method: "eth_requestAccounts" });
            } catch {
              location.reload();
            }
          }
        : () =>
            console.error(
              "Cannot connect to Metamask, try to reload your browser please."
            ),
    };
  }, [web3Api]);

  return (
    <Web3Context.Provider value={_web3Api}>{children}</Web3Context.Provider>
  );
}

export const useWeb3 = (): Web3State => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};

export function useWeb3Hooks<T>(
  cb: (hooks: ReturnType<typeof SetupHooks>) => T
): T {
  const { hooks } = useWeb3();
  return cb(hooks());
}

