import { Course } from "@content/courses/types";
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
  const hexCourseId = web3.utils.toHex(course.id);
  const courseIdBytes = web3.utils.padLeft(hexCourseId, 32);
  const courseHash = web3.utils.soliditySha3(
    { type: "bytes16", value: courseIdBytes },
    { type: "address", value: account }
  );
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

  const swrRes = useSWR(
    shouldFetch ? `web3/OwnedCourse/${account}` : null,
    () => fetchOwnedCourse(web3!, contract, account, course)
  );

  return swrRes;
};