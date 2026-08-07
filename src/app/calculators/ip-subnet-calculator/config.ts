import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateIPSubnetCalculator } from "./calculator";
import { ip_subnet_calculatorFaqs } from "./faq";

export const ip_subnet_calculatorConfig: CalculatorModuleDefinition = {
  id: "ip-subnet-calculator",
  title: "IP Subnet Calculator",
  slug: "ip-subnet-calculator",
  category: "other",
  subcategory: "Internet",
  description: "Calculate IPv4 subnet mask, network IP, broadcast IP, CIDR prefix, and usable host count.",
  iconName: "Network",
  featured: true,
  keywords: ["ip subnet calculator","cidr","subnet mask","broadcast ip","usable hosts"],
  priority: 1,
  relatedCalculators: ["bandwidth-calculator","binary-calculator"],
  formulaDescription: "Usable Hosts = 2^(32 - CIDR) - 2",
  faqs: ip_subnet_calculatorFaqs,
  inputs: [
  {
    "name": "ipAddress",
    "label": "IP Address",
    "type": "text",
    "defaultValue": "192.168.1.1"
  },
  {
    "name": "cidr",
    "label": "Subnet Mask (CIDR /N)",
    "type": "number",
    "defaultValue": 24,
    "min": 1,
    "max": 32,
    "step": 1
  }
],
  outputs: [
  {
    "name": "subnetMask",
    "label": "Subnet Mask",
    "format": "text",
    "highlight": true
  },
  {
    "name": "usableHosts",
    "label": "Usable Host IP Count",
    "format": "number"
  },
  {
    "name": "networkAddress",
    "label": "Network Address",
    "format": "text"
  }
],
  calculate: calculateIPSubnetCalculator,
};

export default ip_subnet_calculatorConfig;
