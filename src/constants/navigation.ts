import {
  Home,
  Landmark,
  HeartPulse,
  Binary,
  HardHat,
  ArrowRightLeft,
  Calendar,
  Briefcase,
  GraduationCap,
  LucideIcon,
} from "lucide-react";

export interface NavigationCategory {
  id: string;
  name: string;
  slug: string;
  icon: LucideIcon;
  description: string;
  href: string;
  count?: number;
}

export const NAVIGATION_CATEGORIES: NavigationCategory[] = [
  {
    id: "home",
    name: "Home",
    slug: "home",
    icon: Home,
    description: "Overview of all top calculators and categories",
    href: "/",
  },
  {
    id: "finance",
    name: "Finance",
    slug: "finance",
    icon: Landmark,
    description: "Mortgage, loan EMI, SIP wealth growth, and interest rate tools",
    href: "/category/finance",
    count: 5,
  },
  {
    id: "health",
    name: "Health",
    slug: "health",
    icon: HeartPulse,
    description: "Body Mass Index (BMI), daily calorie intake, and fitness tracking",
    href: "/category/health",
    count: 2,
  },
  {
    id: "math",
    name: "Math",
    slug: "math",
    icon: Binary,
    description: "Percentage change, algebra, fractions, and scientific math",
    href: "/category/math",
    count: 3,
  },
  {
    id: "construction",
    name: "Construction",
    slug: "construction",
    icon: HardHat,
    description: "Concrete volume, brick estimation, and engineering dimensions",
    href: "/category/construction",
    count: 2,
  },
  {
    id: "converters",
    name: "Converters",
    slug: "converters",
    icon: ArrowRightLeft,
    description: "Unit conversion for length, weight, temperature, and currency",
    href: "/category/converters",
    count: 4,
  },
  {
    id: "date-time",
    name: "Date & Time",
    slug: "date-time",
    icon: Calendar,
    description: "Age calculation, time duration, workdays, and timezone tools",
    href: "/category/date-time",
    count: 3,
  },
  {
    id: "business",
    name: "Business",
    slug: "business",
    icon: Briefcase,
    description: "Profit margin, markup, ROI, break-even, and tax calculations",
    href: "/category/business",
    count: 4,
  },
  {
    id: "education",
    name: "Education",
    slug: "education",
    icon: GraduationCap,
    description: "GPA calculator, grade estimation, and student academic math",
    href: "/category/education",
    count: 2,
  },
];

export const NAV_LINKS = NAVIGATION_CATEGORIES;

export function getCategoryById(id: string): NavigationCategory | undefined {
  return NAVIGATION_CATEGORIES.find(
    (cat) => cat.id.toLowerCase() === id.toLowerCase() || cat.name.toLowerCase() === id.toLowerCase()
  );
}
