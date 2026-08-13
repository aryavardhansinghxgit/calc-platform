import React from "react";
import { CalculatorDefinition as BaseCalculatorDefinition } from "@/lib/calculator-engine/types";

export interface CalculatorModuleDefinition extends BaseCalculatorDefinition {
  featured?: boolean;
  tags?: string[];
  icon?: any;
  modes?: { id: string; name: string; description?: string }[];
  ContentComponent?: React.ComponentType<any>;
  CustomComponent?: React.ComponentType<any>;
  ChartComponent?: React.ComponentType<{ data: Record<string, any>; inputs: Record<string, any> }>;
}

export type {
  InputType,
  CalculatorInput,
  CalculatorOutput,
  CalculatorFAQ,
  CalculationResult,
} from "@/lib/calculator-engine/types";
