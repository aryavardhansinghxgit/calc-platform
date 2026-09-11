"use client";

import React, { useState, useMemo, useEffect } from "react";
import { 
  Network, 
  Settings, 
  RefreshCw, 
  Copy, 
  Share2, 
  Printer, 
  Save, 
  Trash2, 
  Bookmark, 
  Info, 
  AlertTriangle,
  Layers,
  Activity,
  Plus,
  Check,
  Download,
  FileText,
  RotateCcw,
  ExternalLink
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  calculateIPSubnetCalculator, 
  expandIPv6, 
  compressIPv6, 
  integerToIP, 
  cidrToMaskInt, 
  CIDR_MASKS,
  isValidSubnetMask
} from "@/app/calculators/ip-subnet-calculator/calculator";
import { IPSubnetCalculatorInputs, IPSubnetCalculatorOutputs } from "@/app/calculators/ip-subnet-calculator/types";

// Tabs definitions
const TABS = [
  { id: "ipv4", label: "IPv4 Subnet" },
  { id: "ipv6", label: "IPv6 Subnet" },
  { id: "splitter", label: "Subnet Splitter" },
  { id: "planner", label: "Subnet Planner" },
  { id: "route_summarizer", label: "Route Summarizer" }
];

export interface SavedSubnetRecord {
  id: string;
  tab: string;
  title: string;
  value: string;
  timestamp: string;
  inputs: Record<string, any>;
}

