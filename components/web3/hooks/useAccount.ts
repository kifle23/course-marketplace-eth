import { useWeb3Hooks } from "@components/providers/web3.component";

interface Account {
  account: string;
}

export const useAccount = (): Account => {
  return useWeb3Hooks((hooks) => hooks.useAccount());
};
