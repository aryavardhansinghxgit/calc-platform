import { IPSubnetCalculatorOutputs, SubnetListItem } from "./types";

// ==========================================
// 1. IPv4 MATH HELPER UTILITIES
// ==========================================

export const CIDR_MASKS: Record<number, string> = {
  0: "0.0.0.0", 1: "128.0.0.0", 2: "192.0.0.0", 3: "224.0.0.0", 4: "240.0.0.0",
  5: "248.0.0.0", 6: "252.0.0.0", 7: "254.0.0.0", 8: "255.0.0.0", 9: "255.128.0.0",
  10: "255.192.0.0", 11: "255.224.0.0", 12: "255.240.0.0", 13: "255.248.0.0",
  14: "255.252.0.0", 15: "255.254.0.0", 16: "255.255.0.0", 17: "255.255.128.0",
  18: "255.255.192.0", 19: "255.255.224.0", 20: "255.255.240.0", 21: "255.255.248.0",
  22: "255.255.252.0", 23: "255.255.254.0", 24: "255.255.255.0", 25: "255.255.255.128",
  26: "255.255.255.192", 27: "255.255.255.224", 28: "255.255.255.240", 29: "255.255.255.248",
  30: "255.255.255.252", 31: "255.255.255.254", 32: "255.255.255.255"
};

export function validateIPv4(ip: any): number[] | null {
  if (ip === undefined || ip === null) return null;
  const s = String(ip).trim();
  if (!s) return null;
  const parts = s.split(".");
  if (parts.length !== 4) return null;
  const octets: number[] = [];
  for (const part of parts) {
    if (part === "" || part.length > 3) return null;
    if (!/^\d+$/.test(part)) return null;
    if (part.length > 1 && part.startsWith("0")) return null;
    const val = Number(part);
    if (val < 0 || val > 255) return null;
    octets.push(val);
  }
  return octets;
}

export function ipToInteger(octets: number[]): number {
  return ((octets[0] << 24) + (octets[1] << 16) + (octets[2] << 8) + octets[3]) >>> 0;
}

export function integerToIP(val: number): string {
  return [
    (val >>> 24) & 255,
    (val >>> 16) & 255,
    (val >>> 8) & 255,
    val & 255
  ].join(".");
}

export function cidrToMaskInt(cidr: number): number {
  if (cidr <= 0) return 0;
  if (cidr >= 32) return 0xFFFFFFFF >>> 0;
  return (0xFFFFFFFF << (32 - cidr)) >>> 0;
}

export function isValidSubnetMask(maskStr: string): { valid: boolean; cidr?: number } {
  const octets = validateIPv4(maskStr);
  if (!octets) return { valid: false };
  const maskInt = ipToInteger(octets);
  
  // A valid contiguous subnet mask has leading 1s followed by trailing 0s
  // Invert mask and check if (inv + 1) is a power of 2
  const inverted = (~maskInt) >>> 0;
  if (maskInt === 0) return { valid: true, cidr: 0 };
  if (((inverted + 1) & inverted) === 0) {
    // Count leading ones
    const cidr = maskIntToCidr(maskInt);
    return { valid: true, cidr };
  }
  return { valid: false };
}

export function maskIntToCidr(mask: number): number {
  let count = 0;
  let temp = mask >>> 0;
  while (temp & 0x80000000) {
    count++;
    temp = (temp << 1) >>> 0;
  }
  return count;
}

export function getBinaryIPRepresentation(octets: number[], cidr: number): { binaryAddress: string; binaryMask: string; networkBitsStr: string; hostBitsStr: string } {
  const ipBin = octets.map(o => o.toString(2).padStart(8, "0")).join(".");
  const maskInt = cidrToMaskInt(cidr);
  const maskOctets = [(maskInt >>> 24) & 255, (maskInt >>> 16) & 255, (maskInt >>> 8) & 255, maskInt & 255];
  const maskBin = maskOctets.map(o => o.toString(2).padStart(8, "0")).join(".");

  const flatIp = ipBin.replace(/\./g, "");
  const netPart = flatIp.substring(0, cidr);
  const hostPart = flatIp.substring(cidr);

  const insertDots = (str: string, offset: number) => {
    let result = "";
    for (let i = 0; i < str.length; i++) {
      if (i > 0 && (i + offset) % 8 === 0) result += ".";
      result += str[i];
    }
    return result;
  };

  const formattedNet = insertDots(netPart, 0);
  const formattedHost = insertDots(hostPart, netPart.length);
  const visualWithSeparator = formattedNet + (hostPart.length > 0 && netPart.length > 0 ? " | " : "") + formattedHost;

  return {
    binaryAddress: visualWithSeparator,
    binaryMask: maskBin,
    networkBitsStr: netPart,
    hostBitsStr: hostPart
  };
}

