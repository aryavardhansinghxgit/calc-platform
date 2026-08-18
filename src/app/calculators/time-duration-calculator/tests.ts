import { calculateTimeDurationCalculator } from "./calculator";
import {
  calculateSameDayDuration,
  calculateCrossDateDuration,
  calculateMultiSegmentDuration,
} from "@/lib/calculator-engine/formulas/time-duration";

export function runTimeDurationCalculatorTests() {
  // Test 1: Same-Day Duration (Case A: No borrow -> 13:57 - 09:22 = 4h 35m)
  const res1 = calculateSameDayDuration({
    startHour: 9,
    startMinute: 22,
    startSecond: 0,
    endHour: 13,
    endMinute: 57,
    endSecond: 0,
    is24Hour: true,
  });
  if (res1.hours !== 4 || res1.minutes !== 35) {
    throw new Error(`Expected 4h 35m, got ${res1.hours}h ${res1.minutes}m`);
  }

  // Test 2: Same-Day Duration (Case B: 60-minute borrow -> 13:57 - 09:58 = 3h 59m)
  const res2 = calculateSameDayDuration({
    startHour: 9,
    startMinute: 58,
    startSecond: 0,
    endHour: 13,
    endMinute: 57,
    endSecond: 0,
    is24Hour: true,
  });
  if (res2.hours !== 3 || res2.minutes !== 59 || !res2.borrowSteps.borrowNeeded) {
    throw new Error(`Expected 3h 59m with borrow, got ${res2.hours}h ${res2.minutes}m`);
  }

  // Test 3: Overnight Midnight Rollover (10:30 PM to 6:15 AM = 7h 45m)
  const res3 = calculateSameDayDuration({
    startHour: 10,
    startMinute: 30,
    startMeridiem: "PM",
    endHour: 6,
    endMinute: 15,
    endMeridiem: "AM",
  });
  if (res3.hours !== 7 || res3.minutes !== 45 || !res3.overnightRollover) {
    throw new Error(`Expected 7h 45m overnight, got ${res3.hours}h ${res3.minutes}m`);
  }

  // Test 4: Multi-Segment Time Adder (1h 45m + 2h 30m + 55m 30s = 5h 10m 30s)
  const segs = [
    { id: "1", hours: 1, minutes: 45, seconds: 0 },
    { id: "2", hours: 2, minutes: 30, seconds: 0 },
    { id: "3", hours: 0, minutes: 55, seconds: 30 },
  ];
  const resSeg = calculateMultiSegmentDuration(segs);
  if (resSeg.totalHours !== 5 || resSeg.totalMinutes !== 10 || resSeg.totalSeconds !== 30) {
    throw new Error(`Expected 5h 10m 30s, got ${resSeg.totalDurationHms}`);
  }

  // Test 5: Cross-Date Duration (Aug 1 08:00 to Aug 7 17:30 = 6 days, 9 hours, 30 minutes)
  const resCross = calculateCrossDateDuration({
    startYear: 2026,
    startMonth: 7, // August
    startDay: 1,
    startHour: 8,
    startMinute: 0,
    endYear: 2026,
    endMonth: 7,
    endDay: 7,
    endHour: 17,
    endMinute: 30,
    is24Hour: true,
  });
  if (resCross.days !== 6 || resCross.hours !== 9 || resCross.minutes !== 30) {
    throw new Error(`Expected 6d 9h 30m, got ${resCross.formattedFull}`);
  }

  // Test 6: Default input harness
  const defaultInputs = {
    startDate: "2026-08-01",
    startTime: "08:00",
    endDate: "2026-08-07",
    endTime: "17:30",
  };
  const resHarness = calculateTimeDurationCalculator(defaultInputs);
  if (!resHarness || typeof resHarness !== "object") throw new Error("Formula failed for default inputs");

  return true;
}
