import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";

import heroSandal from "../assets/hero-sandal.jpeg";
import lifestyle1 from "../assets/lifestyle-1.jpeg";
import sandal1 from "../assets/sandal-1.jpeg";
import sandal2 from "../assets/sandal-2.jpeg";
import sandal3 from "../assets/sandal-3.jpeg";
import sandal4 from "../assets/sandal-4.jpeg";
import sandal5 from "../assets/sandal-5.jpeg";
import sandal6 from "../assets/sandal-6.jpeg";
import { products } from "../lib/products";
import { Breadcrumbs } from "../components/site/Breadcrumbs";
import { Reveal } from "../components/site/Reveal";
import { ProductCard } from "../components/site/ProductCard";

const CAROUSEL_SLIDES = [
  {
    src: heroSandal,
    label: "The Nude Strap",
    no: "01",
    sub: "110mm · Calfskin",
  },
  { src: sandal1, label: "Noir Strap 110", no: "02", sub: "Onyx · Leather" },
  { src: sandal2, label: "Caramel Slide", no: "03", sub: "Caramel · Leather" },
  { src: sandal3, label: "Ivory Block 65", no: "04", sub: "Ivory · Leather" },
  { src: sandal4, label: "Rosa Kitten 55", no: "05", sub: "Blush · Leather" },
  { src: sandal5, label: "Luna Gold 60", no: "06", sub: "Gold · Metallic" },
  { src: sandal6, label: "Cocoa Weave", no: "07", sub: "Cocoa · Woven" },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Carousel state
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dir, setDir] = useState(1);
  const total = CAROUSEL_SLIDES.length;

  const go = useCallback(
    (next: number, direction: number) => {
      setDir(direction);
      setActive((next + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(active + 1, 1), 4000);
    return () => clearInterval(id);
  }, [active, paused, go]);

  const featured = products.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 pb-20 pt-12 md:grid-cols-12 md:px-12 md:pt-5">
          <motion.div
            style={{ y, opacity }}
            className="md:col-span-6 content-center"
          >
            <Breadcrumbs
              items={[
                { label: "Cyber Lady", to: "/" },
                { label: "Elegant Collection" },
              ]}
            />
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="display mt-10 text-[14vw] leading-[0.95] tracking-[-0.04em] md:text-5xl"
            >
              Elegance Starts from the Ground Up,
              <br />
              <span className="italic text-accent">
                Wear It Beautifully.{" "}
              </span>{" "}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground"
            >
              Stylish, comfortable, and crafted for every occasion, our ladies'
              footwear collection adds elegance and confidence to every step.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-10 flex items-center gap-6"
            >
              <Link
                to="/shop"
                className="group inline-flex items-center gap-3 bg-ink px-7 py-4 text-[11px] uppercase tracking-[0.25em] text-cream transition-colors hover:bg-accent"
              >
                Explore the collection
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* ── HERO CAROUSEL ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-6"
          >
            <div
              className="
group
relative
aspect-[1.1]
overflow-hidden
rounded-md
bg-stone-950
ring-1
ring-white/10
"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Slides */}
              <AnimatePresence mode="wait" initial={false} custom={dir}>
                <motion.div
                  key={active}
                  custom={dir}
                  className="absolute inset-0 overflow-hidden"
                  variants={{
                    enter: (d: number) => ({
                      x: d > 0 ? 120 : -120,
                      opacity: 0,
                      scale: 1.15,
                      rotate: d > 0 ? 2 : -2,
                      filter: "brightness(0.75)",
                    }),
                    center: {
                      x: 0,
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                      filter: "brightness(1)",
                    },
                    exit: (d: number) => ({
                      x: d > 0 ? -120 : 120,
                      opacity: 0,
                      scale: 0.92,
                      rotate: d > 0 ? -2 : 2,
                      filter: "brightness(0.75)",
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 1.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <motion.img
                    src={CAROUSEL_SLIDES[active].src}
                    alt={CAROUSEL_SLIDES[active].label}
                    width={1600}
                    height={1600}
                    className="absolute inset-0 h-full w-full object-cover will-change-transform"
                    animate={{
                      scale: [1.08, 1.16],
                      x: [0, -12],
                      y: [0, -8],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "linear",
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Gradient overlay */}
              {/* <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-transparent" /> */}

              {/* Progress bar */}
              <div className="absolute top-0 left-0 right-0 flex gap-1 p-3">
                {CAROUSEL_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i, i > active ? 1 : -1)}
                    className="h-0.5 flex-1 overflow-hidden bg-cream/30"
                    aria-label={`Go to slide ${i + 1}`}
                  >
                    {i === active && (
                      <motion.span
                        className="block h-full bg-cream"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: paused ? undefined : 1 }}
                        transition={{ duration: 4, ease: "linear" }}
                        style={{ transformOrigin: "left" }}
                      />
                    )}
                    {i < active && <span className="block h-full bg-cream" />}
                  </button>
                ))}
              </div>

              {/* Bottom info bar */}
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-6 pb-6">
                {/* Prev / Next */}
                <div className="flex gap-2">
                  <button
                    onClick={() => go(active - 1, -1)}
                    className="flex h-10 w-10 items-center justify-center border border-cream/30 text-cream backdrop-blur-sm transition-colors hover:border-cream hover:bg-cream/10"
                    aria-label="Previous slide"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => go(active + 1, 1)}
                    className="flex h-10 w-10 items-center justify-center border border-cream/30 text-cream backdrop-blur-sm transition-colors hover:border-cream hover:bg-cream/10"
                    aria-label="Next slide"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Slide counter badge */}
              <div className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center border border-cream/30 bg-ink/40 text-[11px] tabular-nums tracking-widest text-cream backdrop-blur-sm">
                {String(active + 1).padStart(2, "0")}
              </div>
            </div>
          </motion.div>
        </div>

        {/* marquee */}
        <div className="overflow-hidden border-y border-border bg-cream py-6">
          <div className="marquee-track flex w-max gap-16 whitespace-nowrap text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex gap-16">
                {[
                  "Stylish",
                  "Comfortable",
                  "Durable",
                  "Lightweight",
                  "Trendy",
                  "Elegant",
                  "Flexible",
                  "Cushioned",
                  "Breathable",
                  "Premium",
                ].map((t) => (
                  <span key={t} className="flex items-center gap-16">
                    {t}
                    <span aria-hidden className="text-accent">
                      ✦
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40">
        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="eyebrow">Prime Edition — Quiet Comfortable</p>
            <h2 className="display mt-4 max-w-3xl text-3xl leading-none md:text-5xl">
              Step into Confidence. Step into{" "}
              <span className="italic text-accent">Beauty</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              to="/shop"
              className="link-underline text-[11px] uppercase tracking-[0.25em]"
            >
              See the full collection →
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-16">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* EDITORIAL SPLIT */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 py-28 md:grid-cols-12 md:gap-20 md:px-12 md:py-40">
          <Reveal className="md:col-span-7">
            <div className="aspect-square overflow-hidden bg-stone">
              <motion.img
                src={lifestyle1}
                alt="Woman walking in Cyber Lady nude strap sandals on marble"
                loading="lazy"
                width={1280}
                height={1600}
                className="h-full w-full object-cover"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </Reveal>

          <div className="md:col-span-5 md:pt-24">
            <Reveal>
              <p className="eyebrow">Confidence</p>
              <h2 className="display mt-6 text-4xl leading-[1.05] md:text-5xl">
                Chic Looks Begin at Your Feet, Walk with{" "}
                <span className="italic text-accent">Confidence</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                Your style begins with the perfect pair. Step into footwear that
                blends elegance, comfort, and confidence, empowering you to walk
                beautifully wherever life takes you.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <dl className="mt-12 grid grid-cols-2 gap-y-8 border-t border-border pt-8">
                {[
                  ["1000+", "Unique Articles "],
                  ["15+", "Color Patterns "],
                  ["25Lk+", "Pair Deliver"],
                  ["500+", "Trusted Distributors  "],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="display text-3xl text-ink">{k}</dt>
                    <dd className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1400px] px-6 py-10 text-center md:px-12 md:py-20">
        <Reveal>
          <p className="eyebrow">Chapter 03 — Yours</p>
          <h2 className="display mx-auto mt-6 max-w-4xl text-5xl leading-none md:text-7xl">
            Choose <span className="italic text-accent">one pair</span>
            <br />
            you'll wear forever.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 border-b border-ink pb-2 text-[12px] uppercase tracking-[0.3em] transition-colors hover:text-accent hover:border-accent"
            >
              Enter the shop →
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
