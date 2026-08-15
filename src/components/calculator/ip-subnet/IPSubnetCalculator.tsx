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
  Check
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { calculateIPSubnetCalculator, expandIPv6, compressIPv6, integerToIP, cidrToMaskInt } from "@/app/calculators/ip-subnet-calculator/calculator";
import { IPSubnetCalculatorInputs, IPSubnetCalculatorOutputs } from "@/app/calculators/ip-subnet-calculator/types";

// Tabs definitions
const TABS = [
  { id: "ipv4", label: "IPv4 Subnet" },
  { id: "ipv6", label: "IPv6 Subnet" },
  { id: "splitter", label: "Subnet Splitter" },
  { id: "planner", label: "Subnet Planner" },
  { id: "route_summarizer", label: "Route Summarizer" }
];

// Bidirectional lookup lists for CIDR to Subnet Mask
const CIDR_MASKS: Record<number, string> = {
  0: "0.0.0.0", 1: "128.0.0.0", 2: "192.0.0.0", 3: "224.0.0.0", 4: "240.0.0.0",
  5: "248.0.0.0", 6: "252.0.0.0", 7: "254.0.0.0", 8: "255.0.0.0", 9: "255.128.0.0",
  10: "255.192.0.0", 11: "255.224.0.0", 12: "255.240.0.0", 13: "255.248.0.0",
  14: "255.252.0.0", 15: "255.254.0.0", 16: "255.255.0.0", 17: "255.255.128.0",
  18: "255.255.192.0", 19: "255.255.224.0", 20: "255.255.240.0", 21: "255.255.248.0",
  22: "255.255.252.0", 23: "255.255.254.0", 24: "255.255.255.0", 25: "255.255.255.128",
  26: "255.255.255.192", 27: "255.255.255.224", 28: "255.255.255.240", 29: "255.255.255.248",
  30: "255.255.255.252", 31: "255.255.255.254", 32: "255.255.255.255"
};

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
  const [savedItems, setSavedItems] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  // Load bookmarks history from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("saved_ip_calculations");
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
    const parsed = parseInt(val);
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 32) {
      setSubnetMask(CIDR_MASKS[parsed]);
    }
  };

  // Bidirectional sync: Subnet Mask updates CIDR
  const handleMaskChange = (val: string) => {
    setSubnetMask(val);
    const foundCidr = Object.keys(CIDR_MASKS).find(k => CIDR_MASKS[Number(k)] === val);
    if (foundCidr !== undefined) {
      setCidr(foundCidr);
    }
  };

  // Sync Network Class selection to CIDR defaults
  const handleClassSelection = (c: string) => {
    setNetworkClass(c);
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

  // Compile inputs for calculator core
  const currentInputs: IPSubnetCalculatorInputs = useMemo(() => {
    return {
      activeTab,
      ipAddress,
      cidr: parseInt(cidr) || 24,
      subnetMask,
      networkClass,
      ipv6Address,
      ipv6Prefix: parseInt(ipv6Prefix) || 64,
      splitterBaseIp,
      splitterBaseCidr: parseInt(splitterBaseCidr) || 24,
      splitterTargetCidr: parseInt(splitterTargetCidr) || 26,
      plannerBaseIp,
      plannerRequiredHosts: parseInt(plannerRequiredHosts) || 1,
      summarizerNetworksString
    };
  }, [
    activeTab, ipAddress, cidr, subnetMask, networkClass, ipv6Address, ipv6Prefix,
    splitterBaseIp, splitterBaseCidr, splitterTargetCidr, plannerBaseIp, plannerRequiredHosts,
    summarizerNetworksString
  ]);

  // Validation errors
  const validationErrors = useMemo(() => {
    const errors: string[] = [];
    if (activeTab === "ipv4") {
      const parts = ipAddress.split(".");
      if (parts.length !== 4) {
        errors.push("IPv4 address must contain exactly 4 octets separated by dots.");
      } else {
        parts.forEach(p => {
          const val = Number(p);
          if (isNaN(val) || val < 0 || val > 255 || p === "") {
            errors.push(`Octet '${p || "blank"}' is invalid. Must be an integer between 0 and 255.`);
          }
        });
      }
      const cVal = parseInt(cidr);
      if (isNaN(cVal) || cVal < 0 || cVal > 32) {
        errors.push("CIDR prefix size must be a number between 0 and 32.");
      }
    } else if (activeTab === "ipv6") {
      const exp = expandIPv6(ipv6Address);
      if (!exp) {
        errors.push("Invalid IPv6 address. Ensure hexadecimal groups are separated by colons.");
      }
      const pVal = parseInt(ipv6Prefix);
      if (isNaN(pVal) || pVal < 0 || pVal > 128) {
        errors.push("IPv6 prefix length must be between 0 and 128.");
      }
    } else if (activeTab === "splitter") {
      if (parseInt(splitterTargetCidr) < parseInt(splitterBaseCidr)) {
        errors.push("Target split prefix CIDR must be larger than or equal to the base network CIDR.");
      }
    }
    return errors;
  }, [activeTab, ipAddress, cidr, ipv6Address, ipv6Prefix, splitterBaseCidr, splitterTargetCidr]);

  // Run calculation
  const result: IPSubnetCalculatorOutputs | null = useMemo(() => {
    if (validationErrors.length > 0) return null;
    try {
      return calculateIPSubnetCalculator(currentInputs);
    } catch (e) {
      return null;
    }
  }, [currentInputs, validationErrors]);

  // Reset parameters
  const handleReset = () => {
    setIpAddress("192.168.1.25");
    handleCidrChange("24");
    setNetworkClass("Any");
    setIpv6Address("2001:db8::1");
    setIpv6Prefix("64");
    setSplitterBaseIp("192.168.1.0");
    setSplitterBaseCidr("24");
    setSplitterTargetCidr("26");
    setPlannerBaseIp("192.168.1.0");
    setPlannerRequiredHosts("50");
    setSummarizerNetworksString("10.0.0.0/24\n10.0.1.0/24\n10.0.2.0/24\n10.0.3.0/24");
  };

  // Save calculation bookmark to localStorage
  const handleSave = () => {
    if (!result) return;
    let label = "";
    if (activeTab === "ipv4") {
      label = `IPv4: ${result.ipAddress}/${result.cidr} (Subnet ID: ${result.networkAddress})`;
    } else if (activeTab === "ipv6") {
      label = `IPv6: ${result.ipv6Compressed} (Prefix: /${ipv6Prefix})`;
    } else if (activeTab === "splitter") {
      label = `Split: ${splitterBaseIp}/${splitterBaseCidr} split into /${splitterTargetCidr}`;
    } else if (activeTab === "planner") {
      label = `Plan: required ${plannerRequiredHosts} hosts -> CIDR /${result.plannerCidr}`;
    } else if (activeTab === "route_summarizer") {
      label = `Summary: aggregated supernet = ${result.summarizedBlock}`;
    }

    const newItem = {
      id: Date.now().toString(),
      tab: activeTab,
      title: label,
      value: result.networkAddress || result.ipv6Compressed || result.summarizedBlock,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      inputs: { ...currentInputs }
    };

    const updated = [newItem, ...savedItems.filter(i => i.title !== label)].slice(0, 15);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_ip_calculations", JSON.stringify(updated));
    } catch (e) {}
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  // Delete saved calculation
  const handleDeleteSaved = (id: string) => {
    const updated = savedItems.filter(i => i.id !== id);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_ip_calculations", JSON.stringify(updated));
    } catch (e) {}
  };

  // Copy details to clipboard
  const handleCopy = () => {
    if (!result) return;
    let summaryText = `IP Subnet Analysis Report\n` +
      `---------------------------------\n` +
      `Calculator Mode: ${TABS.find(t => t.id === activeTab)?.label}\n`;

    if (activeTab === "ipv4") {
      summaryText += `IP Address: ${result.ipAddress}\n` +
        `Subnet Mask: ${result.subnetMask}\n` +
        `Network Address: ${result.networkAddress}\n` +
        `Broadcast Address: ${result.broadcastAddress}\n` +
        `Usable Host Range: ${result.firstUsable} - ${result.lastUsable}\n` +
        `Usable Hosts: ${result.usableHosts}\n`;
    } else if (activeTab === "ipv6") {
      summaryText += `IPv6 Address: ${result.ipv6Compressed}\n` +
        `Network Prefix: ${result.ipv6NetworkPrefix}\n` +
        `IP Count: ${result.ipv6AddressCountString}\n`;
    }

    if (result.calculationSteps) {
      summaryText += `\nSteps:\n${result.calculationSteps}\n`;
    }

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Share link
  const handleShare = () => {
    if (!result) return;
    const url = `${window.location.origin}${window.location.pathname}?tab=${activeTab}`;
    if (navigator.share) {
      navigator.share({
        title: "IP Subnet Calculator Results",
        text: `Network Subnet analysis config: ${result.networkAddress || result.ipv6Compressed}. View details:`,
        url
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      alert("Share URL link copied to clipboard!");
    }
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
    for (let p = 1; p <= 32; p++) {
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
    const s = tableSearch.toLowerCase();
    return referenceRows.filter(r => 
      r.prefix.toString().includes(s) || 
      r.mask.includes(s) || 
      r.wildcard.includes(s)
    );
  }, [tableSearch, referenceRows]);

  return (
    <div className="space-y-6">
      {/* TABS CONTROL BAR */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-zinc-200 dark:border-zinc-800 scrollbar-none text-xs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-lg font-black whitespace-nowrap transition-all cursor-pointer ${
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
      <div className="flex flex-wrap items-center gap-2 p-2.5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-300 dark:border-zinc-700 shadow-sm">
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
            <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-300 dark:border-zinc-800 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                <h3 className="text-sm font-black text-blue-600 dark:text-blue-400 flex items-center gap-2"><span>IPv4 Parameters</span>
                </h3>
                <button
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
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">IPv4 Host IP Address</label>
                  <Input 
                    type="text" 
                    value={ipAddress} 
                    onChange={(e) => setIpAddress(e.target.value)} 
                    className="font-sans tabular-nums text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">Subnet Prefix Length</label>
                  <div className="flex gap-1.5">
                    <select
                      value={cidr}
                      onChange={(e) => handleCidrChange(e.target.value)}
                      className="flex-1 h-9 px-3 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500 font-bold"
                    >
                      {Array.from({ length: 33 }).map((_, i) => (
                        <option key={i} value={i}>/{i} ({CIDR_MASKS[i]})</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">Dotted Subnet Mask (Bidirectional)</label>
                  <select
                    value={subnetMask}
                    onChange={(e) => handleMaskChange(e.target.value)}
                    className="w-full h-9 px-3 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500 font-bold"
                  >
                    {Object.values(CIDR_MASKS).map(mask => (
                      <option key={mask} value={mask}>{mask}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: IPv6 SUBNET CALCULATOR */}
          {activeTab === "ipv6" && (
            <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-300 dark:border-zinc-800 shadow-md space-y-4">
              <h3 className="text-sm font-black text-blue-600 dark:text-blue-400 flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2"><span>IPv6 Parameters</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">IPv6 Address Input</label>
                  <Input 
                    type="text" 
                    value={ipv6Address} 
                    onChange={(e) => setIpv6Address(e.target.value)} 
                    className="font-sans tabular-nums text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">Prefix Length (/N)</label>
                  <select
                    value={ipv6Prefix}
                    onChange={(e) => setIpv6Prefix(e.target.value)}
                    className="w-full h-9 px-3 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500 font-bold"
                  >
                    {[0, 16, 32, 48, 56, 60, 64, 80, 96, 112, 120, 128].map(p => (
                      <option key={p} value={p}>/{p}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SUBNET SPLITTER / LIST */}
          {activeTab === "splitter" && (
            <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-300 dark:border-zinc-800 shadow-md space-y-4">
              <h3 className="text-sm font-black text-blue-600 dark:text-blue-400 flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2"><span>Subnet Splitter Configuration</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">Base Network IP</label>
                  <Input type="text" value={splitterBaseIp} onChange={(e) => setSplitterBaseIp(e.target.value)} className="font-sans tabular-nums text-xs font-bold" />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">Base Prefix CIDR</label>
                  <Input type="number" min="0" max="32" value={splitterBaseCidr} onChange={(e) => setSplitterBaseCidr(e.target.value)} className="font-sans tabular-nums text-xs" />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">Target Split CIDR</label>
                  <Input type="number" min="0" max="32" value={splitterTargetCidr} onChange={(e) => setSplitterTargetCidr(e.target.value)} className="font-sans tabular-nums text-xs font-bold" />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SUBNET PLANNER */}
          {activeTab === "planner" && (
            <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-300 dark:border-zinc-800 shadow-md space-y-4">
              <h3 className="text-sm font-black text-blue-600 dark:text-blue-400 flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2"><span>Required Hosts Planner</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">Base Network Allocation</label>
                  <Input type="text" value={plannerBaseIp} onChange={(e) => setPlannerBaseIp(e.target.value)} className="font-sans tabular-nums text-xs font-bold" />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">Required Hosts Capacity</label>
                  <Input type="number" min="1" value={plannerRequiredHosts} onChange={(e) => setPlannerRequiredHosts(e.target.value)} className="font-sans tabular-nums text-xs font-bold" />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ROUTE SUMMARIZER */}
          {activeTab === "route_summarizer" && (
            <div className="p-4 sm:p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-300 dark:border-zinc-800 shadow-md space-y-4">
              <h3 className="text-sm font-black text-blue-600 dark:text-blue-400 flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2"><span>Route Summarizer (Supernetting)</span>
              </h3>
              <div>
                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 block mb-1">
                  Enter network blocks (one per line or separated by commas)
                </label>
                <textarea
                  rows={4}
                  value={summarizerNetworksString}
                  onChange={(e) => setSummarizerNetworksString(e.target.value)}
                  className="w-full p-2.5 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 rounded-xl font-sans tabular-nums text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                  placeholder="e.g.&#10;192.168.0.0/24&#10;192.168.1.0/24"
                />
              </div>
            </div>
          )}

          {/* ERROR DISPLAY CARD */}
          {validationErrors.length > 0 && (
            <div className="p-3 border border-red-200 dark:border-red-900/60 bg-red-50/50 dark:bg-red-950/20 rounded-xl space-y-1">
              {validationErrors.map((err, index) => (
                <p key={index} className="text-[11px] font-bold text-red-600 dark:text-red-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> {err}
                </p>
              ))}
            </div>
          )}

          {/* RESULTS CARDS */}
          {result && !result.error && (
            <div className="space-y-4">
              
              {/* PRIMARY STATS GRID */}
              <div className="p-5 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-750 dark:to-indigo-850 rounded-2xl text-white shadow-lg space-y-3">
                <div className="flex items-center justify-between border-b border-white/20 pb-2">
                  <span className="text-[10px] uppercase font-black tracking-widest text-blue-200">Analysis Results</span>
                  <span className="text-xs font-black">{TABS.find(t => t.id === activeTab)?.label}</span>
                </div>

                {activeTab === "ipv4" ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block">NETWORK ADDRESS</span>
                      <span className="text-lg font-black">{result.networkAddress}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block">BROADCAST ADDRESS</span>
                      <span className="text-lg font-black">{result.broadcastAddress}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block">USABLE HOST RANGE</span>
                      <span className="text-sm font-black">{result.firstUsable} – {result.lastUsable}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block">USABLE HOSTS COUNT</span>
                      <span className="text-lg font-black">{result.usableHosts?.toLocaleString()}</span>
                    </div>
                  </div>
                ) : activeTab === "ipv6" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-0.5 sm:col-span-2">
                      <span className="text-[10px] text-blue-100 font-bold block">COMPRESSED ADDRESS</span>
                      <span className="text-base font-black font-sans tabular-nums break-all">{result.ipv6Compressed}</span>
                    </div>
                    <div className="space-y-0.5 sm:col-span-2">
                      <span className="text-[10px] text-blue-100 font-bold block">NETWORK PREFIX</span>
                      <span className="text-base font-black font-sans tabular-nums break-all">{result.ipv6NetworkPrefix}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block">ADDRESSES IN PREFIX</span>
                      <span className="text-sm font-black">{result.ipv6AddressCountString}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block">ADDRESS SCOPE TYPE</span>
                      <span className="text-sm font-black">{result.addressType}</span>
                    </div>
                  </div>
                ) : activeTab === "splitter" ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block">TOTAL SUBNETS GENERATED</span>
                      <span className="text-lg font-black">{result.totalAddresses?.toLocaleString()}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block">HOSTS PER SUBNET</span>
                      <span className="text-lg font-black">{result.usableHosts?.toLocaleString()}</span>
                    </div>
                  </div>
                ) : activeTab === "planner" ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block">SMALLEST CIDR FIT</span>
                      <span className="text-lg font-black">/{result.plannerCidr}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-blue-100 font-bold block">AVAILABLE SLOTS</span>
                      <span className="text-lg font-black">{result.plannerUsableHosts?.toLocaleString()}</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-blue-100 font-bold block">SUMMARIZED SUPERNET BLOCK</span>
                    <span className="text-lg font-black font-sans tabular-nums">{result.summarizedBlock}</span>
                  </div>
                )}
              </div>

              {/* DETAILED RESULTS TABLE (IPv4 ONLY) */}
              {activeTab === "ipv4" && (
                <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-black uppercase text-zinc-400 dark:text-zinc-500 tracking-wider">Subnet Details</span>
                  <div className="overflow-x-auto text-xs">
                    <table className="w-full text-left border-collapse">
                      <tbody>
                        <tr className="border-b border-zinc-200 dark:border-zinc-800">
                          <td className="py-2 text-zinc-500 font-bold">Dotted Netmask</td>
                          <td className="py-2 font-sans tabular-nums font-bold text-zinc-800 dark:text-zinc-200">{result.subnetMask}</td>
                        </tr>
                        <tr className="border-b border-zinc-200 dark:border-zinc-800">
                          <td className="py-2 text-zinc-500 font-bold">Wildcard Mask</td>
                          <td className="py-2 font-sans tabular-nums text-zinc-800 dark:text-zinc-200">{result.wildcardMask}</td>
                        </tr>
                        <tr className="border-b border-zinc-200 dark:border-zinc-800">
                          <td className="py-2 text-zinc-500 font-bold">Binary Mask</td>
                          <td className="py-2 font-sans tabular-nums text-[10px] text-zinc-800 dark:text-zinc-200 break-all">{result.binaryMask}</td>
                        </tr>
                        <tr className="border-b border-zinc-200 dark:border-zinc-800">
                          <td className="py-2 text-zinc-500 font-bold">Classification Type</td>
                          <td className="py-2 text-zinc-800 dark:text-zinc-200 font-bold">{result.addressType}</td>
                        </tr>
                        <tr className="border-b border-zinc-200 dark:border-zinc-800">
                          <td className="py-2 text-zinc-500 font-bold">Legacy Class</td>
                          <td className="py-2 text-zinc-800 dark:text-zinc-200">{result.legacyClass}</td>
                        </tr>
                        {result.prevSubnet && (
                          <tr className="border-b border-zinc-200 dark:border-zinc-800">
                            <td className="py-2 text-zinc-500 font-bold">Offsets Subnets</td>
                            <td className="py-2 text-zinc-800 dark:text-zinc-200 flex gap-4">
                              <button onClick={() => setIpAddress(result.prevSubnet!)} className="text-blue-600 font-bold hover:underline cursor-pointer">
                                ⟵ Prev Subnet ({result.prevSubnet})
                              </button>
                              <button onClick={() => setIpAddress(result.nextSubnet!)} className="text-blue-600 font-bold hover:underline cursor-pointer">
                                Next Subnet ({result.nextSubnet}) ⟶
                              </button>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* BINARY VISUAL BREAKDOWN CARD (IPv4 ONLY) */}
              {activeTab === "ipv4" && result.binaryAddress && (
                <div className="p-4 bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-300 dark:border-zinc-800 rounded-2xl space-y-2">
                  <span className="text-[10px] font-black uppercase text-zinc-400 dark:text-zinc-500 tracking-wider">
                    Binary IP breakdown (Network portion | Host portion)
                  </span>
                  <div className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl font-sans tabular-nums text-xs leading-relaxed space-y-1 shadow-inner">
                    <div className="flex justify-between border-b dark:border-zinc-800 pb-1">
                      <span className="text-zinc-400 font-bold">IP Bin:</span>
                      <span className="text-zinc-800 dark:text-zinc-200 font-black">{result.binaryAddress}</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-zinc-400 font-bold">Mask Bin:</span>
                      <span className="text-zinc-800 dark:text-zinc-200">{result.binaryMask}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SUBNETS LIST GENERATED CARD (SPLITTER ONLY) */}
              {activeTab === "splitter" && result.subnetList && (
                <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl space-y-3">
                  <span className="text-[10px] font-black uppercase text-zinc-400 dark:text-zinc-500 tracking-wider">
                    Enumerated Subnet Splits List
                  </span>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {result.subnetList.map(sub => (
                      <div key={sub.subnetIndex} className="p-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-xl text-[11px] font-sans tabular-nums shadow-xs space-y-1">
                        <div className="flex justify-between font-bold border-b dark:border-zinc-800 pb-1">
                          <span className="text-blue-600">Subnet #{sub.subnetIndex}: {sub.networkAddress}/{sub.cidr}</span>
                          <span className="text-zinc-400">Hosts: {sub.usableHosts.toLocaleString()}</span>
                        </div>
                        <div className="grid grid-cols-2 text-zinc-500 gap-1">
                          <div>Range: {sub.firstUsable} – {sub.lastUsable}</div>
                          <div className="text-right">Broadcast: {sub.broadcastAddress}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PLANNER RESULTS DETAILS */}
              {activeTab === "planner" && (
                <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-2xl shadow-sm space-y-3 text-xs">
                  <span className="text-[10px] font-black uppercase text-zinc-400 dark:text-zinc-500 tracking-wider">Planner Allocations</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div><strong>Network Block:</strong> {result.networkAddress}/{result.plannerCidr}</div>
                    <div><strong>Broadcast:</strong> {result.broadcastAddress}</div>
                    <div className="col-span-2"><strong>Usable Range:</strong> {result.firstUsable} – {result.lastUsable}</div>
                  </div>
                </div>
              )}

              {/* STEP BY STEP CALCULATION BREAKDOWN */}
              {result.calculationSteps && (
                <div className="p-4 bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-300 dark:border-zinc-800 rounded-2xl">
                  <span className="text-[11px] font-black uppercase text-zinc-400 dark:text-zinc-500 tracking-wider block mb-2">
                    Calculation Engine Steps
                  </span>
                  <pre className="text-[11px] font-sans tabular-nums text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">
                    {result.calculationSteps}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* UNIFIED ACTION BAR: Copy, Save, Share, Print */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-200 dark:border-zinc-800 no-print">
            <button
              type="button"
              onClick={handleCopy}
              disabled={!result || !!result.error}
              className="text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />}
              <span>{copied ? "Copied!" : "Copy Result"}</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={!result || !!result.error}
              className="text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40"
            >
              {justSaved ? <Check className="w-4 h-4 text-emerald-500" /> : <Bookmark className="w-4 h-4 text-amber-500" />}
              <span>{justSaved ? "Saved!" : "Save"}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              disabled={!result || !!result.error}
              className="text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40"
            >
              <Share2 className="w-4 h-4 text-blue-500" />
              <span>Share Link</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-purple-500" />
              <span>Print Report</span>
            </button>
          </div>

          {/* HISTORY BOOKMARKS LIST */}
          {savedItems.length > 0 && (
            <div className="p-4 bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-300 dark:border-zinc-800 rounded-2xl space-y-3">
              <span className="text-[10px] font-black uppercase text-zinc-400 dark:text-zinc-500 tracking-wider flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-blue-600" /> Saved Subnets History ({savedItems.length})
              </span>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {savedItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-sans tabular-nums shadow-xs">
                    <span className="truncate pr-4 text-zinc-700 dark:text-zinc-300 font-bold">{item.title}</span>
                    <button
                      onClick={() => handleDeleteSaved(item.id)}
                      className="text-zinc-400 hover:text-red-500 cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
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
              <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">Interactive Subnet Table (Click to load)
              </h3>
            </div>
            
            {/* Search filter input */}
            <Input
              type="text"
              placeholder="Search by prefix (/24) or mask..."
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
              className="h-8 text-xs"
            />

            {/* Reference Table container */}
            <div className="overflow-x-auto text-[10px] max-h-96 overflow-y-auto scrollbar-thin">
              <table className="w-full text-left border-collapse">
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
                      onClick={() => handleRowClick(row.prefix)}
                      className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer transition-colors"
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
