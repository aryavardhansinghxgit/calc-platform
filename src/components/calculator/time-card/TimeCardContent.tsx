"use client";

import React from "react";
import Link from "next/link";

export function TimeCardContent() {
  return (
    <article className="text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-6 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. INTRODUCTION */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          How the Time Card & Payroll Calculator Works
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          The Time Card Calculator tracks daily work hours across a full 7-day workweek, automatically deducts unpaid lunch breaks, applies standard time-rounding rules (such as the FLSA 7-minute rule), and calculates gross earnings with overtime pay.
        </p>
        <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <li><strong>Who uses it:</strong> Hourly employees, payroll administrators, small business owners, contractors, and HR managers.</li>
          <li><strong>What it calculates:</strong> Daily & weekly regular hours, overtime hours (1.5x), double-time hours (2.0x), break deductions, and total gross pay.</li>
          <li><strong>Why precision matters:</strong> Complying with labor laws prevents costly wage-and-hour violations and ensures employees are paid accurately for every minute worked.</li>
        </ul>
      </div>

      {/* 2. FAIR LABOR STANDARDS ACT (FLSA) WAGES & OVERTIME */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          FLSA Wages, Minimum Wage & Overtime Rules
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <div>
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Federal Minimum Wage vs. State Laws
            </span>
            <p>
              Under the United States Fair Labor Standards Act (FLSA), the federal minimum wage is <strong>$7.25 per hour</strong>. In jurisdictions where state or municipal minimum wage laws mandate a higher rate, employers are legally required to pay the higher wage.
            </p>
          </div>

          <div>
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Standard Federal Overtime (1.5x after 40 Hours)
            </span>
            <p>
              Non-exempt employees covered by the FLSA must receive overtime pay for all hours worked exceeding <strong>40 hours in a single workweek</strong> (defined as any fixed and regularly recurring 168-hour period) at a rate not less than <strong>1.5 times</strong> their regular hourly rate.
            </p>
          </div>

          <div>
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Daily Overtime & Double-Time (e.g., California Labor Law)
            </span>
            <p>
              Certain states enforce stricter daily overtime requirements. For example, in California:
              <br />
              • Hours worked between <strong>8 and 12 hours</strong> in a single workday are paid at <strong>1.5x</strong>.
              <br />
              • Hours worked beyond <strong>12 hours</strong> in a single workday are paid at <strong>2.0x (double time)</strong>.
              <br />
              • The first 8 hours on the 7th consecutive workday are paid at 1.5x, and hours beyond 8 are paid at 2.0x.
            </p>
          </div>
        </div>
      </div>

      {/* 3. EXEMPT VS. NON-EXEMPT EMPLOYEES */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          Exempt vs. Non-Exempt Employee Classifications
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mb-3 text-xs sm:text-sm">
          To be classified as <strong>Exempt</strong> from overtime, an employee must satisfy three mandatory legal tests:
        </p>

        <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-3.5">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              1. Salary Level Test
            </span>
            <p>The employee must be paid at least <strong>$684 per week</strong> ($35,568 per year).</p>
          </div>

          <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-3.5">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              2. Salary Basis Test
            </span>
            <p>The employee must be paid a predetermined, guaranteed salary that cannot be reduced based on quality or quantity of work.</p>
          </div>

          <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-3.5">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              3. Specific Duties Test
            </span>
            <p>
              • <strong>Executive:</strong> Primary duty is managing an enterprise or subdivision, regularly supervising 2+ full-time employees, with authority to hire/fire.
              <br />
              • <strong>Administrative:</strong> Performs non-manual office work directly related to management policies or general business operations, exercising independent judgment.
              <br />
              • <strong>Professional:</strong> Work requires advanced knowledge in a specialized field of science or learning (e.g. lawyers, physicians, engineers, certified accountants).
              <br />
              • <strong>Computer:</strong> Systems analysts, programmers, or software engineers earning at least $684/wk salary or $27.63/hr.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs">
            <strong className="text-slate-900 dark:text-white block mb-1">Professions That Are ALWAYS Non-Exempt:</strong>
            Blue-collar manual workers (mechanics, electricians, plumbers, construction workers, carpenters) and first responders (police officers, firefighters, paramedics, correctional officers) are always entitled to overtime pay regardless of how much they earn.
          </div>
        </div>
      </div>

      {/* 4. THE 7-MINUTE RULE (FLSA 15-MINUTE ROUNDING) */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          The FLSA 7-Minute Rounding Rule Explained
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
          Under 29 C.F.R. § 785.48(b), employers may round employee punch times to the nearest 15-minute increment (quarter hour), provided the rounding rule is neutral:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs sm:text-sm">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Minutes 1 through 7</span>
            <p className="text-slate-600 dark:text-slate-300">Round down to the nearest 15-minute mark (e.g., 8:07 AM rounds to 8:00 AM; 8:22 AM rounds to 8:15 AM).</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Minutes 8 through 14</span>
            <p className="text-slate-600 dark:text-slate-300">Round up to the next 15-minute mark (e.g., 8:08 AM rounds to 8:15 AM; 8:23 AM rounds to 8:30 AM).</p>
          </div>
        </div>
      </div>

      {/* 5. HISTORY OF INDUSTRIAL TIME CARDS & CLOCKS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          History of Time Cards & Industrial Punch Clocks
        </h2>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <li><strong>The Bundy Key Recorder (1888):</strong> Invented by William Bundy, workers inserted a numbered key into a mechanical recorder that stamped their time on a paper tape.</li>
          <li><strong>The Dey Dial Recorder (1888):</strong> Dr. Alexander Dey invented a radial wheel where employees turned a pointer arm to their designated employee number.</li>
          <li><strong>The Rochester Time Recorder (1894):</strong> Daniel M. Cooper invented the first machine that printed timestamped punch cards for individual workers.</li>
          <li><strong>IBM Time Recorder Division:</strong> These early time-recording companies were consolidated into the International Time Recording Co., which later became the foundation of IBM under Thomas J. Watson.</li>
          <li><strong>Modern Biometric & Cloud Timecards:</strong> Punch cards have evolved into magnetic stripe badges, RFID cards, mobile GPS geofencing, and biometric fingerprint/facial recognition time tracking.</li>
        </ul>
      </div>

      {/* 6. STEP-BY-STEP WORKED EXAMPLES */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          Worked Payroll Calculation Examples
        </h2>
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-3.5">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Example 1: Weekly Overtime Calculation (FLSA Standard)
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              An employee works <strong>46.0 total hours</strong> in a week at a rate of <strong>$20.00/hour</strong>.
            </p>
            <p className="text-slate-500 dark:text-slate-400 mt-0.5">
              • Regular Pay: 40 hours × $20.00 = $800.00<br />
              • Overtime Pay: 6 hours × ($20.00 × 1.5) = 6 × $30.00 = $180.00<br />
              → <strong>Total Gross Pay: $980.00</strong>.
            </p>
          </div>

          <div className="border-l-2 border-slate-300 dark:border-slate-700 pl-3.5">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Example 2: California Daily & Double-Time Overtime
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              An employee works a <strong>14-hour shift</strong> (minus a 1-hour unpaid lunch = 13.0 net hours) at <strong>$25.00/hour</strong>.
            </p>
            <p className="text-slate-500 dark:text-slate-400 mt-0.5">
              • Regular Hours (first 8h): 8 × $25.00 = $200.00<br />
              • Overtime Hours (hours 9–12 = 4h): 4 × ($25.00 × 1.5) = $150.00<br />
              • Double-Time Hours (hour 13 = 1h): 1 × ($25.00 × 2.0) = $50.00<br />
              → <strong>Total Gross Pay for Shift: $400.00</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* 7. COMMON PAYROLL PITFALLS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">
          Common Payroll Pitfalls to Avoid
        </h2>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <li><strong>Misclassifying Non-Exempt Workers:</strong> Paying an employee a salary does not automatically make them exempt. They must meet both the $684/wk threshold and the strict duties test.</li>
          <li><strong>Off-the-Clock Work:</strong> Requiring or allowing employees to answer emails, perform setup, or complete closing duties before clocking in or after clocking out violates the FLSA.</li>
          <li><strong>Improper Break Rounding:</strong> Short rest breaks (under 20 minutes) must be paid. Only bona fide meal periods (typically 30+ minutes where the employee is completely relieved of all duty) can be unpaid.</li>
        </ul>
      </div>

    </article>
  );
}

export default TimeCardContent;
