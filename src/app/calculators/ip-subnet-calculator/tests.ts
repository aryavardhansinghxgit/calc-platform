import { calculateIPSubnetCalculator, expandIPv6, compressIPv6 } from "./calculator";

export function runIPSubnetCalculatorTests() {
  // Test Case 1: Backward Compatible Default Inputs
  const defaultInputs = {
    ipAddress: "192.168.1.1",
    cidr: 24
  };
  const res1 = calculateIPSubnetCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");
  // Expected subnet: 255.255.255.0, Usable hosts = 254
  if (res1.subnetMask !== "255.255.255.0" || res1.usableHosts !== 254) {
    throw new Error(`Default inputs calculation error: expected mask=255.255.255.0, hosts=254, got mask=${res1.subnetMask}, hosts=${res1.usableHosts}`);
  }

  // Test Case 2: Core IPv4 (Non-octet boundary)
  const res2 = calculateIPSubnetCalculator({
    activeTab: "ipv4",
    ipAddress: "192.168.1.70",
    cidr: 26
  });
  // Expected Network: 192.168.1.64, Broadcast: 192.168.1.127, Hosts = 62
  if (res2.networkAddress !== "192.168.1.64" || res2.broadcastAddress !== "192.168.1.127" || res2.usableHosts !== 62) {
    throw new Error(`IPv4 /26 calculation error: expected network=192.168.1.64, broadcast=192.168.1.127, got network=${res2.networkAddress}, broadcast=${res2.broadcastAddress}`);
  }

  // Test Case 3: Point-to-Point links (/31 CIDR)
  const res3 = calculateIPSubnetCalculator({
    activeTab: "ipv4",
    ipAddress: "192.168.1.10",
    cidr: 31
  });
  if (res3.usableHosts !== 2) {
    throw new Error(`IPv4 /31 link calculation error: expected usableHosts=2, got ${res3.usableHosts}`);
  }

  // Test Case 4: IPv6 expansions and compressions
  const ipv6Expanded = expandIPv6("2001:db8::1");
  const ipv6Compressed = compressIPv6("2001:0db8:0000:0000:0000:0000:0000:0001");
  if (ipv6Expanded !== "2001:0db8:0000:0000:0000:0000:0000:0001") {
    throw new Error(`IPv6 expansion failed: expected 2001:0db8:0000:0000:0000:0000:0000:0001, got ${ipv6Expanded}`);
  }
  if (ipv6Compressed !== "2001:db8::1") {
    throw new Error(`IPv6 compression failed: expected 2001:db8::1, got ${ipv6Compressed}`);
  }

  // Test Case 5: Subnet list enumerations (Splitter)
  const resSplit = calculateIPSubnetCalculator({
    activeTab: "splitter",
    splitterBaseIp: "10.0.0.0",
    splitterBaseCidr: 24,
    splitterTargetCidr: 26
  });
  // expect 4 subnets
  if (!resSplit.subnetList || resSplit.subnetList.length !== 4) {
    throw new Error(`Subnet splitter failed: expected 4 splits, got ${resSplit.subnetList?.length}`);
  }

  // Test Case 6: Required host planner
  const resPlan = calculateIPSubnetCalculator({
    activeTab: "planner",
    plannerBaseIp: "192.168.1.0",
    plannerRequiredHosts: 50
  });
  // expect CIDR /26
  if (resPlan.plannerCidr !== 26) {
    throw new Error(`Subnet host planner failed: expected CIDR /26, got /${resPlan.plannerCidr}`);
  }

  // Test Case 7: Route Summarizer (Aggregation)
  const resSum = calculateIPSubnetCalculator({
    activeTab: "route_summarizer",
    summarizerNetworksString: "192.168.0.0/24\n192.168.1.0/24\n192.168.2.0/24\n192.168.3.0/24"
  });
  // expect summarized block 192.168.0.0/22
  if (resSum.summarizedBlock !== "192.168.0.0/22") {
    throw new Error(`Route summarizer failed: expected 192.168.0.0/22, got ${resSum.summarizedBlock}`);
  }

  // Test Case 8: Boundary inputs
  const resZero = calculateIPSubnetCalculator({
    activeTab: "ipv4",
    ipAddress: "0.0.0.0",
    cidr: 0
  });
  if (resZero.networkAddress !== "0.0.0.0" || resZero.broadcastAddress !== "255.255.255.255") {
    if (resZero.error) {
      throw new Error("Zero subnet calculation boundary error.");
    }
  }

  return true;
}

export default runIPSubnetCalculatorTests;
