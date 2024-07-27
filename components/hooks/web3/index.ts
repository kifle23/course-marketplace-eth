import { useWeb3 } from "@components/providers";
import { useWeb3Hooks } from "@components/providers/web3.component";
import { Course } from "@content/courses/types";
import { Account, Network } from "@interfaces/iWalletInfo";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface UseAdminProps {
  redirectTo: string;
}

export const useAccount = (): Account => {
  const swrRes = enhanceHook(useWeb3Hooks((hooks) => hooks.useAccount));
  return swrRes;
};

export const useAdmin = ({ redirectTo }: UseAdminProps) => {
  const account = useAccount();
  const { requireInstall } = useWeb3();
  const router = useRouter();

  useEffect(() => {
    if (
      requireInstall ||
      (account.isInitialized && !account.isAdmin) ||
      account.isEmpty
    ) {
      router.push(redirectTo);
    }
  }, [account, requireInstall, router, redirectTo]);

  return account;
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

export const useManagedCourses = (account: Account) => {
  const swrRes = enhanceHook(
    useWeb3Hooks((hooks) => hooks.useManagedCourses)(account)
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
