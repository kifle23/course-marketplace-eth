import { Network } from "@interfaces/iWalletInfo";
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

const targetNetwork =
  NETWORKS[parseInt(process.env.NEXT_PUBLIC_TARGET_CHAIN_ID as string)];
interface UseNetworkProps {
  web3: Web3 | null;
}

const useNetworkSWR = (web3: Web3 | null) => {
  const { data, ...rest } = useSWR(
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

export const NetworkHandler = ({ web3 }: UseNetworkProps): Network => {
  const { data, ...rest } = useNetworkSWR(web3);

  return {
    data: data ?? "",
    target: targetNetwork,
    isSupported: data === targetNetwork,
    ...rest,
  };
};

