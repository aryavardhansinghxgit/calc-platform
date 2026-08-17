"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export interface SliderInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (val: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
}

export function SliderInput({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit,
}: SliderInputProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="text-sm font-semibold text-slate-200">
          {label}
        </Label>
        <div className="flex items-center gap-1 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
          <Input
            id={id}
            type="number"
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value) || min)}
            min={min}
            max={max}
            step={step}
            className="w-16 h-7 p-0 bg-transparent border-0 text-right font-sans tabular-nums font-bold text-sky-400 text-sm focus-visible:ring-0"
          />
          {unit && <span className="text-xs text-slate-400 font-sans tabular-nums">{unit}</span>}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
      />
    </div>
  );
}

export default SliderInput;
