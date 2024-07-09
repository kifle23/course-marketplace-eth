import Web3 from "web3";
import { AccountHandler as createAccountHook } from "./useAccount";
import { NetworkHandler as createNetworkHook } from "./useNetwork";
interface setupHooksProps {
  web3: Web3 | null;
  provider: any;
}

export const SetupHooks = ({ ...deps }: setupHooksProps) => {
  return {
    useAccount: createAccountHook({ ...deps}),
    useNetwork: createNetworkHook({ ...deps}),
  };
};
