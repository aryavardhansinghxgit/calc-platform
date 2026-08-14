"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Wifi,
  Download,
  Upload,
  Server,
  Users,
  ArrowRightLeft,
  Copy,
  Check,
  Share2,
  Printer,
  RotateCcw,
  Sliders,
  Sparkles,
  HardDrive,
  Clock,
  Zap,
  Activity,
  ShieldAlert,
  HelpCircle,
  Tv,
  Gamepad2,
  Video,
  Cloud,
  Laptop,
  Radio,
  FileSpreadsheet,
  Globe,
  Gauge,
  Info,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReportModal from "@/components/report/ReportModal";

// --- UNITS & MULTIPLIERS (Bits based) ---
const DATA_UNITS: Record<string, { label: string; bits: number }> = {
  B: { label: "Bytes (B)", bits: 8 },
  KB: { label: "Kilobytes (KB)", bits: 8 * 1000 },
  MB: { label: "Megabytes (MB)", bits: 8 * 1000 * 1000 },
  GB: { label: "Gigabytes (GB)", bits: 8 * 1000 * 1000 * 1000 },
  TB: { label: "Terabytes (TB)", bits: 8 * 1000 * 1000 * 1000 * 1000 },
  PB: { label: "Petabytes (PB)", bits: 8 * 1000 * 1000 * 1000 * 1000 * 1000 },
};

const SPEED_UNITS: Record<string, { label: string; bps: number }> = {
  bps: { label: "bits per sec (bps)", bps: 1 },
  Kbps: { label: "Kilobits/s (Kbps)", bps: 1000 },
  Mbps: { label: "Megabits/s (Mbps)", bps: 1000 * 1000 },
  Gbps: { label: "Gigabits/s (Gbps)", bps: 1000 * 1000 * 1000 },
  Tbps: { label: "Terabits/s (Tbps)", bps: 1000 * 1000 * 1000 * 1000 },
  "B/s": { label: "Bytes/s (B/s)", bps: 8 },
  "KB/s": { label: "Kilobytes/s (KB/s)", bps: 8 * 1000 },
  "MB/s": { label: "Megabytes/s (MB/s)", bps: 8 * 1000 * 1000 },
  "GB/s": { label: "Gigabytes/s (GB/s)", bps: 8 * 1000 * 1000 * 1000 },
  "TB/s": { label: "Terabytes/s (TB/s)", bps: 8 * 1000 * 1000 * 1000 * 1000 },
};