export function IPSubnetCalculator() {
  const [activeTab, setActiveTab] = useState<string>("ipv4");

  // IPv4 States
  const [ipAddress, setIpAddress] = useState("192.168.1.25");
  const [cidr, setCidr] = useState("24");
  const [subnetMask, setSubnetMask] = useState("255.255.255.0");
  const [networkClass, setNetworkClass] = useState("Any");

  // IPv6 States
  const [ipv6Address, setIpv6Address] = useState("2001:db8::1");
  const [ipv6Prefix, setIpv6Prefix] = useState("64");

  // Splitter States
  const [splitterBaseIp, setSplitterBaseIp] = useState("192.168.1.0");
  const [splitterBaseCidr, setSplitterBaseCidr] = useState("24");
  const [splitterTargetCidr, setSplitterTargetCidr] = useState("26");

  // Planner States
  const [plannerBaseIp, setPlannerBaseIp] = useState("192.168.1.0");
  const [plannerRequiredHosts, setPlannerRequiredHosts] = useState("50");

  // Summarizer States
  const [summarizerNetworksString, setSummarizerNetworksString] = useState("10.0.0.0/24\n10.0.1.0/24\n10.0.2.0/24\n10.0.3.0/24");

  // Reference Table search
  const [tableSearch, setTableSearch] = useState("");

  // Saved Results and Bookmarks
  const [savedItems, setSavedItems] = useState<SavedSubnetRecord[]>([]);
  const [copied, setCopied] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedLatex, setCopiedLatex] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  // Load bookmarks history from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("saved_ip_calculations_v3");
      if (stored) setSavedItems(JSON.parse(stored));
    } catch (e) {}
  }, []);

  // Sync inputs from share URL parameters on load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab && TABS.some(t => t.id === tab)) {
        setActiveTab(tab);
      }
    }
  }, []);

  // Bidirectional sync: CIDR updates Subnet Mask
  const handleCidrChange = (val: string) => {
    setCidr(val);
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 32) {
      setSubnetMask(CIDR_MASKS[parsed]);
    }
  };

  // Bidirectional sync: Subnet Mask updates CIDR
  const handleMaskChange = (val: string) => {
    setSubnetMask(val);
    const check = isValidSubnetMask(val);
    if (check.valid && check.cidr !== undefined) {
      setCidr(check.cidr.toString());
    }
  };

  // Sync Network Class selection to CIDR defaults
  const handleClassSelection = (c: string) => {
    setNetworkClass(c);
    setActiveTab("ipv4");
    if (c === "A") {
      setIpAddress("10.0.0.1");
      handleCidrChange("8");
    } else if (c === "B") {
      setIpAddress("172.16.0.1");
      handleCidrChange("16");
    } else if (c === "C") {
      setIpAddress("192.168.1.1");
      handleCidrChange("24");
    }
  };

  // Compile inputs for calculator core (without silent fallback)
  const currentInputs = useMemo(() => {
    return {
      activeTab,
      ipAddress,
      cidr: cidr.trim() === "" ? undefined : Number(cidr),
      subnetMask,
      networkClass,
      ipv6Address,
      ipv6Prefix: ipv6Prefix.trim() === "" ? undefined : Number(ipv6Prefix),
      splitterBaseIp,
      splitterBaseCidr: splitterBaseCidr.trim() === "" ? undefined : Number(splitterBaseCidr),
      splitterTargetCidr: splitterTargetCidr.trim() === "" ? undefined : Number(splitterTargetCidr),
      plannerBaseIp,
      plannerRequiredHosts: plannerRequiredHosts.trim() === "" ? undefined : Number(plannerRequiredHosts),
      summarizerNetworksString
    };
  }, [
    activeTab, ipAddress, cidr, subnetMask, networkClass, ipv6Address, ipv6Prefix,
    splitterBaseIp, splitterBaseCidr, splitterTargetCidr, plannerBaseIp, plannerRequiredHosts,
    summarizerNetworksString
  ]);

  // Run calculation
  const result: IPSubnetCalculatorOutputs | null = useMemo(() => {
    try {
      return calculateIPSubnetCalculator(currentInputs);
    } catch (e: any) {
      return { error: e.message || "Calculation error" };
    }
  }, [currentInputs]);

  // Reset parameters
  const handleReset = () => {
    if (activeTab === "ipv4") {
      setIpAddress("192.168.1.25");
      handleCidrChange("24");
      setNetworkClass("Any");
    } else if (activeTab === "ipv6") {
      setIpv6Address("2001:db8::1");
      setIpv6Prefix("64");
    } else if (activeTab === "splitter") {
      setSplitterBaseIp("192.168.1.0");
      setSplitterBaseCidr("24");
      setSplitterTargetCidr("26");
    } else if (activeTab === "planner") {
      setPlannerBaseIp("192.168.1.0");
      setPlannerRequiredHosts("50");
    } else if (activeTab === "route_summarizer") {
      setSummarizerNetworksString("10.0.0.0/24\n10.0.1.0/24\n10.0.2.0/24\n10.0.3.0/24");
    }
  };

  // Save calculation record to localStorage
  const handleSave = () => {
    if (!result || result.error) return;
    let label = "";
    let valStr = "";

    if (activeTab === "ipv4") {
      label = `IPv4: ${result.ipAddress}/${result.cidr}`;
      valStr = `Net: ${result.networkAddress} | Usable: ${result.usableHosts}`;
    } else if (activeTab === "ipv6") {
      label = `IPv6: ${result.ipv6Compressed}/${ipv6Prefix}`;
      valStr = `Prefix: ${result.ipv6NetworkPrefix}`;
    } else if (activeTab === "splitter") {
      label = `Split: ${splitterBaseIp}/${splitterBaseCidr} → /${splitterTargetCidr}`;
      valStr = `${result.totalAddresses} subnets (${result.usableHosts} hosts/net)`;
    } else if (activeTab === "planner") {
      label = `Plan: ${plannerRequiredHosts} hosts → /${result.plannerCidr}`;
      valStr = `Block: ${result.networkAddress}/${result.plannerCidr}`;
    } else if (activeTab === "route_summarizer") {
      label = `Summary: ${result.summarizedBlock}`;
      valStr = result.summarizerIsContiguous ? "Exact minimal aggregate" : "Broad aggregate";
    }

    const newItem: SavedSubnetRecord = {
      id: Date.now().toString(),
      tab: activeTab,
      title: label,
      value: valStr,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      inputs: {
        activeTab,
        ipAddress,
        cidr,
        subnetMask,
        networkClass,
        ipv6Address,
        ipv6Prefix,
        splitterBaseIp,
        splitterBaseCidr,
        splitterTargetCidr,
        plannerBaseIp,
        plannerRequiredHosts,
        summarizerNetworksString
      }
    };

    const updated = [newItem, ...savedItems.filter(i => i.title !== label)].slice(0, 15);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_ip_calculations_v3", JSON.stringify(updated));
    } catch (e) {}
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  // Restore saved calculation
  const handleRestore = (item: SavedSubnetRecord) => {
    if (!item.inputs) return;
    setActiveTab(item.tab || item.inputs.activeTab || "ipv4");
    if (item.inputs.ipAddress !== undefined) setIpAddress(item.inputs.ipAddress);
    if (item.inputs.cidr !== undefined) {
      setCidr(String(item.inputs.cidr));
      if (CIDR_MASKS[Number(item.inputs.cidr)]) {
        setSubnetMask(CIDR_MASKS[Number(item.inputs.cidr)]);
      }
    }
    if (item.inputs.networkClass !== undefined) setNetworkClass(item.inputs.networkClass);
    if (item.inputs.ipv6Address !== undefined) setIpv6Address(item.inputs.ipv6Address);
    if (item.inputs.ipv6Prefix !== undefined) setIpv6Prefix(String(item.inputs.ipv6Prefix));
    if (item.inputs.splitterBaseIp !== undefined) setSplitterBaseIp(item.inputs.splitterBaseIp);
    if (item.inputs.splitterBaseCidr !== undefined) setSplitterBaseCidr(String(item.inputs.splitterBaseCidr));
    if (item.inputs.splitterTargetCidr !== undefined) setSplitterTargetCidr(String(item.inputs.splitterTargetCidr));
    if (item.inputs.plannerBaseIp !== undefined) setPlannerBaseIp(item.inputs.plannerBaseIp);
    if (item.inputs.plannerRequiredHosts !== undefined) setPlannerRequiredHosts(String(item.inputs.plannerRequiredHosts));
    if (item.inputs.summarizerNetworksString !== undefined) setSummarizerNetworksString(item.inputs.summarizerNetworksString);
  };

  // Delete saved calculation
  const handleDeleteSaved = (id: string) => {
    const updated = savedItems.filter(i => i.id !== id);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_ip_calculations_v3", JSON.stringify(updated));
    } catch (e) {}
  };

  // Copy brief result to clipboard
  const handleCopy = () => {
    if (!result || result.error) return;
    let brief = "";
    if (activeTab === "ipv4") {
      brief = `IP: ${result.ipAddress}/${result.cidr} | Mask: ${result.subnetMask} | Network: ${result.networkAddress} | Broadcast: ${result.broadcastAddress} | Usable: ${result.firstUsable} - ${result.lastUsable} (${result.usableHosts} hosts)`;
    } else if (activeTab === "ipv6") {
      brief = `IPv6: ${result.ipv6Compressed}/${ipv6Prefix} | Network: ${result.ipv6NetworkPrefix} | Addresses: ${result.ipv6AddressCountString}`;
    } else if (activeTab === "splitter") {
      brief = `Split: ${splitterBaseIp}/${splitterBaseCidr} into /${splitterTargetCidr} | Subnets: ${result.totalAddresses} | Usable hosts/subnet: ${result.usableHosts}`;
    } else if (activeTab === "planner") {
      brief = `Planner: ${plannerRequiredHosts} hosts -> Optimal CIDR: /${result.plannerCidr} (${result.networkAddress}/${result.plannerCidr}) | Usable: ${result.plannerUsableHosts} hosts`;
    } else if (activeTab === "route_summarizer") {
      brief = `Route Summary: ${result.summarizedBlock} (${result.summarizerIsContiguous ? "Exact minimal" : "Broad aggregate"})`;
    }

    navigator.clipboard.writeText(brief);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Copy full summary report to clipboard
  const handleCopySummary = () => {
    if (!result || result.error) return;
    let summaryText = `IP SUBNET ANALYSIS REPORT\n` +
      `====================================\n` +
      `Timestamp: ${new Date().toISOString()}\n` +
      `Calculator Mode: ${TABS.find(t => t.id === activeTab)?.label}\n\n`;

    if (activeTab === "ipv4") {
      summaryText += `INPUTS:\n` +
        `- Host IP Address: ${result.ipAddress}\n` +
        `- CIDR Prefix: /${result.cidr}\n` +
        `- Subnet Mask: ${result.subnetMask}\n\n` +
        `RESULTS:\n` +
        `- Network Address (Subnet ID): ${result.networkAddress}\n` +
        `- Broadcast Address: ${result.broadcastAddress}\n` +
        `- Wildcard Mask: ${result.wildcardMask}\n` +
        `- Usable Host Range: ${result.firstUsable} - ${result.lastUsable}\n` +
        `- Total Addresses: ${result.totalAddresses?.toLocaleString()}\n` +
        `- Usable Hosts: ${result.usableHosts?.toLocaleString()}\n` +
        `- Network Bits: ${result.networkBits} | Host Bits: ${result.hostBits}\n` +
        `- Scope Type: ${result.addressType}\n` +
        `- Legacy Class: ${result.legacyClass}\n` +
        `- Binary IP: ${result.binaryAddress}\n` +
        `- Binary Mask: ${result.binaryMask}\n`;
    } else if (activeTab === "ipv6") {
      summaryText += `INPUTS:\n` +
        `- IPv6 Address: ${ipv6Address}\n` +
        `- Prefix Length: /${ipv6Prefix}\n\n` +
        `RESULTS:\n` +
        `- Compressed (RFC 5952): ${result.ipv6Compressed}\n` +
        `- Fully Expanded: ${result.ipv6Expanded}\n` +
        `- Network Prefix: ${result.ipv6NetworkPrefix}\n` +
        `- Interface Identifier: ${result.ipv6InterfaceBits}\n` +
        `- Address Scope: ${result.addressType}\n` +
        `- Total Addresses in Block: ${result.ipv6AddressCountString}\n` +
        `- Multicast/Broadcast: IPv6 uses Multicast; no broadcast address is defined.\n`;
    } else if (activeTab === "splitter") {
      summaryText += `INPUTS:\n` +
        `- Base Subnet: ${splitterBaseIp}/${splitterBaseCidr}\n` +
        `- Target Split Prefix: /${splitterTargetCidr}\n\n` +
        `RESULTS:\n` +
        `- Total Subnets Generated: ${result.totalAddresses?.toLocaleString()}\n` +
        `- Usable Hosts per Subnet: ${result.usableHosts?.toLocaleString()}\n` +
        `- Enumerated Subnets (Sample):\n` +
        (result.subnetList || []).map(s => `  #${s.subnetIndex}: ${s.networkAddress}/${s.cidr} | Hosts: ${s.firstUsable} - ${s.lastUsable} | Bcast: ${s.broadcastAddress}`).join("\n") + "\n";
    } else if (activeTab === "planner") {
      summaryText += `INPUTS:\n` +
        `- Base Network: ${plannerBaseIp}\n` +
        `- Required Host Capacity: ${plannerRequiredHosts}\n\n` +
        `RESULTS:\n` +
        `- Optimal CIDR: /${result.plannerCidr}\n` +
        `- Usable Host Capacity: ${result.plannerUsableHosts?.toLocaleString()}\n` +
        `- Allocated Block: ${result.networkAddress}/${result.plannerCidr}\n` +
        `- Usable IP Range: ${result.firstUsable} - ${result.lastUsable}\n` +
        `- Broadcast: ${result.broadcastAddress}\n`;
    } else if (activeTab === "route_summarizer") {
      summaryText += `INPUTS:\n` +
        `${summarizerNetworksString}\n\n` +
        `RESULTS:\n` +
        `- Summarized Supernet Block: ${result.summarizedBlock}\n` +
        `- Aggregation Type: ${result.summarizerIsContiguous ? "Exact Minimal Supernet" : "Broad Non-minimal Aggregate"}\n`;
    }

    if (result.calculationSteps) {
      summaryText += `\nDETAILED CALCULATION STEPS:\n${result.calculationSteps}\n`;
    }

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  // Export CSV
  const handleExportCSV = () => {
    if (!result || result.error) return;
    let csvContent = "";

    if (activeTab === "ipv4") {
      csvContent = "Property,Value\n" +
        `Host IP Address,"${result.ipAddress}"\n` +
        `CIDR Prefix,"/${result.cidr}"\n` +
        `Subnet Mask,"${result.subnetMask}"\n` +
        `Network Address,"${result.networkAddress}"\n` +
        `Broadcast Address,"${result.broadcastAddress}"\n` +
        `Wildcard Mask,"${result.wildcardMask}"\n` +
        `First Usable IP,"${result.firstUsable}"\n` +
        `Last Usable IP,"${result.lastUsable}"\n` +
        `Total Addresses,${result.totalAddresses}\n` +
        `Usable Hosts,${result.usableHosts}\n` +
        `Network Bits,${result.networkBits}\n` +
        `Host Bits,${result.hostBits}\n` +
        `Scope Classification,"${result.addressType}"\n` +
        `Legacy Class,"${result.legacyClass}"\n`;
    } else if (activeTab === "ipv6") {
      csvContent = "Property,Value\n" +
        `IPv6 Input,"${ipv6Address}"\n` +
        `Prefix Length,"/${ipv6Prefix}"\n` +
        `Compressed Address,"${result.ipv6Compressed}"\n` +
        `Expanded Address,"${result.ipv6Expanded}"\n` +
        `Network Prefix,"${result.ipv6NetworkPrefix}"\n` +
        `Interface Identifier,"${result.ipv6InterfaceBits}"\n` +
        `Total Addresses,"${result.ipv6AddressCountString}"\n` +
        `Scope Classification,"${result.addressType}"\n`;
    } else if (activeTab === "splitter") {
      csvContent = "Subnet Index,Network Address,CIDR,First Usable,Last Usable,Broadcast Address,Total Addresses,Usable Hosts\n" +
        (result.subnetList || []).map(s => 
          `${s.subnetIndex},"${s.networkAddress}",/${s.cidr},"${s.firstUsable}","${s.lastUsable}","${s.broadcastAddress}",${s.totalAddresses},${s.usableHosts}`
        ).join("\n") + "\n";
    } else if (activeTab === "planner") {
      csvContent = "Property,Value\n" +
        `Base IP Allocation,"${plannerBaseIp}"\n` +
        `Required Hosts,${plannerRequiredHosts}\n` +
        `Optimal CIDR,"/${result.plannerCidr}"\n` +
        `Allocated Network Block,"${result.networkAddress}/${result.plannerCidr}"\n` +
        `Broadcast Address,"${result.broadcastAddress}"\n` +
        `First Usable Host,"${result.firstUsable}"\n` +
        `Last Usable Host,"${result.lastUsable}"\n` +
        `Usable Hosts Capacity,${result.plannerUsableHosts}\n`;
    } else if (activeTab === "route_summarizer") {
      csvContent = "Property,Value\n" +
        `Input Routes,"${summarizerNetworksString.replace(/\n/g, "; ")}"\n` +
        `Summarized Supernet Block,"${result.summarizedBlock}"\n` +
        `Aggregation Nature,"${result.summarizerIsContiguous ? "Exact Minimal Supernet" : "Broad Non-minimal Aggregate"}"\n`;
    }

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ip_subnet_${activeTab}_${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Export TXT Report
  const handleExportTXT = () => {
    if (!result || result.error) return;
    let txt = `IP SUBNET CALCULATOR ENGINEERING SPECIFICATION REPORT\n` +
      `======================================================\n` +
      `Generated: ${new Date().toLocaleString()}\n` +
      `Active Mode: ${TABS.find(t => t.id === activeTab)?.label}\n\n`;

    if (activeTab === "ipv4") {
      txt += `IPv4 Network Analysis:\n` +
        `----------------------\n` +
        `Host IP Address:        ${result.ipAddress}\n` +
        `Subnet Mask:            ${result.subnetMask} (CIDR /${result.cidr})\n` +
        `Network Address:        ${result.networkAddress}\n` +
        `Broadcast Address:      ${result.broadcastAddress}\n` +
        `Wildcard Mask:          ${result.wildcardMask}\n` +
        `Usable Host Range:      ${result.firstUsable} - ${result.lastUsable}\n` +
        `Total IP Addresses:     ${result.totalAddresses?.toLocaleString()}\n` +
        `Usable Host Count:      ${result.usableHosts?.toLocaleString()}\n` +
        `Network / Host Bits:    ${result.networkBits} / ${result.hostBits}\n` +
        `Address Classification: ${result.addressType}\n` +
        `Historical Legacy:      ${result.legacyClass}\n\n` +
        `Binary Representation:\n` +
        `IP:   ${result.binaryAddress}\n` +
        `Mask: ${result.binaryMask}\n`;
    } else if (activeTab === "ipv6") {
      txt += `IPv6 Network Analysis:\n` +
        `----------------------\n` +
        `Original Input:         ${ipv6Address}\n` +
        `Prefix Length:          /${ipv6Prefix}\n` +
        `Canonical Compressed:   ${result.ipv6Compressed}\n` +
        `Fully Expanded:         ${result.ipv6Expanded}\n` +
        `Network Prefix:         ${result.ipv6NetworkPrefix}\n` +
        `Interface Identifier:   ${result.ipv6InterfaceBits}\n` +
        `Addresses in Prefix:    ${result.ipv6AddressCountString}\n` +
        `Scope Classification:   ${result.addressType}\n`;
    } else if (activeTab === "splitter") {
      txt += `Subnet Splitter Enumerable Listing:\n` +
        `------------------------------------\n` +
        `Base Subnet:  ${splitterBaseIp}/${splitterBaseCidr}\n` +
        `Target Split: /${splitterTargetCidr}\n` +
        `Subnets:      ${result.totalAddresses?.toLocaleString()} blocks\n\n` +
        (result.subnetList || []).map(s => 
          `Subnet #${s.subnetIndex}: ${s.networkAddress}/${s.cidr}\n` +
          `  Usable Range: ${s.firstUsable} - ${s.lastUsable}\n` +
          `  Broadcast:    ${s.broadcastAddress}\n` +
          `  Capacity:     ${s.usableHosts} usable hosts\n`
        ).join("\n");
    } else if (activeTab === "planner") {
      txt += `Subnet Capacity Planning Report:\n` +
        `--------------------------------\n` +
        `Base Allocation:       ${plannerBaseIp}\n` +
        `Required Host Spaces:  ${plannerRequiredHosts}\n` +
        `Optimal CIDR Assigned: /${result.plannerCidr}\n` +
        `Allocated Network:     ${result.networkAddress}/${result.plannerCidr}\n` +
        `Broadcast Address:     ${result.broadcastAddress}\n` +
        `Usable Range:          ${result.firstUsable} to ${result.lastUsable}\n` +
        `Usable Capacity:       ${result.plannerUsableHosts?.toLocaleString()} hosts\n`;
    } else if (activeTab === "route_summarizer") {
      txt += `Route Summarization (CIDR Aggregation):\n` +
        `---------------------------------------\n` +
        `Input Routes:\n${summarizerNetworksString}\n\n` +
        `Aggregated Supernet Block: ${result.summarizedBlock}\n` +
        `Coverage Assessment: ${result.summarizerIsContiguous ? "Exact minimal aggregation" : "Broad aggregate with non-contiguous coverage"}\n`;
    }

    if (result.calculationSteps) {
      txt += `\nStep-by-Step Logic:\n-------------------\n${result.calculationSteps}\n`;
    }

    const blob = new Blob([txt], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ip_subnet_report_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Copy LaTeX Formulas
  const handleCopyLatex = () => {
    let latex = "";
    if (activeTab === "ipv4") {
      latex = `% IPv4 Subnetting Bitwise Equations\n` +
        `H = 32 - P = 32 - ${cidr} = ${32 - Number(cidr)}\\\\\n` +
        `N_{\\text{total}} = 2^H = 2^{${32 - Number(cidr)}} = ${Math.pow(2, 32 - Number(cidr))}\\\\\n` +
        (Number(cidr) === 31 
          ? `N_{\\text{usable}} = 2 \\quad (\\text{RFC 3021 Point-to-Point})\\\\\n` 
          : Number(cidr) === 32 
            ? `N_{\\text{usable}} = 1 \\quad (\\text{Host Route})\\\\\n` 
            : `N_{\\text{usable}} = 2^H - 2 = ${Math.pow(2, 32 - Number(cidr)) - 2}\\\\\n`) +
        `\\text{Network ID} = \\text{IP} \\land \\text{Mask}\\\\\n` +
        `\\text{Wildcard} = \\neg \\text{Mask}\\\\\n` +
        `\\text{Broadcast} = \\text{Network ID} \\lor \\text{Wildcard}`;
    } else if (activeTab === "ipv6") {
      latex = `% IPv6 Address Space Equation\n` +
        `I = 128 - P = 128 - ${ipv6Prefix} = ${128 - Number(ipv6Prefix)}\\\\\n` +
        `N_{\\text{addresses}} = 2^{128 - P} = 2^{${128 - Number(ipv6Prefix)}}\\\\\n` +
        `\\text{Network Prefix} = \\text{IPv6} \\land \\text{Mask}_{P}`;
    } else if (activeTab === "splitter") {
      latex = `% Subnet Splitter Equation\n` +
        `B = P_{\\text{target}} - P_{\\text{base}} = ${splitterTargetCidr} - ${splitterBaseCidr} = ${Number(splitterTargetCidr) - Number(splitterBaseCidr)}\\\\\n` +
        `S = 2^B = 2^{${Number(splitterTargetCidr) - Number(splitterBaseCidr)}} = ${Math.pow(2, Number(splitterTargetCidr) - Number(splitterBaseCidr))}\\\\\n` +
        `N_{\\text{size}} = 2^{32 - P_{\\text{target}}}`;
    } else if (activeTab === "planner") {
      latex = `% Subnet Planner Equation\n` +
        `\\min P \\quad \\text{s.t.} \\quad 2^{32 - P} - 2 \\ge H_{\\text{req}} = ${plannerRequiredHosts}`;
    } else {
      latex = `% Route Summarization (CIDR Supernetting)\n` +
        `P_{\\text{summary}} = \\operatorname{clz32}(\\min(\\text{IP}) \\oplus \\max(\\text{IP}))`;
    }

    navigator.clipboard.writeText(latex);
    setCopiedLatex(true);
    setTimeout(() => setCopiedLatex(false), 2000);
  };

  // Trigger browser printing report
  const handlePrint = () => {
    window.print();
  };

  // Click row in standard reference table to populate active inputs
  const handleRowClick = (prefix: number) => {
    setActiveTab("ipv4");
    handleCidrChange(prefix.toString());
  };

  // Reference Table Data List
  const referenceRows = useMemo(() => {
    const list = [];
    for (let p = 0; p <= 32; p++) {
      const size = Math.pow(2, 32 - p);
      let hosts = size >= 2 ? size - 2 : 0;
      if (p === 31) hosts = 2;
      if (p === 32) hosts = 1;
      list.push({
        prefix: p,
        mask: CIDR_MASKS[p],
        wildcard: integerToIP(~cidrToMaskInt(p) >>> 0),
        totalAddresses: size.toLocaleString(),
        usableHosts: hosts.toLocaleString()
      });
    }
    return list;
  }, []);

  // Filtered rows based on search input
  const filteredRows = useMemo(() => {
    if (!tableSearch.trim()) return referenceRows;
    const s = tableSearch.toLowerCase().replace(/^\//, "");
    return referenceRows.filter(r => 
      r.prefix.toString() === s ||
      r.prefix.toString().includes(s) || 
      r.mask.includes(s) || 
      r.wildcard.includes(s) ||
      r.usableHosts.replace(/,/g, "").includes(s)
    );
  }, [tableSearch, referenceRows]);

  return (
    <div className="space-y-6">
      {/* TABS CONTROL BAR */}
      <div 
        role="tablist" 
        aria-label="IP Subnet Calculator Modes"
        className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-zinc-200 dark:border-zinc-800 scrollbar-none text-xs no-print"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* PRESETS BAR */}
      <div className="flex flex-wrap items-center gap-2 p-2.5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-300 dark:border-zinc-700 shadow-sm no-print">
        <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider pl-1 mr-1 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-blue-500" /> Presets:
        </span>
        {[
          { id: "class_a", name: "Class A Private Subnet (10.0.0.0/8)", act: () => handleClassSelection("A") },
          { id: "class_b", name: "Class B Private Subnet (172.16.0.0/16)", act: () => handleClassSelection("B") },
          { id: "class_c", name: "Class C Private Subnet (192.168.1.0/24)", act: () => handleClassSelection("C") }
        ].map((pr) => (
          <button
            key={pr.id}
            onClick={pr.act}
            className="px-2.5 py-1 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg text-[11px] font-bold text-zinc-600 dark:text-zinc-400 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-pointer shadow-xs"
          >
            {pr.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: ACTIVE MODULE FORM */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* TAB 1: IPv4 SUBNET CALCULATOR */}
          {activeTab === "ipv4" && (
            <div 
              id="panel-ipv4"
              role="tabpanel"
              aria-labelledby="tab-ipv4"
              className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-300 dark:border-zinc-800 shadow-md space-y-4"
            >
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <h3 className="text-sm font-black text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <span>IPv4 Parameters</span>
                </h3>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[10px] text-zinc-400 hover:text-blue-500 flex items-center gap-1 font-bold cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Reset
                </button>
              </div>

              {/* Classful selection links */}
              <div>
                <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block mb-1">
                  Legacy Class Shortcut Selection
                </span>
                <div className="flex gap-2 text-xs">
                  {["Any", "A", "B", "C"].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => handleClassSelection(c)}
                      className={`flex-1 py-1 border rounded-lg font-bold transition-all cursor-pointer ${
                        networkClass === c
                          ? "border-blue-600 text-blue-600 bg-blue-50/50 dark:bg-blue-950/20"
                          : "border-zinc-300 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                      }`}
                    >
                      {c === "Any" ? "Custom (CIDR)" : `Class ${c}`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="ipv4-host-input" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">
                    IPv4 Host IP Address
                  </label>
                  <Input 
                    id="ipv4-host-input"
                    type="text" 
                    value={ipAddress} 
                    onChange={(e) => setIpAddress(e.target.value)} 
                    placeholder="e.g. 192.168.1.25"
                    className="font-sans tabular-nums text-xs font-bold"
                  />
                </div>
                <div>
                  <label htmlFor="ipv4-cidr-select" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">
                    Subnet Prefix Length (CIDR)
                  </label>
                  <select
                    id="ipv4-cidr-select"
                    value={cidr}
                    onChange={(e) => handleCidrChange(e.target.value)}
                    className="w-full h-9 px-3 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500 font-bold"
                  >
                    {Array.from({ length: 33 }).map((_, i) => (
                      <option key={i} value={i}>/{i} ({CIDR_MASKS[i]})</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="ipv4-mask-select" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">
                    Dotted Subnet Mask (Bidirectional)
                  </label>
                  <select
                    id="ipv4-mask-select"
                    value={subnetMask}
                    onChange={(e) => handleMaskChange(e.target.value)}
                    className="w-full h-9 px-3 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500 font-bold font-sans tabular-nums"
                  >
                    {Array.from({ length: 33 }).map((_, i) => (
                      <option key={i} value={CIDR_MASKS[i]}>
                        {CIDR_MASKS[i]} (/{i})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: IPv6 SUBNET CALCULATOR */}
          {activeTab === "ipv6" && (
            <div 
              id="panel-ipv6"
              role="tabpanel"
              aria-labelledby="tab-ipv6"
              className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-300 dark:border-zinc-800 shadow-md space-y-4"
            >
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <h3 className="text-sm font-black text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <span>IPv6 Parameters</span>
                </h3>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[10px] text-zinc-400 hover:text-blue-500 flex items-center gap-1 font-bold cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Reset
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="ipv6-address-input" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">
                    IPv6 Address Input
                  </label>
                  <Input 
                    id="ipv6-address-input"
                    type="text" 
                    value={ipv6Address} 
                    onChange={(e) => setIpv6Address(e.target.value)} 
                    placeholder="e.g. 2001:db8::1"
                    className="font-sans tabular-nums text-xs font-bold"
                  />
                </div>
                <div>
                  <label htmlFor="ipv6-prefix-input" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">
                    Prefix Length (/N)
                  </label>
                  <select
                    id="ipv6-prefix-input"
                    value={ipv6Prefix}
                    onChange={(e) => setIpv6Prefix(e.target.value)}
                    className="w-full h-9 px-3 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500 font-bold"
                  >
                    {[0, 1, 8, 16, 24, 32, 48, 56, 64, 80, 96, 112, 120, 126, 127, 128].map((p) => (
                      <option key={p} value={p}>/{p}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SUBNET SPLITTER */}
          {activeTab === "splitter" && (
            <div 
              id="panel-splitter"
              role="tabpanel"
              aria-labelledby="tab-splitter"
              className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-300 dark:border-zinc-800 shadow-md space-y-4"
            >
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <h3 className="text-sm font-black text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <span>Subnet Splitter Configuration</span>
                </h3>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[10px] text-zinc-400 hover:text-blue-500 flex items-center gap-1 font-bold cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Reset
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="splitter-base-ip" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">
                    Base Network IP
                  </label>
                  <Input 
                    id="splitter-base-ip"
                    type="text" 
                    value={splitterBaseIp} 
                    onChange={(e) => setSplitterBaseIp(e.target.value)} 
                    placeholder="e.g. 192.168.1.0"
                    className="font-sans tabular-nums text-xs font-bold"
                  />
                </div>
                <div>
                  <label htmlFor="splitter-base-cidr" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">
                    Base Prefix CIDR
                  </label>
                  <Input 
                    id="splitter-base-cidr"
                    type="number" 
                    min={0}
                    max={32}
                    value={splitterBaseCidr} 
                    onChange={(e) => setSplitterBaseCidr(e.target.value)} 
                    className="font-sans tabular-nums text-xs font-bold"
                  />
                </div>
                <div>
                  <label htmlFor="splitter-target-cidr" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">
                    Target Split CIDR
                  </label>
                  <Input 
                    id="splitter-target-cidr"
                    type="number" 
                    min={0}
                    max={32}
                    value={splitterTargetCidr} 
                    onChange={(e) => setSplitterTargetCidr(e.target.value)} 
                    className="font-sans tabular-nums text-xs font-bold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SUBNET PLANNER */}
          {activeTab === "planner" && (
            <div 
              id="panel-planner"
              role="tabpanel"
              aria-labelledby="tab-planner"
              className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-300 dark:border-zinc-800 shadow-md space-y-4"
            >
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <h3 className="text-sm font-black text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <span>Required Hosts Planner</span>
                </h3>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[10px] text-zinc-400 hover:text-blue-500 flex items-center gap-1 font-bold cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Reset
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="planner-base-ip" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">
                    Base Network Allocation
                  </label>
                  <Input 
                    id="planner-base-ip"
                    type="text" 
                    value={plannerBaseIp} 
                    onChange={(e) => setPlannerBaseIp(e.target.value)} 
                    placeholder="e.g. 192.168.1.0"
                    className="font-sans tabular-nums text-xs font-bold"
                  />
                </div>
                <div>
                  <label htmlFor="planner-hosts-input" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">
                    Required Hosts Capacity
                  </label>
                  <Input 
                    id="planner-hosts-input"
                    type="number" 
                    min={1}
                    value={plannerRequiredHosts} 
                    onChange={(e) => setPlannerRequiredHosts(e.target.value)} 
                    placeholder="e.g. 50"
                    className="font-sans tabular-nums text-xs font-bold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ROUTE SUMMARIZER */}
          {activeTab === "route_summarizer" && (
            <div 
              id="panel-route_summarizer"
              role="tabpanel"
              aria-labelledby="tab-route_summarizer"
              className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-300 dark:border-zinc-800 shadow-md space-y-4"
            >
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <h3 className="text-sm font-black text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <span>Route Summarizer (Supernetting)</span>
                </h3>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[10px] text-zinc-400 hover:text-blue-500 flex items-center gap-1 font-bold cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Reset
                </button>
              </div>

              <div>
                <label htmlFor="summarizer-routes-input" className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">
                  Enter network blocks (one per line or separated by commas)
                </label>
                <textarea
                  id="summarizer-routes-input"
                  rows={4}
                  value={summarizerNetworksString}
                  onChange={(e) => setSummarizerNetworksString(e.target.value)}
                  placeholder="10.0.0.0/24&#10;10.0.1.0/24&#10;10.0.2.0/24&#10;10.0.3.0/24"
                  className="w-full p-2.5 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-lg text-xs font-mono font-bold outline-none focus:ring-1 focus:ring-blue-500 resize-y"
                />
              </div>
            </div>
          )}

          {/* ERROR ALERT DISPLAY */}
          {result && result.error && (
            <div role="alert" className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 rounded-xl flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <div className="text-xs text-red-700 dark:text-red-300 font-medium">
                {result.error}
              </div>
            </div>
          )}

          {/* PRIMARY ANALYSIS RESULTS CARD */}
          {result && !result.error && (
            <div aria-live="polite" className="space-y-4">
              <div className="p-4 sm:p-5 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl shadow-lg space-y-3">
                <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-blue-100">
                  <span>Analysis Results</span>
                  <span>{TABS.find(t => t.id === activeTab)?.label}</span>
                </div>

                {activeTab === "ipv4" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] text-blue-200 block uppercase font-bold">Network Address</span>
                      <span className="text-lg sm:text-xl font-black font-sans tabular-nums">{result.networkAddress}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-blue-200 block uppercase font-bold">Broadcast Address</span>
                      <span className="text-lg sm:text-xl font-black font-sans tabular-nums">{result.broadcastAddress}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-blue-200 block uppercase font-bold">Usable Host Range</span>
                      <span className="text-xs sm:text-sm font-bold font-sans tabular-nums block truncate">
                        {result.firstUsable} – {result.lastUsable}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-blue-200 block uppercase font-bold">Usable Hosts Count</span>
                      <span className="text-lg sm:text-xl font-black font-sans tabular-nums">
                        {result.usableHosts?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

                {activeTab === "ipv6" && (
                  <div className="space-y-2.5">
                    <div>
                      <span className="text-[10px] text-blue-200 block uppercase font-bold">Compressed Address</span>
                      <span className="text-base sm:text-lg font-black font-sans tabular-nums break-all">{result.ipv6Compressed}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-blue-200 block uppercase font-bold">Network Prefix</span>
                      <span className="text-base sm:text-lg font-black font-sans tabular-nums break-all">{result.ipv6NetworkPrefix}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-1 border-t border-blue-400/30">
                      <div>
                        <span className="text-[10px] text-blue-200 block uppercase font-bold">Addresses in Prefix</span>
                        <span className="text-xs font-bold font-sans tabular-nums break-all">{result.ipv6AddressCountString}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-blue-200 block uppercase font-bold">Address Scope Type</span>
                        <span className="text-xs font-bold block">{result.addressType}</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "splitter" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] text-blue-200 block uppercase font-bold">Total Subnets Generated</span>
                      <span className="text-2xl font-black font-sans tabular-nums">{result.totalAddresses?.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-blue-200 block uppercase font-bold">Hosts Per Subnet</span>
                      <span className="text-2xl font-black font-sans tabular-nums">{result.usableHosts?.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                {activeTab === "planner" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] text-blue-200 block uppercase font-bold">Smallest CIDR Fit</span>
                      <span className="text-2xl font-black font-sans tabular-nums">/{result.plannerCidr}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-blue-200 block uppercase font-bold">Available Slots</span>
                      <span className="text-2xl font-black font-sans tabular-nums">{result.plannerUsableHosts?.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                {activeTab === "route_summarizer" && (
                  <div className="space-y-1">
                    <span className="text-[10px] text-blue-200 block uppercase font-bold">Summarized Supernet Block</span>
                    <span className="text-2xl font-black font-sans tabular-nums">{result.summarizedBlock}</span>
                  </div>
                )}
              </div>

              {/* DETAILED IPv4 BREAKDOWN TABLE */}
              {activeTab === "ipv4" && (
                <div className="p-4 bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-2.5 text-xs font-sans tabular-nums">
                  <span className="text-[10px] font-black uppercase text-zinc-400 dark:text-zinc-500 tracking-wider block">
                    Subnet Details
                  </span>
                  <div className="grid grid-cols-2 gap-y-2 border-t border-zinc-200 dark:border-zinc-800 pt-2">
                    <span className="text-zinc-500 dark:text-zinc-400">Dotted Netmask</span>
                    <span className="font-bold text-right text-zinc-800 dark:text-zinc-200">{result.subnetMask}</span>

                    <span className="text-zinc-500 dark:text-zinc-400">Wildcard Mask</span>
                    <span className="font-bold text-right text-zinc-800 dark:text-zinc-200">{result.wildcardMask}</span>

                    <span className="text-zinc-500 dark:text-zinc-400">Binary Mask</span>
                    <span className="font-bold text-right text-zinc-800 dark:text-zinc-200 text-[10px]">{result.binaryMask}</span>

                    <span className="text-zinc-500 dark:text-zinc-400">Classification Type</span>
                    <span className="font-bold text-right text-blue-600 dark:text-blue-400">{result.addressType}</span>

                    <span className="text-zinc-500 dark:text-zinc-400">Legacy Class</span>
                    <span className="font-bold text-right text-zinc-800 dark:text-zinc-200">{result.legacyClass}</span>

                    {result.nextSubnet && (
                      <>
                        <span className="text-zinc-500 dark:text-zinc-400">Adjacent Next Subnet</span>
                        <span className="font-bold text-right text-zinc-800 dark:text-zinc-200">{result.nextSubnet}</span>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* BINARY BREAKDOWN DISPLAY */}
              {activeTab === "ipv4" && result.binaryAddress && (
                <div className="p-4 bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-2">
                  <span className="text-[10px] font-black uppercase text-zinc-400 dark:text-zinc-500 tracking-wider block">
                    Binary IP Breakdown (Network Portion | Host Portion)
                  </span>
                  <div className="p-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-[11px] font-sans tabular-nums break-all text-zinc-800 dark:text-zinc-200">
                    <span className="font-bold text-blue-600 dark:text-blue-400">IP Bin: </span>
                    {result.binaryAddress}
                  </div>
                  <div className="p-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-[11px] font-sans tabular-nums break-all text-zinc-800 dark:text-zinc-200">
                    <span className="font-bold text-blue-600 dark:text-blue-400">Mask Bin: </span>
                    {result.binaryMask}
                  </div>
                </div>
              )}

              {/* SPLITTER LIST ENUMERATION */}
              {activeTab === "splitter" && result.subnetList && (
                <div className="p-4 bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-3">
                  <span className="text-[10px] font-black uppercase text-zinc-400 dark:text-zinc-500 tracking-wider block">
                    Enumerated Subnet Splits List
                  </span>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {result.subnetList.map(s => (
                      <div key={s.subnetIndex} className="p-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-sans tabular-nums shadow-xs">
                        <div className="flex justify-between items-center font-bold text-blue-600 dark:text-blue-400">
                          <span>Subnet #{s.subnetIndex}: {s.networkAddress}/{s.cidr}</span>
                          <span className="text-zinc-500 text-[10px]">Hosts: {s.usableHosts}</span>
                        </div>
                        <div className="text-[11px] text-zinc-600 dark:text-zinc-400 flex justify-between mt-1">
                          <span>Range: {s.firstUsable} – {s.lastUsable}</span>
                          <span>Broadcast: {s.broadcastAddress}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PLANNER DETAILS */}
              {activeTab === "planner" && (
                <div className="p-4 bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-2.5 text-xs font-sans tabular-nums">
                  <span className="text-[10px] font-black uppercase text-zinc-400 dark:text-zinc-500 tracking-wider block">
                    Planner Allocations
                  </span>
                  <div className="grid grid-cols-2 gap-y-2 border-t border-zinc-200 dark:border-zinc-800 pt-2">
                    <span className="text-zinc-500 dark:text-zinc-400">Network Block</span>
                    <span className="font-bold text-right text-zinc-800 dark:text-zinc-200">{result.networkAddress}/{result.plannerCidr}</span>

                    <span className="text-zinc-500 dark:text-zinc-400">Broadcast</span>
                    <span className="font-bold text-right text-zinc-800 dark:text-zinc-200">{result.broadcastAddress}</span>

                    <span className="text-zinc-500 dark:text-zinc-400">Usable Range</span>
                    <span className="font-bold text-right text-blue-600 dark:text-blue-400">{result.firstUsable} – {result.lastUsable}</span>
                  </div>
                </div>
              )}

              {/* CALCULATION ENGINE STEPS */}
              {result.calculationSteps && (
                <div className="p-4 bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-2">
                  <span className="text-[10px] font-black uppercase text-zinc-400 dark:text-zinc-500 tracking-wider block">
                    Calculation Engine Steps
                  </span>
                  <pre className="text-[11px] font-sans tabular-nums text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">
                    {result.calculationSteps}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* UNIFIED ACTION BAR: Copy, Copy Summary, CSV, TXT, LaTeX, Save, Print */}
          <div className="flex flex-wrap items-center justify-end gap-2 pt-3 border-t border-zinc-200 dark:border-zinc-800 no-print">
            <button
              type="button"
              onClick={handleCopy}
              disabled={!result || !!result.error}
              className="bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 font-bold rounded-xl px-2.5 py-1.5 text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
              title="Copy brief result"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>

            <button
              type="button"
              onClick={handleCopySummary}
              disabled={!result || !!result.error}
              className="bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 font-bold rounded-xl px-2.5 py-1.5 text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
              title="Copy complete analysis report"
            >
              {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <FileText className="w-3.5 h-3.5 text-indigo-500" />}
              <span>{copiedSummary ? "Summary Copied" : "Copy Summary"}</span>
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              disabled={!result || !!result.error}
              className="bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 font-bold rounded-xl px-2.5 py-1.5 text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
              title="Export CSV data"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>CSV</span>
            </button>

            <button
              type="button"
              onClick={handleExportTXT}
              disabled={!result || !!result.error}
              className="bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 font-bold rounded-xl px-2.5 py-1.5 text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
              title="Download text engineering report"
            >
              <FileText className="w-3.5 h-3.5 text-amber-600" />
              <span>TXT</span>
            </button>

            <button
              type="button"
              onClick={handleCopyLatex}
              disabled={!result || !!result.error}
              className="bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 font-bold rounded-xl px-2.5 py-1.5 text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
              title="Copy LaTeX formula equations"
            >
              {copiedLatex ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <span className="font-serif font-black text-blue-600 text-xs">TeX</span>}
              <span>{copiedLatex ? "LaTeX Copied" : "LaTeX"}</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={!result || !!result.error}
              className="bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 font-bold rounded-xl px-2.5 py-1.5 text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
              title="Save calculation to history"
            >
              {justSaved ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Bookmark className="w-3.5 h-3.5 text-amber-500" />}
              <span>{justSaved ? "Saved" : "Save"}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 font-bold rounded-xl px-2.5 py-1.5 text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              title="Print document"
            >
              <Printer className="w-3.5 h-3.5 text-purple-600" />
              <span>Print</span>
            </button>
          </div>

          {/* HISTORY BOOKMARKS LIST */}
          {savedItems.length > 0 && (
            <div className="p-4 bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-300 dark:border-zinc-800 rounded-2xl space-y-3 no-print">
              <span className="text-[10px] font-black uppercase text-zinc-400 dark:text-zinc-500 tracking-wider flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-blue-600" /> Saved Subnets History ({savedItems.length})
              </span>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {savedItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-sans tabular-nums shadow-xs">
                    <div className="truncate pr-3">
                      <span className="font-bold text-zinc-800 dark:text-zinc-200 block truncate">{item.title}</span>
                      <span className="text-[10px] text-zinc-500 block truncate">{item.value} ({item.timestamp})</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleRestore(item)}
                        title="Restore this calculation"
                        className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSaved(item.id)}
                        title="Delete record"
                        className="p-1 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: SEARCHABLE SUBNET MASK REFERENCE TABLE */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-300 dark:border-zinc-800 shadow-md space-y-3">
            <div className="border-b border-zinc-200 dark:border-zinc-800 pb-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-400 flex items-center justify-between">
                <span>IPv4 Subnet Reference Table</span>
                <span className="text-[10px] text-blue-600 dark:text-blue-400 lowercase font-normal">(click to load)</span>
              </h3>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">
                Dotted-decimal masks &amp; traditional host counts (/0 to /32).
              </p>
            </div>
            
            {/* Search filter input */}
            <Input
              id="subnet-table-search"
              type="text"
              placeholder="Search prefix (/24), mask, or hosts..."
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
              className="h-8 text-xs font-sans"
            />

            {/* Reference Table container */}
            <div className="overflow-x-auto text-[10px] max-h-96 overflow-y-auto scrollbar-thin">
              <table className="w-full text-left border-collapse" aria-label="IPv4 Subnet Mask Reference Table">
                <thead>
                  <tr className="border-b border-zinc-300 dark:border-zinc-700 font-bold text-zinc-500 dark:text-zinc-400">
                    <th className="py-1.5 pr-2">Prefix</th>
                    <th className="py-1.5">Subnet Mask</th>
                    <th className="py-1.5 text-right">Usable Hosts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {filteredRows.map(row => (
                    <tr
                      key={row.prefix}
                      tabIndex={0}
                      role="button"
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleRowClick(row.prefix); }}
                      onClick={() => handleRowClick(row.prefix)}
                      className="hover:bg-blue-50/60 dark:hover:bg-blue-950/30 cursor-pointer transition-colors focus:outline-none focus:bg-blue-50 dark:focus:bg-blue-950/40"
                    >
                      <td className="py-1.5 pr-2 font-sans tabular-nums font-bold text-blue-600 dark:text-blue-400">/{row.prefix}</td>
                      <td className="py-1.5 font-sans tabular-nums text-zinc-700 dark:text-zinc-300">{row.mask}</td>
                      <td className="py-1.5 text-right font-sans tabular-nums text-zinc-600 dark:text-zinc-400">{row.usableHosts}</td>
                    </tr>
                  ))}
                  {filteredRows.length === 0 && (
                    <tr>
                      <td colSpan={3} className="py-4 text-center text-zinc-400 font-bold">No matching subnet prefix found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default IPSubnetCalculator;
