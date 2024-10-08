import { OwnedCourseCard } from "@components/ui/course";
import { MarketHeader } from "@components/ui/marketplace";

export default function OwnedCourses() {
  return (
    <>
      <MarketHeader />
      <section className="grid grid-cols-1">
        <OwnedCourseCard></OwnedCourseCard>
      </section>
    </>
  );
}

