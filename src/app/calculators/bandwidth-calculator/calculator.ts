import { BandwidthCalculatorOutputs } from "./types";

export function calculateBandwidthCalculator(inputs: Record<string, any>): BandwidthCalculatorOutputs {
  const mb = Math.max(1, Number(inputs.fileSizeMb) || 1000);
  const mbps = Math.max(1, Number(inputs.speedMbps) || 100);
  const megaBits = mb * 8;
  const secs = Math.ceil(megaBits / mbps);
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return { downloadTimeSecs: secs, formattedTime: `${m} mins ${s} secs` };
}
