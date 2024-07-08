import Web3 from "web3";

interface UseAccountProps {
    web3: Web3 | null;
}

interface Account {
  account: string;
}

export const accountHandler = ({ web3 }: UseAccountProps) => {
    const getAccount = (): Account => {
        return { account: web3 ? "Test Account" : "null" };
    };

    return getAccount;
};
