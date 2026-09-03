"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  Sliders,
  Layers,
  Copy,
  CheckCircle2,
  BarChart2,
  FileText,
  Printer,
  Download,
  RotateCcw,
  Share2,
  BookOpen,
  AlertCircle,
  TrendingUp
} from "lucide-react";
import {
  computeMeanCI,
  computeProportionCI,
  computeTwoMeansCI,
  computeTwoProportionsCI,
  computeVarianceCI,
  parseDataStream,
  studentT_PDF,
  MeanCIResult,
  ProportionCIResult,
  TwoMeansCIResult,
  TwoProportionsCIResult,
  VarianceCIResult
} from "@/app/calculators/confidence-interval-calculator/confidence-interval-logic";
import { ConfidenceIntervalReportModal } from "./ConfidenceIntervalReportModal";

export interface SavedCIItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
  rawParams?: Record<string, any>;
}

export function ConfidenceIntervalCalculator() {
  // Card 1 Inputs: Single Population Mean
  const [mean1, setMean1] = useState<number>(24.5);
  const [sd1, setSd1] = useState<number>(4.0);
  const [n1, setN1] = useState<number>(16);
  const [cl1, setCl1] = useState<number>(95);
  const [knownSigma1, setKnownSigma1] = useState<boolean>(false);
  const [useFPC1, setUseFPC1] = useState<boolean>(false);
  const [finiteN1, setFiniteN1] = useState<number>(500);
  const [rawText1, setRawText1] = useState<string>("");
  const [useRawData1, setUseRawData1] = useState<boolean>(false);
  const [precision1, setPrecision1] = useState<number>(4);

  // One-click copy feedbacks for Card 1
  const [copiedAPA, setCopiedAPA] = useState<boolean>(false);
  const [copiedInterval, setCopiedInterval] = useState<boolean>(false);
  const [copiedInequality, setCopiedInequality] = useState<boolean>(false);

  // Card 2 Inputs: Population Proportion
  const [propX, setPropX] = useState<number>(520);
  const [propN, setPropN] = useState<number>(1000);
  const [propCL, setPropCL] = useState<number>(95);

  // Card 3 Inputs: Difference Between Two Means
  const [m1_mean, setM1_mean] = useState<number>(105);
  const [m1_sd, setM1_sd] = useState<number>(12);
  const [m1_n, setM1_n] = useState<number>(25);

  const [m2_mean, setM2_mean] = useState<number>(98);
  const [m2_sd, setM2_sd] = useState<number>(15);
  const [m2_n, setM2_n] = useState<number>(30);

  const [twoMeansCL, setTwoMeansCL] = useState<number>(95);
  const [equalVar, setEqualVar] = useState<boolean>(false);

  // Card 4 Inputs: Difference Between Two Proportions
  const [p1_x, setP1_x] = useState<number>(320);
  const [p1_n, setP1_n] = useState<number>(500);
  const [p2_x, setP2_x] = useState<number>(270);
  const [p2_n, setP2_n] = useState<number>(500);
  const [twoPropsCL, setTwoPropsCL] = useState<number>(95);

  // Card 5 Inputs: Population Variance
  const [varSD, setVarSD] = useState<number>(10);
  const [varN, setVarN] = useState<number>(20);
  const [varCL, setVarCL] = useState<number>(95);

  // Saved calculation states
  const [savedMeanItems, setSavedMeanItems] = useState<SavedCIItem[]>([]);
  const [justSavedMean, setJustSavedMean] = useState<boolean>(false);

  const [savedPropItems, setSavedPropItems] = useState<SavedCIItem[]>([]);
  const [justSavedProp, setJustSavedProp] = useState<boolean>(false);

  const [savedTwoMeansItems, setSavedTwoMeansItems] = useState<SavedCIItem[]>([]);
  const [justSavedTwoMeans, setJustSavedTwoMeans] = useState<boolean>(false);

  const [savedTwoPropsItems, setSavedTwoPropsItems] = useState<SavedCIItem[]>([]);
  const [justSavedTwoProps, setJustSavedTwoProps] = useState<boolean>(false);

  const [savedVarItems, setSavedVarItems] = useState<SavedCIItem[]>([]);
  const [justSavedVar, setJustSavedVar] = useState<boolean>(false);

  // Modal and Toolbar feedbacks
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [copiedApaAll, setCopiedApaAll] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);

  // Interactive Chart Hover State
  const [hoverChartX, setHoverChartX] = useState<number | null>(null);

  // Expand state
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // URL Query Sync on Mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.has("m")) setMean1(parseFloat(params.get("m")!) || 24.5);
      if (params.has("s")) setSd1(parseFloat(params.get("s")!) || 4.0);
      if (params.has("n")) setN1(parseInt(params.get("n")!) || 16);
      if (params.has("cl")) setCl1(parseFloat(params.get("cl")!) || 95);
      if (params.has("known")) setKnownSigma1(params.get("known") === "true");

      if (params.has("px")) setPropX(parseInt(params.get("px")!) || 520);
      if (params.has("pn")) setPropN(parseInt(params.get("pn")!) || 1000);
      if (params.has("pcl")) setPropCL(parseFloat(params.get("pcl")!) || 95);
    } catch (e) {}
  }, []);

  // LocalStorage Persistence
  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_ci_mean");
      if (s1) setSavedMeanItems(JSON.parse(s1));

      const s2 = localStorage.getItem("saved_ci_prop");
      if (s2) setSavedPropItems(JSON.parse(s2));

      const s3 = localStorage.getItem("saved_ci_twomeans");
      if (s3) setSavedTwoMeansItems(JSON.parse(s3));

      const s4 = localStorage.getItem("saved_ci_twoprops");
      if (s4) setSavedTwoPropsItems(JSON.parse(s4));

      const s5 = localStorage.getItem("saved_ci_var");
      if (s5) setSavedVarItems(JSON.parse(s5));
    } catch (e) {}
  }, []);

  // Parse Raw Dataset for Mean if enabled
  useEffect(() => {
    if (!useRawData1 || !rawText1.trim()) return;
    const nums = parseDataStream(rawText1);
    if (nums.length >= 2) {
      const sum = nums.reduce((a, b) => a + b, 0);
      const m = sum / nums.length;
      const sumSq = nums.reduce((a, b) => a + Math.pow(b - m, 2), 0);
      const s = Math.sqrt(sumSq / (nums.length - 1));

      setMean1(parseFloat(m.toFixed(precision1)));
      setSd1(parseFloat(s.toFixed(precision1)));
      setN1(nums.length);
    }
  }, [rawText1, useRawData1, precision1]);

  // Card 1 Calculations
  const meanResult: MeanCIResult = useMemo(() => {
    return computeMeanCI(
      mean1,
      sd1,
      n1,
      cl1,
      knownSigma1,
      useFPC1 ? finiteN1 : undefined,
      precision1
    );
  }, [mean1, sd1, n1, cl1, knownSigma1, useFPC1, finiteN1, precision1]);

  // Card 2 Calculations
  const propResult: ProportionCIResult = useMemo(() => {
    return computeProportionCI(propX, propN, propCL, precision1);
  }, [propX, propN, propCL, precision1]);

  // Card 3 Calculations
  const twoMeansResult: TwoMeansCIResult = useMemo(() => {
    return computeTwoMeansCI(
      m1_mean,
      m1_sd,
      m1_n,
      m2_mean,
      m2_sd,
      m2_n,
      equalVar,
      twoMeansCL,
      precision1
    );
  }, [m1_mean, m1_sd, m1_n, m2_mean, m2_sd, m2_n, equalVar, twoMeansCL, precision1]);

  // Card 4 Calculations
  const twoPropsResult: TwoProportionsCIResult = useMemo(() => {
    return computeTwoProportionsCI(p1_x, p1_n, p2_x, p2_n, twoPropsCL, precision1);
  }, [p1_x, p1_n, p2_x, p2_n, twoPropsCL, precision1]);

  // Card 5 Calculations
  const varResult: VarianceCIResult = useMemo(() => {
    return computeVarianceCI(varSD, varN, varCL, precision1);
  }, [varSD, varN, varCL, precision1]);

  // =========================================================================
  // TOOLBAR ACTION HANDLERS
  // =========================================================================

  const handleCopySummary = () => {
    const lines = [
      `CalcPlatform Confidence Interval Summary (${new Date().toLocaleDateString()}):`,
      `1. Single Mean (${meanResult.confidenceLevel}% ${meanResult.distType}): [${meanResult.lowerBound}, ${meanResult.upperBound}] (ME = ±${meanResult.me}, SE = ${meanResult.se})`,
      `2. Proportion (Wilson ${propResult.confidenceLevel}%): [${(propResult.wilsonLower * 100).toFixed(2)}%, ${(propResult.wilsonUpper * 100).toFixed(2)}%] (p̂ = ${(propResult.pHat * 100).toFixed(2)}%)`,
      `3. Two Means Diff (${twoMeansResult.confidenceLevel}%): [${twoMeansResult.lowerBound}, ${twoMeansResult.upperBound}] (Diff = ${twoMeansResult.diff}, Welch df = ${twoMeansResult.df})`,
      `4. Two Props Diff (${twoPropsResult.confidenceLevel}%): [${(twoPropsResult.lowerBound * 100).toFixed(2)}%, ${(twoPropsResult.upperBound * 100).toFixed(2)}%] (Diff = ${(twoPropsResult.diff * 100).toFixed(2)}%)`,
      `5. Population SD (${varResult.confidenceLevel}%): [${varResult.sdLower}, ${varResult.sdUpper}] (Variance: [${varResult.varLower}, ${varResult.varUpper}])`
    ];
    navigator.clipboard.writeText(lines.join("\n"));
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleCopyApaCitation = () => {
    const lines = [
      meanResult.apaCitation,
      `A ${propResult.confidenceLevel}% Wilson score confidence interval for the population proportion was calculated as [${(propResult.wilsonLower * 100).toFixed(2)}%, ${(propResult.wilsonUpper * 100).toFixed(2)}%] (p̂ = ${(propResult.pHat * 100).toFixed(2)}%, N = ${propResult.n}).`,
      `A ${twoMeansResult.confidenceLevel}% Welch t confidence interval for the difference between two independent means was calculated as [${twoMeansResult.lowerBound}, ${twoMeansResult.upperBound}] (M_diff = ${twoMeansResult.diff}, df = ${twoMeansResult.df}, ME = ±${twoMeansResult.me}).`
    ];
    navigator.clipboard.writeText(lines.join("\n\n"));
    setCopiedApaAll(true);
    setTimeout(() => setCopiedApaAll(false), 2000);
  };

  const handleShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("m", mean1.toString());
    url.searchParams.set("s", sd1.toString());
    url.searchParams.set("n", n1.toString());
    url.searchParams.set("cl", cl1.toString());
    url.searchParams.set("known", knownSigma1.toString());
    url.searchParams.set("px", propX.toString());
    url.searchParams.set("pn", propN.toString());
    url.searchParams.set("pcl", propCL.toString());

    navigator.clipboard.writeText(url.toString());
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const handleDownloadCSV = () => {
    const rows = [
      ["Module", "Parameter", "Confidence Level", "Inputs", "Point Estimate", "Critical Value", "Standard Error", "Margin of Error", "Lower Bound", "Upper Bound", "Notes / Degrees of Freedom"],
      [
        "Single Mean",
        "μ",
        `${meanResult.confidenceLevel}%`,
        `mean=${meanResult.mean}, sd=${meanResult.sd}, n=${meanResult.n}, knownSigma=${knownSigma1}`,
        meanResult.mean,
        meanResult.criticalValue,
        meanResult.se,
        meanResult.me,
        meanResult.lowerBound,
        meanResult.upperBound,
        `${meanResult.distType} distribution, df=${meanResult.degreesOfFreedom}`
      ],
      [
        "Proportion (Wilson)",
        "p",
        `${propResult.confidenceLevel}%`,
        `x=${propResult.x}, n=${propResult.n}`,
        (propResult.pHat * 100).toFixed(2) + "%",
        propResult.criticalZ,
        "-",
        (propResult.wilsonME * 100).toFixed(2) + "%",
        (propResult.wilsonLower * 100).toFixed(2) + "%",
        (propResult.wilsonUpper * 100).toFixed(2) + "%",
        "Wilson Score Interval (Recommended)"
      ],
      [
        "Proportion (Wald)",
        "p",
        `${propResult.confidenceLevel}%`,
        `x=${propResult.x}, n=${propResult.n}`,
        (propResult.pHat * 100).toFixed(2) + "%",
        propResult.criticalZ,
        "-",
        (propResult.waldME * 100).toFixed(2) + "%",
        (propResult.waldLower * 100).toFixed(2) + "%",
        (propResult.waldUpper * 100).toFixed(2) + "%",
        "Wald Standard Normal"
      ],
      [
        "Two Means Difference",
        "μ1 - μ2",
        `${twoMeansResult.confidenceLevel}%`,
        `G1(mean=${m1_mean}, sd=${m1_sd}, n=${m1_n}) vs G2(mean=${m2_mean}, sd=${m2_sd}, n=${m2_n})`,
        twoMeansResult.diff,
        twoMeansResult.criticalT,
        twoMeansResult.seDiff,
        twoMeansResult.me,
        twoMeansResult.lowerBound,
        twoMeansResult.upperBound,
        `${equalVar ? "Pooled t" : "Welch's t"}, df=${twoMeansResult.df}`
      ],
      [
        "Two Proportions Difference",
        "p1 - p2",
        `${twoPropsResult.confidenceLevel}%`,
        `G1(x=${p1_x}, n=${p1_n}) vs G2(x=${p2_x}, n=${p2_n})`,
        (twoPropsResult.diff * 100).toFixed(2) + "%",
        twoPropsResult.criticalZ,
        twoPropsResult.seDiff,
        (twoPropsResult.me * 100).toFixed(2) + "%",
        (twoPropsResult.lowerBound * 100).toFixed(2) + "%",
        (twoPropsResult.upperBound * 100).toFixed(2) + "%",
        twoPropsResult.isSignificant ? "Significant (Excludes 0)" : "Not Significant (Includes 0)"
      ],
      [
        "Population Variance",
        "σ²",
        `${varResult.confidenceLevel}%`,
        `s=${varResult.s}, n=${varResult.n}`,
        Math.pow(varResult.s, 2),
        `chi2Lower=${varResult.chi2Lower}, chi2Upper=${varResult.chi2Upper}`,
        "-",
        "-",
        varResult.varLower,
        varResult.varUpper,
        `Chi-square df=${varResult.df}`
      ],
      [
        "Population SD",
        "σ",
        `${varResult.confidenceLevel}%`,
        `s=${varResult.s}, n=${varResult.n}`,
        varResult.s,
        `chi2Lower=${varResult.chi2Lower}, chi2Upper=${varResult.chi2Upper}`,
        "-",
        "-",
        varResult.sdLower,
        varResult.sdUpper,
        `Chi-square df=${varResult.df}`
      ]
    ];

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `confidence_interval_audit_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetDefaults = () => {
    setMean1(24.5);
    setSd1(4.0);
    setN1(16);
    setCl1(95);
    setKnownSigma1(false);
    setUseFPC1(false);
    setFiniteN1(500);
    setUseRawData1(false);
    setRawText1("");

    setPropX(520);
    setPropN(1000);
    setPropCL(95);

    setM1_mean(105);
    setM1_sd(12);
    setM1_n(25);
    setM2_mean(98);
    setM2_sd(15);
    setM2_n(30);
    setTwoMeansCL(95);
    setEqualVar(false);

    setP1_x(320);
    setP1_n(500);
    setP2_x(270);
    setP2_n(500);
    setTwoPropsCL(95);

    setVarSD(10);
    setVarN(20);
    setVarCL(95);
  };

  // =========================================================================
  // SAVE HANDLERS WITH LOAD CAPABILITY
  // =========================================================================

  const handleSaveMean = () => {
    if (!meanResult.isValid) return;
    const inputsStr = `x̄ = ${mean1}, s = ${sd1}, n = ${n1}, CL = ${cl1}%, ${knownSigma1 ? "Known σ (Z)" : "Unknown σ (t)"}`;
    const opStr = `Single Population Mean CI`;
    const resList = [
      `Confidence Interval = ${meanResult.intervalStr}`,
      `Method = ${meanResult.distType}-Distribution (df = ${meanResult.degreesOfFreedom})`,
      `Margin of Error = ±${meanResult.me}`,
      `Critical ${meanResult.distType}* = ${meanResult.criticalValue}`,
      `Standard Error (SE) = ${meanResult.se}`
    ];

    const newItem: SavedCIItem = {
      id: Date.now().toString(),
      title: `Mean CI = ${meanResult.intervalStr}`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `CI = ${meanResult.intervalStr}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      rawParams: { mean1, sd1, n1, cl1, knownSigma1, useFPC1, finiteN1 }
    };

    const updated = [newItem, ...savedMeanItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedMeanItems(updated);
    try { localStorage.setItem("saved_ci_mean", JSON.stringify(updated)); } catch (e) {}
    setJustSavedMean(true);
    setTimeout(() => setJustSavedMean(false), 2000);
  };

  const handleLoadMean = (params?: Record<string, any>) => {
    if (!params) return;
    if (params.mean1 !== undefined) setMean1(params.mean1);
    if (params.sd1 !== undefined) setSd1(params.sd1);
    if (params.n1 !== undefined) setN1(params.n1);
    if (params.cl1 !== undefined) setCl1(params.cl1);
    if (params.knownSigma1 !== undefined) setKnownSigma1(params.knownSigma1);
    if (params.useFPC1 !== undefined) setUseFPC1(params.useFPC1);
    if (params.finiteN1 !== undefined) setFiniteN1(params.finiteN1);
  };

  const handleSaveProp = () => {
    if (!propResult.isValid) return;
    const inputsStr = `x = ${propX}, n = ${propN}, CL = ${propCL}%`;
    const opStr = `Population Proportion CI`;
    const resList = [
      `Wilson Score CI = [${(propResult.wilsonLower * 100).toFixed(2)}%, ${(propResult.wilsonUpper * 100).toFixed(2)}%]`,
      `Wald Normal CI = [${(propResult.waldLower * 100).toFixed(2)}%, ${(propResult.waldUpper * 100).toFixed(2)}%]`,
      `Agresti-Coull CI = [${(propResult.agrestiLower * 100).toFixed(2)}%, ${(propResult.agrestiUpper * 100).toFixed(2)}%]`,
      `Critical Z* = ${propResult.criticalZ}`
    ];

    const newItem: SavedCIItem = {
      id: Date.now().toString(),
      title: `Proportion CI = [${(propResult.wilsonLower * 100).toFixed(2)}%, ${(propResult.wilsonUpper * 100).toFixed(2)}%]`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `p̂ = ${(propResult.pHat * 100).toFixed(2)}%`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      rawParams: { propX, propN, propCL }
    };

    const updated = [newItem, ...savedPropItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedPropItems(updated);
    try { localStorage.setItem("saved_ci_prop", JSON.stringify(updated)); } catch (e) {}
    setJustSavedProp(true);
    setTimeout(() => setJustSavedProp(false), 2000);
  };

  const handleLoadProp = (params?: Record<string, any>) => {
    if (!params) return;
    if (params.propX !== undefined) setPropX(params.propX);
    if (params.propN !== undefined) setPropN(params.propN);
    if (params.propCL !== undefined) setPropCL(params.propCL);
  };

  const handleSaveTwoMeans = () => {
    if (!twoMeansResult.isValid) return;
    const inputsStr = `G1(${m1_mean}, ${m1_sd}, n=${m1_n}) vs G2(${m2_mean}, ${m2_sd}, n=${m2_n}), CL = ${twoMeansCL}%`;
    const opStr = `Difference of Two Means CI`;
    const resList = [
      `Difference CI = [${twoMeansResult.lowerBound}, ${twoMeansResult.upperBound}]`,
      `Point Diff = ${twoMeansResult.diff}`,
      `Margin of Error = ±${twoMeansResult.me}`,
      `Critical t* = ${twoMeansResult.criticalT} (df = ${twoMeansResult.df})`
    ];

    const newItem: SavedCIItem = {
      id: Date.now().toString(),
      title: `Diff CI = [${twoMeansResult.lowerBound}, ${twoMeansResult.upperBound}]`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `Diff = ${twoMeansResult.diff}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      rawParams: { m1_mean, m1_sd, m1_n, m2_mean, m2_sd, m2_n, twoMeansCL, equalVar }
    };

    const updated = [newItem, ...savedTwoMeansItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedTwoMeansItems(updated);
    try { localStorage.setItem("saved_ci_twomeans", JSON.stringify(updated)); } catch (e) {}
    setJustSavedTwoMeans(true);
    setTimeout(() => setJustSavedTwoMeans(false), 2000);
  };

  const handleLoadTwoMeans = (params?: Record<string, any>) => {
    if (!params) return;
    if (params.m1_mean !== undefined) setM1_mean(params.m1_mean);
    if (params.m1_sd !== undefined) setM1_sd(params.m1_sd);
    if (params.m1_n !== undefined) setM1_n(params.m1_n);
    if (params.m2_mean !== undefined) setM2_mean(params.m2_mean);
    if (params.m2_sd !== undefined) setM2_sd(params.m2_sd);
    if (params.m2_n !== undefined) setM2_n(params.m2_n);
    if (params.twoMeansCL !== undefined) setTwoMeansCL(params.twoMeansCL);
    if (params.equalVar !== undefined) setEqualVar(params.equalVar);
  };

  const handleSaveTwoProps = () => {
    if (!twoPropsResult.isValid) return;
    const inputsStr = `G1(${p1_x}/${p1_n}) vs G2(${p2_x}/${p2_n}), CL = ${twoPropsCL}%`;
    const opStr = `Difference of Two Proportions CI`;
    const resList = [
      `Difference CI = [${(twoPropsResult.lowerBound * 100).toFixed(2)}%, ${(twoPropsResult.upperBound * 100).toFixed(2)}%]`,
      `Diff (p̂1 - p̂2) = ${(twoPropsResult.diff * 100).toFixed(2)}%`,
      `Margin of Error = ±${(twoPropsResult.me * 100).toFixed(2)}%`,
      `Critical Z* = ${twoPropsResult.criticalZ}`
    ];

    const newItem: SavedCIItem = {
      id: Date.now().toString(),
      title: `Diff CI = [${(twoPropsResult.lowerBound * 100).toFixed(2)}%, ${(twoPropsResult.upperBound * 100).toFixed(2)}%]`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `Diff = ${(twoPropsResult.diff * 100).toFixed(2)}%`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      rawParams: { p1_x, p1_n, p2_x, p2_n, twoPropsCL }
    };

    const updated = [newItem, ...savedTwoPropsItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedTwoPropsItems(updated);
    try { localStorage.setItem("saved_ci_twoprops", JSON.stringify(updated)); } catch (e) {}
    setJustSavedTwoProps(true);
    setTimeout(() => setJustSavedTwoProps(false), 2000);
  };

  const handleLoadTwoProps = (params?: Record<string, any>) => {
    if (!params) return;
    if (params.p1_x !== undefined) setP1_x(params.p1_x);
    if (params.p1_n !== undefined) setP1_n(params.p1_n);
    if (params.p2_x !== undefined) setP2_x(params.p2_x);
    if (params.p2_n !== undefined) setP2_n(params.p2_n);
    if (params.twoPropsCL !== undefined) setTwoPropsCL(params.twoPropsCL);
  };

  const handleSaveVar = () => {
    if (!varResult.isValid) return;
    const inputsStr = `s = ${varSD}, n = ${varN}, CL = ${varCL}%`;
    const opStr = `Population Variance CI`;
    const resList = [
      `SD (σ) CI = [${varResult.sdLower}, ${varResult.sdUpper}]`,
      `Variance (σ²) CI = [${varResult.varLower}, ${varResult.varUpper}]`,
      `Chi-Square Cutoffs = [${varResult.chi2Lower}, ${varResult.chi2Upper}]`
    ];

    const newItem: SavedCIItem = {
      id: Date.now().toString(),
      title: `σ CI = [${varResult.sdLower}, ${varResult.sdUpper}]`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `σ² CI = [${varResult.varLower}, ${varResult.varUpper}]`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      rawParams: { varSD, varN, varCL }
    };

    const updated = [newItem, ...savedVarItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedVarItems(updated);
    try { localStorage.setItem("saved_ci_var", JSON.stringify(updated)); } catch (e) {}
    setJustSavedVar(true);
    setTimeout(() => setJustSavedVar(false), 2000);
  };

  const handleLoadVar = (params?: Record<string, any>) => {
    if (!params) return;
    if (params.varSD !== undefined) setVarSD(params.varSD);
    if (params.varN !== undefined) setVarN(params.varN);
    if (params.varCL !== undefined) setVarCL(params.varCL);
  };

  // =========================================================================
  // INTERACTIVE SVG 2D DISTRIBUTION CURVE
  // =========================================================================

  const renderDistributionCurve = () => {
    if (!meanResult.isValid) return null;

    const width = 500;
    const height = 160;
    const padding = 40;
    const drawWidth = width - 2 * padding;

    const zMin = -3.5;
    const zMax = 3.5;

    const scaleX = (zVal: number) => {
      const clamped = Math.max(zMin, Math.min(zMax, zVal));
      return padding + ((clamped - zMin) / (zMax - zMin)) * drawWidth;
    };

    const maxPDF = meanResult.distType === "t" && meanResult.degreesOfFreedom <= 2 ? 0.35 : 0.42;

    const scaleY = (pdfVal: number) => {
      return height - 25 - (pdfVal / maxPDF) * (height - 45);
    };

    // Distribution function (t or Normal)
    const pdfFunc = (zVal: number) => {
      if (meanResult.distType === "t") {
        return studentT_PDF(zVal, meanResult.degreesOfFreedom);
      }
      return (1.0 / Math.sqrt(2.0 * Math.PI)) * Math.exp(-0.5 * zVal * zVal);
    };

    const points: { x: number; y: number; z: number }[] = [];
    for (let z = zMin; z <= zMax; z += 0.05) {
      const pdf = pdfFunc(z);
      points.push({ x: scaleX(z), y: scaleY(pdf), z });
    }

    const pathD = points.reduce((acc, pt, i) => {
      return i === 0 ? `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}` : `${acc} L ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
    }, "");

    const absCrit = Math.min(3.4, Math.abs(meanResult.criticalValue));
    const xPosNeg = scaleX(-absCrit);
    const xPosPos = scaleX(absCrit);

    // Shaded central region points
    const shadedPoints = points.filter(pt => pt.z >= -absCrit && pt.z <= absCrit);
    let shadedD = "";
    if (shadedPoints.length > 0) {
      shadedD = `M ${xPosNeg.toFixed(1)} ${(height - 25).toFixed(1)} ` +
        shadedPoints.map(p => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ") +
        ` L ${xPosPos.toFixed(1)} ${(height - 25).toFixed(1)} Z`;
    }

    // Interactive Hover Coordinates
    const hoveredZ = hoverChartX !== null
      ? zMin + ((hoverChartX - padding) / drawWidth) * (zMax - zMin)
      : null;
    const clampedHoverZ = hoveredZ !== null ? Math.max(zMin, Math.min(zMax, hoveredZ)) : null;
    const hoverPdf = clampedHoverZ !== null ? pdfFunc(clampedHoverZ) : null;
    const hoverXPos = clampedHoverZ !== null ? scaleX(clampedHoverZ) : null;
    const hoverYPos = hoverPdf !== null ? scaleY(hoverPdf) : null;
    const isInRegion = clampedHoverZ !== null ? Math.abs(clampedHoverZ) <= absCrit : false;

    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * width;
      setHoverChartX(x);
    };

    return (
      <div className="space-y-2">
        <div className="relative overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto select-none cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoverChartX(null)}
          >
            {/* Axis */}
            <line x1={padding} y1={height - 25} x2={width - padding} y2={height - 25} stroke="#94a3b8" strokeWidth="1.5" />

            {/* Central Confidence Shading */}
            {shadedD && (
              <path d={shadedD} fill="url(#ciBlueGradient)" opacity="0.8" />
            )}

            {/* Curve Line */}
            <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="2.5" />

            {/* Critical Value Dotted Guidelines */}
            <line x1={xPosNeg} y1="18" x2={xPosNeg} y2={height - 25} stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />
            <circle cx={xPosNeg} cy="18" r="3.5" fill="#dc2626" />
            <text x={xPosNeg} y="12" textAnchor="middle" className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">
              -{meanResult.criticalValue}
            </text>

            <line x1={xPosPos} y1="18" x2={xPosPos} y2={height - 25} stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />
            <circle cx={xPosPos} cy="18" r="3.5" fill="#dc2626" />
            <text x={xPosPos} y="12" textAnchor="middle" className="text-[10px] font-mono font-bold fill-red-600 dark:fill-red-400">
              +{meanResult.criticalValue}
            </text>

            {/* Center Label */}
            <text x={width / 2} y={height / 2 + 10} textAnchor="middle" className="text-xs font-black fill-blue-900 dark:fill-blue-100">
              {meanResult.confidenceLevel}% Central Confidence Region
            </text>

            {/* Interactive Crosshair & Cursor Dot */}
            {hoverXPos !== null && hoverYPos !== null && (
              <g>
                <line
                  x1={hoverXPos}
                  y1={15}
                  x2={hoverXPos}
                  y2={height - 25}
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                  strokeDasharray="2,2"
                />
                <circle cx={hoverXPos} cy={hoverYPos} r="4" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
              </g>
            )}

            {/* Gradient definition */}
            <defs>
              <linearGradient id="ciBlueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.10" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Live Hover Inspection HUD Badge */}
        <div className="flex items-center justify-between text-xs px-2 text-slate-500 font-mono">
          <span>Distribution: <strong>{meanResult.distType} {meanResult.distType === "t" ? `(df = ${meanResult.degreesOfFreedom})` : "(Normal)"}</strong></span>
          {hoveredZ !== null && hoverPdf !== null ? (
            <span className={`px-2 py-0.5 rounded font-bold ${isInRegion ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`}>
              Inspecting: {meanResult.distType} = {hoveredZ > 0 ? `+${hoveredZ.toFixed(2)}` : hoveredZ.toFixed(2)} &bull; {isInRegion ? "Inside Region" : "In Alpha Tail"}
            </span>
          ) : (
            <span className="text-[11px] text-slate-400 font-sans">Hover across curve to inspect coordinates</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      {/* ========================================================================= */}
      {/* MASTER ACTION TOOLBAR */}
      {/* ========================================================================= */}
      <section className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-600 text-white shadow-2xs">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 dark:text-slate-100 tracking-tight">
              Confidence Interval &amp; Estimation Suite
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Normal Z &amp; Student&apos;s t, Wilson/Wald proportions, Welch&apos;s t &amp; Chi-Square variance
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCopySummary}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5 text-blue-600" />
            <span>{copiedSummary ? "Copied!" : "Copy Summary"}</span>
          </button>

          <button
            type="button"
            onClick={handleCopyApaCitation}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>{copiedApaAll ? "Copied APA!" : "Copy APA Justification"}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-blue-600" />
            <span>{shared ? "Link Copied!" : "Share"}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadCSV}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
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
      {/* CARD 1: SINGLE POPULATION MEAN ESTIMATION (μ - NORMAL Z & STUDENT'S t) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Single Population Mean Estimation Suite (&mu; - Normal Z &amp; Student&apos;s t)</span>
          <button
            type="button"
            onClick={handleSaveMean}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedMean ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          {!meanResult.isValid && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-2 text-xs text-red-700 dark:text-red-300 font-bold">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{meanResult.errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: INPUT FORM */}
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-blue-600" />
                  <span>Sample Data &amp; Parameters</span>
                </h2>
                <button
                  type="button"
                  onClick={() => setUseRawData1(!useRawData1)}
                  className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  {useRawData1 ? "Use Summary Stats" : "Use Raw Dataset"}
                </button>
              </div>

              {useRawData1 ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Raw Data Numbers (comma/space separated):
                  </label>
                  <textarea
                    rows={4}
                    value={rawText1}
                    onChange={(e) => setRawText1(e.target.value)}
                    placeholder="e.g. 22.5, 24.1, 25.8, 23.0, 26.4"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs font-mono font-bold"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Automatically calculates x̄, s, and n.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Sample Mean (x̄):
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={mean1}
                      onChange={(e) => setMean1(parseFloat(e.target.value) || 0)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Std Deviation (s):
                      </label>
                      <input
                        type="number"
                        step="any"
                        value={sd1}
                        onChange={(e) => setSd1(parseFloat(e.target.value) || 0)}
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Sample Size (n):
                      </label>
                      <input
                        type="number"
                        step="1"
                        value={n1}
                        onChange={(e) => setN1(parseInt(e.target.value) || 0)}
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Confidence Level Radio Buttons */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Confidence Level (CL):
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[80, 90, 95, 98, 99].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setCl1(lvl)}
                      className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        cl1 === lvl
                          ? "bg-blue-600 text-white shadow-2xs"
                          : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-400"
                      }`}
                    >
                      {lvl}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Known Population SD Switch */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Known Population SD (&sigma;):
                  </span>
                  <button
                    type="button"
                    onClick={() => setKnownSigma1(!knownSigma1)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      knownSigma1
                        ? "bg-blue-600 text-white"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {knownSigma1 ? "Known σ (Z-interval)" : "Unknown σ (t-interval)"}
                  </button>
                </div>

                {/* FPC Switch */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Finite Population Correction (FPC):
                  </span>
                  <button
                    type="button"
                    onClick={() => setUseFPC1(!useFPC1)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      useFPC1
                        ? "bg-blue-600 text-white"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {useFPC1 ? "Enabled" : "Disabled"}
                  </button>
                </div>

                {useFPC1 && (
                  <div className="pt-1">
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">
                      Total Population Size (N):
                    </label>
                    <input
                      type="number"
                      step="1"
                      value={finiteN1}
                      onChange={(e) => setFiniteN1(parseInt(e.target.value) || 500)}
                      className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: MEAN OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Calculated Confidence Interval ({meanResult.confidenceLevel}% CL)
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    Method: {meanResult.distType}-Distribution {meanResult.distType === "t" ? `(df = ${meanResult.degreesOfFreedom})` : ""}
                  </span>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-center space-y-1">
                  <div className="text-3xl sm:text-4xl font-mono font-black text-slate-900 dark:text-slate-100 tracking-tight">
                    {meanResult.intervalStr}
                  </div>
                  <div className="text-xs font-mono text-slate-500">
                    {meanResult.inequalityStr} &bull; {meanResult.pmStr}
                  </div>
                </div>

                {/* Key Sub-metrics */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Margin of Error (&plusmn;ME)</span>
                    <strong className="text-sm font-mono text-blue-600 dark:text-blue-400">&plusmn;{meanResult.me}</strong>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Critical Value ({meanResult.distType}*)</span>
                    <strong className="text-sm font-mono text-slate-800 dark:text-slate-200">{meanResult.criticalValue}</strong>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Standard Error (SE)</span>
                    <strong className="text-sm font-mono text-slate-800 dark:text-slate-200">{meanResult.se}</strong>
                  </div>
                </div>

                {/* APA Citation Box */}
                <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      <span>APA / Academic Methodology Citation:</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(meanResult.apaCitation);
                        setCopiedAPA(true);
                        setTimeout(() => setCopiedAPA(false), 2000);
                      }}
                      className="px-2 py-0.5 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors flex items-center gap-1 cursor-pointer text-xs"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedAPA ? "Copied!" : "Copy APA"}</span>
                    </button>
                  </div>
                  <p className="font-mono text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-2 rounded">
                    {meanResult.apaCitation}
                  </p>
                </div>

                {/* Copy Interval Buttons */}
                <div className="flex flex-wrap gap-2 text-xs font-bold pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(meanResult.intervalStr);
                      setCopiedInterval(true);
                      setTimeout(() => setCopiedInterval(false), 2000);
                    }}
                    className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3 text-blue-600" />
                    <span>{copiedInterval ? "Copied Interval" : `Interval: ${meanResult.intervalStr}`}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(meanResult.inequalityStr);
                      setCopiedInequality(true);
                      setTimeout(() => setCopiedInequality(false), 2000);
                    }}
                    className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3 text-blue-600" />
                    <span>{copiedInequality ? "Copied Inequality" : `Inequality: ${meanResult.inequalityStr}`}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* DISTRIBUTION CURVE & STEP-BY-STEP DERIVATION */}
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-blue-600" />
              <span>Interactive Shaded Probability Distribution Curve ({meanResult.distType}-Distribution)</span>
            </h3>

            {renderDistributionCurve()}

            {/* Step-by-Step */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                Step-by-Step Mathematical Substitution:
              </span>
              <pre className="text-xs font-mono text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                {meanResult.stepText}
              </pre>
            </div>
          </div>

          {/* SAVED MEAN ITEMS */}
          {savedMeanItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Mean Calculations ({savedMeanItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedMeanItems([]);
                    try { localStorage.removeItem("saved_ci_mean"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedMeanItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = savedMeanItems.filter(i => i.id !== item.id);
                          setSavedMeanItems(updated);
                          try { localStorage.setItem("saved_ci_mean", JSON.stringify(updated)); } catch(e){}
                        }}
                        className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] font-mono">{item.inputs}</p>
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                      {item.rawParams && (
                        <button
                          type="button"
                          onClick={() => handleLoadMean(item.rawParams)}
                          className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-400 text-[11px] font-bold transition-colors cursor-pointer"
                        >
                          Load
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 2: SINGLE POPULATION PROPORTION ESTIMATION (p) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Single Population Proportion Estimation (p - Wilson Score &amp; Wald)</span>
          <button
            type="button"
            onClick={handleSaveProp}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedProp ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          {!propResult.isValid && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-2 text-xs text-red-700 dark:text-red-300 font-bold">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{propResult.errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Proportion Inputs
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Number of Successes (x):
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={propX}
                    onChange={(e) => setPropX(parseInt(e.target.value) || 0)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Sample Size (n):
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={propN}
                    onChange={(e) => setPropN(parseInt(e.target.value) || 1)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Confidence Level (%):
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={propCL}
                    onChange={(e) => setPropCL(parseFloat(e.target.value) || 95)}
                    className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: PROPORTION COMPARISON */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
                {/* WILSON SCORE INTERVAL */}
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-blue-300 dark:border-blue-700 space-y-1 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Wilson Score Interval (Recommended)
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                      Sample Proportion p̂ = {(propResult.pHat * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100">
                    [{(propResult.wilsonLower * 100).toFixed(2)}%, {(propResult.wilsonUpper * 100).toFixed(2)}%]
                  </div>
                  <p className="text-xs font-mono text-slate-500">
                    Wilson Margin of Error ME = &plusmn;{(propResult.wilsonME * 100).toFixed(2)}% | Critical Z* = {propResult.criticalZ}
                  </p>
                </div>

                {/* WALD INTERVAL */}
                <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">
                    Wald Standard Normal CI
                  </span>
                  <div className="text-base font-mono font-bold text-slate-800 dark:text-slate-200">
                    [{(propResult.waldLower * 100).toFixed(2)}%, {(propResult.waldUpper * 100).toFixed(2)}%]
                  </div>
                </div>

                {/* AGRESTI-COULL */}
                <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">
                    Agresti-Coull (Plus-Four) CI
                  </span>
                  <div className="text-base font-mono font-bold text-slate-800 dark:text-slate-200">
                    [{(propResult.agrestiLower * 100).toFixed(2)}%, {(propResult.agrestiUpper * 100).toFixed(2)}%]
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED PROPORTIONS */}
          {savedPropItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Proportion Calculations ({savedPropItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedPropItems([]);
                    try { localStorage.removeItem("saved_ci_prop"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedPropItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = savedPropItems.filter(i => i.id !== item.id);
                          setSavedPropItems(updated);
                          try { localStorage.setItem("saved_ci_prop", JSON.stringify(updated)); } catch(e){}
                        }}
                        className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] font-mono">{item.inputs}</p>
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                      {item.rawParams && (
                        <button
                          type="button"
                          onClick={() => handleLoadProp(item.rawParams)}
                          className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-400 text-[11px] font-bold transition-colors cursor-pointer"
                        >
                          Load
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 3: DIFFERENCE BETWEEN TWO INDEPENDENT MEANS (μ1 - μ2) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Difference Between Two Independent Means (&mu;1 - &mu;2)</span>
          <button
            type="button"
            onClick={handleSaveTwoMeans}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedTwoMeans ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          {!twoMeansResult.isValid && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-2 text-xs text-red-700 dark:text-red-300 font-bold">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{twoMeansResult.errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Two Group Inputs
                </h2>
                <button
                  type="button"
                  onClick={() => setEqualVar(!equalVar)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                    equalVar ? "bg-purple-600 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {equalVar ? "Pooled Variance" : "Welch's t (Unequal)"}
                </button>
              </div>

              {/* Group 1 */}
              <div className="space-y-2 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400 block">
                  Group 1 Parameters:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block">Mean (x̄1)</label>
                    <input
                      type="number"
                      step="any"
                      value={m1_mean}
                      onChange={(e) => setM1_mean(parseFloat(e.target.value) || 0)}
                      className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block">SD (s1)</label>
                    <input
                      type="number"
                      step="any"
                      value={m1_sd}
                      onChange={(e) => setM1_sd(parseFloat(e.target.value) || 1)}
                      className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block">Size (n1)</label>
                    <input
                      type="number"
                      step="1"
                      value={m1_n}
                      onChange={(e) => setM1_n(parseInt(e.target.value) || 2)}
                      className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Group 2 */}
              <div className="space-y-2 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400 block">
                  Group 2 Parameters:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block">Mean (x̄2)</label>
                    <input
                      type="number"
                      step="any"
                      value={m2_mean}
                      onChange={(e) => setM2_mean(parseFloat(e.target.value) || 0)}
                      className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block">SD (s2)</label>
                    <input
                      type="number"
                      step="any"
                      value={m2_sd}
                      onChange={(e) => setM2_sd(parseFloat(e.target.value) || 1)}
                      className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block">Size (n2)</label>
                    <input
                      type="number"
                      step="1"
                      value={m2_n}
                      onChange={(e) => setM2_n(parseInt(e.target.value) || 2)}
                      className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: TWO MEANS OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Difference Confidence Interval (M1 - M2)
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      twoMeansResult.isSignificant
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                        : "bg-amber-50 text-amber-600 border border-amber-200"
                    }`}>
                      {twoMeansResult.isSignificant ? "Excludes 0: Significant" : "Includes 0: Not Significant"}
                    </span>
                  </div>
                  <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100">
                    [{twoMeansResult.lowerBound}, {twoMeansResult.upperBound}]
                  </div>
                  <p className="text-xs font-mono font-bold text-slate-500">
                    Point Estimate Diff = {twoMeansResult.diff} | ME = &plusmn;{twoMeansResult.me} | df = {twoMeansResult.df}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED TWO MEANS */}
          {savedTwoMeansItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Two-Means Calculations ({savedTwoMeansItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedTwoMeansItems([]);
                    try { localStorage.removeItem("saved_ci_twomeans"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedTwoMeansItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = savedTwoMeansItems.filter(i => i.id !== item.id);
                          setSavedTwoMeansItems(updated);
                          try { localStorage.setItem("saved_ci_twomeans", JSON.stringify(updated)); } catch(e){}
                        }}
                        className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] font-mono">{item.inputs}</p>
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                      {item.rawParams && (
                        <button
                          type="button"
                          onClick={() => handleLoadTwoMeans(item.rawParams)}
                          className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-400 text-[11px] font-bold transition-colors cursor-pointer"
                        >
                          Load
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 4: DIFFERENCE BETWEEN TWO PROPORTIONS (p1 - p2) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Difference Between Two Independent Proportions (p1 - p2)</span>
          <button
            type="button"
            onClick={handleSaveTwoProps}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedTwoProps ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          {!twoPropsResult.isValid && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-2 text-xs text-red-700 dark:text-red-300 font-bold">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{twoPropsResult.errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Two Proportion Groups
              </h2>

              <div className="space-y-3">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400 block">
                    Group 1 (x1 / n1):
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block">Successes (x1)</label>
                      <input
                        type="number"
                        step="1"
                        value={p1_x}
                        onChange={(e) => setP1_x(parseInt(e.target.value) || 0)}
                        className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block">Sample Size (n1)</label>
                      <input
                        type="number"
                        step="1"
                        value={p1_n}
                        onChange={(e) => setP1_n(parseInt(e.target.value) || 1)}
                        className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400 block">
                    Group 2 (x2 / n2):
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block">Successes (x2)</label>
                      <input
                        type="number"
                        step="1"
                        value={p2_x}
                        onChange={(e) => setP2_x(parseInt(e.target.value) || 0)}
                        className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 block">Sample Size (n2)</label>
                      <input
                        type="number"
                        step="1"
                        value={p2_n}
                        onChange={(e) => setP2_n(parseInt(e.target.value) || 1)}
                        className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: PROPORTION DIFFERENCE OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Proportion Difference CI (p̂1 - p̂2)
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      twoPropsResult.isSignificant
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                        : "bg-amber-50 text-amber-600 border border-amber-200"
                    }`}>
                      {twoPropsResult.isSignificant ? "Excludes 0: Significant" : "Includes 0: Not Significant"}
                    </span>
                  </div>
                  <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100">
                    [{(twoPropsResult.lowerBound * 100).toFixed(2)}%, {(twoPropsResult.upperBound * 100).toFixed(2)}%]
                  </div>
                  <p className="text-xs font-mono font-bold text-slate-500">
                    p̂1 = {(twoPropsResult.p1Hat * 100).toFixed(2)}% | p̂2 = {(twoPropsResult.p2Hat * 100).toFixed(2)}% | Diff = {(twoPropsResult.diff * 100).toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED TWO PROPS */}
          {savedTwoPropsItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Two-Proportions Calculations ({savedTwoPropsItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedTwoPropsItems([]);
                    try { localStorage.removeItem("saved_ci_twoprops"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedTwoPropsItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = savedTwoPropsItems.filter(i => i.id !== item.id);
                          setSavedTwoPropsItems(updated);
                          try { localStorage.setItem("saved_ci_twoprops", JSON.stringify(updated)); } catch(e){}
                        }}
                        className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] font-mono">{item.inputs}</p>
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                      {item.rawParams && (
                        <button
                          type="button"
                          onClick={() => handleLoadTwoProps(item.rawParams)}
                          className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-400 text-[11px] font-bold transition-colors cursor-pointer"
                        >
                          Load
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 5: POPULATION VARIANCE & STANDARD DEVIATION (σ², σ) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Population Variance &amp; Standard Deviation CI (&sigma;&sup2;, &sigma;)</span>
          <button
            type="button"
            onClick={handleSaveVar}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedVar ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          {!varResult.isValid && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-2 text-xs text-red-700 dark:text-red-300 font-bold">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{varResult.errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Chi-Square Parameters
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Sample Standard Deviation (s):
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={varSD}
                    onChange={(e) => setVarSD(parseFloat(e.target.value) || 0)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Sample Size (n):
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={varN}
                    onChange={(e) => setVarN(parseInt(e.target.value) || 0)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Confidence Level (%):
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={varCL}
                    onChange={(e) => setVarCL(parseFloat(e.target.value) || 95)}
                    className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: VARIANCE OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Population Standard Deviation (&sigma;) CI
                  </span>
                  <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all">
                    [{varResult.sdLower}, {varResult.sdUpper}]
                  </div>
                  <p className="text-xs font-mono font-bold text-slate-500">
                    Population Variance (&sigma;&sup2;) CI = [{varResult.varLower}, {varResult.varUpper}] | df = {varResult.df}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED VARIANCE */}
          {savedVarItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Variance Calculations ({savedVarItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedVarItems([]);
                    try { localStorage.removeItem("saved_ci_var"); } catch(e){}
                  }}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedVarItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = savedVarItems.filter(i => i.id !== item.id);
                          setSavedVarItems(updated);
                          try { localStorage.setItem("saved_ci_var", JSON.stringify(updated)); } catch(e){}
                        }}
                        className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] font-mono">{item.inputs}</p>
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                      {item.rawParams && (
                        <button
                          type="button"
                          onClick={() => handleLoadVar(item.rawParams)}
                          className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-400 text-[11px] font-bold transition-colors cursor-pointer"
                        >
                          Load
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DEDICATED 2-PAGE EXECUTIVE PDF REPORT MODAL */}
      {/* ========================================================================= */}
      <ConfidenceIntervalReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        meanResult={meanResult}
        propResult={propResult}
        twoMeansResult={twoMeansResult}
        twoPropsResult={twoPropsResult}
        varResult={varResult}
      />
    </div>
  );
}

export default ConfidenceIntervalCalculator;
