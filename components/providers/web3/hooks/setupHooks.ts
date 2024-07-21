import Web3 from "web3";
import { AccountHandler as createAccountHook } from "./useAccount";
import { NetworkHandler as createNetworkHook } from "./useNetwork";
import { OwnedCoursesHandler as createOwnedCoursesHook } from "./useOwnedCourses";
import { Course } from "@content/courses/types";
interface setupHooksProps {
  web3: Web3 | null;
  provider: any;
  contract: any;
}

export const SetupHooks = ({ web3, provider, contract }: setupHooksProps) => {
  return {
    useAccount: createAccountHook({ web3, provider }),
    useNetwork: createNetworkHook({ web3, provider }),
    useOwnedCourses: (courses: Course[], account: string) => createOwnedCoursesHook({ web3, contract, courses, account }),
  };
};
