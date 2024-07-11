import { Course } from "@content/courses/types";
import { CourseCard } from "@components/ui/course";
interface CourseListProps {
  courses: Course[];
  useCustomCard?: boolean;
}

export default function List({
  courses,
  useCustomCard,
}: CourseListProps) {
  return (
    <section className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          useCustomCard={useCustomCard}
        />
      ))}
    </section>
  );
}

