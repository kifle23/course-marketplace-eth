"use client";
import Image from "next/image";
import { Course } from "@content/courses/types";
import Link from "next/link";
import { Button } from "@components/ui/common";
import { useState } from "react";
import { useWalletInfo } from "@components/hooks/web3";
import { OrderModal } from "@components/ui/order";
import { useWeb3 } from "@components/providers";

interface CardProps {
  course: Course;
  useCustomCard?: boolean;
}

interface Order {
  price: string;
  email: string;
  confirmationEmail: string;
}

export default function Card({ course, useCustomCard }: CardProps) {
  const { web3, contract } = useWeb3();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const { canPurchase, account } = useWalletInfo();

  const convertCourseIdToBytes16 = (courseId: number, web3: any): string => {
    const hexString = web3.utils.toHex(courseId);
    const paddedHex = web3.utils.padLeft(hexString, 32);
    return paddedHex;
  };

  const purchaseCourse = async (order: Order) => {
    if (!selectedCourse || !web3 || !contract) {
      console.error("Selected course, web3 instance, or contract not found.");
      return;
    }

    const courseId = selectedCourse.id;

    const retryPurchase = async (retries: number): Promise<void> => {
      if (retries === 0) {
        console.error("Failed to purchase course after multiple attempts.");
        return;
      }

      try {
        const courseIdBytes = convertCourseIdToBytes16(Number(courseId), web3);
        const orderHash = web3.utils.soliditySha3(
          { type: "bytes16", value: courseIdBytes },
          { type: "address", value: account.data }
        );
        const emailHash = web3.utils.sha3(order.email);
        const proof = web3.utils.soliditySha3(
          { type: "bytes32", value: emailHash },
          { type: "bytes32", value: orderHash }
        );

        await contract.methods.purchaseCourse(courseIdBytes, proof).send({
          from: account.data,
          value: web3.utils.toWei(order.price, "ether"),
        });

        console.log("Course purchased successfully");
      } catch (error) {
        console.clear();
        console.error(
          `Error purchasing course, retries left: ${retries - 1}`,
          error
        );
        await retryPurchase(retries - 1);
      }
    };

    await retryPurchase(3);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="flex flex-col md:flex-row h-full">
        <div className="relative w-full h-48 md:w-[50%] md:h-auto">
          <Image
            className={`object-cover w-full h-full ${
              !canPurchase && "filter grayscale"
            }`}
            src={course.coverImage}
            alt={course.title}
            priority
            layout="fill"
          />
        </div>
        <div className="p-8 pb-4 flex flex-col justify-between w-full md:w-[50%]">
          <div>
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {course.type}
            </div>
            <Link
              href={`/course/${course.slug}`}
              className="block mt-1 text-sm xs:text-lg leading-tight font-medium text-black hover:underline"
            >
              {course.title}
            </Link>
            <p className="mt-2 text-sm xs:text-base text-gray-500">
              {course.description.substring(0, 70)}...
            </p>
          </div>
          {useCustomCard && (
            <div className="mt-4">
              <Button
                variant="light"
                disabled={!canPurchase}
                onClick={() => setSelectedCourse(course)}
              >
                Purchase
              </Button>
            </div>
          )}
          <OrderModal
            course={selectedCourse}
            onSubmit={purchaseCourse}
            onClose={() => setSelectedCourse(null)}
          />
        </div>
      </div>
    </div>
  );
}