export function classifyIPv4(ipVal: number): { type: string; legacyClass: string } {
  // Legacy Classful classification based on leading bits
  let legacyClass = "Class A";
  if ((ipVal >>> 31) === 0) {
    legacyClass = "Class A (0.0.0.0/1)";
  } else if ((ipVal >>> 30) === 2) { // 10
    legacyClass = "Class B (128.0.0.0/2)";
  } else if ((ipVal >>> 29) === 6) { // 110
    legacyClass = "Class C (192.0.0.0/3)";
  } else if ((ipVal >>> 28) === 14) { // 1110
    legacyClass = "Class D (Multicast 224.0.0.0/4)";
  } else { // 1111
    legacyClass = "Class E (Experimental/Reserved 240.0.0.0/4)";
  }

  // RFC Scope classification
  let type = "Public Unicast";

  const A_start = ipToInteger([10, 0, 0, 0]);
  const A_end = ipToInteger([10, 255, 255, 255]);
  const B_start = ipToInteger([172, 16, 0, 0]);
  const B_end = ipToInteger([172, 31, 255, 255]);
  const C_start = ipToInteger([192, 168, 0, 0]);
  const C_end = ipToInteger([192, 168, 255, 255]);

  if ((ipVal >= A_start && ipVal <= A_end) || (ipVal >= B_start && ipVal <= B_end) || (ipVal >= C_start && ipVal <= C_end)) {
    type = "Private Network (RFC 1918)";
  } else if (ipVal >= ipToInteger([127, 0, 0, 0]) && ipVal <= ipToInteger([127, 255, 255, 255])) {
    type = "Loopback Address (RFC 1122)";
  } else if (ipVal >= ipToInteger([169, 254, 0, 0]) && ipVal <= ipToInteger([169, 254, 255, 255])) {
    type = "Link-Local Address (APIPA / RFC 3927)";
  } else if (ipVal >= ipToInteger([100, 64, 0, 0]) && ipVal <= ipToInteger([100, 127, 255, 255])) {
    type = "Shared Address Space (Carrier-Grade NAT / RFC 6598)";
  } else if (ipVal >= ipToInteger([224, 0, 0, 0]) && ipVal <= ipToInteger([239, 255, 255, 255])) {
    type = "Multicast Address Group (RFC 5771)";
  } else if (ipVal === 0) {
    type = "Current Network / Default Route (RFC 1122)";
  } else if (ipVal === 0xFFFFFFFF) {
    type = "Limited Broadcast Address (RFC 919)";
  } else if (ipVal >= ipToInteger([240, 0, 0, 0])) {
    type = "Special-Use Reserved Range (RFC 1112)";
  }

  return { type, legacyClass };
}

// ==========================================
// 2. IPv6 ENGINE UTILITY FUNCTIONS
// ==========================================

export function expandIPv6(ip: any): string | null {
  if (ip === undefined || ip === null) return null;
  let cleaned = String(ip).trim().toLowerCase();
  if (!cleaned) return null;

  // Check for invalid multiple double-colons
  const dblColonMatches = cleaned.match(/::/g);
  if (dblColonMatches && dblColonMatches.length > 1) return null;

  // Split on double colon if present
  let groups: string[] = [];
  if (cleaned.includes("::")) {
    const parts = cleaned.split("::");
    const left = parts[0] ? parts[0].split(":") : [];
    const right = parts[1] ? parts[1].split(":") : [];
    const totalPresent = left.length + right.length;
    if (totalPresent > 7) return null;
    const missing = 8 - totalPresent;
    const zeros = Array(missing).fill("0000");
    groups = [...left, ...zeros, ...right];
  } else {
    groups = cleaned.split(":");
    if (groups.length !== 8) return null;
  }

  if (groups.length !== 8) return null;

  for (let i = 0; i < 8; i++) {
    const g = groups[i];
    if (g.length === 0 || g.length > 4) return null;
    if (!/^[0-9a-f]{1,4}$/i.test(g)) return null;
    groups[i] = g.padStart(4, "0");
  }

  return groups.join(":");
}

