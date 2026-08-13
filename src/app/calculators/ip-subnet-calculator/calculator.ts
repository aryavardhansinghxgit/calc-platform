import { IPSubnetCalculatorOutputs, SubnetListItem } from "./types";

// ==========================================
// 1. IPv4 MATH HELPER UTILITIES
// ==========================================
function validateIPv4(ip: any): number[] | null {
  if (ip === undefined || ip === null) return null;
  const s = String(ip).trim();
  const parts = s.split(".");
  if (parts.length !== 4) return null;
  const octets = [];
  for (const part of parts) {
    const val = Number(part);
    if (isNaN(val) || val < 0 || val > 255 || !Number.isInteger(val) || part === "") {
      return null;
    }
    octets.push(val);
  }
  return octets;
}

function ipToInteger(octets: number[]): number {
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
  if (cidr === 0) return 0;
  return (0xFFFFFFFF << (32 - cidr)) >>> 0;
}

function maskIntToCidr(mask: number): number {
  let count = 0;
  let temp = mask >>> 0;
  while (temp & 0x80000000) {
    count++;
    temp = (temp << 1) >>> 0;
  }
  return count;
}

function getBinaryIPRepresentation(octets: number[], cidr: number): { binaryAddress: string; binaryMask: string } {
  const ipBin = octets.map(o => o.toString(2).padStart(8, "0")).join(".");
  const maskInt = cidrToMaskInt(cidr);
  const maskOctets = [(maskInt >>> 24) & 255, (maskInt >>> 16) & 255, (maskInt >>> 8) & 255, maskInt & 255];
  const maskBin = maskOctets.map(o => o.toString(2).padStart(8, "0")).join(".");

  // Apply a visual marker at the CIDR boundary (excluding dots)
  // Let's build a visual representation of host vs network bits
  const flatIp = ipBin.replace(/\./g, "");
  const flatMask = maskBin.replace(/\./g, "");
  
  const netPart = flatIp.substring(0, cidr);
  const hostPart = flatIp.substring(cidr);

  // Re-insert dots for readability
  const insertDots = (str: string, offset: number) => {
    let result = "";
    for (let i = 0; i < str.length; i++) {
      if (i > 0 && (i + offset) % 8 === 0) result += ".";
      result += str[i];
    }
    return result;
  };

  const finalIPVisual = insertDots(netPart, 0) + " | " + insertDots(hostPart, netPart.length);

  return {
    binaryAddress: finalIPVisual,
    binaryMask: maskBin
  };
}

function classifyIPv4(ipVal: number): { type: string; legacyClass: string } {
  // Legacy Classful classification
  let legacyClass = "Class A";
  if (ipVal >= 0x80000000 && ipVal < 0xC0000000) legacyClass = "Class B";
  else if (ipVal >= 0xC0000000 && ipVal < 0xE0000000) legacyClass = "Class C";
  else if (ipVal >= 0xE0000000 && ipVal < 0xF0000000) legacyClass = "Class D (Multicast)";
  else if (ipVal >= 0xF0000000) legacyClass = "Class E (Reserved)";

  // Scope validation
  let type = "Public Unicast";
  
  // Private Subnets
  const A_start = ipToInteger([10, 0, 0, 0]);
  const A_end = ipToInteger([10, 255, 255, 255]);
  const B_start = ipToInteger([172, 16, 0, 0]);
  const B_end = ipToInteger([172, 31, 255, 255]);
  const C_start = ipToInteger([192, 168, 0, 0]);
  const C_end = ipToInteger([192, 168, 255, 255]);

  if ((ipVal >= A_start && ipVal <= A_end) || (ipVal >= B_start && ipVal <= B_end) || (ipVal >= C_start && ipVal <= C_end)) {
    type = "Private Network (RFC 1918)";
  } else if (ipVal >= ipToInteger([127, 0, 0, 0]) && ipVal <= ipToInteger([127, 255, 255, 255])) {
    type = "Loopback Address";
  } else if (ipVal >= ipToInteger([169, 254, 0, 0]) && ipVal <= ipToInteger([169, 254, 255, 255])) {
    type = "Link-Local Address (APIPA)";
  } else if (ipVal >= ipToInteger([224, 0, 0, 0]) && ipVal <= ipToInteger([239, 255, 255, 255])) {
    type = "Multicast Address Group";
  } else if (ipVal >= ipToInteger([240, 0, 0, 0])) {
    type = "Special-Use Reserved Range";
  }

  return { type, legacyClass };
}

