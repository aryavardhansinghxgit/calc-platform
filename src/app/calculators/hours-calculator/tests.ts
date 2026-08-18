import { calculateHoursCalculator } from "./calculator";
import {
  calculateIntradayHours,
  calculateCrossDateHours,
} from "@/lib/calculator-engine/formulas/hours-calculator";

export function runHoursCalculatorTests() {
  // Test 1: Standard Shift with Lunch Break (8:30 AM to 5:00 PM minus 30m break = 8.00 hrs)
  const shift1 = calculateIntradayHours({
    startHour: 8,
    startMinute: 30,
    startMeridiem: "AM",
    endHour: 5,
    endMinute: 0,
    endMeridiem: "PM",
    breakMinutes: 30,
  });
  if (shift1.totalDecimalHours !== 8 || shift1.totalMinutes !== 480) {
    throw new Error(`Expected 8.00 hours (480 mins), got ${shift1.totalDecimalHours}h (${shift1.totalMinutes}m)`);
  }

  // Test 2: Overnight Shift (10:15 PM to 6:45 AM minus 45m break = 7.75 hrs)
  const shift2 = calculateIntradayHours({
    startHour: 10,
    startMinute: 15,
    startMeridiem: "PM",
    endHour: 6,
    endMinute: 45,
    endMeridiem: "AM",
    breakMinutes: 45,
  });
  if (shift2.totalDecimalHours !== 7.75 || !shift2.overnightShift) {
    throw new Error(`Expected 7.75 hours overnight, got ${shift2.totalDecimalHours}h`);
  }

  // Test 3: Overtime Pay (9 hours worked, threshold 8h, rate $20, 1.5x OT -> 8*$20 + 1*$30 = $190)
  const shift3 = calculateIntradayHours({
    startHour: 8,
    startMinute: 0,
    startMeridiem: "AM",
    endHour: 5,
    endMinute: 0,
    endMeridiem: "PM",
    breakMinutes: 0,
    hourlyRate: 20,
    overtimeThresholdHours: 8,
    overtimeMultiplier: 1.5,
  });
  if (shift3.grossPay !== 190) {
    throw new Error(`Expected $190 gross pay, got ${shift3.grossPay}`);
  }

  // Test 4: Cross-Date Duration (Aug 18 08:30 to Aug 20 17:30 = 57 hours)
  const cross1 = calculateCrossDateHours({
    startYear: 2026,
    startMonth: 7, // August
    startDay: 18,
    startHour: 8,
    startMinute: 30,
    startMeridiem: "AM",
    endYear: 2026,
    endMonth: 7,
    endDay: 20,
    endHour: 5,
    endMinute: 30,
    endMeridiem: "PM",
    breakMinutes: 0,
  });
  if (cross1.totalDecimalHours !== 57) {
    throw new Error(`Expected 57.00 hours, got ${cross1.totalDecimalHours}`);
  }

  // Test 5: Default Harness inputs
  const defaultInputs = {
    startTime: "09:00",
    endTime: "17:00",
    breakMins: 30,
  };
  const res1 = calculateHoursCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  return true;
}
