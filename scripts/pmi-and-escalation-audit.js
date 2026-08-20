// Comprehensive PMI, Escalation, and Consistency Audit Runner

function appPMT(rate, nper, pv, fv = 0, type = 0) {
  if (rate === 0) return -(pv + fv) / nper;
  const pvif = Math.pow(1 + rate, nper);
  let pmt = (rate * (pv * pvif + fv)) / (pvif - 1);
  if (type === 1) pmt /= 1 + rate;
  return pmt;
}

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

  return {
    loanAmount,
    downPaymentPercent,
    monthlyPrincipalAndInterest,
    monthlyPropertyTax: initialMonthlyTax,
    monthlyInsurance: initialMonthlyInsurance,
    monthlyPmi: initialMonthlyPmi,
    monthlyHoa: hoaFee,
    monthlyOtherCosts: initialMonthlyOtherCosts,
    totalInitialMonthlyPayment,
    totalInterestPaid: accumulatedInterest,
    totalPropertyTaxPaid: accumulatedTax,
    totalInsurancePaid: accumulatedInsurance,
    totalPmiPaid: accumulatedPmi,
    totalHoaPaid: accumulatedHoa,
    totalOtherCostsPaid: accumulatedOther,
    totalCost: loanAmount + accumulatedInterest + accumulatedTax + accumulatedInsurance + accumulatedPmi + accumulatedHoa + accumulatedOther,
    payoffDate,
    payoffMonths,
    schedule,
  };
}

console.log("=== 1. DETAILED PMI SCHEDULE THRESHOLD ANALYSIS ===");
// Home = $400k, DP = $40k (10% DP, $360k loan), Rate = 6.5%, Term = 30Y, PMI Rate = 0.5%
// 80% threshold = $320,000. 78% threshold = $312,000.
const pmiRes = calculateMortgage({
  homePrice: 400000,
  downPayment: 40000,
  interestRate: 6.5,
  loanTermYears: 30,
  pmiRate: 0.5,
  propertyTax: 0,
  homeInsurance: 0,
  hoaFee: 0,
  otherCosts: 0,
  propertyTaxIncrease: 0,
  insuranceIncrease: 0,
  hoaIncrease: 0,
  otherCostsIncrease: 0
});

console.log("Initial Loan: $360,000 | 80% Threshold: $320,000 | 78% Threshold: $312,000");
console.log("Initial Monthly PMI:", pmiRes.monthlyPmi.toFixed(2));

// Find month where balance crosses 80% and 78%
let pmiStopMonth = -1;
let pmiStopBalance = 0;
let crossed78Month = -1;

for (let i = 0; i < pmiRes.schedule.length; i++) {
  const row = pmiRes.schedule[i];
  if (row.pmi > 0 && pmiRes.schedule[i+1] && pmiRes.schedule[i+1].pmi === 0) {
    pmiStopMonth = row.month;
    pmiStopBalance = row.remainingBalance;
  }
  if (row.remainingBalance <= 312000 && crossed78Month === -1) {
    crossed78Month = row.month;
  }
}

console.log(`PMI charged up to Month ${pmiStopMonth} (Remaining Balance: $${pmiStopBalance.toFixed(2)})`);
console.log(`Month ${pmiStopMonth + 1} PMI charged: $${pmiRes.schedule[pmiStopMonth].pmi.toFixed(2)} (Balance: $${pmiRes.schedule[pmiStopMonth].remainingBalance.toFixed(2)})`);
console.log(`Balance reaches <= 78% ($312k) at Month ${crossed78Month} (Balance: $${pmiRes.schedule[crossed78Month-1].remainingBalance.toFixed(2)})`);
console.log(`Total PMI Paid across life of loan: $${pmiRes.totalPmiPaid.toFixed(2)}`);

console.log("\n=== 2. ANNUAL ESCALATION COMPOUNDING TEST ===");
const escRates = [0, 1, 2, 3, 20];
escRates.forEach(rate => {
  const taxBase = 400; // $400/mo
  const y1 = taxBase * Math.pow(1 + rate/100, 0);
  const y2 = taxBase * Math.pow(1 + rate/100, 1);
  const y3 = taxBase * Math.pow(1 + rate/100, 2);
  const y10 = taxBase * Math.pow(1 + rate/100, 9);
  const y30 = taxBase * Math.pow(1 + rate/100, 29);
  console.log(`Rate ${rate}% -> Y1: $${y1.toFixed(2)}, Y2: $${y2.toFixed(2)}, Y3: $${y3.toFixed(2)}, Y10: $${y10.toFixed(2)}, Y30: $${y30.toFixed(2)}`);
});
