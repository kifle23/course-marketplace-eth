import { CourseList } from "@components/ui/course";
import { WalletBar } from "@components/ui/web3";
import { getAllCourses } from "@content/courses/fetcher";
import { useNetwork } from "@components/hooks/web3/useNetwork";

export default function Marketplace() {
  const { data: courses } = getAllCourses();
  return (
    <>
      <div className="py-4">
        <WalletBar />
      </div>
      <CourseList courses={courses} />
    </>
  );
}

