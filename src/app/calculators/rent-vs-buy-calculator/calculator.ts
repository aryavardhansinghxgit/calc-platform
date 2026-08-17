import {
  RentVsBuyInput,
  RentVsBuyResult,
  YearlyComparisonRow,
  NetWorthComparisonInput,
  NetWorthComparisonResult,
  PriceToRentInput,
  PriceToRentResult,
  TaxShieldInput,
  TaxShieldResult,
  BenFelixInput,
  BenFelixResult,
  RelocationPenaltyInput,
  RelocationPenaltyResult,
} from "./types";

export function calculateRentVsBuy(input: RentVsBuyInput): RentVsBuyResult {
  const {
    homePrice = 500000,
    downPaymentPct = 20,
    loanTermYears = 30,
    interestRate = 6.632,
    buyingClosingCostsPct = 2.0,
    sellingClosingCostsPct = 7.0,
    propertyTaxAnnual = 7500,
    propertyTaxGrowthPct = 3.0,
    homeInsuranceAnnual = 2500,
    hoaDuesMonthly = 0,
    maintenancePct = 1.5,
    homeAppreciationPct = 3.0,
    monthlyRent = 3000,
    annualRentIncreasePct = 3.0,
    renterInsuranceMonthly = 15,
    securityDeposit = 3000,
    upfrontRentalFees = 100,
    inflationRatePct = 3.0,
    investmentReturnRatePct = 5.0,
    taxFilingStatus = "married_joint",
    marginalTaxRatePct = 25.0,
    itemizeDeductions = true,
  } = input;

  const downPaymentAmount = (homePrice * downPaymentPct) / 100;
  const initialLoanAmount = Math.max(0, homePrice - downPaymentAmount);
  const buyingClosingCosts = (homePrice * buyingClosingCostsPct) / 100;
  const initialBuyingOutlay = downPaymentAmount + buyingClosingCosts;
  const initialRentingOutlay = securityDeposit + upfrontRentalFees;

  const monthlyMortgageRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;
  const monthlyPI =
    initialLoanAmount > 0 && monthlyMortgageRate > 0
      ? (initialLoanAmount * monthlyMortgageRate * Math.pow(1 + monthlyMortgageRate, totalMonths)) /
        (Math.pow(1 + monthlyMortgageRate, totalMonths) - 1)
      : 0;

  const annualPI = monthlyPI * 12;
  const monthlyInvRate = investmentReturnRatePct / 100 / 12;
  const priceToRentRatio = Number((homePrice / (monthlyRent * 12)).toFixed(1));

  // Amortization tracking arrays for mortgage balance & interest per year
  const yearlyInterestPaid: number[] = [];
  const yearlyPrincipalPaid: number[] = [];
  const endingLoanBalance: number[] = [];

  let balance = initialLoanAmount;
  for (let y = 1; y <= 30; y++) {
    let yearInt = 0;
    let yearPrin = 0;
    for (let m = 1; m <= 12; m++) {
      if (balance <= 0.01) break;
      const mInt = balance * monthlyMortgageRate;
      const mPrin = Math.min(balance, monthlyPI - mInt);
      yearInt += mInt;
      yearPrin += mPrin;
      balance = Math.max(0, balance - mPrin);
    }
    yearlyInterestPaid.push(yearInt);
    yearlyPrincipalPaid.push(yearPrin);
    endingLoanBalance.push(balance);
  }

  // Pro-Forma 30-Year Simulation
  const yearlySchedule: YearlyComparisonRow[] = [];

  let currentHomeVal = homePrice;
  let currentPropTax = propertyTaxAnnual;
  let currentInsurance = homeInsuranceAnnual;
  let currentHoaMonthly = hoaDuesMonthly;
  let currentMaintenance = (homePrice * maintenancePct) / 100;

  let currentMonthlyRent = monthlyRent;
  let currentRenterIns = renterInsuranceMonthly;

  let cumBuyingNetCost = initialBuyingOutlay;
  let cumRentingNetCost = initialRentingOutlay;

  // Renter opportunity stock portfolio starting with initial down payment + closing costs
  let renterPortfolio = initialBuyingOutlay - initialRentingOutlay;

  let breakevenYear = 0;
  let breakevenMonth = 0;

  for (let y = 1; y <= 30; y++) {
    const isMortgageActive = y <= loanTermYears;
    const pmtPI = isMortgageActive ? annualPI : 0;
    const intPaid = isMortgageActive ? yearlyInterestPaid[y - 1] : 0;
    const remBalance = isMortgageActive ? endingLoanBalance[y - 1] : 0;

    // Tax shield calculation
    let annualTaxSavings = 0;
    if (itemizeDeductions) {
      const stdDed = taxFilingStatus === "single" ? 15000 : 30000;
      const saltTaxCapped = Math.min(10000, currentPropTax);
      const totalItemized = intPaid + saltTaxCapped;
      if (totalItemized > stdDed) {
        annualTaxSavings = (totalItemized - stdDed) * (marginalTaxRatePct / 100);
      }
    }

    const buyingAnnualOutlay =
      pmtPI + currentPropTax + currentInsurance + (currentHoaMonthly * 12) + currentMaintenance - annualTaxSavings;
    const rentingAnnualOutlay = (currentMonthlyRent * 12) + (currentRenterIns * 12);

    // Update Home Equity & Selling proceeds if sold in Year y
    currentHomeVal = currentHomeVal * (1 + homeAppreciationPct / 100);
    const homeEquity = Math.max(0, currentHomeVal - remBalance);
    const sellingCosts = (currentHomeVal * sellingClosingCostsPct) / 100;
    const netSaleProceeds = currentHomeVal - remBalance - sellingCosts;

    cumBuyingNetCost += buyingAnnualOutlay;
    const currentBuyingNetCostIfSold = Math.round(cumBuyingNetCost - netSaleProceeds);

    // Update Renter Portfolio & Cash flow differential investment
    renterPortfolio = renterPortfolio * (1 + investmentReturnRatePct / 100);
    const cashFlowDiff = buyingAnnualOutlay - rentingAnnualOutlay;
    if (cashFlowDiff > 0) {
      renterPortfolio += cashFlowDiff; // Renter invests surplus cash flow
    }

    cumRentingNetCost += rentingAnnualOutlay;
    const currentRentingNetCost = Math.round(cumRentingNetCost - securityDeposit);

    // Check for breakeven crossover point
    if (breakevenYear === 0 && currentBuyingNetCostIfSold < currentRentingNetCost) {
      breakevenYear = y;
      breakevenMonth = Math.round((y - 0.5) * 12) % 12 || 6;
    }

    yearlySchedule.push({
      year: y,
      homeValue: Math.round(currentHomeVal),
      remainingMortgageBalance: Math.round(remBalance),
      homeEquity: Math.round(homeEquity),
      buyingAnnualOutlay: Math.round(buyingAnnualOutlay),
      buyingCumulativeNetCost: currentBuyingNetCostIfSold,
      rentingAnnualOutlay: Math.round(rentingAnnualOutlay),
      rentingCumulativeNetCost: currentRentingNetCost,
      renterPortfolioValue: Math.round(renterPortfolio),
      cheaperOption: currentBuyingNetCostIfSold < currentRentingNetCost ? "Buy" : "Rent",
    });

    // Escalate annual inflation metrics
    currentPropTax = currentPropTax * (1 + propertyTaxGrowthPct / 100);
    currentInsurance = currentInsurance * (1 + inflationRatePct / 100);
    currentHoaMonthly = currentHoaMonthly * (1 + inflationRatePct / 100);
    currentMaintenance = currentMaintenance * (1 + inflationRatePct / 100);
    currentMonthlyRent = currentMonthlyRent * (1 + annualRentIncreasePct / 100);
    currentRenterIns = currentRenterIns * (1 + inflationRatePct / 100);
  }

  const finalRow = yearlySchedule[29];
  const isBuyCheaperAt30Years = finalRow.buyingCumulativeNetCost < finalRow.rentingCumulativeNetCost;
  const netWealthDifference30Yr = Math.abs(finalRow.homeEquity - finalRow.renterPortfolioValue);

  const breakevenMessage = breakevenYear > 0
    ? `Buying is cheaper if you stay for ${breakevenYear} years or longer. Otherwise, renting is cheaper.`
    : "Renting remains cheaper over the entire 30-year stay under these assumptions.";

  return {
    breakevenYears: breakevenYear || 30,
    breakevenMonths: breakevenMonth,
    breakevenMessage,
    isBuyCheaperAt30Years,
    buyingCumulativeNetCost30Yr: finalRow.buyingCumulativeNetCost,
    rentingCumulativeNetCost30Yr: finalRow.rentingCumulativeNetCost,
    netWealthDifference30Yr: Math.round(netWealthDifference30Yr),
    averageMonthlyBuyingCost: Math.round(finalRow.buyingAnnualOutlay / 12),
    averageMonthlyRentingCost: Math.round(finalRow.rentingAnnualOutlay / 12),
    initialBuyingOutlay: Math.round(initialBuyingOutlay),
    initialRentingOutlay: Math.round(initialRentingOutlay),
    priceToRentRatio,
    yearlySchedule,
  };
}

