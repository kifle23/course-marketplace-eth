import Web3 from "web3";
import { accountHandler as createUseAccount } from "./useAccount";
interface setupHooksProps {
  web3: Web3 | null;
}

export const SetupHooks = ({ web3 }: setupHooksProps) => {
  return {
    useAccount: createUseAccount({ web3 }),
  };
};
