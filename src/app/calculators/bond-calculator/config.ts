import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateStandardBond } from "./calculator";
import { BondCalculator } from "@/components/calculator/bond/BondCalculator";
import { BondContent } from "@/components/calculator/bond/BondContent";

export const bond_calculatorConfig: CalculatorModuleDefinition = {
  id: "bond-calculator",
  title: "Bond Calculator — Calculate Bond Price, Yield to Maturity & Duration",
  slug: "bond-calculator",
  category: "Finance",
  subcategory: "Investment",
  description:
    "Calculate Clean & Dirty Bond Price, Yield to Maturity (YTM), Yield to Call (YTW), Macaulay/Modified Duration, Convexity, Zero-Coupon Accretion, and Tax-Equivalent Municipal Yields.",
  iconName: "TrendingUp",
  featured: true,
  keywords: [
    "bond calculator",
    "yield to maturity calculator",
    "bond price calculator",
    "ytm calculator",
    "zero coupon bond calculator",
    "bond yield calculator",
    "macaulay duration calculator",
    "current yield vs ytm",
    "callable bond yield to worst calculator",
    "clean price vs dirty price calculator",
    "municipal bond tax equivalent yield calculator",
  ],
  priority: 1,
  relatedCalculators: ["compound-interest-calculator", "present-value-calculator", "cagr-calculator", "future-value-calculator", "investment-calculator"],
  formulaDescription:
    "P = C * [ (1 - (1 + y/m)^(-n)) / (y/m) ] + [ F / (1 + y/m)^n ] | Newton-Raphson numerical root finding for Yield to Maturity (YTM).",
  inputs: [
    {
      name: "faceValue",
      label: "Face / Par Value ($)",
      type: "currency",
      defaultValue: 1000,
      min: 1,
      max: 100000000,
    },
    {
      name: "couponRate",
      label: "Annual Coupon Rate (%)",
      type: "percentage",
      defaultValue: 6.0,
      min: 0,
      max: 50,
      step: 0.1,
    },
    {
      name: "yearsToMaturity",
      label: "Years to Maturity",
      type: "number",
      defaultValue: 10,
      min: 0.1,
      max: 100,
      step: 0.5,
    },
    {
      name: "ytm",
      label: "Yield to Maturity (YTM %)",
      type: "percentage",
      defaultValue: 5.0,
      min: 0,
      max: 100,
      step: 0.05,
    },
  ],
  outputs: [
    {
      name: "cleanPrice",
      label: "Clean Quoted Price",
      format: "currency",
      highlight: true,
    },
    {
      name: "dirtyPrice",
      label: "Dirty / Invoice Price",
      format: "currency",
      highlight: true,
    },
    {
      name: "ytmPercent",
      label: "Yield to Maturity (YTM)",
      format: "percentage",
    },
    {
      name: "currentYield",
      label: "Current Yield",
      format: "percentage",
    },
    {
      name: "modifiedDuration",
      label: "Modified Duration",
      format: "number",
    },
  ],
  calculate: (inputs: Record<string, any>) => {
    const res = calculateStandardBond({
      goal: "price",
      faceValue: Number(inputs.faceValue || 1000),
      couponRate: Number(inputs.couponRate || 6),
      yearsToMaturity: Number(inputs.yearsToMaturity || 10),
      ytm: Number(inputs.ytm || 5),
      couponFrequency: "semiannual",
      dayCount: "30/360",
      daysSinceLastCoupon: 0,
    });

    return {
      ...res,
      cleanPrice: `$${res.cleanPrice.toLocaleString()}`,
      dirtyPrice: `$${res.dirtyPrice.toLocaleString()}`,
      ytmPercent: `${res.ytmPercent}%`,
      currentYield: `${res.currentYieldPercent}%`,
      modifiedDuration: `${res.modifiedDuration}%`,
    };
  },
  CustomComponent: BondCalculator,
  ContentComponent: BondContent,
};

export default bond_calculatorConfig;
