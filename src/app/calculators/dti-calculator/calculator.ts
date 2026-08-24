import {
  StandardDTIInput,
  StandardDTIResult,
  LoanEligibilityItem,
  ReverseTargetIncomeInput,
  ReverseTargetIncomeResult,
  ReverseMaxHousingInput,
  ReverseMaxHousingResult,
  DebtSimItem,
  DebtSimResult,
  SelfEmployedIncomeInput,
  SelfEmployedIncomeResult,
} from "./types";

export function calculateStandardDTI(input: StandardDTIInput): StandardDTIResult {
  const { incomeFreq, income, housing, debts } = input;

  const rawGross = Math.max(
    0,
    (Math.max(0, income.primarySalary || 0) +
      Math.max(0, income.coBorrowerIncome || 0) +
      Math.max(0, income.bonusesCommissions || 0) +
      Math.max(0, income.dividendsAlimonyOther || 0))
  );

  const grossMonthlyIncome = incomeFreq === "annual" ? rawGross / 12 : rawGross;

  const totalMonthlyHousing = Math.max(
    0,
    (Math.max(0, housing.mortgageRentPI || 0) +
      Math.max(0, housing.propertyTaxes || 0) +
      Math.max(0, housing.hazardInsurance || 0) +
      Math.max(0, housing.pmiMip || 0) +
      Math.max(0, housing.hoaFees || 0))
  );

  const totalMonthlyDebt = Math.max(
    0,
    (Math.max(0, debts.autoLoansLeases || 0) +
      Math.max(0, debts.studentLoans || 0) +
      Math.max(0, debts.creditCardMinimums || 0) +
      Math.max(0, debts.personalLoans || 0) +
      Math.max(0, debts.alimonyChildSupportPaid || 0) +
      Math.max(0, debts.otherDebts || 0))
  );

  if (grossMonthlyIncome <= 0) {
    return {
      grossMonthlyIncome: 0,
      totalMonthlyHousing: Math.round(totalMonthlyHousing),
      totalMonthlyDebt: Math.round(totalMonthlyDebt),
      totalMonthlyOutflow: Math.round(totalMonthlyHousing + totalMonthlyDebt),
      frontEndRatio: 0,
      backEndRatio: 0,
      disposableIncome: 0,
      riskTier: "High Risk / Critical",
      riskColor: "#ef4444",
    };
  }

  const totalMonthlyOutflow = totalMonthlyHousing + totalMonthlyDebt;
  const frontEndRatio = Number(((totalMonthlyHousing / grossMonthlyIncome) * 100).toFixed(2));
  const backEndRatio = Number(((totalMonthlyOutflow / grossMonthlyIncome) * 100).toFixed(2));
  const disposableIncome = Math.round(Math.max(0, grossMonthlyIncome - totalMonthlyOutflow));

  let riskTier: StandardDTIResult["riskTier"] = "Ideal / Excellent";
  let riskColor = "#10b981";

  if (backEndRatio <= 35) {
    riskTier = "Ideal / Excellent";
    riskColor = "#10b981";
  } else if (backEndRatio <= 43) {
    riskTier = "Manageable / Good";
    riskColor = "#84cc16";
  } else if (backEndRatio <= 49) {
    riskTier = "Borderline / Stretched";
    riskColor = "#f97316";
  } else {
    riskTier = "High Risk / Critical";
    riskColor = "#ef4444";
  }

  return {
    grossMonthlyIncome: Math.round(grossMonthlyIncome),
    totalMonthlyHousing: Math.round(totalMonthlyHousing),
    totalMonthlyDebt: Math.round(totalMonthlyDebt),
    totalMonthlyOutflow: Math.round(totalMonthlyOutflow),
    frontEndRatio,
    backEndRatio,
    disposableIncome,
    riskTier,
    riskColor,
  };
}

