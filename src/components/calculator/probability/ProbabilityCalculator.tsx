"use client";

import React, { useState } from "react";
import {
  computeTwoEventProbability,
  solveTwoEvents,
  computeSeriesEvents,
  computeNormalDistribution,
  generateConfidenceIntervalsTable,
  TwoEventResult,
  SeriesEventsResult,
  NormalDistributionResult
} from "@/app/calculators/probability-calculator/probability-logic";

// Helper SVG Venn diagram icon component matching Calculator.net icons
function VennIcon({ type }: { type: string }) {
  return (
    <svg width="28" height="20" viewBox="0 0 28 20" className="inline-block align-middle ml-1">
      <rect width="28" height="20" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" rx="2" />
      {type === "notA" && (
        <>
          <circle cx="18" cy="10" r="6" fill="#2563eb" opacity="0.8" />
          <circle cx="10" cy="10" r="6" fill="#ffffff" stroke="#334155" strokeWidth="1" />
          <circle cx="18" cy="10" r="6" fill="none" stroke="#334155" strokeWidth="1" />
        </>
      )}
      {type === "notB" && (
        <>
          <circle cx="10" cy="10" r="6" fill="#2563eb" opacity="0.8" />
          <circle cx="18" cy="10" r="6" fill="#ffffff" stroke="#334155" strokeWidth="1" />
          <circle cx="10" cy="10" r="6" fill="none" stroke="#334155" strokeWidth="1" />
        </>
      )}
      {type === "intersection" && (
        <g>
          <circle cx="10" cy="10" r="6" fill="#ffffff" stroke="#334155" strokeWidth="1" />
          <circle cx="18" cy="10" r="6" fill="#ffffff" stroke="#334155" strokeWidth="1" />
          <path d="M 14 5.2 A 6 6 0 0 1 14 14.8 A 6 6 0 0 1 14 5.2 Z" fill="#2563eb" />
        </g>
      )}
      {type === "union" && (
        <>
          <circle cx="10" cy="10" r="6" fill="#2563eb" opacity="0.8" stroke="#334155" strokeWidth="1" />
          <circle cx="18" cy="10" r="6" fill="#2563eb" opacity="0.8" stroke="#334155" strokeWidth="1" />
        </>
      )}
      {type === "xor" && (
        <g>
          <circle cx="10" cy="10" r="6" fill="#2563eb" opacity="0.8" stroke="#334155" strokeWidth="1" />
          <circle cx="18" cy="10" r="6" fill="#2563eb" opacity="0.8" stroke="#334155" strokeWidth="1" />
          <path d="M 14 5.2 A 6 6 0 0 1 14 14.8 A 6 6 0 0 1 14 5.2 Z" fill="#ffffff" stroke="#334155" strokeWidth="0.5" />
        </g>
      )}
      {type === "neither" && (
        <>
          <rect width="28" height="20" fill="#2563eb" opacity="0.7" rx="2" />
          <circle cx="10" cy="10" r="6" fill="#ffffff" stroke="#334155" strokeWidth="1" />
          <circle cx="18" cy="10" r="6" fill="#ffffff" stroke="#334155" strokeWidth="1" />
        </>
      )}
      {type === "aNotB" && (
        <g>
          <circle cx="10" cy="10" r="6" fill="#2563eb" opacity="0.8" stroke="#334155" strokeWidth="1" />
          <circle cx="18" cy="10" r="6" fill="#ffffff" stroke="#334155" strokeWidth="1" />
        </g>
      )}
      {type === "bNotA" && (
        <g>
          <circle cx="10" cy="10" r="6" fill="#ffffff" stroke="#334155" strokeWidth="1" />
          <circle cx="18" cy="10" r="6" fill="#2563eb" opacity="0.8" stroke="#334155" strokeWidth="1" />
        </g>
      )}
    </svg>
  );
}

