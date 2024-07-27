"use client";
import { useAccount, useManagedCourses } from "@components/hooks/web3";
import { getAllCourses } from "@content/courses/fetcher";
import { Course } from "@content/courses/types";
import { Button, Message } from "@components/ui/common";
import { useState } from "react";
import web3 from "web3";

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
  const [email, setEmail] = useState("");
  const [proofedOwnership, setProofedOwnership] = useState<{
    [key: string]: boolean;
  }>({});
  const { data: courses } = getAllCourses();
  const account = useAccount();
  const { managedCourses } = useManagedCourses(courses, account.data);

  function verifyCourse(
    email: string,
    arg1: { hash: string | undefined; proof: string | undefined }
  ) {
    const { hash, proof } = arg1;
    const emailHash = web3.utils.sha3(email);
    const proofToVerify = web3.utils.soliditySha3(
      { t: "bytes32", v: emailHash },
      { t: "bytes32", v: hash }
    );

    proofToVerify === proof
      ? setProofedOwnership({ [hash?.toString() ?? ""]: true })
      : setProofedOwnership({ [hash?.toString() ?? ""]: false });
  }

  return (
    <>
      {managedCourses.data?.map((course: Course, index: number) => {
        const items = [
          {
            title: "Hash",
            value: course.hash || "",
            className: "bg-white",
          },
          {
            title: "Course ID",
            value:
              (Number(course.ownedCourseId?.toString()) + 1).toString() || "",
            className: "bg-gray-50",
          },
          { title: "Proof", value: course.proof || "", className: "bg-white" },
          {
            title: "Owner",
            value: course.owner || "",
            className: "bg-gray-50",
          },
          { title: "Price", value: course.price || "", className: "bg-white" },
          {
            title: "State",
            value: course.state || "",
            className: "bg-gray-50",
          },
        ];

        return (
          <div
            key={`${index}-${course.ownedCourseId}`}
            className="bg-white border shadow overflow-hidden sm:rounded-lg mb-3"
          >
            <div className="border-t border-gray-200">
              {items.map((item, itemIndex) => (
                <Item
                  key={itemIndex}
                  title={item.title}
                  value={item.value.toString()}
                  className={item.className}
                />
              ))}
              <div className="bg-white px-4 py-5 sm:px-6">
                <div className="flex mr-2 relative rounded-md">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    name="account"
                    id="account"
                    className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0x2341ab..."
                  />
                  <Button
                    onClick={() => {
                      verifyCourse(email, {
                        hash: course.hash,
                        proof: course.proof,
                      });
                    }}
                  >
                    Verify
                  </Button>
                </div>
                {proofedOwnership[course.hash?.toString() ?? ""] && (
                  <div className="mt-2">
                    <Message>Ownership verified</Message>
                  </div>
                )}
                {proofedOwnership[course.hash?.toString() ?? ""] === false && (
                  <div className="mt-2">
                    <Message type="danger">Ownership not verified</Message>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

