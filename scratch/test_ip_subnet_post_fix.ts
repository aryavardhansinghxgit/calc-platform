import {
  calculateIPSubnetCalculator,
  expandIPv6,
  compressIPv6,
  integerToIP,
  ipToInteger,
  validateIPv4,
  cidrToMaskInt,
  isValidSubnetMask,
  classifyIPv4,
  getBinaryIPRepresentation,
  CIDR_MASKS,
  ipv6ToBigInt,
  bigIntToIPv6
} from "../src/app/calculators/ip-subnet-calculator/calculator";

// ==========================================
// INDEPENDENT MATHEMATICAL ORACLE
// ==========================================

class IndependentIPv4Oracle {
  static ipToInt(ip: string): number {
    const parts = ip.split(".").map(Number);
    return ((parts[0] << 24) + (parts[1] << 16) + (parts[2] << 8) + parts[3]) >>> 0;
  }

  static intToIp(val: number): string {
    return [
      (val >>> 24) & 255,
      (val >>> 16) & 255,
      (val >>> 8) & 255,
      val & 255
    ].join(".");
  }

  static getMask(cidr: number): number {
    if (cidr === 0) return 0;
    return (0xFFFFFFFF << (32 - cidr)) >>> 0;
  }

  static getWildcard(mask: number): number {
    return (~mask) >>> 0;
  }

  static calculate(ip: string, cidr: number) {
    const ipInt = this.ipToInt(ip);
    const mask = this.getMask(cidr);
    const wildcard = this.getWildcard(mask);
    const network = (ipInt & mask) >>> 0;
    const broadcast = (network | wildcard) >>> 0;
    const hostBits = 32 - cidr;
    const total = Math.pow(2, hostBits);

    let usable = total >= 2 ? total - 2 : 0;
    let first = (network + 1) >>> 0;
    let last = (broadcast - 1) >>> 0;

    if (cidr === 31) {
      usable = 2;
      first = network;
      last = broadcast;
    } else if (cidr === 32) {
      usable = 1;
      first = network;
      last = network;
    }

    return {
      networkStr: this.intToIp(network),
      broadcastStr: this.intToIp(broadcast),
      maskStr: this.intToIp(mask),
      wildcardStr: this.intToIp(wildcard),
      firstStr: this.intToIp(first),
      lastStr: this.intToIp(last),
      total,
      usable,
      hostBits,
      networkInt: network,
      broadcastInt: broadcast
    };
  }
}

class IndependentIPv6Oracle {
  static prefixToBigIntMask(prefix: number): bigint {
    if (prefix === 0) return 0n;
    if (prefix === 128) return (1n << 128n) - 1n;
    const hostBits = BigInt(128 - prefix);
    return ((1n << 128n) - 1n) ^ ((1n << hostBits) - 1n);
  }

  static addressCount(prefix: number): bigint {
    return 1n << BigInt(128 - prefix);
  }
}

// PRNG for reproducible testing
let seed = 123456789;
function rand() {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
}
function randInt(min: number, max: number) {
  return Math.floor(rand() * (max - min + 1)) + min;
}
function randomIPv4(): string {
  return `${randInt(0, 255)}.${randInt(0, 255)}.${randInt(0, 255)}.${randInt(0, 255)}`;
}
function randomIPv6(): string {
  const groups: string[] = [];
  for (let i = 0; i < 8; i++) {
    groups.push(randInt(0, 65535).toString(16));
  }
  return groups.join(":");
}

console.log("=================================================");
console.log("STARTING MASTER IP SUBNET AUDIT & ORACLE VERIFICATION");
console.log("=================================================");

let totalPassed = 0;
let totalFailed = 0;

function assert(condition: boolean, msg: string) {
  if (condition) {
    totalPassed++;
  } else {
    totalFailed++;
    console.error(`ASSERTION FAILED: ${msg}`);
    throw new Error(msg);
  }
}

