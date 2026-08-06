"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export function NavigationMenu({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <nav className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}>
      {children}
    </nav>
  );
}

export function NavigationMenuList({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <ul className={cn("group flex flex-1 list-none items-center justify-center space-x-1", className)}>
      {children}
    </ul>
  );
}

export function NavigationMenuItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <li className={cn("relative", className)}>{children}</li>;
}

export function NavigationMenuTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={cn(
        "group inline-flex h-9 w-max items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors focus:outline-none",
        className
      )}
    >
      {children}
      <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-hover:rotate-180" />
    </button>
  );
}

export function NavigationMenuContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute left-0 top-full mt-2 w-48 rounded-xl bg-slate-900 p-2 shadow-xl border border-slate-800 text-slate-200",
        className
      )}
    >
      {children}
    </div>
  );
}

export function NavigationMenuLink({
  children,
  className,
  href = "#",
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "block select-none rounded-md p-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors",
        className
      )}
    >
      {children}
    </a>
  );
}
