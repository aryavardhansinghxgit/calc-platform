import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9.5 w-full min-w-0 rounded-xl border border-slate-300 dark:border-zinc-700/90 bg-gradient-to-b from-slate-50/90 to-white dark:from-zinc-950 dark:to-zinc-900 px-3 py-1.5 text-base text-slate-900 dark:text-zinc-100 placeholder:text-muted-foreground outline-none transition-all duration-200 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm font-sans tabular-nums",
        "shadow-[inset_0_2px_4px_rgba(0,0,0,0.07),inset_0_1px_2px_rgba(0,0,0,0.06),0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_2px_5px_rgba(0,0,0,0.65),inset_0_1px_2px_rgba(0,0,0,0.5),0_1px_0_rgba(255,255,255,0.07)]",
        "hover:border-slate-400 dark:hover:border-zinc-500",
        "focus-visible:border-blue-600 dark:focus-visible:border-blue-400 focus-visible:ring-3 focus-visible:ring-blue-500/20 focus-visible:shadow-[inset_0_1px_2px_rgba(0,0,0,0.06),0_0_0_3px_rgba(37,99,235,0.2),0_2px_6px_rgba(0,0,0,0.06)] dark:focus-visible:shadow-[inset_0_1px_2px_rgba(0,0,0,0.5),0_0_0_3px_rgba(59,130,246,0.3),0_2px_8px_rgba(0,0,0,0.4)]",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
export default Input;

