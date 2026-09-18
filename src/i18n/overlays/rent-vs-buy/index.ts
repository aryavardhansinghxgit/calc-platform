import { ES_RENT_VS_BUY_OVERLAY } from "./es";
import { FR_RENT_VS_BUY_OVERLAY } from "./fr";
import { DE_RENT_VS_BUY_OVERLAY } from "./de";
import { HI_RENT_VS_BUY_OVERLAY } from "./hi";
import { PT_RENT_VS_BUY_OVERLAY } from "./pt";

export function getRentVsBuyOverlay(locale: string) {
  switch (locale) {
    case "es": return ES_RENT_VS_BUY_OVERLAY;
    case "fr": return FR_RENT_VS_BUY_OVERLAY;
    case "de": return DE_RENT_VS_BUY_OVERLAY;
    case "hi": return HI_RENT_VS_BUY_OVERLAY;
    case "pt": return PT_RENT_VS_BUY_OVERLAY;
    default: return null;
  }
}
