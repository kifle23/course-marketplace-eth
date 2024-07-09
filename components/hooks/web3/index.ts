import { useWeb3Hooks } from "@components/providers/web3.component";

interface Account {
  account: {
    data: string;
    isAdmin: boolean;
    mutate: () => void;
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
