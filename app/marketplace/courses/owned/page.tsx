import { Button } from "@components/ui/common";
import { OwnedCourseCard } from "@components/ui/course";
import { MarketHeader } from "@components/ui/marketplace";

export default function OwnedCourses() {
  return (
    <>
      <div className="py-4">
        <MarketHeader />
      </div>
      <section className="grid grid-cols-1">
        <OwnedCourseCard>
          <Button>Watch the course</Button>
        </OwnedCourseCard>
      </section>
    </>
  );
}

