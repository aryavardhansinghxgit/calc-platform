import { ES_HOME_EQUITY_OVERLAY } from "./es";
import { FR_HOME_EQUITY_OVERLAY } from "./fr";
import { DE_HOME_EQUITY_OVERLAY } from "./de";
import { HI_HOME_EQUITY_OVERLAY } from "./hi";
import { PT_HOME_EQUITY_OVERLAY } from "./pt";

export function getHomeEquityOverlay(locale: string) {
  switch (locale) {
    case "es": return ES_HOME_EQUITY_OVERLAY;
    case "fr": return FR_HOME_EQUITY_OVERLAY;
    case "de": return DE_HOME_EQUITY_OVERLAY;
    case "hi": return HI_HOME_EQUITY_OVERLAY;
    case "pt": return PT_HOME_EQUITY_OVERLAY;
    default: return null;
  }
}
