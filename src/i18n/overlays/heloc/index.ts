import { ES_HELOC_OVERLAY } from "./es";
import { FR_HELOC_OVERLAY } from "./fr";
import { DE_HELOC_OVERLAY } from "./de";
import { HI_HELOC_OVERLAY } from "./hi";
import { PT_HELOC_OVERLAY } from "./pt";

export function getHelocOverlay(locale: string) {
  switch (locale) {
    case "es": return ES_HELOC_OVERLAY;
    case "fr": return FR_HELOC_OVERLAY;
    case "de": return DE_HELOC_OVERLAY;
    case "hi": return HI_HELOC_OVERLAY;
    case "pt": return PT_HELOC_OVERLAY;
    default: return null;
  }
}
