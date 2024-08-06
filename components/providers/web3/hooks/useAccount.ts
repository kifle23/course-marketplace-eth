import { useEffect } from "react";
import Web3 from "web3";
import useSWR from "swr";
import { Account } from "@interfaces/iWalletInfo";

interface UseAccountProps {
  web3: Web3 | null;
  provider: any;
}

const adminAddresses: { [key: string]: boolean } =
  process.env.NODE_ENV === "production"
    ? { [process.env.NEXT_PUBLIC_ADMIN_ADDRESS_PROD as string]: true }
    : {
        [process.env.NEXT_PUBLIC_ADMIN_ADDRESS_DEV as string]: true,
      };

export const AccountHandler = ({
  web3,
  provider,
}: UseAccountProps): Account => {
  const { data, mutate, ...rest } = useSWR(
    () => (web3 ? "web3/accounts" : null),
    async () => {
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        console.log("account: ", account);
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

    const handleAccountsChanged = (accounts: string[]) => {
      mutate(accounts[0] ?? null);
      window.location.reload();
    };

    provider.on("accountsChanged", handleAccountsChanged);

    return () =>
      provider.removeListener("accountsChanged", handleAccountsChanged);
  }, [provider, mutate]);
  
  return {
    data: data ?? "",
    isAdmin: !!(data && web3 && adminAddresses[data]),
    mutate,
    ...rest,
  };
};
