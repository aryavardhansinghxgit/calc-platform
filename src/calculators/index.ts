import { CalculatorModuleDefinition } from "./types";
import { FINANCE_CALCULATORS } from "./finance";
import { MATH_CALCULATORS } from "./math";
import { HEALTH_CALCULATORS } from "./health";
import { DATE_CALCULATORS } from "./date";
import { CONSTRUCTION_CALCULATORS } from "./construction";
import { CONVERTERS_CALCULATORS } from "./converters";
import { OTHER_CALCULATORS } from "./other";

export * from "./types";

let _allCalculators: CalculatorModuleDefinition[] | null = null;
let _registryMap: Record<string, CalculatorModuleDefinition> | null = null;

function getRegistry(): { all: CalculatorModuleDefinition[]; map: Record<string, CalculatorModuleDefinition> } {
  if (!_allCalculators || _allCalculators.length === 0) {
    const raw = [
      ...(FINANCE_CALCULATORS || []),
      ...(MATH_CALCULATORS || []),
      ...(HEALTH_CALCULATORS || []),
      ...(DATE_CALCULATORS || []),
      ...(CONSTRUCTION_CALCULATORS || []),
      ...(CONVERTERS_CALCULATORS || []),
      ...(OTHER_CALCULATORS || []),
    ];

    _allCalculators = Array.from(
      new Map(
        raw
          .filter((c) => c && c.id && c.slug)
          .map((calc) => [calc.id.toLowerCase(), calc])
      ).values()
    );

    _registryMap = {};
    _allCalculators.forEach((calc) => {
      if (_registryMap) {
        _registryMap[calc.id.toLowerCase()] = calc;
        _registryMap[calc.slug.toLowerCase()] = calc;
      }
    });
  }
  return { all: _allCalculators, map: _registryMap || {} };
}

// Deduplicate calculators by id to guarantee uniqueness - proxy allows lazy evaluation on property access
export const ALL_CALCULATORS: CalculatorModuleDefinition[] = new Proxy([] as CalculatorModuleDefinition[], {
  get(target, prop, receiver) {
    const { all } = getRegistry();
    return Reflect.get(all, prop, receiver);
  },
  has(target, prop) {
    const { all } = getRegistry();
    return Reflect.has(all, prop);
  },
  ownKeys() {
    const { all } = getRegistry();
    return Reflect.ownKeys(all);
  },
  getOwnPropertyDescriptor(target, prop) {
    const { all } = getRegistry();
    return Reflect.getOwnPropertyDescriptor(all, prop);
  },
});

export function getCalculatorDefinition(idOrSlug: string): CalculatorModuleDefinition | undefined {
  if (!idOrSlug) return undefined;
  const key = idOrSlug.toLowerCase().trim();
  const { all, map } = getRegistry();
  if (map[key]) return map[key];
  return all.find((c) => c && (c.id?.toLowerCase() === key || c.slug?.toLowerCase() === key));
}

export function getAllCalculatorDefinitions(): CalculatorModuleDefinition[] {
  return ALL_CALCULATORS;
}

export function getCalculatorsByCategory(categorySlugOrName: string): CalculatorModuleDefinition[] {
  if (!categorySlugOrName || categorySlugOrName === "all" || categorySlugOrName === "Home") {
    return ALL_CALCULATORS;
  }
  const target = categorySlugOrName.toLowerCase().trim().replace(/-/g, " ");
  return ALL_CALCULATORS.filter(
    (calc) => calc.category.toLowerCase().replace(/-/g, " ") === target
  );
}

export function getFeaturedCalculators(): CalculatorModuleDefinition[] {
  return ALL_CALCULATORS.filter((c) => c.featured);
}

