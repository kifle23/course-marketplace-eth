"use client";
import Image from "next/image";
import { Course } from "@content/courses/types";
import Link from "next/link";
import { Button, Loader } from "@components/ui/common";
import { useState } from "react";
import { useOwnedCourse, useWalletInfo } from "@components/hooks/web3";
import { OrderModal } from "@components/ui/order";
import { useWeb3 } from "@components/providers";
import { AnimateKeyframes } from "react-simple-animate";

interface CardProps {
  course: Course;
  displayPurchase?: boolean;
}

interface Order {
  price: string;
  email: string;
  confirmationEmail: string;
}

const STATE_COLORS = {
  purchased: {
    text: "text-indigo-500",
    bg: "bg-yellow-200",
  },
  activated: {
    text: "text-green-500",
    bg: "bg-green-200",
  },
  deactivated: {
    text: "text-red-500",
    bg: "bg-red-200",
  },
};

export default function Card({ course, displayPurchase }: CardProps) {
  const { web3, contract, requireInstall } = useWeb3();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const { hasConnectedWallet, isConnecting, account, network } =
    useWalletInfo();
  const { ownedCourse } = useOwnedCourse(course, account.data);
  const hasOwner = !!ownedCourse.data;

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

  const renderButton = () => {
    if (requireInstall) {
      return (
        <Button variant="light" disabled={true} size="sm">
          Install
        </Button>
      );
    }

    if (isConnecting) {
      return (
        <Button variant="light" disabled={true} size="sm">
          <Loader size="sm" />
        </Button>
      );
    }

    if (displayPurchase) {
      if (network.isSupported && hasOwner) {
        return (
          <div className="flex">
            <Button disabled={true} variant="green" className="mr-2" size="sm">
              Owned
            </Button>
            {ownedCourse.data.state === "deactivated" && (
              <Button
                variant="primary"
                onClick={() => alert("Reactivating!!!")}
                size="sm"
              >
                Reactivate
              </Button>
            )}
          </div>
        );
      } else {
        return (
          <Button
            variant="light"
            disabled={!hasConnectedWallet}
            onClick={() => setSelectedCourse(course)}
            size="sm"
          >
            Purchase
          </Button>
        );
      }
    }

    return null;
  };

  const stateColor = ownedCourse.data
    ? STATE_COLORS[ownedCourse.data.state as keyof typeof STATE_COLORS]
    : null;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="flex flex-col md:flex-row h-full">
        <div className="relative w-full h-48 md:w-[50%] md:h-auto">
          <Image
            className={`object-cover w-full h-full ${
              !hasConnectedWallet && "filter grayscale"
            }`}
            src={course.coverImage}
            alt={course.title}
            priority
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-8 pb-4 flex flex-col justify-between w-full md:w-[50%]">
          <div>
            <div className="flex items-center space-x-2">
              <span className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {course.type}
              </span>
              {network.isSupported &&
                displayPurchase &&
                hasOwner &&
                stateColor && (
                  <span
                    className={`text-xs ${stateColor.text} ${stateColor.bg} font-semibold rounded-full p-2`}
                  >
                    {ownedCourse.data.state === "purchased" ? (
                      <AnimateKeyframes
                        play
                        duration={2}
                        keyframes={["opacity: 0.2", "opacity: 1"]}
                        iterationCount="infinite"
                      >
                        pending
                      </AnimateKeyframes>
                    ) : (
                      ownedCourse.data.state
                    )}
                  </span>
                )}
            </div>
            <Link
              href={`/course/${course.slug}`}
              className="block mt-1 text-sm xs:text-base leading-tight font-medium text-black hover:underline"
            >
              {course.title}
            </Link>
            <p className="mt-2 text-sm xs:text-base text-gray-500">
              {course.description.substring(0, 70)}...
            </p>
          </div>
          <div className="mt-4">{renderButton()}</div>
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

