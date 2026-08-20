// Differential and Property Testing for Mortgage Calculator QA Audit

function appPMT(rate, nper, pv, fv = 0, type = 0) {
  if (rate === 0) return -(pv + fv) / nper;
  const pvif = Math.pow(1 + rate, nper);
  let pmt = (rate * (pv * pvif + fv)) / (pvif - 1);
  if (type === 1) {
    pmt /= 1 + rate;
  }
  return pmt;
}

// Current application logic exactly as coded in src/modules/mortgage/formula.ts
function runCurrentAppLogic(inputs) {
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

  const requiresPmi = downPaymentPercent < 20;
  const initialAnnualPmi = requiresPmi ? loanAmount * (pmiRate / 100) : 0;
  const initialMonthlyPmi = initialAnnualPmi / 12;

  const totalInitialMonthlyPayment =
    monthlyPrincipalAndInterest +
    initialMonthlyTax +
    initialMonthlyInsurance +
    initialMonthlyPmi +
    hoaFee +
    otherCosts + // Bug: otherCosts input labeled $/yr is treated as $/mo here
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
    const currentOther = otherCosts * otherMultiplier;

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

  // Biweekly
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
    totalInitialMonthlyPayment,
    totalInterestPaid,
    totalCost,
    totalOtherCostsPaid,
    payoffDate,
    payoffMonths,
    interestSavings,
    monthsSaved,
    biweeklyPayment,
    biweeklyPayoffDate,
    biweeklyTotalInterest: biweeklyAccumulatedInterest,
    biweeklyInterestSavings,
    biweeklyMonthsSaved,
    schedule,
    biweeklySchedule,
  };
}

// Independent Reference Calculation Engine
function independentMortgageCalc(P, annualRatePct, years) {
  const n = years * 12;
  const r = (annualRatePct / 100) / 12;
  if (P <= 0 || n <= 0) return { pmt: 0, totalInterest: 0, totalPI: 0 };
  if (r === 0) {
    const pmt = P / n;
    return { pmt, totalInterest: 0, totalPI: P };
  }
  const pmt = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPI = pmt * n;
  const totalInterest = totalPI - P;
  return { pmt, totalInterest, totalPI };
}

console.log("=== RUNNING 20 DIFFERENTIAL SCENARIOS ===");

const scenarios = [
  { id: 1, name: "Standard 30Y Conforming", P: 320000, rate: 6.706, term: 30 },
  { id: 2, name: "Zero Interest 30Y", P: 100000, rate: 0, term: 30 },
  { id: 3, name: "Standard 6% 30Y", P: 100000, rate: 6, term: 30 },
  { id: 4, name: "15Y Fixed 8%", P: 250000, rate: 8, term: 15 },
  { id: 5, name: "Micro Loan 1Y 1%", P: 1000, rate: 1, term: 1 },
  { id: 6, name: "Jumbo Loan 30Y 7.25%", P: 1500000, rate: 7.25, term: 30 },
  { id: 7, name: "Starter Home 20Y 5.5%", P: 180000, rate: 5.5, term: 20 },
  { id: 8, name: "10Y Accelerated 4.75%", P: 220000, rate: 4.75, term: 10 },
  { id: 9, name: "High Rate 30Y 12%", P: 300000, rate: 12, term: 30 },
  { id: 10, name: "Ultra-Low Rate 15Y 2.5%", P: 450000, rate: 2.5, term: 15 },
  { id: 11, name: "Ultra-Low Rate 30Y 2.75%", P: 500000, rate: 2.75, term: 30 },
  { id: 12, name: "40Y Extended 6.875%", P: 350000, rate: 6.875, term: 40 },
  { id: 13, name: "5Y Balloon / Short 4.0%", P: 80000, rate: 4.0, term: 5 },
  { id: 14, name: "25Y Conventional 6.125%", P: 275000, rate: 6.125, term: 25 },
  { id: 15, name: "High Principal 20Y 7.0%", P: 850000, rate: 7.0, term: 20 },
  { id: 16, name: "Low Principal 30Y 9.5%", P: 45000, rate: 9.5, term: 30 },
  { id: 17, name: "Precision Test 30Y 6.333%", P: 333333.33, rate: 6.333, term: 30 },
  { id: 18, name: "High Rate 15Y 15%", P: 120000, rate: 15.0, term: 15 },
  { id: 19, name: "1Y Bridge 10%", P: 500000, rate: 10.0, term: 1 },
  { id: 20, name: "Ultra High Principal 30Y 7.5%", P: 5000000, rate: 7.5, term: 30 },
];

let passCount = 0;
let failCount = 0;

scenarios.forEach(sc => {
  const indep = independentMortgageCalc(sc.P, sc.rate, sc.term);
  const app = runCurrentAppLogic({
    homePrice: sc.P,
    downPayment: 0,
    downPaymentType: "amount",
    interestRate: sc.rate,
    loanTermYears: sc.term,
    propertyTax: 0,
    homeInsurance: 0,
    pmiRate: 0,
    hoaFee: 0,
    otherCosts: 0,
    propertyTaxIncrease: 0,
    insuranceIncrease: 0,
    hoaIncrease: 0,
    otherCostsIncrease: 0,
    extraMonthlyPayment: 0
  });

  const diffPMT = Math.abs(app.monthlyPrincipalAndInterest - indep.pmt);
  const diffInt = Math.abs(app.totalInterestPaid - indep.totalInterest);
  const isPass = diffPMT < 0.01 && diffInt < 1.0;

  if (isPass) passCount++;
  else failCount++;

  console.log(`[SCENARIO ${sc.id}] ${sc.name}:`);
  console.log(`  Expected PMT: ${indep.pmt.toFixed(2)}, App: ${app.monthlyPrincipalAndInterest.toFixed(2)}, Diff: ${diffPMT.toFixed(4)}`);
  console.log(`  Expected Total Int: ${indep.totalInterest.toFixed(2)}, App: ${app.totalInterestPaid.toFixed(2)}, Diff: ${diffInt.toFixed(4)}`);
  console.log(`  Result: ${isPass ? "PASS" : "FAIL"}`);
});

console.log(`\nDifferential Summary: ${passCount} Passed, ${failCount} Failed`);