export function compressIPv6(ip: string): string | null {
  const expanded = expandIPv6(ip);
  if (!expanded) return null;

  const parts = expanded.split(":");
  const trimmed = parts.map(p => p.replace(/^0+/, "") || "0");

  // Locate the longest contiguous run of "0" (must be at least length 2 per RFC 5952)
  let bestStart = -1;
  let bestLen = 0;
  let curStart = -1;
  let curLen = 0;

  for (let i = 0; i < 8; i++) {
    if (trimmed[i] === "0") {
      if (curStart === -1) curStart = i;
      curLen++;
      if (curLen > bestLen) {
        bestLen = curLen;
        bestStart = curStart;
      }
    } else {
      curStart = -1;
      curLen = 0;
    }
  }

  if (bestLen > 1) {
    const before = trimmed.slice(0, bestStart).join(":");
    const after = trimmed.slice(bestStart + bestLen).join(":");
    return `${before}::${after}`;
  }

  return trimmed.join(":");
}

export function getIPv6Type(expanded: string): string {
  if (expanded === "0000:0000:0000:0000:0000:0000:0000:0001") return "Loopback Address (RFC 4291)";
  if (expanded === "0000:0000:0000:0000:0000:0000:0000:0000") return "Unspecified Address (RFC 4291)";
  if (expanded.startsWith("fe80")) return "Link-Local Unicast (RFC 4291)";
  if (expanded.startsWith("fc00") || expanded.startsWith("fd00")) return "Unique Local Unicast (ULA / RFC 4193)";
  if (expanded.startsWith("ff")) return "Multicast Group (RFC 4291)";
  if (expanded.startsWith("2001:0db8")) return "Documentation Range (RFC 3849)";
  if (expanded.startsWith("2002")) return "6to4 Relay Anycast (RFC 3056)";
  if (expanded.startsWith("2001:0000")) return "Teredo Tunneling (RFC 4380)";
  return "Global Unicast (Internet Routable)";
}

// Convert expanded IPv6 into BigInt (128-bit)
export function ipv6ToBigInt(expanded: string): bigint {
  const hex = expanded.replace(/:/g, "");
  return BigInt("0x" + hex);
}

// Convert BigInt back to expanded IPv6
export function bigIntToIPv6(val: bigint): string {
  let hex = val.toString(16).padStart(32, "0");
  const groups: string[] = [];
  for (let i = 0; i < 8; i++) {
    groups.push(hex.substring(i * 4, i * 4 + 4));
  }
  return groups.join(":");
}

// ==========================================
// 3. SUITE ROUTING CONTROLLER
// ==========================================
export function calculateIPSubnetCalculator(inputs: Record<string, any>): IPSubnetCalculatorOutputs {
  const activeTab = inputs.activeTab || "ipv4";

  if (activeTab === "ipv6") {
    return runIPv6Calculator(inputs);
  }
  if (activeTab === "splitter") {
    return runSubnetSplitter(inputs);
  }
  if (activeTab === "planner") {
    return runSubnetPlanner(inputs);
  }
  if (activeTab === "route_summarizer") {
    return runRouteSummarizer(inputs);
  }

  return runIPv4Calculator(inputs);
}

