import {
  SpouseIncomeInputs,
  MarriageTaxInputs,
  SingleTaxProfile,
  ThreeWayTaxComparison,
  IncomeRatioSimulationPoint,
} from "./types";

/**
 * 2025/2026 Tax Parameter Constants
 */
const STD_DEDUCTION = {
  single: 15000,
  mfj: 30000,
  mfs: 15000,
  hoh: 22500,
};

const FED_BRACKETS_SINGLE = [
  { cap: 11600, rate: 0.10 },
  { cap: 47150, rate: 0.12 },
  { cap: 100525, rate: 0.22 },
  { cap: 191950, rate: 0.24 },
  { cap: 243725, rate: 0.32 },
  { cap: 609350, rate: 0.35 },
  { cap: Infinity, rate: 0.37 },
];

const FED_BRACKETS_MFJ = [
  { cap: 23200, rate: 0.10 },
  { cap: 94300, rate: 0.12 },
  { cap: 201050, rate: 0.22 },
  { cap: 383900, rate: 0.24 },
  { cap: 487450, rate: 0.32 },
  { cap: 731200, rate: 0.35 },
  { cap: Infinity, rate: 0.37 },
];

const FED_BRACKETS_MFS = [
  { cap: 11600, rate: 0.10 },
  { cap: 47150, rate: 0.12 },
  { cap: 100525, rate: 0.22 },
  { cap: 191950, rate: 0.24 },
  { cap: 243725, rate: 0.32 },
  { cap: 365600, rate: 0.35 },
  { cap: Infinity, rate: 0.37 },
];

const SS_WAGE_CAP = 168600;

function computeProgressiveTax(taxableIncome: number, brackets: { cap: number; rate: number }[]): number {
  if (taxableIncome <= 0) return 0;
  let tax = 0;
  let prev = 0;
  for (const b of brackets) {
    if (taxableIncome > prev) {
      const amtInBracket = Math.min(taxableIncome, b.cap) - prev;
      tax += amtInBracket * b.rate;
      prev = b.cap;
    }
  }
  return tax;
}

function computeCapGainsTax(
  ordinaryTaxable: number,
  capGains: number,
  filingStatus: "single" | "mfj" | "mfs"
): number {
  if (capGains <= 0) return 0;
  const zeroThreshold = filingStatus === "mfj" ? 94050 : 47025;
  const fifteenThreshold = filingStatus === "mfj" ? 583750 : 518900;

  const totalIncome = ordinaryTaxable + capGains;
  let tax = 0;

  // Portion in 0% bracket
  const zeroCapRoom = Math.max(0, zeroThreshold - ordinaryTaxable);
  const gainsInZero = Math.min(capGains, zeroCapRoom);
  const remainingGains1 = capGains - gainsInZero;

  if (remainingGains1 > 0) {
    const startForFifteen = ordinaryTaxable + gainsInZero;
    const fifteenRoom = Math.max(0, fifteenThreshold - startForFifteen);
    const gainsInFifteen = Math.min(remainingGains1, fifteenRoom);
    tax += gainsInFifteen * 0.15;

    const gainsInTwenty = remainingGains1 - gainsInFifteen;
    if (gainsInTwenty > 0) {
      tax += gainsInTwenty * 0.20;
    }
  }

  return tax;
}

