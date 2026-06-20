import { Link } from "react-router-dom";
import { FaLocationDot, FaPhone, FaEnvelope } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className=" border-t border-border bg-cream">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-12">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="inline-block">
              <img
                src="/logo/logo1.png"
                className="h-16 w-auto"
                alt="Cyber Lady Logo"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Sandals made slowly, in small numbers, by hands we know by name.
            </p>
          </div>

          <FooterCol
            title="Products"
            links={[
              { to: "/products", label: "All sandals" },
              { to: "/products", label: "Gents" },
              { to: "/products", label: "Ladies" },
              { to: "/products", label: "Boys & Girls" },
              { to: "/products", label: "Kids" },
            ]}
          />
          
          <FooterCol
            title="Links"
            links={[
              { to: "/", label: "Home" },
              { to: "/products", label: "Products" },
              { to: "/contact", label: "Contact" },
            ]}
          />

          <div>
            <p className="eyebrow">Contact Us</p>
            <ul className="mt-4 space-y-4 text-sm text-ink">
              <li className="flex items-start gap-3 text-muted-foreground">
                <FaLocationDot className="mt-1 shrink-0 text-ink" />
                <span className="leading-relaxed">
                  Cyber Lady Foryex Footcare Co.
                  <br />
                  West Mangad P.O.
                  <br />
                  Kunnamkulam
                  <br />
                  Thrissur, Kerala – India
                </span>
              </li>

              <li className="flex items-center gap-3">
                <FaPhone className="text-ink" />
                <a
                  href="tel:+919447995173"
                  className="link-underline"
                >
                  +91 94479 95173
                </a>
              </li>

              <li className="flex items-center gap-3">
                <FaEnvelope className="text-ink" />
                <a
                  href="mailto:foriyexfootcare@gmail.com"
                  className="link-underline"
                >
                  foriyexfootcare@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="rule mt-16" />
        <div className="mt-6 flex flex-col items-start justify-between gap-2 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Cyber Lady</p>
          <p>Developed by <Link to="https://www.extechnology.in/">extechnology.in</Link></p>
          <p className="text-xs tracking-[.1] ">Privacy Policy · Terms & Conditions · Refund Policy · Shipping Policy</p>
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
