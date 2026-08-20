function appPMT(rate, nper, pv, fv = 0, type = 0) {
  if (rate === 0) return -(pv + fv) / nper;
  const pvif = Math.pow(1 + rate, nper);
  let pmt = (rate * (pv * pvif + fv)) / (pvif - 1);
  if (type === 1) {
    pmt /= 1 + rate;
  }
  return pmt;
}

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
    otherCosts +
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
    schedule,
  };
}

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

module.exports = {
  runCurrentAppLogic,
  independentMortgageCalc,
};
