import type { Disease } from "./types";
import powderyMildew from "@/data/diseases/fungus/powdery-mildow.json";

const diseases = [powderyMildew] as Disease[];

export function getAllDiseases(): Disease[] {
  return diseases.filter((disease) => disease.status === "published");
}

export function getDiseaseBySlug(slug: string): Disease | undefined {
  return getAllDiseases().find((disease) => disease.slug === slug);
}

// Only returns related diseases that actually exist, so there are no broken links.
export function getRelatedDiseases(disease: Disease): Disease[] {
  return disease.relatedSlugs
    .map((slug) => getAllDiseases().find((d) => d.slug === slug))
    .filter((d): d is Disease => d !== undefined);
}
