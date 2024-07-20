import { useWeb3Hooks } from "@components/providers/web3.component";

interface Account {
  account: {
    data: string;
    isAdmin: boolean;
    mutate: () => void;
    isInitialized: boolean;
  };
}

interface Network {
  network: {
    data: string;
    target: string;
    isSupported: boolean;
    isInitialized: boolean;
  };
}

export const useAccount = (): Account => {
  const swrRes = enhanceHook(useWeb3Hooks((hooks) => hooks.useAccount));
  return { account: swrRes };
};

export const useNetwork = (): Network => {
  const swrRes = enhanceHook(useWeb3Hooks((hooks) => hooks.useNetwork));
  return { network: swrRes };
};

export const useWalletInfo = () => {
  const { account } = useAccount();
  const { network } = useNetwork();

  return {
    account,
    network,
    canPurchase: !!(account.data && network.isSupported),
  };
};

export const useOwnedCourses = () => {
  const swrRes = useWeb3Hooks((hooks) => hooks.useOwnedCourses)();
  return { ownedCourses: { data: swrRes } };
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
