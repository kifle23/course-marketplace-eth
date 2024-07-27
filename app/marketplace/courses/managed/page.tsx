import { MarketHeader } from "@components/ui/marketplace";
import { CourseFilter, ManagedCourseCard } from "@components/ui/course";

export default function ManagedCourses() {
  return (
    <>
      <MarketHeader />
      <CourseFilter />
      <section className="grid grid-cols-1">
        <ManagedCourseCard></ManagedCourseCard>
      </section>
    </>
  );
}

