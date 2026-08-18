"use client";

import React from "react";

export function BondContent() {
  return (
    <div className="space-y-10 text-black dark:text-slate-100 font-medium leading-relaxed">
      {/* 1. INTRODUCTION */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          1. Introduction to Bond Valuation &amp; Fixed-Income Mathematics
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          A <strong>bond</strong> is a contractual debt security issued by sovereign governments, state municipalities, or corporations to borrow capital from fixed-income investors. In exchange for the upfront capital, the issuing entity legally commits to making structured periodic interest distributions—known as <strong>coupon payments</strong>—and returning the initial par or face value in full upon reaching the contractual <strong>maturity date</strong>.
        </p>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          Fixed-income securities form the bedrock of global financial capital markets, with aggregate debt outstanding exceeding $130 trillion worldwide. Portfolio managers, corporate treasurers, banking institutions, and individual investors utilize quantitative bond valuation models to solve two primary problems:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm text-black dark:text-slate-100">
          <li>
            <strong>Bond Pricing:</strong> Determining the fair economic present value of future contractual cash flows discounted at current prevailing market interest rates.
          </li>
          <li>
            <strong>Yield to Maturity (YTM) Solving:</strong> Calculating the exact internal rate of return (IRR) implied by purchasing a bond at its current market trading price and holding it through redemption.
          </li>
          <li>
            <strong>Interest Rate Risk Modeling:</strong> Quantifying price sensitivity through first-order <em>Macaulay/Modified Duration</em> and second-order <em>Convexity</em> adjustments.
          </li>
        </ul>
      </section>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          2. Mathematical Concept &amp; Fundamental Fixed-Income Theory
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          Bond pricing is grounded in the <strong>Time Value of Money (TVM)</strong> and discounted cash flow (DCF) framework. A standard fixed-rate bond consists of two distinct financial cash flow streams:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              Stream 1: The Coupon Annuity Stream
            </h3>
            <p className="text-black dark:text-slate-100 leading-relaxed">
              A finite series of equal, periodic cash distributions received at regular intervals (annually, semi-annually, quarterly, or monthly) until the bond matures:
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-center font-mono font-bold text-black dark:text-slate-100">
              PV(Coupons) = C &times; [ (1 - (1 + y/m)^(-n)) / (y/m) ]
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              Stream 2: The Lump-Sum Par Redemption
            </h3>
            <p className="text-black dark:text-slate-100 leading-relaxed">
              A single future cash inflow representing the return of the bond&apos;s contractual principal (face value $F$) at the end of period $n$:
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-center font-mono font-bold text-black dark:text-slate-100">
              PV(Face Value) = F / (1 + y/m)^n
            </div>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          The sum of these two present values equals the fair market price P of the bond. Because discount factors (1 + y/m)<sup>-t</sup> decrease exponentially as market yields y increase, bond prices and interest rates exhibit a fundamental, mathematically immutable <strong>inverse relationship</strong>.
        </p>
      </section>

      {/* 3. FORMULA SECTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          3. Complete Bond Valuation Formulas Reference Matrix
        </h2>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2 text-xs">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. General Fixed-Rate Coupon Bond Price Formula
            </h3>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-center font-mono text-xs font-bold text-black dark:text-slate-100 overflow-x-auto">
              P = &sum;[t=1 to n] &lbrace; C / (1 + y/m)^t &rbrace; + &lbrace; F / (1 + y/m)^n &rbrace; = C &times; [ (1 - (1 + y/m)^(-n)) / (y/m) ] + [ F / (1 + y/m)^n ]
            </div>
            <p className="text-black dark:text-slate-100">
              Where: <strong>P</strong> = Bond Price ($), <strong>F</strong> = Face / Par Value ($), <strong>C</strong> = Periodic coupon payment (C = (F &times; r) / m), <strong>r</strong> = Stated annual coupon rate, <strong>y</strong> = Annual nominal Yield to Maturity (YTM), <strong>m</strong> = Coupon payment frequency per year (1, 2, 4, 12), and <strong>n</strong> = Total number of coupon periods (n = m &times; t).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2 text-xs">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. Zero-Coupon Bond Valuation Equation
            </h3>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-center font-mono text-xs font-bold text-black dark:text-slate-100">
              P = F / (1 + y/m)^(m &times; t) &emsp;&hArr;&emsp; y = m &times; [ (F / P)^(1 / (m &times; t)) - 1 ]
            </div>
            <p className="text-black dark:text-slate-100">
              Zero-coupon bonds pay no intermediate cash coupons (C = 0). They are sold at a deep discount to par value, with the investor&apos;s return generated entirely by the difference between purchase price and face value redemption.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2 text-xs">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              3. Clean Price vs. Dirty (Invoice) Price &amp; Accrued Interest
            </h3>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-center font-mono text-xs font-bold text-black dark:text-slate-100">
              Accrued Interest = C &times; ( Days Accrued / Days in Coupon Period ) &emsp;|&emsp; Dirty Price = Clean Quoted Price + Accrued Interest
            </div>
            <p className="text-black dark:text-slate-100">
              When a bond is traded between coupon payout dates, the buyer must reimburse the seller for the interest accrued during the seller&apos;s ownership proportion of the cycle.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2 text-xs">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              4. Macaulay Duration, Modified Duration &amp; Convexity
            </h3>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-center font-mono text-xs font-bold text-black dark:text-slate-100 overflow-x-auto">
              MacD = (1 / P) &times; &sum;[k=1 to n] &lbrace; (k / m) &times; [ CF_k / (1 + y/m)^k ] &rbrace; &emsp;|&emsp; ModD = MacD / (1 + y/m)
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-center font-mono text-xs font-bold text-black dark:text-slate-100 mt-2">
              &Delta;P &approx; -ModD &times; &Delta;y &times; P + 0.5 &times; Convexity &times; (&Delta;y)^2 &times; P
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW THE CALCULATION WORKS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          4. How the Calculation Works (Step-by-Step Computational Engine)
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          When you execute a valuation inside the calculator, the financial math engine executes the following procedural steps:
        </p>

        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <strong className="text-black dark:text-slate-100">Step 1 — Parameter Normalization:</strong> The stated annual coupon rate r is converted to a periodic dollar payment C = (F &times; r) / m. Total compounding periods n = m &times; t are computed.
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <strong className="text-black dark:text-slate-100">Step 2 — Cash Flow Discounting (Solving Price):</strong> If calculating price, each coupon C and the final par F are discounted at the periodic required yield y/m. Closed-form finite geometric series summation computes the exact present value in under 1 millisecond.
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <strong className="text-black dark:text-slate-100">Step 3 — Newton-Raphson Root Finding (Solving YTM):</strong> Because the YTM equation cannot be algebraically isolated for y, our engine employs second-order Newton-Raphson iteration:
            <div className="mt-1 font-mono text-center font-bold">
              y_(k+1) = y_k - [ P(y_k) - P_market ] / P&apos;(y_k)
            </div>
            This algorithm converges to an exact tolerance of 10<sup>-9</sup> within 4 to 6 iterations, backed by binary bisection fallback for extreme market anomalies.
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <strong className="text-black dark:text-slate-100">Step 4 — Day-Count Accrued Interest Determination:</strong> Using the selected convention (30/360, Actual/Actual, Actual/360, or Actual/365), exact elapsed days are evaluated to derive the Dirty Invoice Price.
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <strong className="text-black dark:text-slate-100">Step 5 — Duration, Convexity &amp; Risk Sensitivities:</strong> The first and second derivatives of the price-yield curve are computed to evaluate interest rate sensitivity across &plusmn;50, &plusmn;100, and &plusmn;200 basis point shocks.
          </div>
        </div>
      </section>

      {/* 5. WORKED EXAMPLES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          5. Worked Step-by-Step Mathematical Examples
        </h2>

        {/* Example 1 */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2 text-xs">
          <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
            Example 1: Pricing a 10-Year Semi-Annual Corporate Bond at Premium
          </h3>
          <p className="text-black dark:text-slate-100">
            <strong>Inputs:</strong> Face Value F = $1,000, Annual Coupon Rate = 6.0% (C = $30 semi-annually), Time to Maturity = 10 years (n = 20 periods), Market Required YTM = 5.0% (y = 0.05 &rarr; y/2 = 0.025).
          </p>
          <div className="space-y-1 font-mono text-black dark:text-slate-100 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
            <div>1. PV of Coupon Annuity = 30 &times; [ (1 - (1.025)^(-20)) / 0.025 ] = 30 &times; 15.58916 = $467.67</div>
            <div>2. PV of Par Value = $1,000 / (1.025)^20 = $610.27</div>
            <div>3. Total Clean Bond Price = $467.67 + $610.27 = $1,077.94</div>
            <div className="text-emerald-700 dark:text-emerald-400 font-bold font-sans mt-1">
              Result: The bond trades at a $77.94 premium above par ($1,077.94) because its coupon (6.0%) exceeds the market yield (5.0%).
            </div>
          </div>
        </div>

        {/* Example 2 */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2 text-xs">
          <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
            Example 2: Pricing a 5-Year Zero-Coupon US Treasury STRIPS
          </h3>
          <p className="text-black dark:text-slate-100">
            <strong>Inputs:</strong> Face Value F = $1,000, Coupon = 0%, Years to Maturity = 5 years, Market YTM = 4.0% with standard semi-annual compounding (m = 2, n = 10).
          </p>
          <div className="space-y-1 font-mono text-black dark:text-slate-100 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
            <div>1. Periodic Discount Rate = 4.0% / 2 = 2.0% (0.02)</div>
            <div>2. Total Discount Periods = 5 &times; 2 = 10 periods</div>
            <div>3. Bond Price = $1,000 / (1 + 0.02)^10 = $1,000 / 1.218994 = $820.35</div>
            <div className="text-blue-700 dark:text-blue-400 font-bold font-sans mt-1">
              Result: The zero-coupon bond is priced at $820.35, delivering a cumulative dollar gain of $179.65 at maturity.
            </div>
          </div>
        </div>

        {/* Example 3 */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2 text-xs">
          <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
            Example 3: Modified Duration &amp; Price Shock Estimation
          </h3>
          <p className="text-black dark:text-slate-100">
            A 10-year par bond trading at $1,000 with a 5.0% coupon has a Macaulay Duration of 7.987 years.
          </p>
          <div className="space-y-1 font-mono text-black dark:text-slate-100 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
            <div>1. Modified Duration = 7.987 / (1 + 0.05/2) = 7.987 / 1.025 = 7.792%</div>
            <div>2. If market interest rates increase by +100 bps (+1.0% or &Delta;y = +0.01):</div>
            <div>3. Estimated Price Drop &approx; -7.792 &times; (+0.01) &times; $1,000 = -$77.92 (-7.79%)</div>
            <div>4. New Estimated Price = $1,000 - $77.92 = $922.08</div>
          </div>
        </div>
      </section>

      {/* 6. VISUAL UNDERSTANDING */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          6. Visual Understanding: Convexity, Cash Flows &amp; Pull-to-Par
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              The Convexity Asymmetry Advantage
            </h3>
            <p className="text-black dark:text-slate-100 leading-relaxed">
              Because the price-yield curve is convex (curving upward toward the origin), bond prices experience an asymmetric advantage:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-black dark:text-slate-100">
              <li>When interest rates <strong>fall by 100 bps</strong>, the bond price rises by <em>more</em> than what linear duration predicts.</li>
              <li>When interest rates <strong>rise by 100 bps</strong>, the bond price drops by <em>less</em> than what linear duration predicts.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              The &quot;Pull-to-Par&quot; Phenomenon
            </h3>
            <p className="text-black dark:text-slate-100 leading-relaxed">
              Regardless of whether a bond originally trades at a premium (Price &gt; Par) or a discount (Price &lt; Par), as the bond approaches its contractual maturity date, its market price naturally converges toward par value (F = $1,000), assuming the issuer remains solvent and does not default.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2 text-xs">
          <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
            Bond Classification Summary Table
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse text-xs font-mono font-bold">
              <thead>
                <tr className="border-b border-slate-300 dark:border-slate-700 text-black dark:text-slate-100">
                  <th className="p-2 text-left font-sans">Trading Condition</th>
                  <th className="p-2">Price vs. Par</th>
                  <th className="p-2">Yield vs. Coupon</th>
                  <th className="p-2">Yield Ranking Hierarchy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-black dark:text-slate-100">
                <tr>
                  <td className="p-2 text-left font-sans font-bold text-amber-700 dark:text-amber-400">Premium Bond</td>
                  <td className="p-2">Price &gt; Face Value</td>
                  <td className="p-2">YTM &lt; Coupon Rate</td>
                  <td className="p-2">Coupon &gt; Current Yield &gt; YTM</td>
                </tr>
                <tr>
                  <td className="p-2 text-left font-sans font-bold text-blue-700 dark:text-blue-400">Par Bond</td>
                  <td className="p-2">Price = Face Value</td>
                  <td className="p-2">YTM = Coupon Rate</td>
                  <td className="p-2">Coupon = Current Yield = YTM</td>
                </tr>
                <tr>
                  <td className="p-2 text-left font-sans font-bold text-emerald-700 dark:text-emerald-400">Discount Bond</td>
                  <td className="p-2">Price &lt; Face Value</td>
                  <td className="p-2">YTM &gt; Coupon Rate</td>
                  <td className="p-2">YTM &gt; Current Yield &gt; Coupon</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. COMMON MISTAKES */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          7. Common Mistakes &amp; Financial Misconceptions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-black dark:text-slate-100">1. Confusing Coupon Rate with YTM</h3>
            <p className="text-black dark:text-slate-100 leading-relaxed">
              The coupon rate is fixed at issuance. Yield to Maturity reflects the true annualized total return accounting for both coupon income and capital gains/losses from buying above or below par.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-black dark:text-slate-100">2. Overlooking Accrued Interest (Dirty Price)</h3>
            <p className="text-black dark:text-slate-100 leading-relaxed">
              Financial news quotes Clean Prices. However, the actual cash settlement amount paid by the buyer is the Dirty Price, which includes interest accumulated since the last coupon payout.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-black dark:text-slate-100">3. Equating Maturity with Duration</h3>
            <p className="text-black dark:text-slate-100 leading-relaxed">
              A 10-year coupon bond has a duration of ~7.5 years because intermediate coupon cash flows shorten the weighted-average payback time. Only zero-coupon bonds have a duration exactly equal to their maturity.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-black dark:text-slate-100">4. Ignoring Call Risk in Premium Bonds</h3>
            <p className="text-black dark:text-slate-100 leading-relaxed">
              When interest rates decline, issuers frequently call back high-coupon bonds early. In such cases, <em>Yield to Call (YTC)</em> or <em>Yield to Worst (YTW)</em> must be evaluated rather than YTM.
            </p>
          </div>
        </div>
      </section>

      {/* 8. PRACTICAL APPLICATIONS */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          8. Practical Applications Across Finance &amp; Industry
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-black dark:text-slate-100">Institutional ALM</h3>
            <p className="text-black dark:text-slate-100 leading-relaxed">
              Pension funds and life insurance companies match asset duration with liability duration (Immunization) to eliminate solvency risk from shifting interest rates.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-black dark:text-slate-100">Municipal Tax Planning</h3>
            <p className="text-black dark:text-slate-100 leading-relaxed">
              High-net-worth investors compare tax-free municipal bonds with taxable corporate debt using Tax-Equivalent Yield (TEY) models to maximize after-tax net income.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-black dark:text-slate-100">Corporate Debt Issuance</h3>
            <p className="text-black dark:text-slate-100 leading-relaxed">
              Corporate CFOs model credit spreads over sovereign benchmark curves to determine optimal coupon structures and call protection provisions.
            </p>
          </div>
        </div>
      </section>

      {/* 9. RELATED MATHEMATICAL CONCEPTS */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          9. Related Mathematical &amp; Financial Concepts
        </h2>
        <div className="space-y-2 text-xs text-black dark:text-slate-100">
          <p>
            <strong>Internal Rate of Return (IRR):</strong> Yield to Maturity is mathematically identical to the IRR of a project with an initial capital outflow equal to bond price, followed by periodic coupon cash inflows and par redemption.
          </p>
          <p>
            <strong>Taylor Series Expansions in Calculus:</strong> The duration-convexity approximation (&Delta;P &approx; -D &times; &Delta;y + 0.5 &times; C &times; (&Delta;y)^2) represents the first two terms of the Taylor Series expansion of the bond price function P(y) evaluated around current yield y<sub>0</sub>.
          </p>
          <p>
            <strong>Bootstrapping the Zero-Coupon Spot Rate Curve:</strong> Deriving theoretical zero-coupon rates from a series of active coupon-paying government bond prices using recursive forward substitution.
          </p>
        </div>
      </section>

      {/* 10. SUMMARY */}
      <section className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          10. Educational Summary
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          Bond valuation bridges time value of money discounting, numerical root-finding algorithms, and interest rate sensitivity calculus. By mastering the interplay between coupon rates, market discount yields, day-count accrued interest, duration, and convexity, investors and financial analysts can accurately price debt securities, model interest rate risk, and make optimal capital allocation decisions across global fixed-income markets.
        </p>
      </section>

      {/* 11. FREQUENTLY ASKED QUESTIONS */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-3 text-xs leading-relaxed text-black dark:text-slate-100">
          {/* FAQ 1 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. What is the fundamental difference between Coupon Rate and Yield to Maturity (YTM)?
            </h3>
            <p className="text-black dark:text-slate-100">
              The <strong>coupon rate</strong> is the fixed contractual annual interest percentage set by the issuer based on the bond&apos;s face value (e.g., a 5% coupon on $1,000 pays $50/year). In contrast, <strong>Yield to Maturity (YTM)</strong> is the internal rate of return (IRR) an investor earns if they buy the bond at its current market price and hold it until maturity. YTM factors in all periodic coupon distributions plus capital gains (if bought below par) or capital losses (if bought above par).
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. Why do bond prices move inversely to market interest rates?
            </h3>
            <p className="text-black dark:text-slate-100">
              When broader market interest rates rise, newly issued bonds offer higher coupon yields. Existing bonds with lower fixed coupons become less attractive, so their market price must drop until their effective yield equals current market rates. Conversely, when market rates decline, existing higher-coupon bonds become more valuable, driving their market trading price above face value (trading at a premium).
            </p>
          </div>

          {/* FAQ 3 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              3. What is the difference between Clean Price and Dirty (Invoice) Price?
            </h3>
            <p className="text-black dark:text-slate-100">
              The <strong>Clean Price</strong> is the published market quote that excludes accrued interest accumulated since the last coupon payout. The <strong>Dirty Price</strong> (also called the Invoice or Settlement Price) is the actual gross cash amount paid by the buyer to the seller: Dirty Price = Clean Quoted Price + Accrued Interest.
            </p>
          </div>

          {/* FAQ 4 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              4. How does the day-count convention affect accrued interest calculations?
            </h3>
            <p className="text-black dark:text-slate-100">
              Different fixed-income sectors use distinct day-count rules to calculate the fraction of a coupon period elapsed between the last payment date and settlement date:
              <br />• <strong>30/360:</strong> Assumes each month has 30 days and each year has 360 days (standard for US Corporate &amp; Municipal bonds).
              <br />• <strong>Actual/Actual:</strong> Uses the exact number of calendar days in both the elapsed period and the coupon year (standard for US Treasury bonds and notes).
              <br />• <strong>Actual/360:</strong> Uses actual days divided by 360 (common in money market instruments).
            </p>
          </div>

          {/* FAQ 5 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              5. What does Modified Duration indicate about a bond&apos;s interest rate risk?
            </h3>
            <p className="text-black dark:text-slate-100">
              Modified Duration measures the percentage price sensitivity of a bond to a 100-basis-point (1.0%) change in yield. For example, if a bond has a Modified Duration of 7.5%, a 1.0% increase in market interest rates will cause the bond&apos;s price to decline by approximately 7.5%, while a 1.0% drop in rates will increase the price by ~7.5%.
            </p>
          </div>

          {/* FAQ 6 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              6. What is a Zero-Coupon Bond and how is phantom income taxed?
            </h3>
            <p className="text-black dark:text-slate-100">
              A zero-coupon bond pays no intermediate periodic interest coupons; it is issued at a deep discount and redeems at full face value at maturity. For tax purposes (such as US Treasury STRIPS held in taxable accounts), the IRS requires investors to pay taxes annually on the imputed or accrued interest (Original Issue Discount - OID)—often termed &quot;phantom income&quot;—even though no cash is received until maturity.
            </p>
          </div>

          {/* FAQ 7 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              7. What is Yield to Call (YTC) and how is Yield to Worst (YTW) determined?
            </h3>
            <p className="text-black dark:text-slate-100">
              Callable bonds give the issuer the legal option to redeem the debt prior to maturity at a specified call price. <strong>Yield to Call (YTC)</strong> calculates the return assuming the bond is retired at the earliest call date. <strong>Yield to Worst (YTW)</strong> is the lowest possible yield among all potential retirement schedules (Maturity, Call Date 1, Call Date 2, or Put Dates), providing the most conservative return estimate for investors.
            </p>
          </div>

          {/* FAQ 8 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              8. How do I calculate the Tax-Equivalent Yield (TEY) on Municipal Bonds?
            </h3>
            <p className="text-black dark:text-slate-100">
              Because interest earned on municipal bonds is generally exempt from federal (and often state) income tax, investors compare it against taxable debt using the Tax-Equivalent Yield formula:
              <br /><strong>TEY = Municipal Yield / (1 - Marginal Tax Rate)</strong>.
              <br />For instance, a 3.50% tax-free municipal yield for an investor in a 35% tax bracket equals a 3.50% / (1 - 0.35) = 5.38% pre-tax corporate bond yield.
            </p>
          </div>

          {/* FAQ 9 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              9. What is the &quot;Pull-to-Par&quot; phenomenon?
            </h3>
            <p className="text-black dark:text-slate-100">
              &quot;Pull-to-par&quot; describes the natural mathematical trajectory where a bond&apos;s price steadily converges toward its contractual par value ($1,000) as the time remaining to maturity approaches zero. A premium bond gradually depreciates toward par, while a discount bond gradually appreciates toward par, assuming no default occurs.
            </p>
          </div>

          {/* FAQ 10 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              10. Why does positive Bond Convexity benefit fixed-income investors?
            </h3>
            <p className="text-black dark:text-slate-100">
              Because the relationship between bond prices and yields is curved (convex) rather than linear, positive convexity creates an asymmetric upside advantage: when interest rates drop by 100 bps, the bond price gains <em>more</em> than linear duration estimates; when interest rates rise by 100 bps, the bond price declines <em>less</em> than linear duration estimates.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BondContent;

