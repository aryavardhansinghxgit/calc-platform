import { ES_DOWN_PAYMENT_OVERLAY } from "./es";
import { FR_DOWN_PAYMENT_OVERLAY } from "./fr";
import { DE_DOWN_PAYMENT_OVERLAY } from "./de";
import { HI_DOWN_PAYMENT_OVERLAY } from "./hi";
import { PT_DOWN_PAYMENT_OVERLAY } from "./pt";

export function getDownPaymentOverlay(locale: string) {
  switch (locale) {
    case "es": return ES_DOWN_PAYMENT_OVERLAY;
    case "fr": return FR_DOWN_PAYMENT_OVERLAY;
    case "de": return DE_DOWN_PAYMENT_OVERLAY;
    case "hi": return HI_DOWN_PAYMENT_OVERLAY;
    case "pt": return PT_DOWN_PAYMENT_OVERLAY;
    default: return null;
  }
}