function formatSeconds(totalSecs: number): string {
  if (!isFinite(totalSecs) || totalSecs <= 0) return "0 seconds";
  if (totalSecs < 1) return "< 1 second";

  const days = Math.floor(totalSecs / (3600 * 24));
  const hours = Math.floor((totalSecs % (3600 * 24)) / 3600);
  const mins = Math.floor((totalSecs % 3600) / 60);
  const secs = Math.floor(totalSecs % 60);

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (mins > 0) parts.push(`${mins}m`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

  return parts.join(" ");
}

export function BandwidthCalculator() {
  const [activeTab, setActiveTab] = useState<"transfer" | "conversion" | "hosting" | "concurrency">("transfer");

  // Mode 1: Data Transfer Time State
  const [fileSize, setFileSize] = useState<number>(10);
  const [fileSizeUnit, setFileSizeUnit] = useState<string>("GB");
  const [speed, setSpeed] = useState<number>(100);
  const [speedUnit, setSpeedUnit] = useState<string>("Mbps");
  const [overheadPercent, setOverheadPercent] = useState<number>(10); // Protocol overhead %
  const [ispEfficiency, setIspEfficiency] = useState<number>(90); // Actual vs plan %

  // Mode 2: Bandwidth Converter State
  const [convertVal, setConvertVal] = useState<number>(100);
  const [convertUnit, setConvertUnit] = useState<string>("Mbps");

  // Mode 3: Hosting Bandwidth State
  const [pageViews, setPageViews] = useState<number>(500000);
  const [viewsPeriod, setViewsPeriod] = useState<"month" | "day" | "hour">("month");
  const [avgPageSize, setAvgPageSize] = useState<number>(2.5);
  const [pageSizeUnit, setPageSizeUnit] = useState<string>("MB");
  const [redundancyFactor, setRedundancyFactor] = useState<number>(2.0);
  const [botOverheadPercent, setBotOverheadPercent] = useState<number>(15);

  // Mode 4: Multi-User Concurrency State
  const [concurrencyItems, setConcurrencyItems] = useState({
    stream4k: 2,
    stream1080p: 4,
    voip: 5,
    gaming: 2,
    backups: 1,
    remoteDesktop: 3,
    smartHome: 10,
  });
  const [headroomPercent, setHeadroomPercent] = useState<number>(20);

  // Data Cap Predictor State
  const [dataCapTb, setDataCapTb] = useState<number>(1.2);

  // Utility Actions State
  const [copied, setCopied] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  // URL Query Sync on Load
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.has("tab")) {
      const t = params.get("tab");
      if (t === "transfer" || t === "conversion" || t === "hosting" || t === "concurrency") {
        setActiveTab(t);
      }
    }
    if (params.has("size")) setFileSize(Number(params.get("size")) || 10);
    if (params.has("sizeUnit")) setFileSizeUnit(params.get("sizeUnit") || "GB");
    if (params.has("speed")) setSpeed(Number(params.get("speed")) || 100);
    if (params.has("speedUnit")) setSpeedUnit(params.get("speedUnit") || "Mbps");
  }, []);

  // --- CALCULATION LOGIC: MODE 1 (TRANSFER TIME) ---
  const transferResults = useMemo(() => {
    const totalBits = fileSize * (DATA_UNITS[fileSizeUnit]?.bits || DATA_UNITS.GB.bits);
    const nominalBps = speed * (SPEED_UNITS[speedUnit]?.bps || SPEED_UNITS.Mbps.bps);

    // Theoretical
    const theoreticalSecs = nominalBps > 0 ? totalBits / nominalBps : 0;

    // Realistic Speed accounting for protocol overhead & ISP measured efficiency
    const effectiveBps = nominalBps * (1 - overheadPercent / 100) * (ispEfficiency / 100);
    const realisticSecs = effectiveBps > 0 ? totalBits / effectiveBps : 0;

    const effectiveMBps = (effectiveBps / 8) / (1000 * 1000);

    return {
      theoreticalSecs,
      theoreticalFormatted: formatSeconds(theoreticalSecs),
      realisticSecs,
      realisticFormatted: formatSeconds(realisticSecs),
      effectiveBps,
      effectiveMBps: effectiveMBps.toFixed(2),
    };
  }, [fileSize, fileSizeUnit, speed, speedUnit, overheadPercent, ispEfficiency]);

  // --- CALCULATION LOGIC: MODE 2 (CONVERTER) ---
  const conversionResults = useMemo(() => {
    // Base bits per second or base total bits
    const isDataUnit = DATA_UNITS[convertUnit] !== undefined;
    const baseBits = isDataUnit
      ? convertVal * DATA_UNITS[convertUnit].bits
      : convertVal * (SPEED_UNITS[convertUnit]?.bps || 1);

    const bitsPerSec = convertVal * (SPEED_UNITS[convertUnit]?.bps || 1);

    return {
      bits: baseBits,
      bps: bitsPerSec,
      b: bitsPerSec,
      B: bitsPerSec / 8,
      Kbps: bitsPerSec / 1000,
      Mbps: bitsPerSec / (1000 * 1000),
      Gbps: bitsPerSec / (1000 * 1000 * 1000),
      Tbps: bitsPerSec / (1000 * 1000 * 1000 * 1000),
      "KB/s": bitsPerSec / (8 * 1000),
      "MB/s": bitsPerSec / (8 * 1000 * 1000),
      "GB/s": bitsPerSec / (8 * 1000 * 1000 * 1000),
      "TB/s": bitsPerSec / (8 * 1000 * 1000 * 1000 * 1000),
      gbPerMonth: (bitsPerSec * 3600 * 24 * 30) / (8 * 1000 * 1000 * 1000),
      tbPerMonth: (bitsPerSec * 3600 * 24 * 30) / (8 * 1000 * 1000 * 1000 * 1000),
    };
  }, [convertVal, convertUnit]);

  // --- CALCULATION LOGIC: MODE 3 (HOSTING BANDWIDTH) ---
  const hostingResults = useMemo(() => {
    // Convert views to monthly equivalent
    let monthlyViews = pageViews;
    if (viewsPeriod === "day") monthlyViews = pageViews * 30.4375;
    if (viewsPeriod === "hour") monthlyViews = pageViews * 24 * 30.4375;

    const pageSizeBytes = avgPageSize * (pageSizeUnit === "GB" ? 1000 * 1000 * 1000 : pageSizeUnit === "KB" ? 1000 : 1000 * 1000);

    const baseMonthlyBytes = monthlyViews * pageSizeBytes;
    const totalMonthlyBytesWithBot = baseMonthlyBytes * (1 + botOverheadPercent / 100);

    const monthlyTransferGb = totalMonthlyBytesWithBot / (1000 * 1000 * 1000);
    const monthlyTransferTb = monthlyTransferGb / 1000;

    // Average Bandwidth in Mbps (Seconds in a month = 30.4375 * 86400 = 2,629,800)
    const secondsInMonth = 30.4375 * 86400;
    const avgBps = (totalMonthlyBytesWithBot * 8) / secondsInMonth;
    const avgMbps = avgBps / (1000 * 1000);

    // Peak Surge Bandwidth
    const peakMbps = avgMbps * redundancyFactor;

    let recommendedPort = "100 Mbps Shared Port";
    if (peakMbps > 1000) recommendedPort = "10 Gbps Dedicated Fiber Port";
    else if (peakMbps > 500) recommendedPort = "1 Gbps Unmetered Dedicated Port";
    else if (peakMbps > 100) recommendedPort = "1 Gbps Shared Port";
    else if (peakMbps > 50) recommendedPort = "500 Mbps Shared Port";

    return {
      monthlyViews: Math.round(monthlyViews),
      monthlyTransferGb: monthlyTransferGb.toFixed(2),
      monthlyTransferTb: monthlyTransferTb.toFixed(3),
      avgMbps: avgMbps.toFixed(2),
      peakMbps: peakMbps.toFixed(2),
      recommendedPort,
    };
  }, [pageViews, viewsPeriod, avgPageSize, pageSizeUnit, redundancyFactor, botOverheadPercent]);

  // --- CALCULATION LOGIC: MODE 4 (CONCURRENCY SIMULATOR) ---
  const concurrencyResults = useMemo(() => {
    const profiles = [
      { key: "stream4k", name: "4K UHD Video Streams", speedMbps: 25, count: concurrencyItems.stream4k, icon: Tv },
      { key: "stream1080p", name: "1080p HD Video Streams", speedMbps: 5, count: concurrencyItems.stream1080p, icon: Tv },
      { key: "voip", name: "Video Calls (Zoom/Teams)", speedMbps: 3.5, count: concurrencyItems.voip, icon: Video },
      { key: "gaming", name: "Online Gaming Sessions", speedMbps: 4, count: concurrencyItems.gaming, icon: Gamepad2 },
      { key: "backups", name: "Cloud Sync & Backups", speedMbps: 15, count: concurrencyItems.backups, icon: Cloud },
      { key: "remoteDesktop", name: "Remote Work Desktops", speedMbps: 8, count: concurrencyItems.remoteDesktop, icon: Laptop },
      { key: "smartHome", name: "Smart Home IoT & Cams", speedMbps: 2, count: concurrencyItems.smartHome, icon: Radio },
    ];

    const rawTotalMbps = profiles.reduce((sum, p) => sum + p.speedMbps * p.count, 0);
    const recommendedTotalMbps = rawTotalMbps * (1 + headroomPercent / 100);

    let recommendedPlan = "100 Mbps Plan";
    if (recommendedTotalMbps > 2000) recommendedPlan = "2.5 Gbps / Multi-Gig Fiber Plan";
    else if (recommendedTotalMbps > 1000) recommendedPlan = "2 Gbps Fiber Plan";
    else if (recommendedTotalMbps > 500) recommendedPlan = "1 Gigabit Fiber Plan (1000 Mbps)";
    else if (recommendedTotalMbps > 300) recommendedPlan = "500 Mbps Ultra Fast Plan";
    else if (recommendedTotalMbps > 100) recommendedPlan = "300 Mbps High Speed Plan";

    return {
      profiles,
      rawTotalMbps: rawTotalMbps.toFixed(1),
      recommendedTotalMbps: recommendedTotalMbps.toFixed(1),
      recommendedTotalGbps: (recommendedTotalMbps / 1000).toFixed(2),
      recommendedPlan,
    };
  }, [concurrencyItems, headroomPercent]);

  // --- CALCULATION LOGIC: DATA CAP PREDICTOR ---
  const dataCapResults = useMemo(() => {
    const capBits = dataCapTb * 1000 * 1000 * 1000 * 1000 * 8;
    const nominalBps = speed * (SPEED_UNITS[speedUnit]?.bps || SPEED_UNITS.Mbps.bps);

    const secondsToExhaust = nominalBps > 0 ? capBits / nominalBps : 0;
    const formattedExhaustTime = formatSeconds(secondsToExhaust);

    const dailyAllowanceGb = (dataCapTb * 1000) / 30.4375;

    return {
      secondsToExhaust,
      formattedExhaustTime,
      dailyAllowanceGb: dailyAllowanceGb.toFixed(1),
    };
  }, [dataCapTb, speed, speedUnit]);

  // --- ACTIONS ---
  const handleCopySummary = () => {
    let text = "";
    if (activeTab === "transfer") {
      text = `Bandwidth Transfer Time Summary:
- File Size: ${fileSize} ${fileSizeUnit}
- Connection Speed: ${speed} ${speedUnit} (Overhead: ${overheadPercent}%, ISP Efficiency: ${ispEfficiency}%)
- Theoretical Time: ${transferResults.theoreticalFormatted}
- Realistic Effective Time: ${transferResults.realisticFormatted}
- Effective Throughput: ${transferResults.effectiveMBps} MB/s`;
    } else if (activeTab === "conversion") {
      text = `Bandwidth Conversion: ${convertVal} ${convertUnit} =
- ${conversionResults.Mbps.toFixed(2)} Mbps
- ${conversionResults["MB/s"].toFixed(2)} MB/s
- ${conversionResults.Gbps.toFixed(4)} Gbps
- ${conversionResults.gbPerMonth.toFixed(1)} GB/month`;
    } else if (activeTab === "hosting") {
      text = `Web Hosting Bandwidth Estimate:
- Page Views: ${hostingResults.monthlyViews.toLocaleString()} / month
- Avg Page Size: ${avgPageSize} ${pageSizeUnit}
- Monthly Data Transfer: ${hostingResults.monthlyTransferTb} TB/month (${hostingResults.monthlyTransferGb} GB/month)
- Avg Required Speed: ${hostingResults.avgMbps} Mbps
- Peak Surge Speed: ${hostingResults.peakMbps} Mbps
- Recommended Port: ${hostingResults.recommendedPort}`;
    } else {
      text = `Multi-Device Concurrency Simulation:
- Aggregate Active Demand: ${concurrencyResults.rawTotalMbps} Mbps
- Recommended Headroom (${headroomPercent}%): ${concurrencyResults.recommendedTotalMbps} Mbps
- Recommended ISP Internet Plan: ${concurrencyResults.recommendedPlan}`;
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("tab", activeTab);
    url.searchParams.set("size", String(fileSize));
    url.searchParams.set("sizeUnit", fileSizeUnit);
    url.searchParams.set("speed", String(speed));
    url.searchParams.set("speedUnit", speedUnit);
    navigator.clipboard.writeText(url.toString());
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const handleResetAll = () => {
    setFileSize(10);
    setFileSizeUnit("GB");
    setSpeed(100);
    setSpeedUnit("Mbps");
    setOverheadPercent(10);
    setIspEfficiency(90);
    setConvertVal(100);
    setConvertUnit("Mbps");
    setPageViews(500000);
    setAvgPageSize(2.5);
    setPageSizeUnit("MB");
    setRedundancyFactor(2.0);
    setBotOverheadPercent(15);
    setConcurrencyItems({
      stream4k: 2,
      stream1080p: 4,
      voip: 5,
      gaming: 2,
      backups: 1,
      remoteDesktop: 3,
      smartHome: 10,
    });
    setHeadroomPercent(20);
    setDataCapTb(1.2);
  };

  const reportData = useMemo(() => {
    return {
      meta: {
        calculatorName: "Bandwidth Calculator",
        reportTitle: "Executive Bandwidth & Transfer Capacity Audit",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
      keyMetrics: [
        {
          label: "Realistic Transfer Time",
          value: transferResults.realisticFormatted,
          subtitle: `Effective Rate: ${transferResults.effectiveMBps} MB/s`,
          colorTheme: "blue" as const,
        },
        {
          label: "Hosting Bandwidth",
          value: `${hostingResults.monthlyTransferTb} TB/mo`,
          subtitle: `Peak Port: ${hostingResults.peakMbps} Mbps`,
          colorTheme: "emerald" as const,
        },
        {
          label: "Concurrency Demand",
          value: `${concurrencyResults.recommendedTotalMbps} Mbps`,
          subtitle: `Plan: ${concurrencyResults.recommendedPlan}`,
          colorTheme: "purple" as const,
        },
      ],
      sections: [
        {
          title: "Transfer Time Parameters",
          items: [
            { label: "File Package Size", value: `${fileSize} ${fileSizeUnit}` },
            { label: "Connection Bandwidth", value: `${speed} ${speedUnit}` },
            { label: "Protocol Overhead Loss", value: `${overheadPercent}%` },
            { label: "ISP Speed Test Ratio", value: `${ispEfficiency}%` },
            { label: "Theoretical Duration", value: transferResults.theoreticalFormatted },
            { label: "Realistic Duration", value: transferResults.realisticFormatted },
          ],
        },
        {
          title: "Web Hosting Infrastructure",
          items: [
            { label: "Monthly Page Views", value: hostingResults.monthlyViews.toLocaleString() },
            { label: "Average Page Payload", value: `${avgPageSize} ${pageSizeUnit}` },
            { label: "Monthly Data Transfer", value: `${hostingResults.monthlyTransferTb} TB` },
            { label: "Average Bandwidth", value: `${hostingResults.avgMbps} Mbps` },
            { label: "Peak Surge Capacity", value: `${hostingResults.peakMbps} Mbps` },
            { label: "Recommended Port Tier", value: hostingResults.recommendedPort },
          ],
        },
        {
          title: "Multi-User Device Simulation",
          items: [
            { label: "Raw Aggregate Demand", value: `${concurrencyResults.rawTotalMbps} Mbps` },
            { label: "Safety Cushion Headroom", value: `${headroomPercent}%` },
            { label: "Recommended Capacity", value: `${concurrencyResults.recommendedTotalMbps} Mbps` },
            { label: "Recommended ISP Plan", value: concurrencyResults.recommendedPlan },
          ],
        },
      ],
    };
  }, [fileSize, fileSizeUnit, speed, speedUnit, overheadPercent, ispEfficiency, transferResults, hostingResults, concurrencyResults, headroomPercent, avgPageSize, pageSizeUnit]);

  return (
    <div className="space-y-6">
      {/* TOP DASHBOARD NAVIGATION TABS */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-xl shadow-xs">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("transfer")}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "transfer"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Clock className="h-4 w-4" /> Data Transfer Time
          </button>
          <button
            onClick={() => setActiveTab("conversion")}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "conversion"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <ArrowRightLeft className="h-4 w-4" /> Bandwidth Conversion
          </button>
          <button
            onClick={() => setActiveTab("hosting")}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "hosting"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Server className="h-4 w-4" /> Website & Hosting
          </button>
          <button
            onClick={() => setActiveTab("concurrency")}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "concurrency"
                ? "bg-purple-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Users className="h-4 w-4" /> Concurrency Planner
          </button>
        </div>

        {/* Global Action Toolbar Buttons */}
        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopySummary}
            className="h-8 text-xs gap-1 border-zinc-200 dark:border-zinc-700 cursor-pointer"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleShareLink}
            className="h-8 text-xs gap-1 border-zinc-200 dark:border-zinc-700 cursor-pointer"
          >
            {shared ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5" />}
            {shared ? "Shared Link" : "Share"}
          </Button>
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={() => setIsReportModalOpen(true)}
            className="h-8 text-xs gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5" /> PDF Report
          </Button>
        </div>
      </div>

      {/* MODE 1: DATA TRANSFER TIME CALCULATOR */}
      {activeTab === "transfer" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Inputs Panel (Col 6) */}
          <div className="lg:col-span-6 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h2 className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Sliders className="h-4 w-4 text-blue-600" />
                <span>Download & Upload Parameters</span>
              </h2>
              <button
                onClick={handleResetAll}
                className="text-xs text-zinc-400 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" /> Reset
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Data Size Input */}
              <div className="space-y-1.5">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between">
                  <span>File or Data Package Size</span>
                  <span className="font-mono text-blue-600 font-bold">{fileSize} {fileSizeUnit}</span>
                </label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    min="0.001"
                    step="any"
                    value={fileSize}
                    onChange={(e) => setFileSize(Math.max(0, Number(e.target.value)))}
                    className="h-9 text-xs font-mono flex-1"
                  />
                  <select
                    value={fileSizeUnit}
                    onChange={(e) => setFileSizeUnit(e.target.value)}
                    className="h-9 text-xs font-semibold px-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md cursor-pointer"
                  >
                    {Object.keys(DATA_UNITS).map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Network Speed Input */}
              <div className="space-y-1.5">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between">
                  <span>Network Bandwidth Speed</span>
                  <span className="font-mono text-emerald-600 font-bold">{speed} {speedUnit}</span>
                </label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    min="0.001"
                    step="any"
                    value={speed}
                    onChange={(e) => setSpeed(Math.max(0, Number(e.target.value)))}
                    className="h-9 text-xs font-mono flex-1"
                  />
                  <select
                    value={speedUnit}
                    onChange={(e) => setSpeedUnit(e.target.value)}
                    className="h-9 text-xs font-semibold px-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md cursor-pointer"
                  >
                    {Object.keys(SPEED_UNITS).map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Real-World Protocol Overhead Slider & Presets */}
              <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex justify-between items-center font-semibold text-zinc-700 dark:text-zinc-300">
                  <span className="flex items-center gap-1">
                    <Activity className="h-3.5 w-3.5 text-blue-500" /> Protocol Overhead Loss
                  </span>
                  <span className="font-mono font-bold text-blue-600">{overheadPercent}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  value={overheadPercent}
                  onChange={(e) => setOverheadPercent(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <button
                    onClick={() => setOverheadPercent(0)}
                    className={`px-2 py-1 rounded text-[10px] font-semibold cursor-pointer border ${overheadPercent === 0 ? "bg-blue-600 text-white border-blue-600" : "bg-zinc-50 dark:bg-zinc-800 text-zinc-600 border-zinc-200 dark:border-zinc-700"}`}
                  >
                    0% Theoretical
                  </button>
                  <button
                    onClick={() => setOverheadPercent(5)}
                    className={`px-2 py-1 rounded text-[10px] font-semibold cursor-pointer border ${overheadPercent === 5 ? "bg-blue-600 text-white border-blue-600" : "bg-zinc-50 dark:bg-zinc-800 text-zinc-600 border-zinc-200 dark:border-zinc-700"}`}
                  >
                    5% TCP/IP Ethernet
                  </button>
                  <button
                    onClick={() => setOverheadPercent(15)}
                    className={`px-2 py-1 rounded text-[10px] font-semibold cursor-pointer border ${overheadPercent === 15 ? "bg-blue-600 text-white border-blue-600" : "bg-zinc-50 dark:bg-zinc-800 text-zinc-600 border-zinc-200 dark:border-zinc-700"}`}
                  >
                    15% Wi-Fi Signal
                  </button>
                  <button
                    onClick={() => setOverheadPercent(20)}
                    className={`px-2 py-1 rounded text-[10px] font-semibold cursor-pointer border ${overheadPercent === 20 ? "bg-blue-600 text-white border-blue-600" : "bg-zinc-50 dark:bg-zinc-800 text-zinc-600 border-zinc-200 dark:border-zinc-700"}`}
                  >
                    20% Mobile 4G/5G
                  </button>
                </div>
              </div>

              {/* ISP Speed Test Matcher Slider */}
              <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex justify-between items-center font-semibold text-zinc-700 dark:text-zinc-300">
                  <span className="flex items-center gap-1">
                    <Gauge className="h-3.5 w-3.5 text-emerald-500" /> Measured ISP Speed Ratio
                  </span>
                  <span className="font-mono font-bold text-emerald-600">{ispEfficiency}% of Plan</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  step="5"
                  value={ispEfficiency}
                  onChange={(e) => setIspEfficiency(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <p className="text-[10px] text-zinc-400">
                  Adjust if your actual speed test yields less than your advertised ISP plan speed.
                </p>
              </div>
            </div>
          </div>

          {/* Results Panel (Col 6) */}
          <div className="lg:col-span-6 space-y-4">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-sm space-y-1">
                <span className="text-[11px] font-semibold text-blue-100 uppercase tracking-wider block">
                  Realistic Transfer Time
                </span>
                <div className="text-2xl font-black font-mono tracking-tight my-1">
                  {transferResults.realisticFormatted}
                </div>
                <span className="text-[10px] text-blue-200 block">
                  Includes {overheadPercent}% overhead & {ispEfficiency}% ISP efficiency
                </span>
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs space-y-1">
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                  Theoretical Best Time
                </span>
                <div className="text-2xl font-black font-mono tracking-tight text-zinc-900 dark:text-zinc-100 my-1">
                  {transferResults.theoreticalFormatted}
                </div>
                <span className="text-[10px] text-emerald-600 font-bold block">
                  Effective Rate: {transferResults.effectiveMBps} MB/s
                </span>
              </div>
            </div>

            {/* Download Progress Visualizer */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-zinc-800 dark:text-zinc-200">
                <span className="flex items-center gap-1.5">
                  <Download className="h-4 w-4 text-blue-500 animate-bounce" /> Live Download Visualizer
                </span>
                <span className="font-mono text-zinc-500">{fileSize} {fileSizeUnit} @ {transferResults.effectiveMBps} MB/s</span>
              </div>
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-3 rounded-full overflow-hidden relative">
                <div className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full w-3/4 rounded-full animate-pulse"></div>
              </div>
              <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                <span>0 %</span>
                <span>Estimated completion: {transferResults.realisticFormatted}</span>
                <span>100 %</span>
              </div>
            </div>

            {/* Data Cap Warning Predictor Card */}
            <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-4 rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between items-center font-bold text-amber-900 dark:text-amber-300">
                <span className="flex items-center gap-1.5">
                  <ShieldAlert className="h-4 w-4 text-amber-600" /> Monthly Data Cap Predictor
                </span>
                <div className="flex items-center gap-1 font-mono text-xs">
                  <span>Cap:</span>
                  <input
                    type="number"
                    value={dataCapTb}
                    onChange={(e) => setDataCapTb(Math.max(0.1, Number(e.target.value)))}
                    className="w-16 h-6 text-center bg-white dark:bg-zinc-900 border border-amber-300 rounded font-mono"
                  />
                  <span>TB</span>
                </div>
              </div>
              <p className="text-zinc-700 dark:text-zinc-300 text-[11px]">
                Downloading continuously at <strong>{speed} {speedUnit}</strong> will exhaust a <strong>{dataCapTb} TB</strong> monthly data cap in:
              </p>
              <div className="text-base font-black font-mono text-amber-700 dark:text-amber-400">
                {dataCapResults.formattedExhaustTime}
              </div>
              <div className="text-[10px] text-zinc-500 flex justify-between border-t border-amber-200 dark:border-amber-900/40 pt-1.5">
                <span>Recommended max daily download limit:</span>
                <span className="font-bold font-mono text-amber-800 dark:text-amber-300">{dataCapResults.dailyAllowanceGb} GB/day</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: BANDWIDTH CONVERTER */}
      {activeTab === "conversion" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs max-w-2xl mx-auto space-y-4">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <ArrowRightLeft className="h-4 w-4 text-blue-600" />
              <span>Dynamic Bandwidth & Bitrate Converter</span>
            </h2>

            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="number"
                value={convertVal}
                onChange={(e) => setConvertVal(Number(e.target.value))}
                className="h-10 text-sm font-mono flex-1"
              />
              <select
                value={convertUnit}
                onChange={(e) => setConvertUnit(e.target.value)}
                className="h-10 text-xs font-bold px-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md cursor-pointer"
              >
                <optgroup label="Network Bitrates">
                  <option value="bps">bps (bits/sec)</option>
                  <option value="Kbps">Kbps (Kilobits/sec)</option>
                  <option value="Mbps">Mbps (Megabits/sec)</option>
                  <option value="Gbps">Gbps (Gigabits/sec)</option>
                  <option value="Tbps">Tbps (Terabits/sec)</option>
                </optgroup>
                <optgroup label="Transfer Rates (Bytes)">
                  <option value="B/s">B/s (Bytes/sec)</option>
                  <option value="KB/s">KB/s (Kilobytes/sec)</option>
                  <option value="MB/s">MB/s (Megabytes/sec)</option>
                  <option value="GB/s">GB/s (Gigabytes/sec)</option>
                </optgroup>
              </select>
            </div>
          </div>

          {/* Converter Equivalency Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-xl space-y-1">
              <span className="text-[10px] text-zinc-400 font-bold block uppercase">Megabits per sec</span>
              <span className="text-lg font-black font-mono text-blue-600 block">{conversionResults.Mbps.toFixed(2)} Mbps</span>
              <span className="text-[10px] text-zinc-400">Standard ISP speed metric</span>
            </div>
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-xl space-y-1">
              <span className="text-[10px] text-zinc-400 font-bold block uppercase">Megabytes per sec</span>
              <span className="text-lg font-black font-mono text-emerald-600 block">{conversionResults["MB/s"].toFixed(2)} MB/s</span>
              <span className="text-[10px] text-zinc-400">Actual file download rate</span>
            </div>
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-xl space-y-1">
              <span className="text-[10px] text-zinc-400 font-bold block uppercase">Gigabits per sec</span>
              <span className="text-lg font-black font-mono text-purple-600 block">{conversionResults.Gbps.toFixed(4)} Gbps</span>
              <span className="text-[10px] text-zinc-400">Fiber broadband rate</span>
            </div>
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-xl space-y-1">
              <span className="text-[10px] text-zinc-400 font-bold block uppercase">Monthly Data Volume</span>
              <span className="text-lg font-black font-mono text-amber-600 block">{conversionResults.gbPerMonth.toFixed(1)} GB/mo</span>
              <span className="text-[10px] text-zinc-400">Continuous 24/7 transfer</span>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: WEBSITE & SERVER HOSTING BANDWIDTH */}
      {activeTab === "hosting" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs text-xs">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <Server className="h-4 w-4 text-blue-600" />
              <span>Web Server & Hosting Inputs</span>
            </h2>

            {/* Traffic Views */}
            <div className="space-y-1.5">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between">
                <span>Traffic Volume (Page Views)</span>
                <span className="font-mono font-bold text-blue-600">{pageViews.toLocaleString()} views</span>
              </label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  min="1"
                  value={pageViews}
                  onChange={(e) => setPageViews(Math.max(1, Number(e.target.value)))}
                  className="h-9 text-xs font-mono flex-1"
                />
                <select
                  value={viewsPeriod}
                  onChange={(e) => setViewsPeriod(e.target.value as any)}
                  className="h-9 text-xs font-semibold px-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md cursor-pointer"
                >
                  <option value="month">per Month</option>
                  <option value="day">per Day</option>
                  <option value="hour">per Hour</option>
                </select>
              </div>
            </div>

            {/* Average Page Size */}
            <div className="space-y-1.5">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between">
                <span>Average Page / Asset Payload Size</span>
                <span className="font-mono font-bold text-emerald-600">{avgPageSize} {pageSizeUnit}</span>
              </label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  step="0.1"
                  min="0.01"
                  value={avgPageSize}
                  onChange={(e) => setAvgPageSize(Math.max(0.01, Number(e.target.value)))}
                  className="h-9 text-xs font-mono flex-1"
                />
                <select
                  value={pageSizeUnit}
                  onChange={(e) => setPageSizeUnit(e.target.value)}
                  className="h-9 text-xs font-semibold px-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md cursor-pointer"
                >
                  <option value="KB">KB</option>
                  <option value="MB">MB</option>
                  <option value="GB">GB</option>
                </select>
              </div>
            </div>

            {/* Redundancy & Peak Surge Slider */}
            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex justify-between items-center font-semibold text-zinc-700 dark:text-zinc-300">
                <span>Peak Traffic Surge Multiplier (Redundancy)</span>
                <span className="font-mono font-bold text-purple-600">{redundancyFactor}x Surge</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="5.0"
                step="0.5"
                value={redundancyFactor}
                onChange={(e) => setRedundancyFactor(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>

            {/* Bot Traffic Overhead */}
            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex justify-between items-center font-semibold text-zinc-700 dark:text-zinc-300">
                <span>Bot & Search Crawler Overhead</span>
                <span className="font-mono font-bold text-amber-600">{botOverheadPercent}% extra</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={botOverheadPercent}
                onChange={(e) => setBotOverheadPercent(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-sm space-y-1">
              <span className="text-[11px] font-semibold text-blue-100 uppercase tracking-wider block">
                Estimated Monthly Hosting Transfer
              </span>
              <div className="text-3xl font-black font-mono tracking-tight my-1">
                {hostingResults.monthlyTransferTb} TB / month
              </div>
              <span className="text-[10px] text-blue-200 block">
                Equal to {hostingResults.monthlyTransferGb} GB/month
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-zinc-400 uppercase">Average Port Bandwidth</span>
                <span className="text-xl font-black font-mono text-zinc-900 dark:text-zinc-100 block">{hostingResults.avgMbps} Mbps</span>
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-zinc-400 uppercase">Peak Surge Port Speed</span>
                <span className="text-xl font-black font-mono text-purple-600 block">{hostingResults.peakMbps} Mbps</span>
              </div>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 p-4 rounded-2xl space-y-1 text-xs">
              <span className="text-[10px] font-bold uppercase text-emerald-800 dark:text-emerald-400 block">
                Recommended Hosting Server Port Tier
              </span>
              <span className="text-base font-black text-emerald-700 dark:text-emerald-300 block">
                {hostingResults.recommendedPort}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* MODE 4: MULTI-USER & DEVICE CONCURRENCY SIMULATOR */}
      {activeTab === "concurrency" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-xs">
          {/* Counters Grid (Col 7) */}
          <div className="lg:col-span-7 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-600" />
                <span>Simultaneous Device & Activity Profile Planner</span>
              </span>
              <span className="text-[10px] text-purple-600 font-mono">Real-time simulator</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {concurrencyResults.profiles.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.key} className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200/60 dark:border-zinc-700 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                        <Icon className="h-3.5 w-3.5 text-purple-500" /> {p.name}
                      </span>
                      <span className="text-[10px] text-zinc-400 block">~{p.speedMbps} Mbps each</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setConcurrencyItems((prev) => ({
                            ...prev,
                            [p.key]: Math.max(0, (prev as any)[p.key] - 1),
                          }))
                        }
                        className="w-6 h-6 bg-white dark:bg-zinc-900 border border-zinc-300 rounded font-bold hover:bg-zinc-100 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-mono font-bold w-5 text-center">{(concurrencyItems as any)[p.key]}</span>
                      <button
                        onClick={() =>
                          setConcurrencyItems((prev) => ({
                            ...prev,
                            [p.key]: (prev as any)[p.key] + 1,
                          }))
                        }
                        className="w-6 h-6 bg-white dark:bg-zinc-900 border border-zinc-300 rounded font-bold hover:bg-zinc-100 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span>Network Headroom Safety Margin</span>
                <span className="font-mono text-purple-600">{headroomPercent}% cushion</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={headroomPercent}
                onChange={(e) => setHeadroomPercent(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>
          </div>

          {/* Results Summary (Col 5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-purple-600 text-white p-5 rounded-2xl shadow-sm space-y-2">
              <span className="text-[10px] font-bold text-purple-200 uppercase tracking-wider block">
                Total Recommended Household / Office Bandwidth
              </span>
              <div className="text-3xl font-black font-mono tracking-tight">
                {concurrencyResults.recommendedTotalMbps} Mbps
              </div>
              <span className="text-[11px] text-purple-100 block">
                ({concurrencyResults.recommendedTotalGbps} Gbps continuous capacity)
              </span>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl space-y-2">
              <span className="text-[10px] font-bold text-zinc-400 uppercase block">
                Recommended Broadband Internet Plan
              </span>
              <span className="text-lg font-black text-purple-600 block">
                {concurrencyResults.recommendedPlan}
              </span>
              <p className="text-[11px] text-zinc-500 leading-normal">
                Provides comfortable headroom for simultaneous video streaming, gaming, and cloud backups without network congestion.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* REPORT MODAL */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        reportData={reportData}
      />
    </div>
  );
}
