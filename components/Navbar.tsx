"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Languages,
  Sun,
  Moon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useLanguage } from "./LanguageContext";
import { useTheme } from "./ThemeContext";
import EmblemMark from "./EmblemMark";
import { translations } from "@/lib/translations";
import { ACTIVITY_LINKS } from "@/lib/siteData";

const UNIFORM_SUBPAGES = [
  {
    href: "/uniforms/industrial",
    en: "Industrial Uniforms",
    ar: "الزي الصناعي",
  },
  {
    href: "/uniforms/medical",
    en: "Medical Uniforms",
    ar: "الزي الطبي",
  },
  {
    href: "/uniforms/schools",
    en: "School Uniforms",
    ar: "الزي المدرسي",
  },
  {
    href: "/uniforms/hotels-catering",
    en: "Hotels & Catering Uniforms",
    ar: "زي الفنادق والضيافة",
  },
  {
    href: "/uniforms/military",
    en: "Military Uniforms",
    ar: "الزي العسكري",
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActivitiesOpen, setMobileActivitiesOpen] = useState(false);
  const [mobileUniformsOpen, setMobileUniformsOpen] = useState(false);
  const [uniformsOpen, setUniformsOpen] = useState(false);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const pathname = usePathname();
  const { lang, setLang, isRTL } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const t = translations[lang];

  const PRIMARY_NAV = [
    { name: t.nav.about, href: "/about", key: "About" },
    { name: t.nav.activities, href: "/services", key: "Activities" },
    { name: t.nav.careers, href: "/careers", key: "Careers" },
    { name: t.common.contact, href: "/contact", key: "Contact" },
  ];

  const ACTIVITY_PAGES = ACTIVITY_LINKS.map((page) => ({
    ...page,
    name: t.nav[page.labelKey],
  }));

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileActivitiesOpen(false);
    setMobileUniformsOpen(false);
  };

  const openMobileMenu = () => {
    setMobileActivitiesOpen(false);
    setMobileUniformsOpen(false);
    setMobileMenuOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileActivitiesOpen(false);
    setMobileUniformsOpen(false);
    setUniformsOpen(false);
    setHoveredKey(null);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        setMobileActivitiesOpen(false);
        setMobileUniformsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const getActiveKey = () => {
    if (pathname === "/about") return "About";
    if (pathname === "/contact") return "Contact";
    if (pathname === "/careers") return "Careers";

    const activeActivity = ACTIVITY_PAGES.find(
      (page) =>
        pathname === page.href ||
        pathname.startsWith(`${page.href}/`)
    );

    return activeActivity ? activeActivity.key : "";
  };

  const activeKey = getActiveKey();
  const activitiesActive =
    pathname === "/services" ||
    ACTIVITY_PAGES.some((page) => page.key === activeKey);

  const uniformLinks = (mobile: boolean) => (
    <div
      id={
        mobile
          ? "mobile-uniforms-submenu"
          : "desktop-uniforms-submenu"
      }
      className={clsx(
        "mb-2 mt-1 space-y-1",
        isRTL
          ? "mr-3 border-r border-line pr-3"
          : "ml-3 border-l border-line pl-3"
      )}
    >
      {UNIFORM_SUBPAGES.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => {
            if (mobile) closeMobileMenu();
            setUniformsOpen(false);
          }}
          aria-current={pathname === item.href ? "page" : undefined}
          className={clsx(
            "block rounded-lg px-3 py-2.5 transition-colors hover:bg-foreground/10 hover:text-accent",
            mobile ? "text-sm" : "text-xs",
            pathname === item.href ? "text-accent" : "text-muted"
          )}
        >
          {lang === "ar" ? item.ar : item.en}
        </Link>
      ))}
    </div>
  );

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={clsx(
          "sticky top-0 z-50 border-b py-1.5 text-foreground backdrop-blur-md",
          "transition-[background-color,border-color,box-shadow] duration-300",
          isScrolled
            ? "border-line bg-background/95 shadow-premium"
            : "border-line/70 bg-background/90 shadow-sm"
        )}
      >
        <div className="container mx-auto flex min-h-14 items-center justify-between gap-3 px-4 lg:px-6 xl:px-10">
          <Link
            href="/"
            className="group -ml-2 flex items-center justify-self-start"
          >
            <span className="relative block">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-[-25%] rounded-full opacity-0 transition-opacity duration-500 dark:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.05) 40%, transparent 65%)",
                }}
              />
              <EmblemMark size="h-14 w-14" />
            </span>
          </Link>

          <nav
            className="mx-auto hidden items-center gap-1 rounded-full border border-line bg-foreground/5 p-1.5 shadow-inner backdrop-blur-md lg:flex"
            onMouseLeave={() => setHoveredKey(null)}
          >
            {PRIMARY_NAV.map((div) => {
              const isActive = activeKey === div.key;
              const isHovered = hoveredKey === div.key;
              const isContact = div.key === "Contact";

              if (div.key === "Activities") {
                return (
                  <div
                    key={div.key}
                    className="group relative"
                    onMouseEnter={() => setHoveredKey(div.key)}
                  >
                    <button
                      type="button"
                      aria-label={
                        lang === "ar"
                          ? "فتح قائمة الأنشطة"
                          : "Open Activities menu"
                      }
                      className={clsx(
                        "premium-tracking relative flex items-center gap-1.5 rounded-full px-5 py-2 text-[10px] font-semibold uppercase transition-all duration-300 xl:text-xs",
                        activitiesActive
                          ? "text-background"
                          : "text-foreground/70 hover:text-foreground"
                      )}
                    >
                      {(activitiesActive || isHovered) && (
                        <motion.div
                          layoutId="nav-pill"
                          className={clsx(
                            "absolute inset-0 -z-10 rounded-full shadow-lg",
                            activitiesActive
                              ? "bg-accent"
                              : "bg-foreground/10"
                          )}
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                      {div.name}
                      <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                    </button>

                    <div
                      className={clsx(
                        "pointer-events-none invisible absolute top-full z-50 translate-y-2 pt-4 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100",
                        isRTL ? "right-0" : "left-0"
                      )}
                    >
                      <div className="w-72 rounded-2xl border border-line bg-background/95 p-2 shadow-2xl backdrop-blur-xl">
                        {ACTIVITY_PAGES.map((page) => {
                          const itemClass = clsx(
                            "flex w-full items-center justify-between rounded-xl px-4 py-3 text-start text-xs font-semibold uppercase tracking-wider transition-colors",
                            activeKey === page.key
                              ? "bg-accent text-background"
                              : "text-foreground/70 hover:bg-foreground/10 hover:text-foreground"
                          );

                          return (
                            <div key={page.key}>
                              {page.key === "Uniforms" ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setUniformsOpen((open) => !open)
                                    }
                                    aria-expanded={uniformsOpen}
                                    aria-controls="desktop-uniforms-submenu"
                                    className={itemClass}
                                  >
                                    <span>{page.name}</span>
                                    <ChevronDown
                                      className={clsx(
                                        "h-3.5 w-3.5 transition-transform",
                                        uniformsOpen && "rotate-180"
                                      )}
                                    />
                                  </button>
                                  {uniformsOpen && uniformLinks(false)}
                                </>
                              ) : (
                                <Link
                                  href={page.href}
                                  className={itemClass}
                                >
                                  <span>{page.name}</span>
                                  <ArrowRight
                                    className={clsx(
                                      "h-3.5 w-3.5",
                                      isRTL && "rotate-180"
                                    )}
                                  />
                                </Link>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={div.key}
                  href={div.href}
                  onMouseEnter={() => setHoveredKey(div.key)}
                  className={clsx(
                    "premium-tracking relative rounded-full px-5 py-2 text-[10px] font-semibold uppercase transition-all duration-300 xl:text-xs",
                    isActive
                      ? "text-background"
                      : isContact
                        ? "text-accent hover:text-accent"
                        : "text-foreground/70 hover:text-foreground"
                  )}
                >
                  {(isActive || isHovered) && (
                    <motion.div
                      layoutId="nav-pill"
                      className={clsx(
                        "absolute inset-0 -z-10 rounded-full shadow-lg",
                        isActive ? "bg-accent" : "bg-foreground/10"
                      )}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  {div.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-foreground/5 text-foreground transition-all hover:bg-accent hover:text-background"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            <div className="hidden lg:block">
              <button
                type="button"
                onClick={() => setLang(lang === "en" ? "ar" : "en")}
                className="premium-tracking flex items-center gap-2 rounded-full border border-line bg-foreground/5 px-3 py-1.5 text-[10px] font-bold uppercase text-foreground transition-all hover:bg-accent hover:text-background"
              >
                <Languages className="h-3.5 w-3.5" />
                <span>{lang === "en" ? "عربي" : "EN"}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={openMobileMenu}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              className="relative z-[60] flex items-center justify-center rounded-full border border-line bg-foreground/10 p-2.5 text-foreground transition-all hover:bg-accent hover:text-background lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            dir={isRTL ? "rtl" : "ltr"}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex flex-col overflow-y-auto overscroll-contain bg-background p-4 text-foreground sm:p-6"
          >
            <div className="mb-6 flex items-center justify-between border-b border-line pb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <EmblemMark size="h-14 w-14" />

                <button
                  type="button"
                  onClick={() => setLang(lang === "en" ? "ar" : "en")}
                  className="premium-tracking flex items-center gap-2 rounded-full border border-line bg-foreground/10 px-3 py-1.5 text-[10px] font-bold uppercase transition-all hover:bg-accent hover:text-background"
                >
                  <Languages className="h-3.5 w-3.5" />
                  <span>{lang === "en" ? "عربي" : "EN"}</span>
                </button>

                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-foreground/10 transition-all hover:bg-accent hover:text-background"
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={closeMobileMenu}
                aria-label="Close menu"
                className="rounded-full border border-line p-3 transition-colors hover:bg-foreground/10"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-1 flex-col">
              <div className="mb-8">
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="flex w-full items-center justify-center gap-2 rounded-sm bg-accent py-4 text-[10px] font-black uppercase tracking-[0.2em] text-background shadow-2xl transition-all hover:opacity-90"
                >
                  <span>{t.common.requestAQuote}</span>
                  <ArrowRight
                    className={clsx("h-3 w-3", isRTL && "rotate-180")}
                  />
                </Link>
              </div>

              <div className="flex flex-col gap-1 text-start">
                <h4 className="mb-4 font-serif text-[10px] font-bold uppercase italic tracking-[0.3em] text-accent/60">
                  {t.common.navigation}
                </h4>

                {PRIMARY_NAV.map((div) => (
                  <div
                    key={div.key}
                    className="border-b border-line last:border-0"
                  >
                    {div.key === "Activities" ? (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setMobileActivitiesOpen((open) => !open);
                            setMobileUniformsOpen(false);
                          }}
                          aria-expanded={mobileActivitiesOpen}
                          aria-controls="mobile-activities-submenu"
                          className={clsx(
                            "flex w-full items-center justify-between py-3.5 text-start font-serif text-lg transition-colors",
                            activitiesActive
                              ? "text-accent"
                              : "text-foreground hover:text-accent"
                          )}
                        >
                          <span>{div.name}</span>
                          <ChevronDown
                            className={clsx(
                              "me-3 h-5 w-5 text-accent transition-transform",
                              mobileActivitiesOpen && "rotate-180"
                            )}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {mobileActivitiesOpen && (
                            <motion.div
                              id="mobile-activities-submenu"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col pb-3 ps-4">
                                {ACTIVITY_PAGES.map((page) => (
                                  <div key={page.key}>
                                    {page.key === "Uniforms" ? (
                                      <>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            setMobileUniformsOpen(
                                              (open) => !open
                                            )
                                          }
                                          aria-expanded={mobileUniformsOpen}
                                          aria-controls="mobile-uniforms-submenu"
                                          className={clsx(
                                            "flex w-full items-center justify-between py-2.5 text-start text-sm font-semibold",
                                            activeKey === page.key
                                              ? "text-accent"
                                              : "text-muted hover:text-accent"
                                          )}
                                        >
                                          <span>{page.name}</span>
                                          <ChevronDown
                                            className={clsx(
                                              "me-3 h-4 w-4 text-accent transition-transform",
                                              mobileUniformsOpen &&
                                                "rotate-180"
                                            )}
                                          />
                                        </button>

                                        {mobileUniformsOpen &&
                                          uniformLinks(true)}
                                      </>
                                    ) : (
                                      <Link
                                        href={page.href}
                                        onClick={closeMobileMenu}
                                        className={clsx(
                                          "block py-2.5 text-sm font-semibold",
                                          activeKey === page.key
                                            ? "text-accent"
                                            : "text-muted hover:text-accent"
                                        )}
                                      >
                                        {page.name}
                                      </Link>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={div.href}
                        onClick={closeMobileMenu}
                        className="group flex items-center justify-between py-3.5"
                      >
                        <span
                          className={clsx(
                            "font-serif text-lg transition-colors",
                            activeKey === div.key
                              ? "text-accent"
                              : "text-foreground group-hover:text-accent"
                          )}
                        >
                          {div.name}
                        </span>
                        <ArrowRight
                          className={clsx(
                            "h-4 w-4 text-accent transition-all",
                            isRTL && "rotate-180",
                            activeKey === div.key
                              ? "translate-x-0 opacity-100"
                              : "-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                          )}
                        />
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-8 text-[10px] font-medium uppercase tracking-[0.3em] text-muted">
                <p>{t.common.copyright}</p>
                <p className="mt-1 text-accent/50">
                  {t.footer.tagline.slice(1, 40)}...
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
