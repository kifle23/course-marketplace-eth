import Web3 from "web3";

interface UseOwnedCoursesProps {
    web3: Web3 | null;
    contract: any;
  }
  
export const OwnedCoursesHandler = ({
    web3,
    contract,
  }: UseOwnedCoursesProps)=>() => {
    
    return "useOwnedCourses is working!";
    };

