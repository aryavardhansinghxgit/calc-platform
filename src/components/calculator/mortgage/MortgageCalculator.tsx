"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Home,
  DollarSign,
  Calendar,
  Percent,
  Sliders,
  TrendingUp,
  PlusCircle,
  BarChart2,
  PieChart as PieIcon,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { calculateMortgageModule } from "@/modules/mortgage/formula";
import { MortgageModuleInput, MortgageModuleOutput } from "@/modules/mortgage/types";
import { formatCurrency, formatPercent } from "@/lib/calculator-engine/formatters";
import { AmortizationTable } from "./AmortizationTable";

// Lazy load chart components for optimal rendering performance
const MortgagePieChart = dynamic(
  () => import("../charts/MortgagePieChart").then((m) => m.MortgagePieChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-56 flex items-center justify-center text-xs text-zinc-400 font-mono">
        Loading doughnut chart...
      </div>
    ),
  }
);

const BalanceLineChart = dynamic(
  () => import("../charts/BalanceLineChart").then((m) => m.BalanceLineChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-56 flex items-center justify-center text-xs text-zinc-400 font-mono">
        Loading line chart...
      </div>
    ),
  }
);

const AmortizationAreaChart = dynamic(
  () => import("../charts/AmortizationAreaChart").then((m) => m.AmortizationAreaChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-56 flex items-center justify-center text-xs text-zinc-400 font-mono">
        Loading area chart...
      </div>
    ),
  }
);

