import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateIPSubnetCalculator } from "./calculator";
import { ip_subnet_calculatorFaqs } from "./faq";
import { IPSubnetCalculator } from "@/components/calculator/ip-subnet/IPSubnetCalculator";
import { IPSubnetContent } from "@/components/calculator/ip-subnet/IPSubnetContent";

export const ip_subnet_calculatorConfig: CalculatorModuleDefinition = {
  id: "ip-subnet-calculator",
  title: "IP Subnet Calculator",
  slug: "ip-subnet-calculator",
  category: "other",
  subcategory: "Tech & Electrical",
  description: "Calculate IPv4 and IPv6 subnet masks, network IPs, broadcast IPs, CIDR prefix lengths, and usable host ranges. Slice subnets and aggregate routes.",
  iconName: "Network",
  featured: true,
  keywords: [
    "ip subnet calculator",
    "cidr calculator",
    "subnet mask",
    "broadcast ip",
    "usable hosts count",
    "IPv4 subnetting",
    "IPv6 prefix length",
    "subnet splitter",
    "subnet planner",
    "route summarization"
  ],
  priority: 1,
  relatedCalculators: ["bandwidth-calculator", "binary-calculator"],
  formulaDescription: "Usable Hosts = 2^(32 - CIDR) - 2 (For IPv4 prefixes /1 to /30)",
  faqs: ip_subnet_calculatorFaqs,
  ContentComponent: IPSubnetContent,
  CustomComponent: IPSubnetCalculator,
  inputs: [
    {
      name: "ipAddress",
      label: "IP Address",
      type: "text",
      defaultValue: "192.168.1.1"
    },
    {
      name: "cidr",
      label: "Subnet Mask (CIDR /N)",
      type: "number",
      defaultValue: 24,
      min: 1,
      max: 32,
      step: 1
    }
  ],
  outputs: [
    {
      name: "subnetMask",
      label: "Subnet Mask",
      format: "text",
      highlight: true
    },
    {
      name: "usableHosts",
      label: "Usable Host IP Count",
      format: "number"
    },
    {
      name: "networkAddress",
      label: "Network Address",
      format: "text"
    }
  ],
  calculate: calculateIPSubnetCalculator,
};

export default ip_subnet_calculatorConfig;
