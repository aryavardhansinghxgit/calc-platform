"use client";

import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { formatCurrency } from "@/lib/calculator-engine/formatters";
import { AmortizationMonthRow, AmortizationYearRow } from "@/lib/calculator-engine/formulas/auto-loan";

// ==========================================
// CHART 1: LOAN COST BREAKDOWN DOUGHNUT
// ==========================================
export interface AutoLoanCostBreakdownChartProps {
  loanAmount: number;
  totalInterest: number;
  totalSalesTax: number;
  totalFees: number;
}

export function AutoLoanCostBreakdownChart({
  loanAmount,
  totalInterest,
  totalSalesTax,
  totalFees,
}: AutoLoanCostBreakdownChartProps) {
  const grandTotal = Math.max(0.01, loanAmount + totalInterest + totalSalesTax + totalFees);

  const data = [
    { name: `Principal`, value: Math.max(0, loanAmount), color: "#3B82F6" }, // Blue
    { name: `Interest`, value: Math.max(0, totalInterest), color: "#10B981" }, // Emerald
    { name: `Sales Tax`, value: Math.max(0, totalSalesTax), color: "#F59E0B" }, // Amber
    { name: `Fees`, value: Math.max(0, totalFees), color: "#8B5CF6" }, // Purple
  ].filter((item) => item.value > 0);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="h-64 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="48%"
              innerRadius={55}
              outerRadius={88}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" strokeWidth={0} />
              ))}
            </Pie>
            <Tooltip
              formatter={(val: any, name: any) => [
                formatCurrency(Number(val ?? 0)),
                String(name),
              ]}
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                borderColor: "#334155",
                borderRadius: "8px",
                color: "#f8fafc",
                fontSize: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconSize={8}
              formatter={(value: string) => (
                <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mr-2">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text Badge */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-zinc-400 dark:text-zinc-500">
            Total Vehicle Cost
          </span>
          <span className="text-sm font-extrabold text-zinc-900 dark:text-zinc-100 font-mono">
            {formatCurrency(grandTotal)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// CHART 2: LOAN BALANCE OVER TIME (AREA)
// ==========================================
export interface AutoLoanBalanceOverTimeChartProps {
  monthlySchedule: AmortizationMonthRow[];
}

export function AutoLoanBalanceOverTimeChart({ monthlySchedule }: AutoLoanBalanceOverTimeChartProps) {
  // Downsample to annual or max 60 points for smooth area rendering
  const step = Math.max(1, Math.floor(monthlySchedule.length / 30));
  const data = monthlySchedule
    .filter((_, idx) => idx % step === 0 || idx === monthlySchedule.length - 1)
    .map((r) => ({
      month: `Mo ${r.month}`,
      Balance: r.remainingBalance,
      CumulativeInterest: r.totalInterestPaid,
    }));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="interestGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(161,161,170,0.15)" />
          <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#71717a" }} tickLine={false} />
          <YAxis
            tick={{ fontSize: 10, fill: "#71717a" }}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            formatter={(val: any) => [formatCurrency(Number(val ?? 0)), ""]}
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              borderColor: "#334155",
              borderRadius: "8px",
              color: "#f8fafc",
              fontSize: "12px",
            }}
          />
          <Legend
            verticalAlign="top"
            height={32}
            iconSize={8}
            formatter={(val: string) => (
              <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mr-3">
                {val === "Balance" ? "Remaining Balance" : "Cumulative Interest Paid"}
              </span>
            )}
          />
          <Area
            type="monotone"
            dataKey="Balance"
            stroke="#3B82F6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#balanceGrad)"
          />
          <Area
            type="monotone"
            dataKey="CumulativeInterest"
            stroke="#10B981"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#interestGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// ==========================================
// CHART 3: PAYMENT COMPOSITION (BAR CHART)
// ==========================================
export interface AutoLoanPaymentCompositionChartProps {
  annualSchedule: AmortizationYearRow[];
}

export function AutoLoanPaymentCompositionChart({ annualSchedule }: AutoLoanPaymentCompositionChartProps) {
  const data = annualSchedule.map((y) => ({
    year: `Year ${y.year}`,
    Principal: y.principalPaid,
    Interest: y.interestPaid,
  }));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(161,161,170,0.15)" />
          <XAxis dataKey="year" tick={{ fontSize: 10, fill: "#71717a" }} tickLine={false} />
          <YAxis
            tick={{ fontSize: 10, fill: "#71717a" }}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            formatter={(val: any, name: any) => [formatCurrency(Number(val ?? 0)), String(name)]}
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              borderColor: "#334155",
              borderRadius: "8px",
              color: "#f8fafc",
              fontSize: "12px",
            }}
          />
          <Legend
            verticalAlign="top"
            height={32}
            iconSize={8}
            formatter={(val: string) => (
              <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 mr-3">
                {val}
              </span>
            )}
          />
          <Bar dataKey="Principal" stackId="a" fill="#3B82F6" radius={[0, 0, 0, 0]} />
          <Bar dataKey="Interest" stackId="a" fill="#10B981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