// Gaussian Normal Curve SVG diagram for Section 3
function NormalCurveSVG({ mean, stdDev, leftBound, rightBound }: { mean: number; stdDev: number; leftBound: number; rightBound: number }) {
  const minX = mean - 3.5 * stdDev;
  const maxX = mean + 3.5 * stdDev;
  const width = 240;
  const height = 120;

  const getSvgX = (val: number) => {
    if (val === -Infinity) return 10;
    if (val === Infinity) return width - 10;
    const clamped = Math.max(minX, Math.min(maxX, val));
    return 10 + ((clamped - minX) / (maxX - minX)) * (width - 20);
  };

  const getSvgY = (val: number) => {
    const z = (val - mean) / stdDev;
    const pdf = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * z * z);
    return height - 20 - (pdf / 0.4) * (height - 35);
  };

  const points: { x: number; y: number; val: number }[] = [];
  for (let i = 0; i <= 60; i++) {
    const val = minX + (i / 60) * (maxX - minX);
    points.push({ x: getSvgX(val), y: getSvgY(val), val });
  }

  const curvePath = "M " + points.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" L ");

  const lbX = getSvgX(leftBound);
  const rbX = getSvgX(rightBound);

  const shadedPoints = points.filter(p => p.val >= leftBound && p.val <= rightBound);
  let shadedPath = "";
  if (shadedPoints.length > 0) {
    const firstX = Math.max(10, Math.min(width - 10, lbX));
    const lastX = Math.max(10, Math.min(width - 10, rbX));
    shadedPath = `M ${firstX.toFixed(1)},${height - 20} L ` + shadedPoints.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" L ") + ` L ${lastX.toFixed(1)},${height - 20} Z`;
  }

  const meanX = getSvgX(mean);

  return (
    <div className="flex flex-col items-center">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        {shadedPath && <path d={shadedPath} fill="#93c5fd" opacity="0.7" />}
        <line x1="5" y1={height - 20} x2={width - 5} y2={height - 20} stroke="#334155" strokeWidth="1.5" />
        <path d={curvePath} fill="none" stroke="#2563eb" strokeWidth="2" />
        <line x1={meanX} y1={getSvgY(mean)} x2={meanX} y2={height - 20} stroke="#2563eb" strokeDasharray="3 3" strokeWidth="1.5" />
        <text x={meanX} y={height - 5} textAnchor="middle" className="text-[11px] font-serif font-bold fill-slate-800">μ</text>

        {leftBound !== -Infinity && (
          <g>
            <line x1={lbX} y1={getSvgY(leftBound)} x2={lbX} y2={height - 20} stroke="#2563eb" strokeWidth="1.5" />
            <text x={lbX} y={height - 5} textAnchor="middle" className="text-[10px] font-sans font-bold fill-slate-700">Lb</text>
          </g>
        )}

        {rightBound !== Infinity && (
          <g>
            <line x1={rbX} y1={getSvgY(rightBound)} x2={rbX} y2={height - 20} stroke="#2563eb" strokeWidth="1.5" />
            <text x={rbX} y={height - 5} textAnchor="middle" className="text-[10px] font-sans font-bold fill-slate-700">Rb</text>
          </g>
        )}

        <text x={(lbX + rbX) / 2} y={height - 40} textAnchor="middle" className="text-[14px] font-serif font-bold fill-slate-900">P</text>
        <text x={width - 30} y="20" className="text-[11px] font-serif font-bold fill-slate-800">N(μ, σ²)</text>
        <text x={meanX + 18} y={height - 50} className="text-[11px] font-serif font-bold fill-slate-800">σ</text>
      </svg>
    </div>
  );
}

