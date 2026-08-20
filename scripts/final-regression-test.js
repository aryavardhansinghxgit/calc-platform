// FINAL REGRESSION TEST SUITE FOR MORTGAGE CALCULATOR

function appPMT(rate, nper, pv, fv = 0, type = 0) {
  if (rate === 0) return -(pv + fv) / nper;
  const pvif = Math.pow(1 + rate, nper);
  let pmt = (rate * (pv * pvif + fv)) / (pvif - 1);
  if (type === 1) {
    pmt /= 1 + rate;
  }
  return pmt;
}

// Corrected application logic
function calculateMortgage(inputs) {
  const {
    homePrice = 400000,
    downPayment = 80000,
    downPaymentType = "amount",
    interestRate = 6.5,
    loanTermYears = 30,
    startMonth = 8,
    startYear = 2026,
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
    extraMonthlyStartMonth = startMonth,
    extraMonthlyStartYear = startYear,
    extraYearlyPayment = 0,
    extraYearlyStartMonth = startMonth,
    extraYearlyStartYear = startYear,
    extraOneTimePayments = [],
  } = inputs;

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

  let monthlyPrincipalAndInterest = 0;
  if (loanAmount > 0) {
    if (monthlyRate > 0) {
      monthlyPrincipalAndInterest = appPMT(monthlyRate, totalMonths, loanAmount);
    } else {
      monthlyPrincipalAndInterest = loanAmount / totalMonths;
    }
  }

  const initialAnnualTax = propertyTaxType === "percent" ? (homePrice * propertyTax) / 100 : propertyTax;
  const initialMonthlyTax = initialAnnualTax / 12;
  const initialMonthlyInsurance = homeInsurance / 12;
  const initialMonthlyOtherCosts = otherCosts / 12;

  const requiresPmi = downPaymentPercent < 20;
  const initialAnnualPmi = requiresPmi ? loanAmount * (pmiRate / 100) : 0;
  const initialMonthlyPmi = initialAnnualPmi / 12;

  const totalInitialMonthlyPayment =
    monthlyPrincipalAndInterest +
    initialMonthlyTax +
    initialMonthlyInsurance +
    initialMonthlyPmi +
    hoaFee +
    initialMonthlyOtherCosts +
    extraMonthlyPayment;

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

  const schedule = [];
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
    "July", "August", "September", "October", "November", "December",
  ];

  let currentMonthIndex = 0;

  while (balance > 0.001 && currentMonthIndex < totalMonths) {
    currentMonthIndex++;
    const yearIndex = Math.floor((currentMonthIndex - 1) / 12);

    const taxMultiplier = Math.pow(1 + propertyTaxIncrease / 100, yearIndex);
    const insuranceMultiplier = Math.pow(1 + insuranceIncrease / 100, yearIndex);
    const hoaMultiplier = Math.pow(1 + hoaIncrease / 100, yearIndex);
    const otherMultiplier = Math.pow(1 + otherCostsIncrease / 100, yearIndex);

    const currentTax = initialMonthlyTax * taxMultiplier;
    const currentInsurance = initialMonthlyInsurance * insuranceMultiplier;
    const currentHoa = hoaFee * hoaMultiplier;
    const currentOther = initialMonthlyOtherCosts * otherMultiplier;

    const pmiThreshold = homePrice * 0.8;
    const currentPmi = requiresPmi && balance > pmiThreshold ? initialMonthlyPmi : 0;

    const interestPaid = balance * monthlyRate;
    let basePrincipalPaid = monthlyPrincipalAndInterest - interestPaid;
    if (basePrincipalPaid < 0) basePrincipalPaid = 0;

    const totalMonthOffset = (startMonth - 1) + (currentMonthIndex - 1);
    const mNum = (totalMonthOffset % 12) + 1;
    const yNum = startYear + Math.floor(totalMonthOffset / 12);
    const dateStr = `${monthNames[mNum - 1]} ${yNum}`;

    let extraPaidThisMonth = 0;

    const isMonthlyActive =
      yNum > extraMonthlyStartYear ||
      (yNum === extraMonthlyStartYear && mNum >= extraMonthlyStartMonth);
    if (isMonthlyActive) {
      extraPaidThisMonth += Math.max(0, extraMonthlyPayment);
    }

    const isYearlyActive =
      mNum === extraYearlyStartMonth && yNum >= extraYearlyStartYear;
    if (isYearlyActive) {
      extraPaidThisMonth += Math.max(0, extraYearlyPayment);
    }

    if (extraOneTimePayments && extraOneTimePayments.length > 0) {
      extraOneTimePayments.forEach((otp) => {
        if (Number(otp.amount) > 0 && Number(otp.month) === mNum && Number(otp.year) === yNum) {
          extraPaidThisMonth += Number(otp.amount);
        }
      });
    }

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

  // 5. Biweekly Calculation Engine
  const biweeklyPayment = monthlyPrincipalAndInterest / 2;
  const biweeklyRate = Math.max(0, interestRate) / 100 / 26;
  const maxBiweeklyPeriods = loanTermYears * 26;

  let biweeklyBalance = loanAmount;
  let biweeklyAccumulatedInterest = 0;
  let biweeklyPeriodCount = 0;
  const biweeklySchedule = [];

  while (biweeklyBalance > 0.001 && biweeklyPeriodCount < maxBiweeklyPeriods) {
    biweeklyPeriodCount++;
    const periodInterest = biweeklyBalance * biweeklyRate;
    let periodPrincipal = biweeklyPayment - periodInterest;
    if (periodPrincipal < 0) periodPrincipal = 0;
    if (periodPrincipal > biweeklyBalance) periodPrincipal = biweeklyBalance;

    biweeklyBalance -= periodPrincipal;
    biweeklyAccumulatedInterest += periodInterest;

    const monthOffset = Math.floor((biweeklyPeriodCount - 1) * (12 / 26));
    const totalOffset = (startMonth - 1) + monthOffset;
    const bM = (totalOffset % 12);
    const bY = startYear + Math.floor(totalOffset / 12);
    const bDateStr = `BW ${biweeklyPeriodCount} (${monthNames[bM]} ${bY})`;

    biweeklySchedule.push({
      month: biweeklyPeriodCount,
      year: Math.ceil(biweeklyPeriodCount / 26),
      date: bDateStr,
      payment: periodPrincipal + periodInterest + (initialMonthlyTax / 2) + (initialMonthlyInsurance / 2),
      principalPaid: periodPrincipal,
      interestPaid: periodInterest,
      extraPaid: 0,
      propertyTax: initialMonthlyTax / 2,
      homeInsurance: initialMonthlyInsurance / 2,
      pmi: 0,
      hoaFee: hoaFee / 2,
      otherCosts: initialMonthlyOtherCosts / 2,
      remainingBalance: Math.max(0, biweeklyBalance),
      totalInterestPaid: biweeklyAccumulatedInterest,
    });

    if (biweeklyBalance <= 0) break;
  }

  const biweeklyPayoffMonths = Math.ceil((biweeklyPeriodCount * 12) / 26);
  const bwLastMonthOffset = (startMonth - 1) + (biweeklyPayoffMonths - 1);
  const bwFinalM = (bwLastMonthOffset % 12);
  const bwFinalY = startYear + Math.floor(bwLastMonthOffset / 12);
  const biweeklyPayoffDate = `${fullMonthNames[bwFinalM]} ${bwFinalY}`;

  const biweeklyInterestSavings = Math.max(0, baselineInterestPaid - biweeklyAccumulatedInterest);
  const biweeklyMonthsSaved = Math.max(0, totalMonths - biweeklyPayoffMonths);

  const totalOtherLifetime = totalPmiPaid + totalHoaPaid + totalOtherCostsPaid;
  const initialOtherMonthly = initialMonthlyPmi + hoaFee + initialMonthlyOtherCosts;

  const breakdown = [
    {
      category: "Principal & Interest",
      monthlyFirstYear: monthlyPrincipalAndInterest,
      totalLifetime: totalPrincipalPaid + totalInterestPaid,
      percentageOfTotal: totalCost > 0 ? ((totalPrincipalPaid + totalInterestPaid) / totalCost) * 100 : 0,
    },
    {
      category: "Property Tax",
      monthlyFirstYear: initialMonthlyTax,
      totalLifetime: totalPropertyTaxPaid,
      percentageOfTotal: totalCost > 0 ? (totalPropertyTaxPaid / totalCost) * 100 : 0,
    },
    {
      category: "Home Insurance",
      monthlyFirstYear: initialMonthlyInsurance,
      totalLifetime: totalInsurancePaid,
      percentageOfTotal: totalCost > 0 ? (totalInsurancePaid / totalCost) * 100 : 0,
    },
    {
      category: "Other Costs (PMI, HOA, Fees)",
      monthlyFirstYear: initialOtherMonthly,
      totalLifetime: totalOtherLifetime,
      percentageOfTotal: totalCost > 0 ? (totalOtherLifetime / totalCost) * 100 : 0,
    },
  ];

  return {
    loanAmount,
    monthlyPrincipalAndInterest,
    monthlyPropertyTax: initialMonthlyTax,
    monthlyInsurance: initialMonthlyInsurance,
    monthlyPmi: initialMonthlyPmi,
    monthlyHoa: hoaFee,
    monthlyOtherCosts: initialMonthlyOtherCosts,
    totalInitialMonthlyPayment,
    totalInterestPaid,
    totalPropertyTaxPaid,
    totalInsurancePaid,
    totalPmiPaid,
    totalHoaPaid,
    totalOtherCostsPaid,
    totalCost,
    payoffDate,
    payoffMonths,
    interestSavings,
    monthsSaved,
    biweeklyPayment,
    biweeklyPayoffDate,
    biweeklyTotalInterest: biweeklyAccumulatedInterest,
    biweeklyInterestSavings,
    biweeklyMonthsSaved,
    breakdown,
    schedule,
    biweeklySchedule,
  };
}

