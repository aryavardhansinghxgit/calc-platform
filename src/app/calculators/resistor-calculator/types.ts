export type ResistorColor =
  | "black"
  | "brown"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "violet"
  | "gray"
  | "white"
  | "gold"
  | "silver"
  | "none";

export interface ResistorCalculatorInputs {
  // Common
  activeTab?: string;

  // Color Code
  bandCount?: 4 | 5 | 6;
  band1?: ResistorColor;
  band2?: ResistorColor;
  band3?: ResistorColor;
  multiplier?: ResistorColor;
  tolerance?: ResistorColor;
  tempCoeff?: ResistorColor;

  // Two-way reverse input
  targetResistance?: number;
  targetResistanceUnit?: "mΩ" | "Ω" | "kΩ" | "MΩ" | "GΩ";
  targetTolerance?: number; // e.g. 5 for 5%
  targetTempCoeff?: number; // e.g. 100 for 100ppm

  // Series / Parallel
  resistorValuesString?: string; // Comma-separated values
  supplyVoltage?: number;

  // Conductor
  conductorLength?: number;
  conductorLengthUnit?: "mm" | "cm" | "m" | "km" | "in" | "ft" | "yd" | "mile";
  conductorSizeInputType?: "diameter" | "area";
  conductorDiameter?: number;
  conductorDiameterUnit?: "mm" | "cm" | "in";
  conductorArea?: number;
  conductorAreaUnit?: "mm²" | "cm²" | "in²";
  conductorMaterial?: string;
  conductorTemp?: number; // Current temperature in °C

  // SMD
  smdCode?: string;

  // Combination Finder & E-Series
  finderTargetResistance?: number;
  finderTargetUnit?: "Ω" | "kΩ" | "MΩ";
  finderESeries?: "E6" | "E12" | "E24" | "E48" | "E96" | "E192";
  finderMaxResistors?: number;
}

export interface ResistorCalculatorOutputs {
  // Output fields mapping to standard structures
  resistanceOhms: number;
  formattedValue: string;
  minOhms?: number;
  maxOhms?: number;
  tolerancePct?: number;
  tempCoeffPpm?: number;
  bands?: ResistorColor[];
  calculationSteps?: string;
  error?: string;
}
