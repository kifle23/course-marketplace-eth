"use client";
import { Breadcrumbs } from "@components/ui/common";
import { EthRates, WalletBar } from "@components/ui/web3";
import { withToast } from "@utils/toast";

interface TransactionData {
  transactionHash: string;
}

export default function Header() {
  const notify = () => {
    const resolveAfter3Sec = new Promise<TransactionData>((resolve) =>
      setTimeout(
        () =>
          resolve({
            transactionHash:
              "0x1696db3e901e72a9f44079e8c9506a659b7ad34e0679c928b3d1b2ac7a8db79b",
          }),
        3000
      )
    );
    withToast(resolveAfter3Sec);
  };

  const LINKS = [
    {
      href: "/marketplace",
      value: "Buy",
    },
    {
      href: "/marketplace/courses/owned",
      value: "My Courses",
    },
    {
      href: "/marketplace/courses/managed",
      value: "Manage Courses",
      requireAdmin: true,
    },
  ];

  return (
    <>
      <div className="pt-4">
        <WalletBar />
      </div>
      <EthRates />
      <div className="flex flex-row-reverse p-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={LINKS} />
      </div>
      <button onClick={notify}>Notify !</button>
    </>
  );
}

