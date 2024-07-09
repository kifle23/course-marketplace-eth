import { useEffect } from "react";
import Web3 from "web3";
import useSWR from "swr";

interface UseAccountProps {
  web3: Web3 | null;
  provider: any;
}

interface Account {
  account: {
    data: string;
    isAdmin: boolean;
    mutate: () => void;
  };
}

const adminAddresses: { [key: string]: boolean } = {
  "0x9ec9defa6a6986c63d380f2dd4f2c24892fa86fdef7d9a27a1cac7767480c051": true,
  "0x9345724d971d791dc155f3b85a13c50bbd1774b604e385808470082ca55940c0": true,
};

export const AccountHandler = ({ web3, provider }: UseAccountProps) => {
  const { data, mutate, ...rest } = useSWR(
    () => (web3 ? "web3/accounts" : null),
    async () => {
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        if (!account) {
          throw new Error(
            "Cannot retrieve an account. Please refresh the browser."
          );
        }

        return account;
      }
    }
  );

  useEffect(() => {
    if (!provider) return;

    const handleAccountsChanged = (accounts: string[]) =>
      mutate(accounts[0] ?? null);

    provider.on("accountsChanged", handleAccountsChanged);

    return () =>
      provider.removeListener("accountsChanged", handleAccountsChanged);
  }, [provider, mutate]);

  const getAccount = (): Account => {
    return {
      account: {
        data: data ?? "",
        isAdmin:
          !!(data && web3 && adminAddresses[web3.utils.keccak256(data)]) ??
          false,
        mutate,
        ...rest,
      },
    };
  };

  return getAccount();
};
