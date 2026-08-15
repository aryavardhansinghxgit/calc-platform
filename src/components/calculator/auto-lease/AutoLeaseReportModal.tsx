"use client";

import React, { useEffect, useState } from "react";
import { X, Printer, Download, FileText, CheckCircle, ShieldCheck, Car, DollarSign } from "lucide-react";
import { AutoLeaseResult, ExtendedAutoLeaseInput } from "@/lib/calculator-engine/formulas/auto-lease";
import { formatCurrency } from "@/lib/calculator-engine/formatters";

export interface AutoLeaseReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputs: ExtendedAutoLeaseInput;
  results: AutoLeaseResult;
}

export function AutoLeaseReportModal({ isOpen, onClose, inputs, results }: AutoLeaseReportModalProps) {
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
                  Auto Lease Executive Report Preview
                </h3>
                <p className="text-[10px] text-zinc-400">
                  Official CalcPlatform PDF Report — Only report content prints
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
                      Auto Lease Financial Executive Report
                    </h1>
                  </div>
                  <p className="text-xs text-zinc-500 mt-1">
                    Prepared by CalcPlatform Vehicle Lease Financial Engine
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-wider border border-blue-200">
                    Official Lease Audit
                  </span>
                  <p className="text-[10px] text-zinc-400 mt-1">{currentDateStr}</p>
                </div>
              </div>

              {/* Executive Summary Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">
                    Monthly Lease Payment
                  </span>
                  <div className="text-xl font-black text-blue-900 font-sans tabular-nums mt-0.5">
                    {formatCurrency(results.monthlyLeasePayment)}
                  </div>
                  <span className="text-[10px] text-blue-700 font-medium">
                    {inputs.leaseTermMonths || 36} Months @ {results.effectiveAprPercent}% APR
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">
                    Total Out-of-Pocket Lease
                  </span>
                  <div className="text-xl font-black text-emerald-900 font-sans tabular-nums mt-0.5">
                    {formatCurrency(results.totalLeaseCost)}
                  </div>
                  <span className="text-[10px] text-emerald-700 font-medium">
                    Auto Price: {formatCurrency(Number(inputs.autoPrice || 35000))}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-purple-50/80 border border-purple-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-purple-600 tracking-wider">
                    Residual Buyout Price
                  </span>
                  <div className="text-xl font-black text-purple-900 font-sans tabular-nums mt-0.5">
                    {formatCurrency(results.residualValue)}
                  </div>
                  <span className="text-[10px] text-purple-700 font-bold">
                    Lease-End Purchase Option
                  </span>
                </div>
              </div>

              {/* Inputs vs Breakdown Tables */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                {/* Inputs Summary */}
                <div className="border border-zinc-200 rounded-xl p-4 bg-zinc-50/50 space-y-2">
                  <h3 className="font-bold text-zinc-900 uppercase text-[11px] border-b border-zinc-200 pb-1.5">
                    Lease Parameters
                  </h3>
                  <div className="space-y-1.5 font-sans tabular-nums text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-sans">Vehicle Negotiated Price:</span>
                      <span className="font-bold text-zinc-900">{formatCurrency(Number(inputs.autoPrice || 0))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-sans">Down Payment:</span>
                      <span className="font-bold text-zinc-900">{formatCurrency(Number(inputs.downPayment || 0))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-sans">Trade-In Value:</span>
                      <span className="font-bold text-zinc-900">{formatCurrency(Number(inputs.tradeInValue || 0))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-sans">Lease Term:</span>
                      <span className="font-bold text-zinc-900">{inputs.leaseTermMonths || 36} Months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-sans">Money Factor:</span>
                      <span className="font-bold text-zinc-900">{results.moneyFactorUsed} ({results.effectiveAprPercent}% APR)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-sans">Residual Value:</span>
                      <span className="font-bold text-zinc-900">{formatCurrency(results.residualValue)} ({inputs.residualPercent || 55}%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-sans">Sales Tax Rate:</span>
                      <span className="font-bold text-zinc-900">{inputs.salesTaxRate || 7}%</span>
                    </div>
                  </div>
                </div>

                {/* Detailed Payment Breakdown */}
                <div className="border border-zinc-200 rounded-xl p-4 bg-zinc-50/50 space-y-2">
                  <h3 className="font-bold text-zinc-900 uppercase text-[11px] border-b border-zinc-200 pb-1.5">
                    Monthly Payment Breakdown
                  </h3>
                  <div className="space-y-1.5 font-sans tabular-nums text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-sans">Monthly Depreciation:</span>
                      <span className="font-bold text-zinc-900">{formatCurrency(results.monthlyDepreciation)}</span>
                    </div>
                    <div className="flex justify-between text-emerald-700">
                      <span className="font-sans">Monthly Rent Charge (MF):</span>
                      <span className="font-bold">{formatCurrency(results.monthlyFinanceFee)}</span>
                    </div>
                    <div className="flex justify-between text-amber-700">
                      <span className="font-sans">Monthly Sales Tax:</span>
                      <span className="font-bold">{formatCurrency(results.monthlySalesTax)}</span>
                    </div>
                    <div className="flex justify-between border-t border-zinc-200 pt-1 text-blue-900 font-extrabold">
                      <span className="font-sans">Total Monthly Lease:</span>
                      <span>{formatCurrency(results.monthlyLeasePayment)}</span>
                    </div>
                    <div className="flex justify-between text-zinc-500 pt-1">
                      <span className="font-sans">Total Upfront Cash Required:</span>
                      <span className="font-bold text-zinc-900">{formatCurrency(results.totalUpfrontCost)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lease vs Buy Decision Summary */}
              <div className="border border-zinc-200 rounded-xl p-4 space-y-2 bg-zinc-50/30 text-xs">
                <h3 className="font-bold text-zinc-900 uppercase text-[11px] flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-purple-600" />
                  Lease vs Buy Recommendation Analysis
                </h3>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {results.leaseVsBuy.recommendation}
                  </span>
                  <span className="text-[11px] text-zinc-600">{results.leaseVsBuy.explanation}</span>
                </div>
              </div>

              {/* Formula Reference */}
              <div className="border border-zinc-200 rounded-xl p-3.5 bg-zinc-50/50 text-[10px] text-zinc-500 space-y-1 font-sans tabular-nums">
                <span className="font-bold text-zinc-900 block font-sans text-xs">Applied Mathematical Formulas:</span>
                <p>• Monthly Depreciation = (Adjusted Cap Cost - Residual Value) ÷ Lease Term</p>
                <p>• Monthly Rent Charge = (Adjusted Cap Cost + Residual Value) × Money Factor</p>
                <p>• Monthly Tax = (Depreciation + Rent Charge) × Sales Tax %</p>
              </div>

              {/* Report Footer */}
              <div className="border-t border-zinc-200 pt-3 text-center text-[10px] text-zinc-400">
                <p>Calculations provided by CalcPlatform • Official Auto Lease Analysis Report</p>
                <p className="mt-0.5">https://calculator-platform.com/calculators/auto-lease-calculator</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