export function ProbabilityCalculator() {
  // SECTION 1: Probability of Two Events
  const [s1PA, setS1PA] = useState<string>("0.5");
  const [s1PB, setS1PB] = useState<string>("0.4");
  const [s1Result, setS1Result] = useState<TwoEventResult | null>(() => computeTwoEventProbability("0.5", "0.4"));

  const handleS1Calculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setS1Result(computeTwoEventProbability(s1PA, s1PB));
  };

  const handleS1Clear = () => {
    setS1PA("");
    setS1PB("");
    setS1Result(null);
  };

  // SECTION 1.5: Probability Solver for Two Events
  const [s1SolInputs, setS1SolInputs] = useState({
    pA: "0.5",
    pB: "",
    pNotA: "",
    pNotB: "",
    pAandB: "0.4",
    pAorB: "",
    pAxorB: "",
    pNeither: ""
  });
  const [s1SolResult, setS1SolResult] = useState<{
    solved: boolean;
    result?: TwoEventResult;
    givenSummary?: string;
    steps?: string[];
  } | null>(() => solveTwoEvents({ pA: "0.5", pAandB: "0.4" }));

  const handleS1SolInputChange = (field: string, val: string) => {
    setS1SolInputs(prev => ({ ...prev, [field]: val }));
  };

  const handleS1SolCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setS1SolResult(solveTwoEvents(s1SolInputs));
  };

  const handleS1SolClear = () => {
    setS1SolInputs({
      pA: "",
      pB: "",
      pNotA: "",
      pNotB: "",
      pAandB: "",
      pAorB: "",
      pAxorB: "",
      pNeither: ""
    });
    setS1SolResult(null);
  };

  // SECTION 2: Series of Independent Events
  const [s2PA, setS2PA] = useState<string>("0.6");
  const [s2RepeatA, setS2RepeatA] = useState<string>("5");
  const [s2PB, setS2PB] = useState<string>("0.3");
  const [s2RepeatB, setS2RepeatB] = useState<string>("3");
  const [s2Result, setS2Result] = useState<SeriesEventsResult | null>(() =>
    computeSeriesEvents("0.6", 5, "0.3", 3)
  );

  const handleS2Calculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setS2Result(computeSeriesEvents(s2PA, parseInt(s2RepeatA) || 1, s2PB, parseInt(s2RepeatB) || 1));
  };

  const handleS2Clear = () => {
    setS2PA("");
    setS2RepeatA("");
    setS2PB("");
    setS2RepeatB("");
    setS2Result(null);
  };

  // SECTION 3: Normal Distribution
  const [s3Mean, setS3Mean] = useState<string>("0");
  const [s3StdDev, setS3StdDev] = useState<string>("1");
  const [s3LeftBound, setS3LeftBound] = useState<string>("-1");
  const [s3RightBound, setS3RightBound] = useState<string>("1");
  const [s3Result, setS3Result] = useState<{
    norm: NormalDistributionResult;
    confTable: ReturnType<typeof generateConfidenceIntervalsTable>;
  } | null>(() => {
    const norm = computeNormalDistribution(0, 1, "-1", "1");
    const confTable = generateConfidenceIntervalsTable(0, 1);
    return { norm, confTable };
  });

  const handleS3Calculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const mean = parseFloat(s3Mean) || 0;
    const stdDev = parseFloat(s3StdDev) || 1;
    const norm = computeNormalDistribution(mean, stdDev, s3LeftBound, s3RightBound);
    const confTable = generateConfidenceIntervalsTable(mean, stdDev);
    setS3Result({ norm, confTable });
  };

  const handleS3Clear = () => {
    setS3Mean("");
    setS3StdDev("");
    setS3LeftBound("");
    setS3RightBound("");
    setS3Result(null);
  };

  return (
    <div className="space-y-8 font-sans text-slate-800 dark:text-slate-200">

      {/* ========================================================================= */}
      {/* SECTION 1: PROBABILITY OF TWO EVENTS */}
      {/* ========================================================================= */}
      <section className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-5 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Probability of Two Events
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          To find out the union, intersection, and other related probabilities of two independent events.
        </p>

        {/* Calculator Inputs Form */}
        <form onSubmit={handleS1Calculate} className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded border border-slate-200 dark:border-slate-700 max-w-lg">
          <div className="flex items-center justify-between gap-4">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 w-44">
              Probability of A: <span className="font-bold">P(A)</span>
            </label>
            <input
              type="text"
              value={s1PA}
              onChange={(e) => setS1PA(e.target.value)}
              className="w-32 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold focus:ring-1 focus:ring-blue-600 outline-none"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 w-44">
              Probability of B: <span className="font-bold">P(B)</span>
            </label>
            <input
              type="text"
              value={s1PB}
              onChange={(e) => setS1PB(e.target.value)}
              className="w-32 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold focus:ring-1 focus:ring-blue-600 outline-none"
            />
          </div>

          {/* Calculate & Clear Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded px-4 py-1.5 transition-colors flex items-center justify-center text-center cursor-pointer"
            >
              Calculate
            </button>

            <button
              type="button"
              onClick={handleS1Clear}
              className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded px-4 py-1.5 transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>

          <p className="text-[11px] text-slate-500 italic pt-1">
            Please input values between 0 and 1.
          </p>
        </form>

        {/* Output Section 1 */}
        {s1Result && (
          <div className="space-y-4 pt-2">
            {/* Header Result Box */}
            <div className="border border-blue-600 rounded overflow-hidden max-w-xl">
              <div className="bg-blue-600 text-white font-bold text-xs px-3 py-1.5">
                Result
              </div>
              <div className="bg-white dark:bg-slate-900 p-3 text-xs space-y-2 font-sans">
                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span>Probability of A NOT occuring: <strong>P(A')</strong></span>
                  <span className="font-sans tabular-nums font-bold flex items-center gap-2">
                    {s1Result.pNotA.toFixed(4)}
                    <VennIcon type="notA" />
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span>Probability of B NOT occuring: <strong>P(B')</strong></span>
                  <span className="font-sans tabular-nums font-bold flex items-center gap-2">
                    {s1Result.pNotB.toFixed(4)}
                    <VennIcon type="notB" />
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span>Probability of A and B both occuring: <strong>P(A∩B)</strong></span>
                  <span className="font-sans tabular-nums font-bold flex items-center gap-2">
                    {s1Result.pIntersection.toFixed(4)}
                    <VennIcon type="intersection" />
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span>Probability that A or B or both occur: <strong>P(A∪B)</strong></span>
                  <span className="font-sans tabular-nums font-bold flex items-center gap-2">
                    {s1Result.pUnion.toFixed(4)}
                    <VennIcon type="union" />
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span>Probability that A or B occurs but NOT both: <strong>P(AΔB)</strong></span>
                  <span className="font-sans tabular-nums font-bold flex items-center gap-2">
                    {s1Result.pXor.toFixed(4)}
                    <VennIcon type="xor" />
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span>Probability of neither A nor B occuring: <strong>P((A∪B)')</strong></span>
                  <span className="font-sans tabular-nums font-bold flex items-center gap-2">
                    {s1Result.pNeither.toFixed(4)}
                    <VennIcon type="neither" />
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span>Probability of A occuring but NOT B:</span>
                  <span className="font-sans tabular-nums font-bold flex items-center gap-2">
                    {s1Result.pAnotB.toFixed(4)}
                    <VennIcon type="aNotB" />
                  </span>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span>Probability of B occuring but NOT A:</span>
                  <span className="font-sans tabular-nums font-bold flex items-center gap-2">
                    {s1Result.pBnotA.toFixed(4)}
                    <VennIcon type="bNotA" />
                  </span>
                </div>
              </div>
            </div>

            {/* Steps Section */}
            <div className="space-y-2 pt-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Steps</h3>
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded border border-slate-200 dark:border-slate-700 font-sans tabular-nums text-xs space-y-3 leading-relaxed">
                <div>
                  <p>P(A') = 1 - P(A)</p>
                  <p className="pl-6">= 1 - {s1Result.pA}</p>
                  <p className="pl-6 font-bold">= {s1Result.pNotA.toFixed(4)}</p>
                </div>

                <div>
                  <p>P(B') = 1 - P(B)</p>
                  <p className="pl-6">= 1 - {s1Result.pB}</p>
                  <p className="pl-6 font-bold">= {s1Result.pNotB.toFixed(4)}</p>
                </div>

                <div>
                  <p>P(A∩B) = P(A) × P(B)</p>
                  <p className="pl-6">= {s1Result.pA} × {s1Result.pB}</p>
                  <p className="pl-6 font-bold">= {s1Result.pIntersection.toFixed(4)}</p>
                </div>

                <div>
                  <p>P(A∪B) = P(A) + P(B) - P(A∩B)</p>
                  <p className="pl-6">= {s1Result.pA} + {s1Result.pB} - {s1Result.pIntersection.toFixed(4)}</p>
                  <p className="pl-6 font-bold">= {s1Result.pUnion.toFixed(4)}</p>
                </div>

                <div>
                  <p>P(AΔB) = P(A) + P(B) - 2P(A∩B)</p>
                  <p className="pl-6">= {s1Result.pA} + {s1Result.pB} - 2 × {s1Result.pIntersection.toFixed(4)}</p>
                  <p className="pl-6 font-bold">= {s1Result.pXor.toFixed(4)}</p>
                </div>

                <div>
                  <p>P((A∪B)') = 1 - P(A∪B)</p>
                  <p className="pl-6">= 1 - {s1Result.pUnion.toFixed(4)}</p>
                  <p className="pl-6 font-bold">= {s1Result.pNeither.toFixed(4)}</p>
                </div>

                <div>
                  <p>P(A occur but NOT B) = P(A) × (1 - P(B))</p>
                  <p className="pl-6">= {s1Result.pA} × (1 - {s1Result.pB})</p>
                  <p className="pl-6 font-bold">= {s1Result.pAnotB.toFixed(4)}</p>
                </div>

                <div>
                  <p>P(B occur but NOT A) = (1 - P(A)) × P(B)</p>
                  <p className="pl-6">= (1 - {s1Result.pA}) × {s1Result.pB}</p>
                  <p className="pl-6 font-bold">= {s1Result.pBnotA.toFixed(4)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>


      {/* ========================================================================= */}
      {/* SECTION 1.5: PROBABILITY SOLVER FOR TWO EVENTS */}
      {/* ========================================================================= */}
      <section className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-5 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Probability Solver for Two Events
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Please provide any 2 values below to calculate the rest probabilities of two independent events.
        </p>

        {/* Inputs Form */}
        <form onSubmit={handleS1SolCalculate} className="space-y-2 bg-slate-50 dark:bg-slate-800/50 p-4 rounded border border-slate-200 dark:border-slate-700 max-w-md">
          <div className="flex items-center justify-between gap-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Probability of A: <strong>P(A)</strong></label>
            <input
              type="text"
              value={s1SolInputs.pA}
              onChange={(e) => handleS1SolInputChange("pA", e.target.value)}
              className="w-32 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold focus:ring-1 focus:ring-blue-600 outline-none"
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Probability of B: <strong>P(B)</strong></label>
            <input
              type="text"
              value={s1SolInputs.pB}
              onChange={(e) => handleS1SolInputChange("pB", e.target.value)}
              className="w-32 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold focus:ring-1 focus:ring-blue-600 outline-none"
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Probability of A NOT occuring: <strong>P(A')</strong></label>
            <input
              type="text"
              value={s1SolInputs.pNotA}
              onChange={(e) => handleS1SolInputChange("pNotA", e.target.value)}
              className="w-32 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold focus:ring-1 focus:ring-blue-600 outline-none"
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Probability of B NOT occuring: <strong>P(B')</strong></label>
            <input
              type="text"
              value={s1SolInputs.pNotB}
              onChange={(e) => handleS1SolInputChange("pNotB", e.target.value)}
              className="w-32 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold focus:ring-1 focus:ring-blue-600 outline-none"
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Probability of A and B both occuring: <strong>P(A∩B)</strong></label>
            <input
              type="text"
              value={s1SolInputs.pAandB}
              onChange={(e) => handleS1SolInputChange("pAandB", e.target.value)}
              className="w-32 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold focus:ring-1 focus:ring-blue-600 outline-none"
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Probability that A or B or both occur: <strong>P(A∪B)</strong></label>
            <input
              type="text"
              value={s1SolInputs.pAorB}
              onChange={(e) => handleS1SolInputChange("pAorB", e.target.value)}
              className="w-32 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold focus:ring-1 focus:ring-blue-600 outline-none"
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Probability that A or B occurs but NOT both: <strong>P(AΔB)</strong></label>
            <input
              type="text"
              value={s1SolInputs.pAxorB}
              onChange={(e) => handleS1SolInputChange("pAxorB", e.target.value)}
              className="w-32 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold focus:ring-1 focus:ring-blue-600 outline-none"
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Probability of neither A nor B occuring: <strong>P((A∪B)')</strong></label>
            <input
              type="text"
              value={s1SolInputs.pNeither}
              onChange={(e) => handleS1SolInputChange("pNeither", e.target.value)}
              className="w-32 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold focus:ring-1 focus:ring-blue-600 outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded px-4 py-1.5 transition-colors flex items-center justify-center text-center cursor-pointer"
            >
              Calculate
            </button>

            <button
              type="button"
              onClick={handleS1SolClear}
              className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded px-4 py-1.5 transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>

          <p className="text-[11px] text-slate-500 italic pt-1">
            Please input values between 0 and 1.
          </p>
        </form>

        {/* Solver Results */}
        {s1SolResult && s1SolResult.result && (
          <div className="border border-blue-600 rounded overflow-hidden max-w-md pt-2">
            <div className="bg-blue-600 text-white font-bold text-xs px-3 py-1.5">
              Result
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 text-xs font-sans tabular-nums space-y-2">
              {s1SolResult.steps?.map((step, idx) => (
                <p key={idx} className={idx === 0 ? "font-bold text-slate-800 dark:text-slate-100 pb-1" : "text-slate-700 dark:text-slate-300 pl-2"}>
                  {step}
                </p>
              ))}
            </div>
          </div>
        )}
      </section>


      {/* ========================================================================= */}
      {/* SECTION 2: PROBABILITY OF A SERIES OF INDEPENDENT EVENTS */}
      {/* ========================================================================= */}
      <section className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-5 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Probability of a Series of Independent Events
        </h2>

        {/* Inputs Table Form */}
        <form onSubmit={handleS2Calculate} className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded border border-slate-200 dark:border-slate-700 max-w-md">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-300 dark:border-slate-700">
                <th className="p-1.5 font-bold"></th>
                <th className="p-1.5 font-bold text-center">Probability</th>
                <th className="p-1.5 font-bold text-center">Repeat Times</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-1.5 font-bold text-slate-700 dark:text-slate-300">Event A</td>
                <td className="p-1.5">
                  <input
                    type="text"
                    value={s2PA}
                    onChange={(e) => setS2PA(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 font-sans tabular-nums text-center outline-none focus:ring-1 focus:ring-blue-600 font-semibold"
                  />
                </td>
                <td className="p-1.5">
                  <input
                    type="text"
                    value={s2RepeatA}
                    onChange={(e) => setS2RepeatA(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 font-sans tabular-nums text-center outline-none focus:ring-1 focus:ring-blue-600 font-semibold"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-1.5 font-bold text-slate-700 dark:text-slate-300">Event B</td>
                <td className="p-1.5">
                  <input
                    type="text"
                    value={s2PB}
                    onChange={(e) => setS2PB(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 font-sans tabular-nums text-center outline-none focus:ring-1 focus:ring-blue-600 font-semibold"
                  />
                </td>
                <td className="p-1.5">
                  <input
                    type="text"
                    value={s2RepeatB}
                    onChange={(e) => setS2RepeatB(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 font-sans tabular-nums text-center outline-none focus:ring-1 focus:ring-blue-600 font-semibold"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded px-4 py-1.5 transition-colors flex items-center justify-center text-center cursor-pointer"
            >
              Calculate
            </button>

            <button
              type="button"
              onClick={handleS2Clear}
              className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded px-4 py-1.5 transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        </form>

        {/* Section 2 Results */}
        {s2Result && (
          <div className="border border-blue-600 rounded overflow-hidden max-w-xl">
            <div className="bg-blue-600 text-white font-bold text-xs px-3 py-1.5">
              Result
            </div>
            <div className="bg-white dark:bg-slate-900 p-4 text-xs font-sans tabular-nums space-y-2">
              <p>Probability of A occuring {s2RepeatA} time(s) = {s2PA}<sup>{s2RepeatA}</sup> = <strong>{s2Result.pAAll.toFixed(5)}</strong></p>
              <p>Probability of A NOT occuring = (1 - {s2PA})<sup>{s2RepeatA}</sup> = <strong>{s2Result.pANone.toFixed(5)}</strong></p>
              <p>Probability of A occuring = 1 - (1 - {s2PA})<sup>{s2RepeatA}</sup> = <strong>{s2Result.pAAtLeastOne.toFixed(5)}</strong></p>
              <p>Probability of B occuring {s2RepeatB} time(s) = {s2PB}<sup>{s2RepeatB}</sup> = <strong>{s2Result.pBAll.toFixed(5)}</strong></p>
              <p>Probability of B NOT occuring = (1 - {s2PB})<sup>{s2RepeatB}</sup> = <strong>{s2Result.pBNone.toFixed(5)}</strong></p>
              <p>Probability of B occuring = 1 - (1 - {s2PB})<sup>{s2RepeatB}</sup> = <strong>{s2Result.pBAtLeastOne.toFixed(5)}</strong></p>
              <p>Probability of A occuring {s2RepeatA} times and B occuring {s2RepeatB} times = {s2PA}<sup>{s2RepeatA}</sup> × {s2PB}<sup>{s2RepeatB}</sup> = <strong>{s2Result.pBothExact.toFixed(8)}</strong></p>
              <p>Probability of neither A nor B occuring = (1 - {s2PA})<sup>{s2RepeatA}</sup> × (1 - {s2PB})<sup>{s2RepeatB}</sup> = <strong>{s2Result.pNeither.toFixed(8)}</strong></p>
              <p>Probability of both A and B occuring = (1 - (1 - {s2PA})<sup>{s2RepeatA}</sup>) × (1 - (1 - {s2PB})<sup>{s2RepeatB}</sup>) = <strong>{s2Result.pBothAtLeastOne.toFixed(8)}</strong></p>
              <p>Probability of A occuring {s2RepeatA} times but not B = {s2PA}<sup>{s2RepeatA}</sup> × (1 - {s2PB})<sup>{s2RepeatB}</sup> = <strong>{s2Result.pAExactNotB.toFixed(8)}</strong></p>
              <p>Probability of B occuring {s2RepeatB} times but not A = (1 - {s2PA})<sup>{s2RepeatA}</sup> × {s2PB}<sup>{s2RepeatB}</sup> = <strong>{s2Result.pBExactNotA.toFixed(8)}</strong></p>
              <p>Probability of A occuring but not B = (1 - (1 - {s2PA})<sup>{s2RepeatA}</sup>) × (1 - {s2PB})<sup>{s2RepeatB}</sup> = <strong>{s2Result.pAAtLeastOneNotB.toFixed(8)}</strong></p>
              <p>Probability of B occuring but not A = (1 - {s2PA})<sup>{s2RepeatA}</sup> × (1 - (1 - {s2PB})<sup>{s2RepeatB}</sup>) = <strong>{s2Result.pBExactNotA.toFixed(8)}</strong></p>
            </div>
          </div>
        )}
      </section>


      {/* ========================================================================= */}
      {/* SECTION 3: PROBABILITY OF A NORMAL DISTRIBUTION */}
      {/* ========================================================================= */}
      <section className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-5 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Probability of a Normal Distribution
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Use the calculator below to find the area P shown in the normal distribution, as well as the confidence intervals for a range of confidence levels.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Form Inputs */}
          <form onSubmit={handleS3Calculate} className="md:col-span-7 space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between gap-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Mean: (μ)</label>
              <input
                type="text"
                value={s3Mean}
                onChange={(e) => setS3Mean(e.target.value)}
                className="w-32 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="flex items-center justify-between gap-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Standard Deviation (σ):</label>
              <input
                type="text"
                value={s3StdDev}
                onChange={(e) => setS3StdDev(e.target.value)}
                className="w-32 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Left Bound (L<sub>b</sub>):</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={s3LeftBound}
                  onChange={(e) => setS3LeftBound(e.target.value)}
                  className="w-32 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
                />
                <span className="text-[10px] text-slate-500 shrink-0">For negative infinite, use -inf</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Right Bound (R<sub>b</sub>):</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={s3RightBound}
                  onChange={(e) => setS3RightBound(e.target.value)}
                  className="w-32 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 text-xs font-sans tabular-nums font-semibold outline-none focus:ring-1 focus:ring-blue-600"
                />
                <span className="text-[10px] text-slate-500 shrink-0">For positive infinite, use inf</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded px-4 py-1.5 transition-colors flex items-center justify-center text-center cursor-pointer"
              >
                Calculate
              </button>

              <button
                type="button"
                onClick={handleS3Clear}
                className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded px-4 py-1.5 transition-colors cursor-pointer"
              >
                Clear
              </button>
            </div>
          </form>

          {/* Right SVG Graphic */}
          <div className="md:col-span-5 flex justify-center items-center p-3 bg-slate-50 dark:bg-slate-800/40 rounded border border-slate-200 dark:border-slate-700">
            <NormalCurveSVG
              mean={s3Result?.norm.mean ?? 0}
              stdDev={s3Result?.norm.stdDev ?? 1}
              leftBound={s3Result?.norm.leftBound ?? -1}
              rightBound={s3Result?.norm.rightBound ?? 1}
            />
          </div>
        </div>

        {/* Section 3 Results */}
        {s3Result && (
          <div className="space-y-4 pt-2">
            <div className="border border-blue-600 rounded overflow-hidden max-w-xl">
              <div className="bg-blue-600 text-white font-bold text-xs px-3 py-1.5">
                Result
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 text-xs font-sans space-y-2">
                <p>The probability between {s3Result.norm.leftBoundStr} and {s3Result.norm.rightBoundStr} is <strong className="text-blue-700 dark:text-blue-400 font-sans tabular-nums font-bold">{s3Result.norm.probBetween.toFixed(5)}</strong></p>
                <p>The probability outside of {s3Result.norm.leftBoundStr} and {s3Result.norm.rightBoundStr} is 1 - {s3Result.norm.probBetween.toFixed(5)} = <strong className="font-sans tabular-nums font-bold">{s3Result.norm.probOutside.toFixed(5)}</strong></p>
                <p>The probability of {s3Result.norm.leftBoundStr} or less (≤{s3Result.norm.leftBoundStr}) is <strong className="font-sans tabular-nums font-bold">{s3Result.norm.probLessEqualLeft.toFixed(5)}</strong></p>
                <p>The probability of {s3Result.norm.rightBoundStr} or more (≥{s3Result.norm.rightBoundStr}) is <strong className="font-sans tabular-nums font-bold">{s3Result.norm.probGreaterEqualRight.toFixed(5)}</strong></p>
              </div>
            </div>

            {/* Confidence Intervals Table */}
            <div className="space-y-2 max-w-xl">
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                Confidence Intervals Table:
              </h3>
              <div className="overflow-x-auto border border-slate-300 dark:border-slate-700 rounded">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700 font-bold">
                      <th className="p-1.5 border-r border-slate-300 dark:border-slate-700">Confidence</th>
                      <th className="p-1.5 border-r border-slate-300 dark:border-slate-700">Range</th>
                      <th className="p-1.5">n</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-sans tabular-nums font-medium">
                    {s3Result.confTable.map((row, i) => (
                      <tr key={i} className={i % 2 === 1 ? "bg-slate-50/50 dark:bg-slate-800/30" : ""}>
                        <td className="p-1.5 border-r border-slate-200 dark:border-slate-800">{row.confidenceStr}</td>
                        <td className="p-1.5 border-r border-slate-200 dark:border-slate-800">{row.rangeStr}</td>
                        <td className="p-1.5">{row.nValue.toString().slice(0, 14)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </section>

    </div>
  );
}
