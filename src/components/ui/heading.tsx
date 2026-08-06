import * as React from "react";
import { cn } from "@/lib/utils";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  subtitle?: string;
}

export function Heading({
  level = 2,
  subtitle,
  className,
  children,
  ...props
}: HeadingProps) {
  const Component = (`h${level}` as unknown) as React.ElementType;

  const styles = {
    1: "text-3xl sm:text-5xl font-black tracking-tight text-white",
    2: "text-2xl sm:text-3xl font-bold tracking-tight text-white",
    3: "text-xl sm:text-2xl font-bold tracking-tight text-white",
    4: "text-lg font-semibold text-white",
    5: "text-base font-semibold text-white",
    6: "text-sm font-semibold text-white",
  };

  return (
    <div className="space-y-1.5">
      <Component className={cn(styles[level], className)} {...props}>
        {children}
      </Component>
      {subtitle && (
        <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default Heading;
