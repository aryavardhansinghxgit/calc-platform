export interface BandwidthCalculatorInputs {
  fileSizeMb?: number;
  speedMbps?: number;
}

export interface BandwidthCalculatorOutputs {
  downloadTimeSecs: number;
  formattedTime: string;
}