export function calculateNetWorthComparison(input: NetWorthComparisonInput): NetWorthComparisonResult {
  const {
    homePrice = 500000,
    downPaymentAmount = 100000,
    appreciationRate = 3.0,
    investmentReturnRate = 7.0,
    years = 10,
  } = input;

  const futureHomeValue = Math.round(homePrice * Math.pow(1 + appreciationRate / 100, years));
  const remainingMortgage = Math.max(0, (homePrice - downPaymentAmount) * (1 - years * 0.022));
  const projectedHomeEquity = Math.round(futureHomeValue - remainingMortgage);

  const renterStockPortfolioValue = Math.round(
    downPaymentAmount * Math.pow(1 + investmentReturnRate / 100, years)
  );

  const netWorthDelta = Math.abs(projectedHomeEquity - renterStockPortfolioValue);
  const netWorthAdvantage = projectedHomeEquity > renterStockPortfolioValue ? "Home Equity (Buying)" : "Stock Portfolio (Renting)";

  return {
    futureHomeValue,
    projectedHomeEquity,
    renterStockPortfolioValue,
    netWorthAdvantage,
    netWorthDelta,
  };
}

export function calculatePriceToRent(input: PriceToRentInput): PriceToRentResult {
  const { homePrice = 500000, monthlyRent = 3000 } = input;
  const annualRent = monthlyRent * 12;
  const ratio = annualRent > 0 ? Number((homePrice / annualRent).toFixed(1)) : 0;

  if (ratio <= 15) {
    return {
      ratio,
      category: "Buy Favored (1-15)",
      badgeColor: "bg-emerald-600 text-white",
      explanation: "Home prices are low relative to rent. Buying is significantly more advantageous.",
    };
  } else if (ratio <= 20) {
    return {
      ratio,
      category: "Neutral (16-20)",
      badgeColor: "bg-amber-500 text-white",
      explanation: "Balanced market. The decision depends heavily on your planned length of stay and local market growth.",
    };
  } else {
    return {
      ratio,
      category: "Rent Favored (21+)",
      badgeColor: "bg-red-600 text-white",
      explanation: "Home prices are very high relative to rent. Renting and investing the surplus yields higher returns.",
    };
  }
}

