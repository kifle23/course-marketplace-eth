export interface Course {
  id: number;
  type: string;
  title: string;
  description: string;
  coverImage: string;
  author: string;
  link: string;
  slug: string;
  wsl: string[];
  createdAt: string;
  state?: string;
  price?: string;
  ownedCourseId?: number;
  proof?: string;
  owner?: string;
  hash?: string;
}
export interface CourseMap {
  [id: number]: Course & { index: number };
}
export interface OwnedCourse {
  id: number;
  proof: string;
  owner: string;
  price: string;
  state: number;
}
