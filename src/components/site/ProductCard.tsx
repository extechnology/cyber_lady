import { Link } from "react-router-dom";
import { motion } from "motion/react";
import type { Product } from "../../features/product/types/types.product";

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const image = product.colors?.[0]?.images?.[0]?.image || "";
  const colorName = product.colors?.[0]?.name || "";

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        delay: (index % 3) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-4/5 overflow-hidden rounded-md  bg-linear-to-br from-[#8A6136] via-[#E5C79A] to-[#F8EBD4]">
          {" "}
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(82,56,28,0.35)_0%,transparent_35%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(70,45,20,0.18)_0%,transparent_28%)]" />
          <div
            className="absolute inset-0 opacity-[0.04] mix-blend-soft-light"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,.8) 1px, transparent 1px)",
              backgroundSize: "14px 14px",
            }}
          />
          {/* Premium Light Sweep */}
          <motion.div
            className="absolute inset-y-0 -left-1/2 w-1/2 bg-linear-to-r from-transparent via-white/20 to-transparent blur-2xl"
            animate={{
              x: ["-120%", "320%"],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          {image && (
            <motion.img
              src={image}
              alt={product.name}
              loading="lazy"
              width={1024}
              height={1280}
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-ink/90 px-5 py-3 text-center text-[11px] uppercase tracking-[0.25em] text-cream transition-transform duration-500 group-hover:translate-y-0">
            View Color Options →
          </div>
        </div>
        <div className="mt-5 flex items-baseline justify-between gap-4">
          <div>
            <h3 className="md:display md:text-lg text-xs leading-tight">{product.name}</h3>
            <p className="mt-1 text-xs md:text-sm md:uppercase tracking-[0.2em] text-muted-foreground">
              {colorName} · {product.category?.name}
            </p>
          </div>
          <p className="text-sm tabular-nums">
            ₹{parseFloat(product.price).toLocaleString("en-IN")}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
