import {
  IncomeFrequency,
  AffordabilityRule,
  IncomeAffordabilityInput,
  IncomeAffordabilityResult,
  Budget503020Input,
  Budget503020Result,
  TrueCostInput,
  TrueCostResult,
  UpfrontCostInput,
  UpfrontCostResult,
  RoommateItem,
  RoommateSplitResult,
  RentVsBuyInput,
  RentVsBuyResult,
} from "./types";

export function calculateIncomeAffordability(input: IncomeAffordabilityInput): IncomeAffordabilityResult {
  const { incomeFrequency, grossIncome, hoursPerWeek = 40, monthlyDebt, rulePreset, customPercent = 30 } = input;

  let monthlyGross = 0;
  if (incomeFrequency === "annual") {
    monthlyGross = grossIncome / 12;
  } else if (incomeFrequency === "hourly") {
    monthlyGross = (grossIncome * hoursPerWeek * 52) / 12;
  } else {
    monthlyGross = grossIncome;
  }

  if (monthlyGross <= 0) {
    return {
      maxMonthlyRent: 0,
      recommendedLow: 0,
      recommendedHigh: 0,
      frontEndRatio: 0,
      backEndRatio: 0,
      remainingDiscretionary: 0,
      dtiStatus: "Comfortable",
      statusColor: "#10b981",
    };
  }

  let pct = 0.30;
  if (rulePreset === "25") pct = 0.25;
  else if (rulePreset === "30" || rulePreset === "40x") pct = 0.30;
  else if (rulePreset === "35") pct = 0.35;
  else if (rulePreset === "custom") pct = (customPercent || 30) / 100;

  const rentCapByRule = monthlyGross * pct;

  // DTI limits
  const maxMonthlyRent = Math.round(Math.max(0, rentCapByRule));
  const recommendedLow = Math.round(monthlyGross * 0.20);
  const recommendedHigh = Math.round(monthlyGross * 0.30);

  const frontEndRatio = Number(((maxMonthlyRent / monthlyGross) * 100).toFixed(1));
  const backEndRatio = Number((((maxMonthlyRent + monthlyDebt) / monthlyGross) * 100).toFixed(1));
  const remainingDiscretionary = Math.round(Math.max(0, monthlyGross - maxMonthlyRent - monthlyDebt));

  let dtiStatus: "Comfortable" | "Moderate" | "Rent-Burdened" | "Severely Rent-Burdened" = "Comfortable";
  let statusColor = "#10b981";

  if (frontEndRatio <= 28 && backEndRatio <= 36) {
    dtiStatus = "Comfortable";
    statusColor = "#10b981"; // green
  } else if (frontEndRatio <= 30 && backEndRatio <= 43) {
    dtiStatus = "Moderate";
    statusColor = "#eab308"; // yellow
  } else if (frontEndRatio <= 50) {
    dtiStatus = "Rent-Burdened";
    statusColor = "#f97316"; // orange
  } else {
    dtiStatus = "Severely Rent-Burdened";
    statusColor = "#ef4444"; // red
  }

  return {
    maxMonthlyRent,
    recommendedLow,
    recommendedHigh,
    frontEndRatio,
    backEndRatio,
    remainingDiscretionary,
    dtiStatus,
    statusColor,
  };
}

export function calculate503020Budget(input: Budget503020Input): Budget503020Result {
  const { monthlyTakeHome, needsPercent = 50, wantsPercent = 30, savingsPercent = 20 } = input;
  const needsAmount = Math.round((monthlyTakeHome * needsPercent) / 100);
  const wantsAmount = Math.round((monthlyTakeHome * wantsPercent) / 100);
  const savingsAmount = Math.round((monthlyTakeHome * savingsPercent) / 100);

  const maxRentFromNeeds = Math.round(monthlyTakeHome * 0.30);
  const utilitiesGroceriesFromNeeds = Math.max(0, needsAmount - maxRentFromNeeds);

  return {
    needsAmount,
    wantsAmount,
    savingsAmount,
    maxRentFromNeeds,
    utilitiesGroceriesFromNeeds,
  };
}

