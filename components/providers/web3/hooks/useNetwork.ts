import { useEffect } from "react";
import useSWR from "swr";
import Web3 from "web3";

const NETWORKS: { [key: number]: string } = {
  1: "Ethereum Main Network",
  1337: "Ganache",
  59140: "Goerli Test Network",
  59141: "Linea Seapolia Test Network",
  59144: "Linea Main Network",
  11155111: "Seapolia Test Network",
};
interface UseNetworkProps {
  web3: Web3 | null;
  provider: any;
}
interface Network {
  network: {
    data: string;
  };
}

const useNetworkSWR = (web3: Web3 | null) => {
  const { data, error, ...rest } = useSWR(
    () => (web3 ? "web3/network" : null),
    async () => {
      if (!web3) throw new Error("Web3 is not provided");
      const chainId = await web3.eth.getChainId();

      if (!chainId) {
        throw new Error("Cannot retrieve network. Please refresh the browser.");
      }

      return NETWORKS[Number(chainId)];
    }
  );

  return { data, ...rest };
};

export const NetworkHandler = ({
  web3,
  provider,
}: UseNetworkProps): Network => {
  const { data, mutate, ...rest } = useNetworkSWR(web3);

  useEffect(() => {
    if (!provider) return;

    const handleAccountsChanged = (accounts: string[]) =>
      mutate(accounts[0] ?? null);

    provider.on("accountsChanged", handleAccountsChanged);

    return () =>
      provider.removeListener("accountsChanged", handleAccountsChanged);
  }, [provider, mutate]);

  const getNetwork = (): Network => {
    return {
      network: {
        data: data ?? "",
        ...rest,
      },
    };
  };

  return getNetwork();
};
