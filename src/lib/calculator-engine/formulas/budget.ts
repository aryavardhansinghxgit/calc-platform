export interface FrequencyAmount {
  value: number;
  freq: "year" | "month";
}

export interface BudgetInputs {
  // Incomes
  salary?: FrequencyAmount;
  pension?: FrequencyAmount;
  investments?: FrequencyAmount;
  otherIncome?: FrequencyAmount;
  taxRate?: number; // percentage e.g. 28

  // Housing & Utilities
  mortgage?: FrequencyAmount;
  propertyTax?: FrequencyAmount;
  rental?: FrequencyAmount;
  housingInsurance?: FrequencyAmount;
  hoaFee?: FrequencyAmount;
  homeMaintenance?: FrequencyAmount;
  utilities?: FrequencyAmount;

  // Transportation
  autoLoan?: FrequencyAmount;
  autoInsurance?: FrequencyAmount;
  gasoline?: FrequencyAmount;
  autoMaintenance?: FrequencyAmount;
  parkingTolls?: FrequencyAmount;
  otherTransportation?: FrequencyAmount;

  // Other Debt & Loan Payments
  creditCard?: FrequencyAmount;
  studentLoan?: FrequencyAmount;
  otherLoans?: FrequencyAmount;

  // Living Expenses
  food?: FrequencyAmount;
  clothing?: FrequencyAmount;
  householdSupplies?: FrequencyAmount;
  mealsOut?: FrequencyAmount;
  otherLiving?: FrequencyAmount;

  // Healthcare
  medicalInsurance?: FrequencyAmount;
  medicalSpending?: FrequencyAmount;

  // Children & Education
  childCare?: FrequencyAmount;
  tuitionSupplies?: FrequencyAmount;
  childSupport?: FrequencyAmount;
  otherEducation?: FrequencyAmount;

  // Savings & Investments
  fourZeroOneK?: FrequencyAmount;
  collegeSavings?: FrequencyAmount;
  investmentSavings?: FrequencyAmount;
  emergencyFund?: FrequencyAmount;

  // Miscellaneous
  pet?: FrequencyAmount;
  giftsDonations?: FrequencyAmount;
  hobbiesSports?: FrequencyAmount;
  entertainment?: FrequencyAmount;
  travelVacation?: FrequencyAmount;
  otherMisc?: FrequencyAmount;
}

export interface CategorySummary {
  id: string;
  name: string;
  annual: number;
  monthly: number;
  pctOfAfterTaxIncome: number;
  pctOfExpenses: number;
  notes?: string;
}

export interface ItemSummary {
  id: string;
  category: string;
  label: string;
  annual: number;
  monthly: number;
  pctOfIncome: number;
  notes?: string;
}

export interface Rule503020Breakdown {
  needs: { actual: number; ideal: number; pctActual: number; targetPct: number };
  wants: { actual: number; ideal: number; pctActual: number; targetPct: number };
  savings: { actual: number; ideal: number; pctActual: number; targetPct: number };
}

export interface BudgetRecommendation {
  type: "warning" | "success" | "info" | "caution";
  category: string;
  title: string;
  message: string;
}

export interface BudgetCalculationResult {
  grossAnnualIncome: number;
  grossMonthlyIncome: number;
  afterTaxAnnualIncome: number;
  afterTaxMonthlyIncome: number;
  totalAnnualExpenses: number;
  totalMonthlyExpenses: number;
  netAnnualSurplus: number;
  netMonthlySurplus: number;
  frontEndDti: number;
  totalDti: number;
  dtiRating: "Excellent" | "Good" | "Acceptable" | "High" | "Critical";
  savingsRate: number;
  housingRatio: number;
  categories: CategorySummary[];
  itemizedBreakdown: ItemSummary[];
  rule503020: Rule503020Breakdown;
  recommendations: BudgetRecommendation[];
}

export function toAnnual(item?: FrequencyAmount): number {
  if (!item || isNaN(item.value) || item.value <= 0) return 0;
  return item.freq === "month" ? item.value * 12 : item.value;
}

