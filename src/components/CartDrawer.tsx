import { useEffect } from "react";
import { site, formatPrice } from "../data/site";
import { useCart } from "../context/CartContext";

export default function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isOpen,
    setIsOpen,
  } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Закрыть корзину"
        onClick={() => setIsOpen(false)}
        className="absolute inset-0 bg-[var(--ink)]/30"
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[var(--paper)] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--hairline)] px-6 py-5">
          <div>
            <h2 className="font-serif-display text-xl font-semibold">Корзина</h2>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
              {totalItems === 0
                ? "пусто"
                : `${totalItems} ${totalItems === 1 ? "модель" : totalItems < 5 ? "модели" : "моделей"}`}
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="hairline flex h-9 w-9 items-center justify-center border text-lg leading-none transition-colors hover:border-[var(--ink)]"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="font-serif-display text-2xl font-medium">Пока пусто</p>
              <p className="mt-3 max-w-[220px] text-sm leading-relaxed text-[var(--muted)]">
                Выберите модель в каталоге — установка посчитается автоматически.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-[var(--hairline)]">
              {items.map((item) => (
                <li key={item.slug} className="flex gap-4 py-5">
                  <div className="img-frame aspect-[4/3] w-24 shrink-0">
                    <img src={item.image} alt={item.imageAlt} />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-serif-display text-base font-semibold">
                          {item.name}
                        </h3>
                        <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
                          {item.subtitle}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.slug)}
                        className="text-xs text-[var(--muted)] underline-offset-2 transition-colors hover:text-[var(--accent)] hover:underline"
                      >
                        убрать
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="hairline flex items-center border">
                        <button
                          onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center text-sm transition-colors hover:bg-[var(--paper-deep)]"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center text-sm transition-colors hover:bg-[var(--paper-deep)]"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[var(--hairline)] px-6 py-6">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
                Итого
              </span>
              <span className="font-serif-display text-3xl font-semibold">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[var(--muted)]">
              Оплата — после согласования сметы. Оставьте телефон менеджеру по
              заказу — перезвоним в течение 15 минут.
            </p>
            <a
              href={site.phoneHref}
              className="mt-5 flex h-13 items-center justify-center border border-[var(--ink)] bg-[var(--ink)] py-4 text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--paper)] transition-colors hover:bg-transparent hover:text-[var(--ink)]"
            >
              Оформить заказ · {site.phone}
            </a>
            <button
              onClick={clearCart}
              className="mt-3 w-full text-center text-xs text-[var(--muted)] underline-offset-2 transition-colors hover:text-[var(--accent)] hover:underline"
            >
              Очистить корзину
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