// ==========================================
// TAB 1: IPv4 Core Subnet Calculator
// ==========================================
function runIPv4Calculator(inputs: Record<string, any>): IPSubnetCalculatorOutputs {
  const rawIp = inputs.ipAddress;
  if (rawIp === undefined || rawIp === null || String(rawIp).trim() === "") {
    return { error: "Please enter an IPv4 host address." };
  }

  const octets = validateIPv4(rawIp);
  if (!octets) {
    return { error: `Invalid IPv4 address "${rawIp}". Must contain 4 decimal octets between 0 and 255 (e.g. 192.168.1.1).` };
  }

  if (inputs.cidr === undefined || inputs.cidr === null || String(inputs.cidr).trim() === "") {
    return { error: "Please specify a CIDR prefix length." };
  }

  const cidrNum = Number(inputs.cidr);
  if (isNaN(cidrNum) || !Number.isInteger(cidrNum) || cidrNum < 0 || cidrNum > 32) {
    return { error: `Invalid CIDR prefix /${inputs.cidr}. Prefix must be an integer between 0 and 32.` };
  }
  const cidr = cidrNum;

  // Validate subnet mask if provided explicitly
  if (inputs.subnetMask) {
    const maskCheck = isValidSubnetMask(inputs.subnetMask);
    if (!maskCheck.valid) {
      return { error: `Invalid non-contiguous or malformed subnet mask "${inputs.subnetMask}". Subnet masks must consist of contiguous binary 1s followed by 0s.` };
    }
  }

  const ipVal = ipToInteger(octets);
  const maskVal = cidrToMaskInt(cidr);
  const wildcardVal = (~maskVal) >>> 0;

  const networkVal = (ipVal & maskVal) >>> 0;
  const broadcastVal = (networkVal | wildcardVal) >>> 0;

  const totalAddresses = Math.pow(2, 32 - cidr);
  const hostBits = 32 - cidr;

  let firstUsableVal: number;
  let lastUsableVal: number;
  let usableHosts: number;

  if (cidr === 32) {
    // /32 is a host route. Total = 1 address.
    firstUsableVal = networkVal;
    lastUsableVal = networkVal;
    usableHosts = 1;
  } else if (cidr === 31) {
    // /31 under RFC 3021: Point-to-point links omit network and broadcast, allowing both addresses for endpoints.
    firstUsableVal = networkVal;
    lastUsableVal = broadcastVal;
    usableHosts = 2;
  } else if (cidr === 0) {
    // /0 internet default route. 4,294,967,296 total addresses.
    firstUsableVal = (networkVal + 1) >>> 0;
    lastUsableVal = (broadcastVal - 1) >>> 0;
    usableHosts = totalAddresses - 2;
  } else {
    firstUsableVal = (networkVal + 1) >>> 0;
    lastUsableVal = (broadcastVal - 1) >>> 0;
    usableHosts = totalAddresses >= 2 ? totalAddresses - 2 : 0;
  }

  const { binaryAddress, binaryMask, networkBitsStr, hostBitsStr } = getBinaryIPRepresentation(octets, cidr);
  const { type: addressType, legacyClass } = classifyIPv4(ipVal);

  const maskOctets = [(maskVal >>> 24) & 255, (maskVal >>> 16) & 255, (maskVal >>> 8) & 255, maskVal & 255];
  const wildcardOctets = [(wildcardVal >>> 24) & 255, (wildcardVal >>> 16) & 255, (wildcardVal >>> 8) & 255, wildcardVal & 255];

  // Next / previous subnet offset calculation
  let nextSubnet = "";
  let prevSubnet = "";
  if (cidr > 0 && cidr < 32) {
    if (networkVal + totalAddresses <= 0xFFFFFFFF) {
      nextSubnet = integerToIP((networkVal + totalAddresses) >>> 0);
    }
    if (networkVal >= totalAddresses) {
      prevSubnet = integerToIP((networkVal - totalAddresses) >>> 0);
    }
  }

  const steps = `IPv4 Subnet Sizing Steps:\n` +
    `1. Input IP: ${rawIp} | Binary: ${octets.map(o => o.toString(2).padStart(8, "0")).join(".")}\n` +
    `2. CIDR Prefix: /${cidr} -> Subnet Mask: ${maskOctets.join(".")}\n` +
    `3. Network ID: IP (${rawIp}) AND Mask (${maskOctets.join(".")}) = ${integerToIP(networkVal)}\n` +
    `4. Broadcast: Network (${integerToIP(networkVal)}) OR Wildcard (${wildcardOctets.join(".")}) = ${integerToIP(broadcastVal)}\n` +
    `5. Host Space: 2^(32 - ${cidr}) = 2^${hostBits} = ${totalAddresses.toLocaleString()} total addresses\n` +
    `6. Usable Hosts: ${cidr === 31 ? "2 (RFC 3021 Point-to-Point)" : cidr === 32 ? "1 (Host Route)" : `${usableHosts.toLocaleString()} (${totalAddresses} - 2)`}`;

  return {
    ipAddress: rawIp,
    cidr,
    subnetMask: maskOctets.join("."),
    wildcardMask: wildcardOctets.join("."),
    networkAddress: integerToIP(networkVal),
    broadcastAddress: integerToIP(broadcastVal),
    firstUsable: integerToIP(firstUsableVal),
    lastUsable: integerToIP(lastUsableVal),
    totalAddresses,
    usableHosts,
    hostBits,
    networkBits: cidr,
    binaryAddress,
    binaryMask,
    addressType,
    legacyClass,
    nextSubnet,
    prevSubnet,
    calculationSteps: steps
  };
}

