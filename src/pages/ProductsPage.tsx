import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import { products, type Product } from "../lib/products";
import { Breadcrumbs } from "../components/site/Breadcrumbs";
import { Reveal } from "../components/site/Reveal";
import { ProductCard } from "../components/site/ProductCard";


const CATEGORIES = ["All", "Gents", "Ladies", "Boys & Girls", "Kids"] as const;
const TYPES = ["All", "Sandals", "Flip Flop", "Slippers", "Shoes"] as const;
const SORTS = ["Featured", "Price · low", "Price · high"] as const;

type Category = (typeof CATEGORIES)[number];
type Type = (typeof TYPES)[number];
type Sort = (typeof SORTS)[number];

export default function ProductsPage() {
  const [cat, setCat] = useState<Category>("All");
  const [type, setType] = useState<Type>("All");
  const [sort, setSort] = useState<Sort>("Featured");

  const filtered = useMemo(() => {
    let list: Product[] = products.filter(
      (p) =>
        (cat === "All" || p.type === cat) &&
        (type === "All" || p.category === type),
    );
    if (sort === "Price · low")
      list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Price · high")
      list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [cat, type, sort]);

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
          {/* <Reveal delay={0.1}>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {filtered.length} pieces · made in limited runs of one hundred.
              Each numbered by hand.
            </p>
          </Reveal> */}
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-[72px] z-30 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-6 py-5 text-[11px] uppercase tracking-[0.25em] md:flex-row md:items-center md:justify-between md:px-12">
          <FilterRow
            label="Category"
            options={CATEGORIES}
            value={cat}
            onChange={(v) => setCat(v)}
          />
          <FilterRow
            label="Type"
            options={TYPES}
            value={type}
            onChange={(v) => setType(v)}
          />
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="cursor-pointer border-b border-border bg-transparent pb-1 text-[11px] uppercase tracking-[0.25em] focus:border-accent focus:outline-none"
            >
              {SORTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-28">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
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
              className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-16"
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

function FilterRow<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <span className="text-muted-foreground">{label}</span>
      {options.map((o) => {
        const active = o === value;
        return (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`relative pb-1 transition-colors ${active ? "text-accent" : "hover:text-ink"}`}
          >
            {o}
            {active && (
              <motion.span
                layoutId={`underline-${label}`}
                className="absolute inset-x-0 -bottom-0.5 h-px bg-accent"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
