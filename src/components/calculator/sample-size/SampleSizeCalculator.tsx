"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Sliders,
  Layers,
  Copy,
  Download,
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Printer,
  ShieldAlert,
  BarChart2,
  TrendingUp,
  Check,
  BookOpen
} from "lucide-react";
import {
  computeSurveySampleSize,
  computeContinuousMeanSampleSize,
  computePowerAnalysisSampleSize,
  computeABTestSampleSize,
  computeReverseMarginOfError,
  generatePowerCurvePoints,
  generateAPAMethodologyParagraph,
  normalCDF,
  getZScore
} from "@/app/calculators/sample-size-calculator/sample-size-logic";
import { SampleSizeReportModal } from "./SampleSizeReportModal";

export type VisualTab = "curve" | "moe" | "benchmark";

export interface SavedSampleSizeItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
}

export function SampleSizeCalculator() {
  // Card 1 Inputs: Survey & Proportion Sample Size
  const [confLevel, setConfLevel] = useState<number>(95);
  const [marginOfError, setMarginOfError] = useState<number>(5);
  const [popProp, setPopProp] = useState<number>(50);
  const [populationN, setPopulationN] = useState<string>("");
  const [respRate, setRespRate] = useState<number>(80);
  const [activeVisual, setActiveVisual] = useState<VisualTab>("curve");
  const [hoverPower, setHoverPower] = useState<{ n: number; power: number; x: number; y: number } | null>(null);
  const [hoverMoe, setHoverMoe] = useState<{ n: number; moe: number; x: number; y: number } | null>(null);
  const [chartEffectSize, setChartEffectSize] = useState<number>(0.5);
  const [chartTargetPower, setChartTargetPower] = useState<number>(80);

  // Card 2 Inputs: Continuous Mean / Standard Deviation
  const [contConfLevel, setContConfLevel] = useState<number>(95);
  const [contPrecisionE, setContPrecisionE] = useState<number>(2);
  const [contSD, setContSD] = useState<number>(10);
  const [contPopN, setContPopN] = useState<string>("");

  // Card 3 Inputs: A/B Testing & Conversion Rate
  const [p1Pct, setP1Pct] = useState<number>(3.0);
  const [p2Pct, setP2Pct] = useState<number>(3.5);
  const [powerPct, setPowerPct] = useState<number>(80);

  // Card 4 Inputs: Hypothesis Testing & Power Analysis (Cohen's d)
  const [hypoAlpha, setHypoAlpha] = useState<number>(5);
  const [hypoPower, setHypoPower] = useState<number>(80);
  const [hypoEffectSize, setHypoEffectSize] = useState<number>(0.5);

  // Card 5 Inputs: Reverse Margin of Error Calculator
  const [revSampleN, setRevSampleN] = useState<number>(400);
  const [revConfLevel, setRevConfLevel] = useState<number>(95);
  const [revPopN, setRevPopN] = useState<string>("");

  // Master Toolbar & Feedback States
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [copiedApa, setCopiedApa] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);

  // Saved items states
  const [savedSurveyItems, setSavedSurveyItems] = useState<SavedSampleSizeItem[]>([]);
  const [justSavedSurvey, setJustSavedSurvey] = useState<boolean>(false);

  const [savedABItems, setSavedABItems] = useState<SavedSampleSizeItem[]>([]);
  const [justSavedAB, setJustSavedAB] = useState<boolean>(false);

  const [savedRevItems, setSavedRevItems] = useState<SavedSampleSizeItem[]>([]);
  const [justSavedRev, setJustSavedRev] = useState<boolean>(false);

  // Expand / Collapse state for saved calculation cards
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Restore saved state and URL parameters on mount
  useEffect(() => {
    try {
      const storedSurvey = localStorage.getItem("saved_samplesize_survey");
      if (storedSurvey) setSavedSurveyItems(JSON.parse(storedSurvey));

      const storedAB = localStorage.getItem("saved_samplesize_ab");
      if (storedAB) setSavedABItems(JSON.parse(storedAB));

      const storedRev = localStorage.getItem("saved_samplesize_reverse");
      if (storedRev) setSavedRevItems(JSON.parse(storedRev));
    } catch (e) {}

    if (typeof window !== "undefined" && window.location.search) {
      try {
        const params = new URLSearchParams(window.location.search);
        if (params.has("conf")) setConfLevel(parseFloat(params.get("conf")!) || 95);
        if (params.has("moe")) setMarginOfError(parseFloat(params.get("moe")!) || 5);
        if (params.has("pop")) setPopulationN(params.get("pop") || "");
        if (params.has("resp")) setRespRate(parseFloat(params.get("resp")!) || 80);
        if (params.has("p1")) setP1Pct(parseFloat(params.get("p1")!) || 3.0);
        if (params.has("p2")) setP2Pct(parseFloat(params.get("p2")!) || 3.5);
        if (params.has("pwr")) setPowerPct(parseFloat(params.get("pwr")!) || 80);
      } catch (e) {}
    }
  }, []);

  // Card 1 Calculations: Survey Sample Size
  const parsedPopN = useMemo(() => {
    const clean = populationN.trim().replace(/,/g, "");
    if (!clean) return undefined;
    const p = parseInt(clean, 10);
    return !Number.isNaN(p) && p > 0 ? p : undefined;
  }, [populationN]);

  const surveyResult = useMemo(() => {
    return computeSurveySampleSize(confLevel, marginOfError, popProp, parsedPopN, respRate);
  }, [confLevel, marginOfError, popProp, parsedPopN, respRate]);

  const apaText = useMemo(() => {
    return generateAPAMethodologyParagraph(surveyResult);
  }, [surveyResult]);

  // Card 2 Calculations: Continuous Mean / SD
  const parsedContPopN = useMemo(() => {
    const clean = contPopN.trim().replace(/,/g, "");
    if (!clean) return undefined;
    const p = parseInt(clean, 10);
    return !Number.isNaN(p) && p > 0 ? p : undefined;
  }, [contPopN]);

  const contResult = useMemo(() => {
    return computeContinuousMeanSampleSize(contConfLevel, contPrecisionE, contSD, parsedContPopN);
  }, [contConfLevel, contPrecisionE, contSD, parsedContPopN]);

  // Card 3 Calculations: A/B Testing
  const abResult = useMemo(() => {
    return computeABTestSampleSize(p1Pct, p2Pct, 5, powerPct);
  }, [p1Pct, p2Pct, powerPct]);

  // Card 4 Calculations: Power Analysis & Hypothesis Testing
  const powerResult = useMemo(() => {
    return computePowerAnalysisSampleSize(hypoAlpha, hypoPower, hypoEffectSize);
  }, [hypoAlpha, hypoPower, hypoEffectSize]);

  // Card 5 Calculations: Reverse MOE
  const parsedRevPopN = useMemo(() => {
    const clean = revPopN.trim().replace(/,/g, "");
    if (!clean) return undefined;
    const p = parseInt(clean, 10);
    return !Number.isNaN(p) && p > 0 ? p : undefined;
  }, [revPopN]);

  const revMOEResult = useMemo(() => {
    return computeReverseMarginOfError(revSampleN, revConfLevel, 50, parsedRevPopN);
  }, [revSampleN, revConfLevel, parsedRevPopN]);

  // Target sample size for interactive chart power & effect size
  const chartPowerTargetN = useMemo(() => {
    return computePowerAnalysisSampleSize(5, chartTargetPower, chartEffectSize).nPerGroup;
  }, [chartTargetPower, chartEffectSize]);

  // Dynamic Power Curve Points based on chart effect size & target power
  const powerCurvePoints = useMemo(() => {
    const maxN = Math.max(120, Math.min(1200, chartPowerTargetN * 2.2));
    return generatePowerCurvePoints(chartEffectSize, 5, maxN);
  }, [chartEffectSize, chartPowerTargetN]);

  // Dynamic MOE Curve Points based on Survey inputs
  const moeCurvePoints = useMemo(() => {
    const points: { n: number; moe: number }[] = [];
    const targetN = surveyResult.sampleSize || 385;
    const maxN = Math.max(800, Math.min(4000, targetN * 2.5));
    const step = Math.max(10, Math.floor(maxN / 40));
    for (let n = 20; n <= maxN; n += step) {
      const res = computeReverseMarginOfError(n, confLevel, popProp, parsedPopN);
      if (res.isValid) {
        points.push({ n, moe: res.moe });
      }
    }
    return points;
  }, [confLevel, popProp, parsedPopN, surveyResult.sampleSize]);

  const handlePowerMouseMove = (e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const mouseX = clientX - rect.left;
    const svgWidth = rect.width;
    const scaleX = 500 / (svgWidth || 500);
    const currX = Math.max(40, Math.min(480, mouseX * scaleX));

    if (!powerCurvePoints.length) return;
    const minN = powerCurvePoints[0].sampleSize;
    const maxN = powerCurvePoints[powerCurvePoints.length - 1].sampleSize;
    const ratio = (currX - 40) / 440;
    const currentN = Math.round(minN + ratio * (maxN - minN));

    const zAlpha = getZScore(95);
    const zBeta = chartEffectSize * Math.sqrt(currentN / 2) - zAlpha;
    const power = Math.min(1.0, Math.max(0.0, normalCDF(zBeta)));
    const y = 130 - power * 105;

    setHoverPower({
      n: currentN,
      power: parseFloat((power * 100).toFixed(1)),
      x: currX,
      y: Math.max(20, Math.min(130, y))
    });
  };

  const handleMoeMouseMove = (e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const mouseX = clientX - rect.left;
    const svgWidth = rect.width;
    const scaleX = 500 / (svgWidth || 500);
    const currX = Math.max(40, Math.min(480, mouseX * scaleX));

    if (!moeCurvePoints.length) return;
    const minN = moeCurvePoints[0].n;
    const maxN = moeCurvePoints[moeCurvePoints.length - 1].n;
    const ratio = (currX - 40) / 440;
    const currentN = Math.round(minN + ratio * (maxN - minN));

    const res = computeReverseMarginOfError(currentN, confLevel, popProp, parsedPopN);
    if (res.isValid) {
      const maxMOE = 15;
      const y = 130 - Math.min(1, res.moe / maxMOE) * 105;
      setHoverMoe({
        n: currentN,
        moe: parseFloat(res.moe.toFixed(2)),
        x: currX,
        y: Math.max(20, Math.min(130, y))
      });
    }
  };

  // Master Toolbar Handlers
  const handleCopySummary = () => {
    const summaryText = `--- CALCPLATFORM SAMPLE SIZE & POWER ANALYSIS REPORT ---
1. Survey Sample Size (Cochran's Formula & FPC):
- Inputs: Confidence = ${confLevel}%, Margin of Error = ±${marginOfError}%, Population = ${populationN || "Infinite"}, Response Rate = ${respRate}%
- Recommended Sample Size (n): ${surveyResult.sampleSize.toLocaleString()} completed responses
- Estimated Invites Needed: ${surveyResult.invitedTarget.toLocaleString()} participants
- Critical Z: ${surveyResult.zScore}, FPC Status: ${surveyResult.fpcApplied ? "Applied" : "Infinite"}

2. Continuous Mean Estimation:
- Inputs: Confidence = ${contConfLevel}%, Desired Margin (E) = ±${contPrecisionE}, SD (σ) = ${contSD}
- Required Sample Size (n): ${contResult.sampleSize.toLocaleString()}

3. Two Proportions A/B Testing:
- Inputs: Baseline P1 = ${p1Pct}%, Variant P2 = ${p2Pct}%, Power = ${powerPct}%
- Sample Size per Variant: ${abResult.sampleSizePerVariant.toLocaleString()} / variant
- Total A/B Test Sample: ${abResult.totalSampleSize.toLocaleString()}
- Absolute Difference: ±${abResult.absDiffPct}% pts | Relative Uplift: +${abResult.relativeUpliftPct}%

4. Reverse Margin of Error:
- Inputs: Completed Sample n = ${revSampleN}, Confidence = ${revConfLevel}%, Pop = ${revPopN || "Infinite"}
- Achieved Margin of Error: ${revMOEResult.moeFormatted}`;

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleCopyApa = () => {
    if (!apaText) return;
    navigator.clipboard.writeText(apaText);
    setCopiedApa(true);
    setTimeout(() => setCopiedApa(false), 2000);
  };

  const handleShare = () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("conf", confLevel.toString());
    url.searchParams.set("moe", marginOfError.toString());
    if (populationN) url.searchParams.set("pop", populationN);
    url.searchParams.set("resp", respRate.toString());
    url.searchParams.set("p1", p1Pct.toString());
    url.searchParams.set("p2", p2Pct.toString());
    url.searchParams.set("pwr", powerPct.toString());

    navigator.clipboard.writeText(url.toString());
    window.history.replaceState({}, "", url.toString());
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const handleResetDefaults = () => {
    setConfLevel(95);
    setMarginOfError(5);
    setPopProp(50);
    setPopulationN("");
    setRespRate(80);
    setContConfLevel(95);
    setContPrecisionE(2);
    setContSD(10);
    setContPopN("");
    setP1Pct(3.0);
    setP2Pct(3.5);
    setPowerPct(80);
    setHypoAlpha(5);
    setHypoPower(80);
    setHypoEffectSize(0.5);
    setRevSampleN(400);
    setRevConfLevel(95);
    setRevPopN("");
  };

  const handleDownloadCSV = () => {
    const header = "Metric,Value,Notes\n";
    const rows = [
      `Survey Confidence Level,${confLevel}%,Input`,
      `Survey Margin of Error,±${marginOfError}%,Input`,
      `Survey Population,${populationN || "Infinite"},Input`,
      `Survey Recommended Sample,${surveyResult.sampleSize},Required Completed Responses`,
      `Survey Recruitment Target,${surveyResult.invitedTarget},Invites at ${respRate}% response`,
      `Survey Critical Z,${surveyResult.zScore},Statistical Threshold`,
      `A/B Baseline P1,${p1Pct}%,Conversion Rate`,
      `A/B Variant P2,${p2Pct}%,Conversion Rate`,
      `A/B Sample per Variant,${abResult.sampleSizePerVariant},Visitors per Arm`,
      `A/B Total Test Sample,${abResult.totalSampleSize},Total Required Visitors`,
      `Reverse MOE Sample Size,${revSampleN},Completed Responses`,
      `Achieved Margin of Error,${revMOEResult.moeFormatted},Precision`
    ].join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sample_size_determination_n${surveyResult.sampleSize}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Save Card 1 Handler
  const handleSaveSurvey = () => {
    if (!surveyResult.isValid) return;
    const inputsStr = `Conf: ${confLevel}%, MOE: ±${marginOfError}%, Pop N: ${populationN || "Infinite"}, Resp Rate: ${respRate}%`;
    const opStr = `Survey Sample Size Calculation`;
    const resList = [
      `Required Sample Size (n) = ${surveyResult.sampleSize.toLocaleString()}`,
      `Invites Target = ${surveyResult.invitedTarget.toLocaleString()}`,
      `Critical z-score = ${surveyResult.zScore}`,
      `FPC Applied = ${surveyResult.fpcApplied ? "Yes" : "No"}`
    ];

    const newItem: SavedSampleSizeItem = {
      id: Date.now().toString(),
      title: `Survey (n=${surveyResult.sampleSize.toLocaleString()})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `Sample n = ${surveyResult.sampleSize.toLocaleString()}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedSurveyItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedSurveyItems(updated);
    try { localStorage.setItem("saved_samplesize_survey", JSON.stringify(updated)); } catch (err) {}
    setJustSavedSurvey(true);
    setTimeout(() => setJustSavedSurvey(false), 2000);
  };

  // Save Card 2 Handler
  const handleSaveAB = () => {
    if (!abResult.isValid) return;
    const inputsStr = `Baseline P1: ${p1Pct}%, Variant P2: ${p2Pct}%, Power: ${powerPct}%`;
    const opStr = `A/B Testing Sample Size Calculation`;
    const resList = [
      `Sample Size per Variant = ${abResult.sampleSizePerVariant.toLocaleString()}`,
      `Total A/B Test Sample = ${abResult.totalSampleSize.toLocaleString()}`,
      `Absolute MDE = ±${abResult.absDiffPct}% pts`,
      `Relative Uplift = +${abResult.relativeUpliftPct}%`,
      `Statistical Power = ${powerPct}%`
    ];

    const newItem: SavedSampleSizeItem = {
      id: Date.now().toString(),
      title: `A/B Test (${abResult.sampleSizePerVariant.toLocaleString()}/variant)`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `Total N = ${abResult.totalSampleSize.toLocaleString()}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedABItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedABItems(updated);
    try { localStorage.setItem("saved_samplesize_ab", JSON.stringify(updated)); } catch (err) {}
    setJustSavedAB(true);
    setTimeout(() => setJustSavedAB(false), 2000);
  };

  // Save Card 3 Handler
  const handleSaveRev = () => {
    if (!revMOEResult.isValid) return;
    const inputsStr = `Sample Size n: ${revSampleN}, Conf Level: ${revConfLevel}%, Pop N: ${revPopN || "Infinite"}`;
    const opStr = `Reverse Margin of Error Calculation`;
    const resList = [
      `Achieved Margin of Error = ${revMOEResult.moeFormatted}`,
      `Sample Size n = ${revSampleN}`,
      `Confidence Level = ${revConfLevel}%`
    ];

    const newItem: SavedSampleSizeItem = {
      id: Date.now().toString(),
      title: `Reverse MOE (${revMOEResult.moeFormatted})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `MOE = ${revMOEResult.moeFormatted}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedRevItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedRevItems(updated);
    try { localStorage.setItem("saved_samplesize_reverse", JSON.stringify(updated)); } catch (err) {}
    setJustSavedRev(true);
    setTimeout(() => setJustSavedRev(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* MASTER ACTION TOOLBAR */}
      {/* ========================================================================= */}
      <section className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-600 text-white shadow-xs">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 dark:text-slate-100">
              Sample Size &amp; Statistical Power Suite
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Surveys, continuous means, A/B conversion tests, power curves &amp; reverse MOE
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCopySummary}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5 text-blue-600" />
            <span>{copiedSummary ? "Copied!" : "Copy Summary"}</span>
          </button>

          <button
            type="button"
            onClick={handleCopyApa}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>{copiedApa ? "Copied APA!" : "Copy APA Justification"}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-blue-600" />
            <span>{shared ? "Link Copied!" : "Share"}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadCSV}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={() => setIsReportOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CARD 1: SURVEY & POLLING SAMPLE SIZE ENGINE (COCHRAN'S FORMULA & FPC) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Survey &amp; Polling Sample Size Engine (Cochran's Formula &amp; FPC)</span>
          <button
            type="button"
            onClick={handleSaveSurvey}
            disabled={!surveyResult.isValid}
            className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedSurvey ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          {!surveyResult.isValid && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-xs text-red-600 dark:text-red-400 font-bold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{surveyResult.errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: INPUT FORM */}
            <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <Sliders className="h-4 w-4 text-blue-600" />
                <span>Statistical Parameters &amp; Survey Options</span>
              </h3>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Confidence Level (%):
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[90, 95, 99].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setConfLevel(lvl)}
                        className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          confLevel === lvl
                            ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                            : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {lvl}% Conf
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>Margin of Error (&plusmn;%):</span>
                    <span className="font-mono text-blue-600 font-black">&plusmn;{marginOfError}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="0.5"
                    value={marginOfError}
                    onChange={(e) => setMarginOfError(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Population Size N (Leave blank for infinite population):
                  </label>
                  <input
                    type="text"
                    value={populationN}
                    onChange={(e) => setPopulationN(e.target.value)}
                    placeholder="e.g. 5000 or 100000"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">
                      Expected Proportion (%):
                    </label>
                    <input
                      type="number"
                      step="1"
                      min="1"
                      max="99"
                      value={popProp}
                      onChange={(e) => setPopProp(parseFloat(e.target.value) || 50)}
                      className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">
                      Response Rate (%):
                    </label>
                    <input
                      type="number"
                      step="1"
                      min="1"
                      max="100"
                      value={respRate}
                      onChange={(e) => setRespRate(parseFloat(e.target.value) || 100)}
                      className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO RESULT DISPLAY */}
            <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Recommended Completed Sample
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {surveyResult.confidenceLevelPct}% Confidence
                  </span>
                </div>

                <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 font-mono tracking-tight">
                  {surveyResult.sampleSize.toLocaleString()}
                </div>
                <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                  Estimated Invites Needed (at {respRate}% Response): {surveyResult.invitedTarget.toLocaleString()}
                </p>

                <div className="grid grid-cols-3 gap-2 text-xs font-bold pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">Critical Z</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{surveyResult.zScore}</span>
                  </div>

                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">FPC Status</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">
                      {surveyResult.fpcApplied ? "Applied" : "Infinite"}
                    </span>
                  </div>

                  <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                    <span className="text-[10px] text-slate-400 block uppercase">Margin of Error</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">&plusmn;{surveyResult.marginOfErrorPct}%</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    APA Methodology Paragraph:
                  </span>
                  <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-sans leading-relaxed text-slate-700 dark:text-slate-300">
                    {apaText}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* VISUAL ANALYTICS & BENCHMARK MATRIX */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <Layers className="h-4 w-4" />
                <span>Interactive Visual Analytics &amp; Benchmark Matrix</span>
              </h3>

              <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveVisual("curve")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeVisual === "curve" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Statistical Power Curve
                </button>

                <button
                  type="button"
                  onClick={() => setActiveVisual("moe")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeVisual === "moe" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Margin of Error Curve
                </button>

                <button
                  type="button"
                  onClick={() => setActiveVisual("benchmark")}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                    activeVisual === "benchmark" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Benchmark Matrix
                </button>
              </div>
            </div>

            {/* TAB 1: DYNAMIC INTERACTIVE STATISTICAL POWER CURVE */}
            {activeVisual === "curve" && (
              <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                {/* Control bar for live dynamic power curve */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-500 uppercase text-[10px]">Target Power:</span>
                    {[80, 90, 95].map((pw) => (
                      <button
                        key={pw}
                        type="button"
                        onClick={() => setChartTargetPower(pw)}
                        className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                          chartTargetPower === pw
                            ? "bg-blue-600 text-white shadow-2xs"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                        }`}
                      >
                        {pw}%
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-500 uppercase text-[10px]">Effect Size (d):</span>
                    {[
                      { label: "Small (0.2)", val: 0.2 },
                      { label: "Medium (0.5)", val: 0.5 },
                      { label: "Large (0.8)", val: 0.8 }
                    ].map((item) => (
                      <button
                        key={item.val}
                        type="button"
                        onClick={() => setChartEffectSize(item.val)}
                        className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                          chartEffectSize === item.val
                            ? "bg-blue-600 text-white shadow-2xs"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live HUD feedback */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">
                    Required for {chartTargetPower}% power: <strong className="text-blue-600 dark:text-blue-400">{chartPowerTargetN.toLocaleString()}</strong> per group ({ (chartPowerTargetN * 2).toLocaleString() } total)
                  </span>
                  {hoverPower && (
                    <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-mono font-bold text-[11px] shadow-xs">
                      Inspecting: n = {hoverPower.n} / group &rarr; Power = {hoverPower.power}%
                    </span>
                  )}
                </div>

                {/* SVG Canvas with mouse & touch tracking */}
                <div className="w-full flex flex-col items-center py-1">
                  <svg
                    viewBox="0 0 500 160"
                    className="w-full max-w-xl h-auto cursor-crosshair select-none"
                    onMouseMove={handlePowerMouseMove}
                    onTouchMove={handlePowerMouseMove}
                    onMouseLeave={() => setHoverPower(null)}
                    suppressHydrationWarning
                  >
                    {/* Background interactive rect */}
                    <rect x="40" y="20" width="440" height="110" fill="transparent" />

                    {/* Baseline Axes */}
                    <line x1="40" y1="130" x2="480" y2="130" stroke="#94a3b8" strokeWidth="2" />
                    <line x1="40" y1="130" x2="40" y2="20" stroke="#94a3b8" strokeWidth="2" />

                    {/* Power Axis Ticks */}
                    {[0.2, 0.4, 0.6, 0.8, 1.0].map((pw) => {
                      const y = 130 - pw * 105;
                      return (
                        <g key={pw}>
                          <line x1="40" y1={y} x2="480" y2={y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2,2" />
                          <text x="35" y={y + 3} textAnchor="end" fontSize="9" fontFamily="monospace" fill="#94a3b8">
                            {(pw * 100).toFixed(0)}%
                          </text>
                        </g>
                      );
                    })}

                    {/* Dynamic Benchmark Line */}
                    {(() => {
                      const bPower = chartTargetPower / 100;
                      const bY = 130 - bPower * 105;
                      return (
                        <g>
                          <line x1="40" y1={bY} x2="480" y2={bY} stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 2" />
                          <text x="475" y={bY - 4} textAnchor="end" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#10b981">
                            {chartTargetPower}% Benchmark
                          </text>
                        </g>
                      );
                    })()}

                    {/* Dynamic Power Curve Path */}
                    {(() => {
                      if (!powerCurvePoints || powerCurvePoints.length === 0) return null;
                      const minN = powerCurvePoints[0].sampleSize;
                      const maxN = powerCurvePoints[powerCurvePoints.length - 1].sampleSize;
                      const pathStr = powerCurvePoints.map((pt, i) => {
                        const x = 40 + ((pt.sampleSize - minN) / (maxN - minN || 1)) * 440;
                        const y = 130 - pt.power * 105;
                        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
                      }).join(" ");
                      return <path d={pathStr} fill="none" stroke="#2563eb" strokeWidth="3" suppressHydrationWarning />;
                    })()}

                    {/* Target Sample Marker */}
                    {(() => {
                      if (!powerCurvePoints || powerCurvePoints.length === 0) return null;
                      const minN = powerCurvePoints[0].sampleSize;
                      const maxN = powerCurvePoints[powerCurvePoints.length - 1].sampleSize;
                      if (chartPowerTargetN < minN || chartPowerTargetN > maxN) return null;
                      const targetX = 40 + ((chartPowerTargetN - minN) / (maxN - minN || 1)) * 440;
                      const targetY = 130 - (chartTargetPower / 100) * 105;
                      return (
                        <g>
                          <circle cx={targetX} cy={targetY} r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                          <circle cx={targetX} cy={targetY} r="9" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 2" className="animate-pulse" />
                        </g>
                      );
                    })()}

                    {/* Interactive Crosshair & Snapped Dot */}
                    {hoverPower && (
                      <g>
                        <line x1={hoverPower.x} y1="20" x2={hoverPower.x} y2="130" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />
                        <circle cx={hoverPower.x} cy={hoverPower.y} r="5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
                        <circle cx={hoverPower.x} cy={hoverPower.y} r="10" fill="#2563eb" fillOpacity="0.2" />
                      </g>
                    )}
                  </svg>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center mt-1">
                    Hover or drag cursor across graph to inspect statistical power at any sample size.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: DYNAMIC INTERACTIVE MARGIN OF ERROR CURVE */}
            {activeVisual === "moe" && (
              <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">
                    Survey Target: <strong className="text-blue-600 dark:text-blue-400">{surveyResult.sampleSize.toLocaleString()}</strong> completed responses for <strong className="text-emerald-600 dark:text-emerald-400">&plusmn;{surveyResult.marginOfErrorPct}%</strong> margin of error
                  </span>
                  {hoverMoe && (
                    <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-mono font-bold text-[11px] shadow-xs">
                      Inspecting: n = {hoverMoe.n} &rarr; MOE = &plusmn;{hoverMoe.moe}%
                    </span>
                  )}
                </div>

                {/* SVG Canvas for MOE with mouse & touch tracking */}
                <div className="w-full flex flex-col items-center py-1">
                  <svg
                    viewBox="0 0 500 160"
                    className="w-full max-w-xl h-auto cursor-crosshair select-none"
                    onMouseMove={handleMoeMouseMove}
                    onTouchMove={handleMoeMouseMove}
                    onMouseLeave={() => setHoverMoe(null)}
                    suppressHydrationWarning
                  >
                    {/* Background interactive rect */}
                    <rect x="40" y="20" width="440" height="110" fill="transparent" />

                    {/* Baseline Axes */}
                    <line x1="40" y1="130" x2="480" y2="130" stroke="#94a3b8" strokeWidth="2" />
                    <line x1="40" y1="130" x2="40" y2="20" stroke="#94a3b8" strokeWidth="2" />

                    {/* MOE Axis Ticks: 2% to 14% */}
                    {[2, 5, 8, 11, 14].map((m) => {
                      const maxMOE = 15;
                      const y = 130 - (m / maxMOE) * 105;
                      return (
                        <g key={m}>
                          <line x1="40" y1={y} x2="480" y2={y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2,2" />
                          <text x="35" y={y + 3} textAnchor="end" fontSize="9" fontFamily="monospace" fill="#94a3b8">
                            &plusmn;{m}%
                          </text>
                        </g>
                      );
                    })}

                    {/* Target MOE Benchmark Line */}
                    {(() => {
                      const maxMOE = 15;
                      const targetY = 130 - (marginOfError / maxMOE) * 105;
                      return (
                        <g>
                          <line x1="40" y1={targetY} x2="480" y2={targetY} stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 2" />
                          <text x="475" y={targetY - 4} textAnchor="end" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#10b981">
                            &plusmn;{marginOfError}% Target Error
                          </text>
                        </g>
                      );
                    })()}

                    {/* Dynamic MOE Curve Path */}
                    {(() => {
                      if (!moeCurvePoints || moeCurvePoints.length === 0) return null;
                      const minN = moeCurvePoints[0].n;
                      const maxN = moeCurvePoints[moeCurvePoints.length - 1].n;
                      const maxMOE = 15;
                      const pathStr = moeCurvePoints.map((pt, i) => {
                        const x = 40 + ((pt.n - minN) / (maxN - minN || 1)) * 440;
                        const y = 130 - Math.min(1, pt.moe / maxMOE) * 105;
                        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
                      }).join(" ");
                      return <path d={pathStr} fill="none" stroke="#2563eb" strokeWidth="3" suppressHydrationWarning />;
                    })()}

                    {/* Highlight Marker at Recommended Sample Size */}
                    {(() => {
                      if (!moeCurvePoints || moeCurvePoints.length === 0) return null;
                      const minN = moeCurvePoints[0].n;
                      const maxN = moeCurvePoints[moeCurvePoints.length - 1].n;
                      const currN = surveyResult.sampleSize;
                      if (currN < minN || currN > maxN) return null;
                      const targetX = 40 + ((currN - minN) / (maxN - minN || 1)) * 440;
                      const maxMOE = 15;
                      const targetY = 130 - Math.min(1, marginOfError / maxMOE) * 105;
                      return (
                        <g>
                          <circle cx={targetX} cy={targetY} r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                          <circle cx={targetX} cy={targetY} r="9" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 2" className="animate-pulse" />
                        </g>
                      );
                    })()}

                    {/* Interactive Crosshair & Snapped Dot */}
                    {hoverMoe && (
                      <g>
                        <line x1={hoverMoe.x} y1="20" x2={hoverMoe.x} y2="130" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />
                        <circle cx={hoverMoe.x} cy={hoverMoe.y} r="5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
                        <circle cx={hoverMoe.x} cy={hoverMoe.y} r="10" fill="#2563eb" fillOpacity="0.2" />
                      </g>
                    )}
                  </svg>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center mt-1">
                    Hover or drag cursor across graph to inspect achieved margin of error at any sample size.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: AUDITED BENCHMARK MATRIX TABLE */}
            {activeVisual === "benchmark" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Sample Size Reference Matrix across Populations (N):
                  </h4>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
                    Click any row to load into Survey Calculator
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse font-sans">
                    <thead>
                      <tr className="bg-blue-600 text-white font-bold">
                        <th className="p-2.5">Population Size (N)</th>
                        <th className="p-2.5">95% Conf, &plusmn;5% MOE</th>
                        <th className="p-2.5">95% Conf, &plusmn;3% MOE</th>
                        <th className="p-2.5">99% Conf, &plusmn;1% MOE</th>
                        <th className="p-2.5 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-mono bg-slate-50 dark:bg-slate-800/50">
                      {[
                        { pop: "100", label: "100", s5: 80, s3: 92, s1: 100 },
                        { pop: "500", label: "500", s5: 218, s3: 341, s1: 486 },
                        { pop: "1000", label: "1,000", s5: 278, s3: 517, s1: 944 },
                        { pop: "10000", label: "10,000", s5: 370, s3: 965, s1: 6240 },
                        { pop: "", label: "100,000+ (Infinite)", s5: 385, s3: 1068, s1: 16588 }
                      ].map((row) => {
                        const isSelected = row.pop === populationN.replace(/,/g, "");
                        return (
                          <tr
                            key={row.label}
                            onClick={() => setPopulationN(row.pop)}
                            className={`cursor-pointer transition-colors ${
                              isSelected
                                ? "bg-blue-50/80 dark:bg-blue-950/60 font-bold"
                                : "hover:bg-slate-100 dark:hover:bg-slate-800"
                            }`}
                          >
                            <td className="p-2.5 font-bold text-slate-900 dark:text-slate-100">
                              {row.label}
                            </td>
                            <td className="p-2.5 font-bold text-blue-600">{row.s5}</td>
                            <td className="p-2.5">{row.s3.toLocaleString()}</td>
                            <td className="p-2.5">{row.s1.toLocaleString()}</td>
                            <td className="p-2.5 text-center">
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded font-sans font-bold ${
                                  isSelected
                                    ? "bg-blue-600 text-white"
                                    : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                                }`}
                              >
                                {isSelected ? "Active" : "Apply"}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* EMBEDDED SAVED SURVEY CALCULATIONS INSIDE CARD 1 */}
          {savedSurveyItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Survey Sample Calculations ({savedSurveyItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedSurveyItems([]);
                    try { localStorage.removeItem("saved_samplesize_survey"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedSurveyItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts = item.resultsList ?? (item.result ? item.result.split("|").map(s => s.trim()).filter(Boolean) : []);
                  return (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between transition-all"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                          <span className="text-[10px] text-slate-400 font-sans tabular-nums">{item.timestamp}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = savedSurveyItems.filter(i => i.id !== item.id);
                            setSavedSurveyItems(updated);
                            try { localStorage.setItem("saved_samplesize_survey", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs || item.expression}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-blue-600" /> : <ChevronDown className="w-3.5 h-3.5 text-blue-600" />}
                        </button>

                        {isExpanded && (
                          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                              Complete Calculated Answers:
                            </span>
                            <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                              {resParts.map((resLine, idx) => (
                                <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug">
                                  {resLine}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 2: CONTINUOUS MEAN & STANDARD DEVIATION SAMPLE SIZE */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Continuous Mean &amp; Standard Deviation Sample Size Engine</span>
          <span className="text-[10px] text-blue-100 font-mono">Formula: n = ⌈(Z · σ / E)²⌉</span>
        </div>

        <div className="p-5 space-y-4">
          {!contResult.isValid && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-xs text-red-600 dark:text-red-400 font-bold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{contResult.errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-6 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Continuous Mean Parameters
              </h3>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Confidence (%):</label>
                    <select
                      value={contConfLevel}
                      onChange={(e) => setContConfLevel(parseInt(e.target.value, 10))}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-bold text-xs"
                    >
                      <option value={90}>90% (Z = 1.645)</option>
                      <option value={95}>95% (Z = 1.960)</option>
                      <option value={99}>99% (Z = 2.576)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Desired Margin E:</label>
                    <input
                      type="number"
                      step="0.5"
                      min="0.1"
                      value={contPrecisionE}
                      onChange={(e) => setContPrecisionE(parseFloat(e.target.value) || 1)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Std Dev (σ):</label>
                    <input
                      type="number"
                      step="1"
                      min="0.1"
                      value={contSD}
                      onChange={(e) => setContSD(parseFloat(e.target.value) || 10)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Pop N (Optional):</label>
                    <input
                      type="text"
                      value={contPopN}
                      onChange={(e) => setContPopN(e.target.value)}
                      placeholder="Leave blank for infinite"
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                  Required Sample Size (n)
                </span>
                <div className="text-4xl font-black text-slate-900 dark:text-slate-100 font-mono">
                  {contResult.sampleSize.toLocaleString()}
                </div>
                <p className="text-xs font-mono font-bold text-slate-500">
                  Critical Z = {contResult.zScore} | Precision E = &plusmn;{contPrecisionE} | SD (σ) = {contSD}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 3: A/B TESTING & CONVERSION RATE SAMPLE SIZE CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>A/B Testing &amp; Conversion Rate Sample Size Calculator</span>
          <button
            type="button"
            onClick={handleSaveAB}
            disabled={!abResult.isValid}
            className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedAB ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          {!abResult.isValid && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-xs text-red-600 dark:text-red-400 font-bold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{abResult.errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                A/B Test Parameters
              </h3>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Baseline Rate P1 (%):</label>
                    <input
                      type="number"
                      step="0.1"
                      value={p1Pct}
                      onChange={(e) => setP1Pct(parseFloat(e.target.value) || 0)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Variant Rate P2 (%):</label>
                    <input
                      type="number"
                      step="0.1"
                      value={p2Pct}
                      onChange={(e) => setP2Pct(parseFloat(e.target.value) || 0)}
                      className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Statistical Power (%):</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPowerPct(80)}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        powerPct === 80 ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-slate-800 border-slate-300 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      80% Power (Standard)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPowerPct(90)}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        powerPct === 90 ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-slate-800 border-slate-300 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      90% Power (High)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: A/B TEST OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Sample Size per Variation (nA = nB)
                  </span>
                  <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all">
                    {abResult.sampleSizePerVariant.toLocaleString()} / variant
                  </div>
                  <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                    Total A/B Test Sample: {abResult.totalSampleSize.toLocaleString()}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Absolute Difference (MDE)</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">&plusmn;{abResult.absDiffPct}% pts</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Relative: +{abResult.relativeUpliftPct}%</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Statistical Power</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{powerPct}%</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Z_alpha = {abResult.zAlpha}, Z_beta = {abResult.zBeta}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED A/B TEST CALCULATIONS */}
          {savedABItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved A/B Test Calculations ({savedABItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedABItems([]);
                    try { localStorage.removeItem("saved_samplesize_ab"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedABItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts = item.resultsList ?? (item.result ? item.result.split("|").map(s => s.trim()).filter(Boolean) : []);
                  return (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between transition-all"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                          <span className="text-[10px] text-slate-400 font-sans tabular-nums">{item.timestamp}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = savedABItems.filter(i => i.id !== item.id);
                            setSavedABItems(updated);
                            try { localStorage.setItem("saved_samplesize_ab", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs || item.expression}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-blue-600" /> : <ChevronDown className="w-3.5 h-3.5 text-blue-600" />}
                        </button>

                        {isExpanded && (
                          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                              Complete Converted Results:
                            </span>
                            <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                              {resParts.map((resLine, idx) => (
                                <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug">
                                  {resLine}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 4: REVERSE MARGIN OF ERROR CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Reverse Margin of Error Calculator</span>
          <button
            type="button"
            onClick={handleSaveRev}
            disabled={!revMOEResult.isValid}
            className="bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedRev ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          {!revMOEResult.isValid && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-xs text-red-600 dark:text-red-400 font-bold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{revMOEResult.errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Reverse MOE Inputs
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Completed Sample Size (n):</label>
                  <input
                    type="number"
                    min="1"
                    value={revSampleN}
                    onChange={(e) => setRevSampleN(parseInt(e.target.value, 10) || 1)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Confidence Level (%):</label>
                  <select
                    value={revConfLevel}
                    onChange={(e) => setRevConfLevel(parseInt(e.target.value, 10))}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-bold text-xs"
                  >
                    <option value={90}>90% Confidence</option>
                    <option value={95}>95% Confidence</option>
                    <option value={99}>99% Confidence</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Population N (Optional):</label>
                  <input
                    type="text"
                    value={revPopN}
                    onChange={(e) => setRevPopN(e.target.value)}
                    placeholder="Leave blank for infinite"
                    className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-xs"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: REVERSE MOE OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Achieved Margin of Error
                  </span>
                  <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all">
                    {revMOEResult.moeFormatted}
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold space-y-1">
                  <span className="text-[10px] text-slate-400 block uppercase">Precision Quality Rating</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">
                    {revMOEResult.moe <= 3 ? "High Precision (±3% or better)" : revMOEResult.moe <= 5 ? "Standard Survey Precision (±5%)" : "Low Precision (±5%+)"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED REVERSE MOE SOLVES */}
          {savedRevItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Reverse MOE Calculations ({savedRevItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedRevItems([]);
                    try { localStorage.removeItem("saved_samplesize_reverse"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedRevItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts = item.resultsList ?? (item.result ? item.result.split("|").map(s => s.trim()).filter(Boolean) : []);
                  return (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between transition-all"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                          <span className="text-[10px] text-slate-400 font-sans tabular-nums">{item.timestamp}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = savedRevItems.filter(i => i.id !== item.id);
                            setSavedRevItems(updated);
                            try { localStorage.setItem("saved_samplesize_reverse", JSON.stringify(updated)); } catch(e){}
                          }}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs || item.expression}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-blue-600" /> : <ChevronDown className="w-3.5 h-3.5 text-blue-600" />}
                        </button>

                        {isExpanded && (
                          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                              Complete Converted Results:
                            </span>
                            <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                              {resParts.map((resLine, idx) => (
                                <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug">
                                  {resLine}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DEDICATED 2-PAGE EXECUTIVE PRINT MODAL */}
      <SampleSizeReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        surveyResult={surveyResult}
        contResult={contResult}
        powerResult={powerResult}
        abResult={abResult}
        revMOEResult={revMOEResult}
      />
    </div>
  );
}

export default SampleSizeCalculator;
