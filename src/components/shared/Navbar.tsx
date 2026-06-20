import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-500 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-12">
        <Link to="/" >
          <img src="/logo/logo1.png" alt="logo" className="w-auto h-14" />
        </Link>

        <nav className="hidden items-center gap-10 text-[13px] uppercase tracking-[0.2em] md:flex">
          <Link to="/" className="link-underline" >
            Home
          </Link>
          <Link to="/products" className="link-underline" >
            Shop
          </Link>
          <Link to="/contact" className="link-underline">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-6 text-[13px] uppercase tracking-[0.2em]">
          <button className="link-underline hidden sm:inline">Search</button>
        </div>
      </div>
    </header>
  );
}