import Image from "next/image";
import { Course } from "@content/courses/types";
import Link from "next/link";
import { Button } from "@components/ui/common";

interface CardProps {
  course: Course;
  useCustomCard?: boolean;
}

export default function Card({ course, useCustomCard }: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="flex">
        <div className="relative w-1/3 h-56">
          <Image
            className="object-cover"
            src={course.coverImage}
            alt={course.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <div className="w-2/3 p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {course.type}
          </div>
          <Link
            href={`/course/${course.slug}`}
            className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
          >
            {course.title}
          </Link>
          <p className="mt-2 text-gray-500">{course.description}</p>
          {useCustomCard && (
            <div className="mt-4">
              <Button variant="light">Purchase</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

