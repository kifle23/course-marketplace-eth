import { Course, OwnedCourse } from "@content/courses/types";
import Web3 from "web3";

export const COURSE_STATES: { [key: number]: string } = {
  0: "purchased",
  1: "activated",
  2: "deactivated",
};

export const normalizeOwnedCourse =
  (web3: Web3) => (course: Course, ownedCourse: OwnedCourse) => {
    return {
      ...course,
      ownedCourseId: ownedCourse.id,
      proof: ownedCourse.proof,
      owner: ownedCourse.owner,
      price: web3.utils.fromWei(ownedCourse.price, "ether"),
      state: COURSE_STATES[ownedCourse.state],
    };
  };
