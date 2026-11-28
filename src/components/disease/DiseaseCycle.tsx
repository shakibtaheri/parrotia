import type { Disease, Locale } from "@/lib/types";
import Container from "../Container";
import { getTranslations } from "next-intl/server";
import { pick } from "@/lib/localize";
import Image from "next/image";

type DiseaseCycleProps = {
  disease: Disease;
  locale: Locale;
};

export default async function DiseaseCycle({
  disease,
  locale,
}: DiseaseCycleProps) {
  const translate = await getTranslations("DiseaseCycle");
  const { cycle } = disease;
  console.log(cycle.steps.length);
  return (
    <section
      id="diseaseCycle"
      aria-labelledby="cycle-heading"
      className="border-t border-line"
    >
      <Container className="py-16 md:py-24">
        <div className="max-w-3xl">
          <header className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-forest rtl:tracking-normal">
                {translate("eyebrow")}
              </p>
              <h2
                id="cycle-heading"
                className=" mt-3 font-serif text-3xl font-medium tracking-tight text-ink rtl:tracking-normal sm:text-4xl md:text-5xl"
              >
                {translate("heading")}
              </h2>
            </div>
            <span
              aria-hidden="true"
              className="shrink-0 select-none font-serif text-3xl leading-none text-line sm:text-4xl md:text-5xl"
            >
              {translate("sectionNumber")}
            </span>
          </header>

          <p className="mt-8 max-w-prose font-serif text-xl leading-relaxed text-ink md:text-2xl">
            {pick(cycle.lead, locale)}
          </p>

          <div className="mt-12 rounded-2xl border border-line bg-paper p-6 sm:p-8 md:mt-14">
            <ol
              role="list"
              className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-5 lg:gap-0"
            >
              {cycle.steps.map((step, index) => (
                <li
                  key={index}
                  className="relative flex flex-col items-center text-center before:absolute before:inset-s-1/2 before:top-5 before:hidden before:h-px before:w-full before:bg-line  before:content-[''] lg:before:block lg:last:before:hidden"
                >
                  <span
                    aria-hidden="true"
                    className="relative  flex size-10 items-center justify-center rounded-full border border-forest/30 bg-paper text-xs font-medium text-forest"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 font-serif text-lg font-semibold tracking-tight text-ink rtl:tracking-normal">
                    {pick(step.title, locale)}
                  </p>
                  <span className="mt-1.5 text-xs leading-relaxed text-muted">
                    {pick(step.text, locale)}
                  </span>
                </li>
              ))}
              {cycle.image && (
                <li className="relative flex flex-col items-center text-center">
                  <div className="group relative">
                    <button
                      type="button"
                      aria-label={pick(cycle.image.alt, locale)}
                      className="relative flex size-10 items-center justify-center
                   rounded-full border border-forest/30 bg-paper
                   text-xs font-medium text-forest cursor-pointer"
                    >
                      {String(cycle.steps.length + 1).padStart(2, "0")}
                    </button>
                    <div
                      className={`hidden invisible absolute ${locale === "en" ? "lg:left-100" : "lg:-left-100"} lg:-bottom-60 
                      aspect-5/4 w-120 -translate-x-1/2 overflow-hidden
                      rounded-xl border border-line bg-paper opacity-0 shadow-lg
                      transition lg:block
                      group-hover:visible group-hover:opacity-100
                      group-focus-within:visible group-focus-within:opacity-100`}
                    >
                      <Image
                        src={cycle.image.src}
                        alt={pick(cycle.image.alt, locale)}
                        fill
                        className="object-contain"
                        loading="eager"
                        sizes="(min-width: 1024px) 35vw, (min-width: 768px) 45vw, 100vw"
                      />
                    </div>
                  </div>
                  <p className="mt-4 font-serif text-lg font-semibold tracking-tight text-ink rtl:tracking-normal ">
                    {pick(cycle.image.caption, locale)}
                  </p>
                  <span className="mt-1.5 text-xs leading-relaxed text-muted">
                    {pick(cycle.image.text, locale)}
                  </span>
                </li>
              )}
            </ol>
          </div>

          <p className="mt-10 leading-relaxed text-muted md:mt-12 md:text-base">
            {pick(cycle.body, locale)}
          </p>
        </div>
      </Container>
    </section>
  );
}
