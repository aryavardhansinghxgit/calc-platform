"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, ShieldCheck, Activity, Award, BookOpen, Target } from "lucide-react";

export function ArmyBodyFatContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is the official U.S. Army Body Fat standard for my age group?",
      a: "According to Army Regulation AR 600-9, maximum allowable body fat percentages are age-stratified: Males aged 17–20 (20%), 21–27 (22%), 28–39 (24%), 40+ (26%). Females aged 17–20 (30%), 21–27 (32%), 28–39 (34%), 40+ (36%)."
    },
    {
      q: "What changed in the June 12, 2023 Army Body Composition Program (ABCP) directive?",
      a: "The Army transitioned to a 1-site abdominal tape test for all soldiers as the primary screening method. Additionally, soldiers who score 540 or higher on the record Army Combat Fitness Test (ACFT), with a minimum of 80 points in each event, are completely exempt from body fat testing."
    },
    {
      q: "How is the 1-site tape test conducted for male and female soldiers?",
      a: "The 1-site tape test measures abdominal circumference at the level of the belly button (navel) parallel to the floor at the end of a normal exhalation, combined with total body weight."
    },
    {
      q: "Can a female soldier use the traditional multi-site Navy tape test?",
      a: "Yes. Under current Army policy, female soldiers who do not pass the 1-site waist tape test are automatically re-assessed using the traditional multi-site (neck, waist, hip, height) circumference method before being flagged."
    },
    {
      q: "What happens if I score 540 on the ACFT but score 75 in one event?",
      a: "To qualify for the body fat exemption, you must achieve at least 540 total points AND score a minimum of 80 points in EVERY SINGLE ONE of the 6 ACFT events. A score of 75 in any event disqualifies you from exemption."
    },
    {
      q: "What are supplemental body fat assessment methods in the U.S. Army?",
      a: "Soldiers who fail the circumference tape test may request a confirmation assessment via Dual-Energy X-Ray Absorptiometry (DXA), InBody 770 bioelectrical impedance, or Bod Pod air displacement plethysmography."
    },
    {
      q: "What are the administrative consequences of failing the Army tape test?",
      a: "Failing the body fat assessment results in enrollment in the Army Body Composition Program (ABCP), suspension of favorable personnel actions (Flagging), holding promotions, re-enlistments, and professional military education (PME)."
    },
    {
      q: "How often are soldiers weighed and taped in the ABCP?",
      a: "Soldiers enrolled in the ABCP undergo monthly body composition assessments and mandatory nutritional counseling with a Registered Dietitian or Army System for Health representative."
    },
    {
      q: "How long does a soldier have to graduate from the ABCP?",
      a: "Soldiers in the ABCP are expected to show satisfactory progress (losing 3 to 8 pounds or 1% body fat per month). Failure to meet standards for two consecutive months or non-consecutive months over a 6-month period may lead to administrative separation."
    },
    {
      q: "Where exactly should the tape measure be placed on males?",
      a: "For the 1-site test, the measuring tape is placed horizontally across the abdomen at the midpoint of the navel (belly button), staying parallel to the floor."
    },
    {
      q: "Should the tape measure be pulled tightly?",
      a: "No. The measuring tape should fit snugly against the skin without compressing the underlying soft tissue or causing indentations."
    },
    {
      q: "Does hydration affect tape test body fat results?",
      a: "Yes. Dehydration can reduce muscle glycogen and cellular water volume, decreasing total body weight relative to waist circumference, which can artificially increase estimated body fat percentage."
    },
    {
      q: "How does postpartum status affect female body composition testing?",
      a: "Female soldiers are exempt from body fat testing and height/weight standards for 365 days following the end of pregnancy."
    },
    {
      q: "What is the difference between screening weight tables and body fat standards?",
      a: "Screening height/weight tables are initial screening benchmarks. If a soldier exceeds the screening weight for their height, they are taped to calculate actual body fat percentage under AR 600-9."
    },
    {
      q: "How can a soldier lower body fat percentage while preserving lean muscle mass?",
      a: "Maintain a moderate caloric deficit (500 to 750 kcal/day), consume 1.6 to 2.2 grams of protein per kilogram of body weight, and engage in progressive resistance training combined with Zone 2 aerobic cardio."
    },
    {
      q: "Are medical waivers available for ABCP enrolment?",
      a: "Medical conditions or medications causing weight gain may warrant temporary medical evaluation, but AR 600-9 standards apply once medical conditions are stabilized or cleared by a military medical officer."
    },
    {
      q: "Can I request a re-tape by a different evaluator?",
      a: "Taping must be conducted by trained unit personnel. Two evaluators typically measure each soldier to ensure accuracy and prevent measurement bias."
    },
    {
      q: "How does DXA body fat testing compare to tape test accuracy?",
      a: "DXA scans measure bone density, fat mass, and lean tissue with clinical precision (±1.5% margin of error), compared to the tape test margin of error of ±3.0%."
    },
    {
      q: "Why is neck circumference measured in the traditional multi-site test?",
      a: "Neck circumference serves as a baseline indicator of skeletal frame size and upper body lean mass. A thicker neck relative to waist circumference lowers calculated body fat percentage."
    },
    {
      q: "What is the target rate of healthy weight loss for active-duty soldiers?",
      a: "The U.S. Army recommends a sustainable weight loss target of 1 to 2 pounds per week (or 1% body fat reduction per month) to prevent loss of combat physical readiness and lean muscle tissue."
    }
  ];

  return (
    <article className="mt-12 space-y-10 text-zinc-800 dark:text-zinc-200">
      {/* 1. Introduction */}
      <section className="space-y-4 p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400">
          <ShieldCheck className="w-6 h-6" />
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
            Comprehensive Military Guide to U.S. Army Body Composition &amp; AR 600-9 Standards
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-slate-900 dark:text-zinc-300">
          Body composition is a fundamental component of military readiness and physical fitness in the United States Armed Forces. U.S. Army Regulation AR 600-9 (The Army Body Composition Program) establishes policy and procedures to ensure all active-duty, Reserve, and National Guard personnel maintain physical readiness, cardiovascular stamina, and operational capability.
        </p>
      </section>

      {/* 2. AR 600-9 & June 12, 2023 Directive */}
      <section className="space-y-4 p-5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          1. The June 12, 2023 Army Directive &amp; Single-Site Tape Methodology
        </h3>
        <div className="space-y-3 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            On June 12, 2023, senior Army leadership implemented significant updates to the Army Body Composition Program based on comprehensive scientific research conducted by the U.S. Army Research Institute of Environmental Medicine (USARIEM). Key changes include:
          </p>
          <ul className="list-disc pl-5 space-y-1 font-medium">
            <li><strong>Single-Site Abdominal Tape Test:</strong> All soldiers are screened using a simplified 1-site abdominal circumference measurement at the navel.</li>
            <li><strong>ACFT 540+ Exemption Rule:</strong> Soldiers scoring 540 or higher on the ACFT (with at least 80 points in every event) are automatically exempt from body fat testing.</li>
            <li><strong>Supplemental Confirmation Scans:</strong> Soldiers who fail tape testing have the right to request a confirmation scan via DXA, InBody 770, or Bod Pod before being flagged in the ABCP.</li>
          </ul>
        </div>
      </section>

      {/* 3. 20 Clinical FAQs Accordion */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-xl">
          <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h3>Frequently Asked Questions</h3>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 text-left font-semibold text-sm text-zinc-900 dark:text-zinc-100 flex justify-between items-center hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform text-slate-900 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-900 dark:text-zinc-300 leading-relaxed  dark:border-zinc-800">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </article>
  );
}
