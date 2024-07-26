"use client";
import { useAccount, useOwnedCourse } from "@components/hooks/web3";
import { Course } from "@content/courses/types";
import { Message } from "@components/ui/common";

interface CourseMessageProps {
  course: Course;
}

export default function CourseMessage({ course }: CourseMessageProps) {
  const account = useAccount();
  const { ownedCourse } = useOwnedCourse(course, account.data);
  const courseState = ownedCourse.data?.state;

  let messageContent;
  let messageType: "success" | "warning" | "danger" = "success";

  switch (courseState) {
    case "purchased":
      messageType = "warning";
      messageContent = (
        <>
          Course is purchased and waiting for activation. The process can take
          up to 24 hours.
          <i className="block font-normal">
            In case of any questions, please contact info@eincode.com
          </i>
        </>
      );
      break;
    case "activated":
      messageType = "success";
      messageContent = <>Eincode wishes you happy watching of the course.</>;
      break;
    case "deactivated":
      messageType = "danger";
      messageContent = (
        <>
          Course has been deactivated due to incorrect purchase data. The
          functionality to watch the course has been temporarily disabled.
          <i className="block font-normal">Please contact info@eincode.com</i>
        </>
      );
      break;
    default:
      return null;
  }

  return <Message type={messageType}>{messageContent}</Message>;
}

