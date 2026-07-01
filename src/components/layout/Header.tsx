"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { LogoSymbol, LogoWordmark } from "@/components/ui/Logo";
import {
  CTA_PRIMARY,
  CTA_PRIMARY_HREF,
  CTA_SECONDARY,
  CTA_SECONDARY_HREF,
  NAV_LINKS,
  SITE_NAME,
} from "@/lib/constants";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 overflow-hidden bg-black text-white">
      <div className="container-site relative flex h-16 items-center lg:h-20">
        {/* Symbol + desktop navigation — venstre */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="inline-flex shrink-0 items-center"
            onClick={() => setMenuOpen(false)}
            aria-label={SITE_NAME}
          >
            <LogoSymbol />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Hovednavigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[14px] text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* DREAMit — centreret */}
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center"
          onClick={() => setMenuOpen(false)}
          aria-label={SITE_NAME}
        >
          <LogoWordmark />
        </Link>

        {/* Desktop CTAs + mobil menu — højre */}
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden items-center gap-3 lg:flex">
            <Button
              href={CTA_SECONDARY_HREF}
              variant="secondary-inverted"
              className="min-h-[44px] px-6 text-[14px]"
            >
              {CTA_SECONDARY}
            </Button>
            <Button href={CTA_PRIMARY_HREF} className="min-h-[44px] px-6 text-[14px]">
              {CTA_PRIMARY}
            </Button>
          </div>

          <button
            type="button"
            className="text-[14px] font-medium tracking-wide text-white lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Luk menu" : "Åbn menu"}
          >
            {menuOpen ? "Luk" : "Menu"}
          </button>
        </div>
      </div>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-16 z-40 flex flex-col bg-black text-white lg:hidden"
        >
          <nav className="flex flex-1 flex-col gap-1 px-5 pt-8" aria-label="Mobilnavigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-heading border-b border-white/10 py-5 text-3xl leading-none tracking-tight text-white"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 border-t border-white/10 p-5 pb-10">
            <Button
              href={CTA_PRIMARY_HREF}
              className="w-full"
              onClick={() => setMenuOpen(false)}
            >
              {CTA_PRIMARY}
            </Button>
            <Button
              href={CTA_SECONDARY_HREF}
              variant="secondary-inverted"
              className="w-full"
              onClick={() => setMenuOpen(false)}
            >
              {CTA_SECONDARY}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
