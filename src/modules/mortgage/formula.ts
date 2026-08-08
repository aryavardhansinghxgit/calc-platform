import { MortgageModuleInput, MortgageModuleOutput, AmortizationRow, CostBreakdownItem } from "./types";
import { PMT } from "@/lib/finance/financial-math";

export function calculateMortgageModule(inputs: MortgageModuleInput): MortgageModuleOutput {
  const {
    homePrice = 400000,
    downPayment = 80000,
    downPaymentType = "amount",
    interestRate = 6.5,
    loanTermYears = 30,
    startMonth = new Date().getMonth() + 1,
    startYear = new Date().getFullYear(),

    propertyTax = 4800,
    propertyTaxType = "amount",
    homeInsurance = 1500,
    pmiRate = 0.5,
    hoaFee = 0,
    otherCosts = 0,

    propertyTaxIncrease = 2.0,
    insuranceIncrease = 3.0,
    hoaIncrease = 2.5,
    otherCostsIncrease = 2.0,

    extraMonthlyPayment = 0,
    extraYearlyPayment = 0,
    extraOneTimePayment = 0,
    extraOneTimeMonth = 1,
    extraOneTimeYear = new Date().getFullYear() + 1,
  } = inputs;

  // 1. Down Payment & Loan Amount
  let downPaymentAmount = 0;
  if (downPaymentType === "percent") {
    downPaymentAmount = (homePrice * Math.max(0, downPayment)) / 100;
  } else {
    downPaymentAmount = Math.max(0, downPayment);
  }
  downPaymentAmount = Math.min(homePrice, downPaymentAmount);
  
  const loanAmount = Math.max(0, homePrice - downPaymentAmount);
  const downPaymentPercent = homePrice > 0 ? (downPaymentAmount / homePrice) * 100 : 0;
  const totalMonths = Math.max(1, Math.round(loanTermYears * 12));
  const monthlyRate = Math.max(0, interestRate) / 100 / 12;

  // 2. Base Monthly Principal & Interest Payment
  let monthlyPrincipalAndInterest = 0;
  if (loanAmount > 0) {
    if (monthlyRate > 0) {
      monthlyPrincipalAndInterest = PMT(monthlyRate, totalMonths, loanAmount);
    } else {
      monthlyPrincipalAndInterest = loanAmount / totalMonths;
    }
  }

  // Initial first-year monthly components
  const initialAnnualTax = propertyTaxType === "percent" ? (homePrice * propertyTax) / 100 : propertyTax;
  const initialMonthlyTax = initialAnnualTax / 12;
  const initialMonthlyInsurance = homeInsurance / 12;
  
  // PMI rules: Required if initial down payment < 20% (LTV > 80%)
  const requiresPmi = downPaymentPercent < 20;
  const initialAnnualPmi = requiresPmi ? loanAmount * (pmiRate / 100) : 0;
  const initialMonthlyPmi = initialAnnualPmi / 12;

  const totalInitialMonthlyPayment =
    monthlyPrincipalAndInterest +
    initialMonthlyTax +
    initialMonthlyInsurance +
    initialMonthlyPmi +
    hoaFee +
    otherCosts +
    extraMonthlyPayment;

  // 3. Baseline calculation (without extra payments) to calculate interest savings
  let baselineInterestPaid = 0;
  if (loanAmount > 0) {
    let bBalance = loanAmount;
    for (let m = 1; m <= totalMonths; m++) {
      const bInterest = bBalance * monthlyRate;
      let bPrincipal = monthlyPrincipalAndInterest - bInterest;
      if (bPrincipal > bBalance) bPrincipal = bBalance;
      baselineInterestPaid += bInterest;
      bBalance -= bPrincipal;
      if (bBalance <= 0) break;
    }
  }

  // 4. Active schedule simulation with inflation and extra payments
  const schedule: AmortizationRow[] = [];
  let balance = loanAmount;
  let accumulatedInterest = 0;
  let accumulatedTax = 0;
  let accumulatedInsurance = 0;
  let accumulatedPmi = 0;
  let accumulatedHoa = 0;
  let accumulatedOther = 0;
  let accumulatedExtra = 0;

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fullMonthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  let currentMonthIndex = 0;

  while (balance > 0.001 && currentMonthIndex < totalMonths) {
    currentMonthIndex++;
    
    // Year index relative to start (0-indexed year)
    const yearIndex = Math.floor((currentMonthIndex - 1) / 12);
    
    // Inflation multipliers based on annual increase settings
    const taxMultiplier = Math.pow(1 + propertyTaxIncrease / 100, yearIndex);
    const insuranceMultiplier = Math.pow(1 + insuranceIncrease / 100, yearIndex);
    const hoaMultiplier = Math.pow(1 + hoaIncrease / 100, yearIndex);
    const otherMultiplier = Math.pow(1 + otherCostsIncrease / 100, yearIndex);

    const currentTax = initialMonthlyTax * taxMultiplier;
    const currentInsurance = initialMonthlyInsurance * insuranceMultiplier;
    const currentHoa = hoaFee * hoaMultiplier;
    const currentOther = otherCosts * otherMultiplier;

    // PMI applies only if balance is > 80% of original home purchase price
    const pmiThreshold = homePrice * 0.8;
    const currentPmi = requiresPmi && balance > pmiThreshold ? initialMonthlyPmi : 0;

    // Interest & Scheduled Principal
    const interestPaid = balance * monthlyRate;
    let basePrincipalPaid = monthlyPrincipalAndInterest - interestPaid;
    if (basePrincipalPaid < 0) basePrincipalPaid = 0;

    // Calculate current Date (Month / Year)
    const totalMonthOffset = (startMonth - 1) + (currentMonthIndex - 1);
    const mNum = (totalMonthOffset % 12) + 1;
    const yNum = startYear + Math.floor(totalMonthOffset / 12);
    const dateStr = `${monthNames[mNum - 1]} ${yNum}`;

    // Extra payments
    let extraPaidThisMonth = Math.max(0, extraMonthlyPayment);
    if (currentMonthIndex % 12 === 0) {
      extraPaidThisMonth += Math.max(0, extraYearlyPayment);
    }
    if (mNum === extraOneTimeMonth && yNum === extraOneTimeYear) {
      extraPaidThisMonth += Math.max(0, extraOneTimePayment);
    }

    // Principal Cap
    let totalPrincipalThisMonth = basePrincipalPaid + extraPaidThisMonth;
    if (totalPrincipalThisMonth > balance) {
      totalPrincipalThisMonth = balance;
      extraPaidThisMonth = Math.max(0, totalPrincipalThisMonth - basePrincipalPaid);
      basePrincipalPaid = totalPrincipalThisMonth - extraPaidThisMonth;
    }

    balance -= totalPrincipalThisMonth;
    accumulatedInterest += interestPaid;
    accumulatedTax += currentTax;
    accumulatedInsurance += currentInsurance;
    accumulatedPmi += currentPmi;
    accumulatedHoa += currentHoa;
    accumulatedOther += currentOther;
    accumulatedExtra += extraPaidThisMonth;

    const totalOutofPocket =
      totalPrincipalThisMonth + interestPaid + currentTax + currentInsurance + currentPmi + currentHoa + currentOther;

    schedule.push({
      month: currentMonthIndex,
      year: Math.ceil(currentMonthIndex / 12),
      date: dateStr,
      payment: totalOutofPocket,
      principalPaid: basePrincipalPaid,
      interestPaid: interestPaid,
      extraPaid: extraPaidThisMonth,
      propertyTax: currentTax,
      homeInsurance: currentInsurance,
      pmi: currentPmi,
      hoaFee: currentHoa,
      otherCosts: currentOther,
      remainingBalance: Math.max(0, balance),
      totalInterestPaid: accumulatedInterest,
    });

    if (balance <= 0) break;
  }

  const payoffMonths = currentMonthIndex;
  const lastMonthOffset = (startMonth - 1) + (payoffMonths - 1);
  const finalM = (lastMonthOffset % 12);
  const finalY = startYear + Math.floor(lastMonthOffset / 12);
  const payoffDate = `${fullMonthNames[finalM]} ${finalY}`;

  const totalInterestPaid = accumulatedInterest;
  const totalPrincipalPaid = loanAmount;
  const totalPropertyTaxPaid = accumulatedTax;
  const totalInsurancePaid = accumulatedInsurance;
  const totalPmiPaid = accumulatedPmi;
  const totalHoaPaid = accumulatedHoa;
  const totalOtherCostsPaid = accumulatedOther;

  const totalCost =
    totalPrincipalPaid +
    totalInterestPaid +
    totalPropertyTaxPaid +
    totalInsurancePaid +
    totalPmiPaid +
    totalHoaPaid +
    totalOtherCostsPaid;

  const interestSavings = Math.max(0, baselineInterestPaid - totalInterestPaid);
  const monthsSaved = Math.max(0, totalMonths - payoffMonths);

  // Breakdown table & Donut visual items
  const totalOtherLifetime = totalPmiPaid + totalHoaPaid + totalOtherCostsPaid;
  const initialOtherMonthly = initialMonthlyPmi + hoaFee + otherCosts;

  const breakdown: CostBreakdownItem[] = [
    {
      category: "Principal & Interest",
      monthlyFirstYear: monthlyPrincipalAndInterest,
      totalLifetime: totalPrincipalPaid + totalInterestPaid,
      percentageOfTotal: totalCost > 0 ? ((totalPrincipalPaid + totalInterestPaid) / totalCost) * 100 : 0,
      color: "#3B82F6", // Blue
    },
    {
      category: "Property Tax",
      monthlyFirstYear: initialMonthlyTax,
      totalLifetime: totalPropertyTaxPaid,
      percentageOfTotal: totalCost > 0 ? (totalPropertyTaxPaid / totalCost) * 100 : 0,
      color: "#10B981", // Emerald
    },
    {
      category: "Home Insurance",
      monthlyFirstYear: initialMonthlyInsurance,
      totalLifetime: totalInsurancePaid,
      percentageOfTotal: totalCost > 0 ? (totalInsurancePaid / totalCost) * 100 : 0,
      color: "#F59E0B", // Amber
    },
    {
      category: "Other Costs (PMI, HOA, Fees)",
      monthlyFirstYear: initialOtherMonthly,
      totalLifetime: totalOtherLifetime,
      percentageOfTotal: totalCost > 0 ? (totalOtherLifetime / totalCost) * 100 : 0,
      color: "#8B5CF6", // Purple
    },
  ];

  return {
    loanAmount,
    downPaymentAmount,
    downPaymentPercent,
    monthlyPrincipalAndInterest,
    monthlyPropertyTax: initialMonthlyTax,
    monthlyInsurance: initialMonthlyInsurance,
    monthlyPmi: initialMonthlyPmi,
    monthlyHoa: hoaFee,
    monthlyOtherCosts: otherCosts,
    monthlyExtraPayment: extraMonthlyPayment,
    totalInitialMonthlyPayment,

    totalInterestPaid,
    totalBaselineInterestPaid: baselineInterestPaid,
    interestSavings,
    monthsSaved,

    totalPrincipalPaid,
    totalPropertyTaxPaid,
    totalInsurancePaid,
    totalPmiPaid,
    totalHoaPaid,
    totalOtherCostsPaid,
    totalCost,

    payoffDate,
    payoffMonths,

    breakdown,
    amortizationSchedule: schedule,
  };
}
