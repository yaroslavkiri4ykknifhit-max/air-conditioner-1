import { site } from "../data/site";
import type { View } from "../lib/router";
import Reveal from "./Reveal";

interface CasePageProps {
  slug: string;
  go: (to: View, section?: string) => void;
}

export default function CasePage({ slug, go }: CasePageProps) {
  const cs = site.cases.find((c) => c.slug === slug);

  if (!cs) {
    return (
      <section className="mx-auto max-w-[1440px] px-5 pb-32 pt-40 md:px-10">
        <p className="eyebrow">404</p>
        <h1 className="font-serif-display mt-6 text-4xl font-medium">
          Этот проект не входит в текущую подборку.
        </h1>
        <button onClick={() => go({ kind: "home" }, "in-use")} className="edit-link mt-10">
          ← К проектам
        </button>
      </section>
    );
  }

  const products = cs.productSlugs
    .map((s) => site.products.find((p) => p.slug === s))
    .filter(Boolean);

  return (
    <article className="mx-auto max-w-[1440px] px-5 pb-32 pt-28 md:px-10 md:pt-36">
      <Reveal>
        <button onClick={() => go({ kind: "home" }, "in-use")} className="edit-link">
          ← {site.copy.nav.back}
        </button>
      </Reveal>

      <div className="hairline-t mt-10 pt-10">
        <Reveal>
          <p className="eyebrow">В работе / 01</p>
        </Reveal>
        <Reveal delay={60}>
          <h1 className="font-serif-display mt-6 max-w-3xl text-4xl font-medium leading-tight tracking-tight md:text-6xl">
            {cs.title}
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-6 flex flex-wrap gap-x-10 gap-y-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
            <span>{cs.location}</span>
            <span>{cs.year}</span>
            <span>Монтаж завершён</span>
          </div>
        </Reveal>

        <Reveal delay={160} className="mt-12">
          <div className="img-frame aspect-[16/9] w-full">
            <img src={cs.image} alt={cs.imageAlt} />
          </div>
          <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
            {cs.title} / {cs.location}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="font-serif-display text-2xl font-medium leading-snug md:text-3xl">
                {cs.summary}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="space-y-5">
              {cs.body.map((text, i) => (
                <Reveal key={i} delay={i * 60}>
                  <p className="text-[15px] leading-relaxed text-[var(--muted)] md:text-base">
                    {text}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {products.length > 0 && (
        <section className="hairline-t mt-24 pt-10">
          <Reveal>
            <p className="eyebrow">{site.copy.detail.related}</p>
          </Reveal>
          <div className="mt-8 grid gap-x-10 sm:grid-cols-2">
            {products.map((p, i) => (
              <Reveal key={p!.slug} delay={i * 80}>
                <article className="hairline group border-t pt-5">
                  <button
                    onClick={() => go({ kind: "product", slug: p!.slug })}
                    className="block w-full text-left"
                  >
                    <div className="img-frame aspect-[4/3] w-full">
                      <img src={p!.image} alt={p!.imageAlt} />
                    </div>
                    <div className="mt-4 flex items-baseline justify-between">
                      <h3 className="font-serif-display text-xl font-semibold tracking-tight transition-colors group-hover:text-[var(--accent)]">
                        {p!.name}
                      </h3>
                      <span className="text-sm text-[var(--muted)]">{p!.subtitle}</span>
                    </div>
                  </button>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
