import { CourseList } from "@components/ui/course";
import { MarketHeader } from "@components/ui/marketplace";
import { getAllCourses } from "@content/courses/fetcher";

export default function Marketplace() {
  const { data: courses } = getAllCourses();

  return (
    <>
      <div className="py-4">
        <MarketHeader />
      </div>
      <CourseList courses={courses} useCustomCard={true} />
    </>
  );
}

