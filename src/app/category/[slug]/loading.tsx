import React from "react";

export default function CategoryLoading() {
  return (
    <div className="space-y-10 max-w-5xl mx-auto py-2 animate-pulse">
      <div className="space-y-4">
        <div className="h-7 w-28 bg-slate-900 rounded-xl border border-slate-800" />
        <div className="h-32 rounded-2xl bg-slate-900 border border-slate-800" />
      </div>

      <div className="space-y-4">
        <div className="h-6 w-48 bg-slate-800 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-36 rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-3" />
          ))}
        </div>
      </div>
    </div>
  );
}
