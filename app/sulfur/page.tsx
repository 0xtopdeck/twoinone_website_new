"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedSection";
import { Mountain } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/lib/translations";
import AsciiRevealCanvas from "@/components/AsciiRevealCanvas";
import clsx from "clsx";

export default function SulfurPage() {
  const { lang, isRTL } = useLanguage();
  const t = translations[lang];

  // Hero intro: ASCII photo "materializes" → real photo → typed headline.
  const [introDone, setIntroDone] = useState(false);
  const [hideField, setHideField] = useState(false);
  const [typed, setTyped] = useState(0);
  const [doneTyping, setDoneTyping] = useState(false);

  const line1 = lang === "ar" ? "تجارة" : "Sulfur";
  const line2 = lang === "ar" ? "الكبريت" : "Trading";
  const shown1 = doneTyping ? line1 : line1.slice(0, Math.min(typed, line1.length));
  const shown2 = doneTyping ? line2 : typed > line1.length ? line2.slice(0, typed - line1.length) : "";
  const caretOn1 = introDone && !doneTyping && typed <= line1.length;
  const caretOn2 = introDone && !doneTyping && typed > line1.length;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setIntroDone(true);
      setHideField(true);
      setTyped(999);
      setDoneTyping(true);
      return;
    }
    const t1 = setTimeout(() => setIntroDone(true), 3500);
    const t2 = setTimeout(() => setHideField(true), 4500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (!introDone || doneTyping) return;
    const len = line1.length + line2.length;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= len) {
        clearInterval(id);
        setDoneTyping(true);
      }
    }, 55);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [introDone]);

  return (
    <div className="bg-background flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[70vh] min-h-[500px] flex items-center overflow-hidden bg-[#06080b]">
        {/* Real hero image — fades in once the intro completes */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/sulfur_pile_hero.png"
            alt="Sulfur Pile Hero"
            fill
            priority
            className={clsx("object-cover object-center transition-opacity duration-1000", introDone ? "opacity-40 hover:opacity-60" : "opacity-0")}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06080b] via-[#06080b]/80 to-[#06080b]/10" />
        </div>

        {/* ASCII "materialize" intro, then fades to reveal the photo */}
        {!hideField && (
          <motion.div
            className="absolute inset-0 z-[1]"
            initial={{ opacity: 1 }}
            animate={{ opacity: introDone ? 0 : 1 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <AsciiRevealCanvas src="/images/sulfur_pile_hero.png" charset=" .·:•*oO@" className="absolute inset-0 h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06080b] via-[#06080b]/40 to-[#06080b]/10" />
          </motion.div>
        )}

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 flex items-center gap-3"
            >
              <Mountain className="w-6 h-6 text-accent" />
              <span className="text-accent font-serif italic tracking-wide">
                {t.sulfur.hero.titleGold}
              </span>
            </motion.div>

            <h1 className={clsx("text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white uppercase tracking-tighter leading-[0.85]", isRTL && "font-arabic")}>
              <span className="sr-only">{line1} {line2}</span>
              <span aria-hidden="true">
                {shown1}
                {caretOn1 && <span className="animate-caret font-sans font-normal text-accent">|</span>}
                <br />
                <span className="text-accent">{shown2}</span>
                {caretOn2 && <span className="animate-caret font-sans font-normal text-accent">|</span>}
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={doneTyping ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8"
            >
              <p className={clsx("text-white/80 text-base md:text-lg font-normal leading-relaxed max-w-xl text-balance", isRTL && "text-start")}>
                {t.sulfur.hero.desc}
              </p>
              <Link
                href="/contact"
                className="inline-flex mt-8 px-8 py-3 bg-accent text-background font-bold tracking-widest text-xs rounded-sm hover:bg-white transition-colors uppercase"
              >
                {t.common.requestAQuote}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW & CAPABILITIES */}
      <section className="py-24 md:py-32 relative z-10 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <AnimatedSection direction="up" className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 text-foreground">
            <div className="max-w-2xl">
              <h2 className={clsx("text-3xl md:text-5xl font-serif font-bold uppercase tracking-tighter", isRTL && "font-arabic")}>
                {lang === 'ar' ? <>قوة <span className="text-accent italic font-normal font-sans">خام.</span></> : <>Raw <span className="text-accent italic font-normal">Power.</span></>}
              </h2>
              <p className={clsx("mt-6 text-lg font-normal leading-relaxed text-balance opacity-80", isRTL && "text-start")}>
                {t.sulfur.content.rawPowerDesc}
              </p>
            </div>
          </AnimatedSection>

          {/* Granular Sulfur Split Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <AnimatedSection direction="left" className="relative h-[400px] md:h-[600px] rounded-sm overflow-hidden group">
              <Image
                src="/images/granular_sulfur.jpg"
                alt="Granular Sulfur Material"
                fill
                unoptimized
                className="object-cover object-center opacity-90 hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06080b]/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 w-full border-b-4 border-accent">
                <span className="text-accent font-sans font-bold text-xs tracking-widest uppercase mb-2 block">
                  {t.sulfur.content.gradeA}
                </span>
                <h3 className="text-2xl font-serif font-bold text-white">
                  {t.sulfur.content.premiumSulfur}
                </h3>
              </div>
            </AnimatedSection>

            <StaggerContainer className="flex flex-col gap-10">
              <StaggerItem className={clsx("border-line hover:border-accent transition-colors pt-2 pb-2", isRTL ? "border-r-2 pr-6" : "border-l-2 pl-6")}>
                <h3 className={clsx("text-xl font-serif font-bold text-foreground mb-3", isRTL && "text-start font-arabic")}>
                  {t.sulfur.content.industrialOutput}
                </h3>
                <p className={clsx("text-muted font-normal text-sm md:text-base leading-relaxed", isRTL && "text-start")}>
                  {t.sulfur.content.industrialOutputDesc}
                </p>
              </StaggerItem>

              <StaggerItem className={clsx("border-line hover:border-accent transition-colors pt-2 pb-2", isRTL ? "border-r-2 pr-6" : "border-l-2 pl-6")}>
                <h3 className={clsx("text-xl font-serif font-bold text-foreground mb-3", isRTL && "text-start font-arabic")}>
                  {t.sulfur.content.purityProcessing}
                </h3>
                <p className={clsx("text-muted font-normal text-sm md:text-base leading-relaxed", isRTL && "text-start")}>
                  {t.sulfur.content.purityProcessingDesc}
                </p>
              </StaggerItem>

              <StaggerItem className={clsx("border-line hover:border-accent transition-colors pt-2 pb-2", isRTL ? "border-r-2 pr-6" : "border-l-2 pl-6")}>
                <h3 className={clsx("text-xl font-serif font-bold text-foreground mb-3", isRTL && "text-start font-arabic")}>
                  {t.common.globalLogistics}
                </h3>
                <p className={clsx("text-muted font-normal text-sm md:text-base leading-relaxed", isRTL && "text-start")}>
                  {t.sulfur.content.supplyChainDesc}
                </p>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </section>
    </div>
  );
}
