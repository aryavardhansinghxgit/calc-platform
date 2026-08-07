export interface IPSubnetCalculatorInputs {
  ipAddress?: string;
  cidr?: number;
}

export interface IPSubnetCalculatorOutputs {
  subnetMask: string;
  usableHosts: number;
  networkAddress: string;
}
