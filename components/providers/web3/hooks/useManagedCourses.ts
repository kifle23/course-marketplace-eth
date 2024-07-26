import { Course } from "@content/courses/types";
import useSWR from "swr";
import Web3 from "web3";

interface UseManagedCoursesProps {
  web3: Web3 | null;
  contract: any;
  courses: Course[];
  account: string;
}

const fetchManagedCourses = async (web3: Web3, contract: any) => {
  const ManagedCourses = [1, 2, 3, 4];
  return ManagedCourses;
};

export const ManagedCoursesHandler = ({
  web3,
  contract,
  courses,
  account,
}: UseManagedCoursesProps) => {
  const shouldFetch = web3 && contract && account;

  const swrRes = useSWR(
    shouldFetch ? `web3/managedCourses/${account}` : null,
    () => fetchManagedCourses(web3!, contract)
  );

  return swrRes;
};
