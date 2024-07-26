"use client";
import {
  useAccount,
  useOwnedCourses,
} from "@components/hooks/web3";
import { getAllCourses } from "@content/courses/fetcher";
import { Course } from "@content/courses/types";
import Image from "next/image";
import { Button, Message } from "@components/ui/common";
import { useRouter } from "next/navigation";
import { useWeb3 } from "@components/providers";
import Link from "next/link";

interface OwnedCourseCardProps {
  managed?: boolean;
}

const STATE_COLORS = {
  purchased: "indigo",
  activated: "green",
  deactivated: "red",
};

export default function OwnedCourseCard({ managed }: OwnedCourseCardProps) {
  const { requireInstall } = useWeb3();
  const { data: courses } = getAllCourses();
  const account = useAccount();
  const { ownedCourses } = useOwnedCourses(courses, account.data);
  const router = useRouter();
  
  return (
    <>
      {ownedCourses.isEmpty && (
        <div className="w-1/3">
          <Message type="warning">
            <div>You don&apos;t own any courses</div>
            <Link href="/marketplace" className="font-normal hover:underline">
              <i>Purchase Course</i>
            </Link>
          </Message>
        </div>
      )}
      {account.isEmpty && (
        <div className="w-1/3">
          <Message type="warning">
            <div>Please connect to Metamask</div>
          </Message>
        </div>
      )}
      {requireInstall && (
        <div className="w-1/3">
          <Message type="warning">
            <div>Please install Metamask</div>
          </Message>
        </div>
      )}
      {ownedCourses.data?.map((course: Course) => {
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
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
                        {Number(course.ownedCourseId?.toString()) + 1}
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
                    <div className="bg-white px-4 py-5 sm:px-6">
                      {managed ? (
                        <div className="flex mr-2 relative rounded-md">
                          <input
                            type="text"
                            name="account"
                            id="account"
                            className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                            placeholder="0x2341ab..."
                          />
                          <Button>Verify</Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => router.push(`/course/${course.slug}`)}
                        >
                          Watch the course
                        </Button>
                      )}
                    </div>
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

