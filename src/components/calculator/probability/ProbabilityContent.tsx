"use client";

import React from "react";
import { normalCDF } from "@/app/calculators/probability-calculator/probability-logic";

export function ProbabilityContent() {
  // Pre-generate Z Table from Mean (0 to Z) for z = 0.0 to 4.0
  const zTableRows = Array.from({ length: 41 }, (_, i) => {
    const zVal = i / 10;
    const zStr = zVal.toFixed(1);
    const cols = Array.from({ length: 10 }, (_, j) => {
      const fullZ = zVal + j * 0.01;
      const val = normalCDF(fullZ) - 0.5;
      if (val <= 0) return "0";
      return val.toFixed(5);
    });
    return { zStr, cols };
  });

  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed font-sans text-xs sm:text-sm">

      {/* 1. PROBABILITY OF TWO EVENTS */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Probability of Two Events
        </h2>
        <p>
          Probability is the measure of the likelihood of an event occurring. It is quantified as a number between 0 and 1, with 1 signifying certainty, and 0 signifying that the event cannot occur. It follows that the higher the probability of an event, the more certain it is that the event will occur. In its most general case, probability can be defined numerically as the number of desired outcomes divided by the total number of outcomes. This is further affected by whether the events being studied are independent, mutually exclusive, or conditional, among other things. The calculator provided computes the probability that an event A or B does not occur, the probability A and/or B occur when they are not mutually exclusive, the probability that both event A and B occur, and the probability that either event A or event B occurs, but not both.
        </p>
      </section>

      {/* 2. COMPLEMENT OF A AND B */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Complement of A and B
        </h2>
        <p>
          Given a probability <strong>A</strong>, denoted by <strong>P(A)</strong>, it is simple to calculate the complement, or the probability that the event described by <strong>P(A)</strong> does not occur, <strong>P(A')</strong>. If, for example, <strong>P(A) = 0.65</strong> represents the probability that Bob does not do his homework, his teacher Sally can predict the probability that Bob does his homework as follows:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-sans tabular-nums font-semibold text-center text-xs">
          P(A') = 1 - P(A) = 1 - 0.65 = 0.35
        </div>
        <p>
          Given this scenario, there is, therefore, a 35% chance that Bob does his homework. Any <strong>P(B')</strong> would be calculated in the same manner, and it is worth noting that in the calculator above, can be independent; i.e. if <strong>P(A) = 0.65</strong>, <strong>P(B)</strong> does not necessarily have to equal <strong>0.35</strong>, and can equal <strong>0.30</strong> or some other number.
        </p>
      </section>

      {/* 3. INTERSECTION OF A AND B */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Intersection of A and B
        </h2>
        <p>
          The intersection of events <strong>A</strong> and <strong>B</strong>, written as <strong>P(A ∩ B)</strong> or <strong>P(A AND B)</strong> is the joint probability of at least two events, shown below in a Venn diagram. In the case where <strong>A</strong> and <strong>B</strong> are mutually exclusive events, <strong>P(A ∩ B) = 0</strong>. Consider the probability of rolling a 4 and 6 on a single roll of a die; it is not possible. These events would therefore be considered mutually exclusive. Computing <strong>P(A ∩ B)</strong> is simple if the events are independent. In this case, the probabilities of events <strong>A</strong> and <strong>B</strong> are multiplied. To find the probability that two separate rolls of a die result in 6 each time:
        </p>
        
        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-sans tabular-nums font-semibold text-center text-xs space-y-1">
          <p>P(A ∩ B) = P(A) × P(B)</p>
          <div className="flex items-center justify-center gap-2">
            <span>1/6 × 1/6 = 0.0278</span>
          </div>
        </div>

        {/* Venn Diagram Intersection SVG */}
        <div className="flex justify-center py-2">
          <svg width="200" height="120" viewBox="0 0 200 120" className="border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900">
            <circle cx="80" cy="60" r="45" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <circle cx="120" cy="60" r="45" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <path d="M 100 20 A 45 45 0 0 1 100 100 A 45 45 0 0 1 100 20 Z" fill="#ef4444" />
            <text x="60" y="65" textAnchor="middle" className="font-bold text-xs font-sans fill-slate-900 dark:fill-slate-100">A</text>
            <text x="140" y="65" textAnchor="middle" className="font-bold text-xs font-sans fill-slate-900 dark:fill-slate-100">B</text>
          </svg>
        </div>

        <p>
          The calculator provided considers the case where the probabilities are independent. Calculating the probability is slightly more involved when the events are dependent, and involves an understanding of conditional probability, or the probability of event <strong>A</strong> given that event <strong>B</strong> has occurred, <strong>P(A|B)</strong>. Take the example of a bag of 10 marbles, 7 of which are black, and 3 of which are blue. Calculate the probability of drawing a black marble if a blue marble has been withdrawn without replacement (the blue marble is removed from the bag, reducing the total number of marbles in the bag):
        </p>

        <p className="font-sans tabular-nums font-medium text-xs pl-4">
          Probability of drawing a blue marble: P(A) = 3/10<br />
          Probability of drawing a black marble: P(B) = 7/10<br />
          Probability of drawing a black marble given that a blue marble was drawn: P(B|A) = 7/9
        </p>

        <p>
          Probability of drawing a blue and then black marble using the probabilities calculated above:
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-sans tabular-nums font-semibold text-center text-xs">
          P(A ∩ B) = P(A) × P(B|A) = (3/10) × (7/9) = 0.2333
        </div>
      </section>

      {/* 4. UNION OF A AND B */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Union of A and B
        </h2>
        <p>
          In probability, the union of events, <strong>P(A ∪ B)</strong>, essentially involves the condition where any or all of the events being considered occur, shown in the Venn diagram below. Note that <strong>P(A ∪ B)</strong> can also be written as <strong>P(A OR B)</strong>. In this case, the "inclusive OR" is being used. This means that while at least one of the conditions within the union must hold true, all conditions can be simultaneously true. There are two cases for the union of events; the events are either mutually exclusive, or the events are not mutually exclusive. In the case where the events are mutually exclusive, the calculation of the probability is simpler:
        </p>

        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-sans tabular-nums font-semibold text-center text-xs">
          P(A ∪ B) = P(A) + P(B)
        </div>

        {/* Venn Diagram Union Mutually Exclusive SVG */}
        <div className="flex justify-center py-2">
          <svg width="220" height="110" viewBox="0 0 220 110" className="border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900">
            <circle cx="65" cy="55" r="40" fill="#ef4444" opacity="0.8" stroke="#000000" strokeWidth="1.5" />
            <circle cx="155" cy="55" r="40" fill="#ef4444" opacity="0.8" stroke="#000000" strokeWidth="1.5" />
            <text x="65" y="60" textAnchor="middle" className="font-bold text-xs font-sans fill-slate-900">A</text>
            <text x="155" y="60" textAnchor="middle" className="font-bold text-xs font-sans fill-slate-900">B</text>
          </svg>
        </div>

        <p>
          A basic example of mutually exclusive events would be the rolling of a dice, where event <strong>A</strong> is the probability that an even number is rolled, and event <strong>B</strong> is the probability that an odd number is rolled. It is clear in this case that the events are mutually exclusive since a number cannot be both even and odd, so <strong>P(A ∪ B) would be 3/6 + 3/6 = 1</strong>, since a standard dice only has odd and even numbers.
        </p>
        <p>
          The calculator above computes the other case, where the events <strong>A</strong> and <strong>B</strong> are not mutually exclusive. In this case:
        </p>

        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-sans tabular-nums font-semibold text-center text-xs">
          P(A ∪ B) = P(A) + P(B) - P(A ∩ B)
        </div>

        {/* Venn Diagram Union Overlapping SVG */}
        <div className="flex justify-center py-2">
          <svg width="200" height="120" viewBox="0 0 200 120" className="border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900">
            <circle cx="80" cy="60" r="45" fill="#ef4444" opacity="0.8" stroke="#000000" strokeWidth="1.5" />
            <circle cx="120" cy="60" r="45" fill="#ef4444" opacity="0.8" stroke="#000000" strokeWidth="1.5" />
            <text x="65" y="65" textAnchor="middle" className="font-bold text-xs font-sans fill-slate-900">A</text>
            <text x="135" y="65" textAnchor="middle" className="font-bold text-xs font-sans fill-slate-900">B</text>
          </svg>
        </div>

        <p>
          Using the example of rolling dice again, find the probability that an even number or a number that is a multiple of 3 is rolled. Here the set is represented by the 6 values of the dice, written as:
        </p>

        <div className="font-sans tabular-nums font-medium text-xs pl-4 space-y-1">
          <p>S = &#123;1,2,3,4,5,6&#125;</p>
          <p>Probability of an even number: P(A) = &#123;2,4,6&#125; = 3/6</p>
          <p>Probability of a multiple of 3: P(B) = &#123;3,6&#125; = 2/6</p>
          <p>Intersection of A and B: P(A ∩ B) = &#123;6&#125; = 1/6</p>
          <p>P(A ∪ B) = 3/6 + 2/6 - 1/6 = 4/6 = 2/3</p>
        </div>
      </section>

      {/* 5. EXCLUSIVE OR OF A AND B */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Exclusive OR of A and B
        </h2>
        <p>
          Another possible scenario that the calculator above computes is <strong>P(A XOR B)</strong>, shown in the Venn diagram below. The "Exclusive OR" operation is defined as the event that A or B occurs, but not simultaneously. The equation is as follows:
        </p>

        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-sans tabular-nums font-semibold text-center text-xs">
          P(A XOR B) = P(A) + P(B) - 2 × P(A ∩ B)
        </div>

        {/* Venn Diagram XOR SVG */}
        <div className="flex justify-center py-2">
          <svg width="200" height="120" viewBox="0 0 200 120" className="border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900">
            <circle cx="80" cy="60" r="45" fill="#ef4444" opacity="0.8" stroke="#000000" strokeWidth="1.5" />
            <circle cx="120" cy="60" r="45" fill="#ef4444" opacity="0.8" stroke="#000000" strokeWidth="1.5" />
            <path d="M 100 20 A 45 45 0 0 1 100 100 A 45 45 0 0 1 100 20 Z" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <text x="65" y="65" textAnchor="middle" className="font-bold text-xs font-sans fill-slate-900">A</text>
            <text x="135" y="65" textAnchor="middle" className="font-bold text-xs font-sans fill-slate-900">B</text>
          </svg>
        </div>

        <p>
          As an example, imagine it is Halloween, and two buckets of candy are set outside the house, one containing Snickers, and the other containing Reese's. Multiple flashing neon signs are placed around the buckets of candy insisting that each trick-or-treater only takes one Snickers OR Reese's but not both! It is unlikely, however, that every child adheres to the flashing neon signs. Given a probability of Reese's being chosen as <strong>P(A) = 0.65</strong>, or Snickers being chosen with <strong>P(B) = 0.349</strong>, and a <strong>P(unlikely) = 0.001</strong> that a child exercises restraint while considering the detriments of a potential future cavity, calculate the probability that Snickers or Reese's is chosen, but not both:
        </p>

        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-sans tabular-nums font-semibold text-center text-xs">
          0.65 + 0.349 - 2 × 0.65 × 0.349 = 0.999 - 0.4537 = 0.5453
        </div>
        <p>
          Therefore, there is a 54.53% chance that Snickers or Reese's is chosen, but not both.
        </p>
      </section>

      {/* 6. PROBABILITY OF A SERIES OF INDEPENDENT EVENTS */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Probability of a Series of Independent Events
        </h2>
        <p>
          When evaluating a series of repeated independent trials for event A (probability p, repeated n times) and event B (probability q, repeated m times), the probabilities follow exponential powers:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Probability of A occurring n times = p<sup>n</sup></li>
          <li>Probability of A NOT occurring = (1 - p)<sup>n</sup></li>
          <li>Probability of A occurring at least once = 1 - (1 - p)<sup>n</sup></li>
          <li>Probability of both A and B occurring in their respective series = (1 - (1 - p)<sup>n</sup>) × (1 - (1 - q)<sup>m</sup>)</li>
        </ul>
      </section>

      {/* 7. PROBABILITY OF A NORMAL DISTRIBUTION */}
      <section className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Normal Distribution
        </h2>
        <p>
          The normal distribution or Gaussian distribution is a continuous probability distribution that follows the function of:
        </p>

        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-sans tabular-nums font-semibold text-center text-xs">
          f(x) = (1 / √(2πσ²)) × e<sup>-((x - μ)² / (2σ²))</sup>
        </div>

        <p>
          where <strong>μ</strong> is the mean and <strong>σ²</strong> is the variance. Note that standard deviation is typically denoted as <strong>σ</strong>. Also, in the special case where <strong>μ = 0</strong> and <strong>σ = 1</strong>, the distribution is referred to as a standard normal distribution. Above, along with the calculator, is a diagram of a typical normal distribution curve.
        </p>

        <p>
          The normal distribution is often used to describe and approximate any variable that tends to cluster around the mean, for example, the heights of male students in a college, the leaf sizes on a tree, the scores of a test, etc. Use the "Normal Distribution" calculator above to determine the probability of an event with a normal distribution lying between two given values (i.e. P in the diagram above); for example, the probability of the height of a male student is between 5 and 6 feet in a college. Finding P as shown in the above diagram involves standardizing the two desired values to a z-score by subtracting the given mean and dividing by the standard deviation, as well as using a Z-table to find probabilities for Z. If, for example, it is desired to find the probability that a student at a university has a height between 60 inches and 72 inches tall given a mean of 68 inches tall with a standard deviation of 4 inches, 60 and 72 inches would be standardized as such:
        </p>

        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded font-sans tabular-nums font-semibold text-center text-xs space-y-1">
          <p>Given μ = 68; σ = 4</p>
          <p>(60 - 68) / 4 = -8 / 4 = -2</p>
          <p>(72 - 68) / 4 = 4 / 4 = 1</p>
        </div>

        {/* Normal Curve Graphic for Worked Example */}
        <div className="flex justify-center py-2">
          <svg width="240" height="110" viewBox="0 0 240 110" className="border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900">
            <path d="M 20 90 L 48.5 90 L 48.5 86.8 L 77.1 79.5 L 105.7 45 L 134.3 45 L 162.8 79.5 L 162.8 90 L 220 90 Z" fill="#86efac" opacity="0.6" />
            <line x1="10" y1="90" x2="230" y2="90" stroke="#334155" strokeWidth="1.5" />
            <path d="M 10 90 Q 60 90 90 50 Q 120 10 150 50 Q 180 90 230 90" fill="none" stroke="#16a34a" strokeWidth="2" />
            <line x1="120" y1="20" x2="120" y2="90" stroke="#16a34a" strokeDasharray="3 3" />
            <text x="48.5" y="105" textAnchor="middle" className="text-[10px] font-sans tabular-nums font-bold fill-slate-700">-2</text>
            <text x="84.2" y="105" textAnchor="middle" className="text-[10px] font-sans tabular-nums font-bold fill-slate-700">-1</text>
            <text x="120" y="105" textAnchor="middle" className="text-[10px] font-sans tabular-nums font-bold fill-slate-700">0</text>
            <text x="162.8" y="105" textAnchor="middle" className="text-[10px] font-sans tabular-nums font-bold fill-slate-700">1</text>
            <text x="191.4" y="105" textAnchor="middle" className="text-[10px] font-sans tabular-nums font-bold fill-slate-700">2</text>
            <text x="220" y="105" textAnchor="middle" className="text-[10px] font-sans tabular-nums font-bold fill-slate-700">3</text>
          </svg>
        </div>

        <p>
          The graph above illustrates the area of interest in the normal distribution. In order to determine the probability represented by the shaded area of the graph, use the standard normal Z-table provided at the bottom of the page. Note that there are different types of standard normal Z-tables. The table below provides the probability that a statistic is between 0 and Z, where 0 is the mean in the standard normal distribution. There are also Z-tables that provide the probabilities left or right of Z, both of which can be used to calculate the desired probability by subtracting the relevant values.
        </p>

        <p>
          For this example, to determine the probability of a value between 0 and 2, find 2 in the first column of the table, since this table by definition provides probabilities between the mean (which is 0 in the standard normal distribution) and the number of choices, in this case, 2. Note that since the value in question is 2.0, the table is read by lining up the 2 row with the 0 column, and reading the value therein. If, instead, the value in question were 2.11, the 2.1 row would be matched with the 0.01 column and the value would be 0.48257. Also, note that even though the actual value of interest is -2 on the graph, the table only provides positive values. Since the normal distribution is symmetrical, only the displacement is important, and a displacement of 0 to -2 or 0 to 2 is the same, and will have the same area under the curve. Thus, the probability of a value falling between 0 and 2 is 0.47725, while a value between 0 and 1 has a probability of 0.34134. Since the desired area is between -2 and 1, the probabilities are added to yield 0.81859, or approximately 81.859%. Returning to the example, this means that there is an 81.859% chance in this case that a male student at the given university has a height between 60 and 72 inches.
        </p>

        <p>
          The calculator also provides a table of confidence intervals for various confidence levels. Refer to the Sample Size Calculator for Proportions for a more detailed explanation of confidence intervals and levels. Briefly, a confidence interval is a way of estimating a population parameter that provides an interval of the parameter rather than a single value. A confidence interval is always qualified by a confidence level, usually expressed as a percentage such as 95%. It is an indicator of the reliability of the estimate.
        </p>
      </section>

      {/* 8. Z TABLE FROM MEAN (0 TO Z) */}
      <section className="space-y-3 pt-2">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
          Z Table from Mean (0 to Z)
        </h2>
        <div className="overflow-x-auto border border-slate-300 dark:border-slate-700 rounded">
          <table className="w-full text-[11px] font-sans tabular-nums text-center border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700 font-bold">
                <th className="p-1 border-r border-slate-300 dark:border-slate-700">z</th>
                <th className="p-1 border-r border-slate-300 dark:border-slate-700">0</th>
                <th className="p-1 border-r border-slate-300 dark:border-slate-700">0.01</th>
                <th className="p-1 border-r border-slate-300 dark:border-slate-700">0.02</th>
                <th className="p-1 border-r border-slate-300 dark:border-slate-700">0.03</th>
                <th className="p-1 border-r border-slate-300 dark:border-slate-700">0.04</th>
                <th className="p-1 border-r border-slate-300 dark:border-slate-700">0.05</th>
                <th className="p-1 border-r border-slate-300 dark:border-slate-700">0.06</th>
                <th className="p-1 border-r border-slate-300 dark:border-slate-700">0.07</th>
                <th className="p-1 border-r border-slate-300 dark:border-slate-700">0.08</th>
                <th className="p-1">0.09</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {zTableRows.map((row, i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-slate-50/50 dark:bg-slate-800/30" : ""}>
                  <td className="p-1 font-bold bg-slate-100 dark:bg-slate-800 border-r border-slate-300 dark:border-slate-700">{row.zStr}</td>
                  {row.cols.map((val, j) => (
                    <td key={j} className="p-1 border-r border-slate-200 dark:border-slate-800 last:border-r-0">{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
