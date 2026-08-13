export interface OhmsLawCalculatorInputs {
  // Common
  activeTab?: string;

  // Core inputs
  voltage?: number;
  voltageUnit?: "μV" | "mV" | "V" | "kV" | "MV";
  current?: number;
  currentUnit?: "nA" | "μA" | "mA" | "A" | "kA";
  resistance?: number;
  resistanceUnit?: "μΩ" | "mΩ" | "Ω" | "kΩ" | "MΩ" | "GΩ";
  power?: number;
  powerUnit?: "μW" | "mW" | "W" | "kW" | "MW";

  // Active state selectors
  knownVoltage?: boolean;
  knownCurrent?: boolean;
  knownResistance?: boolean;
  knownPower?: boolean;

  // Resistor Safety Guidance Margin
  safetyMargin?: number; // e.g. 2 for 2x power safety
  resistorRating?: number; // selected resistor wattage

  // Voltage Divider
  dividerVin?: number;
  dividerR1?: number;
  dividerR2?: number;
  dividerRl?: number; // Load resistance, optional

  // Current Divider
  dividerItotal?: number;
  dividerBranchR1?: number;
  dividerBranchR2?: number;
  dividerBranchR3?: number; // optional third branch

  // LED Resistor
  ledVsource?: number;
  ledVforward?: number;
  ledIforward?: number; // in mA
}

export interface OhmsLawCalculatorOutputs {
  // Core outputs
  voltage: number;
  current: number;
  resistance: number;
  power: number;

  // Formatted display values
  formattedVoltage: string;
  formattedCurrent: string;
  formattedResistance: string;
  formattedPower: string;

  // Consistency check outputs
  consistency?: "consistent" | "inconsistent" | "pending";
  inconsistencyMessage?: string;

  // Safety advice
  powerSafetyMessage?: string;
  isOverloaded?: boolean;

  // Extended results
  dividerVout?: number;
  dividerCurrent?: number;
  dividerR1Power?: number;
  dividerR2Power?: number;
  branch1Current?: number;
  branch2Current?: number;
  branch3Current?: number;
  ledResistance?: number;
  ledPower?: number;
  calculationSteps?: string;
  error?: string;
}