// ==========================================
// 2. IPv6 ENGINE UTILITY FUNCTIONS
// ==========================================
export function expandIPv6(ip: any): string | null {
  if (ip === undefined || ip === null) return null;
  let cleaned = String(ip).trim().toLowerCase();
  
  // Loopback shortcuts
  if (cleaned === "::1") {
    return "0000:0000:0000:0000:0000:0000:0000:0001";
  }
  if (cleaned === "::") {
    return "0000:0000:0000:0000:0000:0000:0000:0000";
  }

  // Count the double colon double placeholder
  const dblColonCount = (cleaned.match(/::/g) || []).length;
  if (dblColonCount > 1) return null; // invalid syntax

  if (dblColonCount === 1) {
    const parts = cleaned.split("::");
    const leftParts = parts[0] ? parts[0].split(":") : [];
    const rightParts = parts[1] ? parts[1].split(":") : [];
    
    const missingCount = 8 - (leftParts.length + rightParts.length);
    const middleParts = Array(missingCount).fill("0000");
    
    const expandedParts = [...leftParts, ...middleParts, ...rightParts];
    cleaned = expandedParts.join(":");
  }

  const finalParts = cleaned.split(":");
  if (finalParts.length !== 8) return null;

  for (let i = 0; i < 8; i++) {
    const part = finalParts[i];
    if (part.length > 4 || !/^[0-9a-f]*$/.test(part)) return null;
    finalParts[i] = part.padStart(4, "0");
  }

  return finalParts.join(":");
}

export function compressIPv6(ip: string): string | null {
  const expanded = expandIPv6(ip);
  if (!expanded) return null;

  const parts = expanded.split(":");
  const trimmedParts = parts.map(p => p.replace(/^0+/, "") || "0");

  // Locate the longest sequence of contiguous "0" parts to compress using ::
  let maxZeroStart = -1;
  let maxZeroLen = 0;
  let currentZeroStart = -1;
  let currentZeroLen = 0;

  for (let i = 0; i < 8; i++) {
    if (trimmedParts[i] === "0") {
      if (currentZeroStart === -1) {
        currentZeroStart = i;
      }
      currentZeroLen++;
      if (currentZeroLen > maxZeroLen) {
        maxZeroLen = currentZeroLen;
        maxZeroStart = currentZeroStart;
      }
    } else {
      currentZeroStart = -1;
      currentZeroLen = 0;
    }
  }

  if (maxZeroLen > 1) {
    const before = trimmedParts.slice(0, maxZeroStart).join(":");
    const after = trimmedParts.slice(maxZeroStart + maxZeroLen).join(":");
    return `${before}::${after}`;
  }

  return trimmedParts.join(":");
}

function getIPv6Type(ip: string): string {
  const expanded = expandIPv6(ip);
  if (!expanded) return "Unknown";

  if (expanded === "0000:0000:0000:0000:0000:0000:0000:0001") return "Loopback";
  if (expanded === "0000:0000:0000:0000:0000:0000:0000:0000") return "Unspecified";
  if (expanded.startsWith("fe80")) return "Link-Local Unicast";
  if (expanded.startsWith("fc00") || expanded.startsWith("fd00")) return "Unique Local Unicast (ULA)";
  if (expanded.startsWith("ff")) return "Multicast Group";
  if (expanded.startsWith("2001:0db8")) return "Documentation Range";
  
  return "Global Unicast";
}

// ==========================================
// 3. SUITE ROUTING CONTROLLER
// ==========================================
export function calculateIPSubnetCalculator(inputs: Record<string, any>): any {
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

  // DEFAULT TAB: IPv4 Core Calculator
  return runIPv4Calculator(inputs);
}

