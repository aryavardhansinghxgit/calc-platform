/**
 * Unit Test Suite for Shared Financial Math Utilities.
 */

import { PMT, FutureValue, PresentValue, APRToEffectiveRate, CalculateLoanSchedule } from "../finance/financial-math";

function assertEqual(actual: any, expected: any, testName: string) {
  if (actual !== expected) {
    throw new Error(`[FAIL] ${testName}: Expected ${expected}, but got ${actual}`);
  }
}

export function runFinancialMathTests(): { passed: boolean; count: number } {
  let count = 0;

  // 1. PMT Test
  const monthlyRate = 0.065 / 12;
  const payment = PMT(monthlyRate, 360, 320000);
  assertEqual(Math.round(payment), 2023, "PMT Calculation");
  count++;

  // 2. FutureValue Test
  const fv = FutureValue(10000, 0.07, 5);
  assertEqual(Math.round(fv), 14026, "FutureValue Calculation");
  count++;

  // 3. PresentValue Test
  const pv = PresentValue(14025.52, 0.07, 5);
  assertEqual(Math.round(pv), 10000, "PresentValue Calculation");
  count++;

  // 4. APRToEffectiveRate Test
  const ear = APRToEffectiveRate(12, 12);
  assertEqual(ear.toFixed(2), "12.68", "APRToEffectiveRate Calculation");
  count++;

  // 5. Loan Schedule Test
  const schedule = CalculateLoanSchedule(10000, 6, 12);
  assertEqual(schedule.length, 12, "CalculateLoanSchedule Period Count");
  assertEqual(schedule[11].remainingBalance, 0, "CalculateLoanSchedule Final Balance Zero");
  count++;

  return { passed: true, count };
}
