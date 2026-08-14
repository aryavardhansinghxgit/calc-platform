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
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  // Active semester courses shortcut
  const activeSemester = semesters.find((s) => s.id === activeSemId) || semesters[0];
  const courses = activeSemester.courses;

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

  // Calculation Results
  const result: GPACalculatorOutputs = useMemo(() => {
    return calculateGPACalculator({
      mode,
      priorGpa,
      priorCredits,
      targetGpa,
      additionalCredits,
      courses,
    });
  }, [mode, priorGpa, priorCredits, targetGpa, additionalCredits, courses]);

  // Save Transcript to Local Storage
  const handleSaveTranscript = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user_gpa_transcript", JSON.stringify({ semesters, priorGpa, priorCredits }));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
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
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-zinc-100">
              Next-Gen GPA Calculator &amp; Academic Standing Planner
            </h3>
            <p className="text-[10px] text-slate-500 dark:text-zinc-400">
              College &amp; Cumulative CGPA • AP/IB 5.0 Weighted Scale • Target GPA Solver • Retake Grade Forgiveness
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSaveTranscript}
            className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-xs font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {isSaved ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Save className="h-3.5 w-3.5" />}
            <span>{isSaved ? "Saved!" : "Save Transcript"}</span>
          </button>
        </div>
      </div>

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
                  className="h-9 text-xs font-mono bg-slate-50 dark:bg-zinc-800"
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
                  className="h-9 text-xs font-mono bg-slate-50 dark:bg-zinc-800"
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
                    className="h-9 text-xs font-mono bg-slate-50 dark:bg-zinc-800"
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
                    className="h-9 text-xs font-mono bg-slate-50 dark:bg-zinc-800"
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

              {courses.map((course) => (
                <div
                  key={course.id}
                  className="grid grid-cols-12 gap-2 items-center bg-slate-50 dark:bg-zinc-800/60 p-2 rounded-xl border border-slate-200 dark:border-zinc-700/80"
                >
                  {/* Name */}
                  <div className="col-span-4">
                    <Input
                      type="text"
                      value={course.name}
                      onChange={(e) => handleUpdateCourse(course.id, "name", e.target.value)}
                      placeholder="Course name"
                      className="h-8 text-xs font-bold bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-700"
                    />
                  </div>

                  {/* Grade Dropdown */}
                  <div className="col-span-3">
                    <select
                      value={course.grade}
                      onChange={(e) => handleUpdateCourse(course.id, "grade", e.target.value as GradeLetter)}
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
                      type="number"
                      min="0"
                      max="12"
                      value={course.credits}
                      onChange={(e) => handleUpdateCourse(course.id, "credits", parseInt(e.target.value, 10) || 0)}
                      className="h-8 text-xs font-mono text-center bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-700"
                    />
                  </div>

                  {/* Course Level (High School Mode) */}
                  {mode === "weighted_hs" && (
                    <div className="col-span-2">
                      <select
                        value={course.level}
                        onChange={(e) => handleUpdateCourse(course.id, "level", e.target.value as GradeLevel)}
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
        <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-4 text-slate-900 dark:text-zinc-100">
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
              <div className="text-3xl font-black font-mono text-blue-600 dark:text-blue-400">
                {result.semesterGpa.toFixed(2)}
              </div>
            </div>

            {/* Cumulative GPA */}
            <div className="bg-slate-50 dark:bg-zinc-800/80 p-4 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-slate-500 dark:text-zinc-400 tracking-wider">
                Cumulative CGPA
              </span>
              <div className="text-3xl font-black font-mono text-purple-600 dark:text-purple-400">
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
              <div className="text-2xl font-black font-mono text-purple-700 dark:text-purple-300">
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
              <span className="text-sm font-extrabold font-mono text-slate-900 dark:text-zinc-100">
                {result.totalQualityPoints.toFixed(1)}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700">
              <span className="text-slate-500 dark:text-zinc-400 block text-[10px] font-bold">Graded Credit Hours:</span>
              <span className="text-sm font-extrabold font-mono text-slate-900 dark:text-zinc-100">
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
                <span className="font-mono text-sm text-blue-600 dark:text-blue-400 font-extrabold">
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

              <div className="space-y-1.5 font-mono text-[11px]">
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
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowReportModal(true)}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-xs font-extrabold text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <FileText className="h-4 w-4" /> Download Official Transcript PDF Report
            </button>
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
