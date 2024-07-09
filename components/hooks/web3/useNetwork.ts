import { useWeb3Hooks } from "@components/providers/web3.component";

interface Network {
  network: {
    data: string;
  };
}

export const useNetwork = (): Network => {
  return useWeb3Hooks((hooks) => hooks.useNetwork);
};
