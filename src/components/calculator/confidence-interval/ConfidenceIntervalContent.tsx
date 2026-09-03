"use client";

import React from "react";
import Link from "next/link";
import { ArrowDown, HelpCircle, BookOpen, Layers, CheckCircle2 } from "lucide-react";
import { confidence_interval_calculatorFaqs } from "@/app/calculators/confidence-interval-calculator/faq";

export function ConfidenceIntervalContent() {
  return (
    <article className="space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed font-sans max-w-5xl mx-auto">
      {/* ========================================================================= */}
      {/* RELATED CALCULATORS STRIP — ABOVE ARTICLE */}
      {/* ========================================================================= */}
      <div className="p-3 bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 rounded-xl flex flex-wrap items-center gap-2 text-xs">
        <span className="font-bold text-blue-900 dark:text-blue-300">Related Calculators:</span>
        <Link
          href="/calculators/sample-size-calculator"
          className="font-semibold text-blue-700 dark:text-blue-400 hover:underline"
        >
          Sample Size Calculator
        </Link>
        <span className="text-slate-300 dark:text-slate-700">&bull;</span>
        <Link
          href="/calculators/z-score-calculator"
          className="font-semibold text-blue-700 dark:text-blue-400 hover:underline"
        >
          Z-Score Calculator
        </Link>
        <span className="text-slate-300 dark:text-slate-700">&bull;</span>
        <Link
          href="/calculators/statistics-calculator"
          className="font-semibold text-blue-700 dark:text-blue-400 hover:underline"
        >
          Statistics Calculator
        </Link>
      </div>

      {/* ========================================================================= */}
      {/* 1. WHAT IS A CONFIDENCE INTERVAL */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          What Is a Confidence Interval?
        </h2>
        <p>
          A <strong>confidence interval (CI)</strong> is a range of values calculated from sample data to estimate an unknown population parameter. Instead of reporting only a single estimate, such as a sample mean or sample proportion, a confidence interval communicates the estimate together with its statistical uncertainty.
        </p>

        <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/60 text-center font-mono font-bold text-blue-900 dark:text-blue-200 text-sm sm:text-base">
          Confidence Interval = Point Estimate &plusmn; (Critical Value &times; Standard Error)
        </div>

        <p>
          The exact calculation depends on what is being estimated and which assumptions apply. A population mean may use a Z interval when the population standard deviation is known or a Student&apos;s t interval when the population standard deviation is estimated from the sample. A population proportion can be estimated using methods such as the Wilson score interval, Wald interval, or Agresti-Coull interval. Differences between two independent means can be estimated with a Welch interval, while a confidence interval for a population variance or standard deviation uses the chi-square distribution under the normal-population assumption.
        </p>
        <p>
          This calculator brings these related calculations together so that you can enter the appropriate sample information, select a confidence level, inspect the mathematical steps, and see the resulting interval without manually looking up critical values.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 2. WHAT DOES A CONFIDENCE LEVEL MEAN */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          What Does a Confidence Level Mean?
        </h2>
        <p>
          A confidence level describes the long-run performance of the interval-producing procedure.
        </p>
        <p>
          For example, a 95% confidence procedure is constructed so that, under repeated random sampling and the assumptions of the method, approximately 95% of the resulting intervals would contain the fixed population parameter. It does not mean that there is a 95% probability that a particular fixed parameter is inside an interval after that interval has already been calculated.
        </p>
        <p>
          This distinction matters because the population parameter is treated as fixed in the frequentist framework, while the sample and therefore the calculated interval vary from sample to sample.
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
          Repeated samples &rarr; repeated intervals &rarr; approximately the selected percentage contain the true parameter.
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CONFIDENCE LEVEL AND MARGIN OF ERROR */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Confidence Level and Margin of Error
        </h2>
        <p>
          Confidence level and margin of error control different aspects of an interval.
        </p>
        <p>
          The confidence level determines how much of the sampling distribution is retained in the central confidence region. The margin of error determines how far the interval extends from its point estimate.
        </p>
        <p>
          For many symmetric intervals:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center text-xs font-mono">
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 font-bold">
            ME = Critical Value &times; SE
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 font-bold">
            CI = Estimate &plusmn; ME
          </div>
        </div>
        <p>
          Higher confidence generally requires a larger critical value, producing a wider interval. For example, common standard-normal multipliers are approximately 1.645 at 90%, 1.960 at 95%, 2.326 at 98%, and 2.576 at 99%.
        </p>
        <p>
          The trade-off is therefore straightforward:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-blue-50/50 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900/60">
            <strong>Higher confidence:</strong> Wider interval (more protective coverage)
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <strong>Lower confidence:</strong> Narrower interval (tighter precision)
          </div>
        </div>
        <p>
          The interval becomes wider because you are asking the procedure to capture the unknown population parameter more often over repeated samples.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 4. CONFIDENCE INTERVAL FOR A POPULATION MEAN */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Confidence Interval for a Population Mean
        </h2>
        <p>
          A common goal is estimating a population mean &mu; from a sample mean x̄. When the population standard deviation is unknown, the standard one-sample t interval is:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-center font-bold text-sm">
          CI = x̄ &plusmn; t* (s / &radic;n)
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-center">
          <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">x̄ = sample mean</div>
          <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">s = sample SD</div>
          <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">n = sample size</div>
          <div className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">df = n - 1</div>
        </div>
        <p>
          The standard error is SE = s / &radic;n, and the margin of error is ME = t* &times; SE. NIST gives the same general t-based confidence-interval structure for a population mean. The important point is that the critical value depends on both the confidence level and the degrees of freedom.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 5. STUDENT'S t INTERVAL VS Z INTERVAL */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Student&apos;s t Interval vs Z Interval
        </h2>
        <p>
          The calculator distinguishes between an unknown population standard deviation and a known population standard deviation.
        </p>
        <p>
          When the population standard deviation &sigma; is known, a Z-based interval can use:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-center font-bold text-xs">
          CI = x̄ &plusmn; Z* (&sigma; / &radic;n)
        </div>
        <p>
          When &sigma; is unknown and the sample standard deviation s is used instead, the corresponding one-sample interval uses the Student&apos;s t distribution:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-center font-bold text-xs">
          CI = x̄ &plusmn; t* (s / &radic;n)
        </div>
        <p>
          Penn State describes this same distinction: the t distribution is used for the population-mean interval when the population standard deviation is unknown and the sample standard deviation is used. These two methods can produce noticeably different results for small samples because the t distribution has heavier tails than the standard normal distribution.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 6. WORKED EXAMPLE: 95% CONFIDENCE INTERVAL FOR A MEAN */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Worked Example: 95% Confidence Interval for a Mean
        </h2>
        <p>
          Suppose a sample has x̄ = 24.5, s = 4, and n = 16. For an unknown population standard deviation:
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono">
          <p>df = 16 - 1 = 15</p>
          <p>Standard Error: SE = 4 / &radic;16 = 1.0000</p>
          <p>Critical Value for two-sided 95% t with df=15: t* &approx; 2.1314</p>
          <p>Margin of Error: ME = 2.1314 &times; 1 = &plusmn;2.1314</p>
          <p className="font-bold text-blue-600 dark:text-blue-400 text-sm">
            Interval: 24.5 &plusmn; 2.1314 = [22.3686, 26.6314]
          </p>
        </div>
        <p>
          This is also the calculator&apos;s audited 95% Student&apos;s t golden case.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 7. WHY DOES THE t DISTRIBUTION DEPEND ON SAMPLE SIZE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Why Does the t Distribution Depend on Sample Size?
        </h2>
        <p>
          The t distribution is indexed by degrees of freedom. For a one-sample mean interval, df = n - 1. With fewer observations, the uncertainty introduced by estimating the population standard deviation from the sample is greater. The t distribution accounts for this additional uncertainty through its heavier tails.
        </p>
        <p>
          As df becomes large, the t distribution approaches the standard normal distribution. This is why t and Z critical values become increasingly similar for large samples. This relationship is visible in the calculator: changing the sample size changes the degrees of freedom, which can change the critical value and consequently the confidence interval.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 8. 98% CONFIDENCE INTERVAL EXAMPLE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          98% Confidence Interval Example
        </h2>
        <p>
          Using the same sample (x̄ = 24.5, s = 4, n = 16) but increasing confidence from 95% to 98% gives df = 15 and SE = 1.
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono">
          <p>Critical Value for two-sided 98% t with df=15: t* &approx; 2.60248</p>
          <p>Margin of Error: ME &approx; 2.60248</p>
          <p className="font-bold text-blue-600 dark:text-blue-400 text-sm">
            CI &approx; [21.8975, 27.1025]
          </p>
        </div>
        <p>
          The calculator&apos;s audit specifically corrected an earlier approximation that returned approximately 2.6013. The current implementation was verified against the more accurate value 2.602480... This is a useful illustration of why critical-value precision matters: even a small difference in the critical value propagates directly into the margin of error and interval endpoints.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 9. STANDARD ERROR AND CONFIDENCE INTERVAL WIDTH */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Standard Error and Confidence Interval Width
        </h2>
        <p>
          The standard error describes the estimated variability of a statistic from sample to sample. For a mean, SE = s / &radic;n. As the sample size increases, &radic;n increases and the standard error generally decreases.
        </p>
        <p>
          That produces narrower confidence intervals when the other inputs remain fixed. This is why collecting more observations generally improves the precision of a mean estimate. The relationship can be summarized as:
        </p>
        <div className="p-3 bg-blue-50/60 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900/60 text-xs font-mono font-bold text-center text-blue-900 dark:text-blue-200">
          n &uarr; &rArr; SE &darr; &rArr; ME &darr; &rArr; CI becomes narrower
        </div>
        <p>
          The relationship between confidence intervals and sample size is also fundamental to sample-size planning. When you need to determine the number of observations required to achieve a target margin of error, use the{" "}
          <Link
            href="/calculators/sample-size-calculator"
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
          >
            Sample Size Calculator
          </Link>{" "}
          in the site&apos;s statistics tools.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 10. CONFIDENCE INTERVAL FOR A POPULATION PROPORTION */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Confidence Interval for a Population Proportion
        </h2>
        <p>
          A population proportion is estimated from p̂ = x / n, where x is the number of successes and n is the sample size. For example, if 520 out of 1,000 observations are classified as successes, p̂ = 520 / 1000 = 0.52 (52%).
        </p>
        <p>
          The interval method then determines how uncertainty around that sample proportion should be represented. The calculator provides three commonly encountered methods:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-1">Wilson Score</h3>
            <p>Inverts the score test; recommended standard with superior coverage near 0 and 1.</p>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">Wald Standard Normal</h3>
            <p>Simple classical formula; assumes large n and proportions away from extremes.</p>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">Agresti-Coull</h3>
            <p>Adjusts successes and sample size (plus-four) to stabilize coverage behavior.</p>
          </div>
        </div>
        <p>
          These methods do not always produce identical endpoints because they use different approaches to representing uncertainty around a binomial proportion. NIST documents the formulas and discusses the coverage behavior of the Wilson and adjusted-Wald/Agresti-Coull methods.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 11. WILSON, WALD & AGRESTI-COULL FORMULA BREAKDOWNS */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Wilson Score, Wald &amp; Agresti-Coull Details
        </h2>
        <div className="space-y-3 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Wilson Score Interval</h3>
            <p>
              The Wilson interval is based on inverting the score test rather than simply applying the ordinary Wald formula directly to the observed proportion:
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-center text-blue-600 dark:text-blue-400 font-bold">
              [p̂ + z*&sup2;/(2n) &plusmn; z*&radic;(p̂(1 - p̂)/n + z*&sup2;/(4n&sup2;))] / (1 + z*&sup2;/n)
            </div>
            <p>The method has desirable coverage behavior compared with the simple normal approximation in many situations, particularly when the proportion is closer to 0 or 1.</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Wald Confidence Interval</h3>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-center font-bold">
              p̂ &plusmn; z* &radic;(p̂(1 - p̂) / n)
            </div>
            <p>It is simple and intuitive, but can behave poorly when sample size is small or the proportion is near 0 or 1. NIST recommends restricting its use to situations where the normal approximation is fully appropriate.</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Agresti-Coull Confidence Interval</h3>
            <p>The Agresti-Coull method adjusts the observed success count and sample size before applying a normal-style interval, defining ñ = n + z*&sup2; and p̃ = (x + z*&sup2;/2) / ñ.</p>
          </div>
        </div>

        <div className="p-4 bg-blue-50/50 dark:bg-blue-950/30 rounded-2xl border border-blue-100 dark:border-blue-900/60 space-y-2 text-xs">
          <h3 className="font-bold text-blue-900 dark:text-blue-300">Worked Proportion Example (x = 520, n = 1000, 95% CL):</h3>
          <p className="font-mono">Wilson: [48.90%, 55.08%] &bull; Wald: [48.90%, 55.10%] &bull; Agresti-Coull: [48.90%, 55.08%]</p>
          <p className="text-slate-600 dark:text-slate-400">These differences are small for this large, centrally located sample, but demonstrate that proportion intervals are not one unique formula.</p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. DIFFERENCE BETWEEN TWO INDEPENDENT MEANS */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Confidence Interval for the Difference Between Two Means
        </h2>
        <p>
          When comparing two independent groups, the parameter of interest is often &mu;1 - &mu;2. The point estimate is x̄1 - x̄2. For unequal variances, the Welch approach uses:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-center font-bold text-xs">
          SE = &radic;(s1&sup2; / n1 + s2&sup2; / n2) &bull; CI = (x̄1 - x̄2) &plusmn; t* &times; SE
        </div>
        <p>
          and a Welch-Satterthwaite approximation for the degrees of freedom. NIST gives this form and notes that the Welch-Satterthwaite approach is particularly useful when sample sizes or variances are unequal.
        </p>

        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono">
          <span className="font-bold font-sans text-slate-900 dark:text-slate-100 block">Worked Difference-of-Means Example:</span>
          <p>Group 1: x̄1 = 105, s1 = 12, n1 = 25 | Group 2: x̄2 = 98, s2 = 15, n2 = 30</p>
          <p>Difference: 105 - 98 = 7.0000 | SE &approx; 3.6414 | Welch df &approx; 52.93</p>
          <p>Critical t* &approx; 2.0058 | ME &approx; &plusmn;7.3040</p>
          <p className="font-bold text-blue-600 dark:text-blue-400 text-sm">
            CI = [-0.3040, 14.3040]
          </p>
        </div>
        <p>
          Because zero lies inside this interval, the data are compatible with a zero difference at the selected confidence level. This does not mean the two population means have been proven identical; it means that zero remains among the values compatible with the interval at that confidence level.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 13. WHAT DOES IT MEAN WHEN A CI INCLUDES ZERO */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          What Does It Mean When a Confidence Interval Includes Zero?
        </h2>
        <p>
          For a difference parameter such as &mu;1 - &mu;2, zero represents &mu;1 - &mu;2 = 0, which means no difference in the population parameter. Therefore, if a two-sided confidence interval for the difference includes zero, zero remains compatible with the interval at that confidence level.
        </p>
        <p>
          For example, [-0.30, 14.30] contains zero, so the interval does not exclude a zero difference. Conversely, [3.93, 16.07] does not contain zero, so zero is outside the interval. Avoid interpreting this as proof that one group &quot;has no effect&quot; or that the populations are identical. The interval describes the uncertainty in the estimated difference.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 14. DIFFERENCE BETWEEN TWO INDEPENDENT PROPORTIONS */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Confidence Interval for the Difference Between Two Proportions
        </h2>
        <p>
          For two independent proportions, p̂1 = x1 / n1 and p̂2 = x2 / n2, the point estimate is p̂1 - p̂2.
        </p>
        <p>
          Suppose x1 = 320, n1 = 500 (p̂1 = 64%) and x2 = 270, n2 = 500 (p̂2 = 54%). The observed difference is 10 percentage points.
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono">
          <p>Standard Error: SE = &radic;[(0.64 &times; 0.36)/500 + (0.54 &times; 0.46)/500] = 0.0309</p>
          <p>Margin of Error: ME = 1.9600 &times; 0.0309 = 0.0607 (6.07 percentage points)</p>
          <p className="font-bold text-blue-600 dark:text-blue-400 text-sm">
            CI = [3.93%, 16.07%]
          </p>
        </div>
        <p>
          Because zero is outside the interval, zero is excluded at the selected confidence level, indicating a statistically significant difference in proportions.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 15. POPULATION VARIANCE & STANDARD DEVIATION */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Confidence Interval for Population Variance &amp; Standard Deviation
        </h2>
        <p>
          A confidence interval for a population variance is different from a confidence interval for a mean. Under the normal-population assumption, the chi-square distribution provides the relevant sampling relationship:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-center font-bold text-xs">
          (n - 1)s&sup2; / &chi;&sup2;<sub>1 - &alpha;/2</sub> &le; &sigma;&sup2; &le; (n - 1)s&sup2; / &chi;&sup2;<sub>&alpha;/2</sub>
        </div>
        <p>
          The corresponding standard-deviation interval is obtained by taking square roots of the variance bounds. NIST documents this exact chi-square approach and explicitly notes the normality assumption. Unlike a mean interval, the variance interval is naturally asymmetric around the sample variance.
        </p>

        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono">
          <span className="font-bold font-sans text-slate-900 dark:text-slate-100 block">Worked Variance Example (s = 10, n = 20, 95% CL):</span>
          <p>s&sup2; = 100, df = 19. Critical values: &chi;&sup2;<sub>0.025</sub> = 8.9065, &chi;&sup2;<sub>0.975</sub> = 32.8523</p>
          <p className="font-bold text-blue-600 dark:text-blue-400 text-sm">
            Variance CI: &sigma;&sup2; &isin; [57.8346, 213.3270]
          </p>
          <p className="font-bold text-purple-600 dark:text-purple-400 text-sm">
            Standard Deviation CI: &sigma; &isin; [7.6049, 14.6057]
          </p>
          <p className="text-slate-500 text-[11px]">7.6049&sup2; &approx; 57.8346 and 14.6057&sup2; &approx; 213.3270.</p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 16. CONCEPT COMPARISONS (SD, Z-SCORE, SAMPLE SIZE) */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Confidence Interval vs Other Statistical Concepts
        </h2>
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Confidence Interval vs Standard Deviation</h3>
            <p>Standard deviation describes dispersion among individual observations. Standard error describes estimated sampling variability of a statistic. A confidence interval combines the point estimate, standard error, and critical value to create a range for a population parameter. Use the <Link href="/calculators/standard-deviation-calculator" className="text-blue-600 font-bold hover:underline">Standard Deviation Calculator</Link> to inspect raw sample variability.</p>
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Confidence Interval vs Z-Score</h3>
            <p>A Z-score standardizes an individual observation relative to a mean and standard deviation (z = (x - &mu;)/&sigma;). A confidence interval uses a sampling distribution to estimate an unknown population parameter. Use the <Link href="/calculators/z-score-calculator" className="text-blue-600 font-bold hover:underline">Z-Score Calculator</Link> to calculate tail probabilities and percentiles.</p>
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Confidence Interval vs Sample Size</h3>
            <p>A confidence interval answers: &quot;Given my sample, what range of population values is compatible with the procedure?&quot; A sample size calculation asks: &quot;How many observations should I collect to achieve a target precision or power?&quot; For upfront study planning, use the <Link href="/calculators/sample-size-calculator" className="text-blue-600 font-bold hover:underline">Sample Size Calculator</Link>.</p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 17. COMMON CONFIDENCE INTERVAL MISTAKES */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Common Confidence Interval Mistakes
        </h2>
        <ul className="space-y-2 text-xs list-disc list-inside">
          <li><strong>Mistaking confidence level for probability of the parameter:</strong> A 95% confidence level does not mean there is a 95% posterior probability that the fixed population parameter is inside one already-calculated interval.</li>
          <li><strong>Using Z when t is required:</strong> If the population standard deviation is unknown and the sample standard deviation is used for a one-sample mean interval, Student&apos;s t is generally the appropriate classical method under the stated assumptions.</li>
          <li><strong>Ignoring degrees of freedom:</strong> For a one-sample t interval, df = n - 1. The critical value depends heavily on this quantity.</li>
          <li><strong>Treating every proportion interval as identical:</strong> Wilson, Wald, and Agresti-Coull intervals can produce different results, especially when samples are small or proportions are near 0 or 1.</li>
          <li><strong>Assuming an interval containing zero proves no difference:</strong> If a difference interval contains zero, zero remains compatible with the selected interval procedure; it does not prove equality.</li>
          <li><strong>Treating a variance interval like a mean interval:</strong> Variance intervals based on the chi-square distribution are asymmetric and depend on the normal-population assumption.</li>
          <li><strong>Rounding critical values too early:</strong> The critical value should retain adequate precision internally. Early rounding propagates into the margin of error and endpoints.</li>
        </ul>
      </section>

      {/* ========================================================================= */}
      {/* 18. EDUCATIONAL DIAGRAM: HOW A CONFIDENCE INTERVAL IS BUILT */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          How a Confidence Interval Is Built
        </h2>
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 text-center text-xs">
          <div className="inline-block p-2.5 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold rounded-xl border border-blue-200 dark:border-blue-800">
            1. Point Estimate (Sample Mean x̄ or Proportion p̂)
          </div>
          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-4 h-4" />
          </div>
          <div className="inline-block p-2.5 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-bold rounded-xl border border-slate-200 dark:border-slate-700">
            2. Standard Error (SE = s / &radic;n or &radic;[p(1-p)/n])
          </div>
          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-4 h-4" />
          </div>
          <div className="inline-block p-2.5 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-bold rounded-xl border border-slate-200 dark:border-slate-700">
            3. Critical Value (Z* or Student&apos;s t* from Confidence Level 1 - &alpha;)
          </div>
          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-4 h-4" />
          </div>
          <div className="inline-block p-2.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold rounded-xl border border-indigo-200 dark:border-indigo-800">
            4. Margin of Error (ME = Critical Value &times; Standard Error)
          </div>
          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-4 h-4" />
          </div>
          <div className="inline-block p-2.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold rounded-xl border border-emerald-200 dark:border-emerald-800">
            5. Final Confidence Interval: [Point Estimate - ME, Point Estimate + ME]
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 19. FREQUENTLY ASKED QUESTIONS (COMPLETELY UNFOLDED) */}
      {/* ========================================================================= */}
      <section className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span>Frequently Asked Questions</span>
          </h2>
          <p className="text-xs text-slate-500">
            Direct statistical answers to 30 essential questions regarding confidence intervals, standard errors, distributions, and interpretation.
          </p>
        </div>

        <div className="space-y-4">
          {confidence_interval_calculatorFaqs.map((faq, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-2xs space-y-2"
            >
              <div className="flex items-start gap-3">
                <span className="shrink-0 px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-mono font-black">
                  Q{index + 1}
                </span>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 leading-snug">
                  {faq.question}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-10">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 20. FINAL TAKEAWAY */}
      {/* ========================================================================= */}
      <section className="p-5 bg-blue-50/70 dark:bg-blue-950/40 rounded-2xl border border-blue-200 dark:border-blue-800/60 space-y-2">
        <h2 className="text-base font-bold text-blue-900 dark:text-blue-300 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-blue-600" />
          <span>Final Takeaway</span>
        </h2>
        <p className="text-xs text-slate-700 dark:text-slate-300">
          A confidence interval is more than a pair of numbers. It combines a point estimate, sampling uncertainty, critical value, confidence level, and the assumptions of the selected statistical model. For a mean, the difference between using a t distribution and a Z distribution can matter. For a proportion, Wilson, Wald and Agresti-Coull methods can produce different intervals. For two independent means, the Welch method accounts for unequal variances and sample sizes. For population variance and standard deviation, the chi-square distribution produces an inherently asymmetric interval under the normality assumption. Use the calculator to inspect the result, mathematical steps, critical values, standard error and visualization together.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 21. METHODOLOGY & IMPORTANT LIMITATIONS */}
      {/* ========================================================================= */}
      <section className="space-y-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
          <Layers className="w-4 h-4 text-slate-600" />
          <span>Methodology &amp; Important Limitations</span>
        </h3>
        <p>
          This calculator provides confidence-interval estimates according to the statistical methods implemented in the tool and the values entered by the user. Results depend on the assumptions of each method. A mathematically correct interval does not compensate for biased sampling, poor measurement, dependence between observations, an inappropriate model, or an incorrect study design.
        </p>
        <p>
          The classical t interval for a population mean relies on the conditions appropriate for the t-based procedure. The chi-square variance and standard-deviation intervals rely on an underlying normal-population assumption. Proportion intervals have different coverage properties and should be selected with attention to sample size and the location of the observed proportion. For complex research, clinical trials, regulated studies, clustered samples, or specialized experimental designs, consult study-specific statistical planning.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 22. EDUCATIONAL SOURCE NOTES */}
      {/* ========================================================================= */}
      <section className="space-y-3 pt-2 text-xs text-slate-500">
        <h3 className="font-bold text-slate-700 dark:text-slate-300 text-xs flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
          <span>Statistical References &amp; Authoritative Sources</span>
        </h3>
        <ul className="space-y-1.5 list-disc list-inside text-[11px] leading-relaxed">
          <li><strong>Penn State &bull; STAT 500:</strong> Confidence Intervals for means and proportions, Student&apos;s t, interpretation and conditions.</li>
          <li><strong>Penn State &bull; STAT 800:</strong> Estimating with Confidence; confidence-level multipliers and repeated-sampling interpretation.</li>
          <li><strong>NIST/SEMATECH e-Handbook:</strong> Proportion Confidence Intervals; Wald, Wilson, and Agresti-Coull methods and coverage properties.</li>
          <li><strong>NIST/SEMATECH e-Handbook:</strong> Difference of Means Confidence Limits; Welch-Satterthwaite approach for unequal variances.</li>
          <li><strong>NIST/SEMATECH e-Handbook:</strong> Standard Deviation Confidence Limits; chi-square confidence limits for population variance and standard deviation.</li>
        </ul>
      </section>

      {/* ========================================================================= */}
      {/* RELATED CALCULATORS STRIP — AFTER ARTICLE */}
      {/* ========================================================================= */}
      <div className="p-3 bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 rounded-xl flex flex-wrap items-center gap-2 text-xs">
        <span className="font-bold text-blue-900 dark:text-blue-300">Related Calculators:</span>
        <Link
          href="/calculators/sample-size-calculator"
          className="font-semibold text-blue-700 dark:text-blue-400 hover:underline"
        >
          Sample Size Calculator
        </Link>
        <span className="text-slate-300 dark:text-slate-700">&bull;</span>
        <Link
          href="/calculators/z-score-calculator"
          className="font-semibold text-blue-700 dark:text-blue-400 hover:underline"
        >
          Z-Score Calculator
        </Link>
        <span className="text-slate-300 dark:text-slate-700">&bull;</span>
        <Link
          href="/calculators/statistics-calculator"
          className="font-semibold text-blue-700 dark:text-blue-400 hover:underline"
        >
          Statistics Calculator
        </Link>
      </div>
    </article>
  );
}

export default ConfidenceIntervalContent;
