"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  GraduationCap,
  Plus,
  Trash2,
  FileText,
  Target,
  Globe,
  Award,
  BookOpen,
  Sparkles,
  Save,
  Check,
  RotateCcw,
  BarChart2,
  Copy,
  Printer,
  Download,
  Code,
  AlertTriangle,
  FolderOpen,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReportModal from "@/components/report/ReportModal";
import { generateGenericReportData } from "@/lib/report-generator/generic-report";
import { gpa_calculatorConfig } from "@/app/calculators/gpa-calculator/config";
import { calculateGPACalculator } from "@/app/calculators/gpa-calculator/calculator";
import {
  GPAMode,
  GradeLetter,
  GradeLevel,
  CourseEntry,
  SemesterEntry,
  GPACalculatorOutputs,
} from "@/app/calculators/gpa-calculator/types";

const GRADE_OPTIONS: { label: string; value: GradeLetter; points: string }[] = [
  { label: "A+ (4.0)", value: "A+", points: "4.0" },
  { label: "A (4.0)", value: "A", points: "4.0" },
  { label: "A- (3.7)", value: "A-", points: "3.7" },
  { label: "B+ (3.3)", value: "B+", points: "3.3" },
  { label: "B (3.0)", value: "B", points: "3.0" },
  { label: "B- (2.7)", value: "B-", points: "2.7" },
  { label: "C+ (2.3)", value: "C+", points: "2.3" },
  { label: "C (2.0)", value: "C", points: "2.0" },
  { label: "C- (1.7)", value: "C-", points: "1.7" },
  { label: "D+ (1.3)", value: "D+", points: "1.3" },
  { label: "D (1.0)", value: "D", points: "1.0" },
  { label: "D- (0.7)", value: "D-", points: "0.7" },
  { label: "F (0.0)", value: "F", points: "0.0" },
  { label: "P (Pass - No GPA)", value: "P", points: "Neutral" },
  { label: "NP (No Pass - No GPA)", value: "NP", points: "Neutral" },
  { label: "W (Withdrawn - No GPA)", value: "W", points: "Neutral" },
];

