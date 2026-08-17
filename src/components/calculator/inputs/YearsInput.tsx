"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export interface YearsInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
}

export function YearsInput({ id, label, value, onChange, min = 1, max = 50 }: YearsInputProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-semibold text-slate-300">
        {label}
      </Label>
      <div className="relative flex items-center">
        <Input
          id={id}
          type="number"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value, 10) || 0)}
          min={min}
          max={max}
          className="h-10 pr-12 bg-slate-950/80 border-slate-800 text-slate-100 text-sm font-sans tabular-nums rounded-[12px]"
        />
        <span className="absolute right-3 text-xs font-medium text-slate-400">yr</span>
      </div>
    </div>
  );
}

export default YearsInput;