// ==========================================
// TAB 1: IPv4 Core Subnet Calculator
// ==========================================
function runIPv4Calculator(inputs: Record<string, any>): IPSubnetCalculatorOutputs {
  const rawIp = inputs.ipAddress || "192.168.1.1";
  const cidr = Math.min(32, Math.max(0, Number(inputs.cidr) !== undefined ? Number(inputs.cidr) : 24));

  const octets = validateIPv4(rawIp);
  if (!octets) {
    return { error: "Invalid IPv4 address format. Use dotted-decimal format (e.g. 192.168.1.1)." } as any;
  }

  const ipVal = ipToInteger(octets);
  const maskVal = cidrToMaskInt(cidr);
  const wildcardVal = ~maskVal >>> 0;

  const networkVal = (ipVal & maskVal) >>> 0;
  const broadcastVal = (networkVal | wildcardVal) >>> 0;

  // usable range definitions (handling /31 and /32 point-to-point networks)
  let firstUsableVal = (networkVal + 1) >>> 0;
  let lastUsableVal = (broadcastVal - 1) >>> 0;
  let totalAddresses = Math.pow(2, 32 - cidr);
  let usableHosts = totalAddresses >= 2 ? totalAddresses - 2 : 0;

  if (cidr === 31) {
    firstUsableVal = networkVal;
    lastUsableVal = broadcastVal;
    usableHosts = 2; // Point-to-Point links
  } else if (cidr === 32) {
    firstUsableVal = networkVal;
    lastUsableVal = broadcastVal;
    usableHosts = 1; // Host route
  }

  const { binaryAddress, binaryMask } = getBinaryIPRepresentation(octets, cidr);
  const { type: addressType, legacyClass: legacyClass } = classifyIPv4(ipVal);

  // Compute Next & Previous subnets offsets
  const subnetSize = Math.pow(2, 32 - cidr);
  let nextSubnet = "";
  let prevSubnet = "";

  if (cidr > 0 && cidr < 32) {
    // avoid overflow/underflow wrapping bounds
    const nextNetVal = (networkVal + subnetSize) >>> 0;
    const prevNetVal = (networkVal - subnetSize) >>> 0;
    nextSubnet = integerToIP(nextNetVal);
    prevSubnet = integerToIP(prevNetVal);
  }

  const maskOctets = [(maskVal >>> 24) & 255, (maskVal >>> 16) & 255, (maskVal >>> 8) & 255, maskVal & 255];
  const wildcardOctets = [(wildcardVal >>> 24) & 255, (wildcardVal >>> 16) & 255, (wildcardVal >>> 8) & 255, wildcardVal & 255];

  const steps = `IPv4 Subnet Sizing Steps:\n` +
    `1. IP Address: ${rawIp} | Binary: ${octets.map(o => o.toString(2).padStart(8, "0")).join(".")}\n` +
    `2. CIDR Prefix: /${cidr} -> Subnet Mask: ${maskOctets.join(".")}\n` +
    `3. Network ID: IP AND MASK = ${integerToIP(networkVal)}\n` +
    `4. Broadcast: Network OR WILDCARD = ${integerToIP(broadcastVal)}\n` +
    `5. Host space count = 2^(32 - ${cidr}) = ${totalAddresses} addresses`;

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
    hostBits: 32 - cidr,
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
  const rawIp = inputs.ipv6Address || "2001:db8::1";
  const prefix = Math.min(128, Math.max(0, Number(inputs.ipv6Prefix) !== undefined ? Number(inputs.ipv6Prefix) : 64));

  const expanded = expandIPv6(rawIp);
  if (!expanded) {
    return { error: "Invalid IPv6 address format. Enter standard compressed or expanded hexadecimals." } as any;
  }

  const compressed = compressIPv6(expanded) || expanded;
  const addressType = getIPv6Type(expanded);

  // Determine network prefix
  // Slice expanded address into hex groups matching the prefix length
  const hexParts = expanded.replace(/:/g, ""); // 32 hex chars
  const hexBoundary = Math.ceil(prefix / 4);
  const netHex = hexParts.substring(0, hexBoundary).padEnd(32, "0");
  
  // Format network prefix back to groups
  const formattedNetParts = [];
  for (let i = 0; i < 8; i++) {
    formattedNetParts.push(netHex.substring(i * 4, i * 4 + 4));
  }
  const networkPrefixExp = formattedNetParts.join(":");
  const networkPrefix = compressIPv6(networkPrefixExp) + "/" + prefix;

  // Display address count
  // 2^(128 - prefix)
  const remainingBits = 128 - prefix;
  let countString = "";
  if (remainingBits >= 64) {
    countString = `2^${remainingBits} (${Math.pow(2, 64).toExponential(3)} approx.)`;
    if (remainingBits === 64) countString = "18,446,744,073,709,551,616 (2^64)";
  } else {
    countString = Math.pow(2, remainingBits).toLocaleString();
  }

  // Extract interface identifier
  const interfaceHex = hexParts.substring(hexBoundary).padStart(32 - hexBoundary, "0");
  const interfaceFormattedParts = [];
  const interfaceBlocks = Math.ceil((128 - prefix) / 16);
  for (let i = 0; i < interfaceBlocks; i++) {
    interfaceFormattedParts.push(interfaceHex.substring(i * 4, i * 4 + 4) || "0000");
  }
  const interfaceId = interfaceFormattedParts.join(":");

  const steps = `IPv6 Network Calculation Steps:\n` +
    `1. Input IPv6: ${rawIp}\n` +
    `2. Normalized Expanded form: ${expanded}\n" +
    "3. Compressed Canonical form: ${compressed}\n` +
    `4. Split point: Prefix size /${prefix} leaving ${remainingBits} host interface bits.\n` +
    `5. NetPrefix block size: ${countString} individual IP nodes.`;

  return {
    ipv6Expanded: expanded,
    ipv6Compressed: compressed,
    ipv6NetworkPrefix: networkPrefix,
    ipv6InterfaceBits: interfaceId || "::",
    ipv6AddressCountString: countString,
    addressType,
    calculationSteps: steps
  };
}

