import { calculateTimeCardCalculator } from "./calculator";
import {
  calculateWeeklyPayroll,
  evaluateFLSAExemption,
  applyTimeRounding,
  parseFlexibleTimeString,
  parseBreakDeduction,
} from "@/lib/calculator-engine/formulas/time-card";

export function runTimeCardCalculatorTests() {
  // Test 1: Parser verification
  if (parseFlexibleTimeString("8:30AM") !== 510) throw new Error("Parser failed for 8:30AM");
  if (parseFlexibleTimeString("5:00PM") !== 1020) throw new Error("Parser failed for 5:00PM");
  if (parseBreakDeduction("0:30") !== 30) throw new Error("Break parser failed for 0:30");
  if (parseBreakDeduction("0.5") !== 30) throw new Error("Break parser failed for 0.5");

  // Test 2: Standard FLSA Weekly Overtime (5 days × 9h = 45h, Rate $20 -> 40*$20 + 5*$30 = $950)
  const shifts1 = [
    { dayName: "Monday", fromTime: "8:00AM", toTime: "5:00PM", breakDeduction: "0" },
    { dayName: "Tuesday", fromTime: "8:00AM", toTime: "5:00PM", breakDeduction: "0" },
    { dayName: "Wednesday", fromTime: "8:00AM", toTime: "5:00PM", breakDeduction: "0" },
    { dayName: "Thursday", fromTime: "8:00AM", toTime: "5:00PM", breakDeduction: "0" },
    { dayName: "Friday", fromTime: "8:00AM", toTime: "5:00PM", breakDeduction: "0" },
  ];
  const payroll1 = calculateWeeklyPayroll({
    shifts: shifts1,
    hourlyRate: 20,
    overtimeRule: "weekly_40",
  });
  if (payroll1.totalWeeklyHours !== 45 || payroll1.totalGrossPay !== 950) {
    throw new Error(`Expected 45h and $950 gross pay, got ${payroll1.totalWeeklyHours}h and $${payroll1.totalGrossPay}`);
  }

  // Test 3: California Daily & Double Overtime (14h shift: 8h reg, 4h OT @ 1.5x, 2h DT @ 2.0x, Rate $10 -> 80 + 60 + 40 = $180)
  const shifts2 = [
    { dayName: "Monday", fromTime: "06:00", toTime: "20:00", breakDeduction: "0" }, // 14h
  ];
  const payroll2 = calculateWeeklyPayroll({
    shifts: shifts2,
    hourlyRate: 10,
    overtimeRule: "daily_8_weekly_40",
  });
  if (payroll2.totalRegularHours !== 8 || payroll2.totalOvertimeHours !== 4 || payroll2.totalDoubleTimeHours !== 2 || payroll2.totalGrossPay !== 180) {
    throw new Error(`Expected $180 CA overtime pay, got $${payroll2.totalGrossPay}`);
  }

  // Test 4: FLSA 7-Minute Rounding (8:07 = 7m -> rounds to 0m; 8:08 = 8m -> rounds to 15m)
  if (applyTimeRounding(7, "15min_7rule") !== 0) throw new Error("7-minute rule failed for 7m");
  if (applyTimeRounding(8, "15min_7rule") !== 15) throw new Error("7-minute rule failed for 8m");

  // Test 5: FLSA Exemption Assessment
  const exemptTest = evaluateFLSAExemption({
    weeklySalary: 950,
    isSalaryPaid: true,
    category: "executive",
    managesDepartment: true,
    supervisesTwoPlus: true,
  });
  if (!exemptTest.isExempt) throw new Error("Expected executive to be exempt");

  const blueCollarTest = evaluateFLSAExemption({
    weeklySalary: 1200,
    isSalaryPaid: true,
    category: "blue_collar_first_responder",
  });
  if (blueCollarTest.isExempt) throw new Error("Expected blue collar worker to be non-exempt");

  // Test 6: Default inputs harness
  const defaultInputs = {
    monHours: 8,
    tueHours: 8,
    wedHours: 8,
    thuHours: 8,
    friHours: 8,
    hourlyRate: 25,
  };
  const res1 = calculateTimeCardCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  return true;
}
