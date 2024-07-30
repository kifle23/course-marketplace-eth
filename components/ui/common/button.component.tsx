interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?:
    | "primary"
    | "secondary"
    | "light"
    | "danger"
    | "white"
    | "green"
    | "red";
  hoverable?: boolean;
  size?: "sm" | "md" | "lg";
}

const SIZE = {
  sm: "p-2 text-base xs:px-4",
  md: "p-3 text-base xs:px-8",
  lg: "p-3 text-lg xs:px-8",
};

export default function Button({
  children,
  className,
  variant = "primary",
  hoverable = true,
  size = "md",
  ...rest
}: ButtonProps) {
  const sizeClass = SIZE[size];
  const variants = {
    primary: `text-white bg-indigo-600 ${hoverable && "hover:bg-indigo-700"} ${
      hoverable ? "cursor-pointer" : "cursor-default"
    }`,
    secondary: `text-white bg-yellow-600 ${
      hoverable && "hover:bg-yellow-700"
    } ${hoverable ? "cursor-pointer" : "cursor-default"}`,
    light: `text-indigo bg-indigo-100 ${hoverable && "hover:bg-indigo-200"} ${
      hoverable ? "cursor-pointer" : "cursor-default"
    }`,
    danger: `text-white bg-red-600 ${hoverable && "hover:bg-red-700"} ${
      hoverable ? "cursor-pointer" : "cursor-default"
    }`,
    white: `text-indigo-600 bg-white border border-indigo-600 ${
      hoverable && "hover:bg-indigo-50"
    } ${hoverable ? "cursor-pointer" : "cursor-default"}`,
    green: `text-white bg-green-600 ${hoverable && "hover:bg-green-700"} ${
      hoverable ? "cursor-pointer" : "cursor-default"
    }`,
    red: `text-white bg-red-600 ${hoverable && "hover:bg-red-700"} ${
      hoverable ? "cursor-pointer" : "cursor-default"
    }`,
  };

  return (
    <button
      {...rest}
      className={`${sizeClass} disabled:opacity-50 disabled:cursor-not-allowed border rounded-md font-medium ${className} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

