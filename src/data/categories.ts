import {
  DollarSign,
  HeartPulse,
  Calculator,
  Hammer,
  GraduationCap,
  Briefcase,
  ArrowRightLeft,
  Calendar,
  BarChart3,
  LucideIcon,
} from "lucide-react";

export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  count: number;
  featured?: boolean;
  color: string;
}

export const CATEGORIES: CategoryData[] = [
  {
    id: "finance",
    name: "Finance",
    slug: "finance",
    description: "Mortgage, loan EMI, SIP wealth growth, compound interest, and investment return calculators.",
    icon: DollarSign,
    count: 5,
    featured: true,
    color: "sky",
  },
  {
    id: "health",
    name: "Health",
    slug: "health",
    description: "Body Mass Index (BMI), calorie maintenance, ideal weight, and body composition tools.",
    icon: HeartPulse,
    count: 2,
    featured: true,
    color: "emerald",
  },
  {
    id: "math",
    name: "Math",
    slug: "math",
    description: "Percentage increase/decrease, fractions, ratios, and scientific mathematical solvers.",
    icon: Calculator,
    count: 3,
    featured: true,
    color: "purple",
  },
  {
    id: "construction",
    name: "Construction",
    slug: "construction",
    description: "Concrete volume estimation, brick & tile requirements, and structural dimensions.",
    icon: Hammer,
    count: 2,
    featured: true,
    color: "amber",
  },
  {
    id: "education",
    name: "Education",
    slug: "education",
    description: "GPA grade point average, final grade target, and academic score conversion tools.",
    icon: GraduationCap,
    count: 2,
    featured: false,
    color: "blue",
  },
  {
    id: "business",
    name: "Business",
    slug: "business",
    description: "Profit margin, markup percentage, ROI return on investment, and break-even point.",
    icon: Briefcase,
    count: 4,
    featured: false,
    color: "indigo",
  },
  {
    id: "converters",
    name: "Converters",
    slug: "converters",
    icon: ArrowRightLeft,
    description: "Unit conversion for length, weight, area, volume, temperature, and currency.",
    count: 4,
    featured: false,
    color: "teal",
  },
  {
    id: "date",
    name: "Date",
    slug: "date",
    icon: Calendar,
    description: "Age calculator, date difference, working days counter, and countdown duration.",
    count: 3,
    featured: false,
    color: "rose",
  },
  {
    id: "statistics",
    name: "Statistics",
    slug: "statistics",
    description: "Mean, median, mode, standard deviation, probability, and variance analytical solvers.",
    icon: BarChart3,
    count: 3,
    featured: false,
    color: "violet",
  },
];

export default CATEGORIES;

export function getCategoryBySlug(slug: string): CategoryData | undefined {
  return CATEGORIES.find(
    (c) => c.slug.toLowerCase() === slug.toLowerCase() || c.id.toLowerCase() === slug.toLowerCase()
  );
}

export function getCategoryByName(name: string): CategoryData | undefined {
  return CATEGORIES.find((c) => c.name.toLowerCase() === name.toLowerCase());
}
