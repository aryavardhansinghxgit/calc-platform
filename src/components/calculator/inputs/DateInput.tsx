"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export interface DateInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
}

export function DateInput({ id, label, value, onChange }: DateInputProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-semibold text-slate-300">
        {label}
      </Label>
      <Input
        id={id}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 bg-slate-950/80 border-slate-800 text-slate-100 text-sm rounded-[12px] focus:border-sky-500"
      />
    </div>
  );
}

export default DateInput;
