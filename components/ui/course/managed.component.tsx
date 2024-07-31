"use client";
import { useAdmin, useManagedCourses } from "@components/hooks/web3";
import { CourseFilter, ManagedCourseCard } from "@components/ui/course";
import { Button, Message } from "@components/ui/common";
import { useEffect, useState } from "react";
import { useWeb3 } from "@components/providers";
import VerificationInput from "@components/ui/course/verification-input.component";
import { Course, OwnedCourse } from "@content/courses/types";
import { normalizeOwnedCourse } from "@utils/normalize";

export default function ManageWrapper() {
  const { web3, contract } = useWeb3();
  const account = useAdmin({ redirectTo: "/marketplace" });
  const { managedCourses } = useManagedCourses(account);
  const [proofedOwnership, setProofedOwnership] = useState<{
    [key: string]: boolean;
  }>({});
  const [searchedCourse, setSearchedCourse] = useState<Course | null>(null);
  const [filters, setFilters] = useState({ state: "all" });

  type ContractMethod = "activateCourse" | "deactivateCourse";

  function verifyCourse(
    email: string,
    { hash, proof }: { hash: string | undefined; proof: string | undefined }
  ) {
    if (!email) return;
    const emailHash = web3?.utils.sha3(email);
    const proofToVerify = web3?.utils.soliditySha3(
      { t: "bytes32", v: emailHash },
      { t: "bytes32", v: hash }
    );

    setProofedOwnership((prev) => ({
      ...prev,
      [hash?.toString() ?? ""]: proofToVerify === proof,
    }));
  }

  const searchCourse = async (hash: string): Promise<void> => {
    const re = /[0-9A-Fa-f]{6}/g;

    if (hash && hash.length === 66 && re.test(hash)) {
      const course: OwnedCourse = await contract.methods
        .getCourseByHash(hash)
        .call();

      if (
        course.owner !== "0x0000000000000000000000000000000000000000" &&
        web3
      ) {
        const normalized = normalizeOwnedCourse(web3)({ hash } as any, course);
        setSearchedCourse(normalized);
        return;
      }
    }

    setSearchedCourse(null);
  };

  const changeCourseState = async (
    courseHash: string,
    method: ContractMethod
  ): Promise<void> => {
    if (!account.data || !courseHash) return;

    try {
      await contract.methods[method](courseHash).send({
        from: account.data,
      });
    } catch (e: any) {
      throw new Error(e.message);
    }
  };

  const handleCourseAction = (course: Course) => {
    const courseHash = course.hash ?? "";

    return (
      <div className="bg-white px-4 py-5 sm:px-6">
        <VerificationInput
          onVerify={(email) =>
            verifyCourse(email, { hash: course.hash, proof: course.proof })
          }
        />
        {proofedOwnership[courseHash] !== undefined && (
          <div className="mt-2">
            <Message type={proofedOwnership[courseHash] ? "success" : "danger"}>
              Ownership{" "}
              {proofedOwnership[courseHash] ? "verified" : "not verified"}
            </Message>
          </div>
        )}
        {course.state === "purchased" && (
          <div className="mt-2">
            <Button
              onClick={() => changeCourseState(courseHash, "activateCourse")}
              variant="green"
            >
              Activate
            </Button>
            <Button
              onClick={() => changeCourseState(courseHash, "deactivateCourse")}
              variant="red"
            >
              Deactivate
            </Button>
          </div>
        )}
      </div>
    );
  };

  if (!account.isAdmin) return null;

  const filteredCourses = managedCourses.data
    ?.filter((course: Course) => {
      if (filters.state === "all") return true;
      return course.state === filters.state;
    })
    .map((course: Course, index: number) => (
      <ManagedCourseCard
        key={`${index}-${course.ownedCourseId}`}
        course={course}
      >
        {handleCourseAction(course)}
      </ManagedCourseCard>
    ));

  return (
    <>
      <CourseFilter
        onFilterSelect={(value) => setFilters({ state: value })}
        onSearchSubmit={searchCourse}
      />
      <section className="grid grid-cols-1">
        {searchedCourse && (
          <>
            <h1 className="text-2xl font-bold p-5">Search</h1>

            <ManagedCourseCard
              key={`searched-${searchedCourse.ownedCourseId}`}
              course={searchedCourse}
              isSearch={true}
            >
              {handleCourseAction(searchedCourse)}
            </ManagedCourseCard>
          </>
        )}
        <h1 className="text-2xl font-bold p-5">All Courses</h1>
        {filteredCourses}
        {filteredCourses?.length === 0 && (
          <Message type="warning">No courses to display</Message>
        )}
      </section>
    </>
  );
}

