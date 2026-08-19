"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-zinc-900 font-sans antialiased min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6 p-8 bg-white border border-zinc-200 rounded-2xl shadow-lg">
          <div className="inline-flex p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600">
            <AlertTriangle className="h-10 w-10" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-zinc-900">
              Critical System Error
            </h1>
            <p className="text-xs text-zinc-600 leading-relaxed">
              A critical error occurred while loading the platform.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => reset()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Reload Platform
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-zinc-800 text-xs font-semibold transition-colors"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
