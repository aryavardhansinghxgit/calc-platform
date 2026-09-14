"use client";

import React, { useState, useMemo, useRef, KeyboardEvent } from "react";
import {
  Heart,
  Sparkles,
  ShieldCheck,
  Flame,
  Star,
  Calendar,
  Share2,
  Copy,
  Check,
  FileText,
  Zap,
  Compass,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReportModal from "@/components/report/ReportModal";
import { love_calculatorConfig } from "@/app/calculators/love-calculator/config";
import { calculateLoveCalculator } from "@/app/calculators/love-calculator/calculator";
import { ZodiacSign, LoveCalculatorOutputs, LoveEngineMode } from "@/app/calculators/love-calculator/types";
import { CalculatorReportData } from "@/components/report/types";

const ZODIAC_OPTIONS: { label: string; value: ZodiacSign; element: string }[] = [
  { label: "Aries (Mar 21 – Apr 19)", value: "aries", element: "Fire 🔥" },
  { label: "Taurus (Apr 20 – May 20)", value: "taurus", element: "Earth 🌿" },
  { label: "Gemini (May 21 – Jun 20)", value: "gemini", element: "Air 💨" },
  { label: "Cancer (Jun 21 – Jul 22)", value: "cancer", element: "Water 🌊" },
  { label: "Leo (Jul 23 – Aug 22)", value: "leo", element: "Fire 🔥" },
  { label: "Virgo (Aug 23 – Sep 22)", value: "virgo", element: "Earth 🌿" },
  { label: "Libra (Sep 23 – Oct 22)", value: "libra", element: "Air 💨" },
  { label: "Scorpio (Oct 23 – Nov 21)", value: "scorpio", element: "Water 🌊" },
  { label: "Sagittarius (Nov 22 – Dec 21)", value: "sagittarius", element: "Fire 🔥" },
  { label: "Capricorn (Dec 22 – Jan 19)", value: "capricorn", element: "Earth 🌿" },
  { label: "Aquarius (Jan 20 – Feb 18)", value: "aquarius", element: "Air 💨" },
  { label: "Pisces (Feb 19 – Mar 20)", value: "pisces", element: "Water 🌊" },
];

const MODES: { id: LoveEngineMode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "name", label: "Name Numerology", icon: Heart },
  { id: "zodiac", label: "Zodiac Astrology", icon: Star },
  { id: "birthday", label: "Life Path DOB", icon: Calendar },
  { id: "flames", label: "90s FLAMES", icon: Flame },
  { id: "ultimate", label: "Ultimate Chemistry", icon: Sparkles },
];

// Precompute default state server-side to eliminate SSR hydration flash & CLS
const DEFAULT_RESULT = calculateLoveCalculator({
  name1: "Romeo",
  name2: "Juliet",
  mode: "name",
  dob1: "1996-05-15",
  dob2: "1998-09-20",
  sign1: "leo",
  sign2: "gemini",
});

