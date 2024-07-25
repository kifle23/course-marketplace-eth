"use client";
import { useAccount, useOwnedCourses } from "@components/hooks/web3";
import { getAllCourses } from "@content/courses/fetcher";
import { CourseMap } from "@content/courses/types";
import Image from "next/image";

interface OwnedCourseCardProps {
  children: React.ReactNode;
}

const STATE_COLORS = {
  purchased: "indigo",
  activated: "green",
  deactivated: "red",
};

export default function OwnedCourseCard({ children }: OwnedCourseCardProps) {
  const { data: courses } = getAllCourses();
  const { account } = useAccount();
  const { ownedCourses } = useOwnedCourses(courses, account.data);

  return (
    <>
      {ownedCourses.data?.map((course: CourseMap) => {
        const stateColor =
          STATE_COLORS[course.state as keyof typeof STATE_COLORS];
        return (
          <div
            key={course.id}
            className="bg-white border shadow overflow-hidden sm:rounded-lg mb-3"
          >
            <div className="block sm:flex">
              <div className="flex-1 h-72 sm:h-auto relative">
                <Image
                  className="object-cover"
                  src={course.coverImage}
                  layout="fill"
                  alt={course.title}
                />
              </div>
              <div className="flex-4">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    <span className="mr-2">{course.title}</span>
                    <span
                      className={`text-xs text-[${stateColor}-700] bg-[${stateColor}-200] rounded-full p-2`}
                    >
                      {course.state}
                    </span>
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {course.price} ETH
                  </p>
                </div>

                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Course ID
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {course.ownedCourseId}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Proof
                      </dt>
                      <dd className="mt-1 text-sm break-words text-gray-900 sm:mt-0 sm:col-span-2">
                        {course.proof}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:px-6">{children}</div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

