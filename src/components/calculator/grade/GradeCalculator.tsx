"use client";

import React, { useState, useMemo } from "react";
import {
  FileCheck,
  Plus,
  Trash2,
  FileText,
  Target,
  Sparkles,
  Save,
  Check,
  Sliders,
  TrendingUp,
  Percent,
  Award,
  Layers,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReportModal from "@/components/report/ReportModal";
import { generateGenericReportData } from "@/lib/report-generator/generic-report";
import { grade_calculatorConfig } from "@/app/calculators/grade-calculator/config";
import { calculateGradeCalculator } from "@/app/calculators/grade-calculator/calculator";
import {
  GradeMode,
  CurveMode,
  AssignmentEntry,
  CategoryEntry,
  GradeCalculatorOutputs,
} from "@/app/calculators/grade-calculator/types";

function CategoryPieChart({ breakdowns }: { breakdowns: any[] }) {
  const sliceColors = [
    "#10b981", // Emerald
    "#3b82f6", // Blue
    "#8b5cf6", // Purple
    "#f59e0b", // Amber
    "#f43f5e", // Rose
    "#06b6d4", // Cyan
    "#ec4899", // Pink
  ];

  const R = 36;
  const C = 2 * Math.PI * R;

  const totalWeight = useMemo(() => {
    return breakdowns.reduce((acc, b) => acc + b.weight, 0);
  }, [breakdowns]);

  const slices = useMemo(() => {
    let accumulatedAngle = 0;
    return breakdowns.map((cat, idx) => {
      const portion = totalWeight > 0 ? cat.weight / totalWeight : 0;
      const strokeLength = portion * C;
      const strokeOffset = C - strokeLength;
      const rotation = (accumulatedAngle / 100) * 360;
      accumulatedAngle += cat.weight;
      return {
        ...cat,
        color: sliceColors[idx % sliceColors.length],
        strokeLength,
        strokeOffset,
        rotation,
      };
    });
  }, [breakdowns, totalWeight, C]);

  return (
    <div className="bg-slate-50 dark:bg-zinc-800/60 p-4 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-3">
      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-zinc-300 block text-center">
        Category Weight Contribution Pie Chart
      </span>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {/* Vector Donut Pie Chart */}
        <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background Circle Track */}
            <circle
              cx="50"
              cy="50"
              r={R}
              stroke="currentColor"
              strokeWidth="14"
              fill="transparent"
              className="text-slate-200 dark:text-zinc-700"
            />

            {/* Slices */}
            {slices.map((slice, idx) => {
              const dashArray = `${slice.strokeLength} ${C - slice.strokeLength}`;
              return (
                <circle
                  key={idx}
                  cx="50"
                  cy="50"
                  r={R}
                  stroke={slice.color}
                  strokeWidth="14"
                  strokeDasharray={dashArray}
                  strokeDashoffset={0}
                  transform={`rotate(${slice.rotation} 50 50)`}
                  fill="transparent"
                  className="transition-all duration-500 ease-out hover:opacity-80"
                />
              );
            })}
          </svg>

          {/* Centered Total Weight Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-sm font-black font-sans tabular-nums text-slate-900 dark:text-zinc-100">
              {totalWeight}%
            </span>
            <span className="text-[8px] font-extrabold uppercase text-slate-400 tracking-wider">
              Weight
            </span>
          </div>
        </div>

        {/* Pie Chart Legend */}
        <div className="space-y-1.5 flex-1 min-w-0 text-xs w-full">
          {slices.map((slice, idx) => (
            <div key={idx} className="flex items-center justify-between gap-2 text-[11px] font-sans tabular-nums">
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: slice.color }}
                />
                <span className="font-bold text-slate-800 dark:text-zinc-200 truncate">
                  {slice.name} ({slice.weight}%):
                </span>
              </div>
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400 shrink-0">
                +{slice.contributionToFinal}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function GradeCalculator() {
  // Mode Selection State
  const [mode, setMode] = useState<GradeMode>("weighted");

  // Curves & Modifiers State
  const [curveMode, setCurveMode] = useState<CurveMode>("none");
  const [curveValue, setCurveValue] = useState<number>(5);

  // Final Exam Target Solver Inputs
  const [currentGrade, setCurrentGrade] = useState<number>(85);
  const [targetGrade, setTargetGrade] = useState<number>(90);
  const [finalExamWeight, setFinalExamWeight] = useState<number>(20);

  // Category & Assignment State (Weighted Mode)
  const [categories, setCategories] = useState<CategoryEntry[]>([
    {
      id: "cat-1",
      name: "Homework & Assignments",
      weight: 20,
      dropLowestCount: 1,
      assignments: [
        { id: "a1", name: "Homework 1", grade: 95, weightOrMax: 20 },
        { id: "a2", name: "Homework 2", grade: 60, weightOrMax: 20 },
        { id: "a3", name: "Homework 3", grade: 90, weightOrMax: 20 },
      ],
    },
    {
      id: "cat-2",
      name: "Quizzes & Midterm",
      weight: 30,
      dropLowestCount: 0,
      assignments: [
        { id: "a4", name: "Quiz 1", grade: 88, weightOrMax: 15 },
        { id: "a5", name: "Midterm Exam", grade: 84, weightOrMax: 15 },
      ],
    },
    {
      id: "cat-3",
      name: "Final Project & Exam",
      weight: 50,
      dropLowestCount: 0,
      assignments: [{ id: "a6", name: "Final Project", grade: 92, weightOrMax: 50 }],
    },
  ]);

  // Points-Based Mode Assignments State
  const [pointsAssignments, setPointsAssignments] = useState<AssignmentEntry[]>([
    { id: "pa1", name: "Homework 1", grade: 45, weightOrMax: 50 },
    { id: "pa2", name: "Quiz 1", grade: 18, weightOrMax: 20 },
    { id: "pa3", name: "Midterm Exam", grade: 88, weightOrMax: 100 },
    { id: "pa4", name: "Research Essay", grade: 95, weightOrMax: 100 },
  ]);

  // UI & Report States
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  // Preset Template Handlers
  const handleApplyCollegePreset = () => {
    setMode("weighted");
    setCategories([
      {
        id: "cat-1",
        name: "Homework & Quizzes",
        weight: 20,
        dropLowestCount: 1,
        assignments: [
          { id: "a1", name: "HW 1", grade: 90, weightOrMax: 20 },
          { id: "a2", name: "HW 2", grade: 85, weightOrMax: 20 },
        ],
      },
      {
        id: "cat-2",
        name: "Midterm Exam",
        weight: 30,
        dropLowestCount: 0,
        assignments: [{ id: "a3", name: "Midterm Exam", grade: 88, weightOrMax: 30 }],
      },
      {
        id: "cat-3",
        name: "Final Exam",
        weight: 50,
        dropLowestCount: 0,
        assignments: [{ id: "a4", name: "Final Exam", grade: 92, weightOrMax: 50 }],
      },
    ]);
  };

  const handleApplyHighSchoolPreset = () => {
    setMode("weighted");
    setCategories([
      {
        id: "cat-1",
        name: "Quarter 1 Grade",
        weight: 40,
        dropLowestCount: 0,
        assignments: [{ id: "a1", name: "Quarter 1 Avg", grade: 88, weightOrMax: 40 }],
      },
      {
        id: "cat-2",
        name: "Quarter 2 Grade",
        weight: 40,
        dropLowestCount: 0,
        assignments: [{ id: "a2", name: "Quarter 2 Avg", grade: 91, weightOrMax: 40 }],
      },
      {
        id: "cat-3",
        name: "Semester Final Exam",
        weight: 20,
        dropLowestCount: 0,
        assignments: [{ id: "a3", name: "Semester Final", grade: 85, weightOrMax: 20 }],
      },
    ]);
  };

  // Add Category (Weighted Mode)
  const handleAddCategory = () => {
    const newCat: CategoryEntry = {
      id: `cat-${Date.now()}`,
      name: `New Category ${categories.length + 1}`,
      weight: 10,
      dropLowestCount: 0,
      assignments: [{ id: `a-${Date.now()}`, name: "Assignment 1", grade: 85, weightOrMax: 10 }],
    };
    setCategories((prev) => [...prev, newCat]);
  };

  // Add Assignment to Category (Weighted Mode)
  const handleAddAssignment = (catId: string) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === catId) {
          const newA: AssignmentEntry = {
            id: `a-${Date.now()}`,
            name: `Assignment ${cat.assignments.length + 1}`,
            grade: 85,
            weightOrMax: cat.weight,
          };
          return { ...cat, assignments: [...cat.assignments, newA] };
        }
        return cat;
      })
    );
  };

  // Update Category Field
  const handleUpdateCategory = (catId: string, field: keyof CategoryEntry, value: any) => {
    setCategories((prev) => prev.map((c) => (c.id === catId ? { ...c, [field]: value } : c)));
  };

  // Update Assignment Field (Weighted Mode)
  const handleUpdateAssignment = (catId: string, aId: string, field: keyof AssignmentEntry, value: any) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === catId) {
          return {
            ...cat,
            assignments: cat.assignments.map((a) => (a.id === aId ? { ...a, [field]: value } : a)),
          };
        }
        return cat;
      })
    );
  };

  // Delete Assignment (Weighted Mode)
  const handleDeleteAssignment = (catId: string, aId: string) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === catId && cat.assignments.length > 1) {
          return { ...cat, assignments: cat.assignments.filter((a) => a.id !== aId) };
        }
        return cat;
      })
    );
  };

  // Delete Category (Weighted Mode)
  const handleDeleteCategory = (catId: string) => {
    if (categories.length <= 1) return;
    setCategories((prev) => prev.filter((c) => c.id !== catId));
  };

  // Points Mode Handlers
  const handleAddPointAssignment = () => {
    const newA: AssignmentEntry = {
      id: `pa-${Date.now()}`,
      name: `Assignment ${pointsAssignments.length + 1}`,
      grade: 80,
      weightOrMax: 100,
    };
    setPointsAssignments((prev) => [...prev, newA]);
  };

  const handleUpdatePointAssignment = (id: string, field: keyof AssignmentEntry, value: any) => {
    setPointsAssignments((prev) => prev.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  };

  const handleDeletePointAssignment = (id: string) => {
    if (pointsAssignments.length <= 1) return;
    setPointsAssignments((prev) => prev.filter((a) => a.id !== id));
  };

  // Calculation Results Synthesizer
  const result: GradeCalculatorOutputs = useMemo(() => {
    return calculateGradeCalculator({
      mode,
      curveMode,
      curveValue,
      currentGrade,
      targetGrade,
      finalExamWeight,
      categories,
      assignments: pointsAssignments,
    });
  }, [mode, curveMode, curveValue, currentGrade, targetGrade, finalExamWeight, categories, pointsAssignments]);

  // Save Grade Sheet to Local Storage
  const handleSaveGradeSheet = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user_grade_sheet", JSON.stringify({ categories, pointsAssignments, mode }));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  // PDF Report Data
  const reportData = useMemo(() => {
    return generateGenericReportData(
      grade_calculatorConfig,
      {
        mode,
        curveMode,
      },
      {
        success: true,
        data: {},
        formatted: {
          overallGrade: `${result.overallGrade}%`,
          letterGrade: result.letterGrade,
          performanceStatus: result.performanceStatus,
        },
      }
    );
  }, [mode, curveMode, result]);

  return (
    <div className="space-y-6">
      {/* HEADER CONTROL BAR */}
      <div className="bg-slate-50 dark:bg-zinc-900 p-3.5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-400">
            <FileCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-zinc-100">
              Next-Gen Grade Calculator &amp; Final Exam Target Solver
            </h3>
            <p className="text-[10px] text-slate-500 dark:text-zinc-400">
              Weighted Percentage System • Total Points System • Drop Lowest N Scores • Curve Modifiers
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSaveGradeSheet}
            className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-xs font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {isSaved ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Save className="h-3.5 w-3.5" />}
            <span>{isSaved ? "Saved!" : "Save Course Sheet"}</span>
          </button>
        </div>
      </div>

      {/* WORKSPACE 2-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN (Col 7) - INPUTS & ASSIGNMENT GRID */}
        <div className="lg:col-span-7 space-y-4">
          {/* TABBED MODE SUITE */}
          <div className="flex flex-wrap items-center p-1 bg-slate-100 dark:bg-zinc-800/80 rounded-xl border border-slate-200 dark:border-zinc-700 gap-1">
            {[
              { id: "weighted", label: "Weighted Grade (%)", icon: Percent },
              { id: "points", label: "Total Points", icon: Layers },
              { id: "final_solver", label: "Final Exam Target", icon: Target },
              { id: "scale_converter", label: "Scale & Letter Converter", icon: Award },
            ].map((tab) => {
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setMode(tab.id as GradeMode)}
                  className={`flex-1 min-w-[130px] py-2 px-2.5 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    mode === tab.id
                      ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-xs"
                      : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
                  }`}
                >
                  <IconComp className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* SYLLABUS PRESET TEMPLATES & CURVE SELECTOR */}
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-zinc-800 pb-2.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Sliders className="h-3.5 w-3.5 text-emerald-500" /> Syllabus Presets &amp; Grading Curves
              </span>

              {/* Preset Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleApplyCollegePreset}
                  className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 text-[10px] font-extrabold border border-emerald-200 dark:border-emerald-800 transition-all cursor-pointer"
                >
                  College 20/30/50
                </button>
                <button
                  type="button"
                  onClick={handleApplyHighSchoolPreset}
                  className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 text-blue-700 dark:text-blue-300 text-[10px] font-extrabold border border-blue-200 dark:border-blue-800 transition-all cursor-pointer"
                >
                  High School 40/40/20
                </button>
              </div>
            </div>

            {/* Curve Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <label htmlFor="curve-mode-select" className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                  Grading Curve Modifier:
                </label>
                <select
                  id="curve-mode-select"
                  value={curveMode}
                  onChange={(e) => setCurveMode(e.target.value as CurveMode)}
                  className="w-full h-8 px-2 rounded-lg text-xs font-bold bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-zinc-100"
                >
                  <option value="none">No Curve Applied</option>
                  <option value="flat">Flat Point Boost (+Pts)</option>
                  <option value="sqrt">Square-Root Curve (10 × √Raw)</option>
                </select>
              </div>

              {curveMode === "flat" && (
                <div className="space-y-1">
                  <label htmlFor="flat-curve-input" className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                    Flat Point Boost Amount (+%):
                  </label>
                  <Input
                    id="flat-curve-input"
                    type="number"
                    value={curveValue}
                    onChange={(e) => setCurveValue(parseFloat(e.target.value) || 0)}
                    className="h-8 text-xs font-sans tabular-nums bg-slate-50 dark:bg-zinc-800"
                  />
                </div>
              )}
            </div>
          </div>

          {/* FINAL EXAM TARGET SOLVER INPUTS (Mode === 'final_solver') */}
          {mode === "final_solver" && (
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-emerald-200 dark:border-emerald-900 shadow-xs space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                <Target className="h-4 w-4 text-emerald-500" /> Final Exam Target Solver Parameters
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label htmlFor="current-grade-input" className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                    Current Course Grade (%):
                  </label>
                  <Input
                    id="current-grade-input"
                    type="number"
                    value={currentGrade}
                    onChange={(e) => setCurrentGrade(parseFloat(e.target.value) || 0)}
                    className="h-9 text-xs font-sans tabular-nums bg-slate-50 dark:bg-zinc-800"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="target-grade-input" className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                    Desired Class Grade (%):
                  </label>
                  <Input
                    id="target-grade-input"
                    type="number"
                    value={targetGrade}
                    onChange={(e) => setTargetGrade(parseFloat(e.target.value) || 0)}
                    className="h-9 text-xs font-sans tabular-nums bg-slate-50 dark:bg-zinc-800"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="final-weight-input" className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                    Final Exam Weight (%):
                  </label>
                  <Input
                    id="final-weight-input"
                    type="number"
                    min="1"
                    max="99"
                    value={finalExamWeight}
                    onChange={(e) => setFinalExamWeight(parseFloat(e.target.value) || 0)}
                    className="h-9 text-xs font-sans tabular-nums bg-slate-50 dark:bg-zinc-800"
                  />
                </div>
              </div>
            </div>
          )}

          {/* WEIGHTED PERCENTAGE MODE GRID */}
          {mode === "weighted" && (
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
                  Weighted Category &amp; Assignment Sheet
                </span>
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white flex items-center gap-1 cursor-pointer transition-all shadow-xs"
                >
                  <Plus className="h-3.5 w-3.5" /> + Add Category
                </button>
              </div>

              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 space-y-3"
                >
                  {/* Category Header Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 bg-slate-100/80 dark:bg-zinc-800/90 p-2.5 rounded-xl border border-slate-200/80 dark:border-zinc-700/80">
                    {/* Category Name */}
                    <div className="flex-1 min-w-[150px]">
                      <Input
                        type="text"
                        value={cat.name}
                        onChange={(e) => handleUpdateCategory(cat.id, "name", e.target.value)}
                        placeholder="Category Name"
                        className="h-8 text-xs font-extrabold text-slate-900 dark:text-zinc-100 bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-700"
                      />
                    </div>

                    {/* Category Weight Input Badge */}
                    <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 px-2.5 py-1 rounded-lg border border-slate-300 dark:border-zinc-700 shadow-2xs">
                      <span className="text-[11px] font-extrabold text-slate-700 dark:text-zinc-300">Weight:</span>
                      <input
                        type="number"
                        value={cat.weight}
                        onChange={(e) => handleUpdateCategory(cat.id, "weight", parseFloat(e.target.value) || 0)}
                        className="w-12 h-6 text-center text-xs font-sans tabular-nums font-black text-emerald-600 dark:text-emerald-400 bg-transparent outline-none"
                      />
                      <span className="text-xs font-black text-slate-700 dark:text-zinc-300">%</span>
                    </div>

                    {/* Drop Lowest Dropdown Badge */}
                    <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 px-2.5 py-1 rounded-lg border border-slate-300 dark:border-zinc-700 shadow-2xs">
                      <span className="text-[11px] font-extrabold text-slate-700 dark:text-zinc-300">Drop Lowest:</span>
                      <select
                        value={cat.dropLowestCount}
                        onChange={(e) =>
                          handleUpdateCategory(cat.id, "dropLowestCount", parseInt(e.target.value, 10) || 0)
                        }
                        className="bg-transparent text-xs font-extrabold text-slate-900 dark:text-zinc-100 outline-none cursor-pointer"
                      >
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                      </select>
                    </div>

                    {/* Delete Category Button */}
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(cat.id)}
                      disabled={categories.length <= 1}
                      className="p-1 text-slate-400 hover:text-rose-600 disabled:opacity-30 transition-colors cursor-pointer"
                      title="Delete Category"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Assignments List */}
                  <div className="space-y-2 pt-1">
                    {cat.assignments.map((a) => (
                      <div key={a.id} className="grid grid-cols-12 gap-2 items-center bg-white dark:bg-zinc-900 p-1.5 rounded-lg border border-slate-200/60 dark:border-zinc-800">
                        <div className="col-span-7">
                          <Input
                            type="text"
                            value={a.name}
                            onChange={(e) => handleUpdateAssignment(cat.id, a.id, "name", e.target.value)}
                            placeholder="Assignment name"
                            className="h-7 text-xs font-medium text-slate-900 dark:text-zinc-100 bg-slate-50 dark:bg-zinc-800 border-none"
                          />
                        </div>

                        <div className="col-span-4 flex items-center justify-end gap-1 px-1">
                          <span className="text-[10px] font-bold text-slate-500">Score:</span>
                          <Input
                            type="number"
                            value={a.grade}
                            onChange={(e) =>
                              handleUpdateAssignment(cat.id, a.id, "grade", parseFloat(e.target.value) || 0)
                            }
                            className="h-7 w-16 text-xs font-sans tabular-nums font-bold text-center text-slate-900 dark:text-zinc-100 bg-slate-50 dark:bg-zinc-800 px-1"
                          />
                          <span className="text-xs font-bold text-slate-600 dark:text-zinc-400">%</span>
                        </div>

                        <div className="col-span-1 text-right">
                          <button
                            type="button"
                            onClick={() => handleDeleteAssignment(cat.id, a.id)}
                            disabled={cat.assignments.length <= 1}
                            className="text-slate-400 hover:text-rose-600 disabled:opacity-30 cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => handleAddAssignment(cat.id)}
                      className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 pt-1 cursor-pointer"
                    >
                      <Plus className="h-3 w-3" /> Add Assignment to {cat.name}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* POINTS-BASED MODE GRID */}
          {mode === "points" && (
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
                  Points-Based Assignment Sheet
                </span>
                <button
                  type="button"
                  onClick={handleAddPointAssignment}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white flex items-center gap-1 cursor-pointer transition-all shadow-xs"
                >
                  <Plus className="h-3.5 w-3.5" /> + Add Assignment
                </button>
              </div>

              <div className="space-y-2">
                {pointsAssignments.map((a) => (
                  <div key={a.id} className="grid grid-cols-12 gap-2 items-center bg-slate-50 dark:bg-zinc-800/60 p-2 rounded-xl">
                    <div className="col-span-5">
                      <Input
                        type="text"
                        value={a.name}
                        onChange={(e) => handleUpdatePointAssignment(a.id, "name", e.target.value)}
                        placeholder="Assignment name"
                        className="h-8 text-xs font-bold bg-white dark:bg-zinc-900"
                      />
                    </div>

                    <div className="col-span-3">
                      <Input
                        type="number"
                        value={a.grade}
                        onChange={(e) => handleUpdatePointAssignment(a.id, "grade", parseFloat(e.target.value) || 0)}
                        placeholder="Earned"
                        className="h-8 text-xs font-sans tabular-nums text-center bg-white dark:bg-zinc-900"
                      />
                    </div>

                    <div className="col-span-3">
                      <Input
                        type="number"
                        value={a.weightOrMax}
                        onChange={(e) => handleUpdatePointAssignment(a.id, "weightOrMax", parseFloat(e.target.value) || 0)}
                        placeholder="Max Points"
                        className="h-8 text-xs font-sans tabular-nums text-center bg-white dark:bg-zinc-900"
                      />
                    </div>

                    <div className="col-span-1 text-right">
                      <button
                        type="button"
                        onClick={() => handleDeletePointAssignment(a.id)}
                        disabled={pointsAssignments.length <= 1}
                        className="text-slate-400 hover:text-rose-600 disabled:opacity-30 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN (Col 5) - LIGHT ADAPTIVE RESULT DASHBOARD */}
        <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-4 text-slate-900 dark:text-zinc-100">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-2.5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
              <Award className="h-4 w-4 text-emerald-500" /> Grade Performance Results
            </span>
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
              {mode.toUpperCase()} MODE
            </span>
          </div>

          {/* HERO OVERALL GRADE HERO BADGE */}
          <div className="text-center bg-gradient-to-br from-emerald-50/60 via-teal-50/40 to-blue-50/60 dark:from-zinc-800 dark:to-zinc-800/80 p-5 rounded-2xl border border-emerald-100 dark:border-zinc-700 space-y-3 shadow-xs">
            <span className="text-[10px] font-extrabold uppercase text-slate-500 dark:text-zinc-400 tracking-wider block">
              Current Overall Course Grade
            </span>

            <div className="flex items-center justify-center gap-3">
              <span className="text-4xl font-black font-sans tabular-nums text-emerald-600 dark:text-emerald-400">
                {result.overallGrade}%
              </span>
              <span className="px-3 py-1 rounded-xl bg-white dark:bg-zinc-900 text-2xl font-black text-slate-900 dark:text-zinc-100 border border-slate-200 dark:border-zinc-700 shadow-2xs">
                {result.letterGrade}
              </span>
            </div>

            {/* Performance Status Badge */}
            <div className="inline-block px-3 py-1 rounded-full bg-white dark:bg-zinc-800 text-xs font-extrabold text-emerald-600 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-2xs">
              {result.performanceStatus}
            </div>
          </div>

          {/* CATEGORY WEIGHT CONTRIBUTION PIE CHART */}
          {result.categoryBreakdowns && result.categoryBreakdowns.length > 0 && (
            <CategoryPieChart breakdowns={result.categoryBreakdowns} />
          )}

          {/* TARGET MATRIX SOLVER RESULT (If Mode === 'final_solver') */}
          {result.finalSolverResult && mode === "final_solver" && (
            <div className="bg-emerald-50/70 dark:bg-zinc-800/80 p-4 rounded-xl border border-emerald-200 dark:border-zinc-700 space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-extrabold uppercase text-emerald-700 dark:text-emerald-300 tracking-wider">
                  Required Final Exam Score
                </span>
                <span className="text-lg font-black font-sans tabular-nums text-emerald-600 dark:text-emerald-400">
                  {result.finalSolverResult.requiredFinalScore}%
                </span>
              </div>
              <p className="text-slate-600 dark:text-zinc-300 text-[11px] leading-relaxed">
                {result.finalSolverResult.verdict}
              </p>

              {/* Target Grade Matrix */}
              <div className="pt-2 border-t border-emerald-200 dark:border-zinc-700 space-y-1">
                <span className="text-[10px] font-extrabold uppercase text-slate-500 dark:text-zinc-400 block">
                  Final Exam Target Score Matrix:
                </span>
                {result.finalSolverResult.targetMatrix.map((tm, idx) => (
                  <div key={idx} className="flex justify-between font-sans tabular-nums text-[11px]">
                    <span>Target {tm.letter}:</span>
                    <span className={`font-bold ${tm.isAchievable ? "text-emerald-600" : "text-rose-600"}`}>
                      {tm.requiredScore}%
                    </span>
                  </div>
                ))}
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
              <FileText className="h-4 w-4" /> Download Course Grade PDF Report
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