export function searchCalculators(query: string): CalculatorModuleDefinition[] {
  if (!query || query.trim() === "") return ALL_CALCULATORS;
  const q = query.toLowerCase().trim();
  const tokens = q.split(/\s+/).filter(Boolean);

  const aliases: Record<string, string[]> = {
    cd: ["cd-calculator"],
    "certificate of deposit": ["cd-calculator"],
    "cd calculator": ["cd-calculator"],
    "cd interest": ["cd-calculator"],
    "cd ladder": ["cd-calculator"],
    "cd apy": ["cd-calculator"],
    bond: ["bond-calculator"],
    "bond calculator": ["bond-calculator"],
    ytm: ["bond-calculator"],
    "yield to maturity": ["bond-calculator"],
    "bond price": ["bond-calculator"],
    "zero coupon bond": ["bond-calculator"],
    "macaulay duration": ["bond-calculator"],
    "duration": ["bond-calculator"],
    "convexity": ["bond-calculator"],
    "yield to call": ["bond-calculator"],
    "yield to worst": ["bond-calculator"],
    "municipal bond": ["bond-calculator"],
    "clean price": ["bond-calculator"],
    "dirty price": ["bond-calculator"],
    "mutual fund": ["mutual-fund-calculator"],
    "mutual fund calculator": ["mutual-fund-calculator"],
    "mutual fund return": ["mutual-fund-calculator"],
    "expense ratio": ["mutual-fund-calculator"],
    "front end load": ["mutual-fund-calculator"],
    "back end load": ["mutual-fund-calculator"],
    "cdsc": ["mutual-fund-calculator"],
    "12b-1": ["mutual-fund-calculator"],
    "net irr": ["mutual-fund-calculator"],
    "index fund vs mutual fund": ["mutual-fund-calculator"],
    "average return": ["average-return-calculator"],
    "average return calculator": ["average-return-calculator"],
    "twrr": ["average-return-calculator"],
    "mwrr": ["average-return-calculator"],
    "time weighted return": ["average-return-calculator"],
    "money weighted return": ["average-return-calculator"],
    "portfolio return": ["average-return-calculator"],
    "portfolio performance": ["average-return-calculator"],
    "cumulative return": ["average-return-calculator"],
    "arr calculator": ["average-return-calculator"],
    "irr": ["irr-calculator"],
    "irr calculator": ["irr-calculator"],
    "internal rate of return": ["irr-calculator"],
    "mirr": ["irr-calculator"],
    "mirr calculator": ["irr-calculator"],
    "modified internal rate of return": ["irr-calculator"],
    "capital budgeting": ["irr-calculator", "payback-period-calculator"],
    "discounted payback": ["payback-period-calculator", "irr-calculator"],
    "profitability index": ["irr-calculator", "payback-period-calculator"],
    "payback period": ["payback-period-calculator"],
    "payback period calculator": ["payback-period-calculator"],
    "discounted payback period": ["payback-period-calculator"],
    "capital recovery": ["payback-period-calculator"],
    "payment": ["payment-calculator", "loan-calculator"],
    "payment calculator": ["payment-calculator", "loan-calculator"],
    "loan payment": ["payment-calculator", "loan-calculator"],
    "loan payment calculator": ["payment-calculator", "loan-calculator"],
    "monthly payment": ["payment-calculator", "loan-calculator"],
    "monthly payment calculator": ["payment-calculator", "loan-calculator"],
    "calculate loan payments": ["payment-calculator", "loan-calculator"],
    "currency": ["currency-calculator"],
    "currency calculator": ["currency-calculator"],
    "currency converter": ["currency-calculator"],
    "exchange rate": ["currency-calculator"],
    "exchange rate calculator": ["currency-calculator"],
    "forex": ["currency-calculator"],
    "forex converter": ["currency-calculator"],
    "money converter": ["currency-calculator"],
    "usd to eur": ["currency-calculator"],
    "inflation": ["inflation-calculator"],
    "inflation calculator": ["inflation-calculator"],
    "cpi calculator": ["inflation-calculator"],
    "purchasing power": ["inflation-calculator"],
    "purchasing power calculator": ["inflation-calculator"],
    "us inflation calculator": ["inflation-calculator"],
    "future value of dollar": ["inflation-calculator"],
    "salary": ["salary-calculator"],
    "dpp": ["payback-period-calculator"],
    "dpp calculator": ["payback-period-calculator"],
    "breakeven period": ["payback-period-calculator"],
    "salary calculator": ["salary-calculator"],
    "hourly to salary": ["salary-calculator"],
    "salary to hourly": ["salary-calculator"],
    "paycheck": ["take-home-pay-calculator", "salary-calculator"],
    "paycheck calculator": ["take-home-pay-calculator", "salary-calculator"],
    "take home pay": ["take-home-pay-calculator", "salary-calculator"],
    "take home paycheck calculator": ["take-home-pay-calculator"],
    "net pay": ["take-home-pay-calculator", "salary-calculator"],
    "wage": ["salary-calculator"],
    "hourly paycheck": ["take-home-pay-calculator", "salary-calculator"],
    "overtime calculator": ["take-home-pay-calculator", "salary-calculator"],
    "marriage tax": ["marriage-tax-calculator"],
    "marriage tax calculator": ["marriage-tax-calculator"],
    "marriage penalty": ["marriage-tax-calculator"],
    "marriage penalty calculator": ["marriage-tax-calculator"],
    "marriage bonus": ["marriage-tax-calculator"],
    "marriage bonus calculator": ["marriage-tax-calculator"],
    "married filing jointly vs separately": ["marriage-tax-calculator"],
    "mfj vs mfs": ["marriage-tax-calculator"],
    "estate tax": ["estate-tax-calculator"],
    "estate tax calculator": ["estate-tax-calculator"],
    "death tax": ["estate-tax-calculator"],
    "death tax calculator": ["estate-tax-calculator"],
    "inheritance tax": ["estate-tax-calculator"],
    "inheritance tax calculator": ["estate-tax-calculator"],
    "portability": ["estate-tax-calculator"],
    "dsue": ["estate-tax-calculator"],
    "step up in basis": ["estate-tax-calculator"],
    "gst tax": ["estate-tax-calculator"],
    interest: ["interest-rate-calculator", "interest-calculator"],
    tvm: ["finance-calculator"],
    finance: ["finance-calculator", "loan-calculator"],
    car: ["cash-back-or-low-interest-calculator", "auto-loan", "loan"],
    vehicle: ["cash-back-or-low-interest-calculator", "auto-loan"],
    auto: ["cash-back-or-low-interest-calculator", "auto-loan"],
    rebate: ["cash-back-or-low-interest-calculator"],
    downpayment: ["down-payment-calculator", "mortgage"],
    down: ["down-payment-calculator"],
    equity: ["home-equity-loan-calculator", "heloc-calculator"],
    heloc: ["heloc-calculator", "home-equity-loan-calculator"],
    va: ["va-mortgage-calculator"],
    fha: ["fha-loan-calculator"],
    apr: ["apr-calculator"],
    dti: ["dti-calculator"],
    house: ["mortgage", "house-affordability", "rent-calculator", "dti-calculator"],
    home: ["mortgage", "house-affordability", "rent-calculator", "dti-calculator"],
    buy: ["rent-vs-buy-calculator", "mortgage"],
    rent: ["rent-vs-buy-calculator", "rent-calculator", "rental-property-calculator"],
    rental: ["rental-property-calculator", "rent-calculator"],
    brrrr: ["rental-property-calculator"],
    lease: ["rent-calculator"],
    apartment: ["rent-calculator"],
    roommate: ["rent-calculator"],
    property: ["mortgage", "rental-property-calculator"],
    tax: ["gst"],
    vat: ["gst"],
    investment: ["sip", "compound-interest", "fd", "rd", "cd-calculator"],
    deposit: ["fd", "rd", "compound-interest", "cd-calculator"],
    returns: ["sip", "compound-interest"],
    installment: ["emi", "loan", "mortgage"],
    weight: ["bmi"],
    fitness: ["bmi"],
    birthday: ["age"],
  };

  const expandedTargetIds = new Set<string>();
  Object.entries(aliases).forEach(([alias, targetIds]) => {
    if (alias.includes(q) || q.includes(alias)) {
      targetIds.forEach((id) => expandedTargetIds.add(id));
    }
  });

  const matches = ALL_CALCULATORS.filter((calc) => {
    const title = calc.title.toLowerCase();
    const desc = calc.description.toLowerCase();
    const cat = calc.category.toLowerCase();
    const subcat = (calc.subcategory || "").toLowerCase();
    const id = calc.id.toLowerCase();
    const slug = calc.slug.toLowerCase();
    const tags = [
      ...(calc.tags || []),
      ...(calc.keywords || []),
    ].map((t) => t.toLowerCase());

    if (
      title.includes(q) ||
      desc.includes(q) ||
      cat.includes(q) ||
      subcat.includes(q) ||
      id.includes(q) ||
      slug.includes(q) ||
      tags.some((t) => t.includes(q))
    ) {
      return true;
    }

    if (expandedTargetIds.has(id) || expandedTargetIds.has(slug)) {
      return true;
    }

    return tokens.every(
      (token) =>
        title.includes(token) ||
        desc.includes(token) ||
        cat.includes(token) ||
        subcat.includes(token) ||
        id.includes(token) ||
        slug.includes(token) ||
        tags.some((t) => t.includes(token))
    );
  });

  return matches.sort((a, b) => {
    const getScore = (calc: CalculatorModuleDefinition) => {
      const title = calc.title.toLowerCase();
      const slug = calc.slug.toLowerCase();
      const id = calc.id.toLowerCase();
      const category = calc.category.toLowerCase();
      const titleWords = title.split(/\s+/);

      if (title === q || slug === q || id === q) return 0;
      if (title.startsWith(q)) return 1;
      if (titleWords.some((word) => word.startsWith(q))) return 2;
      if (slug.startsWith(q) || id.startsWith(q)) return 3;
      if (category.startsWith(q)) return 4;
      if (title.includes(q)) return 5;
      if (slug.includes(q) || id.includes(q) || category.includes(q)) return 6;
      return 7;
    };

    const scoreDifference = getScore(a) - getScore(b);
    if (scoreDifference !== 0) return scoreDifference;

    return a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
  });
}

