import { CalculatorModuleDefinition } from "../../types";
import { calculateDepreciation } from "@/lib/calculator-engine/formulas/depreciation";

export const DEPRECIATION_CALCULATOR: CalculatorModuleDefinition = {
  id: "depreciation",
  title: "Depreciation Calculator",
  slug: "depreciation-calculator",
  category: "Finance",
  subcategory: "Accounting & Tax",
  description:
    "Calculate asset depreciation schedules across Straight-Line, Double Declining Balance (DDB), 150% Declining Balance, Sum-of-Years' Digits (SYD), Units of Production, and MACRS IRS tax depreciation.",
  iconName: "TrendingDown",
  featured: true,
  tags: [
    "depreciation calculator",
    "straight line depreciation",
    "double declining balance",
    "macrs depreciation",
    "sum of years digits",
    "salvage value",
    "book value",
  ],
  formulaDescription:
    "Straight-Line: (Cost - Salvage) / Life. Double Declining: Beginning Book Value × (2 / Life). Sum-of-Years' Digits: (Cost - Salvage) × (Remaining Life / SYD).",
  faqs: [
    {
      question: "What is Straight-Line depreciation and how is it calculated?",
      answer:
        "Straight-line depreciation spreads the depreciable cost of an asset evenly across its useful life: Annual Depreciation = (Asset Purchase Price - Salvage Value) ÷ Useful Life in Years.",
    },
    {
      question: "How does Double Declining Balance (DDB) work?",
      answer:
        "Double Declining Balance is an accelerated depreciation method where the annual rate is double the straight-line rate (200% ÷ Useful Life) applied to the beginning book value each year until reaching salvage value.",
    },
    {
      question: "What is MACRS depreciation?",
      answer:
        "MACRS (Modified Accelerated Cost Recovery System) is the statutory tax depreciation system used in the United States under IRS tax rules. It specifies depreciation percentages across standardized property classes (3, 5, 7, 10, 15, 20 years).",
    },
  ],
  inputs: [
    {
      name: "assetCost",
      label: "Asset Cost ($)",
      type: "currency",
      defaultValue: 11000,
      min: 0,
      max: 100000000,
      step: 100,
    },
    {
      name: "salvageValue",
      label: "Salvage Value ($)",
      type: "currency",
      defaultValue: 1000,
      min: 0,
      max: 100000000,
      step: 100,
    },
    {
      name: "usefulLifeYears",
      label: "Depreciation Years",
      type: "number",
      defaultValue: 5,
      min: 1,
      max: 100,
      step: 1,
    },
  ],
  outputs: [
    {
      name: "year1Depreciation",
      label: "Year 1 Depreciation",
      format: "currency",
    },
    {
      name: "totalAccumulatedDepreciation",
      label: "Total Accumulated Depreciation",
      format: "currency",
    },
    {
      name: "endingBookValue",
      label: "Ending Book Value",
      format: "currency",
    },
  ],
  calculate: (inputs: Record<string, any>) => {
    const res = calculateDepreciation({
      assetCost: Number(inputs.assetCost) || 11000,
      salvageValue: Number(inputs.salvageValue) || 1000,
      usefulLifeYears: Number(inputs.usefulLifeYears) || 5,
      method: "straight-line",
    });

    return {
      year1Depreciation: res.year1Depreciation,
      totalAccumulatedDepreciation: res.totalAccumulatedDepreciation,
      endingBookValue: res.endingBookValue,
    };
  },
};
