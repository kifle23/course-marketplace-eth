import Web3 from "web3";
import { useAccount } from "./useAccount";

const DEFAULT_HOOKS = {
  useAccount: () => ({ account: null }),
};

interface setupHooksProps {
  web3: Web3 | null;
}

export const SetupHooks = ({ web3 }: setupHooksProps) => {
  const accountHook = useAccount({ web3 });

  if (!web3) {
    return DEFAULT_HOOKS;
  }

  return {
    useAccount: accountHook,
  };
};
