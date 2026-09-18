import { Locale } from "@/i18n/types";

export type ArchitectureType = "GENERIC_SCHEMA" | "BESPOKE" | "HYBRID";

export type PublicationState =
  | "DRAFT"
  | "DISCOVERED"
  | "TRANSLATING"
  | "GENERATED"
  | "VERIFIED"
  | "PUBLISHED";

export interface SurfaceField {
  name: string;
  type: string;
  label?: string;
  description?: string;
  unit?: string;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
}

export interface LocalizableSurfaces {
  slug: string;
  architectureType: ArchitectureType;
  page: {
    title: string;
    description: string;
    h1?: string;
    category: string;
  };
  ui: {
    inputs: SurfaceField[];
    outputs: SurfaceField[];
    actions: string[];
    modals: string[];
    tabs: string[];
    tooltips: string[];
  };
  childComponents: {
    name: string;
    type: string;
    discoveredStrings: string[];
  }[];
  content: {
    hasEducationalPack: boolean;
    sectionsCount: number;
    sectionHeadings: string[];
    formulasCount: number;
    tablesCount: number;
    examplesCount: number;
  };
  faq: {
    source: "definition" | "pack" | "none";
    count: number;
    questions: string[];
  };
  seo: {
    title: string;
    description: string;
    keywords?: string[];
  };
}

export interface ReadinessScorecard {
  slug: string;
  architectureDiscovered: boolean;
  rendererCompatible: boolean;
  uiSurfacesDiscovered: boolean;
  contentDiscovered: boolean;
  faqDiscovered: boolean;
  enginePure: boolean;
  localeFormattingReady: boolean;
  seoReady: boolean;
  browserVerificationReady: boolean;
  overallReadiness: "READY" | "PARTIAL" | "NOT_READY";
  score: number; // 0 to 100
  blockers: string[];
}

export interface ContentParityMetrics {
  locale: Locale;
  sectionsCount: number;
  headingsCount: { h2: number; h3: number; h4: number };
  formulasCount: number;
  examplesCount: number;
  tablesCount: number;
  comparisonsCount: number;
  faqsCount: number;
  wordCount: number;
  charCount: number;
  substantiveParityPass: boolean;
  missingBlocks: string[];
}

export interface LocalizationCommandPlan {
  command: string;
  targetCalculators: string[];
  targetLocales: Locale[];
  architectureSummary: Record<ArchitectureType, string[]>;
  executionPhases: string[];
  estimatedSurfacesCount: number;
}

export interface LocalizationResult {
  slug: string;
  locale: Locale;
  state: PublicationState;
  architecture: ArchitectureType;
  uiPass: boolean;
  contentPass: boolean;
  faqPass: boolean;
  mathPass: boolean;
  seoPass: boolean;
  domLeakagePass: boolean;
  sitemapPass: boolean;
  errors: string[];
  warnings: string[];
}

export type ExecutionStageName =
  | "COMMAND_RECEIVED"
  | "TARGET_RESOLVED"
  | "LOCALE_RESOLVED"
  | "ARCHITECTURE_DISCOVERED"
  | "SURFACES_DISCOVERED"
  | "READINESS_CHECKED"
  | "RESOURCES_GENERATED"
  | "RESOURCES_REGISTERED"
  | "CONTENT_VALIDATED"
  | "UI_RENDERED"
  | "DOM_AUDIT"
  | "MATH_AUDIT"
  | "SEO_AUDIT"
  | "SITEMAP_AUDIT"
  | "BROWSER_AUDIT"
  | "PUBLICATION_APPROVED"
  | "PUBLISHED";

export type StageStatus = "PASS" | "FAIL" | "SKIPPED" | "INFO";

export interface ExecutionStageTrace {
  stage: ExecutionStageName;
  status: StageStatus;
  inputs?: any;
  outputs?: any;
  filesChanged?: string[];
  verificationResult?: string;
  timestamp: string;
  error?: string;
}

export interface ExecutionTrace {
  command: string;
  mode: "dry-run" | "execute";
  slug: string;
  locale: Locale;
  architecture: ArchitectureType;
  stages: ExecutionStageTrace[];
  beforeState: {
    publicationState: PublicationState;
    hasOverlay: boolean;
    hasContentPack: boolean;
    isPublishedInMatrix: boolean;
  };
  afterState: {
    publicationState: PublicationState;
    hasOverlay: boolean;
    hasContentPack: boolean;
    isPublishedInMatrix: boolean;
  };
  filesChanged: string[];
  overallStatus: "SUCCESS" | "BLOCKED" | "FAILED" | "IDEMPOTENT";
  publishedUrl?: string;
}

export interface LocalizationExecutionReport {
  command: string;
  mode: "dry-run" | "execute";
  success: boolean;
  traces: ExecutionTrace[];
  summary: {
    totalRequested: number;
    passed: number;
    failed: number;
    blocked: number;
    idempotent: number;
  };
}