// ==========================================
// TAB 2: IPv6 Calculator
// ==========================================
function runIPv6Calculator(inputs: Record<string, any>): IPSubnetCalculatorOutputs {
  const rawIp = inputs.ipv6Address;
  if (rawIp === undefined || rawIp === null || String(rawIp).trim() === "") {
    return { error: "Please enter an IPv6 address." };
  }

  const expanded = expandIPv6(rawIp);
  if (!expanded) {
    return { error: `Invalid IPv6 address "${rawIp}". Ensure standard 8-group hexadecimal notation or valid "::" compression.` };
  }

  if (inputs.ipv6Prefix === undefined || inputs.ipv6Prefix === null || String(inputs.ipv6Prefix).trim() === "") {
    return { error: "Please specify an IPv6 prefix length." };
  }

  const prefixNum = Number(inputs.ipv6Prefix);
  if (isNaN(prefixNum) || !Number.isInteger(prefixNum) || prefixNum < 0 || prefixNum > 128) {
    return { error: `Invalid IPv6 prefix length /${inputs.ipv6Prefix}. Must be an integer between 0 and 128.` };
  }
  const prefix = prefixNum;

  const compressed = compressIPv6(expanded) || expanded;
  const addressType = getIPv6Type(expanded);

  // Exact 128-bit BigInt math
  const ipBigInt = ipv6ToBigInt(expanded);
  const hostBitsBigInt = BigInt(128 - prefix);
  
  // Calculate network prefix address by zeroing the host/interface bits
  const maskBigInt = prefix === 0 
    ? 0n 
    : prefix === 128 
      ? (BigInt("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF")) 
      : ((BigInt("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF") >> hostBitsBigInt) << hostBitsBigInt);
  
  const netBigInt = ipBigInt & maskBigInt;
  const netExpanded = bigIntToIPv6(netBigInt);
  const netCompressed = compressIPv6(netExpanded) || netExpanded;
  const networkPrefixStr = `${netCompressed}/${prefix}`;

  // Total addresses in prefix: 2^(128 - prefix)
  const totalAddressesBigInt = 1n << hostBitsBigInt;
  const countString = totalAddressesBigInt.toLocaleString();

  // Extract interface identifier
  const interfaceMask = prefix === 128 ? 0n : (1n << hostBitsBigInt) - 1n;
  const interfaceVal = ipBigInt & interfaceMask;
  const interfaceExpanded = bigIntToIPv6(interfaceVal);
  const interfaceCompressed = compressIPv6(interfaceExpanded) || interfaceExpanded;

  const steps = `IPv6 Network Calculation Steps:\n` +
    `1. Input IPv6: ${rawIp}\n` +
    `2. Normalized Expanded form: ${expanded}\n` +
    `3. Compressed Canonical form (RFC 5952): ${compressed}\n` +
    `4. Network Prefix: /${prefix} -> Network Block: ${networkPrefixStr}\n` +
    `5. Interface Bits: ${128 - prefix} bits (Identifier: ${interfaceCompressed})\n` +
    `6. Address Space: 2^(128 - ${prefix}) = 2^${128 - prefix} = ${countString} addresses\n` +
    `7. Addressing Semantics: IPv6 uses Multicast for discovery; broadcast addresses are not used.`;

  return {
    ipv6Expanded: expanded,
    ipv6Compressed: compressed,
    ipv6NetworkPrefix: networkPrefixStr,
    ipv6InterfaceBits: interfaceCompressed,
    ipv6AddressCountString: countString,
    addressType,
    calculationSteps: steps
  };
}

