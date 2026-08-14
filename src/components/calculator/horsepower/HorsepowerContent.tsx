import React from "react";

export function HorsepowerContent() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none space-y-8 mt-8 text-zinc-800 dark:text-zinc-200">
      {/* SECTION 1: WHAT IS HORSEPOWER? */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
          1. What is Horsepower? (History &amp; Scientific Definition)
        </h2>
        <p className="leading-relaxed">
          Horsepower (HP) is the fundamental unit of measurement used to quantify power—the rate at which mechanical work is performed over time. While the term originated in the late 18th century during the dawn of the Industrial Revolution, it remains the universal metric for evaluating internal combustion engines, electric vehicle motors, industrial turbines, and performance benchmarks.
        </p>
        <p className="leading-relaxed">
          The concept was devised by Scottish engineer and inventor <strong>James Watt</strong> in 1782. To market his newly improved steam engines to coal mine operators and breweries, Watt needed a clear metric comparing engine output to the draft horses traditionally used to turn mill wheels and lift heavy water buckets from mineshafts.
        </p>

        <div className="bg-amber-50 dark:bg-amber-950/40 p-4 rounded-xl border border-amber-200/80 dark:border-amber-900 space-y-2">
          <h3 className="text-sm font-extrabold text-amber-900 dark:text-amber-300 uppercase tracking-wide">
            James Watt’s Historic Experiment
          </h3>
          <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
            Watt estimated that a healthy brewery draft horse could turn a mill wheel with a radius of 12 feet approximately 2.4 times per minute. By calculating the distance traveled (2π × 12 × 2.4 ≈ 181 feet/min) against a continuous pulling force of 180 pounds, Watt computed the work done as 32,580 ft-lbs/min, which he rounded up to exactly <strong>33,000 foot-pounds per minute</strong> (550 ft-lbs per second).
          </p>
        </div>

        <p className="leading-relaxed">
          In physics, power is defined mathematically as the rate of energy transfer or work performed per unit time:
        </p>
        <div className="p-4 bg-zinc-900 text-amber-400 font-mono text-center rounded-xl text-sm font-bold">
          Power = Work / Time = (Force × Distance) / Time = Force × Velocity
        </div>
      </section>

      {/* SECTION 2: THE CORE MATHEMATICAL FORMULAS EXPLAINED */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
          2. Core Mathematical Formulas &amp; The 5,252 RPM Intersection
        </h2>
        <p className="leading-relaxed">
          Engine dynamometers do not measure horsepower directly; instead, they measure engine rotational torque (lb-ft or N-m) and rotational speed (RPM). Horsepower is calculated from these two variables using standard mechanical conversion constants.
        </p>

        <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
          Torque to Horsepower Formula
        </h3>
        <p className="leading-relaxed">
          When using Imperial measurement units (lb-ft for torque), the primary governing formula is:
        </p>
        <div className="p-4 bg-zinc-900 text-amber-400 font-mono text-center rounded-xl text-sm font-bold">
          Horsepower (HP) = (Torque in lb-ft × RPM) / 5252.11
        </div>
        <p className="leading-relaxed">
          When working in metric units where torque is expressed in Newton-meters (N-m), the formula converts to:
        </p>
        <div className="p-4 bg-zinc-900 text-amber-400 font-mono text-center rounded-xl text-sm font-bold">
          Horsepower (HP) = (Torque in N-m × RPM) / 7127.00
        </div>

        <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
          Derivation of the 5,252 Constant
        </h3>
        <p className="leading-relaxed">
          The constant 5,252 is derived directly from James Watt’s definition of one horsepower (33,000 ft-lb/min) divided by the angular distance in radians of one full engine revolution (2π radians):
        </p>
        <div className="p-4 bg-zinc-100 dark:bg-zinc-800/80 rounded-xl font-mono text-xs text-center font-bold">
          Constant = (33,000 ft-lbs/min) / (2π radians/rev) = 33,000 / 6.2831853 ≈ 5,252.113
        </div>
        <p className="leading-relaxed">
          Because of this mathematical identity, when horsepower and torque (in lb-ft) are plotted on a chassis or engine dyno graph with matching vertical numerical scales, <strong>the torque and horsepower curves will ALWAYS intersect at exactly 5,252 RPM</strong>. Below 5,252 RPM, torque values in lb-ft exceed horsepower values; above 5,252 RPM, horsepower values exceed torque.
        </p>

        <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
          Quarter-Mile Drag Strip Formulas (Fox, Hale &amp; Hunt Models)
        </h3>
        <p className="leading-relaxed">
          Race engineers use empirical drag strip formulas to calculate required horsepower from total vehicle curb weight and quarter-mile performance metrics:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>
            <strong>Fox Formula (Elapsed Time Method):</strong> HP = Weight (lbs) × (234 / ET)³
          </li>
          <li>
            <strong>Fox Formula (Trap Speed Method):</strong> HP = Weight (lbs) × (Trap Speed in mph / 234)³
          </li>
          <li>
            <strong>Hale Model:</strong> HP = Weight (lbs) / (ET / 5.825)³
          </li>
        </ul>
      </section>

      {/* SECTION 3: TYPES OF HORSEPOWER */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
          3. Global Standards: Types of Horsepower Defined
        </h2>
        <p className="leading-relaxed">
          Because different engineering disciplines and global regions utilize localized definitions of work and mass, several distinct horsepower standards exist:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200/80 dark:border-zinc-700 space-y-1">
            <h4 className="font-extrabold text-amber-700 dark:text-amber-400 uppercase">Mechanical / Imperial HP (hp)</h4>
            <p>Standardized in the USA and UK. Defined as exactly 550 ft-lbs/sec or <strong>745.699872 Watts</strong>.</p>
          </div>

          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200/80 dark:border-zinc-700 space-y-1">
            <h4 className="font-extrabold text-amber-700 dark:text-amber-400 uppercase">Metric Horsepower (PS / CV / PK)</h4>
            <p>Used across Europe (DIN 66036) and Japan. Defined as lifting 75 kg by 1 meter in 1 second = <strong>735.49875 Watts</strong> (1 HP ≈ 1.014 PS).</p>
          </div>

          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200/80 dark:border-zinc-700 space-y-1">
            <h4 className="font-extrabold text-amber-700 dark:text-amber-400 uppercase">Electrical Horsepower (hp(E))</h4>
            <p>Used by electrical engineers for industrial electric motors. Defined as exactly <strong>746.0 Watts</strong>.</p>
          </div>

          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200/80 dark:border-zinc-700 space-y-1">
            <h4 className="font-extrabold text-amber-700 dark:text-amber-400 uppercase">Boiler Horsepower (hp(S))</h4>
            <p>Used in industrial steam and HVAC. Defined as evaporating 34.5 lbs of water at 212°F per hour = <strong>33,475 BTU/hr</strong> (9.81 kW).</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: HORSEPOWER VS TORQUE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
          4. Horsepower vs. Torque: The Automotive Distinction
        </h2>
        <p className="leading-relaxed">
          The distinction between torque and horsepower is one of the most widely misunderstood topics in automotive performance:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
          <li>
            <strong>Torque is Rotational Force:</strong> It represents the raw twisting force an engine crankshaft generates. High low-end torque gives a vehicle immediate off-the-line pulling capability and heavy towing capacity (e.g., turbo-diesel trucks).
          </li>
          <li>
            <strong>Horsepower is the Rate of Doing Work:</strong> It combines twisting force with rotational speed (RPM). Horsepower determines how quickly work can be sustained, dictating a vehicle’s top speed and high-RPM acceleration rate.
          </li>
        </ul>
        <p className="leading-relaxed">
          As legendary racing driver Carroll Shelby famously summarized: <em>&quot;Torque wins races off the line; Horsepower sells cars at the top end.&quot;</em>
        </p>
      </section>

      {/* SECTION 5: BHP VS WHP DRIVETRAIN LOSS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
          5. Brake Horsepower (BHP) vs. Wheel Horsepower (WHP)
        </h2>
        <p className="leading-relaxed">
          Engine ratings published by vehicle manufacturers refer to <strong>Brake Horsepower (BHP)</strong> or Crankshaft Horsepower, measured on an engine dynamometer standalone bench. However, when an engine is installed inside a vehicle, power must travel through the transmission gears, torque converter or clutch, driveshaft, differential, axle shafts, and tires.
        </p>
        <p className="leading-relaxed">
          This parasitic mechanical drag reduces usable power at the drive wheels, recorded on a chassis dyno as <strong>Wheel Horsepower (WHP)</strong>:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse border border-zinc-200 dark:border-zinc-800">
            <thead className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold">
              <tr>
                <th className="p-2 border border-zinc-200 dark:border-zinc-800">Drivetrain Architecture</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-800">Avg Parasitic Loss (%)</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-800">Example Output (400 BHP Crank)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr>
                <td className="p-2 font-bold">Front-Wheel Drive (FWD) Manual</td>
                <td className="p-2 text-amber-600 font-bold">10% – 12%</td>
                <td className="p-2 font-mono">352 – 360 WHP</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Rear-Wheel Drive (RWD) Manual</td>
                <td className="p-2 text-amber-600 font-bold">13% – 15%</td>
                <td className="p-2 font-mono">340 – 348 WHP</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Rear-Wheel Drive (RWD) Automatic</td>
                <td className="p-2 text-amber-600 font-bold">16% – 19%</td>
                <td className="p-2 font-mono">324 – 336 WHP</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">All-Wheel Drive (AWD / 4WD)</td>
                <td className="p-2 text-amber-600 font-bold">20% – 25%</td>
                <td className="p-2 font-mono">300 – 320 WHP</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 6: ATMOSPHERIC WEATHER CORRECTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
          6. Environmental &amp; Atmospheric Correction Factors (SAE J1349)
        </h2>
        <p className="leading-relaxed">
          Internal combustion engines burn ambient atmospheric oxygen to convert chemical fuel energy into mechanical force. Consequently, changes in weather, temperature, barometric pressure, and elevation directly alter engine output:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
          <li>
            <strong>High Altitude Elevation:</strong> Atmospheric pressure drops as altitude increases. Naturally aspirated engines lose roughly <strong>3% of their horsepower for every 1,000 feet</strong> of elevation above sea level.
          </li>
          <li>
            <strong>Ambient Temperature &amp; Humidity:</strong> Hot air is less dense than cold air, containing fewer oxygen molecules per unit volume. High relative humidity displaces oxygen with water vapor.
          </li>
        </ul>
        <p className="leading-relaxed">
          To standardize dyno testing results across different geographic locations, engineers apply the <strong>SAE J1349 Weather Correction Factor</strong>, normalizing dyno runs to standard baseline conditions (77°F / 25°C, 29.92 inHg barometric pressure).
        </p>
      </section>
    </article>
  );
}
