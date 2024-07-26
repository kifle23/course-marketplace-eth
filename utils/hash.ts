import Web3 from "web3";

type CreateCourseHashFunction = (
  courseId: number,
  account: string
) => string | undefined;

export const createCourseHash = (web3: Web3): CreateCourseHashFunction => {
  return (courseId: number, account: string): string | undefined => {
    const hexCourseId = web3.utils.toHex(courseId);
    const courseIdBytes = web3.utils.padLeft(hexCourseId, 32);
    const courseHash = web3.utils.soliditySha3(
      { type: "bytes16", value: courseIdBytes },
      { type: "address", value: account }
    );

    return courseHash;
  };
};
