import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import heroSandal from "../assets/hero-sandal.jpeg";
import lifestyle1 from "../assets/lifestyle-1.jpeg";
import { products } from "../lib/products";
import { Breadcrumbs } from "../components/site/Breadcrumbs";
import { Reveal } from "../components/site/Reveal";
import { ProductCard } from "../components/site/ProductCard";


export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const featured = products.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 pb-20 pt-12 md:grid-cols-12 md:px-12 md:pt-5">
          <motion.div style={{ y, opacity }} className="md:col-span-6 content-center">
            <Breadcrumbs
              items={[
                { label: "Cyber Lady", to: "/" },
                { label: "Spring Collection" },
              ]}
            />
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="display mt-10 text-[14vw] leading-[0.95] tracking-[-0.04em] md:text-5xl"
            >
              Sandals,
              <br />
              <span className="italic text-accent">slowly</span> made.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground"
            >
              A small house of leather sandals for the woman who chooses few
              things, well. Each pair finished by a single artisan in Marche,
              Italy.
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
              <Link
                to="/contact"
                className="link-underline text-[11px] uppercase tracking-[0.25em]"
              >
                Atelier visit
              </Link>
            </motion.div>
          </motion.div>

          <div className="md:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative  overflow-hidden bg-stone"
            >
              <motion.img
                src={heroSandal}
                alt="Cyber Lady signature strappy sandal in nude leather"
                width={1600}
                height={1600}
                style={{ scale: imgScale }}
                className="h-full w-full aspect-square object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-cream">
                <p className="eyebrow text-cream/70">N° 01</p>
                <p className="display text-sm">The Nude Strap</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* marquee */}
        <div className="overflow-hidden border-y border-border bg-cream py-6">
          <div className="marquee-track flex w-max gap-16 whitespace-nowrap text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex gap-16">
                {[
                  "Made in Italy",
                  "Vegetable-tanned leather",
                  "Small runs · numbered",
                  "Free worldwide shipping",
                  "Hand-finished",
                  "Lifetime resole",
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
            <p className="eyebrow">Chapter 01 — Quiet luxury</p>
            <h2 className="display mt-4 max-w-3xl text-3xl leading-none md:text-5xl">
              Six pieces. <span className="italic text-accent">Endless</span>{" "}
              ways to wear them.
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
            <div className="aspect-4/5 overflow-hidden bg-stone">
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
              <p className="eyebrow">Chapter 02 — The atelier</p>
              <h2 className="display mt-6 text-4xl leading-[1.05] md:text-5xl">
                Two weeks. One pair. One{" "}
                <span className="italic text-accent">pair of hands.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                Our sandals are built the slow way — pattern cut by hand,
                leather edged with wax, soles stitched by a single artisan from
                start to finish. We make small numbers, because that's what the
                craft asks for.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <dl className="mt-12 grid grid-cols-2 gap-y-8 border-t border-border pt-8">
                {[
                  ["14 days", "average build time"],
                  ["1 artisan", "per pair, start to finish"],
                  ["100 pairs", "per style, per season"],
                  ["Lifetime", "resole programme"],
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
      <section className="mx-auto max-w-[1400px] px-6 py-28 text-center md:px-12 md:py-40">
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
