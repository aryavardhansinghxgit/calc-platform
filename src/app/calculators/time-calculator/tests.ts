import { calculateTimeCalculator } from "./calculator";
import {
  calculateTimeMath,
  calculateDateTimeShift,
  parseTimeExpression,
  calculateTimeDuration,
} from "@/lib/calculator-engine/formulas/time-calculator";

export function runTimeCalculatorTests() {
  // Test 1: Basic Addition with Rollover (4h 45m 50s + 3h 25m 30s = 8h 11m 20s)
  const math1 = calculateTimeMath(
    { hours: 4, minutes: 45, seconds: 50 },
    "+",
    { hours: 3, minutes: 25, seconds: 30 }
  );
  if (math1.normalized.hours !== 8 || math1.normalized.minutes !== 11 || math1.normalized.seconds !== 20) {
    throw new Error(`Expected 8h 11m 20s, got ${math1.formattedString}`);
  }

  // Test 2: Basic Subtraction with Borrowing (5h 15m 10s - 2h 40m 35s = 2h 34m 35s)
  const math2 = calculateTimeMath(
    { hours: 5, minutes: 15, seconds: 10 },
    "-",
    { hours: 2, minutes: 40, seconds: 35 }
  );
  if (math2.normalized.hours !== 2 || math2.normalized.minutes !== 34 || math2.normalized.seconds !== 35) {
    throw new Error(`Expected 2h 34m 35s, got ${math2.formattedString}`);
  }

  // Test 3: Expression Parser ("1d 4h + 2h - 30m")
  const expr1 = parseTimeExpression("1d 4h + 2h - 30m");
  if (!expr1.isValid) throw new Error(`Expression parsing failed: ${expr1.errorMessage}`);
  if (expr1.result.normalized.days !== 1 || expr1.result.normalized.hours !== 5 || expr1.result.normalized.minutes !== 30) {
    throw new Error(`Expected 1d 5h 30m, got ${expr1.result.formattedString}`);
  }

  // Test 4: Work Duration with Break
  const work1 = calculateTimeDuration({
    startHour: 9,
    startMinute: 0,
    startMeridiem: "AM",
    endHour: 5,
    endMinute: 30,
    endMeridiem: "PM",
    breakMinutes: 30,
    hourlyRate: 20,
  });
  if (work1.netWorkHours !== 8) {
    throw new Error(`Expected 8.0 net work hours, got ${work1.netWorkHours}`);
  }
  if (work1.grossPay !== 160) {
    throw new Error(`Expected $160 gross pay, got ${work1.grossPay}`);
  }

  // Test 5: Default Harness inputs
  const defaultInputs = {
    h1: 4,
    m1: 35,
    operation: "+",
    h2: 2,
    m2: 45,
  };
  const res1 = calculateTimeCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  return true;
}
