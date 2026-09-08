"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Ruler,
  Globe,
  Tag,
  Check,
  Printer,
  Download,
  FileText,
  Copy,
  RotateCcw,
  Bookmark,
  BookmarkCheck,
  Code2,
  AlertTriangle,
  Info,
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

const LOCAL_STORAGE_KEY = "shoe_size_calc_saved_profile";

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

  // Modals & Action Feedback States
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [copiedResult, setCopiedResult] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [copiedLatex, setCopiedLatex] = useState<boolean>(false);
  const [savedFeedback, setSavedFeedback] = useState<string | null>(null);
  const [hasSavedProfile, setHasSavedProfile] = useState<boolean>(false);

  // Check on mount if saved profile exists
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) setHasSavedProfile(true);
    } catch {
      // ignore
    }
  }, []);

  // UNIT TOGGLE HANDLER (P0-03 Fix: Desynchronization resolution)
  const handleUnitChange = (nextUnit: UnitSystem) => {
    if (nextUnit === unit) return;

    const convertVal = (val: number, from: UnitSystem, to: UnitSystem): number => {
      if (!val || isNaN(val)) return val;
      // Convert to inches first
      let inVal = val;
      if (from === "cm") inVal = val / 2.54;
      else if (from === "mm") inVal = val / 25.4;

      // Convert to target
      if (to === "in") return parseFloat(inVal.toFixed(2));
      if (to === "cm") return parseFloat((inVal * 2.54).toFixed(2));
      if (to === "mm") return parseFloat((inVal * 25.4).toFixed(1));
      return val;
    };

    setLeftLength((prev) => convertVal(prev, unit, nextUnit));
    setRightLength((prev) => convertVal(prev, unit, nextUnit));
    setLeftWidth((prev) => convertVal(prev, unit, nextUnit));
    setRightWidth((prev) => convertVal(prev, unit, nextUnit));
    setUnit(nextUnit);
  };

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

  // Convert Direct Conversion Input to Inches (P0-02 Fix: UK/India inverse uses (convValue + 22.5) / 3)
  const convInches = useMemo(() => {
    if (convInputSystem === "cm") return convValue / 2.54;
    if (convInputSystem === "eu") return (convValue / 1.5 - 1.5) / 2.54;
    if (convInputSystem === "uk" || convInputSystem === "india") return (convValue + 22.5) / 3;
    if (convInputSystem === "us_women") return (convValue + 20) / 3;
    return (convValue + 21.5) / 3;
  }, [convInputSystem, convValue]);

  const convertedMatrix = useMemo(() => {
    return calculateInternationalSizes(Math.max(4, convInches), gender);
  }, [convInches, gender]);

  // PRIMARY DISPLAY SIZE
  const primaryDisplaySize = useMemo(() => {
    if (!dimensionResult.isValid) return "--";
    if (gender === "women") return dimensionResult.internationalSizes.usWomen;
    if (gender === "kids") return dimensionResult.internationalSizes.usKids;
    return dimensionResult.internationalSizes.usMen;
  }, [dimensionResult, gender]);

  // SAVE TO LOCAL STORAGE (P0-04 Fix)
  const handleSaveProfile = () => {
    try {
      const stateToSave = {
        unit,
        gender,
        leftLength,
        rightLength,
        leftWidth,
        rightWidth,
        activeTab,
        convInputSystem,
        convValue,
        selectedBrand,
        kidAgeMonths,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
      setHasSavedProfile(true);
      setSavedFeedback("Fit profile saved successfully!");
      setTimeout(() => setSavedFeedback(null), 3000);
    } catch {
      setSavedFeedback("Failed to save to local storage.");
      setTimeout(() => setSavedFeedback(null), 3000);
    }
  };

  // RESTORE FROM LOCAL STORAGE (P0-04 Fix)
  const handleRestoreProfile = () => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!saved) {
        setSavedFeedback("No saved profile found.");
        setTimeout(() => setSavedFeedback(null), 3000);
        return;
      }
      const parsed = JSON.parse(saved);
      if (parsed.unit) setUnit(parsed.unit);
      if (parsed.gender) setGender(parsed.gender);
      if (typeof parsed.leftLength === "number") setLeftLength(parsed.leftLength);
      if (typeof parsed.rightLength === "number") setRightLength(parsed.rightLength);
      if (typeof parsed.leftWidth === "number") setLeftWidth(parsed.leftWidth);
      if (typeof parsed.rightWidth === "number") setRightWidth(parsed.rightWidth);
      if (parsed.activeTab) setActiveTab(parsed.activeTab);
      if (parsed.convInputSystem) setConvInputSystem(parsed.convInputSystem);
      if (typeof parsed.convValue === "number") setConvValue(parsed.convValue);
      if (parsed.selectedBrand) setSelectedBrand(parsed.selectedBrand);
      if (typeof parsed.kidAgeMonths === "number") setKidAgeMonths(parsed.kidAgeMonths);

      setSavedFeedback("Fit profile restored!");
      setTimeout(() => setSavedFeedback(null), 3000);
    } catch {
      setSavedFeedback("Error restoring saved profile.");
      setTimeout(() => setSavedFeedback(null), 3000);
    }
  };

  // RESET TO REFERENCE DEFAULTS
  const handleReset = () => {
    setUnit("in");
    setGender("men");
    setLeftLength(10.0);
    setRightLength(9.9);
    setLeftWidth(3.8);
    setRightWidth(3.7);
    setSelectedBrand("nike");
    setKidAgeMonths(36);
    setSavedFeedback("Reset to reference measurements.");
    setTimeout(() => setSavedFeedback(null), 2500);
  };

  // COPY PRIMARY RESULT
  const handleCopyResult = () => {
    if (!dimensionResult.isValid) return;
    const text = `Shoe Size Recommendation: US ${primaryDisplaySize} (${gender.toUpperCase()}) | UK: ${dimensionResult.internationalSizes.uk} | EU: ${dimensionResult.internationalSizes.eu} | JP: ${dimensionResult.internationalSizes.japanCm} cm | Width: ${dimensionResult.widthCategory}`;
    navigator.clipboard.writeText(text);
    setCopiedResult(true);
    setTimeout(() => setCopiedResult(false), 2000);
  };

  // COPY DETAILED SUMMARY
  const handleCopySummary = () => {
    if (!dimensionResult.isValid) return;
    let text = `👟 CalcPlatform Fit Profile:\n`;
    text += `Target Group: ${gender.toUpperCase()}\n`;
    text += `Fitted Foot Length: ${dimensionResult.usedFootLengthInches} in (${dimensionResult.usedFootLengthCm} cm)\n`;
    text += `Recommended US Size: ${primaryDisplaySize}\n`;
    text += `Global Equivalents: UK ${dimensionResult.internationalSizes.uk} | IND ${dimensionResult.internationalSizes.india} | EU ${dimensionResult.internationalSizes.eu} | JP ${dimensionResult.internationalSizes.japanCm} cm | Mondopoint ${dimensionResult.internationalSizes.mondopointMm} mm\n`;
    text += `Width Profile: ${dimensionResult.widthCategory}\n`;
    if (dimensionResult.largerFootNote) text += `Asymmetry Note: ${dimensionResult.largerFootNote}\n`;
    if (dimensionResult.widthAsymmetryNote) text += `Width Note: ${dimensionResult.widthAsymmetryNote}\n`;
    if (dimensionResult.brandFit) {
      text += `Brand Tuned (${dimensionResult.brandFit.brandName}): US ${dimensionResult.brandFit.recommendedSizeUs} (${dimensionResult.brandFit.fitNote})\n`;
    }
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  // COPY LATEX
  const handleCopyLatex = () => {
    if (!dimensionResult.isValid) return;
    const latex = `\\text{US Men} = 3 \\times L_{\\text{in}} - 21.5 = ${dimensionResult.internationalSizes.usMen} \\\\ \\text{UK} = \\text{US Men} - 1 = ${dimensionResult.internationalSizes.uk} \\\\ \\text{EU} = 1.5 \\times (L_{\\text{cm}} + 1.5) = ${dimensionResult.internationalSizes.eu} \\\\ \\text{JP (cm)} = ${dimensionResult.internationalSizes.japanCm}`;
    navigator.clipboard.writeText(latex);
    setCopiedLatex(true);
    setTimeout(() => setCopiedLatex(false), 2000);
  };

  // EXPORT CSV
  const handleExportCsv = () => {
    if (!dimensionResult.isValid) return;
    const headers = [
      "Module",
      "Gender",
      "Unit",
      "Left Length",
      "Right Length",
      "Left Width",
      "Right Width",
      "Fitted Length (in)",
      "Fitted Length (cm)",
      "Recommended US Size",
      "Width Profile",
      "UK Size",
      "India Size",
      "EU Size",
      "Japan CM",
      "Mondopoint MM",
      "Mexico Size",
      "Australia Size",
      "Asymmetry Note",
      "Width Note",
      "Timestamp",
    ];

    const values = [
      "Shoe Size Calculator",
      gender,
      unit,
      leftLength,
      rightLength,
      leftWidth,
      rightWidth,
      dimensionResult.usedFootLengthInches,
      dimensionResult.usedFootLengthCm,
      primaryDisplaySize,
      `"${dimensionResult.widthCategory}"`,
      dimensionResult.internationalSizes.uk,
      dimensionResult.internationalSizes.india,
      dimensionResult.internationalSizes.eu,
      dimensionResult.internationalSizes.japanCm,
      dimensionResult.internationalSizes.mondopointMm,
      dimensionResult.internationalSizes.mexico,
      dimensionResult.internationalSizes.australia,
      `"${dimensionResult.largerFootNote || "None"}"`,
      `"${dimensionResult.widthAsymmetryNote || "None"}"`,
      new Date().toISOString(),
    ];

    const csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + values.join(",");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `shoe_size_fit_profile_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // EXPORT TXT
  const handleExportTxt = () => {
    if (!dimensionResult.isValid) return;
    let txt = `=====================================================\n`;
    txt += `SHOE SIZE FIT PROFILE REPORT\n`;
    txt += `CalcPlatform - International Footwear Fit Analysis\n`;
    txt += `Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}\n`;
    txt += `=====================================================\n\n`;
    txt += `INPUT MEASUREMENTS:\n`;
    txt += `  - Selected Group: ${gender.toUpperCase()}\n`;
    txt += `  - Units: ${unit.toUpperCase()}\n`;
    txt += `  - Left Foot: ${leftLength} ${unit} length | ${leftWidth} ${unit} width\n`;
    txt += `  - Right Foot: ${rightLength} ${unit} length | ${rightWidth} ${unit} width\n`;
    txt += `  - Fitted Foot Dimension: ${dimensionResult.usedFootLengthInches} in (${dimensionResult.usedFootLengthCm} cm)\n\n`;
    txt += `RECOMMENDED SIZES:\n`;
    txt += `  - US Recommended Size: ${primaryDisplaySize}\n`;
    txt += `  - Width Profile: ${dimensionResult.widthCategory}\n`;
    txt += `  - UK Size: ${dimensionResult.internationalSizes.uk}\n`;
    txt += `  - India (IND) Size: ${dimensionResult.internationalSizes.india}\n`;
    txt += `  - European (EU Paris Point): ${dimensionResult.internationalSizes.eu}\n`;
    txt += `  - Japan (JP): ${dimensionResult.internationalSizes.japanCm} cm\n`;
    txt += `  - Mondopoint (ISO 9407): ${dimensionResult.internationalSizes.mondopointMm} mm\n`;
    txt += `  - Mexico: ${dimensionResult.internationalSizes.mexico}\n`;
    txt += `  - Australia: ${dimensionResult.internationalSizes.australia}\n\n`;
    if (dimensionResult.largerFootNote) {
      txt += `ASYMMETRY NOTES:\n  - ${dimensionResult.largerFootNote}\n\n`;
    }
    if (dimensionResult.widthAsymmetryNote) {
      txt += `WIDTH NOTES:\n  - ${dimensionResult.widthAsymmetryNote}\n\n`;
    }
    if (dimensionResult.brandFit) {
      txt += `BRAND TUNING (${dimensionResult.brandFit.brandName.toUpperCase()}):\n`;
      txt += `  - Recommended Size: US ${dimensionResult.brandFit.recommendedSizeUs}\n`;
      txt += `  - Fit Advice: ${dimensionResult.brandFit.fitNote}\n\n`;
    }
    txt += `FIT DISCLAIMER:\n`;
    txt += `Calculated sizes serve as a standard starting recommendation. Individual lasts,\nshoe construction methods, and personal comfort preferences can vary by brand.\n`;

    const blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `shoe_size_report_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
          value: String(primaryDisplaySize),
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
            ...(dimensionResult.widthAsymmetryNote ? [{ label: "Width Asymmetry", value: dimensionResult.widthAsymmetryNote }] : []),
            ...(dimensionResult.kidsTransitionNote ? [{ label: "Kids Sizing Advisory", value: dimensionResult.kidsTransitionNote }] : []),
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
          { region: "India (IND)", size: String(dimensionResult.internationalSizes.india) },
          { region: "US Men", size: String(dimensionResult.internationalSizes.usMen) },
          { region: "US Women", size: String(dimensionResult.internationalSizes.usWomen) },
          { region: "US Kids", size: String(dimensionResult.internationalSizes.usKids) },
          { region: "UK", size: String(dimensionResult.internationalSizes.uk) },
          { region: "EU (Paris Point)", size: String(dimensionResult.internationalSizes.eu) },
          { region: "Japan (CM)", size: `${dimensionResult.internationalSizes.japanCm} cm` },
          { region: "Mondopoint (MM)", size: `${dimensionResult.internationalSizes.mondopointMm} mm` },
          { region: "Mexico", size: String(dimensionResult.internationalSizes.mexico) },
          { region: "Australia", size: String(dimensionResult.internationalSizes.australia) },
        ],
      },
    };
  }, [dimensionResult, gender, primaryDisplaySize]);

  return (
    <div className="space-y-6">
      {/* ACTION TOOLBAR (Save, Restore, Copy, Exports, Report, Print) */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-2.5 print:hidden">
        {/* Left: Tab Switcher */}
        <div role="tablist" aria-label="Shoe Size Calculator Modules" className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-200/70 dark:border-zinc-700">
          <button
            id="tab-dimensions"
            role="tab"
            aria-selected={activeTab === "dimensions"}
            aria-controls="panel-dimensions"
            onClick={() => setActiveTab("dimensions")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "dimensions"
                ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
            }`}
          >
            <Ruler className="h-3.5 w-3.5" /> Measure by Dimensions
          </button>

          <button
            id="tab-converter"
            role="tab"
            aria-selected={activeTab === "converter"}
            aria-controls="panel-converter"
            onClick={() => setActiveTab("converter")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "converter"
                ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
            }`}
          >
            <Globe className="h-3.5 w-3.5" /> International Converter
          </button>

          <button
            id="tab-brand"
            role="tab"
            aria-selected={activeTab === "brand"}
            aria-controls="panel-brand"
            onClick={() => setActiveTab("brand")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "brand"
                ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
            }`}
          >
            <Tag className="h-3.5 w-3.5" /> Brand Fit & Kids Growth
          </button>
        </div>

        {/* Right: Actions (Save, Restore, Copy, CSV, TXT, LaTeX, Report, Print) */}
        <div className="flex flex-wrap items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveProfile}
            className="h-8 px-2.5 text-xs font-medium gap-1 text-zinc-700 dark:text-zinc-300"
            title="Save current fit profile to browser"
          >
            <Bookmark className="h-3.5 w-3.5 text-emerald-600" /> Save
          </Button>

          {hasSavedProfile && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleRestoreProfile}
              className="h-8 px-2.5 text-xs font-medium gap-1 text-zinc-700 dark:text-zinc-300"
              title="Restore previously saved fit profile"
            >
              <BookmarkCheck className="h-3.5 w-3.5 text-blue-600" /> Restore
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyResult}
            className="h-8 px-2.5 text-xs font-medium gap-1 text-zinc-700 dark:text-zinc-300"
            title="Copy recommended shoe size to clipboard"
          >
            {copiedResult ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
            {copiedResult ? "Copied" : "Copy Size"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopySummary}
            className="h-8 px-2.5 text-xs font-medium gap-1 text-zinc-700 dark:text-zinc-300"
            title="Copy full fit summary to clipboard"
          >
            {copiedSummary ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <FileText className="h-3.5 w-3.5" />}
            {copiedSummary ? "Copied" : "Summary"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyLatex}
            className="h-8 px-2 text-xs font-medium gap-1 text-zinc-700 dark:text-zinc-300"
            title="Copy LaTeX size formulas"
          >
            {copiedLatex ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Code2 className="h-3.5 w-3.5" />}
            LaTeX
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCsv}
            className="h-8 px-2 text-xs font-medium gap-1 text-zinc-700 dark:text-zinc-300"
            title="Download CSV report"
          >
            <Download className="h-3.5 w-3.5" /> CSV
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportTxt}
            className="h-8 px-2 text-xs font-medium gap-1 text-zinc-700 dark:text-zinc-300"
            title="Download formatted text report"
          >
            <Download className="h-3.5 w-3.5" /> TXT
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={() => setShowReportModal(true)}
            className="h-8 px-3 text-xs font-bold gap-1 bg-emerald-600 hover:bg-emerald-700 text-white"
            title="Generate comprehensive fit report sheet"
          >
            <FileText className="h-3.5 w-3.5" /> Full Report
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="h-8 px-2.5 text-xs font-medium gap-1 text-zinc-700 dark:text-zinc-300"
            title="Print or save PDF"
          >
            <Printer className="h-3.5 w-3.5" /> Print
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-8 px-2 text-xs text-zinc-500 hover:text-zinc-800"
            title="Reset measurements to reference values"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* FEEDBACK TOAST BANNER */}
      {savedFeedback && (
        <div
          role="status"
          className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2"
        >
          <Check className="h-4 w-4 text-emerald-600" />
          {savedFeedback}
        </div>
      )}

      {/* TAB 1: MEASURE BY FOOT DIMENSIONS */}
      {activeTab === "dimensions" && (
        <div
          id="panel-dimensions"
          role="tabpanel"
          aria-labelledby="tab-dimensions"
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start"
        >
          {/* LEFT INPUTS (Col 7) */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-5 print:border-none print:shadow-none">
            {/* Top Toolbar: Gender & Unit */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-3">
              {/* Gender Selector */}
              <div className="flex items-center gap-2">
                <span id="label-gender-group" className="text-xs font-bold text-zinc-500">Group:</span>
                <div role="radiogroup" aria-labelledby="label-gender-group" className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl text-xs font-bold">
                  {(["men", "women", "kids"] as ShoeGender[]).map((g) => (
                    <button
                      key={g}
                      role="radio"
                      aria-checked={gender === g}
                      onClick={() => setGender(g)}
                      className={`px-3 py-1.5 rounded-lg capitalize cursor-pointer transition-all ${
                        gender === g
                          ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-xs"
                          : "text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Unit Toggle with proper value conversion (P0-03 Fix) */}
              <div className="flex items-center gap-2">
                <span id="label-unit-toggle" className="text-xs font-bold text-zinc-500">Unit:</span>
                <div role="radiogroup" aria-labelledby="label-unit-toggle" className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl text-xs font-bold">
                  {(["in", "cm", "mm"] as UnitSystem[]).map((u) => (
                    <button
                      key={u}
                      role="radio"
                      aria-checked={unit === u}
                      onClick={() => handleUnitChange(u)}
                      className={`px-3 py-1.5 rounded-lg uppercase cursor-pointer transition-all ${
                        unit === u
                          ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-xs"
                          : "text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bilateral Foot Measurement Inputs (P1-08: Accessible IDs & Labels) */}
            <div className="space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                Bilateral Foot Measurements ({unit.toUpperCase()})
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Left Foot */}
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-3">
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block border-b border-zinc-200/50 dark:border-zinc-700/50 pb-1.5">
                    Left Foot
                  </span>
                  <div className="space-y-1.5">
                    <label htmlFor="shoe-left-length" className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium block">
                      Heel-to-Toe Length ({unit})
                    </label>
                    <Input
                      id="shoe-left-length"
                      type="number"
                      value={leftLength || ""}
                      onChange={(e) => setLeftLength(parseFloat(e.target.value) || 0)}
                      step={unit === "in" ? 0.1 : 0.5}
                      min={unit === "in" ? 3 : 8}
                      max={unit === "in" ? 18 : 45}
                      className="h-9 text-xs font-sans tabular-nums font-bold bg-white dark:bg-zinc-900"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="shoe-left-width" className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium block">
                      Joint Width (Optional, {unit})
                    </label>
                    <Input
                      id="shoe-left-width"
                      type="number"
                      value={leftWidth || ""}
                      onChange={(e) => setLeftWidth(parseFloat(e.target.value) || 0)}
                      step={unit === "in" ? 0.1 : 0.5}
                      min={unit === "in" ? 2 : 5}
                      max={unit === "in" ? 7 : 18}
                      className="h-9 text-xs font-sans tabular-nums font-bold bg-white dark:bg-zinc-900"
                    />
                  </div>
                </div>

                {/* Right Foot */}
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-3">
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block border-b border-zinc-200/50 dark:border-zinc-700/50 pb-1.5">
                    Right Foot
                  </span>
                  <div className="space-y-1.5">
                    <label htmlFor="shoe-right-length" className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium block">
                      Heel-to-Toe Length ({unit})
                    </label>
                    <Input
                      id="shoe-right-length"
                      type="number"
                      value={rightLength || ""}
                      onChange={(e) => setRightLength(parseFloat(e.target.value) || 0)}
                      step={unit === "in" ? 0.1 : 0.5}
                      min={unit === "in" ? 3 : 8}
                      max={unit === "in" ? 18 : 45}
                      className="h-9 text-xs font-sans tabular-nums font-bold bg-white dark:bg-zinc-900"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="shoe-right-width" className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium block">
                      Joint Width (Optional, {unit})
                    </label>
                    <Input
                      id="shoe-right-width"
                      type="number"
                      value={rightWidth || ""}
                      onChange={(e) => setRightWidth(parseFloat(e.target.value) || 0)}
                      step={unit === "in" ? 0.1 : 0.5}
                      min={unit === "in" ? 2 : 5}
                      max={unit === "in" ? 7 : 18}
                      className="h-9 text-xs font-sans tabular-nums font-bold bg-white dark:bg-zinc-900"
                    />
                  </div>
                </div>
              </div>

              {/* VALIDATION ERROR (P1-05 Fix: Never silently fall back to 10 inches) */}
              {!dimensionResult.isValid && (
                <div role="alert" className="p-3 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900 rounded-xl text-xs flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-red-600" />
                  <span>{dimensionResult.errorMessage || "Please enter valid foot dimensions."}</span>
                </div>
              )}

              {/* BILATERAL LENGTH ASYMMETRY NOTICE */}
              {dimensionResult.largerFootNote && dimensionResult.isValid && (
                <div role="alert" className="text-xs text-amber-800 dark:text-amber-300 font-medium bg-amber-50 dark:bg-amber-950/30 p-3 rounded-xl border border-amber-200 dark:border-amber-900 flex items-start gap-2">
                  <Info className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                  <span>{dimensionResult.largerFootNote}</span>
                </div>
              )}

              {/* BILATERAL WIDTH ASYMMETRY NOTICE (P1-06 Fix) */}
              {dimensionResult.widthAsymmetryNote && dimensionResult.isValid && (
                <div role="alert" className="text-xs text-blue-800 dark:text-blue-300 font-medium bg-blue-50 dark:bg-blue-950/30 p-3 rounded-xl border border-blue-200 dark:border-blue-900 flex items-start gap-2">
                  <Info className="h-4 w-4 shrink-0 text-blue-600 mt-0.5" />
                  <span>{dimensionResult.widthAsymmetryNote}</span>
                </div>
              )}

              {/* KIDS TRANSITION NOTICE (P1-07 Fix) */}
              {dimensionResult.kidsTransitionNote && dimensionResult.isValid && (
                <div role="alert" className="text-xs text-purple-800 dark:text-purple-300 font-medium bg-purple-50 dark:bg-purple-950/30 p-3 rounded-xl border border-purple-200 dark:border-purple-900 flex items-start gap-2">
                  <Info className="h-4 w-4 shrink-0 text-purple-600 mt-0.5" />
                  <span>{dimensionResult.kidsTransitionNote}</span>
                </div>
              )}
            </div>

            {/* INTERACTIVE VISUAL MEASUREMENT GUIDE VECTOR CARD (P2-09 Fix: Print boundary containment) */}
            <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-xl space-y-3 text-xs print:break-inside-avoid">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                At-Home Measurement Technique
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                <div className="sm:col-span-8 space-y-1 text-zinc-700 dark:text-zinc-300 text-[11px]">
                  <p>1. Stand on paper with heel against a flat vertical wall in your normal socks.</p>
                  <p>2. Mark the tip of your longest toe and widest ball points with a vertical pen.</p>
                  <p>3. Measure the distance with a ruler and add 10–12 mm (0.4–0.5 in) for toe box allowance.</p>
                </div>
                <div className="sm:col-span-4 flex justify-center">
                  <svg
                    viewBox="0 0 160 90"
                    className="w-full h-auto max-w-[140px] print:max-w-[100px] stroke-emerald-600 fill-none"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
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
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white p-6 rounded-2xl shadow-md space-y-6 print:break-inside-avoid">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/20 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">
                  Calculated Fit Profile ({gender.toUpperCase()})
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                  ISO 9407 / Barleycorn
                </span>
              </div>

              {/* Primary Converted Size with aria-live (P1-08 Fix) */}
              <div className="space-y-1">
                <div
                  aria-live="polite"
                  className="text-6xl font-black font-sans tabular-nums tracking-tight text-white"
                >
                  {primaryDisplaySize}
                </div>
                <p className="text-xs text-emerald-100 font-medium">
                  {dimensionResult.isValid
                    ? `US Recommended Size (${dimensionResult.usedFootLengthInches} in / ${dimensionResult.usedFootLengthCm} cm)`
                    : "Please enter valid heel-to-toe dimensions"}
                </p>
              </div>

              {/* Width Rating */}
              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/20 space-y-1 text-xs">
                <span className="text-[10px] font-bold uppercase text-emerald-200">Width Profile</span>
                <p className="font-bold text-white text-sm">
                  {dimensionResult.isValid ? dimensionResult.widthCategory : "--"}
                </p>
              </div>

              {/* Global Matrix Snippet (P2-10: Exact EU 40 harmony) */}
              <div className="grid grid-cols-4 gap-1.5 text-center text-xs font-sans tabular-nums pt-2">
                <div className="p-2 bg-white/10 rounded-lg">
                  <span className="text-[9px] font-sans text-emerald-200 block">IND / UK</span>
                  <span className="font-bold text-white text-xs">
                    {dimensionResult.isValid ? dimensionResult.internationalSizes.india : "--"}
                  </span>
                </div>
                <div className="p-2 bg-white/10 rounded-lg">
                  <span className="text-[9px] font-sans text-emerald-200 block">UK</span>
                  <span className="font-bold text-white text-xs">
                    {dimensionResult.isValid ? dimensionResult.internationalSizes.uk : "--"}
                  </span>
                </div>
                <div className="p-2 bg-white/10 rounded-lg">
                  <span className="text-[9px] font-sans text-emerald-200 block">EU</span>
                  <span className="font-bold text-white text-xs">
                    {dimensionResult.isValid ? dimensionResult.internationalSizes.eu : "--"}
                  </span>
                </div>
                <div className="p-2 bg-white/10 rounded-lg">
                  <span className="text-[9px] font-sans text-emerald-200 block">JP (CM)</span>
                  <span className="font-bold text-white text-xs">
                    {dimensionResult.isValid ? dimensionResult.internationalSizes.japanCm : "--"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERNATIONAL SYSTEM CONVERTER */}
      {activeTab === "converter" && (
        <div
          id="panel-converter"
          role="tabpanel"
          aria-labelledby="tab-converter"
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start"
        >
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-4 print:border-none">
            <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              Convert Size Across Global Systems
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="shoe-conv-system" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
                  Input Size System
                </label>
                <select
                  id="shoe-conv-system"
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
                <label htmlFor="shoe-conv-value" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
                  Input Size Value
                </label>
                <Input
                  id="shoe-conv-value"
                  type="number"
                  value={convValue}
                  onChange={(e) => setConvValue(parseFloat(e.target.value) || 0)}
                  step={0.5}
                  min={1}
                  max={55}
                  className="h-10 text-sm font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200"
                />
              </div>
            </div>

            {/* Omnidirectional Conversion Matrix Table */}
            <div className="overflow-x-auto pt-3">
              <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-800">
                <thead>
                  <tr className="bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-900 dark:text-zinc-100">
                    <th scope="col" className="p-2.5 border border-zinc-200 dark:border-zinc-700">Region / Scale</th>
                    <th scope="col" className="p-2.5 border border-zinc-200 dark:border-zinc-700">Equivalent Size</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-sans tabular-nums">
                  <tr className="bg-emerald-50/40 dark:bg-emerald-950/20">
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans font-bold text-emerald-800 dark:text-emerald-300">
                      India (IND / BIS Standard)
                    </td>
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 text-emerald-600 font-bold">
                      IND {convertedMatrix.india}
                    </td>
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
                    <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-bold">
                      {convertedMatrix.japanCm} cm ({convertedMatrix.mondopointMm} mm)
                    </td>
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

          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white p-6 rounded-2xl shadow-md space-y-4 print:break-inside-avoid">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-100 border-b border-white/20 pb-2">
              Conversion Quick Summary
            </h4>
            <div className="text-5xl font-black font-sans tabular-nums tracking-tight text-white">
              IND {convertedMatrix.india} = US {convertedMatrix.usMen}
            </div>
            <p className="text-xs text-emerald-100">
              Indian shoe sizes (BIS standard) are identical to UK shoe sizes (e.g., India Size 7.5 = UK Size 7.5 = US Men 8.5).
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: BRAND FIT FINDER & KIDS GROWTH TRACKER */}
      {activeTab === "brand" && (
        <div
          id="panel-brand"
          role="tabpanel"
          aria-labelledby="tab-brand"
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start"
        >
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-5 print:border-none">
            {/* Brand Tuning */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                Brand Fit Bias Matcher
              </h3>
              <div className="space-y-1.5">
                <label htmlFor="shoe-brand-select" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
                  Select Brand
                </label>
                <select
                  id="shoe-brand-select"
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

              {dimensionResult.brandFit && dimensionResult.isValid && (
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
              <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                Smart Kids' Growth Forecast
              </h3>
              <div className="space-y-1.5">
                <label htmlFor="shoe-kid-age" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
                  Child's Current Age (Months)
                </label>
                <Input
                  id="shoe-kid-age"
                  type="number"
                  value={kidAgeMonths}
                  onChange={(e) => setKidAgeMonths(parseFloat(e.target.value) || 0)}
                  min={1}
                  max={216}
                  className="h-10 text-sm font-sans tabular-nums font-bold bg-zinc-50 dark:bg-zinc-800 border-zinc-200"
                />
              </div>

              {dimensionResult.growthProjection && dimensionResult.isValid && (
                <div className="p-3.5 bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-xl space-y-2 text-xs">
                  <span className="font-bold text-blue-900 dark:text-blue-200">Growth Forecast Notes</span>
                  <p className="text-zinc-600 dark:text-zinc-400">{dimensionResult.growthProjection.growthNote}</p>
                  <div className="grid grid-cols-2 gap-2 text-center font-sans tabular-nums pt-1">
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

          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white p-6 rounded-2xl shadow-md space-y-4 print:break-inside-avoid">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-100 border-b border-white/20 pb-2">
              Brand Tuned Summary
            </h4>
            <div className="text-5xl font-black font-sans tabular-nums tracking-tight text-white">
              {dimensionResult.isValid ? `US ${dimensionResult.brandFit?.recommendedSizeUs}` : "--"}
            </div>
            <p className="text-xs text-emerald-100">
              {dimensionResult.isValid ? dimensionResult.brandFit?.fitNote : "Please provide valid foot measurements."}
            </p>
          </div>
        </div>
      )}

      {/* REPORT MODAL (P0-04 Fix: Fully wired and interactive) */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        data={reportData}
      />
    </div>
  );
}