console.log("=== 1. VERIFYING FIXED P0/P1 ISSUE (MORT-BUG-001) ===");
const resFixed = calculateMortgage({
  homePrice: 400000,
  downPayment: 80000,
  interestRate: 6.706,
  loanTermYears: 30,
  propertyTax: 1.2,
  propertyTaxType: "percent",
  homeInsurance: 1500,
  pmiRate: 0,
  hoaFee: 333.3333333333333,
  otherCosts: 4000,
  propertyTaxIncrease: 0,
  insuranceIncrease: 0,
  hoaIncrease: 0,
  otherCostsIncrease: 0,
});

console.log("P&I Base:               ", resFixed.monthlyPrincipalAndInterest.toFixed(2));
console.log("Property Tax (mo):      ", resFixed.monthlyPropertyTax.toFixed(2));
console.log("Home Insurance (mo):    ", resFixed.monthlyInsurance.toFixed(2));
console.log("HOA Fee (mo):           ", resFixed.monthlyHoa.toFixed(2));
console.log("Other Costs (mo):       ", resFixed.monthlyOtherCosts.toFixed(2));
console.log("Total Monthly Payment:  ", resFixed.totalInitialMonthlyPayment.toFixed(2));
console.log("Lifetime Other Costs:   ", resFixed.totalOtherCostsPaid.toFixed(2));
console.log("Total Cost of Loan:     ", resFixed.totalCost.toFixed(2));