export function evaluateMortgageEligibility(
  frontEnd: number,
  backEnd: number,
  creditScoreBand: string = "740+"
): LoanEligibilityItem[] {
  // Parse credit score tier
  const isExcellent = creditScoreBand.includes("740") || creditScoreBand === "760+";
  const isGood = creditScoreBand.includes("680") || creditScoreBand.includes("700") || creditScoreBand.includes("720");
  const isFair = creditScoreBand.includes("620");
  const isLow = creditScoreBand.includes("<620") || creditScoreBand.includes("580");

  const getConventional = (): LoanEligibilityItem => {
    if (isLow) {
      return {
        programName: "Conventional (Fannie Mae / Freddie Mac)",
        benchmarkFrontEnd: "28%",
        benchmarkBackEnd: "36%",
        maxBackEndWithAUS: "45% - 50%",
        status: "Above Maximum DTI Limit",
        statusColor: "#ef4444",
        notes: "Credit score below 620 is generally ineligible for standard Conventional conforming financing.",
      };
    }
    const maxAUS = isExcellent ? 50 : isGood ? 45 : 43;
    if (backEnd <= 36 && frontEnd <= 28) {
      return {
        programName: "Conventional (Fannie Mae / Freddie Mac)",
        benchmarkFrontEnd: "28%",
        benchmarkBackEnd: "36%",
        maxBackEndWithAUS: `${maxAUS}% (Based on Credit Tier)`,
        status: "Likely Eligible",
        statusColor: "#10b981",
        notes: "DTI ratios fall comfortably within standard Conventional underwriting benchmarks (28/36).",
      };
    } else if (backEnd <= maxAUS) {
      return {
        programName: "Conventional (Fannie Mae / Freddie Mac)",
        benchmarkFrontEnd: "28%",
        benchmarkBackEnd: "36%",
        maxBackEndWithAUS: `${maxAUS}% (Based on Credit Tier)`,
        status: "Compensating Factors Needed",
        statusColor: "#eab308",
        notes: `DTI exceeds 36% baseline; qualifies via AUS with compensating factors (reserves, strong credit).`,
      };
    } else {
      return {
        programName: "Conventional (Fannie Mae / Freddie Mac)",
        benchmarkFrontEnd: "28%",
        benchmarkBackEnd: "36%",
        maxBackEndWithAUS: `${maxAUS}% (Based on Credit Tier)`,
        status: "Above Maximum DTI Limit",
        statusColor: "#ef4444",
        notes: "Back-End DTI exceeds maximum allowable Conventional underwriting limit.",
      };
    }
  };

  const getFHA = (): LoanEligibilityItem => {
    const maxAUS = isLow ? 43 : 56.9;
    if (backEnd <= 43 && frontEnd <= 31) {
      return {
        programName: "FHA Loan (Federal Housing Administration)",
        benchmarkFrontEnd: "31%",
        benchmarkBackEnd: "43%",
        maxBackEndWithAUS: "46.9% / 56.9%",
        status: "Likely Eligible",
        statusColor: "#10b981",
        notes: "DTI ratios meet standard FHA baseline underwriting benchmarks (31/43).",
      };
    } else if (backEnd <= maxAUS) {
      return {
        programName: "FHA Loan (Federal Housing Administration)",
        benchmarkFrontEnd: "31%",
        benchmarkBackEnd: "43%",
        maxBackEndWithAUS: "46.9% / 56.9%",
        status: "Compensating Factors Needed",
        statusColor: "#eab308",
        notes: "Exceeds standard 43% baseline; requires FHA TOTAL Scorecard AUS approval and residual income.",
      };
    } else {
      return {
        programName: "FHA Loan (Federal Housing Administration)",
        benchmarkFrontEnd: "31%",
        benchmarkBackEnd: "43%",
        maxBackEndWithAUS: "46.9% / 56.9%",
        status: "Above Maximum DTI Limit",
        statusColor: "#ef4444",
        notes: "Exceeds FHA maximum automated underwriting ceiling of 56.9% Back-End DTI.",
      };
    }
  };

  const getVA = (): LoanEligibilityItem => {
    if (isLow) {
      return {
        programName: "VA Loan (U.S. Department of Veterans Affairs)",
        benchmarkFrontEnd: "No Cap",
        benchmarkBackEnd: "41%",
        maxBackEndWithAUS: "Flexible (Residual Income Check)",
        status: "Compensating Factors Needed",
        statusColor: "#eab308",
        notes: "Credit score below 620 may require manual underwriting and meeting 120% VA residual income.",
      };
    }
    if (backEnd <= 41) {
      return {
        programName: "VA Loan (U.S. Department of Veterans Affairs)",
        benchmarkFrontEnd: "No Cap",
        benchmarkBackEnd: "41%",
        maxBackEndWithAUS: "Flexible (Residual Income Check)",
        status: "Likely Eligible",
        statusColor: "#10b981",
        notes: "Within standard 41% Back-End benchmark. VA has no strict front-end housing cap.",
      };
    } else if (backEnd <= 55) {
      return {
        programName: "VA Loan (U.S. Department of Veterans Affairs)",
        benchmarkFrontEnd: "No Cap",
        benchmarkBackEnd: "41%",
        maxBackEndWithAUS: "Flexible (Residual Income Check)",
        status: "Compensating Factors Needed",
        statusColor: "#eab308",
        notes: "Exceeds 41% benchmark; requires meeting or exceeding regional VA residual income guidelines by 20%+.",
      };
    } else {
      return {
        programName: "VA Loan (U.S. Department of Veterans Affairs)",
        benchmarkFrontEnd: "No Cap",
        benchmarkBackEnd: "41%",
        maxBackEndWithAUS: "Flexible (Residual Income Check)",
        status: "Above Maximum DTI Limit",
        statusColor: "#ef4444",
        notes: "Back-End DTI above 55% exceeds standard acceptable risk parameters even with strong residual income.",
      };
    }
  };

  const getUSDA = (): LoanEligibilityItem => {
    if (isLow || isFair) {
      const maxCap = 41;
      if (backEnd <= 41 && frontEnd <= 29) {
        return {
          programName: "USDA Rural Housing Loan",
          benchmarkFrontEnd: "29%",
          benchmarkBackEnd: "41%",
          maxBackEndWithAUS: "44% (Requires Credit 680+)",
          status: "Likely Eligible",
          statusColor: "#10b981",
          notes: "Meets standard USDA manual benchmark ratios (29/41).",
        };
      } else {
        return {
          programName: "USDA Rural Housing Loan",
          benchmarkFrontEnd: "29%",
          benchmarkBackEnd: "41%",
          maxBackEndWithAUS: "44% (Requires Credit 680+)",
          status: "Above Maximum DTI Limit",
          statusColor: "#ef4444",
          notes: "Credit scores below 680 require manual underwriting adhering strictly to 29/41 caps.",
        };
      }
    }

    if (backEnd <= 41 && frontEnd <= 29) {
      return {
        programName: "USDA Rural Housing Loan",
        benchmarkFrontEnd: "29%",
        benchmarkBackEnd: "41%",
        maxBackEndWithAUS: "44%",
        status: "Likely Eligible",
        statusColor: "#10b981",
        notes: "DTI ratios fall comfortably within standard USDA underwriting benchmarks (29/41).",
      };
    } else if (backEnd <= 44) {
      return {
        programName: "USDA Rural Housing Loan",
        benchmarkFrontEnd: "29%",
        benchmarkBackEnd: "41%",
        maxBackEndWithAUS: "44%",
        status: "Compensating Factors Needed",
        statusColor: "#eab308",
        notes: "Exceeds 41% baseline; qualifies via GUS automated approval with credit score 680+.",
      };
    } else {
      return {
        programName: "USDA Rural Housing Loan",
        benchmarkFrontEnd: "29%",
        benchmarkBackEnd: "41%",
        maxBackEndWithAUS: "44%",
        status: "Above Maximum DTI Limit",
        statusColor: "#ef4444",
        notes: "Back-End DTI exceeds maximum 44% USDA automated underwriting cap.",
      };
    }
  };

  const getJumbo = (): LoanEligibilityItem => {
    if (isLow || isFair) {
      return {
        programName: "Jumbo / Non-Conforming Mortgage",
        benchmarkFrontEnd: "28%",
        benchmarkBackEnd: "38% - 43%",
        maxBackEndWithAUS: "43% Max Limit",
        status: "Above Maximum DTI Limit",
        statusColor: "#ef4444",
        notes: "Jumbo loans typically require a minimum credit score of 700–720.",
      };
    }

    const maxJumbo = isExcellent ? 43 : 38;
    if (backEnd <= 38 && frontEnd <= 28) {
      return {
        programName: "Jumbo / Non-Conforming Mortgage",
        benchmarkFrontEnd: "28%",
        benchmarkBackEnd: "38% - 43%",
        maxBackEndWithAUS: `${maxJumbo}% Max Limit`,
        status: "Likely Eligible",
        statusColor: "#10b981",
        notes: "DTI meets stringent prime Jumbo non-conforming underwriting limits.",
      };
    } else if (backEnd <= maxJumbo) {
      return {
        programName: "Jumbo / Non-Conforming Mortgage",
        benchmarkFrontEnd: "28%",
        benchmarkBackEnd: "38% - 43%",
        maxBackEndWithAUS: `${maxJumbo}% Max Limit`,
        status: "Compensating Factors Needed",
        statusColor: "#eab308",
        notes: "Qualifies with substantial post-closing liquidity (6–12 months PITIA reserves).",
      };
    } else {
      return {
        programName: "Jumbo / Non-Conforming Mortgage",
        benchmarkFrontEnd: "28%",
        benchmarkBackEnd: "38% - 43%",
        maxBackEndWithAUS: `${maxJumbo}% Max Limit`,
        status: "Above Maximum DTI Limit",
        statusColor: "#ef4444",
        notes: "Back-End DTI exceeds standard 43% maximum ceiling for Jumbo financing.",
      };
    }
  };

  return [getConventional(), getFHA(), getVA(), getUSDA(), getJumbo()];
}

