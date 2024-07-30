import { Course } from "@content/courses/types";
import { createCourseHash } from "@utils/hash";
import { normalizeOwnedCourse } from "@utils/normalize";
import useSWR from "swr";
import Web3 from "web3";

interface UseOwnedCourseProps {
  web3: Web3 | null;
  contract: any;
  course: Course;
  account: string;
}

const fetchOwnedCourse = async (
  web3: Web3,
  contract: any,
  account: string,
  course: Course
) => {
  const courseHash = createCourseHash(web3)(course.id, account);
  const ownedCourse = await contract.methods.getCourseByHash(courseHash).call();
  if (ownedCourse.owner !== "0x0000000000000000000000000000000000000000") {
    const normalized = normalizeOwnedCourse(web3)(course, ownedCourse);
    return normalized;
  }
  return null;
};

export const OwnedCourseHandler = ({
  web3,
  contract,
  course,
  account,
}: UseOwnedCourseProps) => {
  const shouldFetch = web3 && contract && account;

  const swrKey = shouldFetch
    ? `web3/OwnedCourse/${account}/${course.id}`
    : null;

  const swrRes = useSWR(swrKey, () =>
    fetchOwnedCourse(web3!, contract, account, course)
  );

  return swrRes;
};
