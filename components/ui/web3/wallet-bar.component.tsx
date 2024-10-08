"use client";
import { useWalletInfo } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import { Button } from "@components/ui/common";

export default function WalletBar() {
  const { account, network } = useWalletInfo();
  const { requireInstall } = useWeb3();

  return (
    <section className="text-white bg-indigo-600 rounded-lg">
      <div className="p-8">
        <h1 className="text-sm xs:text-xl break-words">
          Hello, {account.data ? account.data : "Connect to your wallet"}
        </h1>
        <h2 className="subtitle mb-5 text-sm xs:text-base">
          I hope you are having a great day!
        </h2>
        <div className="flex justify-between items-center">
          <div className="sm:flex sm:justify-center lg:justify-start">
            <Button className="mr-2 text-sm xs:text-lg p-2" variant="white">
              Learn how to purchase
            </Button>
          </div>
          <div>
            <div>
              {network.isInitialized && !network.isSupported && (
                <div className="bg-red-400 p-2 xs:p-4 rounded-sm xs:rounded-lg">
                  <div className="text-sm xs:text-lg">
                    Connected to wrong network
                  </div>
                  <div className="text-sm xs:text-lg">
                    Connect to: {` `}
                    <strong className="text-sm xs:text-2xl">
                      {network.target}
                    </strong>
                  </div>
                </div>
              )}
              {requireInstall && (
                <div className="bg-yellow-500 p-2 xs:p-4 rounded-sm xs:rounded-lg text-sm xs:text-xl">
                  Cannot connect to network. Please install Metamask.
                </div>
              )}
              {network.data && (
                <div>
                  <span className="text-sm xs:text-base">Currently on </span>
                  <strong className="text-sm xs:text-2xl">
                    {network.data}
                  </strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

