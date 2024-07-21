import { Course } from "@content/courses/types";
import useSWR from "swr";
import Web3 from "web3";

interface UseOwnedCoursesProps {
  web3: Web3 | null;
  contract: any;
  courses: Course[];
  account: string;
}

const fetchOwnedCourses = async (web3: Web3, contract: any, account: string, courses: Course[]) => {
  const ownedCourses = [];
  for (const course of courses) {
    ownedCourses.push(course.id);
  }
  return ownedCourses;
};

export const OwnedCoursesHandler = ({ web3, contract, courses, account }: UseOwnedCoursesProps) => {
  const shouldFetch = web3 && contract && account;

  const swrRes = useSWR(
    shouldFetch ? `web3/ownedCourses/${account}` : null,
    () => fetchOwnedCourses(web3!, contract, account, courses)
  );

  return swrRes;
};
