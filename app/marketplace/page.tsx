import { CourseList } from "@components/ui/course";
import { OrderModal } from "@components/ui/order";
import { WalletBar } from "@components/ui/web3";
import { getAllCourses } from "@content/courses/fetcher";

export default function Marketplace() {
  const { data: courses } = getAllCourses();

  return (
    <>
      <div className="py-4">
        <WalletBar />
      </div>
      <CourseList courses={courses} useCustomCard={true} />
      <OrderModal />
    </>
  );
}