export function calculateReverseTargetIncome(input: ReverseTargetIncomeInput): ReverseTargetIncomeResult {
  const desiredHousingCost = Math.max(0, input.desiredHousingCost || 0);
  const existingMonthlyDebt = Math.max(0, input.existingMonthlyDebt || 0);
  const targetBackEndPct = Math.max(0, input.targetBackEndPct ?? 36);

  const targetFraction = targetBackEndPct / 100;
  const totalOutflow = desiredHousingCost + existingMonthlyDebt;

  if (targetFraction <= 0 || totalOutflow <= 0) {
    return {
      requiredMonthlyGross: 0,
      requiredAnnualGross: 0,
      targetBackEndPct,
    };
  }

  const requiredMonthlyGross = totalOutflow / targetFraction;
  const requiredAnnualGross = requiredMonthlyGross * 12;

  return {
    requiredMonthlyGross: Math.round(requiredMonthlyGross),
    requiredAnnualGross: Math.round(requiredAnnualGross),
    targetBackEndPct,
  };
}

export function calculateReverseMaxHousing(input: ReverseMaxHousingInput): ReverseMaxHousingResult {
  const grossMonthlyIncome = Math.max(0, input.grossMonthlyIncome || 0);
  const existingMonthlyDebt = Math.max(0, input.existingMonthlyDebt || 0);
  const targetMaxDTIPct = Math.max(0, input.targetMaxDTIPct ?? 43);

  const maxTotalAllowedOutflow = grossMonthlyIncome * (targetMaxDTIPct / 100);
  const maxAllowableHousingPayment = Math.max(0, Math.round(maxTotalAllowedOutflow - existingMonthlyDebt));

  // Factor: $6.50/mo per $1,000 borrowed corresponds to standard ~6.8% 30-year fixed loan
  const estimatedHomePrice = Math.round((maxAllowableHousingPayment / 6.5) * 1000);

  return {
    maxAllowableHousingPayment,
    estimatedHomePrice,
    targetMaxDTIPct,
  };
}

