"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedSection";
import { ArrowRight, Droplets, HardHat, Wheat } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/lib/translations";
import Planet from "@/components/Planet";
import clsx from "clsx";

export default function Home() {
  const constructionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: constructionRef,
    offset: ["start end", "end start"],
  });

  const { lang, isRTL } = useLanguage();
  const t = translations[lang];

  const steelY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const plywoodY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  // Hero load-in: bar + planet first, then the headline types and the
  // eyebrow / subcopy / buttons reveal around it.
  const [reveal, setReveal] = useState(false);
  const [typed, setTyped] = useState(0);
  const [doneTyping, setDoneTyping] = useState(false);

  const line1 = lang === "ar" ? "تخصصان." : "Two Disciplines.";
  const line2 = lang === "ar" ? "معيار واحد." : "One Standard.";
  const shown1 = doneTyping ? line1 : line1.slice(0, Math.min(typed, line1.length));
  const shown2 = doneTyping ? line2 : typed > line1.length ? line2.slice(0, typed - line1.length) : "";
  const caretOn1 = reveal && !doneTyping && typed <= line1.length;
  const caretOn2 = reveal && !doneTyping && typed > line1.length;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setReveal(true);
      setTyped(999);
      setDoneTyping(true);
      return;
    }
    const id = setTimeout(() => setReveal(true), 700);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!reveal || doneTyping) return;
    const len = line1.length + line2.length;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= len) {
        clearInterval(id);
        setDoneTyping(true);
      }
    }, 48);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reveal]);

  const stats = [
    { value: t.agriculture.stats.tonnageValue, label: t.agriculture.stats.tonnage },
    { value: t.agriculture.stats.globalReachValue, label: t.agriculture.stats.globalReach },
    { value: t.agriculture.stats.shipmentsValue, label: t.agriculture.stats.shipments },
  ];

  return (
    <>
      {/* 1. HERO — The Planet */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-background px-6 pt-28 pb-20">
        {/* Rotating dot-grid planet with brand trajectory arcs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 aspect-square w-[min(96vh,920px)] -translate-x-1/2 -translate-y-1/2"
        >
          <Planet className="absolute inset-0 h-full w-full" />
        </motion.div>
        {/* Seat the planet into the background */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_34%,var(--background)_82%)]" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-accent"
          >
            <span className="h-px w-8 bg-accent/50" />
            {lang === "ar" ? "اثنين في واحد ش.م.م" : "Two in One LLC"}
            <span className="h-px w-8 bg-accent/50" />
          </motion.span>

          <h1 className="font-serif text-5xl font-bold uppercase leading-[0.95] tracking-tighter text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="sr-only">{line1} {line2}</span>
            <span aria-hidden="true">
              {shown1}
              {caretOn1 && <span className="animate-caret font-sans font-normal text-accent">|</span>}
              <br />
              <span className="text-accent">{shown2}</span>
              {caretOn2 && <span className="animate-caret font-sans font-normal text-accent">|</span>}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={doneTyping ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-8 max-w-xl text-balance text-base leading-relaxed text-muted md:text-lg"
          >
            {lang === "ar"
              ? "تجارة الجملة الزراعية والإنشاءات الصناعية — التوريد والفحص والتسليم بدقة سيادية."
              : "Agricultural wholesale and industrial construction - sourced, surveyed, and delivered with sovereign-grade precision."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={doneTyping ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Link
              href="/agriculture"
              className="group inline-flex items-center gap-2 rounded-full bg-accent-2 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-background shadow-premium transition-all hover:opacity-90"
            >
              <Wheat className="h-4 w-4" />
              <span>{t.home.hero.exploreAgri}</span>
              <ArrowRight className={clsx("h-4 w-4 transition-transform group-hover:translate-x-1", isRTL && "rotate-180")} />
            </Link>
            <Link
              href="/construction"
              className="group inline-flex items-center gap-2 rounded-full border border-accent/60 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-accent transition-all hover:bg-accent hover:text-background"
            >
              <HardHat className="h-4 w-4" />
              <span>{t.home.hero.exploreConstruction}</span>
              <ArrowRight className={clsx("h-4 w-4 transition-transform group-hover:translate-x-1", isRTL && "rotate-180")} />
            </Link>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={doneTyping ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        >
          <div className="h-12 w-[1px] bg-gradient-to-b from-transparent via-accent/40 to-transparent" />
        </motion.div>
      </section>

      {/* 1b. GLOBAL TRADE — vessel intro band (bridges the planet to the divisions) */}
      <section className="relative w-full min-h-[78vh] flex items-center overflow-hidden bg-[#06080b]">
        <video
          src="/images/hero_water.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06080b] via-[#06080b]/85 to-[#06080b]/40 rtl:bg-gradient-to-l" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06080b] via-transparent to-[#06080b]/80" />

        <div className="container relative z-10 mx-auto px-6 md:px-12">
          <AnimatedSection direction="up" className={clsx("max-w-2xl", isRTL && "font-arabic text-start")}>
            <span className="mb-6 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-accent">
              <span className="h-px w-8 bg-accent/50" />
              {lang === "ar" ? "بيت تجارة عالمي" : "A Global Trade House"}
            </span>
            <h2 className="font-serif text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-[0.95] text-white">
              {lang === "ar" ? (
                <>عبر خطوط <br /> <span className="text-accent">الشحن العالمية.</span></>
              ) : (
                <>Across the world&apos;s <br /> <span className="text-accent">shipping lanes.</span></>
              )}
            </h2>
            <p className="mt-8 max-w-xl text-base md:text-lg leading-relaxed text-white/70">
              {lang === "ar"
                ? "تجمع شركة اثنين في واحد ش.م.م بين تجارة الجملة الزراعية وتوريد مواد الإنشاءات الصناعية تحت معيار واحد — توريد وفحص وتسليم السلع والمواد بالجملة بحراً إلى العملاء حول العالم."
                : "Two in One LLC unites agricultural wholesale and industrial construction supply under one standard — sourcing, surveying, and delivering bulk commodities and materials by sea to clients across the globe."}
            </p>
            <div className="mt-12 grid max-w-lg grid-cols-3 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="border-l border-accent/40 pl-4 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-4">
                  <div className="font-serif text-2xl md:text-3xl font-bold text-accent" style={{ direction: "ltr" }}>
                    {s.value}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/50">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 2. AGRI-WHOLESALE SECTION — orange division */}
      <section id="agri" className="py-32 md:py-48 bg-background relative z-10 overflow-hidden">
        {/* Diagonal two-tone + orange divider. The divider lands at 54% at the
            section's bottom seam, where the Construction blue line meets it. */}
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-foreground/[0.03]"
          style={{ clipPath: "polygon(0 0, 44% 0, 54% 100%, 0 100%)" }}
        />
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-accent-2/70"
          style={{ clipPath: "polygon(44% 0, calc(44% + 1.5px) 0, calc(54% + 1.5px) 100%, 54% 100%)" }}
        />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <AnimatedSection direction="up" className="mb-20 md:mb-32">
            <h2 className={clsx("text-4xl md:text-6xl font-serif font-bold text-foreground uppercase tracking-tighter leading-none", isRTL && "text-start font-arabic")}>
              {lang === 'ar' ? (
                <>الزراعة <span className="text-accent-2 italic font-normal font-sans">العالمية.</span></>
              ) : (
                <>Global <span className="text-accent-2 italic font-normal">Agriculture.</span></>
              )}
            </h2>
            <p className="text-muted max-w-2xl mt-8 text-lg md:text-xl font-normal leading-relaxed text-balance border-l border-accent-2 pl-8 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-8">
              {t.home.agri.desc}
            </p>
          </AnimatedSection>

          {/* Bento Grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-[400px] md:auto-rows-[500px]">
            {/* Grain Exports */}
            <StaggerItem className="relative col-span-1 md:col-span-2 rounded-sm overflow-hidden group shadow-premium">
              <Image
                src="/images/harvesting_brays_hero_product.png"
                alt="Grain Harvesting"
                fill
                className="object-cover object-center transition-transform duration-[2000ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06080b]/95 via-[#06080b]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-12 w-full">
                <div className="glass-morphism inline-flex p-3 rounded-full mb-6">
                  <Wheat className="text-accent-2 w-6 h-6" />
                </div>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                  {t.home.agri.grainExports.title}
                </h3>
                <p className="text-white/70 font-normal text-base max-w-md leading-relaxed">
                  {t.home.agri.grainExports.desc}
                </p>
              </div>
            </StaggerItem>

            {/* Quality Testing (Text/Image Card) */}
            <StaggerItem className="relative bg-[#06080b] text-white rounded-sm overflow-hidden group shadow-premium">
              <Image
                src="/images/grain_surveyor_quality.png"
                alt="Grain Quality Testing"
                fill
                className="object-cover object-center transition-all duration-[2000ms] group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06080b]/95 via-[#06080b]/40 to-transparent" />
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <div className="glass-morphism inline-flex p-3 rounded-full mb-auto self-start">
                  <Droplets className="text-accent-2 w-6 h-6" />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 z-10 text-white tracking-tight">
                  {lang === 'ar' ? <>اختبارات <br /> الجودة</> : <>Surveyor <br /> Testing</>}
                </h3>
                <p className="text-white/70 font-normal text-sm z-10 leading-relaxed">
                  {t.home.agri.surveyorTesting.desc}
                </p>
              </div>
            </StaggerItem>

            {/* Logistics (Image Card) */}
            <StaggerItem className="relative col-span-1 md:col-span-3 rounded-sm overflow-hidden group h-[300px] md:h-auto">
              <Image
                src="/images/wheat_loading.png"
                alt="Wheat Logistics"
                fill
                className="object-cover object-center transition-all duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06080b]/90 via-[#06080b]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="text-2xl font-serif font-bold text-white mb-2">
                  {t.home.agri.logistics.title}
                </h3>
                <p className="text-white/80 font-normal text-sm max-w-2xl">
                  {t.home.agri.logistics.desc}
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* 3. INDUSTRIAL CONSTRUCTION SECTION — blue/teal division, cinematic dark band */}
      <section
        id="construction"
        ref={constructionRef}
        className="py-32 md:py-48 bg-[#06080b] text-white relative overflow-hidden"
      >
        {/* Diagonal two-tone + blue divider. Its top lands at 54% at the section's
            top seam, meeting the Agriculture orange line at the same point. */}
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-white/[0.03]"
          style={{ clipPath: "polygon(54% 0, 100% 0, 100% 100%, 44% 100%)" }}
        />
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-accent/70"
          style={{ clipPath: "polygon(54% 0, calc(54% + 1.5px) 0, calc(44% + 1.5px) 100%, 44% 100%)" }}
        />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <AnimatedSection direction="up" className="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="max-w-3xl">
              <h2 className="text-5xl md:text-8xl font-serif font-bold text-white uppercase tracking-tighter leading-none">
                {lang === 'ar' ? (
                  <>المواد <br /> <span className="text-accent italic font-normal font-sans">الصناعية.</span></>
                ) : (
                  <>Industrial <br /> <span className="text-accent italic font-normal">Materials.</span></>
                )}
              </h2>
              <p className="text-white/60 mt-8 text-xl font-normal leading-relaxed text-balance border-l border-accent pl-8 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-8">
                {t.home.construction.desc}
              </p>
            </div>
            <Link
              href="/construction"
              className="inline-flex items-center space-x-4 text-accent hover:text-white transition-all font-bold tracking-[0.2em] uppercase border-2 border-accent/40 hover:border-white px-10 py-5 rounded-full backdrop-blur-sm hover:bg-accent shadow-premium group"
            >
              <span>{t.common.viewDivision}</span>
              <ArrowRight className={clsx("w-5 h-5 group-hover:translate-x-2 transition-transform", isRTL && "rotate-180")} />
            </Link>
          </AnimatedSection>

          {/* Construction Grid with Parallax */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Left side text items */}
            <StaggerContainer className="flex flex-col gap-24">
              <Link href="/sulfur" className="flex flex-col gap-10 group/card">
                <StaggerItem className="border-l-2 border-accent pl-8 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-8">
                  <span className="text-accent font-mono text-xs tracking-[0.3em] uppercase mb-4 block opacity-70 dir-ltr text-start" style={{ direction: 'ltr' }}>
                    01
                  </span>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4 tracking-tight group-hover/card:text-accent transition-colors">
                    {t.home.construction.sulfur.title}
                  </h3>
                  <p className="text-white/50 font-normal text-lg leading-relaxed max-w-md">
                    {t.home.construction.sulfur.desc}
                  </p>
                </StaggerItem>
                <StaggerItem className="relative h-64 md:h-80 overflow-hidden rounded-sm group shadow-premium">
                  <Image
                    src="/images/granular_sulfur.jpg"
                    alt="Granular Sulfur"
                    fill
                    unoptimized
                    className="object-cover object-center opacity-80 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#06080b]/40 group-hover:bg-transparent transition-colors duration-1000" />
                  <div className="absolute inset-0 border border-white/5 pointer-events-none" />
                </StaggerItem>
              </Link>

              <Link href="/construction" className="flex flex-col gap-10 group/card">
                <StaggerItem className="border-l-2 border-white/10 pl-8 group-hover/card:border-white/30 transition-colors rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-8">
                  <span className="text-white/30 font-mono text-xs tracking-[0.3em] uppercase mb-4 block dir-ltr text-start" style={{ direction: 'ltr' }}>
                    02
                  </span>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4 tracking-tight text-white/90 group-hover/card:text-white transition-colors">
                    {t.home.construction.plywood.title}
                  </h3>
                  <p className="text-white/40 font-normal text-lg leading-relaxed max-w-md">
                    {t.home.construction.plywood.desc}
                  </p>
                </StaggerItem>
                <StaggerItem className="relative h-64 md:h-80 overflow-hidden rounded-sm group shadow-premium">
                  <motion.div
                    style={{ y: plywoodY }}
                    className="absolute inset-0 -top-[15%] -bottom-[15%]"
                  >
                    <Image
                      src="/images/plywood_deck_construction_use.png"
                      alt="Plywood Formwork"
                      fill
                      className="object-cover object-center opacity-80 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-[#06080b]/40 group-hover:bg-transparent transition-colors duration-1000" />
                  </motion.div>
                </StaggerItem>
              </Link>
            </StaggerContainer>

            {/* Right side steel parallax */}
            <Link href="/construction" className="relative h-[700px] md:h-[900px] overflow-hidden ml-auto w-full md:w-11/12 rounded-sm block group/card shadow-premium border border-white/5">
              <motion.div
                style={{ y: steelY }}
                className="absolute inset-0 -top-[20%] -bottom-[20%]"
              >
                <Image
                  src="/images/steel_brays_hero_product.png"
                  alt="Rising Structural Steel"
                  fill
                  className="object-cover object-center opacity-80 group-hover:opacity-100 transition-all duration-[2000ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06080b] via-transparent to-[#06080b]/30" />
              </motion.div>

              <div className="absolute bottom-16 left-0 right-0 px-12">
                <span className="text-accent font-mono text-xs tracking-[0.3em] uppercase mb-4 block dir-ltr text-start" style={{ direction: 'ltr' }}>
                  03
                </span>
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight tracking-tighter">
                  {t.home.construction.steel.title}
                </h3>
                <p className="text-white/60 font-normal text-lg max-w-sm leading-relaxed">
                  {t.home.construction.steel.desc}
                </p>
                <div className="mt-10 h-1 w-20 bg-accent/50 group-hover/card:w-40 transition-all duration-700" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
