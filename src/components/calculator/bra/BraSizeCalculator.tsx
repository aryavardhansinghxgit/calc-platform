"use client";

import React, { useState, useMemo } from "react";
import {
  Heart,
  Ruler,
  HelpCircle,
  Sparkles,
  Copy,
  Check,
  Globe,
  Layers,
  Sliders,
  X,
  Printer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BraUnit,
  RegionStandard,
  BreastShape,
  BraSizeCalculationResult,
} from "@/app/calculators/bra-size-calculator/types";
import { calculateBraSize } from "@/app/calculators/bra-size-calculator/calculator";
import { ReportModal } from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

export function BraSizeCalculator() {
  // Unit & Region
  const [unit, setUnit] = useState<BraUnit>("in");
  const [region, setRegion] = useState<RegionStandard>("US");

  // Inputs
  const [underbust, setUnderbust] = useState<number>(30);
  const [bust, setBust] = useState<number>(34);
  const [shape, setShape] = useState<BreastShape>("even");

  // UI Modals
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Seamless real-time unit converter toggle handler
  const handleUnitToggle = (newUnit: BraUnit) => {
    if (newUnit === unit) return;
    if (newUnit === "cm") {
      setUnderbust(parseFloat((underbust * 2.54).toFixed(1)));
      setBust(parseFloat((bust * 2.54).toFixed(1)));
    } else {
      setUnderbust(parseFloat((underbust / 2.54).toFixed(1)));
      setBust(parseFloat((bust / 2.54).toFixed(1)));
    }
    setUnit(newUnit);
  };

  // Perform calculations dynamically
  const result: BraSizeCalculationResult = useMemo(() => {
    return calculateBraSize(underbust, bust, unit, region, shape);
  }, [underbust, bust, unit, region, shape]);

  // Copy Fit Profile text to clipboard
  const handleCopyProfile = () => {
    const text = `CalcPlatform Bra Fit Profile:
Primary Calculated Size (${region}): ${result.primarySize}
Underbust: ${underbust} ${unit} | Bust: ${bust} ${unit}
International Sizes: US ${result.multiSystem.us} | UK ${result.multiSystem.uk} | IN ${result.multiSystem.in} | EU ${result.multiSystem.eu} | FR ${result.multiSystem.fr} | AU ${result.multiSystem.au}
Sister Sizes: ${result.sisterSizes.map((s) => s.size).join(" / ")}
Shape Guidance: ${result.shapeAdvice}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Build Report Modal Data
  const reportData: CalculatorReportData = useMemo(() => {
    return {
      meta: {
        reportTitle: "Bra Size & International Fitting Report",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        calculatorName: "Bra Size Calculator",
      },
      keyMetrics: [
        { label: `Primary Bra Size (${region})`, value: result.primarySize, highlight: true },
        { label: "US / CAN Size", value: result.multiSystem.us },
        { label: "UK Size", value: result.multiSystem.uk },
        { label: "India / Asia Size", value: result.multiSystem.in },
        { label: "EU / International Size", value: result.multiSystem.eu },
      ],
      sections: [
        {
          title: "Sister Size Alternatives",
          items: result.sisterSizes.map((s, i) => ({
            label: `Option ${i + 1} (${s.size})`,
            value: `${s.bandAdjustment}, ${s.cupAdjustment}. (${s.fitGuidance})`,
          })),
        },
        {
          title: "Personalized Bra Style Recommendations",
          items: result.recommendedStyles.map((st) => ({
            label: st.styleName,
            value: `${st.description} (Ideal for: ${st.idealFor})`,
          })),
        },
        {
          title: "Breast Shape Fitting Advice",
          items: [{ label: "Profile Guidance", value: result.shapeAdvice }],
        },
      ],
      table: {
        title: "International Size Standards",
        headers: [
          { key: "region", label: "Region" },
          { key: "size", label: "Calculated Size" },
          { key: "band", label: "Band System" },
          { key: "cup", label: "Cup System" },
        ],
        rows: [
          { region: "United States / Canada", size: result.multiSystem.us, band: `${result.bandSizeInches}" Band`, cup: result.multiSystem.cupLetterUS },
          { region: "United Kingdom", size: result.multiSystem.uk, band: `${result.bandSizeInches}" Band`, cup: result.multiSystem.cupLetterUK },
          { region: "India / Asia", size: result.multiSystem.in, band: `${result.bandSizeInches}" Band`, cup: result.multiSystem.cupLetterUK },
          { region: "European Union (EN 13402)", size: result.multiSystem.eu, band: `EU ${result.multiSystem.eu.replace(/[A-Z]/g, "")}`, cup: result.multiSystem.cupLetterEU },
          { region: "France / Spain / Portugal", size: result.multiSystem.fr, band: `FR ${result.multiSystem.fr.replace(/[A-Z]/g, "")}`, cup: result.multiSystem.cupLetterEU },
          { region: "Australia / New Zealand", size: result.multiSystem.au, band: `AU ${result.multiSystem.au.replace(/[A-Z]/g, "")}`, cup: result.multiSystem.cupLetterUK },
        ],
      },
      notes: [
        "80% of bra support comes from a snug, horizontal band across the ribcage.",
        "Re-measure your bra size every 6 to 12 months or after weight fluctuations.",
      ],
    };
  }, [result, underbust, bust, unit, region]);

  return (
    <div className="space-y-6">
      {/* 1. TOP STEP WORKSPACE CARD */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Ruler className="h-5 w-5 text-rose-500" />
            <h2 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100">
              Interactive Bra Fit & Measurement Dashboard
            </h2>
          </div>

          <button
            onClick={() => setShowGuideModal(true)}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 dark:text-rose-400 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 cursor-pointer transition-all hover:scale-[1.02]"
          >
            <HelpCircle className="h-3.5 w-3.5" /> How to Measure Guide
          </button>
        </div>

        {/* STEP 1: UNIT & REGION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Measurement Unit
            </label>
            <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-200/70 dark:border-zinc-700">
              <button
                onClick={() => handleUnitToggle("in")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  unit === "in" ? "bg-white dark:bg-zinc-900 text-rose-600 shadow-xs" : "text-zinc-500"
                }`}
              >
                Inches (in)
              </button>
              <button
                onClick={() => handleUnitToggle("cm")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  unit === "cm" ? "bg-white dark:bg-zinc-900 text-rose-600 shadow-xs" : "text-zinc-500"
                }`}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Primary Sizing Region
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value as RegionStandard)}
              className="w-full h-9 text-xs font-bold px-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl cursor-pointer"
            >
              <option value="US">US / Canada (US)</option>
              <option value="UK">United Kingdom (UK)</option>
              <option value="IN">India / Asia (IN)</option>
              <option value="EU">European Union (EU - EN 13402)</option>
              <option value="FR">France / Spain / Portugal (FR)</option>
              <option value="AU">Australia / New Zealand (AU)</option>
            </select>
          </div>
        </div>

        {/* STEP 2: MEASUREMENTS & LINE PICTURE DIAGRAM */}
        <div className="flex flex-col lg:flex-row items-center gap-5 pt-2">
          {/* Inputs Section */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {/* Underbust Input */}
            <div className="space-y-2 bg-zinc-50 dark:bg-zinc-800/50 p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-700">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                  <span className="w-4 h-4 bg-rose-100 dark:bg-rose-950 text-rose-600 rounded-full text-[10px] flex items-center justify-center font-bold">1</span>
                  <span>Underbust (Band Size)</span>
                </label>
                <span className="text-[11px] font-mono text-zinc-400">
                  {unit === "in" ? `${underbust} in` : `${underbust} cm`}
                </span>
              </div>
              <Input
                type="number"
                value={underbust}
                onChange={(e) => setUnderbust(Number(e.target.value))}
                step={unit === "in" ? 0.5 : 1}
                min={unit === "in" ? 22 : 55}
                max={unit === "in" ? 60 : 150}
                className="h-10 text-sm font-mono font-bold bg-white dark:bg-zinc-900 border-zinc-200"
              />
              <p className="text-[10px] text-zinc-500 leading-tight">
                Measure snugly around your ribcage directly underneath your breasts.
              </p>
            </div>

            {/* Bust Input */}
            <div className="space-y-2 bg-zinc-50 dark:bg-zinc-800/50 p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-700">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                  <span className="w-4 h-4 bg-rose-100 dark:bg-rose-950 text-rose-600 rounded-full text-[10px] flex items-center justify-center font-bold">2</span>
                  <span>Bust (Overbust)</span>
                </label>
                <span className="text-[11px] font-mono text-zinc-400">
                  {unit === "in" ? `${bust} in` : `${bust} cm`}
                </span>
              </div>
              <Input
                type="number"
                value={bust}
                onChange={(e) => setBust(Number(e.target.value))}
                step={unit === "in" ? 0.5 : 1}
                min={unit === "in" ? 24 : 60}
                max={unit === "in" ? 70 : 180}
                className="h-10 text-sm font-mono font-bold bg-white dark:bg-zinc-900 border-zinc-200 text-rose-600 dark:text-rose-400"
              />
              <p className="text-[10px] text-zinc-500 leading-tight">
                Measure gently around the fullest part of your bust while standing straight.
              </p>
            </div>
          </div>

          {/* Competitor Line Art Diagram (Body Shape Lines) */}
          <div className="w-full lg:w-80 shrink-0 bg-slate-50/90 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 p-4 rounded-2xl flex flex-col items-center justify-between text-center space-y-2 shadow-2xs">
            <svg viewBox="0 0 300 150" className="w-full h-32 fill-none" strokeLinecap="round" strokeLinejoin="round">
              {/* Torso Line Art Drawing (Right Side) */}
              <g className="stroke-slate-600 dark:stroke-slate-300" strokeWidth="2.2">
                {/* Neckline */}
                <path d="M 205 18 C 220 30, 240 30, 255 18" />
                {/* Shoulders & Upper Body */}
                <path d="M 182 32 C 196 20, 264 20, 278 32 L 298 52 C 290 60, 280 58, 272 52 L 272 135 M 182 32 L 162 52 C 170 60, 180 58, 188 52 L 188 135" strokeWidth="2.2" className="stroke-slate-500 dark:stroke-slate-400" />
                {/* Breasts Outline */}
                <path d="M 188 52 C 192 88, 226 90, 230 72 C 234 90, 268 88, 272 52" strokeWidth="2.2" />
                {/* Underbust Fold */}
                <path d="M 190 85 C 200 90, 218 90, 230 85 C 242 90, 260 90, 270 85" strokeWidth="1.6" className="stroke-slate-400 dark:stroke-slate-500" />
              </g>

              {/* Guide Line 1: Bust Size (Dotted) */}
              <text x="12" y="56" className="text-[13px] fill-slate-800 dark:fill-slate-100 font-extrabold font-sans">bust size</text>
              <line x1="82" y1="52" x2="272" y2="52" strokeDasharray="5 4" className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="2.2" />

              {/* Guide Line 2: Band Size (Solid) */}
              <text x="12" y="90" className="text-[13px] fill-slate-800 dark:fill-slate-100 font-extrabold font-sans">band size</text>
              <line x1="86" y1="86" x2="272" y2="86" className="stroke-rose-700 dark:stroke-rose-300" strokeWidth="2.8" />
            </svg>

            <span className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 tracking-wider uppercase">
              Tape Measuring Placement Guide
            </span>
          </div>
        </div>

        {/* STEP 3: BREAST SHAPE PROFILE */}
        <div className="space-y-2 pt-1">
          <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
            <Sliders className="h-3.5 w-3.5 text-purple-600" />
            <span>Breast Shape & Fit Profile (Optional Fine-Tuning)</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
            {[
              { id: "even", label: "Even / Standard" },
              { id: "shallow", label: "Shallow Root" },
              { id: "projected", label: "Projected" },
              { id: "asymmetrical", label: "Asymmetrical" },
              { id: "bell", label: "Bell Shape" },
              { id: "teardrop", label: "Teardrop" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setShape(item.id as BreastShape)}
                className={`p-2 rounded-xl border text-[11px] font-bold text-center transition-all cursor-pointer ${
                  shape === item.id
                    ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                    : "bg-zinc-50 dark:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-purple-300"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. RESULTS DASHBOARD CARD (LAYOUT SWAPPED: Left Matrix (Col 7), Right Pink Result Card (Col 5)) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left Column: International Sizing Matrix Table (Col 7) */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-4 flex flex-col justify-between">
          <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
            <Globe className="h-4 w-4 text-blue-600" />
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              International Bra Size Conversion Matrix
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-mono">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-800/60 font-bold text-zinc-600 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-700">
                  <th className="p-2.5 font-sans">Region</th>
                  <th className="p-2.5">Calculated Size</th>
                  <th className="p-2.5">Band</th>
                  <th className="p-2.5">Cup</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                <tr className={region === "US" ? "bg-rose-50/60 dark:bg-rose-950/30 font-bold" : ""}>
                  <td className="p-2.5 font-sans">US / Canada</td>
                  <td className="p-2.5 text-rose-600 dark:text-rose-400 font-bold">{result.multiSystem.us}</td>
                  <td className="p-2.5">{result.bandSizeInches}"</td>
                  <td className="p-2.5">{result.multiSystem.cupLetterUS}</td>
                </tr>
                <tr className={region === "UK" ? "bg-rose-50/60 dark:bg-rose-950/30 font-bold" : ""}>
                  <td className="p-2.5 font-sans">United Kingdom (UK)</td>
                  <td className="p-2.5 text-blue-600 dark:text-blue-400 font-bold">{result.multiSystem.uk}</td>
                  <td className="p-2.5">{result.bandSizeInches}"</td>
                  <td className="p-2.5">{result.multiSystem.cupLetterUK}</td>
                </tr>
                <tr className={region === "IN" ? "bg-rose-50/60 dark:bg-rose-950/30 font-bold" : ""}>
                  <td className="p-2.5 font-sans font-bold text-amber-700 dark:text-amber-300">India / Asia (IN)</td>
                  <td className="p-2.5 text-amber-600 dark:text-amber-400 font-bold">{result.multiSystem.in}</td>
                  <td className="p-2.5">{result.bandSizeInches}"</td>
                  <td className="p-2.5">{result.multiSystem.cupLetterUK}</td>
                </tr>
                <tr className={region === "EU" ? "bg-rose-50/60 dark:bg-rose-950/30 font-bold" : ""}>
                  <td className="p-2.5 font-sans">Europe (EU - EN 13402)</td>
                  <td className="p-2.5 text-purple-600 dark:text-purple-400 font-bold">{result.multiSystem.eu}</td>
                  <td className="p-2.5">{result.multiSystem.eu.replace(/[A-Z]/g, "")} cm</td>
                  <td className="p-2.5">{result.multiSystem.cupLetterEU}</td>
                </tr>
                <tr className={region === "FR" ? "bg-rose-50/60 dark:bg-rose-950/30 font-bold" : ""}>
                  <td className="p-2.5 font-sans">France / Spain (FR)</td>
                  <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold">{result.multiSystem.fr}</td>
                  <td className="p-2.5">{result.multiSystem.fr.replace(/[A-Z]/g, "")} cm</td>
                  <td className="p-2.5">{result.multiSystem.cupLetterEU}</td>
                </tr>
                <tr className={region === "AU" ? "bg-rose-50/60 dark:bg-rose-950/30 font-bold" : ""}>
                  <td className="p-2.5 font-sans">Australia / NZ (AU)</td>
                  <td className="p-2.5 text-indigo-600 dark:text-indigo-400 font-bold">{result.multiSystem.au}</td>
                  <td className="p-2.5">AU {result.multiSystem.au.replace(/[A-Z]/g, "")}</td>
                  <td className="p-2.5">{result.multiSystem.cupLetterUK}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Primary Size Pink Card (Col 5) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-rose-500 to-pink-600 text-white p-6 rounded-2xl shadow-md flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-100 flex items-center gap-1.5">
              <Heart className="h-4 w-4 fill-white" /> Calculated Bra Size ({region})
            </span>
            <div className="text-5xl font-black tracking-tight font-mono">
              {result.primarySize}
            </div>
            <p className="text-xs text-rose-100 leading-relaxed pt-1">
              Band Size: <strong>{result.bandSizeInches}"</strong> | Bust Difference: <strong>{result.diffInches}"</strong>
            </p>
          </div>

          {/* Quick Shape Advice */}
          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/20 space-y-1">
            <span className="text-[10px] font-bold uppercase text-rose-200 block">Fit Advice</span>
            <p className="text-xs text-white leading-relaxed">
              {result.shapeAdvice}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/20">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopyProfile}
              className="h-8 text-xs bg-white text-rose-700 hover:bg-rose-50 border-0 cursor-pointer font-bold gap-1"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied Fit Profile" : "Copy Fit Profile"}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowReportModal(true)}
              className="h-8 text-xs bg-white/20 text-white hover:bg-white/30 border-white/30 cursor-pointer font-bold gap-1"
            >
              <Printer className="h-3.5 w-3.5" /> PDF Report
            </Button>
          </div>
        </div>
      </div>

      {/* 3. SISTER SIZE FINDER CARD */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
          <Layers className="h-4 w-4 text-purple-600" />
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Sister Size Finder (Equivalent Cup Volume Alternatives)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {result.sisterSizes.map((sister, i) => (
            <div
              key={i}
              className="p-4 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-black font-mono text-purple-600 dark:text-purple-400">
                  Sister Size: {sister.size}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                  Equal Volume
                </span>
              </div>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                <strong>Adjustments:</strong> {sister.bandAdjustment} | {sister.cupAdjustment}
              </p>
              <p className="text-[11px] text-zinc-500 leading-relaxed italic">
                "{sister.fitGuidance}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. BRA STYLE RECOMMENDATIONS */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2">
          <Sparkles className="h-4 w-4 text-amber-500" />
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Recommended Bra Style Cuts for Your Profile
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {result.recommendedStyles.map((st, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 rounded-xl space-y-1.5 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-xs">{st.styleName}</h4>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-tight">
                  {st.description}
                </p>
              </div>
              <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-700/60 text-[10px]">
                <span className="text-zinc-400 font-bold block">Support: {st.supportLevel}</span>
                <span className="text-rose-600 dark:text-rose-400 font-medium block">Best for: {st.idealFor}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. VISUAL MEASUREMENT GUIDE MODAL */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 max-w-lg w-full rounded-2xl p-6 space-y-4 shadow-xl relative">
            <button
              onClick={() => setShowGuideModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 text-rose-600">
              <Ruler className="h-5 w-5" />
              <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100">
                Visual Bra Measurement Guide
              </h3>
            </div>

            <div className="space-y-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              <div className="p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-xl space-y-1">
                <h4 className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1">
                  Step 1: Underbust (Band Measurement)
                </h4>
                <p>
                  Wrap a flexible measuring tape directly underneath your breasts around your ribcage. Pull the tape <strong>snug</strong> (exhale completely) and ensure the tape is level and parallel to the floor across your back.
                </p>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-xl space-y-1">
                <h4 className="font-bold text-blue-800 dark:text-blue-300 flex items-center gap-1">
                  Step 2: Bust (Overbust Measurement)
                </h4>
                <p>
                  Wrap the measuring tape around the fullest part of your breasts (usually across the nipples). Hold the tape <strong>gently</strong> without compressing breast tissue. Stand upright with arms relaxed at your sides.
                </p>
              </div>

              <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl space-y-1">
                <h4 className="font-bold text-zinc-800 dark:text-zinc-200">
                  Pro Tips for Maximum Accuracy
                </h4>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                  <li>Wear an unpadded, non-push-up bra while measuring.</li>
                  <li>If your breasts are projected or soft, lean forward 45 degrees while measuring your bust.</li>
                  <li>Round underbust to the nearest whole inch or centimeter.</li>
                </ul>
              </div>
            </div>

            <Button
              onClick={() => setShowGuideModal(false)}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold cursor-pointer"
            >
              Got it, back to calculator
            </Button>
          </div>
        </div>
      )}

      {/* REPORT MODAL */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        data={reportData}
      />
    </div>
  );
}