// ==========================================
// TAB 3: Subnet Splitter / Enumerator
// ==========================================
function runSubnetSplitter(inputs: Record<string, any>): any {
  const baseIp = inputs.splitterBaseIp;
  if (!baseIp || String(baseIp).trim() === "") {
    return { error: "Please enter a base network IP address." };
  }

  const octets = validateIPv4(baseIp);
  if (!octets) {
    return { error: `Invalid base IP address "${baseIp}".` };
  }

  const baseCidrNum = Number(inputs.splitterBaseCidr);
  if (isNaN(baseCidrNum) || !Number.isInteger(baseCidrNum) || baseCidrNum < 0 || baseCidrNum > 32) {
    return { error: "Base CIDR prefix must be an integer between 0 and 32." };
  }

  const targetCidrNum = Number(inputs.splitterTargetCidr);
  if (isNaN(targetCidrNum) || !Number.isInteger(targetCidrNum) || targetCidrNum < 0 || targetCidrNum > 32) {
    return { error: "Target split CIDR must be an integer between 0 and 32." };
  }

  if (targetCidrNum < baseCidrNum) {
    return { error: `Target split prefix (/${targetCidrNum}) must be greater than or equal to the base network prefix (/${baseCidrNum}).` };
  }

  const baseInt = ipToInteger(octets);
  const baseMask = cidrToMaskInt(baseCidrNum);
  const networkInt = (baseInt & baseMask) >>> 0;
  const normalizedBaseIp = integerToIP(networkInt);

  const borrowedBits = targetCidrNum - baseCidrNum;
  const numSubnets = Math.pow(2, borrowedBits);
  const subnetSize = Math.pow(2, 32 - targetCidrNum);

  const list: SubnetListItem[] = [];
  // Safe bound: cap rendered DOM elements to 128 subnets to prevent browser lockup
  const renderLimit = Math.min(numSubnets, 128);

  for (let i = 0; i < renderLimit; i++) {
    const netVal = (networkInt + i * subnetSize) >>> 0;
    const broadcastVal = (netVal + subnetSize - 1) >>> 0;

    let firstUsableVal: number;
    let lastUsableVal: number;
    let usableHosts: number;

    if (targetCidrNum === 31) {
      firstUsableVal = netVal;
      lastUsableVal = broadcastVal;
      usableHosts = 2;
    } else if (targetCidrNum === 32) {
      firstUsableVal = netVal;
      lastUsableVal = netVal;
      usableHosts = 1;
    } else {
      firstUsableVal = (netVal + 1) >>> 0;
      lastUsableVal = (broadcastVal - 1) >>> 0;
      usableHosts = subnetSize >= 2 ? subnetSize - 2 : 0;
    }

    list.push({
      subnetIndex: i + 1,
      networkAddress: integerToIP(netVal),
      cidr: targetCidrNum,
      firstUsable: integerToIP(firstUsableVal),
      lastUsable: integerToIP(lastUsableVal),
      broadcastAddress: integerToIP(broadcastVal),
      totalAddresses: subnetSize,
      usableHosts
    });
  }

  const usablePerSubnet = targetCidrNum === 31 ? 2 : targetCidrNum === 32 ? 1 : Math.max(0, subnetSize - 2);

  return {
    subnetList: list,
    totalAddresses: numSubnets,
    usableHosts: usablePerSubnet,
    calculationSteps: `Subnet Splitter Execution Plan:\n` +
      `- Base Allocation: ${normalizedBaseIp}/${baseCidrNum}${normalizedBaseIp !== baseIp ? ` (normalized from ${baseIp})` : ""}\n` +
      `- Target Prefix: /${targetCidrNum}\n` +
      `- Borrowed Bits: ${borrowedBits} (${targetCidrNum} - ${baseCidrNum})\n` +
      `- Subnets Generated: 2^${borrowedBits} = ${numSubnets.toLocaleString()} blocks\n` +
      `- Subnet Block Size: 2^${32 - targetCidrNum} = ${subnetSize.toLocaleString()} addresses (${usablePerSubnet.toLocaleString()} usable)\n` +
      `- Displayed Subnets: ${renderLimit.toLocaleString()} of ${numSubnets.toLocaleString()}${numSubnets > renderLimit ? ` (first ${renderLimit} displayed for responsiveness)` : ""}`
  };
}