// -------------------------------------------------------------
// 1. GOLDEN CASES
// -------------------------------------------------------------
console.log("Testing Golden Cases...");

// Golden Case IPv4 #1: 192.168.1.25/24
const gc1 = calculateIPSubnetCalculator({ activeTab: "ipv4", ipAddress: "192.168.1.25", cidr: 24 });
assert(gc1.subnetMask === "255.255.255.0", "GC1 Subnet Mask");
assert(gc1.networkAddress === "192.168.1.0", "GC1 Network Address");
assert(gc1.broadcastAddress === "192.168.1.255", "GC1 Broadcast Address");
assert(gc1.wildcardMask === "0.0.0.255", "GC1 Wildcard Mask");
assert(gc1.totalAddresses === 256, "GC1 Total Addresses");
assert(gc1.usableHosts === 254, "GC1 Usable Hosts");
assert(gc1.firstUsable === "192.168.1.1", "GC1 First Usable");
assert(gc1.lastUsable === "192.168.1.254", "GC1 Last Usable");
assert(gc1.addressType === "Private Network (RFC 1918)", "GC1 Classification");

// Golden Case IPv4 #2: 192.168.1.70/26
const gc2 = calculateIPSubnetCalculator({ activeTab: "ipv4", ipAddress: "192.168.1.70", cidr: 26 });
assert(gc2.subnetMask === "255.255.255.192", "GC2 Subnet Mask");
assert(gc2.networkAddress === "192.168.1.64", "GC2 Network Address");
assert(gc2.broadcastAddress === "192.168.1.127", "GC2 Broadcast Address");
assert(gc2.hostBits === 6, "GC2 Host Bits");
assert(gc2.totalAddresses === 64, "GC2 Total Addresses");
assert(gc2.usableHosts === 62, "GC2 Usable Hosts");
assert(gc2.firstUsable === "192.168.1.65", "GC2 First Usable");
assert(gc2.lastUsable === "192.168.1.126", "GC2 Last Usable");

// IPv4 /31 RFC 3021
const gc31 = calculateIPSubnetCalculator({ activeTab: "ipv4", ipAddress: "10.0.0.1", cidr: 31 });
assert(gc31.totalAddresses === 2, "GC /31 Total");
assert(gc31.usableHosts === 2, "GC /31 Usable Hosts (RFC 3021)");
assert(gc31.firstUsable === "10.0.0.0", "GC /31 First Usable");
assert(gc31.lastUsable === "10.0.0.1", "GC /31 Last Usable");

// IPv4 /32 Host Route
const gc32 = calculateIPSubnetCalculator({ activeTab: "ipv4", ipAddress: "10.0.0.1", cidr: 32 });
assert(gc32.totalAddresses === 1, "GC /32 Total");
assert(gc32.usableHosts === 1, "GC /32 Usable Hosts");
assert(gc32.firstUsable === "10.0.0.1", "GC /32 First Usable");
assert(gc32.lastUsable === "10.0.0.1", "GC /32 Last Usable");

// IPv4 /0 Default Route
const gc0 = calculateIPSubnetCalculator({ activeTab: "ipv4", ipAddress: "0.0.0.0", cidr: 0 });
assert(gc0.networkAddress === "0.0.0.0", "GC /0 Network");
assert(gc0.broadcastAddress === "255.255.255.255", "GC /0 Broadcast");
assert(gc0.wildcardMask === "255.255.255.255", "GC /0 Wildcard");
assert(gc0.totalAddresses === 4294967296, "GC /0 Total Addresses");

// Golden Case IPv6 #1: 2001:db8::1/64
const gc6 = calculateIPSubnetCalculator({ activeTab: "ipv6", ipv6Address: "2001:db8::1", ipv6Prefix: 64 });
assert(gc6.ipv6Compressed === "2001:db8::1", "GC IPv6 Compressed");
assert(gc6.ipv6Expanded === "2001:0db8:0000:0000:0000:0000:0000:0001", "GC IPv6 Expanded");
assert(gc6.ipv6NetworkPrefix === "2001:db8::/64", "GC IPv6 Network Prefix");
assert(Boolean(gc6.ipv6AddressCountString?.includes("18,446,744,073,709,551,616")), "GC IPv6 2^64 Count");

