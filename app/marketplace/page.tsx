import { Breadcrumbs } from "@components/ui/common";
import { CourseList } from "@components/ui/course";
import { EthRates, WalletBar } from "@components/ui/web3";
import { getAllCourses } from "@content/courses/fetcher";

export default function Marketplace() {
  const { data: courses } = getAllCourses();

  return (
    <>
      <div className="pt-4">
        <WalletBar />
        <EthRates />
        <div className="flex flex-row-reverse p-4 sm:px-6 lg:px-8">
          <Breadcrumbs />
        </div>
      </div>
      <CourseList courses={courses} useCustomCard={true} />
    </>
  );
}

