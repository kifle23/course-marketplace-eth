import { Hero } from "@components/common";
import { CourseList } from "@components/course";
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
