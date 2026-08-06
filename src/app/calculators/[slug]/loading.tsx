import React from "react";

export default function CalculatorLoading() {
  return (
    <div className="space-y-10 max-w-5xl mx-auto py-2 animate-pulse">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-7 w-32 bg-slate-900 rounded-xl border border-slate-800" />
          <div className="h-6 w-28 bg-slate-900 rounded-full border border-slate-800" />
        </div>
        <div className="space-y-2 border-b border-slate-800/80 pb-6">
          <div className="h-10 w-72 bg-slate-800 rounded-xl" />
          <div className="h-4 w-full max-w-xl bg-slate-800/60 rounded-lg" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-6 h-96 bg-slate-900/90 border border-slate-800 rounded-2xl p-6" />
        <div className="lg:col-span-6 h-96 bg-slate-900/90 border border-slate-800 rounded-2xl p-6" />
      </div>
    </div>
  );
}
