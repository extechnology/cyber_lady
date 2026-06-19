import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-cream">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-12">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="display text-2xl">
              cyber<span className="text-accent">·</span>lady
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Sandals made slowly, in small numbers, by hands we know by name.
            </p>
          </div>

          <FooterCol
            title="products"
            links={[
              { to: "/products", label: "All sandals" },
              { to: "/products", label: "Heels" },
              { to: "/products", label: "Flats" },
              { to: "/products", label: "New arrivals" },
            ]}
          />
          <FooterCol
            title="House"
            links={[
              { to: "/", label: "Atelier" },
              { to: "/", label: "Journal" },
              { to: "/contact", label: "Contact" },
            ]}
          />
          <FooterCol
            title="Care"
            links={[
              { to: "/", label: "Shipping" },
              { to: "/", label: "Returns" },
              { to: "/", label: "Sizing" },
            ]}
          />
        </div>

        <div className="rule mt-16" />
        <div className="mt-6 flex flex-col items-start justify-between gap-2 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Cyber Lady</p>
          <p className="tracking-[0.2em] uppercase">Ivory · Ink · Clay</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { to: string; label: string }[];
}) {
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="link-underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
