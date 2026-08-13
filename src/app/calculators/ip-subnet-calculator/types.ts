export interface IPSubnetCalculatorInputs {
  activeTab?: string;

  // IPv4 Inputs
  ipAddress?: string;
  cidr?: number;
  subnetMask?: string;
  networkClass?: string; // Legacy: Any, A, B, C

  // IPv6 Inputs
  ipv6Address?: string;
  ipv6Prefix?: number;

  // Subnet splitter/enumerator inputs
  splitterBaseIp?: string;
  splitterBaseCidr?: number;
  splitterTargetCidr?: number;

  // Planner inputs
  plannerBaseIp?: string;
  plannerRequiredHosts?: number;

  // Route Summarizer inputs
  summarizerNetworksString?: string;
}

export interface SubnetListItem {
  subnetIndex: number;
  networkAddress: string;
  cidr: number;
  firstUsable: string;
  lastUsable: string;
  broadcastAddress: string;
  totalAddresses: number;
  usableHosts: number;
}

export interface IPSubnetCalculatorOutputs {
  // Core IPv4 / IPv6 outputs
  ipAddress?: string;
  cidr?: number;
  subnetMask?: string;
  wildcardMask?: string;
  networkAddress?: string;
  broadcastAddress?: string;
  firstUsable?: string;
  lastUsable?: string;
  totalAddresses?: number;
  usableHosts?: number;
  hostBits?: number;
  networkBits?: number;

  // Visualizations
  binaryAddress?: string;
  binaryMask?: string;
  binaryNetwork?: string;
  binaryBroadcast?: string;

  // Classifications
  addressType?: string; // Private, Public, Link-local, loopback
  legacyClass?: string; // Class A, B, C, D, E

  // Advanced features
  offsetIndex?: number;
  nextSubnet?: string;
  prevSubnet?: string;
  subnetList?: SubnetListItem[];
  plannerCidr?: number;
  plannerUsableHosts?: number;

  // IPv6 Specific outputs
  ipv6Expanded?: string;
  ipv6Compressed?: string;
  ipv6NetworkPrefix?: string;
  ipv6InterfaceBits?: string;
  ipv6AddressCountString?: string;

  // Summarizer outputs
  summarizedBlock?: string;
  summarizerIsContiguous?: boolean;

  error?: string;
  calculationSteps?: string;
}
