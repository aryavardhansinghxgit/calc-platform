import { ES_BUSINESS_LOAN_OVERLAY } from "./es";
import { FR_BUSINESS_LOAN_OVERLAY } from "./fr";
import { DE_BUSINESS_LOAN_OVERLAY } from "./de";
import { HI_BUSINESS_LOAN_OVERLAY } from "./hi";
import { PT_BUSINESS_LOAN_OVERLAY } from "./pt";

export function getBusinessLoanOverlay(locale: string) {
  switch (locale) {
    case "es": return ES_BUSINESS_LOAN_OVERLAY;
    case "fr": return FR_BUSINESS_LOAN_OVERLAY;
    case "de": return DE_BUSINESS_LOAN_OVERLAY;
    case "hi": return HI_BUSINESS_LOAN_OVERLAY;
    case "pt": return PT_BUSINESS_LOAN_OVERLAY;
    default: return null;
  }
}
