import { Course } from "@content/courses/types";
import { normalizeOwnedCourse } from "@utils/normalize";
import useSWR from "swr";
import Web3 from "web3";

interface UseManagedCoursesProps {
  web3: Web3 | null;
  contract: any;
  courses: Course[];
  account: string;
}

const fetchManagedCourses = async (
  web3: Web3,
  contract: any,
  courses: Course[]
) => {
  const managedCourses = [];
  const courseCount = await contract.methods.getCourseCount().call();
  for (let i = Number(courseCount) - 1; i >= 0; i--) {
    const courseHash = await contract.methods.getCourseHashAtIndex(i).call();
    const ownedCourse = await contract.methods
      .getCourseByHash(courseHash)
      .call();

    if (ownedCourse) {
      const normalized = normalizeOwnedCourse(web3)(
        {
          hash: courseHash,
        } as Course,
        ownedCourse
      );
      managedCourses.push(normalized);
    }
  }
  return managedCourses;
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
    () => fetchManagedCourses(web3!, contract, courses)
  );

  return swrRes;
};
