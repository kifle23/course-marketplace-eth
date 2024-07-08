import { use, useEffect, useState } from "react";
import Web3 from "web3";

interface UseAccountProps {
  web3: Web3 | null;
}

interface Account {
  account: string;
}

export const AccountHandler = ({ web3 }: UseAccountProps) => {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    if (web3) {
      web3.eth.getAccounts().then((accounts) => {
        setAccount(accounts[0]);
      });
    }
  }, [web3]);

  const getAccount = (): Account => {
    return { account: account || "" };
  };

  return getAccount;
};
