"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Bookmark,
  Trash2,
  Download,
  DollarSign,
  Calendar,
  Percent,
  Clock,
  TrendingDown,
  Scale,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  FileSpreadsheet,
} from "lucide-react";
import {
  calculateFixedTermPayment,
  calculateFixedPaymentDuration,
  calculateAffordableLoanAmount,
  calculateBiWeeklyComparison,
  compareLoanOffers,
} from "@/app/calculators/payment-calculator/calculator";
import {
  PaymentFrequency,
  SavedPaymentItem,
} from "@/app/calculators/payment-calculator/types";
import { PaymentContent } from "./PaymentContent";

export function PaymentCalculator() {
  const input3DClass =
    "w-full h-8 px-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-slate-900 dark:text-slate-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-600 focus:outline-none transition-all text-xs";
  const select3DClass =
    "w-full h-8 px-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-slate-900 dark:text-slate-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] focus:border-blue-600 focus:outline-none cursor-pointer text-xs";
  const outerBox3DClass =
    "border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs";

  const triggerCsvDownload = (filename: string, csvContent: string) => {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // =========================================================================
  // BOX 1: FIXED TERM LOAN PAYMENT SOLVER (CORE)
  // =========================================================================
  const [b1LoanAmount, setB1LoanAmount] = useState<string>("200000");
  const [b1TermYears, setB1TermYears] = useState<string>("15");
  const [b1TermMonths, setB1TermMonths] = useState<string>("0");
  const [b1InterestRate, setB1InterestRate] = useState<string>("6.0");
  const [b1Frequency, setB1Frequency] = useState<PaymentFrequency>("monthly");
  const [b1UpfrontFees, setB1UpfrontFees] = useState<string>("0");
  const [b1ExtraMonthly, setB1ExtraMonthly] = useState<string>("0");
  const [b1ExtraAnnual, setB1ExtraAnnual] = useState<string>("0");
  const [b1ScheduleView, setB1ScheduleView] = useState<"annual" | "monthly">("annual");

  const [savedBox1, setSavedBox1] = useState<SavedPaymentItem[]>([]);
  const [justSavedBox1, setJustSavedBox1] = useState<boolean>(false);

  // =========================================================================
  // BOX 2: FIXED PAYMENT DURATION SOLVER
  // =========================================================================
  const [b2LoanAmount, setB2LoanAmount] = useState<string>("200000");
  const [b2MonthlyPayment, setB2MonthlyPayment] = useState<string>("2000");
  const [b2InterestRate, setB2InterestRate] = useState<string>("6.0");

  const [savedBox2, setSavedBox2] = useState<SavedPaymentItem[]>([]);
  const [justSavedBox2, setJustSavedBox2] = useState<boolean>(false);

  // =========================================================================
  // BOX 3: MAXIMUM AFFORDABLE LOAN AMOUNT SOLVER
  // =========================================================================
  const [b3TargetPayment, setB3TargetPayment] = useState<string>("1500");
  const [b3TermYears, setB3TermYears] = useState<string>("15");
  const [b3InterestRate, setB3InterestRate] = useState<string>("6.0");

  const [savedBox3, setSavedBox3] = useState<SavedPaymentItem[]>([]);
  const [justSavedBox3, setJustSavedBox3] = useState<boolean>(false);

  // =========================================================================
  // BOX 4: BI-WEEKLY ACCELERATION COMPARATOR
  // =========================================================================
  const [b4LoanAmount, setB4LoanAmount] = useState<string>("300000");
  const [b4TermYears, setB4TermYears] = useState<string>("30");
  const [b4InterestRate, setB4InterestRate] = useState<string>("6.5");

  const [savedBox4, setSavedBox4] = useState<SavedPaymentItem[]>([]);
  const [justSavedBox4, setJustSavedBox4] = useState<boolean>(false);

  // =========================================================================
  // BOX 5: SIDE-BY-SIDE MULTI-LOAN COMPARISON
  // =========================================================================
  const [b5L1Amount, setB5L1Amount] = useState<string>("300000");
  const [b5L1Years, setB5L1Years] = useState<string>("30");
  const [b5L1Rate, setB5L1Rate] = useState<string>("6.5");
  const [b5L1Fees, setB5L1Fees] = useState<string>("0");

  const [b5L2Amount, setB5L2Amount] = useState<string>("300000");
  const [b5L2Years, setB5L2Years] = useState<string>("15");
  const [b5L2Rate, setB5L2Rate] = useState<string>("5.75");
  const [b5L2Fees, setB5L2Fees] = useState<string>("0");

  const [savedBox5, setSavedBox5] = useState<SavedPaymentItem[]>([]);
  const [justSavedBox5, setJustSavedBox5] = useState<boolean>(false);

  // =========================================================================
  // BOX 6: EXTRA PRINCIPAL WINDFALL ACCELERATOR
  // =========================================================================
  const [b6ExtraMonthlyBoost, setB6ExtraMonthlyBoost] = useState<number>(100);
  const [savedBox6, setSavedBox6] = useState<SavedPaymentItem[]>([]);
  const [justSavedBox6, setJustSavedBox6] = useState<boolean>(false);

  useEffect(() => {
    try {
      const s1 = localStorage.getItem("saved_pay_box1");
      if (s1) setSavedBox1(JSON.parse(s1));
      const s2 = localStorage.getItem("saved_pay_box2");
      if (s2) setSavedBox2(JSON.parse(s2));
      const s3 = localStorage.getItem("saved_pay_box3");
      if (s3) setSavedBox3(JSON.parse(s3));
      const s4 = localStorage.getItem("saved_pay_box4");
      if (s4) setSavedBox4(JSON.parse(s4));
      const s5 = localStorage.getItem("saved_pay_box5");
      if (s5) setSavedBox5(JSON.parse(s5));
      const s6 = localStorage.getItem("saved_pay_box6");
      if (s6) setSavedBox6(JSON.parse(s6));
    } catch (e) {}
  }, []);

  // Box 1 Calculations
  const b1Calc = useMemo(() => {
    return calculateFixedTermPayment({
      loanAmount: parseFloat(b1LoanAmount) || 0,
      termYears: parseFloat(b1TermYears) || 0,
      termMonths: parseFloat(b1TermMonths) || 0,
      interestRate: parseFloat(b1InterestRate) || 0,
      frequency: b1Frequency,
      upfrontFees: parseFloat(b1UpfrontFees) || 0,
      extraMonthlyPayment: parseFloat(b1ExtraMonthly) || 0,
      extraAnnualPayment: parseFloat(b1ExtraAnnual) || 0,
      oneTimeLumpSum: 0,
      oneTimeLumpSumMonth: 1,
    });
  }, [
    b1LoanAmount,
    b1TermYears,
    b1TermMonths,
    b1InterestRate,
    b1Frequency,
    b1UpfrontFees,
    b1ExtraMonthly,
    b1ExtraAnnual,
  ]);

  const handleExportBox1CSV = () => {
    const schedule = b1ScheduleView === "annual" ? b1Calc.annualSchedule : b1Calc.monthlySchedule;
    const headers = [
      b1ScheduleView === "annual" ? "Year" : "Payment #",
      "Payment Amount ($)",
      "Principal ($)",
      "Interest ($)",
      "Total Interest to Date ($)",
      "Ending Balance ($)",
    ];
    const rows = schedule.map((row) => [
      row.period.toString(),
      `$${row.payment.toLocaleString()}`,
      `$${row.principal.toLocaleString()}`,
      `$${row.interest.toLocaleString()}`,
      `$${row.totalInterestToDate.toLocaleString()}`,
      `$${row.endingBalance.toLocaleString()}`,
    ]);
    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    triggerCsvDownload(`loan_amortization_schedule_${b1ScheduleView}.csv`, csv);
  };

  const handleSaveBox1 = () => {
    const inputsStr = `Loan: $${parseFloat(b1LoanAmount).toLocaleString()} | Term: ${b1TermYears} yrs | Rate: ${b1InterestRate}% (${b1Frequency})`;
    const primaryStr = `Payment: $${b1Calc.paymentPerPeriod.toLocaleString()} / month | Total Interest: $${b1Calc.totalInterestPaid.toLocaleString()} | Total Paid: $${b1Calc.totalAmountPaid.toLocaleString()}`;

    const detailsList = [
      `Monthly / Periodic Payment: $${b1Calc.paymentPerPeriod.toLocaleString()}`,
      `Total Payments Count: ${b1Calc.totalPaymentsCount} installments`,
      `Total Interest Paid: $${b1Calc.totalInterestPaid.toLocaleString()} (${b1Calc.interestPercentage}% of total cost)`,
      `Total Cost of Loan: $${b1Calc.totalAmountPaid.toLocaleString()}`,
      `Interest Saved with Extra Payments: $${b1Calc.interestSavedWithExtra.toLocaleString()}`,
      `Time Shaved Off: ${b1Calc.monthsShavedOff} months`,
    ];

    const newItem: SavedPaymentItem = {
      id: Date.now().toString(),
      title: "Fixed Term Loan Payment Calculation",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox1.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox1(updated);
    try {
      localStorage.setItem("saved_pay_box1", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox1(true);
    setTimeout(() => setJustSavedBox1(false), 2000);
  };

  const handleDeleteSavedBox1 = (id: string) => {
    const updated = savedBox1.filter((item) => item.id !== id);
    setSavedBox1(updated);
    try {
      localStorage.setItem("saved_pay_box1", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox1 = () => {
    setSavedBox1([]);
    try {
      localStorage.removeItem("saved_pay_box1");
    } catch (e) {}
  };

  // Box 2 Calculations (Fixed Payment Duration)
  const b2Calc = useMemo(() => {
    return calculateFixedPaymentDuration({
      loanAmount: parseFloat(b2LoanAmount) || 0,
      monthlyPayment: parseFloat(b2MonthlyPayment) || 0,
      interestRate: parseFloat(b2InterestRate) || 0,
    });
  }, [b2LoanAmount, b2MonthlyPayment, b2InterestRate]);

  const handleSaveBox2 = () => {
    const inputsStr = `Loan: $${parseFloat(b2LoanAmount).toLocaleString()} | Payment: $${b2MonthlyPayment}/mo | Rate: ${b2InterestRate}%`;
    let primaryStr = "";
    if (b2Calc.isInterestTrap) {
      primaryStr = `Interest Trap Warning: Monthly payment $${b2MonthlyPayment} is less than monthly interest ($${b2Calc.minPaymentToCoverInterest}). Loan will never pay off.`;
    } else {
      primaryStr = `Payoff Time: ${b2Calc.payoffYears.toFixed(1)} years (${b2Calc.payoffMonths} months) | Total Interest: $${b2Calc.totalInterestPaid.toLocaleString()}`;
    }

    const detailsList = [
      `Payoff Duration: ${b2Calc.payoffMonths} months (${b2Calc.payoffYears.toFixed(1)} years)`,
      `Total Interest Paid: $${b2Calc.totalInterestPaid.toLocaleString()}`,
      `Total Repayment: $${b2Calc.totalAmountPaid.toLocaleString()}`,
    ];

    const newItem: SavedPaymentItem = {
      id: Date.now().toString(),
      title: "Fixed Payment Duration Solver",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox2.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox2(updated);
    try {
      localStorage.setItem("saved_pay_box2", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox2(true);
    setTimeout(() => setJustSavedBox2(false), 2000);
  };

  const handleDeleteSavedBox2 = (id: string) => {
    const updated = savedBox2.filter((item) => item.id !== id);
    setSavedBox2(updated);
    try {
      localStorage.setItem("saved_pay_box2", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox2 = () => {
    setSavedBox2([]);
    try {
      localStorage.removeItem("saved_pay_box2");
    } catch (e) {}
  };

  // Box 3 Calculations (Affordable Loan Amount)
  const b3Calc = useMemo(() => {
    return calculateAffordableLoanAmount({
      targetMonthlyPayment: parseFloat(b3TargetPayment) || 0,
      termYears: parseFloat(b3TermYears) || 0,
      termMonths: 0,
      interestRate: parseFloat(b3InterestRate) || 0,
    });
  }, [b3TargetPayment, b3TermYears, b3InterestRate]);

  const handleSaveBox3 = () => {
    const inputsStr = `Budget: $${b3TargetPayment}/mo | Term: ${b3TermYears} yrs | Rate: ${b3InterestRate}%`;
    const primaryStr = `Max Borrowing Power: $${b3Calc.maxBorrowableLoanAmount.toLocaleString()} | Total Paid: $${b3Calc.totalAmountPaid.toLocaleString()}`;

    const detailsList = [
      `Maximum Borrowable Loan Amount: $${b3Calc.maxBorrowableLoanAmount.toLocaleString()}`,
      `Total Interest Over Term: $${b3Calc.totalInterestPaid.toLocaleString()}`,
      `Total Amount Paid: $${b3Calc.totalAmountPaid.toLocaleString()}`,
    ];

    const newItem: SavedPaymentItem = {
      id: Date.now().toString(),
      title: "Maximum Affordable Loan Amount",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox3.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox3(updated);
    try {
      localStorage.setItem("saved_pay_box3", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox3(true);
    setTimeout(() => setJustSavedBox3(false), 2000);
  };

  const handleDeleteSavedBox3 = (id: string) => {
    const updated = savedBox3.filter((item) => item.id !== id);
    setSavedBox3(updated);
    try {
      localStorage.setItem("saved_pay_box3", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox3 = () => {
    setSavedBox3([]);
    try {
      localStorage.removeItem("saved_pay_box3");
    } catch (e) {}
  };

  // Box 4 Calculations (Bi-Weekly Acceleration)
  const b4Calc = useMemo(() => {
    return calculateBiWeeklyComparison(
      parseFloat(b4LoanAmount) || 300000,
      parseFloat(b4TermYears) || 30,
      parseFloat(b4InterestRate) || 6.5
    );
  }, [b4LoanAmount, b4TermYears, b4InterestRate]);

  const handleSaveBox4 = () => {
    const inputsStr = `Loan: $${parseFloat(b4LoanAmount).toLocaleString()} | ${b4TermYears} yrs @ ${b4InterestRate}%`;
    const primaryStr = `Interest Saved: $${b4Calc.interestSaved.toLocaleString()} | Shaves ${b4Calc.yearsShaved} Years off Payoff!`;

    const detailsList = [
      `Standard Monthly Payment: $${b4Calc.monthlyPayment.toLocaleString()} / mo (Total Interest: $${b4Calc.monthlyTotalInterest.toLocaleString()})`,
      `Accelerated Bi-Weekly Payment: $${b4Calc.acceleratedBiWeeklyPayment.toLocaleString()} / 2 wks (Total Interest: $${b4Calc.acceleratedTotalInterest.toLocaleString()})`,
      `Total Interest Saved: $${b4Calc.interestSaved.toLocaleString()}`,
      `Loan Payoff Acceleration: Shaves ${b4Calc.yearsShaved} years off loan!`,
    ];

    const newItem: SavedPaymentItem = {
      id: Date.now().toString(),
      title: "Bi-Weekly Payment Acceleration",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox4.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox4(updated);
    try {
      localStorage.setItem("saved_pay_box4", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox4(true);
    setTimeout(() => setJustSavedBox4(false), 2000);
  };

  const handleDeleteSavedBox4 = (id: string) => {
    const updated = savedBox4.filter((item) => item.id !== id);
    setSavedBox4(updated);
    try {
      localStorage.setItem("saved_pay_box4", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox4 = () => {
    setSavedBox4([]);
    try {
      localStorage.removeItem("saved_pay_box4");
    } catch (e) {}
  };

  // Box 5 Calculations (Multi-Loan Offer Comparator)
  const b5Calc = useMemo(() => {
    const offers = [
      {
        id: "l1",
        name: "Loan Offer A",
        loanAmount: parseFloat(b5L1Amount) || 300000,
        termYears: parseFloat(b5L1Years) || 30,
        interestRate: parseFloat(b5L1Rate) || 6.5,
        upfrontFees: parseFloat(b5L1Fees) || 0,
      },
      {
        id: "l2",
        name: "Loan Offer B",
        loanAmount: parseFloat(b5L2Amount) || 300000,
        termYears: parseFloat(b5L2Years) || 15,
        interestRate: parseFloat(b5L2Rate) || 5.75,
        upfrontFees: parseFloat(b5L2Fees) || 0,
      },
    ];
    return compareLoanOffers(offers);
  }, [b5L1Amount, b5L1Years, b5L1Rate, b5L1Fees, b5L2Amount, b5L2Years, b5L2Rate, b5L2Fees]);

  const handleSaveBox5 = () => {
    const inputsStr = `Offer A: ${b5L1Years}yr @ ${b5L1Rate}% vs Offer B: ${b5L2Years}yr @ ${b5L2Rate}%`;
    const primaryStr = `Offer A: $${b5Calc[0]?.monthlyPayment.toLocaleString()}/mo vs Offer B: $${b5Calc[1]?.monthlyPayment.toLocaleString()}/mo (Interest Diff: $${Math.abs(b5Calc[0]?.totalInterest - b5Calc[1]?.totalInterest).toLocaleString()})`;

    const detailsList = [
      `Offer A Monthly Payment: $${b5Calc[0]?.monthlyPayment.toLocaleString()} (Total Interest: $${b5Calc[0]?.totalInterest.toLocaleString()})`,
      `Offer B Monthly Payment: $${b5Calc[1]?.monthlyPayment.toLocaleString()} (Total Interest: $${b5Calc[1]?.totalInterest.toLocaleString()})`,
      `Total Interest Difference: $${Math.abs(b5Calc[0]?.totalInterest - b5Calc[1]?.totalInterest).toLocaleString()}`,
    ];

    const newItem: SavedPaymentItem = {
      id: Date.now().toString(),
      title: "Multi-Loan Offer Comparison",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox5.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox5(updated);
    try {
      localStorage.setItem("saved_pay_box5", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox5(true);
    setTimeout(() => setJustSavedBox5(false), 2000);
  };

  const handleDeleteSavedBox5 = (id: string) => {
    const updated = savedBox5.filter((item) => item.id !== id);
    setSavedBox5(updated);
    try {
      localStorage.setItem("saved_pay_box5", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox5 = () => {
    setSavedBox5([]);
    try {
      localStorage.removeItem("saved_pay_box5");
    } catch (e) {}
  };

  // Box 6 Calculations (Extra Principal Accelerator)
  const b6Calc = useMemo(() => {
    const base = calculateFixedTermPayment({
      loanAmount: parseFloat(b1LoanAmount) || 200000,
      termYears: parseFloat(b1TermYears) || 15,
      termMonths: 0,
      interestRate: parseFloat(b1InterestRate) || 6.0,
      frequency: "monthly",
      upfrontFees: 0,
      extraMonthlyPayment: 0,
      extraAnnualPayment: 0,
      oneTimeLumpSum: 0,
      oneTimeLumpSumMonth: 1,
    });

    const boosted = calculateFixedTermPayment({
      loanAmount: parseFloat(b1LoanAmount) || 200000,
      termYears: parseFloat(b1TermYears) || 15,
      termMonths: 0,
      interestRate: parseFloat(b1InterestRate) || 6.0,
      frequency: "monthly",
      upfrontFees: 0,
      extraMonthlyPayment: b6ExtraMonthlyBoost,
      extraAnnualPayment: 0,
      oneTimeLumpSum: 0,
      oneTimeLumpSumMonth: 1,
    });

    return {
      interestSaved: Math.max(0, base.totalInterestPaid - boosted.totalInterestPaid),
      monthsSaved: Math.max(0, base.totalPaymentsCount - boosted.totalPaymentsCount),
      newMonthlyPayment: boosted.paymentPerPeriod + b6ExtraMonthlyBoost,
    };
  }, [b1LoanAmount, b1TermYears, b1InterestRate, b6ExtraMonthlyBoost]);

  const handleSaveBox6 = () => {
    const inputsStr = `Extra Principal: +$${b6ExtraMonthlyBoost}/mo on $${parseFloat(b1LoanAmount).toLocaleString()} loan`;
    const primaryStr = `Interest Saved: $${b6Calc.interestSaved.toLocaleString()} | Payoff Shortened by ${b6Calc.monthsSaved} Months!`;

    const detailsList = [
      `Additional Principal Payment: +$${b6ExtraMonthlyBoost} / month`,
      `Total Interest Saved: $${b6Calc.interestSaved.toLocaleString()}`,
      `Payoff Time Shortened: ${b6Calc.monthsSaved} months (${(b6Calc.monthsSaved / 12).toFixed(1)} years)`,
    ];

    const newItem: SavedPaymentItem = {
      id: Date.now().toString(),
      title: "Extra Principal Acceleration Simulator",
      inputsSummary: inputsStr,
      primaryResult: primaryStr,
      detailsList,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [newItem, ...savedBox6.filter((i) => i.inputsSummary !== inputsStr)].slice(0, 15);
    setSavedBox6(updated);
    try {
      localStorage.setItem("saved_pay_box6", JSON.stringify(updated));
    } catch (e) {}

    setJustSavedBox6(true);
    setTimeout(() => setJustSavedBox6(false), 2000);
  };

  const handleDeleteSavedBox6 = (id: string) => {
    const updated = savedBox6.filter((item) => item.id !== id);
    setSavedBox6(updated);
    try {
      localStorage.setItem("saved_pay_box6", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBox6 = () => {
    setSavedBox6([]);
    try {
      localStorage.removeItem("saved_pay_box6");
    } catch (e) {}
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* =========================================================================
          BOX 1: FIXED TERM LOAN PAYMENT SOLVER (CORE)
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Fixed Term Loan Payment Calculator &amp; Amortization Schedule</span>
          <button
            type="button"
            onClick={handleSaveBox1}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedBox1 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* LEFT INPUTS */}
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Loan Terms &amp; Interest Settings
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Loan Amount ($)
                  </label>
                  <input
                    type="number"
                    step={5000}
                    value={b1LoanAmount}
                    onChange={(e) => setB1LoanAmount(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Interest Rate (% / yr)
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    value={b1InterestRate}
                    onChange={(e) => setB1InterestRate(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Loan Term (Years)
                  </label>
                  <input
                    type="number"
                    step={1}
                    value={b1TermYears}
                    onChange={(e) => setB1TermYears(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">
                    Payment Frequency
                  </label>
                  <select
                    value={b1Frequency}
                    onChange={(e) => setB1Frequency(e.target.value as any)}
                    className={select3DClass}
                  >
                    <option value="monthly">Monthly (12/yr)</option>
                    <option value="biweekly">Bi-Weekly (26/yr)</option>
                    <option value="accelerated_biweekly">Accelerated Bi-Weekly (13 full payments/yr)</option>
                    <option value="weekly">Weekly (52/yr)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-extrabold uppercase text-slate-700 dark:text-slate-300 block">
                  Optional Prepayment Acceleration ($)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block">Extra Monthly ($)</label>
                    <input
                      type="number"
                      step={25}
                      value={b1ExtraMonthly}
                      onChange={(e) => setB1ExtraMonthly(e.target.value)}
                      className={input3DClass}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block">Extra Annual ($)</label>
                    <input
                      type="number"
                      step={500}
                      value={b1ExtraAnnual}
                      onChange={(e) => setB1ExtraAnnual(e.target.value)}
                      className={input3DClass}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT HERO & SUMMARY */}
            <div className="lg:col-span-6 space-y-3">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      Monthly Payment
                    </span>
                    <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                      ${b1Calc.paymentPerPeriod.toLocaleString()} <span className="text-xs font-medium text-slate-400">/ month</span>
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Total Payments</span>
                    <span className="px-2 py-0.5 rounded-lg text-xs font-extrabold bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 inline-block font-sans tabular-nums">
                      {b1Calc.totalPaymentsCount} Installments
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold font-sans tabular-nums">
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Total Interest Paid</span>
                    <span className="text-amber-600 font-extrabold text-sm">
                      ${b1Calc.totalInterestPaid.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-normal">({b1Calc.interestPercentage}% of total cost)</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] text-slate-400 block uppercase">Total Amount Repaid</span>
                    <span className="text-slate-900 dark:text-slate-100 font-extrabold text-sm">
                      ${b1Calc.totalAmountPaid.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400 block font-normal">(Principal + Interest)</span>
                  </div>
                </div>

                {b1Calc.interestSavedWithExtra > 0 && (
                  <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-900/50 text-xs font-sans tabular-nums flex justify-between items-center">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300">Interest Saved with Extra Payments:</span>
                    <span className="text-sm font-extrabold text-emerald-700 dark:text-emerald-300">
                      ${b1Calc.interestSavedWithExtra.toLocaleString()} ({b1Calc.monthsShavedOff} mos faster)
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* AMORTIZATION SCHEDULE TABLE */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
            <div className="p-2.5 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Amortization Schedule
                </span>
                <div className="flex items-center bg-white dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-slate-700 p-0.5 text-[11px] font-bold">
                  <button
                    type="button"
                    onClick={() => setB1ScheduleView("annual")}
                    className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                      b1ScheduleView === "annual"
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    Annual View
                  </button>
                  <button
                    type="button"
                    onClick={() => setB1ScheduleView("monthly")}
                    className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                      b1ScheduleView === "monthly"
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    Monthly View
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleExportBox1CSV}
                className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-[11px] font-bold flex items-center gap-1 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer border border-slate-300 dark:border-slate-700 transition-colors"
              >
                <Download className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                <span>Export Schedule (CSV)</span>
              </button>
            </div>

            <div className="overflow-x-auto text-xs max-h-72 overflow-y-auto">
              <table className="w-full text-center border-collapse font-sans tabular-nums">
                <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800/90 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-700 backdrop-blur-xs">
                  <tr>
                    <th className="p-2 text-left">{b1ScheduleView === "annual" ? "Year" : "Period #"}</th>
                    <th className="p-2 text-right">Interest ($)</th>
                    <th className="p-2 text-right">Principal ($)</th>
                    <th className="p-2 text-right">Total Interest to Date ($)</th>
                    <th className="p-2 text-right">Ending Balance ($)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {(b1ScheduleView === "annual" ? b1Calc.annualSchedule : b1Calc.monthlySchedule).map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-1.5 text-left font-bold text-slate-700 dark:text-slate-300">
                        {b1ScheduleView === "annual" ? `Year ${row.period}` : `Month ${row.period}`}
                      </td>
                      <td className="p-1.5 text-right font-medium text-amber-600">${row.interest.toLocaleString()}</td>
                      <td className="p-1.5 text-right font-medium text-blue-600 dark:text-blue-400">${row.principal.toLocaleString()}</td>
                      <td className="p-1.5 text-right font-medium text-slate-600 dark:text-slate-400">${row.totalInterestToDate.toLocaleString()}</td>
                      <td className="p-1.5 text-right font-bold text-slate-900 dark:text-slate-100">${row.endingBalance.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 1 */}
          {savedBox1.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Payment Calculations ({savedBox1.length})</span>
                </span>
                <button
                  type="button"
                  onClick={handleClearAllSavedBox1}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedBox1.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSavedBox1(item.id)}
                        className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Inputs: </span>
                      {item.inputsSummary}
                    </div>
                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs font-sans tabular-nums">
                      {item.detailsList.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60 text-slate-800 dark:text-slate-200">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          BOX 2: FIXED PAYMENT DURATION SOLVER
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Fixed Payment Duration Solver (How Long to Pay Off)</span>
          <button
            type="button"
            onClick={handleSaveBox2}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedBox2 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Loan Balance &amp; Payment Amount
              </span>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Loan Amount ($)</label>
                  <input
                    type="number"
                    step={5000}
                    value={b2LoanAmount}
                    onChange={(e) => setB2LoanAmount(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Monthly Pay ($)</label>
                  <input
                    type="number"
                    step={50}
                    value={b2MonthlyPayment}
                    onChange={(e) => setB2MonthlyPayment(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Rate (% / yr)</label>
                  <input
                    type="number"
                    step={0.1}
                    value={b2InterestRate}
                    onChange={(e) => setB2InterestRate(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              {b2Calc.isInterestTrap ? (
                <div className="p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/50 rounded-xl text-xs text-red-900 dark:text-red-200 space-y-1">
                  <div className="font-extrabold flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span>Interest Trap Warning</span>
                  </div>
                  <p>
                    Your monthly payment of ${b2MonthlyPayment} is less than the monthly interest charge of ${b2Calc.minPaymentToCoverInterest}. The loan will never pay off unless the payment is increased.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                        Total Time to Pay Off
                      </span>
                      <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-sans tabular-nums">
                        {b2Calc.payoffYears.toFixed(1)} Years
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block uppercase font-bold">Total Installments</span>
                      <span className="px-2 py-0.5 rounded-lg text-xs font-extrabold bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 inline-block font-sans tabular-nums">
                        {b2Calc.payoffMonths} Months
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-bold font-sans tabular-nums">
                    <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-[10px] text-slate-400 block uppercase">Total Interest</span>
                      <span className="text-amber-600 font-extrabold">${b2Calc.totalInterestPaid.toLocaleString()}</span>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-[10px] text-slate-400 block uppercase">Total Repaid</span>
                      <span className="text-slate-900 dark:text-slate-100 font-extrabold">${b2Calc.totalAmountPaid.toLocaleString()}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 2 */}
          {savedBox2.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Duration Calculations ({savedBox2.length})</span>
                </span>
                <button
                  type="button"
                  onClick={handleClearAllSavedBox2}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedBox2.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSavedBox2(item.id)}
                        className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Inputs: </span>
                      {item.inputsSummary}
                    </div>
                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs font-sans tabular-nums">
                      {item.detailsList.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60 text-slate-800 dark:text-slate-200">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          BOX 3: MAXIMUM AFFORDABLE LOAN AMOUNT SOLVER
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Maximum Affordable Loan Amount (Borrowing Power Solver)</span>
          <button
            type="button"
            onClick={handleSaveBox3}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedBox3 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Monthly Budget &amp; Target Term
              </span>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Monthly Budget ($)</label>
                  <input
                    type="number"
                    step={50}
                    value={b3TargetPayment}
                    onChange={(e) => setB3TargetPayment(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Term (Years)</label>
                  <input
                    type="number"
                    step={1}
                    value={b3TermYears}
                    onChange={(e) => setB3TermYears(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Rate (% / yr)</label>
                  <input
                    type="number"
                    step={0.1}
                    value={b3InterestRate}
                    onChange={(e) => setB3InterestRate(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Maximum Borrowable Loan
                  </span>
                  <span className="text-2xl font-extrabold text-emerald-600 font-sans tabular-nums">
                    ${b3Calc.maxBorrowableLoanAmount.toLocaleString()}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Total Repayment</span>
                  <span className="px-2 py-0.5 rounded-lg text-xs font-extrabold bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 inline-block font-sans tabular-nums">
                    ${b3Calc.totalAmountPaid.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-xs font-sans tabular-nums flex justify-between items-center">
                <span>Total Interest Over Term:</span>
                <span className="font-bold text-amber-600">${b3Calc.totalInterestPaid.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 3 */}
          {savedBox3.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Affordability Calculations ({savedBox3.length})</span>
                </span>
                <button
                  type="button"
                  onClick={handleClearAllSavedBox3}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedBox3.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSavedBox3(item.id)}
                        className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Inputs: </span>
                      {item.inputsSummary}
                    </div>
                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs font-sans tabular-nums">
                      {item.detailsList.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60 text-slate-800 dark:text-slate-200">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          BOX 4: BI-WEEKLY PAYMENT ACCELERATION COMPARATOR
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Bi-Weekly vs. Monthly Payment Acceleration Engine</span>
          <button
            type="button"
            onClick={handleSaveBox4}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedBox4 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Loan Parameters
              </span>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Loan ($)</label>
                  <input
                    type="number"
                    step={10000}
                    value={b4LoanAmount}
                    onChange={(e) => setB4LoanAmount(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Term (Yrs)</label>
                  <input
                    type="number"
                    step={1}
                    value={b4TermYears}
                    onChange={(e) => setB4TermYears(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Rate (%)</label>
                  <input
                    type="number"
                    step={0.1}
                    value={b4InterestRate}
                    onChange={(e) => setB4InterestRate(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Interest Saved with Bi-Weekly Payments
                  </span>
                  <span className="text-2xl font-extrabold text-emerald-600 font-sans tabular-nums">
                    ${b4Calc.interestSaved.toLocaleString()}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Time Shaved Off</span>
                  <span className="px-2 py-0.5 rounded-lg text-xs font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 inline-block font-sans tabular-nums">
                    {b4Calc.yearsShaved} Years Faster!
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold font-sans tabular-nums">
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">Monthly Plan</span>
                  <div>${b4Calc.monthlyPayment.toLocaleString()} / mo</div>
                  <div className="text-slate-500 font-normal">Interest: ${b4Calc.monthlyTotalInterest.toLocaleString()}</div>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] text-slate-400 block uppercase">Accelerated Bi-Weekly</span>
                  <div className="text-blue-600 dark:text-blue-400">${b4Calc.acceleratedBiWeeklyPayment.toLocaleString()} / 2 wks</div>
                  <div className="text-emerald-600 font-normal">Interest: ${b4Calc.acceleratedTotalInterest.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 4 */}
          {savedBox4.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Bi-Weekly Comparisons ({savedBox4.length})</span>
                </span>
                <button
                  type="button"
                  onClick={handleClearAllSavedBox4}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedBox4.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSavedBox4(item.id)}
                        className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Inputs: </span>
                      {item.inputsSummary}
                    </div>
                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs font-sans tabular-nums">
                      {item.detailsList.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60 text-slate-800 dark:text-slate-200">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          BOX 5: SIDE-BY-SIDE MULTI-LOAN OFFER COMPARATOR
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Side-by-Side Multi-Loan Offer Comparison Engine (Loan A vs. Loan B)</span>
          <button
            type="button"
            onClick={handleSaveBox5}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedBox5 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* OFFER A */}
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-2.5 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200 dark:border-slate-800">
                Loan Offer A (e.g. 30-Yr @ 6.5%)
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Loan Amount ($)</label>
                  <input
                    type="number"
                    step={10000}
                    value={b5L1Amount}
                    onChange={(e) => setB5L1Amount(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Term (Years)</label>
                  <input
                    type="number"
                    step={1}
                    value={b5L1Years}
                    onChange={(e) => setB5L1Years(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Rate (%)</label>
                  <input
                    type="number"
                    step={0.1}
                    value={b5L1Rate}
                    onChange={(e) => setB5L1Rate(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Points/Fees ($)</label>
                  <input
                    type="number"
                    step={500}
                    value={b5L1Fees}
                    onChange={(e) => setB5L1Fees(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>
            </div>

            {/* OFFER B */}
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-2.5 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400 block pb-1 border-b border-slate-200 dark:border-slate-800">
                Loan Offer B (e.g. 15-Yr @ 5.75%)
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Loan Amount ($)</label>
                  <input
                    type="number"
                    step={10000}
                    value={b5L2Amount}
                    onChange={(e) => setB5L2Amount(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Term (Years)</label>
                  <input
                    type="number"
                    step={1}
                    value={b5L2Years}
                    onChange={(e) => setB5L2Years(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Rate (%)</label>
                  <input
                    type="number"
                    step={0.1}
                    value={b5L2Rate}
                    onChange={(e) => setB5L2Rate(e.target.value)}
                    className={input3DClass}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block">Points/Fees ($)</label>
                  <input
                    type="number"
                    step={500}
                    value={b5L2Fees}
                    onChange={(e) => setB5L2Fees(e.target.value)}
                    className={input3DClass}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* COMPARISON RESULTS TABLE */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
            <table className="w-full text-center border-collapse font-sans tabular-nums">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-2 text-left">Loan Offer</th>
                  <th className="p-2">Monthly Payment ($)</th>
                  <th className="p-2">Total Interest ($)</th>
                  <th className="p-2">Total Cost ($)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {b5Calc.map((res, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-2 text-left font-bold text-slate-800 dark:text-slate-200">{res.name}</td>
                    <td className="p-2 font-extrabold text-blue-600 dark:text-blue-400">${res.monthlyPayment.toLocaleString()}</td>
                    <td className="p-2 font-medium text-amber-600">${res.totalInterest.toLocaleString()}</td>
                    <td className="p-2 font-extrabold text-slate-900 dark:text-slate-100">${res.totalCost.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 5 */}
          {savedBox5.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Loan Comparisons ({savedBox5.length})</span>
                </span>
                <button
                  type="button"
                  onClick={handleClearAllSavedBox5}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedBox5.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSavedBox5(item.id)}
                        className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Inputs: </span>
                      {item.inputsSummary}
                    </div>
                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs font-sans tabular-nums">
                      {item.detailsList.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60 text-slate-800 dark:text-slate-200">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          BOX 6: EXTRA PRINCIPAL PAYOFF ACCELERATOR SLIDER
          ========================================================================= */}
      <div className={outerBox3DClass}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Extra Principal Payoff Accelerator Slider</span>
          <button
            type="button"
            onClick={handleSaveBox6}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedBox6 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-3 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block pb-1 border-b border-slate-200/80 dark:border-slate-800">
                Adjust Extra Monthly Principal
              </span>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span>Additional Principal Payment:</span>
                  <span className="text-blue-600 font-sans tabular-nums">+${b6ExtraMonthlyBoost} / month</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1000}
                  step={25}
                  value={b6ExtraMonthlyBoost}
                  onChange={(e) => setB6ExtraMonthlyBoost(parseFloat(e.target.value) || 0)}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-sans">
                  <span>+$0</span>
                  <span>+$500</span>
                  <span>+$1,000 / mo</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Interest Saved
                  </span>
                  <span className="text-2xl font-extrabold text-emerald-600 font-sans tabular-nums">
                    ${b6Calc.interestSaved.toLocaleString()}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Payoff Faster By</span>
                  <span className="px-2 py-0.5 rounded-lg text-xs font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 inline-block font-sans tabular-nums">
                    {b6Calc.monthsSaved} Months Faster
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Every extra dollar applied directly to principal bypasses future compound interest calculations, accelerating your loan payoff date dramatically.
              </p>
            </div>
          </div>

          {/* SAVED CALCULATIONS INSIDE BOX 6 */}
          {savedBox6.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-xs space-y-2 mt-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Saved Accelerator Simulators ({savedBox6.length})</span>
                </span>
                <button
                  type="button"
                  onClick={handleClearAllSavedBox6}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {savedBox6.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSavedBox6(item.id)}
                        className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Inputs: </span>
                      {item.inputsSummary}
                    </div>
                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs font-sans tabular-nums">
                      {item.detailsList.map((line, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60 text-slate-800 dark:text-slate-200">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Educational Guide & 12 FAQs */}
      <PaymentContent />
    </div>
  );
}

export default PaymentCalculator;
