import { useEffect, useState } from "react";
import Web3 from "web3";

interface UseAccountProps {
  web3: Web3 | null;
  provider: any;
}

interface Account {
  account: string;
}

export const AccountHandler = ({ web3, provider }: UseAccountProps) => {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    if (web3) {
      web3.eth.getAccounts().then((accounts) => {
        setAccount(accounts[0]);
      });
    }
  }, [web3]);

  useEffect(() => {
    if (!provider) return;

    const handleAccountsChanged = (accounts: string[]) =>
      setAccount(accounts[0]);

    provider.on("accountsChanged", handleAccountsChanged);

    return () =>
      provider.removeListener("accountsChanged", handleAccountsChanged);
  }, [provider]);

  const getAccount = (): Account => {
    return { account: account || "" };
  };

  return getAccount;
};
