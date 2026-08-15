import React from "react";

export function DiceRollerContent() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-slate-700 dark:text-zinc-300">
      {/* 1. MATHEMATICS & COMBINATORICS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          The Mathematics &amp; Combinatorics of Dice Rolling
        </h2>
        <p className="leading-relaxed">
          At its foundational core, rolling a fair physical or digital die is a classic example of a discrete uniform random variable. 
          For any single $n$-sided die (denoted as $1dn$), the probability $P(X = k)$ of rolling any specific face value $k$ is strictly uniform:
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-zinc-200 font-sans tabular-nums text-sm text-center font-bold shadow-xs">
          {"P(X = k) = 1 / n,   for k ∈ {1, 2, ..., n}"}
        </div>

        <p className="leading-relaxed">
          The <strong>Expected Value ({"E[X]"})</strong> or arithmetic mean of a single $n$-sided die represents the long-run average outcome per roll. 
          Because the distribution is symmetric, the expectation equals the midpoint between the minimum (1) and maximum ($n$) face values:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-2">
            <h4 className="font-extrabold text-blue-700 dark:text-blue-400 text-xs uppercase tracking-wider">Expected Value (Mean μ) Formula</h4>
            <div className="text-center font-sans tabular-nums font-extrabold text-slate-900 dark:text-zinc-100 py-1">
              {"E[X] = (n + 1) / 2"}
            </div>
            <p className="text-xs text-slate-900 dark:text-slate-100">
              For a standard 6-sided die (d6), {"E[X] = (6 + 1)/2 = 3.5"}. For a 20-sided die (d20), {"E[X] = (20 + 1)/2 = 10.5"}.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-2">
            <h4 className="font-extrabold text-blue-700 dark:text-blue-400 text-xs uppercase tracking-wider">Theoretical Variance (σ²) Formula</h4>
            <div className="text-center font-sans tabular-nums font-extrabold text-slate-900 dark:text-zinc-100 py-1">
              {"Var(X) = (n² - 1) / 12"}
            </div>
            <p className="text-xs text-slate-900 dark:text-slate-100">
              Measures the statistical dispersion. For a d6, {"Var(X) = (36 - 1)/12 ≈ 2.917"}. For a d20, {"Var(X) = (400 - 1)/12 ≈ 33.25"}.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MULTI-DICE GENERATING FUNCTIONS */}
      <section className="space-y-4  dark:border-zinc-800 pt-6">
        <h3 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          1. Multi-Dice Sum Combinations &amp; Polynomial Generating Functions
        </h3>
        <p className="leading-relaxed">
          While rolling a single die yields a flat, uniform probability distribution, summing multiple independent dice (e.g., $2d6$, $3d6$, or $8d6$) transforms the outcome distribution into a discrete triangular or bell-shaped curve. 
          Mathematically, the exact number of combinations yielding a specific sum $S$ when rolling $m$ dice with $n$ sides is determined by expanding the polynomial generating function $G(x)$:
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-blue-900 dark:text-blue-200 font-sans tabular-nums text-sm text-center font-bold shadow-xs">
          {"G(x) = [(x + x² + ... + xⁿ) / n]ᵐ = [xᵐ (1 - xⁿ)ᵐ] / [nᵐ (1 - x)ᵐ]"}
        </div>

        <p className="leading-relaxed">
          The table below illustrates the exact combinatoric permutations and probabilities for rolling two 6-sided dice ($2d6$):
        </p>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-xs text-left border-collapse border border-slate-200 dark:border-zinc-800">
            <thead className="bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white">
              <tr>
                <th className="p-2 border border-slate-200 dark:border-zinc-800">Sum ($S$)</th>
                <th className="p-2 border border-slate-200 dark:border-zinc-800">Unique Permutations</th>
                <th className="p-2 border border-slate-200 dark:border-zinc-800">Combination Details</th>
                <th className="p-2 border border-slate-200 dark:border-zinc-800">Probability (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-sans tabular-nums font-bold">2 or 12</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-sans tabular-nums">1 / 36</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-sans tabular-nums">(1+1) or (6+6)</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-sans tabular-nums">2.78%</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-sans tabular-nums font-bold">3 or 11</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-sans tabular-nums">2 / 36</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-sans tabular-nums">(1+2, 2+1) or (5+6, 6+5)</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-sans tabular-nums">5.56%</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-sans tabular-nums font-bold">4 or 10</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-sans tabular-nums">3 / 36</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-sans tabular-nums">(1+3, 2+2, 3+1) or (4+6, 5+5, 6+4)</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-sans tabular-nums">8.33%</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-sans tabular-nums font-bold">5 or 9</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-sans tabular-nums">4 / 36</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-sans tabular-nums">(1+4, 2+3, 3+2, 4+1) etc.</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-sans tabular-nums">11.11%</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-sans tabular-nums font-bold">6 or 8</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-sans tabular-nums">5 / 36</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-sans tabular-nums">(1+5, 2+4, 3+3, 4+2, 5+1) etc.</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-sans tabular-nums">13.89%</td>
              </tr>
              <tr className="bg-blue-50/50 dark:bg-blue-50/30">
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-sans tabular-nums font-extrabold text-blue-600 dark:text-blue-400">7 (Peak)</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-sans tabular-nums font-extrabold text-blue-600 dark:text-blue-400">6 / 36</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-sans tabular-nums font-bold text-blue-600 dark:text-blue-400">(1+6, 2+5, 3+4, 4+3, 5+2, 6+1)</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-sans tabular-nums font-extrabold text-blue-600 dark:text-blue-400">16.67%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. CENTRAL LIMIT THEOREM */}
      <section className="space-y-4  dark:border-zinc-800 pt-6">
        <h3 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          2. The Central Limit Theorem &amp; Bell Curves in Game Design
        </h3>
        <p className="leading-relaxed">
          According to the <strong>Central Limit Theorem (CLT)</strong>, as the number of independent random variables ($m$ dice) summed together increases, their normalized sum approaches a continuous <strong>Gaussian (Normal) Distribution</strong>, regardless of the individual dice shapes.
        </p>
        <p className="leading-relaxed">
          This mathematical law creates a profound contrast between different tabletop game engine philosophies:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-2">
            <h4 className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">Flat Uniform Systems (1d20 - D&amp;D / Pathfinder)</h4>
            <p className="leading-relaxed">
              Single-die systems are inherently &quot;swingy&quot;. Every outcome from 1 to 20 has an identical 5.0% probability. This high variance promotes dramatic, unpredictable gameplay where beginner characters can occasionally outperform seasoned veterans on a lucky d20 roll.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-2">
            <h4 className="font-extrabold text-blue-700 dark:text-blue-400 text-sm">Clustered Bell Curve Systems (3d6 - GURPS / HERO)</h4>
            <p className="leading-relaxed">
              Multi-dice sum systems cluster rolls tightly around the mean (10.5). Rolling 3d6 yields an 67.6% probability of landing between 8 and 13, making extreme rolls (3 or 18) ultra-rare (0.46%). This rewards skilled characters with highly consistent, predictable performance.
            </p>
          </div>
        </div>
      </section>

      {/* 4. ADVANCED TTRPG MECHANICS */}
      <section className="space-y-4  dark:border-zinc-800 pt-6">
        <h3 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          3. Advanced Tabletop RPG Mechanics Mathematics
        </h3>
        <p className="leading-relaxed">
          Modern TTRPG rulebooks incorporate sophisticated probability-shifting rules to model advantageous circumstances, attribute generation, and critical hits:
        </p>

        <div className="space-y-4 my-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-2">
            <h4 className="font-extrabold text-blue-800 dark:text-blue-200 text-sm">A. Advantage &amp; Disadvantage (2d20kh1 / 2d20kl1)</h4>
            <p className="leading-relaxed">
              When rolling with Advantage in D&amp;D 5e (rolling 2d20 and keeping the higher value), the cumulative probability of rolling at least target $k$ (from 1 to 20) is governed by:
            </p>
            <div className="p-2.5 bg-white dark:bg-zinc-800 rounded border border-slate-200 dark:border-zinc-700 font-sans tabular-nums text-center font-bold text-blue-700 dark:text-blue-300">
              {"P(Advantage ≥ k) = 1 - [(k - 1) / 20]²"}
            </div>
            <p className="leading-relaxed">
              This increases the expected mean roll from 10.5 to 13.825 (a +3.325 average gain), while reducing natural 1 fumbles from 5.0% to 0.25% and doubling natural 20 criticals to 9.75%.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-2">
            <h4 className="font-extrabold text-blue-800 dark:text-blue-200 text-sm">B. Character Ability Score Generation (4d6 Drop Lowest - 4d6kh3)</h4>
            <p className="leading-relaxed">
              Standard D&amp;D character creation rolls 4d6 and discards the lowest die. By filtering out the lowest 1d6, the average attribute score increases from 10.50 (flat 3d6) to <strong>12.24</strong>, with a 56.8% chance of generating a score of 13 or higher.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CSPRNG VS PRNG */}
      <section className="space-y-4  dark:border-zinc-800 pt-6">
        <h3 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          4. Cryptographic PRNG vs. Standard Pseudo-Random Number Generators
        </h3>
        <p className="leading-relaxed">
          Traditional web applications rely on standard programming environment functions like Javascript's <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 font-sans tabular-nums text-xs">Math.random()</code>. 
          Most browser engines implement <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 font-sans tabular-nums text-xs">Math.random()</code> using algorithm families such as xorshift128+ or Linear Congruential Generators (LCG). 
          While fast, these pseudo-random algorithms are deterministic and can exhibit subtle statistical periodicities or seed predictability over long sequences.
        </p>

        <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-50/30 border border-emerald-200 dark:border-emerald-900 space-y-2 text-xs">
          <h4 className="font-extrabold text-emerald-900 dark:text-emerald-200 text-sm">How Our CSPRNG Guarantees True Fairness</h4>
          <p className="leading-relaxed">
            Our Dice Station engine utilizes the OS-level <strong>Cryptographically Secure Pseudo-Random Number Generator (CSPRNG)</strong> accessed via <code className="px-1.5 py-0.5 rounded bg-white dark:bg-zinc-800 font-sans tabular-nums font-bold">window.crypto.getRandomValues()</code>. 
            CSPRNG engines continuously sample hardware entropy pools (such as CPU clock phase jitters, interrupt timing, and thermal ambient noise). 
            This guarantees zero statistical bias, uniform modulo scaling without bias, and absolute non-predictability for every die face rolled.
          </p>
        </div>
      </section>

      {/* 6. PHYSICAL DICE PHYSICS */}
      <section className="space-y-4  dark:border-zinc-800 pt-6">
        <h3 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          5. Physical Dice Manufacturing Biases &amp; Saltwater Float Testing
        </h3>
        <p className="leading-relaxed">
          Tabletop gamers often debate whether physical plastic dice roll truly fair outcomes compared to digital CSPRNG rollers. 
          In reality, mass-manufactured opaque polymer dice frequently suffer from subtle physical defects:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-xs">
          <li>
            <strong>Injection Molding Air Bubbles:</strong> Off-center internal void pockets shift the die's center of gravity toward specific faces.
          </li>
          <li>
            <strong>Tumbling &amp; Polishing Distortion:</strong> Rock-tumbling dice to round off sharp edges unevenly shaves certain corners, altering face surface area.
          </li>
          <li>
            <strong>Saltwater Float Test:</strong> Players can test physical die balance by dissolving table salt into warm water until the water density matches the plastic, allowing the die to float. Repeatedly flicking the floating die reveals if heavy sides consistently sink to the bottom.
          </li>
          <li>
            <strong>Precision Casino Dice:</strong> Licensed casino dice avoid these defects by machining translucent acrylic blocks to a tolerance of 1/10,000th of an inch, with flush-milled pips filled with paint of identical plastic density.
          </li>
        </ul>
      </section>
    </article>
  );
}
