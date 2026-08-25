import { site, formatPrice, type Product } from "../data/site";
import { useCart } from "../context/CartContext";
import type { View } from "../lib/router";
import Reveal from "./Reveal";

interface ProductPageProps {
  product?: Product;
  go: (to: View, section?: string) => void;
}

function Related({ product, go }: { product: Product; go: ProductPageProps["go"] }) {
  const related = site.products.filter((p) => p.slug !== product.slug);
  return (
    <section className="hairline-t mt-24">
      <div className="pt-10">
        <Reveal>
          <p className="eyebrow">{site.copy.detail.related}</p>
        </Reveal>
        <div className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <article className="hairline group border-t pt-5">
                <button
                  onClick={() => go({ kind: "product", slug: p.slug })}
                  className="block w-full text-left"
                >
                  <div className="img-frame aspect-[4/3] w-full">
                    <img src={p.image} alt={p.imageAlt} />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between">
                    <h3 className="font-serif-display text-xl font-semibold tracking-tight transition-colors group-hover:text-[var(--accent)]">
                      {p.name}
                    </h3>
                    <span className="text-sm font-medium">{formatPrice(p.price)}</span>
                  </div>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
                    {p.subtitle}
                  </p>
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ProductPage({ product, go }: ProductPageProps) {
  const { addToCart } = useCart();

  if (!product) {
    return (
      <section className="mx-auto max-w-[1440px] px-5 pb-32 pt-40 md:px-10">
        <p className="eyebrow">404</p>
        <h1 className="font-serif-display mt-6 text-4xl font-medium">{site.copy.detail.notFound}</h1>
        <button onClick={() => go({ kind: "home" }, "catalog")} className="edit-link mt-10">
          {site.copy.detail.notFoundCta} <span className="arrow">→</span>
        </button>
      </section>
    );
  }

  const category = site.categories.find((c) => c.id === product.category);

  return (
    <article className="mx-auto max-w-[1440px] px-5 pb-32 pt-28 md:px-10 md:pt-36">
      {/* Breadcrumb / back */}
      <Reveal>
        <button onClick={() => go({ kind: "home" }, "catalog")} className="edit-link">
          ← {site.copy.nav.back}
        </button>
      </Reveal>

      <div className="hairline-t mt-10 grid gap-12 pt-10 lg:grid-cols-12">
        {/* Left: image + story */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow">
              {category?.en ?? "OBJECT"} / {product.number}
            </p>
          </Reveal>
          <Reveal delay={60}>
            <div className="mt-8 img-frame aspect-[4/3] w-full">
              <img src={product.image} alt={product.imageAlt} />
            </div>
            <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
              {product.name} / {product.subtitle}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="font-serif-display mt-14 text-xl font-semibold">
              {site.copy.detail.story}
            </h2>
          </Reveal>
          <div className="mt-6 max-w-2xl space-y-5">
            {product.paragraphs.map((text, i) => (
              <Reveal key={i} delay={i * 60}>
                <p className="text-[15px] leading-relaxed text-[var(--muted)]">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Right: title + specs */}
        <div className="lg:col-span-5">
          <Reveal delay={80}>
            <h1 className="font-serif-display text-4xl font-semibold tracking-tight md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--muted)]">
              {product.en}
            </p>
            <p className="mt-4 text-sm font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
              {product.subtitle}
            </p>
          </Reveal>

          <Reveal delay={140}>
            <div className="hairline mt-8 border border-[var(--hairline)] bg-[var(--paper-deep)]/50 p-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
                    С установкой
                  </p>
                  <p className="font-serif-display mt-2 text-3xl font-semibold">
                    {formatPrice(product.price)}
                  </p>
                  {product.oldPrice && (
                    <p className="mt-1 text-sm text-[var(--muted)] line-through">
                      {formatPrice(product.oldPrice)}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="flex h-12 items-center border border-[var(--ink)] bg-[var(--ink)] px-6 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--paper)] transition-colors hover:bg-transparent hover:text-[var(--ink)]"
                >
                  {site.copy.detail.inCart}
                </button>
              </div>
              <p className="mt-4 border-t border-[var(--hairline)] pt-4 text-xs leading-relaxed text-[var(--muted)]">
                {product.installNote}
              </p>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <h2 className="font-serif-display mt-10 text-xl font-semibold">
              {site.copy.detail.specs}
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <dl className="hairline-t mt-5">
              <div className="flex items-baseline justify-between border-b border-[var(--hairline)] py-3.5">
                <dt className="text-sm text-[var(--muted)]">Габариты (Ш×Г×В)</dt>
                <dd className="text-sm font-medium">
                  {product.dimensions.width} × {product.dimensions.depth} ×{" "}
                  {product.dimensions.height} {product.dimensions.unit}
                </dd>
              </div>
              <div className="flex items-baseline justify-between border-b border-[var(--hairline)] py-3.5">
                <dt className="text-sm text-[var(--muted)]">Материалы</dt>
                <dd className="max-w-[60%] text-right text-sm font-medium">{product.material}</dd>
              </div>
              <div className="flex items-baseline justify-between border-b border-[var(--hairline)] py-3.5">
                <dt className="text-sm text-[var(--muted)]">Финиш</dt>
                <dd className="max-w-[60%] text-right text-sm font-medium">{product.finish}</dd>
              </div>
              {product.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline justify-between border-b border-[var(--hairline)] py-3.5"
                >
                  <dt className="text-sm text-[var(--muted)]">{fact.label}</dt>
                  <dd className="text-sm font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      <Related product={product} go={go} />
    </article>
  );
}
