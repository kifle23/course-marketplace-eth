import { MarketHeader } from "@components/ui/marketplace";
import { CourseFilter, OwnedCourseCard } from "@components/ui/course";

export default function ManageCourses() {
  return (
    <>
      <MarketHeader />
      <CourseFilter />
      <section className="grid grid-cols-1">
        <OwnedCourseCard managed={true}></OwnedCourseCard>
      </section>
    </>
  );
}

