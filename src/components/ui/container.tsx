import * as React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  clean?: boolean;
}

export function Container({
  className,
  as: Component = "div",
  clean = false,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        !clean && "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Container;
