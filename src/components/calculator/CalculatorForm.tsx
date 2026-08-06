"use client";

import React from "react";
import { CalculatorDefinition } from "@/lib/calculator-engine/types";
import { InputField } from "./InputField";
import { SliderField } from "./SliderField";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SlidersHorizontal } from "lucide-react";

export interface CalculatorFormProps {
  definition: CalculatorDefinition;
  values: Record<string, any>;
  onChange: (key: string, val: any) => void;
}

export function CalculatorForm({ definition, values, onChange }: CalculatorFormProps) {
  return (
    <Card className="bg-slate-900/90 border-slate-800/80 rounded-[12px] p-6 space-y-6">
      <CardHeader className="p-0 pb-2 border-b border-slate-800 flex items-center justify-between">
        <div>
          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-sky-400" /> Input Parameters
          </CardTitle>
          <CardDescription className="text-xs text-slate-400">
            Adjust the sliders or numeric inputs below to update calculations in real-time.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-0 space-y-5">
        {definition.inputs.map((inputDef) => {
          const val = values[inputDef.name] ?? inputDef.defaultValue;

          if (inputDef.type === "slider" && inputDef.min !== undefined && inputDef.max !== undefined) {
            return (
              <SliderField
                key={inputDef.name}
                id={inputDef.name}
                label={inputDef.label}
                value={Number(val)}
                onChange={(v) => onChange(inputDef.name, v)}
                min={inputDef.min}
                max={inputDef.max}
                step={inputDef.step || 1}
                unit={inputDef.unit}
              />
            );
          }

          return (
            <InputField
              key={inputDef.name}
              id={inputDef.name}
              label={inputDef.label}
              value={val}
              onChange={(v) => onChange(inputDef.name, v)}
              type="number"
              unit={inputDef.unit}
              tooltip={inputDef.tooltip}
              min={inputDef.min}
              max={inputDef.max}
              step={inputDef.step}
            />
          );
        })}
      </CardContent>
    </Card>
  );
}

export default CalculatorForm;
