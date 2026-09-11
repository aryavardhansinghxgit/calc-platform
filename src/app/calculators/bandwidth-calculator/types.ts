export type DecimalDataUnit = "B" | "KB" | "MB" | "GB" | "TB" | "PB";
export type BinaryDataUnit = "KiB" | "MiB" | "GiB" | "TiB";
export type DataUnit = DecimalDataUnit | BinaryDataUnit;

export type BitrateSpeedUnit = "bps" | "Kbps" | "Mbps" | "Gbps" | "Tbps";
export type ByteSpeedUnit = "B/s" | "KB/s" | "MB/s" | "GB/s" | "TB/s";
export type BinaryByteSpeedUnit = "KiB/s" | "MiB/s" | "GiB/s";
export type SpeedUnit = BitrateSpeedUnit | ByteSpeedUnit | BinaryByteSpeedUnit;

export interface TransferTimeOutputs {
  success: boolean;
  error?: string;
  totalBits: number;
  totalBytes: number;
  nominalBps: number;
  effectiveBps: number;
  effectiveMBps: number;
  theoreticalSecs: number;
  theoreticalFormatted: string;
  realisticSecs: number;
  realisticFormatted: string;
}

export interface ConversionOutputs {
  success: boolean;
  error?: string;
  inputVal: number;
  inputUnit: string;
  bps: number;
  Kbps: number;
  Mbps: number;
  Gbps: number;
  Tbps: number;
  "B/s": number;
  "KB/s": number;
  "MB/s": number;
  "GB/s": number;
  "TB/s": number;
  "KiB/s": number;
  "MiB/s": number;
  "GiB/s": number;
  gbPerMonth30d: number;
  tbPerMonth30d: number;
  gbPerMonthAvg: number;
}

export interface HostingOutputs {
  success: boolean;
  error?: string;
  monthlyViews: number;
  pageSizeBytes: number;
  baseMonthlyBytes: number;
  totalMonthlyBytes: number;
  monthlyTransferGb: number;
  monthlyTransferTb: number;
  avgBps: number;
  avgMbps: number;
  peakMbps: number;
  recommendedPort: string;
}

export interface ConcurrencyProfileItem {
  key: string;
  name: string;
  speedMbps: number;
  count: number;
  category?: string;
}

export interface ConcurrencyOutputs {
  success: boolean;
  error?: string;
  rawTotalMbps: number;
  recommendedTotalMbps: number;
  recommendedTotalGbps: number;
  headroomMbps: number;
  recommendedPlan: string;
}

export interface DataCapOutputs {
  success: boolean;
  error?: string;
  secondsToExhaust: number;
  formattedExhaustTime: string;
  dailyAllowanceGb: number;
}

export interface BandwidthCalculatorOutputs {
  downloadTimeSecs: number;
  formattedTime: string;
  theoreticalTimeSecs?: number;
  theoreticalFormatted?: string;
  effectiveRateMBps?: number;
  transfer?: TransferTimeOutputs;
  conversion?: ConversionOutputs;
  hosting?: HostingOutputs;
  concurrency?: ConcurrencyOutputs;
  dataCap?: DataCapOutputs;
}