export function GPACalculator() {
  // Mode Selection State
  const [mode, setMode] = useState<GPAMode>("college");

  // Prior Cumulative State
  const [priorGpa, setPriorGpa] = useState<number>(3.2);
  const [priorCredits, setPriorCredits] = useState<number>(30);

  // Target Planner Inputs
  const [targetGpa, setTargetGpa] = useState<number>(3.6);
  const [additionalCredits, setAdditionalCredits] = useState<number>(15);

  // Multi-Semester Logging State
  const [semesters, setSemesters] = useState<SemesterEntry[]>([
    {
      id: "sem-1",
      name: "Fall Semester",
      courses: [
        { id: "c1", name: "Calculus I", grade: "A", credits: 4, level: "ap_ib" },
        { id: "c2", name: "English Composition", grade: "A-", credits: 3, level: "honors" },
        { id: "c3", name: "General Chemistry", grade: "B+", credits: 4, level: "regular" },
        { id: "c4", name: "World History", grade: "B", credits: 3, level: "regular" },
      ],
    },
  ]);
  const [activeSemId, setActiveSemId] = useState<string>("sem-1");

  // UI & Report States
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isRestored, setIsRestored] = useState<boolean>(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  // Active semester courses shortcut
  const activeSemester = semesters.find((s) => s.id === activeSemId) || semesters[0];
  const courses = activeSemester.courses;

  // Feedback banner timer
  const triggerCopyFeedback = (msg: string) => {
    setCopyFeedback(msg);
    setTimeout(() => setCopyFeedback(null), 2500);
  };

  // Add New Course to Active Semester
  const handleAddCourse = () => {
    const newCourse: CourseEntry = {
      id: `course-${Date.now()}`,
      name: `Course ${courses.length + 1}`,
      grade: "A",
      credits: 3,
      level: "regular",
    };
    setSemesters((prev) =>
      prev.map((sem) => (sem.id === activeSemId ? { ...sem, courses: [...sem.courses, newCourse] } : sem))
    );
  };

  // Update Course Property
  const handleUpdateCourse = (id: string, field: keyof CourseEntry, value: any) => {
    setSemesters((prev) =>
      prev.map((sem) =>
        sem.id === activeSemId
          ? {
              ...sem,
              courses: sem.courses.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
            }
          : sem
      )
    );
  };

  // Remove Course
  const handleRemoveCourse = (id: string) => {
    if (courses.length <= 1) return;
    setSemesters((prev) =>
      prev.map((sem) =>
        sem.id === activeSemId
          ? { ...sem, courses: sem.courses.filter((c) => c.id !== id) }
          : sem
      )
    );
  };

  // Add New Semester
  const handleAddSemester = () => {
    const semNum = semesters.length + 1;
    const newSem: SemesterEntry = {
      id: `sem-${Date.now()}`,
      name: `Semester ${semNum}`,
      courses: [
        { id: `c1-${Date.now()}`, name: "Course 1", grade: "A", credits: 3, level: "regular" },
        { id: `c2-${Date.now()}`, name: "Course 2", grade: "B+", credits: 3, level: "regular" },
      ],
    };
    setSemesters((prev) => [...prev, newSem]);
    setActiveSemId(newSem.id);
  };

  // Load saved transcript on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("user_gpa_transcript");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.semesters && Array.isArray(parsed.semesters) && parsed.semesters.length > 0) {
          setSemesters(parsed.semesters);
          setActiveSemId(parsed.semesters[0].id);
        }
        if (typeof parsed.priorGpa === "number") setPriorGpa(parsed.priorGpa);
        if (typeof parsed.priorCredits === "number") setPriorCredits(parsed.priorCredits);
      }
    } catch (e) {}
  }, []);

  // Save Transcript to Local Storage
  const handleSaveTranscript = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user_gpa_transcript", JSON.stringify({ semesters, priorGpa, priorCredits }));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  // Restore Transcript from Local Storage
  const handleRestoreTranscript = () => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("user_gpa_transcript");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.semesters && Array.isArray(parsed.semesters) && parsed.semesters.length > 0) {
            setSemesters(parsed.semesters);
            setActiveSemId(parsed.semesters[0].id);
          }
          if (typeof parsed.priorGpa === "number") setPriorGpa(parsed.priorGpa);
          if (typeof parsed.priorCredits === "number") setPriorCredits(parsed.priorCredits);
          setIsRestored(true);
          setTimeout(() => setIsRestored(false), 2000);
          triggerCopyFeedback("Transcript restored from saved state!");
        } else {
          triggerCopyFeedback("No saved transcript found.");
        }
      } catch (e) {
        triggerCopyFeedback("Error restoring transcript.");
      }
    }
  };

  // Reset to initial baseline
  const handleReset = () => {
    setMode("college");
    setPriorGpa(3.2);
    setPriorCredits(30);
    setTargetGpa(3.6);
    setAdditionalCredits(15);
    const initialSemesters: SemesterEntry[] = [
      {
        id: "sem-1",
        name: "Fall Semester",
        courses: [
          { id: "c1", name: "Calculus I", grade: "A", credits: 4, level: "ap_ib" },
          { id: "c2", name: "English Composition", grade: "A-", credits: 3, level: "honors" },
          { id: "c3", name: "General Chemistry", grade: "B+", credits: 4, level: "regular" },
          { id: "c4", name: "World History", grade: "B", credits: 3, level: "regular" },
        ],
      },
    ];
    setSemesters(initialSemesters);
    setActiveSemId("sem-1");
  };

  // Calculation Results
  const result: GPACalculatorOutputs = useMemo(() => {
    return calculateGPACalculator({
      mode,
      priorGpa,
      priorCredits,
      targetGpa,
      additionalCredits,
      courses,
      semesters,
    });
  }, [mode, priorGpa, priorCredits, targetGpa, additionalCredits, courses, semesters]);

  // Validation Flags
  const hasZeroCredits = useMemo(() => {
    return courses.some((c) => Number(c.credits) <= 0);
  }, [courses]);

  // Copy Result to Clipboard
  const handleCopyResult = () => {
    let summaryText = "";
    if (mode === "college") {
      summaryText = `Semester GPA: ${result.semesterGpa.toFixed(2)}\nCumulative CGPA: ${result.cumulativeGpa.toFixed(2)}\nTotal Quality Points: ${result.totalQualityPoints.toFixed(1)}\nGraded Credits: ${result.totalGradedCredits}\nAcademic Standing: ${result.academicStanding}`;
    } else if (mode === "weighted_hs") {
      summaryText = `Weighted HS GPA (5.0): ${result.weightedGpa.toFixed(2)}\nUnweighted GPA: ${result.unweightedGpa.toFixed(2)}\nTotal Quality Points: ${result.totalQualityPoints.toFixed(1)}\nGraded Credits: ${result.totalGradedCredits}\nAcademic Standing: ${result.academicStanding}`;
    } else if (mode === "target") {
      summaryText = `Target GPA: ${targetGpa.toFixed(2)}\nCurrent Cumulative GPA: ${result.cumulativeGpa.toFixed(2)}\nRequired Future GPA: ${result.targetResult?.requiredGpa.toFixed(2) ?? "N/A"}\nUpcoming Credits: ${additionalCredits}\nFeasibility: ${result.targetResult?.isAchievable ? "Feasible" : "Unachievable on 4.0 scale"}\nGuidance: ${result.targetResult?.recommendedGradeMix ?? ""}`;
    } else if (mode === "international") {
      summaryText = `US 4.0 GPA: ${result.cumulativeGpa.toFixed(2)}\nMIT 5.0 Scale: ${result.internationalResult?.mitScale5 ?? ""}/5.0\nCanadian/ASU 4.33 Scale: ${result.internationalResult?.canadianScale433 ?? ""}/4.33\nIndian 10.0 CGPA: ${result.internationalResult?.indianCgpa10 ?? ""}/10.0\nUK Degree Class: ${result.internationalResult?.ukClassification ?? ""}\nEuropean ECTS: ${result.internationalResult?.ectsGrade ?? ""}\nNote: Illustrative conversion mapping only.`;
    }

    if (navigator.clipboard) {
      navigator.clipboard.writeText(summaryText);
      triggerCopyFeedback("Calculation result copied to clipboard!");
    }
  };

  // Copy Summary (Transcript Table)
  const handleCopySummary = () => {
    let summaryText = `ACADEMIC SUMMARY REPORT\n=========================\nMode: ${mode.toUpperCase()}\n\n`;
    semesters.forEach((sem) => {
      summaryText += `${sem.name}:\n`;
      summaryText += `Course\tGrade\tCredits\tLevel\n`;
      sem.courses.forEach((c) => {
        summaryText += `${c.name}\t${c.grade}\t${c.credits}\t${c.level}\n`;
      });
      summaryText += `\n`;
    });
    summaryText += `Prior Cumulative GPA: ${priorGpa.toFixed(2)} (${priorCredits} credits)\n`;
    summaryText += `Semester GPA: ${result.semesterGpa.toFixed(2)}\n`;
    summaryText += `Cumulative CGPA: ${result.cumulativeGpa.toFixed(2)}\n`;
    summaryText += `High School Weighted GPA: ${result.weightedGpa.toFixed(2)}\n`;
    summaryText += `Total Quality Points: ${result.totalQualityPoints.toFixed(1)}\n`;
    summaryText += `Total Graded Credits: ${result.totalGradedCredits}\n`;
    summaryText += `Academic Standing: ${result.academicStanding}\n`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(summaryText);
      triggerCopyFeedback("Full academic summary copied to clipboard!");
    }
  };

  // Export CSV (RFC-4180 compliant)
  const handleExportCSV = () => {
    const escapeCsv = (str: string) => {
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Semester,Course Name,Grade,Credits,Level\n";

    semesters.forEach((sem) => {
      sem.courses.forEach((c) => {
        csvContent += `${escapeCsv(sem.name)},${escapeCsv(c.name)},${escapeCsv(c.grade)},${c.credits},${escapeCsv(c.level)}\n`;
      });
    });

    csvContent += "\nSummary Metric,Value\n";
    csvContent += `Semester GPA,${result.semesterGpa.toFixed(2)}\n`;
    csvContent += `Cumulative CGPA,${result.cumulativeGpa.toFixed(2)}\n`;
    csvContent += `High School Weighted GPA (5.0),${result.weightedGpa.toFixed(2)}\n`;
    csvContent += `Total Quality Points,${result.totalQualityPoints.toFixed(1)}\n`;
    csvContent += `Total Graded Credits,${result.totalGradedCredits}\n`;
    csvContent += `Prior Cumulative GPA,${priorGpa.toFixed(2)}\n`;
    csvContent += `Prior Graded Credits,${priorCredits}\n`;
    csvContent += `Academic Standing,${escapeCsv(result.academicStanding)}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `gpa_transcript_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerCopyFeedback("CSV transcript exported!");
  };

  // Export TXT Report
  const handleExportTXT = () => {
    let txt = `========================================================\n`;
    txt += `       ACADEMIC TRANSCRIPT & GPA AUDIT REPORT           \n`;
    txt += `========================================================\n\n`;
    txt += `Calculation Mode: ${mode.toUpperCase()}\n`;
    txt += `Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}\n\n`;

    txt += `ACADEMIC HISTORY:\n`;
    txt += `  Prior Cumulative GPA: ${priorGpa.toFixed(2)}\n`;
    txt += `  Prior Graded Credits: ${priorCredits}\n\n`;

    semesters.forEach((sem) => {
      txt += `--------------------------------------------------------\n`;
      txt += `TERM: ${sem.name}\n`;
      txt += `--------------------------------------------------------\n`;
      sem.courses.forEach((c) => {
        txt += `  * ${c.name.padEnd(28)} | Grade: ${c.grade.padEnd(4)} | Credits: ${String(c.credits).padEnd(2)} | Level: ${c.level}\n`;
      });
      txt += `\n`;
    });

    txt += `--------------------------------------------------------\n`;
    txt += `PERFORMANCE SUMMARY:\n`;
    txt += `--------------------------------------------------------\n`;
    txt += `  Semester GPA:             ${result.semesterGpa.toFixed(2)}\n`;
    txt += `  Cumulative CGPA:          ${result.cumulativeGpa.toFixed(2)}\n`;
    txt += `  Weighted HS GPA (5.0):    ${result.weightedGpa.toFixed(2)}\n`;
    txt += `  Total Quality Points:     ${result.totalQualityPoints.toFixed(1)}\n`;
    txt += `  Total Graded Credits:     ${result.totalGradedCredits}\n`;
    txt += `  Academic Standing:        ${result.academicStanding}\n\n`;

    if (mode === "target" && result.targetResult) {
      txt += `TARGET GPA PLANNER ANALYSIS:\n`;
      txt += `  Desired Target GPA:       ${result.targetResult.targetGpa.toFixed(2)}\n`;
      txt += `  Upcoming Credits:         ${result.targetResult.additionalCredits}\n`;
      txt += `  Required Future GPA:      ${result.targetResult.requiredGpa.toFixed(2)}\n`;
      txt += `  Feasibility Assessment:   ${result.targetResult.isAchievable ? "Feasible" : "Mathematically unreachable on 4.0 scale"}\n`;
      txt += `  Recommendation:           ${result.targetResult.recommendedGradeMix}\n\n`;
    }

    if (mode === "international" && result.internationalResult) {
      txt += `INTERNATIONAL CONVERSIONS (Illustrative Mapping):\n`;
      txt += `  MIT 5.0 Scale:            ${result.internationalResult.mitScale5} / 5.0\n`;
      txt += `  Canadian/ASU 4.33 Scale:  ${result.internationalResult.canadianScale433} / 4.33\n`;
      txt += `  Indian 10.0 CGPA:         ${result.internationalResult.indianCgpa10} / 10.0\n`;
      txt += `  UK Degree Classification: ${result.internationalResult.ukClassification}\n`;
      txt += `  European ECTS Grade:      ${result.internationalResult.ectsGrade}\n\n`;
    }

    txt += `DISCLAIMER:\nThis document is an illustrative academic planning report generated by CalcPlatform.\nOfficial transcript evaluation must be verified with your institution's registrar.\n`;

    const blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `academic_report_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    triggerCopyFeedback("TXT report downloaded!");
  };

  // Copy LaTeX Equations
  const handleCopyLaTeX = () => {
    const latex = `\\begin{aligned}
\\text{Quality Points}_i &= G_i \\times C_i \\\\
\\text{Semester GPA} &= \\frac{\\sum Q_i}{\\sum C_i} = \\frac{${result.totalQualityPoints.toFixed(1)}}{${result.totalGradedCredits}} = ${result.semesterGpa.toFixed(2)} \\\\
\\text{Cumulative GPA} &= \\frac{\\text{Prior Points} + \\sum Q_i}{\\text{Prior Credits} + \\sum C_i} = \\frac{${(priorGpa * priorCredits + result.totalQualityPoints).toFixed(1)}}{${priorCredits + result.totalGradedCredits}} = ${result.cumulativeGpa.toFixed(2)} \\\\
\\text{Required Future GPA} &= \\frac{T \\times (C_{\\text{cum}} + C_{\\text{fut}}) - Q_{\\text{cum}}}{C_{\\text{fut}}}
\\end{aligned}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(latex);
      triggerCopyFeedback("LaTeX equations copied to clipboard!");
    }
  };

  // Print
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // PDF Report Data
  const reportData = useMemo(() => {
    return generateGenericReportData(
      gpa_calculatorConfig,
      {
        mode,
        priorGpa,
        priorCredits,
      },
      {
        success: true,
        data: {},
        formatted: {
          semesterGpa: result.semesterGpa.toFixed(2),
          cumulativeGpa: result.cumulativeGpa.toFixed(2),
          weightedGpa: result.weightedGpa.toFixed(2),
          academicStanding: result.academicStanding,
        },
      }
    );
  }, [mode, priorGpa, priorCredits, result]);

  return (
    <div className="space-y-6">
      {/* HEADER CONTROL BAR */}
      <div className="bg-slate-50 dark:bg-zinc-900 p-3.5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400">
            <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-blue-600 dark:text-blue-400">
              Next-Gen GPA Calculator &amp; Academic Standing Planner
            </h3>
            <p className="text-[10px] text-slate-500 dark:text-zinc-400">
              College &amp; Cumulative CGPA • AP/IB 5.0 Weighted Scale • Target GPA Solver • Retake Grade Forgiveness
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={handleReset}
            className="px-2.5 py-1.5 rounded-xl bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-xs font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1 transition-all cursor-pointer"
            title="Reset calculator to defaults"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
          <button
            type="button"
            onClick={handleSaveTranscript}
            className="px-2.5 py-1.5 rounded-xl bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-xs font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1 transition-all cursor-pointer"
            title="Save current courses to browser storage"
          >
            {isSaved ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Save className="h-3.5 w-3.5" />}
            <span>{isSaved ? "Saved!" : "Save"}</span>
          </button>
          <button
            type="button"
            onClick={handleRestoreTranscript}
            className="px-2.5 py-1.5 rounded-xl bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-xs font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1 transition-all cursor-pointer"
            title="Restore transcript from browser storage"
          >
            {isRestored ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <FolderOpen className="h-3.5 w-3.5" />}
            <span>Restore</span>
          </button>
        </div>
      </div>

      {/* COPY FEEDBACK TOAST */}
      {copyFeedback && (
        <div
          role="status"
          aria-live="polite"
          className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs font-bold text-blue-700 dark:text-blue-300 flex items-center gap-2 shadow-xs transition-all"
        >
          <Check className="h-4 w-4 text-emerald-600" />
          <span>{copyFeedback}</span>
        </div>
      )}

      {/* ZERO OR INVALID CREDIT VALIDATION ALERT */}
      {hasZeroCredits && (
        <div
          role="alert"
          className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2 shadow-xs"
        >
          <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
          <span>
            <strong>Notice:</strong> One or more courses have 0 credit hours. Courses with 0 credits are excluded from graded GPA quality points to prevent division by zero.
          </span>
        </div>
      )}

      {/* WORKSPACE 2-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN (Col 7) - INPUTS & COURSE GRID */}
        <div className="lg:col-span-7 space-y-4">
          {/* TABBED MODE SUITE */}
          <div className="flex flex-wrap items-center p-1 bg-slate-100 dark:bg-zinc-800/80 rounded-xl border border-slate-200 dark:border-zinc-700 gap-1">
            {[
              { id: "college", label: "College & Cumulative", icon: GraduationCap },
              { id: "weighted_hs", label: "Weighted HS (5.0)", icon: Award },
              { id: "target", label: "Target GPA Solver", icon: Target },
              { id: "international", label: "International Scale", icon: Globe },
            ].map((tab) => {
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setMode(tab.id as GPAMode)}
                  className={`flex-1 min-w-[130px] py-2 px-2.5 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    mode === tab.id
                      ? "bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-xs"
                      : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
                  }`}
                >
                  <IconComp className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* PRIOR CUMULATIVE GPA & CREDITS BOX */}
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-blue-500" /> Prior Academic History (Optional)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label htmlFor="prior-gpa-input" className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                  Previous Cumulative GPA:
                </label>
                <Input
                  id="prior-gpa-input"
                  type="number"
                  step="0.01"
                  min="0"
                  max="4.0"
                  value={priorGpa}
                  onChange={(e) => setPriorGpa(parseFloat(e.target.value) || 0)}
                  className="h-9 text-xs font-sans tabular-nums bg-slate-50 dark:bg-zinc-800"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="prior-credits-input" className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                  Prior Graded Earned Credits:
                </label>
                <Input
                  id="prior-credits-input"
                  type="number"
                  min="0"
                  value={priorCredits}
                  onChange={(e) => setPriorCredits(parseInt(e.target.value, 10) || 0)}
                  className="h-9 text-xs font-sans tabular-nums bg-slate-50 dark:bg-zinc-800"
                />
              </div>
            </div>
          </div>

          {/* TARGET GPA PLANNER INPUTS (Mode === 'target') */}
          {mode === "target" && (
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-blue-200 dark:border-blue-900 shadow-xs space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                <Target className="h-4 w-4 text-blue-500" /> Target GPA Goal Parameters
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="target-gpa-input" className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                    Desired Graduation Target GPA:
                  </label>
                  <Input
                    id="target-gpa-input"
                    type="number"
                    step="0.01"
                    min="0"
                    max="4.0"
                    value={targetGpa}
                    onChange={(e) => setTargetGpa(parseFloat(e.target.value) || 0)}
                    className="h-9 text-xs font-sans tabular-nums bg-slate-50 dark:bg-zinc-800"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="additional-credits-input" className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                    Upcoming Future Credit Hours:
                  </label>
                  <Input
                    id="additional-credits-input"
                    type="number"
                    min="1"
                    value={additionalCredits}
                    onChange={(e) => setAdditionalCredits(parseInt(e.target.value, 10) || 0)}
                    className="h-9 text-xs font-sans tabular-nums bg-slate-50 dark:bg-zinc-800"
                  />
                </div>
              </div>
            </div>
          )}

          {/* MULTI-SEMESTER TAB LOGGER */}
          <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {semesters.map((sem) => (
                  <button
                    key={sem.id}
                    type="button"
                    onClick={() => setActiveSemId(sem.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-extrabold cursor-pointer transition-all ${
                      activeSemId === sem.id
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700"
                    }`}
                  >
                    {sem.name}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddSemester}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-xs font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" /> + Add Term
              </button>
            </div>

            {/* INTERACTIVE COURSE TABLE */}
            <div className="space-y-2.5">
              <div className="grid grid-cols-12 gap-2 text-[10px] font-extrabold uppercase text-slate-400 dark:text-zinc-400 tracking-wider px-1">
                <span className="col-span-4">Course Name</span>
                <span className="col-span-3">Grade</span>
                <span className="col-span-2 text-center">Credits</span>
                {mode === "weighted_hs" && <span className="col-span-2">Level</span>}
                <span className={`${mode === "weighted_hs" ? "col-span-1" : "col-span-3"} text-right`}>Action</span>
              </div>

              {courses.map((course, idx) => (
                <div
                  key={course.id}
                  className="grid grid-cols-12 gap-2 items-center bg-slate-50 dark:bg-zinc-800/60 p-2 rounded-xl border border-slate-200 dark:border-zinc-700/80"
                >
                  {/* Name */}
                  <div className="col-span-4">
                    <Input
                      id={`course-name-${course.id}`}
                      type="text"
                      value={course.name}
                      onChange={(e) => handleUpdateCourse(course.id, "name", e.target.value)}
                      placeholder="Course name"
                      aria-label={`Course ${idx + 1} Name`}
                      className="h-8 text-xs font-bold bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-700"
                    />
                  </div>

                  {/* Grade Dropdown */}
                  <div className="col-span-3">
                    <select
                      id={`course-grade-${course.id}`}
                      value={course.grade}
                      onChange={(e) => handleUpdateCourse(course.id, "grade", e.target.value as GradeLetter)}
                      aria-label={`Course ${idx + 1} Grade`}
                      className="w-full h-8 px-2 rounded-lg text-xs font-bold bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-zinc-100"
                    >
                      {GRADE_OPTIONS.map((g) => (
                        <option key={g.value} value={g.value}>
                          {g.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Credits */}
                  <div className="col-span-2">
                    <Input
                      id={`course-credits-${course.id}`}
                      type="number"
                      min="0"
                      max="12"
                      value={course.credits}
                      onChange={(e) => handleUpdateCourse(course.id, "credits", parseInt(e.target.value, 10) || 0)}
                      aria-label={`Course ${idx + 1} Credits`}
                      className="h-8 text-xs font-sans tabular-nums text-center bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-700"
                    />
                  </div>

                  {/* Course Level (High School Mode) */}
                  {mode === "weighted_hs" && (
                    <div className="col-span-2">
                      <select
                        id={`course-level-${course.id}`}
                        value={course.level}
                        onChange={(e) => handleUpdateCourse(course.id, "level", e.target.value as GradeLevel)}
                        aria-label={`Course ${idx + 1} Academic Level`}
                        className="w-full h-8 px-1 rounded-lg text-[10px] font-bold bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700"
                      >
                        <option value="regular">Regular (+0.0)</option>
                        <option value="honors">Honors (+0.5)</option>
                        <option value="ap_ib">AP / IB (+1.0)</option>
                      </select>
                    </div>
                  )}

                  {/* Delete Action */}
                  <div className={`${mode === "weighted_hs" ? "col-span-1" : "col-span-3"} flex items-center justify-end gap-1`}>
                    <button
                      type="button"
                      onClick={() => handleRemoveCourse(course.id)}
                      disabled={courses.length <= 1}
                      aria-label={`Delete ${course.name || `Course ${idx + 1}`}`}
                      className="p-1.5 text-slate-400 hover:text-rose-600 disabled:opacity-30 transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Add Course Button */}
              <button
                type="button"
                onClick={handleAddCourse}
                className="w-full py-2.5 rounded-xl border border-dashed border-blue-300 dark:border-zinc-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-zinc-800 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Plus className="h-4 w-4" /> Add Another Course
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (Col 5) - LIGHT ADAPTIVE RESULT DASHBOARD */}
        <div
          aria-live="polite"
          className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-4 text-slate-900 dark:text-zinc-100"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-2.5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
              <Award className="h-4 w-4 text-blue-500" /> Academic Summary
            </span>
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-700">
              {mode.toUpperCase()} MODE
            </span>
          </div>

          {/* HERO GPA BADGES */}
          <div className="grid grid-cols-2 gap-3 text-center">
            {/* Semester GPA */}
            <div className="bg-slate-50 dark:bg-zinc-800/80 p-4 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-slate-500 dark:text-zinc-400 tracking-wider">
                Semester GPA
              </span>
              <div className="text-3xl font-black font-sans tabular-nums text-blue-600 dark:text-blue-400">
                {result.semesterGpa.toFixed(2)}
              </div>
            </div>

            {/* Cumulative GPA */}
            <div className="bg-slate-50 dark:bg-zinc-800/80 p-4 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-slate-500 dark:text-zinc-400 tracking-wider">
                Cumulative CGPA
              </span>
              <div className="text-3xl font-black font-sans tabular-nums text-purple-600 dark:text-purple-400">
                {result.cumulativeGpa.toFixed(2)}
              </div>
            </div>
          </div>

          {/* WEIGHTED GPA BADGE (If HS mode) */}
          {mode === "weighted_hs" && (
            <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 p-3.5 rounded-xl border border-purple-200 dark:border-purple-800 text-center space-y-0.5">
              <span className="text-[10px] font-extrabold uppercase text-purple-600 dark:text-purple-300 tracking-wider">
                High School Weighted GPA (5.0 Scale)
              </span>
              <div className="text-2xl font-black font-sans tabular-nums text-purple-700 dark:text-purple-300">
                {result.weightedGpa.toFixed(2)}
              </div>
            </div>
          )}

          {/* ACADEMIC STANDING BADGE */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-center space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 dark:text-zinc-400 tracking-wider">
              Academic Standing / Honors Status
            </span>
            <div className="text-xs font-extrabold text-slate-900 dark:text-zinc-100">
              {result.academicStanding}
            </div>
          </div>

          {/* TOTAL QUALITY POINTS & CREDITS SUMMARY */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700">
              <span className="text-slate-500 dark:text-zinc-400 block text-[10px] font-bold">Total Quality Points:</span>
              <span className="text-sm font-extrabold font-sans tabular-nums text-slate-900 dark:text-zinc-100">
                {result.totalQualityPoints.toFixed(1)}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700">
              <span className="text-slate-500 dark:text-zinc-400 block text-[10px] font-bold">Graded Credit Hours:</span>
              <span className="text-sm font-extrabold font-sans tabular-nums text-slate-900 dark:text-zinc-100">
                {result.totalGradedCredits}
              </span>
            </div>
          </div>

          {/* TARGET GPA SOLVER RESULT BOX (Mode === 'target') */}
          {result.targetResult && mode === "target" && (
            <div className="bg-blue-50/70 dark:bg-zinc-800/80 p-4 rounded-xl border border-blue-200 dark:border-zinc-700 space-y-2 text-xs">
              <span className="text-[10px] font-extrabold uppercase text-blue-700 dark:text-blue-300 tracking-wider block">
                Target GPA Planner Solution
              </span>
              <div className="flex justify-between font-bold">
                <span>Required Future Term GPA:</span>
                <span className="font-sans tabular-nums text-sm text-blue-600 dark:text-blue-400 font-extrabold">
                  {result.targetResult.requiredGpa.toFixed(2)}
                </span>
              </div>
              <p className="text-slate-600 dark:text-zinc-300 text-[11px] leading-relaxed">
                {result.targetResult.recommendedGradeMix}
              </p>
            </div>
          )}

          {/* INTERNATIONAL CONVERSION BOX (Mode === 'international') */}
          {result.internationalResult && mode === "international" && (
            <div className="bg-slate-50 dark:bg-zinc-800/60 p-4 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-2 text-xs">
              <span className="text-[10px] font-extrabold uppercase text-slate-700 dark:text-zinc-300 tracking-wider block">
                International Grading System Equivalent
              </span>

              <div className="space-y-1.5 font-sans tabular-nums text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">MIT 5.0 Scale:</span>
                  <span className="font-bold">{result.internationalResult.mitScale5} / 5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Canadian/ASU 4.33 Scale:</span>
                  <span className="font-bold">{result.internationalResult.canadianScale433} / 4.33</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Indian 10.0 CGPA:</span>
                  <span className="font-bold">{result.internationalResult.indianCgpa10} / 10.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">UK Degree Class:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{result.internationalResult.ukClassification}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">European ECTS Grade:</span>
                  <span className="font-bold text-purple-600 dark:text-purple-400">{result.internationalResult.ectsGrade}</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-200/60 dark:border-zinc-700/60">
                *Illustrative conversion model. Official transcript evaluation requires institutional review.
              </p>
            </div>
          )}

          {/* EXPORT & ACTION SUITE */}
          <div className="pt-2 space-y-2.5">
            <button
              type="button"
              onClick={() => setShowReportModal(true)}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-xs font-extrabold text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <FileText className="h-4 w-4" /> Download Academic Summary PDF Report
            </button>

            {/* Quick Export Grid */}
            <div className="grid grid-cols-3 gap-1.5 text-[11px] font-bold text-slate-700 dark:text-zinc-300">
              <button
                type="button"
                onClick={handleCopyResult}
                className="p-2 rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                title="Copy current mode calculation result"
              >
                <Copy className="h-3.5 w-3.5 text-blue-500" />
                <span>Copy Result</span>
              </button>
              <button
                type="button"
                onClick={handleCopySummary}
                className="p-2 rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                title="Copy complete transcript table and summary"
              >
                <FileText className="h-3.5 w-3.5 text-purple-500" />
                <span>Transcript</span>
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="p-2 rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                title="Print this page"
              >
                <Printer className="h-3.5 w-3.5 text-emerald-500" />
                <span>Print</span>
              </button>
              <button
                type="button"
                onClick={handleExportCSV}
                className="p-2 rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                title="Download CSV course data"
              >
                <Download className="h-3.5 w-3.5 text-amber-500" />
                <span>CSV</span>
              </button>
              <button
                type="button"
                onClick={handleExportTXT}
                className="p-2 rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                title="Download plain text academic report"
              >
                <FileText className="h-3.5 w-3.5 text-cyan-500" />
                <span>TXT</span>
              </button>
              <button
                type="button"
                onClick={handleCopyLaTeX}
                className="p-2 rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 flex items-center justify-center gap-1 transition-colors cursor-pointer"
                title="Copy LaTeX formula derivation"
              >
                <Code className="h-3.5 w-3.5 text-indigo-500" />
                <span>LaTeX</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* REPORT MODAL */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        data={reportData}
      />
    </div>
  );
}
