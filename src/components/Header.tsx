import { useEffect, useState } from "react";
import { site } from "../data/site";
import { useCart } from "../context/CartContext";
import type { View } from "../lib/router";

interface HeaderProps {
  go: (to: View, section?: string) => void;
}

const indexLinks: { label: string; section?: string; view?: View; number: string }[] = [
  { label: site.copy.nav.catalog, section: "catalog", number: "01" },
  { label: site.copy.nav.studio, section: "studio", number: "02" },
  { label: site.copy.nav.spaces, section: "in-use", number: "03" },
  { label: site.copy.nav.process, view: { kind: "process" }, number: "04" },
  { label: "Контакты", section: "call", number: "05" },
];

export default function Header({ go }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [indexOpen, setIndexOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = indexOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [indexOpen]);

  const handleLink = (item: (typeof indexLinks)[number]) => {
    setIndexOpen(false);
    if (item.view) go(item.view);
    else go({ kind: "home" }, item.section);
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-40 transition-all duration-500 ${
          scrolled
            ? "hairline-t bg-[var(--paper)]/95 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-10 md:py-5">
          {/* Brand */}
          <button
            onClick={() => {
              setIndexOpen(false);
              go({ kind: "home" });
            }}
            className="text-left"
          >
            <div className="font-serif-display text-lg font-semibold leading-none tracking-tight">
              {site.brand.name}
            </div>
            <div className="mt-1 hidden text-[9px] font-medium uppercase tracking-[0.24em] text-[var(--muted)] sm:block">
              {site.brand.roman}
            </div>
          </button>

          {/* Center nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            {indexLinks.slice(0, 4).map((item) => (
              <button
                key={item.number}
                onClick={() => handleLink(item)}
                className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--ink)] transition-colors hover:text-[var(--accent)]"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3 md:gap-5">
            <a
              href={site.phoneHref}
              className="hidden text-[11px] font-medium uppercase tracking-[0.14em] transition-colors hover:text-[var(--accent)] md:block"
            >
              {site.phone}
            </a>
            <button
              onClick={() => setIsOpen(true)}
              className="hairline relative flex h-9 items-center gap-2 border px-4 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors hover:border-[var(--ink)]"
            >
              Корзина
              <span
                className={`flex h-5 min-w-5 items-center justify-center px-1 text-[10px] font-semibold ${
                  totalItems > 0
                    ? "bg-[var(--accent)] text-[var(--paper)]"
                    : "bg-[var(--paper-deep)] text-[var(--muted)]"
                }`}
              >
                {totalItems}
              </span>
            </button>
            <button
              onClick={() => setIndexOpen(true)}
              className="flex h-9 items-center border border-[var(--ink)] px-4 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
            >
              {site.copy.nav.open}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen index */}
      {indexOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[var(--paper)]">
          <div className="flex items-center justify-between px-5 py-4 md:px-10 md:py-5">
            <div className="text-[9px] font-medium uppercase tracking-[0.24em] text-[var(--muted)]">
              {site.brand.roman} — {site.brand.edition}
            </div>
            <button
              onClick={() => setIndexOpen(false)}
              className="flex h-9 items-center border border-[var(--ink)] px-4 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
            >
              {site.copy.nav.close}
            </button>
          </div>

          <nav className="hairline-t mx-auto w-full max-w-[1440px] flex-1 overflow-y-auto px-5 md:px-10">
            <ul className="divide-y divide-[var(--hairline)]">
              {indexLinks.map((item) => (
                <li key={item.number}>
                  <button
                    onClick={() => handleLink(item)}
                    className="group flex w-full items-baseline justify-between py-6 text-left md:py-8"
                  >
                    <span className="flex items-baseline gap-5 md:gap-8">
                      <span className="text-[11px] font-medium tracking-[0.2em] text-[var(--accent)]">
                        {item.number}
                      </span>
                      <span className="font-serif-display text-3xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">
                        {item.label}
                      </span>
                    </span>
                    <span className="text-2xl text-[var(--accent)] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 md:pr-4 md:opacity-0 md:group-hover:-translate-x-2">
                      →
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-1 py-10 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--muted)] md:flex-row md:items-center md:gap-10">
              <a href={site.phoneHref} className="hover:text-[var(--accent)]">
                {site.phone}
              </a>
              <span>Ежедневно 08:00 — 22:00</span>
              <span>Москва и область</span>
            </div>
          </nav>

          <div className="hairline-t px-5 py-5 md:px-10">
            <p className="font-serif-display text-sm italic text-[var(--muted)]">
              {site.brand.strapline}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
