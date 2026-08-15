"use client";

import Link from "next/link";

export function PercentErrorContent() {
  return (
    <article className="space-y-8 border-t border-zinc-200 pt-6 text-sm leading-relaxed text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-100">1. What percent error measures</h2>
        <p>Percent error describes how far an observed or measured result is from a known, accepted, or theoretical value. It turns the difference into a scale-free ratio, so a measurement that is off by 0.2 units can be judged fairly whether the reference is 2 or 200 units. Students use it to evaluate laboratory work, while engineers and scientists use it to communicate measurement quality.</p>
        <p>A small percent error means the observation is close to the reference. A large value signals a substantial discrepancy, which may come from instrument limits, calibration, procedure, rounding, an incorrect model, or a recording mistake. Percent error does not by itself identify the cause.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-100">2. Mathematical definition and formula</h2>
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 font-sans tabular-nums text-sm font-bold text-blue-900 dark:border-blue-900/70 dark:bg-blue-950/30 dark:text-blue-200">Percent error = |observed − true| ÷ |true| × 100%</div>
        <p>The absolute value makes the standard percent error nonnegative. The denominator is the magnitude of the true value because error is a relative comparison to the reference size. The formula assumes the true value is known and nonzero. If the reference is zero, there is no meaningful percentage baseline; report the absolute difference instead.</p>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950"><h3 className="font-bold text-zinc-900 dark:text-zinc-100">Absolute error</h3><p className="mt-1 font-sans tabular-nums text-xs text-blue-700 dark:text-blue-300">|observed − true|</p><p className="mt-1 text-xs">Keeps the original units.</p></div>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950"><h3 className="font-bold text-zinc-900 dark:text-zinc-100">Relative error</h3><p className="mt-1 font-sans tabular-nums text-xs text-blue-700 dark:text-blue-300">absolute error ÷ |true|</p><p className="mt-1 text-xs">A unitless proportion.</p></div>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950"><h3 className="font-bold text-zinc-900 dark:text-zinc-100">Percent error</h3><p className="mt-1 font-sans tabular-nums text-xs text-blue-700 dark:text-blue-300">relative error × 100</p><p className="mt-1 text-xs">The proportion expressed per 100.</p></div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-100">3. How to calculate it step by step</h2>
        <ol className="list-decimal space-y-2 pl-5"><li>Write the observed measurement and the accepted value in the same units.</li><li>Subtract the true value from the observed value. This signed difference shows direction.</li><li>Take the absolute value to find the size of the error.</li><li>Divide the absolute error by the magnitude of the true value.</li><li>Multiply by 100 and attach the percent sign. Keep extra digits until the final step, then round appropriately.</li></ol>
        <p>For an observed value of <strong>56.891</strong> and a true value of <strong>62.327</strong>: the signed difference is 56.891 − 62.327 = −5.436, the absolute error is |−5.436| = 5.436, and the percent error is (5.436 ÷ 62.327) × 100 = <strong>8.722%</strong>. The negative signed difference says the observation underestimated the reference; the standard percent error reports the size as 8.722%.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-100">4. Worked examples</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"><h3 className="font-bold text-blue-700 dark:text-blue-300">Basic: exact result</h3><p className="mt-2 text-xs">Observed = 100, true = 100.</p><p className="mt-2 font-sans tabular-nums text-xs">|100 − 100| ÷ 100 × 100 = 0%</p><p className="mt-2 text-xs">An exact match has zero absolute and signed error.</p></div>
          <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"><h3 className="font-bold text-blue-700 dark:text-blue-300">Intermediate: overestimate</h3><p className="mt-2 text-xs">Observed = 105, true = 100.</p><p className="mt-2 font-sans tabular-nums text-xs">|105 − 100| ÷ 100 × 100 = 5%</p><p className="mt-2 text-xs">The signed error is +5%, so the measurement is 5% above the reference.</p></div>
          <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"><h3 className="font-bold text-blue-700 dark:text-blue-300">Advanced: negative reference</h3><p className="mt-2 text-xs">Observed = −9.5, true = −9.8.</p><p className="mt-2 font-sans tabular-nums text-xs">0.3 ÷ 9.8 × 100 = 3.061%</p><p className="mt-2 text-xs">The denominator uses the reference magnitude, 9.8. State your sign convention when reporting signed error for negative quantities.</p></div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-100">5. Reading the visual comparison</h2>
        <p>The calculator’s bars compare the magnitudes of the observed and true values on one scale. They are a quick intuition check, not a second formula. The metric cards show four different ideas: absolute error preserves units, relative error is the decimal ratio, signed error identifies over- or underestimation, and the closeness score is a simple 100% minus absolute percent error display.</p>
        <p>The closeness score is capped at 0% for errors of 100% or more. It is a communication aid, not a formal uncertainty interval, confidence level, or accuracy specification.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-100">6. Common mistakes and edge cases</h2>
        <ul className="list-disc space-y-2 pl-5"><li><strong>Using the observed value as the denominator:</strong> Standard percent error is relative to the true or accepted value, not the measurement.</li><li><strong>Dropping the absolute value:</strong> That changes the question from error magnitude to signed error. Use signed error when direction matters.</li><li><strong>Mixing units:</strong> Convert centimeters and meters, grams and kilograms, or other units before subtracting.</li><li><strong>Rounding too early:</strong> Early rounding can noticeably change results when the difference is small.</li><li><strong>True value equals zero:</strong> A percent error cannot be computed because division by zero is undefined. Use an absolute difference or a domain-specific tolerance instead.</li><li><strong>Unknown true value:</strong> If no accepted value exists, repeatability, standard deviation, uncertainty, or percent difference may be more appropriate.</li></ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-100">7. Practical applications</h2>
        <p>In a physics lab, percent error compares a measured acceleration with the accepted value of gravitational acceleration. In chemistry, it compares an experimental yield, density, or concentration with a reference. In engineering, it helps evaluate sensors, tolerances, calibration checks, and numerical approximations. In data analysis, repeated rows in the batch analyzer can summarize the average discrepancy across a set of observations.</p>
        <p>For experimental reporting, pair percent error with the measurement’s units, significant figures, uncertainty, and method. A 1% error may be excellent for one instrument and unacceptable for another; the acceptable threshold comes from the application.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-100">8. Related mathematical concepts</h2>
        <p>Percent error is closely related to <Link href="/calculators/percentage-calculator" className="font-semibold text-blue-600 underline dark:text-blue-400">percentage change</Link>, but the baseline is different: percentage change uses an initial value, while percent error uses an accepted reference. <Link href="/calculators/standard-deviation-calculator" className="font-semibold text-blue-600 underline dark:text-blue-400">Standard deviation</Link> describes spread among repeated observations and does not require a known true value. Percent difference compares two values symmetrically using their average rather than treating one as the reference.</p>
      </section>

      <section className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/70 dark:bg-blue-950/30"><h2 className="text-base font-bold text-blue-950 dark:text-blue-200">Summary</h2><p className="mt-2 text-xs leading-5 text-blue-900 dark:text-blue-300">Subtract the true value from the observation, take the absolute difference, divide by the magnitude of the true value, and multiply by 100. Use absolute percent error for magnitude, signed percent error for direction, and never compute a percentage baseline from a zero true value.</p></section>
    </article>
  );
}

export default PercentErrorContent;
