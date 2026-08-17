"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Bookmark, Trash2, ChevronDown, ChevronUp, Check, Plus } from "lucide-react";
import {
  calculateStandardAPR,
  calculateMortgageAPR,
  calculateCreditCardAPR,
  calculateReverseAPR,
  calculateLoanComparison,
  calculatePrepaymentAPR,
} from "@/app/calculators/apr-calculator/calculator";
import {
  PaybackFrequency,
  LoanOfferItem,
  SavedAPRItem,
} from "@/app/calculators/apr-calculator/types";

export function APRCalculator() {
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");

  // =========================================================================
  // BOX 1: STANDARD & FIXED LOAN APR CALCULATOR STATES
  // =========================================================================
  const [loanAmount, setLoanAmount] = useState<string>("100000");
  const [interestRate, setInterestRate] = useState<string>("6.0");
  const [loanTermYears, setLoanTermYears] = useState<string>("10");
  const [loanTermMonths, setLoanTermMonths] = useState<string>("0");
  const [upfrontFees, setUpfrontFees] = useState<string>("2500");
  const [payback, setPayback] = useState<PaybackFrequency>("monthly");

  const [savedBox1Items, setSavedBox1Items] = useState<SavedAPRItem[]>([]);
  const [justSavedBox1, setJustSavedBox1] = useState<boolean>(false);
  const [showHistoryBox1, setShowHistoryBox1] = useState<boolean>(false);

  const standardCalc = useMemo(() => {
    return calculateStandardAPR({
      loanAmount: parseFloat(loanAmount) || 0,
      interestRate: parseFloat(interestRate) || 0,
      loanTermYears: parseFloat(loanTermYears) || 0,
      loanTermMonths: parseFloat(loanTermMonths) || 0,
      upfrontFees: parseFloat(upfrontFees) || 0,
      compounding: "monthly",
      payback,
      currencySymbol,
    });
  }, [loanAmount, interestRate, loanTermYears, loanTermMonths, upfrontFees, payback, currencySymbol]);

  const handleSaveBox1 = () => {
    const newItem: SavedAPRItem = {
      id: Date.now().toString(),
      title: "Standard Loan APR Analysis",
      inputsSummary: `Loan: ${currencySymbol}${parseFloat(loanAmount).toLocaleString()} | Rate: ${interestRate}% | Term: ${loanTermYears}y ${loanTermMonths}m | Fees: ${currencySymbol}${parseFloat(upfrontFees).toLocaleString()}`,
      primaryResult: `Real APR: ${standardCalc.realAPR}% | Payment: ${currencySymbol}${standardCalc.periodicPayment.toLocaleString()}/mo`,
      detailsList: [
        `Nominal Interest Rate: ${standardCalc.nominalRate}%`,
        `APR vs Nominal Gap: +${standardCalc.aprGap}%`,
        `Total Interest: ${currencySymbol}${standardCalc.totalInterest.toLocaleString()}`,
        `Total Upfront Fees: ${currencySymbol}${standardCalc.totalFees.toLocaleString()}`,
        `Total Cost of Loan: ${currencySymbol}${standardCalc.totalPayments.toLocaleString()}`,
        `Amount Financed: ${currencySymbol}${standardCalc.amountFinanced.toLocaleString()}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox1Items];
    setSavedBox1Items(updated);
    try {
      localStorage.setItem("saved_apr_box1", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox1(true);
    setTimeout(() => setJustSavedBox1(false), 2000);
  };

  // SVG Donut Chart Breakdown
  const svgDonut = useMemo(() => {
    const principal = parseFloat(loanAmount) || 1;
    const interest = standardCalc.totalInterest || 0;
    const fees = standardCalc.totalFees || 0;
    const total = principal + interest + fees;

    if (total <= 0) return null;

    const pPct = (principal / total) * 100;
    const iPct = (interest / total) * 100;
    const fPct = (fees / total) * 100;

    // SVG donut slices
    const r = 40;
    const cx = 50;
    const cy = 50;
    const circ = 2 * Math.PI * r;

    const pStroke = (pPct / 100) * circ;
    const iStroke = (iPct / 100) * circ;
    const fStroke = (fPct / 100) * circ;

    return (
      <div className="flex items-center justify-center gap-4">
        <svg viewBox="0 0 100 100" className="w-24 h-24 transform -rotate-90">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#2563eb" strokeWidth="16" strokeDasharray={`${pStroke} ${circ}`} strokeDashoffset={0} />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f59e0b" strokeWidth="16" strokeDasharray={`${iStroke} ${circ}`} strokeDashoffset={-pStroke} />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#ef4444" strokeWidth="16" strokeDasharray={`${fStroke} ${circ}`} strokeDashoffset={-(pStroke + iStroke)} />
        </svg>
        <div className="text-[11px] space-y-1 font-bold">
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span> <span>Principal: {pPct.toFixed(1)}%</span></div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> <span>Interest: {iPct.toFixed(1)}%</span></div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span> <span>Fees: {fPct.toFixed(1)}%</span></div>
        </div>
      </div>
    );
  }, [loanAmount, standardCalc.totalInterest, standardCalc.totalFees]);

  // =========================================================================
  // BOX 2: MORTGAGE SPECIFIC APR & POINTS STATES
  // =========================================================================
  const [houseValue, setHouseValue] = useState<string>("350000");
  const [downPayment, setDownPayment] = useState<string>("70000");
  const [mortgageTermYears, setMortgageTermYears] = useState<string>("30");
  const [mortgageRate, setMortgageRate] = useState<string>("6.2");
  const [mortgageFees, setMortgageFees] = useState<string>("3500");
  const [pointsPct, setPointsPct] = useState<string>("0.5");
  const [pmiPerYear, setPmiPerYear] = useState<string>("0");

  const [savedBox2Items, setSavedBox2Items] = useState<SavedAPRItem[]>([]);
  const [justSavedBox2, setJustSavedBox2] = useState<boolean>(false);
  const [showHistoryBox2, setShowHistoryBox2] = useState<boolean>(false);

  const mortgageCalc = useMemo(() => {
    return calculateMortgageAPR({
      houseValue: parseFloat(houseValue) || 0,
      downPayment: parseFloat(downPayment) || 0,
      loanTermYears: parseFloat(mortgageTermYears) || 30,
      interestRate: parseFloat(mortgageRate) || 0,
      loanFees: parseFloat(mortgageFees) || 0,
      pointsPct: parseFloat(pointsPct) || 0,
      pmiPerYear: parseFloat(pmiPerYear) || 0,
    });
  }, [houseValue, downPayment, mortgageTermYears, mortgageRate, mortgageFees, pointsPct, pmiPerYear]);

  const handleSaveBox2 = () => {
    const newItem: SavedAPRItem = {
      id: Date.now().toString(),
      title: "Mortgage APR & Points Analysis",
      inputsSummary: `House: ${currencySymbol}${parseFloat(houseValue).toLocaleString()} | Down: ${currencySymbol}${parseFloat(downPayment).toLocaleString()} | Rate: ${mortgageRate}% | Fees: ${currencySymbol}${mortgageCalc.totalUpfrontFees.toLocaleString()}`,
      primaryResult: `Mortgage APR: ${mortgageCalc.realAPR}% | Payment: ${currencySymbol}${mortgageCalc.monthlyPayment.toLocaleString()}/mo`,
      detailsList: [
        `Loan Amount: ${currencySymbol}${mortgageCalc.loanAmount.toLocaleString()}`,
        `Total Upfront Fees & Points: ${currencySymbol}${mortgageCalc.totalUpfrontFees.toLocaleString()}`,
        `Total Interest Paid: ${currencySymbol}${mortgageCalc.totalInterest.toLocaleString()}`,
        `Total Payments over 30 yrs: ${currencySymbol}${mortgageCalc.totalPayments.toLocaleString()}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox2Items];
    setSavedBox2Items(updated);
    try {
      localStorage.setItem("saved_apr_box2", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox2(true);
    setTimeout(() => setJustSavedBox2(false), 2000);
  };

  // =========================================================================
  // BOX 3: CREDIT CARD APR PAYOFF STATES
  // =========================================================================
  const [ccBalance, setCcBalance] = useState<string>("5000");
  const [ccApr, setCcApr] = useState<string>("21.99");
  const [ccMinPct, setCcMinPct] = useState<string>("2.5");
  const [ccExtraPay, setCcExtraPay] = useState<string>("50");

  const [savedBox3Items, setSavedBox3Items] = useState<SavedAPRItem[]>([]);
  const [justSavedBox3, setJustSavedBox3] = useState<boolean>(false);
  const [showHistoryBox3, setShowHistoryBox3] = useState<boolean>(false);

  const ccCalc = useMemo(() => {
    return calculateCreditCardAPR({
      balance: parseFloat(ccBalance) || 0,
      apr: parseFloat(ccApr) || 0,
      minPaymentPct: parseFloat(ccMinPct) || 2.5,
      minPaymentFloor: 25,
      extraMonthlyPayment: parseFloat(ccExtraPay) || 0,
    });
  }, [ccBalance, ccApr, ccMinPct, ccExtraPay]);

  const handleSaveBox3 = () => {
    const newItem: SavedAPRItem = {
      id: Date.now().toString(),
      title: "Credit Card APR Payoff",
      inputsSummary: `Balance: ${currencySymbol}${parseFloat(ccBalance).toLocaleString()} | APR: ${ccApr}% | Extra Pay: ${currencySymbol}${parseFloat(ccExtraPay).toLocaleString()}/mo`,
      primaryResult: `Payoff Time: ${ccCalc.monthsToPayoff} Months (${ccCalc.yearsToPayoff} Yrs)`,
      detailsList: [
        `Total Interest Paid: ${currencySymbol}${ccCalc.totalInterestPaid.toLocaleString()}`,
        `Total Amount Paid: ${currencySymbol}${ccCalc.totalAmountPaid.toLocaleString()}`,
        `Interest Saved with Extra Payment: ${currencySymbol}${ccCalc.interestSaved.toLocaleString()}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox3Items];
    setSavedBox3Items(updated);
    try {
      localStorage.setItem("saved_apr_box3", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox3(true);
    setTimeout(() => setJustSavedBox3(false), 2000);
  };

  // =========================================================================
  // BOX 4: REVERSE TARGET APR SOLVER STATES
  // =========================================================================
  const [revPayment, setRevPayment] = useState<string>("500");
  const [revTermYears, setRevTermYears] = useState<string>("5");
  const [revFees, setRevFees] = useState<string>("1000");
  const [revTargetAPR, setRevTargetAPR] = useState<string>("7.5");

  const [savedBox4Items, setSavedBox4Items] = useState<SavedAPRItem[]>([]);
  const [justSavedBox4, setJustSavedBox4] = useState<boolean>(false);
  const [showHistoryBox4, setShowHistoryBox4] = useState<boolean>(false);

  const reverseCalc = useMemo(() => {
    return calculateReverseAPR({
      desiredMonthlyPayment: parseFloat(revPayment) || 0,
      loanTermYears: parseFloat(revTermYears) || 5,
      upfrontFees: parseFloat(revFees) || 0,
      targetAPR: parseFloat(revTargetAPR) || 0,
    });
  }, [revPayment, revTermYears, revFees, revTargetAPR]);

  const handleSaveBox4 = () => {
    const newItem: SavedAPRItem = {
      id: Date.now().toString(),
      title: "Reverse Target APR Capacity",
      inputsSummary: `Target Payment: ${currencySymbol}${parseFloat(revPayment).toLocaleString()}/mo | Term: ${revTermYears}y | Target APR: ${revTargetAPR}%`,
      primaryResult: `Max Borrowing Capacity: ${currencySymbol}${reverseCalc.maxBorrowingCapacity.toLocaleString()}`,
      detailsList: [
        `Base Interest Rate: ${reverseCalc.baseInterestRate}%`,
        `Total Finance Charges: ${currencySymbol}${reverseCalc.totalFinanceCharges.toLocaleString()}`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox4Items];
    setSavedBox4Items(updated);
    try {
      localStorage.setItem("saved_apr_box4", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox4(true);
    setTimeout(() => setJustSavedBox4(false), 2000);
  };

  // =========================================================================
  // BOX 5: SIDE-BY-SIDE 3-LOAN APR COMPARISON MATRIX STATES
  // =========================================================================
  const [offers, setOffers] = useState<LoanOfferItem[]>([
    { id: "1", name: "Offer A (Low Rate + Fees)", loanAmount: 100000, nominalRate: 5.5, loanTermYears: 10, upfrontFees: 3000 },
    { id: "2", name: "Offer B (Standard Rate)", loanAmount: 100000, nominalRate: 6.0, loanTermYears: 10, upfrontFees: 1000 },
    { id: "3", name: "Offer C (Zero Fees)", loanAmount: 100000, nominalRate: 6.5, loanTermYears: 10, upfrontFees: 0 },
  ]);

  const [savedBox5Items, setSavedBox5Items] = useState<SavedAPRItem[]>([]);
  const [justSavedBox5, setJustSavedBox5] = useState<boolean>(false);
  const [showHistoryBox5, setShowHistoryBox5] = useState<boolean>(false);

  const offersCalc = useMemo(() => {
    return calculateLoanComparison(offers);
  }, [offers]);

  const updateOffer = (id: string, field: keyof LoanOfferItem, val: any) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, [field]: val } : o))
    );
  };

  const handleSaveBox5 = () => {
    const best = offersCalc.find((o) => o.isBestValue);
    const newItem: SavedAPRItem = {
      id: Date.now().toString(),
      title: "Side-by-Side Loan APR Comparison",
      inputsSummary: `Compared ${offers.length} Loan Offers for ${currencySymbol}${offers[0]?.loanAmount.toLocaleString() || 0}`,
      primaryResult: best ? `Best Value: ${best.name} (${best.realAPR}% APR)` : "Comparison Complete",
      detailsList: offersCalc.map(
        (o) => `${o.name}: ${o.realAPR}% APR | ${currencySymbol}${o.monthlyPayment}/mo | Total Cost: ${currencySymbol}${o.totalPayments.toLocaleString()}`
      ),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox5Items];
    setSavedBox5Items(updated);
    try {
      localStorage.setItem("saved_apr_box5", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox5(true);
    setTimeout(() => setJustSavedBox5(false), 2000);
  };

  // =========================================================================
  // BOX 6: PREPAYMENT & EXTRA PAYMENTS APR SIMULATOR STATES
  // =========================================================================
  const [prepAmount, setPrepAmount] = useState<string>("25000");
  const [prepRate, setPrepRate] = useState<string>("7.0");
  const [prepTermYears, setPrepTermYears] = useState<string>("5");
  const [prepFees, setPrepFees] = useState<string>("500");
  const [prepExtraPay, setPrepExtraPay] = useState<string>("100");

  const [savedBox6Items, setSavedBox6Items] = useState<SavedAPRItem[]>([]);
  const [justSavedBox6, setJustSavedBox6] = useState<boolean>(false);
  const [showHistoryBox6, setShowHistoryBox6] = useState<boolean>(false);

  const prepaymentCalc = useMemo(() => {
    return calculatePrepaymentAPR({
      loanAmount: parseFloat(prepAmount) || 0,
      nominalRate: parseFloat(prepRate) || 0,
      loanTermYears: parseFloat(prepTermYears) || 0,
      upfrontFees: parseFloat(prepFees) || 0,
      extraMonthlyPayment: parseFloat(prepExtraPay) || 0,
    });
  }, [prepAmount, prepRate, prepTermYears, prepFees, prepExtraPay]);

  const handleSaveBox6 = () => {
    const newItem: SavedAPRItem = {
      id: Date.now().toString(),
      title: "Prepayment & Extra Payment APR Impact",
      inputsSummary: `Loan: ${currencySymbol}${parseFloat(prepAmount).toLocaleString()} | Extra Payment: ${currencySymbol}${parseFloat(prepExtraPay).toLocaleString()}/mo`,
      primaryResult: `Interest Saved: ${currencySymbol}${prepaymentCalc.interestSaved.toLocaleString()} | ${prepaymentCalc.monthsSaved} Months Saved`,
      detailsList: [
        `Original Term: ${prepaymentCalc.originalMonths} Months → New Term: ${prepaymentCalc.newMonths} Months`,
        `Realized APR: ${prepaymentCalc.realizedAPR}%`,
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newItem, ...savedBox6Items];
    setSavedBox6Items(updated);
    try {
      localStorage.setItem("saved_apr_box6", JSON.stringify(updated));
    } catch (e) {}
    setJustSavedBox6(true);
    setTimeout(() => setJustSavedBox6(false), 2000);
  };

  // Initial load from local storage
  useEffect(() => {
    try {
      const b1 = localStorage.getItem("saved_apr_box1");
      if (b1) setSavedBox1Items(JSON.parse(b1));
      const b2 = localStorage.getItem("saved_apr_box2");
      if (b2) setSavedBox2Items(JSON.parse(b2));
      const b3 = localStorage.getItem("saved_apr_box3");
      if (b3) setSavedBox3Items(JSON.parse(b3));
      const b4 = localStorage.getItem("saved_apr_box4");
      if (b4) setSavedBox4Items(JSON.parse(b4));
      const b5 = localStorage.getItem("saved_apr_box5");
      if (b5) setSavedBox5Items(JSON.parse(b5));
      const b6 = localStorage.getItem("saved_apr_box6");
      if (b6) setSavedBox6Items(JSON.parse(b6));
    } catch (e) {}
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* Simple Currency Selector Header */}
      <div className="flex items-center justify-end gap-2 text-xs font-bold">
        <label htmlFor="apr-currency" className="text-slate-500 font-medium">Currency:</label>
        <select
          id="apr-currency"
          value={currencySymbol}
          onChange={(e) => setCurrencySymbol(e.target.value)}
          className="h-8 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans font-bold cursor-pointer"
        >
          <option value="$">USD ($)</option>
          <option value="€">EUR (€)</option>
          <option value="£">GBP (£)</option>
          <option value="₹">INR (₹)</option>
          <option value="¥">JPY (¥)</option>
        </select>
      </div>

      {/* ========================================================================= */}
      {/* 1. STANDARD & FIXED LOAN APR CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Standard & Fixed Loan APR Calculator</span>
          <button
            type="button"
            onClick={handleSaveBox1}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox1 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs text-xs">
              <span className="font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">Loan & Financing Details</span>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Loan Amount ({currencySymbol})</label>
                  <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Upfront Fees & Charges ({currencySymbol})</label>
                  <input type="number" value={upfrontFees} onChange={(e) => setUpfrontFees(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nominal Interest Rate %</label>
                  <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Term (Years)</label>
                  <input type="number" value={loanTermYears} onChange={(e) => setLoanTermYears(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Term (Months)</label>
                  <input type="number" value={loanTermMonths} onChange={(e) => setLoanTermMonths(e.target.value)} className="w-full h-8 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-blue-50/60 dark:bg-slate-900/80 border border-blue-200 dark:border-blue-900/50 rounded-2xl p-5 shadow-xs space-y-4 text-center">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                  Annual Percentage Rate Summary
                </span>

                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-blue-100 dark:border-blue-900/40">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Real APR</span>
                  <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums">
                    {standardCalc.realAPR}%
                  </span>
                  <span className="text-xs font-semibold text-amber-600 block mt-0.5">(+{standardCalc.aprGap}% over {standardCalc.nominalRate}% nominal rate)</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-sans tabular-nums">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Monthly Payment</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{currencySymbol}{standardCalc.periodicPayment.toLocaleString()}</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-sans tabular-nums">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Total Interest</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{currencySymbol}{standardCalc.totalInterest.toLocaleString()}</span>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-sans tabular-nums">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Total Cost</span>
                    <span className="font-extrabold text-blue-600">{currencySymbol}{standardCalc.totalPayments.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-2">
                  {svgDonut}
                </div>
              </div>
            </div>
          </div>

          {/* Derivation Box */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl text-xs space-y-2 font-mono">
            <span className="font-bold text-blue-600 dark:text-blue-400 block font-sans">Truth in Lending Act (TILA) Mathematical Formula:</span>
            <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1 text-slate-700 dark:text-slate-300">
              <div>{"Amount Financed = Loan Amount - Upfront Fees = " + currencySymbol + parseFloat(loanAmount).toLocaleString() + " - " + currencySymbol + parseFloat(upfrontFees).toLocaleString() + " = " + currencySymbol + standardCalc.amountFinanced.toLocaleString()}</div>
              <div>{"Exact APR is solved via Newton-Raphson where: " + currencySymbol + standardCalc.amountFinanced.toLocaleString() + " = Σ (" + currencySymbol + standardCalc.periodicPayment.toLocaleString() + " / (1 + r)^t)"}</div>
            </div>
          </div>

          {/* History Drawer for Box 1 */}
          {savedBox1Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
                onClick={() => setShowHistoryBox1(!showHistoryBox1)}
                className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <span>Saved Calculations ({savedBox1Items.length})</span>
                {showHistoryBox1 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox1 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox1Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1.5 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-normal text-slate-400">{item.timestamp}</span>
                          <button
                            onClick={() => setSavedBox1Items(savedBox1Items.filter((i) => i.id !== item.id))}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                        <strong>Inputs:</strong> {item.inputsSummary}
                      </div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, i) => (
                          <div key={i}>• {d}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MORTGAGE SPECIFIC APR & POINTS CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Mortgage Specific APR & Points Calculator</span>
          <button
            type="button"
            onClick={handleSaveBox2}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox2 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">House Value</label>
                  <input type="number" value={houseValue} onChange={(e) => setHouseValue(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Down Payment</label>
                  <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Term (Years)</label>
                  <input type="number" value={mortgageTermYears} onChange={(e) => setMortgageTermYears(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-1">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Interest Rate %</label>
                  <input type="number" value={mortgageRate} onChange={(e) => setMortgageRate(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Loan Fees</label>
                  <input type="number" value={mortgageFees} onChange={(e) => setMortgageFees(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Points %</label>
                  <input type="number" value={pointsPct} onChange={(e) => setPointsPct(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-5 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Mortgage APR Result</span>

              <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                {mortgageCalc.realAPR}% <span className="text-xs font-semibold text-slate-500">Real APR</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Monthly Payment</span>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200">{currencySymbol}{mortgageCalc.monthlyPayment.toLocaleString()}/mo</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Upfront Fees</span>
                  <span className="font-extrabold text-blue-600">{currencySymbol}{mortgageCalc.totalUpfrontFees.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* History Drawer for Box 2 */}
          {savedBox2Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
                onClick={() => setShowHistoryBox2(!showHistoryBox2)}
                className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <span>Saved Calculations ({savedBox2Items.length})</span>
                {showHistoryBox2 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox2 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox2Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1.5 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-normal text-slate-400">{item.timestamp}</span>
                          <button
                            onClick={() => setSavedBox2Items(savedBox2Items.filter((i) => i.id !== item.id))}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                        <strong>Inputs:</strong> {item.inputsSummary}
                      </div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, i) => (
                          <div key={i}>• {d}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. CREDIT CARD APR PAYOFF CALCULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Credit Card & Revolving Credit APR Payoff</span>
          <button
            type="button"
            onClick={handleSaveBox3}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox3 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Card Balance</label>
                  <input type="number" value={ccBalance} onChange={(e) => setCcBalance(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Purchase APR %</label>
                  <input type="number" value={ccApr} onChange={(e) => setCcApr(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Extra Payment ({currencySymbol}/mo)</label>
                  <input type="number" value={ccExtraPay} onChange={(e) => setCcExtraPay(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-5 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Payoff Timeline</span>

              <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                {ccCalc.monthsToPayoff} Months ({ccCalc.yearsToPayoff} Yrs)
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Interest Paid</span>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200">{currencySymbol}{ccCalc.totalInterestPaid.toLocaleString()}</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Interest Saved</span>
                  <span className="font-extrabold text-emerald-600">{currencySymbol}{ccCalc.interestSaved.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* History Drawer for Box 3 */}
          {savedBox3Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
                onClick={() => setShowHistoryBox3(!showHistoryBox3)}
                className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <span>Saved Calculations ({savedBox3Items.length})</span>
                {showHistoryBox3 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox3 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox3Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1.5 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-normal text-slate-400">{item.timestamp}</span>
                          <button
                            onClick={() => setSavedBox3Items(savedBox3Items.filter((i) => i.id !== item.id))}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                        <strong>Inputs:</strong> {item.inputsSummary}
                      </div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, i) => (
                          <div key={i}>• {d}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. REVERSE TARGET APR SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Reverse Target APR & Borrowing Capacity Solver</span>
          <button
            type="button"
            onClick={handleSaveBox4}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox4 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Monthly Payment</label>
                  <input type="number" value={revPayment} onChange={(e) => setRevPayment(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Loan Term (Years)</label>
                  <input type="number" value={revTermYears} onChange={(e) => setRevTermYears(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Max APR %</label>
                  <input type="number" value={revTargetAPR} onChange={(e) => setRevTargetAPR(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-5 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Max Allowable Loan Amount</span>
              <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-sans tabular-nums mt-1">
                {currencySymbol}{reverseCalc.maxBorrowingCapacity.toLocaleString()}
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Finance Charges</span>
                <span className="font-extrabold text-slate-800 dark:text-slate-200">{currencySymbol}{reverseCalc.totalFinanceCharges.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* History Drawer for Box 4 */}
          {savedBox4Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
                onClick={() => setShowHistoryBox4(!showHistoryBox4)}
                className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <span>Saved Calculations ({savedBox4Items.length})</span>
                {showHistoryBox4 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox4 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox4Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1.5 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-normal text-slate-400">{item.timestamp}</span>
                          <button
                            onClick={() => setSavedBox4Items(savedBox4Items.filter((i) => i.id !== item.id))}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                        <strong>Inputs:</strong> {item.inputsSummary}
                      </div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, i) => (
                          <div key={i}>• {d}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. SIDE-BY-SIDE 3-LOAN APR COMPARISON MATRIX */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Side-by-Side 3-Loan APR Comparison Matrix</span>
          <button
            type="button"
            onClick={handleSaveBox5}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox5 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse font-sans font-bold">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700">
                  <th className="p-3">Loan Offer</th>
                  <th className="p-3">Nominal Rate %</th>
                  <th className="p-3">Upfront Fees</th>
                  <th className="p-3">Real APR %</th>
                  <th className="p-3">Monthly Payment</th>
                  <th className="p-3">Total Cost</th>
                  <th className="p-3">Value Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-mono">
                {offersCalc.map((o, idx) => (
                  <tr key={o.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-sans font-bold text-slate-900 dark:text-slate-100">{o.name}</td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={offers[idx]?.nominalRate || 0}
                        onChange={(e) => updateOffer(o.id, "nominalRate", parseFloat(e.target.value) || 0)}
                        className="w-16 h-7 px-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                      />%
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={offers[idx]?.upfrontFees || 0}
                        onChange={(e) => updateOffer(o.id, "upfrontFees", parseFloat(e.target.value) || 0)}
                        className="w-20 h-7 px-1.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold"
                      />
                    </td>
                    <td className="p-3 text-blue-600 font-extrabold">{o.realAPR}%</td>
                    <td className="p-3">{currencySymbol}{o.monthlyPayment}/mo</td>
                    <td className="p-3">{currencySymbol}{o.totalPayments.toLocaleString()}</td>
                    <td className="p-3 font-sans">
                      {o.isBestValue ? (
                        <span className="px-2 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-extrabold">BEST VALUE</span>
                      ) : (
                        <span className="text-slate-400 text-[10px]">Standard</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* History Drawer for Box 5 */}
          {savedBox5Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
                onClick={() => setShowHistoryBox5(!showHistoryBox5)}
                className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <span>Saved Calculations ({savedBox5Items.length})</span>
                {showHistoryBox5 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox5 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox5Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1.5 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-normal text-slate-400">{item.timestamp}</span>
                          <button
                            onClick={() => setSavedBox5Items(savedBox5Items.filter((i) => i.id !== item.id))}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                        <strong>Inputs:</strong> {item.inputsSummary}
                      </div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, i) => (
                          <div key={i}>• {d}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. PREPAYMENT & EXTRA PAYMENTS APR SIMULATOR */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold text-sm">Prepayment & Extra Payments APR Simulator</span>
          <button
            type="button"
            onClick={handleSaveBox6}
            className="hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-white" />
            <span>{justSavedBox6 ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 space-y-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Loan Amount</label>
                  <input type="number" value={prepAmount} onChange={(e) => setPrepAmount(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Interest Rate %</label>
                  <input type="number" value={prepRate} onChange={(e) => setPrepRate(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Extra Payment ({currencySymbol}/mo)</label>
                  <input type="number" value={prepExtraPay} onChange={(e) => setPrepExtraPay(e.target.value)} className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold" />
                </div>
              </div>
            </div>

            {/* Simple Result Card */}
            <div className="lg:col-span-5 space-y-3 bg-blue-50/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/50 text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400">Prepayment Savings</span>

              <div className="text-2xl font-extrabold text-emerald-600 font-sans tabular-nums mt-1">
                Save {currencySymbol}{prepaymentCalc.interestSaved.toLocaleString()}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Time Saved</span>
                  <span className="font-extrabold text-blue-600">{prepaymentCalc.monthsSaved} Months</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Realized APR</span>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200">{prepaymentCalc.realizedAPR}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* History Drawer for Box 6 */}
          {savedBox6Items.length > 0 && (
            <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
              <button
                onClick={() => setShowHistoryBox6(!showHistoryBox6)}
                className="flex items-center justify-between w-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <span>Saved Calculations ({savedBox6Items.length})</span>
                {showHistoryBox6 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showHistoryBox6 && (
                <div className="mt-2 space-y-2 max-h-56 overflow-y-auto">
                  {savedBox6Items.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1.5 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
                        <span className="text-blue-600 dark:text-blue-400">{item.primaryResult}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-normal text-slate-400">{item.timestamp}</span>
                          <button
                            onClick={() => setSavedBox6Items(savedBox6Items.filter((i) => i.id !== item.id))}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                        <strong>Inputs:</strong> {item.inputsSummary}
                      </div>
                      <div className="text-[11px] space-y-0.5 text-slate-600 dark:text-slate-300 font-mono">
                        {item.detailsList.map((d, i) => (
                          <div key={i}>• {d}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