export function getRelatedCalculators(
  currentId: string,
  category?: string,
  count: number = 8
): CalculatorModuleDefinition[] {
  const currentDef = getCalculatorDefinition(currentId);
  if (currentDef && currentDef.relatedCalculators && currentDef.relatedCalculators.length > 0) {
    const explicitCalcs: CalculatorModuleDefinition[] = [];
    for (const relId of currentDef.relatedCalculators) {
      const found = getCalculatorDefinition(relId);
      if (found && !explicitCalcs.some((c) => c.id === found.id)) {
        explicitCalcs.push(found);
      }
    }
    if (explicitCalcs.length > 0) {
      return explicitCalcs.slice(0, count);
    }
  }

  const filtered = ALL_CALCULATORS.filter(
    (c) =>
      c.id.toLowerCase() !== currentId.toLowerCase() &&
      c.slug.toLowerCase() !== currentId.toLowerCase()
  );

  if (category) {
    const categoryMatches = filtered.filter(
      (c) => c.category.toLowerCase() === category.toLowerCase()
    );
    if (categoryMatches.length >= count) {
      return categoryMatches.slice(0, count);
    }
    const nonMatches = filtered.filter(
      (c) => c.category.toLowerCase() !== category.toLowerCase()
    );
    return [...categoryMatches, ...nonMatches].slice(0, count);
  }

  return filtered.slice(0, count);
}
