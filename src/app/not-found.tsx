import React from "react";
import Link from "next/link";
import { FileQuestion, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-6 max-w-md mx-auto">
      <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
        <FileQuestion className="h-10 w-10" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">404 - Tool Not Found</h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          The calculator or category page you requested could not be found.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3">
        <Button asChild className="bg-sky-600 hover:bg-sky-500 text-white">
          <Link href="/">
            <Home className="h-4 w-4 mr-2" /> All Calculators
          </Link>
        </Button>
      </div>
    </div>
  );
}
