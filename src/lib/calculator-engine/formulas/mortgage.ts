/**
 * Pure Mathematical Logic for Advanced Mortgage Calculation & Amortization Schedule.
 */

export interface MortgageFormulaInput {
  homePrice: number;
  downPayment: number;
  interestRate: number;
  loanTermYears: number;
  loanTermUnit?: "years" | "months";
  propertyTaxRate?: number; // annual % e.g. 1.2%
  propertyTaxAnnual?: number; // annual $ e.g. 4800
  homeInsuranceAnnual?: number; // annual $ e.g. 1200
  hoaFeeMonthly?: number; // monthly $
  extraMonthlyPayment?: number; // monthly $ extra principal
  paymentFrequency?: "monthly" | "bi-weekly";
  startDate?: string; // YYYY-MM-DD or date string
}

export interface AmortizationRow {
  month: number;
  date: string;
  payment: number;
  principalPaid: number;
  interestPaid: number;
  totalInterestPaid: number;
  remainingBalance: number;
}

export interface MortgageFormulaResult {
  homePrice: number;
  downPayment: number;
  downPaymentPercent: number;
  loanAmount: number;
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyInsurance: number;
  hoaFeeMonthly: number;
  totalMonthlyPayment: number;
  totalInterestPaid: number;
  totalTaxesAndFeesPaid: number;
  totalPaid: number;
  payoffDate: string;
  payoffMonths: number;
  amortizationSchedule: AmortizationRow[];
}

export function calculateMortgageFormula({
  homePrice,
  downPayment,
  interestRate,
  loanTermYears,
  loanTermUnit = "years",
  propertyTaxRate = 1.2,
  propertyTaxAnnual,
  homeInsuranceAnnual = 1200,
  hoaFeeMonthly = 0,
  extraMonthlyPayment = 0,
  startDate = new Date().toISOString().split("T")[0],
}: MortgageFormulaInput): MortgageFormulaResult {
  const safePrice = Math.max(0, homePrice);
  const safeDown = Math.min(safePrice, Math.max(0, downPayment));
  const loanAmount = Math.max(0, safePrice - safeDown);
  const downPaymentPercent = safePrice > 0 ? (safeDown / safePrice) * 100 : 0;

  const totalMonths = loanTermUnit === "months" ? Math.max(1, loanTermYears) : Math.max(1, loanTermYears * 12);
  const monthlyRate = Math.max(0, interestRate) / 100 / 12;

  let monthlyPrincipalAndInterest = 0;
  if (loanAmount > 0 && totalMonths > 0) {
    if (monthlyRate === 0) {
      monthlyPrincipalAndInterest = loanAmount / totalMonths;
    } else {
      monthlyPrincipalAndInterest =
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }
  }

  const calculatedTaxMonthly =
    propertyTaxAnnual !== undefined
      ? propertyTaxAnnual / 12
      : (safePrice * (propertyTaxRate / 100)) / 12;

  const calculatedInsuranceMonthly = homeInsuranceAnnual / 12;
  const totalMonthlyPayment =
    monthlyPrincipalAndInterest + calculatedTaxMonthly + calculatedInsuranceMonthly + hoaFeeMonthly + extraMonthlyPayment;

  // Build Month-by-Month Amortization Schedule
  const schedule: AmortizationRow[] = [];
  let remainingBalance = loanAmount;
  let accumulatedInterest = 0;
  const startDt = new Date(startDate);
  const validStart = !isNaN(startDt.getTime()) ? startDt : new Date();

  for (let m = 1; m <= totalMonths && remainingBalance > 0.01; m++) {
    const interestForMonth = remainingBalance * monthlyRate;
    const standardPrincipal = monthlyPrincipalAndInterest - interestForMonth;
    const actualPrincipal = Math.min(
      remainingBalance,
      Math.max(0, standardPrincipal + extraMonthlyPayment)
    );

    accumulatedInterest += interestForMonth;
    remainingBalance = Math.max(0, remainingBalance - actualPrincipal);

    const rowDate = new Date(validStart);
    rowDate.setMonth(rowDate.getMonth() + m);
    const dateStr = rowDate.toLocaleDateString("en-US", { year: "numeric", month: "short" });

    schedule.push({
      month: m,
      date: dateStr,
      payment: actualPrincipal + interestForMonth,
      principalPaid: actualPrincipal,
      interestPaid: interestForMonth,
      totalInterestPaid: accumulatedInterest,
      remainingBalance,
    });
  }

  const payoffMonths = schedule.length;
  const finalDate = schedule.length > 0 ? schedule[schedule.length - 1].date : "";

  const totalInterestPaid = accumulatedInterest;
  const totalTaxesAndFeesPaid = (calculatedTaxMonthly + calculatedInsuranceMonthly + hoaFeeMonthly) * payoffMonths;
  const totalPaid = loanAmount + totalInterestPaid + totalTaxesAndFeesPaid;

  return {
    homePrice: safePrice,
    downPayment: safeDown,
    downPaymentPercent,
    loanAmount,
    monthlyPrincipalAndInterest,
    monthlyPropertyTax: calculatedTaxMonthly,
    monthlyInsurance: calculatedInsuranceMonthly,
    hoaFeeMonthly,
    totalMonthlyPayment,
    totalInterestPaid,
    totalTaxesAndFeesPaid,
    totalPaid,
    payoffDate: finalDate,
    payoffMonths,
    amortizationSchedule: schedule,
  };
}
