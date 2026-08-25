import { site } from "../data/site";
import type { View } from "../lib/router";

interface FooterProps {
  go: (to: View, section?: string) => void;
}

export default function Footer({ go }: FooterProps) {
  return (
    <footer className="hairline-t">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <button onClick={() => go({ kind: "home" })} className="text-left">
              <div className="font-serif-display text-3xl font-semibold tracking-tight">
                {site.brand.name}
              </div>
              <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--muted)]">
                {site.brand.roman}
              </div>
            </button>
            <p className="font-serif-display mt-6 max-w-sm text-lg italic leading-snug text-[var(--muted)]">
              {site.brand.strapline}
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--muted)]">
              Разделы
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { label: site.copy.nav.catalog, section: "catalog" },
                { label: site.copy.nav.studio, section: "studio" },
                { label: site.copy.nav.spaces, section: "in-use" },
              ].map((l) => (
                <li key={l.section}>
                  <button
                    onClick={() => go({ kind: "home" }, l.section)}
                    className="transition-colors hover:text-[var(--accent)]"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => go({ kind: "process" })}
                  className="transition-colors hover:text-[var(--accent)]"
                >
                  {site.copy.nav.process}
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--muted)]">
              Контакты
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={site.phoneHref}
                  className="font-medium transition-colors hover:text-[var(--accent)]"
                >
                  {site.phone}
                </a>
              </li>
              <li className="text-[var(--muted)]">Ежедневно 08:00 — 22:00</li>
              <li className="text-[var(--muted)]">Москва и область, выезд по городам</li>
              <li>
                <a
                  href="mailto:hello@potok-i-montazh.ru"
                  className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                >
                  hello@potok-i-montazh.ru
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline-t mt-14 flex flex-col gap-2 pt-6 text-[11px] uppercase tracking-[0.14em] text-[var(--muted)] md:flex-row md:items-center md:justify-between">
          <p>{site.footer}</p>
          <p>{site.brand.edition}</p>
        </div>
      </div>
    </footer>
  );
}
