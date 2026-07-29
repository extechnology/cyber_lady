import { Link } from "react-router-dom";
import {
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaXTwitter,
  FaPinterest,
} from "react-icons/fa6";

export function Footer() {
  return (
    <footer className=" border-t border-border bg-cream">
      <div className="mx-auto max-w-[1400px] px-6 md:py-20 py-10 md:px-12">
        <div className="grid gap-6 md:gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
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

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61591054222509"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="group flex h-9 w-9 items-center justify-center rounded-full border border-border bg-transparent text-ink hover:border-ink hover:bg-ink transition-all duration-200"
              >
                <FaFacebookF className="h-4 w-4 text-ink group-hover:text-cream transition-colors duration-200" />
              </a>
              <a
                href="https://www.instagram.com/cyberlady_official/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group flex h-9 w-9 items-center justify-center rounded-full border border-border bg-transparent text-ink hover:border-ink hover:bg-ink transition-all duration-200"
              >
                <FaInstagram className="h-4 w-4 text-ink group-hover:text-cream transition-colors duration-200" />
              </a>
              <a
                href="https://in.pinterest.com/cyberlady_official/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="group flex h-9 w-9 items-center justify-center rounded-full border border-border bg-transparent text-ink hover:border-ink hover:bg-ink transition-all duration-200"
              >
                <FaPinterest className="h-4 w-4 text-ink group-hover:text-cream transition-colors duration-200" />
              </a>
              <a
                href="https://www.youtube.com/@cyberlady_official"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="group flex h-9 w-9 items-center justify-center rounded-full border border-border bg-transparent text-ink hover:border-ink hover:bg-ink transition-all duration-200"
              >
                <FaYoutube className="h-4 w-4 text-ink group-hover:text-cream transition-colors duration-200" />
              </a>
              <a
                href="https://www.linkedin.com/company/cyber-lady/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group flex h-9 w-9 items-center justify-center rounded-full border border-border bg-transparent text-ink hover:border-ink hover:bg-ink transition-all duration-200"
              >
                <FaLinkedinIn className="h-4 w-4 text-ink group-hover:text-cream transition-colors duration-200" />
              </a>
              <a
                href="https://x.com/cyberlady_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="group flex h-9 w-9 items-center justify-center rounded-full border border-border bg-transparent text-ink hover:border-ink hover:bg-ink transition-all duration-200"
              >
                <FaXTwitter className="h-4 w-4 text-ink group-hover:text-cream transition-colors duration-200" />
              </a>
            </div>
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
                  Cyber Lady <br />
                  Foriyex Footcare Co.
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
                <a href="tel:+917025118173" className="link-underline">
                  +91 70251 18173
                </a>
              </li>

              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-ink" />
                <a
                  href="https://wa.me/+917025118173?text=Hello,%20I%20would%20like%20to%20order%20sandals"
                  className="link-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +91 70251 18173
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

        <div>
          <p className="text-center pt-3 md:pt-0 text-xs text-muted-foreground">
            Our Parent Company Legal Name is FORIYEX FOOT CARE CO. & Tax
            Registration No. is 32AACFF1883C1ZX
          </p>
        </div>

        <div className="rule mt-4 md:mt-8" />
        <div className="mt-6 flex flex-col items-start justify-between gap-2 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Cyber Lady</p>
          <p>
            Developed by{" "}
            <Link to="https://www.extechnology.in/">extechnology.in</Link>
          </p>
          <p className="text-xs tracking-[.1] ">
            <Link to="/privacy-policy">Privacy Policy</Link> ·{" "}
            <Link to="/terms-and-conditions">Terms & Conditions</Link>
          </p>
        </div>
      </div>

      {/* Fixed Floating WhatsApp Button */}
      <a
        href="https://wa.me/+917025118173?text=Hello,%20I%20would%20like%20to%20order%20sandals"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        style={{ backgroundColor: "#25D366" }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl hover:scale-110 active:scale-95 transition-all duration-200"
      >
        <FaWhatsapp className="h-7 w-7 text-white" />
      </a>
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
      <ul className="mt-2 space-y-2 text-sm">
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
