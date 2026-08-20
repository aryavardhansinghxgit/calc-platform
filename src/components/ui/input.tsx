import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9.5 w-full min-w-0 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-1.5 text-base text-slate-900 dark:text-zinc-100 placeholder:text-muted-foreground outline-none transition-all duration-200 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm font-sans tabular-nums",
        "hover:border-slate-400 dark:hover:border-zinc-500",
        "focus-visible:border-blue-600 dark:focus-visible:border-blue-400 focus-visible:ring-1 focus-visible:ring-blue-500/20",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
export default Input;

