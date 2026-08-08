import {
  IncomeAffordabilityInput,
  IncomeAffordabilityOutput,
  BudgetAffordabilityInput,
  BudgetAffordabilityOutput,
  ScheduleMonthRow,
} from "./types";
import { PMT } from "@/lib/finance/financial-math";

export function calculateIncomeAffordability(inputs: IncomeAffordabilityInput): IncomeAffordabilityOutput {
  const {
    annualIncome = 120000,
    loanTermYears = 30,
    interestRate = 6.5,
    monthlyDebt = 500,
    downPayment = 20,
    downPaymentType = "percent",
    propertyTaxRate = 1.2,
    hoaFeeRate = 0.5,
    insuranceRate = 0.5,
    dtiOption = "conventional",
    customDtiPercent = 36,
  } = inputs;

  const grossMonthlyIncome = Math.max(1, annualIncome) / 12;
  const debts = Math.max(0, monthlyDebt);
  const n = Math.max(1, Math.min(600, Math.round(loanTermYears * 12)));
  const monthlyRate = Math.max(0, interestRate) / 100 / 12;

  // DTI Ratios Determination
  let frontEndPct = 28;
  let backEndPct = 36;

  if (dtiOption === "fha") {
    frontEndPct = 31;
    backEndPct = 43;
  } else if (dtiOption === "va") {
    frontEndPct = 41;
    backEndPct = 41;
  } else if (dtiOption === "custom") {
    frontEndPct = customDtiPercent ?? 36;
    backEndPct = customDtiPercent ?? 36;
  }

  const frontEndMaxHousing = grossMonthlyIncome * (frontEndPct / 100);
  const backEndMaxHousing = Math.max(0, grossMonthlyIncome * (backEndPct / 100) - debts);
  const allowableTotalHousing = Math.max(0, Math.min(frontEndMaxHousing, backEndMaxHousing));

  // PMT Factor per $1 of Loan Amount
  let pmtFactor = 1 / n;
  if (monthlyRate > 0) {
    pmtFactor = (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  }

  const kTaxFee = (Math.max(0, propertyTaxRate) + Math.max(0, hoaFeeRate) + Math.max(0, insuranceRate)) / 100 / 12;

  let maxLoanAmount = 0;
  let maxHomePrice = 0;
  let requiredDownPayment = 0;

  if (downPaymentType === "percent") {
    const dPct = Math.min(99, Math.max(0, downPayment)) / 100;
    const denominator = pmtFactor + kTaxFee / Math.max(0.01, 1 - dPct);
    maxLoanAmount = allowableTotalHousing / denominator;
    maxHomePrice = maxLoanAmount / Math.max(0.01, 1 - dPct);
    requiredDownPayment = maxHomePrice * dPct;
  } else {
    const dAmt = Math.max(0, downPayment);
    const denominator = pmtFactor + kTaxFee;
    const numerator = Math.max(0, allowableTotalHousing - dAmt * kTaxFee);
    maxLoanAmount = numerator / denominator;
    maxHomePrice = maxLoanAmount + dAmt;
    requiredDownPayment = dAmt;
  }

  maxLoanAmount = Math.max(0, maxLoanAmount);
  maxHomePrice = Math.max(0, maxHomePrice);

  const monthlyMortgagePmt = maxLoanAmount * pmtFactor;
  const monthlyTax = maxHomePrice * (Math.max(0, propertyTaxRate) / 100 / 12);
  const monthlyInsurance = maxHomePrice * (Math.max(0, insuranceRate) / 100 / 12);
  const monthlyHoa = maxHomePrice * (Math.max(0, hoaFeeRate) / 100 / 12);
  const totalMonthlyHousingCost = monthlyMortgagePmt + monthlyTax + monthlyInsurance + monthlyHoa;

  const actualFrontEnd = (totalMonthlyHousingCost / grossMonthlyIncome) * 100;
  const actualBackEnd = ((totalMonthlyHousingCost + debts) / grossMonthlyIncome) * 100;

  // Generate Amortization Schedule (Full & 12-Month Preview)
  const fullSchedule: ScheduleMonthRow[] = [];
  let balance = maxLoanAmount;
  let currentMonth = 0;
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const startM = new Date().getMonth();
  const startY = new Date().getFullYear();

  while (balance > 0.001 && currentMonth < n) {
    currentMonth++;
    const interest = balance * monthlyRate;
    let principal = monthlyMortgagePmt - interest;
    if (principal > balance) principal = balance;
    balance -= principal;

    const mIdx = (startM + currentMonth - 1) % 12;
    const yVal = startY + Math.floor((startM + currentMonth - 1) / 12);
    const dateStr = `${monthNames[mIdx]} ${yVal}`;

    fullSchedule.push({
      month: currentMonth,
      date: dateStr,
      payment: monthlyMortgagePmt,
      principal,
      interest,
      balance: Math.max(0, balance),
    });

    if (balance <= 0) break;
  }

  const schedulePreview = fullSchedule.slice(0, 12);

  return {
    maxHomePrice,
    maxLoanAmount,
    requiredDownPayment,
    monthlyMortgagePmt,
    monthlyTax,
    monthlyInsurance,
    monthlyHoa,
    totalMonthlyHousingCost,
    frontEndRatio: Number(actualFrontEnd.toFixed(1)),
    backEndRatio: Number(actualBackEnd.toFixed(1)),
    schedulePreview,
    fullSchedule,
  };
}

export function calculateBudgetAffordability(inputs: BudgetAffordabilityInput): BudgetAffordabilityOutput {
  const {
    housingBudget = 3500,
    loanTermYears = 30,
    interestRate = 6.5,
    downPayment = 20,
    downPaymentType = "percent",
    includeTaxesFees = true,
    propertyTaxRate = 1.2,
    hoaFeeRate = 0.5,
    insuranceRate = 0.5,
    maintenanceRate = 1.0,
  } = inputs;

  const budget = Math.max(0, housingBudget);
  const n = Math.max(1, Math.min(600, Math.round(loanTermYears * 12)));
  const monthlyRate = Math.max(0, interestRate) / 100 / 12;

  let pmtFactor = 1 / n;
  if (monthlyRate > 0) {
    pmtFactor = (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  }

  let kFee = 0;
  if (includeTaxesFees) {
    kFee =
      (Math.max(0, propertyTaxRate) +
        Math.max(0, hoaFeeRate) +
        Math.max(0, insuranceRate) +
        Math.max(0, maintenanceRate)) /
      100 /
      12;
  }

  let maxLoanAmount = 0;
  let maxHomePrice = 0;
  let requiredDownPayment = 0;

  if (downPaymentType === "percent") {
    const dPct = Math.min(99, Math.max(0, downPayment)) / 100;
    const denominator = pmtFactor + kFee / Math.max(0.01, 1 - dPct);
    maxLoanAmount = budget / denominator;
    maxHomePrice = maxLoanAmount / Math.max(0.01, 1 - dPct);
    requiredDownPayment = maxHomePrice * dPct;
  } else {
    const dAmt = Math.max(0, downPayment);
    const denominator = pmtFactor + kFee;
    const numerator = Math.max(0, budget - dAmt * kFee);
    maxLoanAmount = numerator / denominator;
    maxHomePrice = maxLoanAmount + dAmt;
    requiredDownPayment = dAmt;
  }

  maxLoanAmount = Math.max(0, maxLoanAmount);
  maxHomePrice = Math.max(0, maxHomePrice);

  const monthlyMortgagePmt = maxLoanAmount * pmtFactor;
  const monthlyTax = includeTaxesFees ? maxHomePrice * (Math.max(0, propertyTaxRate) / 100 / 12) : 0;
  const monthlyInsurance = includeTaxesFees ? maxHomePrice * (Math.max(0, insuranceRate) / 100 / 12) : 0;
  const monthlyHoa = includeTaxesFees ? maxHomePrice * (Math.max(0, hoaFeeRate) / 100 / 12) : 0;
  const monthlyMaintenance = includeTaxesFees ? maxHomePrice * (Math.max(0, maintenanceRate) / 100 / 12) : 0;
  const totalMonthlyHousingCost = monthlyMortgagePmt + monthlyTax + monthlyInsurance + monthlyHoa + monthlyMaintenance;

  return {
    maxHomePrice,
    maxLoanAmount,
    requiredDownPayment,
    monthlyMortgagePmt,
    monthlyTax,
    monthlyInsurance,
    monthlyHoa,
    monthlyMaintenance,
    totalMonthlyHousingCost,
  };
}
