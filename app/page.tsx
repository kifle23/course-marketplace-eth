import { Breadcrumbs, Hero } from "@components/common";
import { EthRates, WalletBar } from "@components/web3";
import { CourseList } from "@components/course";
import { OrderCard } from "@components/order";

export default function Home() {
  return (
    <div className="fit">
      <Hero />
      <Breadcrumbs />
      <WalletBar />
      <EthRates />
      <OrderCard />
      <CourseList />
    </div>
  );
}