// Golden Case Splitter: 192.168.1.0/24 into /26
const gcSplit = calculateIPSubnetCalculator({
  activeTab: "splitter",
  splitterBaseIp: "192.168.1.0",
  splitterBaseCidr: 24,
  splitterTargetCidr: 26
});
assert(gcSplit.totalAddresses === 4, "GC Splitter 4 Subnets");
assert(gcSplit.usableHosts === 62, "GC Splitter 62 Hosts");
assert(gcSplit.subnetList?.length === 4, "GC Splitter Subnet List Length");
assert(gcSplit.subnetList![0].networkAddress === "192.168.1.0", "GC Split Subnet 1 Net");
assert(gcSplit.subnetList![0].firstUsable === "192.168.1.1", "GC Split Subnet 1 First");
assert(gcSplit.subnetList![0].lastUsable === "192.168.1.62", "GC Split Subnet 1 Last");
assert(gcSplit.subnetList![0].broadcastAddress === "192.168.1.63", "GC Split Subnet 1 Bcast");
assert(gcSplit.subnetList![1].networkAddress === "192.168.1.64", "GC Split Subnet 2 Net");
assert(gcSplit.subnetList![1].broadcastAddress === "192.168.1.127", "GC Split Subnet 2 Bcast");
assert(gcSplit.subnetList![2].networkAddress === "192.168.1.128", "GC Split Subnet 3 Net");
assert(gcSplit.subnetList![2].broadcastAddress === "192.168.1.191", "GC Split Subnet 3 Bcast");
assert(gcSplit.subnetList![3].networkAddress === "192.168.1.192", "GC Split Subnet 4 Net");
assert(gcSplit.subnetList![3].broadcastAddress === "192.168.1.255", "GC Split Subnet 4 Bcast");

// Golden Case Planner: 50 hosts -> /26
const gcPlan = calculateIPSubnetCalculator({
  activeTab: "planner",
  plannerBaseIp: "192.168.1.0",
  plannerRequiredHosts: 50
});
assert(gcPlan.plannerCidr === 26, "GC Planner /26");
assert(gcPlan.plannerUsableHosts === 62, "GC Planner 62 Usable");
assert(gcPlan.networkAddress === "192.168.1.0", "GC Planner Network");
assert(gcPlan.broadcastAddress === "192.168.1.63", "GC Planner Broadcast");
assert(gcPlan.firstUsable === "192.168.1.1", "GC Planner First Usable");
assert(gcPlan.lastUsable === "192.168.1.62", "GC Planner Last Usable");

// Golden Case Route Summarizer: 4x /24 -> /22
const gcSum = calculateIPSubnetCalculator({
  activeTab: "route_summarizer",
  summarizerNetworksString: "10.0.0.0/24\n10.0.1.0/24\n10.0.2.0/24\n10.0.3.0/24"
});
assert(gcSum.summarizedBlock === "10.0.0.0/22", "GC Summarizer 10.0.0.0/22");
assert(gcSum.summarizerIsContiguous === true, "GC Summarizer Exact Contiguous");

// Summarizer Minimal vs Non-contiguous
const gcSum2 = calculateIPSubnetCalculator({
  activeTab: "route_summarizer",
  summarizerNetworksString: "10.0.0.0/24\n10.0.1.0/24"
});
assert(gcSum2.summarizedBlock === "10.0.0.0/23", "GC Summarizer /23");

const gcSum3 = calculateIPSubnetCalculator({
  activeTab: "route_summarizer",
  summarizerNetworksString: "10.0.0.0/24\n10.0.2.0/24"
});
assert(gcSum3.summarizedBlock === "10.0.0.0/22", "GC Summarizer non-contiguous /22");
assert(gcSum3.summarizerIsContiguous === false, "GC Summarizer broad aggregate");

