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
    ? {
        "0xb4b6f6a4fb37c47420237bb39a98f6579a86bf44b05182018f4fdbf5d2116170":
          true,
      }
    : {
        "0x9ec9defa6a6986c63d380f2dd4f2c24892fa86fdef7d9a27a1cac7767480c051":
          true,
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
    isAdmin: !!(data && web3 && adminAddresses[web3.utils.keccak256(data)]),
    mutate,
    ...rest,
  };
};
