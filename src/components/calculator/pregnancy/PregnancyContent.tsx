"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle,
  AlertTriangle,
  HeartPulse,
  Scale,
  ShieldAlert,
  Info,
  ExternalLink,
  Award,
  HelpCircle,
  Stethoscope,
} from "lucide-react";

export const PregnancyContent: React.FC = () => {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none space-y-10 my-10 text-zinc-800 dark:text-zinc-200 leading-relaxed">
      {/* SECTION 1: WHAT IS PREGNANCY? */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black tracking-tight text-blue-600 dark:text-blue-400 flex items-center gap-2 border-b border-rose-200 dark:border-rose-900/60 pb-3">1. What Is Pregnancy?
        </h2>
        <p>
          Pregnancy is the physiological process during which one or more offspring develop inside a woman's uterus. Lasting approximately 40 weeks (280 days) from the first day of the last menstrual period (LMP) or 38 weeks (266 days) from fertilization, pregnancy encompasses complex endocrine, anatomical, metabolic, and immunological adaptations designed to nourish and protect the growing fetus.
        </p>
        <p>
          The human gestational period is divided into three distinct biological trimesters, each spanning approximately 13 weeks. Understanding gestational timing allows expecting parents and healthcare providers to monitor organ development, schedule essential prenatal screenings, detect potential clinical complications early, and prepare for delivery.
        </p>
      </section>

      {/* SECTION 2: PREGNANCY TERM & DUE DATE */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          2. Pregnancy Term Definitions & Due Date Accuracy
        </h3>
        <p>
          Historically, a full pregnancy was broadly referred to as 9 months or 40 weeks. However, clinical obstetric guidelines established by the American College of Obstetricians and Gynecologists (ACOG) and the Society for Maternal-Fetal Medicine (SMFM) categorize full-term delivery into refined sub-definitions to reduce neonatal morbidity:
        </p>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse border border-zinc-200 dark:border-zinc-800">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                <th className="border border-zinc-200 dark:border-zinc-700 p-2.5 text-left font-bold">Clinical Term Category</th>
                <th className="border border-zinc-200 dark:border-zinc-700 p-2.5 text-left font-bold">Gestational Age Range</th>
                <th className="border border-zinc-200 dark:border-zinc-700 p-2.5 text-left font-bold">Clinical Significance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-zinc-200 dark:border-zinc-700 p-2.5 font-semibold text-blue-600">Preterm</td>
                <td className="border border-zinc-200 dark:border-zinc-700 p-2.5">Prior to 37w 0d</td>
                <td className="border border-zinc-200 dark:border-zinc-700 p-2.5">Requires specialized neonatal intensive care (NICU) evaluation.</td>
              </tr>
              <tr>
                <td className="border border-zinc-200 dark:border-zinc-700 p-2.5 font-semibold text-blue-600">Early Term</td>
                <td className="border border-zinc-200 dark:border-zinc-700 p-2.5">37w 0d – 38w 6d</td>
                <td className="border border-zinc-200 dark:border-zinc-700 p-2.5">Higher rate of transient tachypnea and respiratory distress than full term.</td>
              </tr>
              <tr>
                <td className="border border-zinc-200 dark:border-zinc-700 p-2.5 font-semibold text-blue-600">Full Term</td>
                <td className="border border-zinc-200 dark:border-zinc-700 p-2.5">39w 0d – 40w 6d</td>
                <td className="border border-zinc-200 dark:border-zinc-700 p-2.5">Optimal timing for neonatal neurological, pulmonary, and metabolic outcome.</td>
              </tr>
              <tr>
                <td className="border border-zinc-200 dark:border-zinc-700 p-2.5 font-semibold text-blue-600">Late Term</td>
                <td className="border border-zinc-200 dark:border-zinc-700 p-2.5">41w 0d – 41w 6d</td>
                <td className="border border-zinc-200 dark:border-zinc-700 p-2.5">Increased monitoring required for amniotic fluid and placental function.</td>
              </tr>
              <tr>
                <td className="border border-zinc-200 dark:border-zinc-700 p-2.5 font-semibold text-blue-600">Postterm</td>
                <td className="border border-zinc-200 dark:border-zinc-700 p-2.5">42w 0d and beyond</td>
                <td className="border border-zinc-200 dark:border-zinc-700 p-2.5">Medical labor induction strongly recommended to prevent stillbirth risks.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 3, 4, 5, 6, 7: CALCULATION METHODS */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          3–7. The Science of Due Date Calculation Methods
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-2">
            <h4 className="font-bold text-blue-600 dark:text-blue-400 text-sm">Naegele's Rule & LMP Method</h4>
            <p className="text-xs">
              Based on the first day of the last menstrual period (LMP). Naegele's rule adds 1 year, subtracts 3 months, and adds 7 days. Our advanced engine includes cycle length adjustments: <code>EDD = LMP + 280 days + (Cycle Length - 28)</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-2">
            <h4 className="font-bold text-blue-600 dark:text-blue-400 text-sm">Conception Date Method</h4>
            <p className="text-xs">
              Fertilization typically occurs within 24 hours of ovulation. Calculating from known conception assumes 266 days (38 weeks) from fertilization to delivery: <code>EDD = Conception Date + 266 days</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-2">
            <h4 className="font-bold text-blue-600 dark:text-blue-400 text-sm">Ultrasound Dating (Crown-Rump Length)</h4>
            <p className="text-xs">
              First-trimester transvaginal ultrasound measuring Crown-Rump Length (CRL) is the gold standard for clinical pregnancy dating. If ultrasound differs from LMP by &gt;5 days in early pregnancy, EDD is adjusted.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-2">
            <h4 className="font-bold text-blue-600 dark:text-blue-400 text-sm">IVF Embryo Transfer Calculation</h4>
            <p className="text-xs">
              IVF due dates are pinpoint exact because fertilization date is precisely documented. For a Day 3 transfer: <code>EDD = Transfer + 263 days</code>. For a Day 5 blastocyst: <code>EDD = Transfer + 261 days</code>.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 8 & 9: TRIMESTERS & FETAL DEVELOPMENT */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          8–9. Detailed Breakdown of Pregnancy Trimesters
        </h3>

        <div className="space-y-3 text-sm">
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-blue-50/40 dark:bg-blue-50/20">
            <h4 className="font-bold text-blue-600 dark:text-blue-400">First Trimester (Weeks 1–13)</h4>
            <p className="text-xs mt-1">
              Organogenesis occurs. The single fertilized ovum transforms into a 3-inch fetus with beating heart, functioning kidneys, brain hemispheres, and tiny moving limbs. Peak hCG production causes nausea and fatigue.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-blue-50/40 dark:bg-blue-50/20">
            <h4 className="font-bold text-blue-600 dark:text-blue-400">Second Trimester (Weeks 14–27)</h4>
            <p className="text-xs mt-1">
              Rapid physical growth and movement (quickening). Fetal facial features sharpen, hair forms, and sensory perception matures (baby hears voice). Fetal viability milestone reached at Week 24.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-blue-50/40 dark:bg-blue-950/20">
            <h4 className="font-bold text-blue-700 dark:text-blue-300">Third Trimester (Weeks 28–40+)</h4>
            <p className="text-xs mt-1">
              Fetal fat accumulation, pulmonary surfactant secretion, and brain myelination. Fetus gains ~0.5 lb per week, settling head-down (vertex) into pelvis preparing for spontaneous labor.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 10 & 11 & 12: SCREENING & DETECTION */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          10–12. Clinical Screening Windows & Detection Testing
        </h3>
        <p>
          Home urine pregnancy tests detect human Chorionic Gonadotropin (hCG) secreted by the syncytiotrophoblast. Quantitative blood serum tests detect hCG as early as 6–8 days after fertilization (concentration &gt; 5 mIU/mL).
        </p>

        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Week 4–5:</strong> Positive urine hCG test confirmed.</li>
          <li><strong>Week 6:</strong> Transvaginal ultrasound visualizes gestational sac, yolk sac, and cardiac flicker.</li>
          <li><strong>Week 10–13:</strong> Cell-free DNA / NIPT screening for trisomies 21, 18, 13 and fetal sex determination.</li>
          <li><strong>Week 18–22:</strong> Comprehensive 20-week anatomical survey scan examining heart chambers, brain, spine, organs.</li>
          <li><strong>Week 24–28:</strong> 1-hour 50g glucose challenge test for Gestational Diabetes Mellitus (GDM).</li>
          <li><strong>Week 35–37:</strong> Group B Streptococcus (GBS) recto-vaginal screening swab.</li>
        </ul>
      </section>

      {/* SECTION 14: WEIGHT GAIN GUIDELINES (IOM TABLE) */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">14. Pregnancy Weight Gain Guidelines (Institute of Medicine)
        </h3>
        <p className="text-sm">
          Weight gain during pregnancy supports maternal blood volume expansion, placenta growth, amniotic fluid, and fetal tissue development. The Institute of Medicine (IOM) recommends specific total weight gain targets based on pre-pregnancy Body Mass Index (BMI):
        </p>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-xs border-collapse border border-zinc-200 dark:border-zinc-800">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                <th className="border p-2">Pre-Pregnancy BMI</th>
                <th className="border p-2">Classification</th>
                <th className="border p-2">Single Pregnancy Target</th>
                <th className="border p-2">Twin Pregnancy Target</th>
                <th className="border p-2">Trimester 2 & 3 Weekly Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 font-semibold">&lt; 18.5</td>
                <td className="border p-2">Underweight</td>
                <td className="border p-2 text-blue-600 font-bold">28 – 40 lbs (12.5–18 kg)</td>
                <td className="border p-2">50 – 62 lbs</td>
                <td className="border p-2">1.0 lb / week</td>
              </tr>
              <tr>
                <td className="border p-2 font-semibold">18.5 – 24.9</td>
                <td className="border p-2">Normal Weight</td>
                <td className="border p-2 text-blue-600 font-bold">25 – 35 lbs (11.5–16 kg)</td>
                <td className="border p-2">37 – 54 lbs</td>
                <td className="border p-2">1.0 lb / week</td>
              </tr>
              <tr>
                <td className="border p-2 font-semibold">25.0 – 29.9</td>
                <td className="border p-2">Overweight</td>
                <td className="border p-2 text-blue-600 font-bold">15 – 25 lbs (7–11.5 kg)</td>
                <td className="border p-2">31 – 50 lbs</td>
                <td className="border p-2">0.6 lb / week</td>
              </tr>
              <tr>
                <td className="border p-2 font-semibold">&ge; 30.0</td>
                <td className="border p-2">Obese</td>
                <td className="border p-2 text-blue-600 font-bold">11 – 20 lbs (5–9 kg)</td>
                <td className="border p-2">25 – 42 lbs</td>
                <td className="border p-2">0.5 lb / week</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 18: MEDICATIONS DURING PREGNANCY (FDA DRUG CATEGORIES TABLE) */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">18. FDA Medication Safety Classification Matrix
        </h3>
        <p className="text-sm">
          Placental transfer of maternal medications can impact embryonic organogenesis. The FDA classifies pharmaceutical safety during pregnancy into five clinical categories:
        </p>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-xs border-collapse border border-zinc-200 dark:border-zinc-800">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                <th className="border p-2">FDA Category</th>
                <th className="border p-2">Safety Profile Summary</th>
                <th className="border p-2">Representative Examples</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 font-bold text-blue-600">Category A</td>
                <td className="border p-2">Controlled human studies demonstrate no fetal risk in first trimester. Safe.</td>
                <td className="border p-2">Folic Acid, Levothyroxine, Prenatal Vitamins</td>
              </tr>
              <tr>
                <td className="border p-2 font-bold text-blue-600">Category B</td>
                <td className="border p-2">Animal reproduction studies show no risk, but human studies absent or acceptable.</td>
                <td className="border p-2">Acetaminophen, Amoxicillin, Insulin, Metformin</td>
              </tr>
              <tr>
                <td className="border p-2 font-bold text-blue-600">Category C</td>
                <td className="border p-2">Animal studies show teratogenic effect, but potential benefits may warrant use.</td>
                <td className="border p-2">Albuterol, Sertraline, Fluoxetine, Omeprazole</td>
              </tr>
              <tr>
                <td className="border p-2 font-bold text-orange-600">Category D</td>
                <td className="border p-2">Positive evidence of human fetal risk. Use only in life-threatening emergencies.</td>
                <td className="border p-2">Lisinopril, Losartan, Valproate, Tetracycline</td>
              </tr>
              <tr>
                <td className="border p-2 font-bold text-blue-600">Category X</td>
                <td className="border p-2">Studies demonstrate definite fetal abnormalities. Strictly contraindicated.</td>
                <td className="border p-2">Isotretinoin (Accutane), Warfarin, Methotrexate, Thalidomide</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 19 & 20: HIGH RISK & WARNING RED FLAGS */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">19–20. Emergency Red-Flag Warning Signs
        </h3>

        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-50/40 border border-amber-300 dark:border-amber-800 text-xs space-y-2">
          <p className="font-bold text-amber-900 dark:text-amber-200">
            Contact your healthcare provider or emergency room immediately if experiencing:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-amber-900 dark:text-blue-400">
            <li>Heavy vaginal bleeding or passing blood clots.</li>
            <li>Sudden fluid gush or persistent leakage from vagina (amniotic rupture).</li>
            <li>Severe abdominal pain or cramping that doesn't subside.</li>
            <li>Significant decrease or cessation of fetal movement (&lt;10 kicks in 2 hours after W28).</li>
            <li>Severe headache with visual disturbances (blurriness, flashing lights) — Preeclampsia signs.</li>
            <li>Sudden swelling of face, hands, or eyes with rapid weight gain.</li>
            <li>Persistent fever above 100.4°F (38°C) or severe chills.</li>
          </ul>
        </div>
      </section>

      {/* SECTION 23: MEDICAL DISCLAIMER */}
      <section className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-xs space-y-2">
        <h4 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">23. Medical & Educational Disclaimer
        </h4>
        <p className="text-slate-900 dark:text-slate-100">
          This Pregnancy Calculator and educational guide is provided solely for general informational and tracking purposes. It does not provide medical diagnosis, formal treatment plans, or clinical care advice. Gestational timing estimates are mathematical approximations based on standard population averages. Always consult a board-certified OB-GYN, maternal-fetal medicine specialist, or certified nurse-midwife for clinical care decisions.
        </p>
      </section>

      {/* SECTION 24: RELATED PREGNANCY TOOLS */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          24. Related Women's Health & Pregnancy Tools
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <Link
            href="/calculators/due-date-calculator"
            className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-rose-400 transition-all font-semibold text-blue-600 dark:text-blue-400 block"
          >
            Due Date Calculator →
          </Link>
          <Link
            href="/calculators/ovulation-calculator"
            className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-rose-400 transition-all font-semibold text-blue-600 dark:text-blue-400 block"
          >
            Ovulation Calculator →
          </Link>
          <Link
            href="/calculators/conception-calculator"
            className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-rose-400 transition-all font-semibold text-blue-600 dark:text-blue-400 block"
          >
            Conception Calculator →
          </Link>
          <Link
            href="/calculators/pregnancy-weight-gain-calculator"
            className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-rose-400 transition-all font-semibold text-blue-600 dark:text-blue-400 block"
          >
            Pregnancy Weight Gain →
          </Link>
          <Link
            href="/calculators/bmi-calculator"
            className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-rose-400 transition-all font-semibold text-blue-600 dark:text-blue-400 block"
          >
            BMI Calculator →
          </Link>
          <Link
            href="/calculators/calorie-calculator"
            className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-rose-400 transition-all font-semibold text-blue-600 dark:text-blue-400 block"
          >
            Calorie Calculator →
          </Link>
        </div>
      </section>
    </article>
  );
};
