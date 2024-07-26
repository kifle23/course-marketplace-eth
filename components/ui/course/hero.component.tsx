"use client";
import { useAccount, useOwnedCourse } from "@components/hooks/web3";
import { Course } from "@content/courses/types";
import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  course: Course;
}

export default function Hero({ course }: HeroProps) {
  const { account } = useAccount();
  const { ownedCourse } = useOwnedCourse(course, account.data);
  console.log("ownedCourse: ", ownedCourse);

  return (
    <section>
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8"></div>
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">
                    {course.title.substring(0, course.title.length / 2)}
                  </span>
                  <span className="block text-indigo-600 xl:inline">
                    {course.title.substring(course.title.length / 2)}
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  {course.description}
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      href="#"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get started
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      href="#"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                    >
                      Watch
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="relative lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:bottom-[8vh]">
          <div className="h-full w-full">
            <Image
              className="w-full h-full object-cover"
              src={course.coverImage}
              alt={course.title}
              fill
              sizes="(max-width: 640px) 100vw,
             (max-width: 768px) 100vw,
             (max-width: 1024px) 100vw,
             100vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

