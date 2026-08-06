import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}

export function Section({
  className,
  as: Component = "section",
  children,
  ...props
}: SectionProps) {
  return (
    <Component className={cn("py-8 sm:py-12 space-y-6", className)} {...props}>
      {children}
    </Component>
  );
}

export default Section;