export function toMonthly(item?: FrequencyAmount): number {
  if (!item || isNaN(item.value) || item.value <= 0) return 0;
  return item.freq === "year" ? item.value / 12 : item.value;
}

export function calculateBudget(inputs: BudgetInputs): BudgetCalculationResult {
  // 1. Incomes
  const salaryAnn = toAnnual(inputs.salary);
  const pensionAnn = toAnnual(inputs.pension);
  const investmentsAnn = toAnnual(inputs.investments);
  const otherIncomeAnn = toAnnual(inputs.otherIncome);

  const grossAnnualIncome = salaryAnn + pensionAnn + investmentsAnn + otherIncomeAnn;
  const grossMonthlyIncome = grossAnnualIncome / 12;

  const taxRate = Math.max(0, Math.min(100, inputs.taxRate ?? 28)) / 100;
  const taxAmountAnn = grossAnnualIncome * taxRate;
  const afterTaxAnnualIncome = Math.max(0, grossAnnualIncome - taxAmountAnn);
  const afterTaxMonthlyIncome = afterTaxAnnualIncome / 12;

  // 2. Housing & Utilities
  const mortgageAnn = toAnnual(inputs.mortgage);
  const propertyTaxAnn = toAnnual(inputs.propertyTax);
  const rentalAnn = toAnnual(inputs.rental);
  const housingInsuranceAnn = toAnnual(inputs.housingInsurance);
  const hoaFeeAnn = toAnnual(inputs.hoaFee);
  const homeMaintenanceAnn = toAnnual(inputs.homeMaintenance);
  const utilitiesAnn = toAnnual(inputs.utilities);
  const housingTotalAnn = mortgageAnn + propertyTaxAnn + rentalAnn + housingInsuranceAnn + hoaFeeAnn + homeMaintenanceAnn + utilitiesAnn;

  // 3. Transportation
  const autoLoanAnn = toAnnual(inputs.autoLoan);
  const autoInsuranceAnn = toAnnual(inputs.autoInsurance);
  const gasolineAnn = toAnnual(inputs.gasoline);
  const autoMaintenanceAnn = toAnnual(inputs.autoMaintenance);
  const parkingTollsAnn = toAnnual(inputs.parkingTolls);
  const otherTransAnn = toAnnual(inputs.otherTransportation);
  const transportTotalAnn = autoLoanAnn + autoInsuranceAnn + gasolineAnn + autoMaintenanceAnn + parkingTollsAnn + otherTransAnn;

  // 4. Other Debt & Loan Payments
  const creditCardAnn = toAnnual(inputs.creditCard);
  const studentLoanAnn = toAnnual(inputs.studentLoan);
  const otherLoansAnn = toAnnual(inputs.otherLoans);
  const debtTotalAnn = creditCardAnn + studentLoanAnn + otherLoansAnn;

  // 5. Living Expenses
  const foodAnn = toAnnual(inputs.food);
  const clothingAnn = toAnnual(inputs.clothing);
  const householdSuppliesAnn = toAnnual(inputs.householdSupplies);
  const mealsOutAnn = toAnnual(inputs.mealsOut);
  const otherLivingAnn = toAnnual(inputs.otherLiving);
  const livingTotalAnn = foodAnn + clothingAnn + householdSuppliesAnn + mealsOutAnn + otherLivingAnn;

  // 6. Healthcare
  const medicalInsuranceAnn = toAnnual(inputs.medicalInsurance);
  const medicalSpendingAnn = toAnnual(inputs.medicalSpending);
  const healthTotalAnn = medicalInsuranceAnn + medicalSpendingAnn;

  // 7. Children & Education
  const childCareAnn = toAnnual(inputs.childCare);
  const tuitionSuppliesAnn = toAnnual(inputs.tuitionSupplies);
  const childSupportAnn = toAnnual(inputs.childSupport);
  const otherEduAnn = toAnnual(inputs.otherEducation);
  const eduTotalAnn = childCareAnn + tuitionSuppliesAnn + childSupportAnn + otherEduAnn;

  // 8. Savings & Investments
  const fourZeroOneKAnn = toAnnual(inputs.fourZeroOneK);
  const collegeSavingsAnn = toAnnual(inputs.collegeSavings);
  const investmentSavingsAnn = toAnnual(inputs.investmentSavings);
  const emergencyFundAnn = toAnnual(inputs.emergencyFund);
  const savingsTotalAnn = fourZeroOneKAnn + collegeSavingsAnn + investmentSavingsAnn + emergencyFundAnn;

  // 9. Miscellaneous
  const petAnn = toAnnual(inputs.pet);
  const giftsAnn = toAnnual(inputs.giftsDonations);
  const hobbiesAnn = toAnnual(inputs.hobbiesSports);
  const entertainmentAnn = toAnnual(inputs.entertainment);
  const travelAnn = toAnnual(inputs.travelVacation);
  const otherMiscAnn = toAnnual(inputs.otherMisc);
  const miscTotalAnn = petAnn + giftsAnn + hobbiesAnn + entertainmentAnn + travelAnn + otherMiscAnn;

  const totalAnnualExpenses = housingTotalAnn + transportTotalAnn + debtTotalAnn + livingTotalAnn + healthTotalAnn + eduTotalAnn + savingsTotalAnn + miscTotalAnn;
  const totalMonthlyExpenses = totalAnnualExpenses / 12;

  const netAnnualSurplus = afterTaxAnnualIncome - totalAnnualExpenses;
  const netMonthlySurplus = afterTaxMonthlyIncome - totalMonthlyExpenses;

  // DTI Ratios
  const frontEndMonthlyHousing = (mortgageAnn + propertyTaxAnn + rentalAnn + housingInsuranceAnn + hoaFeeAnn) / 12;
  const frontEndDti = grossMonthlyIncome > 0 ? (frontEndMonthlyHousing / grossMonthlyIncome) * 100 : 0;

  const monthlyDebtService = (mortgageAnn + propertyTaxAnn + rentalAnn + housingInsuranceAnn + hoaFeeAnn + autoLoanAnn + creditCardAnn + studentLoanAnn + otherLoansAnn) / 12;
  const totalDti = grossMonthlyIncome > 0 ? (monthlyDebtService / grossMonthlyIncome) * 100 : 0;

  let dtiRating: "Excellent" | "Good" | "Acceptable" | "High" | "Critical" = "Good";
  if (totalDti <= 20) dtiRating = "Excellent";
  else if (totalDti <= 36) dtiRating = "Good";
  else if (totalDti <= 43) dtiRating = "Acceptable";
  else if (totalDti <= 50) dtiRating = "High";
  else dtiRating = "Critical";

  const savingsRate = afterTaxMonthlyIncome > 0 ? ((savingsTotalAnn / 12) / afterTaxMonthlyIncome) * 100 : 0;
  const housingRatio = grossMonthlyIncome > 0 ? ((housingTotalAnn / 12) / grossMonthlyIncome) * 100 : 0;

  // 50/30/20 Rule Breakdown
  // Needs: Housing, Transport, Debt, Healthcare, Childcare, Essential Food/Household
  const needsTotalMonthly = (housingTotalAnn + transportTotalAnn + debtTotalAnn + healthTotalAnn + eduTotalAnn + foodAnn + householdSuppliesAnn) / 12;
  // Wants: Meals out, Clothing, Hobbies, Entertainment, Travel, Pet, Misc
  const wantsTotalMonthly = (mealsOutAnn + clothingAnn + hobbiesAnn + entertainmentAnn + travelAnn + petAnn + giftsAnn + otherMiscAnn + otherLivingAnn) / 12;
  // Savings: Savings total
  const savingsTotalMonthly = savingsTotalAnn / 12;

  const rule503020: Rule503020Breakdown = {
    needs: {
      actual: needsTotalMonthly,
      ideal: afterTaxMonthlyIncome * 0.50,
      pctActual: afterTaxMonthlyIncome > 0 ? (needsTotalMonthly / afterTaxMonthlyIncome) * 100 : 0,
      targetPct: 50,
    },
    wants: {
      actual: wantsTotalMonthly,
      ideal: afterTaxMonthlyIncome * 0.30,
      pctActual: afterTaxMonthlyIncome > 0 ? (wantsTotalMonthly / afterTaxMonthlyIncome) * 100 : 0,
      targetPct: 30,
    },
    savings: {
      actual: savingsTotalMonthly,
      ideal: afterTaxMonthlyIncome * 0.20,
      pctActual: afterTaxMonthlyIncome > 0 ? (savingsTotalMonthly / afterTaxMonthlyIncome) * 100 : 0,
      targetPct: 20,
    },
  };

  // Category Summaries
  const categories: CategorySummary[] = [
    {
      id: "housing",
      name: "Housing & Utilities",
      annual: housingTotalAnn,
      monthly: housingTotalAnn / 12,
      pctOfAfterTaxIncome: afterTaxAnnualIncome > 0 ? (housingTotalAnn / afterTaxAnnualIncome) * 100 : 0,
      pctOfExpenses: totalAnnualExpenses > 0 ? (housingTotalAnn / totalAnnualExpenses) * 100 : 0,
      notes: housingRatio > 30 ? "Exceeds 30% rule of thumb" : "Healthy housing allocation",
    },
    {
      id: "transportation",
      name: "Transportation",
      annual: transportTotalAnn,
      monthly: transportTotalAnn / 12,
      pctOfAfterTaxIncome: afterTaxAnnualIncome > 0 ? (transportTotalAnn / afterTaxAnnualIncome) * 100 : 0,
      pctOfExpenses: totalAnnualExpenses > 0 ? (transportTotalAnn / totalAnnualExpenses) * 100 : 0,
      notes: "Auto loans, insurance, maintenance & fuel",
    },
    {
      id: "living",
      name: "Living Expenses",
      annual: livingTotalAnn,
      monthly: livingTotalAnn / 12,
      pctOfAfterTaxIncome: afterTaxAnnualIncome > 0 ? (livingTotalAnn / afterTaxAnnualIncome) * 100 : 0,
      pctOfExpenses: totalAnnualExpenses > 0 ? (livingTotalAnn / totalAnnualExpenses) * 100 : 0,
      notes: "Food, clothing, household & dining out",
    },
    {
      id: "debt",
      name: "Other Debt & Loan Payments",
      annual: debtTotalAnn,
      monthly: debtTotalAnn / 12,
      pctOfAfterTaxIncome: afterTaxAnnualIncome > 0 ? (debtTotalAnn / afterTaxAnnualIncome) * 100 : 0,
      pctOfExpenses: totalAnnualExpenses > 0 ? (debtTotalAnn / totalAnnualExpenses) * 100 : 0,
      notes: "Credit cards, student loans, personal loans",
    },
    {
      id: "healthcare",
      name: "Healthcare",
      annual: healthTotalAnn,
      monthly: healthTotalAnn / 12,
      pctOfAfterTaxIncome: afterTaxAnnualIncome > 0 ? (healthTotalAnn / afterTaxAnnualIncome) * 100 : 0,
      pctOfExpenses: totalAnnualExpenses > 0 ? (healthTotalAnn / totalAnnualExpenses) * 100 : 0,
      notes: "Insurance premiums & medical out-of-pocket",
    },
    {
      id: "education",
      name: "Children & Education",
      annual: eduTotalAnn,
      monthly: eduTotalAnn / 12,
      pctOfAfterTaxIncome: afterTaxAnnualIncome > 0 ? (eduTotalAnn / afterTaxAnnualIncome) * 100 : 0,
      pctOfExpenses: totalAnnualExpenses > 0 ? (eduTotalAnn / totalAnnualExpenses) * 100 : 0,
      notes: "Tuition, childcare & school supplies",
    },
    {
      id: "savings",
      name: "Savings & Investments",
      annual: savingsTotalAnn,
      monthly: savingsTotalAnn / 12,
      pctOfAfterTaxIncome: afterTaxAnnualIncome > 0 ? (savingsTotalAnn / afterTaxAnnualIncome) * 100 : 0,
      pctOfExpenses: totalAnnualExpenses > 0 ? (savingsTotalAnn / totalAnnualExpenses) * 100 : 0,
      notes: savingsRate < 15 ? "Recommend 15% or higher" : "Strong savings rate",
    },
    {
      id: "miscellaneous",
      name: "Miscellaneous Expenses",
      annual: miscTotalAnn,
      monthly: miscTotalAnn / 12,
      pctOfAfterTaxIncome: afterTaxAnnualIncome > 0 ? (miscTotalAnn / afterTaxAnnualIncome) * 100 : 0,
      pctOfExpenses: totalAnnualExpenses > 0 ? (miscTotalAnn / totalAnnualExpenses) * 100 : 0,
      notes: "Pets, travel, hobbies, entertainment",
    },
  ];

  // Itemized Breakdown
  const itemizedBreakdown: ItemSummary[] = [
    { id: "mortgage", category: "Housing", label: "Mortgage", annual: mortgageAnn, monthly: mortgageAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (mortgageAnn / afterTaxAnnualIncome) * 100 : 0 },
    { id: "propertyTax", category: "Housing", label: "Property Tax", annual: propertyTaxAnn, monthly: propertyTaxAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (propertyTaxAnn / afterTaxAnnualIncome) * 100 : 0 },
    { id: "rental", category: "Housing", label: "Rental", annual: rentalAnn, monthly: rentalAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (rentalAnn / afterTaxAnnualIncome) * 100 : 0 },
    { id: "housingInsurance", category: "Housing", label: "Insurance", annual: housingInsuranceAnn, monthly: housingInsuranceAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (housingInsuranceAnn / afterTaxAnnualIncome) * 100 : 0, notes: "Homeowner, renters, warranty" },
    { id: "hoaFee", category: "Housing", label: "HOA / Co-Op Fee", annual: hoaFeeAnn, monthly: hoaFeeAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (hoaFeeAnn / afterTaxAnnualIncome) * 100 : 0 },
    { id: "homeMaintenance", category: "Housing", label: "Home Maintenance", annual: homeMaintenanceAnn, monthly: homeMaintenanceAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (homeMaintenanceAnn / afterTaxAnnualIncome) * 100 : 0 },
    { id: "utilities", category: "Housing", label: "Utilities", annual: utilitiesAnn, monthly: utilitiesAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (utilitiesAnn / afterTaxAnnualIncome) * 100 : 0, notes: "Electricity, gas, water, phone, cable" },
    
    { id: "autoLoan", category: "Transportation", label: "Auto Loan", annual: autoLoanAnn, monthly: autoLoanAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (autoLoanAnn / afterTaxAnnualIncome) * 100 : 0 },
    { id: "autoInsurance", category: "Transportation", label: "Auto Insurance", annual: autoInsuranceAnn, monthly: autoInsuranceAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (autoInsuranceAnn / afterTaxAnnualIncome) * 100 : 0 },
    { id: "gasoline", category: "Transportation", label: "Gasoline", annual: gasolineAnn, monthly: gasolineAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (gasolineAnn / afterTaxAnnualIncome) * 100 : 0 },
    { id: "autoMaintenance", category: "Transportation", label: "Auto Maintenance", annual: autoMaintenanceAnn, monthly: autoMaintenanceAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (autoMaintenanceAnn / afterTaxAnnualIncome) * 100 : 0 },
    { id: "parkingTolls", category: "Transportation", label: "Parking / Tolls", annual: parkingTollsAnn, monthly: parkingTollsAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (parkingTollsAnn / afterTaxAnnualIncome) * 100 : 0 },
    { id: "otherTransportation", category: "Transportation", label: "Other Transportation Costs", annual: otherTransAnn, monthly: otherTransAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (otherTransAnn / afterTaxAnnualIncome) * 100 : 0, notes: "Tickets, taxi, registration" },
    
    { id: "creditCard", category: "Debt & Loans", label: "Credit Card", annual: creditCardAnn, monthly: creditCardAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (creditCardAnn / afterTaxAnnualIncome) * 100 : 0, notes: "Recurring monthly payback balance" },
    { id: "studentLoan", category: "Debt & Loans", label: "Student Loan", annual: studentLoanAnn, monthly: studentLoanAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (studentLoanAnn / afterTaxAnnualIncome) * 100 : 0 },
    { id: "otherLoans", category: "Debt & Loans", label: "Other Loans & Liabilities", annual: otherLoansAnn, monthly: otherLoansAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (otherLoansAnn / afterTaxAnnualIncome) * 100 : 0, notes: "Personal loans, store cards" },

    { id: "food", category: "Living", label: "Food & Groceries", annual: foodAnn, monthly: foodAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (foodAnn / afterTaxAnnualIncome) * 100 : 0 },
    { id: "clothing", category: "Living", label: "Clothing", annual: clothingAnn, monthly: clothingAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (clothingAnn / afterTaxAnnualIncome) * 100 : 0 },
    { id: "householdSupplies", category: "Living", label: "Household Supplies", annual: householdSuppliesAnn, monthly: householdSuppliesAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (householdSuppliesAnn / afterTaxAnnualIncome) * 100 : 0 },
    { id: "mealsOut", category: "Living", label: "Meals Out / Dining", annual: mealsOutAnn, monthly: mealsOutAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (mealsOutAnn / afterTaxAnnualIncome) * 100 : 0, notes: "Restaurants & takeout" },
    { id: "otherLiving", category: "Living", label: "Other Living Costs", annual: otherLivingAnn, monthly: otherLivingAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (otherLivingAnn / afterTaxAnnualIncome) * 100 : 0, notes: "Laundry, personal care, grooming" },

    { id: "medicalInsurance", category: "Healthcare", label: "Medical Insurance", annual: medicalInsuranceAnn, monthly: medicalInsuranceAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (medicalInsuranceAnn / afterTaxAnnualIncome) * 100 : 0 },
    { id: "medicalSpending", category: "Healthcare", label: "Medical Out-of-Pocket", annual: medicalSpendingAnn, monthly: medicalSpendingAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (medicalSpendingAnn / afterTaxAnnualIncome) * 100 : 0, notes: "Copays, prescriptions, doctor visits" },

    { id: "childCare", category: "Children & Education", label: "Child & Personal Care", annual: childCareAnn, monthly: childCareAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (childCareAnn / afterTaxAnnualIncome) * 100 : 0 },
    { id: "tuitionSupplies", category: "Children & Education", label: "Tuition & Supplies", annual: tuitionSuppliesAnn, monthly: tuitionSuppliesAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (tuitionSuppliesAnn / afterTaxAnnualIncome) * 100 : 0 },
    { id: "childSupport", category: "Children & Education", label: "Child Support", annual: childSupportAnn, monthly: childSupportAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (childSupportAnn / afterTaxAnnualIncome) * 100 : 0 },
    { id: "otherEducation", category: "Children & Education", label: "Other Education Costs", annual: otherEduAnn, monthly: otherEduAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (otherEduAnn / afterTaxAnnualIncome) * 100 : 0, notes: "Books, software, devices" },

    { id: "fourZeroOneK", category: "Savings", label: "401k & IRA", annual: fourZeroOneKAnn, monthly: fourZeroOneKAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (fourZeroOneKAnn / afterTaxAnnualIncome) * 100 : 0, notes: "Tax-advantaged retirement savings" },
    { id: "collegeSavings", category: "Savings", label: "College Savings (529)", annual: collegeSavingsAnn, monthly: collegeSavingsAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (collegeSavingsAnn / afterTaxAnnualIncome) * 100 : 0 },
    { id: "investmentSavings", category: "Savings", label: "Taxable Investments", annual: investmentSavingsAnn, monthly: investmentSavingsAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (investmentSavingsAnn / afterTaxAnnualIncome) * 100 : 0, notes: "Stocks, ETFs, real estate" },
    { id: "emergencyFund", category: "Savings", label: "Emergency Savings / High Yield", annual: emergencyFundAnn, monthly: emergencyFundAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (emergencyFundAnn / afterTaxAnnualIncome) * 100 : 0, notes: "Cash reserve & liquid CDs" },

    { id: "pet", category: "Miscellaneous", label: "Pet Care", annual: petAnn, monthly: petAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (petAnn / afterTaxAnnualIncome) * 100 : 0 },
    { id: "giftsDonations", category: "Miscellaneous", label: "Gifts & Charitable Donations", annual: giftsAnn, monthly: giftsAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (giftsAnn / afterTaxAnnualIncome) * 100 : 0 },
    { id: "hobbiesSports", category: "Miscellaneous", label: "Hobbies & Sports", annual: hobbiesAnn, monthly: hobbiesAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (hobbiesAnn / afterTaxAnnualIncome) * 100 : 0, notes: "Gym memberships, tickets, equipment" },
    { id: "entertainment", category: "Miscellaneous", label: "Entertainment & Streaming", annual: entertainmentAnn, monthly: entertainmentAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (entertainmentAnn / afterTaxAnnualIncome) * 100 : 0 },
    { id: "travelVacation", category: "Miscellaneous", label: "Travel & Vacations", annual: travelAnn, monthly: travelAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (travelAnn / afterTaxAnnualIncome) * 100 : 0 },
    { id: "otherMisc", category: "Miscellaneous", label: "Other Miscellaneous", annual: otherMiscAnn, monthly: otherMiscAnn / 12, pctOfIncome: afterTaxAnnualIncome > 0 ? (otherMiscAnn / afterTaxAnnualIncome) * 100 : 0 },
  ];

  // Recommendations Engine
  const recommendations: BudgetRecommendation[] = [];

  if (netMonthlySurplus < 0) {
    recommendations.push({
      type: "warning",
      category: "Cash Flow",
      title: "Monthly Budget Deficit",
      message: `You are spending $${Math.abs(netMonthlySurplus).toLocaleString("en-US", { maximumFractionDigits: 0 })} more than your monthly take-home pay. Review discretionary spending (dining out, travel, hobbies) immediately.`,
    });
  } else if (netMonthlySurplus > 500) {
    recommendations.push({
      type: "success",
      category: "Cash Flow",
      title: "Strong Monthly Surplus",
      message: `You have an unallocated surplus of $${netMonthlySurplus.toLocaleString("en-US", { maximumFractionDigits: 0 })}/mo. Consider directing this towards high-interest debt or automated investing.`,
    });
  }

  if (totalDti > 36) {
    recommendations.push({
      type: "caution",
      category: "Debt-to-Income",
      title: `High DTI Ratio (${totalDti.toFixed(1)}%)`,
      message: `Your debt payments exceed the recommended 36% limit. Financial institutions consider DTI above 43% high-risk for mortgage approval.`,
    });
  } else {
    recommendations.push({
      type: "success",
      category: "Debt-to-Income",
      title: `Good DTI Ratio (${totalDti.toFixed(1)}%)`,
      message: `Your debt service ratio is well within healthy limits, maintaining strong borrowing capacity.`,
    });
  }

  if (savingsRate < 15) {
    recommendations.push({
      type: "info",
      category: "Savings Target",
      title: `Low Savings Rate (${savingsRate.toFixed(1)}%)`,
      message: `Financial experts recommend saving at least 15% of your income for retirement and emergencies. You currently allocate ${savingsRate.toFixed(1)}%.`,
    });
  } else {
    recommendations.push({
      type: "success",
      category: "Savings Target",
      title: `Excellent Savings Rate (${savingsRate.toFixed(1)}%)`,
      message: `Your savings and investments rate exceeds the 15% benchmark, putting you on a solid path to financial independence.`,
    });
  }

  if (housingRatio > 30) {
    recommendations.push({
      type: "caution",
      category: "Housing Burden",
      title: `Housing Ratio High (${housingRatio.toFixed(1)}%)`,
      message: `Your total housing expenses consume ${housingRatio.toFixed(1)}% of your gross income. Keeping housing under 28-30% prevents becoming 'house poor'.`,
    });
  }

  return {
    grossAnnualIncome,
    grossMonthlyIncome,
    afterTaxAnnualIncome,
    afterTaxMonthlyIncome,
    totalAnnualExpenses,
    totalMonthlyExpenses,
    netAnnualSurplus,
    netMonthlySurplus,
    frontEndDti,
    totalDti,
    dtiRating,
    savingsRate,
    housingRatio,
    categories,
    itemizedBreakdown,
    rule503020,
    recommendations,
  };
}
