import React from "react";
import Link from "next/link";
import {
  Shield,
  Clock,
  TrendingUp,
  Scale,
  Users,
  HeartHandshake,
  Receipt,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Info,
  Layers,
  ArrowRight,
} from "lucide-react";

export function SocialSecurityContent() {
  return (
    <article className="space-y-10 text-slate-800 dark:text-slate-200 leading-relaxed">
      {/* Introduction Section */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
          <Shield className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
          Social Security Calculator: Claiming Age, Benefits &amp; Break-Even Planner
        </h2>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Social Security claiming is not simply a choice between receiving a smaller check sooner or a larger check later. The decision changes the size of your monthly retirement benefit, the number of payments you may receive over your lifetime, the value of benefits available to a spouse or survivor, and potentially the amount of Social Security included in taxable income. The purpose of a Social Security Calculator is therefore not to produce one supposedly universal &ldquo;best age.&rdquo; It is to show how different claiming assumptions change the financial path of your benefits so that you can understand the trade-off between starting earlier and waiting longer.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          This calculator is designed around that comparison. Enter your birth year, expected Full Retirement Age benefit, expected life expectancy, and the assumptions used for long-term modeling, then compare claiming ages from 62 through 70. The calculator can show your Full Retirement Age, estimate how your monthly benefit changes when you claim before or after FRA, project cumulative lifetime benefits, identify a modeled break-even age, and compare two potential claiming strategies. It also includes separate calculations for spousal benefits, survivor benefits and the portion of Social Security benefits that may be subject to federal income tax under the selected assumptions.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          For people born in 1960 or later, Social Security currently defines Full Retirement Age as 67. Retirement benefits can generally begin at 62, but claiming before FRA reduces the monthly retirement benefit. Waiting beyond FRA increases the retirement benefit through delayed retirement credits, with the increase stopping at age 70. For people born in 1960 or later, claiming at 70 produces 124% of the FRA benefit under the standard retirement benefit rules. The precise percentages depend on birth year and, around certain ages, the number of months between the claiming age and FRA, which is why a useful calculator should not simply apply the same &ldquo;30% reduction&rdquo; or &ldquo;24% increase&rdquo; to everybody.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          There is also an important difference between a monthly benefit comparison and a lifetime benefit comparison. Waiting until 70 can produce a substantially larger monthly payment, but it also means giving up payments that could have been collected at 62, 63, 64, 65, or another earlier age. If you live long enough, the larger later benefit can eventually catch up with the earlier stream of payments. That crossover point is commonly called the Social Security break-even age. A break-even calculation is therefore a longevity-sensitive comparison, not a universal rule that tells every person exactly when to claim.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Cost-of-living adjustments create another dimension. Social Security benefits receive periodic COLAs under federal law, and SSA announced a 2.8% COLA for 2026 based on the applicable CPI-W measure. Your calculator can use a selected COLA assumption to illustrate how cumulative benefits evolve over a long retirement horizon. That assumption is a modeling input; it should not be confused with a guarantee of any particular future COLA.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator should consequently be read as a scenario-planning tool. It can help answer questions such as, &ldquo;What would my estimated monthly benefit look like at 62 versus 70?&rdquo;, &ldquo;At what age does the later claim catch up under these assumptions?&rdquo;, or &ldquo;How does my spouse&rsquo;s potential benefit compare with my own?&rdquo; It cannot determine your official Social Security benefit because the actual benefit depends on your earnings record and SSA&rsquo;s official calculation of your insured status, earnings, filing circumstances and applicable rules.
        </p>
        <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-sm">
          <p className="font-semibold text-indigo-950 dark:text-indigo-200 mb-1">
            Holistic Retirement Planning Ecosystem:
          </p>
          <p className="text-indigo-900/90 dark:text-indigo-300/90 leading-relaxed">
            For a broader retirement picture, combine the result with the{" "}
            <Link href="/calculators/retirement-calculator" className="font-bold underline hover:text-indigo-600">Retirement Calculator</Link>,{" "}
            <Link href="/calculators/401k-calculator" className="font-bold underline hover:text-indigo-600">401(k) Calculator</Link>,{" "}
            <Link href="/calculators/roth-ira-calculator" className="font-bold underline hover:text-indigo-600">Roth IRA Calculator</Link>,{" "}
            <Link href="/calculators/investment-calculator" className="font-bold underline hover:text-indigo-600">Investment Calculator</Link>, and{" "}
            <Link href="/calculators/inflation-calculator" className="font-bold underline hover:text-indigo-600">Inflation Calculator</Link>. These tools answer different questions, but together they help place Social Security inside a larger retirement-income plan.
          </p>
        </div>
      </section>

      {/* Section 1: Full Retirement Age */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Clock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          1. Full Retirement Age: The Starting Point for Your Social Security Calculation
        </h3>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Full Retirement Age, commonly abbreviated FRA, is one of the most important inputs in a Social Security claiming calculation because it is the reference point from which early-retirement reductions and delayed-retirement increases are measured. FRA is not automatically 65, and it is not the same for everyone. It depends primarily on your birth year for retirement benefits. SSA&rsquo;s official schedule shows that FRA rises from 65 for earlier birth cohorts to 66, then gradually increases in two-month increments before reaching 67 for people born in 1960 or later.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          For someone born in 1960 or later, the retirement Full Retirement Age is 67. That means a worker whose unreduced benefit at FRA is $2,200 per month would use $2,200 as the 100% reference amount. Starting at 62 does not generally produce that same amount. For someone with FRA 67, SSA&rsquo;s retirement chart shows an age-62 worker benefit of 70% of the full amount. On a $2,200 FRA benefit, the corresponding age-62 amount is therefore approximately $1,540 per month.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The significance of FRA is that it provides the reference point for both directions. Claiming before FRA permanently reduces the retirement benefit relative to the unreduced FRA amount. Waiting after FRA can increase the monthly benefit through delayed retirement credits. These are separate mechanisms, and the calculator must treat them separately rather than using a single percentage adjustment for all ages.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          This matters particularly for people whose FRA is below 67. A person born in 1955, for example, has an FRA of 66 and 2 months, while someone born in 1959 has an FRA of 66 and 10 months. The number of months between the person&rsquo;s actual claiming point and FRA therefore matters. SSA&rsquo;s published delayed-retirement tables are also birth-year specific.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator should therefore use the birth year to determine the applicable FRA before it determines an estimated benefit percentage. This avoids one of the most common Social Security calculation errors: applying the rules for people born in 1960 or later to someone born in an earlier cohort. The same issue applies to delayed retirement. For someone with FRA 66, the period from FRA to age 70 is four years, whereas a person with FRA 67 has only three years of potential delayed retirement credits between FRA and age 70. SSA states that delayed retirement credits stop increasing the benefit once the worker reaches age 70.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          There is also a subtle timing issue around birthdays. SSA notes that if your birthday falls on the first day of a month, the benefit calculation treats the birthday as though it occurred in the previous month for purposes of the applicable claiming-age calculation. A calculator that accepts only a birth year cannot capture every date-level nuance, so its output should be understood as an estimate based on the supplied birth year and age assumptions.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          FRA should therefore be thought of as the anchor point, not the answer to the claiming question. It tells you what 100% means for your retirement benefit and establishes the framework for evaluating the reductions and increases around it. Once FRA is known, the more interesting question becomes how much you gain or give up by claiming earlier or waiting longer.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          For users building a complete plan, the <Link href="/calculators/retirement-calculator" className="font-semibold text-blue-600 underline">Retirement Calculator</Link> can place the estimated Social Security income alongside other retirement assets, while the <Link href="/calculators/investment-calculator" className="font-semibold text-blue-600 underline">Investment Calculator</Link> can be used to examine what an alternative investment assumption might look like.
        </p>
      </section>

      {/* Section 2: Claiming at 62, FRA or 70 */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          2. Claiming at 62, FRA or 70: How the Monthly Benefit Changes
        </h3>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The three ages most frequently used as reference points in Social Security planning are 62, Full Retirement Age and 70. They represent fundamentally different strategies. Age 62 is the earliest age at which most people can begin retirement benefits. FRA is the point at which the worker receives the full, unreduced retirement benefit under the standard claiming-age framework. Age 70 is the point at which delayed retirement credits stop increasing the retirement benefit. These ages should therefore be compared as different trade-offs rather than as three labels on the same payment schedule.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Consider a simplified example with an FRA benefit of $2,200 and an FRA of 67. Under SSA&rsquo;s current retirement rules for someone born in 1960 or later, the age-62 worker benefit is 70% of the full amount. That produces approximately:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-3 text-center">
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800">
            <span className="text-xs font-bold text-rose-700 dark:text-rose-300 block uppercase">Age 62 (Early)</span>
            <span className="text-xl font-extrabold text-rose-600">$1,540 / month</span>
            <span className="text-xs text-slate-500 block mt-1">70% of FRA Benefit</span>
          </div>
          <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800">
            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 block uppercase">Age 67 (FRA Baseline)</span>
            <span className="text-xl font-extrabold text-indigo-600">$2,200 / month</span>
            <span className="text-xs text-slate-500 block mt-1">100% of FRA Benefit</span>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 block uppercase">Age 70 (Delayed)</span>
            <span className="text-xl font-extrabold text-emerald-600">$2,728 / month</span>
            <span className="text-xs text-slate-500 block mt-1">124% of FRA Benefit (+24%)</span>
          </div>
        </div>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          SSA&rsquo;s official delayed-retirement table confirms the 124% factor for people whose FRA is 67 and who wait until age 70.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The first lesson is that waiting changes the size of each monthly payment. But that does not automatically mean that waiting produces the greatest lifetime amount. Someone who claims at 62 can receive benefits for many more years than someone who waits until 70. If an early claimant lives for a long period, those additional payments can offset the smaller monthly amount. Conversely, someone with a long life expectancy may eventually receive more cumulative benefits by waiting because the higher payment continues for many years.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          That is why this calculator compares both monthly benefit size and cumulative lifetime benefit. Looking only at the monthly payment answers one question: &ldquo;How much would I receive each month?&rdquo; Looking at cumulative benefits answers another: &ldquo;How much would the modeled benefit stream produce over the selected life expectancy?&rdquo;
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The distinction becomes even more important when the calculator includes COLA assumptions. Social Security benefits are subject to COLAs, and SSA&rsquo;s announced COLA for 2026 is 2.8%. In a long-term model, an assumed annual COLA can magnify differences between earlier and later claiming because the starting monthly benefit is repeatedly adjusted in the projection. However, the calculator&rsquo;s future COLA should be treated as a scenario assumption, not as a promise about future Social Security increases.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Claiming at 62 can also be attractive for reasons that have nothing to do with maximizing a spreadsheet total. A person may need income, may prefer reducing withdrawals from an investment portfolio, may have health or longevity considerations, or may value the flexibility of receiving benefits earlier. Conversely, delaying may be attractive to someone with sufficient assets, strong longevity expectations, a desire for a larger monthly lifetime income base, or a household situation in which survivor protection matters.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          SSA itself emphasizes that there are advantages and disadvantages to both earlier and later claiming, and that each person&rsquo;s situation is different. The calculator therefore should not turn a mathematical winner into an unconditional financial recommendation.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          A useful way to interpret the results is to ask three separate questions: How large is the monthly benefit? How long must I live for the later option to catch up? And can my household comfortably finance the period before the later benefit begins? The answers together are much more informative than simply asking which age produces the largest number.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          That is why the calculator&rsquo;s two-age comparison is particularly useful. Instead of assuming 62 versus 70 is always the relevant comparison, you can model 62 versus 67, 65 versus 70, 66 versus 70, or any other valid pair supported by the calculator. A sensible claiming analysis starts with the ages that actually reflect your circumstances.
        </p>
      </section>

      {/* Section 3: Break-Even Age and Lifetime Benefit */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Scale className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          3. Social Security Break-Even Age and Lifetime Benefit Comparison
        </h3>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The Social Security break-even age is the point at which the cumulative benefits from two different claiming strategies become approximately equal under a defined set of assumptions. It is one of the most useful outputs in a claiming-age comparison because it converts an abstract question—&ldquo;Should I claim earlier or wait?&rdquo;—into a concrete longevity question: &ldquo;At approximately what age does the later strategy catch up?&rdquo;
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Suppose a person can claim $1,600 per month at 62 or $2,810 per month at 70. The age-62 strategy begins producing income eight years earlier, while the age-70 strategy starts with a substantially larger monthly benefit. The later benefit must therefore overcome the accumulated payments that the early claimant has already received. The break-even age is the approximate point where the cumulative totals cross.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-sm space-y-1">
          <p className="text-slate-600 dark:text-slate-400 font-sans font-bold text-xs uppercase">Simplified Break-Even Comparison:</p>
          <p>Early Cumulative = Monthly Benefit × Months Received</p>
          <p>Delayed Cumulative = Delayed Monthly Benefit × Months Received After Later Claim</p>
        </div>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          A break-even age is not the same as life expectancy. Life expectancy represents a statistical estimate of how long someone may live; break-even represents the age at which two modeled claiming strategies produce similar cumulative totals. A person may have a life expectancy below the calculated break-even age, at the break-even age, or substantially above it. Those circumstances can materially change the interpretation of the comparison.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The graph in the calculator is particularly useful because it makes the crossover visible. The early strategy generally has a head start: its cumulative line rises first because benefits begin sooner. The delayed strategy may initially lag behind even though its monthly payment is larger. Over time, the higher monthly amount can cause the delayed line to catch up and potentially pass the earlier strategy.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The role of investment return is another important qualification. If the model assumes that benefits collected earlier are invested, the break-even analysis is no longer purely a Social Security benefit comparison. It becomes an opportunity-cost model, asking whether receiving money earlier creates enough investment growth to offset the larger delayed benefit. Changing the assumed investment return can therefore alter the modeled winner even when the Social Security benefit amounts themselves do not change.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          This is one reason the phrase &ldquo;break-even age&rdquo; should always be followed mentally by &ldquo;under these assumptions.&rdquo; A break-even result can change when you change the starting benefit estimate, life expectancy, COLA, investment return, taxation assumptions or the exact timing convention used by the model.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          For a complete retirement decision, pair your results with the <Link href="/calculators/investment-calculator" className="font-semibold text-blue-600 underline">Investment Calculator</Link>, <Link href="/calculators/401k-calculator" className="font-semibold text-blue-600 underline">401(k) Calculator</Link>, and <Link href="/calculators/roth-ira-calculator" className="font-semibold text-blue-600 underline">Roth IRA Calculator</Link>.
        </p>
      </section>

      {/* Section 4: Cost of Living Adjustments */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          4. Cost-of-Living Adjustments and Why Lifetime Benefits Grow Differently
        </h3>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          A Social Security benefit is not necessarily a flat dollar amount throughout retirement. Social Security benefits are adjusted periodically through cost-of-living adjustments, commonly called COLAs. For 2026, SSA announced a 2.8% COLA for Social Security retirement and other covered benefits. The adjustment was based on the applicable change in the Consumer Price Index for Urban Wage Earners and Clerical Workers.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator allows COLA to be incorporated into a long-term projection so that users can examine how a monthly benefit may evolve over a selected retirement horizon. This is especially useful when comparing two claiming ages because the starting benefit amounts may differ significantly. If both benefits are subsequently increased under the same assumed COLA, the absolute dollar difference between them can become larger over time.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          For example, suppose Option A begins at $1,600 per month and Option B begins at $2,800 per month. Even if both receive the same percentage COLA, the dollar increase applied to the larger benefit will be larger. At a 3% hypothetical COLA, a $1,600 monthly benefit receives a $48 increase, while a $2,800 benefit receives an $84 increase in the first adjustment. Repeated over many years, the higher initial benefit can create a widening nominal difference.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          This does not mean a particular future COLA is guaranteed. The calculator&rsquo;s COLA field should be treated as an input describing a hypothetical average future adjustment. SSA&rsquo;s actual annual COLA is determined under federal law using the relevant CPI-W methodology. The 2026 COLA is 2.8%; future COLAs can differ.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Users should also distinguish between nominal cumulative benefits and purchasing power. A future $100,000 of Social Security benefits does not have the same economic meaning as $100,000 today if prices have risen substantially. The <Link href="/calculators/inflation-calculator" className="font-semibold text-blue-600 underline">Inflation Calculator</Link> can be used separately to explore how inflation changes purchasing power.
        </p>
      </section>

      {/* Section 5: Spousal Benefits */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          5. Spousal Benefits: Why the Worker&rsquo;s Benefit Is Not the Whole Story
        </h3>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Social Security retirement planning often involves more than one person&rsquo;s benefit. For married couples, the spouse&rsquo;s potential benefit can materially change the household&rsquo;s claiming decision. SSA states that a spouse can generally receive up to 50% of the worker&rsquo;s benefit amount at the worker&rsquo;s Full Retirement Age, subject to the applicable rules and reductions.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          This is why the calculator includes a separate Spousal Benefit calculation. Consider a worker whose FRA benefit is $2,500 per month. Fifty percent of that amount is:
        </p>
        <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 font-mono text-sm text-center">
          $2,500 × 50% = $1,250 per month (Max Spousal Benefit at FRA)
        </div>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          That $1,250 is the maximum spousal-benefit reference amount in the simplified scenario when the spouse claims at the applicable FRA. If the spouse claims earlier, the spousal benefit can be reduced. SSA&rsquo;s published retirement guidance shows that for a worker whose FRA is 67, a spouse claiming at 62 can receive 32.5% of the worker&rsquo;s unreduced benefit (a 35% reduction of the spousal maximum based on SSA&rsquo;s statutory 25/36 of 1% per month rule), subject to the rules that apply to the specific claim.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          This illustrates why a spouse&rsquo;s claiming age should not simply reuse the worker&rsquo;s early-claiming reduction percentage. The rules for spousal benefits are not identical to the worker retirement-benefit reduction. SSA&rsquo;s guidance explicitly distinguishes the worker and spouse percentages.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Another important concept is that a spouse does not necessarily receive two completely additive benefits. SSA explains that when someone is eligible for both a retirement benefit on their own record and a spouse benefit, the agency generally pays the higher combined amount for which the person is eligible rather than simply stacking both full amounts together.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The timing of the worker&rsquo;s claim can also matter. A current spouse generally cannot receive spouse&rsquo;s benefits until the worker files for retirement benefits. SSA&rsquo;s retirement-benefits publication discusses this filing relationship and the applicable deemed-filing rules for people who qualify for both retirement and spouse benefits.
        </p>
      </section>

      {/* Section 6: Survivor Benefits */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <HeartHandshake className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          6. Survivor Benefits: A Different Benefit With Different Timing Rules
        </h3>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Survivor benefits are frequently confused with ordinary retirement benefits, but the rules are different enough that they deserve their own analysis. SSA states that a surviving spouse can generally begin survivor benefits at age 60, or at age 50 if disabled, subject to eligibility requirements. The maximum survivor benefit for a surviving spouse is generally available at the survivor&rsquo;s Full Retirement Age for survivor benefits, which can differ from the retirement FRA used for a worker&rsquo;s retirement benefit.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          SSA&rsquo;s current survivor-benefit information explains that survivor benefits commonly range from 71.5% to 100% of the deceased worker&rsquo;s basic benefit amount depending on the survivor&rsquo;s age at application. A surviving spouse who reaches survivor FRA can generally receive 100% of the worker&rsquo;s basic benefit amount under the standard rules.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          This makes the survivor-benefit question important when comparing Social Security claiming strategies within a marriage. The worker&rsquo;s retirement claiming choice can affect the amount on which a future survivor benefit is based, depending on the circumstances of the worker&rsquo;s death and the worker&rsquo;s benefit status. SSA explains that if the deceased worker was receiving reduced benefits, the survivor benefit can be based on that reduced amount.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The survivor module in a calculator should consequently be understood as a planning estimate, not an official SSA survivor determination. Real survivor eligibility can depend on the length of the marriage, the survivor&rsquo;s relationship to the worker, the survivor&rsquo;s age, disability status, remarriage circumstances, whether there are qualifying children, and the worker&rsquo;s earnings and benefit record.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          For households evaluating lifetime guaranteed income, pair this estimate with the <Link href="/calculators/retirement-calculator" className="font-semibold text-blue-600 underline">Retirement Calculator</Link> and the <Link href="/calculators/annuity-calculator" className="font-semibold text-blue-600 underline">Annuity Calculator</Link>.
        </p>
      </section>

      {/* Section 7: Social Security Taxability */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Receipt className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          7. Social Security Taxability: What &ldquo;85% Taxable&rdquo; Actually Means
        </h3>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          One of the most misunderstood Social Security terms is &ldquo;85% taxable.&rdquo; It does not mean that your Social Security benefits are taxed at an 85% tax rate. It means that, under the federal Social Security benefit tax rules, as much as 85% of the benefit amount may be included in taxable income when the applicable income thresholds are exceeded. The actual tax owed depends on the taxpayer&rsquo;s broader income and tax situation.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The IRS explains that the taxable portion of Social Security benefits depends on filing status and a measure that generally begins with one-half of Social Security benefits plus other income, including items such as wages, pensions, interest, dividends and capital gains:
        </p>
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-sm text-center">
          Combined Income = Adjusted Gross Income (AGI) + Tax-Exempt Interest + 0.50 × Social Security Benefits
        </div>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          For federal income-tax purposes, the IRS currently identifies base amounts:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border">
            <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Single / Head of Household:</span>
            <ul className="space-y-1 text-slate-600 dark:text-slate-400">
              <li>• Under $25,000: <strong>0% taxable</strong></li>
              <li>• $25,000 to $34,000: <strong>Up to 50% taxable</strong></li>
              <li>• Over $34,000: <strong>Up to 85% taxable</strong></li>
            </ul>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border">
            <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Married Filing Jointly:</span>
            <ul className="space-y-1 text-slate-600 dark:text-slate-400">
              <li>• Under $32,000: <strong>0% taxable</strong></li>
              <li>• $32,000 to $44,000: <strong>Up to 50% taxable</strong></li>
              <li>• Over $44,000: <strong>Up to 85% taxable</strong></li>
            </ul>
          </div>
        </div>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Consider the calculator&rsquo;s illustrative example of a married couple filing jointly. If the worker has a monthly Social Security benefit of $2,500 and $35,000 of other annual income, the calculator may determine that as much as 85% of the Social Security benefit could be subject to federal income taxation under the simplified assumptions. That does not mean $2,500 × 85% = $2,125 tax bill. Instead, it means up to $2,125 of monthly benefits may be included in taxable income and taxed at ordinary tax brackets.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          For deeper tax and retirement analysis, use the <Link href="/calculators/income-tax-calculator" className="font-semibold text-blue-600 underline">Income Tax Calculator</Link> alongside this Social Security estimate.
        </p>
      </section>

      {/* Section 8: How to Use Responsibly */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          8. How to Use the Social Security Calculator Responsibly
        </h3>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The most useful way to use a Social Security Calculator is not to ask it for a single universal answer. Instead, use it to construct several clearly defined scenarios and examine how the result changes when you alter one assumption at a time. Start with the best estimate you currently have for your FRA monthly benefit, your birth year and a reasonable planning horizon. Then compare several claiming ages rather than immediately assuming that 62 or 70 must be correct.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          A sensible first comparison might be: <strong>Age 62 vs. FRA vs. Age 70</strong>. Then examine the resulting monthly benefits, cumulative lifetime totals and break-even ages. After that, change one variable. Increase the life expectancy assumption. Reduce it. Change COLA. Change the investment return assumption. Compare the results again. This shows which assumptions actually drive the decision.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm space-y-2">
          <span className="font-bold text-slate-900 dark:text-slate-100 block">Recommended Decision Workflow:</span>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
            <span className="px-2.5 py-1 rounded-md bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800">1. Estimate FRA</span>
            <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="px-2.5 py-1 rounded-md bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800">2. Compare Ages</span>
            <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="px-2.5 py-1 rounded-md bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800">3. Stress-Test Longevity</span>
            <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="px-2.5 py-1 rounded-md bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800">4. Review Spouse / Survivor</span>
            <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300">5. Verify with SSA</span>
          </div>
        </div>
      </section>

      {/* Section 9: Formula & Methodology Reference */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          Social Security Calculator Formula &amp; Methodology
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Full Retirement Age (FRA)</span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              FRA is determined from the statutory birth-year schedule (65 for ≤1937, 66 for 1943–1954, transitioning by 2 months/yr up to 67 for 1960+).
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Early Retirement Reduction</span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Calculates 5/9 of 1% per month for the first 36 months early plus 5/12 of 1% per month for additional months (giving 70% of PIA at 62 for FRA 67).
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Delayed Retirement Credits</span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Accrues 8% per year (2/3 of 1% per month) past FRA up to age 70 (yielding 124% of PIA at age 70 for FRA 67, and 132% for FRA 66).
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Spousal &amp; Survivor Rules</span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Spousal max is 50% of worker PIA at FRA (with 25/36% + 5/12% early reductions). Survivor baseline estimate is up to 100% of worker PIA at survivor FRA.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Lifetime Stream &amp; Break-Even</span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Sums annual cash flows compounded by COLA and discounted by investment opportunity cost to compute total lifetime income and exact crossover age.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">IRS Combined Income Taxability</span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Evaluates provisional income (AGI + Tax-Exempt Interest + 0.50 × Benefits) against statutory $25k/$34k (Single) and $32k/$44k (MFJ) tiers.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
export default SocialSecurityContent;
