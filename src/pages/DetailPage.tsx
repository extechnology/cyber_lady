import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useParams } from "react-router-dom";

import { useProduct, useProducts } from "../features/product/hooks/useProducts";

import { Breadcrumbs } from "../components/site/Breadcrumbs";
import { Reveal } from "../components/site/Reveal";
import { ProductCard } from "../components/site/ProductCard";

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(Number(id));
  const { data: allProducts } = useProducts();

  const [size, setSize] = useState<string | null>(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const defaultColor = product?.colors?.[0];

  console.log("Product Details: ", product);

  const [selectedColor, setSelectedColor] = useState(defaultColor?.name || "");

  const activeColor =
    product?.colors?.find((c) => c.name === selectedColor) || defaultColor;
  const related = allProducts
    ? allProducts?.filter((p) => p.id !== product?.id).slice(0, 3)
    : [];

  const [selectedImage, setSelectedImage] = useState(
    activeColor?.images?.[0]?.image || "",
  );

  useEffect(() => {
    if (!activeColor) return;

    setSelectedImage(activeColor?.images?.[0]?.image || "");
  }, [activeColor]);

  useEffect(() => {
    setSize(null);
  }, [activeColor]);

  // const mainImage = product.colors?.[0]?.images?.[0]?.image || "";
  // const allImages =
  //   product.colors?.flatMap((c) => c.images.map((i) => i.image)) || [];
  // const displayImages = allImages.length >= 3 ? allImages.slice(0, 3) : [mainImage, mainImage, mainImage];
  const displayImages = activeColor?.images?.map((img) => img.image) || [];

  const availableSizes = activeColor?.sizes || [];

  const whatsappNumber = "919447995173";

  const handleWhatsApp = () => {
    if (!product) return;

    const message = `Hello,

I'm interested in this product.

Product: ${product.name}
Category: ${product.category?.name}
Colour: ${activeColor?.name || "Not Selected"}
Size: ${size || "Not Selected"}
Price: ₹${parseFloat(product.price).toLocaleString("en-IN")}

Could you please provide more details?`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <p className="display text-3xl">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <p className="display text-3xl">Product not found.</p>
        <Link
          to="/products"
          className="link-underline text-[11px] uppercase tracking-[0.25em]"
        >
          Back to shop →
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pt-4 md:px-12 md:pt-14">
        <Breadcrumbs
          items={[
            { label: "Cyber Lady", to: "/" },
            { label: "Shop", to: "/products" },
            { label: product.category?.name || "Category" },
            { label: product.name },
          ]}
        />
      </section>

      <section className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-6 pt-4 md:grid-cols-12 md:gap-16 md:px-12 md:py-20">
        <div className="md:col-span-7">
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-6/5 overflow-hidden bg-stone"
          >
            {selectedImage && (
              <img
                src={selectedImage}
                alt={product.name}
                // width={1024}
                // height={1280}
                className="h-full w-full aspect-square object-contain"
              />
            )}
          </motion.div>

          <div className="mt-5 grid grid-cols-4 gap-4">
            {displayImages.map((src, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(src)}
                className={`overflow-hidden rounded-lg border transition
      ${
        selectedImage === src
          ? "border-accent"
          : "border-transparent hover:border-gray-300"
      }`}
              >
                <img src={src} className="md:h-40 w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-5 md:pt-8 pt-0">
          <Reveal>
            {/* <p className="eyebrow">
              N° {String(product.id).padStart(2, "0")} · {product.material}
            </p> */}
            <h1 className="display md:mt-4 mt-2 text-2xl leading-none md:text-4xl">
              {product.name}
            </h1>
            <p className="md:mt-4 mt-2 italic text-muted-foreground">
              {product.description?.split("\n")[0]}
            </p>
            <p className="md:mt-8 mt-2 text-2xl tabular-nums">
              ₹{parseFloat(product.price).toLocaleString("en-IN")}
            </p>
          </Reveal>

          <Reveal>
            <div className="md:mt-8 mt-5 md:hidden border-t border-border md:pt-8 pt-5">
              <div className="flex items-center justify-between">
                <p className="eyebrow">Colour</p>
                <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  {activeColor?.name}
                </span>
              </div>
              <div className="md:mt-5 mt-4 flex flex-wrap gap-4">
                {product.colors?.map((c) => {
                  const active = activeColor?.name === c.name;
                  const bg = c.color_code || "#CCCCCC";
                  return (
                    <button
                      key={c.id}
                      title={c.name}
                      onClick={() => {
                        setSelectedColor(c.name);
                        setSelectedImage(c.images?.[0]?.image || "");
                        setSize(null);
                      }}
                      style={{ backgroundColor: bg }}
                      className={`h-10 w-10 rounded-full border transition-all ${
                        active
                          ? "ring-2 ring-ink ring-offset-2 border-transparent"
                          : "border-border hover:ring-1 hover:ring-ink"
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 border-t border-border pt-8">
              <div className="flex items-center justify-between">
                <p className="eyebrow">Size — EU</p>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="link-underline text-[11px] uppercase tracking-[0.25em] text-muted-foreground"
                >
                  Size guide
                </button>
              </div>
              <div className="mt-5 grid grid-cols-4 gap-2 sm:grid-cols-7">
                {availableSizes.map((s) => {
                  const active = size === s.name;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSize(s.name)}
                      title={`Size ${s.name}`}
                      className={`border py-3 text-sm tabular-nums transition-colors ${
                        active
                          ? "border-ink bg-ink text-cream"
                          : "border-border hover:border-ink"
                      }`}
                    >
                      {s.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 hidden md:block border-t border-border pt-8">
              <div className="flex items-center justify-between">
                <p className="eyebrow">Colour</p>
                <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  {activeColor?.name}
                </span>
              </div>
              <div className="mt-5 flex flex-wrap gap-4">
                {product.colors?.map((c) => {
                  const active = activeColor?.name === c.name;
                  const bg = c.color_code || "#CCCCCC";
                  return (
                    <button
                      key={c.id}
                      title={c.name}
                      onClick={() => {
                        setSelectedColor(c.name);
                        setSelectedImage(c.images?.[0]?.image || "");
                        setSize(null);
                      }}
                      style={{ backgroundColor: bg }}
                      className={`h-10 w-10 rounded-full border transition-all ${
                        active
                          ? "ring-2 ring-ink ring-offset-2 border-transparent"
                          : "border-border hover:ring-1 hover:ring-ink"
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={handleWhatsApp}
                className="bg-black py-5 text-[11px] uppercase tracking-[0.3em] text-white transition-colors hover:bg-[#1EBE5D]"
              >
                Enquire on WhatsApp
              </button>
              {/* <button className="border border-border py-5 text-[11px] uppercase tracking-[0.3em] hover:border-ink">
                Save for later
              </button> */}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12 space-y-6 border-t border-border pt-8">
              <Detail label="Description" value={product.description} />
              <Detail label="Material" value={`${product.material}`} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-[1400px] px-4 py-12 md:px-12 md:py-32">
        <Reveal>
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="eyebrow">You may also love</p>
              <h2 className="display mt-3 text-4xl md:text-5xl">
                From the same season
              </h2>
            </div>
            <Link
              to="/products"
              className="link-underline text-[11px] uppercase tracking-[0.25em]"
            >
              See all →
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 md:gap-10 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-16">
          {related.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
      {/* Size guide modal */}
      <AnimatePresence>
        {showSizeGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-6 backdrop-blur-sm"
            onClick={() => setShowSizeGuide(false)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-cream p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="display text-2xl">Size Guide</h3>
                <button
                  onClick={() => setShowSizeGuide(false)}
                  className="text-xl leading-none hover:text-accent transition-colors"
                >
                  &times;
                </button>
              </div>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 font-normal text-muted-foreground uppercase tracking-widest">
                      EU
                    </th>
                    <th className="pb-3 font-normal text-muted-foreground uppercase tracking-widest">
                      US
                    </th>
                    <th className="pb-3 font-normal text-muted-foreground uppercase tracking-widest">
                      UK
                    </th>
                    <th className="pb-3 font-normal text-muted-foreground uppercase tracking-widest">
                      Length (cm)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [35, 5, 2.5, 22.8],
                    [36, 6, 3.5, 23.5],
                    [37, 6.5, 4, 24.1],
                    [38, 7.5, 5, 24.8],
                    [39, 8.5, 6, 25.5],
                    [40, 9, 6.5, 26.2],
                    [41, 10, 7.5, 26.8],
                  ].map(([eu, us, uk, cm]) => (
                    <tr key={eu} className="border-b border-border/50">
                      <td className="py-3 tabular-nums">{eu}</td>
                      <td className="py-3 tabular-nums">{us}</td>
                      <td className="py-3 tabular-nums">{uk}</td>
                      <td className="py-3 tabular-nums">{cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <details className="group border-b border-border pb-4">
      <summary className="flex cursor-pointer items-center justify-between text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
        <span className="text-lg leading-none transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <p className="mt-3 text-sm leading-relaxed text-ink whitespace-pre-line">
        {value}
      </p>
    </details>
  );
}
