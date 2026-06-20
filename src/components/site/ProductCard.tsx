import { Link } from "react-router-dom";
import { motion } from "motion/react";
import type { Product } from "../../lib/products";

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
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
        <div className="relative overflow-hidden bg-stone aspect-4/5">
          <motion.img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={1024}
            height={1280}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-ink/90 px-5 py-3 text-center text-[11px] uppercase tracking-[0.25em] text-cream transition-transform duration-500 group-hover:translate-y-0">
            View piece →
          </div>
        </div>
        <div className="mt-5 flex items-baseline justify-between gap-4">
          <div>
            <h3 className="display text-lg leading-tight">{product.name}</h3>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {product.color} · {product.category}
            </p>
          </div>
          <p className="text-sm tabular-nums">₹{product.price}</p>
        </div>
      </Link>
    </motion.article>
  );
}
