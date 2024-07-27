import Web3 from "web3";
import { AccountHandler as createAccountHook } from "./useAccount";
import { NetworkHandler as createNetworkHook } from "./useNetwork";
import { OwnedCoursesHandler as createOwnedCoursesHook } from "./useOwnedCourses";
import { OwnedCourseHandler as createOwnedCourseHook } from "./useOwnedCourse";
import { ManagedCoursesHandler as createManagedCoursesHook } from "./useManagedCourses";
import { Course } from "@content/courses/types";
import { Account } from "@interfaces/iWalletInfo";
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
    useOwnedCourse: (course: Course, account: string) => createOwnedCourseHook({ web3, contract, course, account }),
    useManagedCourses: (courses: Course[], account: Account) => createManagedCoursesHook({ web3, contract, account }),
  };
};
