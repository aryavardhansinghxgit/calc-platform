"use client";

import React, { useEffect, useState } from "react";
import { X, Printer, Download, FileText, CheckCircle, ShieldCheck, Car, DollarSign } from "lucide-react";
import { AutoLoanResult, ExtendedAutoLoanInput } from "@/lib/calculator-engine/formulas/auto-loan";
import { formatCurrency } from "@/lib/calculator-engine/formatters";

export interface AutoLoanReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputs: ExtendedAutoLoanInput;
  results: AutoLoanResult;
}

export function AutoLoanReportModal({ isOpen, onClose, inputs, results }: AutoLoanReportModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !results || !mounted) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDateStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div id="printable-report-portal" className="no-print-wrapper">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto no-print-wrapper">
        <div className="bg-zinc-900 text-white rounded-2xl border border-zinc-800 shadow-2xl max-w-4xl w-full flex flex-col max-h-[92vh] overflow-hidden no-print-wrapper">
          
          {/* Modal Header Toolbar (Hidden during browser printing) */}
          <div className="flex items-center justify-between p-3.5 border-b border-zinc-800 bg-zinc-950 no-print">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-600 text-white">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">
                  Auto Financing Executive Report Preview
                </h3>
                <p className="text-[10px] text-zinc-400">
                  Dedicated CalcPlatform PDF Report — Webpage navigation is hidden during print
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Printer className="h-3.5 w-3.5" /> Print Report
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" /> Save as PDF
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Printable Report Document Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-zinc-100 dark:bg-zinc-950 no-print-wrapper">
            <div className="printable-report-section bg-white text-zinc-900 p-6 sm:p-8 rounded-xl shadow-xl max-w-3xl mx-auto space-y-6">
              
              {/* Report Header */}
              <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Car className="h-6 w-6 text-blue-600" />
                    <h1 className="text-xl font-extrabold tracking-tight text-zinc-900">
                      Auto Loan Financial Analysis Report
                    </h1>
                  </div>
                  <p className="text-xs text-zinc-500 mt-1">
                    Prepared by CalcPlatform Vehicle Financing Engine
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-wider border border-blue-200">
                    Official Audit Report
                  </span>
                  <p className="text-[10px] text-zinc-400 mt-1">{currentDateStr}</p>
                </div>
              </div>

              {/* Executive Summary Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">
                    Monthly Payment
                  </span>
                  <div className="text-xl font-black text-blue-900 font-mono mt-0.5">
                    {formatCurrency(results.monthlyPayment)}
                  </div>
                  <span className="text-[10px] text-blue-700 font-medium">
                    {inputs.loanTermMonths || 60} Months @ {inputs.interestRate || 5.9}% APR
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">
                    Net Financed Amount
                  </span>
                  <div className="text-xl font-black text-emerald-900 font-mono mt-0.5">
                    {formatCurrency(results.loanAmount)}
                  </div>
                  <span className="text-[10px] text-emerald-700 font-medium">
                    Vehicle Price: {formatCurrency(Number(inputs.vehiclePrice || 0))}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-purple-50/80 border border-purple-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-purple-600 tracking-wider">
                    Loan Health Score
                  </span>
                  <div className="text-xl font-black text-purple-900 font-mono mt-0.5">
                    {results.healthScore.score} / 100
                  </div>
                  <span className="text-[10px] text-purple-700 font-bold uppercase">
                    {results.healthScore.category} Rating
                  </span>
                </div>
              </div>

              {/* Inputs vs Loan Breakdown Tables Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                {/* Inputs Summary */}
                <div className="border border-zinc-200 rounded-xl p-4 bg-zinc-50/50 space-y-2">
                  <h3 className="font-bold text-zinc-900 uppercase text-[11px] border-b border-zinc-200 pb-1.5">
                    Loan Input Parameters
                  </h3>
                  <div className="space-y-1.5 font-mono text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-sans">Vehicle Price:</span>
                      <span className="font-bold text-zinc-900">{formatCurrency(Number(inputs.vehiclePrice || 0))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-sans">Down Payment:</span>
                      <span className="font-bold text-zinc-900">{formatCurrency(Number(inputs.downPayment || 0))} ({results.downPaymentPercentage}%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-sans">Trade-In Value:</span>
                      <span className="font-bold text-zinc-900">{formatCurrency(Number(inputs.tradeInValue || 0))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-sans">Amount Owed on Trade:</span>
                      <span className="font-bold text-zinc-900">{formatCurrency(Number(inputs.amountOwedOnTradeIn || 0))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-sans">Interest Rate (APR):</span>
                      <span className="font-bold text-zinc-900">{inputs.interestRate || 5.9}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-sans">Loan Term:</span>
                      <span className="font-bold text-zinc-900">{inputs.loanTermMonths || 60} Months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-sans">Sales Tax Rate:</span>
                      <span className="font-bold text-zinc-900">{inputs.salesTaxRate || 6}%</span>
                    </div>
                  </div>
                </div>

                {/* Financial Totals */}
                <div className="border border-zinc-200 rounded-xl p-4 bg-zinc-50/50 space-y-2">
                  <h3 className="font-bold text-zinc-900 uppercase text-[11px] border-b border-zinc-200 pb-1.5">
                    Financial Cost Breakdown
                  </h3>
                  <div className="space-y-1.5 font-mono text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-sans">Total Financed Loan:</span>
                      <span className="font-bold text-zinc-900">{formatCurrency(results.loanAmount)}</span>
                    </div>
                    <div className="flex justify-between text-emerald-700">
                      <span className="font-sans">Total Interest Charges:</span>
                      <span className="font-bold">{formatCurrency(results.totalInterestPaid)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-sans">Calculated Sales Tax:</span>
                      <span className="font-bold text-zinc-900">{formatCurrency(results.totalSalesTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-sans">Total Title & Dealer Fees:</span>
                      <span className="font-bold text-zinc-900">{formatCurrency(results.totalFees)}</span>
                    </div>
                    <div className="flex justify-between border-t border-zinc-200 pt-1 text-zinc-900 font-bold">
                      <span className="font-sans">Total Vehicle Cost:</span>
                      <span>{formatCurrency(results.totalOutofPocketCost)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trade-in & Health Score Analysis */}
              <div className="border border-zinc-200 rounded-xl p-4 space-y-3 bg-zinc-50/30">
                <h3 className="font-bold text-zinc-900 text-xs flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-purple-600" />
                  Loan Health & Equity Analysis
                </h3>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="font-bold text-zinc-700 block">Trade-In Net Equity:</span>
                    {results.isNegativeEquity ? (
                      <p className="text-rose-600 font-semibold text-[11px]">
                        Negative Equity of {formatCurrency(results.negativeEquityRollover)} rolled over into loan.
                      </p>
                    ) : (
                      <p className="text-emerald-600 font-semibold text-[11px]">
                        Positive Equity credit of {formatCurrency(results.netTradeInEquity)} applied to reduce purchase price.
                      </p>
                    )}
                  </div>

                  <div>
                    <span className="font-bold text-zinc-700 block">Loan-to-Value (LTV) Ratio:</span>
                    <p className="font-mono text-zinc-900 font-bold text-[11px]">
                      {results.loanToValueRatio}% LTV (Initial Borrowing Base)
                    </p>
                  </div>
                </div>
              </div>

              {/* Recommendations & Smart Insights */}
              {results.insights.length > 0 && (
                <div className="border border-blue-200 bg-blue-50/50 rounded-xl p-4 space-y-2 text-xs">
                  <h3 className="font-bold text-blue-900 uppercase text-[11px]">
                    Smart Financial Insights & Actionable Guidance
                  </h3>
                  <ul className="list-disc pl-4 space-y-1 text-blue-800 text-[11px]">
                    {results.insights.map((tip, i) => (
                      <li key={`rpt-tip-${i}`}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Report Footer */}
              <div className="border-t border-zinc-200 pt-3 text-center text-[10px] text-zinc-400">
                <p>Calculations provided by CalcPlatform • Official Auto Loan Analysis Report</p>
                <p className="mt-0.5">https://calculator-platform.com/calculators/auto-loan-calculator</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
