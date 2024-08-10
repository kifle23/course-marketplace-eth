"use client";
import Image from "next/image";
import { Course } from "@content/courses/types";
import Link from "next/link";
import { Button, Loader } from "@components/ui/common";
import { useEffect, useState } from "react";
import { useOwnedCourse, useWalletInfo } from "@components/hooks/web3";
import { OrderModal } from "@components/ui/order";
import { useWeb3 } from "@components/providers";
import { AnimateKeyframes } from "react-simple-animate";
import { withToast } from "@utils/toast";

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
  purchased: { text: "text-indigo-500", bg: "bg-yellow-200" },
  activated: { text: "text-green-500", bg: "bg-green-200" },
  deactivated: { text: "text-red-500", bg: "bg-red-200" },
};

export default function Card({ course, displayPurchase }: CardProps) {
  const { web3, contract, requireInstall } = useWeb3();
  const { hasConnectedWallet, isConnecting, account, network } =
    useWalletInfo();
  const { ownedCourse } = useOwnedCourse(course, account.data);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isNewPurchase, setIsNewPurchase] = useState(true);
  const [isPurchased, setIsPurchased] = useState(false);
  const [stateColor, setStateColor] = useState<{ text: string; bg: string }>();

  const hasOwner = !!ownedCourse?.data;

  useEffect(() => {
    if (hasOwner && isPurchased) {
      setStateColor(STATE_COLORS.purchased);
    } else if (ownedCourse?.data) {
      setStateColor(
        STATE_COLORS[ownedCourse.data.state as keyof typeof STATE_COLORS]
      );
    }
  }, [hasOwner, isPurchased, ownedCourse?.data]);

  const convertCourseIdToBytes16 = (courseId: number, web3: any): string => {
    const hexString = web3.utils.toHex(courseId);
    const paddedHex = web3.utils.padLeft(hexString, 32);
    return paddedHex;
  };

  const purchaseCourse = async (order: Order) => {
    if (!selectedCourse || !web3 || !contract) {
      return withToast(
        Promise.reject(
          new Error("Selected course, web3 instance, or contract not found.")
        )
      );
    }
    
    const courseIdBytes = convertCourseIdToBytes16(Number(selectedCourse.id), web3);
    const orderHash =
      web3.utils.soliditySha3(
        { type: "bytes16", value: courseIdBytes },
        { type: "address", value: account.data }
      ) || "";
    const value = web3.utils.toWei(order.price, "ether") || "";

    try {
      const toastPromise = isNewPurchase
        ? _purchaseCourse(courseIdBytes, order, orderHash, value, web3)
        : _repurchaseCourse(orderHash, value);

      withToast(toastPromise.then(() => setIsPurchased(true)));
    } catch {
      setIsPurchased(false);
    }
  };

  const _purchaseCourse = async (
    courseIdBytes: string,
    order: Order,
    orderHash: string,
    value: string,
    web3: any
  ) => {
    const emailHash = web3.utils.sha3(order.email);
    const proof = web3.utils.soliditySha3(
      { type: "bytes32", value: emailHash },
      { type: "bytes32", value: orderHash }
    );

    return contract.methods.purchaseCourse(courseIdBytes, proof).send({
      from: account.data,
      value,
    });
  };

  const _repurchaseCourse = (orderHash: any, value: any) =>
    contract.methods.repurchaseCourse(orderHash).send({
      from: account.data,
      value,
    });

  const renderButton = () => {
    if (requireInstall) {
      return (
        <Button variant="light" disabled size="sm">
          Install
        </Button>
      );
    }

    if (isConnecting) {
      return (
        <Button variant="light" disabled size="sm">
          <Loader size="sm" />
        </Button>
      );
    }

    if (!displayPurchase) return null;

    if ((network.isSupported && hasOwner) || isPurchased) {
      return (
        <div className="flex">
          <Button variant="white" hoverable={false} className="mr-2" size="sm">
            Yours &#10004;
          </Button>
          {!isPurchased &&
            ownedCourse?.data.state === "deactivated" &&
            !isPurchased && (
              <Button
                variant="primary"
                onClick={() => {
                  setIsNewPurchase(false);
                  setSelectedCourse(course);
                }}
                size="sm"
              >
                Reactivate
              </Button>
            )}
        </div>
      );
    }

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
  };

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
                    {ownedCourse.data.state === "purchased" || isPurchased ? (
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
            isNewPurchase={isNewPurchase}
            onClose={() => {
              setSelectedCourse(null);
              setIsNewPurchase(true);
            }}
          />
        </div>
      </div>
    </div>
  );
}

