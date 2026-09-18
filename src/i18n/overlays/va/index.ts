import { ES_VA_OVERLAY } from "./es";
import { FR_VA_OVERLAY } from "./fr";
import { DE_VA_OVERLAY } from "./de";
import { HI_VA_OVERLAY } from "./hi";
import { PT_VA_OVERLAY } from "./pt";

export function getVaOverlay(locale: string) {
  switch (locale) {
    case "es": return ES_VA_OVERLAY;
    case "fr": return FR_VA_OVERLAY;
    case "de": return DE_VA_OVERLAY;
    case "hi": return HI_VA_OVERLAY;
    case "pt": return PT_VA_OVERLAY;
    default: return null;
  }
}
