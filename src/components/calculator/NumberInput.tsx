"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface NumberInputProps extends React.ComponentProps<"input"> {
  prefixSymbol?: string;
  suffixSymbol?: string;
  onNumberChange?: (val: number) => void;
}

export function NumberInput({
  prefixSymbol,
  suffixSymbol,
  onNumberChange,
  className,
  value,
  onChange,
  ...props
}: NumberInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    if (onNumberChange) {
      const num = parseFloat(e.target.value);
      onNumberChange(isNaN(num) ? 0 : num);
    }
  };

  return (
    <div className="relative flex items-center">
      {prefixSymbol && (
        <span className="absolute left-3 text.sm font-bold text-slate-400 font-mono">
          {prefixSymbol}
        </span>
      )}
      <Input
        type="number"
        value={value}
        onChange={handleChange}
        className={cn(
          "h-11 bg-slate-950/80 border-slate-800 text-slate-100 text-sm rounded-[12px]",
          prefixSymbol && "pl-8",
          suffixSymbol && "pr-8",
          className
        )}
        {...props}
      />
      {suffixSymbol && (
        <span className="absolute right-3 text-xs font-semibold text-slate-400 font-mono">
          {suffixSymbol}
        </span>
      )}
    </div>
  );
}

export default NumberInput;
