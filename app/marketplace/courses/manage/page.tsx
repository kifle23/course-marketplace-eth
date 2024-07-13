import { MarketHeader } from "@components/ui/marketplace";
import { OwnedCourseCard } from "@components/ui/course";

export default function ManageCourses() {
  return (
    <>
      <MarketHeader />
      <section className="grid grid-cols-1">
        <OwnedCourseCard />
      </section>
    </>
  );
}

