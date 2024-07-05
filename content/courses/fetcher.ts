import courses from "./index.json";
import { Course, CourseMap } from "./types";

export const getAllCourses = (): { data: Course[]; courseMap: CourseMap } => {
  return {
    data: courses,
    courseMap: courses.reduce<CourseMap>((acc, course, index) => {
      acc[course.id] = { ...course, index };
      return acc;
    }, {}),
  };
};