export type Locale = "en" | "fa";

// Text in several languages.
export type Localized<T = string> = { en: T; fa?: T };

export type PathogenType =
  | "fungus"
  | "oomycete"
  | "bacterium"
  | "virus"
  | "nematode"
  | "insect"
  | "mite"
  | "abiotic";

export type Severity = "low" | "moderate" | "high";

export type PlantPart =
  | "leaves"
  | "stems"
  | "buds"
  | "flowers"
  | "fruit"
  | "roots";

export interface ImageAsset {
  src: string; // path inside /public
  alt: Localized;
  caption?: Localized;
  author: string;
  license: string;
  sourceUrl: string;
}

export interface ManagementMethod {
  intro: Localized;
  items: Localized<string[]>;
}

export interface Source {
  title: string;
  publisher: string;
  url: string;
  year?: number;
}

export interface Disease {
  slug: string; // unique, English, used in URLs for every locale
  code: string; // e.g. "PM-01"
  status: "draft" | "published";
  name: Localized;
  pathogenType: PathogenType;
  pathogenName: string; // scientific name, same in every language
  summary: Localized;
  severity: Severity;
  hosts: Localized<string[]>;
  plantParts: PlantPart[];
  favorableConditions: Localized;
  heroImage: ImageAsset;

  identification: {
    lead: Localized;
    body: Localized;
    diagnosticNote: Localized;
    image: ImageAsset;
    keySigns: Localized<string[]>;
  };

  cycle: {
    lead: Localized;
    steps: { title: Localized; text: Localized }[];
    body: Localized;
  };

  management: {
    lead: Localized;
    cultural: ManagementMethod;
    biological: ManagementMethod;
    chemical: ManagementMethod;
    warning: { title: Localized; text: Localized };
  };

  relatedSlugs: string[];
  sources: Source[];
  author: { name: string; credentials: string };
  updatedAt: string; // ISO date, e.g. "2026-10-18"
}
