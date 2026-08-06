"use client";

import React from "react";
import { Label } from "@/components/ui/label";

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectInputProps {
  id: string;
  label: string;
  value: string | number;
  options: SelectOption[];
  onChange: (val: string) => void;
}

export function SelectInput({ id, label, value, options, onChange }: SelectInputProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-semibold text-slate-300">
        {label}
      </Label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 px-3 bg-slate-950/80 border border-slate-800 text-slate-100 text-sm rounded-[12px] focus:outline-none focus:border-sky-500"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-slate-900 text-slate-100">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
