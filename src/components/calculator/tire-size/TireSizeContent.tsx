import React from "react";

export function TireSizeContent() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-slate-700 dark:text-zinc-300">
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          Comprehensive Guide to Tire Geometry, Wheel Fitment &amp; Speedometer Calibration
        </h2>
        <p className="leading-relaxed">
          Selecting the correct vehicle tire and wheel size is one of the most critical decisions in automotive engineering. 
          The overall rolling diameter of your tires directly controls vehicle ground clearance, speedometer and odometer calibration, 
          transmission shift programming, anti-lock braking system (ABS) sensors, and electronic stability control (ESC). 
          Whether you are upgrading to larger aftermarket wheels (+1/+2 Plus Sizing), installing heavy-duty flotation off-road tires on a 4x4 truck, 
          or fine-tuning track alignment clearance, understanding the precise mathematical geometry of tires is essential.
        </p>
        <p className="leading-relaxed">
          Our <strong>Tire Size Calculator &amp; Wheel Fitment Suite</strong> provides multi-format tire dimension modeling (P-Metric, Euro-Metric, 
          Flotation, LT-Metric, and ST Trailer ratings), side-by-side comparative overlay visualization, wheel offset (ET) backspacing fitment analysis, 
          and differential gear ratio compensation math.
        </p>
      </section>

      {/* 2. ANATOMY OF A TIRE SIDEWALL */}
      <section className="space-y-4  dark:border-zinc-800 pt-6">
        <h3 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          1. Anatomy of a Tire Sidewall: Deciphering Standardization Codes
        </h3>
        <p className="leading-relaxed">
          Automotive tire manufacturers format tire specifications on the outer sidewall using standardized international alphanumeric codes. 
          A typical metric tire code string reads: <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 font-sans tabular-nums text-sm">P225/50R17 98H</code>. 
          Each segment represents a specific physical parameter:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 space-y-2">
            <h4 className="font-extrabold text-blue-700 dark:text-blue-400 text-sm">Vehicle Service Type Prefix</h4>
            <ul className="text-xs space-y-1.5 list-disc pl-4">
              <li><strong>P (P-Metric):</strong> Passenger vehicle tire designed for coupes, sedans, crossovers, and light SUVs.</li>
              <li><strong>LT (Light Truck Metric):</strong> Reinforced heavy-duty construction for 3/4-ton and 1-ton pickup trucks carrying heavy payloads.</li>
              <li><strong>ST (Special Trailer):</strong> Stiffer sidewall construction engineered specifically for boat, utility, and travel trailers.</li>
              <li><strong>T (Temporary Spare):</strong> Compact space-saver spare tire designed strictly for temporary emergency use at limited speeds (&lt;50 mph).</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 space-y-2">
            <h4 className="font-extrabold text-blue-700 dark:text-blue-400 text-sm">Dimensions &amp; Construction Code</h4>
            <ul className="text-xs space-y-1.5 list-disc pl-4">
              <li><strong>Section Width (225):</strong> The nominal width of the inflated tire measured in millimeters from outer sidewall to inner sidewall.</li>
              <li><strong>Aspect Ratio (50):</strong> The sidewall height expressed as a percentage of section width (e.g., 50% of 225 mm = 112.5 mm).</li>
              <li><strong>Internal Construction (R):</strong> "R" designates Radial ply construction. "D" indicates Diagonal bias ply, and "B" designates Belted bias.</li>
              <li><strong>Wheel Rim Diameter (17):</strong> The diameter of the matching wheel rim measured in inches.</li>
            </ul>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 space-y-2">
          <h4 className="font-extrabold text-blue-900 dark:text-blue-200 text-sm">Service Description: Load Index &amp; Speed Rating Table</h4>
          <p className="text-xs text-slate-900 dark:text-zinc-300">
            Following the rim size, the service description consists of a two- or three-digit <strong>Load Index</strong> and a letter <strong>Speed Rating</strong>. 
            The Load Index maps to the maximum load-carrying capacity per tire (e.g., index 98 = 1,653 lbs / 750 kg). The Speed Rating indicates the maximum certified top speed:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-sans tabular-nums pt-2">
            <div className="bg-white dark:bg-zinc-800 p-2 rounded border border-slate-200 dark:border-zinc-700 text-center">
              <span className="font-bold block text-blue-600">S Rating</span> 112 mph (180 km/h)
            </div>
            <div className="bg-white dark:bg-zinc-800 p-2 rounded border border-slate-200 dark:border-zinc-700 text-center">
              <span className="font-bold block text-blue-600">T Rating</span> 118 mph (190 km/h)
            </div>
            <div className="bg-white dark:bg-zinc-800 p-2 rounded border border-slate-200 dark:border-zinc-700 text-center">
              <span className="font-bold block text-blue-600">H Rating</span> 130 mph (210 km/h)
            </div>
            <div className="bg-white dark:bg-zinc-800 p-2 rounded border border-slate-200 dark:border-zinc-700 text-center">
              <span className="font-bold block text-blue-600">V Rating</span> 149 mph (240 km/h)
            </div>
            <div className="bg-white dark:bg-zinc-800 p-2 rounded border border-slate-200 dark:border-zinc-700 text-center">
              <span className="font-bold block text-blue-600">W Rating</span> 168 mph (270 km/h)
            </div>
            <div className="bg-white dark:bg-zinc-800 p-2 rounded border border-slate-200 dark:border-zinc-700 text-center">
              <span className="font-bold block text-blue-600">Y Rating</span> 186 mph (300 km/h)
            </div>
            <div className="bg-white dark:bg-zinc-800 p-2 rounded border border-slate-200 dark:border-zinc-700 text-center col-span-2">
              <span className="font-bold block text-blue-600">(Y) / Z Rating</span> 186+ mph (300+ km/h)
            </div>
          </div>
        </div>
      </section>

      {/* 3. MATHEMATICAL FORMULAS */}
      <section className="space-y-4  dark:border-zinc-800 pt-6">
        <h3 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          2. The Core Mathematical Formulas for Tire Geometry
        </h3>
        <p className="leading-relaxed">
          Calculating the exact geometric boundaries of a pneumatic tire requires converting metric section width into inches and combining sidewall profiles 
          with rim diameter. The foundational equations powering our calculation engine are detailed below:
        </p>

        <div className="space-y-4 my-4 font-sans tabular-nums text-sm">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-zinc-200 shadow-xs space-y-2">
            <span className="text-blue-600 dark:text-blue-400 font-sans font-extrabold block text-xs uppercase tracking-wider">1. Sidewall Height Formula</span>
            <div className="text-center py-2 text-base font-extrabold text-blue-900 dark:text-blue-200 font-sans tabular-nums">
              {"Sidewall Height (mm) = Section Width (mm) × (Aspect Ratio / 100)"}
            </div>
            <div className="text-center text-xs text-slate-900 dark:text-slate-100">
              {"Sidewall Height (inches) = Sidewall Height (mm) / 25.4"}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-zinc-200 shadow-xs space-y-2">
            <span className="text-blue-600 dark:text-blue-400 font-sans font-extrabold block text-xs uppercase tracking-wider">2. Overall Tire Diameter Formula</span>
            <div className="text-center py-2 text-base font-extrabold text-blue-900 dark:text-blue-200 font-sans tabular-nums">
              {"Overall Diameter (inches) = (2 × Sidewall Height (in)) + Wheel Rim Diameter (in)"}
            </div>
            <div className="text-center text-xs text-slate-900 dark:text-slate-100">
              {"Overall Diameter (mm) = Overall Diameter (in) × 25.4"}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-zinc-200 shadow-xs space-y-2">
            <span className="text-blue-600 dark:text-blue-400 font-sans font-extrabold block text-xs uppercase tracking-wider">3. Rolling Circumference &amp; Revolutions per Distance</span>
            <div className="text-center py-1 text-sm font-bold text-blue-600 dark:text-blue-400">
              {"Circumference (in) = π × Overall Diameter (in)"}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-center text-xs pt-2  dark:border-zinc-700">
              <div>
                <span className="text-slate-900 dark:text-slate-100 block font-sans text-[10px] uppercase">Revolutions Per Mile (RPM)</span>
                <span className="text-blue-700 dark:text-blue-300 font-bold">{"RPM = 63,360 / Circumference (in)"}</span>
              </div>
              <div>
                <span className="text-slate-900 dark:text-slate-100 block font-sans text-[10px] uppercase">Revolutions Per Kilometer (RPK)</span>
                <span className="text-blue-700 dark:text-blue-300 font-bold">{"RPK = 1,000,000 / Circumference (mm)"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SPEEDOMETER & GEAR RATIO CONSEQUENCES */}
      <section className="space-y-4  dark:border-zinc-800 pt-6">
        <h3 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          3. Speedometer Error, Transmission &amp; Differential Gear Ratio Consequences
        </h3>
        <p className="leading-relaxed">
          Your vehicle’s speedometer and odometer do not directly measure road velocity. Instead, speed sensors monitor the rotational velocity of the transmission output shaft 
          or wheel hubs. The vehicle's Engine Control Unit (ECU) calculates speed assuming a factory-standard tire circumference.
        </p>
        <p className="leading-relaxed">
          Installing larger diameter tires increases rolling circumference. Because each wheel revolution covers more physical ground distance, <strong>your vehicle travels faster than the speedometer dashboard indicates</strong>. 
          Conversely, installing smaller diameter tires causes the speedometer to read faster than actual GPS travel speed and causes the odometer to rack up mileage faster than actual distance traveled.
        </p>

        <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-50/40 border border-amber-200 dark:border-amber-900 space-y-2 text-xs">
          <h4 className="font-extrabold text-amber-900 dark:text-amber-200 text-sm">Drivetrain &amp; Effective Final Drive Ratio Impact</h4>
          <p className="leading-relaxed">
            Increasing tire size effectively acts as an engine gearing tall-shift. Larger tires effectively lower your differential gear ratio (e.g., a stock 3.73 axle ratio with 10% larger tires effectively performs like a 3.39 ratio). 
            This raises top-end highway cruise efficiency but reduces low-end torque acceleration, off-the-line responsiveness, and heavy trailering capacity.
          </p>
          <div className="p-3 bg-white dark:bg-zinc-800 rounded font-sans tabular-nums text-center font-bold text-amber-800 dark:text-blue-400">
            {"Effective Gear Ratio = Stock Axle Ratio × (Stock Tire Diameter / New Tire Diameter)"}
          </div>
        </div>
      </section>

      {/* 5. PLUS SIZING RULE */}
      <section className="space-y-4  dark:border-zinc-800 pt-6">
        <h3 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          4. The "+1" and "+2" Wheel Upsizing Rule (Plus Sizing Guide)
        </h3>
        <p className="leading-relaxed">
          "Plus Sizing" is an industry-standard tuning technique where vehicle owners upgrade to larger wheel rim diameters (+1 inch, +2 inches, or +3 inches) 
          while simultaneously decreasing the tire sidewall aspect ratio to preserve the original OEM rolling diameter.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 text-xs space-y-1">
            <span className="font-extrabold text-blue-600 block text-sm">Plus Zero Fitment</span>
            <p className="text-slate-900 dark:text-zinc-300">Retains factory rim diameter while increasing section width and decreasing aspect ratio (e.g., 205/55R16 to 225/50R16).</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 text-xs space-y-1">
            <span className="font-extrabold text-blue-600 block text-sm">Plus One (+1) Fitment</span>
            <p className="text-slate-900 dark:text-zinc-300">Increases rim diameter by 1 inch while reducing aspect ratio by 10 points (e.g., 205/55R16 to 215/45R17).</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 text-xs space-y-1">
            <span className="font-extrabold text-blue-600 block text-sm">Plus Two (+2) Fitment</span>
            <p className="text-slate-900 dark:text-zinc-300">Increases rim diameter by 2 inches while reducing aspect ratio by 20 points (e.g., 205/55R16 to 225/35R18).</p>
          </div>
        </div>
      </section>

      {/* 6. WHEEL OFFSET & CLEARANCE */}
      <section className="space-y-4  dark:border-zinc-800 pt-6">
        <h3 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          5. Wheel Offset (ET), Backspacing &amp; Suspension Clearance Mechanics
        </h3>
        <p className="leading-relaxed">
          Wheel fitment involves more than just tire diameter. <strong>Wheel Offset (ET, from German <em>Einpresstiefe</em>)</strong> is the distance in millimeters from the wheel's true width centerline to its hub mounting surface.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-zinc-100 block">Positive Offset (+ET)</span>
            <p className="text-slate-900 dark:text-slate-100">The hub mounting surface is positioned toward the front (outer face) of the wheel. Standard on modern front-wheel-drive and crossover vehicles. Pushes tires inward toward suspension struts.</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-zinc-100 block">Zero Offset (ET 0)</span>
            <p className="text-slate-900 dark:text-slate-100">The mounting hub surface aligns exactly with the wheel's physical centerline.</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-zinc-100 block">Negative Offset (-ET)</span>
            <p className="text-slate-900 dark:text-slate-100">The hub mounting surface is recessed toward the back of the wheel. Common on deep-dish muscle cars and lifted off-road trucks. Pushes tires outward beyond fenders.</p>
          </div>
        </div>
      </section>

      {/* 7. DOT DATE CODES & UTQG */}
      <section className="space-y-4  dark:border-zinc-800 pt-6">
        <h3 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          6. DOT Date Stamps, UTQG Quality Ratings &amp; Tire Maintenance
        </h3>
        <p className="leading-relaxed">
          Every tire sold in North America features a mandatory U.S. Department of Transportation (DOT) serial stamp. The final 4 digits of the DOT code encode the exact manufacture date:
        </p>

        <div className="p-4 rounded-xl bg-slate-100 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 space-y-2 text-xs">
          <div className="font-sans tabular-nums font-bold text-sm text-blue-600">Example: DOT MAL9 ABCD 1326</div>
          <p className="text-slate-900 dark:text-zinc-300">
            The code <strong>"1326"</strong> indicates the tire was produced during the <strong>13th week of the year 2026</strong>. 
            Automotive safety organizations recommend replacing all tires after 6 to 10 years of age regardless of remaining tread depth due to rubber compound oxidation and internal belt degradation.
          </p>
        </div>
      </section>
    </article>
  );
}
