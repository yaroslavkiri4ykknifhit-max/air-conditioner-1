import { site } from "../data/site";
import type { View } from "../lib/router";
import Reveal from "./Reveal";

interface ProcessPageProps {
  go: (to: View, section?: string) => void;
}

export default function ProcessPage({ go }: ProcessPageProps) {
  const { process } = site;
  return (
    <article className="mx-auto max-w-[1440px] px-5 pb-32 pt-28 md:px-10 md:pt-36">
      <Reveal>
        <button onClick={() => go({ kind: "home" })} className="edit-link">
          ← На главную
        </button>
      </Reveal>

      <div className="hairline-t mt-10 pt-10">
        <Reveal>
          <p className="eyebrow">{site.copy.home.processEyebrow}</p>
        </Reveal>
        <Reveal delay={60}>
          <h1 className="font-serif-display mt-6 max-w-3xl text-4xl font-medium leading-tight tracking-tight md:text-6xl">
            {process.title}
          </h1>
        </Reveal>

        <Reveal delay={120} className="mt-12">
          <div className="img-frame aspect-[16/8] w-full">
            <img src={process.image} alt={process.imageAlt} />
          </div>
          <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
            Изгиб магистрали / пайка под азотом
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="font-serif-display text-2xl font-medium italic leading-snug md:text-3xl">
                {process.lead}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="space-y-5">
              {process.paragraphs.map((text, i) => (
                <Reveal key={i} delay={i * 60}>
                  <p className="text-[15px] leading-relaxed text-[var(--muted)] md:text-base">
                    {text}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="hairline-t mt-20 flex flex-col gap-6 pt-10 md:flex-row md:items-center md:justify-between">
          <Reveal>
            <p className="max-w-md text-sm leading-relaxed text-[var(--muted)]">
              {site.copy.home.processBody}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <a
              href={site.phoneHref}
              className="inline-flex h-12 items-center border border-[var(--ink)] px-8 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
            >
              Задать вопрос монтажнику
            </a>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
