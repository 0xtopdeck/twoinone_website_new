"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Languages, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useLanguage } from "./LanguageContext";
import { useTheme } from "./ThemeContext";
import EmblemMark from "./EmblemMark";
import { translations } from "@/lib/translations";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, isRTL } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = translations[lang];

  const DIVISIONS = [
    { name: t.nav.about, href: "/about", key: "About" },
    { name: t.nav.services, href: "/services", key: "Services" },
    { name: t.nav.careers, href: "/careers", key: "Careers" },
    { name: t.common.contact, href: "/contact", key: "Contact" },
    { name: t.nav.agriculture, href: "/agriculture", key: "Agriculture" },
    { name: t.nav.construction, href: "/construction", key: "Construction" },
    { name: t.nav.sulfur, href: "/sulfur", key: "Sulfur" },
    { name: t.nav.food, href: "/food", key: "Food" },
    { name: t.nav.autoParts, href: "/auto-parts", key: "AutoParts" },
    { name: t.nav.uniforms, href: "/uniforms", key: "Uniforms" },
    { name: t.nav.events, href: "/events", key: "Events" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getActiveKey = () => {
    if (pathname === "/about") return "About";
    if (pathname === "/contact") return "Contact";
    if (pathname === "/careers") return "Careers";
    if (pathname === "/construction") return "Construction";
    if (pathname === "/sulfur") return "Sulfur";
    if (pathname === "/food") return "Food";
    if (pathname === "/auto-parts") return "AutoParts";
    if (pathname === "/uniforms") return "Uniforms";
    if (pathname === "/services") return "Services";
    if (pathname === "/events") return "Events";
    if (pathname === "/agriculture") return "Agriculture";
    return "";
  };

  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const activeKey = getActiveKey();

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={clsx(
          "z-50 transition-all duration-500 text-foreground",
          "md:fixed md:top-0 md:left-0 md:right-0",
          "sticky top-0",
          isScrolled
            ? "bg-background/80 backdrop-blur-xl shadow-premium py-2 border-b border-line"
            : "bg-background/60 backdrop-blur-lg py-4 md:bg-background/30 md:backdrop-blur-sm shadow-sm"
        )}
      >
        <div className="container mx-auto px-4 lg:px-6 xl:px-10 flex justify-between md:flex-row items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center group justify-self-start -ml-2">
            <span className="relative block">
              <span
                aria-hidden="true"
                className="absolute inset-[-25%] rounded-full pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(circle at center, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.05) 40%, transparent 65%)" }}
              />
              <EmblemMark size="h-[80px] w-[80px]" />
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-1 bg-foreground/5 backdrop-blur-md p-1.5 rounded-full border border-line mx-auto shadow-inner"
            onMouseLeave={() => setHoveredKey(null)}
          >
            {DIVISIONS.map((div) => {
              const isActive = activeKey === div.key;
              const isHovered = hoveredKey === div.key;
              const isContact = div.key === "Contact";

              return (
                <Link
                  key={div.key}
                  href={div.href}
                  onMouseEnter={() => setHoveredKey(div.key)}
                  className={clsx(
                    "relative px-2.5 xl:px-3.5 py-2 rounded-full text-[9px] xl:text-[11px] font-semibold premium-tracking transition-all duration-300 uppercase",
                    isActive ? "text-background" : isContact ? "text-accent hover:text-accent" : "text-foreground/70 hover:text-foreground"
                  )}
                >
                  {(isActive || isHovered) && (
                    <motion.div
                      layoutId="nav-pill"
                      className={clsx(
                        "absolute inset-0 rounded-full -z-10 shadow-lg",
                        isActive ? "bg-accent" : "bg-foreground/10"
                      )}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {div.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-foreground/5 border border-line text-foreground hover:bg-accent hover:text-background transition-all"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Desktop Language Toggle */}
            <div className="hidden md:block">
              <button
                onClick={() => setLang(lang === "en" ? "ar" : "en")}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/5 border border-line text-foreground text-[10px] font-bold uppercase premium-tracking hover:bg-accent hover:text-background transition-all"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>{lang === "en" ? "عربي" : "EN"}</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden flex items-center justify-center p-2.5 bg-foreground/10 text-foreground rounded-full transition-all hover:bg-accent hover:text-background relative z-[60] border border-line"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/98 backdrop-blur-3xl text-foreground z-[9999] p-6 flex flex-col overflow-y-auto overscroll-contain"
          >
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-line">
              <div className="flex items-center gap-4 group">
                <EmblemMark size="h-[75px] w-[75px]" />
                {/* Mobile Language Toggle */}
                <button
                  onClick={() => setLang(lang === "en" ? "ar" : "en")}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/10 border border-line text-[10px] font-bold uppercase premium-tracking hover:bg-accent hover:text-background transition-all"
                >
                  <Languages className="w-3.5 h-3.5" />
                  <span>{lang === "en" ? "عربي" : "EN"}</span>
                </button>
                {/* Mobile Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-foreground/10 border border-line hover:bg-accent hover:text-background transition-all"
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 hover:bg-foreground/10 rounded-full transition-colors border border-line"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col flex-1">
              <div className="mb-8">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-4 bg-accent text-background font-black tracking-[0.2em] text-[10px] rounded-sm hover:opacity-90 transition-all uppercase flex items-center justify-center gap-2 shadow-2xl"
                >
                  <span>{t.common.requestAQuote}</span>
                  <ArrowRight className={clsx("w-3 h-3", isRTL && "rotate-180")} />
                </Link>
              </div>

              <div className="flex flex-col gap-1 text-start">
                <h4 className="text-[10px] uppercase tracking-[0.3em] text-accent/60 font-bold mb-4 font-serif italic">
                  {t.common.navigation}
                </h4>
                {DIVISIONS.map((div) => (
                  <Link
                    key={div.key}
                    href={div.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3.5 flex justify-between items-center group border-b border-line last:border-0"
                  >
                    <span className={clsx(
                      "text-lg font-serif transition-colors",
                      activeKey === div.key ? "text-accent" : "text-foreground group-hover:text-accent"
                    )}>
                      {div.name}
                    </span>
                    <ArrowRight className={clsx(
                      "w-4 h-4 transition-all text-accent",
                      isRTL && "rotate-180",
                      activeKey === div.key ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"
                    )} />
                  </Link>
                ))}
              </div>

              <div className="mt-auto pt-8 text-[10px] uppercase tracking-[0.3em] text-muted font-medium">
                <p>{t.common.copyright}</p>
                <p className="mt-1 text-accent/50">{t.footer.tagline.slice(1, 40)}...</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