console.log("Golden Cases: ALL PASSED!");

// -------------------------------------------------------------
// 2. RANDOMIZED IPV4 ORACLE TESTING (25,000 cases)
// -------------------------------------------------------------
console.log("Running 25,000 Randomized IPv4 Network Calculations against Independent Oracle...");
for (let i = 0; i < 25000; i++) {
  const ip = randomIPv4();
  const cidr = randInt(0, 32);
  const expected = IndependentIPv4Oracle.calculate(ip, cidr);
  const actual = calculateIPSubnetCalculator({ activeTab: "ipv4", ipAddress: ip, cidr });

  if (actual.error) throw new Error(`Unexpected error on valid IP ${ip}/${cidr}: ${actual.error}`);
  assert(actual.networkAddress === expected.networkStr, `IPv4 Net match ${i}`);
  assert(actual.broadcastAddress === expected.broadcastStr, `IPv4 Bcast match ${i}`);
  assert(actual.subnetMask === expected.maskStr, `IPv4 Mask match ${i}`);
  assert(actual.wildcardMask === expected.wildcardStr, `IPv4 Wildcard match ${i}`);
  assert(actual.firstUsable === expected.firstStr, `IPv4 First match ${i}`);
  assert(actual.lastUsable === expected.lastStr, `IPv4 Last match ${i}`);
  assert(actual.totalAddresses === expected.total, `IPv4 Total match ${i}`);
  assert(actual.usableHosts === expected.usable, `IPv4 Usable match ${i}`);

  // Property tests
  const netInt = ipToInteger(validateIPv4(actual.networkAddress!)!);
  const maskInt = ipToInteger(validateIPv4(actual.subnetMask!)!);
  const bcastInt = ipToInteger(validateIPv4(actual.broadcastAddress!)!);
  const ipInt = ipToInteger(validateIPv4(ip)!);

  // Property: network & mask == network
  assert((netInt & maskInt) >>> 0 === netInt, `Property net & mask == net at ${i}`);
  // Property: broadcast >= network
  assert(bcastInt >= netInt, `Property bcast >= net at ${i}`);
  // Property: network <= IP <= broadcast
  assert(ipInt >= netInt && ipInt <= bcastInt, `Property net <= ip <= bcast at ${i}`);
  // Property: broadcast - network + 1 = total addresses
  assert(bcastInt - netInt + 1 === actual.totalAddresses, `Property address count at ${i}`);
  // Property: prefix + hostBits = 32
  assert(cidr + actual.hostBits! === 32, `Property prefix + host = 32 at ${i}`);
}
console.log("25,000 Randomized IPv4 Oracle tests: ALL PASSED!");

// -------------------------------------------------------------
// 3. PREFIX / MASK ROUND TRIPS (15,000 cases)
// -------------------------------------------------------------
console.log("Running 15,000 Prefix/Mask Round Trip Calculations...");
for (let i = 0; i < 15000; i++) {
  const p = randInt(0, 32);
  const mask = CIDR_MASKS[p];
  const check = isValidSubnetMask(mask);
  assert(check.valid === true, `Valid mask for /${p}`);
  assert(check.cidr === p, `Mask /${p} round trips correctly`);
}
console.log("15,000 Prefix/Mask Round Trips: ALL PASSED!");

