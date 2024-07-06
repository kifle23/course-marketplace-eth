import { Modal, NotFound } from "@components/common";
import { Curriculum, CourseHero, KeyPoints } from "@components/course";
import { getAllCourses, getCourseBySlug } from "@content/courses/fetcher";
import { Course } from "@content/courses/types";

interface CoursePageProps {
  params: {
    slug: string;
  };
  course?: Course;
}

export default async function CoursePage({ params, course }: CoursePageProps) {
  course = getCourseBySlug(params.slug) || undefined;

  if (!course) {
    return <NotFound />;
  }

  return (
    <div className="relative max-w-7xl mx-auto px-4">
      <div className="py-4">
        <CourseHero
          title={course.title}
          description={course.description}
          image={course.coverImage}
        />
      </div>
      <KeyPoints />
      <Curriculum />
      <Modal />
    </div>
  );
}

export async function generateStaticParams() {
  const { data } = getAllCourses();
  return data.map((course) => ({
    slug: course.slug,
  }));
}

