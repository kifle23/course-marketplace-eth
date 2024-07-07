"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

interface Web3State {
  web3: Web3 | null;
  provider: any;
  contract: any;
  isLoading: boolean;
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
}: Partial<Web3State>): Web3State => {
  return {
    web3: web3 || null,
    provider: provider || null,
    contract: contract || null,
    isLoading: isLoading || false,
  };
};

export default function Web3Provider({ children }: Web3ProviderProps) {
  const [web3Api, setWeb3Api] = useState<Web3State>(
    createWeb3State({
      web3: null,
      provider: null,
      contract: null,
      isLoading: true,
    })
  );

  useEffect(() => {
    const loadProvider = async () => {
      const provider = (await detectEthereumProvider()) as any;
      if (provider) {
        const web3 = new Web3(provider);

        setWeb3Api(
          createWeb3State({
            web3,
            provider,
            contract: null,
            isLoading: false,
          })
        );
      } else {
        setWeb3Api((api) => ({ ...api, isLoading: false }));
        console.error("Please, install Metamask.");
      }
    };

    loadProvider();
  }, []);

  return (
    <Web3Context.Provider value={web3Api}>{children}</Web3Context.Provider>
  );
}

export const useWeb3 = (): Web3State => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};