// -------------------------------------------------------------
// 4. SUBNET SPLITTER PROPERTY TESTING (15,000 cases)
// -------------------------------------------------------------
console.log("Running 15,000 Subnet Splitter property tests...");
for (let i = 0; i < 15000; i++) {
  const baseIp = randomIPv4();
  const baseCidr = randInt(0, 30);
  const targetCidr = randInt(baseCidr, Math.min(32, baseCidr + 6)); // span up to 64 splits
  const res = calculateIPSubnetCalculator({
    activeTab: "splitter",
    splitterBaseIp: baseIp,
    splitterBaseCidr: baseCidr,
    splitterTargetCidr: targetCidr
  });

  if (res.error) throw new Error(`Splitter error on ${baseIp}/${baseCidr} -> /${targetCidr}`);
  const expectedSubnets = Math.pow(2, targetCidr - baseCidr);
  assert(res.totalAddresses === expectedSubnets, `Splitter subnet count ${i}`);

  const subnets = res.subnetList!;
  assert(subnets.length === Math.min(expectedSubnets, 128), `Render limit check ${i}`);

  // Check contiguous adjacent subnets: bcast(prev) + 1 = net(next)
  for (let j = 1; j < subnets.length; j++) {
    const prevBcast = ipToInteger(validateIPv4(subnets[j - 1].broadcastAddress)!);
    const nextNet = ipToInteger(validateIPv4(subnets[j].networkAddress)!);
    assert(prevBcast + 1 === nextNet, `Splitter contiguity at ${i}:${j}`);
  }
}
console.log("15,000 Subnet Splitter tests: ALL PASSED!");

// -------------------------------------------------------------
// 5. SUBNET PLANNER PROPERTY TESTING (15,000 cases)
// -------------------------------------------------------------
console.log("Running 15,000 Subnet Planner property tests...");
const boundaryHosts = [1, 2, 6, 14, 30, 62, 126, 254, 510, 1022, 2046, 4094, 8190, 16382, 32766, 65534];
for (let i = 0; i < 15000; i++) {
  const baseIp = randomIPv4();
  const req = i < boundaryHosts.length ? boundaryHosts[i] : randInt(1, 100000);
  const plan = calculateIPSubnetCalculator({
    activeTab: "planner",
    plannerBaseIp: baseIp,
    plannerRequiredHosts: req
  });

  if (plan.error) throw new Error(`Planner error for req ${req}: ${plan.error}`);
  assert(plan.plannerUsableHosts! >= req, `Planner capacity >= req for ${req}`);
  
  // Verify minimal CIDR: CIDR + 1 would NOT satisfy required hosts
  if (plan.plannerCidr! < 30) {
    const smallerSubnetUsable = Math.pow(2, 32 - (plan.plannerCidr! + 1)) - 2;
    assert(smallerSubnetUsable < req, `Planner minimal fit for ${req}`);
  }
}
console.log("15,000 Subnet Planner tests: ALL PASSED!");

// -------------------------------------------------------------
// 6. ROUTE SUMMARIZER PROPERTY TESTING (15,000 cases)
// -------------------------------------------------------------
console.log("Running 15,000 Route Summarizer property tests...");
for (let i = 0; i < 15000; i++) {
  // Generate 2 to 8 routes
  const baseNetInt = (randInt(1, 220) << 24) + (randInt(0, 255) << 16);
  const count = Math.pow(2, randInt(1, 3)); // 2, 4, or 8 contiguous /24 blocks
  const routes: string[] = [];
  for (let c = 0; c < count; c++) {
    const routeIp = integerToIP(baseNetInt + (c << 8));
    routes.push(`${routeIp}/24`);
  }

  const sumRes = calculateIPSubnetCalculator({
    activeTab: "route_summarizer",
    summarizerNetworksString: routes.join("\n")
  });

  if (sumRes.error) throw new Error(`Summarizer error on routes: ${sumRes.error}`);
  // Check that summary contains all input routes
  const sumParts = sumRes.summarizedBlock!.split("/");
  const sumNet = ipToInteger(validateIPv4(sumParts[0])!);
  const sumCidr = Number(sumParts[1]);
  const sumEnd = sumNet + Math.pow(2, 32 - sumCidr) - 1;

  for (const r of routes) {
    const rNet = ipToInteger(validateIPv4(r.split("/")[0])!);
    assert(rNet >= sumNet && rNet <= sumEnd, `Summary encompasses input route at ${i}`);
  }
}
console.log("15,000 Route Summarizer tests: ALL PASSED!");

