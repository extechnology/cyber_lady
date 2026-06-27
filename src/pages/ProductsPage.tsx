import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiChevronDown } from "react-icons/fi";

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

  console.log("categories",categories);
  console.log("types",types);

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
      <section className="sticky top-[72px] z-30 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-6 py-4 text-[11px] uppercase tracking-[0.25em] md:flex-row md:items-center md:justify-between md:px-12 md:py-5 md:text-xs">
          <div className="flex w-full flex-col gap-4 overflow-hidden md:w-auto md:flex-row md:gap-8">
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
          </div>

          <div className="flex items-center justify-between border-t border-border/50 pt-4 md:border-t-0 md:pt-0 md:justify-end">
            <span className="w-[85px] shrink-0 text-muted-foreground md:hidden">
              Sort
            </span>
            <div className="flex w-full items-center gap-3 md:w-auto">
              <span className="hidden shrink-0 text-muted-foreground md:inline">
                Sort
              </span>
              <div className="relative w-full md:w-auto">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="w-full cursor-pointer appearance-none border-b border-border bg-transparent pb-1 pr-6 text-[11px] uppercase tracking-[0.25em] focus:border-accent focus:outline-none"
                >
                  {SORTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pb-1 text-muted-foreground">
                  <FiChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-[1400px] px-4 py-20 md:px-12 md:py-28">
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
    <div className="flex w-full items-center">
      <span className="w-[85px] shrink-0 text-muted-foreground md:w-auto md:pr-4">
        {label}
      </span>
      <div className="flex flex-1 items-center gap-x-5 overflow-x-auto pb-1 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
        {options.map((o) => {
          const active = o === value;
          return (
            <button
              key={o}
              onClick={() => onChange(o)}
              className={`relative shrink-0 cursor-pointer pb-1 transition-colors ${active ? "text-accent" : "hover:text-accent"}`}
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
    </div>
  );
}
