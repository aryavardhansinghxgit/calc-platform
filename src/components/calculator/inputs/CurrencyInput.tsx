"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export interface CurrencyInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (val: number) => void;
  currencySymbol?: string;
  min?: number;
  max?: number;
  step?: number;
}

export function CurrencyInput({
  id,
  label,
  value,
  onChange,
  currencySymbol = "$",
  min,
  max,
  step = 100,
}: CurrencyInputProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-semibold text-slate-300">
        {label}
      </Label>
      <div className="relative flex items-center">
        <span className="absolute left-3 text-xs font-bold text-slate-400 font-sans tabular-nums">
          {currencySymbol}
        </span>
        <Input
          id={id}
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          min={min}
          max={max}
          step={step}
          className="h-10 pl-7 bg-slate-950/80 border-slate-800 text-slate-100 text-sm font-sans tabular-nums rounded-[12px] focus:border-sky-500"
        />
      </div>
    </div>
  );
}

export default CurrencyInput;
