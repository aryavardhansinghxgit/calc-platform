"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
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
  Activity,
  ShieldAlert,
  Tv,
  Gamepad2,
  Video,
  Cloud,
  Laptop,
  Radio,
  Gauge,
  Info,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  FileText,
  Code,
  Bookmark,
  Trash2,
  Play,
  Pause,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReportModal from "@/components/report/ReportModal";
import {
  ALL_DATA_BITS,
  SPEED_TO_BPS,
  SECONDS_IN_MONTH_AVG,
  SECONDS_IN_MONTH_30D,
  formatTransferSeconds,
  calculateTransferTime,
  calculateBandwidthConversion,
  calculateHostingBandwidth,
  calculateConcurrency,
  calculateDataCap,
} from "@/app/calculators/bandwidth-calculator/calculator";

// Unit definitions for dropdowns
const DATA_UNIT_OPTIONS = [
  { group: "SI Decimal (Base-1000)", items: ["B", "KB", "MB", "GB", "TB", "PB"] },
  { group: "IEC Binary (Base-1024)", items: ["KiB", "MiB", "GiB", "TiB"] },
];

const SPEED_UNIT_OPTIONS = [
  { group: "Bitrates (bps)", items: ["bps", "Kbps", "Mbps", "Gbps", "Tbps"] },
  { group: "Transfer Rates (Bytes/s)", items: ["B/s", "KB/s", "MB/s", "GB/s", "TB/s"] },
  { group: "Binary Rates (IEC)", items: ["KiB/s", "MiB/s", "GiB/s"] },
];

interface SavedRecord {
  id: string;
  tab: string;
  summary: string;
  primaryResult: string;
  timestamp: string;
  state: any;
}

