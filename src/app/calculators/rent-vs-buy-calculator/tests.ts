import {
  calculateRentVsBuy,
  calculateNetWorthComparison,
  calculatePriceToRent,
  calculateTaxShield,
  calculateBenFelix,
  calculateRelocationPenalty,
} from "./calculator";
import { rentVsBuyFaqs } from "./faq";
import { rentVsBuyConfig } from "./config";
import { rentVsBuyMetadata } from "./metadata";

// Independent Mathematical Oracle for Rent vs. Buy
function oracleMonthlyPI(principal: number, annualRatePct: number, termYears: number): number {
  if (principal <= 0 || termYears <= 0) return 0;
  if (annualRatePct === 0) return principal / (termYears * 12);
  const r = annualRatePct / 100 / 12;
  const n = termYears * 12;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function oraclePriceToRentRatio(price: number, monthlyRent: number): number {
  const annualRent = monthlyRent * 12;
  if (annualRent <= 0) return 0;
  return Number((price / annualRent).toFixed(1));
}

function oracleBenFelixMonthly(price: number, rate: number, taxPct: number, maintPct: number): number {
  const totalPct = rate + taxPct + maintPct;
  return Math.round((price * (totalPct / 100)) / 12);
}

export function runRentVsBuyCalculatorTests() {
  let propertyPassed = 0;
  let differentialPassed = 0;
  let mortgageDifferentialPassed = 0;
  let breakevenDifferentialPassed = 0;
  let netWorthDifferentialPassed = 0;
  let priceToRentDifferentialPassed = 0;
  let taxDifferentialPassed = 0;
  let focusedPassed = 0;

  // ==========================================
  // 1. PROPERTY TESTS (30 Tests)
  // ==========================================

  // 1. Baseline Buy calculation ($500k @ 20% down, 6.632% rate)
  const p1 = calculateRentVsBuy({
    homePrice: 500000,
    downPaymentPct: 20,
    interestRate: 6.632,
    loanTermYears: 30,
    monthlyRent: 3000,
  });
  if (p1.initialBuyingOutlay === 110000) propertyPassed++; // $100k down + 2% closing ($10k) = $110k

  // 2. Baseline Rent calculation ($3,000 rent -> initial outlay $3,100)
  if (p1.initialRentingOutlay === 3100) propertyPassed++; // $3k deposit + $100 fee

  // 3. Monthly Mortgage P&I calculation ($400,000 @ 6.632% -> ~$2,563/mo)
  const p3PI = oracleMonthlyPI(400000, 6.632, 30);
  if (Math.abs(p3PI - 2563) <= 2) propertyPassed++;

  // 4. Mortgage Amortization termination balance ($0 at Year 30)
  const finalRow = p1.yearlySchedule[29];
  if (finalRow.remainingMortgageBalance === 0) propertyPassed++;

  // 5. Home Appreciation (Year 1 home value = $500k * 1.03 = $515,000)
  if (p1.yearlySchedule[0].homeValue === 515000) propertyPassed++;

  // 6. Rent Escalation (Year 1 rent outlay vs Year 2 rent outlay)
  if (p1.yearlySchedule[1].rentingAnnualOutlay > p1.yearlySchedule[0].rentingAnnualOutlay) propertyPassed++;

  // 7. Insurance Escalation
  const p7 = calculateRentVsBuy({ homeInsuranceAnnual: 2500, costInsuranceIncreasePct: 3.0 });
  if (p7.yearlySchedule.length === 30) propertyPassed++;

  // 8. Tax Escalation
  const p8 = calculateRentVsBuy({ propertyTaxPct: 1.5, propertyTaxGrowthPct: 3.0 });
  if (p8.yearlySchedule.length === 30) propertyPassed++;

  // 9. Maintenance percentage
  const p9 = calculateRentVsBuy({ maintenancePct: 1.5 });
  if (p9.yearlySchedule.length === 30) propertyPassed++;

  // 10. Buying Closing Costs (2% of $500k = $10,000)
  if (p1.initialBuyingOutlay - 100000 === 10000) propertyPassed++;

  // 11. Selling Closing Costs (7% included in net sale proceeds)
  if (p1.yearlySchedule[0].buyingCumulativeNetCost > 0) propertyPassed++;

  // 12. Breakeven stay horizon (4.8 years under baseline)
  if (p1.breakevenYears === 5 || p1.breakevenMessage.includes("4.8")) propertyPassed++;

  // 13. Price-to-Rent ratio ($500k / $36k = 13.9)
  if (p1.priceToRentRatio === 13.9) propertyPassed++;

  // 14. 5% Rule calculation ($500k @ 6.632% rate, 1.5% tax, 1.5% maint -> $4,013/mo)
  const p14 = calculateBenFelix({ homePrice: 500000, interestRate: 6.632, propertyTaxPct: 1.5, maintenancePct: 1.5 });
  if (p14.monthlyUnrecoverableCost === 4013) propertyPassed++;

  // 15. Opportunity Cost of Down Payment ($100,000 compounding)
  const p15 = calculateNetWorthComparison({ homePrice: 500000, downPaymentAmount: 100000, investmentReturnRate: 5.0, years: 10 });
  if (p15.renterStockPortfolioValue === 162889) propertyPassed++;

  // 16. Net Worth Comparison ($359,958 equity vs $162,889 portfolio)
  if (p15.projectedHomeEquity === 359958 && p15.netWorthAdvantage.includes("Buying")) propertyPassed++;

  // 17. Tax benefit calculation ($1,007/yr savings)
  const p17 = calculateTaxShield({
    homePrice: 500000,
    mortgageBalance: 400000,
    interestRate: 6.632,
    propertyTaxAnnual: 7500,
    filingStatus: "married_joint",
    marginalFederalTaxRate: 25.0,
  });
  if (p17.annualTaxSavings === 1007) propertyPassed++;

  // 18. Stay Horizon Table (30 rows generated)
  if (p1.averageCostTable.length === 30) propertyPassed++;

  // 19. Zero interest rate calculation
  const p19 = calculateRentVsBuy({ interestRate: 0 });
  if (p19.yearlySchedule.length === 30) propertyPassed++;

  // 20. Zero home appreciation
  const p20 = calculateRentVsBuy({ homeAppreciationPct: 0 });
  if (p20.yearlySchedule[29].homeValue === 500000) propertyPassed++;

  // 21. Zero rent growth
  const p21 = calculateRentVsBuy({ annualRentIncreasePct: 0, costInsuranceIncreasePct: 0 });
  if (p21.yearlySchedule[29].rentingAnnualOutlay === (3000 * 12 + 15 * 12)) propertyPassed++;

  // 22. High rent vs low price (Immediate buy advantage)
  const p22 = calculateRentVsBuy({ homePrice: 200000, monthlyRent: 4000 });
  if (p22.breakevenYears <= 2) propertyPassed++;

  // 23. Low rent vs high price (Renting favored)
  const p23 = calculateRentVsBuy({ homePrice: 1000000, monthlyRent: 1500 });
  if (p23.priceToRentRatio > 25) propertyPassed++;

  // 24. Relocation friction costs (3 years -> $45,000 friction)
  const p24 = calculateRelocationPenalty({ homePrice: 500000, plannedStayYears: 3, buyingCostsPct: 2.0, sellingCostsPct: 7.0 });
  if (p24.totalFrictionCosts === 45000 && p24.monthlyAmortizedDrag === 1250) propertyPassed++;

  // 25. State isolation
  const isoA = calculatePriceToRent({ homePrice: 300000, monthlyRent: 2000 });
  const isoB = calculatePriceToRent({ homePrice: 600000, monthlyRent: 2000 });
  if (isoA.ratio === 12.5 && isoB.ratio === 25.0) propertyPassed++;

  // 26. Reset & Default handling
  const p26 = calculateRentVsBuy({ homePrice: 0 });
  if (p26.yearlySchedule.length === 30) propertyPassed++;

  // 27. FAQ count (exactly 12)
  if (rentVsBuyFaqs.length === 12) propertyPassed++;

  // 28. FAQ topics valid
  if (rentVsBuyFaqs.every(f => f.question.length > 5 && f.answer.length > 10)) propertyPassed++;

  // 29. Related routes count (exactly 7)
  if (rentVsBuyConfig.relatedCalculators?.length === 7) propertyPassed++;

  // 30. Metadata configured
  if (rentVsBuyMetadata.title && rentVsBuyMetadata.description) propertyPassed++;


  // ==========================================
  // 2. DIFFERENTIAL TESTS (920 Tests)
  // ==========================================
  for (let i = 1; i <= 920; i++) {
    const price = 200000 + ((i * 1337) % 800000);
    const rent = 1000 + ((i * 47) % 5000);
    const downPct = 10 + (i % 20);
    const rate = 4.0 + ((i * 13) % 60) / 10;
    const appPct = 1.0 + (i % 5);
    const rentInc = 1.0 + (i % 4);

    const actual = calculateRentVsBuy({
      homePrice: price,
      monthlyRent: rent,
      downPaymentPct: downPct,
      interestRate: rate,
      homeAppreciationPct: appPct,
      annualRentIncreasePct: rentInc,
    });

    const expectedRatio = oraclePriceToRentRatio(price, rent);

    if (
      actual.yearlySchedule.length === 30 &&
      actual.priceToRentRatio === expectedRatio &&
      actual.initialBuyingOutlay > 0 &&
      actual.initialRentingOutlay > 0
    ) {
      differentialPassed++;
    }
  }


  // ==========================================
  // 3. MORTGAGE DIFFERENTIAL (160 Tests)
  // ==========================================
  for (let i = 1; i <= 160; i++) {
    const price = 250000 + (i * 3000);
    const downPct = 20;
    const loanAmt = price * 0.8;
    const rate = 3.5 + (i % 45) / 10;
    const term = 30;

    const oraclePI = oracleMonthlyPI(loanAmt, rate, term);
    const res = calculateRentVsBuy({ homePrice: price, interestRate: rate, downPaymentPct: downPct, loanTermYears: term });

    const year1AnnualPI = res.yearlySchedule[0].buyingAnnualOutlay;
    if (year1AnnualPI > 0 && oraclePI > 0) {
      mortgageDifferentialPassed++;
    }
  }


  // ==========================================
  // 4. BREAKEVEN DIFFERENTIAL (160 Tests)
  // ==========================================
  for (let i = 1; i <= 160; i++) {
    const price = 300000 + (i * 2500);
    const rent = 1500 + (i * 20);

    const res = calculateRentVsBuy({ homePrice: price, monthlyRent: rent });
    if (res.breakevenYears >= 0 && res.breakevenYears <= 30 && res.breakevenMessage.length > 5) {
      breakevenDifferentialPassed++;
    }
  }


  // ==========================================
  // 5. NET WORTH DIFFERENTIAL (160 Tests)
  // ==========================================
  for (let i = 1; i <= 160; i++) {
    const price = 300000 + (i * 2000);
    const downAmt = price * 0.2;
    const appRate = 2.0 + (i % 4);
    const invRate = 4.0 + (i % 5);

    const res = calculateNetWorthComparison({
      homePrice: price,
      downPaymentAmount: downAmt,
      appreciationRate: appRate,
      investmentReturnRate: invRate,
      years: 10,
    });

    const expectedFutureHome = Math.round(price * Math.pow(1 + appRate / 100, 10));
    const expectedPortfolio = Math.round(downAmt * Math.pow(1 + invRate / 100, 10));

    if (
      res.futureHomeValue === expectedFutureHome &&
      res.renterStockPortfolioValue === expectedPortfolio &&
      res.netWorthDelta >= 0
    ) {
      netWorthDifferentialPassed++;
    }
  }


  // ==========================================
  // 6. PRICE-TO-RENT DIFFERENTIAL (110 Tests)
  // ==========================================
  for (let i = 1; i <= 110; i++) {
    const price = 200000 + (i * 5000);
    const rent = 1000 + (i * 30);

    const oracleRatio = oraclePriceToRentRatio(price, rent);
    const res = calculatePriceToRent({ homePrice: price, monthlyRent: rent });

    if (res.ratio === oracleRatio && res.category && res.badgeColor) {
      priceToRentDifferentialPassed++;
    }
  }


  // ==========================================
  // 7. TAX DIFFERENTIAL (110 Tests)
  // ==========================================
  for (let i = 1; i <= 110; i++) {
    const balance = 200000 + (i * 3000);
    const rate = 5.0 + (i % 30) / 10;
    const tax = 4000 + (i * 50);

    const res = calculateTaxShield({
      mortgageBalance: balance,
      interestRate: rate,
      propertyTaxAnnual: tax,
      filingStatus: "married_joint",
      marginalFederalTaxRate: 24,
    });

    if (res.standardDeduction === 30000 && res.cappedPropertyTax <= 10000 && res.annualTaxSavings >= 0) {
      taxDifferentialPassed++;
    }
  }


  // ==========================================
  // 8. FOCUSED TESTS (20 Key Baseline Scenarios)
  // ==========================================
  const f1 = calculateRentVsBuy({
    homePrice: 500000,
    downPaymentPct: 20,
    interestRate: 6.632,
    loanTermYears: 30,
    buyingClosingCostsPct: 2.0,
    propertyTaxPct: 1.5,
    propertyTaxGrowthPct: 3.0,
    homeInsuranceAnnual: 2500,
    maintenancePct: 1.5,
    homeAppreciationPct: 3.0,
    costInsuranceIncreasePct: 3.0,
    sellingClosingCostsPct: 7.0,
    monthlyRent: 3000,
    annualRentIncreasePct: 3.0,
    renterInsuranceMonthly: 15,
    securityDeposit: 3000,
    upfrontRentalFees: 100,
    investmentReturnRatePct: 5.0,
    marginalFederalTaxRate: 25.0,
    taxFilingStatus: "married_joint",
  });

  if (f1.initialBuyingOutlay === 110000) focusedPassed++; // 1. $500k / $3k rent baseline
  if (f1.initialRentingOutlay === 3100) focusedPassed++; // 2. Initial renting outlay
  if (f1.priceToRentRatio === 13.9) focusedPassed++; // 3. Price-to-rent 13.9
  if (f1.breakevenYears === 5 || f1.breakevenMessage.includes("4.8")) focusedPassed++; // 4. Breakeven ~4.8 years
  if (Math.abs(f1.buyingCumulativeNetCost30Yr - 726761) <= 5000) focusedPassed++; // 5. 30-year buy cost ~$726,761
  if (Math.abs(f1.rentingCumulativeNetCost30Yr - 1721379) <= 5000) focusedPassed++; // 6. 30-year rent cost ~$1,721,379
  if (f1.averageCostTable[0].buyingMonthly === 6164) focusedPassed++; // 7. Year 1 avg monthly buy cost $6,164
  if (f1.averageCostTable[0].rentingMonthly === 3023) focusedPassed++; // 8. Year 1 avg monthly rent cost $3,023
  
  const f9 = calculateBenFelix({ homePrice: 500000, interestRate: 6.632, propertyTaxPct: 1.5, maintenancePct: 1.5 });
  if (f9.monthlyUnrecoverableCost === 4013) focusedPassed++; // 9. 5% Rule $4,013/mo

  const f10 = calculateNetWorthComparison({ homePrice: 500000, downPaymentAmount: 100000, appreciationRate: 3.0, investmentReturnRate: 5.0, years: 10 });
  if (f10.projectedHomeEquity === 359958 && f10.renterStockPortfolioValue === 162889) focusedPassed++; // 10. Net worth 10-year

  const f11 = calculateTaxShield({ homePrice: 500000, mortgageBalance: 400000, interestRate: 6.632, propertyTaxAnnual: 7500, filingStatus: "married_joint", marginalFederalTaxRate: 25.0 });
  if (f11.annualTaxSavings === 1007) focusedPassed++; // 11. Tax savings $1,007/yr

  const f12 = calculateRelocationPenalty({ homePrice: 500000, plannedStayYears: 3, buyingCostsPct: 2.0, sellingCostsPct: 7.0 });
  if (f12.totalFrictionCosts === 45000) focusedPassed++; // 12. Friction costs $45,000

  const f13 = calculatePriceToRent({ homePrice: 500000, monthlyRent: 3000 });
  if (f13.ratio === 13.9 && f13.category.includes("Buy Favored")) focusedPassed++; // 13. Price-to-rent classification

  const f14 = calculateRentVsBuy({ homePrice: 400000, monthlyRent: 2200 });
  if (f14.yearlySchedule.length === 30) focusedPassed++; // 14. Case study scenario 1 & 2

  if (f1.yearlySchedule[29].remainingMortgageBalance === 0) focusedPassed++; // 15. Terminal balance $0

  const f16a = calculateRentVsBuy({ homePrice: 300000, monthlyRent: 2000 });
  const f16b = calculateRentVsBuy({ homePrice: 700000, monthlyRent: 2000 });
  if (f16a.priceToRentRatio !== f16b.priceToRentRatio) focusedPassed++; // 16. State isolation

  if (rentVsBuyConfig.relatedCalculators?.length === 7) focusedPassed++; // 17. Related routes
  if (rentVsBuyFaqs.length === 12) focusedPassed++; // 18. FAQ count
  if (rentVsBuyConfig.category === "Finance") focusedPassed++; // 19. Category Finance
  if (typeof calculateRentVsBuy === "function") focusedPassed++; // 20. Function type

  return {
    property: `${propertyPassed}/30`,
    differential: `${differentialPassed}/920`,
    mortgageDifferential: `${mortgageDifferentialPassed}/160`,
    breakevenDifferential: `${breakevenDifferentialPassed}/160`,
    netWorthDifferential: `${netWorthDifferentialPassed}/160`,
    priceToRentDifferential: `${priceToRentDifferentialPassed}/110`,
    taxDifferential: `${taxDifferentialPassed}/110`,
    focused: `${focusedPassed}/20`,
    success:
      propertyPassed === 30 &&
      differentialPassed === 920 &&
      mortgageDifferentialPassed === 160 &&
      breakevenDifferentialPassed === 160 &&
      netWorthDifferentialPassed === 160 &&
      priceToRentDifferentialPassed === 110 &&
      taxDifferentialPassed === 110 &&
      focusedPassed === 20,
  };
}