export function MortgageCalculator() {
  // Basic Inputs State
  const [homePrice, setHomePrice] = useState<number>(400000);
  const [downPayment, setDownPayment] = useState<number>(80000);
  const [downPaymentType, setDownPaymentType] = useState<"amount" | "percent">("amount");
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [startMonth, setStartMonth] = useState<number>(new Date().getMonth() + 1);
  const [startYear, setStartYear] = useState<number>(new Date().getFullYear());

  // Advanced Section State
  const [propertyTax, setPropertyTax] = useState<number>(4800);
  const [propertyTaxType, setPropertyTaxType] = useState<"amount" | "percent">("amount");
  const [homeInsurance, setHomeInsurance] = useState<number>(1500);
  const [pmiRate, setPmiRate] = useState<number>(0.5);
  const [hoaFee, setHoaFee] = useState<number>(0);
  const [otherCosts, setOtherCosts] = useState<number>(0);

  // Annual Increase Settings State
  const [propertyTaxIncrease, setPropertyTaxIncrease] = useState<number>(2.0);
  const [insuranceIncrease, setInsuranceIncrease] = useState<number>(3.0);
  const [hoaIncrease, setHoaIncrease] = useState<number>(2.5);
  const [otherCostsIncrease, setOtherCostsIncrease] = useState<number>(2.0);

  // Extra Payments State
  const [extraMonthlyPayment, setExtraMonthlyPayment] = useState<number>(0);
  const [extraYearlyPayment, setExtraYearlyPayment] = useState<number>(0);
  const [extraOneTimePayment, setExtraOneTimePayment] = useState<number>(0);
  const [extraOneTimeMonth, setExtraOneTimeMonth] = useState<number>(1);
  const [extraOneTimeYear, setExtraOneTimeYear] = useState<number>(new Date().getFullYear() + 1);

  // Collapsible section toggles
  const [showAdvanced, setShowAdvanced] = useState<boolean>(true);
  const [showIncreases, setShowIncreases] = useState<boolean>(false);
  const [showExtraPayments, setShowExtraPayments] = useState<boolean>(false);
  const [activeChartTab, setActiveChartTab] = useState<"doughnut" | "balance" | "area">("doughnut");

  // Sync Down Payment when toggling between amount & percentage
  const handleDownPaymentTypeToggle = (newType: "amount" | "percent") => {
    if (newType === downPaymentType) return;
    if (newType === "percent") {
      // Amount -> Percent
      const pct = homePrice > 0 ? (downPayment / homePrice) * 100 : 0;
      setDownPayment(Number(pct.toFixed(2)));
    } else {
      // Percent -> Amount
      const amt = (homePrice * downPayment) / 100;
      setDownPayment(Math.round(amt));
    }
    setDownPaymentType(newType);
  };

  // Sync Property Tax when toggling between amount & percentage
  const handlePropertyTaxTypeToggle = (newType: "amount" | "percent") => {
    if (newType === propertyTaxType) return;
    if (newType === "percent") {
      const pct = homePrice > 0 ? (propertyTax / homePrice) * 100 : 0;
      setPropertyTax(Number(pct.toFixed(2)));
    } else {
      const amt = (homePrice * propertyTax) / 100;
      setPropertyTax(Math.round(amt));
    }
    setPropertyTaxType(newType);
  };

  // Memoized Financial Calculations
  const results: MortgageModuleOutput = useMemo(() => {
    const input: MortgageModuleInput = {
      homePrice,
      downPayment,
      downPaymentType,
      loanTermYears,
      interestRate,
      startMonth,
      startYear,

      propertyTax,
      propertyTaxType,
      homeInsurance,
      pmiRate,
      hoaFee,
      otherCosts,

      propertyTaxIncrease,
      insuranceIncrease,
      hoaIncrease,
      otherCostsIncrease,

      extraMonthlyPayment,
      extraYearlyPayment,
      extraOneTimePayment,
      extraOneTimeMonth,
      extraOneTimeYear,
    };

    return calculateMortgageModule(input);
  }, [
    homePrice,
    downPayment,
    downPaymentType,
    loanTermYears,
    interestRate,
    startMonth,
    startYear,
    propertyTax,
    propertyTaxType,
    homeInsurance,
    pmiRate,
    hoaFee,
    otherCosts,
    propertyTaxIncrease,
    insuranceIncrease,
    hoaIncrease,
    otherCostsIncrease,
    extraMonthlyPayment,
    extraYearlyPayment,
    extraOneTimePayment,
    extraOneTimeMonth,
    extraOneTimeYear,
  ]);

  const monthOptions = [
    { value: 1, label: "Jan" },
    { value: 2, label: "Feb" },
    { value: 3, label: "Mar" },
    { value: 4, label: "Apr" },
    { value: 5, label: "May" },
    { value: 6, label: "Jun" },
    { value: 7, label: "Jul" },
    { value: 8, label: "Aug" },
    { value: 9, label: "Sep" },
    { value: 10, label: "Oct" },
    { value: 11, label: "Nov" },
    { value: 12, label: "Dec" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Grid Layout: Left Controls (Col 5) | Right Results & Charts (Col 7) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Inputs Panel (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="border border-zinc-200 dark:border-zinc-800 shadow-xs bg-white dark:bg-zinc-900">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                  <Home className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                    Mortgage Inputs
                  </CardTitle>
                  <CardDescription className="text-xs text-zinc-500">
                    Customize purchase price, loan term, taxes & extra payments
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              {/* Basic Inputs */}
              <div className="space-y-3">
                <h3 className="font-bold uppercase tracking-wider text-[11px] text-zinc-400 dark:text-zinc-500">
                  Basic Loan Details
                </h3>

                {/* Home Price */}
                <div>
                  <Label htmlFor="homePrice" className="text-zinc-700 dark:text-zinc-300 font-medium">
                    Home Price ($)
                  </Label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                    <Input
                      id="homePrice"
                      type="number"
                      min={0}
                      step={5000}
                      value={homePrice}
                      onChange={(e) => setHomePrice(Math.max(0, Number(e.target.value)))}
                      className="pl-8 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                    />
                  </div>
                </div>

                {/* Down Payment with Amount / % Toggle */}
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="downPayment" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      Down Payment
                    </Label>
                    <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-md p-0.5 border border-zinc-200 dark:border-zinc-700">
                      <button
                        type="button"
                        onClick={() => handleDownPaymentTypeToggle("amount")}
                        className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                          downPaymentType === "amount"
                            ? "bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-xs"
                            : "text-zinc-500"
                        }`}
                      >
                        $ Amount
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownPaymentTypeToggle("percent")}
                        className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                          downPaymentType === "percent"
                            ? "bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-xs"
                            : "text-zinc-500"
                        }`}
                      >
                        % Percent
                      </button>
                    </div>
                  </div>
                  <div className="relative mt-1">
                    {downPaymentType === "amount" ? (
                      <DollarSign className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                    ) : (
                      <Percent className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                    )}
                    <Input
                      id="downPayment"
                      type="number"
                      min={0}
                      step={downPaymentType === "amount" ? 1000 : 0.5}
                      value={downPayment}
                      onChange={(e) => setDownPayment(Math.max(0, Number(e.target.value)))}
                      className="pl-8 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-zinc-400 mt-1">
                    <span>
                      Calculated:{" "}
                      {downPaymentType === "amount"
                        ? `${results.downPaymentPercent.toFixed(1)}%`
                        : formatCurrency(results.downPaymentAmount)}
                    </span>
                    <span>Loan: {formatCurrency(results.loanAmount)}</span>
                  </div>
                </div>

                {/* Term & Rate Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="loanTermYears" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      Loan Term (Years)
                    </Label>
                    <Input
                      id="loanTermYears"
                      type="number"
                      min={1}
                      max={50}
                      value={loanTermYears}
                      onChange={(e) => setLoanTermYears(Math.max(1, Number(e.target.value)))}
                      className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <Label htmlFor="interestRate" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      Interest Rate (%)
                    </Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step={0.1}
                      min={0}
                      max={30}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                      className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                    />
                  </div>
                </div>

                {/* Start Month & Start Year */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="startMonth" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      Start Month
                    </Label>
                    <select
                      id="startMonth"
                      value={startMonth}
                      onChange={(e) => setStartMonth(Number(e.target.value))}
                      className="mt-1 w-full h-9 rounded-md bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 px-3 text-xs text-zinc-900 dark:text-zinc-100 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      {monthOptions.map((m) => (
                        <option key={m.value} value={m.value}>
                          {m.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="startYear" className="text-zinc-700 dark:text-zinc-300 font-medium">
                      Start Year
                    </Label>
                    <Input
                      id="startYear"
                      type="number"
                      min={2000}
                      max={2100}
                      value={startYear}
                      onChange={(e) => setStartYear(Number(e.target.value))}
                      className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Advanced Section Collapsible */}
              <div className="border-t border-zinc-100 dark:border-zinc-800 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 hover:text-blue-600 py-1"
                >
                  <span className="flex items-center gap-1.5">
                    <Sliders className="h-3.5 w-3.5 text-blue-500" /> Advanced Taxes & Fees
                  </span>
                  {showAdvanced ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                </button>

                {showAdvanced && (
                  <div className="space-y-3 pt-3">
                    {/* Property Taxes */}
                    <div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="propertyTax" className="text-zinc-700 dark:text-zinc-300 font-medium">
                          Property Taxes (Annual)
                        </Label>
                        <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-md p-0.5 border border-zinc-200 dark:border-zinc-700">
                          <button
                            type="button"
                            onClick={() => handlePropertyTaxTypeToggle("amount")}
                            className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${
                              propertyTaxType === "amount"
                                ? "bg-white dark:bg-zinc-700 text-blue-600 shadow-xs"
                                : "text-zinc-500"
                            }`}
                          >
                            $
                          </button>
                          <button
                            type="button"
                            onClick={() => handlePropertyTaxTypeToggle("percent")}
                            className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${
                              propertyTaxType === "percent"
                                ? "bg-white dark:bg-zinc-700 text-blue-600 shadow-xs"
                                : "text-zinc-500"
                            }`}
                          >
                            %
                          </button>
                        </div>
                      </div>
                      <Input
                        id="propertyTax"
                        type="number"
                        min={0}
                        step={propertyTaxType === "amount" ? 100 : 0.1}
                        value={propertyTax}
                        onChange={(e) => setPropertyTax(Math.max(0, Number(e.target.value)))}
                        className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                      />
                    </div>

                    {/* Home Insurance & PMI Rate Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="homeInsurance" className="text-zinc-700 dark:text-zinc-300 font-medium">
                          Home Insurance ($/yr)
                        </Label>
                        <Input
                          id="homeInsurance"
                          type="number"
                          min={0}
                          step={50}
                          value={homeInsurance}
                          onChange={(e) => setHomeInsurance(Math.max(0, Number(e.target.value)))}
                          className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                        />
                      </div>
                      <div>
                        <Label htmlFor="pmiRate" className="text-zinc-700 dark:text-zinc-300 font-medium">
                          PMI Rate (%/yr)
                        </Label>
                        <Input
                          id="pmiRate"
                          type="number"
                          step={0.1}
                          min={0}
                          value={pmiRate}
                          onChange={(e) => setPmiRate(Math.max(0, Number(e.target.value)))}
                          className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                        />
                      </div>
                    </div>

                    {/* HOA & Other Costs Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="hoaFee" className="text-zinc-700 dark:text-zinc-300 font-medium">
                          HOA Fees ($/mo)
                        </Label>
                        <Input
                          id="hoaFee"
                          type="number"
                          min={0}
                          step={10}
                          value={hoaFee}
                          onChange={(e) => setHoaFee(Math.max(0, Number(e.target.value)))}
                          className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                        />
                      </div>
                      <div>
                        <Label htmlFor="otherCosts" className="text-zinc-700 dark:text-zinc-300 font-medium">
                          Other Costs ($/mo)
                        </Label>
                        <Input
                          id="otherCosts"
                          type="number"
                          min={0}
                          step={10}
                          value={otherCosts}
                          onChange={(e) => setOtherCosts(Math.max(0, Number(e.target.value)))}
                          className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Annual Increase Settings Collapsible */}
              <div className="border-t border-zinc-100 dark:border-zinc-800 pt-3">
                <button
                  type="button"
                  onClick={() => setShowIncreases(!showIncreases)}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 hover:text-blue-600 py-1"
                >
                  <span className="flex items-center gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5 text-amber-500" /> Annual Increase Settings (%)
                  </span>
                  {showIncreases ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                </button>

                {showIncreases && (
                  <div className="grid grid-cols-2 gap-3 pt-3">
                    <div>
                      <Label htmlFor="propertyTaxIncrease" className="text-zinc-700 dark:text-zinc-300 font-medium">
                        Tax Increase %
                      </Label>
                      <Input
                        id="propertyTaxIncrease"
                        type="number"
                        step={0.1}
                        min={0}
                        value={propertyTaxIncrease}
                        onChange={(e) => setPropertyTaxIncrease(Math.max(0, Number(e.target.value)))}
                        className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                      />
                    </div>
                    <div>
                      <Label htmlFor="insuranceIncrease" className="text-zinc-700 dark:text-zinc-300 font-medium">
                        Insurance Increase %
                      </Label>
                      <Input
                        id="insuranceIncrease"
                        type="number"
                        step={0.1}
                        min={0}
                        value={insuranceIncrease}
                        onChange={(e) => setInsuranceIncrease(Math.max(0, Number(e.target.value)))}
                        className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                      />
                    </div>
                    <div>
                      <Label htmlFor="hoaIncrease" className="text-zinc-700 dark:text-zinc-300 font-medium">
                        HOA Increase %
                      </Label>
                      <Input
                        id="hoaIncrease"
                        type="number"
                        step={0.1}
                        min={0}
                        value={hoaIncrease}
                        onChange={(e) => setHoaIncrease(Math.max(0, Number(e.target.value)))}
                        className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                      />
                    </div>
                    <div>
                      <Label htmlFor="otherCostsIncrease" className="text-zinc-700 dark:text-zinc-300 font-medium">
                        Other Costs Increase %
                      </Label>
                      <Input
                        id="otherCostsIncrease"
                        type="number"
                        step={0.1}
                        min={0}
                        value={otherCostsIncrease}
                        onChange={(e) => setOtherCostsIncrease(Math.max(0, Number(e.target.value)))}
                        className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Extra Payments Collapsible */}
              <div className="border-t border-zinc-100 dark:border-zinc-800 pt-3">
                <button
                  type="button"
                  onClick={() => setShowExtraPayments(!showExtraPayments)}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 hover:text-blue-600 py-1"
                >
                  <span className="flex items-center gap-1.5">
                    <PlusCircle className="h-3.5 w-3.5 text-emerald-500" /> Extra Principal Payments
                  </span>
                  {showExtraPayments ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                </button>

                {showExtraPayments && (
                  <div className="space-y-3 pt-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="extraMonthlyPayment" className="text-zinc-700 dark:text-zinc-300 font-medium">
                          Monthly Extra ($)
                        </Label>
                        <Input
                          id="extraMonthlyPayment"
                          type="number"
                          min={0}
                          step={50}
                          value={extraMonthlyPayment}
                          onChange={(e) => setExtraMonthlyPayment(Math.max(0, Number(e.target.value)))}
                          className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                        />
                      </div>
                      <div>
                        <Label htmlFor="extraYearlyPayment" className="text-zinc-700 dark:text-zinc-300 font-medium">
                          Yearly Extra ($)
                        </Label>
                        <Input
                          id="extraYearlyPayment"
                          type="number"
                          min={0}
                          step={100}
                          value={extraYearlyPayment}
                          onChange={(e) => setExtraYearlyPayment(Math.max(0, Number(e.target.value)))}
                          className="mt-1 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                        />
                      </div>
                    </div>

                    {/* One Time Payment */}
                    <div className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
                      <Label htmlFor="extraOneTimePayment" className="text-zinc-700 dark:text-zinc-300 font-medium">
                        One-Time Extra Payment ($)
                      </Label>
                      <Input
                        id="extraOneTimePayment"
                        type="number"
                        min={0}
                        step={500}
                        value={extraOneTimePayment}
                        onChange={(e) => setExtraOneTimePayment(Math.max(0, Number(e.target.value)))}
                        className="bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                      />
                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div>
                          <Label className="text-[10px] text-zinc-500">One-Time Month</Label>
                          <select
                            value={extraOneTimeMonth}
                            onChange={(e) => setExtraOneTimeMonth(Number(e.target.value))}
                            className="mt-0.5 w-full h-8 rounded-md bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 px-2 text-[11px] text-zinc-900 dark:text-zinc-100"
                          >
                            {monthOptions.map((m) => (
                              <option key={m.value} value={m.value}>
                                {m.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label className="text-[10px] text-zinc-500">One-Time Year</Label>
                          <Input
                            type="number"
                            min={2000}
                            max={2100}
                            value={extraOneTimeYear}
                            onChange={(e) => setExtraOneTimeYear(Number(e.target.value))}
                            className="mt-0.5 h-8 bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 font-mono text-[11px]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Results Panel (Col 7) */}
        <div className="lg:col-span-7 space-y-5">
          {/* 1. Large Monthly Payment Card */}
          <Card className="border border-blue-100 dark:border-blue-900/50 bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/50 dark:from-zinc-900 dark:via-zinc-900 dark:to-blue-950/30 shadow-md">
            <CardContent className="p-6 space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                    Total Estimated Monthly Payment
                  </span>
                  <span className="text-[11px] font-medium text-zinc-500 bg-white dark:bg-zinc-800 px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700">
                    PITI + Taxes & Dues
                  </span>
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 font-mono mt-2 tracking-tight">
                  {formatCurrency(results.totalInitialMonthlyPayment)}
                </div>
              </div>

              {/* Monthly Breakdown Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-blue-100 dark:border-zinc-800">
                <div className="bg-white/80 dark:bg-zinc-800/80 p-2 rounded-lg border border-blue-50 dark:border-zinc-700/50">
                  <span className="text-[10px] text-zinc-500 block">P&I Base</span>
                  <span className="text-xs font-bold font-mono text-blue-600 dark:text-blue-400">
                    {formatCurrency(results.monthlyPrincipalAndInterest)}
                  </span>
                </div>
                <div className="bg-white/80 dark:bg-zinc-800/80 p-2 rounded-lg border border-blue-50 dark:border-zinc-700/50">
                  <span className="text-[10px] text-zinc-500 block">Property Tax</span>
                  <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(results.monthlyPropertyTax)}
                  </span>
                </div>
                <div className="bg-white/80 dark:bg-zinc-800/80 p-2 rounded-lg border border-blue-50 dark:border-zinc-700/50">
                  <span className="text-[10px] text-zinc-500 block">Home Insurance</span>
                  <span className="text-xs font-bold font-mono text-amber-600 dark:text-amber-400">
                    {formatCurrency(results.monthlyInsurance)}
                  </span>
                </div>
                <div className="bg-white/80 dark:bg-zinc-800/80 p-2 rounded-lg border border-blue-50 dark:border-zinc-700/50">
                  <span className="text-[10px] text-zinc-500 block">PMI / HOA / Fees</span>
                  <span className="text-xs font-bold font-mono text-purple-600 dark:text-purple-400">
                    {formatCurrency(
                      results.monthlyPmi + results.monthlyHoa + results.monthlyOtherCosts
                    )}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2. Summary Statistics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-xs">
              <span className="text-[10px] uppercase font-semibold text-zinc-400 block">Loan Amount</span>
              <span className="text-sm font-extrabold text-zinc-900 dark:text-zinc-100 font-mono">
                {formatCurrency(results.loanAmount)}
              </span>
            </div>
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-xs">
              <span className="text-[10px] uppercase font-semibold text-zinc-400 block">Total Interest</span>
              <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400 font-mono">
                {formatCurrency(results.totalInterestPaid)}
              </span>
            </div>
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-xs">
              <span className="text-[10px] uppercase font-semibold text-zinc-400 block">Total Cost of Loan</span>
              <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400 font-mono">
                {formatCurrency(results.totalCost)}
              </span>
            </div>
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 shadow-xs">
              <span className="text-[10px] uppercase font-semibold text-zinc-400 block">Payoff Date</span>
              <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-mono truncate block">
                {results.payoffDate}
              </span>
            </div>
          </div>

          {/* Interest Savings Banner if extra payments are present */}
          {results.interestSavings > 0 && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <span className="font-bold text-emerald-900 dark:text-emerald-200">
                    Extra Payments Impact:
                  </span>{" "}
                  <span className="text-emerald-800 dark:text-emerald-300">
                    Saves {formatCurrency(results.interestSavings)} in interest & pays off {results.monthsSaved} months early!
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 3. Visual Charts & Donut Section with Tab Switcher */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Visual Analytics & Charts
              </h3>
              <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <button
                  type="button"
                  onClick={() => setActiveChartTab("doughnut")}
                  className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                    activeChartTab === "doughnut"
                      ? "bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-xs"
                      : "text-zinc-500"
                  }`}
                >
                  <PieIcon className="h-3 w-3" /> Doughnut
                </button>
                <button
                  type="button"
                  onClick={() => setActiveChartTab("balance")}
                  className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                    activeChartTab === "balance"
                      ? "bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-xs"
                      : "text-zinc-500"
                  }`}
                >
                  <BarChart2 className="h-3 w-3" /> Balance Line
                </button>
                <button
                  type="button"
                  onClick={() => setActiveChartTab("area")}
                  className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                    activeChartTab === "area"
                      ? "bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-xs"
                      : "text-zinc-500"
                  }`}
                >
                  <TrendingUp className="h-3 w-3" /> Principal vs Interest
                </button>
              </div>
            </div>

            <div className="pt-1">
              {activeChartTab === "doughnut" && (
                <MortgagePieChart
                  principalAndInterest={results.monthlyPrincipalAndInterest}
                  propertyTax={results.monthlyPropertyTax}
                  insurance={results.monthlyInsurance}
                  otherCosts={results.monthlyPmi + results.monthlyHoa + results.monthlyOtherCosts}
                  extraPayment={extraMonthlyPayment}
                />
              )}
              {activeChartTab === "balance" && (
                <BalanceLineChart schedule={results.amortizationSchedule} />
              )}
              {activeChartTab === "area" && (
                <AmortizationAreaChart schedule={results.amortizationSchedule} />
              )}
            </div>
          </div>

          {/* 4. Monthly vs Total Cost Breakdown Table */}
          <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Monthly vs. Total Lifetime Cost Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                    <TableHead className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Category</TableHead>
                    <TableHead className="text-xs font-bold text-zinc-700 dark:text-zinc-300 text-right">
                      Monthly (Year 1)
                    </TableHead>
                    <TableHead className="text-xs font-bold text-zinc-700 dark:text-zinc-300 text-right">
                      Lifetime Total
                    </TableHead>
                    <TableHead className="text-xs font-bold text-zinc-700 dark:text-zinc-300 text-right">
                      % of Total Cost
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.breakdown.map((item, idx) => (
                    <TableRow key={idx} className="border-zinc-100 dark:border-zinc-800">
                      <TableCell className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        {item.category}
                      </TableCell>
                      <TableCell className="text-xs font-mono font-medium text-right text-zinc-800 dark:text-zinc-200">
                        {formatCurrency(item.monthlyFirstYear)}
                      </TableCell>
                      <TableCell className="text-xs font-mono font-semibold text-right text-zinc-900 dark:text-zinc-100">
                        {formatCurrency(item.totalLifetime)}
                      </TableCell>
                      <TableCell className="text-xs font-mono text-right text-zinc-500">
                        {item.percentageOfTotal.toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="border-t-2 border-zinc-200 dark:border-zinc-700 bg-zinc-50/80 dark:bg-zinc-800/80 font-bold">
                    <TableCell className="text-xs text-zinc-900 dark:text-zinc-100">Total Out of Pocket</TableCell>
                    <TableCell className="text-xs font-mono text-right text-blue-600 dark:text-blue-400">
                      {formatCurrency(results.totalInitialMonthlyPayment)}
                    </TableCell>
                    <TableCell className="text-xs font-mono text-right text-blue-600 dark:text-blue-400">
                      {formatCurrency(results.totalCost)}
                    </TableCell>
                    <TableCell className="text-xs font-mono text-right text-blue-600 dark:text-blue-400">
                      100.0%
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Amortization Schedule Section (Full Width) */}
      <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
        <CardHeader className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Mortgage Amortization Schedule
              </CardTitle>
              <CardDescription className="text-xs text-zinc-500">
                Full breakdown of payments, principal reduction, interest, and remaining balance over time
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <AmortizationTable schedule={results.amortizationSchedule} />
        </CardContent>
      </Card>
    </div>
  );
}

export default MortgageCalculator;