export function BandwidthCalculator() {
  const [activeTab, setActiveTab] = useState<"transfer" | "conversion" | "hosting" | "concurrency">("transfer");

  // Mode 1: Data Transfer Time State
  const [fileSizeStr, setFileSizeStr] = useState<string>("10");
  const [fileSizeUnit, setFileSizeUnit] = useState<string>("GB");
  const [speedStr, setSpeedStr] = useState<string>("100");
  const [speedUnit, setSpeedUnit] = useState<string>("Mbps");
  const [overheadStr, setOverheadStr] = useState<string>("10");
  const [efficiencyStr, setEfficiencyStr] = useState<string>("90");

  // Visualizer interactive simulation state
  const [simProgress, setSimProgress] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const animFrameRef = useRef<number | null>(null);

  // Mode 2: Bandwidth Converter State
  const [convertValStr, setConvertValStr] = useState<string>("100");
  const [convertUnit, setConvertUnit] = useState<string>("Mbps");

  // Mode 3: Hosting Bandwidth State
  const [pageViewsStr, setPageViewsStr] = useState<string>("500000");
  const [viewsPeriod, setViewsPeriod] = useState<"month" | "day" | "hour">("month");
  const [avgPageSizeStr, setAvgPageSizeStr] = useState<string>("2.5");
  const [pageSizeUnit, setPageSizeUnit] = useState<string>("MB");
  const [redundancyFactorStr, setRedundancyFactorStr] = useState<string>("2.0");
  const [botOverheadStr, setBotOverheadStr] = useState<string>("15");

  // Mode 4: Multi-User Concurrency State
  const [concurrencyItems, setConcurrencyItems] = useState<Record<string, number>>({
    stream4k: 2,
    stream1080p: 4,
    voip: 5,
    gaming: 2,
    backups: 1,
    remoteDesktop: 3,
    smartHome: 10,
  });
  const [headroomStr, setHeadroomStr] = useState<string>("20");

  // Data Cap Predictor State
  const [dataCapTbStr, setDataCapTbStr] = useState<string>("1.2");

  // Utility Actions State
  const [copiedResult, setCopiedResult] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [copiedLatex, setCopiedLatex] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [savedRecords, setSavedRecords] = useState<SavedRecord[]>([]);

  // Load Saved calculations from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem("saved_calc_bandwidth");
      if (saved) {
        setSavedRecords(JSON.parse(saved));
      }
    } catch { }
  }, []);

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
    if (params.has("size")) setFileSizeStr(params.get("size") || "10");
    if (params.has("sizeUnit")) setFileSizeUnit(params.get("sizeUnit") || "GB");
    if (params.has("speed")) setSpeedStr(params.get("speed") || "100");
    if (params.has("speedUnit")) setSpeedUnit(params.get("speedUnit") || "Mbps");
    if (params.has("overhead")) setOverheadStr(params.get("overhead") || "10");
    if (params.has("eff")) setEfficiencyStr(params.get("eff") || "90");
    if (params.has("views")) setPageViewsStr(params.get("views") || "500000");
    if (params.has("cap")) setDataCapTbStr(params.get("cap") || "1.2");
  }, []);

  // --- PARSED NUMERIC VALUES & VALIDATIONS ---
  const numFileSize = Number(fileSizeStr);
  const numSpeed = Number(speedStr);
  const numOverhead = Number(overheadStr);
  const numEfficiency = Number(efficiencyStr);
  const numConvertVal = Number(convertValStr);
  const numPageViews = Number(pageViewsStr);
  const numAvgPageSize = Number(avgPageSizeStr);
  const numRedundancy = Number(redundancyFactorStr);
  const numBotOverhead = Number(botOverheadStr);
  const numHeadroom = Number(headroomStr);
  const numDataCapTb = Number(dataCapTbStr);

  // Validation errors
  const transferErrors = useMemo(() => {
    const errs: string[] = [];
    if (isNaN(numFileSize) || fileSizeStr.trim() === "") errs.push("File size must be a valid number");
    else if (numFileSize < 0) errs.push("File size cannot be negative");

    if (isNaN(numSpeed) || speedStr.trim() === "") errs.push("Speed must be a valid number");
    else if (numSpeed < 0) errs.push("Speed cannot be negative");
    else if (numSpeed === 0) errs.push("Speed must be greater than 0 for transfer calculation");

    if (isNaN(numOverhead) || overheadStr.trim() === "") errs.push("Protocol overhead must be a valid number");
    else if (numOverhead < 0 || numOverhead > 100) errs.push("Protocol overhead must be between 0% and 100%");

    if (isNaN(numEfficiency) || efficiencyStr.trim() === "") errs.push("ISP efficiency must be a valid number");
    else if (numEfficiency < 0 || numEfficiency > 100) errs.push("ISP efficiency must be between 0% and 100%");

    if (numOverhead === 100) errs.push("Notice: 100% protocol overhead eliminates all payload throughput");
    if (numEfficiency === 0) errs.push("Notice: 0% ISP efficiency eliminates all payload throughput");

    return errs;
  }, [numFileSize, fileSizeStr, numSpeed, speedStr, numOverhead, overheadStr, numEfficiency, efficiencyStr]);

  const hostingErrors = useMemo(() => {
    const errs: string[] = [];
    if (isNaN(numPageViews) || pageViewsStr.trim() === "") errs.push("Page views must be a valid number");
    else if (numPageViews < 0) errs.push("Page views cannot be negative");

    if (isNaN(numAvgPageSize) || avgPageSizeStr.trim() === "") errs.push("Page size must be a valid number");
    else if (numAvgPageSize < 0) errs.push("Page size cannot be negative");

    if (isNaN(numRedundancy) || redundancyFactorStr.trim() === "") errs.push("Surge multiplier must be a valid number");
    else if (numRedundancy < 1.0) errs.push("Surge multiplier cannot be less than 1.0x");

    if (isNaN(numBotOverhead) || botOverheadStr.trim() === "") errs.push("Bot overhead must be a valid number");
    else if (numBotOverhead < 0 || numBotOverhead > 100) errs.push("Bot overhead must be between 0% and 100%");

    return errs;
  }, [numPageViews, pageViewsStr, numAvgPageSize, avgPageSizeStr, numRedundancy, redundancyFactorStr, numBotOverhead, botOverheadStr]);

  const conversionErrors = useMemo(() => {
    const errs: string[] = [];
    if (isNaN(numConvertVal) || convertValStr.trim() === "") errs.push("Conversion value must be a valid number");
    else if (numConvertVal < 0) errs.push("Bitrate cannot be negative");
    return errs;
  }, [numConvertVal, convertValStr]);

  const concurrencyErrors = useMemo(() => {
    const errs: string[] = [];
    if (isNaN(numHeadroom) || headroomStr.trim() === "") errs.push("Headroom must be a valid number");
    else if (numHeadroom < 0) errs.push("Headroom cannot be negative");
    for (const [k, count] of Object.entries(concurrencyItems)) {
      if (count < 0) errs.push(`Count for ${k} cannot be negative`);
    }
    return errs;
  }, [numHeadroom, headroomStr, concurrencyItems]);

  const dataCapErrors = useMemo(() => {
    const errs: string[] = [];
    if (isNaN(numDataCapTb) || dataCapTbStr.trim() === "") errs.push("Data cap must be a valid number");
    else if (numDataCapTb < 0) errs.push("Data cap cannot be negative");
    return errs;
  }, [numDataCapTb, dataCapTbStr]);

  // --- CALCULATION RESULTS ---
  const transferResults = useMemo(() => {
    if (transferErrors.some((e) => !e.startsWith("Notice"))) {
      return {
        success: false,
        error: transferErrors[0],
        totalBits: 0,
        totalBytes: 0,
        nominalBps: 0,
        effectiveBps: 0,
        effectiveMBps: 0,
        theoreticalSecs: 0,
        theoreticalFormatted: "—",
        realisticSecs: 0,
        realisticFormatted: "—",
      };
    }
    return calculateTransferTime(numFileSize, fileSizeUnit, numSpeed, speedUnit, numOverhead, numEfficiency);
  }, [numFileSize, fileSizeUnit, numSpeed, speedUnit, numOverhead, numEfficiency, transferErrors]);

  const conversionResults = useMemo(() => {
    if (conversionErrors.length > 0) {
      return calculateBandwidthConversion(0, convertUnit);
    }
    return calculateBandwidthConversion(numConvertVal, convertUnit);
  }, [numConvertVal, convertUnit, conversionErrors]);

  const hostingResults = useMemo(() => {
    if (hostingErrors.length > 0) {
      return calculateHostingBandwidth(0, viewsPeriod, 0, pageSizeUnit, 1, 0);
    }
    return calculateHostingBandwidth(numPageViews, viewsPeriod, numAvgPageSize, pageSizeUnit, numRedundancy, numBotOverhead);
  }, [numPageViews, viewsPeriod, numAvgPageSize, pageSizeUnit, numRedundancy, numBotOverhead, hostingErrors]);

  const concurrencyResults = useMemo(() => {
    const profiles = [
      { key: "stream4k", name: "4K UHD Video Streams", speedMbps: 25, count: concurrencyItems.stream4k ?? 0, icon: Tv },
      { key: "stream1080p", name: "1080p HD Video Streams", speedMbps: 5, count: concurrencyItems.stream1080p ?? 0, icon: Tv },
      { key: "voip", name: "Video Calls (Zoom/Teams)", speedMbps: 3.5, count: concurrencyItems.voip ?? 0, icon: Video },
      { key: "gaming", name: "Online Gaming Sessions", speedMbps: 4, count: concurrencyItems.gaming ?? 0, icon: Gamepad2 },
      { key: "backups", name: "Cloud Sync & Backups", speedMbps: 15, count: concurrencyItems.backups ?? 0, icon: Cloud },
      { key: "remoteDesktop", name: "Remote Work Desktops", speedMbps: 8, count: concurrencyItems.remoteDesktop ?? 0, icon: Laptop },
      { key: "smartHome", name: "Smart Home IoT & Cams", speedMbps: 2, count: concurrencyItems.smartHome ?? 0, icon: Radio },
    ];

    if (concurrencyErrors.length > 0) {
      return {
        profiles,
        rawTotalMbps: 0,
        recommendedTotalMbps: 0,
        recommendedTotalGbps: 0,
        headroomMbps: 0,
        recommendedPlan: "—",
      };
    }

    const calc = calculateConcurrency(
      concurrencyItems,
      {
        stream4k: 25,
        stream1080p: 5,
        voip: 3.5,
        gaming: 4,
        backups: 15,
        remoteDesktop: 8,
        smartHome: 2,
      },
      numHeadroom
    );

    return {
      profiles,
      ...calc,
    };
  }, [concurrencyItems, numHeadroom, concurrencyErrors]);

  const dataCapResults = useMemo(() => {
    if (dataCapErrors.length > 0 || transferErrors.some((e) => !e.startsWith("Notice"))) {
      return {
        secondsToExhaust: 0,
        formattedExhaustTime: "—",
        dailyAllowanceGb: 0,
      };
    }
    return calculateDataCap(numDataCapTb, numSpeed, speedUnit);
  }, [numDataCapTb, numSpeed, speedUnit, dataCapErrors, transferErrors]);

  // --- LIVE DOWNLOAD SIMULATION ---
  useEffect(() => {
    if (!isSimulating) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const durationSecs = Math.max(1, transferResults.realisticSecs);
    // Simulation step scales: faster duration finishes simulation in 5-10 seconds for user demonstration
    const simDurationMs = Math.min(10000, Math.max(3000, durationSecs * 100));
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(100, (elapsed / simDurationMs) * 100);
      setSimProgress(progress);

      if (progress < 100) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setIsSimulating(false);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isSimulating, transferResults.realisticSecs]);

  // Primary active result string
  const primaryResultString = useMemo(() => {
    if (activeTab === "transfer") {
      return transferResults.realisticFormatted;
    } else if (activeTab === "conversion") {
      return `${conversionResults.Mbps.toFixed(2)} Mbps`;
    } else if (activeTab === "hosting") {
      return `${hostingResults.monthlyTransferTb.toFixed(3)} TB/month`;
    } else {
      return `${concurrencyResults.recommendedTotalMbps.toFixed(1)} Mbps`;
    }
  }, [activeTab, transferResults, conversionResults, hostingResults, concurrencyResults]);

  // --- COPY ACTIONS ---
  const handleCopyResult = () => {
    navigator.clipboard.writeText(primaryResultString);
    setCopiedResult(true);
    setTimeout(() => setCopiedResult(false), 2000);
  };

  const handleCopySummary = () => {
    let text = "";
    if (activeTab === "transfer") {
      text = `Bandwidth Transfer Time Summary:
- File Size: ${fileSizeStr} ${fileSizeUnit}
- Connection Speed: ${speedStr} ${speedUnit} (Nominal: ${(transferResults.nominalBps / 1e6).toFixed(2)} Mbps)
- Protocol Overhead Loss: ${overheadStr}%
- Measured ISP Efficiency: ${efficiencyStr}%
- Theoretical Duration (Zero Loss): ${transferResults.theoreticalFormatted}
- Realistic Effective Duration: ${transferResults.realisticFormatted}
- Effective Real Throughput: ${transferResults.effectiveMBps.toFixed(2)} MB/s (${(transferResults.effectiveBps / 1e6).toFixed(2)} Mbps)
- Monthly Data Cap (${dataCapTbStr} TB): Exhausted in ${dataCapResults.formattedExhaustTime} (Daily limit: ${dataCapResults.dailyAllowanceGb.toFixed(1)} GB/day)`;
    } else if (activeTab === "conversion") {
      text = `Bandwidth & Bitrate Conversion: ${convertValStr} ${convertUnit}
- Megabits/s (Mbps): ${conversionResults.Mbps.toFixed(4)} Mbps
- Megabytes/s (MB/s): ${conversionResults["MB/s"].toFixed(4)} MB/s
- Gigabits/s (Gbps): ${conversionResults.Gbps.toFixed(6)} Gbps
- Kilobits/s (Kbps): ${conversionResults.Kbps.toLocaleString()} Kbps
- Bytes/s: ${conversionResults["B/s"].toLocaleString()} B/s
- IEC Mebibytes/s (MiB/s): ${conversionResults["MiB/s"].toFixed(4)} MiB/s
- IEC Gibibytes/s (GiB/s): ${conversionResults["GiB/s"].toFixed(6)} GiB/s
- 30-Day Continuous Volume: ${conversionResults.gbPerMonth30d.toFixed(1)} GB/mo (${conversionResults.tbPerMonth30d.toFixed(3)} TB/mo)
- Calendar Month Avg Volume: ${conversionResults.gbPerMonthAvg.toFixed(1)} GB/mo`;
    } else if (activeTab === "hosting") {
      text = `Web Hosting Bandwidth Estimate:
- Traffic Volume: ${hostingResults.monthlyViews.toLocaleString()} views / month
- Average Page Payload: ${avgPageSizeStr} ${pageSizeUnit}
- Bot & Search Crawler Overhead: ${botOverheadStr}%
- Peak Traffic Surge Multiplier: ${redundancyFactorStr}x
- Monthly Data Transfer: ${hostingResults.monthlyTransferTb.toFixed(3)} TB/mo (${hostingResults.monthlyTransferGb.toFixed(1)} GB/mo)
- Average Port Bandwidth: ${hostingResults.avgMbps.toFixed(2)} Mbps
- Peak Surge Port Capacity: ${hostingResults.peakMbps.toFixed(2)} Mbps
- Recommended Hosting Port: ${hostingResults.recommendedPort}`;
    } else {
      text = `Multi-Device Concurrency Demand Simulation:
- Raw Aggregate Bitrate: ${concurrencyResults.rawTotalMbps.toFixed(1)} Mbps
- Headroom Safety Cushion: ${headroomStr}%
- Total Recommended Capacity: ${concurrencyResults.recommendedTotalMbps.toFixed(1)} Mbps (${concurrencyResults.recommendedTotalGbps.toFixed(2)} Gbps)
- Recommended Broadband Internet Plan: ${concurrencyResults.recommendedPlan}`;
    }

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleCopyLatex = () => {
    let latex = "";
    if (activeTab === "transfer") {
      latex = `% Transfer Time Formulas
T_{\\text{theoretical}} = \\frac{D_{\\text{bytes}} \\times 8}{S_{\\text{bps}}} = \\frac{${transferResults.totalBytes} \\times 8}{${transferResults.nominalBps}} = ${transferResults.theoreticalSecs.toFixed(2)}\\text{ s}
T_{\\text{realistic}} = \\frac{D_{\\text{bytes}} \\times 8}{S_{\\text{bps}} \\times (1 - \\frac{\\text{loss}}{100}) \\times \\frac{\\text{eff}}{100}} = \\frac{${transferResults.totalBits}}{${transferResults.effectiveBps.toFixed(0)}} = ${transferResults.realisticSecs.toFixed(2)}\\text{ s}`;
    } else if (activeTab === "conversion") {
      latex = `% Bandwidth Conversion Formula
S_{\\text{bps}} = ${numConvertVal} \\times ${SPEED_TO_BPS[convertUnit] ?? 1} = ${conversionResults.bps.toFixed(0)}\\text{ bps}
S_{\\text{MB/s}} = \\frac{S_{\\text{bps}}}{8 \\times 10^6} = ${conversionResults["MB/s"].toFixed(4)}\\text{ MB/s}`;
    } else if (activeTab === "hosting") {
      latex = `% Web Hosting Bandwidth Formulas
D_{\\text{monthly\\_GB}} = \\frac{V_{\\text{monthly}} \\times P_{\\text{bytes}} \\times (1 + \\frac{\\text{bot}}{100})}{10^9} = ${hostingResults.monthlyTransferGb.toFixed(2)}\\text{ GB}
S_{\\text{avg\\_Mbps}} = \\frac{D_{\\text{monthly\\_bytes}} \\times 8}{2{,}629{,}800 \\times 10^6} = ${hostingResults.avgMbps.toFixed(2)}\\text{ Mbps}
S_{\\text{peak\\_Mbps}} = S_{\\text{avg\\_Mbps}} \\times \\text{surge} = ${hostingResults.peakMbps.toFixed(2)}\\text{ Mbps}`;
    } else {
      latex = `% Multi-Device Concurrency Formula
S_{\\text{aggregate\\_Mbps}} = \\sum (\\text{count}_i \\times \\text{speed}_i) \\times (1 + \\frac{\\text{headroom}}{100}) = ${concurrencyResults.rawTotalMbps.toFixed(1)} \\times ${(1 + numHeadroom / 100).toFixed(2)} = ${concurrencyResults.recommendedTotalMbps.toFixed(1)}\\text{ Mbps}`;
    }

    navigator.clipboard.writeText(latex);
    setCopiedLatex(true);
    setTimeout(() => setCopiedLatex(false), 2000);
  };

  const handleDownloadCsv = () => {
    let headers: string[] = [];
    let row: (string | number)[] = [];
    let filename = `bandwidth_${activeTab}_report.csv`;

    if (activeTab === "transfer") {
      headers = [
        "File Size",
        "File Size Unit",
        "Speed",
        "Speed Unit",
        "Protocol Overhead (%)",
        "ISP Efficiency (%)",
        "Theoretical Time (s)",
        "Theoretical Formatted",
        "Realistic Time (s)",
        "Realistic Formatted",
        "Effective Throughput (MB/s)",
      ];
      row = [
        fileSizeStr,
        fileSizeUnit,
        speedStr,
        speedUnit,
        overheadStr,
        efficiencyStr,
        transferResults.theoreticalSecs.toFixed(2),
        `"${transferResults.theoreticalFormatted}"`,
        transferResults.realisticSecs.toFixed(2),
        `"${transferResults.realisticFormatted}"`,
        transferResults.effectiveMBps.toFixed(2),
      ];
    } else if (activeTab === "conversion") {
      headers = [
        "Input Value",
        "Input Unit",
        "bps",
        "Kbps",
        "Mbps",
        "Gbps",
        "B/s",
        "KB/s",
        "MB/s",
        "GB/s",
        "MiB/s",
        "30-Day GB/mo",
      ];
      row = [
        convertValStr,
        convertUnit,
        conversionResults.bps,
        conversionResults.Kbps,
        conversionResults.Mbps,
        conversionResults.Gbps,
        conversionResults["B/s"],
        conversionResults["KB/s"],
        conversionResults["MB/s"],
        conversionResults["GB/s"],
        conversionResults["MiB/s"].toFixed(4),
        conversionResults.gbPerMonth30d.toFixed(1),
      ];
    } else if (activeTab === "hosting") {
      headers = [
        "Monthly Views",
        "Avg Page Size",
        "Page Size Unit",
        "Bot Overhead (%)",
        "Surge Multiplier",
        "Monthly Transfer (GB)",
        "Monthly Transfer (TB)",
        "Avg Bandwidth (Mbps)",
        "Peak Bandwidth (Mbps)",
        "Recommended Port Tier",
      ];
      row = [
        hostingResults.monthlyViews,
        avgPageSizeStr,
        pageSizeUnit,
        botOverheadStr,
        redundancyFactorStr,
        hostingResults.monthlyTransferGb.toFixed(2),
        hostingResults.monthlyTransferTb.toFixed(3),
        hostingResults.avgMbps.toFixed(2),
        hostingResults.peakMbps.toFixed(2),
        `"${hostingResults.recommendedPort}"`,
      ];
    } else {
      headers = [
        "Raw Demand (Mbps)",
        "Headroom Cushion (%)",
        "Recommended Demand (Mbps)",
        "Recommended Demand (Gbps)",
        "Recommended Internet Plan",
      ];
      row = [
        concurrencyResults.rawTotalMbps.toFixed(1),
        headroomStr,
        concurrencyResults.recommendedTotalMbps.toFixed(1),
        concurrencyResults.recommendedTotalGbps.toFixed(2),
        `"${concurrencyResults.recommendedPlan}"`,
      ];
    }

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), row.join(",")].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadTxt = () => {
    let text = "";
    if (activeTab === "transfer") {
      text = `=====================================================
BANDWIDTH CALCULATOR: DATA TRANSFER TIME REPORT
=====================================================
Date: ${new Date().toISOString()}

INPUT PARAMETERS:
- File Size: ${fileSizeStr} ${fileSizeUnit}
- Connection Speed: ${speedStr} ${speedUnit}
- Protocol Overhead Loss: ${overheadStr}%
- ISP Efficiency: ${efficiencyStr}%

CALCULATION RESULTS:
- Nominal Bitrate: ${(transferResults.nominalBps / 1e6).toFixed(2)} Mbps
- Theoretical Time (Zero Loss): ${transferResults.theoreticalFormatted} (${transferResults.theoreticalSecs.toFixed(2)} s)
- Realistic Effective Time: ${transferResults.realisticFormatted} (${transferResults.realisticSecs.toFixed(2)} s)
- Effective Real Throughput: ${transferResults.effectiveMBps.toFixed(2)} MB/s (${(transferResults.effectiveBps / 1e6).toFixed(2)} Mbps)

DATA CAP PREDICTION:
- Cap: ${dataCapTbStr} TB (SI: 10^12 bytes)
- Exhaustion Duration: ${dataCapResults.formattedExhaustTime}
- Daily Allowance: ${dataCapResults.dailyAllowanceGb.toFixed(1)} GB/day
=====================================================`;
    } else if (activeTab === "conversion") {
      text = `=====================================================
BANDWIDTH CONVERTER REPORT
=====================================================
Input: ${convertValStr} ${convertUnit}

EQUIVALENT RATES:
- bps: ${conversionResults.bps.toLocaleString()} bps
- Kbps: ${conversionResults.Kbps.toLocaleString()} Kbps
- Mbps: ${conversionResults.Mbps.toFixed(4)} Mbps
- Gbps: ${conversionResults.Gbps.toFixed(6)} Gbps
- Bytes/s: ${conversionResults["B/s"].toLocaleString()} B/s
- KB/s: ${conversionResults["KB/s"].toFixed(2)} KB/s
- MB/s: ${conversionResults["MB/s"].toFixed(4)} MB/s
- GB/s: ${conversionResults["GB/s"].toFixed(6)} GB/s
- MiB/s (IEC): ${conversionResults["MiB/s"].toFixed(4)} MiB/s

MONTHLY DATA VOLUME:
- 30-Day Billing Cycle: ${conversionResults.gbPerMonth30d.toFixed(1)} GB/mo (${conversionResults.tbPerMonth30d.toFixed(3)} TB/mo)
- Calendar Month Avg: ${conversionResults.gbPerMonthAvg.toFixed(1)} GB/mo
=====================================================`;
    } else if (activeTab === "hosting") {
      text = `=====================================================
WEB SERVER HOSTING BANDWIDTH REPORT
=====================================================
Traffic Volume: ${hostingResults.monthlyViews.toLocaleString()} views/mo
Payload Size: ${avgPageSizeStr} ${pageSizeUnit}
Bot Overhead: ${botOverheadStr}%
Surge Multiplier: ${redundancyFactorStr}x

RESULTS:
- Monthly Data: ${hostingResults.monthlyTransferTb.toFixed(3)} TB (${hostingResults.monthlyTransferGb.toFixed(1)} GB)
- Avg Required Bandwidth: ${hostingResults.avgMbps.toFixed(2)} Mbps
- Peak Surge Port Speed: ${hostingResults.peakMbps.toFixed(2)} Mbps
- Recommended Port Tier: ${hostingResults.recommendedPort}
=====================================================`;
    } else {
      text = `=====================================================
MULTI-DEVICE CONCURRENCY PLANNER REPORT
=====================================================
Raw Aggregate Demand: ${concurrencyResults.rawTotalMbps.toFixed(1)} Mbps
Safety Headroom: ${headroomStr}%
Total Recommended: ${concurrencyResults.recommendedTotalMbps.toFixed(1)} Mbps (${concurrencyResults.recommendedTotalGbps.toFixed(2)} Gbps)
Recommended Broadband Plan: ${concurrencyResults.recommendedPlan}
=====================================================`;
    }

    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `bandwidth_${activeTab}_audit.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShareLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("tab", activeTab);
    url.searchParams.set("size", fileSizeStr);
    url.searchParams.set("sizeUnit", fileSizeUnit);
    url.searchParams.set("speed", speedStr);
    url.searchParams.set("speedUnit", speedUnit);
    url.searchParams.set("overhead", overheadStr);
    url.searchParams.set("eff", efficiencyStr);
    url.searchParams.set("views", pageViewsStr);
    url.searchParams.set("cap", dataCapTbStr);
    navigator.clipboard.writeText(url.toString());
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const handleSaveCalculation = () => {
    const newRecord: SavedRecord = {
      id: Date.now().toString(),
      tab: activeTab,
      summary: `${activeTab.toUpperCase()}: ${primaryResultString}`,
      primaryResult: primaryResultString,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      state: {
        fileSizeStr,
        fileSizeUnit,
        speedStr,
        speedUnit,
        overheadStr,
        efficiencyStr,
        convertValStr,
        convertUnit,
        pageViewsStr,
        avgPageSizeStr,
        pageSizeUnit,
        redundancyFactorStr,
        botOverheadStr,
        concurrencyItems,
        headroomStr,
        dataCapTbStr,
      },
    };

    const updated = [newRecord, ...savedRecords.filter((r) => r.primaryResult !== newRecord.primaryResult)].slice(0, 10);
    setSavedRecords(updated);
    try {
      localStorage.setItem("saved_calc_bandwidth", JSON.stringify(updated));
    } catch { }
  };

  const handleRestoreRecord = (rec: SavedRecord) => {
    if (!rec.state) return;
    setActiveTab(rec.tab as any);
    if (rec.state.fileSizeStr) setFileSizeStr(rec.state.fileSizeStr);
    if (rec.state.fileSizeUnit) setFileSizeUnit(rec.state.fileSizeUnit);
    if (rec.state.speedStr) setSpeedStr(rec.state.speedStr);
    if (rec.state.speedUnit) setSpeedUnit(rec.state.speedUnit);
    if (rec.state.overheadStr) setOverheadStr(rec.state.overheadStr);
    if (rec.state.efficiencyStr) setEfficiencyStr(rec.state.efficiencyStr);
    if (rec.state.convertValStr) setConvertValStr(rec.state.convertValStr);
    if (rec.state.convertUnit) setConvertUnit(rec.state.convertUnit);
    if (rec.state.pageViewsStr) setPageViewsStr(rec.state.pageViewsStr);
    if (rec.state.avgPageSizeStr) setAvgPageSizeStr(rec.state.avgPageSizeStr);
    if (rec.state.pageSizeUnit) setPageSizeUnit(rec.state.pageSizeUnit);
    if (rec.state.redundancyFactorStr) setRedundancyFactorStr(rec.state.redundancyFactorStr);
    if (rec.state.botOverheadStr) setBotOverheadStr(rec.state.botOverheadStr);
    if (rec.state.concurrencyItems) setConcurrencyItems(rec.state.concurrencyItems);
    if (rec.state.headroomStr) setHeadroomStr(rec.state.headroomStr);
    if (rec.state.dataCapTbStr) setDataCapTbStr(rec.state.dataCapTbStr);
  };

  const handleDeleteSavedRecord = (id: string) => {
    const updated = savedRecords.filter((r) => r.id !== id);
    setSavedRecords(updated);
    try {
      localStorage.setItem("saved_calc_bandwidth", JSON.stringify(updated));
    } catch { }
  };

  const handleResetAll = () => {
    setFileSizeStr("10");
    setFileSizeUnit("GB");
    setSpeedStr("100");
    setSpeedUnit("Mbps");
    setOverheadStr("10");
    setEfficiencyStr("90");
    setConvertValStr("100");
    setConvertUnit("Mbps");
    setPageViewsStr("500000");
    setViewsPeriod("month");
    setAvgPageSizeStr("2.5");
    setPageSizeUnit("MB");
    setRedundancyFactorStr("2.0");
    setBotOverheadStr("15");
    setConcurrencyItems({
      stream4k: 2,
      stream1080p: 4,
      voip: 5,
      gaming: 2,
      backups: 1,
      remoteDesktop: 3,
      smartHome: 10,
    });
    setHeadroomStr("20");
    setDataCapTbStr("1.2");
    setSimProgress(0);
    setIsSimulating(false);
  };

  // Report Modal Data
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
          subtitle: `Effective Rate: ${transferResults.effectiveMBps.toFixed(2)} MB/s`,
          colorTheme: "blue" as const,
        },
        {
          label: "Hosting Bandwidth",
          value: `${hostingResults.monthlyTransferTb.toFixed(3)} TB/mo`,
          subtitle: `Peak Port: ${hostingResults.peakMbps.toFixed(2)} Mbps`,
          colorTheme: "emerald" as const,
        },
        {
          label: "Concurrency Demand",
          value: `${concurrencyResults.recommendedTotalMbps.toFixed(1)} Mbps`,
          subtitle: `Plan: ${concurrencyResults.recommendedPlan}`,
          colorTheme: "purple" as const,
        },
      ],
      sections: [
        {
          title: "Transfer Time Parameters",
          items: [
            { label: "File Package Size", value: `${fileSizeStr} ${fileSizeUnit}` },
            { label: "Connection Bandwidth", value: `${speedStr} ${speedUnit}` },
            { label: "Protocol Overhead Loss", value: `${overheadStr}%` },
            { label: "ISP Speed Test Ratio", value: `${efficiencyStr}%` },
            { label: "Theoretical Duration", value: transferResults.theoreticalFormatted },
            { label: "Realistic Duration", value: transferResults.realisticFormatted },
          ],
        },
        {
          title: "Web Hosting Infrastructure",
          items: [
            { label: "Monthly Page Views", value: hostingResults.monthlyViews.toLocaleString() },
            { label: "Average Page Payload", value: `${avgPageSizeStr} ${pageSizeUnit}` },
            { label: "Monthly Data Transfer", value: `${hostingResults.monthlyTransferTb.toFixed(3)} TB` },
            { label: "Average Bandwidth", value: `${hostingResults.avgMbps.toFixed(2)} Mbps` },
            { label: "Peak Surge Capacity", value: `${hostingResults.peakMbps.toFixed(2)} Mbps` },
            { label: "Recommended Port Tier", value: hostingResults.recommendedPort },
          ],
        },
        {
          title: "Multi-User Device Simulation",
          items: [
            { label: "Raw Aggregate Demand", value: `${concurrencyResults.rawTotalMbps.toFixed(1)} Mbps` },
            { label: "Safety Cushion Headroom", value: `${headroomStr}%` },
            { label: "Recommended Capacity", value: `${concurrencyResults.recommendedTotalMbps.toFixed(1)} Mbps` },
            { label: "Recommended ISP Plan", value: concurrencyResults.recommendedPlan },
          ],
        },
      ],
    };
  }, [
    fileSizeStr,
    fileSizeUnit,
    speedStr,
    speedUnit,
    overheadStr,
    efficiencyStr,
    transferResults,
    hostingResults,
    concurrencyResults,
    headroomStr,
    avgPageSizeStr,
    pageSizeUnit,
  ]);

  return (
    <div className="space-y-6">
      {/* TOP DASHBOARD NAVIGATION TABS & ACTIONS */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2.5 rounded-xl shadow-xs print:hidden">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          <button
            id="tab-transfer"
            onClick={() => setActiveTab("transfer")}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "transfer"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Download className="h-4 w-4" /> Data Transfer Time
          </button>
          <button
            id="tab-conversion"
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
            id="tab-hosting"
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
            id="tab-concurrency"
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

        {/* Global Action Toolbar */}
        <div className="flex flex-wrap items-center gap-1.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopyResult}
            className="h-8 text-xs gap-1 border-zinc-200 dark:border-zinc-700 cursor-pointer"
            aria-label="Copy primary active result"
          >
            {copiedResult ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            {copiedResult ? "Copied" : "Copy Result"}
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopySummary}
            className="h-8 text-xs gap-1 border-zinc-200 dark:border-zinc-700 cursor-pointer"
            aria-label="Copy full structured summary"
          >
            {copiedSummary ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <FileText className="h-3.5 w-3.5" />}
            {copiedSummary ? "Copied" : "Copy Summary"}
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopyLatex}
            className="h-8 text-xs gap-1 border-zinc-200 dark:border-zinc-700 cursor-pointer hidden sm:flex"
            aria-label="Copy LaTeX formula equations"
          >
            {copiedLatex ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Code className="h-3.5 w-3.5" />}
            {copiedLatex ? "LaTeX Copied" : "LaTeX"}
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDownloadCsv}
            className="h-8 text-xs gap-1 border-zinc-200 dark:border-zinc-700 cursor-pointer hidden sm:flex"
            aria-label="Export CSV spreadsheet"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-600" /> CSV
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDownloadTxt}
            className="h-8 text-xs gap-1 border-zinc-200 dark:border-zinc-700 cursor-pointer hidden md:flex"
            aria-label="Download plain text network audit"
          >
            <FileText className="h-3.5 w-3.5 text-blue-500" /> TXT
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSaveCalculation}
            className="h-8 text-xs gap-1 border-zinc-200 dark:border-zinc-700 cursor-pointer"
            aria-label="Save calculation to history"
          >
            <Bookmark className="h-3.5 w-3.5 text-amber-500" /> Save
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleShareLink}
            className="h-8 text-xs gap-1 border-zinc-200 dark:border-zinc-700 cursor-pointer"
            aria-label="Share configuration link"
          >
            {shared ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Share2 className="h-3.5 w-3.5" />}
            {shared ? "Shared" : "Share"}
          </Button>

          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={() => setIsReportModalOpen(true)}
            className="h-8 text-xs gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer"
            aria-label="Open PDF Report modal"
          >
            <Printer className="h-3.5 w-3.5" /> PDF Report
          </Button>
        </div>
      </div>

      {/* SAVED RECORDS BAR (if any saved) */}
      {savedRecords.length > 0 && (
        <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-3 rounded-xl flex items-center justify-between gap-2 overflow-x-auto text-xs print:hidden">
          <div className="flex items-center gap-2">
            <Bookmark className="h-3.5 w-3.5 text-amber-500" />
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">Saved Audits:</span>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {savedRecords.map((rec) => (
                <div
                  key={rec.id}
                  className="flex items-center gap-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2 py-1 rounded text-[11px]"
                >
                  <button
                    onClick={() => handleRestoreRecord(rec)}
                    className="font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    {rec.summary} ({rec.timestamp})
                  </button>
                  <button
                    onClick={() => handleDeleteSavedRecord(rec.id)}
                    className="text-zinc-400 hover:text-red-500 ml-1 cursor-pointer"
                    aria-label={`Delete record ${rec.summary}`}
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => {
              setSavedRecords([]);
              try {
                localStorage.removeItem("saved_calc_bandwidth");
              } catch { }
            }}
            className="text-[11px] text-zinc-400 hover:text-red-500 cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}

      {/* MODE 1: DATA TRANSFER TIME CALCULATOR */}
      {activeTab === "transfer" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Inputs Panel (Col 6) */}
          <div className="lg:col-span-6 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h2 className="text-sm font-bold tracking-tight text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <span>Download & Upload Parameters</span>
              </h2>
              <button
                onClick={handleResetAll}
                className="text-xs text-zinc-400 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                aria-label="Reset all parameters to default"
              >
                <RotateCcw className="h-3 w-3" /> Reset
              </button>
            </div>

            {/* Validation Alerts */}
            {transferErrors.length > 0 && (
              <div
                role="alert"
                className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl space-y-1 text-xs text-amber-800 dark:text-amber-300"
              >
                {transferErrors.map((err, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 font-medium">
                    <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>{err}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-4 text-xs">
              {/* Data Size Input */}
              <div className="space-y-1.5">
                <label htmlFor="input-file-size" className="font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between">
                  <span>File or Data Package Size</span>
                  <span className="font-sans tabular-nums text-blue-600 font-bold">
                    {fileSizeStr} {fileSizeUnit}
                  </span>
                </label>
                <div className="flex gap-2">
                  <Input
                    id="input-file-size"
                    type="number"
                    step="any"
                    value={fileSizeStr}
                    onChange={(e) => setFileSizeStr(e.target.value)}
                    className="h-9 text-xs font-sans tabular-nums flex-1"
                    aria-label="File or Data Package Size"
                  />
                  <select
                    id="select-file-unit"
                    value={fileSizeUnit}
                    onChange={(e) => setFileSizeUnit(e.target.value)}
                    className="h-9 text-xs font-semibold px-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md cursor-pointer"
                    aria-label="File Size Unit"
                  >
                    {DATA_UNIT_OPTIONS.map((grp) => (
                      <optgroup key={grp.group} label={grp.group}>
                        {grp.items.map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>

              {/* Network Speed Input */}
              <div className="space-y-1.5">
                <label htmlFor="input-speed" className="font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between">
                  <span>Network Bandwidth Speed</span>
                  <span className="font-sans tabular-nums text-emerald-600 font-bold">
                    {speedStr} {speedUnit}
                  </span>
                </label>
                <div className="flex gap-2">
                  <Input
                    id="input-speed"
                    type="number"
                    step="any"
                    value={speedStr}
                    onChange={(e) => setSpeedStr(e.target.value)}
                    className="h-9 text-xs font-sans tabular-nums flex-1"
                    aria-label="Network Bandwidth Speed"
                  />
                  <select
                    id="select-speed-unit"
                    value={speedUnit}
                    onChange={(e) => setSpeedUnit(e.target.value)}
                    className="h-9 text-xs font-semibold px-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md cursor-pointer"
                    aria-label="Bandwidth Speed Unit"
                  >
                    {SPEED_UNIT_OPTIONS.map((grp) => (
                      <optgroup key={grp.group} label={grp.group}>
                        {grp.items.map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>

              {/* Real-World Protocol Overhead Slider & Presets */}
              <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex justify-between items-center font-semibold text-zinc-700 dark:text-zinc-300">
                  <label htmlFor="range-overhead" className="flex items-center gap-1 cursor-pointer">
                    <Activity className="h-3.5 w-3.5 text-blue-500" /> Protocol Overhead Loss
                  </label>
                  <span className="font-sans tabular-nums font-bold text-blue-600">{overheadStr}%</span>
                </div>
                <input
                  id="range-overhead"
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  value={isNaN(numOverhead) ? 0 : Math.min(50, Math.max(0, numOverhead))}
                  onChange={(e) => setOverheadStr(e.target.value)}
                  className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  aria-label="Protocol Overhead Percentage"
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={() => setOverheadStr("0")}
                    className={`px-2 py-1 rounded text-[10px] font-semibold cursor-pointer border ${
                      numOverhead === 0
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700"
                    }`}
                  >
                    0% Theoretical
                  </button>
                  <button
                    type="button"
                    onClick={() => setOverheadStr("5")}
                    className={`px-2 py-1 rounded text-[10px] font-semibold cursor-pointer border ${
                      numOverhead === 5
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700"
                    }`}
                  >
                    5% TCP/IP Ethernet
                  </button>
                  <button
                    type="button"
                    onClick={() => setOverheadStr("10")}
                    className={`px-2 py-1 rounded text-[10px] font-semibold cursor-pointer border ${
                      numOverhead === 10
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700"
                    }`}
                  >
                    10% Standard Internet
                  </button>
                  <button
                    type="button"
                    onClick={() => setOverheadStr("15")}
                    className={`px-2 py-1 rounded text-[10px] font-semibold cursor-pointer border ${
                      numOverhead === 15
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700"
                    }`}
                  >
                    15% Wi-Fi Signal
                  </button>
                  <button
                    type="button"
                    onClick={() => setOverheadStr("20")}
                    className={`px-2 py-1 rounded text-[10px] font-semibold cursor-pointer border ${
                      numOverhead === 20
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700"
                    }`}
                  >
                    20% Mobile 4G/5G
                  </button>
                </div>
              </div>

              {/* ISP Speed Test Matcher Slider */}
              <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex justify-between items-center font-semibold text-zinc-700 dark:text-zinc-300">
                  <label htmlFor="range-efficiency" className="flex items-center gap-1 cursor-pointer">
                    <Gauge className="h-3.5 w-3.5 text-emerald-500" /> Measured ISP Speed Ratio
                  </label>
                  <span className="font-sans tabular-nums font-bold text-emerald-600">{efficiencyStr}% of Plan</span>
                </div>
                <input
                  id="range-efficiency"
                  type="range"
                  min="50"
                  max="100"
                  step="5"
                  value={isNaN(numEfficiency) ? 90 : Math.min(100, Math.max(50, numEfficiency))}
                  onChange={(e) => setEfficiencyStr(e.target.value)}
                  className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  aria-label="Measured ISP Speed Ratio Percentage"
                />
                <p className="text-[10px] text-zinc-400">
                  Adjust if your actual speed test yields less than your advertised ISP plan speed.
                </p>
              </div>
            </div>
          </div>

          {/* Results Panel (Col 6) */}
          <div className="lg:col-span-6 space-y-4" aria-live="polite">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-sm space-y-1">
                <span className="text-[11px] font-semibold text-blue-100 uppercase tracking-wider block">
                  Realistic Transfer Time
                </span>
                <div className="text-2xl font-black font-sans tabular-nums tracking-tight my-1">
                  {transferResults.realisticFormatted}
                </div>
                <span className="text-[10px] text-blue-200 block">
                  Includes {overheadStr}% overhead & {efficiencyStr}% ISP efficiency
                </span>
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs space-y-1">
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                  Theoretical Best Time
                </span>
                <div className="text-2xl font-black font-sans tabular-nums tracking-tight text-zinc-900 dark:text-zinc-100 my-1">
                  {transferResults.theoreticalFormatted}
                </div>
                <span className="text-[10px] text-emerald-600 font-bold block font-sans tabular-nums">
                  Effective Rate: {transferResults.effectiveMBps.toFixed(2)} MB/s
                </span>
              </div>
            </div>

            {/* Live Interactive Download Visualizer */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl space-y-3 shadow-xs">
              <div className="flex justify-between items-center text-xs font-bold text-zinc-800 dark:text-zinc-200">
                <span className="flex items-center gap-1.5">
                  <Download className="h-4 w-4 text-blue-500 animate-bounce" /> Live Download Visualizer
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-sans tabular-nums text-zinc-500">
                    {fileSizeStr} {fileSizeUnit} @ {transferResults.effectiveMBps.toFixed(2)} MB/s
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (isSimulating) {
                        setIsSimulating(false);
                      } else {
                        setSimProgress(0);
                        setIsSimulating(true);
                      }
                    }}
                    className="p-1 rounded bg-blue-50 dark:bg-zinc-800 hover:bg-blue-100 dark:hover:bg-zinc-700 text-blue-600 dark:text-blue-400 cursor-pointer"
                    aria-label={isSimulating ? "Pause download simulation" : "Start download simulation"}
                  >
                    {isSimulating ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

              {/* Dynamic progress bar reflecting simulation or effective rate */}
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-3.5 rounded-full overflow-hidden relative">
                <div
                  className="bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 h-full rounded-full transition-all duration-150"
                  style={{ width: `${isSimulating ? simProgress : 75}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] font-sans tabular-nums text-zinc-400">
                <span>0 %</span>
                <span>
                  {isSimulating ? `Simulating: ${simProgress.toFixed(0)}%` : `Estimated completion: ${transferResults.realisticFormatted}`}
                </span>
                <span>100 %</span>
              </div>
            </div>

            {/* Data Cap Warning Predictor Card */}
            <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-4 rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between items-center font-bold text-amber-900 dark:text-amber-300">
                <span className="flex items-center gap-1.5">
                  <ShieldAlert className="h-4 w-4 text-amber-600" /> Monthly Data Cap Predictor
                </span>
                <div className="flex items-center gap-1 font-sans tabular-nums text-xs">
                  <label htmlFor="input-data-cap">Cap:</label>
                  <input
                    id="input-data-cap"
                    type="number"
                    step="0.1"
                    value={dataCapTbStr}
                    onChange={(e) => setDataCapTbStr(e.target.value)}
                    className="w-16 h-6 text-center bg-white dark:bg-zinc-900 border border-amber-300 rounded font-sans tabular-nums"
                    aria-label="Monthly Data Cap in Terabytes"
                  />
                  <span>TB</span>
                </div>
              </div>

              <p className="text-zinc-700 dark:text-zinc-300 text-[11px]">
                Downloading continuously at <strong>{speedStr} {speedUnit}</strong> will exhaust a{" "}
                <strong>{dataCapTbStr} TB</strong> monthly data cap (SI decimal basis: 10¹² bytes) in:
              </p>

              <div className="text-base font-black font-sans tabular-nums text-amber-700 dark:text-amber-400">
                {dataCapResults.formattedExhaustTime}
              </div>

              <div className="text-[10px] text-zinc-500 flex justify-between border-t border-amber-200 dark:border-amber-900/40 pt-1.5">
                <span>Recommended max daily download limit (30.4375 avg days):</span>
                <span className="font-bold font-sans tabular-nums text-amber-800 dark:text-amber-300">
                  {dataCapResults.dailyAllowanceGb.toFixed(1)} GB/day
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: BANDWIDTH CONVERTER */}
      {activeTab === "conversion" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs max-w-2xl mx-auto space-y-4">
            <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <span>Dynamic Bandwidth & Bitrate Converter</span>
            </h2>

            {conversionErrors.length > 0 && (
              <div role="alert" className="p-2.5 bg-red-50 dark:bg-red-950/30 border border-red-200 text-xs text-red-700 rounded-lg">
                {conversionErrors[0]}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                id="input-convert-val"
                type="number"
                step="any"
                value={convertValStr}
                onChange={(e) => setConvertValStr(e.target.value)}
                className="h-10 text-sm font-sans tabular-nums flex-1"
                aria-label="Value to convert"
              />
              <select
                id="select-convert-unit"
                value={convertUnit}
                onChange={(e) => setConvertUnit(e.target.value)}
                className="h-10 text-xs font-bold px-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md cursor-pointer"
                aria-label="Unit of value to convert"
              >
                {SPEED_UNIT_OPTIONS.map((grp) => (
                  <optgroup key={grp.group} label={grp.group}>
                    {grp.items.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          {/* Converter Equivalency Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs" aria-live="polite">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-xl space-y-1">
              <span className="text-[10px] text-zinc-400 font-bold block uppercase">Megabits per sec</span>
              <span className="text-lg font-black font-sans tabular-nums text-blue-600 block">
                {conversionResults.Mbps.toFixed(2)} Mbps
              </span>
              <span className="text-[10px] text-zinc-400">Standard ISP speed metric</span>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-xl space-y-1">
              <span className="text-[10px] text-zinc-400 font-bold block uppercase">Megabytes per sec</span>
              <span className="text-lg font-black font-sans tabular-nums text-emerald-600 block">
                {conversionResults["MB/s"].toFixed(2)} MB/s
              </span>
              <span className="text-[10px] text-zinc-400">Actual file download rate</span>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-xl space-y-1">
              <span className="text-[10px] text-zinc-400 font-bold block uppercase">Gigabits per sec</span>
              <span className="text-lg font-black font-sans tabular-nums text-purple-600 block">
                {conversionResults.Gbps.toFixed(4)} Gbps
              </span>
              <span className="text-[10px] text-zinc-400">Fiber broadband rate</span>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 rounded-xl space-y-1">
              <span className="text-[10px] text-zinc-400 font-bold block uppercase">Monthly Data Volume</span>
              <span className="text-lg font-black font-sans tabular-nums text-amber-600 block">
                {conversionResults.gbPerMonth30d.toFixed(1)} GB/mo
              </span>
              <span className="text-[10px] text-zinc-400">Continuous 24/7 (30-day cycle)</span>
            </div>
          </div>

          {/* Detailed Equivalency Table */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs">
            <h3 className="text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400 mb-3 tracking-wider">
              Comprehensive Unit Equivalency Table
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 font-semibold">
                    <th className="py-2 px-3">Standard / System</th>
                    <th className="py-2 px-3">Unit</th>
                    <th className="py-2 px-3">Value</th>
                    <th className="py-2 px-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-sans tabular-nums">
                  <tr>
                    <td className="py-2 px-3 font-medium text-zinc-700 dark:text-zinc-300">SI Bitrate</td>
                    <td className="py-2 px-3 font-bold text-blue-600">bps</td>
                    <td className="py-2 px-3">{conversionResults.bps.toLocaleString()} bps</td>
                    <td className="py-2 px-3 text-zinc-400">Raw individual bits per second</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-zinc-700 dark:text-zinc-300">SI Bitrate</td>
                    <td className="py-2 px-3 font-bold text-blue-600">Kbps</td>
                    <td className="py-2 px-3">{conversionResults.Kbps.toLocaleString()} Kbps</td>
                    <td className="py-2 px-3 text-zinc-400">Kilobits per second (10³ bps)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-zinc-700 dark:text-zinc-300">SI Bitrate</td>
                    <td className="py-2 px-3 font-bold text-blue-600">Mbps</td>
                    <td className="py-2 px-3">{conversionResults.Mbps.toFixed(4)} Mbps</td>
                    <td className="py-2 px-3 text-zinc-400">Megabits per second (10⁶ bps)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-zinc-700 dark:text-zinc-300">SI Bitrate</td>
                    <td className="py-2 px-3 font-bold text-blue-600">Gbps</td>
                    <td className="py-2 px-3">{conversionResults.Gbps.toFixed(6)} Gbps</td>
                    <td className="py-2 px-3 text-zinc-400">Gigabits per second (10⁹ bps)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-zinc-700 dark:text-zinc-300">SI Transfer Rate</td>
                    <td className="py-2 px-3 font-bold text-emerald-600">B/s</td>
                    <td className="py-2 px-3">{conversionResults["B/s"].toLocaleString()} B/s</td>
                    <td className="py-2 px-3 text-zinc-400">Bytes per second (8 bits)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-zinc-700 dark:text-zinc-300">SI Transfer Rate</td>
                    <td className="py-2 px-3 font-bold text-emerald-600">KB/s</td>
                    <td className="py-2 px-3">{conversionResults["KB/s"].toFixed(2)} KB/s</td>
                    <td className="py-2 px-3 text-zinc-400">Kilobytes per second (10³ B/s)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-zinc-700 dark:text-zinc-300">SI Transfer Rate</td>
                    <td className="py-2 px-3 font-bold text-emerald-600">MB/s</td>
                    <td className="py-2 px-3">{conversionResults["MB/s"].toFixed(4)} MB/s</td>
                    <td className="py-2 px-3 text-zinc-400">Megabytes per second (10⁶ B/s)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-zinc-700 dark:text-zinc-300">IEC Binary (Base-1024)</td>
                    <td className="py-2 px-3 font-bold text-purple-600">MiB/s</td>
                    <td className="py-2 px-3">{conversionResults["MiB/s"].toFixed(4)} MiB/s</td>
                    <td className="py-2 px-3 text-zinc-400">Mebibytes per second (1,048,576 B/s)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-zinc-700 dark:text-zinc-300">IEC Binary (Base-1024)</td>
                    <td className="py-2 px-3 font-bold text-purple-600">GiB/s</td>
                    <td className="py-2 px-3">{conversionResults["GiB/s"].toFixed(6)} GiB/s</td>
                    <td className="py-2 px-3 text-zinc-400">Gibibytes per second (1,073,741,824 B/s)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: WEBSITE & SERVER HOSTING BANDWIDTH */}
      {activeTab === "hosting" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs text-xs">
            <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <span>Web Server & Hosting Inputs</span>
            </h2>

            {hostingErrors.length > 0 && (
              <div role="alert" className="p-2.5 bg-red-50 dark:bg-red-950/30 border border-red-200 text-xs text-red-700 rounded-lg">
                {hostingErrors[0]}
              </div>
            )}

            {/* Traffic Views */}
            <div className="space-y-1.5">
              <label htmlFor="input-page-views" className="font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between">
                <span>Traffic Volume (Page Views)</span>
                <span className="font-sans tabular-nums font-bold text-blue-600">
                  {numPageViews.toLocaleString()} views
                </span>
              </label>
              <div className="flex gap-2">
                <Input
                  id="input-page-views"
                  type="number"
                  step="any"
                  value={pageViewsStr}
                  onChange={(e) => setPageViewsStr(e.target.value)}
                  className="h-9 text-xs font-sans tabular-nums flex-1"
                  aria-label="Monthly Page Views"
                />
                <select
                  id="select-views-period"
                  value={viewsPeriod}
                  onChange={(e) => setViewsPeriod(e.target.value as any)}
                  className="h-9 text-xs font-semibold px-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md cursor-pointer"
                  aria-label="Traffic Volume Period"
                >
                  <option value="month">per Month</option>
                  <option value="day">per Day</option>
                  <option value="hour">per Hour</option>
                </select>
              </div>
            </div>

            {/* Average Page Size */}
            <div className="space-y-1.5">
              <label htmlFor="input-page-size" className="font-semibold text-zinc-700 dark:text-zinc-300 flex justify-between">
                <span>Average Page / Asset Payload Size</span>
                <span className="font-sans tabular-nums font-bold text-emerald-600">
                  {avgPageSizeStr} {pageSizeUnit}
                </span>
              </label>
              <div className="flex gap-2">
                <Input
                  id="input-page-size"
                  type="number"
                  step="any"
                  value={avgPageSizeStr}
                  onChange={(e) => setAvgPageSizeStr(e.target.value)}
                  className="h-9 text-xs font-sans tabular-nums flex-1"
                  aria-label="Average Page Payload Size"
                />
                <select
                  id="select-page-size-unit"
                  value={pageSizeUnit}
                  onChange={(e) => setPageSizeUnit(e.target.value)}
                  className="h-9 text-xs font-semibold px-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md cursor-pointer"
                  aria-label="Payload Size Unit"
                >
                  <option value="KB">KB</option>
                  <option value="MB">MB</option>
                  <option value="GB">GB</option>
                  <option value="KiB">KiB (IEC)</option>
                  <option value="MiB">MiB (IEC)</option>
                  <option value="GiB">GiB (IEC)</option>
                </select>
              </div>
            </div>

            {/* Redundancy & Peak Surge Slider */}
            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex justify-between items-center font-semibold text-zinc-700 dark:text-zinc-300">
                <label htmlFor="range-surge" className="cursor-pointer">
                  Peak Traffic Surge Multiplier (Redundancy)
                </label>
                <span className="font-sans tabular-nums font-bold text-purple-600">{redundancyFactorStr}x Surge</span>
              </div>
              <input
                id="range-surge"
                type="range"
                min="1.0"
                max="5.0"
                step="0.5"
                value={isNaN(numRedundancy) ? 2.0 : Math.min(5.0, Math.max(1.0, numRedundancy))}
                onChange={(e) => setRedundancyFactorStr(e.target.value)}
                className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                aria-label="Peak Traffic Surge Multiplier"
              />
            </div>

            {/* Bot Traffic Overhead */}
            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex justify-between items-center font-semibold text-zinc-700 dark:text-zinc-300">
                <label htmlFor="range-bot" className="cursor-pointer">
                  Bot & Search Crawler Overhead
                </label>
                <span className="font-sans tabular-nums font-bold text-amber-600">{botOverheadStr}% extra</span>
              </div>
              <input
                id="range-bot"
                type="range"
                min="0"
                max="50"
                step="5"
                value={isNaN(numBotOverhead) ? 15 : Math.min(50, Math.max(0, numBotOverhead))}
                onChange={(e) => setBotOverheadStr(e.target.value)}
                className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
                aria-label="Bot and Search Crawler Overhead Percentage"
              />
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-6 space-y-4" aria-live="polite">
            <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-sm space-y-1">
              <span className="text-[11px] font-semibold text-blue-100 uppercase tracking-wider block">
                Estimated Monthly Hosting Transfer
              </span>
              <div className="text-3xl font-black font-sans tabular-nums tracking-tight my-1">
                {hostingResults.monthlyTransferTb.toFixed(3)} TB / month
              </div>
              <span className="text-[10px] text-blue-200 block">
                Equal to {hostingResults.monthlyTransferGb.toFixed(2)} GB/month
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl space-y-1 shadow-xs">
                <span className="text-[10px] font-bold text-zinc-400 uppercase">Average Port Bandwidth</span>
                <span className="text-xl font-black font-sans tabular-nums text-zinc-900 dark:text-zinc-100 block">
                  {hostingResults.avgMbps.toFixed(2)} Mbps
                </span>
                <span className="text-[10px] text-zinc-400">Based on 2,629,800 s/month</span>
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl space-y-1 shadow-xs">
                <span className="text-[10px] font-bold text-zinc-400 uppercase">Peak Surge Port Speed</span>
                <span className="text-xl font-black font-sans tabular-nums text-purple-600 block">
                  {hostingResults.peakMbps.toFixed(2)} Mbps
                </span>
                <span className="text-[10px] text-zinc-400">At {redundancyFactorStr}x concurrent burst</span>
              </div>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 p-4 rounded-2xl space-y-1 text-xs shadow-xs">
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
            <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-600" />
                <span>Simultaneous Device & Activity Profile Planner</span>
              </span>
              <span className="text-[10px] text-purple-600 font-sans tabular-nums">Real-time simulator</span>
            </h2>

            {concurrencyErrors.length > 0 && (
              <div role="alert" className="p-2.5 bg-red-50 dark:bg-red-950/30 border border-red-200 text-xs text-red-700 rounded-lg">
                {concurrencyErrors[0]}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {concurrencyResults.profiles.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.key}
                    className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200/60 dark:border-zinc-700 flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <span className="font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                        <Icon className="h-3.5 w-3.5 text-purple-500" /> {p.name}
                      </span>
                      <span className="text-[10px] text-zinc-400 block font-sans tabular-nums">
                        ~{p.speedMbps} Mbps each ({((concurrencyItems[p.key] ?? 0) * p.speedMbps).toFixed(1)} Mbps total)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setConcurrencyItems((prev) => ({
                            ...prev,
                            [p.key]: Math.max(0, (prev[p.key] ?? 0) - 1),
                          }))
                        }
                        className="w-6 h-6 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-600 rounded font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                        aria-label={`Decrease ${p.name}`}
                      >
                        -
                      </button>
                      <span className="font-sans tabular-nums font-bold w-5 text-center">
                        {concurrencyItems[p.key] ?? 0}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setConcurrencyItems((prev) => ({
                            ...prev,
                            [p.key]: (prev[p.key] ?? 0) + 1,
                          }))
                        }
                        className="w-6 h-6 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-600 rounded font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                        aria-label={`Increase ${p.name}`}
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
                <label htmlFor="range-headroom" className="cursor-pointer">
                  Network Headroom Safety Margin
                </label>
                <span className="font-sans tabular-nums text-purple-600">{headroomStr}% cushion</span>
              </div>
              <input
                id="range-headroom"
                type="range"
                min="0"
                max="50"
                step="5"
                value={isNaN(numHeadroom) ? 20 : Math.min(50, Math.max(0, numHeadroom))}
                onChange={(e) => setHeadroomStr(e.target.value)}
                className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                aria-label="Network Headroom Safety Cushion Percentage"
              />
            </div>
          </div>

          {/* Results Summary (Col 5) */}
          <div className="lg:col-span-5 space-y-4" aria-live="polite">
            <div className="bg-purple-600 text-white p-5 rounded-2xl shadow-sm space-y-2">
              <span className="text-[10px] font-bold text-purple-200 uppercase tracking-wider block">
                Total Recommended Household / Office Bandwidth
              </span>
              <div className="text-3xl font-black font-sans tabular-nums tracking-tight">
                {concurrencyResults.recommendedTotalMbps.toFixed(1)} Mbps
              </div>
              <span className="text-[11px] text-purple-100 block">
                ({concurrencyResults.recommendedTotalGbps.toFixed(2)} Gbps continuous capacity)
              </span>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl space-y-2 shadow-xs">
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
