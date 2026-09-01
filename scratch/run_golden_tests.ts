import { calculatePeriodCalculator } from "../src/app/calculators/period-calculator/calculator";

const goldenTests = [
  {
    name: "1. 28-day regular cycle",
    inputs: { lmpDate: "2026-01-01", cycleLength: 28, periodLength: 5, lutealPhaseLength: 14, userAge: 28, cycleRegularity: "regular", birthControl: "none", hasPcos: false },
    expected: { nextPeriod: "2026-01-29", periodEnd: "2026-02-02", ovulation: "2026-01-15", dueConceived: "2026-10-08" }
  },
  {
    name: "2. 38-day cycle",
    inputs: { lmpDate: "2026-01-01", cycleLength: 38, periodLength: 9, lutealPhaseLength: 11, userAge: 48, cycleRegularity: "regular", birthControl: "none", hasPcos: false },
    expected: { nextPeriod: "2026-02-08", periodEnd: "2026-02-16", ovulation: "2026-01-28", dueConceived: "2026-10-21" }
  },
  {
    name: "3. 21-day cycle",
    inputs: { lmpDate: "2026-01-01", cycleLength: 21, periodLength: 4, lutealPhaseLength: 11, userAge: 25, cycleRegularity: "regular", birthControl: "none", hasPcos: false },
    expected: { nextPeriod: "2026-01-22", periodEnd: "2026-01-25", ovulation: "2026-01-11", dueConceived: "2026-10-04" }
  },
  {
    name: "4. 35-day cycle",
    inputs: { lmpDate: "2026-01-01", cycleLength: 35, periodLength: 5, lutealPhaseLength: 14, userAge: 30, cycleRegularity: "regular", birthControl: "none", hasPcos: false },
    expected: { nextPeriod: "2026-02-05", periodEnd: "2026-02-09", ovulation: "2026-01-22", dueConceived: "2026-10-15" }
  },
  {
    name: "5. Leap-year date (2028-02-01)",
    inputs: { lmpDate: "2028-02-01", cycleLength: 28, periodLength: 5, lutealPhaseLength: 14, userAge: 28, cycleRegularity: "regular", birthControl: "none", hasPcos: false },
    expected: { nextPeriod: "2028-02-29", periodEnd: "2028-03-04", ovulation: "2028-02-15", dueConceived: "2028-11-07" }
  },
  {
    name: "6. Month-end date (2026-01-31)",
    inputs: { lmpDate: "2026-01-31", cycleLength: 28, periodLength: 5, lutealPhaseLength: 14, userAge: 28, cycleRegularity: "regular", birthControl: "none", hasPcos: false },
    expected: { nextPeriod: "2026-02-28", periodEnd: "2026-03-04", ovulation: "2026-02-14", dueConceived: "2026-11-07" }
  },
  {
    name: "7. Year-end date (2026-12-31)",
    inputs: { lmpDate: "2026-12-31", cycleLength: 28, periodLength: 5, lutealPhaseLength: 14, userAge: 28, cycleRegularity: "regular", birthControl: "none", hasPcos: false },
    expected: { nextPeriod: "2027-01-28", periodEnd: "2027-02-01", ovulation: "2027-01-14", dueConceived: "2027-10-07" }
  },
  {
    name: "8. Minimum cycle (21 days)",
    inputs: { lmpDate: "2026-01-01", cycleLength: 21, periodLength: 2, lutealPhaseLength: 10, userAge: 20, cycleRegularity: "regular", birthControl: "none", hasPcos: false },
    expected: { nextPeriod: "2026-01-22", periodEnd: "2026-01-23", ovulation: "2026-01-12", dueConceived: "2026-10-05" }
  },
  {
    name: "9. Maximum cycle (45 days)",
    inputs: { lmpDate: "2026-01-01", cycleLength: 45, periodLength: 7, lutealPhaseLength: 14, userAge: 28, cycleRegularity: "regular", birthControl: "none", hasPcos: false },
    expected: { nextPeriod: "2026-02-15", periodEnd: "2026-02-21", ovulation: "2026-02-01", dueConceived: "2026-10-25" }
  },
  {
    name: "10. Minimum luteal (8-9 days, test 9)",
    inputs: { lmpDate: "2026-01-01", cycleLength: 28, periodLength: 5, lutealPhaseLength: 9, userAge: 28, cycleRegularity: "regular", birthControl: "none", hasPcos: false },
    expected: { nextPeriod: "2026-01-29", periodEnd: "2026-02-02", ovulation: "2026-01-20", dueConceived: "2026-10-13" }
  },
  {
    name: "11. Maximum luteal (16 days)",
    inputs: { lmpDate: "2026-01-01", cycleLength: 28, periodLength: 5, lutealPhaseLength: 16, userAge: 28, cycleRegularity: "regular", birthControl: "none", hasPcos: false },
    expected: { nextPeriod: "2026-01-29", periodEnd: "2026-02-02", ovulation: "2026-01-13", dueConceived: "2026-10-06" }
  },
  {
    name: "12. PCOS checked",
    inputs: { lmpDate: "2026-01-01", cycleLength: 35, periodLength: 6, lutealPhaseLength: 14, userAge: 28, cycleRegularity: "moderately-irregular", birthControl: "none", hasPcos: true },
    expected: { nextPeriod: "2026-02-05", periodEnd: "2026-02-10", ovulation: "2026-01-22", dueConceived: "2026-10-15" }
  },
  {
    name: "13. Hormonal birth control (oral pill)",
    inputs: { lmpDate: "2026-01-01", cycleLength: 28, periodLength: 4, lutealPhaseLength: 14, userAge: 24, cycleRegularity: "regular", birthControl: "pill", hasPcos: false },
    expected: { nextPeriod: "2026-01-29", periodEnd: "2026-02-01", ovulation: "2026-01-15", dueConceived: "2026-10-08" }
  },
  {
    name: "14. Irregular cycle mode (moderately-irregular)",
    inputs: { calculationMode: "irregular", lmpDate: "2026-01-01", cycleLength: 32, periodLength: 5, lutealPhaseLength: 14, userAge: 30, cycleRegularity: "moderately-irregular", birthControl: "none", hasPcos: false },
    expected: { nextPeriod: "2026-02-02", periodEnd: "2026-02-06", ovulation: "2026-01-19", dueConceived: "2026-10-12" }
  },
  {
    name: "15. Pregnancy plan mode",
    inputs: { calculationMode: "pregnancy-plan", lmpDate: "2026-01-01", cycleLength: 28, periodLength: 5, lutealPhaseLength: 14, userAge: 28, cycleRegularity: "regular", birthControl: "none", hasPcos: false },
    expected: { nextPeriod: "2026-01-29", periodEnd: "2026-02-02", ovulation: "2026-01-15", dueConceived: "2026-10-08" }
  },
];

console.log("| Test | Next Period (Act/Exp) | Period End (Act/Exp) | Ovulation (Act/Exp) | Fertile Window | Health Score | Status |");
console.log("|---|---|---|---|---|---|---|");

goldenTests.forEach((t) => {
  const res = calculatePeriodCalculator(t.inputs);
  const npMatch = res.nextPeriodStartDate === t.expected.nextPeriod;
  const peMatch = res.nextPeriodEndDate === t.expected.periodEnd;
  const ovMatch = res.nextOvulationDate === t.expected.ovulation;
  const dueMatch = res.dueDateIfConceived === t.expected.dueConceived;
  const allMatch = npMatch && peMatch && ovMatch && dueMatch;

  console.log(`| ${t.name} | ${res.nextPeriodStartDate} / ${t.expected.nextPeriod} | ${res.nextPeriodEndDate} / ${t.expected.periodEnd} | ${res.nextOvulationDate} / ${t.expected.ovulation} | ${res.fertileWindow.start} to ${res.fertileWindow.end} | ${res.healthScore} (${res.healthStatus}) | ${allMatch ? "PASS" : "FAIL"} |`);
});
