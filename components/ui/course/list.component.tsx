import { Course } from "@content/courses/types";
import { CourseCard } from "@components/ui/course";
interface CourseListProps {
  courses: Course[];
  useCustomCard?: boolean;
}

const CourseCardComponent = ({
  course,
  useCustomCard,
}: {
  course: Course;
  useCustomCard: boolean;
}) => {
  const CardComponent = useCustomCard ? CourseCard : CourseCard;
  return <CardComponent key={course.id} course={course} />;
};

export default function List({
  courses,
  useCustomCard = false,
}: CourseListProps) {
  return (
    <section className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
      {courses.map((course) => (
        <CourseCardComponent
          key={course.id}
          course={course}
          useCustomCard={useCustomCard}
        />
      ))}
    </section>
  );
}

