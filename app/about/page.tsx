"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedSection";
import { Landmark, Compass, Target } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/lib/translations";
import AsciiRevealCanvas from "@/components/AsciiRevealCanvas";
import { useHeroIntro } from "@/components/useHeroIntro";
import clsx from "clsx";

export default function AboutPage() {
  const { lang, isRTL } = useLanguage();
  const t = translations[lang];

  const line1 = lang === "ar" ? "من" : "About";
  const line2 = lang === "ar" ? "نحن" : "Us";
  const { introDone, hideField, typed, doneTyping } = useHeroIntro(line1.length + line2.length);
  const shown1 = doneTyping ? line1 : line1.slice(0, Math.min(typed, line1.length));
  const shown2 = doneTyping ? line2 : typed > line1.length ? line2.slice(0, typed - line1.length) : "";
  const caretOn1 = introDone && !doneTyping && typed <= line1.length;
  const caretOn2 = introDone && !doneTyping && typed > line1.length;

  return (
    <div className="bg-background flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[60vh] min-h-[400px] flex items-center overflow-hidden bg-[#06080b]">
        {/* Real hero image — fades in once the intro completes */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/home_hero.png"
            alt="Bulker ship representing global reach"
            fill
            priority
            className={clsx("object-cover object-[98%_center] md:object-center transition-opacity duration-1000", introDone ? "opacity-40 hover:opacity-60" : "opacity-0")}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06080b] via-[#06080b]/80 to-transparent" />
        </div>

        {/* ASCII "materialize" intro */}
        {!hideField && (
          <motion.div
            className="absolute inset-0 z-[1]"
            initial={{ opacity: 1 }}
            animate={{ opacity: introDone ? 0 : 1 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <AsciiRevealCanvas src="/images/home_hero.png" className="absolute inset-0 h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06080b] via-[#06080b]/40 to-transparent" />
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
              <Landmark className="w-6 h-6 text-accent" />
              <span className="text-accent font-serif italic tracking-wide">
                {t.about.hero.profile}
              </span>
            </motion.div>

            <h1 className={clsx("text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white uppercase tracking-tighter leading-[0.85]", isRTL && "font-arabic")}>
              <span className="sr-only">{line1} {line2}</span>
              <span aria-hidden="true">
                {shown1}
                {caretOn1 && <span className="animate-caret font-sans font-normal text-accent">|</span>}
                <br />
                {shown2}
                {caretOn2 && <span className="animate-caret font-sans font-normal text-accent">|</span>}
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={doneTyping ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-white/90 text-base md:text-lg font-normal leading-relaxed max-w-xl text-balance mt-6">
                {t.about.hero.desc}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. TEXT CONTENT & CORPORATE STATEMENTS */}
      <section className="py-24 md:py-32 relative z-10 bg-background overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 lg:gap-24">

            {/* Left Column: Who We Are */}
            <div className="md:col-span-7 lg:col-span-8">
              <AnimatedSection direction="up" className="mb-12">
                <h2 className={clsx("text-4xl md:text-6xl font-serif font-bold text-foreground uppercase tracking-tighter mb-8", isRTL && "font-arabic")}>
                  {lang === 'ar' ? <>من <span className="text-accent italic font-normal font-sans">نحن.</span></> : <>Who We <span className="text-accent italic font-normal">Are.</span></>}
                </h2>
                <div className={clsx("space-y-6 text-foreground/80 font-normal text-base md:text-lg leading-relaxed text-balance", isRTL && "text-start")}>
                  <p>
                    <strong className={clsx("font-bold text-foreground", isRTL && "font-arabic")}>
                      {lang === 'ar' ? "اثنين في واحد ش.م.م" : "Two in One LLC"}
                    </strong> {lang === 'ar' ? "هي مورد بالجملة رائد يعمل في جوهر التجارة العالمية. نحن نقدم مواد ذات جودة استثنائية، تلبي عتبات النقاء الصارمة ومعايير ISO، مع مراعاة معايير الانبعاثات في منتجاتنا." : "is a premier wholesale supplier operating at the nexus of global trade. We deliver materials of exceptional quality, meeting strict purity thresholds and ISO standards, concerning emissions standards in our products."}
                  </p>
                  <p>
                    {t.about.content.p2}
                  </p>
                  <p>
                    {t.about.content.p3}
                  </p>
                  <p>
                    {t.about.content.p4}
                  </p>
                </div>
              </AnimatedSection>
            </div>

            {/* Right Column: Vision & Mission */}
            <div className={clsx("md:col-span-5 lg:col-span-4 flex flex-col gap-12 border-t md:border-t-0 border-line pt-12 md:pt-0", isRTL ? "md:border-r md:pr-12 lg:pr-16" : "md:border-l md:pl-12 lg:pl-16")}>

              <AnimatedSection direction={isRTL ? "right" : "left"} delay={0.2} className="relative">
                <Compass className="w-8 h-8 text-accent mb-6" />
                <h3 className={clsx("text-2xl font-serif font-bold text-foreground mb-4", isRTL && "text-start font-arabic")}>
                  {t.about.content.visionTitle}
                </h3>
                <p className={clsx("text-muted font-normal text-base leading-relaxed text-balance", isRTL && "text-start")}>
                  {t.about.content.visionDesc}
                </p>
              </AnimatedSection>

              <div className="w-12 h-px bg-line" />

              <AnimatedSection direction={isRTL ? "right" : "left"} delay={0.4} className="relative">
                <Target className="w-8 h-8 text-accent mb-6" />
                <h3 className={clsx("text-2xl font-serif font-bold text-foreground mb-4", isRTL && "text-start font-arabic")}>
                  {t.about.content.missionTitle}
                </h3>
                <p className={clsx("text-muted font-normal text-base leading-relaxed text-balance", isRTL && "text-start")}>
                  {t.about.content.missionDesc}
                </p>
              </AnimatedSection>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
