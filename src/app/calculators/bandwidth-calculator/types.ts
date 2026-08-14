export type DataUnit = "B" | "KB" | "MB" | "GB" | "TB" | "PB";
export type SpeedUnit = "bps" | "Kbps" | "Mbps" | "Gbps" | "Tbps" | "B/s" | "KB/s" | "MB/s" | "GB/s" | "TB/s";

export interface BandwidthCalculatorOutputs {
  downloadTimeSecs: number;
  formattedTime: string;
}

export interface HostingBandwidthResult {
  monthlyTransferGb: number;
  monthlyTransferTb: number;
  avgBandwidthMbps: number;
  peakBandwidthMbps: number;
  recommendedPort: string;
}

export interface ConcurrencyProfile {
  id: string;
  label: string;
  speedMbps: number;
  count: number;
  category: string;
  iconName?: string;
}

export interface ConcurrencyResult {
  totalSpeedMbps: number;
  totalSpeedGbps: number;
  recommendedPlan: string;
  headroomMbps: number;
}
