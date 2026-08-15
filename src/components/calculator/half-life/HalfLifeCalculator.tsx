"use client";

import React, { useState, useMemo } from "react";
import { Copy, Check, Sparkles, HelpCircle, RefreshCw, BarChart2, Calendar, Database } from "lucide-react";

type SolveTarget = "remaining" | "initial" | "halflife" | "time" | "decay_constant";
type TimeUnit = "seconds" | "minutes" | "hours" | "days" | "weeks" | "months" | "years" | "millennia";
type QuantityUnit = "g" | "mg" | "kg" | "%" | "Bq" | "Ci" | "mol";

interface Isotope {
  name: string;
  symbol: string;
  halfLifeVal: number;
  halfLifeUnit: TimeUnit;
  mode: string;
  description: string;
}

const ISOTOPES: Isotope[] = [
  { name: "Carbon-14", symbol: "C-14", halfLifeVal: 5730, halfLifeUnit: "years", mode: "Beta-minus (β⁻)", description: "Radiocarbon dating in archaeology" },
  { name: "Uranium-238", symbol: "U-238", halfLifeVal: 4468000000, halfLifeUnit: "years", mode: "Alpha (α)", description: "Geological rock dating & nuclear fuel" },
  { name: "Iodine-131", symbol: "I-131", halfLifeVal: 8.02, halfLifeUnit: "days", mode: "Beta-minus & Gamma", description: "Thyroid cancer radiotherapy" },
  { name: "Cesium-137", symbol: "Cs-137", halfLifeVal: 30.17, halfLifeUnit: "years", mode: "Beta-minus & Gamma", description: "Industrial gauges & fallout tracking" },
  { name: "Radium-226", symbol: "Ra-226", halfLifeVal: 1600, halfLifeUnit: "years", mode: "Alpha (α)", description: "Historical luminous paint & oncology" },
  { name: "Technetium-99m", symbol: "Tc-99m", halfLifeVal: 6.006, halfLifeUnit: "hours", mode: "Gamma (γ)", description: "Diagnostic SPECT medical imaging" },
  { name: "Tritium (Hydrogen-3)", symbol: "H-3", halfLifeVal: 12.32, halfLifeUnit: "years", mode: "Beta-minus (β⁻)", description: "Self-powered lighting & fusion research" },
  { name: "Radon-222", symbol: "Rn-222", halfLifeVal: 3.823, halfLifeUnit: "days", mode: "Alpha (α)", description: "Indoor environmental air hazard" },
  { name: "Cobalt-60", symbol: "Co-60", halfLifeVal: 5.27, halfLifeUnit: "years", mode: "Beta-minus & Gamma", description: "Industrial radiography & sterilization" },
  { name: "Potassium-40", symbol: "K-40", halfLifeVal: 1248000000, halfLifeUnit: "years", mode: "Beta & Electron Capture", description: "Potassium-Argon rock dating" }
];

const TIME_UNIT_SECONDS: Record<TimeUnit, number> = {
  seconds: 1,
  minutes: 60,
  hours: 3600,
  days: 86400,
  weeks: 604800,
  months: 2629746, // ~30.4375 days
  years: 31557600, // 365.25 days
  millennia: 31557600000
};

