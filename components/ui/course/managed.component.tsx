"use client";
import { useAdmin, useManagedCourses } from "@components/hooks/web3";
import { CourseFilter, ManagedCourseCard } from "@components/ui/course";
import { Button, Message } from "@components/ui/common";
import { useState } from "react";
import { useWeb3 } from "@components/providers";
import VerificationInput from "@components/ui/course/verification-input.component";
import { Course } from "@content/courses/types";

export default function ManageWrapper() {
  const { web3, contract } = useWeb3();
  const account = useAdmin({ redirectTo: "/marketplace" });
  const { managedCourses } = useManagedCourses(account);
  const [proofedOwnership, setProofedOwnership] = useState<{
    [key: string]: boolean;
  }>({});

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

  const activateCourse = async ({
    courseHash,
  }: {
    courseHash: string | undefined;
  }) => {
    if (!courseHash) {
      return;
    }
    try {
      await contract.methods.activateCourse(courseHash).send({
        from: account.data,
        gas: 200000,
      });
    } catch (e) {
      console.error((e as Error).message);
    }
  };

  if (!account.isAdmin) return null;

  return (
    <>
      <CourseFilter />
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
                  <Button variant="red">Deactivate</Button>
                </div>
              )}
            </div>
          </ManagedCourseCard>
        ))}
      </section>
    </>
  );
}