export function calculateTrueCostUtilities(input: TrueCostInput): TrueCostResult {
  const {
    baseRent,
    electricityGas,
    waterSewerTrash,
    internetCable,
    rentersInsurance,
    parkingFee,
    petRent,
    amenityHoaFee,
  } = input;

  const additionalOverhead =
    electricityGas +
    waterSewerTrash +
    internetCable +
    rentersInsurance +
    parkingFee +
    petRent +
    amenityHoaFee;

  const totalMonthlyOverhead = baseRent + additionalOverhead;
  const percentOverhead = baseRent > 0 ? Number(((additionalOverhead / baseRent) * 100).toFixed(1)) : 0;
  const annualOverhead = totalMonthlyOverhead * 12;

  return {
    totalMonthlyOverhead,
    additionalOverhead,
    percentOverhead,
    annualOverhead,
  };
}

export function calculateUpfrontMoveIn(input: UpfrontCostInput): UpfrontCostResult {
  const {
    monthlyBaseRent,
    securityDepositMonths,
    includeFirstMonth,
    includeLastMonth,
    applicationFees,
    movingExpenses,
    initialFurniture,
    utilityDeposits,
  } = input;

  const leasePrepayments =
    (includeFirstMonth ? monthlyBaseRent : 0) +
    (includeLastMonth ? monthlyBaseRent : 0) +
    monthlyBaseRent * securityDepositMonths;

  const oneTimeMoveInFees = applicationFees + movingExpenses + initialFurniture + utilityDeposits;
  const totalUpfrontCash = leasePrepayments + oneTimeMoveInFees;

  return {
    totalUpfrontCash,
    leasePrepayments,
    oneTimeMoveInFees,
  };
}

export function calculateRoommateSplit(totalRent: number, roommates: RoommateItem[]): RoommateSplitResult {
  if (!roommates || roommates.length === 0 || totalRent <= 0) {
    return { totalRent, roommates: [] };
  }

  const N = roommates.length;
  const equalShare = totalRent / N;
  const totalSqFt = roommates.reduce((sum, r) => sum + (r.squareFeet || 100), 0) || 1;

  // 50% split equally, 50% split by sqft + amenity weightings
  const baseEquallySplitTotal = totalRent * 0.5;
  const sqftSplitTotal = totalRent * 0.5;

  const rawScores = roommates.map((r) => {
    const sqftRatio = (r.squareFeet || 100) / totalSqFt;
    let amenityScore = 0;
    if (r.privateBathroom) amenityScore += 50;
    if (r.walkInCloset) amenityScore += 25;
    if (r.balconyAccess) amenityScore += 20;
    if (r.assignedParking) amenityScore += 40;
    return {
      id: r.id,
      name: r.name,
      baseSqftAmount: sqftSplitTotal * sqftRatio,
      amenityScore,
    };
  });

  const totalAmenityScore = rawScores.reduce((sum, s) => sum + s.amenityScore, 0);

  const calculatedRoommates = rawScores.map((s) => {
    let finalShare = baseEquallySplitTotal / N + s.baseSqftAmount;
    if (totalAmenityScore > 0) {
      // Adjust slightly by amenity score
      const amenityAdjustment = s.amenityScore - totalAmenityScore / N;
      finalShare += amenityAdjustment;
    }

    const calculatedRent = Math.max(0, Math.round(finalShare));
    return {
      id: s.id,
      name: s.name,
      calculatedRent,
      sharePercent: 0,
      deltaFromEqual: 0,
    };
  });

  const sumCalculated = calculatedRoommates.reduce((acc, curr) => acc + curr.calculatedRent, 0) || 1;

  const finalRoommates = calculatedRoommates.map((r) => {
    const adjustedRent = Math.round((r.calculatedRent / sumCalculated) * totalRent);
    const sharePercent = Number(((adjustedRent / totalRent) * 100).toFixed(1));
    const deltaFromEqual = Math.round(adjustedRent - equalShare);
    return {
      ...r,
      calculatedRent: adjustedRent,
      sharePercent,
      deltaFromEqual,
    };
  });

  return {
    totalRent,
    roommates: finalRoommates,
  };
}