// ==========================================
// TAB 4: Subnet Planner (Hosts)
// ==========================================
function runSubnetPlanner(inputs: Record<string, any>): any {
  const baseIp = inputs.plannerBaseIp;
  if (!baseIp || String(baseIp).trim() === "") {
    return { error: "Please enter a base network IP address for planning." };
  }

  const octets = validateIPv4(baseIp);
  if (!octets) {
    return { error: `Invalid base IP address "${baseIp}".` };
  }

  if (inputs.plannerRequiredHosts === undefined || inputs.plannerRequiredHosts === null || String(inputs.plannerRequiredHosts).trim() === "") {
    return { error: "Please enter the required number of host addresses." };
  }

  const requiredHosts = Number(inputs.plannerRequiredHosts);
  if (isNaN(requiredHosts) || !Number.isInteger(requiredHosts) || requiredHosts < 1) {
    return { error: "Required host capacity must be a positive integer (minimum 1)." };
  }

  if (requiredHosts > 4294967294) {
    return { error: "Required hosts exceed total 32-bit IPv4 address space capacity." };
  }

  // Find smallest CIDR prefix (highest prefix number) where usable hosts >= requiredHosts
  let targetCidr = -1;
  for (let p = 30; p >= 0; p--) {
    const size = Math.pow(2, 32 - p);
    const usable = size - 2;
    if (usable >= requiredHosts) {
      targetCidr = p;
      break;
    }
  }

  if (targetCidr === -1) {
    return { error: "Required host capacity exceeds maximum single subnet capacity." };
  }

  const baseInt = ipToInteger(octets);
  const maskVal = cidrToMaskInt(targetCidr);
  const wildcardVal = (~maskVal) >>> 0;
  const networkVal = (baseInt & maskVal) >>> 0;
  const broadcastVal = (networkVal | wildcardVal) >>> 0;

  const totalAddresses = Math.pow(2, 32 - targetCidr);
  const usableHosts = totalAddresses - 2;

  return {
    plannerCidr: targetCidr,
    plannerUsableHosts: usableHosts,
    networkAddress: integerToIP(networkVal),
    broadcastAddress: integerToIP(broadcastVal),
    firstUsable: integerToIP((networkVal + 1) >>> 0),
    lastUsable: integerToIP((broadcastVal - 1) >>> 0),
    calculationSteps: `Subnet Capacity Planning Summary:\n` +
      `- Required Host Capacity: ${requiredHosts.toLocaleString()} host interfaces\n` +
      `- Optimal CIDR Allocation: /${targetCidr} (${CIDR_MASKS[targetCidr]})\n` +
      `- Usable Host Capacity: ${usableHosts.toLocaleString()} hosts (Total addresses: ${totalAddresses.toLocaleString()})\n` +
      `- Network Boundary: ${integerToIP(networkVal)}/${targetCidr}\n` +
      `- Usable IP Range: ${integerToIP((networkVal + 1) >>> 0)} to ${integerToIP((broadcastVal - 1) >>> 0)}\n` +
      `- Broadcast Address: ${integerToIP(broadcastVal)}`
  };
}

