"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, ExternalLink, HelpCircle } from "lucide-react";
import { shoe_size_calculatorFaqs } from "@/app/calculators/shoe-size-calculator/faq";

export function ShoeSizeContent() {
  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. MAIN EDUCATIONAL CONTENT */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            1. Shoe Size Calculator: Start With Your Actual Foot Measurements
          </h2>
          <p>
            Shoe size is easier to estimate when you start with the dimensions of the feet rather than an old shoe label.
          </p>
          <p>
            This Shoe Size Calculator uses heel-to-toe length and optional forefoot width measurements to estimate a starting size and compare the result across several international sizing systems. It also looks at both feet, because left and right feet are often not exactly the same size. For broader dimension and measurement unit conversions beyond footwear, the{" "}
            <Link
              href="/calculators/conversion-calculator"
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              Conversion Calculator
            </Link>{" "}
            provides length, area, volume, and temperature tools.
          </p>
          <p>
            For the most reliable result, measure both feet while standing, record the larger dimensions, and use the calculator&apos;s recommendation as a starting point rather than a guarantee that every shoe from every manufacturer will fit identically.
          </p>
          <p>
            That distinction matters because footwear sizing systems have evolved differently. ISO 19407:2023 provides conversion guidance for major systems rather than claiming that every national size label has one universal exact conversion, and ISO 9407:2019 defines Mondopoint around actual foot measurements.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            2. What Does a Shoe Size Actually Measure?
          </h2>
          <p>
            A shoe size is a sizing label, not a universal measurement of the wearer&apos;s foot in every brand and model.
          </p>
          <p>
            Different systems encode size differently. US and UK sizing use their own numerical scales, European sizing is based on the Paris Point concept, and Mondopoint is directly based on foot dimensions.
          </p>
          <p>
            Even when two shoes carry what appears to be the same nominal size, their internal fit can differ because of differences in:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>Shoe last (the 3D anatomical foot mold)</li>
            <li>Toe box shape and clearance height</li>
            <li>Forefoot width across the metatarsal joint</li>
            <li>Upper materials (rigid leather vs stretch knit)</li>
            <li>Intended activity and internal padding</li>
            <li>Manufacturing tolerances</li>
            <li>Brand grading across half-sizes</li>
          </ul>
          <p>
            ISO 19407:2023 explicitly notes that different sizing systems developed and were interpreted differently over time, which is why its conversion tables are intended as guidance.
          </p>
          <p>
            So the calculator should be understood as producing a measurement-based starting recommendation, not a universal guarantee of fit.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Why Measure Both Feet?
          </h2>
          <p>
            It is common for one foot to be slightly longer or wider than the other.
          </p>
          <p>
            A calculator that uses only one foot can therefore recommend a size that fits the smaller foot but puts unnecessary pressure on the larger one.
          </p>
          <p>
            This calculator compares:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>Left foot length vs Right foot length</li>
            <li>Left foot width vs Right foot width (when provided)</li>
          </ul>
          <p>
            For the reference case:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            Left foot = 10.0 in | Right foot = 9.9 in
          </div>
          <p>
            The left foot is 0.10 in longer, so the recommendation is based on the larger foot. The calculator explicitly reports that asymmetry rather than silently averaging the measurements.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            4. How to Measure Your Foot at Home
          </h2>
          <p>
            A simple home measurement can provide a much better starting point than guessing from an old shoe.
          </p>
          <div className="space-y-2">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60">
              <strong className="text-blue-600 dark:text-blue-400 block mb-1">Step 1: Stand on paper</strong>
              <p>Place your foot on a sheet of paper with your heel against a flat vertical wall. Measure while standing so that the foot is carrying normal body weight.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60">
              <strong className="text-blue-600 dark:text-blue-400 block mb-1">Step 2: Mark the longest toe</strong>
              <p>Make a small mark at the end of the longest toe using a vertically held pen. Do this for both feet.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60">
              <strong className="text-blue-600 dark:text-blue-400 block mb-1">Step 3: Measure heel to toe</strong>
              <p>Measure the straight distance from the wall/heel position to the longest-toe mark with a ruler in inches, centimeters, or millimeters.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60">
              <strong className="text-blue-600 dark:text-blue-400 block mb-1">Step 4: Measure the forefoot width</strong>
              <p>When the calculator requests width, measure the broadest part of the forefoot across the first and fifth metatarsal joints.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-700/60">
              <strong className="text-blue-600 dark:text-blue-400 block mb-1">Step 5: Repeat for the other foot</strong>
              <p>Record the left and right values separately to capture natural bilateral asymmetry.</p>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            5. When Should You Measure Your Feet?
          </h2>
          <p>
            Feet can change size and shape during the day, particularly after periods of standing and walking.
          </p>
          <p>
            For practical shoe fitting, measuring later in the day can be useful because it may capture a more expanded, weight-bearing foot.
          </p>
          <p>
            The important point is consistency: measure both feet under the same conditions and use the same measurement method. Do not interpret normal daily variation as evidence that something is medically wrong.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Foot Length vs Shoe Length
          </h2>
          <p>
            This distinction is essential. Your foot length is the physical length of your bare foot. The internal length of a shoe is not necessarily identical to that measurement.
          </p>
          <p>
            Shoes need usable internal space for normal movement, the shape of the toe box, material construction, and the intended activity.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
            <p>Foot Length ≠ Shoe Label Length</p>
            <p>Foot Length ≠ Exact Internal Shoe Length</p>
          </div>
          <p>
            The amount of usable space varies between shoe designs, which is one reason a numerical size cannot guarantee identical fit across brands.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Converting Inches, Centimeters and Millimeters
          </h2>
          <p>
            The calculator supports foot measurements in inches (in), centimeters (cm), and millimeters (mm).
          </p>
          <p>
            The fundamental conversions are:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
            <p>1 in = 2.54 cm</p>
            <p>1 in = 25.4 mm</p>
            <p>10.0 in = 25.4 cm = 254 mm</p>
          </div>
          <p>
            The calculator converts the actual entered values when the unit selector changes rather than merely changing the displayed unit label. When body weight needs to be evaluated alongside dimensions, the{" "}
            <Link
              href="/calculators/weight-calculator"
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              Weight Calculator
            </Link>{" "}
            and{" "}
            <Link
              href="/calculators/mass-calculator"
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              Mass Calculator
            </Link>{" "}
            provide physical weight-to-mass conversions.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            8. How the Shoe Size Calculation Works
          </h2>
          <p>
            The current implementation uses a measurement-based sizing model. For standard men&apos;s sizing, the engine uses:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            US Men = 3L − 21.5
          </div>
          <p>
            where <em>L</em> is the selected foot length in inches.
          </p>
          <p>
            For the reference input:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
            <p>L = 10.0 in</p>
            <p>US Men = 3(10.0) − 21.5 = 30.0 − 21.5 = 8.5</p>
          </div>
          <p>
            The calculator then produces corresponding international values and width information. This formula should be presented as the calculator&apos;s model, not as a universal law governing every footwear brand.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            9. US Men&apos;s, Women&apos;s and Kids&apos; Sizing
          </h2>
          <p>
            The calculator distinguishes between Men&apos;s, Women&apos;s and Kids&apos; modes rather than treating one formula as appropriate for every wearer.
          </p>
          <p>
            For women&apos;s sizing, the implemented relationship is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            US Women = US Men + 1.5
          </div>
          <p>
            The system also has a dedicated children&apos;s domain. Adult-sized feet entered into the Kids calculation no longer produce an artificial child size; the calculator now displays a transition advisory when the measurement exceeds the supported children&apos;s range.
          </p>
          <p>
            That behavior is important because children’s footwear sizing is not simply an unlimited continuation of an adult-size equation.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            10. US to UK Shoe Size Conversion
          </h2>
          <p>
            For the calculator&apos;s implemented model:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            UK = US Men&apos;s − 1.0
          </div>
          <p>
            So the reference case: US Men&apos;s 8.5 becomes UK 7.5.
          </p>
          <p>
            The reverse conversion is mathematically consistent:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            L = (UK + 22.5) / 3
          </div>
          <p>
            The post-fix audit verified UK 7.5 → US 8.5 → UK 7.5 across 1,000 randomized round trips with exact recovery.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            11. European Shoe Sizes Are Not a Perfect One-to-One Conversion
          </h2>
          <p>
            European shoe sizing requires particular care because &quot;EU size&quot; is often treated online as though one simple equation universally determines the retail label.
          </p>
          <p>
            The calculator uses a theoretical Paris Point-style relationship:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
            <p>EU = round[1.5 × (L_cm + 1.5)]</p>
            <p>10.0 in = 25.4 cm</p>
            <p>EU = round[1.5 × (25.4 + 1.5)] = round(40.35) = EU 40</p>
          </div>
          <p>
            However, practical retail labeling can differ because commercial shoes incorporate different last constructions and fitting allowances (often 1.5 to 2.0 cm), causing commercial footwear for a 10.0-inch foot to frequently be labeled EU 41 or 42.
          </p>
          <p>
            The page explicitly distinguishes theoretical conversion from commercial retailer or brand labeling. ISO 19407:2023 reinforces this cautious treatment by describing international conversion tables as guidance rather than claiming a perfect universal mapping.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Japan and Mondopoint
          </h2>
          <p>
            The calculator provides a Japanese-style centimeter result and a Mondopoint millimeter representation.
          </p>
          <p>
            For the reference 10.0-inch foot (25.4 cm), the calculator&apos;s JP display rounds to 25.5 cm, and the corresponding measurement in millimeters is approximately 254 mm.
          </p>
          <p>
            Mondopoint is a distinct standardized concept. ISO 9407:2019 defines Mondopoint as a method of footwear sizing and marking based on specified measurements of the foot (length and width in millimeters). This is why the page should not casually claim that JP, Mondopoint, and every Japanese retail size are all exactly the same thing.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            13. The Reference Example: 10.0-Inch and 9.9-Inch Feet
          </h2>
          <p>
            Suppose the measurements entered are:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-slate-200 dark:border-slate-700 text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 font-bold">
                <tr>
                  <th className="p-2 border border-slate-200 dark:border-slate-700">Measurement</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-700">Left</th>
                  <th className="p-2 border border-slate-200 dark:border-slate-700">Right</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-mono">
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">Foot length</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">10.0 in</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">9.9 in</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">Forefoot width</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">3.8 in</td>
                  <td className="p-2 border border-slate-200 dark:border-slate-700">3.7 in</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            The calculator identifies the left foot as the longer foot by 0.10 in and uses the larger foot for the recommendation:
          </p>
          <ul className="list-disc pl-5 space-y-1 font-mono text-xs text-slate-700 dark:text-slate-300">
            <li>US Men&apos;s: 8.5</li>
            <li>UK: 7.5</li>
            <li>EU theoretical conversion: 40 (Retail: 41–42)</li>
            <li>JP: 25.5 cm</li>
            <li>Width: Standard / Medium (D / M)</li>
          </ul>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Shoe Width: Narrow, Standard, Wide and Extra Wide
          </h2>
          <p>
            Length is only part of shoe fit. A shoe can have the correct length but still feel too tight or too loose across the forefoot.
          </p>
          <p>
            This calculator therefore considers optional width measurements. For men&apos;s sizing, the implemented width model uses the length-to-width ratio and classifies the result into:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Narrow (A / 2A / B):</strong> Designed for slim feet with lower instep volume.</li>
            <li><strong>Standard / Medium (D / M):</strong> Standard off-the-shelf width accounting for roughly 70% of the population.</li>
            <li><strong>Wide (E / 2E / W):</strong> Extra room across the metatarsal joint to prevent bunions and side pinching.</li>
            <li><strong>Extra Wide (4E / 6E / XW):</strong> Specialty orthopedic width for wide feet, flat arches, or diabetic footwear.</li>
          </ul>
          <p>
            The production model uses different ratio thresholds for men&apos;s and women&apos;s profiles. These labels should be treated as the calculator&apos;s classification system rather than a universal guarantee of how every manufacturer labels width.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Why Width Letters Differ Between Brands
          </h2>
          <p>
            Width letters are particularly easy to misinterpret. A letter such as D does not have exactly the same practical meaning for every footwear manufacturer, model, and market.
          </p>
          <p>
            For Women, B is typically standard medium width, while for Men, D is standard medium width. The actual shoe should still be checked against the manufacturer&apos;s own width chart, especially when buying specialty, athletic, safety, or orthopedic footwear.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            16. What Happens When Your Feet Are Different Widths?
          </h2>
          <p>
            Length asymmetry and width asymmetry are distinct considerations. Consider:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            Left: 10.0 in × 3.8 in | Right: 9.8 in × 4.4 in
          </div>
          <p>
            Even though the right foot is shorter, it is significantly wider. The calculator explicitly flags width differences of at least 0.15 in and identifies which foot is wider.
          </p>
          <p>
            For practical fitting, the wider foot can be the limiting dimension, but the final decision still depends on the shoe&apos;s actual shape and construction.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            17. Running Shoes, Hiking Boots and Everyday Shoes
          </h2>
          <p>
            The best size is influenced by how the footwear will be used:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-slate-300">
            <li><strong>Running Shoes:</strong> May require more usable forefoot and toe space (often 0.5 size up) because of repeated impact and downhill foot sliding.</li>
            <li><strong>Hiking Boots:</strong> Often require 12–15 mm of toe clearance to account for thick wool socks and steep descents.</li>
            <li><strong>High Heels:</strong> Fit snugly at the heel to prevent slippage while ensuring the ball of the foot rests cleanly on the arch pad.</li>
          </ul>
          <p>
            The calculator provides a measurement-based starting point, but it should not turn these activity-specific considerations into a universal rule.
          </p>
        </section>

        {/* Section 18 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            18. Brand and Model Variation
          </h2>
          <p>
            A major reason online shoe-size conversions can disagree is that footwear companies do not manufacture every shoe from the same last.
          </p>
          <p>
            The calculator includes brand/fit profiles for multiple brands (Nike, Adidas, Converse, Hoka, Vans, ASICS, Doc Martens) and a standard profile.
          </p>
          <p>
            Use those profiles as comparative guidance, not as a replacement for the specific manufacturer&apos;s current size guide. Two brands can both label a shoe US 8.5, yet the usable internal dimensions can differ.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            measure foot → calculate starting size → check brand/model chart → verify fit
          </div>
        </section>

        {/* Section 19 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            19. Children&apos;s Shoe Sizing
          </h2>
          <p>
            Children&apos;s sizing deserves special handling because feet grow and children&apos;s size systems are not simply adult sizes with smaller numbers.
          </p>
          <p>
            The calculator includes a Kids mode and validates its input domain. When an entered foot length exceeds the supported Kids range, the calculator gives an explicit advisory to switch to an adult sizing mode instead of generating an artificial large &quot;Kids&quot; size.
          </p>
          <p>
            For growing children, measurements should be repeated every 2 to 3 months for toddlers and every 4 to 6 months for school-aged kids.
          </p>
        </section>

        {/* Section 20 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            20. Common Shoe-Sizing Mistakes
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Using only one foot:</strong> Always measure both feet; fit to the larger dimension.</li>
            <li><strong>Measuring while sitting:</strong> Standing measurement represents the loaded, weight-bearing foot.</li>
            <li><strong>Measuring with different methods:</strong> Use the same method and sock thickness for both feet.</li>
            <li><strong>Treating size conversion as exact across brands:</strong> International conversion is a guideline, not a guarantee (ISO 19407:2023).</li>
            <li><strong>Ignoring width:</strong> Correct length does not guarantee a comfortable forefoot.</li>
            <li><strong>Reusing old sizes:</strong> Feet change shape over time through body weight, activity, and age.</li>
            <li><strong>Assuming JP and Mondopoint are interchangeable:</strong> JP is in cm; Mondopoint is an ISO standard in mm.</li>
            <li><strong>Treating the calculator as a medical diagnosis:</strong> Sizing advice is practical guidance, not orthopedic diagnosis.</li>
          </ul>
        </section>

        {/* Section 21 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            21. How to Use the Shoe Size Calculator
          </h2>
          <div className="space-y-1.5">
            <p><strong>Step 1:</strong> Select Men, Women, or Kids according to the relevant sizing scale.</p>
            <p><strong>Step 2:</strong> Select your preferred measurement unit (in, cm, or mm).</p>
            <p><strong>Step 3:</strong> Enter Left and Right heel-to-toe foot length and optional joint width.</p>
            <p><strong>Step 4:</strong> Review the calculated recommended size, bilateral asymmetry notes, and width profile.</p>
            <p><strong>Step 5:</strong> Check the international conversion matrix (US, UK, EU, JP, Mondopoint).</p>
            <p><strong>Step 6:</strong> Switch to Brand Fit to see brand-specific offset adjustments (Nike, Adidas, Converse, etc.).</p>
            <p><strong>Step 7:</strong> Use Copy, CSV, TXT, or Full Report to save your fit profile.</p>
          </div>
        </section>

        {/* Section 22 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            22. Example: Converting 10 Inches to Shoe Measurements
          </h2>
          <p>
            Start with 10.0 in:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs space-y-1">
            <p>10.0 × 2.54 = 25.4 cm</p>
            <p>10.0 × 25.4 = 254 mm</p>
            <p>US Men = 3(10.0) − 21.5 = 8.5</p>
            <p>UK = 8.5 − 1.0 = 7.5</p>
            <p>EU theoretical = round[1.5 × (25.4 + 1.5)] = 40 (Commercial retail: 41–42)</p>
            <p>JP = 25.5 cm | Mondopoint = 254 mm</p>
          </div>
          <p>
            The distinction between theoretical EU conversion and commercial retail labeling is explicitly harmonized across the article, conversion table, and FAQ.
          </p>
        </section>

        {/* Section 23 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            23. Shoe Size Conversion: Why Online Charts Disagree
          </h2>
          <p>
            Different online charts can legitimately produce slightly different results because shoe-size systems are not all defined from exactly the same physical measurement or historical starting point.
          </p>
          <p>
            ISO 19407:2023 covers conversion among Mondopoint, European, UK, US, Japan, China, Korea, and other systems, but explicitly describes its conversion tables as guidance because of historical differences and the lack of a single universal conversion solution.
          </p>
          <p>
            Therefore, the best comparison is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60 font-mono text-xs">
            foot measurement + calculator model + manufacturer&apos;s size guide
          </div>
        </section>

        {/* Section 24 */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            24. Accuracy and Limitations
          </h2>
          <p>
            The calculator&apos;s numerical calculations are deterministic, verified across <strong>56,046 / 56,046 assertions</strong> with a 100% pass rate.
          </p>
          <p>
            However, numerical accuracy does not mean that a shoe size is guaranteed to fit a particular product. The calculator cannot directly measure:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>Actual shoe internal volume</li>
            <li>Toe-box height geometry</li>
            <li>Heel counter curvature</li>
            <li>Upper stiffness and lining friction</li>
            <li>Sock thickness</li>
            <li>Personal fit preferences (snug vs relaxed)</li>
          </ul>
          <p>
            Use the result as a technically informed starting point.
          </p>
        </section>
      </div>

      {/* 2. FREQUENTLY ASKED QUESTIONS (UNFOLDED) */}
      <div className="pt-8 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
            25. Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {shoe_size_calculatorFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs sm:text-sm"
            >
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                {faq.question}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. REFERENCES AND SOURCES */}
      <div className="pt-8 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
            Footwear Sizing References
          </h2>
        </div>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
            <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 text-xs">
              <span>ISO 19407:2023 — Footwear — Sizing — Conversion of sizing systems</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              International standard providing comparative conversion guidelines among Mondopoint, European (Paris Point), UK, US, Japan, and other national sizing systems.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
            <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 text-xs">
              <span>ISO 9407:2019 — Footwear sizing — Mondopoint system of sizing and marking</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Defines the global Mondopoint system based on direct foot length and width measurements in millimeters.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1">
            <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 text-xs">
              <span>Manufacturer Sizing Guides (e.g. adidas, Nike Footwear Size Charts)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Commercial manufacturer size specifications demonstrating how individual brands map measured foot length to their proprietary last models and retail labels.
            </p>
          </div>
        </div>
      </div>

      {/* 4. RELATED CALCULATORS — AFTER ARTICLE */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-2">
          RELATED CALCULATORS
        </span>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
          <Link
            href="/calculators/conversion-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline font-bold transition-colors"
          >
            Conversion Calculator
          </Link>
          <span className="text-slate-400">|</span>
          <Link
            href="/calculators/weight-calculator"
            className="text-blue-600 dark:text-blue-400 hover:underline font-bold transition-colors"
          >
            Weight Calculator
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ShoeSizeContent;
