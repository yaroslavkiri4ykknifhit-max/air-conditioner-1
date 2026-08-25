import { useState } from "react";
import { site, formatPrice } from "../data/site";
import type { View } from "../lib/router";
import Reveal from "./Reveal";

interface HomeProps {
  go: (to: View, section?: string) => void;
}

function Hero({ go }: HomeProps) {
  const featured = site.products[0];
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-28 md:px-10 md:pt-36">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow">{site.copy.home.eyebrow} сплит-систем</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-serif-display mt-6 text-[clamp(2.6rem,6.5vw,5.2rem)] font-medium leading-[1.04] tracking-tight">
              {site.copy.home.title}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-[var(--muted)] md:text-base">
              {site.copy.home.intro}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <button
                onClick={() => go({ kind: "product", slug: featured.slug })}
                className="edit-link"
              >
                {site.copy.home.primaryCta}
                <span className="arrow">→</span>
              </button>
              <button onClick={() => go({ kind: "home" }, "catalog")} className="edit-link">
                {site.copy.home.secondaryCta}
                <span className="arrow">→</span>
              </button>
            </div>
          </Reveal>
        </div>

        <div className="hidden lg:col-span-5 lg:block">
          <Reveal delay={200} className="flex h-full flex-col justify-end">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
              {site.brand.edition}
            </p>
            <p className="font-serif-display mt-3 max-w-xs text-xl italic leading-snug text-[var(--ink)]">
              {site.brand.strapline}
            </p>
          </Reveal>
        </div>
      </div>

      {/* Featured image */}
      <Reveal delay={120} className="mt-12 md:mt-16">
        <button
          onClick={() => go({ kind: "product", slug: featured.slug })}
          className="group block w-full text-left"
        >
          <div className="img-frame aspect-[16/8.5] w-full md:aspect-[16/7]">
            <img src="images/hero-unit.jpg" alt={featured.imageAlt} />
          </div>
          <div className="hairline-t mt-0 flex items-center justify-between pt-4">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
              {site.copy.home.heroCaption}
            </span>
            <span className="hidden text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--accent)] transition-transform duration-500 group-hover:translate-x-1 sm:block">
              Смотреть →
            </span>
          </div>
        </button>
      </Reveal>
    </section>
  );
}

