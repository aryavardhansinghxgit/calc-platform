export interface GDPCalculatorInputs {
  consumption?: number;
  investment?: number;
  government?: number;
  exports?: number;
  imports?: number;
}

export interface GDPCalculatorOutputs {
  totalGdp: number;
  netExports: number;
}
