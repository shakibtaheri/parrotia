import type { HTMLAttributes } from "react";

export default function Container({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`mx-auto w-full max-w-307 px-4 md:px-6 ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  );
}
