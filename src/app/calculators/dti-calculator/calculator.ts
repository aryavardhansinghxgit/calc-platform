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

  const rawGross =
    (income.primarySalary || 0) +
    (income.coBorrowerIncome || 0) +
    (income.bonusesCommissions || 0) +
    (income.dividendsAlimonyOther || 0);

  const grossMonthlyIncome = incomeFreq === "annual" ? rawGross / 12 : rawGross;

  const totalMonthlyHousing =
    (housing.mortgageRentPI || 0) +
    (housing.propertyTaxes || 0) +
    (housing.hazardInsurance || 0) +
    (housing.pmiMip || 0) +
    (housing.hoaFees || 0);

  const totalMonthlyDebt =
    (debts.autoLoansLeases || 0) +
    (debts.studentLoans || 0) +
    (debts.creditCardMinimums || 0) +
    (debts.personalLoans || 0) +
    (debts.alimonyChildSupportPaid || 0) +
    (debts.otherDebts || 0);

  if (grossMonthlyIncome <= 0) {
    return {
      grossMonthlyIncome: 0,
      totalMonthlyHousing: 0,
      totalMonthlyDebt: 0,
      totalMonthlyOutflow: 0,
      frontEndRatio: 0,
      backEndRatio: 0,
      disposableIncome: 0,
      riskTier: "Ideal / Excellent",
      riskColor: "#10b981",
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
  creditScoreBand: string = "720+"
): LoanEligibilityItem[] {
  const getStatus = (
    fCap: number,
    bCap: number,
    bMaxComp: number
  ): { status: LoanEligibilityItem["status"]; statusColor: string; notes: string } => {
    if (backEnd <= bCap && (fCap === 0 || frontEnd <= fCap)) {
      return {
        status: "Likely Eligible",
        statusColor: "#10b981",
        notes: "DTI ratios fall comfortably within standard underwriting benchmarks.",
      };
    } else if (backEnd <= bMaxComp) {
      return {
        status: "Compensating Factors Needed",
        statusColor: "#eab308",
        notes: "DTI exceeds standard baseline but qualifies with high credit score, cash reserves, or AUS approval.",
      };
    } else {
      return {
        status: "Above Maximum DTI Limit",
        statusColor: "#ef4444",
        notes: "DTI exceeds maximum allowable underwriting ceiling. Debt reduction required.",
      };
    }
  };

  return [
    {
      programName: "Conventional (Fannie Mae / Freddie Mac)",
      benchmarkFrontEnd: "28%",
      benchmarkBackEnd: "36%",
      maxBackEndWithAUS: "45% - 50%",
      ...getStatus(28, 36, 50),
    },
    {
      programName: "FHA Loan (Federal Housing Administration)",
      benchmarkFrontEnd: "31%",
      benchmarkBackEnd: "43%",
      maxBackEndWithAUS: "46.9% / 56.9%",
      ...getStatus(31, 43, 56.9),
    },
    {
      programName: "VA Loan (U.S. Department of Veterans Affairs)",
      benchmarkFrontEnd: "No Cap",
      benchmarkBackEnd: "41%",
      maxBackEndWithAUS: "Flexible (Residual Income Check)",
      ...getStatus(0, 41, 55),
    },
    {
      programName: "USDA Rural Housing Loan",
      benchmarkFrontEnd: "29%",
      benchmarkBackEnd: "41%",
      maxBackEndWithAUS: "44%",
      ...getStatus(29, 41, 44),
    },
    {
      programName: "Jumbo / Non-Conforming Mortgage",
      benchmarkFrontEnd: "28%",
      benchmarkBackEnd: "38% - 43%",
      maxBackEndWithAUS: "43%",
      ...getStatus(28, 38, 43),
    },
  ];
}

export function calculateReverseTargetIncome(input: ReverseTargetIncomeInput): ReverseTargetIncomeResult {
  const { desiredHousingCost, existingMonthlyDebt, targetBackEndPct = 36 } = input;
  const targetFraction = (targetBackEndPct || 36) / 100;
  const totalOutflow = desiredHousingCost + existingMonthlyDebt;

  const requiredMonthlyGross = targetFraction > 0 ? totalOutflow / targetFraction : 0;
  const requiredAnnualGross = requiredMonthlyGross * 12;

  return {
    requiredMonthlyGross: Math.round(requiredMonthlyGross),
    requiredAnnualGross: Math.round(requiredAnnualGross),
    targetBackEndPct,
  };
}

export function calculateReverseMaxHousing(input: ReverseMaxHousingInput): ReverseMaxHousingResult {
  const { grossMonthlyIncome, existingMonthlyDebt, targetMaxDTIPct = 43 } = input;
  const maxTotalAllowedOutflow = grossMonthlyIncome * (targetMaxDTIPct / 100);
  const maxAllowableHousingPayment = Math.max(0, Math.round(maxTotalAllowedOutflow - existingMonthlyDebt));

  // Rough estimation: $1,000 monthly housing ~ $150,000 home price at ~6.5% 30yr mortgage
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
  const totalDebtBefore = debtItems.reduce((sum, d) => sum + d.monthlyAmount, 0);
  const totalDebtAfter = debtItems
    .filter((d) => !d.paidOff)
    .reduce((sum, d) => sum + d.monthlyAmount, 0);

  const monthlyDebtSaved = totalDebtBefore - totalDebtAfter;

  const currentBackEndDTI = grossMonthlyIncome > 0
    ? Number((((proposedHousingCost + totalDebtBefore) / grossMonthlyIncome) * 100).toFixed(2))
    : 0;

  const simulatedBackEndDTI = grossMonthlyIncome > 0
    ? Number((((proposedHousingCost + totalDebtAfter) / grossMonthlyIncome) * 100).toFixed(2))
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
  const { year1ScheduleCNet, year2ScheduleCNet, year1DepreciationAddback = 0, year2DepreciationAddback = 0 } = input;

  const year1Total = year1ScheduleCNet + year1DepreciationAddback;
  const year2Total = year2ScheduleCNet + year2DepreciationAddback;

  // Standard underwriting: 2-year average unless Year 2 declined >20%
  let qualifyingAnnualIncome = (year1Total + year2Total) / 2;
  let trendStatus: SelfEmployedIncomeResult["trendStatus"] = "Stable / Growing";

  if (year2Total < year1Total * 0.8) {
    // Underwriting rule: if declining significantly, lower year is used
    qualifyingAnnualIncome = year2Total;
    trendStatus = "Declining Income Warning";
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

  const res = calculateStandardDTI({
    incomeFreq: "annual",
    income: { primarySalary, coBorrowerIncome: 0, bonusesCommissions: 0, dividendsAlimonyOther: 0 },
    housing: { mortgageRentPI, propertyTaxes: 200, hazardInsurance: 100, pmiMip: 0, hoaFees: 0 },
    debts: { autoLoansLeases, studentLoans, creditCardMinimums: 100, personalLoans: 0, alimonyChildSupportPaid: 0, otherDebts: 0 },
    currencySymbol: "$",
  });

  return {
    frontEndRatio: `${res.frontEndRatio}%`,
    backEndRatio: `${res.backEndRatio}%`,
    disposableIncome: `$${res.disposableIncome.toLocaleString()}`,
    riskTier: res.riskTier,
  };
}
