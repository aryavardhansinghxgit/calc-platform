import { CalculatorModuleDefinition } from "../types";
import { MORTGAGE_CALCULATOR } from "./mortgage";
import { AUTO_LOAN_CALCULATOR } from "./auto-loan";
import { LOAN_CALCULATOR } from "./loan";
import { EMI_CALCULATOR } from "./emi";
import { SIP_CALCULATOR } from "./sip";
import { COMPOUND_INTEREST_CALCULATOR } from "./compound-interest";
import { FD_CALCULATOR } from "./fd";
import { RD_CALCULATOR } from "./rd";

export const FINANCE_CALCULATORS: CalculatorModuleDefinition[] = [
  MORTGAGE_CALCULATOR,
  AUTO_LOAN_CALCULATOR,
  LOAN_CALCULATOR,
  EMI_CALCULATOR,
  SIP_CALCULATOR,
  COMPOUND_INTEREST_CALCULATOR,
  FD_CALCULATOR,
  RD_CALCULATOR,
];

export default FINANCE_CALCULATORS;
