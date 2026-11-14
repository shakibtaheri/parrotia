"use client";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { IconContext } from "react-icons";

import Container from "../Container";

export default function DiseaseStickyNav() {
  const translate = useTranslations("StickyNav");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const arrowRef = useRef(null);
  return (
    <>
      <nav
        aria-label={translate("heading")}
        className="sticky top-18 z-10 max-w-full bg-forest text-white grid grid-cols-2   p-4 md:px-4"
      >
        <div className="justify-self-center self-center md:justify-self-start">
          <span>{translate("heading")}</span>
        </div>

        {/* Desktop stickyNav */}
        <div className="hidden md:flex md:gap-4 md:justify-self-end   ">
          <a href="#identification">{translate("identification")}</a>
          <a href="#diseaseCycle">{translate("diseaseCycle")}</a>
          <a href="#management">{translate("management")}</a>
          <a href="#relatedDisease">{translate("relatedDisease")}</a>
          <a href="#Source">{translate("Source")}</a>
        </div>

        {/* Mobile stickyNav */}
        <div className="max-w-full justify-self-end self-center">
          <button
            ref={arrowRef}
            type="button"
            className=" h-10 w-10 items-center justify-center rounded-md text-ink hover:bg-line md:hidden"
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
      </nav>
      {isMenuOpen && (
        <div
          id="mobile-nav"
          inert={!isMenuOpen}
          className={`overflow-hidden border-t border-line transition-all duration-200 motion-reduce:transition-none md:hidden  ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <Container className="md:hidden py-4">
            <div className="flex flex-col gap-1">
              <a href="#identification">{translate("identification")}</a>
              <a href="#diseaseCycle">{translate("diseaseCycle")}</a>
              <a href="#management">{translate("management")}</a>
              <a href="#relatedDisease">{translate("relatedDisease")}</a>
              <a href="#Source">{translate("Source")}</a>
            </div>
          </Container>
        </div>
      )}
    </>
  );
}
