"use client";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { IconContext } from "react-icons";

import Container from "../Container";

export default function DiseaseStickyNav() {
  const translate = useTranslations("StickyNav");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      aria-label={translate("heading")}
      className="sticky top-18 md:top-20.5 z-10  bg-forest text-white grid"
    >
      <div className="min-h-12 flex items-center justify-between gap-4 px-4 sm:px-10 lg:px-32">
        <span>{translate("heading")}</span>

        {/* Desktop stickyNav links*/}
        <div className="hidden md:flex items-center gap-6">
          <a href="#identification">{translate("identification")}</a>
          <a href="#diseaseCycle">{translate("diseaseCycle")}</a>
          <a href="#management">{translate("management")}</a>
          <a href="#relatedDisease">{translate("relatedDisease")}</a>
          <a href="#Source">{translate("Source")}</a>
        </div>

        {/* Mobile stickyNav */}

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center md:hidden transition-all duration-200"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          aria-label={
            isMenuOpen ? translate("closeMenu") : translate("openMenu")
          }
        >
          <IconContext.Provider value={{ color: "white" }}>
            {isMenuOpen ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
          </IconContext.Provider>
        </button>
      </div>

      <div
        id="mobile-nav"
        inert={!isMenuOpen}
        className={`overflow-hidden border-t border-white/20 transition-all duration-200 md:hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Container className="py-4">
          <div className="flex flex-col gap-1">
            <a href="#identification">{translate("identification")}</a>
            <a href="#diseaseCycle">{translate("diseaseCycle")}</a>
            <a href="#management">{translate("management")}</a>
            <a href="#relatedDisease">{translate("relatedDisease")}</a>
            <a href="#Source">{translate("Source")}</a>
          </div>
        </Container>
      </div>
    </nav>
  );
}
