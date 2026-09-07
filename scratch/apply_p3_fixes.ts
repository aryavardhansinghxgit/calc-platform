import fs from "fs";

// 1. Fix MassContent.tsx
let content = fs.readFileSync("src/components/calculator/mass/MassContent.tsx", "utf8");

// Fix calculator name
content = content.replace(
  "1. Weight Calculator: Mass, Weight, Density &amp; Unit Conversion",
  "1. Mass Calculator: Mass, Weight, Density &amp; Unit Conversion"
);
content = content.replace(
  "The Weight Calculator is a multi-purpose physics and measurement tool",
  "The Mass Calculator is a multi-purpose physics and measurement tool"
);

// Fix section numbering
content = content.replace(
  "14. Proportional Scaling &amp; Terrestrial Gravity Variations",
  "13. Proportional Scaling &amp; Terrestrial Gravity Variations"
);
content = content.replace(
  "16. The Kilogram and Modern SI Base Units",
  "14. The Kilogram and Modern SI Base Units"
);
content = content.replace(
  "19. Material Density Library &amp; Physical Variations",
  "15. Material Density Library &amp; Physical Variations"
);
content = content.replace(
  "22. How to Use the Weight Calculator",
  "16. How to Use the Mass Calculator"
);
content = content.replace(
  "23. Worked Example: 185.5 lb Conversion &amp; Mars Weight",
  "17. Worked Example: 185.5 lb Conversion &amp; Mars Weight"
);
content = content.replace(
  "27. Common Mistakes When Calculating Mass &amp; Weight",
  "18. Common Mistakes When Calculating Mass &amp; Weight"
);
content = content.replace(
  "32. Frequently Asked Questions",
  "19. Frequently Asked Questions"
);
content = content.replace(
  "34. Standards and Authoritative References",
  "20. Standards and Authoritative References"
);

fs.writeFileSync("src/components/calculator/mass/MassContent.tsx", content, "utf8");
console.log("Updated MassContent.tsx successfully.");

// 2. Fix MassCalculator.tsx
let calc = fs.readFileSync("src/components/calculator/mass/MassCalculator.tsx", "utf8");

calc = calc.replaceAll("weight-material-preset", "mass-material-preset");
calc = calc.replaceAll("weight-density-input", "mass-density-input");
calc = calc.replaceAll("weight-density-unit", "mass-density-unit");
calc = calc.replaceAll("weight-volume-input", "mass-volume-input");
calc = calc.replaceAll("weight-volume-unit", "mass-volume-unit");
calc = calc.replaceAll("weight-density-error", "mass-density-error");
calc = calc.replaceAll("weight-volume-error", "mass-volume-error");
calc = calc.replaceAll("weight-converter-input", "mass-converter-input");
calc = calc.replaceAll("weight-converter-from", "mass-converter-from");
calc = calc.replaceAll("weight-converter-to", "mass-converter-to");
calc = calc.replaceAll("weight-celestial-mass", "mass-celestial-mass");

fs.writeFileSync("src/components/calculator/mass/MassCalculator.tsx", calc, "utf8");
console.log("Updated MassCalculator.tsx successfully.");