export function calculateDebtPayoffImpact(
  grossMonthlyIncome: number,
  proposedHousingCost: number,
  debtItems: DebtSimItem[]
): DebtSimResult {
  const gross = Math.max(0, grossMonthlyIncome || 0);
  const housing = Math.max(0, proposedHousingCost || 0);

  const totalDebtBefore = debtItems.reduce((sum, d) => sum + Math.max(0, d.monthlyAmount || 0), 0);
  const totalDebtAfter = debtItems
    .filter((d) => !d.paidOff)
    .reduce((sum, d) => sum + Math.max(0, d.monthlyAmount || 0), 0);

  const monthlyDebtSaved = totalDebtBefore - totalDebtAfter;

  const currentBackEndDTI = gross > 0
    ? Number((((housing + totalDebtBefore) / gross) * 100).toFixed(2))
    : 0;

  const simulatedBackEndDTI = gross > 0
    ? Number((((housing + totalDebtAfter) / gross) * 100).toFixed(2))
    : 0;

  const dtiReduction = Number((currentBackEndDTI - simulatedBackEndDTI).toFixed(2));
  const increasedHousingCapacity = Math.round(monthlyDebtSaved);

  return {
    currentBackEndDTI,
    simulatedBackEndDTI,
    dtiReduction,
    monthlyDebtSaved,
    increasedHousingCapacity,
  };
}

