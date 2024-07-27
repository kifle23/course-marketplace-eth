import { useWeb3Hooks } from "@components/providers/web3.component";
import { Course } from "@content/courses/types";
import { Account, Network } from "@interfaces/iWalletInfo";

export const useAccount = (): Account => {
  const swrRes = enhanceHook(useWeb3Hooks((hooks) => hooks.useAccount));
  return swrRes;
};

export const useNetwork = (): Network => {
  const swrRes = enhanceHook(useWeb3Hooks((hooks) => hooks.useNetwork));
  return swrRes;
};

export const useWalletInfo = () => {
  const account = useAccount();
  const network = useNetwork();

  return {
    account,
    network,
    canPurchase: !!(account.data && network.isSupported),
  };
};

export const useOwnedCourses = (courses: Course[], account: string) => {
  const swrRes = enhanceHook(
    useWeb3Hooks((hooks) => hooks.useOwnedCourses)(courses, account)
  );
  return { ownedCourses: swrRes };
};

export const useOwnedCourse = (course: Course, account: string) => {
  const swrRes = enhanceHook(
    useWeb3Hooks((hooks) => hooks.useOwnedCourse)(course, account)
  );
  return { ownedCourse: swrRes };
};

export const useManagedCourses = (courses: Course[], account: Account) => {
  const swrRes = enhanceHook(
    useWeb3Hooks((hooks) => hooks.useManagedCourses)(courses, account)
  );
  return { managedCourses: swrRes };
};

type Data = null | string | any[] | object;

const _isEmpty = (data: Data): boolean => {
  return (
    data == null ||
    data === "" ||
    (Array.isArray(data) && data.length === 0) ||
    (data.constructor === Object && Object.keys(data).length === 0)
  );
};

const enhanceHook = (swrRes: any) => {
  const { data, error } = swrRes;
  const isInitialized = !!(data || error);
  const isEmpty = isInitialized && _isEmpty(data);

  return {
    ...swrRes,
    isEmpty,
    isInitialized,
  };
};