// -------------------------------------------------------------
// 7. BINARY CONVERSION TESTING (10,000 cases)
// -------------------------------------------------------------
console.log("Running 10,000 Binary Conversion tests...");
for (let i = 0; i < 10000; i++) {
  const octets = [randInt(0, 255), randInt(0, 255), randInt(0, 255), randInt(0, 255)];
  const cidr = randInt(0, 32);
  const bin = getBinaryIPRepresentation(octets, cidr);
  
  assert(bin.networkBitsStr.length === cidr, `Network bits length = cidr at ${i}`);
  assert(bin.hostBitsStr.length === 32 - cidr, `Host bits length = 32 - cidr at ${i}`);
  assert(bin.networkBitsStr.length + bin.hostBitsStr.length === 32, `Total 32 bits at ${i}`);
}
console.log("10,000 Binary Conversion tests: ALL PASSED!");

// -------------------------------------------------------------
// 8. RANDOMIZED IPV6 CALCULATIONS (20,000 cases)
// -------------------------------------------------------------
console.log("Running 20,000 Randomized IPv6 calculations with 128-bit BigInt math...");
for (let i = 0; i < 20000; i++) {
  const ip6 = randomIPv6();
  const prefix = randInt(0, 128);
  const res6 = calculateIPSubnetCalculator({ activeTab: "ipv6", ipv6Address: ip6, ipv6Prefix: prefix });

  if (res6.error) throw new Error(`IPv6 calculation error for ${ip6}/${prefix}: ${res6.error}`);
  assert(res6.ipv6Expanded !== undefined, `IPv6 expanded defined at ${i}`);
  assert(res6.ipv6Compressed !== undefined, `IPv6 compressed defined at ${i}`);
  
  // BigInt exact count check
  const expectedCount = IndependentIPv6Oracle.addressCount(prefix);
  assert(res6.ipv6AddressCountString?.includes(expectedCount.toLocaleString()) === true, `IPv6 exact BigInt count match at ${i}`);
  
  // Canonical compression round trip check
  const reExpanded = expandIPv6(res6.ipv6Compressed!);
  assert(reExpanded === res6.ipv6Expanded, `IPv6 canonical compression round trip at ${i}`);
}
console.log("20,000 Randomized IPv6 tests: ALL PASSED!");

// -------------------------------------------------------------
// 9. IPV6 COMPRESSION / EXPANSION (10,000 cases)
// -------------------------------------------------------------
console.log("Running 10,000 IPv6 Compression/Expansion tests...");
const knownIPv6 = [
  { raw: "::1", exp: "0000:0000:0000:0000:0000:0000:0000:0001", comp: "::1" },
  { raw: "::", exp: "0000:0000:0000:0000:0000:0000:0000:0000", comp: "::" },
  { raw: "2001:db8::1", exp: "2001:0db8:0000:0000:0000:0000:0000:0001", comp: "2001:db8::1" },
  { raw: "fe80::1", exp: "fe80:0000:0000:0000:0000:0000:0000:0001", comp: "fe80::1" },
  { raw: "2001:0000:0000:0000:0000:0000:0000:0001", exp: "2001:0000:0000:0000:0000:0000:0000:0001", comp: "2001::1" }
];
for (const k of knownIPv6) {
  assert(expandIPv6(k.raw) === k.exp, `Expand ${k.raw}`);
  assert(compressIPv6(k.exp) === k.comp, `Compress ${k.raw}`);
}
for (let i = 0; i < 10000; i++) {
  const ip6 = randomIPv6();
  const exp = expandIPv6(ip6);
  assert(exp !== null, `Valid expand at ${i}`);
  const comp = compressIPv6(exp!);
  assert(comp !== null, `Valid compress at ${i}`);
  const exp2 = expandIPv6(comp!);
  assert(exp === exp2, `Identity expand(compress(expand)) at ${i}`);
}
console.log("10,000 IPv6 Compression/Expansion tests: ALL PASSED!");

