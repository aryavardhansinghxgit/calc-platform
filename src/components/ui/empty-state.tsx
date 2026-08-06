import * as React from "react";
import { SearchX, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title = "No results found",
  description = "Try adjusting your search query or clear filters to view calculators.",
  icon: Icon = SearchX,
  actionLabel,
  onAction,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-[12px] border border-dashed border-slate-800 bg-slate-900/40 text-slate-400 space-y-4",
        className
      )}
      {...props}
    >
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-sky-400">
        <Icon className="h-8 w-8" />
      </div>
      <div className="space-y-1 max-w-sm">
        <h3 className="text-base font-bold text-white">{title}</h3>
        <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
      </div>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline" size="sm" className="rounded-xl mt-2">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;
