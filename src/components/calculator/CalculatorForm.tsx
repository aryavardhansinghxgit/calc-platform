"use client";

import React from "react";
import { CalculatorDefinition } from "@/lib/calculator-engine/types";
import { InputField } from "./InputField";
import { SliderField } from "./SliderField";

export interface CalculatorFormProps {
  definition: Omit<CalculatorDefinition, "calculate">;
  values: Record<string, any>;
  onChange: (key: string, val: any) => void;
}

export function CalculatorForm({ definition, values, onChange }: CalculatorFormProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-3">
      {definition.inputs.map((inputDef) => {
        const val = values[inputDef.name] ?? inputDef.defaultValue;

        if (inputDef.type === "slider" && inputDef.min !== undefined && inputDef.max !== undefined) {
          return (
            <div key={inputDef.name} className="sm:col-span-2">
              <SliderField
                id={inputDef.name}
                label={inputDef.label}
                value={Number(val)}
                onChange={(v) => onChange(inputDef.name, v)}
                min={inputDef.min}
                max={inputDef.max}
                step={inputDef.step || 1}
                unit={inputDef.unit}
              />
            </div>
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
    </div>
  );
}

export default CalculatorForm;
