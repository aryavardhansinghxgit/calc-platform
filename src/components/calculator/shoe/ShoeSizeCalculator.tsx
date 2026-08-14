"use client";

import React, { useState, useMemo } from "react";
import {
  Footprints,
  Ruler,
  Globe,
  Tag,
  Check,
  Share2,
  Printer,
  Download,
  Info,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShoeGender,
  ShoeBrand,
  UnitSystem,
  ShoeSizeConversionResult,
} from "@/app/calculators/shoe-size-calculator/types";
import {
  calculateShoeSize,
  calculateInternationalSizes,
} from "@/app/calculators/shoe-size-calculator/calculator";
import { ReportModal } from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";

export function ShoeSizeCalculator() {
  // Active Tab
  const [activeTab, setActiveTab] = useState<"dimensions" | "converter" | "brand">("dimensions");

  // Tab 1: Dimensions State
  const [unit, setUnit] = useState<UnitSystem>("in");
  const [gender, setGender] = useState<ShoeGender>("men");

  // Bilateral Foot Measurements
  const [leftLength, setLeftLength] = useState<number>(10.0);
  const [rightLength, setRightLength] = useState<number>(9.9);
  const [leftWidth, setLeftWidth] = useState<number>(3.8);
  const [rightWidth, setRightWidth] = useState<number>(3.7);

  // Tab 2: Direct Converter State
  const [convInputSystem, setConvInputSystem] = useState<"us_men" | "us_women" | "uk" | "india" | "eu" | "cm">("us_men");
  const [convValue, setConvValue] = useState<number>(9.5);

  // Tab 3: Brand & Kids State
  const [selectedBrand, setSelectedBrand] = useState<ShoeBrand>("nike");
  const [kidAgeMonths, setKidAgeMonths] = useState<number>(36);

  // Modals & Share State
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Calculate Dimension-based Fit Profile
  const dimensionResult: ShoeSizeConversionResult = useMemo(() => {
    return calculateShoeSize(
      leftLength,
      rightLength,
      leftWidth,
      rightWidth,
      unit,
      gender,
      selectedBrand,
      kidAgeMonths
    );
  }, [leftLength, rightLength, leftWidth, rightWidth, unit, gender, selectedBrand, kidAgeMonths]);

  // Convert Direct Conversion Input to Inches
  const convInches = useMemo(() => {
    if (convInputSystem === "cm") return convValue / 2.54;
    if (convInputSystem === "eu") return (convValue / 1.5 - 1.5) / 2.54;
    if (convInputSystem === "uk" || convInputSystem === "india") return (convValue + 23) / 3;
    if (convInputSystem === "us_women") return (convValue + 20) / 3;
    return (convValue + 21.5) / 3;
  }, [convInputSystem, convValue]);

  const convertedMatrix = useMemo(() => {
    return calculateInternationalSizes(Math.max(4, convInches), gender);
  }, [convInches, gender]);

  // Copy Fit Summary
  const handleCopySummary = () => {
    let text = `👟 CalcPlatform Fit Profile:\n`;
    text += `Foot Length: ${dimensionResult.usedFootLengthInches} in (${dimensionResult.usedFootLengthCm} cm)\n`;
    text += `US Men: ${dimensionResult.internationalSizes.usMen} | US Women: ${dimensionResult.internationalSizes.usWomen}\n`;
    text += `India / UK: IND ${dimensionResult.internationalSizes.india} | EU: ${dimensionResult.internationalSizes.eu} | JP: ${dimensionResult.internationalSizes.japanCm} cm\n`;
    text += `Width Grade: ${dimensionResult.widthCategory}\n`;
    if (dimensionResult.brandFit) {
      text += `Brand Tuned (${dimensionResult.brandFit.brandName}): US ${dimensionResult.brandFit.recommendedSizeUs} (${dimensionResult.brandFit.fitNote})\n`;
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Report Modal Data
  const reportData: CalculatorReportData = useMemo(() => {
    return {
      meta: {
        reportTitle: "Personalized Shoe Size & Fit Profile",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        calculatorName: "Shoe Size Calculator",
      },
      keyMetrics: [
        {
          label: gender === "women" ? "US Women's Size" : gender === "kids" ? "US Kids' Size" : "US Men's Size",
          value: String(
            gender === "women"
              ? dimensionResult.internationalSizes.usWomen
              : gender === "kids"
              ? dimensionResult.internationalSizes.usKids
              : dimensionResult.internationalSizes.usMen
          ),
          highlight: true,
        },
        { label: "India (IND) / UK Size", value: String(dimensionResult.internationalSizes.india) },
        { label: "EU (Paris Point)", value: String(dimensionResult.internationalSizes.eu) },
        { label: "Width Profile", value: dimensionResult.widthCategory },
      ],
      sections: [
        {
          title: "Foot Measurement & Asymmetry Details",
          items: [
            { label: "Fitted Foot Length", value: `${dimensionResult.usedFootLengthInches} in (${dimensionResult.usedFootLengthCm} cm)` },
            { label: "Bilateral Status", value: dimensionResult.isBilateralUsed ? "2-Foot Asymmetry Detected (Fitted to Larger Foot)" : "Symmetrical Feet" },
            { label: "Selected Target Category", value: gender.toUpperCase() },
          ],
        },
        {
          title: "International Conversion Matrix",
          items: [
            { label: "India (IND / BIS Standard)", value: String(dimensionResult.internationalSizes.india) },
            { label: "US & Canada Men", value: String(dimensionResult.internationalSizes.usMen) },
            { label: "US & Canada Women", value: String(dimensionResult.internationalSizes.usWomen) },
            { label: "UK Size", value: String(dimensionResult.internationalSizes.uk) },
            { label: "EU Paris Point", value: String(dimensionResult.internationalSizes.eu) },
            { label: "Japan / East Asia", value: `${dimensionResult.internationalSizes.japanCm} cm (${dimensionResult.internationalSizes.mondopointMm} Mondopoint)` },
            { label: "Mexico", value: String(dimensionResult.internationalSizes.mexico) },
            { label: "Australia", value: String(dimensionResult.internationalSizes.australia) },
          ],
        },
        {
          title: "Brand-Specific Fit Recommendation",
          items: [
            { label: "Target Brand", value: dimensionResult.brandFit?.brandName || "Standard" },
            { label: "Recommended Brand Size", value: `US ${dimensionResult.brandFit?.recommendedSizeUs}` },
            { label: "Brand Fit Note", value: dimensionResult.brandFit?.fitNote || "Fits true to size." },
          ],
        },
      ],
      table: {
        title: "International Size Equivalents Table",
        headers: [
          { key: "region", label: "Region / Scale" },
          { key: "size", label: "Converted Size" },
        ],
        rows: [
          { region: "India (IND)", size: dimensionResult.internationalSizes.india },
          { region: "US Men", size: dimensionResult.internationalSizes.usMen },
          { region: "US Women", size: dimensionResult.internationalSizes.usWomen },
          { region: "US Kids", size: dimensionResult.internationalSizes.usKids },
          { region: "UK", size: dimensionResult.internationalSizes.uk },
          { region: "EU (Paris Point)", size: dimensionResult.internationalSizes.eu },
          { region: "Japan (CM)", size: `${dimensionResult.internationalSizes.japanCm} cm` },
          { region: "Mondopoint (MM)", size: `${dimensionResult.internationalSizes.mondopointMm} mm` },
          { region: "Mexico", size: dimensionResult.internationalSizes.mexico },
          { region: "Australia", size: dimensionResult.internationalSizes.australia },
        ],
      },
    };
  }, [dimensionResult, gender]);

  return (
    <div className="space-y-6">
      {/* 1. TOP TAB NAVIGATION BAR */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-200/70 dark:border-zinc-700">
          <button
            onClick={() => setActiveTab("dimensions")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "dimensions"
                ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-xs"
                : "text-zinc-500"
            }`}
          >
            <Ruler className="h-3.5 w-3.5" /> Measure by Dimensions
          </button>

          <button
            onClick={() => setActiveTab("converter")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "converter"
                ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-xs"
                : "text-zinc-500"
            }`}
          >
            <Globe className="h-3.5 w-3.5" /> International Converter
          </button>

          <button
            onClick={() => setActiveTab("brand")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "brand"
                ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-xs"
                : "text-zinc-500"
            }`}
          >
            <Tag className="h-3.5 w-3.5" /> Brand Fit & Kids Growth
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            onClick={handleCopySummary}
            variant="outline"
            size="sm"
            className="h-8 text-xs font-bold gap-1 cursor-pointer"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Share Fit"}
          </Button>

          <Button
            onClick={() => setShowReportModal(true)}
            variant="outline"
            size="sm"
            className="h-8 text-xs font-bold gap-1 cursor-pointer bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200"
          >
            <Printer className="h-3.5 w-3.5" /> PDF Profile
          </Button>
        </div>
      </div>

      {/* 2. TAB 1: MEASURE BY FOOT DIMENSIONS */}
      {activeTab === "dimensions" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* LEFT INPUTS (Col 7) */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-5">
            {/* Top Toolbar: Gender & Unit */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl text-xs font-bold">
                {(["men", "women", "kids"] as ShoeGender[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={`px-3 py-1.5 rounded-lg capitalize cursor-pointer transition-all ${
                      gender === g
                        ? "bg-white dark:bg-zinc-900 text-emerald-600 shadow-xs"
                        : "text-zinc-500"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>

              {/* Unit Toggle */}
              <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl text-xs font-bold">
                {(["in", "cm", "mm"] as UnitSystem[]).map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnit(u)}
                    className={`px-3 py-1.5 rounded-lg uppercase cursor-pointer transition-all ${
                      unit === u
                        ? "bg-white dark:bg-zinc-900 text-emerald-600 shadow-xs"
                        : "text-zinc-500"
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>

            {/* Bilateral Foot Measurement Inputs */}
            <div className="space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                <Footprints className="h-4 w-4 text-emerald-600" /> Bilateral Foot Measurements ({unit})
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Left Foot */}
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-3">
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block">Left Foot</span>
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-zinc-500 font-medium">Heel-to-Toe Length</label>
                    <Input
                      type="number"
                      value={leftLength}
                      onChange={(e) => setLeftLength(Number(e.target.value))}
                      step={unit === "in" ? 0.1 : 0.5}
                      className="h-9 text-xs font-mono font-bold bg-white dark:bg-zinc-900"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-zinc-500 font-medium">Joint Width (Optional)</label>
                    <Input
                      type="number"
                      value={leftWidth}
                      onChange={(e) => setLeftWidth(Number(e.target.value))}
                      step={unit === "in" ? 0.1 : 0.5}
                      className="h-9 text-xs font-mono font-bold bg-white dark:bg-zinc-900"
                    />
                  </div>
                </div>

                {/* Right Foot */}
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-3">
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block">Right Foot</span>
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-zinc-500 font-medium">Heel-to-Toe Length</label>
                    <Input
                      type="number"
                      value={rightLength}
                      onChange={(e) => setRightLength(Number(e.target.value))}
                      step={unit === "in" ? 0.1 : 0.5}
                      className="h-9 text-xs font-mono font-bold bg-white dark:bg-zinc-900"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-zinc-500 font-medium">Joint Width (Optional)</label>
                    <Input
                      type="number"
                      value={rightWidth}
                      onChange={(e) => setRightWidth(Number(e.target.value))}
                      step={unit === "in" ? 0.1 : 0.5}
                      className="h-9 text-xs font-mono font-bold bg-white dark:bg-zinc-900"
                    />
                  </div>
                </div>
              </div>

              {dimensionResult.largerFootNote && (
                <p className="text-xs text-amber-600 dark:text-amber-400 font-medium bg-amber-50 dark:bg-amber-950/30 p-2.5 rounded-lg border border-amber-200 dark:border-amber-900">
                  {dimensionResult.largerFootNote}
                </p>
              )}
            </div>

            {/* INTERACTIVE VISUAL MEASUREMENT GUIDE VECTOR CARD */}
            <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-xl space-y-3 text-xs">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                <Info className="h-4 w-4 text-emerald-600" /> At-Home Measurement Technique
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                <div className="sm:col-span-8 space-y-1 text-zinc-700 dark:text-zinc-300 text-[11px]">
                  <p>1. Stand on paper with heel against a flat wall in your normal socks.</p>
                  <p>2. Mark the tip of your longest toe and widest ball points with a vertical pen.</p>
                  <p>3. Measure the distance with a ruler and add 10–12 mm for toe box allowance.</p>
                </div>
                <div className="sm:col-span-4 flex justify-center">
                  <svg viewBox="0 0 160 90" className="w-full h-auto max-w-[140px] stroke-emerald-600 fill-none" strokeWidth="2">
                    <line x1="20" y1="10" x2="20" y2="80" strokeDasharray="3 3" stroke="#059669" />
                    <path d="M 20 45 C 35 30, 70 25, 110 30 C 135 35, 145 45, 140 55 C 135 65, 110 65, 70 65 C 35 65, 20 60, 20 45 Z" fill="#d1fae5" opacity="0.5" />
                    <line x1="20" y1="75" x2="140" y2="75" stroke="#059669" />
                    <text x="70" y="86" fontSize="9" fill="#047857" textAnchor="middle" fontFamily="sans-serif">Heel to Toe</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT RESULT CARD (Col 5) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white p-6 rounded-2xl shadow-md space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/20 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">
                  Calculated Fit Profile ({gender.toUpperCase()})
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                  ISO 9407 / Barleycorn
                </span>
              </div>

              {/* Primary Converted Size */}
              <div className="space-y-1">
                <div className="text-6xl font-black font-mono tracking-tight text-white">
                  {gender === "women"
                    ? dimensionResult.internationalSizes.usWomen
                    : gender === "kids"
                    ? dimensionResult.internationalSizes.usKids
                    : dimensionResult.internationalSizes.usMen}
                </div>
                <p className="text-xs text-emerald-100 font-medium">
                  US Recommended Size ({dimensionResult.usedFootLengthInches} in / {dimensionResult.usedFootLengthCm} cm)
                </p>
              </div>

              {/* Width Rating */}
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/20 space-y-1 text-xs">
                <span className="text-[10px] font-bold uppercase text-emerald-200">Width Profile</span>
                <p className="font-bold text-white text-sm">{dimensionResult.widthCategory}</p>
              </div>

              {/* Global Matrix Snippet */}
              <div className="grid grid-cols-4 gap-1.5 text-center text-xs font-mono pt-2">
                <div className="p-2 bg-white/10 rounded-lg">
                  <span className="text-[9px] font-sans text-emerald-200 block">IND / UK</span>
                  <span className="font-bold text-white text-xs">{dimensionResult.internationalSizes.india}</span>
                </div>
                <div className="p-2 bg-white/10 rounded-lg">
                  <span className="text-[9px] font-sans text-emerald-200 block">UK</span>
                  <span className="font-bold text-white text-xs">{dimensionResult.internationalSizes.uk}</span>
                </div>
                <div className="p-2 bg-white/10 rounded-lg">
                  <span className="text-[9px] font-sans text-emerald-200 block">EU</span>
                  <span className="font-bold text-white text-xs">{dimensionResult.internationalSizes.eu}</span>
                </div>
                <div className="p-2 bg-white/10 rounded-lg">
                  <span className="text-[9px] font-sans text-emerald-200 block">JP (CM)</span>
                  <span className="font-bold text-white text-xs">{dimensionResult.internationalSizes.japanCm}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB 2: INTERNATIONAL SYSTEM CONVERTER */}
      {activeTab === "converter" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <Globe className="h-4 w-4 text-emerald-600" /> Convert Size Across Global Systems
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Input Size System</label>
                <select
                  value={convInputSystem}
                  onChange={(e) => setConvInputSystem(e.target.value as any)}
                  className="w-full h-10 text-xs font-bold px-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl cursor-pointer"
                >
                  <option value="india">India (IND / UK standard)</option>
                  <option value="us_men">US & Canada Men</option>
                  <option value="us_women">US & Canada Women</option>
                  <option value="uk">UK Size</option>
                  <option value="eu">EU (Paris Point)</option>
                  <option value="cm">Japan / CM</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Input Size Value</label>
                <Input
                  type="number"
                  value={convValue}
                  onChange={(e) => setConvValue(Number(e.target.value))}
                  step={0.5}
                  className="h-10 text-sm font-mono font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200"
                />
              </div>
            </div>

            {/* Omnidirectional Conversion Matrix Table */}
            <div className="overflow-x-auto pt-3">
              <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-800">
                <thead>
                  <tr className="bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-900 dark:text-zinc-100">
                    <th className="p-2.5 border border-zinc-200 dark:border-zinc-700">Region / Scale</th>
                    <th className="p-2.5 border border-zinc-200 dark:border-zinc-700">Equivalent Size</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-mono">
                  <tr className="bg-emerald-50/40 dark:bg-emerald-950/20">
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans font-bold text-emerald-800 dark:text-emerald-300">India (IND / BIS Standard)</td>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 text-emerald-600 font-bold">IND {convertedMatrix.india}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans font-bold">US & Canada Men</td>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 text-emerald-600 font-bold">{convertedMatrix.usMen}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans font-bold">US & Canada Women</td>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 text-emerald-600 font-bold">{convertedMatrix.usWomen}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans font-bold">UK Size</td>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-bold">{convertedMatrix.uk}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans font-bold">European (EU / Paris Point)</td>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-bold">{convertedMatrix.eu}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans font-bold">Japan / East Asia (CM / Mondopoint)</td>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-bold">{convertedMatrix.japanCm} cm ({convertedMatrix.mondopointMm} mm)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans font-bold">Mexico</td>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-bold">{convertedMatrix.mexico}</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans font-bold">Australia</td>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-bold">{convertedMatrix.australia}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white p-6 rounded-2xl shadow-md space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-100 border-b border-white/20 pb-2">
              Conversion Quick Summary
            </h4>
            <div className="text-5xl font-black font-mono tracking-tight text-white">
              IND {convertedMatrix.india} = US {convertedMatrix.usMen}
            </div>
            <p className="text-xs text-emerald-100">
              Indian shoe sizes (BIS standard) are identical to UK shoe sizes (e.g., India Size 8 = UK Size 8 = US Men 9).
            </p>
          </div>
        </div>
      )}

      {/* 4. TAB 3: BRAND FIT FINDER & KIDS GROWTH TRACKER */}
      {activeTab === "brand" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-5">
            {/* Brand Tuning */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <Tag className="h-4 w-4 text-emerald-600" /> Brand Fit Bias Matcher
              </h3>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Select Brand</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value as ShoeBrand)}
                  className="w-full h-10 text-xs font-bold px-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl cursor-pointer"
                >
                  <option value="standard">Standard Sizing (True to Size)</option>
                  <option value="nike">Nike (Runs 0.5 size small)</option>
                  <option value="adidas">Adidas (Fits true to size)</option>
                  <option value="converse">Converse Chuck Taylor (Runs 0.5 size large)</option>
                  <option value="hoka">Hoka (True to size, roomy toe box)</option>
                  <option value="vans">Vans (Fits true to size)</option>
                  <option value="asics">ASICS (Runs 0.5 size small)</option>
                  <option value="doc_martens">Doc Martens (Runs 0.5 size large)</option>
                </select>
              </div>

              {dimensionResult.brandFit && (
                <div className="p-3.5 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-xl space-y-1 text-xs">
                  <span className="font-bold text-emerald-900 dark:text-emerald-200">
                    Recommended {dimensionResult.brandFit.brandName} Size: US {dimensionResult.brandFit.recommendedSizeUs} (IND / UK {dimensionResult.brandFit.recommendedSizeUs - 1})
                  </span>
                  <p className="text-zinc-600 dark:text-zinc-400">{dimensionResult.brandFit.fitNote}</p>
                </div>
              )}
            </div>

            {/* Kids Growth Tracker */}
            <div className="space-y-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-emerald-600" /> Smart Kids' Growth Forecast
              </h3>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Child's Current Age (Months)</label>
                <Input
                  type="number"
                  value={kidAgeMonths}
                  onChange={(e) => setKidAgeMonths(Number(e.target.value))}
                  className="h-10 text-sm font-mono font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200"
                />
              </div>

              {dimensionResult.growthProjection && (
                <div className="p-3.5 bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-xl space-y-2 text-xs">
                  <span className="font-bold text-blue-900 dark:text-blue-200">Growth Forecast Notes</span>
                  <p className="text-zinc-600 dark:text-zinc-400">{dimensionResult.growthProjection.growthNote}</p>
                  <div className="grid grid-cols-2 gap-2 text-center font-mono pt-1">
                    <div className="p-2 bg-white dark:bg-zinc-900 rounded-lg">
                      <span className="text-[10px] text-zinc-500 font-sans block">In 3 Months</span>
                      <span className="font-bold text-blue-600">US {dimensionResult.growthProjection.projected3MonthsSizeUs}</span>
                    </div>
                    <div className="p-2 bg-white dark:bg-zinc-900 rounded-lg">
                      <span className="text-[10px] text-zinc-500 font-sans block">In 6 Months</span>
                      <span className="font-bold text-blue-600">US {dimensionResult.growthProjection.projected6MonthsSizeUs}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white p-6 rounded-2xl shadow-md space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-100 border-b border-white/20 pb-2">
              Brand Tuned Summary
            </h4>
            <div className="text-5xl font-black font-mono tracking-tight text-white">
              US {dimensionResult.brandFit?.recommendedSizeUs}
            </div>
            <p className="text-xs text-emerald-100">
              {dimensionResult.brandFit?.fitNote}
            </p>
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
