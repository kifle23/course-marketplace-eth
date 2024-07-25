"use client";
import { useEthPrice, COURSE_PRICE } from "@components/hooks/useEthPrice";
import Image from "next/image";
import { Loader } from "../common";

export default function EthRates() {
  const { eth } = useEthPrice();

  return (
    <div className="flex flex-col xs:flex-row mb-5">
      <div className="md:w-1/4 flex items-stretch text-center xs:mb-2 md:mr-2 ">
        <div className="flex-1 p-10 border drop-shadow rounded-md">
          <div className="flex items-center justify-center">
            {eth.data ? (
              <>
                <Image
                  layout="fixed"
                  height="35"
                  width="35"
                  src="/small-eth.webp"
                  alt=""
                />
                <span className="text-xl font-bold ml-2">{eth.data}$</span>
              </>
            ) : (
              <div className="w-full flex justify-center">
                <Loader />
              </div>
            )}
          </div>
          <p className="text-lg text-gray-500">Current eth Price</p>
        </div>
      </div>
      <div className="md:w-1/4 flex items-stretch text-center">
        <div className="flex-1 p-10 border drop-shadow rounded-md">
          <div className="flex items-center justify-center">
            {eth.data ? (
              <>
                <span className="text-xl font-bold">{eth.perItem}</span>
                <Image
                  layout="fixed"
                  height="35"
                  width="35"
                  src="/small-eth.webp"
                  alt=""
                />
                <span className="text-xl font-bold ml-2">
                  = {COURSE_PRICE}$
                </span>
              </>
            ) : (
              <div className="w-full flex justify-center">
                <Loader />
              </div>
            )}
          </div>
          <p className="text-lg text-gray-500">Price per course</p>
        </div>
      </div>
    </div>
  );
}

