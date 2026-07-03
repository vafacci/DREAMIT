import Link from "next/link";
import { LogoSymbol, LogoWordmark } from "@/components/ui/Logo";
import {
  CONTACT_EMAIL,
  CTA_PRIMARY,
  CTA_PRIMARY_HREF,
  NAV_LINKS,
  SITE_NAME,
} from "@/lib/constants";

export function Footer() {
  return (
    <footer id="kontakt" className="border-t border-dream-border bg-dream-bg py-12 text-dream-text">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-8">
          <div>
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-3"
              aria-label={SITE_NAME}
            >
              <LogoSymbol />
              <LogoWordmark />
            </Link>
            <p className="text-body max-w-xs text-dream-muted">
              Fra hobby til webshop — uden at det bliver uoverskueligt.
            </p>
          </div>

          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-dream-muted">
              Navigation
            </p>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-dream-muted transition-colors hover:text-dream-text"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-dream-muted">
              Kontakt
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm text-dream-muted transition-colors hover:text-dream-text"
            >
              {CONTACT_EMAIL}
            </a>
            <div className="mt-6">
              <Link
                href={CTA_PRIMARY_HREF}
                className="text-sm font-medium text-dream-primary-soft transition-opacity hover:opacity-80"
              >
                {CTA_PRIMARY} →
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-dream-border pt-6 text-xs text-dream-muted">
          © {new Date().getFullYear()} {SITE_NAME}. Alle rettigheder forbeholdes.
        </p>
      </div>
    </footer>
  );
}
