import {
  computeRightTriangleUniversal
} from "../src/app/calculators/right-triangle-calculator/right-triangle-logic";

function testExports() {
  const res = computeRightTriangleUniversal(5, 12, 13);
  console.log("Testing Export Structures for 5-12-13:");

  // 1. Text Summary
  const textSummary = [
    `--- Right Triangle Calculation Summary ---`,
    `Leg a: ${res.a}`,
    `Leg b: ${res.b}`,
    `Hypotenuse c: ${res.c}`,
    `Angle α: ${res.alphaDeg}° (${res.alphaRad} rad)`,
    `Angle β: ${res.betaDeg}° (${res.betaRad} rad)`,
    `Area K: ${res.area}`,
    `Perimeter P: ${res.perimeter}`,
    `Altitude h_c: ${res.altitudeHc}`,
    `Inradius r: ${res.inradius}`,
    `Circumradius R: ${res.circumradius}`,
    `Median m_c: ${res.medianMc}`,
    `Grade: ${res.gradePercent}%`,
    `Roof Pitch: ${res.roofPitch}`,
    `Angle of Elevation: ${res.alphaDeg}°`
  ].join("\n");
  console.log("\n[Text Summary Sample]\n" + textSummary);

  // 2. LaTeX output
  const latex = [
    `c = \\sqrt{a^2 + b^2} = \\sqrt{${res.a}^2 + ${res.b}^2} = ${res.c}`,
    `\\alpha = \\arctan\\left(\\frac{a}{b}\\right) = \\arctan\\left(\\frac{${res.a}}{${res.b}}\\right) \\approx ${res.alphaDeg}^\\circ`,
    `\\beta = 90^\\circ - \\alpha = ${res.betaDeg}^\\circ`,
    `A = \\frac{a \\cdot b}{2} = \\frac{${res.a} \\cdot ${res.b}}{2} = ${res.area}`,
    `P = a + b + c = ${res.a} + ${res.b} + ${res.c} = ${res.perimeter}`,
    `h_c = \\frac{a \\cdot b}{c} = \\frac{${res.a} \\cdot ${res.b}}{${res.c}} = ${res.altitudeHc}`,
    `r = \\frac{a + b - c}{2} = ${res.inradius}`,
    `R = \\frac{c}{2} = ${res.circumradius}`
  ].join("\n");
  console.log("\n[LaTeX Sample]\n" + latex);

  // 3. CSV content
  const headers = ["Parameter", "Symbol", "Value", "Unit / Expression"];
  const rows = [
    ["Leg a", "a", res.a.toString(), "Opposite"],
    ["Leg b", "b", res.b.toString(), "Adjacent"],
    ["Hypotenuse", "c", res.c.toString(), "Hypotenuse"],
    ["Acute Angle A", "alpha", res.alphaDeg.toString(), "degrees"],
    ["Acute Angle B", "beta", res.betaDeg.toString(), "degrees"],
    ["Area", "K", res.area.toString(), "sq units"],
    ["Perimeter", "P", res.perimeter.toString(), "linear units"],
    ["Altitude to Hypotenuse", "h_c", res.altitudeHc.toString(), "linear units"],
    ["Inradius", "r", res.inradius.toString(), "linear units"],
    ["Circumradius", "R", res.circumradius.toString(), "linear units"],
    ["Median to Hypotenuse", "m_c", res.medianMc.toString(), "linear units"],
    ["Grade / Incline", "Grade", res.gradePercent.toString(), "%"],
    ["Roof Pitch", "Pitch", res.roofPitch, "rise:run"],
    ["Angle of Elevation", "theta", res.alphaDeg.toString(), "degrees"]
  ];
  const csvContent = [
    headers.join(","),
    ...rows.map(r => r.map(f => `"${f.replace(/"/g, '""')}"`).join(","))
  ].join("\n");
  console.log("\n[CSV Sample]\n" + csvContent);

  const ok = !csvContent.includes("NaN") && !csvContent.includes("undefined") && !csvContent.includes("[object Object]");
  console.log(`\nExports validity check: ${ok ? "PASS" : "FAIL"}`);
}

testExports();
