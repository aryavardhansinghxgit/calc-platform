"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface InputFieldProps {
  id: string;
  label: string;
  value: number | string;
  onChange: (val: number | string) => void;
  type?: "number" | "text";
  unit?: string;
  tooltip?: string;
  error?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
}

export function InputField({
  id,
  label,
  value,
  onChange,
  type = "number",
  unit,
  tooltip,
  error,
  placeholder,
  min,
  max,
  step,
}: InputFieldProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Label htmlFor={id} className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5">
            {label}
          </Label>
          {tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button type="button" className="text-slate-400 hover:text-blue-600 transition-colors" aria-label={`Help: ${label}`}>
                    <HelpCircle className="h-3.5 w-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-900 text-white text-xs rounded-lg shadow-md max-w-[220px]">
                  <p>{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {unit && <span className="text-xs font-semibold text-slate-400">{unit}</span>}
      </div>

      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(type === "number" ? parseFloat(e.target.value) || 0 : e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        aria-label={label}
        className="h-10 text-slate-900 dark:text-slate-100 rounded-xl px-3.5 py-2.5 font-sans tabular-nums text-sm"
      />
      {error && <p className="text-[11px] text-red-600 font-medium">{error}</p>}
    </div>
  );
}

export default InputField;
