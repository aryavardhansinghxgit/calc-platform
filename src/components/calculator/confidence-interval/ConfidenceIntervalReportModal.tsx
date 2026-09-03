"use client";

import React from "react";
import { X, Printer, ShieldCheck, Layers, Award } from "lucide-react";
import {
  MeanCIResult,
  ProportionCIResult,
  TwoMeansCIResult,
  TwoProportionsCIResult,
  VarianceCIResult
} from "@/app/calculators/confidence-interval-calculator/confidence-interval-logic";

interface ConfidenceIntervalReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  meanResult: MeanCIResult;
  propResult: ProportionCIResult;
  twoMeansResult: TwoMeansCIResult;
  twoPropsResult: TwoProportionsCIResult;
  varResult: VarianceCIResult;
}

export function ConfidenceIntervalReportModal({
  isOpen,
  onClose,
  meanResult,
  propResult,
  twoMeansResult,
  twoPropsResult,
  varResult
}: ConfidenceIntervalReportModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      {/* Container Dialog */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[95vh] overflow-hidden">
        {/* Modal Header */}
        <div className="no-print p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <div>
              <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-slate-100">
                Confidence Interval Executive Report (2-Page PDF Specification)
              </h2>
              <p className="text-xs text-slate-500">
                A4 portrait layout with dedicated page breaks and audit verification.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Content */}
        <div className="p-4 sm:p-8 overflow-y-auto print:p-0 font-sans text-slate-900 dark:text-slate-100 space-y-6">
          <style dangerouslySetInnerHTML={{ __html: `
            @media print {
              @page {
                size: A4 portrait;
                margin: 8mm 10mm;
              }
              body {
                background: white !important;
                color: black !important;
                font-size: 11px !important;
              }
              .no-print {
                display: none !important;
              }
              .page-break-after {
                page-break-after: always !important;
                break-after: page !important;
              }
              .report-card {
                break-inside: avoid !important;
                border: 1px solid #cbd5e1 !important;
              }
            }
          `}} />

          {/* ========================================================================= */}
          {/* PAGE 1: MEAN ESTIMATION & PROPORTION SUITE */}
          {/* ========================================================================= */}
          <div className="page-break-after space-y-4 min-h-[920px] flex flex-col justify-between">
            <div className="space-y-4">
              {/* Header Banner */}
              <div className="border-b-2 border-blue-600 pb-3 flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                    CalcPlatform Pro &bull; Statistical Analytics Suite
                  </span>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                    Confidence Interval &amp; Estimation Report
                  </h1>
                  <p className="text-xs text-slate-500">
                    Analytical verification across normal, Student&apos;s t, Welch&apos;s t, and Chi-Square distributions.
                  </p>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <p className="font-bold text-slate-700 dark:text-slate-300">{currentDate}</p>
                  <p className="font-mono text-[10px]">Doc ID: CI-AUDIT-{Date.now().toString().slice(-6)}</p>
                </div>
              </div>

              {/* SECTION 1: SINGLE POPULATION MEAN */}
              <div className="report-card p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-blue-600" />
                    <span>Module 1: Single Population Mean Estimation (&mu;)</span>
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 border border-blue-200 dark:border-blue-900">
                    Method: {meanResult.distType}-Distribution {meanResult.distType === "t" ? `(df = ${meanResult.degreesOfFreedom})` : "(Known &sigma;)"}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <span className="text-[10px] text-slate-400 block uppercase">Sample Mean (x̄)</span>
                    <strong className="text-sm font-mono text-slate-900 dark:text-slate-100">{meanResult.mean}</strong>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <span className="text-[10px] text-slate-400 block uppercase">Sample SD (s)</span>
                    <strong className="text-sm font-mono text-slate-900 dark:text-slate-100">{meanResult.sd}</strong>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <span className="text-[10px] text-slate-400 block uppercase">Sample Size (n)</span>
                    <strong className="text-sm font-mono text-slate-900 dark:text-slate-100">{meanResult.n}</strong>
                  </div>
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <span className="text-[10px] text-slate-400 block uppercase">Confidence Level</span>
                    <strong className="text-sm font-mono text-blue-600 dark:text-blue-400">{meanResult.confidenceLevel}%</strong>
                  </div>
                </div>

                <div className="p-3 bg-blue-50/70 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900/60 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                      Calculated {meanResult.confidenceLevel}% Confidence Interval:
                    </span>
                    <span className="text-xl font-black font-mono text-slate-900 dark:text-slate-100">
                      [{meanResult.lowerBound}, {meanResult.upperBound}]
                    </span>
                    <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400 mt-0.5">
                      {meanResult.inequalityStr} &bull; {meanResult.pmStr}
                    </p>
                  </div>
                  <div className="text-right text-xs font-mono space-y-0.5">
                    <p>Standard Error (SE) = <strong>{meanResult.se}</strong></p>
                    <p>Critical Value ({meanResult.distType}*) = <strong>{meanResult.criticalValue}</strong></p>
                    <p>Margin of Error (ME) = <strong>&plusmn;{meanResult.me}</strong></p>
                  </div>
                </div>

                {/* APA Citation */}
                <div className="text-[11px] bg-slate-50 dark:bg-slate-800/60 p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-500 uppercase text-[9px] block">APA Citation:</span>
                  {meanResult.apaCitation}
                </div>
              </div>

              {/* SECTION 2: SINGLE POPULATION PROPORTION */}
              <div className="report-card p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-blue-600" />
                    <span>Module 2: Single Population Proportion Estimation (p)</span>
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 border border-emerald-200 dark:border-emerald-900">
                    Sample Proportion: p̂ = {(propResult.pHat * 100).toFixed(2)}% ({propResult.x}/{propResult.n})
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300">
                        <th className="p-2">Method</th>
                        <th className="p-2">Lower Bound</th>
                        <th className="p-2">Upper Bound</th>
                        <th className="p-2">Margin of Error</th>
                        <th className="p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono text-xs">
                      <tr className="bg-blue-50/50 dark:bg-blue-950/30 font-bold">
                        <td className="p-2 font-sans text-blue-600 dark:text-blue-400">Wilson Score Interval</td>
                        <td className="p-2">{(propResult.wilsonLower * 100).toFixed(2)}%</td>
                        <td className="p-2">{(propResult.wilsonUpper * 100).toFixed(2)}%</td>
                        <td className="p-2">&plusmn;{(propResult.wilsonME * 100).toFixed(2)}%</td>
                        <td className="p-2 font-sans text-[10px] text-blue-600">Recommended Standard</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-sans">Wald Standard Normal</td>
                        <td className="p-2">{(propResult.waldLower * 100).toFixed(2)}%</td>
                        <td className="p-2">{(propResult.waldUpper * 100).toFixed(2)}%</td>
                        <td className="p-2">&plusmn;{(propResult.waldME * 100).toFixed(2)}%</td>
                        <td className="p-2 font-sans text-[10px] text-slate-400">Asymptotic Normal</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-sans">Agresti-Coull (Plus-Four)</td>
                        <td className="p-2">{(propResult.agrestiLower * 100).toFixed(2)}%</td>
                        <td className="p-2">{(propResult.agrestiUpper * 100).toFixed(2)}%</td>
                        <td className="p-2">&plusmn;{(propResult.agrestiME * 100).toFixed(2)}%</td>
                        <td className="p-2 font-sans text-[10px] text-slate-400">Adjusted Wald</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Page 1 Footer */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-2 flex items-center justify-between text-[10px] text-slate-400">
              <span>Confidence Interval &bull; Executive Summary</span>
              <span>Page 1 of 2</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* PAGE 2: TWO-SAMPLE COMPARISONS & VARIANCE/SD SUITE */}
          {/* ========================================================================= */}
          <div className="space-y-4 min-h-[920px] flex flex-col justify-between">
            <div className="space-y-4">
              {/* Header small */}
              <div className="border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold text-blue-600">CalcPlatform Confidence Interval Report</span>
                <span>Page 2 of 2</span>
              </div>

              {/* SECTION 3: DIFFERENCE BETWEEN TWO INDEPENDENT MEANS */}
              <div className="report-card p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-blue-600" />
                    <span>Module 3: Difference Between Two Independent Means (&mu;1 - &mu;2)</span>
                  </h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                    twoMeansResult.isSignificant
                      ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                      : "bg-amber-50 text-amber-600 border-amber-200"
                  }`}>
                    {twoMeansResult.isSignificant ? "Excludes 0: Statistically Significant" : "Includes 0: Not Significant"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg space-y-1 font-mono">
                    <span className="text-[10px] text-slate-400 block uppercase font-sans font-bold">Group 1 Parameters</span>
                    <p>Mean x̄1: <strong>{twoMeansResult.mean1}</strong></p>
                    <p>SD s1: <strong>{twoMeansResult.sd1}</strong> | n1: <strong>{twoMeansResult.n1}</strong></p>
                  </div>
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg space-y-1 font-mono">
                    <span className="text-[10px] text-slate-400 block uppercase font-sans font-bold">Group 2 Parameters</span>
                    <p>Mean x̄2: <strong>{twoMeansResult.mean2}</strong></p>
                    <p>SD s2: <strong>{twoMeansResult.sd2}</strong> | n2: <strong>{twoMeansResult.n2}</strong></p>
                  </div>
                </div>

                <div className="p-3 bg-blue-50/70 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                      Difference Interval: [{twoMeansResult.lowerBound}, {twoMeansResult.upperBound}]
                    </span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      Mean Difference (x̄1 - x̄2) = {twoMeansResult.diff}
                    </span>
                  </div>
                  <div className="text-right text-xs font-mono text-slate-600 dark:text-slate-400">
                    <p>Welch df = <strong>{twoMeansResult.df}</strong></p>
                    <p>SE(diff) = <strong>{twoMeansResult.seDiff}</strong> | ME = <strong>&plusmn;{twoMeansResult.me}</strong></p>
                  </div>
                </div>
              </div>

              {/* SECTION 4: DIFFERENCE BETWEEN TWO PROPORTIONS */}
              <div className="report-card p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-blue-600" />
                    <span>Module 4: Difference Between Two Proportions (p1 - p2)</span>
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 border border-blue-200">
                    Difference: {(twoPropsResult.diff * 100).toFixed(2)}%
                  </span>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase font-sans">
                      Proportion Difference Interval:
                    </span>
                    <strong className="text-base text-slate-900 dark:text-slate-100">
                      [{(twoPropsResult.lowerBound * 100).toFixed(2)}%, {(twoPropsResult.upperBound * 100).toFixed(2)}%]
                    </strong>
                  </div>
                  <div className="text-right text-slate-600 dark:text-slate-400">
                    <p>Group 1: p̂1 = {(twoPropsResult.p1Hat * 100).toFixed(2)}% ({twoPropsResult.x1}/{twoPropsResult.n1})</p>
                    <p>Group 2: p̂2 = {(twoPropsResult.p2Hat * 100).toFixed(2)}% ({twoPropsResult.x2}/{twoPropsResult.n2})</p>
                  </div>
                </div>
              </div>

              {/* SECTION 5: POPULATION VARIANCE & STANDARD DEVIATION */}
              <div className="report-card p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-blue-600" />
                    <span>Module 5: Population Variance (&sigma;&sup2;) &amp; Standard Deviation (&sigma;)</span>
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-600 border border-purple-200">
                    Chi-Square Method (df = {varResult.df})
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 bg-purple-50/50 dark:bg-purple-950/30 rounded-xl border border-purple-100 dark:border-purple-900/60">
                    <span className="text-[10px] font-bold text-purple-600 uppercase font-sans block">
                      Standard Deviation (&sigma;) CI:
                    </span>
                    <strong className="text-base text-slate-900 dark:text-slate-100">
                      [{varResult.sdLower}, {varResult.sdUpper}]
                    </strong>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] font-bold text-slate-500 uppercase font-sans block">
                      Variance (&sigma;&sup2;) CI:
                    </span>
                    <strong className="text-base text-slate-900 dark:text-slate-100">
                      [{varResult.varLower}, {varResult.varUpper}]
                    </strong>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 font-mono">
                  Critical Chi-Square Values: &chi;&sup2;(&alpha;/2) = {varResult.chi2Lower} &bull; &chi;&sup2;(1-&alpha;/2) = {varResult.chi2Upper}
                </p>
              </div>

              {/* Methodology & Verification Seal */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight">
                    Validated against standard Student&apos;s t, Welch-Satterthwaite, and Chi-Square distributions.
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>CalcPlatform Verified</span>
                </div>
              </div>
            </div>

            {/* Page 2 Footer */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-2 flex items-center justify-between text-[10px] text-slate-400">
              <span>Confidence Interval &bull; Executive Summary</span>
              <span>Page 2 of 2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
