import { Course } from "@content/courses/types";

interface ManagedCourseCardProps {
  course: Course;
  children?: React.ReactNode;
}
interface ItemProps {
  title: string;
  value: string;
  className: string;
}

function Item({ title, value, className }: ItemProps) {
  return (
    <div className={`${className} px-4 py-2 sm:px-6`}>
      <div className="text-sm font-medium text-gray-500">{title}</div>
      <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        {value}
      </div>
    </div>
  );
}

export default function ManagedCourseCard({
  course,
  children,
}: ManagedCourseCardProps) {
  const items = [
    {
      title: "Hash",
      value: course.hash || "",
      className: "bg-white",
    },
    {
      title: "Course ID",
      value: (Number(course.ownedCourseId?.toString()) + 1).toString() || "",
      className: "bg-gray-50",
    },
    { title: "Proof", value: course.proof || "", className: "bg-white" },
    {
      title: "Owner",
      value: course.owner || "",
      className: "bg-gray-50",
    },
    { title: "Price", value: course.price || "", className: "bg-white" },
    {
      title: "State",
      value: course.state || "",
      className: "bg-gray-50",
    },
  ];

  return (
    <div className="bg-white border shadow overflow-hidden sm:rounded-lg mb-3">
      <div className="border-t border-gray-200">
        {items.map((item, itemIndex) => (
          <Item
            key={itemIndex}
            title={item.title}
            value={item.value.toString()}
            className={item.className}
          />
        ))}
        {children}
      </div>
    </div>
  );
}

