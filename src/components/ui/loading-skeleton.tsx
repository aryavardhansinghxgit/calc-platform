import * as React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

export interface LoadingSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  type?: "card" | "text" | "calculator";
}

export function LoadingSkeleton({
  count = 1,
  type = "card",
  className,
  ...props
}: LoadingSkeletonProps) {
  const items = Array.from({ length: count });

  if (type === "calculator") {
    return (
      <div className={cn("p-6 sm:p-8 rounded-[12px] border border-slate-800 bg-slate-900/90 space-y-6 animate-pulse", className)}>
        <div className="space-y-2">
          <Skeleton className="h-6 w-48 bg-slate-800 rounded-lg" />
          <Skeleton className="h-4 w-72 bg-slate-800/60 rounded-md" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <Skeleton className="h-12 w-full bg-slate-800 rounded-xl" />
          <Skeleton className="h-12 w-full bg-slate-800 rounded-xl" />
          <Skeleton className="h-12 w-full bg-slate-800 rounded-xl" />
          <Skeleton className="h-12 w-full bg-slate-800 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", className)} {...props}>
      {items.map((_, i) => (
        <div
          key={i}
          className="p-6 rounded-[12px] border border-slate-800 bg-slate-900/80 space-y-4 animate-pulse"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-10 bg-slate-800 rounded-xl" />
            <Skeleton className="h-4 w-16 bg-slate-800/60 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-3/4 bg-slate-800 rounded-md" />
            <Skeleton className="h-4 w-full bg-slate-800/60 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;
