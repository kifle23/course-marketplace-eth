import { Modal } from "@components/common";
import { Curriculum, CourseHero, KeyPoints } from "@components/course";

export default function Page() {
  return (
    <div className="relative max-w-7xl mx-auto px-4">
      <div className="py-4">
        <CourseHero />
      </div>
      <KeyPoints />
      <Curriculum />
      <Modal />
    </div>
  );
}

