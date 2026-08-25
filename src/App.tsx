import { useEffect } from "react";
import { CartProvider } from "./context/CartContext";
import { site } from "./data/site";
import { useHashRoute } from "./lib/router";
import Header from "./components/Header";
import Home from "./components/Home";
import ProductPage from "./components/ProductPage";
import CasePage from "./components/CasePage";
import ProcessPage from "./components/ProcessPage";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

export default function App() {
  const { view, go } = useHashRoute();

  // Scroll to top when switching to a detail view
  useEffect(() => {
    if (view.kind !== "home") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [view]);

  // Document title per view
  useEffect(() => {
    let title = site.brand.name;
    if (view.kind === "product") {
      const p = site.products.find((pr) => pr.slug === view.slug);
      if (p) title = `${p.name} — ${site.brand.name}`;
    } else if (view.kind === "case") {
      const c = site.cases.find((ca) => ca.slug === view.slug);
      if (c) title = `${c.title} — ${site.brand.name}`;
    } else if (view.kind === "process") {
      title = `Техническая заметка — ${site.brand.name}`;
    }
    document.title = title;
  }, [view]);

  return (
    <CartProvider>
      <div className="grain min-h-screen">
        <Header go={go} />
        <main>
          {view.kind === "home" && <Home go={go} />}
          {view.kind === "product" && (
            <ProductPage
              product={site.products.find((p) => p.slug === view.slug)}
              go={go}
            />
          )}
          {view.kind === "case" && <CasePage slug={view.slug} go={go} />}
          {view.kind === "process" && <ProcessPage go={go} />}
        </main>
        <Footer go={go} />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
