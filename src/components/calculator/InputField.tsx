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
          <Label htmlFor={id} className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            {label}
          </Label>
          {tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button type="button" className="text-zinc-400 hover:text-blue-600 transition-colors" aria-label={`Help: ${label}`}>
                    <HelpCircle className="h-3 w-3" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-zinc-900 text-white text-xs rounded-md shadow-md max-w-[200px]">
                  <p>{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {unit && <span className="text-[11px] font-medium text-zinc-400">{unit}</span>}
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
        className="h-9.5 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm font-sans tabular-nums rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
      />
      {error && <p className="text-[11px] text-red-600 font-medium">{error}</p>}
    </div>
  );
}

export default InputField;
