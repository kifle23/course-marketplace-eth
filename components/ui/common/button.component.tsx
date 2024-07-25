interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "light" | "danger" | "white";
  hoverable?: boolean;
}

export default function Button({
  children,
  className,
  variant = "primary",
  hoverable = true,
  ...rest
}: ButtonProps) {
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
  };

  return (
    <button
      {...rest}
      className={`disabled:opacity-50 disabled:cursor-not-allowed xs:px-8 xs:py-3 border rounded-md text-base font-medium ${className} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

