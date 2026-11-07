import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { pick } from "@/lib/localize";
import type { ImageAsset, Locale } from "@/lib/types";

type DiseaseHeroImageProps = {
  image: ImageAsset;
  locale: Locale;
};

export default async function DiseaseHeroImage({
  image,
  locale,
}: DiseaseHeroImageProps) {
  const t = await getTranslations("DiseaseDetail");
  const caption = image.caption ? pick(image.caption, locale) : undefined;
  console.log(image);
  return (
    <figure>
      <div className="relative h-72 overflow-hidden rounded-2xl bg-line md:h-[455px]">
        <Image
          src={image.src}
          alt={pick(image.alt, locale)}
          fill
          preload={true}
          className="object-cover"
          sizes="(min-width: 1024px) 55vw, 100vw"
        />
      </div>
      <figcaption className="flex flex-wrap justify-between gap-2 pt-3 text-xs text-muted">
        {caption ? <span>{caption}</span> : null}
        <a
          href={image.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ms-auto underline-offset-2 hover:text-ink hover:underline"
        >
          {t("photoCredit", {
            author: image.author,
            // license: image.license,
          })}
        </a>
      </figcaption>
    </figure>
  );
}
