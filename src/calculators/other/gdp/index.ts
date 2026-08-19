import { CalculatorModuleDefinition } from "../../types";
import { calculateExpenditureGdp } from "@/lib/calculator-engine/formulas/gdp";

export const GDP_CALCULATOR: CalculatorModuleDefinition = {
  id: "gdp",
  title: "GDP Calculator",
  slug: "gdp-calculator",
  category: "Other",
  subcategory: "Science & Education",
  description:
    "Calculate Gross Domestic Product (GDP) using the Expenditure Approach, Resource Cost - Income Approach, Real vs. Nominal GDP Deflator, and GDP Per Capita.",
  iconName: "Globe",
  featured: true,
  tags: [
    "gdp calculator",
    "gross domestic product calculator",
    "real gdp calculator",
    "gdp deflator calculator",
    "expenditure approach gdp",
    "gdp per capita",
  ],
  formulaDescription:
    "Expenditure Approach: GDP = C + I + G + (X - M). Real GDP = (Nominal GDP / GDP Deflator) * 100.",
  faqs: [
    {
      question: "What is the Expenditure Approach formula for GDP?",
      answer:
        "GDP = Personal Consumption (C) + Gross Investment (I) + Government Spending (G) + Net Exports (X - M).",
    },
    {
      question: "What is the difference between Nominal and Real GDP?",
      answer:
        "Nominal GDP is evaluated at current market prices, whereas Real GDP is adjusted for price changes and inflation using the GDP Deflator index.",
    },
    {
      question: "What is GDP per capita?",
      answer:
        "GDP per capita is a country's total economic output divided by its total population, serving as an indicator of average living standards.",
    },
  ],
  inputs: [
    {
      name: "personalConsumption",
      label: "Personal Consumption (C)",
      type: "currency",
      defaultValue: 19100,
      min: 0,
      max: 1000000,
      step: 100,
    },
    {
      name: "grossInvestment",
      label: "Gross Investment (I)",
      type: "currency",
      defaultValue: 5100,
      min: 0,
      max: 1000000,
      step: 100,
    },
    {
      name: "governmentSpending",
      label: "Government Spending (G)",
      type: "currency",
      defaultValue: 4850,
      min: 0,
      max: 1000000,
      step: 100,
    },
    {
      name: "exports",
      label: "Exports (X)",
      type: "currency",
      defaultValue: 3150,
      min: 0,
      max: 1000000,
      step: 100,
    },
    {
      name: "imports",
      label: "Imports (M)",
      type: "currency",
      defaultValue: 3820,
      min: 0,
      max: 1000000,
      step: 100,
    },
  ],
  outputs: [
    {
      name: "totalGdp",
      label: "Total Gross Domestic Product",
      format: "currency",
    },
    {
      name: "netExports",
      label: "Net Exports (X - M)",
      format: "currency",
    },
    {
      name: "gdpPerCapita",
      label: "GDP Per Capita",
      format: "currency",
    },
  ],
  calculate: (inputs: Record<string, any>) => {
    const res = calculateExpenditureGdp({
      personalConsumption: Number(inputs.personalConsumption) || 19100,
      grossInvestment: Number(inputs.grossInvestment) || 5100,
      governmentSpending: Number(inputs.governmentSpending) || 4850,
      exports: Number(inputs.exports) || 3150,
      imports: Number(inputs.imports) || 3820,
      population: 335000000,
    });

    return {
      totalGdp: res.totalGdp,
      netExports: res.netExports,
      gdpPerCapita: res.gdpPerCapita * 1000000000,
    };
  },
};

export default GDP_CALCULATOR;
