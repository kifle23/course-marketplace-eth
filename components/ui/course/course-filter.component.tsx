"use client";
import { Button } from "@components/ui/common";
import { useState } from "react";

interface CourseFilterProps {
  onSearchSubmit: (searchText: string) => void;
}

export default function CourseFilter({ onSearchSubmit }: CourseFilterProps) {
  const [searchText, setSearchTest] = useState("");
  return (
    <div className="flex flex-col md:flex-row items-center my-4">
      <div className="flex mb-4 md:mb-0 md:mr-2 relative rounded-md w-full md:w-auto">
        <input
          type="text"
          onChange={({ target: { value } }) => setSearchTest(value)}
          value={searchText}
          name="courseHash"
          className="w-full md:w-52 lg:w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
          placeholder="0x2341ab..."
        />
        <Button
          onClick={() => onSearchSubmit(searchText)}
          className="ml-2 md:ml-0 mt-2 md:mt-0"
        >
          Search
        </Button>
      </div>
      <div className="relative text-gray-700 w-full md:w-auto">
        <select
          name="select"
          className="w-full md:w-72 h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
        >
          <option>A regular sized select input</option>
          <option>Another option</option>
          <option>And one more</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
              fillRule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

