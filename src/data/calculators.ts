import {
  Home,
  Percent,
  Calculator as CalcIcon,
  TrendingUp,
  HeartPulse,
  Scale,
  Calendar,
  Building,
  GraduationCap,
  Briefcase,
  ArrowRightLeft,
  BarChart3,
  DollarSign,
  LucideIcon,
} from "lucide-react";

export interface CalculatorItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  featured: boolean;
  icon: LucideIcon;
  tags?: string[];
}

export const CALCULATORS: CalculatorItem[] = [
  {
    id: "mortgage",
    title: "Mortgage Calculator",
    slug: "mortgage-calculator",
    category: "Finance",
    description: "Calculate home loans, monthly payments, interest breakdown, and amortization schedules.",
    featured: true,
    icon: Home,
    tags: ["mortgage", "home loan", "interest", "real estate"],
  },
  {
    id: "loan",
    title: "Loan Calculator",
    slug: "loan-calculator",
    category: "Finance",
    description: "Estimate monthly auto and personal loan payments with custom interest rates.",
    featured: true,
    icon: CalcIcon,
    tags: ["loan", "car loan", "personal loan", "monthly payment"],
  },
  {
    id: "emi",
    title: "EMI Calculator",
    slug: "emi-calculator",
    category: "Finance",
    description: "Calculate Equated Monthly Installments and detailed principal vs interest breakdown.",
    featured: true,
    icon: DollarSign,
    tags: ["emi", "installment", "banking", "finance"],
  },
  {
    id: "sip",
    title: "SIP Calculator",
    slug: "sip-calculator",
    category: "Finance",
    description: "Estimate Systematic Investment Plan returns, wealth growth, and total maturity value.",
    featured: true,
    icon: TrendingUp,
    tags: ["sip", "mutual funds", "investment", "wealth"],
  },
  {
    id: "compound-interest",
    title: "Compound Interest",
    slug: "compound-interest-calculator",
    category: "Finance",
    description: "Calculate annual and monthly compounding growth for savings and fixed deposits.",
    featured: true,
    icon: TrendingUp,
    tags: ["compound interest", "savings", "interest rate"],
  },
  {
    id: "bmi",
    title: "BMI Calculator",
    slug: "bmi-calculator",
    category: "Health",
    description: "Check Body Mass Index classification, ideal weight range, and body metrics.",
    featured: true,
    icon: HeartPulse,
    tags: ["bmi", "health", "weight", "fitness"],
  },
  {
    id: "percentage",
    title: "Percentage Calculator",
    slug: "percentage-calculator",
    category: "Math",
    description: "Quick percent calculations, percentage difference, and percent change conversions.",
    featured: true,
    icon: Percent,
    tags: ["percentage", "math", "ratio", "change"],
  },
  {
    id: "profit-margin",
    title: "Profit Margin Calculator",
    slug: "profit-margin-calculator",
    category: "Business",
    description: "Calculate gross profit margin, net profit percentage, and markup pricing ratios.",
    featured: false,
    icon: Briefcase,
    tags: ["profit", "margin", "business", "markup"],
  },
  {
    id: "concrete-volume",
    title: "Concrete Calculator",
    slug: "concrete-calculator",
    category: "Construction",
    description: "Estimate concrete volume in cubic yards or meters for slabs, footings, and columns.",
    featured: false,
    icon: Building,
    tags: ["concrete", "construction", "volume", "materials"],
  },
  {
    id: "unit-converter",
    title: "Unit Converter",
    slug: "unit-converter",
    category: "Converters",
    description: "Convert length, weight, area, volume, temperature, and speed units instantly.",
    featured: false,
    icon: ArrowRightLeft,
    tags: ["converter", "units", "length", "weight"],
  },
  {
    id: "age-calculator",
    title: "Age Calculator",
    slug: "age-calculator",
    category: "Date",
    description: "Calculate exact age in years, months, days, hours, and find upcoming birthdays.",
    featured: false,
    icon: Calendar,
    tags: ["age", "date", "birthday", "time"],
  },
  {
    id: "gpa-calculator",
    title: "GPA Calculator",
    slug: "gpa-calculator",
    category: "Education",
    description: "Calculate Grade Point Average (GPA) for semester courses and cumulative grades.",
    featured: false,
    icon: GraduationCap,
    tags: ["gpa", "grades", "education", "school"],
  },
  {
    id: "statistics-solver",
    title: "Statistics Calculator",
    slug: "statistics-calculator",
    category: "Statistics",
    description: "Calculate mean, median, mode, standard deviation, and variance for data sets.",
    featured: false,
    icon: BarChart3,
    tags: ["statistics", "mean", "median", "variance"],
  },
];

export default CALCULATORS;

export function getFeaturedCalculators(): CalculatorItem[] {
  return CALCULATORS.filter((c) => c.featured);
}

export function getCalculatorsByCategory(category: string): CalculatorItem[] {
  if (!category || category === "Home" || category === "all") {
    return CALCULATORS;
  }
  return CALCULATORS.filter(
    (c) => c.category.toLowerCase() === category.toLowerCase()
  );
}

export function getCalculatorBySlug(slug: string): CalculatorItem | undefined {
  return CALCULATORS.find(
    (c) => c.slug.toLowerCase() === slug.toLowerCase() || c.id.toLowerCase() === slug.toLowerCase()
  );
}