export function LoveCalculator() {
  // Active Engine Tab Mode
  const [activeEngine, setActiveEngine] = useState<LoveEngineMode>("name");

  // Inputs
  const [name1, setName1] = useState<string>("Romeo");
  const [name2, setName2] = useState<string>("Juliet");
  const [dob1, setDob1] = useState<string>("1996-05-15");
  const [dob2, setDob2] = useState<string>("1998-09-20");
  const [sign1, setSign1] = useState<ZodiacSign>("leo");
  const [sign2, setSign2] = useState<ZodiacSign>("gemini");

  // Calculation Result & Score (Precomputed on SSR to eliminate 0% -> 87% flash)
  const [result, setResult] = useState<LoveCalculatorOutputs>(DEFAULT_RESULT);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [animatedScore, setAnimatedScore] = useState<number>(DEFAULT_RESULT.compatibilityScore);

  // UI Feedback States
  const [copiedMoniker, setCopiedMoniker] = useState<boolean>(false);
  const [shareSuccess, setShareSuccess] = useState<string | null>(null);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  // Tab button refs for accessible keyboard arrow navigation
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  // Tab State Sync: Auto-recalculate immediately when changing modes to prevent stale results
  const handleEngineChange = (newEngine: LoveEngineMode) => {
    setActiveEngine(newEngine);
    const updated = calculateLoveCalculator({
      name1,
      name2,
      mode: newEngine,
      dob1,
      dob2,
      sign1,
      sign2,
    });
    setResult(updated);
    setAnimatedScore(updated.compatibilityScore);
  };

  // Keyboard navigation for WAI-ARIA tablist (Left / Right arrow keys)
  const handleTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex = -1;
    if (e.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % MODES.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + MODES.length) % MODES.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = MODES.length - 1;
    }

    if (nextIndex !== -1) {
      e.preventDefault();
      const nextMode = MODES[nextIndex];
      handleEngineChange(nextMode.id);
      tabRefs.current[nextMode.id]?.focus();
    }
  };

  // Explicit Recalculate Trigger with smooth progress gauge counter
  const handleCalculate = () => {
    setIsCalculating(true);

    setTimeout(() => {
      const res = calculateLoveCalculator({
        name1,
        name2,
        mode: activeEngine,
        dob1,
        dob2,
        sign1,
        sign2,
      });
      setResult(res);
      setIsCalculating(false);

      // Smooth score counter animation
      const target = res.compatibilityScore;
      let start = 0;
      const duration = 400;
      const stepTime = 16;
      const steps = duration / stepTime;
      const increment = target / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setAnimatedScore(target);
          clearInterval(timer);
        } else {
          setAnimatedScore(Math.round(start));
        }
      }, stepTime);
    }, 150);
  };

  // Copy Couple Moniker
  const handleCopyMoniker = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.moniker);
    setCopiedMoniker(true);
    setTimeout(() => setCopiedMoniker(false), 2000);
  };

  // Production-grade Share Handler: Web Share API with Clipboard Fallback & Dynamic URL
  const handleShare = async () => {
    if (!result) return;

    const pageUrl = typeof window !== "undefined" && window.location?.href
      ? window.location.href
      : "https://calcplatform.com/calculators/love-calculator";

    const title = `${name1} + ${name2} Love Match: ${result.compatibilityScore}% (${result.moniker})`;
    const text = `💕 ${name1} + ${name2} = ${result.moniker} 💕\nLove Match Score: ${result.compatibilityScore}%\nTier: ${result.tierBadge}\nDiscover your relationship chemistry on CalcPlatform!`;

    // Attempt Native Web Share API first (mobile & modern desktops)
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title,
          text,
          url: pageUrl,
        });
        setShareSuccess("Shared!");
        setTimeout(() => setShareSuccess(null), 2500);
        return;
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") {
          // User dismissed native share sheet; do not fallback or error
          return;
        }
        // Fall through to clipboard fallback on non-abort errors
      }
    }

    // Clipboard Fallback
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(`${text}\n${pageUrl}`);
        setShareSuccess("Copied Link!");
        setTimeout(() => setShareSuccess(null), 2500);
      } else {
        // Legacy fallback
        const textArea = document.createElement("textarea");
        textArea.value = `${text}\n${pageUrl}`;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setShareSuccess("Copied Link!");
        setTimeout(() => setShareSuccess(null), 2500);
      }
    } catch {
      setShareSuccess("Share unavailable");
      setTimeout(() => setShareSuccess(null), 2500);
    }
  };

  // Comprehensive PDF Report Data (Pillar Breakdown, Verdict, Advice, DOB, Zodiac, FLAMES)
  const reportData = useMemo<CalculatorReportData>(() => {
    const now = new Date();
    const generatedDate = now.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const generatedTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const activeModeLabel = MODES.find((m) => m.id === activeEngine)?.label || "Compatibility Analysis";

    return {
      meta: {
        calculatorName: love_calculatorConfig.title,
        reportTitle: "RELATIONSHIP COMPATIBILITY AUDIT REPORT",
        generatedDate,
        generatedTime,
      },
      keyMetrics: [
        {
          label: "Compatibility Score",
          value: `${result.compatibilityScore}%`,
          subtitle: result.tierBadge,
          colorTheme: "rose",
        },
        {
          label: "Couple Moniker",
          value: result.moniker,
          subtitle: `${name1} & ${name2}`,
          colorTheme: "purple",
        },
        {
          label: "Primary Mode",
          value: activeModeLabel,
          subtitle: "Algorithm Suite",
          colorTheme: "blue",
        },
        {
          label: "Romantic Passion",
          value: `${result.dimensions.passion}%`,
          subtitle: "Primary Chemistry",
          colorTheme: "amber",
        },
      ],
      recommendation: {
        title: result.verdict,
        text: result.advice,
        score: result.compatibilityScore,
        rating: result.tierBadge,
      },
      sections: [
        {
          title: "COUPLE PROFILE & INPUT PARAMETERS",
          items: [
            { label: "Person 1 Full Name", value: name1 },
            { label: "Person 2 Full Name", value: name2 },
            { label: "Analysis Engine Mode", value: activeModeLabel },
            { label: "Person 1 Date of Birth", value: dob1 || "Not specified" },
            { label: "Person 2 Date of Birth", value: dob2 || "Not specified" },
            { label: "Person 1 Zodiac Sign", value: sign1 ? sign1.toUpperCase() : "Not specified" },
            { label: "Person 2 Zodiac Sign", value: sign2 ? sign2.toUpperCase() : "Not specified" },
          ],
        },
        {
          title: "4-PILLAR DIMENSIONAL CHEMISTRY BREAKDOWN",
          items: [
            { label: "Romantic Passion & Chemistry", value: `${result.dimensions.passion}%`, highlight: true },
            { label: "Intellectual & Communication Harmony", value: `${result.dimensions.communication}%` },
            { label: "Emotional Trust & Security", value: `${result.dimensions.trust}%` },
            { label: "Long-Term Vision & Shared Growth", value: `${result.dimensions.longTermVision}%` },
          ],
        },
        {
          title: "SPECIAL INDICATORS & ENGINE SPECIFICS",
          items: [
            { label: "Assigned Couple Moniker", value: result.moniker },
            { label: "Compatibility Classification Tier", value: result.tierBadge },
            {
              label: "FLAMES Iterative Outcome",
              value: result.flames ? `${result.flames.outcome} (${result.flames.remainingLettersCount} cancellation count)` : "N/A for active mode",
            },
          ],
        },
      ],
      table: {
        title: "Pillar Synthesis Matrix",
        headers: [
          { key: "pillar", label: "Core Relationship Pillar", align: "left" },
          { key: "score", label: "Dimension Score", align: "center" },
          { key: "status", label: "Qualitative Status", align: "right" },
        ],
        rows: [
          {
            pillar: "Romantic Passion",
            score: `${result.dimensions.passion}%`,
            status: result.dimensions.passion >= 80 ? "Harmonious" : result.dimensions.passion >= 60 ? "Moderate" : "Developing",
          },
          {
            pillar: "Intellectual & Communication",
            score: `${result.dimensions.communication}%`,
            status: result.dimensions.communication >= 80 ? "Exceptional" : result.dimensions.communication >= 60 ? "Balanced" : "Growth Needed",
          },
          {
            pillar: "Emotional Trust",
            score: `${result.dimensions.trust}%`,
            status: result.dimensions.trust >= 80 ? "Rock Solid" : result.dimensions.trust >= 60 ? "Receptive" : "Foundational",
          },
          {
            pillar: "Long-Term Vision",
            score: `${result.dimensions.longTermVision}%`,
            status: result.dimensions.longTermVision >= 80 ? "Synergistic" : result.dimensions.longTermVision >= 60 ? "Aligned" : "Exploratory",
          },
        ],
      },
      notes: [
        "Generated by CalcPlatform Relationship Matcher & Compatibility Suite.",
        "Calculations are performed 100% client-side. No personal names or dates of birth are ever transmitted or stored.",
        "Mathematical and astrological synastry metrics serve educational and entertainment purposes. Long-term relationship health thrives on open communication, mutual respect, and emotional maturity.",
      ],
    };
  }, [name1, name2, activeEngine, dob1, dob2, sign1, sign2, result]);

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="bg-slate-50 dark:bg-zinc-900 p-3.5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-rose-500/10 rounded-xl text-rose-600 dark:text-rose-400">
            <Heart className="h-5 w-5 fill-rose-500 text-rose-500 animate-pulse" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-blue-600 dark:text-blue-400">
              Next-Gen Love, Compatibility &amp; Relationship Matcher
            </h3>
            <p className="text-[10px] text-slate-500 dark:text-zinc-400">
              Pythagorean Numerology • Zodiac Synastry • Life Path Mathematics • Authentic Circular FLAMES • Ultimate Chemistry
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-bold">
          <ShieldCheck className="h-3.5 w-3.5 text-rose-500" aria-hidden="true" />
          <span>100% Client-Side Privacy Safe</span>
        </div>
      </div>

      {/* WORKSPACE 2-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN (Col 7) - INPUTS & TABBED SUITE */}
        <div className="lg:col-span-7 space-y-4">
          {/* WAI-ARIA COMPLIANT TABLIST */}
          <div
            role="tablist"
            aria-label="Compatibility calculation modes"
            className="flex flex-wrap items-center p-1 bg-slate-100 dark:bg-zinc-800/80 rounded-xl border border-slate-200 dark:border-zinc-700 gap-1"
          >
            {MODES.map((tab, idx) => {
              const IconComp = tab.icon;
              const isSelected = activeEngine === tab.id;
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabRefs.current[tab.id] = el;
                  }}
                  id={`tab-${tab.id}`}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  aria-controls={`tabpanel-${tab.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  onKeyDown={(e) => handleTabKeyDown(e, idx)}
                  onClick={() => handleEngineChange(tab.id)}
                  className={`flex-1 min-w-[110px] py-2 px-2.5 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
                    isSelected
                      ? "bg-white dark:bg-zinc-900 text-rose-600 dark:text-rose-400 shadow-xs"
                      : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
                  }`}
                >
                  <IconComp className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* TAB PANEL CONTAINER */}
          <div
            id={`tabpanel-${activeEngine}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeEngine}`}
            className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs space-y-5"
          >
            <div className="border-b border-slate-100 dark:border-zinc-800 pb-3">
              <h4 className="text-xs font-extrabold text-slate-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
                Couple Details &amp; Parameters
              </h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                Enter names and optional birthdates/zodiac signs to calculate authentic multi-engine compatibility.
              </p>
            </div>

            {/* SIDE-BY-SIDE NAME INPUTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="person-1-name-input" className="text-xs font-bold text-slate-700 dark:text-zinc-300 flex items-center gap-1">
                  <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" aria-hidden="true" /> Person 1 Full Name:
                </label>
                <Input
                  id="person-1-name-input"
                  type="text"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  placeholder="e.g. Romeo"
                  aria-label="Person 1 Full Name"
                  className="h-10 text-sm font-bold bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="person-2-name-input" className="text-xs font-bold text-slate-700 dark:text-zinc-300 flex items-center gap-1">
                  <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" aria-hidden="true" /> Person 2 Full Name:
                </label>
                <Input
                  id="person-2-name-input"
                  type="text"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  placeholder="e.g. Juliet"
                  aria-label="Person 2 Full Name"
                  className="h-10 text-sm font-bold bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700"
                />
              </div>
            </div>

            {/* DYNAMIC ENGINE-SPECIFIC INPUTS */}
            {(activeEngine === "birthday" || activeEngine === "ultimate") && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-zinc-800">
                <div className="space-y-1.5">
                  <label htmlFor="dob-1-input" className="text-xs font-bold text-slate-700 dark:text-zinc-300 flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-blue-500" aria-hidden="true" /> Person 1 Date of Birth:
                  </label>
                  <Input
                    id="dob-1-input"
                    type="date"
                    value={dob1}
                    onChange={(e) => setDob1(e.target.value)}
                    aria-label="Person 1 Date of Birth"
                    className="h-9 text-xs font-sans tabular-nums bg-slate-50 dark:bg-zinc-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="dob-2-input" className="text-xs font-bold text-slate-700 dark:text-zinc-300 flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-blue-500" aria-hidden="true" /> Person 2 Date of Birth:
                  </label>
                  <Input
                    id="dob-2-input"
                    type="date"
                    value={dob2}
                    onChange={(e) => setDob2(e.target.value)}
                    aria-label="Person 2 Date of Birth"
                    className="h-9 text-xs font-sans tabular-nums bg-slate-50 dark:bg-zinc-800"
                  />
                </div>
              </div>
            )}

            {(activeEngine === "zodiac" || activeEngine === "ultimate") && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-zinc-800">
                <div className="space-y-1.5">
                  <label htmlFor="sign-1-select" className="text-xs font-bold text-slate-700 dark:text-zinc-300 flex items-center gap-1">
                    <Compass className="h-3.5 w-3.5 text-purple-500" aria-hidden="true" /> Person 1 Zodiac Sign:
                  </label>
                  <select
                    id="sign-1-select"
                    value={sign1}
                    onChange={(e) => setSign1(e.target.value as ZodiacSign)}
                    aria-label="Person 1 Zodiac Sign"
                    className="w-full h-9 px-3 rounded-lg text-xs font-bold bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-zinc-100"
                  >
                    {ZODIAC_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label} ({opt.element})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="sign-2-select" className="text-xs font-bold text-slate-700 dark:text-zinc-300 flex items-center gap-1">
                    <Compass className="h-3.5 w-3.5 text-purple-500" aria-hidden="true" /> Person 2 Zodiac Sign:
                  </label>
                  <select
                    id="sign-2-select"
                    value={sign2}
                    onChange={(e) => setSign2(e.target.value as ZodiacSign)}
                    aria-label="Person 2 Zodiac Sign"
                    className="w-full h-9 px-3 rounded-lg text-xs font-bold bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-zinc-100"
                  >
                    {ZODIAC_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label} ({opt.element})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* BIG CALCULATE BUTTON */}
            <div className="pt-2">
              <Button
                onClick={handleCalculate}
                disabled={isCalculating}
                aria-label="Calculate love and relationship compatibility score"
                className={`w-full h-12 text-base font-extrabold uppercase tracking-wider rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white shadow-md active:translate-y-0.5 transition-all cursor-pointer ${
                  isCalculating ? "animate-pulse" : ""
                }`}
              >
                <Heart className={`h-5 w-5 mr-2 fill-white ${isCalculating ? "animate-spin" : ""}`} aria-hidden="true" />
                {isCalculating ? "Calculating Love Match..." : "CALCULATE LOVE MATCH"}
              </Button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (Col 5) - LIGHT ADAPTIVE RESULT DASHBOARD */}
        <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-4 text-slate-900 dark:text-zinc-100">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-2.5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-rose-500" aria-hidden="true" /> Compatibility Result
            </span>
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-700">
              {activeEngine.toUpperCase()} MODE
            </span>
          </div>

          {/* ANIMATED CIRCULAR SCORE PROGRESS GAUGE (WITH ARIA PROGRESSBAR) */}
          <div className="text-center bg-gradient-to-br from-rose-50/60 via-pink-50/40 to-purple-50/60 dark:from-zinc-800 dark:to-zinc-800/80 p-5 rounded-2xl border border-rose-100 dark:border-zinc-700 space-y-3 shadow-xs relative overflow-hidden">
            {/* SVG Circular Progress Gauge */}
            <div
              className="relative w-36 h-36 mx-auto flex items-center justify-center"
              role="progressbar"
              aria-label="Overall love compatibility score"
              aria-valuenow={animatedScore}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuetext={`${animatedScore}% - ${result.tierBadge}`}
            >
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
                {/* Background Circle Track */}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-slate-200 dark:text-zinc-700"
                />
                {/* Animated Gradient Progress Stroke */}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="url(#loveGradient)"
                  strokeWidth="8"
                  strokeDasharray={263.89}
                  strokeDashoffset={263.89 - (263.89 * animatedScore) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-700 ease-out"
                />
                <defs>
                  <linearGradient id="loveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f43f5e" />
                    <stop offset="50%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Centered Score Number */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black font-sans tabular-nums text-slate-900 dark:text-zinc-100">
                  {animatedScore}%
                </span>
                <span className="text-[9px] font-extrabold uppercase text-rose-500 tracking-wider">
                  Match Score
                </span>
              </div>
            </div>

            {/* Tier Badge */}
            <div className="inline-block px-3 py-1 rounded-full bg-white dark:bg-zinc-800 text-xs font-extrabold text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-800 shadow-2xs">
              {result.tierBadge}
            </div>

            {/* Couple Moniker Chip */}
            <div className="flex items-center justify-center gap-1.5 pt-1">
              <span className="text-xs font-bold text-slate-600 dark:text-zinc-400">Couple Moniker:</span>
              <button
                type="button"
                onClick={handleCopyMoniker}
                aria-label={`Copy couple moniker ${result.moniker} to clipboard`}
                className="px-2.5 py-0.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-300 text-xs font-extrabold font-sans tabular-nums flex items-center gap-1 cursor-pointer transition-all border border-rose-200 dark:border-rose-800 focus-visible:ring-2 focus-visible:ring-rose-500"
              >
                <span>{result.moniker}</span>
                {copiedMoniker ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
              </button>
            </div>
          </div>

          {/* 4-PILLAR DIMENSIONAL CHEMISTRY BREAKDOWN WITH WCAG PROGRESSBARS */}
          <div className="bg-slate-50 dark:bg-zinc-800/60 p-4 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-zinc-300 block">
              4-Pillar Dimensional Chemistry Breakdown
            </span>

            <div className="space-y-2.5 text-xs">
              {/* Passion */}
              <div className="space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-rose-600 dark:text-rose-400">Romantic Passion / Chemistry</span>
                  <span className="font-sans tabular-nums">{result.dimensions.passion}%</span>
                </div>
                <div
                  className="h-2 w-full bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden"
                  role="progressbar"
                  aria-label="Romantic Passion pillar"
                  aria-valuenow={result.dimensions.passion}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-500"
                    style={{ width: `${result.dimensions.passion}%` }}
                  />
                </div>
              </div>

              {/* Communication */}
              <div className="space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-blue-600 dark:text-blue-400">Intellectual &amp; Communication</span>
                  <span className="font-sans tabular-nums">{result.dimensions.communication}%</span>
                </div>
                <div
                  className="h-2 w-full bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden"
                  role="progressbar"
                  aria-label="Intellectual and Communication pillar"
                  aria-valuenow={result.dimensions.communication}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${result.dimensions.communication}%` }}
                  />
                </div>
              </div>

              {/* Emotional Trust */}
              <div className="space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-purple-600 dark:text-purple-400">Emotional Trust &amp; Stability</span>
                  <span className="font-sans tabular-nums">{result.dimensions.trust}%</span>
                </div>
                <div
                  className="h-2 w-full bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden"
                  role="progressbar"
                  aria-label="Emotional Trust and Stability pillar"
                  aria-valuenow={result.dimensions.trust}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full transition-all duration-500"
                    style={{ width: `${result.dimensions.trust}%` }}
                  />
                </div>
              </div>

              {/* Long-Term Vision */}
              <div className="space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-emerald-600 dark:text-emerald-400">Long-Term Vision &amp; Growth</span>
                  <span className="font-sans tabular-nums">{result.dimensions.longTermVision}%</span>
                </div>
                <div
                  className="h-2 w-full bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden"
                  role="progressbar"
                  aria-label="Long-Term Vision and Growth pillar"
                  aria-valuenow={result.dimensions.longTermVision}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                    style={{ width: `${result.dimensions.longTermVision}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SUB-ENGINE SPECIFIC SUMMARY BOX */}
          <div className="bg-slate-50 dark:bg-zinc-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-2 text-xs">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-zinc-300 block">
              Engine Verdict &amp; Relationship Advice
            </span>
            <p className="font-bold text-slate-900 dark:text-zinc-100">{result.verdict}</p>
            <p className="text-slate-600 dark:text-zinc-400 leading-relaxed text-[11px]">{result.advice}</p>

            {result.flames && (activeEngine === "flames" || activeEngine === "ultimate") && (
              <div className="pt-2 border-t border-slate-200 dark:border-zinc-700 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-zinc-300">FLAMES Outcome:</span>
                <span className="px-2.5 py-0.5 rounded-md bg-rose-500 text-white font-black font-sans tabular-nums">
                  {result.flames.outcome}
                </span>
              </div>
            )}
          </div>

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={handleShare}
              aria-label="Share couple compatibility score and results"
              className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-xs font-extrabold text-slate-800 dark:text-zinc-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-slate-200 dark:border-zinc-700 focus-visible:ring-2 focus-visible:ring-rose-500"
            >
              {shareSuccess ? (
                <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              ) : (
                <Share2 className="h-4 w-4 text-rose-500" aria-hidden="true" />
              )}
              <span>{shareSuccess || "Share Result"}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowReportModal(true)}
              aria-label="Export complete relationship audit report as PDF"
              className="py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-xs font-extrabold text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              <span>PDF Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* COMPREHENSIVE PDF REPORT MODAL */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        reportData={reportData}
      />
    </div>
  );
}
