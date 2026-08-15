"use client";

import React from "react";

export function TipContent() {
  return (
    <article className="prose dark:prose-invert max-w-none text-sm leading-relaxed space-y-8 py-2">
      {/* SECTION 1: THE MATHEMATICS OF TIPPING & GRATUITY */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. The Mathematics of Tipping & Gratuity
        </h2>
        <p>
          Calculating a tip (gratuity) relies on standard percentage arithmetic. The fundamental formula for calculating the tip amount from a bill subtotal is:
        </p>
        
        <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-sans tabular-nums text-xs my-2 text-center text-blue-600 dark:text-blue-400 font-bold">
          Tip Amount = Subtotal × (Tip Percentage / 100)
        </div>

        <p>
          To find the grand total bill including sales tax and gratuity:
        </p>

        <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-sans tabular-nums text-xs my-2 text-center text-blue-600 dark:text-blue-400 font-bold">
          Total Bill = Subtotal + Sales Tax + Tip Amount
        </div>

        <p>
          When splitting a restaurant check evenly among a party of N diners:
        </p>

        <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-sans tabular-nums text-xs my-2 text-center text-blue-600 dark:text-blue-400 font-bold">
          Cost Per Person = Total Bill / N
        </div>

        <h3 className="text-base font-bold text-blue-600 dark:text-blue-400">Step-by-Step Mathematical Example</h3>
        <p>
          Suppose a party of 4 orders food and drinks totaling a subtotal of <strong>$120.00</strong>, with an 8.5% sales tax rate ($10.20) and a chosen tip rate of <strong>18%</strong>:
        </p>
        <ol className="list-decimal pl-5 space-y-1 text-xs">
          <li><strong>Pre-Tax Tip Base:</strong> $120.00</li>
          <li><strong>Tip Amount (18%):</strong> $120.00 × 0.18 = $21.60</li>
          <li><strong>Grand Total:</strong> $120.00 + $10.20 + $21.60 = $151.80</li>
          <li><strong>Per-Person Share (4 Diners):</strong> $151.80 / 4 = $37.95 per person</li>
        </ol>
      </section>

      {/* SECTION 2: MENTAL MATH SHORTCUTS FOR FAST TIPPING */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. Mental Math Shortcuts for Fast Tipping
        </h2>
        <p>
          You don't need a calculator to calculate standard tips at a restaurant table. You can use these 3 mental math rules:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 bg-blue-50/60 dark:bg-blue-50/20 border border-emerald-200 dark:border-emerald-900 rounded-xl space-y-1">
            <h3 className="font-bold text-emerald-800 dark:text-blue-400">The 10% Rule</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Move the decimal point of your bill one space to the left. On a $64.00 check, 10% is <strong>$6.40</strong>.
            </p>
          </div>

          <div className="p-3.5 bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-xl space-y-1">
            <h3 className="font-bold text-blue-800 dark:text-blue-300">The 15% Rule</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Find 10% first, then add half of that number. On $60.00: 10% is $6.00 + half ($3.00) = <strong>$9.00</strong>.
            </p>
          </div>

          <div className="p-3.5 bg-blue-50/60 dark:bg-blue-50/20 border border-purple-200 dark:border-purple-900 rounded-xl space-y-1">
            <h3 className="font-bold text-purple-800 dark:text-blue-400">The 20% Rule</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Find 10% by shifting the decimal left, then double that number. On $85.00: 10% is $8.50 × 2 = <strong>$17.00</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE PRE-TAX VS. POST-TAX TIPPING DEBATE */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. The Pre-Tax vs. Post-Tax Tipping Debate
        </h2>
        <p>
          A frequent question among restaurant diners is whether tips should be calculated on the subtotal before tax or the final gross amount after tax:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
          <li>
            <strong>Pre-Tax Tipping (Standard Etiquette):</strong> Professional etiquette authorities (such as the Emily Post Institute) state that tips reward the food, beverage, and server labor—not government sales tax. Therefore, standard tips should be calculated on the pre-tax food/drink subtotal.
          </li>
          <li>
            <strong>Post-Tax Tipping (Modern Convenience):</strong> Electronic handheld point-of-sale (POS) card readers commonly calculate default 18%, 20%, or 22% tip buttons on the final post-tax total. While this yields a slightly higher tip for staff (roughly 1% to 2% extra), many diners prefer post-tax calculation for convenience.
          </li>
        </ul>
      </section>

      {/* SECTION 4: INDUSTRY-SPECIFIC TIPPING BENCHMARKS TABLE */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. Industry-Specific Tipping Benchmarks Table
        </h2>
        <p>
          Tipping norms vary widely depending on the service industry and country:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-zinc-200 dark:border-zinc-800 text-xs">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-900 dark:text-zinc-100">
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700">Service Category</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700">Standard Tip Range</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700">Etiquette Notes & Best Practices</th>
              </tr>
            </thead>
            <tbody className=" dark:divide-zinc-800">
              <tr>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-bold">Sit-Down Restaurants & Bars</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums text-blue-600 dark:text-blue-400 font-bold">15% – 20%</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">15% for adequate service, 18%–20%+ for great service. $1–$2 per drink for bartenders.</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-bold">Food Delivery (DoorDash, UberEats)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums text-blue-600 dark:text-blue-400 font-bold">15% – 20% ($3–$5 min)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Tip a minimum of $3 to $5 to cover gas, vehicle wear, and weather conditions.</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-bold">Rideshare & Taxis (Uber, Lyft)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums text-blue-600 dark:text-blue-400 font-bold">15% – 20%</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Add $1–$2 extra if the driver helps with heavy luggage or airport handling.</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-bold">Barbers, Salons & Spas</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums text-blue-600 dark:text-blue-400 font-bold">15% – 20%</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Tip assistant shampooers $2–$5 separately if applicable.</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-bold">Hotel Housekeeping & Bellhops</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums text-blue-600 dark:text-blue-400 font-bold">$2 – $5 per service/day</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">$2–$5 per bag for bellhops; $2–$5 per night left daily in envelope for housekeeping.</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-bold">Home Movers & Service Crews</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800 font-sans tabular-nums text-blue-600 dark:text-blue-400 font-bold">$10 – $40 per worker</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Depending on physical effort, hours worked, and stair handling. Providing water/snacks is also customary.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 5: INTERNATIONAL TIPPING CULTURE & ETIQUETTE GUIDE */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. International Tipping Culture & Etiquette Guide
        </h2>
        <p>
          Tipping customs vary significantly around the globe:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">North America (US & Canada)</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Tipping 15%–20% is customary and culturally expected due to low sub-minimum base wages for tipped restaurant workers.
            </p>
          </div>

          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">Europe (UK, France, Germany, Italy)</h3>
            <p className="text-slate-900 dark:text-slate-100">
              Service is often legally included (<em>service compris</em>). Rounding up the check or leaving 5%–10% cash for good service is standard.
            </p>
          </div>

          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">Asia-Pacific (Japan, Korea, China, Australia)</h3>
            <p className="text-slate-900 dark:text-slate-100">
              In Japan and Korea, tipping is not practiced and can be considered offensive. In Australia/NZ, high minimum wages mean tips are optional.
            </p>
          </div>

          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-1">
            <h3 className="font-bold text-blue-600 dark:text-blue-400">Latin America & Middle East</h3>
            <p className="text-slate-900 dark:text-slate-100">
              10%–15% is standard (<em>propina</em>). In UAE/Dubai, 10% is often added to bills, but handing small cash directly to staff is customary.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: AUTOMATIC GRATUITY VS. SERVICE CHARGES */}
      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. Automatic Gratuity vs. Service Charges
        </h2>
        <p>
          It is important to distinguish between voluntary tips and mandatory fees on a restaurant receipt:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
          <li><strong>Discretionary Tip:</strong> Fully voluntary cash or card payment chosen by the diner.</li>
          <li><strong>Automatic Gratuity (Large Parties 6+):</strong> A mandatory percentage (typically 18% or 20%) automatically added for large tables to protect server labor on long seatings.</li>
          <li><strong>Kitchen / Wellness Fees:</strong> 3%–5% surcharges added by some restaurants to provide health insurance for kitchen staff. These are not tips for your server.</li>
        </ul>
      </section>
    </article>
  );
}
