import { calculateDateCalculator } from "./calculator";
import {
  calculateDateDuration,
  calculateDateOffset,
  isLeapYear,
  getDaysInMonth,
} from "@/lib/calculator-engine/formulas/date-calculator";

export function runDateCalculatorTests() {
  // Test Leap Year
  if (!isLeapYear(2000)) throw new Error("2000 must be a leap year");
  if (isLeapYear(1900)) throw new Error("1900 must not be a leap year");
  if (!isLeapYear(2024)) throw new Error("2024 must be a leap year");
  if (isLeapYear(2025)) throw new Error("2025 must not be a leap year");

  // Test Days in Month
  if (getDaysInMonth(2024, 1) !== 29) throw new Error("Feb 2024 must have 29 days");
  if (getDaysInMonth(2025, 1) !== 28) throw new Error("Feb 2025 must have 28 days");

  // Test Date Duration
  const dur1 = calculateDateDuration({
    startDate: "2026-03-15",
    endDate: "2026-10-28",
  });
  if (dur1.totalDays !== 227) throw new Error(`Expected 227 days, got ${dur1.totalDays}`);
  if (dur1.months !== 7 || dur1.days !== 13) {
    throw new Error(`Expected 7 months 13 days, got ${dur1.months}m ${dur1.days}d`);
  }

  // Test Date Offset
  const off1 = calculateDateOffset({
    startDate: "2026-01-31",
    operation: "add",
    years: 0,
    months: 1,
    weeks: 0,
    days: 0,
  });
  if (off1.targetDateStr !== "2026-02-28") {
    throw new Error(`Expected 2026-02-28, got ${off1.targetDateStr}`);
  }

  // Test Business Days Offset
  const off2 = calculateDateOffset({
    startDate: "2026-08-14", // Friday
    operation: "add",
    years: 0,
    months: 0,
    weeks: 0,
    days: 1,
    businessDaysOnly: true,
  });
  if (off2.targetDateStr !== "2026-08-17") { // Monday
    throw new Error(`Expected Monday 2026-08-17, got ${off2.targetDateStr}`);
  }

  // Test calculator default inputs
  const defaultInputs = {
    startDate: "2026-08-07",
    operation: "add",
    years: 0,
    months: 0,
    days: 30,
  };
  const res1 = calculateDateCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  return true;
}