export function calculateTaxForProfile(
  inputs: SpouseIncomeInputs,
  filingStatus: "single" | "mfj" | "mfs",
  stateTaxRate: number = 0.05
): SingleTaxProfile {
  const salary = Math.abs(inputs.salaryW2 || 0);
  const seIncome = Math.abs(inputs.selfEmployment || 0);
  const invIncome = Math.abs(inputs.investmentIncome || 0);
  const ltCapGains = Math.abs(inputs.longTermCapGains || 0);
  const otherIncome = Math.abs(inputs.otherTaxableIncome || 0);

  const grossIncome = salary + seIncome + invIncome + ltCapGains + otherIncome;

  // FICA / Self-Employment Taxes
  const seNet = seIncome * 0.9235;
  const seSsTax = Math.min(seNet, Math.max(0, SS_WAGE_CAP - salary)) * 0.124;
  const seMedTax = seNet * 0.029;
  const seTax = seSsTax + seMedTax;
  const seDeduction = seTax * 0.5;

  const employeeSsTax = Math.min(salary, SS_WAGE_CAP) * 0.062;
  const employeeMedTax = salary * 0.0145;
  const ficaAndSeTax = employeeSsTax + employeeMedTax + seTax;

  // Above-the-line Adjustments to Income
  const retirement = Math.abs(inputs.preTaxRetirement || 0);
  const hsa = Math.abs(inputs.hsaFsa || 0);
  const studentLoan = Math.min(2500, Math.abs(inputs.studentLoanInterest || 0));
  const otherAdj = Math.abs(inputs.otherAdjustments || 0);

  const totalAdjustments = retirement + hsa + studentLoan + otherAdj + seDeduction;
  const agi = Math.max(0, grossIncome - totalAdjustments);

  // Deductions: Standard vs Itemized
  let standardDed = STD_DEDUCTION[filingStatus];
  let itemizedDed = 0;

  if (inputs.useItemizedDeduction) {
    const mortgage = Math.abs(inputs.mortgageInterest || 0);
    const saltCap = filingStatus === "mfs" ? 5000 : 10000;
    const salt = Math.min(saltCap, Math.abs(inputs.saltPaid || 0));
    const charity = Math.abs(inputs.charitableGifts || 0);
    const medical = Math.max(0, Math.abs(inputs.medicalExpenses || 0) - agi * 0.075);

    itemizedDed = mortgage + salt + charity + medical;
  }

  const deductions = Math.max(standardDed, itemizedDed);
  const totalTaxable = Math.max(0, agi - deductions);

  // Separate ordinary taxable income and capital gains
  const taxableCapGains = Math.min(ltCapGains, totalTaxable);
  const taxableOrdinary = totalTaxable - taxableCapGains;

  // Base Federal Ordinary Tax
  const brackets =
    filingStatus === "mfj"
      ? FED_BRACKETS_MFJ
      : filingStatus === "mfs"
      ? FED_BRACKETS_MFS
      : FED_BRACKETS_SINGLE;

  const ordinaryTax = computeProgressiveTax(taxableOrdinary, brackets);
  const capGainsTax = computeCapGainsTax(taxableOrdinary, taxableCapGains, filingStatus);
  const baseFederalTax = ordinaryTax + capGainsTax;

  // Surtaxes: Additional Medicare Tax & NIIT
  const medicareThreshold =
    filingStatus === "mfj" ? 250000 : filingStatus === "mfs" ? 125000 : 200000;
  const earnedWages = salary + (inputs.isSelfEmployed ? seNet : 0);
  const additionalMedicareTax = Math.max(0, earnedWages - medicareThreshold) * 0.009;

  const niitThreshold =
    filingStatus === "mfj" ? 250000 : filingStatus === "mfs" ? 125000 : 200000;
  const netInvestmentIncome = invIncome + ltCapGains;
  const magiExcess = Math.max(0, agi - niitThreshold);
  const niitTax = Math.min(netInvestmentIncome, magiExcess) * 0.038;

  // Child Tax Credit ($2,000 per qualifying child)
  const ctcPhaseoutThreshold =
    filingStatus === "mfj" ? 400000 : filingStatus === "mfs" ? 200000 : 200000;
  const numChildren = Math.max(0, inputs.numChildrenCTC || 0);
  const baseCtc = numChildren * 2000;
  const ctcPhaseout = Math.max(0, Math.floor((Math.max(0, agi - ctcPhaseoutThreshold)) / 1000) * 50);
  const totalCredits = Math.max(0, baseCtc - ctcPhaseout);

  // State Tax
  const stateTax = taxableOrdinary * stateTaxRate;

  const totalTax = Math.max(0, baseFederalTax + additionalMedicareTax + niitTax - totalCredits) + ficaAndSeTax + stateTax;
  const effectiveTaxRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;

  return {
    grossIncome: Math.round(grossIncome),
    agi: Math.round(agi),
    deductions: Math.round(deductions),
    taxableOrdinaryIncome: Math.round(taxableOrdinary),
    taxableCapGainsIncome: Math.round(taxableCapGains),
    federalIncomeTax: Math.round(baseFederalTax),
    ficaAndSeTax: Math.round(ficaAndSeTax),
    niitTax: Math.round(niitTax),
    additionalMedicareTax: Math.round(additionalMedicareTax),
    totalCredits: Math.round(totalCredits),
    totalTax: Math.round(totalTax),
    effectiveTaxRate: Math.round(effectiveTaxRate * 10) / 10,
  };
}

/**
 * 1. Three-Way Tax Comparison Engine (Singles vs MFJ vs MFS)
 */