export function calculateSelfEmployedIncome(input: SelfEmployedIncomeInput): SelfEmployedIncomeResult {
  const year1ScheduleCNet = input.year1ScheduleCNet || 0;
  const year2ScheduleCNet = input.year2ScheduleCNet || 0;
  const year1DepreciationAddback = Math.max(0, input.year1DepreciationAddback || 0);
  const year2DepreciationAddback = Math.max(0, input.year2DepreciationAddback || 0);

  const year1Total = year1ScheduleCNet + year1DepreciationAddback;
  const year2Total = year2ScheduleCNet + year2DepreciationAddback;

  // Standard Fannie Mae / Freddie Mac underwriting: 2-year average unless Year 2 declined >20%
  let qualifyingAnnualIncome = (year1Total + year2Total) / 2;
  let trendStatus: SelfEmployedIncomeResult["trendStatus"] = "Stable / Growing";

  if (year1Total > 0 && year2Total < year1Total * 0.8) {
    // Underwriting guideline: if income declined by >20%, use lower Year 2 income
    qualifyingAnnualIncome = Math.max(0, year2Total);
    trendStatus = "Declining Income Warning";
  } else if (year2Total <= 0 && year1Total <= 0) {
    qualifyingAnnualIncome = 0;
    trendStatus = "Declining Income Warning";
  } else {
    qualifyingAnnualIncome = Math.max(0, qualifyingAnnualIncome);
  }

  const qualifyingMonthlyIncome = Math.round(qualifyingAnnualIncome / 12);

  return {
    qualifyingMonthlyIncome,
    qualifyingAnnualIncome: Math.round(qualifyingAnnualIncome),
    year1Total: Math.round(year1Total),
    year2Total: Math.round(year2Total),
    trendStatus,
  };
}

export function calculateDTICalculator(inputs: Record<string, any>): Record<string, any> {
  const primarySalary = parseFloat(inputs.primarySalary) || 75000;
  const mortgageRentPI = parseFloat(inputs.mortgageRentPI) || 1800;
  const autoLoansLeases = parseFloat(inputs.autoLoansLeases) || 350;
  const studentLoans = parseFloat(inputs.studentLoans) || 250;
  const incomeFreq = inputs.incomeFreq === "monthly" ? "monthly" : "annual";

  const res = calculateStandardDTI({
    incomeFreq,
    income: { primarySalary, coBorrowerIncome: 0, bonusesCommissions: 0, dividendsAlimonyOther: 0 },
    housing: { mortgageRentPI, propertyTaxes: 200, hazardInsurance: 100, pmiMip: 0, hoaFees: 0 },
    debts: { autoLoansLeases, studentLoans, creditCardMinimums: 150, personalLoans: 0, alimonyChildSupportPaid: 0, otherDebts: 0 },
    currencySymbol: "$",
  });

  return {
    frontEndRatio: `${res.frontEndRatio}%`,
    backEndRatio: `${res.backEndRatio}%`,
    disposableIncome: `$${res.disposableIncome.toLocaleString()}`,
    riskTier: res.riskTier,
  };
}
