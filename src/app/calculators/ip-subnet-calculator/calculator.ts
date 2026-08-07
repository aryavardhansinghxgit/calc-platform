import { IPSubnetCalculatorOutputs } from "./types";

export function calculateIPSubnetCalculator(inputs: Record<string, any>): IPSubnetCalculatorOutputs {
  const cidr = Math.min(32, Math.max(1, Number(inputs.cidr) || 24));
  const maskInt = (0xFFFFFFFF << (32 - cidr)) >>> 0;
  const maskOctets = [(maskInt >>> 24) & 255, (maskInt >>> 16) & 255, (maskInt >>> 8) & 255, maskInt & 255];
  const usable = cidr >= 31 ? (cidr === 31 ? 2 : 1) : Math.pow(2, 32 - cidr) - 2;
  const ipParts = String(inputs.ipAddress || "192.168.1.1").split(".").map(Number);
  const netOctets = ipParts.map((p, idx) => (p & maskOctets[idx]) || 0);
  return {
    subnetMask: maskOctets.join("."),
    usableHosts: usable,
    networkAddress: netOctets.join(".")
  };
}