export function calculateThreeWayComparison(inputs: MarriageTaxInputs): ThreeWayTaxComparison {
  const stateRate = (inputs.stateTaxRatePercent || 5.0) / 100;

  // 1. Two Singles Calculation
  const sp1Single = calculateTaxForProfile(inputs.spouse1, "single", stateRate);
  const sp2Single = calculateTaxForProfile(inputs.spouse2, "single", stateRate);

  const twoSinglesCombined: SingleTaxProfile & { spouse1Tax: number; spouse2Tax: number } = {
    grossIncome: sp1Single.grossIncome + sp2Single.grossIncome,
    agi: sp1Single.agi + sp2Single.agi,
    deductions: sp1Single.deductions + sp2Single.deductions,
    taxableOrdinaryIncome: sp1Single.taxableOrdinaryIncome + sp2Single.taxableOrdinaryIncome,
    taxableCapGainsIncome: sp1Single.taxableCapGainsIncome + sp2Single.taxableCapGainsIncome,
    federalIncomeTax: sp1Single.federalIncomeTax + sp2Single.federalIncomeTax,
    ficaAndSeTax: sp1Single.ficaAndSeTax + sp2Single.ficaAndSeTax,
    niitTax: sp1Single.niitTax + sp2Single.niitTax,
    additionalMedicareTax: sp1Single.additionalMedicareTax + sp2Single.additionalMedicareTax,
    totalCredits: sp1Single.totalCredits + sp2Single.totalCredits,
    totalTax: sp1Single.totalTax + sp2Single.totalTax,
    effectiveTaxRate:
      sp1Single.grossIncome + sp2Single.grossIncome > 0
        ? Math.round(((sp1Single.totalTax + sp2Single.totalTax) / (sp1Single.grossIncome + sp2Single.grossIncome)) * 1000) / 10
        : 0,
    spouse1Tax: sp1Single.totalTax,
    spouse2Tax: sp2Single.totalTax,
  };

  // 2. Married Filing Jointly (MFJ) Combined Inputs
  const mfjInputs: SpouseIncomeInputs = {
    salaryW2: inputs.spouse1.salaryW2 + inputs.spouse2.salaryW2,
    selfEmployment: inputs.spouse1.selfEmployment + inputs.spouse2.selfEmployment,
    investmentIncome: inputs.spouse1.investmentIncome + inputs.spouse2.investmentIncome,
    longTermCapGains: inputs.spouse1.longTermCapGains + inputs.spouse2.longTermCapGains,
    otherTaxableIncome: inputs.spouse1.otherTaxableIncome + inputs.spouse2.otherTaxableIncome,
    preTaxRetirement: inputs.spouse1.preTaxRetirement + inputs.spouse2.preTaxRetirement,
    hsaFsa: inputs.spouse1.hsaFsa + inputs.spouse2.hsaFsa,
    studentLoanInterest: inputs.spouse1.studentLoanInterest + inputs.spouse2.studentLoanInterest,
    otherAdjustments: inputs.spouse1.otherAdjustments + inputs.spouse2.otherAdjustments,
    useItemizedDeduction: inputs.spouse1.useItemizedDeduction || inputs.spouse2.useItemizedDeduction,
    mortgageInterest: inputs.spouse1.mortgageInterest + inputs.spouse2.mortgageInterest,
    saltPaid: inputs.spouse1.saltPaid + inputs.spouse2.saltPaid,
    charitableGifts: inputs.spouse1.charitableGifts + inputs.spouse2.charitableGifts,
    medicalExpenses: inputs.spouse1.medicalExpenses + inputs.spouse2.medicalExpenses,
    numChildrenCTC: inputs.spouse1.numChildrenCTC + inputs.spouse2.numChildrenCTC,
    childCareExpenses: inputs.spouse1.childCareExpenses + inputs.spouse2.childCareExpenses,
    isSelfEmployed: inputs.spouse1.isSelfEmployed || inputs.spouse2.isSelfEmployed,
  };
  const mfj = calculateTaxForProfile(mfjInputs, "mfj", stateRate);

  // 3. Married Filing Separately (MFS)
  const sp1Mfs = calculateTaxForProfile(inputs.spouse1, "mfs", stateRate);
  const sp2Mfs = calculateTaxForProfile(inputs.spouse2, "mfs", stateRate);
  const mfsCombined: SingleTaxProfile & { spouse1Tax: number; spouse2Tax: number } = {
    grossIncome: sp1Mfs.grossIncome + sp2Mfs.grossIncome,
    agi: sp1Mfs.agi + sp2Mfs.agi,
    deductions: sp1Mfs.deductions + sp2Mfs.deductions,
    taxableOrdinaryIncome: sp1Mfs.taxableOrdinaryIncome + sp2Mfs.taxableOrdinaryIncome,
    taxableCapGainsIncome: sp1Mfs.taxableCapGainsIncome + sp2Mfs.taxableCapGainsIncome,
    federalIncomeTax: sp1Mfs.federalIncomeTax + sp2Mfs.federalIncomeTax,
    ficaAndSeTax: sp1Mfs.ficaAndSeTax + sp2Mfs.ficaAndSeTax,
    niitTax: sp1Mfs.niitTax + sp2Mfs.niitTax,
    additionalMedicareTax: sp1Mfs.additionalMedicareTax + sp2Mfs.additionalMedicareTax,
    totalCredits: sp1Mfs.totalCredits + sp2Mfs.totalCredits,
    totalTax: sp1Mfs.totalTax + sp2Mfs.totalTax,
    effectiveTaxRate:
      sp1Mfs.grossIncome + sp2Mfs.grossIncome > 0
        ? Math.round(((sp1Mfs.totalTax + sp2Mfs.totalTax) / (sp1Mfs.grossIncome + sp2Mfs.grossIncome)) * 1000) / 10
        : 0,
    spouse1Tax: sp1Mfs.totalTax,
    spouse2Tax: sp2Mfs.totalTax,
  };

  // Difference: Positive = Marriage Penalty (MFJ pays more than Singles), Negative = Bonus (MFJ pays less)
  const diff = mfj.totalTax - twoSinglesCombined.totalTax;

  const isMarriagePenalty = diff > 25;
  const isMarriageBonus = diff < -25;
  const isNeutral = !isMarriagePenalty && !isMarriageBonus;

  // Specific penalty causes
  const saltSingles = Math.min(10000, inputs.spouse1.saltPaid || 0) + Math.min(10000, inputs.spouse2.saltPaid || 0);
  const saltMfj = Math.min(10000, (inputs.spouse1.saltPaid || 0) + (inputs.spouse2.saltPaid || 0));
  const saltCapLostDeduction = Math.max(0, saltSingles - saltMfj);

  const niitPenalty = Math.max(0, mfj.niitTax - twoSinglesCombined.niitTax);
  const medPenalty = Math.max(0, mfj.additionalMedicareTax - twoSinglesCombined.additionalMedicareTax);

  return {
    twoSinglesCombined,
    mfj,
    mfsCombined,
    differenceMFJvsSingles: Math.round(diff),
    isMarriageBonus,
    isMarriagePenalty,
    isNeutral,
    saltCapLostDeduction,
    niitPenaltyAmount: Math.round(niitPenalty),
    medicareSurtaxPenaltyAmount: Math.round(medPenalty),
  };
}

