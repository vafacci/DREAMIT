"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PrimaryBannerButton } from "@/components/ui/PrimaryBannerButton";
import { Button } from "@/components/ui/Button";
import { LogoSymbol } from "@/components/ui/Logo";
import {
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
    <header className="sticky top-0 z-50 overflow-hidden bg-dream-bg/90 text-dream-text backdrop-blur-md">
      <div className="container-site flex h-16 items-center justify-between lg:h-20">
        {/* Symbol + desktop navigation — venstre */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="inline-flex h-8 items-center lg:h-9"
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
                className="text-[14px] text-dream-muted transition-colors hover:text-dream-text"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop CTAs + mobil menu — højre */}
        <div className="flex items-center justify-end gap-3">
          <div className="hidden items-center gap-3 lg:flex">
            <Button href={CTA_SECONDARY_HREF} variant="secondary-inverted">
              {CTA_SECONDARY}
            </Button>
            <PrimaryBannerButton />
          </div>

          <button
            type="button"
            className="inline-flex h-8 items-center text-[14px] font-medium tracking-wide text-dream-text lg:hidden lg:h-9"
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
          className="fixed inset-0 top-16 z-40 flex flex-col border-t border-dream-border bg-dream-bg text-dream-text lg:hidden"
        >
          <nav className="flex flex-1 flex-col gap-1 px-5 pt-8" aria-label="Mobilnavigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-heading border-b border-dream-border py-5 text-3xl leading-none tracking-tight text-dream-text"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 border-t border-dream-border p-5 pb-10">
            <PrimaryBannerButton
              className="w-full max-w-none"
              onClick={() => setMenuOpen(false)}
            />
            <Button
              href={CTA_SECONDARY_HREF}
              variant="secondary-inverted"
              className="w-full max-w-none"
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
