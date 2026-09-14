"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  BookOpen,
  Scale,
  ShieldCheck,
  Info,
  Layers,
  HeartPulse,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { body_type_calculatorFaqs } from "@/app/calculators/body-type-calculator/faq";

export function BodyTypeContent() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-10 text-slate-800 dark:text-slate-200 font-sans">
      {/* Educational Article Section */}
      <article className="space-y-8">
        {/* Article Header */}
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-2xl border border-blue-100 dark:border-blue-900/50">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400">
              Find Your Body Shape With a Measurement-Based Body Type Calculator
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              An evidence-based guide to body proportions, shape similarity, WHR, WHtR, somatotype proxies, and practical styling.
            </p>
          </div>
        </div>

        {/* Introduction */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <p>
            Your body shape is determined by the proportions between different body measurements, not by one number on a scale.
          </p>
          <p>
            A body type calculator can help you compare measurements such as bust or chest, natural waist, hips, height, and weight to describe broad proportional patterns such as Hourglass, Pear/Triangle, Inverted Triangle, Rectangle, Spoon, Bottom Hourglass, or Top Hourglass.
          </p>
          <p>
            This calculator also adds two useful ratio measures:
          </p>
          <ul className="list-disc pl-5 space-y-1 font-medium text-slate-900 dark:text-slate-100">
            <li>Waist-to-Hip Ratio (WHR)</li>
            <li>Waist-to-Height Ratio (WHtR)</li>
          </ul>
          <p>
            and provides an <strong>Estimated Anthropometric Somatotype Proxy</strong> plus a calculator-generated <strong>Shape Similarity Score</strong>.
          </p>
          <p>
            The important distinction is that these outputs describe different things. A body-shape classification is not a medical diagnosis, WHR and WHtR are not complete measures of health, and a similarity score is not a probability that your body “is” a particular type. The calculator explicitly separates these concepts.
          </p>

          {/* Core Boundary Notice */}
          <div className="p-4 bg-amber-50/70 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/50 text-xs text-slate-800 dark:text-slate-200 space-y-1.5">
            <div className="font-black text-amber-900 dark:text-amber-300 flex items-center gap-2 uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              Essential Conceptual &amp; Diagnostic Boundary
            </div>
            <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              BODY SHAPE ≠ BODY COMPOSITION ≠ HEALTH-RISK INDICATOR ≠ MEDICAL DIAGNOSIS
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              Someone can have an Hourglass classification and still have a health issue. Someone can have a Rectangle classification and be very healthy. Someone can have the same WHR as another person but very different body composition. The calculator therefore deliberately treats shape, ratios, and health-related screening measures as separate concepts.
            </p>
          </div>
        </div>

        {/* What Does a Body Type Calculator Actually Measure? */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            What Does a Body Type Calculator Actually Measure?
          </h3>
          <p>
            A body type calculator compares the relative proportions of your measurements.
          </p>
          <p>
            For example, two people may both have a 36-inch bust, but their body shapes can look quite different if one has a 26-inch waist and another has a 34-inch waist. That is why the calculator considers several measurements rather than asking only for height or weight.
          </p>
          <p>A simplified view looks like this:</p>
          <div className="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner leading-relaxed">
            <pre>{`Bust / Chest
     │
     ├──────┐
     │      │
   Waist   Hips
     │      │
     └──┬───┘
        │
 Body Proportions
   ┌────┴────┐
   ↓         ↓
Body Shape Ratios
   │    WHR / WHtR`}</pre>
          </div>
          <p>
            The result is therefore a proportion-based description, not a direct measurement of body fat or overall health.
          </p>
        </div>

        {/* How to Use the Body Type Calculator */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            How to Use the Body Type Calculator
          </h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Choose the measurement system:</strong> You can work in inches and pounds, or centimeters and kilograms.
            </li>
            <li>
              <strong>Select the appropriate body-shape framework:</strong> The calculator separates the female body-shape model from the male frame model.
            </li>
            <li>
              <strong>Enter your measurements:</strong> Depending on the selected mode, the calculator uses measurements such as bust/chest, natural waist, high hip, low/total hip, height, and weight.
            </li>
            <li>
              <strong>Review the results:</strong> The calculator returns primary body-shape classification, shape similarity score, WHR, WHtR, estimated anthropometric somatotype proxy, proportion information, style guidance, and general fitness guidance.
            </li>
            <li>
              <strong>Export or save your result:</strong> The calculator supports result sharing/export features where available, using the same calculated state as the on-screen result.
            </li>
          </ol>
        </div>

        {/* Why Body Measurements Matter More Than Weight Alone */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Why Body Measurements Matter More Than Weight Alone
          </h3>
          <p>
            Body weight tells you how much mass you have. It does not describe where that mass is distributed.
          </p>
          <p>
            Two people with identical height and weight can have noticeably different proportions because their bust/chest, waist, hip, and other dimensions differ. That is why body-shape analysis focuses on relationships such as:
          </p>
          <ul className="list-disc pl-5 space-y-1 font-mono text-xs">
            <li>Bust − Waist</li>
            <li>Hip − Waist</li>
            <li>Hip − Bust</li>
            <li>High Hip ÷ Waist</li>
          </ul>
          <p>
            Those proportional differences help the calculator identify the broad silhouette that best fits its classification rules.
          </p>
        </div>

        {/* The Body Shapes Used by This Calculator */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            The Body Shapes Used by This Calculator
          </h3>
          <p>
            The calculator uses a seven-category female reference designed for practical self-measurement. It is important to understand what that means.
          </p>
          <p>
            The original NCSU Female Figure Identification Technique (FFIT) was developed for apparel applications using 3D body-scan data and identified nine female body-shape categories.
          </p>
          <p>
            This calculator does not reproduce that complete nine-category 3D scanning system. Instead, it consolidates seven categories that can be estimated from ordinary tape measurements. The two categories omitted from the original framework are <strong>Oval</strong> and <strong>Diamond</strong>, because a basic tape-measure system cannot reliably capture the multidimensional torso and abdominal-surface information needed to distinguish those shapes.
          </p>
          <p>The seven calculator categories are:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Hourglass:</strong> Bust and hip measurements are relatively balanced while the natural waist shows substantial indentation.</li>
            <li><strong>Bottom Hourglass:</strong> The lower body is more prominent than the bust, but the waist remains clearly defined.</li>
            <li><strong>Top Hourglass:</strong> The bust is somewhat more prominent than the hips while a defined waist remains present.</li>
            <li><strong>Spoon:</strong> The high-hip area has a pronounced shelf relative to the waist, combined with a lower-body-dominant proportion.</li>
            <li><strong>Triangle / Pear:</strong> Hip circumference is substantially greater than bust circumference.</li>
            <li><strong>Inverted Triangle:</strong> The upper body is broader relative to the hips.</li>
            <li><strong>Rectangle / Banana:</strong> Bust and hip measurements are relatively balanced while waist indentation is less pronounced.</li>
          </ul>
          <p className="italic text-slate-600 dark:text-slate-400">
            These are proportion categories, not judgments about attractiveness, fitness, health, or body quality.
          </p>
        </div>

        {/* Deep Dives on Individual Shapes */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Proportional Characteristics by Body Shape
          </h3>
          
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">What Is the Hourglass Body Shape?</h4>
            <p>
              An hourglass classification generally describes a relatively balanced bust and hip relationship combined with a clearly smaller waist. The calculator&apos;s adapted rule looks at both bust-to-hip balance and waist indentation rather than using the word “hourglass” simply because someone&apos;s waist appears small. That distinction matters because a body can have a relatively small waist without having balanced upper- and lower-body measurements.
            </p>

            <h4 className="font-bold text-slate-900 dark:text-slate-100">What Is a Pear or Triangle Body Shape?</h4>
            <p>
              A Triangle, often called Pear, describes a proportional pattern in which the hips are noticeably larger than the bust. In this calculator, the classification uses the relationship between Hip − Bust and the degree of waist indentation. The result describes a silhouette pattern. It does not mean that a person has a particular type of body composition.
            </p>

            <h4 className="font-bold text-slate-900 dark:text-slate-100">What Is an Inverted Triangle Body Shape?</h4>
            <p>
              An Inverted Triangle describes the opposite broad proportional pattern: the upper body is more prominent relative to the hips. Depending on the model, this can reflect chest, shoulder, or upper-torso dominance. Your calculator&apos;s female model and male frame model are intentionally treated as separate systems rather than assuming one classification framework applies equally to everyone.
            </p>

            <h4 className="font-bold text-slate-900 dark:text-slate-100">What Is a Rectangle or Banana Body Shape?</h4>
            <p>
              A Rectangle classification describes relatively balanced bust/chest and hip proportions combined with comparatively limited waist indentation. It does not mean that the person&apos;s body is literally rectangular. It is simply a convenient label for a broad proportional pattern.
            </p>

            <h4 className="font-bold text-slate-900 dark:text-slate-100">What Is the Spoon Body Shape?</h4>
            <p>
              The Spoon category considers a feature that many simple body-shape calculators ignore: the high-hip region. The calculator uses a high-hip-to-waist relationship in combination with the difference between hip and bust measurements. This is why it asks for a High Hip measurement instead of relying only on bust, waist, and total hip.
            </p>

            <h4 className="font-bold text-slate-900 dark:text-slate-100">What Are Bottom Hourglass and Top Hourglass?</h4>
            <p>
              These categories are useful when the proportions show a pronounced waist but the upper and lower body are not perfectly balanced:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Bottom Hourglass:</strong> The hips are more prominent than the bust while the waist remains substantially smaller.</li>
              <li><strong>Top Hourglass:</strong> The bust is more prominent than the hips while the waist remains substantially smaller.</li>
            </ul>
            <p>
              These are useful descriptive distinctions because “hourglass” does not always mean that bust and hip circumferences are nearly identical.
            </p>
          </div>
        </div>

        {/* How the Calculator Determines Your Shape */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            How the Calculator Determines Your Shape
          </h3>
          <p>
            The calculator uses proportion-based conditions. For example, its adapted female framework examines relationships including:
          </p>
          <p className="font-mono text-xs bg-slate-100 dark:bg-slate-800/60 p-3 rounded-lg">
            Bust − Waist &nbsp;|&nbsp; Hip − Waist &nbsp;|&nbsp; Hip − Bust &nbsp;|&nbsp; High Hip ÷ Waist &nbsp;|&nbsp; Bust ÷ Hip
          </p>
          <p>
            The exact rule varies by shape. The calculator marks each implementation as an adaptation where changes were made to make the original research more practical for self-measurement. That distinction is important for transparency: a simplified online calculator should not pretend to be identical to a research protocol that used 3D body scanning.
          </p>

          {/* Female Classification Source Mapping Table */}
          <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl mt-3">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-2.5">Shape</th>
                  <th className="p-2.5">Published Source Criterion (NCSU FFIT 3D Scan)</th>
                  <th className="p-2.5">Calculator Criterion (2D Tape Measurement)</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-2.5 font-sans font-semibold text-slate-900 dark:text-slate-100">Hourglass</td>
                  <td className="p-2.5">(Bust - Hip) ≤ 1&quot; &amp; (Hip - Bust) &lt; 3.6&quot; &amp; ((Bust - Waist) ≥ 9&quot; or (Hip - Waist) ≥ 10&quot;)</td>
                  <td className="p-2.5">|Bust - Hip| ≤ 1&quot; &amp; (Bust - Waist) ≥ 9&quot; &amp; (Hip - Waist) ≥ 9&quot;</td>
                  <td className="p-2.5 font-sans font-bold text-amber-600">ADAPTED</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-2.5 font-sans font-semibold text-slate-900 dark:text-slate-100">Bottom Hourglass</td>
                  <td className="p-2.5">(Hip - Bust) ≥ 3.6&quot; &amp; (Hip - Bust) &lt; 10&quot; &amp; (Hip - Waist) ≥ 9&quot; &amp; (HighHip/Waist) &lt; 1.193</td>
                  <td className="p-2.5">(Hip - Bust) ≥ 2&quot; &amp; (Hip - Bust) &lt; 8&quot; &amp; (Hip - Waist) ≥ 7&quot; &amp; (HighHip/Waist) &lt; 1.193</td>
                  <td className="p-2.5 font-sans font-bold text-amber-600">ADAPTED</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-2.5 font-sans font-semibold text-slate-900 dark:text-slate-100">Top Hourglass</td>
                  <td className="p-2.5">(Bust - Hip) &gt; 1&quot; &amp; (Bust - Hip) &lt; 10&quot; &amp; (Bust - Waist) ≥ 9&quot;</td>
                  <td className="p-2.5">(Bust - Hip) ≥ 2&quot; &amp; (Bust - Hip) &lt; 8&quot; &amp; (Bust - Waist) ≥ 7&quot;</td>
                  <td className="p-2.5 font-sans font-bold text-amber-600">ADAPTED</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-2.5 font-sans font-semibold text-slate-900 dark:text-slate-100">Spoon</td>
                  <td className="p-2.5">(Hip - Bust) ≥ 2&quot; &amp; (HighHip/Waist) ≥ 1.193</td>
                  <td className="p-2.5">(HighHip/Waist) ≥ 1.193 &amp; (Hip - Bust) ≥ 2&quot; &amp; (Hip - Waist) ≥ 7&quot;</td>
                  <td className="p-2.5 font-sans font-bold text-amber-600">ADAPTED</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-2.5 font-sans font-semibold text-slate-900 dark:text-slate-100">Triangle (Pear)</td>
                  <td className="p-2.5">(Hip - Bust) ≥ 2&quot; &amp; (Hip - Waist) &lt; 7&quot; or (HighHip/Waist) &lt; 1.193 with low bust delta</td>
                  <td className="p-2.5">(Hip - Bust) ≥ 2&quot; with waist curve not satisfying Hourglass indentation</td>
                  <td className="p-2.5 font-sans font-bold text-amber-600">ADAPTED</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-2.5 font-sans font-semibold text-slate-900 dark:text-slate-100">Inverted Triangle</td>
                  <td className="p-2.5">(Bust - Hip) ≥ 3.6&quot; with (Bust - Waist) &lt; 9&quot;</td>
                  <td className="p-2.5">(Bust - Hip) ≥ 2&quot; without meeting Top Hourglass indentation</td>
                  <td className="p-2.5 font-sans font-bold text-amber-600">ADAPTED</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-2.5 font-sans font-semibold text-slate-900 dark:text-slate-100">Rectangle (Banana)</td>
                  <td className="p-2.5">|Bust - Hip| &lt; 3.6&quot; &amp; (Bust - Waist) &lt; 9&quot; &amp; (Hip - Waist) &lt; 10&quot;</td>
                  <td className="p-2.5">|Bust - Hip| ≤ 2&quot; &amp; (Bust - Waist) &lt; 9&quot; &amp; (Hip - Waist) &lt; 9&quot;</td>
                  <td className="p-2.5 font-sans font-bold text-amber-600">ADAPTED</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Why Can Two Body Type Calculators Give Different Answers? */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Why Can Two Body Type Calculators Give Different Answers?
          </h3>
          <p>
            Because “body type” is not one universally defined mathematical system. Different calculators can use:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>different measurements;</li>
            <li>different measurement locations;</li>
            <li>different thresholds;</li>
            <li>different shape categories;</li>
            <li>different classification order;</li>
            <li>different tolerance rules.</li>
          </ul>
          <p>
            Even research comparing body-shape systems has found that small differences in measurement definitions can change the resulting classification. A{" "}
            <a
              href="https://www.tandfonline.com/doi/full/10.1080/00140139.2021.1902572"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700"
            >
              2021 evaluation of FFIT published in Ergonomics
            </a>{" "}
            specifically examined the effect of differences in measurement definitions on body-shape classification.
          </p>
          <p>
            So a disagreement between two calculators does not automatically mean one is “wrong.” It may mean they are using different models.
          </p>
        </div>

        {/* What Is the Shape Similarity Score? */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            What Is the Shape Similarity Score?
          </h3>
          <p>
            Your calculator provides a <strong>Shape Similarity Score</strong> on a 0–100-style scale.
          </p>
          <p>
            This is not the same thing as saying “You are 98% certainly an Hourglass,” nor does it mean “The algorithm is 98% accurate.”
          </p>
          <p>
            The score is generated by the calculator&apos;s own mathematical distance model using proportional features. Its scaling constants are application-defined heuristics rather than a published NCSU accuracy model.
          </p>
          <p className="p-3 bg-blue-50/60 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900/50 font-medium text-slate-900 dark:text-slate-100">
            The safest interpretation is: A higher score means the entered proportions are mathematically closer to the criteria used for that calculator category. It is a comparison tool, not a biological probability.
          </p>

          <h4 className="font-bold text-slate-900 dark:text-slate-100 pt-2">How the Shape Similarity Score Is Calculated</h4>
          <p>
            The calculator first converts your measurements into a feature space. Its documented features include:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>bust-to-waist difference;</li>
            <li>hip-to-waist difference;</li>
            <li>hip-to-bust difference;</li>
            <li>high-hip-to-waist relationship.</li>
          </ul>
          <p>
            It then calculates a multidimensional distance between your measurements and the target characteristics for each shape:
          </p>
          <div className="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner leading-relaxed">
            <pre>{`Your proportions
       ↓
Normalized features
       ↓
Distance from shape criteria
       ↓
Similarity score
       ↓
Ranked shape results`}</pre>
          </div>
          <p>
            The calculator intentionally caps the visible score below absolute certainty (12 to 98 range). That is a design choice to avoid presenting a mathematical heuristic as a biological fact.
          </p>
        </div>

        {/* What Is Waist-to-Hip Ratio (WHR)? */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            What Is Waist-to-Hip Ratio (WHR)?
          </h3>
          <p>
            Waist-to-Hip Ratio (WHR) compares waist circumference with hip circumference. The formula is:
          </p>
          <p className="font-mono text-sm font-bold text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
            WHR = Waist ÷ Hip
          </p>
          <p>
            For example: 26 ÷ 36 = <strong>0.722</strong>. The calculator displays the result rounded to three decimal places.
          </p>
          <p>
            WHR has been studied as an anthropometric indicator associated with cardiometabolic and other health risks. The{" "}
            <a
              href="https://www.who.int/publications/i/item/9789241501491"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700"
            >
              World Health Organization&apos;s 2008 expert consultation
            </a>{" "}
            specifically reviewed waist circumference and waist-hip ratio, including measurement methods, variation by sex, age, and ethnicity, and their relationship with risks such as cardiovascular disease and diabetes. However, WHR is a risk indicator, not a diagnosis.
          </p>

          <h4 className="font-bold text-slate-900 dark:text-slate-100">What Does a WHR of 0.72 Mean?</h4>
          <p>
            A WHR of 0.72 simply means the waist measurement is 72% of the hip measurement when both are expressed in the same unit. It can be useful for describing relative body proportions. The health interpretation is a separate issue and depends on the population, measurement method, and reference being used.
          </p>
          <p>
            That is why this calculator labels its WHR bands as calculator reference categories rather than presenting them as universal WHO diagnostic tiers.
          </p>
        </div>

        {/* What Is Waist-to-Height Ratio (WHtR)? */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            What Is Waist-to-Height Ratio (WHtR)?
          </h3>
          <p>
            Waist-to-Height Ratio (WHtR) is:
          </p>
          <p className="font-mono text-sm font-bold text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
            WHtR = Waist ÷ Height
          </p>
          <p>
            For example: 26 ÷ 66 = <strong>0.394</strong>. The calculator displays this ratio to three decimal places.
          </p>
          <p>
            WHtR is used as a practical measure of central adiposity in health guidance.{" "}
            <a
              href="https://www.nice.org.uk/guidance/ng246/chapter/Identifying-and-assessing-overweight-obesity-and-central-adiposity"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700"
            >
              NICE recommends measuring WHtR alongside BMI
            </a>{" "}
            in adults with BMI below 35 kg/m² and says it can help assess and predict health risks such as type 2 diabetes, hypertension, and cardiovascular disease.
          </p>

          <h4 className="font-bold text-slate-900 dark:text-slate-100">Understanding Common WHtR Reference Ranges</h4>
          <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">WHtR Range</th>
                  <th className="p-3">NICE Classification</th>
                  <th className="p-3">Clinical Screening Context</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-mono font-semibold">&lt; 0.40</td>
                  <td className="p-3">Below 0.40 reference point used in this calculator</td>
                  <td className="p-3">Reference point utilized for tracking; not a clinical diagnostic tier.</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-mono font-semibold">0.40–0.49</td>
                  <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">Healthy central adiposity</td>
                  <td className="p-3">Recommended baseline associated with lower cardiometabolic risk.</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-mono font-semibold">0.50–0.59</td>
                  <td className="p-3 font-semibold text-amber-600 dark:text-amber-400">Increased central adiposity</td>
                  <td className="p-3">Advises lifestyle and dietary evaluation.</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-mono font-semibold">≥ 0.60</td>
                  <td className="p-3 font-semibold text-rose-600 dark:text-rose-400">High central adiposity</td>
                  <td className="p-3">Elevated cardiometabolic risk; clinical consultation suggested.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            NICE also recommends communicating the practical goal of keeping waist circumference less than half of height, equivalent to a WHtR below 0.5. Your calculator does not use WHtR as a diagnosis. It presents the ratio as an anthropometric screening/reference measure, consistent with the site&apos;s scientific-remediation policy.
          </p>
        </div>

        {/* WHR and WHtR Are Not the Same Thing */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            WHR and WHtR Are Not the Same Thing
          </h3>
          <p>These two ratios are easy to confuse:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>WHR (Waist ÷ Hip):</strong> Describes waist size relative to hip size.</li>
            <li><strong>WHtR (Waist ÷ Height):</strong> Describes waist size relative to height.</li>
          </ul>
          <p>
            For example, with Waist = 26 in, Hip = 36 in, Height = 66 in:
          </p>
          <p className="font-mono text-xs bg-slate-100 dark:bg-slate-800/60 p-3 rounded-lg">
            WHR = 26 ÷ 36 = 0.722 &nbsp;&nbsp;|&nbsp;&nbsp; WHtR = 26 ÷ 66 = 0.394
          </p>
          <p>They answer different questions.</p>

          <h4 className="font-bold text-slate-900 dark:text-slate-100">Is WHtR Better Than BMI?</h4>
          <p>
            That question needs context. BMI measures body mass relative to height and is widely used as a practical measure of overall adiposity. WHtR provides additional information about central adiposity, which BMI does not directly measure.
          </p>
          <p>
            NICE recommends using WHtR alongside BMI in adults with BMI below 35 kg/m², rather than treating one metric as a universal replacement for the other. The correct interpretation is therefore: <strong>BMI and WHtR measure different aspects of body composition and fat distribution.</strong> Users interested in broad weight metrics can explore our{" "}
            <Link href="/calculators/bmi-calculator" className="font-semibold text-blue-600 dark:text-blue-400 underline hover:text-blue-700">
              BMI Calculator
            </Link>
            .
          </p>
        </div>

        {/* What Is Somatotype? */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            What Is Somatotype?
          </h3>
          <p>
            A somatotype is a framework for describing physique using three components:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Endomorphy:</strong> Relative adiposity and fullness.</li>
            <li><strong>Mesomorphy:</strong> Relative musculoskeletal robusticity.</li>
            <li><strong>Ectomorphy:</strong> Relative linearity and slenderness.</li>
          </ul>
          <p>
            The original Heath-Carter approach requires considerably more anthropometric information than a basic body-shape calculator. Published work using the Heath-Carter method collects measurements including height, body mass, skinfolds, bone breadths, and limb girths.
          </p>
          <p>
            Your calculator therefore does not claim to perform a laboratory Heath-Carter assessment. It reports an <strong>Estimated Anthropometric Somatotype Proxy</strong> and explicitly states that this is a simplified calculation based on height-weight and circumference relationships.
          </p>

          <h4 className="font-bold text-slate-900 dark:text-slate-100">What Does the Somatotype Proxy Mean?</h4>
          <p>
            Think of the proxy as an additional physique descriptor. It can help organize measurements into broad patterns, but it should not be interpreted as:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
            <li>a clinical diagnosis;</li>
            <li>a direct measurement of muscle mass;</li>
            <li>a laboratory somatotype;</li>
            <li>a measure of athletic ability.</li>
          </ul>
          <p>The result is best used as descriptive information alongside the other measurements.</p>
        </div>

        {/* Dynamic Changes, Fat Depots, Fertility, and Spot Reduction */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Body Morphology, Exercise &amp; Health Questions
          </h3>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">Can Body Shape Change Over Time?</h4>
            <p>
              Yes. Your proportions can change with age, pregnancy, resistance training, changes in body weight, changes in muscle mass, changes in fat distribution, posture, and measurement technique. That means a body-shape result is a snapshot of your current measurements, not a permanent biological identity.
            </p>

            <h4 className="font-bold text-slate-900 dark:text-slate-100">Does Losing Weight Automatically Change Your Body Shape?</h4>
            <p>
              Not necessarily. Weight loss can change measurements, but the proportions may not change in exactly the same way. For example, someone may lose several kilograms while retaining a similar relationship between waist and hips. Another person may see a larger change in the waist than the hips. Body shape therefore depends on where measurements change relative to one another, not simply on total weight loss.
            </p>

            <h4 className="font-bold text-slate-900 dark:text-slate-100">Does Gaining Muscle Change Your Body Shape?</h4>
            <p>
              It can. Resistance training may increase the circumference of particular muscle groups—such as chest, shoulders, glutes, or thighs—which can alter the proportional relationships used by a body-shape calculator.
            </p>

            <h4 className="font-bold text-slate-900 dark:text-slate-100">Does Body Shape Tell You Where Your Fat Is Stored?</h4>
            <p>
              Not precisely. Central fat distribution has been associated with cardiometabolic risk at the population level, but simple tape measurements do not directly distinguish visceral fat from subcutaneous fat. The calculator therefore does not claim “Apple shape = visceral fat” or “Pear shape = only subcutaneous fat.” The scientific remediation explicitly separates body-shape categories from anatomical fat-depot measurement.
            </p>

            <h4 className="font-bold text-slate-900 dark:text-slate-100">Can Body Shape Predict Fertility?</h4>
            <p>
              No. Some historical observational studies have reported associations between waist-to-hip ratio and reproductive or hormonal measures, but those findings do not make body shape a fertility test. The calculator does not claim that an individual body shape guarantees fertility, causes fertility, or predicts the ability to conceive. Reproductive health is multifactorial and requires appropriate clinical assessment when fertility is a concern.
            </p>

            <h4 className="font-bold text-slate-900 dark:text-slate-100">Can You Change Only Belly Fat With a Specific Exercise?</h4>
            <p>
              Do not interpret body-shape or fitness guidance as a promise of spot fat loss. The evidence is more nuanced than the simple statement that spot reduction is either completely impossible or universally guaranteed. One{" "}
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/21804427/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline font-semibold"
              >
                randomized trial (Vispute et al., 2011)
              </a>{" "}
              found no significant reduction in abdominal fat from abdominal exercise alone, while another{" "}
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/38010201/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 underline font-semibold"
              >
                randomized trial (Broch-Lips et al., 2023)
              </a>{" "}
              reported localized trunk-fat changes under a specific combined exercise protocol.
            </p>
            <p className="font-medium text-slate-900 dark:text-slate-100">
              So the appropriate conclusion is: Spot-reduction evidence is mixed, and a particular exercise should not be assumed to remove fat only from the body area being trained.
            </p>
          </div>
        </div>

        {/* Why Measurement Technique Matters */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Why Measurement Technique Matters
          </h3>
          <p>
            A body-shape calculator can only be as consistent as the measurements going into it. Small differences in measurement location can change the ratios and classification. This is especially important for Natural waist, High hip, and Low/total hip. Those measurements should be taken consistently each time you repeat the calculation.
          </p>

          <h4 className="font-bold text-slate-900 dark:text-slate-100">How to Measure Your Waist for This Calculator</h4>
          <p>
            The calculator uses a Natural Waist input for its proportional calculations. Because “waist” can be measured at different anatomical locations, use the same landmark each time. Do not compare natural waist with navel waist as though they were automatically identical.
          </p>

          <h4 className="font-bold text-slate-900 dark:text-slate-100">Why High Hip and Low Hip Are Separate Inputs</h4>
          <p>
            Many simple body-shape calculators ask for only one hip measurement. This calculator asks for both because the high-hip region can provide additional information about lower-torso proportions. The shape model specifically uses a high-hip-to-waist relationship in its Spoon-related logic, while WHR is based on the calculator&apos;s designated hip measurement:
          </p>
          <p className="font-mono text-xs font-bold text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 p-2.5 rounded-lg">
            High Hip ≠ Low Hip (and they should not be entered interchangeably)
          </p>
        </div>

        {/* Body Type Calculator vs Body Fat Calculator */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Body Type Calculator vs Body Fat Calculator
          </h3>
          <p>These tools answer different questions:</p>
          <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">Tool</th>
                  <th className="p-3">Main Purpose</th>
                  <th className="p-3">Complementary Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">Body Type Calculator</td>
                  <td className="p-3">Proportional shape classification</td>
                  <td className="p-3">Garment fit, styling silhouette, and tape ratios</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">
                    <Link href="/calculators/body-fat-calculator" className="underline hover:text-blue-700">
                      Body Fat Calculator
                    </Link>
                  </td>
                  <td className="p-3">Estimate body-fat percentage</td>
                  <td className="p-3">Adipose tissue estimation via Navy tape method</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">
                    <Link href="/calculators/bmi-calculator" className="underline hover:text-blue-700">
                      BMI Calculator
                    </Link>
                  </td>
                  <td className="p-3">Weight relative to height</td>
                  <td className="p-3">Population-level mass screening</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">
                    <Link href="/calculators/lean-body-mass-calculator" className="underline hover:text-blue-700">
                      Lean Body Mass Calculator
                    </Link>
                  </td>
                  <td className="p-3">Weight of non-fat tissue</td>
                  <td className="p-3">Strength and conditioning target calibration</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">
                    <Link href="/calculators/body-surface-area-calculator" className="underline hover:text-blue-700">
                      Body Surface Area Calculator
                    </Link>
                  </td>
                  <td className="p-3">Total external skin surface area</td>
                  <td className="p-3">Physiological and clinical dosage index</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">
                    <Link href="/calculators/ideal-weight-calculator" className="underline hover:text-blue-700">
                      Ideal Weight Calculator
                    </Link>
                  </td>
                  <td className="p-3">Empirical healthy weight benchmarks</td>
                  <td className="p-3">Formula-based weight reference ranges</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            A body type result should therefore never be treated as a replacement for a body-fat measurement. For users who want an estimate of body-fat percentage, the Body Fat Calculator is the more appropriate tool.
          </p>
        </div>

        {/* Practical Clothing and Fitness Guidance */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Practical Applications: Styling &amp; Fitness
          </h3>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">Body Type and Clothing: What the Result Is Actually Useful For</h4>
            <p>
              One of the strongest practical uses of body-shape classification is clothing and styling. That is also consistent with the historical origins of systems such as NCSU FFIT, which were developed for apparel applications, including body-shape classification and garment fit.
            </p>
            <p>A shape label can help you think about:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>where garments add or remove visual structure;</li>
              <li>where waist definition appears;</li>
              <li>how necklines interact with proportions;</li>
              <li>where jackets or trousers tend to balance the silhouette;</li>
              <li>which garment proportions feel visually balanced.</li>
            </ul>
            <p className="italic text-slate-600 dark:text-slate-400">
              The calculator&apos;s wardrobe recommendations should be treated as styling guidance, not objective rules about what someone should or should not wear.
            </p>

            <h4 className="font-bold text-slate-900 dark:text-slate-100">Body Shape and Fitness: What the Result Can—and Cannot—Tell You</h4>
            <p>
              Your body shape does not determine your strength, endurance, athletic potential, metabolism, health status, or ideal workout. The calculator&apos;s fitness guidance is therefore intentionally general rather than prescribing a body-shape-specific medical treatment.
            </p>
            <p>A good fitness program should be based on factors such as training goal, current fitness, available equipment, injury history, recovery, and progressive overload.</p>
          </div>
        </div>

        {/* How Accurate Is a Body Type Calculator? */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            How Accurate Is a Body Type Calculator?
          </h3>
          <p>There are two different questions here:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Is the arithmetic accurate?</strong> The calculator can perform its defined mathematical operations consistently.</li>
            <li><strong>Is the body-shape classification biologically exact?</strong> No classification system based on a limited set of measurements can perfectly capture every aspect of a three-dimensional human body.</li>
          </ul>
          <p>
            The original FFIT work itself relied on 3D body-scan information, while this calculator uses a simplified set of self-measured 2D dimensions. Research on body-shape classification has noted that circumference-based systems represent general proportions but may not fully distinguish shape in all dimensions (see{" "}
            <a
              href="https://patents.google.com/patent/US9251591B2/en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 underline font-semibold"
            >
              U.S. Patent US9251591B2
            </a>
            ).
          </p>
          <p className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 font-medium">
            So the best description is: The calculator is deterministic within its defined model, while the underlying body-shape classification remains a simplified anthropometric estimate.
          </p>
        </div>

        {/* Final Thoughts */}
        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Final Thoughts
          </h3>
          <p>
            A body type calculator is most useful when you treat it as a measurement and proportion tool, not as a verdict on your health, appearance, or identity.
          </p>
          <p>The strongest way to use the result is to understand what each output represents:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Body shape</strong> tells you about proportional silhouette.</li>
            <li><strong>WHR</strong> tells you about waist relative to hip.</li>
            <li><strong>WHtR</strong> tells you about waist relative to height.</li>
            <li><strong>Shape Similarity Score</strong> tells you how closely your measurements fit the calculator&apos;s mathematical criteria.</li>
            <li><strong>Estimated Anthropometric Somatotype Proxy</strong> provides a simplified physique description.</li>
          </ul>
          <p>
            These outputs answer different questions and should not be collapsed into one idea of “body type.”
          </p>
        </div>

        {/* Methodology & Sources */}
        <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Methodology &amp; Sources
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 block">Female Body Shape Classification</strong>
              <p className="text-slate-600 dark:text-slate-400">
                The historical reference is the Female Figure Identification Technique (FFIT) for Apparel developed through North Carolina State University research (Simmons, Istook, &amp; Devarajan, 2004). FFIT was designed for apparel applications using 3D body scans. The calculator uses a clearly identified seven-category adaptation for self-administered 2D measurements rather than claiming to reproduce the complete FFIT system.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 block">Waist-to-Hip Ratio (WHR)</strong>
              <p className="text-slate-600 dark:text-slate-400">
                WHO&apos;s 2008 expert consultation reviewed waist circumference and WHR in relation to measurement methodology and population-level risks including cardiovascular disease, diabetes, and mortality. The calculator treats WHR as an epidemiological reference indicator rather than a diagnosis.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 block">Waist-to-Height Ratio (WHtR)</strong>
              <p className="text-slate-600 dark:text-slate-400">
                NICE currently recommends WHtR as a practical measure of central adiposity for adults with BMI below 35 kg/m² and uses 0.4–0.49, 0.5–0.59, and ≥0.6 as its adult central-adiposity categories, while recommending a waist below half of height as a practical goal.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 block">Somatotype Proxy &amp; Similarity Score</strong>
              <p className="text-slate-600 dark:text-slate-400">
                The full Heath-Carter method uses substantially more anthropometric data than this calculator (Carter &amp; Heath, 1990). This calculator reports an Estimated Anthropometric Somatotype Proxy. The Shape Similarity Score is a calculator-defined mathematical heuristic based on proportional feature distance, not an externally validated classification accuracy.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Frequently Asked Questions (Unfolded) */}
      <section className="space-y-6 pt-6 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-2xl border border-blue-100 dark:border-blue-900/50">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
              Clear, practical answers about body proportions, measurement landmarks, WHR, WHtR, somatotype proxies, and styling.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 pt-2">
          {body_type_calculatorFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-xl p-4 sm:p-5 space-y-2.5 transition-all"
            >
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 flex items-start gap-2.5">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-100/70 dark:bg-blue-950/60 px-2 py-0.5 rounded shrink-0 mt-0.5">
                  Q{idx + 1}
                </span>
                <span>{faq.question}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-7 sm:pl-8">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default BodyTypeContent;