/**
 * 2. Income Ratio Simulation Generator
 */
export function simulateIncomeRatios(totalCombinedSalary: number): IncomeRatioSimulationPoint[] {
  const ratios = [
    { s1: 1.0, s2: 0.0, s1Label: 100, s2Label: 0 },
    { s1: 0.9, s2: 0.1, s1Label: 90, s2Label: 10 },
    { s1: 0.8, s2: 0.2, s1Label: 80, s2Label: 20 },
    { s1: 0.7, s2: 0.3, s1Label: 70, s2Label: 30 },
    { s1: 0.6, s2: 0.4, s1Label: 60, s2Label: 40 },
    { s1: 0.5, s2: 0.5, s1Label: 50, s2Label: 50 },
  ];

  return ratios.map((r) => {
    const s1Income = totalCombinedSalary * r.s1;
    const s2Income = totalCombinedSalary * r.s2;

    const baseSpouse: SpouseIncomeInputs = {
      salaryW2: 0,
      selfEmployment: 0,
      investmentIncome: 0,
      longTermCapGains: 0,
      otherTaxableIncome: 0,
      preTaxRetirement: 0,
      hsaFsa: 0,
      studentLoanInterest: 0,
      otherAdjustments: 0,
      useItemizedDeduction: false,
      mortgageInterest: 0,
      saltPaid: 0,
      charitableGifts: 0,
      medicalExpenses: 0,
      numChildrenCTC: 0,
      childCareExpenses: 0,
      isSelfEmployed: false,
    };

    const res = calculateThreeWayComparison({
      taxYear: "2025",
      spouse1: { ...baseSpouse, salaryW2: s1Income },
      spouse2: { ...baseSpouse, salaryW2: s2Income },
      stateTaxRatePercent: 0, // Federal only for pure bracket illustration
    });

    const bonusOrPenalty = -res.differenceMFJvsSingles; // Positive = bonus

    return {
      spouse1Percent: r.s1Label,
      spouse2Percent: r.s2Label,
      spouse1Income: Math.round(s1Income),
      spouse2Income: Math.round(s2Income),
      twoSinglesTax: res.twoSinglesCombined.federalIncomeTax,
      mfjTax: res.mfj.federalIncomeTax,
      bonusOrPenalty: Math.round(bonusOrPenalty),
    };
  });
}
