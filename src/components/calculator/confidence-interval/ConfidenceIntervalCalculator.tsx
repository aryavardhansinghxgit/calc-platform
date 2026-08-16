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
  FileText
} from "lucide-react";
import {
  computeMeanCI,
  computeProportionCI,
  computeTwoMeansCI,
  computeVarianceCI,
  parseDataStream
} from "@/app/calculators/confidence-interval-calculator/confidence-interval-logic";

export interface SavedCIItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
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

  // Card 4 Inputs: Population Variance
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

  const [savedVarItems, setSavedVarItems] = useState<SavedCIItem[]>([]);
  const [justSavedVar, setJustSavedVar] = useState<boolean>(false);

  // Expand state
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_ci_mean");
      if (s1) setSavedMeanItems(JSON.parse(s1));

      const s2 = localStorage.getItem("saved_ci_prop");
      if (s2) setSavedPropItems(JSON.parse(s2));

      const s3 = localStorage.getItem("saved_ci_twomeans");
      if (s3) setSavedTwoMeansItems(JSON.parse(s3));

      const s4 = localStorage.getItem("saved_ci_var");
      if (s4) setSavedVarItems(JSON.parse(s4));
    } catch (e) {}
  }, []);

  // Update mean/sd/n if raw text data is inputted
  useEffect(() => {
    if (!useRawData1) return;
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
  const meanResult = useMemo(() => {
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
  const propResult = useMemo(() => {
    return computeProportionCI(propX, propN, propCL, precision1);
  }, [propX, propN, propCL, precision1]);

  // Card 3 Calculations
  const twoMeansResult = useMemo(() => {
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
  const varResult = useMemo(() => {
    return computeVarianceCI(varSD, varN, varCL, precision1);
  }, [varSD, varN, varCL, precision1]);

  // Save Handlers
  const handleSaveMean = () => {
    const inputsStr = `x̄ = ${mean1}, s = ${sd1}, n = ${n1}, CL = ${cl1}%`;
    const opStr = `Single Mean Confidence Interval`;
    const resList = [
      `Confidence Interval = ${meanResult.intervalStr}`,
      `Margin of Error = ±${meanResult.me}`,
      `Critical Value (${meanResult.distType}*) = ${meanResult.criticalValue}`,
      `Standard Error (SE) = ${meanResult.se}`
    ];

    const newItem: SavedCIItem = {
      id: Date.now().toString(),
      title: `${meanResult.intervalStr} (${cl1}% CL, ME = ±${meanResult.me})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `CI = ${meanResult.intervalStr}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedMeanItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedMeanItems(updated);
    try { localStorage.setItem("saved_ci_mean", JSON.stringify(updated)); } catch (e) {}
    setJustSavedMean(true);
    setTimeout(() => setJustSavedMean(false), 2000);
  };

  const handleSaveProp = () => {
    const inputsStr = `x = ${propX}, n = ${propN}, CL = ${propCL}%`;
    const opStr = `Population Proportion CI`;
    const resList = [
      `Wilson Score CI = [${(propResult.wilsonLower * 100).toFixed(2)}%, ${(propResult.wilsonUpper * 100).toFixed(2)}%]`,
      `Wald Normal CI = [${(propResult.waldLower * 100).toFixed(2)}%, ${(propResult.waldUpper * 100).toFixed(2)}%]`,
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
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedPropItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedPropItems(updated);
    try { localStorage.setItem("saved_ci_prop", JSON.stringify(updated)); } catch (e) {}
    setJustSavedProp(true);
    setTimeout(() => setJustSavedProp(false), 2000);
  };

  const handleSaveTwoMeans = () => {
    const inputsStr = `G1(${m1_mean}, ${m1_sd}, n=${m1_n}) vs G2(${m2_mean}, ${m2_sd}, n=${m2_n})`;
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
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedTwoMeansItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedTwoMeansItems(updated);
    try { localStorage.setItem("saved_ci_twomeans", JSON.stringify(updated)); } catch (e) {}
    setJustSavedTwoMeans(true);
    setTimeout(() => setJustSavedTwoMeans(false), 2000);
  };

  const handleSaveVar = () => {
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
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedVarItems.filter(i => i.inputs !== inputsStr)].slice(0, 15);
    setSavedVarItems(updated);
    try { localStorage.setItem("saved_ci_var", JSON.stringify(updated)); } catch (e) {}
    setJustSavedVar(true);
    setTimeout(() => setJustSavedVar(false), 2000);
  };

  // Render SVG 2D Distribution Curve Helper
  const renderDistributionCurve = (critValue: number, clPct: number) => {
    const width = 500;
    const height = 150;
    const padding = 40;
    const drawWidth = width - 2 * padding;

    const zMin = -3.5;
    const zMax = 3.5;

    const scaleX = (z: number) => {
      const clampedZ = Math.max(zMin, Math.min(zMax, z));
      return padding + ((clampedZ - zMin) / (zMax - zMin)) * drawWidth;
    };

    const scaleY = (pdf: number) => {
      const maxPDF = 0.42;
      return height - 25 - (pdf / maxPDF) * (height - 40);
    };

    // Standard Normal PDF
    const pdfFunc = (z: number) => (1.0 / Math.sqrt(2.0 * Math.PI)) * Math.exp(-0.5 * z * z);

    const points: { x: number; y: number; z: number }[] = [];
    for (let z = zMin; z <= zMax; z += 0.05) {
      const pdf = pdfFunc(z);
      points.push({ x: scaleX(z), y: scaleY(pdf), z });
    }

    const curvePathStr = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

    // Shaded Central Confidence Region
    const absCrit = Math.abs(critValue);
    const shadedPoints = points.filter(p => p.z >= -absCrit && p.z <= absCrit);

    let shadePathStr = "";
    if (shadedPoints.length > 0) {
      const firstX = shadedPoints[0].x;
      const lastX = shadedPoints[shadedPoints.length - 1].x;
      const baselineY = height - 25;
      const pathSegs = shadedPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
      shadePathStr = `${pathSegs} L ${lastX} ${baselineY} L ${firstX} ${baselineY} Z`;
    }

    const xPosNeg = scaleX(-absCrit);
    const xPosPos = scaleX(absCrit);

    return (
      <svg viewBox="0 0 500 150" className="w-full max-w-xl h-auto">
        <line x1={padding} y1={height - 25} x2={width - padding} y2={height - 25} stroke="#94a3b8" strokeWidth="2" />

        {shadePathStr && (
          <path d={shadePathStr} fill="#3b82f6" opacity="0.35" />
        )}

        <path d={curvePathStr} fill="none" stroke="#2563eb" strokeWidth="2.5" />

        {/* Vertical Cutoff Lines */}
        <line x1={xPosNeg} y1="15" x2={xPosNeg} y2={height - 25} stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />
        <circle cx={xPosNeg} cy="15" r="3.5" fill="#dc2626" />
        <text x={xPosNeg} y="10" textAnchor="middle" className="text-[9px] font-mono font-bold fill-red-600 dark:fill-red-400">
          -{absCrit.toFixed(2)}
        </text>

        <line x1={xPosPos} y1="15" x2={xPosPos} y2={height - 25} stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />
        <circle cx={xPosPos} cy="15" r="3.5" fill="#dc2626" />
        <text x={xPosPos} y="10" textAnchor="middle" className="text-[9px] font-mono font-bold fill-red-600 dark:fill-red-400">
          +{absCrit.toFixed(2)}
        </text>

        {/* Central Shaded Percentage Text */}
        <text x={width / 2} y={height / 2 + 10} textAnchor="middle" className="text-xs font-black fill-blue-900 dark:fill-blue-200">
          {clPct}% Central Confidence Region
        </text>
      </svg>
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
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

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Std Deviation ({knownSigma1 ? "σ" : "s"}):
                      </label>
                      <input
                        type="number"
                        step="any"
                        min="0.0001"
                        value={sd1}
                        onChange={(e) => setSd1(parseFloat(e.target.value) || 1)}
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
                        min="2"
                        value={n1}
                        onChange={(e) => setN1(parseInt(e.target.value) || 2)}
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* CONFIDENCE LEVEL PRESET CHIPS */}
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Confidence Level (CL):
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[80, 90, 95, 98, 99].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setCl1(lvl)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                        cl1 === lvl ? "bg-blue-600 text-white" : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {lvl}%
                    </button>
                  ))}
                </div>
              </div>

              {/* ADVANCED TOGGLES: KNOWN SIGMA & FINITE POPULATION CORRECTION */}
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
                <div className="flex items-center justify-between">
                  <span>Known Population SD (&sigma;):</span>
                  <button
                    type="button"
                    onClick={() => setKnownSigma1(!knownSigma1)}
                    className={`px-2.5 py-0.5 rounded cursor-pointer ${knownSigma1 ? "bg-blue-600 text-white" : "bg-slate-200 dark:bg-slate-800"}`}
                  >
                    {knownSigma1 ? "Known σ (Z-Interval)" : "Unknown σ (t-Interval)"}
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span>Finite Population Correction (FPC):</span>
                  <button
                    type="button"
                    onClick={() => setUseFPC1(!useFPC1)}
                    className={`px-2.5 py-0.5 rounded cursor-pointer ${useFPC1 ? "bg-blue-600 text-white" : "bg-slate-200 dark:bg-slate-800"}`}
                  >
                    {useFPC1 ? "Enabled" : "Disabled"}
                  </button>
                </div>

                {useFPC1 && (
                  <div className="pt-2">
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">
                      Total Finite Population Size (N):
                    </label>
                    <input
                      type="number"
                      step="1"
                      value={finiteN1}
                      onChange={(e) => setFiniteN1(parseInt(e.target.value) || 100)}
                      className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-bold text-xs"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: HERO RESULT CARD & CITATIONS */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-900/90 border border-blue-200 dark:border-blue-800/60 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-blue-200 dark:border-blue-800/60 pb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Calculated Confidence Interval ({cl1}% CL)
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    Method: {meanResult.distType}-Distribution {knownSigma1 ? "(Known σ)" : `(df = ${meanResult.degreesOfFreedom})`}
                  </span>
                </div>

                {/* HERO VALUE */}
                <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 font-mono tracking-tight break-all">
                  {meanResult.intervalStr}
                </div>

                {/* METRIC BADGES */}
                <div className="grid grid-cols-3 gap-2 text-xs font-bold pt-2 border-t border-blue-200 dark:border-blue-800/60">
                  <div className="p-2 bg-white dark:bg-slate-800 rounded-xl text-center space-y-0.5 shadow-2xs">
                    <span className="text-[10px] text-slate-400 block uppercase">Margin of Error (±ME)</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">±{meanResult.me}</span>
                  </div>

                  <div className="p-2 bg-white dark:bg-slate-800 rounded-xl text-center space-y-0.5 shadow-2xs">
                    <span className="text-[10px] text-slate-400 block uppercase">Critical Value ({meanResult.distType}*)</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{meanResult.criticalValue}</span>
                  </div>

                  <div className="p-2 bg-white dark:bg-slate-800 rounded-xl text-center space-y-0.5 shadow-2xs">
                    <span className="text-[10px] text-slate-400 block uppercase">Standard Error (SE)</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{meanResult.se}</span>
                  </div>
                </div>

                {/* APA ACADEMIC CITATION & ONE-CLICK COPY BUTTONS */}
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-blue-800/60 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-1 text-[11px]">
                      <FileText className="w-3.5 h-3.5" /> APA / Academic Methodology Citation:
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(meanResult.apaCitation);
                        setCopiedAPA(true);
                        setTimeout(() => setCopiedAPA(false), 2000);
                      }}
                      className="px-2 py-0.5 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedAPA ? "Copied!" : "Copy APA"}</span>
                    </button>
                  </div>
                  <p className="font-mono text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900 p-2 rounded">
                    {meanResult.apaCitation}
                  </p>
                </div>

                {/* INEQUALITY & INTERVAL NOTATION COPY BUTTONS */}
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

          {/* DYNAMIC SVG DISTRIBUTION visualizer */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <BarChart2 className="h-4 w-4" />
              <span>Interactive Shaded Probability Distribution Curve ({meanResult.distType}-Distribution)</span>
            </h3>

            <div className="w-full flex justify-center py-2 overflow-x-auto bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
              {renderDistributionCurve(meanResult.criticalValue, meanResult.confidenceLevel)}
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
              <span className="font-bold text-blue-600 dark:text-blue-400 block font-sans text-xs">Step-by-Step Mathematical Substitution:</span>
              <pre className="whitespace-pre-wrap leading-relaxed">{meanResult.stepText}</pre>
            </div>
          </div>

          {/* EMBEDDED SAVED CALCULATIONS INSIDE CARD 1 */}
          {savedMeanItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Single Mean Calculations ({savedMeanItems.length})</span>
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
                {savedMeanItems.map((item) => {
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
                            const updated = savedMeanItems.filter(i => i.id !== item.id);
                            setSavedMeanItems(updated);
                            try { localStorage.setItem("saved_ci_mean", JSON.stringify(updated)); } catch(e){}
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
      {/* CARD 2: POPULATION PROPORTION ESTIMATION (p - BINOMIAL, WILSON SCORE) */}
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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
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

            {/* RIGHT COLUMN: PROPORTION OUTPUTS */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      Wilson Score Interval (Recommended)
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      Sample Proportion p̂ = {(propResult.pHat * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all">
                    [{(propResult.wilsonLower * 100).toFixed(2)}%, {(propResult.wilsonUpper * 100).toFixed(2)}%]
                  </div>
                  <p className="text-xs font-mono font-bold text-slate-500">
                    Wilson Margin of Error ME = ±{(propResult.wilsonME * 100).toFixed(2)}% | Critical Z* = {propResult.criticalZ}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 block uppercase">Wald Standard Normal CI</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100 block text-sm">
                      [{(propResult.waldLower * 100).toFixed(2)}%, {(propResult.waldUpper * 100).toFixed(2)}%]
                    </span>
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 block uppercase">Agresti-Coull (Plus-Four) CI</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100 block text-sm">
                      [{(propResult.agrestiLower * 100).toFixed(2)}%, {(propResult.agrestiUpper * 100).toFixed(2)}%]
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED PROPORTION CALCULATIONS INSIDE CARD 2 */}
          {savedPropItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
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
                {savedPropItems.map((item) => {
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
                            const updated = savedPropItems.filter(i => i.id !== item.id);
                            setSavedPropItems(updated);
                            try { localStorage.setItem("saved_ci_prop", JSON.stringify(updated)); } catch(e){}
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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Two Group Inputs
                </h2>
                <button
                  type="button"
                  onClick={() => setEqualVar(!equalVar)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer ${equalVar ? "bg-blue-600 text-white" : "bg-slate-200 dark:bg-slate-800"}`}
                >
                  {equalVar ? "Pooled Variance" : "Welch's t (Unequal)"}
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">Group 1 Parameters:</span>
                  <div className="grid grid-cols-3 gap-1.5">
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold block">Mean (x̄1)</label>
                      <input
                        type="number"
                        value={m1_mean}
                        onChange={(e) => setM1_mean(parseFloat(e.target.value) || 0)}
                        className="w-full h-8 px-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold block">SD (s1)</label>
                      <input
                        type="number"
                        value={m1_sd}
                        onChange={(e) => setM1_sd(parseFloat(e.target.value) || 1)}
                        className="w-full h-8 px-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold block">Size (n1)</label>
                      <input
                        type="number"
                        value={m1_n}
                        onChange={(e) => setM1_n(parseInt(e.target.value) || 2)}
                        className="w-full h-8 px-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs font-bold"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">Group 2 Parameters:</span>
                  <div className="grid grid-cols-3 gap-1.5">
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold block">Mean (x̄2)</label>
                      <input
                        type="number"
                        value={m2_mean}
                        onChange={(e) => setM2_mean(parseFloat(e.target.value) || 0)}
                        className="w-full h-8 px-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold block">SD (s2)</label>
                      <input
                        type="number"
                        value={m2_sd}
                        onChange={(e) => setM2_sd(parseFloat(e.target.value) || 1)}
                        className="w-full h-8 px-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold block">Size (n2)</label>
                      <input
                        type="number"
                        value={m2_n}
                        onChange={(e) => setM2_n(parseInt(e.target.value) || 2)}
                        className="w-full h-8 px-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs font-bold"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: TWO MEANS OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      Difference Confidence Interval (&mu;1 - &mu;2)
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${twoMeansResult.isSignificant ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                      {twoMeansResult.isSignificant ? "Excludes 0: Significant" : "Includes 0: Not Significant"}
                    </span>
                  </div>
                  <div className="text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all">
                    [{twoMeansResult.lowerBound}, {twoMeansResult.upperBound}]
                  </div>
                  <p className="text-xs font-mono font-bold text-slate-500">
                    Point Estimate Diff = {twoMeansResult.diff} | ME = ±{twoMeansResult.me} | df = {twoMeansResult.df}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED TWO MEANS CALCULATIONS INSIDE CARD 3 */}
          {savedTwoMeansItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Two Means Calculations ({savedTwoMeansItems.length})</span>
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
                {savedTwoMeansItems.map((item) => {
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
                            const updated = savedTwoMeansItems.filter(i => i.id !== item.id);
                            setSavedTwoMeansItems(updated);
                            try { localStorage.setItem("saved_ci_twomeans", JSON.stringify(updated)); } catch(e){}
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
      {/* CARD 4: POPULATION VARIANCE & STANDARD DEVIATION CI (σ², σ) */}
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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
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
                    onChange={(e) => setVarSD(parseFloat(e.target.value) || 1)}
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
                    onChange={(e) => setVarN(parseInt(e.target.value) || 2)}
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

          {/* EMBEDDED SAVED VARIANCE CALCULATIONS INSIDE CARD 4 */}
          {savedVarItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
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
                {savedVarItems.map((item) => {
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
                            const updated = savedVarItems.filter(i => i.id !== item.id);
                            setSavedVarItems(updated);
                            try { localStorage.setItem("saved_ci_var", JSON.stringify(updated)); } catch(e){}
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
    </div>
  );
}

export default ConfidenceIntervalCalculator;
