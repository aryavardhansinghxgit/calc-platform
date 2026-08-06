import { MortgageModuleInput, MortgageModuleOutput } from "./types";
import { PMT } from "@/lib/finance/financial-math";

export function calculateMortgageModule(inputs: MortgageModuleInput): MortgageModuleOutput {
  const {
    homePrice,
    downPayment,
    interestRate,
    loanTermYears,
    propertyTaxRate = 1.2,
    homeInsuranceAnnual = 1200,
    hoaFeeMonthly = 0,
    extraMonthlyPayment = 0,
    startDate = new Date().toISOString().split("T")[0],
  } = inputs;

  const loanAmount = Math.max(0, homePrice - downPayment);
  const totalMonths = Math.max(1, loanTermYears * 12);
  const monthlyRate = interestRate / 100 / 12;

  let monthlyPrincipalAndInterest = 0;
  if (loanAmount > 0) {
    if (monthlyRate > 0) {
      monthlyPrincipalAndInterest = PMT(monthlyRate, totalMonths, loanAmount);
    } else {
      monthlyPrincipalAndInterest = loanAmount / totalMonths;
    }
  }

  const monthlyPropertyTax = (homePrice * (propertyTaxRate / 100)) / 12;
  const monthlyInsurance = homeInsuranceAnnual / 12;
  const totalMonthlyPayment =
    monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyInsurance + hoaFeeMonthly + extraMonthlyPayment;

  const schedule = [];
  let balance = loanAmount;
  let accumulatedInterest = 0;
  let currentMonth = 0;
  const start = new Date(startDate);

  while (balance > 0.01 && currentMonth < totalMonths) {
    currentMonth++;
    const interestPayment = balance * monthlyRate;
    let basePrincipalPaid = monthlyPrincipalAndInterest - interestPayment;
    if (basePrincipalPaid < 0) basePrincipalPaid = 0;

    let actualPrincipalPaid = basePrincipalPaid + extraMonthlyPayment;
    if (actualPrincipalPaid > balance) {
      actualPrincipalPaid = balance;
    }

    balance -= actualPrincipalPaid;
    accumulatedInterest += interestPayment;

    const paymentDate = new Date(start.getFullYear(), start.getMonth() + currentMonth, 1);
    const dateString = paymentDate.toLocaleDateString("en-US", { month: "short", year: "numeric" });

    schedule.push({
      month: currentMonth,
      payment: interestPayment + actualPrincipalPaid + monthlyPropertyTax + monthlyInsurance + hoaFeeMonthly,
      principalPaid: basePrincipalPaid,
      interestPaid: interestPayment,
      extraPayment: extraMonthlyPayment,
      remainingBalance: Math.max(0, balance),
      totalInterestPaid: accumulatedInterest,
      date: dateString,
    });

    if (balance <= 0) break;
  }

  const payoffMonths = currentMonth;
  const totalInterestPaid = accumulatedInterest;
  const totalTaxesAndFeesPaid = (monthlyPropertyTax + monthlyInsurance + hoaFeeMonthly) * payoffMonths;
  const totalPaid = loanAmount + totalInterestPaid + totalTaxesAndFeesPaid;

  const finalDate = new Date(start.getFullYear(), start.getMonth() + payoffMonths, 1);
  const payoffDate = finalDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return {
    totalMonthlyPayment,
    monthlyPrincipalAndInterest,
    monthlyPropertyTax,
    monthlyInsurance,
    hoaFeeMonthly,
    loanAmount,
    totalInterestPaid,
    totalTaxesAndFeesPaid,
    totalPaid,
    payoffDate,
    payoffMonths,
    amortizationSchedule: schedule,
  };
}
