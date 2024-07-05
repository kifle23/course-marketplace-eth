import { Breadcrumbs, Hero } from "@components/common";
import { EthRates, WalletBar } from "@components/web3";
import { CourseList } from "@components/course";
import { Card } from "@components/order";

export default function Home() {
  return (
    <>
      <Hero />
      <Breadcrumbs />
      <WalletBar />
      <EthRates />
      <Card />
      <CourseList />
    </>
  );
}

