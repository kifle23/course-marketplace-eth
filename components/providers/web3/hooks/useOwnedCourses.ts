import { Course } from "@content/courses/types";
import { normalizeOwnedCourse } from "@utils/normalize";
import useSWR from "swr";
import Web3 from "web3";

interface UseOwnedCoursesProps {
  web3: Web3 | null;
  contract: any;
  courses: Course[];
  account: string;
}

const fetchOwnedCourses = async (
  web3: Web3,
  contract: any,
  account: string,
  courses: Course[]
) => {
  const ownedCourses = [];
  for (const course of courses) {
    const hexCourseId = web3.utils.toHex(course.id);
    const courseIdBytes = web3.utils.padLeft(hexCourseId, 32);
    const courseHash = web3.utils.soliditySha3(
      { type: "bytes16", value: courseIdBytes },
      { type: "address", value: account }
    );
    const ownedCourse = await contract.methods
      .getCourseByHash(courseHash)
      .call();
    if (ownedCourse.owner !== "0x0000000000000000000000000000000000000000") {
      const normalized = normalizeOwnedCourse(web3)(course, ownedCourse);
      ownedCourses.push(normalized);
    }
  }
  return ownedCourses;
};

export const OwnedCoursesHandler = ({
  web3,
  contract,
  courses,
  account,
}: UseOwnedCoursesProps) => {
  const shouldFetch = web3 && contract && account;

  const swrRes = useSWR(
    shouldFetch ? `web3/ownedCourses/${account}` : null,
    () => fetchOwnedCourses(web3!, contract, account, courses)
  );

  return swrRes;
};