// ==========================================
// TAB 3: Subnet Splitter / Enumerator
// ==========================================
function runSubnetSplitter(inputs: Record<string, any>): any {
  const baseIp = inputs.splitterBaseIp || "192.168.1.0";
  const baseCidr = Math.min(32, Math.max(0, Number(inputs.splitterBaseCidr) || 24));
  const targetCidr = Math.min(32, Math.max(0, Number(inputs.splitterTargetCidr) || 26));

  if (targetCidr < baseCidr) {
    return { error: "Target split prefix size must be larger than or equal to the base network prefix size." };
  }

  const octets = validateIPv4(baseIp);
  if (!octets) {
    return { error: "Invalid base IP address format." };
  }

  const baseInt = ipToInteger(octets);
  const baseMask = cidrToMaskInt(baseCidr);
  const networkInt = (baseInt & baseMask) >>> 0;

  const borrowedBits = targetCidr - baseCidr;
  const numSubnets = Math.pow(2, borrowedBits);
  const subnetSize = Math.pow(2, 32 - targetCidr);

  const list: SubnetListItem[] = [];
  // Limit output count to prevent locking the browser UI thread
  const limitCount = Math.min(numSubnets, 128);

  for (let i = 0; i < limitCount; i++) {
    const netVal = (networkInt + i * subnetSize) >>> 0;
    const broadcastVal = (netVal + subnetSize - 1) >>> 0;

    let firstUsableVal = (netVal + 1) >>> 0;
    let lastUsableVal = (broadcastVal - 1) >>> 0;
    let usableHosts = subnetSize >= 2 ? subnetSize - 2 : 0;

    if (targetCidr === 31) {
      firstUsableVal = netVal;
      lastUsableVal = broadcastVal;
      usableHosts = 2;
    } else if (targetCidr === 32) {
      firstUsableVal = netVal;
      lastUsableVal = broadcastVal;
      usableHosts = 1;
    }

    list.push({
      subnetIndex: i + 1,
      networkAddress: integerToIP(netVal),
      cidr: targetCidr,
      firstUsable: integerToIP(firstUsableVal),
      lastUsable: integerToIP(lastUsableVal),
      broadcastAddress: integerToIP(broadcastVal),
      totalAddresses: subnetSize,
      usableHosts
    });
  }

  return {
    subnetList: list,
    totalAddresses: numSubnets, // using this field to pass total subnets count
    usableHosts: subnetSize - 2, // using this for host size per block
    calculationSteps: `Splitter Plan:\n` +
      `- Base Subnet: ${baseIp}/${baseCidr}\n` +
      `- New CIDR size: /${targetCidr}\n` +
      `- Borrowed bits: ${borrowedBits} (${numSubnets} target networks generated)\n` +
      `- Total subnets listed here: ${limitCount} of ${numSubnets}`
  };
}

