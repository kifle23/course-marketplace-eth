"use client";
import { createContext, useContext } from "react";

interface WebThreeProps {
  children: React.ReactNode;
}

interface Web3ContextProps {
  test: string;
}

const Web3Context = createContext<Web3ContextProps | undefined>(undefined);

export default function Web3Provider({ children }: WebThreeProps) {
  const value: Web3ContextProps = {
    test: "Hello",
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

export const useWeb3 = (): Web3ContextProps => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};

