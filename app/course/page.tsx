import { Modal } from "@components/common";
import { Curriculum, Hero, KeyPoints } from "@components/course";

export default function Page() {
  return (
    <div className="relative max-w-7xl mx-auto px-4">
      <Hero />
      <KeyPoints />
      <Curriculum />
      <Modal />
    </div>
  );
}

