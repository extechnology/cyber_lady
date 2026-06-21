import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiMenu, FiX } from "react-icons/fi";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "Shop", href: "/products" },
    { title: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-12">
        <Link to="/" className="z-50 relative">
          <img src="/logo/logo1.png" alt="logo" className="w-auto h-12 md:h-14" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-10 text-[13px] uppercase tracking-[0.2em] md:flex">
          {navLinks.map((link) => (
            <Link key={link.title} to={link.href} className="link-underline">
              {link.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6 text-[13px] uppercase tracking-[0.2em] z-50 relative">
          <button className="link-underline hidden sm:inline">Search</button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-2xl focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)", transition: { duration: 0.4 } }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-background/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center h-screen w-full"
          >
            <nav className="flex flex-col items-center gap-8 text-2xl uppercase tracking-[0.2em]">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.4, ease: "easeOut" }}
                >
                  <Link 
                    to={link.href} 
                    className="hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.title}
                  </Link>
                </motion.div>
              ))}
            </nav>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="absolute bottom-12 flex gap-6 text-[13px] uppercase tracking-[0.2em] text-muted-foreground"
            >
              <button className="hover:text-foreground transition-colors">Search</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}