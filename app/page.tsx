import { Hero } from "@components/ui/common";
import { CourseList } from "@components/ui/course";
import { getAllCourses } from "@content/courses/fetcher";

export default function Home() {
  const { data: courses } = getAllCourses();
  return (
    <>
      <Hero />
      <CourseList courses={courses} />
    </>
  );
}

