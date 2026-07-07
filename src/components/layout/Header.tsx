"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { PrimaryBannerButton } from "@/components/ui/PrimaryBannerButton";
import { LogoSymbol } from "@/components/ui/Logo";
import {
  CTA_PRIMARY,
  CTA_PRIMARY_HREF,
  HEADER_QUICK_LINKS,
  MENU_SECTION_LINKS,
  SITE_NAME,
} from "@/lib/constants";

const MENU_ANIMATION_MS = 520;

const headerLinkClass =
  "text-[12px] font-medium uppercase tracking-[0.14em] text-dream-muted transition-colors hover:text-dream-text xl:text-[13px]";

export function Header() {
  const [menuMounted, setMenuMounted] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [atHero, setAtHero] = useState(true);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const closeTimer = useRef<number | null>(null);

  const openMenu = useCallback(() => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }

    setMenuMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setMenuActive(true));
    });
  }, []);

  const closeMenu = useCallback(() => {
    setMenuActive(false);
    closeTimer.current = window.setTimeout(() => {
      setMenuMounted(false);
      closeTimer.current = null;
    }, MENU_ANIMATION_MS);
  }, []);

  const toggleMenu = useCallback(() => {
    if (menuMounted) closeMenu();
    else openMenu();
  }, [closeMenu, menuMounted, openMenu]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuMounted ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuMounted]);

  useEffect(() => {
    if (!menuMounted) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeMenu, menuMounted]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (currentScrollY < 72) {
        setHeaderVisible(true);
      } else if (delta > 6) {
        setHeaderVisible(false);
      } else if (delta < -6) {
        setHeaderVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const hero = document.querySelector('[data-section="hero"]');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setAtHero(entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const headerTone = atHero ? "site-header--hero" : "site-header--scrolled";
  const showHeader = headerVisible || menuMounted;

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 transition-[transform,background-color,backdrop-filter,color] duration-300 motion-reduce:transition-none ${menuMounted ? "overflow-visible" : "overflow-hidden"} ${headerTone} ${showHeader ? "" : "site-header--hidden"}`}
    >
      <div className="container-site relative z-[70] flex h-16 items-center justify-between gap-4 lg:h-20">
        <div className="flex min-w-0 items-center gap-5 sm:gap-6 lg:gap-8">
          <Link
            href="/"
            className="inline-flex h-8 shrink-0 items-center lg:h-9"
            onClick={closeMenu}
            aria-label={SITE_NAME}
          >
            <LogoSymbol />
          </Link>

          <nav
            className="hidden items-center gap-5 sm:flex lg:gap-6"
            aria-label="Hurtignavigation"
          >
            {HEADER_QUICK_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={headerLinkClass}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            className={`inline-flex h-8 items-center text-[12px] font-medium uppercase tracking-[0.14em] text-dream-text transition-colors duration-300 lg:h-9 ${menuActive ? "text-dream-primary-soft" : ""}`}
            onClick={toggleMenu}
            aria-expanded={menuActive}
            aria-controls="site-menu"
            aria-label={menuActive ? "Luk menu" : "Åbn menu"}
          >
            {menuActive ? "LUK" : "MENU"}
          </button>

          <div className="hidden sm:block">
            <PrimaryBannerButton onClick={closeMenu} />
          </div>
        </div>
      </div>

      {menuMounted && (
        <>
          <button
            type="button"
            className={`site-header-menu__backdrop ${menuActive ? "is-active" : ""}`}
            aria-label="Luk menu"
            onClick={closeMenu}
          />

          <div
            id="site-menu"
            className={`site-header-menu ${menuActive ? "is-active" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-label="Sidenavigation"
            aria-hidden={!menuActive}
          >
            <div className="site-header-menu__inner container-site">
              <nav className="site-header-menu__sections" aria-label="Sektioner">
                {MENU_SECTION_LINKS.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="site-header-menu__section-link font-heading"
                    style={{ "--menu-item-index": index } as CSSProperties}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href={CTA_PRIMARY_HREF}
                  className="site-header-menu__cta-link font-heading"
                  style={
                    { "--menu-item-index": MENU_SECTION_LINKS.length } as CSSProperties
                  }
                  onClick={closeMenu}
                >
                  {CTA_PRIMARY}
                </Link>
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
