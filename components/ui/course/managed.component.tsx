"use client";
import { useAdmin, useManagedCourses } from "@components/hooks/web3";
import { CourseFilter, ManagedCourseCard } from "@components/ui/course";
import { Button, Message } from "@components/ui/common";
import { useState } from "react";
import { useWeb3 } from "@components/providers";
import VerificationInput from "@components/ui/course/verification-input.component";
import { Course } from "@content/courses/types";
import { normalizeOwnedCourse } from "@utils/normalize";

export default function ManageWrapper() {
  const { web3, contract } = useWeb3();
  const account = useAdmin({ redirectTo: "/marketplace" });
  const { managedCourses } = useManagedCourses(account);
  const [proofedOwnership, setProofedOwnership] = useState<{
    [key: string]: boolean;
  }>({});
  const [searchedCourse, setSearchedCourse] = useState<Course | null>(null);
  type ContractMethod = "activateCourse" | "deactivateCourse";

  function verifyCourse(
    email: string,
    arg1: { hash: string | undefined; proof: string | undefined }
  ) {
    const { hash, proof } = arg1;
    const emailHash = web3?.utils.sha3(email);
    const proofToVerify = web3?.utils.soliditySha3(
      { t: "bytes32", v: emailHash },
      { t: "bytes32", v: hash }
    );

    proofToVerify === proof
      ? setProofedOwnership({
          ...proofedOwnership,
          [hash?.toString() ?? ""]: true,
        })
      : setProofedOwnership({
          ...proofedOwnership,
          [hash?.toString() ?? ""]: false,
        });
  }

  const searchCourse = async (courseHash: string | undefined) => {
    const re = /[0-9A-Fa-f]{6}/g;

    if (courseHash && courseHash.length === 66 && re.test(courseHash)) {
      const course = await contract.methods.getCourseByHash(courseHash).call();

      if (course.owner !== "0x0000000000000000000000000000000000000000") {
        const normalized = web3
          ? normalizeOwnedCourse(web3)(courseHash as any, course)
          : null;
        setSearchedCourse(normalized);
        return;
      }
    }

    setSearchedCourse(null);
  };

  const changeCourseState = async (
    courseHash: string,
    method: ContractMethod
  ): Promise<any> => {
    if (!account.data || !courseHash) {
      return;
    }

    try {
      const result = await contract.methods[method](courseHash).send({
        from: account.data,
      });

      return result;
    } catch (e: any) {
      throw new Error(e.message);
    }
  };

  const activateCourse = async ({
    courseHash,
  }: {
    courseHash: string | undefined;
  }) => {
    changeCourseState(courseHash ?? "", "activateCourse");
  };

  const deactivateCourse = async ({
    courseHash,
  }: {
    courseHash: string | undefined;
  }) => {
    changeCourseState(courseHash ?? "", "deactivateCourse");
  };

  if (!account.isAdmin) return null;

  return (
    <>
      <CourseFilter onSearchSubmit={searchCourse} />
      <section className="grid grid-cols-1">
        {managedCourses.data?.map((course: Course, index: number) => (
          <ManagedCourseCard
            key={`${index}-${course.ownedCourseId}`}
            course={course}
          >
            <div className="bg-white px-4 py-5 sm:px-6">
              <VerificationInput
                onVerify={(email) => {
                  verifyCourse(email, {
                    hash: course.hash,
                    proof: course.proof,
                  });
                }}
              />
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
              {course.state === "purchased" && (
                <div className="mt-2">
                  <Button
                    onClick={() => activateCourse({ courseHash: course.hash })}
                    variant="green"
                  >
                    Activate
                  </Button>
                  <Button
                    onClick={() =>
                      deactivateCourse({ courseHash: course.hash })
                    }
                    variant="red"
                  >
                    Deactivate
                  </Button>
                </div>
              )}
            </div>
          </ManagedCourseCard>
        ))}
      </section>
    </>
  );
}

