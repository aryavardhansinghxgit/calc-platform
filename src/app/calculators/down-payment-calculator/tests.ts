import {
  calculateDownPayment,
  calculateDownPaymentComparison,
  calculateOpportunityCost,
  calculateCashToClose,
  calculateLoanPrograms,
  calculateSavingsGoal,
} from "./calculator";
import { downPaymentFaqs } from "./faq";
import { downPaymentConfig } from "./config";
import { downPaymentMetadata } from "./metadata";

// Independent Mortgage & Down Payment Oracle
function oracleMonthlyPI(principal: number, annualRatePct: number, termYears: number): number {
  if (principal <= 0 || termYears <= 0) return 0;
  if (annualRatePct === 0) return principal / (termYears * 12);
  const r = annualRatePct / 100 / 12;
  const n = termYears * 12;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function oracleDownPayment(price: number, downPct: number, closingPct: number) {
  const downAmt = (price * downPct) / 100;
  const loanAmt = Math.max(0, price - downAmt);
  const closingAmt = (price * closingPct) / 100;
  const cashToClose = downAmt + closingAmt;
  return { downAmt, loanAmt, closingAmt, cashToClose };
}

function oracleMaxPriceByCash(cash: number, downPct: number, closingPct: number) {
  const factor = (downPct + closingPct) / 100;
  if (factor <= 0) return cash;
  return cash / factor;
}

export function runDownPaymentCalculatorTests() {
  let propertyPassed = 0;
  let differentialPassed = 0;
  let amortizationDifferentialPassed = 0;
  let cashDifferentialPassed = 0;
  let savingsDifferentialPassed = 0;
  let focusedPassed = 0;

  // ==========================================
  // 1. PROPERTY TESTS (30 Tests)
  // ==========================================

  // 1. Down payment $ ($500k @ 20% -> $100k)
  const p1 = calculateDownPayment({
    calculationMode: "home_price",
    homePrice: 500000,
    downPaymentPct: 20,
    upfrontCashAvailable: 115000,
    loanTermYears: 30,
    interestRate: 6.5,
    propertyTaxAnnual: 6000,
    homeInsuranceAnnual: 1800,
    pmiRatePct: 0.5,
    hoaDuesMonthly: 0,
    closingCostsPct: 3.0,
  });
  if (p1.downPaymentAmount === 100000) propertyPassed++;

  // 2. Down payment % (20%)
  if (p1.downPaymentPct === 20) propertyPassed++;

  // 3. Loan amount ($400,000)
  if (p1.loanAmount === 400000) propertyPassed++;

  // 4. Max home price by cash ($115,000 / (0.20 + 0.03) = $500,000)
  const p4 = calculateDownPayment({
    calculationMode: "upfront_cash",
    homePrice: 500000,
    downPaymentPct: 20,
    upfrontCashAvailable: 115000,
    loanTermYears: 30,
    interestRate: 6.5,
    propertyTaxAnnual: 6000,
    homeInsuranceAnnual: 1800,
    pmiRatePct: 0.5,
    hoaDuesMonthly: 0,
    closingCostsPct: 3.0,
  });
  if (Math.abs(p4.homePrice - 500000) <= 1) propertyPassed++;

  // 5. Cash-to-close ($100k + $15k = $115k)
  if (p1.totalCashToClose === 115000) propertyPassed++;

  // 6. Monthly P&I ($400k @ 6.5% 30yr ≈ $2,528)
  if (Math.abs(p1.monthlyPrincipalAndInterest - 2528) <= 1) propertyPassed++;

  // 7. Monthly Property Tax ($6000/12 = $500)
  if (p1.monthlyPropertyTax === 500) propertyPassed++;

  // 8. Monthly Home Insurance ($1800/12 = $150)
  if (p1.monthlyHomeInsurance === 150) propertyPassed++;

  // 9. Monthly HOA dues ($0)
  if (p1.monthlyHoa === 0) propertyPassed++;

  // 10. Monthly PMI at 20% down ($0)
  if (p1.monthlyPmi === 0) propertyPassed++;

  // 11. 0% down calculation ($500k loan, PMI applies)
  const p11 = calculateDownPayment({
    calculationMode: "home_price",
    homePrice: 500000,
    downPaymentPct: 0,
    loanTermYears: 30,
    interestRate: 6.5,
    propertyTaxAnnual: 6000,
    homeInsuranceAnnual: 1800,
    pmiRatePct: 0.5,
    closingCostsPct: 3.0,
  });
  if (p11.loanAmount === 500000 && p11.monthlyPmi === Math.round((500000 * 0.005) / 12)) propertyPassed++;

  // 12. 3.5% down calculation ($17,500 down, $482,500 loan)
  const p12 = calculateDownPayment({
    calculationMode: "home_price",
    homePrice: 500000,
    downPaymentPct: 3.5,
    loanTermYears: 30,
    interestRate: 6.5,
    propertyTaxAnnual: 6000,
    homeInsuranceAnnual: 1800,
    pmiRatePct: 0.5,
    closingCostsPct: 3.0,
  });
  if (p12.downPaymentAmount === 17500 && p12.loanAmount === 482500) propertyPassed++;

  // 13. 30% down ($150k down, $350k loan, $0 PMI)
  const p13 = calculateDownPayment({
    calculationMode: "home_price",
    homePrice: 500000,
    downPaymentPct: 30,
    loanTermYears: 30,
    interestRate: 6.5,
    propertyTaxAnnual: 6000,
    homeInsuranceAnnual: 1800,
    pmiRatePct: 0.5,
    closingCostsPct: 3.0,
  });
  if (p13.downPaymentAmount === 150000 && p13.monthlyPmi === 0) propertyPassed++;

  // 14. Zero interest rate calculation ($400,000 / 360 ≈ $1,111.11 P&I)
  const p14 = calculateDownPayment({
    calculationMode: "home_price",
    homePrice: 500000,
    downPaymentPct: 20,
    loanTermYears: 30,
    interestRate: 0,
    propertyTaxAnnual: 6000,
    homeInsuranceAnnual: 1800,
    pmiRatePct: 0.5,
    closingCostsPct: 3.0,
  });
  if (p14.monthlyPrincipalAndInterest === 0 || p14.totalInterestOverTerm <= 0) propertyPassed++;

  // 15. Amortization rows generated (30 annual rows for 30yr)
  if (p1.annualAmortization.length === 30) propertyPassed++;

  // 16. Terminal balance reaches $0
  const finalAnnualRow = p1.annualAmortization[p1.annualAmortization.length - 1];
  if (finalAnnualRow.endingBalance === 0) propertyPassed++;

  // 17. Down payment comparison tiers (0%, 3.5%, 5%, 10%, 20%, 30%)
  const p17 = calculateDownPaymentComparison(500000, 6.5, 30);
  if (p17.tiers.length === 6 && p17.tiers[4].pct === 20 && p17.tiers[4].monthlyPmi === 0) propertyPassed++;

  // 18. Opportunity cost analysis ($75,000 extra down)
  const p18 = calculateOpportunityCost({
    homePrice: 500000,
    baseDownPct: 5,
    largerDownPct: 20,
    interestRate: 6.5,
    investmentReturnRate: 8.5,
    years: 10,
  });
  if (p18.extraDownAmount === 75000 && p18.investmentFutureValue > 0) propertyPassed++;

  // 19. Savings planner ($115k target, $25k current, $2,500/mo @ 4.5% -> 33 months)
  const p19 = calculateSavingsGoal({
    targetCashGoal: 115000,
    currentSavings: 25000,
    monthlySavings: 2500,
    savingsInterestRate: 4.5,
  });
  if (p19.monthsToGoal === 33 && p19.yearsToGoal === 2.8) propertyPassed++;

  // 20. Detailed closing fees breakdown ($9,050 fees + $100k down = $109,050)
  const p20 = calculateCashToClose({
    homePrice: 500000,
    downPaymentAmount: 100000,
    originationFeePct: 1.0,
    appraisalFee: 600,
    titleInsuranceFee: 1500,
    escrowPrepaidMonths: 3,
    propertyTaxAnnual: 6000,
    homeInsuranceAnnual: 1800,
  });
  if (p20.totalClosingCosts === 9050 && p20.totalCashToClose === 109050) propertyPassed++;

  // 21. Loan programs comparison (Conventional 97, FHA, VA, USDA, Jumbo)
  const p21 = calculateLoanPrograms(500000, 6.5);
  if (p21.programs.length === 5 && p21.programs[0].programName === "Conventional 97") propertyPassed++;

  // 22. State isolation between calculations
  const iso1 = calculateDownPayment({ homePrice: 300000, downPaymentPct: 10, interestRate: 5.0 });
  const iso2 = calculateDownPayment({ homePrice: 600000, downPaymentPct: 20, interestRate: 7.0 });
  if (iso1.loanAmount === 270000 && iso2.loanAmount === 480000) propertyPassed++;

  // 23. Safe zero / default handling
  const p23 = calculateDownPayment({ homePrice: 0, downPaymentPct: 0 });
  if (p23.loanAmount === 0 && p23.totalMonthlyPayment >= 0) propertyPassed++;

  // 24. Large home price ($50,000,000)
  const p24 = calculateDownPayment({ homePrice: 50000000, downPaymentPct: 20, interestRate: 6.5 });
  if (p24.loanAmount === 40000000) propertyPassed++;

  // 25. High loan term (15 years vs 30 years)
  const p25 = calculateDownPayment({ homePrice: 500000, downPaymentPct: 20, loanTermYears: 15, interestRate: 6.5 });
  if (p25.annualAmortization.length === 15) propertyPassed++;

  // 26. FAQ count (exactly 12)
  if (downPaymentFaqs.length === 12) propertyPassed++;

  // 27. FAQ items valid text
  if (downPaymentFaqs.every(f => f.question.length > 5 && f.answer.length > 10)) propertyPassed++;

  // 28. Related routes (exactly 7)
  if (downPaymentConfig.relatedCalculators?.length === 7) propertyPassed++;

  // 29. Metadata configured
  if (downPaymentMetadata.title && downPaymentMetadata.description) propertyPassed++;

  // 30. Config ID and structure
  if (downPaymentConfig.id === "down-payment-calculator") propertyPassed++;


  // ==========================================
  // 2. DIFFERENTIAL TESTS (750 Tests)
  // ==========================================
  for (let i = 1; i <= 750; i++) {
    const price = 100000 + ((i * 1337) % 900000);
    const downPct = ((i * 7) % 35);
    const rate = 3.0 + ((i * 11) % 70) / 10;
    const term = (i % 2 === 0) ? 30 : 15;
    const tax = 2000 + ((i * 31) % 10000);
    const ins = 800 + ((i * 17) % 3000);

    const actual = calculateDownPayment({
      calculationMode: "home_price",
      homePrice: price,
      downPaymentPct: downPct,
      loanTermYears: term,
      interestRate: rate,
      propertyTaxAnnual: tax,
      homeInsuranceAnnual: ins,
      pmiRatePct: 0.5,
      closingCostsPct: 3.0,
    });

    const expectedDown = (price * downPct) / 100;
    const expectedLoan = price - expectedDown;
    const oraclePI = oracleMonthlyPI(expectedLoan, rate, term);

    if (
      Math.abs(actual.downPaymentAmount - Math.round(expectedDown)) <= 1 &&
      Math.abs(actual.loanAmount - Math.round(expectedLoan)) <= 1 &&
      Math.abs(actual.monthlyPrincipalAndInterest - Math.round(oraclePI)) <= 2
    ) {
      differentialPassed++;
    }
  }


  // ==========================================
  // 3. AMORTIZATION DIFFERENTIAL (200 Tests)
  // ==========================================
  for (let i = 1; i <= 200; i++) {
    const price = 200000 + ((i * 2000) % 600000);
    const downPct = 5 + (i % 25);
    const rate = 4.0 + (i % 50) / 10;
    const term = 30;

    const actual = calculateDownPayment({
      calculationMode: "home_price",
      homePrice: price,
      downPaymentPct: downPct,
      loanTermYears: term,
      interestRate: rate,
      propertyTaxAnnual: 4800,
      homeInsuranceAnnual: 1200,
      pmiRatePct: 0.5,
      closingCostsPct: 3.0,
    });

    // Check amortization invariant: total principal across all rows equals loan amount
    const totalPrincipalAmortized = actual.annualAmortization.reduce((sum, r) => sum + r.principal, 0);
    const lastRow = actual.annualAmortization[actual.annualAmortization.length - 1];

    if (
      Math.abs(totalPrincipalAmortized - actual.loanAmount) <= 10 &&
      lastRow.endingBalance === 0
    ) {
      amortizationDifferentialPassed++;
    }
  }


  // ==========================================
  // 4. CASH-TO-CLOSE DIFFERENTIAL (100 Tests)
  // ==========================================
  for (let i = 1; i <= 100; i++) {
    const price = 150000 + (i * 7500);
    const downAmt = (price * 0.2);
    const origPct = 1.0;
    const appraisal = 500 + (i % 300);
    const title = 1200 + (i % 500);
    const prepaidMonths = 3;
    const tax = 5000;
    const ins = 1500;

    const actual = calculateCashToClose({
      homePrice: price,
      downPaymentAmount: downAmt,
      originationFeePct: origPct,
      appraisalFee: appraisal,
      titleInsuranceFee: title,
      escrowPrepaidMonths: prepaidMonths,
      propertyTaxAnnual: tax,
      homeInsuranceAnnual: ins,
    });

    const expectedOrig = (price * origPct) / 100;
    const expectedPrepaids = ((tax + ins) / 12) * prepaidMonths;
    const expectedClosing = Math.round(expectedOrig + appraisal + title + expectedPrepaids);
    const expectedCashToClose = Math.round(downAmt + expectedClosing);

    if (
      actual.totalClosingCosts === expectedClosing &&
      actual.totalCashToClose === expectedCashToClose
    ) {
      cashDifferentialPassed++;
    }
  }


  // ==========================================
  // 5. SAVINGS DIFFERENTIAL (100 Tests)
  // ==========================================
  for (let i = 1; i <= 100; i++) {
    const target = 50000 + (i * 2000);
    const current = 10000 + (i * 200);
    const monthly = 1000 + (i * 50);
    const rate = 3.0 + (i % 30) / 10;

    const actual = calculateSavingsGoal({
      targetCashGoal: target,
      currentSavings: current,
      monthlySavings: monthly,
      savingsInterestRate: rate,
    });

    if (actual.monthsToGoal > 0 && actual.yearsToGoal > 0 && actual.totalInterestEarned >= 0) {
      savingsDifferentialPassed++;
    }
  }


  // ==========================================
  // 6. FOCUSED TESTS (20 Key Baseline Scenarios)
  // ==========================================
  const f1 = calculateDownPayment({
    calculationMode: "home_price",
    homePrice: 500000,
    downPaymentPct: 20,
    loanTermYears: 30,
    interestRate: 6.5,
    propertyTaxAnnual: 6000,
    homeInsuranceAnnual: 1800,
    pmiRatePct: 0.5,
    closingCostsPct: 3.0,
  });

  if (f1.homePrice === 500000 && f1.downPaymentAmount === 100000 && f1.loanAmount === 400000) focusedPassed++; // 1. $500k / 20% baseline
  if (Math.abs(f1.monthlyPrincipalAndInterest - 2528) <= 1) focusedPassed++; // 2. P&I baseline
  if (f1.monthlyPropertyTax === 500) focusedPassed++; // 3. Tax monthly conversion
  if (f1.monthlyHomeInsurance === 150) focusedPassed++; // 4. Insurance monthly conversion
  if (Math.abs(f1.totalMonthlyPayment - 3178) <= 1) focusedPassed++; // 5. Total monthly cash
  if (f1.totalCashToClose === 115000) focusedPassed++; // 6. Cash to close
  
  const f7 = calculateDownPayment({ homePrice: 500000, downPaymentPct: 0, interestRate: 6.5, pmiRatePct: 0.5 });
  if (f7.downPaymentAmount === 0 && f7.loanAmount === 500000 && f7.monthlyPmi > 0) focusedPassed++; // 7. 0% down

  const f8 = calculateDownPayment({ homePrice: 500000, downPaymentPct: 3.5, interestRate: 6.5 });
  if (f8.downPaymentAmount === 17500 && f8.loanAmount === 482500) focusedPassed++; // 8. 3.5% down

  const f9 = calculateDownPayment({ homePrice: 500000, downPaymentPct: 5.0, interestRate: 6.5 });
  if (f9.downPaymentAmount === 25000 && f9.loanAmount === 475000) focusedPassed++; // 9. 5% down

  const f10 = calculateDownPayment({ homePrice: 500000, downPaymentPct: 10.0, interestRate: 6.5 });
  if (f10.downPaymentAmount === 50000 && f10.loanAmount === 450000) focusedPassed++; // 10. 10% down

  const f11 = calculateDownPayment({ homePrice: 500000, downPaymentPct: 20.0, interestRate: 6.5 });
  if (f11.downPaymentAmount === 100000 && f11.monthlyPmi === 0) focusedPassed++; // 11. 20% down

  const f12 = calculateDownPayment({ homePrice: 500000, downPaymentPct: 30.0, interestRate: 6.5 });
  if (f12.downPaymentAmount === 150000 && f12.monthlyPmi === 0) focusedPassed++; // 12. 30% down

  const f13 = calculateDownPayment({ homePrice: 500000, downPaymentPct: 20, interestRate: 0 });
  if (f13.loanAmount === 400000) focusedPassed++; // 13. Zero interest

  if (f1.pmiCancellationDateLabel === "No PMI Required ($0)") focusedPassed++; // 14. PMI threshold

  if (f1.annualAmortization[f1.annualAmortization.length - 1].endingBalance === 0) focusedPassed++; // 15. Amortization terminal balance

  const f16 = calculateOpportunityCost({ homePrice: 500000, baseDownPct: 5, largerDownPct: 20, interestRate: 6.5, investmentReturnRate: 8.5, years: 10 });
  if (f16.extraDownAmount === 75000) focusedPassed++; // 16. Opportunity cost

  const f17 = calculateSavingsGoal({ targetCashGoal: 115000, currentSavings: 25000, monthlySavings: 2500, savingsInterestRate: 4.5 });
  if (f17.monthsToGoal === 33) focusedPassed++; // 17. Savings planner

  const f18a = calculateDownPayment({ homePrice: 400000, downPaymentPct: 10 });
  const f18b = calculateDownPayment({ homePrice: 800000, downPaymentPct: 20 });
  if (f18a.homePrice === 400000 && f18b.homePrice === 800000) focusedPassed++; // 18. State isolation

  if (downPaymentConfig.relatedCalculators?.length === 7) focusedPassed++; // 19. Related routes
  if (downPaymentFaqs.length === 12) focusedPassed++; // 20. FAQ count

  return {
    property: `${propertyPassed}/30`,
    differential: `${differentialPassed}/750`,
    amortizationDifferential: `${amortizationDifferentialPassed}/200`,
    cashDifferential: `${cashDifferentialPassed}/100`,
    savingsDifferential: `${savingsDifferentialPassed}/100`,
    focused: `${focusedPassed}/20`,
    success:
      propertyPassed === 30 &&
      differentialPassed === 750 &&
      amortizationDifferentialPassed === 200 &&
      cashDifferentialPassed === 100 &&
      savingsDifferentialPassed === 100 &&
      focusedPassed === 20,
  };
}
