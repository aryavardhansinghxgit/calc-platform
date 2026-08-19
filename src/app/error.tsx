"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertOctagon, RefreshCw, Home, Compass } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Platform Runtime Error caught by error boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-12 max-w-xl mx-auto space-y-6 font-sans">
      {/* Icon & Error Badge */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-600 dark:text-amber-400">
        <AlertOctagon className="h-10 w-10" />
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-semibold uppercase tracking-wider">
          500 • Internal Error
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
          Calculation Error Occurred
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
          An unexpected issue prevented this calculation from completing. You can try refreshing the calculator or return to the directory.
        </p>
      </div>

      {/* Error Details (if available in dev) */}
      {error?.message && (
        <div className="w-full bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-left">
          <p className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 break-all">
            {error.message}
          </p>
          {error.digest && (
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1">
              Digest: {error.digest}
            </p>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-colors"
        >
          <Home className="h-4 w-4" />
          Home
        </Link>
        <Link
          href="/category/finance"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-colors"
        >
          <Compass className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          All Calculators
        </Link>
      </div>
    </div>
  );
}
