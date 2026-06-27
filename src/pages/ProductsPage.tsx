import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiChevronDown, FiCheck } from "react-icons/fi";

import { useProducts } from "../features/product/hooks/useProducts";
import type { Product } from "../features/product/types/types.product";

import { Breadcrumbs } from "../components/site/Breadcrumbs";
import { Reveal } from "../components/site/Reveal";
import { ProductCard } from "../components/site/ProductCard";

import useCategories from "../features/category/hooks/useCategories";
import useTypes from "../features/product_types/hooks/useTypes";

const SORTS = ["Featured", "Price · low", "Price · high"] as const;
type Sort = (typeof SORTS)[number];

export default function ProductsPage() {
  const [cat, setCat] = useState<string>("All");
  const [type, setType] = useState<string>("All");
  const [sort, setSort] = useState<Sort>("Featured");
  const { data: apiProducts, isLoading } = useProducts();

  const { data: categories } = useCategories();
  const { data: types } = useTypes();

  const CATEGORIES = categories?.map((category) => category.name) || [];
  const TYPES = types?.map((type) => type.name) || [];

  const filtered = useMemo(() => {
    let list: Product[] = apiProducts || [];
    list = list.filter(
      (p) =>
        (cat === "All" || p.category?.name === cat) &&
        (type === "All" || p.product_type?.name === type),
    );
    if (sort === "Price · low")
      list = [...list].sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price),
      );
    if (sort === "Price · high")
      list = [...list].sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price),
      );
    return list;
  }, [apiProducts, cat, type, sort]);

  return (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pt-12 md:px-12 md:pt-16">
        <Breadcrumbs
          items={[{ label: "Cyber Lady", to: "/" }, { label: "Shop" }]}
        />

        <div className="mt-10 flex flex-col gap-6 border-b border-border pb-10 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="eyebrow">
              Spring / Summer · {new Date().getFullYear()}
            </p>
            <h1 className="display mt-4 text-3xl leading-none md:text-5xl">
              The <span className="italic text-accent">collection</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky md:top-[95px] top-[80px] z-30 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between md:px-12 md:py-5">
          <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:gap-6">
            <FancySelect
              label="Category"
              options={["All", ...CATEGORIES]}
              value={cat}
              onChange={setCat}
            />
            <FancySelect
              label="Type"
              options={["All", ...TYPES]}
              value={type}
              onChange={setType}
            />
          </div>

          <div className="flex items-center justify-between border-t border-border/50 pt-3 md:border-t-0 md:pt-0 md:justify-end">
            <FancySelect
              label="Sort"
              options={[...SORTS]}
              value={sort}
              onChange={(v) => setSort(v as Sort)}
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-[1400px] px-4 py-10 md:px-12 md:py-28">
        <AnimatePresence mode="popLayout">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-32 text-center"
            >
              <p className="display text-3xl">Loading collection...</p>
            </motion.div>
          ) : filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-32 text-center"
            >
              <p className="display text-3xl">Nothing matches — yet.</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Try widening your filters.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={`${cat}-${type}-${sort}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-4 md:gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-16"
            >
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}

/* ─── Custom Fancy Select ─────────────────────────────────────────────────── */

function FancySelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative flex items-center gap-2">
      {/* Label */}
      <span
        style={{
          fontSize: "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--color-muted-foreground, #888)",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>

      {/* Trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "2px 10px 2px 10px",
          borderRadius: "4px",
          border: open
            ? "1px solid var(--color-accent, #c084fc)"
            : "1px solid var(--color-border, rgba(255,255,255,0.12))",
          background: open
            ? "rgba(192, 132, 252, 0.08)"
            : "rgba(255,255,255,0.04)",
          cursor: "pointer",
          fontSize: "11px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: open
            ? "var(--color-accent, #c084fc)"
            : "var(--color-foreground, #fff)",
          backdropFilter: "blur(8px)",
          transition: "all 0.2s ease",
          whiteSpace: "nowrap",
          minWidth: "100px",
          justifyContent: "space-between",
        }}
      >
        <span>{value}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: "flex", alignItems: "center" }}
        >
          <FiChevronDown style={{ width: "13px", height: "13px" }} />
        </motion.span>
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "calc(100% + 10px)",
              left: "auto",
              right: 0,
              minWidth: "160px",
              zIndex: 50,
              borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.10)",
              background:
                "linear-gradient(135deg, rgba(250, 248, 244, 0.98) 0%, rgba(240, 236, 230, 0.98) 100%)",
              backdropFilter: "blur(20px)",
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(192,132,252,0.08) inset",
              overflow: "hidden",
              padding: "6px",
            }}
          >
            {options.map((opt) => {
              const active = opt === value;
              return (
                <button
                  key={opt}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "4px 8px 4px 8px",
                    borderRadius: "4px",
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    border: "none",
                    background: active
                      ? "rgba(192,132,252,0.15)"
                      : "transparent",
                    color: active
                      ? "var(--color-accent, #c084fc)"
                      : "rgba(10,10,10,0.75)",
                    transition: "background 0.15s, color 0.15s",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    if (!active)
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "rgba(0,0,0,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active)
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "transparent";
                  }}
                >
                  <span>{opt}</span>
                  {active && (
                    <FiCheck
                      style={{
                        width: "12px",
                        height: "12px",
                        flexShrink: 0,
                        marginLeft: "8px",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
