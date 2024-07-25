import { Button, Message } from "@components/ui/common";
import { OwnedCourseCard } from "@components/ui/course";
import { MarketHeader } from "@components/ui/marketplace";

export default function OwnedCourses() {
  return (
    <>
      <MarketHeader />
      <section className="grid grid-cols-1">
        <OwnedCourseCard>
          <Message>Purchased</Message>
          <Button>Watch the course</Button>
        </OwnedCourseCard>
      </section>
    </>
  );
}

