import { calculateWeeklyPayroll } from "@/lib/calculator-engine/formulas/time-card";
import { TimeCardCalculatorOutputs } from "./types";

export function calculateTimeCardCalculator(inputs: Record<string, any>): TimeCardCalculatorOutputs {
  const shifts = [
    { dayName: "Monday", fromTime: "8:00AM", toTime: `${8 + (Number(inputs.monHours) || 8)}:00`, breakDeduction: "0" },
    { dayName: "Tuesday", fromTime: "8:00AM", toTime: `${8 + (Number(inputs.tueHours) || 8)}:00`, breakDeduction: "0" },
    { dayName: "Wednesday", fromTime: "8:00AM", toTime: `${8 + (Number(inputs.wedHours) || 8)}:00`, breakDeduction: "0" },
    { dayName: "Thursday", fromTime: "8:00AM", toTime: `${8 + (Number(inputs.thuHours) || 8)}:00`, breakDeduction: "0" },
    { dayName: "Friday", fromTime: "8:00AM", toTime: `${8 + (Number(inputs.friHours) || 8)}:00`, breakDeduction: "0" },
  ];

  const rate = Math.max(0, Number(inputs.hourlyRate) || 25);
  const result = calculateWeeklyPayroll({
    shifts,
    hourlyRate: rate,
    overtimeMultiplier: 1.5,
  });

  return {
    grossPay: result.totalGrossPay,
    totalHours: result.totalWeeklyHours,
    regularPay: result.regularPay,
    overtimePay: result.overtimePay,
  };
}
