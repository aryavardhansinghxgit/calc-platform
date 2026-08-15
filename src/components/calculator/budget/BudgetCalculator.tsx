"use client";

import React, { useState, useMemo } from "react";
import {
  PieChart as PieIcon,
  DollarSign,
  TrendingDown,
  TrendingUp,
  Sparkles,
  Printer,
  Share2,
  Bookmark,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sliders,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  BarChart3,
  Layers,
  Search,
  Download,
  ShieldCheck,
  Percent,
  Calendar,
  Zap,
  ArrowRight,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import {
  calculateBudget,
  BudgetInputs,
  FrequencyAmount,
} from "@/lib/calculator-engine/formulas/budget";

const COLORS = [
  "#3b82f6", // Housing - Blue
  "#10b981", // Transportation - Emerald
  "#ef4444", // Debt - Red
  "#f59e0b", // Living - Amber
  "#8b5cf6", // Healthcare - Purple
  "#ec4899", // Children/Edu - Pink
  "#06b6d4", // Savings - Cyan
  "#64748b", // Misc - Slate
];

type ActiveTab = "summary" | "charts" | "table" | "scenarios" | "stresstest";

export function BudgetCalculator() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("summary");
  const [copyNotification, setCopyNotification] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Frequency Amount State Helper
  const [salary, setSalary] = useState<FrequencyAmount>({ value: 83000, freq: "year" });
  const [pension, setPension] = useState<FrequencyAmount>({ value: 0, freq: "year" });
  const [investments, setInvestments] = useState<FrequencyAmount>({ value: 1000, freq: "year" });
  const [otherIncome, setOtherIncome] = useState<FrequencyAmount>({ value: 2000, freq: "year" });
  const [taxRate, setTaxRate] = useState<number>(28);

  // Housing
  const [mortgage, setMortgage] = useState<FrequencyAmount>({ value: 0, freq: "month" });
  const [propertyTax, setPropertyTax] = useState<FrequencyAmount>({ value: 0, freq: "year" });
  const [rental, setRental] = useState<FrequencyAmount>({ value: 1400, freq: "month" });
  const [housingInsurance, setHousingInsurance] = useState<FrequencyAmount>({ value: 200, freq: "year" });
  const [hoaFee, setHoaFee] = useState<FrequencyAmount>({ value: 0, freq: "year" });
  const [homeMaintenance, setHomeMaintenance] = useState<FrequencyAmount>({ value: 0, freq: "month" });
  const [utilities, setUtilities] = useState<FrequencyAmount>({ value: 250, freq: "month" });

  // Transportation
  const [autoLoan, setAutoLoan] = useState<FrequencyAmount>({ value: 250, freq: "month" });
  const [autoInsurance, setAutoInsurance] = useState<FrequencyAmount>({ value: 700, freq: "year" });
  const [gasoline, setGasoline] = useState<FrequencyAmount>({ value: 100, freq: "month" });
  const [autoMaintenance, setAutoMaintenance] = useState<FrequencyAmount>({ value: 600, freq: "year" });
  const [parkingTolls, setParkingTolls] = useState<FrequencyAmount>({ value: 20, freq: "month" });
  const [otherTransportation, setOtherTransportation] = useState<FrequencyAmount>({ value: 0, freq: "month" });

  // Other Debt
  const [creditCard, setCreditCard] = useState<FrequencyAmount>({ value: 0, freq: "month" });
  const [studentLoan, setStudentLoan] = useState<FrequencyAmount>({ value: 250, freq: "month" });
  const [otherLoans, setOtherLoans] = useState<FrequencyAmount>({ value: 0, freq: "month" });

  // Living Expenses
  const [food, setFood] = useState<FrequencyAmount>({ value: 400, freq: "month" });
  const [clothing, setClothing] = useState<FrequencyAmount>({ value: 100, freq: "month" });
  const [householdSupplies, setHouseholdSupplies] = useState<FrequencyAmount>({ value: 100, freq: "month" });
  const [mealsOut, setMealsOut] = useState<FrequencyAmount>({ value: 200, freq: "month" });
  const [otherLiving, setOtherLiving] = useState<FrequencyAmount>({ value: 200, freq: "month" });

  // Healthcare
  const [medicalInsurance, setMedicalInsurance] = useState<FrequencyAmount>({ value: 0, freq: "month" });
  const [medicalSpending, setMedicalSpending] = useState<FrequencyAmount>({ value: 200, freq: "month" });

  // Children & Education
  const [childCare, setChildCare] = useState<FrequencyAmount>({ value: 0, freq: "month" });
  const [tuitionSupplies, setTuitionSupplies] = useState<FrequencyAmount>({ value: 0, freq: "month" });
  const [childSupport, setChildSupport] = useState<FrequencyAmount>({ value: 0, freq: "month" });
  const [otherEducation, setOtherEducation] = useState<FrequencyAmount>({ value: 100, freq: "month" });

  // Savings & Investments
  const [fourZeroOneK, setFourZeroOneK] = useState<FrequencyAmount>({ value: 10000, freq: "year" });
  const [collegeSavings, setCollegeSavings] = useState<FrequencyAmount>({ value: 0, freq: "year" });
  const [investmentSavings, setInvestmentSavings] = useState<FrequencyAmount>({ value: 0, freq: "year" });
  const [emergencyFund, setEmergencyFund] = useState<FrequencyAmount>({ value: 0, freq: "month" });

  // Miscellaneous
  const [pet, setPet] = useState<FrequencyAmount>({ value: 200, freq: "month" });
  const [giftsDonations, setGiftsDonations] = useState<FrequencyAmount>({ value: 300, freq: "year" });
  const [hobbiesSports, setHobbiesSports] = useState<FrequencyAmount>({ value: 100, freq: "month" });
  const [entertainment, setEntertainment] = useState<FrequencyAmount>({ value: 100, freq: "month" });
  const [travelVacation, setTravelVacation] = useState<FrequencyAmount>({ value: 2000, freq: "year" });
  const [otherMisc, setOtherMisc] = useState<FrequencyAmount>({ value: 100, freq: "month" });

  // Stress Test Controls
  const [incomeDropPct, setIncomeDropPct] = useState<number>(0);
  const [inflationPct, setInflationPct] = useState<number>(0);
  const [tableSearch, setTableSearch] = useState<string>("");

  // Expandable Section Controls
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    incomes: true,
    housing: true,
    transportation: true,
    debt: true,
    living: true,
    healthcare: false,
    education: false,
    savings: true,
    misc: false,
  });

  const toggleSection = (sectionKey: string) => {
    setExpandedSections((prev) => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  // Compile inputs object
  const currentInputs: BudgetInputs = useMemo(() => {
    const incomeFactor = 1 - incomeDropPct / 100;
    const inflationFactor = 1 + inflationPct / 100;

    return {
      salary: { value: salary.value * incomeFactor, freq: salary.freq },
      pension: { value: pension.value * incomeFactor, freq: pension.freq },
      investments: { value: investments.value * incomeFactor, freq: investments.freq },
      otherIncome: { value: otherIncome.value * incomeFactor, freq: otherIncome.freq },
      taxRate,

      mortgage: { value: mortgage.value * inflationFactor, freq: mortgage.freq },
      propertyTax: { value: propertyTax.value * inflationFactor, freq: propertyTax.freq },
      rental: { value: rental.value * inflationFactor, freq: rental.freq },
      housingInsurance: { value: housingInsurance.value * inflationFactor, freq: housingInsurance.freq },
      hoaFee: { value: hoaFee.value * inflationFactor, freq: hoaFee.freq },
      homeMaintenance: { value: homeMaintenance.value * inflationFactor, freq: homeMaintenance.freq },
      utilities: { value: utilities.value * inflationFactor, freq: utilities.freq },

      autoLoan: { value: autoLoan.value * inflationFactor, freq: autoLoan.freq },
      autoInsurance: { value: autoInsurance.value * inflationFactor, freq: autoInsurance.freq },
      gasoline: { value: gasoline.value * inflationFactor, freq: gasoline.freq },
      autoMaintenance: { value: autoMaintenance.value * inflationFactor, freq: autoMaintenance.freq },
      parkingTolls: { value: parkingTolls.value * inflationFactor, freq: parkingTolls.freq },
      otherTransportation: { value: otherTransportation.value * inflationFactor, freq: otherTransportation.freq },

      creditCard: { value: creditCard.value * inflationFactor, freq: creditCard.freq },
      studentLoan: { value: studentLoan.value * inflationFactor, freq: studentLoan.freq },
      otherLoans: { value: otherLoans.value * inflationFactor, freq: otherLoans.freq },

      food: { value: food.value * inflationFactor, freq: food.freq },
      clothing: { value: clothing.value * inflationFactor, freq: clothing.freq },
      householdSupplies: { value: householdSupplies.value * inflationFactor, freq: householdSupplies.freq },
      mealsOut: { value: mealsOut.value * inflationFactor, freq: mealsOut.freq },
      otherLiving: { value: otherLiving.value * inflationFactor, freq: otherLiving.freq },

      medicalInsurance: { value: medicalInsurance.value * inflationFactor, freq: medicalInsurance.freq },
      medicalSpending: { value: medicalSpending.value * inflationFactor, freq: medicalSpending.freq },

      childCare: { value: childCare.value * inflationFactor, freq: childCare.freq },
      tuitionSupplies: { value: tuitionSupplies.value * inflationFactor, freq: tuitionSupplies.freq },
      childSupport: { value: childSupport.value * inflationFactor, freq: childSupport.freq },
      otherEducation: { value: otherEducation.value * inflationFactor, freq: otherEducation.freq },

      fourZeroOneK: { value: fourZeroOneK.value, freq: fourZeroOneK.freq },
      collegeSavings: { value: collegeSavings.value, freq: collegeSavings.freq },
      investmentSavings: { value: investmentSavings.value, freq: investmentSavings.freq },
      emergencyFund: { value: emergencyFund.value, freq: emergencyFund.freq },

      pet: { value: pet.value * inflationFactor, freq: pet.freq },
      giftsDonations: { value: giftsDonations.value * inflationFactor, freq: giftsDonations.freq },
      hobbiesSports: { value: hobbiesSports.value * inflationFactor, freq: hobbiesSports.freq },
      entertainment: { value: entertainment.value * inflationFactor, freq: entertainment.freq },
      travelVacation: { value: travelVacation.value * inflationFactor, freq: travelVacation.freq },
      otherMisc: { value: otherMisc.value * inflationFactor, freq: otherMisc.freq },
    };
  }, [
    salary, pension, investments, otherIncome, taxRate,
    mortgage, propertyTax, rental, housingInsurance, hoaFee, homeMaintenance, utilities,
    autoLoan, autoInsurance, gasoline, autoMaintenance, parkingTolls, otherTransportation,
    creditCard, studentLoan, otherLoans,
    food, clothing, householdSupplies, mealsOut, otherLiving,
    medicalInsurance, medicalSpending,
    childCare, tuitionSupplies, childSupport, otherEducation,
    fourZeroOneK, collegeSavings, investmentSavings, emergencyFund,
    pet, giftsDonations, hobbiesSports, entertainment, travelVacation, otherMisc,
    incomeDropPct, inflationPct,
  ]);

  const results = useMemo(() => calculateBudget(currentInputs), [currentInputs]);

  // Load Preset
  const handleLoadPreset = (presetName: string) => {
    setIncomeDropPct(0);
    setInflationPct(0);

    if (presetName === "default") {
      setSalary({ value: 83000, freq: "year" });
      setPension({ value: 0, freq: "year" });
      setInvestments({ value: 1000, freq: "year" });
      setOtherIncome({ value: 2000, freq: "year" });
      setTaxRate(28);

      setRental({ value: 1400, freq: "month" });
      setUtilities({ value: 250, freq: "month" });
      setAutoLoan({ value: 250, freq: "month" });
      setAutoInsurance({ value: 700, freq: "year" });
      setGasoline({ value: 100, freq: "month" });
      setStudentLoan({ value: 250, freq: "month" });
      setFood({ value: 400, freq: "month" });
      setMealsOut({ value: 200, freq: "month" });
      setFourZeroOneK({ value: 10000, freq: "year" });
    } else if (presetName === "hcol") {
      setSalary({ value: 135000, freq: "year" });
      setRental({ value: 2800, freq: "month" });
      setUtilities({ value: 350, freq: "month" });
      setAutoLoan({ value: 0, freq: "month" });
      setOtherTransportation({ value: 180, freq: "month" });
      setFood({ value: 650, freq: "month" });
      setMealsOut({ value: 450, freq: "month" });
      setFourZeroOneK({ value: 19500, freq: "year" });
      setTaxRate(32);
    } else if (presetName === "starter") {
      setSalary({ value: 55000, freq: "year" });
      setRental({ value: 950, freq: "month" });
      setUtilities({ value: 150, freq: "month" });
      setAutoLoan({ value: 220, freq: "month" });
      setFood({ value: 300, freq: "month" });
      setMealsOut({ value: 120, freq: "month" });
      setFourZeroOneK({ value: 3000, freq: "year" });
      setTaxRate(22);
    } else if (presetName === "family") {
      setSalary({ value: 110000, freq: "year" });
      setMortgage({ value: 1850, freq: "month" });
      setPropertyTax({ value: 4200, freq: "year" });
      setUtilities({ value: 400, freq: "month" });
      setAutoLoan({ value: 450, freq: "month" });
      setChildCare({ value: 1200, freq: "month" });
      setFood({ value: 850, freq: "month" });
      setMealsOut({ value: 250, freq: "month" });
      setFourZeroOneK({ value: 8000, freq: "year" });
      setTaxRate(26);
    }
  };

  // Copy Summary Handler
  const handleCopySummary = () => {
    const summaryText = `BUDGET SUMMARY (Calculator.net Superior Suite)
-----------------------------------------------
Gross Income: $${results.grossMonthlyIncome.toFixed(2)}/mo ($${results.grossAnnualIncome.toLocaleString()}/yr)
After-Tax Take Home: $${results.afterTaxMonthlyIncome.toFixed(2)}/mo
Total Expenses: $${results.totalMonthlyExpenses.toFixed(2)}/mo
Net Cash Flow: $${results.netMonthlySurplus.toFixed(2)}/mo
-----------------------------------------------
DTI Ratio: ${results.totalDti.toFixed(2)}% (${results.dtiRating})
Front-End Housing DTI: ${results.frontEndDti.toFixed(2)}%
Savings Rate: ${results.savingsRate.toFixed(2)}%
-----------------------------------------------
50/30/20 Breakdown:
- Needs: $${results.rule503020.needs.actual.toFixed(2)}/mo (${results.rule503020.needs.pctActual.toFixed(1)}% vs 50% target)
- Wants: $${results.rule503020.wants.actual.toFixed(2)}/mo (${results.rule503020.wants.pctActual.toFixed(1)}% vs 30% target)
- Savings: $${results.rule503020.savings.actual.toFixed(2)}/mo (${results.rule503020.savings.pctActual.toFixed(1)}% vs 20% target)`;

    navigator.clipboard.writeText(summaryText);
    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 2500);
  };

  // Report Modal Data Generator matching ReportModalProps schema
  const reportData: CalculatorReportData = useMemo(() => {
    const now = new Date();
    return {
      meta: {
        calculatorName: "Budget & Cash Flow Calculator",
        reportTitle: "Personal Financial & Expense Breakdown Report",
        generatedDate: now.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        generatedTime: now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        currencySymbol: "$",
      },
      keyMetrics: [
        { label: "Gross Annual Income", value: `$${results.grossAnnualIncome.toLocaleString("en-US", { maximumFractionDigits: 0 })}`, colorTheme: "blue" },
        { label: "Net Monthly Take-Home Pay", value: `$${results.afterTaxMonthlyIncome.toLocaleString("en-US", { maximumFractionDigits: 0 })}`, colorTheme: "emerald" },
        { label: "Total Monthly Expenses", value: `$${results.totalMonthlyExpenses.toLocaleString("en-US", { maximumFractionDigits: 0 })}`, colorTheme: "rose" },
        { label: "Net Monthly Cash Flow", value: `$${results.netMonthlySurplus.toLocaleString("en-US", { maximumFractionDigits: 0 })}`, colorTheme: results.netMonthlySurplus >= 0 ? "emerald" : "rose" },
      ],
      sections: [
        {
          title: "Incomes & Tax Settings",
          items: [
            { label: "Salary & Earned Income", value: `$${salary.value.toLocaleString()} / ${salary.freq}` },
            { label: "Investments & Savings Income", value: `$${investments.value.toLocaleString()} / ${investments.freq}` },
            { label: "Combined Income Tax Rate", value: `${taxRate}%` },
          ],
        },
        {
          title: "Core Metrics & DTI Ratios",
          items: [
            { label: "Back-End DTI Ratio", value: `${results.totalDti.toFixed(2)}% (${results.dtiRating})` },
            { label: "Front-End Housing DTI", value: `${results.frontEndDti.toFixed(2)}%` },
            { label: "Savings Rate", value: `${results.savingsRate.toFixed(2)}%` },
            { label: "Housing Cost Ratio", value: `${results.housingRatio.toFixed(2)}%` },
          ],
        },
        {
          title: "50 / 30 / 20 Allocation Breakdown",
          items: [
            { label: "Needs Actual Allocation", value: `$${results.rule503020.needs.actual.toFixed(0)}/mo (${results.rule503020.needs.pctActual.toFixed(1)}% vs 50% target)` },
            { label: "Wants Actual Allocation", value: `$${results.rule503020.wants.actual.toFixed(0)}/mo (${results.rule503020.wants.pctActual.toFixed(1)}% vs 30% target)` },
            { label: "Savings Actual Allocation", value: `$${results.rule503020.savings.actual.toFixed(0)}/mo (${results.rule503020.savings.pctActual.toFixed(1)}% vs 20% target)` },
          ],
        },
      ],
      table: {
        title: "Expense Breakdown by Category",
        headers: [
          { key: "cat", label: "Category", align: "left" },
          { key: "ann", label: "Annual Cost", align: "right" },
          { key: "mo", label: "Monthly Cost", align: "right" },
          { key: "pctInc", label: "% Take-Home Pay", align: "right" },
          { key: "pctExp", label: "% Total Expenses", align: "right" },
        ],
        rows: results.categories.map((cat) => ({
          cat: cat.name,
          ann: `$${cat.annual.toLocaleString("en-US", { maximumFractionDigits: 0 })}`,
          mo: `$${cat.monthly.toLocaleString("en-US", { maximumFractionDigits: 0 })}`,
          pctInc: `${cat.pctOfAfterTaxIncome.toFixed(1)}%`,
          pctExp: `${cat.pctOfExpenses.toFixed(1)}%`,
        })),
      },
      recommendation: {
        title: "AI Financial Health Assessment",
        text: results.recommendations.map((r) => `${r.title}: ${r.message}`).join("\n\n"),
      },
      notes: [
        "Net Monthly Cash Flow = After-Tax Monthly Income - Total Monthly Expenses",
        "Back-End DTI Ratio = Total Monthly Debt Payments / Gross Monthly Income",
        "50/30/20 Benchmark Rule: 50% Essential Needs, 30% Personal Wants, 20% Savings & Debt Repayment",
      ],
    };
  }, [results, salary, investments, taxRate]);

  // Chart data formatting
  const pieChartData = useMemo(() => {
    return results.categories
      .filter((cat) => cat.monthly > 0)
      .map((cat) => ({
        name: cat.name,
        value: Number(cat.monthly.toFixed(2)),
      }));
  }, [results.categories]);

  const barChart503020Data = useMemo(() => {
    return [
      {
        category: "Needs (50%)",
        Actual: Number(results.rule503020.needs.actual.toFixed(0)),
        Target: Number(results.rule503020.needs.ideal.toFixed(0)),
      },
      {
        category: "Wants (30%)",
        Actual: Number(results.rule503020.wants.actual.toFixed(0)),
        Target: Number(results.rule503020.wants.ideal.toFixed(0)),
      },
      {
        category: "Savings (20%)",
        Actual: Number(results.rule503020.savings.actual.toFixed(0)),
        Target: Number(results.rule503020.savings.ideal.toFixed(0)),
      },
    ];
  }, [results.rule503020]);

  // Filtered Itemized Table
  const filteredItemizedBreakdown = useMemo(() => {
    if (!tableSearch.trim()) return results.itemizedBreakdown;
    const term = tableSearch.toLowerCase();
    return results.itemizedBreakdown.filter(
      (item) =>
        item.label.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
    );
  }, [results.itemizedBreakdown, tableSearch]);

  // Helper renderer for input row with frequency toggle
  const renderInputRow = (
    label: string,
    state: FrequencyAmount,
    setState: React.Dispatch<React.SetStateAction<FrequencyAmount>>,
    hint?: string
  ) => {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
        <div>
          <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block">
            {label}
          </label>
          {hint && <span className="text-[10px] text-zinc-400 dark:text-zinc-500">{hint}</span>}
        </div>
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-32">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 font-sans tabular-nums">
              $
            </span>
            <Input
              type="number"
              min={0}
              step={10}
              value={state.value === 0 ? "" : state.value}
              onChange={(e) =>
                setState({ ...state, value: Math.max(0, Number(e.target.value) || 0) })
              }
              className="pl-6 text-xs font-sans tabular-nums h-8 bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
            />
          </div>
          <select
            value={state.freq}
            onChange={(e) =>
              setState({ ...state, freq: e.target.value as "month" | "year" })
            }
            className="text-xs h-8 px-2 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium focus:ring-1 focus:ring-blue-500 focus:outline-none"
          >
            <option value="month">/ Month</option>
            <option value="year">/ Year</option>
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Toolbar & Quick Presets */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-900 text-white shadow-lg border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <PieIcon className="h-5 w-5 text-blue-400" />
            <h2 className="text-base font-bold tracking-tight">Budget & Cash Flow Suite</h2>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 text-[10px]">
              Calculator.net Superior
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time income, expense, 50/30/20 & DTI analytics engine
          </p>
        </div>
        <div className="flex items-center flex-wrap gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">Presets:</span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleLoadPreset("default")}
            className="text-xs h-7 bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200"
          >
            Baseline ($83k)
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleLoadPreset("hcol")}
            className="text-xs h-7 bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200"
          >
            HCOL Metro
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleLoadPreset("starter")}
            className="text-xs h-7 bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200"
          >
            Starter
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleLoadPreset("family")}
            className="text-xs h-7 bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200"
          >
            Family of 4
          </Button>
        </div>
      </div>

      {/* 2. Main Grid: Inputs (Left) vs Sticky Dashboard (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Accordion Input Forms (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Section 1: Incomes & Tax */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/40">
            <button
              onClick={() => toggleSection("incomes")}
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-between font-bold text-xs text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            >
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-emerald-500" />
                <span>Incomes (Before Tax)</span>
              </div>
              {expandedSections.incomes ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {expandedSections.incomes && (
              <div className="p-4 space-y-2.5">
                {renderInputRow("Salary & Earned Income", salary, setSalary, "Full-time, part-time, bonuses")}
                {renderInputRow("Pension & Social Security", pension, setPension, "Retirement income, benefits")}
                {renderInputRow("Investments & Savings Income", investments, setInvestments, "Interest, dividends, rental income")}
                {renderInputRow("Other Income", otherIncome, setOtherIncome, "Gift, alimony, child support, tax return")}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60">
                  <div>
                    <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block">
                      Income Tax Rate (%)
                    </label>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                      Combined federal + state + local tax
                    </span>
                  </div>
                  <div className="relative sm:w-32">
                    <Input
                      type="number"
                      min={0}
                      max={60}
                      step={1}
                      value={taxRate}
                      onChange={(e) => setTaxRate(Math.max(0, Math.min(60, Number(e.target.value) || 0)))}
                      className="pr-6 text-xs font-sans tabular-nums h-8 bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 font-sans tabular-nums">
                      %
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Housing & Utilities */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/40">
            <button
              onClick={() => toggleSection("housing")}
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-between font-bold text-xs text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-blue-500" />
                <span>Housing & Utilities</span>
              </div>
              {expandedSections.housing ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {expandedSections.housing && (
              <div className="p-4 space-y-2.5">
                {renderInputRow("Mortgage", mortgage, setMortgage, "Primary mortgage payment")}
                {renderInputRow("Property Tax", propertyTax, setPropertyTax, "Annual property tax assessment")}
                {renderInputRow("Rental", rental, setRental, "Monthly rent payment")}
                {renderInputRow("Insurance", housingInsurance, setHousingInsurance, "Homeowners, renters, warranty")}
                {renderInputRow("HOA / Co-Op Fee", hoaFee, setHoaFee, "Monthly condo or HOA assessment")}
                {renderInputRow("Home Maintenance", homeMaintenance, setHomeMaintenance, "Repairs, landscape, cleaning, appliances")}
                {renderInputRow("Utilities", utilities, setUtilities, "Electricity, gas, water, internet, phone, cable")}
              </div>
            )}
          </div>

          {/* Section 3: Transportation */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/40">
            <button
              onClick={() => toggleSection("transportation")}
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-between font-bold text-xs text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-emerald-500" />
                <span>Transportation</span>
              </div>
              {expandedSections.transportation ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {expandedSections.transportation && (
              <div className="p-4 space-y-2.5">
                {renderInputRow("Auto Loan", autoLoan, setAutoLoan, "Monthly auto financing")}
                {renderInputRow("Auto Insurance", autoInsurance, setAutoInsurance, "Annual vehicle coverage")}
                {renderInputRow("Gasoline / EV Fuel", gasoline, setGasoline, "Fuel or charging costs")}
                {renderInputRow("Auto Maintenance", autoMaintenance, setAutoMaintenance, "Oil changes, tires, servicing")}
                {renderInputRow("Parking & Tolls", parkingTolls, setParkingTolls, "Commute parking and toll passes")}
                {renderInputRow("Other Transportation Costs", otherTransportation, setOtherTransportation, "Transit passes, taxi, registration")}
              </div>
            )}
          </div>

          {/* Section 4: Other Debt & Loan Payments */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/40">
            <button
              onClick={() => toggleSection("debt")}
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-between font-bold text-xs text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            >
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-rose-500" />
                <span>Other Debt & Loan Payments</span>
              </div>
              {expandedSections.debt ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {expandedSections.debt && (
              <div className="p-4 space-y-2.5">
                {renderInputRow("Credit Card", creditCard, setCreditCard, "Recurring balance payback amount")}
                {renderInputRow("Student Loan", studentLoan, setStudentLoan, "Monthly federal/private student loans")}
                {renderInputRow("Other Loans & Liabilities", otherLoans, setOtherLoans, "Personal loan, store cards")}
              </div>
            )}
          </div>

          {/* Section 5: Living Expenses */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/40">
            <button
              onClick={() => toggleSection("living")}
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-between font-bold text-xs text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-amber-500" />
                <span>Living Expenses</span>
              </div>
              {expandedSections.living ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {expandedSections.living && (
              <div className="p-4 space-y-2.5">
                {renderInputRow("Food & Groceries", food, setFood, "Supermarket & pantry supplies")}
                {renderInputRow("Clothing", clothing, setClothing, "Apparel & shoes")}
                {renderInputRow("Household Supplies", householdSupplies, setHouseholdSupplies, "Cleaning supplies, toiletries")}
                {renderInputRow("Meals Out / Dining", mealsOut, setMealsOut, "Restaurants, coffee, takeout")}
                {renderInputRow("Other Living Expenses", otherLiving, setOtherLiving, "Laundry, barber, beauty, personal care")}
              </div>
            )}
          </div>

          {/* Section 6: Healthcare */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/40">
            <button
              onClick={() => toggleSection("healthcare")}
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-between font-bold text-xs text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-purple-500" />
                <span>Healthcare</span>
              </div>
              {expandedSections.healthcare ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {expandedSections.healthcare && (
              <div className="p-4 space-y-2.5">
                {renderInputRow("Medical Insurance", medicalInsurance, setMedicalInsurance, "Out-of-pocket health premiums")}
                {renderInputRow("Medical Out-of-Pocket", medicalSpending, setMedicalSpending, "Copays, uncovered doctor visits, drugs")}
              </div>
            )}
          </div>

          {/* Section 7: Children & Education */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/40">
            <button
              onClick={() => toggleSection("education")}
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-between font-bold text-xs text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Bookmark className="h-4 w-4 text-pink-500" />
                <span>Children & Education</span>
              </div>
              {expandedSections.education ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {expandedSections.education && (
              <div className="p-4 space-y-2.5">
                {renderInputRow("Child & Personal Care", childCare, setChildCare, "Daycare, babysitting")}
                {renderInputRow("Tuition & Supplies", tuitionSupplies, setTuitionSupplies, "School tuition, books")}
                {renderInputRow("Child Support Payments", childSupport, setChildSupport, "Legal support payments")}
                {renderInputRow("Other Spending", otherEducation, setOtherEducation, "Software, magazines, devices")}
              </div>
            )}
          </div>

          {/* Section 8: Savings & Investments */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/40">
            <button
              onClick={() => toggleSection("savings")}
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-between font-bold text-xs text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-cyan-500" />
                <span>Savings & Investments</span>
              </div>
              {expandedSections.savings ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {expandedSections.savings && (
              <div className="p-4 space-y-2.5">
                {renderInputRow("401k & IRA", fourZeroOneK, setFourZeroOneK, "Before tax retirement contribution")}
                {renderInputRow("College Saving (529)", collegeSavings, setCollegeSavings, "Before tax contribution")}
                {renderInputRow("Taxable Investments", investmentSavings, setInvestmentSavings, "Stock, bond, funds, real estate")}
                {renderInputRow("Emergency Fund & Liquid", emergencyFund, setEmergencyFund, "High-yield savings, CD reserve")}
              </div>
            )}
          </div>

          {/* Section 9: Miscellaneous Expenses */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/40">
            <button
              onClick={() => toggleSection("misc")}
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-between font-bold text-xs text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-slate-400" />
                <span>Miscellaneous Expenses</span>
              </div>
              {expandedSections.misc ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {expandedSections.misc && (
              <div className="p-4 space-y-2.5">
                {renderInputRow("Pet Care", pet, setPet, "Food, vet, grooming")}
                {renderInputRow("Gifts & Donations", giftsDonations, setGiftsDonations, "Charity, birthdays, holidays")}
                {renderInputRow("Hobbies & Sports", hobbiesSports, setHobbiesSports, "Gym memberships, sports gear")}
                {renderInputRow("Entertainment & Tickets", entertainment, setEntertainment, "Movies, events, streaming")}
                {renderInputRow("Travel & Vacation", travelVacation, setTravelVacation, "Flights, hotels, trips")}
                {renderInputRow("Other Expenses", otherMisc, setOtherMisc, "Uncategorized discretionary")}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Dynamic Results Dashboard (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Result Navigation Tabs */}
          <div className="flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-lg text-xs font-medium border border-zinc-200 dark:border-zinc-700">
            <button
              onClick={() => setActiveTab("summary")}
              className={`flex-1 py-1.5 px-2 rounded-md transition-colors ${
                activeTab === "summary"
                  ? "bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 font-bold shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setActiveTab("charts")}
              className={`flex-1 py-1.5 px-2 rounded-md transition-colors ${
                activeTab === "charts"
                  ? "bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 font-bold shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
              }`}
            >
              Charts
            </button>
            <button
              onClick={() => setActiveTab("table")}
              className={`flex-1 py-1.5 px-2 rounded-md transition-colors ${
                activeTab === "table"
                  ? "bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 font-bold shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
              }`}
            >
              Breakdown
            </button>
            <button
              onClick={() => setActiveTab("stresstest")}
              className={`flex-1 py-1.5 px-2 rounded-md transition-colors ${
                activeTab === "stresstest"
                  ? "bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 font-bold shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
              }`}
            >
              Stress Test
            </button>
          </div>

          {/* TAB 1: SUMMARY DASHBOARD */}
          {activeTab === "summary" && (
            <div className="space-y-4">
              {/* Primary Net Cash Flow Banner */}
              <div
                className={`p-4 rounded-xl border ${
                  results.netMonthlySurplus >= 0
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-200"
                    : "bg-rose-500/10 border-rose-500/30 text-rose-950 dark:text-rose-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    {results.netMonthlySurplus >= 0 ? "Net Monthly Surplus" : "Net Monthly Deficit"}
                  </span>
                  <Badge
                    className={`${
                      results.netMonthlySurplus >= 0 ? "bg-emerald-600" : "bg-rose-600"
                    } text-white text-[11px]`}
                  >
                    {results.netMonthlySurplus >= 0 ? "Positive Flow" : "Over Budget"}
                  </Badge>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold font-sans tabular-nums mt-1">
                  ${Math.abs(results.netMonthlySurplus).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  <span className="text-xs font-normal ml-1 opacity-80">/ month</span>
                </div>
                <div className="text-xs mt-1 opacity-90">
                  Annual equivalent: ${results.netAnnualSurplus >= 0 ? "+" : "-"}$
                  {Math.abs(results.netAnnualSurplus).toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  /year
                </div>
              </div>

              {/* Income vs Expense Table */}
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden text-xs">
                <div className="bg-zinc-100 dark:bg-zinc-800 px-3 py-2 font-bold text-zinc-800 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-700">
                  Income & Expense Overview
                </div>
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 text-zinc-500 font-semibold">
                      <th className="p-2.5">Metrics</th>
                      <th className="p-2.5 text-right">Annual</th>
                      <th className="p-2.5 text-right">Monthly</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-sans tabular-nums">
                    <tr>
                      <td className="p-2.5 font-sans font-medium text-zinc-800 dark:text-zinc-200">
                        Total Before Tax Income
                      </td>
                      <td className="p-2.5 text-right font-bold text-zinc-900 dark:text-zinc-100">
                        ${results.grossAnnualIncome.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                      </td>
                      <td className="p-2.5 text-right text-zinc-700 dark:text-zinc-300">
                        ${results.grossMonthlyIncome.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-sans font-medium text-zinc-800 dark:text-zinc-200">
                        Total After Tax Income
                      </td>
                      <td className="p-2.5 text-right font-bold text-emerald-600 dark:text-emerald-400">
                        ${results.afterTaxAnnualIncome.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                      </td>
                      <td className="p-2.5 text-right text-emerald-600 dark:text-emerald-400 font-bold">
                        ${results.afterTaxMonthlyIncome.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-sans font-medium text-zinc-800 dark:text-zinc-200">
                        Total Expenses
                      </td>
                      <td className="p-2.5 text-right font-bold text-rose-600 dark:text-rose-400">
                        ${results.totalAnnualExpenses.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                      </td>
                      <td className="p-2.5 text-right text-rose-600 dark:text-rose-400 font-bold">
                        ${results.totalMonthlyExpenses.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                      </td>
                    </tr>
                    <tr className="bg-zinc-50 dark:bg-zinc-800/30">
                      <td className="p-2.5 font-sans font-bold text-zinc-900 dark:text-zinc-100">
                        Net (Deficit) / Surplus
                      </td>
                      <td
                        className={`p-2.5 text-right font-extrabold ${
                          results.netAnnualSurplus >= 0
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-rose-600 dark:text-rose-400"
                        }`}
                      >
                        ${results.netAnnualSurplus.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                      </td>
                      <td
                        className={`p-2.5 text-right font-extrabold ${
                          results.netMonthlySurplus >= 0
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-rose-600 dark:text-rose-400"
                        }`}
                      >
                        ${results.netMonthlySurplus.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Debt-to-Income (DTI) Module */}
              <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-zinc-800 dark:text-zinc-200">
                  <span>Debt-to-Income (DTI) Ratios</span>
                  <Badge variant="outline" className="text-[10px]">
                    Rating: {results.dtiRating}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block">Total DTI Ratio</span>
                    <span className="text-lg font-bold font-sans tabular-nums text-zinc-900 dark:text-zinc-100">
                      {results.totalDti.toFixed(2)}%
                    </span>
                    <span className="text-[10px] text-zinc-400 block mt-0.5">Target &lt; 36%</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block">Front-End Housing</span>
                    <span className="text-lg font-bold font-sans tabular-nums text-zinc-900 dark:text-zinc-100">
                      {results.frontEndDti.toFixed(2)}%
                    </span>
                    <span className="text-[10px] text-zinc-400 block mt-0.5">Housing / Gross</span>
                  </div>
                </div>
              </div>

              {/* 50/30/20 Rule Benchmark Progress */}
              <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
                <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center justify-between">
                  <span>50 / 30 / 20 Rule Analysis</span>
                  <span className="text-[10px] text-zinc-400 font-normal">Needs / Wants / Savings</span>
                </div>

                <div className="space-y-2 text-xs">
                  {/* Needs */}
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="font-semibold text-zinc-700 dark:text-zinc-300">Needs (Target 50%)</span>
                      <span className="font-sans tabular-nums">
                        ${results.rule503020.needs.actual.toFixed(0)}/mo ({results.rule503020.needs.pctActual.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          results.rule503020.needs.pctActual > 55 ? "bg-rose-500" : "bg-blue-500"
                        }`}
                        style={{ width: `${Math.min(100, results.rule503020.needs.pctActual)}%` }}
                      />
                    </div>
                  </div>

                  {/* Wants */}
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="font-semibold text-zinc-700 dark:text-zinc-300">Wants (Target 30%)</span>
                      <span className="font-sans tabular-nums">
                        ${results.rule503020.wants.actual.toFixed(0)}/mo ({results.rule503020.wants.pctActual.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          results.rule503020.wants.pctActual > 35 ? "bg-amber-500" : "bg-emerald-500"
                        }`}
                        style={{ width: `${Math.min(100, results.rule503020.wants.pctActual)}%` }}
                      />
                    </div>
                  </div>

                  {/* Savings */}
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="font-semibold text-zinc-700 dark:text-zinc-300">Savings & Debt (Target 20%)</span>
                      <span className="font-sans tabular-nums">
                        ${results.rule503020.savings.actual.toFixed(0)}/mo ({results.rule503020.savings.pctActual.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          results.rule503020.savings.pctActual >= 20 ? "bg-emerald-500" : "bg-amber-500"
                        }`}
                        style={{ width: `${Math.min(100, results.rule503020.savings.pctActual)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Toolbar Buttons */}
              
            </div>
          )}

          {/* TAB 2: CHARTS SECTION */}
          {activeTab === "charts" && (
            <div className="space-y-4">
              {/* Donut Chart: Expenses Breakdown */}
              <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
                <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  Expenses Breakdown by Category
                </h3>
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(val: any) => [`$${Number(val || 0).toLocaleString()}/mo`, "Cost"]}
                        contentStyle={{ backgroundColor: "#1f2937", borderRadius: "8px", color: "#fff" }}
                      />
                      <Legend wrapperStyle={{ fontSize: "10px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bar Chart: 50/30/20 Actual vs Target */}
              <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
                <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  50 / 30 / 20 Actual vs Target ($/month)
                </h3>
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChart503020Data}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="category" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip formatter={(val: any) => [`$${Number(val || 0).toLocaleString()}`, "Amount"]} />
                      <Legend wrapperStyle={{ fontSize: "10px" }} />
                      <Bar dataKey="Actual" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Target" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ITEMIZED TABLE */}
          {activeTab === "table" && (
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                <Input
                  placeholder="Filter expenses..."
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  className="pl-8 text-xs h-8 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                />
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden text-xs max-h-[450px] overflow-y-auto">
                <table className="w-full text-left">
                  <thead className="sticky top-0 bg-zinc-100 dark:bg-zinc-800 text-slate-800 dark:text-slate-200 font-semibold font-semibold border-b border-zinc-200 dark:border-zinc-700">
                    <tr>
                      <th className="p-2">Item</th>
                      <th className="p-2 text-right">Annual</th>
                      <th className="p-2 text-right">Monthly</th>
                      <th className="p-2 text-right">% Income</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-sans tabular-nums">
                    {filteredItemizedBreakdown
                      .filter((item) => item.annual > 0)
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                          <td className="p-2 font-sans font-medium text-zinc-800 dark:text-zinc-200">
                            {item.label}
                            <span className="block text-[10px] text-zinc-400 font-normal">{item.category}</span>
                          </td>
                          <td className="p-2 text-right font-bold text-zinc-900 dark:text-zinc-100">
                            ${item.annual.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                          </td>
                          <td className="p-2 text-right text-zinc-700 dark:text-zinc-300">
                            ${item.monthly.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                          </td>
                          <td className="p-2 text-right text-blue-600 dark:text-blue-400 font-bold">
                            {item.pctOfIncome.toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: STRESS TEST & SENSITIVITY */}
          {activeTab === "stresstest" && (
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4 text-xs">
              <div>
                <h3 className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">What-If Sensitivity Stress Test
                </h3>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Test how income drops or unexpected expense inflation affect your net monthly surplus.
                </p>
              </div>

              {/* Income Drop Slider */}
              <div className="space-y-1.5 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/60">
                <div className="flex justify-between font-semibold">
                  <span>Income Reduction Shock</span>
                  <span className="font-sans tabular-nums text-rose-500">-{incomeDropPct}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={30}
                  step={5}
                  value={incomeDropPct}
                  onChange={(e) => setIncomeDropPct(Number(e.target.value))}
                  className="w-full accent-rose-500"
                />
                <span className="text-[10px] text-zinc-400 block">
                  Simulates job transition or salary decrease.
                </span>
              </div>

              {/* Inflation Surge Slider */}
              <div className="space-y-1.5 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/60">
                <div className="flex justify-between font-semibold">
                  <span>Expense Inflation Surge</span>
                  <span className="font-sans tabular-nums text-amber-500">+{inflationPct}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={20}
                  step={2.5}
                  value={inflationPct}
                  onChange={(e) => setInflationPct(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <span className="text-[10px] text-zinc-400 block">
                  Simulates rent hikes, fuel prices, or grocery inflation.
                </span>
              </div>

              {/* Stress Test Impact Display */}
              <div className="p-3 rounded-lg bg-slate-900 text-white space-y-1">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">
                  Stressed Net Monthly Surplus
                </span>
                <div className="text-xl font-extrabold font-sans tabular-nums">
                  ${results.netMonthlySurplus.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                  <span className="text-xs font-normal text-slate-400">/mo</span>
                </div>
                {results.netMonthlySurplus < 0 && (
                  <p className="text-[10px] text-rose-300">
                    Warning: Under this scenario, your cash flow is negative!
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Report Generator Modal */}
      {isReportOpen && (
        <ReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          reportData={reportData}
        />
      )}
    </div>
  );
}
