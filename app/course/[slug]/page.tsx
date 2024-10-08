import { NotFound } from "@components/ui/common";
import {
  Curriculum,
  CourseHero,
  KeyPoints,
  CourseMessage,
} from "@components/ui/course";
import { getAllCourses, getCourseBySlug } from "@content/courses/fetcher";

interface CoursePageProps {
  params: {
    slug: string;
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const course = getCourseBySlug(params.slug) || undefined;

  if (!course) {
    return <NotFound />;
  }

  return (
    <div className="relative max-w-7xl mx-auto px-4">
      <div className="py-4">
        <CourseHero course={course} />
      </div>
      <KeyPoints points={course.wsl} />
      <CourseMessage course={course} />
      <Curriculum course={course} />
    </div>
  );
}

export async function generateStaticParams() {
  const { data } = getAllCourses();
  return data.map((course) => ({
    slug: course.slug,
  }));
}