const expectedMonthly = 2066.1633 + 400 + 125 + 333.33333 + (4000/12);
console.log("Expected Monthly:       ", expectedMonthly.toFixed(2));
console.log("Reconciliation Check:   ", Math.abs(resFixed.totalInitialMonthlyPayment - expectedMonthly) < 0.01 ? "PASS" : "FAIL");

console.log("\n=== 2. 10 DIFFERENTIAL TESTS ===");
function indepCalc(P, rate, term) {
  const n = term * 12;
  const r = (rate / 100) / 12;
  if (r === 0) return { pmt: P / n, totalInterest: 0 };
  const pmt = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return { pmt, totalInterest: pmt * n - P };
}

const diffCases = [
  { P: 320000, rate: 6.706, term: 30 },
  { P: 100000, rate: 0, term: 30 },
  { P: 250000, rate: 8.0, term: 15 },
  { P: 500000, rate: 5.5, term: 30 },
  { P: 150000, rate: 4.25, term: 20 },
  { P: 750000, rate: 7.125, term: 30 },
  { P: 80000, rate: 3.5, term: 10 },
  { P: 1200000, rate: 6.875, term: 30 },
  { P: 45000, rate: 9.0, term: 15 },
  { P: 2000000, rate: 7.5, term: 30 },
];

let allDiffPass = true;
diffCases.forEach((c, idx) => {
  const oracle = indepCalc(c.P, c.rate, c.term);
  const app = calculateMortgage({
    homePrice: c.P,
    downPayment: 0,
    interestRate: c.rate,
    loanTermYears: c.term,
    propertyTax: 0,
    homeInsurance: 0,
    pmiRate: 0,
    hoaFee: 0,
    otherCosts: 0,
    propertyTaxIncrease: 0,
    insuranceIncrease: 0,
    hoaIncrease: 0,
    otherCostsIncrease: 0,
  });
  const diffPMT = Math.abs(app.monthlyPrincipalAndInterest - oracle.pmt);
  const diffInt = Math.abs(app.totalInterestPaid - oracle.totalInterest);
  const pass = diffPMT < 0.01 && diffInt < 0.5;
  if (!pass) allDiffPass = false;
  console.log(`[Diff ${idx+1}] Loan $${c.P}, ${c.rate}%, ${c.term}Y -> PMT: ${app.monthlyPrincipalAndInterest.toFixed(2)} (Oracle: ${oracle.pmt.toFixed(2)}) => ${pass ? "PASS" : "FAIL"}`);
});

console.log("\nAll 10 Differential Tests Passed:", allDiffPass);
