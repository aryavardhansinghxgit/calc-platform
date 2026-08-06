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
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Label htmlFor={id} className="text-sm font-semibold text-slate-200">
            {label}
          </Label>
          {tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button type="button" className="text-slate-400 hover:text-sky-400 transition-colors">
                    <HelpCircle className="h-3.5 w-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-900 border border-slate-800 text-slate-200 text-xs">
                  <p>{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {unit && <span className="text-xs font-mono font-medium text-slate-400">{unit}</span>}
      </div>

      <div className="relative">
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(type === "number" ? parseFloat(e.target.value) || 0 : e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className="h-11 bg-slate-950/80 border-slate-800 text-slate-100 text-sm rounded-[12px] focus:border-sky-500 focus:ring-sky-500/20"
        />
      </div>
      {error && <p className="text-xs text-rose-400">{error}</p>}
    </div>
  );
}

export default InputField;
