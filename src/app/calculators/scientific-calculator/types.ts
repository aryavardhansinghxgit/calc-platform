export interface ScientificCalculatorInputs {
  value1?: number;
  value2?: number;
  operation?: string;
  angleUnit?: "deg" | "rad";
}

export interface ScientificCalculatorOutputs {
  result: number | string;
  explanation: string;
  formattedResult?: string;
  domainNote?: string;
}

