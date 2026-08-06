import React from "react";

export default function Loading() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto py-6 animate-pulse">
      <div className="h-8 w-64 bg-slate-800/80 rounded-xl" />
      <div className="h-4 w-96 bg-slate-800/50 rounded-lg" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="h-80 bg-slate-900/80 rounded-2xl border border-slate-800" />
        <div className="h-80 bg-slate-900/80 rounded-2xl border border-slate-800" />
      </div>
    </div>
  );
}
