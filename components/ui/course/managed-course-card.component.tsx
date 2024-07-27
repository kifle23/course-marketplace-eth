"use client";
import { useAccount, useManagedCourses } from "@components/hooks/web3";
import { getAllCourses } from "@content/courses/fetcher";
import { Course } from "@content/courses/types";
import { Button } from "@components/ui/common";

interface ItemProps {
  title: string;
  value: string;
  className: string;
}

function Item({ title, value, className }: ItemProps) {
  return (
    <div className={`${className} px-4 py-2 sm:px-6`}>
      <div className="text-sm font-medium text-gray-500">{title}</div>
      <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        {value}
      </div>
    </div>
  );
}

export default function ManagedCourseCard() {
  const { data: courses } = getAllCourses();
  const account = useAccount();
  const { managedCourses } = useManagedCourses(courses, account.data);

  return (
    <>
      {managedCourses.data?.map((course: Course, index: number) => {
        return (
          <div
            key={`${index}-${course.ownedCourseId}`}
            className="bg-white border shadow overflow-hidden sm:rounded-lg mb-3"
          >
            <div className="border-t border-gray-200">
              <Item
                title="Course ID"
                value={course.ownedCourseId?.toString() || ""}
                className="bg-gray-50"
              />
              <Item
                title="Proof"
                value={course.proof || ""}
                className="bg-white"
              />
              <div className="bg-white px-4 py-5 sm:px-6">
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
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