export function calculateTaxShield(input: TaxShieldInput): TaxShieldResult {
  const {
    homePrice = 500000,
    mortgageBalance = 400000,
    interestRate = 6.5,
    propertyTaxAnnual = 7500,
    filingStatus = "married_joint",
    marginalTaxRatePct = 24.0,
  } = input;

  const annualMortgageInterest = Math.round(mortgageBalance * (interestRate / 100));
  const cappedPropertyTax = Math.min(10000, propertyTaxAnnual);
  const totalItemizedDeductions = annualMortgageInterest + cappedPropertyTax;
  const standardDeduction = filingStatus === "single" ? 15000 : 30000;

  const netItemizedBenefit = Math.max(0, totalItemizedDeductions - standardDeduction);
  const annualTaxSavings = Math.round(netItemizedBenefit * (marginalTaxRatePct / 100));

  const explanation =
    annualTaxSavings > 0
      ? `Itemized deductions exceed the ${filingStatus === "single" ? "$15,000" : "$30,000"} standard deduction by $${netItemizedBenefit.toLocaleString()}, saving ~$${annualTaxSavings.toLocaleString()}/year.`
      : `Standard deduction ($${standardDeduction.toLocaleString()}) is higher than itemized deductions ($${totalItemizedDeductions.toLocaleString()}). No extra tax savings.`;

  return {
    annualMortgageInterest,
    cappedPropertyTax,
    totalItemizedDeductions,
    standardDeduction,
    netItemizedBenefit,
    annualTaxSavings,
    explanation,
  };
}