function Principles() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="eyebrow">{site.copy.home.principlesEyebrow}</p>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <Reveal delay={80}>
            <h2 className="font-serif-display max-w-2xl text-3xl font-medium leading-tight tracking-tight md:text-[2.6rem]">
              {site.copy.home.principlesTitle}
            </h2>
          </Reveal>
        </div>
      </div>

      <div className="hairline mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {site.principles.map((p, i) => (
          <Reveal
            key={p.number + p.title}
            delay={i * 90}
            className={`hairline p-6 md:p-8 ${
              i % 2 === 1 ? "sm:border-l" : ""
            } ${i > 0 ? "sm:border-t lg:border-t-0" : ""} ${
              i > 0 ? "lg:border-l" : ""
            }`}
          >
            <div className="font-serif-display text-5xl font-medium text-[var(--accent)] md:text-6xl">
              {p.number}
            </div>
            <h3 className="font-serif-display mt-5 text-lg font-semibold leading-snug">
              {p.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{p.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Collection({ go }: HomeProps) {
  const [active, setActive] = useState("all");
  const filtered =
    active === "all"
      ? site.products
      : site.products.filter((p) => p.category === active);

  return (
    <section id="catalog" className="hairline-t bg-[var(--paper-deep)]">
      <div className="mx-auto max-w-[1440px] scroll-mt-20 px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow">{site.copy.home.collectionEyebrow}</p>
            </Reveal>
          </div>
          <div className="flex items-end justify-between gap-6 lg:col-span-8">
            <Reveal delay={80}>
              <h2 className="font-serif-display max-w-xl text-3xl font-medium leading-tight tracking-tight md:text-[2.6rem]">
                {site.copy.home.collectionTitle}
              </h2>
            </Reveal>
          </div>
        </div>

        {/* Filters */}
        <Reveal delay={120}>
          <div className="hairline-t mt-12 flex flex-wrap gap-x-8 gap-y-3 pt-5">
            {site.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`group flex items-baseline gap-2 pb-1 text-[12px] font-medium uppercase tracking-[0.16em] transition-colors ${
                  active === cat.id ? "text-[var(--accent)]" : "text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
              >
                <span className="text-[10px]">{cat.number}</span>
                {cat.name}
                <span
                  className={`h-px transition-all duration-500 ${
                    active === cat.id
                      ? "w-8 bg-[var(--accent)]"
                      : "w-4 bg-transparent group-hover:w-8 group-hover:bg-[var(--muted)]"
                  }`}
                />
              </button>
            ))}
          </div>
        </Reveal>

        {/* Products table-like grid */}
        <div className="mt-2 grid gap-x-10 md:grid-cols-2">
          {filtered.map((product, i) => (
            <Reveal key={product.slug} delay={(i % 2) * 90}>
              <article className="hairline group border-t pt-6">
                <button
                  onClick={() => go({ kind: "product", slug: product.slug })}
                  className="block w-full text-left"
                >
                  <div className="img-frame aspect-[4/3] w-full">
                    <img src={product.image} alt={product.imageAlt} />
                  </div>
                  <div className="mt-5 flex items-baseline justify-between">
                    <div className="flex items-baseline gap-4">
                      <span className="text-[11px] font-medium tracking-[0.2em] text-[var(--accent)]">
                        {product.number}
                      </span>
                      <h3 className="font-serif-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-[var(--accent)] md:text-[1.7rem]">
                        {product.name}
                      </h3>
                    </div>
                    <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--muted)] sm:block">
                      {product.en}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
                    {product.subtitle}
                  </p>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--muted)]">
                    {product.summary}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-base font-medium tracking-wide">
                      {formatPrice(product.price)}
                      {product.oldPrice && (
                        <span className="ml-2 text-sm text-[var(--muted)] line-through">
                          {formatPrice(product.oldPrice)}
                        </span>
                      )}
                    </span>
                    <span className="edit-link">
                      Смотреть <span className="arrow">→</span>
                    </span>
                  </div>
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Studio() {
  return (
    <section id="studio" className="mx-auto max-w-[1440px] scroll-mt-20 px-5 py-24 md:px-10 md:py-32">
      <div className="grid items-start gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <div className="img-frame aspect-[4/5] w-full">
              <img src="images/studio-workshop.jpg" alt="Мастерская: макет трассы и инструменты" />
            </div>
            <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
              Макет трассы / проверка до сверловки
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow">{site.copy.home.studioEyebrow}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-serif-display mt-6 text-3xl font-medium leading-tight tracking-tight md:text-[2.6rem]">
              {site.copy.home.studioTitle}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[var(--muted)]">
              {site.copy.home.studioBody}
            </p>
          </Reveal>

          {/* Six promises */}
          <Reveal delay={200}>
            <div className="mt-12">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
                Вы получите
              </p>
              <ul className="hairline-t mt-4">
                {site.promises.map((promise, i) => (
                  <li
                    key={promise}
                    className="flex items-baseline gap-5 border-b border-[var(--hairline)] py-4"
                  >
                    <span className="text-[11px] font-medium tracking-[0.2em] text-[var(--muted)]">
                      0{i + 1}
                    </span>
                    <span className="text-[15px] leading-snug md:text-base">{promise}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InUse({ go }: HomeProps) {
  const [cs] = site.cases;
  return (
    <section id="in-use" className="hairline-t bg-[var(--paper-deep)]">
      <div className="mx-auto max-w-[1440px] scroll-mt-20 px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow">{site.copy.home.spaceEyebrow}</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-serif-display mt-6 max-w-md text-3xl font-medium leading-tight tracking-tight md:text-[2.6rem]">
                {site.copy.home.spaceTitle}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={120}>
              <article
                className="hairline group cursor-pointer border border-[var(--hairline)] bg-[var(--paper)] p-4 md:p-6"
                onClick={() => go({ kind: "case", slug: cs.slug })}
              >
                <div className="img-frame aspect-[16/9] w-full">
                  <img src={cs.image} alt={cs.imageAlt} />
                </div>
                <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <div className="flex items-baseline gap-4">
                      <span className="text-[11px] font-medium tracking-[0.2em] text-[var(--accent)]">
                        01
                      </span>
                      <h3 className="font-serif-display text-2xl font-semibold tracking-tight md:text-3xl">
                        {cs.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
                      {cs.location} · {cs.year}
                    </p>
                    <p className="mt-4 max-w-lg text-sm leading-relaxed text-[var(--muted)]">
                      {cs.summary}
                    </p>
                  </div>
                  <span className="edit-link shrink-0">
                    Смотреть проект <span className="arrow">→</span>
                  </span>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessPreview({ go }: HomeProps) {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="order-2 lg:order-1 lg:col-span-5">
          <Reveal>
            <p className="eyebrow">{site.copy.home.processEyebrow}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-serif-display mt-6 text-3xl font-medium leading-tight tracking-tight md:text-[2.6rem]">
              {site.copy.home.processTitle}
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-[var(--muted)]">
              {site.copy.home.processBody}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <button
              onClick={() => go({ kind: "process" })}
              className="edit-link mt-10"
            >
              Читать заметку <span className="arrow">→</span>
            </button>
          </Reveal>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-7">
          <Reveal delay={100}>
            <div className="img-frame aspect-[4/3] w-full">
              <img src="images/process-copper.jpg" alt="Изгиб фреоновой магистрали" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CallBlock() {
  return (
    <section id="call" className="bg-[var(--dark)] text-[var(--paper)]">
      <div className="mx-auto max-w-[1440px] scroll-mt-20 px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#c9a283]">
            {site.copy.home.callEyebrow}
          </p>
        </Reveal>
        <Reveal delay={80}>
          <a
            href={site.phoneHref}
            className="font-serif-display mt-8 block text-[clamp(4rem,13vw,10rem)] font-semibold leading-none tracking-tight transition-colors hover:text-[#c9a283]"
          >
            {site.copy.home.callTitle}
          </a>
        </Reveal>
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal delay={160}>
            <p className="max-w-md text-[15px] leading-relaxed text-[var(--paper)]/70">
              {site.copy.home.callBody}
            </p>
          </Reveal>
          <Reveal delay={220}>
            <a
              href={site.phoneHref}
              className="inline-flex h-14 items-center border border-[var(--paper)]/40 px-8 text-sm font-medium uppercase tracking-[0.2em] transition-colors hover:border-[var(--paper)] hover:bg-[var(--paper)] hover:text-[var(--dark)]"
            >
              {site.phone}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function Home({ go }: HomeProps) {
  return (
    <>
      <Hero go={go} />
      <Principles />
      <Collection go={go} />
      <Studio />
      <InUse go={go} />
      <ProcessPreview go={go} />
      <CallBlock />
    </>
  );
}
