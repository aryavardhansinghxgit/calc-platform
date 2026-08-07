import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const ip_subnet_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "IP Subnet Calculator — Free Online Calculator",
  description: "Calculate IPv4 subnet mask, network IP, broadcast IP, CIDR prefix, and usable host count.",
  slug: "ip-subnet-calculator",
});
