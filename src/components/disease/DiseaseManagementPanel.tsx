"use client";
import { CheckIcon } from "@/components/icons";
import { useState } from "react";
import { pick } from "@/lib/localize";
import { Disease, Locale } from "@/lib/types";

type DiseaseManagementProps = { disease: Disease; locale: Locale };

export default function DiseaseManagementPanel({
  disease,
  locale,
}: DiseaseManagementProps) {
  const [selectIndex, setSelectIndex] = useState(0);
  const { management } = disease;

  const manageMethods = [
    management.cultural,
    management.biological,
    management.chemical,
  ] as const;

  const selectedMethod = manageMethods[selectIndex];
  return (
    <>
      <div
        role="tablist"
        aria-label="Management methods"
        className="flex  overflow-hidden rounded-t-2xl border border-line bg-paper"
      >
        {manageMethods.map((disease, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            id="management-tab-cultural"
            aria-selected={index === selectIndex}
            aria-controls="management-panel"
            tabIndex={index === selectIndex ? 0 : -1}
            onClick={() => setSelectIndex(index)}
            className={`flex flex-1 items-center justify-center border-b border-line bg-forest px-6 py-4 text-sm font-semibold text-white transition-colors focus-visible:outline-offset-[-3px] sm:border-b-0 sm:border-e ${index === selectIndex ? "bg-muted" : ""}`}
          >
            {pick(disease.title, locale)}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id="management-panel"
        aria-labelledby="management-tab-cultural"
        tabIndex={0}
        className=" rounded-b-2xl border border-line bg-paper p-6 sm:p-8 md:p-10 border-t-0"
      >
        <div>
          <h3 className="mt-5 max-w-prose  text-muted">
            {pick(selectedMethod.intro, locale)}
          </h3>

          <ul role="list" className="mt-7 space-y-4">
            {pick(selectedMethod.items, locale).map((item, index) => (
              <li className="flex gap-3" key={index}>
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-soft-green text-forest">
                  <CheckIcon className="size-3" aria-hidden="true" />
                </span>
                <span className="text-sm leading-relaxed text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