// -------------------------------------------------------------
// 10. VALIDATION & ERROR REJECTION (10,000 cases)
// -------------------------------------------------------------
console.log("Running 10,000 Validation & Rejection tests...");
const invalidIPv4 = [
  "999.1.1.1", "256.0.0.1", "192.168.1", "192.168.1.1.1", "192.168.1.-1",
  "abc.def.ghi.jkl", "", "   ", "192..1.1", "192.168.1.01", "192.168.1.256"
];
for (const inv of invalidIPv4) {
  const r = calculateIPSubnetCalculator({ activeTab: "ipv4", ipAddress: inv, cidr: 24 });
  assert(r.error !== undefined, `Rejection of invalid IPv4 "${inv}"`);
}

const invalidCidrs = [-1, 33, 100, "abc", null, undefined, ""];
for (const c of invalidCidrs) {
  const r = calculateIPSubnetCalculator({ activeTab: "ipv4", ipAddress: "192.168.1.1", cidr: c });
  assert(r.error !== undefined, `Rejection of invalid CIDR "${c}"`);
}

const invalidIPv6 = [
  "2001:db8:::1", "2001:db8", "2001:db8:zzzz::1", "12345::1",
  "1:2:3:4:5:6:7:8:9", "::1::", "", "   "
];
for (const inv of invalidIPv6) {
  const r = calculateIPSubnetCalculator({ activeTab: "ipv6", ipv6Address: inv, ipv6Prefix: 64 });
  assert(r.error !== undefined, `Rejection of invalid IPv6 "${inv}"`);
}

const invalidPrefix6 = [-1, 129, 256, "xyz", null, undefined, ""];
for (const p of invalidPrefix6) {
  const r = calculateIPSubnetCalculator({ activeTab: "ipv6", ipv6Address: "2001:db8::1", ipv6Prefix: p });
  assert(r.error !== undefined, `Rejection of invalid IPv6 prefix "${p}"`);
}

const invalidSplitters = [
  { base: "192.168.1.0", bCidr: 26, tCidr: 24 }, // target < base
  { base: "invalid", bCidr: 24, tCidr: 26 },
  { base: "192.168.1.0", bCidr: 33, tCidr: 34 }
];
for (const inv of invalidSplitters) {
  const r = calculateIPSubnetCalculator({
    activeTab: "splitter",
    splitterBaseIp: inv.base,
    splitterBaseCidr: inv.bCidr,
    splitterTargetCidr: inv.tCidr
  });
  assert(r.error !== undefined, `Rejection of invalid splitter config`);
}

const invalidPlanners = [
  { base: "192.168.1.0", hosts: 0 },
  { base: "192.168.1.0", hosts: -5 },
  { base: "192.168.1.0", hosts: "invalid" },
  { base: "999.1.1.1", hosts: 50 }
];
for (const inv of invalidPlanners) {
  const r = calculateIPSubnetCalculator({
    activeTab: "planner",
    plannerBaseIp: inv.base,
    plannerRequiredHosts: inv.hosts
  });
  assert(r.error !== undefined, `Rejection of invalid planner config`);
}

const invalidSummarizers = [
  "", "   ", "invalid-route", "10.0.0.0/35", "999.1.1.1/24"
];
for (const inv of invalidSummarizers) {
  const r = calculateIPSubnetCalculator({
    activeTab: "route_summarizer",
    summarizerNetworksString: inv
  });
  assert(r.error !== undefined, `Rejection of invalid summarizer route "${inv}"`);
}

for (let i = 0; i < 9000; i++) {
  const badIp = `${randInt(256, 999)}.${randInt(0, 255)}.${randInt(0, 255)}.${randInt(0, 255)}`;
  const r = calculateIPSubnetCalculator({ activeTab: "ipv4", ipAddress: badIp, cidr: 24 });
  assert(r.error !== undefined, `Fuzz rejection at ${i}`);
}
console.log("10,000 Validation & Rejection tests: ALL PASSED!");