// ==========================================
// TAB 5: Route Summarizer (Aggregation)
// ==========================================
function runRouteSummarizer(inputs: Record<string, any>): any {
  const rawNetworks = inputs.summarizerNetworksString;
  if (!rawNetworks || String(rawNetworks).trim() === "") {
    return { error: "Please enter at least one route block to summarize." };
  }

  const lines = String(rawNetworks).split(/[\n,]/).map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) {
    return { error: "Please enter at least one route block to summarize." };
  }

  const blocks: { original: string; normalizedNet: number; cidr: number; networkStr: string; endIp: number }[] = [];
  
  for (const line of lines) {
    const parts = line.split("/");
    if (parts.length !== 2) {
      return { error: `Invalid route format "${line}". Specify network with CIDR prefix (e.g. 10.0.0.0/24).` };
    }
    const octets = validateIPv4(parts[0]);
    if (!octets) {
      return { error: `Invalid IP address in route "${line}".` };
    }
    const cidrNum = Number(parts[1]);
    if (isNaN(cidrNum) || !Number.isInteger(cidrNum) || cidrNum < 0 || cidrNum > 32) {
      return { error: `Invalid CIDR prefix in route "${line}". Must be between 0 and 32.` };
    }
    const ipVal = ipToInteger(octets);
    const mask = cidrToMaskInt(cidrNum);
    const netVal = (ipVal & mask) >>> 0;
    const size = Math.pow(2, 32 - cidrNum);
    const endIp = (netVal + size - 1) >>> 0;

    blocks.push({
      original: line,
      normalizedNet: netVal,
      cidr: cidrNum,
      networkStr: integerToIP(netVal),
      endIp
    });
  }

  // Find minimum start IP and maximum end IP across all route blocks
  let minIp = blocks[0].normalizedNet;
  let maxIp = blocks[0].endIp;
  for (let i = 1; i < blocks.length; i++) {
    if (blocks[i].normalizedNet < minIp) minIp = blocks[i].normalizedNet;
    if (blocks[i].endIp > maxIp) maxIp = blocks[i].endIp;
  }

  // Find the shortest common prefix covering both minIp and maxIp
  let diff = minIp ^ maxIp;
  let commonCidr = 0;
  if (diff === 0) {
    // Exactly one route or all routes identical
    commonCidr = blocks[0].cidr;
  } else {
    commonCidr = Math.clz32(diff);
  }

  // Ensure summarized CIDR does not exceed the smallest individual CIDR
  const minInputCidr = Math.min(...blocks.map(b => b.cidr));
  if (commonCidr > minInputCidr) {
    commonCidr = minInputCidr;
  }

  const supernetMask = cidrToMaskInt(commonCidr);
  const supernetIpVal = (minIp & supernetMask) >>> 0;
  const supernetIp = integerToIP(supernetIpVal);
  const supernetBlock = `${supernetIp}/${commonCidr}`;

  // Check if aggregation is exact/minimal contiguous
  const supernetSize = Math.pow(2, 32 - commonCidr);
  let totalInputAddresses = 0;
  // Deduplicate overlapping input blocks to compute true input coverage
  blocks.sort((a, b) => a.normalizedNet - b.normalizedNet);
  let coveredUntil = 0;
  let hasOverlap = false;

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (i > 0 && b.normalizedNet <= blocks[i - 1].endIp) {
      hasOverlap = true;
    }
    const effStart = Math.max(b.normalizedNet, coveredUntil);
    if (b.endIp >= effStart) {
      totalInputAddresses += (b.endIp - effStart + 1);
      coveredUntil = b.endIp + 1;
    }
  }

  const isExactAggregate = (totalInputAddresses === supernetSize);

  const steps = `Route Summarization Output:\n` +
    `- Analyzed ${blocks.length} route block(s):\n` +
    blocks.map(b => `  • ${b.networkStr}/${b.cidr} (Span: ${b.networkStr} - ${integerToIP(b.endIp)})`).join("\n") + "\n" +
    `- Smallest Enclosing Common Prefix: /${commonCidr}\n` +
    `- Aggregated Supernet Route: ${supernetBlock}\n` +
    `- Supernet Address Span: ${supernetIp} to ${integerToIP((supernetIpVal + supernetSize - 1) >>> 0)} (${supernetSize.toLocaleString()} addresses)\n` +
    `- Input Routes Total Capacity: ${totalInputAddresses.toLocaleString()} addresses\n` +
    `- Aggregation Nature: ${isExactAggregate ? "Exact Minimal Supernet (100% efficient coverage)" : "Broad Aggregate (covers intermediate/unallocated subnets)"}` +
    (hasOverlap ? `\n- Note: Overlapping route entries detected in input.` : "");

  return {
    summarizedBlock: supernetBlock,
    summarizerIsContiguous: isExactAggregate,
    calculationSteps: steps
  };
}
