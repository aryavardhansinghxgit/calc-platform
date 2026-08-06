"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-6 max-w-md mx-auto">
      <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400">
        <AlertTriangle className="h-10 w-10" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-white tracking-tight">Something went wrong</h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          An unexpected error occurred while processing your calculation request.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3">
        <Button
          onClick={() => reset()}
          variant="outline"
          className="bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-200"
        >
          <RefreshCw className="h-4 w-4 mr-2" /> Try Again
        </Button>
        <Button asChild className="bg-sky-600 hover:bg-sky-500 text-white">
          <Link href="/">
            <Home className="h-4 w-4 mr-2" /> Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