// -------------------------------------------------------------
// 11. RFC 1918 PRIVATE CLASSIFICATION & SPECIAL RANGES
// -------------------------------------------------------------
console.log("Testing RFC 1918 Private and Special IPv4 Range Classifications...");
assert(classifyIPv4(ipToInteger([10, 1, 2, 3])).type === "Private Network (RFC 1918)", "10.1.2.3 Private");
assert(classifyIPv4(ipToInteger([172, 16, 0, 1])).type === "Private Network (RFC 1918)", "172.16.0.1 Private");
assert(classifyIPv4(ipToInteger([172, 31, 255, 254])).type === "Private Network (RFC 1918)", "172.31.255.254 Private");
assert(classifyIPv4(ipToInteger([192, 168, 1, 25])).type === "Private Network (RFC 1918)", "192.168.1.25 Private");
assert(classifyIPv4(ipToInteger([172, 15, 255, 255])).type === "Public Unicast", "172.15.255.255 Public");
assert(classifyIPv4(ipToInteger([172, 32, 0, 0])).type === "Public Unicast", "172.32.0.0 Public");
assert(classifyIPv4(ipToInteger([127, 0, 0, 1])).type.includes("Loopback"), "127.0.0.1 Loopback");
assert(classifyIPv4(ipToInteger([169, 254, 1, 1])).type.includes("Link-Local"), "169.254.1.1 APIPA");
assert(classifyIPv4(ipToInteger([224, 0, 0, 1])).type.includes("Multicast"), "224.0.0.1 Multicast");
assert(classifyIPv4(ipToInteger([100, 64, 0, 1])).type.includes("Shared Address Space"), "100.64.0.1 CG-NAT");
assert(classifyIPv4(0).type.includes("Current Network"), "0.0.0.0 Default Route");
assert(classifyIPv4(0xFFFFFFFF).type.includes("Limited Broadcast"), "255.255.255.255 Broadcast");

// Legacy class leading-bit verification
assert(classifyIPv4(ipToInteger([10, 0, 0, 0])).legacyClass.includes("Class A"), "10.0.0.0 Class A");
assert(classifyIPv4(ipToInteger([172, 16, 0, 0])).legacyClass.includes("Class B"), "172.16.0.0 Class B");
assert(classifyIPv4(ipToInteger([192, 168, 1, 0])).legacyClass.includes("Class C"), "192.168.1.0 Class C");
assert(classifyIPv4(ipToInteger([224, 0, 0, 0])).legacyClass.includes("Class D"), "224.0.0.0 Class D");
assert(classifyIPv4(ipToInteger([240, 0, 0, 0])).legacyClass.includes("Class E"), "240.0.0.0 Class E");

console.log("RFC 1918 and Special Range Classifications: ALL PASSED!");

// -------------------------------------------------------------
// 12. NON-CONTIGUOUS MASK REJECTION
// -------------------------------------------------------------
console.log("Testing Non-contiguous Subnet Mask Rejection...");
const nonContiguousMasks = [
  "255.0.255.0", "255.255.0.255", "255.255.255.1", "255.255.255.253",
  "128.0.0.1", "255.128.255.0", "0.255.255.255"
];
for (const ncm of nonContiguousMasks) {
  assert(isValidSubnetMask(ncm).valid === false, `Mask "${ncm}" rejected`);
}
console.log("Non-contiguous Subnet Mask Rejection: ALL PASSED!");

console.log("=================================================");
console.log(`GRAND TOTAL ASSERTIONS PASSED: ${totalPassed}`);
console.log(`GRAND TOTAL ASSERTIONS FAILED: ${totalFailed}`);
console.log("ALL MATHEMATICAL ORACLE & PROPERTY TESTS VERIFIED!");
console.log("=================================================");