export function calculateBenFelix(input: BenFelixInput): BenFelixResult {
  const { homePrice = 500000, interestRate = 6.5, propertyTaxPct = 1.5, maintenancePct = 1.0 } = input;

  const totalUnrecoverablePct = interestRate + propertyTaxPct + maintenancePct;
  const annualUnrecoverableCost = Math.round(homePrice * (totalUnrecoverablePct / 100));
  const monthlyUnrecoverableCost = Math.round(annualUnrecoverableCost / 12);
  const maxAdvantageousMonthlyRent = monthlyUnrecoverableCost;

  const explanation = `Under Ben Felix's 5% Rule, the unrecoverable cost of owning this $${homePrice.toLocaleString()} home is ~${totalUnrecoverablePct.toFixed(1)}% ($${monthlyUnrecoverableCost.toLocaleString()}/mo). If you can rent a comparable home for less than $${maxAdvantageousMonthlyRent.toLocaleString()}/mo, renting is mathematically superior.`;

  return {
    annualUnrecoverableCost,
    monthlyUnrecoverableCost,
    maxAdvantageousMonthlyRent,
    explanation,
  };
}

export function calculateRelocationPenalty(input: RelocationPenaltyInput): RelocationPenaltyResult {
  const { homePrice = 500000, plannedStayYears = 3, buyingCostsPct = 2.0, sellingCostsPct = 7.0 } = input;

  const buyFees = (homePrice * buyingCostsPct) / 100;
  const sellFees = (homePrice * sellingCostsPct) / 100;
  const totalFrictionCosts = Math.round(buyFees + sellFees);
  const monthlyAmortizedDrag = Math.round(totalFrictionCosts / (plannedStayYears * 12));

  let recommendation = "Renting is Stronger (Relocation friction fees outpace short-term equity creation)";
  if (plannedStayYears >= 7) {
    recommendation = "Buying is Worth It (Long stay horizon allows equity buildup to absorb closing fees)";
  }

  return {
    totalFrictionCosts,
    monthlyAmortizedDrag,
    recommendation,
  };
}

export function calculateRentVsBuyCalculator(inputs: Record<string, any>): Record<string, any> {
  const homePrice = parseFloat(inputs.homePrice) || 500000;
  const monthlyRent = parseFloat(inputs.monthlyRent) || 3000;

  const res = calculateRentVsBuy({
    homePrice,
    downPaymentPct: 20,
    loanTermYears: 30,
    interestRate: 6.632,
    buyingClosingCostsPct: 2.0,
    sellingClosingCostsPct: 7.0,
    propertyTaxAnnual: 7500,
    propertyTaxGrowthPct: 3.0,
    homeInsuranceAnnual: 2500,
    hoaDuesMonthly: 0,
    maintenancePct: 1.5,
    homeAppreciationPct: 3.0,
    monthlyRent,
    annualRentIncreasePct: 3.0,
    renterInsuranceMonthly: 15,
    securityDeposit: monthlyRent,
    upfrontRentalFees: 100,
    inflationRatePct: 3.0,
    investmentReturnRatePct: 5.0,
    taxFilingStatus: "married_joint",
    marginalTaxRatePct: 25.0,
    itemizeDeductions: true,
    currencySymbol: "$",
  });

  return {
    breakevenMessage: res.breakevenMessage,
    buyingCumulativeNetCost30Yr: `$${res.buyingCumulativeNetCost30Yr.toLocaleString()}`,
    rentingCumulativeNetCost30Yr: `$${res.rentingCumulativeNetCost30Yr.toLocaleString()}`,
    priceToRentRatio: res.priceToRentRatio.toString(),
  };
}
