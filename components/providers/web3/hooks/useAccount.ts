import { useEffect } from "react";
import Web3 from "web3";
import useSWR from "swr";

interface UseAccountProps {
  web3: Web3 | null;
  provider: any;
}

interface Account {
  account: string;
}

export const AccountHandler = ({ web3, provider }: UseAccountProps) => {
  const { data, mutate } = useSWR(
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
    return { account: data || "" };
  };

  return getAccount;
};
