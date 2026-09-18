import { Locale } from "@/i18n/types";
import { isLocalePublished } from "@/i18n/publishing";
import { PublicationState } from "./types";

const STATE_HIERARCHY: Record<PublicationState, number> = {
  DRAFT: 0,
  DISCOVERED: 1,
  TRANSLATING: 2,
  GENERATED: 3,
  VERIFIED: 4,
  PUBLISHED: 5,
};

export class PublicationStateMachine {
  /**
   * Determine if a state transition is valid according to strict lifecycle rules.
   */
  public static canTransition(from: PublicationState, to: PublicationState): boolean {
    if (from === to) return true;
    // Can always drop back to DRAFT upon regression or failure
    if (to === "DRAFT") return true;
    // Forward progression must be step-by-step
    return STATE_HIERARCHY[to] === STATE_HIERARCHY[from] + 1;
  }

  /**
   * Get current publication state for a calculator/locale.
   */
  public static getState(slug: string, locale: Locale): PublicationState {
    const published = isLocalePublished(locale, slug);
    if (published) return "PUBLISHED";
    return "DRAFT";
  }

  /**
   * Evaluates if all verification checks pass to permit transition to PUBLISHED.
   */
  public static isEligibleForPublication(checks: {
    uiPass: boolean;
    contentPass: boolean;
    faqPass: boolean;
    mathPass: boolean;
    seoPass: boolean;
    domLeakagePass: boolean;
    sitemapPass: boolean;
  }): boolean {
    return (
      checks.uiPass &&
      checks.contentPass &&
      checks.faqPass &&
      checks.mathPass &&
      checks.seoPass &&
      checks.domLeakagePass &&
      checks.sitemapPass
    );
  }
}
