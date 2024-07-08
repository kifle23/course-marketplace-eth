import Web3 from "web3";
import { AccountHandler as createUseAccount } from "./useAccount";
interface setupHooksProps {
  web3: Web3 | null;
  provider: any;
}

export const SetupHooks = ({ ...deps }: setupHooksProps) => {
  return {
    useAccount: createUseAccount({ ...deps}),
  };
};
