import React from "react";

export function TileContent() {
  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-200">
      {/* 1. Introduction */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          1. Introduction to Tile Estimating &amp; Surface Geometry
        </h2>
        <p className="text-sm leading-relaxed">
          Tile installation for floors, shower walls, backsplashes, and commercial spaces requires converting two-dimensional surface areas into discrete modular tile units, box packaging cartons, joint grout volume, and thin-set mortar bedding. Accurate estimation ensures sufficient material for cutting and corner wrap-arounds without paying for excessive excess.
        </p>
      </section>

      {/* 2. Mathematical Concept */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          2. Mathematical Formulas for Tile, Grout &amp; Mortar
        </h2>
        
        <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-3 text-xs font-mono">
          <div>
            <p className="font-bold text-blue-800 dark:text-blue-300">
              A. Effective Tile Coverage Area (with Grout Joint)
            </p>
            <p className="text-zinc-700 dark:text-zinc-300">
              {"Effective Tile Area (sq in) = (Tile Length + Grout Width) × (Tile Width + Grout Width)"}
            </p>
          </div>

          <div>
            <p className="font-bold text-blue-800 dark:text-blue-300">
              B. Base Tile Count &amp; Waste Adjustment
            </p>
            <p className="text-zinc-700 dark:text-zinc-300">
              {"Net Tiles = (Surface Area in sq ft × 144) / Effective Tile Area"}<br />
              {"Total Tiles to Order = ⌈ Net Tiles × (1 + Waste% / 100) ⌉"}<br />
              {"Total Boxes Needed = ⌈ Total Tiles / Tiles Per Box ⌉"}
            </p>
          </div>

          <div>
            <p className="font-bold text-blue-800 dark:text-blue-300">
              C. TCNA Grout Weight Formula (Tile Council of North America)
            </p>
            <p className="text-zinc-700 dark:text-zinc-300">
              {"Grout Weight (lbs) = [(L + W) × Thickness × Joint Width × 0.065 × (Area_sqft × 144)] / (L × W × 144)"}
            </p>
            <p className="text-[11px] text-zinc-500 font-sans">
              Where L, W, Thickness, and Joint Width are measured in inches, and 0.065 is the dry Portland cement grout density constant (lbs/in³).
            </p>
          </div>
        </div>
      </section>

      {/* 3. Waste Factor by Pattern Matrix */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          3. Waste Factor Guidelines by Installation Pattern
        </h2>
        <p className="text-sm leading-relaxed">
          Tile waste occurs during edge cutting, corner fitting, perimeter trimming, and occasional installation breakage. The layout pattern directly impacts scrap generation:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-1">
            <span className="font-bold text-emerald-700 dark:text-emerald-300 block">Straight Grid / Stacked (10% Waste)</span>
            <p className="text-zinc-600 dark:text-zinc-400">
              Standard 0° alignment parallel to walls. Lowest number of diagonal cuts.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-1">
            <span className="font-bold text-blue-700 dark:text-blue-300 block">Running Bond / Subway (10%–12% Waste)</span>
            <p className="text-zinc-600 dark:text-zinc-400">
              50% or 1/3 offset rows (brick pattern). Clean end cuts frequently reused on opposite sides.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-1">
            <span className="font-bold text-amber-700 dark:text-amber-300 block">Diagonal / Diamond 45° (15% Waste)</span>
            <p className="text-zinc-600 dark:text-zinc-400">
              Tiles rotated 45 degrees. Requires diagonal triangular cuts along all four perimeter walls.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-1">
            <span className="font-bold text-purple-700 dark:text-purple-300 block">Herringbone (15%–20% Waste)</span>
            <p className="text-zinc-600 dark:text-zinc-400">
              Interlocking 90° V-shapes. High volume of angular perimeter cuts and end scraps.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Sanded vs Unsanded Grout Guide */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          4. Sanded vs. Unsanded vs. Epoxy Grout Selection
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-700 font-sans tabular-nums">
            <thead className="bg-slate-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold">
              <tr>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Grout Type</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Recommended Joint Width</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Best Applications</th>
                <th className="p-2 border border-zinc-200 dark:border-zinc-700">Precautions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              <tr>
                <td className="p-2 font-bold text-blue-700 dark:text-blue-300">Sanded Grout</td>
                <td className="p-2">1/8&quot; to 1/2&quot; (3mm – 12mm)</td>
                <td className="p-2">Ceramic, porcelain, stone floor tiles</td>
                <td className="p-2">Can scratch polished marble, glass, or glossy metal tiles</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-emerald-700 dark:text-emerald-300">Unsanded Grout</td>
                <td className="p-2">1/16&quot; to 1/8&quot; (1.5mm – 3mm)</td>
                <td className="p-2">Polished marble, glass mosaics, subway backsplashes</td>
                <td className="p-2">Will shrink and crack if used in joints wider than 1/8&quot;</td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-purple-700 dark:text-purple-300">Epoxy Grout</td>
                <td className="p-2">Any joint width (1/16&quot; to 1/2&quot;)</td>
                <td className="p-2">Showers, commercial kitchens, steam rooms</td>
                <td className="p-2">Fast-curing, requires rapid cleanup with water/acid haze remover</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Trowel Notch Sizing Guide */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          5. Thin-Set Mortar Trowel Notch Sizing Chart
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-1">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block">Small Tiles &amp; Mosaics (≤ 4&quot;)</span>
            <p className="text-zinc-600 dark:text-zinc-400">
              <strong>3/16&quot; V-Notch Trowel</strong><br />
              Coverage: ~55–60 sq ft per 50-lb bag of thin-set.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-1">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block">Standard Floor Tiles (6&quot; to 12&quot;)</span>
            <p className="text-zinc-600 dark:text-zinc-400">
              <strong>1/4&quot; × 1/4&quot; or 1/4&quot; × 3/8&quot; Square Notch</strong><br />
              Coverage: ~40–45 sq ft per 50-lb bag of thin-set.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-1">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block">Large Format Tiles (≥ 15&quot; or 12&quot;×24&quot;)</span>
            <p className="text-zinc-600 dark:text-zinc-400">
              <strong>1/2&quot; × 1/2&quot; Square Notch (Back-buttering required)</strong><br />
              Coverage: ~28–32 sq ft per 50-lb bag of thin-set.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Step-by-Step Worked Example */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          6. Step-by-Step Worked Calculation Example
        </h2>
        <div className="p-4 bg-slate-50 dark:bg-zinc-800/40 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-3 text-xs">
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">
            <strong>Problem:</strong> Calculate the number of 12&quot; × 24&quot; porcelain tiles (10 tiles per box), grout, and mortar needed for a 15 ft × 20 ft kitchen floor with 1/8&quot; grout lines and a 10% running bond waste factor.
          </p>

          <div className="space-y-1.5 font-mono">
            <p><strong>Step 1: Calculate Room Surface Area</strong><br />
            {"Room Area = 15 ft × 20 ft = 300 sq ft"}</p>

            <p><strong>Step 2: Calculate Effective Tile Area</strong><br />
            {"Tile Dimensions with 1/8\" (0.125\") Grout: 12.125\" × 24.125\""}<br />
            {"Effective Area = 12.125 × 24.125 = 292.52 sq inches"}<br />
            {"Effective Area (sq ft) = 292.52 / 144 = 2.031 sq ft"}</p>

            <p><strong>Step 3: Calculate Tile Quantities</strong><br />
            {"Net Tiles = 300 / 2.031 = 147.7 ≈ 148 tiles"}<br />
            {"Total Tiles with 10% Waste = ⌈ 148 × 1.10 ⌉ = 163 tiles"}<br />
            {"Total Boxes (10 tiles/box) = ⌈ 163 / 10 ⌉ = 17 Boxes (170 tiles total)"}</p>

            <p><strong>Step 4: Calculate Grout &amp; Mortar</strong><br />
            {"Grout Weight = [(12 + 24) × 0.375 × 0.125 × 0.065 × (300 × 144)] / (288 × 144) ≈ 11.5 lbs"}<br />
            {"Add 10% cleanup waste = 13 lbs (Two 10-lb bags or One 25-lb bag of Sanded Grout)"}<br />
            {"Thin-set Mortar (1/2\" notch for 12\"×24\" tile, ~30 sq ft/bag) = ⌈ 300 / 30 ⌉ = 10 Bags (50-lb each)"}</p>
          </div>
        </div>
      </section>

      {/* 7. Summary Checklist */}
      <section className="space-y-2">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
          7. Professional Tile Installation Takeoff Checklist
        </h2>
        <ul className="list-disc list-inside text-xs space-y-1 text-zinc-700 dark:text-zinc-300">
          <li>Always save at least one unopened box of tiles for future tile repairs or plumbing modifications.</li>
          <li>For large format tiles (&ge; 15&quot;), always flat-trowel the back of each tile (back-buttering) to achieve &ge; 80% mortar coverage (95% in wet areas).</li>
          <li>Seal sanded cementitious grout joints 48 to 72 hours after installation with a penetrating fluoro-polymer sealer.</li>
        </ul>
      </section>
    </div>
  );
}
