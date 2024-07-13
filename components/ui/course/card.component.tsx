"use client";
import Image from "next/image";
import { Course } from "@content/courses/types";
import Link from "next/link";
import { Button } from "@components/ui/common";
import { OrderModal } from "@components/ui/order";
import { useState } from "react";
import { useAccount, useNetwork } from "@components/hooks/web3";

interface CardProps {
  course: Course;
  useCustomCard?: boolean;
}

export default function Card({ course, useCustomCard }: CardProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const { account } = useAccount();
  const { network } = useNetwork();

  const canPurchase = !!(account.data && network.isSupported);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="flex flex-col md:flex-row h-full">
        <div className="flex-1 relative w-full md:w-[50%] h-auto md:h-full">
          <Image
            className={`object-cover h-full w-full ${
              !canPurchase && "filter grayscale"
            }`}
            src={course.coverImage}
            alt={course.title}
            priority
            layout="fill"
          />
        </div>
        <div className="flex-2 p-8 pb-4 flex flex-col justify-between">
          <div>
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {course.type}
            </div>
            <Link
              href={`/course/${course.slug}`}
              className="h-12 block mt-1 text-lg leading-tight font-medium text-black hover:underline"
            >
              {course.title}
            </Link>
            <p className="mt-2 text-gray-500">
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
            onClose={() => setSelectedCourse(null)}
          />
        </div>
      </div>
    </div>
  );
}