export function calculateRentVsBuy(input: RentVsBuyInput): RentVsBuyResult {
  const {
    monthlyRent,
    annualRentIncreasePct = 3,
    homePrice,
    downPaymentPct = 20,
    mortgageRatePct = 6.5,
    loanTermYears = 30,
    propertyTaxRatePct = 1.2,
    annualHomeAppreciationPct = 4,
    investmentReturnPct = 7,
    analysisYears = 10,
  } = input;

  const downPayment = homePrice * (downPaymentPct / 100);
  const loanAmount = homePrice - downPayment;
  const monthlyRate = mortgageRatePct / 100 / 12;
  const totalMonths = loanTermYears * 12;

  const monthlyMortgagePnt =
    loanAmount > 0 && monthlyRate > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : 0;

  const monthlyPropTax = (homePrice * (propertyTaxRatePct / 100)) / 12;
  const monthlyMaintenance = (homePrice * 0.01) / 12;
  const buyerMonthlyOutflow = monthlyMortgagePnt + monthlyPropTax + monthlyMaintenance;

  // Renting investment simulation
  let renterInvestedBalance = downPayment;
  let totalRentPaid = 0;
  let currentMonthlyRent = monthlyRent;

  for (let yr = 1; yr <= analysisYears; yr++) {
    totalRentPaid += currentMonthlyRent * 12;
    renterInvestedBalance = renterInvestedBalance * (1 + investmentReturnPct / 100);
    // If buyer monthly outflow > rent, renter invests monthly difference
    const monthlyDiff = buyerMonthlyOutflow - currentMonthlyRent;
    if (monthlyDiff > 0) {
      renterInvestedBalance += monthlyDiff * 12;
    }
    currentMonthlyRent *= 1 + annualRentIncreasePct / 100;
  }

  const renterNetWorth = Math.round(renterInvestedBalance - totalRentPaid);

  // Homebuyer balance simulation
  let currentHomeValue = homePrice;
  let remainingLoanBalance = loanAmount;

  for (let month = 1; month <= analysisYears * 12; month++) {
    const interestPayment = remainingLoanBalance * monthlyRate;
    const principalPayment = monthlyMortgagePnt - interestPayment;
    remainingLoanBalance = Math.max(0, remainingLoanBalance - principalPayment);
  }

  currentHomeValue = homePrice * Math.pow(1 + annualHomeAppreciationPct / 100, analysisYears);
  const totalHomeEquity = currentHomeValue - remainingLoanBalance;
  const totalBuyerOutflow = buyerMonthlyOutflow * 12 * analysisYears + downPayment;
  const buyerNetWorth = Math.round(totalHomeEquity - totalBuyerOutflow);

  const netBenefitToBuying = buyerNetWorth - renterNetWorth;

  let breakevenYear: number | null = null;
  if (netBenefitToBuying > 0) {
    breakevenYear = Math.min(analysisYears, Math.max(3, Math.ceil(analysisYears / 2)));
  }

  return {
    renterNetWorth,
    buyerNetWorth,
    netBenefitToBuying,
    breakevenYear,
    totalRentPaid: Math.round(totalRentPaid),
    totalHomeEquity: Math.round(totalHomeEquity),
  };
}

export function calculateRentCalculator(inputs: Record<string, any>): Record<string, any> {
  const grossIncome = parseFloat(inputs.grossIncome) || 72000;
  const monthlyDebt = parseFloat(inputs.monthlyDebt) || 300;
  const incomeFreq = (inputs.incomeFrequency as IncomeFrequency) || "annual";
  const rulePreset = (inputs.rulePreset as AffordabilityRule) || "30";

  const result = calculateIncomeAffordability({
    incomeFrequency: incomeFreq,
    grossIncome,
    monthlyDebt,
    rulePreset,
    currency: "$",
  });

  return {
    maxMonthlyRent: `$${result.maxMonthlyRent.toLocaleString()}`,
    recommendedRange: `$${result.recommendedLow.toLocaleString()} - $${result.recommendedHigh.toLocaleString()}`,
    frontEndRatio: `${result.frontEndRatio}%`,
    backEndRatio: `${result.backEndRatio}%`,
    discretionaryIncome: `$${result.remainingDiscretionary.toLocaleString()}`,
    dtiStatus: result.dtiStatus,
  };
}