export function HalfLifeCalculator() {
  const [solveTarget, setSolveTarget] = useState<SolveTarget>("remaining");
  const [selectedIsotope, setSelectedIsotope] = useState<string>("custom");

  // Inputs
  const [initialQty, setInitialQty] = useState<string>("100");
  const [remainingQty, setRemainingQty] = useState<string>("25");
  const [halfLifeVal, setHalfLifeVal] = useState<string>("5730");
  const [halfLifeUnit, setHalfLifeUnit] = useState<TimeUnit>("years");
  const [elapsedTimeVal, setElapsedTimeVal] = useState<string>("11460");
  const [elapsedTimeUnit, setElapsedTimeUnit] = useState<TimeUnit>("years");
  const [qtyUnit, setQtyUnit] = useState<QuantityUnit>("g");

  const [copiedLatex, setCopiedLatex] = useState<boolean>(false);

  // Handle Isotope Selection
  const handleIsotopeChange = (symbol: string) => {
    setSelectedIsotope(symbol);
    if (symbol === "custom") return;
    const found = ISOTOPES.find((iso) => iso.symbol === symbol);
    if (found) {
      setHalfLifeVal(found.halfLifeVal.toString());
      setHalfLifeUnit(found.halfLifeUnit);
      if (solveTarget === "remaining" || solveTarget === "initial") {
        setElapsedTimeUnit(found.halfLifeUnit);
      }
    }
  };

  // Convert time to seconds
  const toSeconds = (val: number, unit: TimeUnit) => val * TIME_UNIT_SECONDS[unit];
  const fromSeconds = (sec: number, unit: TimeUnit) => sec / TIME_UNIT_SECONDS[unit];

  // Calculation Engine
  const calculation = useMemo(() => {
    const N0 = parseFloat(initialQty);
    const Nt = parseFloat(remainingQty);
    const thf = parseFloat(halfLifeVal);
    const tVal = parseFloat(elapsedTimeVal);

    // Normalize time to seconds
    const thfSec = toSeconds(thf, halfLifeUnit);
    const tSec = toSeconds(tVal, elapsedTimeUnit);

    const steps: string[] = [];

    if (solveTarget === "remaining") {
      if (isNaN(N0) || isNaN(thf) || isNaN(tVal) || N0 <= 0 || thfSec <= 0 || tSec < 0) {
        return { error: "Please enter positive initial quantity, half-life, and non-negative elapsed time." };
      }

      // N(t) = N0 * (0.5)^(t / t_half)
      const numCycles = tSec / thfSec;
      const resNt = N0 * Math.pow(0.5, numCycles);
      const percentRemaining = (resNt / N0) * 100;
      const decayConstSec = Math.LN2 / thfSec; // lambda in 1/sec
      const decayConstUnit = Math.LN2 / thf; // lambda in 1/halfLifeUnit
      const meanLifetimeSec = thfSec / Math.LN2;
      const meanLifetimeUnit = thf / Math.LN2;

      steps.push(`Formula: N(t) = N₀ × (1/2)^(t / t½)`);
      steps.push(`1. Calculate Number of Cycles: n = t / t½ = ${tVal} ${elapsedTimeUnit} / ${thf} ${halfLifeUnit} = ${numCycles.toFixed(4)} cycles`);
      steps.push(`2. Exponential Factor: (0.5)^(${numCycles.toFixed(4)}) = ${Math.pow(0.5, numCycles).toFixed(6)}`);
      steps.push(`3. Evaluate Remaining Quantity: N(t) = ${N0} × ${Math.pow(0.5, numCycles).toFixed(6)} = ${resNt.toFixed(6)} ${qtyUnit}`);
      steps.push(`4. Percent Remaining: (${resNt.toFixed(6)} / ${N0}) × 100% = ${percentRemaining.toFixed(2)}%`);

      return {
        solvedVal: resNt,
        solvedLabel: `Remaining Quantity (Nₜ)`,
        unit: qtyUnit,
        numCycles,
        percentRemaining,
        decayConstUnit,
        meanLifetimeUnit,
        latex: `N(t) = ${N0} \\times \\left(\\frac{1}{2}\\right)^{\\frac{${tVal}}{${thf}}} = ${resNt.toFixed(4)} \\text{ ${qtyUnit}}`,
        steps
      };
    } else if (solveTarget === "initial") {
      if (isNaN(Nt) || isNaN(thf) || isNaN(tVal) || Nt <= 0 || thfSec <= 0 || tSec < 0) {
        return { error: "Please enter positive remaining quantity, half-life, and non-negative elapsed time." };
      }

      // N0 = Nt / (0.5)^(t / t_half) = Nt * 2^(t / t_half)
      const numCycles = tSec / thfSec;
      const resN0 = Nt * Math.pow(2, numCycles);
      const decayConstUnit = Math.LN2 / thf;
      const meanLifetimeUnit = thf / Math.LN2;

      steps.push(`Formula: N₀ = N(t) × 2^(t / t½)`);
      steps.push(`1. Calculate Number of Cycles: n = t / t½ = ${tVal} ${elapsedTimeUnit} / ${thf} ${halfLifeUnit} = ${numCycles.toFixed(4)} cycles`);
      steps.push(`2. Growth Multiplier: 2^(${numCycles.toFixed(4)}) = ${Math.pow(2, numCycles).toFixed(6)}`);
      steps.push(`3. Evaluate Initial Quantity: N₀ = ${Nt} × ${Math.pow(2, numCycles).toFixed(6)} = ${resN0.toFixed(6)} ${qtyUnit}`);

      return {
        solvedVal: resN0,
        solvedLabel: `Initial Quantity (N₀)`,
        unit: qtyUnit,
        numCycles,
        percentRemaining: (Nt / resN0) * 100,
        decayConstUnit,
        meanLifetimeUnit,
        latex: `N_0 = ${Nt} \\times 2^{\\frac{${tVal}}{${thf}}} = ${resN0.toFixed(4)} \\text{ ${qtyUnit}}`,
        steps
      };
    } else if (solveTarget === "halflife") {
      if (isNaN(N0) || isNaN(Nt) || isNaN(tVal) || N0 <= 0 || Nt <= 0 || Nt >= N0 || tSec <= 0) {
        return { error: "Initial quantity (N₀) must be greater than remaining quantity (Nₜ > 0), and time > 0." };
      }

      // t_half = t * ln(0.5) / ln(Nt / N0) = t * ln(2) / ln(N0 / Nt)
      const resThfSec = tSec * Math.LN2 / Math.log(N0 / Nt);
      const resThfUnit = fromSeconds(resThfSec, halfLifeUnit);
      const numCycles = tSec / resThfSec;
      const decayConstUnit = Math.LN2 / resThfUnit;
      const meanLifetimeUnit = resThfUnit / Math.LN2;

      steps.push(`Formula: t½ = t × ln(2) / ln(N₀ / Nₜ)`);
      steps.push(`1. Logarithmic Ratio: ln(N₀ / Nₜ) = ln(${N0} / ${Nt}) = ln(${(N0 / Nt).toFixed(6)}) = ${Math.log(N0 / Nt).toFixed(6)}`);
      steps.push(`2. Evaluate Half-Life: t½ = ${tVal} × 0.693147 / ${Math.log(N0 / Nt).toFixed(6)} = ${resThfUnit.toFixed(6)} ${halfLifeUnit}`);
      steps.push(`3. Elapsed Cycles: n = ${numCycles.toFixed(4)} cycles`);

      return {
        solvedVal: resThfUnit,
        solvedLabel: `Half-Life (t½)`,
        unit: halfLifeUnit,
        numCycles,
        percentRemaining: (Nt / N0) * 100,
        decayConstUnit,
        meanLifetimeUnit,
        latex: `t_{1/2} = \\frac{${tVal} \\times \\ln(2)}{\\ln(${N0}/${Nt})} = ${resThfUnit.toFixed(4)} \\text{ ${halfLifeUnit}}`,
        steps
      };
    } else if (solveTarget === "time") {
      if (isNaN(N0) || isNaN(Nt) || isNaN(thf) || N0 <= 0 || Nt <= 0 || Nt >= N0 || thfSec <= 0) {
        return { error: "Initial quantity (N₀) must be greater than remaining quantity (Nₜ > 0), and half-life > 0." };
      }

      // t = t_half * ln(N0 / Nt) / ln(2)
      const resTSec = thfSec * Math.log(N0 / Nt) / Math.LN2;
      const resTUnit = fromSeconds(resTSec, elapsedTimeUnit);
      const numCycles = resTSec / thfSec;
      const decayConstUnit = Math.LN2 / thf;
      const meanLifetimeUnit = thf / Math.LN2;

      steps.push(`Formula: t = t½ × [ln(N₀ / Nₜ) / ln(2)]`);
      steps.push(`1. Logarithmic Ratio: ln(N₀ / Nₜ) = ln(${N0} / ${Nt}) = ${Math.log(N0 / Nt).toFixed(6)}`);
      steps.push(`2. Cycles Passed: n = ${Math.log(N0 / Nt).toFixed(6)} / 0.693147 = ${numCycles.toFixed(4)} cycles`);
      steps.push(`3. Evaluate Elapsed Time: t = ${thf} ${halfLifeUnit} × ${numCycles.toFixed(4)} = ${resTUnit.toFixed(6)} ${elapsedTimeUnit}`);

      return {
        solvedVal: resTUnit,
        solvedLabel: `Elapsed Time (t)`,
        unit: elapsedTimeUnit,
        numCycles,
        percentRemaining: (Nt / N0) * 100,
        decayConstUnit,
        meanLifetimeUnit,
        latex: `t = ${thf} \\times \\frac{\\ln(${N0}/${Nt})}{\\ln(2)} = ${resTUnit.toFixed(4)} \\text{ ${elapsedTimeUnit}}`,
        steps
      };
    } else {
      // Decay Constant & Mean Lifetime
      if (isNaN(thf) || thf <= 0) {
        return { error: "Please enter a valid positive half-life." };
      }
      const decayConstUnit = Math.LN2 / thf;
      const meanLifetimeUnit = thf / Math.LN2;

      steps.push(`Formula 1 (Decay Constant): λ = ln(2) / t½ = 0.693147 / ${thf} = ${decayConstUnit.toFixed(6)} 1/${halfLifeUnit}`);
      steps.push(`Formula 2 (Mean Lifetime): τ = 1 / λ = t½ / ln(2) = ${thf} / 0.693147 = ${meanLifetimeUnit.toFixed(6)} ${halfLifeUnit}`);

      return {
        solvedVal: decayConstUnit,
        solvedLabel: `Decay Constant (λ)`,
        unit: `1/${halfLifeUnit}`,
        numCycles: 1,
        percentRemaining: 50,
        decayConstUnit,
        meanLifetimeUnit,
        latex: `\\lambda = \\frac{\\ln(2)}{${thf}} = ${decayConstUnit.toFixed(6)} \\text{ 1/${halfLifeUnit}}, \\quad \\tau = ${meanLifetimeUnit.toFixed(6)} \\text{ ${halfLifeUnit}}`,
        steps
      };
    }
  }, [solveTarget, initialQty, remainingQty, halfLifeVal, halfLifeUnit, elapsedTimeVal, elapsedTimeUnit, qtyUnit]);

  // Generate 10-cycle decay table data
  const cycleTableData = useMemo(() => {
    if (calculation.error) return [];
    const n0Val = solveTarget === "initial" ? calculation.solvedVal || 100 : parseFloat(initialQty) || 100;
    const rows = [];
    for (let c = 0; c <= 10; c++) {
      const rem = n0Val * Math.pow(0.5, c);
      const pct = 100 * Math.pow(0.5, c);
      rows.push({
        cycle: c,
        remaining: rem,
        percentage: pct
      });
    }
    return rows;
  }, [calculation, initialQty, solveTarget]);

  // Render SVG Decay Curve Chart
  const svgChart = useMemo(() => {
    if (calculation.error) return null;

    const width = 450;
    const height = 200;
    const padding = 35;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const points: [number, number][] = [];
    const maxCycles = 5;

    for (let i = 0; i <= 50; i++) {
      const cycle = (i / 50) * maxCycles;
      const x = padding + (cycle / maxCycles) * chartWidth;
      const yVal = Math.pow(0.5, cycle); // 1.0 down to 0.03125
      const y = padding + (1 - yVal) * chartHeight;
      points.push([x, y]);
    }

    const pathD = points.reduce((acc, curr, idx) => `${acc} ${idx === 0 ? "M" : "L"} ${curr[0]} ${curr[1]}`, "");

    // Current operating point coordinate
    const curCycle = Math.min(Math.max(calculation.numCycles || 0, 0), maxCycles);
    const curX = padding + (curCycle / maxCycles) * chartWidth;
    const curYVal = Math.pow(0.5, curCycle);
    const curY = padding + (1 - curYVal) * chartHeight;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto text-xs font-sans tabular-nums">
        {/* Background Grid Lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
          const y = padding + (1 - pct) * chartHeight;
          return (
            <g key={i}>
              <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="currentColor" strokeOpacity={0.1} />
              <text x={padding - 5} y={y + 3} textAnchor="end" className="fill-slate-400 text-[9px] font-bold">
                {Math.round(pct * 100)}%
              </text>
            </g>
          );
        })}

        {/* Half-Life Cycle Vertical Markers */}
        {[0, 1, 2, 3, 4, 5].map((c) => {
          const x = padding + (c / maxCycles) * chartWidth;
          return (
            <g key={c}>
              <line x1={x} y1={padding} x2={x} y2={height - padding} stroke="currentColor" strokeOpacity={0.1} />
              <text x={x} y={height - padding + 14} textAnchor="middle" className="fill-slate-400 text-[9px] font-bold">
                {c}t½
              </text>
            </g>
          );
        })}

        {/* Exponential Curve */}
        <path d={pathD} fill="none" stroke="#2563eb" strokeWidth={2.5} className="dark:stroke-blue-400" />

        {/* Calculated Point Highlight */}
        {curCycle <= maxCycles && (
          <g>
            <circle cx={curX} cy={curY} r={5} fill="#2563eb" className="animate-pulse" />
            <circle cx={curX} cy={curY} r={8} fill="none" stroke="#2563eb" strokeWidth={1.5} opacity={0.6} />
          </g>
        )}
      </svg>
    );
  }, [calculation]);

  const handleCopyLatex = (latex: string) => {
    try {
      navigator.clipboard.writeText(latex);
      setCopiedLatex(true);
      setTimeout(() => setCopiedLatex(false), 2000);
    } catch (e) {}
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. ISOTOPE PRESET SELECTION BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs text-xs">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <span className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
            <Database className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Isotope Presets:
          </span>
          <select
            value={selectedIsotope}
            onChange={(e) => handleIsotopeChange(e.target.value)}
            className="h-8 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="custom">Custom Isotope / User Defined</option>
            {ISOTOPES.map((iso) => (
              <option key={iso.symbol} value={iso.symbol}>
                {iso.name} ({iso.symbol}) — {iso.halfLifeVal} {iso.halfLifeUnit}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            setSelectedIsotope("custom");
            setInitialQty("100");
            setRemainingQty("25");
            setHalfLifeVal("5730");
            setHalfLifeUnit("years");
            setElapsedTimeVal("11460");
            setElapsedTimeUnit("years");
          }}
          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors flex items-center gap-1 ml-auto"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" /> Reset
        </button>
      </div>

      {/* 2. MAIN SPLIT-PANE INTERFACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: INPUT CONTROLS */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
            {/* SOLVE TARGET SELECTOR */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                Select Variable to Solve
              </label>
              <select
                value={solveTarget}
                onChange={(e) => setSolveTarget(e.target.value as SolveTarget)}
                className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="remaining">Remaining Quantity N(t)</option>
                <option value="initial">Initial Quantity N₀</option>
                <option value="halflife">Half-Life t½</option>
                <option value="time">Elapsed Time t</option>
                <option value="decay_constant">Decay Constant (λ) &amp; Mean Lifetime (τ)</option>
              </select>
            </div>

            {/* QUANTITY UNITS SELECTOR */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Quantity Units
              </label>
              <select
                value={qtyUnit}
                onChange={(e) => setQtyUnit(e.target.value as QuantityUnit)}
                className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="g">Grams (g)</option>
                <option value="mg">Milligrams (mg)</option>
                <option value="kg">Kilograms (kg)</option>
                <option value="%">Percentage (%)</option>
                <option value="Bq">Becquerels (Bq)</option>
                <option value="Ci">Curies (Ci)</option>
                <option value="mol">Moles (mol)</option>
              </select>
            </div>

            {/* INITIAL QUANTITY (N0) */}
            {solveTarget !== "initial" && (
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Initial Quantity (N₀)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={initialQty}
                    onChange={(e) => setInitialQty(e.target.value)}
                    placeholder="e.g. 100"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">
                    {qtyUnit}
                  </span>
                </div>
              </div>
            )}

            {/* REMAINING QUANTITY (Nt) */}
            {solveTarget !== "remaining" && solveTarget !== "decay_constant" && (
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Remaining Quantity (Nₜ)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={remainingQty}
                    onChange={(e) => setRemainingQty(e.target.value)}
                    placeholder="e.g. 25"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">
                    {qtyUnit}
                  </span>
                </div>
              </div>
            )}

            {/* HALF LIFE (t_half) */}
            {solveTarget !== "halflife" && (
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Half-Life (t½)
                </label>
                <div className="grid grid-cols-12 gap-2">
                  <input
                    type="number"
                    value={halfLifeVal}
                    onChange={(e) => setHalfLifeVal(e.target.value)}
                    placeholder="e.g. 5730"
                    className="col-span-7 h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <select
                    value={halfLifeUnit}
                    onChange={(e) => setHalfLifeUnit(e.target.value as TimeUnit)}
                    className="col-span-5 h-10 px-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="seconds">seconds</option>
                    <option value="minutes">minutes</option>
                    <option value="hours">hours</option>
                    <option value="days">days</option>
                    <option value="weeks">weeks</option>
                    <option value="months">months</option>
                    <option value="years">years</option>
                    <option value="millennia">millennia</option>
                  </select>
                </div>
              </div>
            )}

            {/* ELAPSED TIME (t) */}
            {solveTarget !== "time" && solveTarget !== "decay_constant" && (
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Elapsed Time (t)
                </label>
                <div className="grid grid-cols-12 gap-2">
                  <input
                    type="number"
                    value={elapsedTimeVal}
                    onChange={(e) => setElapsedTimeVal(e.target.value)}
                    placeholder="e.g. 11460"
                    className="col-span-7 h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <select
                    value={elapsedTimeUnit}
                    onChange={(e) => setElapsedTimeUnit(e.target.value as TimeUnit)}
                    className="col-span-5 h-10 px-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="seconds">seconds</option>
                    <option value="minutes">minutes</option>
                    <option value="hours">hours</option>
                    <option value="days">days</option>
                    <option value="weeks">weeks</option>
                    <option value="months">months</option>
                    <option value="years">years</option>
                    <option value="millennia">millennia</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: HERO RESULT CARD & DECAY GRAPH */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
            {/* HERO RESULT DISPLAY */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {calculation.solvedLabel}
                </span>
                <button
                  type="button"
                  onClick={() => calculation.latex && handleCopyLatex(calculation.latex)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
                >
                  {copiedLatex ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-blue-600" />}
                  <span>{copiedLatex ? "LaTeX Copied!" : "Copy LaTeX"}</span>
                </button>
              </div>

              {calculation.error ? (
                <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                  {calculation.error}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-3xl sm:text-4xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100">
                    {calculation.solvedVal?.toFixed(6)} <span className="text-xl text-blue-600 font-bold">{calculation.unit}</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-bold pt-1">
                    <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                      <span className="text-[10px] text-slate-400 block uppercase">Cycles Elapsed</span>
                      <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100">{calculation.numCycles?.toFixed(3)} t½</span>
                    </div>

                    <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                      <span className="text-[10px] text-slate-400 block uppercase">Decay Constant (λ)</span>
                      <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100">{calculation.decayConstUnit?.toExponential(4)}</span>
                    </div>

                    <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl col-span-2 sm:col-span-1">
                      <span className="text-[10px] text-slate-400 block uppercase">Mean Lifetime (τ)</span>
                      <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100">{calculation.meanLifetimeUnit?.toFixed(4)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* INTERACTIVE EXPONENTIAL DECAY GRAPH */}
            {svgChart && (
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <BarChart2 className="w-3.5 h-3.5" /> Exponential Decay Curve &amp; Half-Life Cycles
                </span>
                {svgChart}
              </div>
            )}

            {/* STEP-BY-STEP SOLUTION BREAKDOWN */}
            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" /> Step-by-Step Mathematical Solution
              </h3>

              {!calculation.error && calculation.steps && (
                <div className="space-y-2 text-xs font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                  {calculation.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                      <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">{idx + 1}.</span>
                      <span className="font-sans tabular-nums">{step}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* DECAY TABLE GENERATOR (CYCLES 0 - 10) */}
            {cycleTableData.length > 0 && (
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 text-xs">
                <span className="text-blue-600 dark:text-blue-400 font-extrabold uppercase tracking-wider block">
                  Decay Table Across 10 Cycles
                </span>
                <div className="overflow-x-auto">
                  <table className="w-full text-center border-collapse font-sans tabular-nums font-bold">
                    <thead>
                      <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400">
                        <th className="p-2 text-left">Cycle (t½)</th>
                        <th className="p-2">Remaining Quantity ({qtyUnit})</th>
                        <th className="p-2">Percentage Remaining</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {cycleTableData.map((row) => (
                        <tr key={row.cycle} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="p-2 text-left text-slate-900 dark:text-slate-100">{row.cycle} t½</td>
                          <td className="p-2 text-blue-600 dark:text-blue-400">{row.remaining.toFixed(4)}</td>
                          <td className="p-2 text-slate-700 dark:text-slate-300">{row.percentage.toFixed(2)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HalfLifeCalculator;