// ==========================================
// TAB 4: Subnet Planner (Hosts)
// ==========================================
function runSubnetPlanner(inputs: Record<string, any>): any {
  const baseIp = inputs.plannerBaseIp || "192.168.1.0";
  const requiredHosts = Math.max(1, Number(inputs.plannerRequiredHosts) || 1);

  const octets = validateIPv4(baseIp);
  if (!octets) {
    return { error: "Invalid base IP address." };
  }

  // Find smallest CIDR prefix
  // 2^(32 - P) - 2 >= requiredHosts
  let targetCidr = 32;
  for (let p = 32; p >= 0; p--) {
    const size = Math.pow(2, 32 - p);
    const usable = size >= 2 ? size - 2 : size;
    if (usable >= requiredHosts) {
      targetCidr = p;
      break;
    }
  }

  const baseInt = ipToInteger(octets);
  const maskVal = cidrToMaskInt(targetCidr);
  const wildcardVal = ~maskVal >>> 0;
  const networkVal = (baseInt & maskVal) >>> 0;
  const broadcastVal = (networkVal | wildcardVal) >>> 0;

  const totalAddresses = Math.pow(2, 32 - targetCidr);
  const usableHosts = totalAddresses >= 2 ? totalAddresses - 2 : totalAddresses;

  return {
    plannerCidr: targetCidr,
    plannerUsableHosts: usableHosts,
    networkAddress: integerToIP(networkVal),
    broadcastAddress: integerToIP(broadcastVal),
    firstUsable: integerToIP((networkVal + 1) >>> 0),
    lastUsable: integerToIP((broadcastVal - 1) >>> 0),
    calculationSteps: `Planning Summary:\n` +
      `- Required host space size: ${requiredHosts} nodes\n` +
      `- Smallest compatible network prefix: /${targetCidr} (yielding ${usableHosts} usable IP slots)\n` +
      `- Network Address block allocation: ${integerToIP(networkVal)}/${targetCidr}\n` +
      `- Allocation Usable Host Range: ${integerToIP((networkVal + 1) >>> 0)} - ${integerToIP((broadcastVal - 1) >>> 0)}`
  };
}

// ==========================================
// TAB 5: Route Summarizer (Aggregation)
// ==========================================
function runRouteSummarizer(inputs: Record<string, any>): any {
  const rawNetworks = inputs.summarizerNetworksString || "192.168.0.0/24\n192.168.1.0/24";
  const lines = rawNetworks.split(/[\n,]/).map((l: string) => l.trim()).filter(Boolean);

  if (lines.length === 0) {
    return { error: "Please enter at least one IP network to aggregate." };
  }

  const blocks: { ipVal: number; cidr: number }[] = [];
  for (const line of lines) {
    const parts = line.split("/");
    const octets = validateIPv4(parts[0]);
    if (!octets) {
      return { error: `Invalid network IP address format: ${line}` };
    }
    const cidr = parts[1] !== undefined ? Math.min(32, Math.max(0, Number(parts[1]))) : 24;
    blocks.push({ ipVal: ipToInteger(octets), cidr });
  }

  // Find the common bits of all addresses starting from the MSB
  let commonMask = 0xFFFFFFFF;
  const firstBlock = blocks[0].ipVal;
  
  for (let i = 1; i < blocks.length; i++) {
    const diff = firstBlock ^ blocks[i].ipVal;
    if (diff !== 0) {
      // Find position of the highest set bit in diff (0 to 31)
      const leadingZeros = Math.clz32(diff);
      const maskVal = (0xFFFFFFFF << (32 - leadingZeros)) >>> 0;
      commonMask = (commonMask & maskVal) >>> 0;
    }
  }

  // The common prefix length cannot be larger than the smallest individual network prefix input
  const maxAllowedCidr = Math.min(...blocks.map(b => b.cidr));
  let summarizedCidr = maskIntToCidr(commonMask);
  if (summarizedCidr > maxAllowedCidr) {
    summarizedCidr = maxAllowedCidr;
  }

  const summarizedIp = integerToIP((firstBlock & cidrToMaskInt(summarizedCidr)) >>> 0);

  return {
    summarizedBlock: `${summarizedIp}/${summarizedCidr}`,
    calculationSteps: `Route Summarization Output:\n` +
      `- Parsed ${blocks.length} subnets successfully.\n` +
      `- Identified common network address prefix bits length = ${summarizedCidr}\n` +
      `- Generated Aggregated Supernet Block: ${summarizedIp}/${summarizedCidr}`
  };
}
