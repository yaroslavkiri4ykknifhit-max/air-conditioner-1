import { useEffect, useState, useCallback } from "react";

export type View =
  | { kind: "home" }
  | { kind: "product"; slug: string }
  | { kind: "case"; slug: string }
  | { kind: "process" };

export function parseHash(hash: string): View {
  const clean = hash.replace(/^#\/?/, "");
  const parts = clean.split("/").filter(Boolean);
  if (parts[0] === "product" && parts[1]) {
    return { kind: "product", slug: parts[1] };
  }
  if (parts[0] === "case" && parts[1]) {
    return { kind: "case", slug: parts[1] };
  }
  if (parts[0] === "process") {
    return { kind: "process" };
  }
  return { kind: "home" };
}

function viewToHash(v: View) {
  switch (v.kind) {
    case "home":
      return "#/";
    case "product":
      return `#/product/${v.slug}`;
    case "case":
      return `#/case/${v.slug}`;
    case "process":
      return "#/process";
  }
}

export function useHashRoute() {
  const [view, setView] = useState<View>(() => parseHash(window.location.hash));

  useEffect(() => {
    const onChange = () => setView(parseHash(window.location.hash));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  /** Navigate to a view; optionally scroll to a section on the home page. */
  const go = useCallback((to: View, section?: string) => {
    const hash = viewToHash(to);
    const current = window.location.hash || "#/";

    const scroll = () => {
      if (section) {
        const el = document.getElementById(section);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    const sameView =
      to.kind === "home" &&
      (current === "#" || current === "" || current.startsWith("#/section"));

    if (hash === current || (to.kind === "home" && current === "#/")) {
      if (to.kind === "home" && !sameView) {
        // already home
      }
      scroll();
    } else {
      window.location.hash = hash;
      window.setTimeout(scroll, 80);
    }
  }, []);

  return { view, go };
}
