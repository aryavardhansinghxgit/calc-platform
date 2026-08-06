"use client";

import React from "react";
import { Label } from "@/components/ui/label";

export interface ToggleInputProps {
  id: string;
  label: string;
  options: [string, string]; // e.g. ["Exclusive", "Inclusive"]
  value: string;
  onChange: (val: string) => void;
}

export function ToggleInput({ id, label, options, value, onChange }: ToggleInputProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-semibold text-slate-300">
        {label}
      </Label>
      <div className="grid grid-cols-2 p-1 bg-slate-950 rounded-[12px] border border-slate-800">
        {options.map((opt) => {
          const isSelected = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`h-8 text-xs font-semibold rounded-lg transition-all ${
                isSelected
                  ? "bg-sky-500 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ToggleInput;
