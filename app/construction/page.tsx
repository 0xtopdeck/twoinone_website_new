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
import { HardHat } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/lib/translations";
import AsciiRevealCanvas from "@/components/AsciiRevealCanvas";
import clsx from "clsx";

export default function ConstructionPage() {
  const { lang, isRTL } = useLanguage();
  const t = translations[lang];

  const lifecycleSteps = [
    {
      num: "01",
      title: lang === 'ar' ? "تأمين المواد" : "Material Sourcing",
      desc: lang === 'ar' ? "تأمين فولاذ البناء من فئة النخبة والخشب الرقائقي الهيكلي من المنتجين الدوليين المعتمدين." : "Procuring elite grade construction steel and structural plywood from verified international producers.",
    },
    {
      num: "02",
      title: lang === 'ar' ? "مراقبة الجودة" : "Quality Control",
      desc: lang === 'ar' ? "يتم اختبار كل دفعة لضمان الامتثال لملفات تعريف تحمل الأحمال القصوى والانبعاثات الكيميائية الصارمة." : "Every batch is tested to ensure compliance with strict load-bearing and chemical emission profiles.",
    },
    {
      num: "03",
      title: lang === 'ar' ? "توزيع الموقع" : "Site Distribution",
      desc: lang === 'ar' ? "تسليم شحن منسق وموقوت إلى مواقع عملكم. نحن نضمن وصول المواد بالضبط عندما يحتاج إليها مقاولوكم." : "Coordinated, timed freight delivery to your worksites. We ensure materials arrive precisely when your contractors need them.",
    },
  ];

  // Hero intro: ASCII photo "materializes" → real photo → typed headline.
  const [introDone, setIntroDone] = useState(false);
  const [hideField, setHideField] = useState(false);
  const [typed, setTyped] = useState(0);
  const [doneTyping, setDoneTyping] = useState(false);

  const line1 = lang === "ar" ? "الإنشاءات" : "Industrial";
  const line2 = lang === "ar" ? "الصناعية" : "Construction";
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
            src="/images/steel_brays_hero_product.png"
            alt="Structural Steel Construction"
            fill
            priority
            className={clsx("object-cover object-center transition-opacity duration-1000", introDone ? "opacity-40" : "opacity-0")}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06080b] via-[#06080b]/80 to-transparent" />
        </div>

        {/* ASCII "materialize" intro, then fades to reveal the photo */}
        {!hideField && (
          <motion.div
            className="absolute inset-0 z-[1]"
            initial={{ opacity: 1 }}
            animate={{ opacity: introDone ? 0 : 1 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <AsciiRevealCanvas src="/images/steel_brays_hero_product.png" charset=" .:-=+*#%@" className="absolute inset-0 h-full w-full" />
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
              <HardHat className="w-6 h-6 text-accent" />
              <span className="text-accent font-serif italic tracking-wide">
                {t.construction.hero.titleGray}
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
                {t.construction.hero.desc}
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

      {/* 2. PROJECT LIFECYCLE TIMELINE */}
      <section className="py-24 md:py-32 relative z-10 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <AnimatedSection direction="up" className="mb-16 md:mb-24 text-center">
            <h2 className={clsx("text-3xl md:text-5xl font-serif font-bold text-foreground uppercase tracking-tighter", isRTL && "font-arabic")}>
              {lang === 'ar' ? <>دورة حياة <span className="text-accent italic font-normal font-sans">التوريد.</span></> : <>Supply <span className="text-accent italic font-normal">Lifecycle.</span></>}
            </h2>
            <div className="w-24 h-px bg-accent mx-auto mt-8" />
          </AnimatedSection>

          <div className="relative max-w-5xl mx-auto">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-line z-0" />

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
              {lifecycleSteps.map((step, idx) => (
                <StaggerItem
                  key={step.num}
                  direction="up"
                  className="relative group bg-surface p-8 border border-line rounded-sm shadow-sm hover:shadow-xl transition-shadow duration-500"
                >
                  <div className="w-16 h-16 bg-surface-2 text-accent rounded-full flex items-center justify-center font-serif text-xl font-bold mb-8 md:-translate-y-16 mx-auto md:mx-0 group-hover:scale-110 transition-transform duration-500 shadow-lg border-4 border-background dir-ltr" style={{ direction: 'ltr' }}>
                    {step.num}
                  </div>
                  <h3 className={clsx("text-2xl font-serif font-bold text-foreground mb-4 text-center md:text-left", isRTL && "text-start font-arabic")}>
                    {step.title}
                  </h3>
                  <p className={clsx("text-muted font-normal leading-relaxed text-sm text-center md:text-left text-balance", isRTL && "text-start")}>
                    {step.desc}
                  </p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* 3. MASONRY GALLERY */}
      <section className="py-24 bg-surface relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <AnimatedSection direction="up" className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
            <h2 className={clsx("text-3xl md:text-5xl font-serif font-bold text-foreground uppercase tracking-tighter", isRTL && "font-arabic")}>
              {lang === 'ar' ? <>الخدمات اللوجستية <span className="text-muted italic font-normal font-sans">العالمية.</span></> : <>Global <span className="text-muted italic font-normal">Logistics.</span></>}
            </h2>
            <p className={clsx("text-muted font-normal max-w-md text-balance text-sm md:text-base", isRTL && "text-start")}>
              {lang === 'ar' ? "نظرة على النطاق الهائل للمواد التي يتم توريدها وتوزيعها من قبل شبكات التوريد الخاصة بنا لمشاريع البنية التحتية." : "A view into the massive scale of materials sourced and distributed by our supply networks for infrastructure projects."}
            </p>
          </AnimatedSection>

          {/* CSS Grid with Masonry effect fallback */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-12 gap-4 md:grid-rows-[300px_300px]">
            {/* Large Image */}
            <StaggerItem className="md:col-span-8 md:row-span-2 relative group overflow-hidden rounded-sm min-h-[400px] md:min-h-0">
              <Image
                src="/images/plywood_deck_construction_use.png"
                alt="Plywood Deck Construction"
                fill
                className="object-cover object-center opacity-90 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06080b]/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-white">
                  {lang === 'ar' ? "نظام قوالب الخشب الصناعي" : "Industrial Plywood Formwork System"}
                </h3>
              </div>
            </StaggerItem>

            {/* Small Top Image */}
            <StaggerItem className="md:col-span-4 md:row-span-1 relative group overflow-hidden rounded-sm min-h-[300px] md:min-h-0">
              <Image
                src="/images/steel_brays_hero_product.png"
                alt="Steel Structure"
                fill
                className="object-cover object-center opacity-90 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06080b]/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-lg font-serif font-bold text-white">
                  {lang === 'ar' ? "البنية التحتية الفولاذية الثقيلة" : "Heavy Steel Infrastructure"}
                </h3>
              </div>
            </StaggerItem>

            {/* Solid Color / Text Block */}
            <StaggerItem className="md:col-span-4 md:row-span-1 bg-surface-2 text-foreground p-8 rounded-sm flex flex-col justify-center group relative overflow-hidden min-h-[300px] md:min-h-0">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <HardHat className="w-24 h-24" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4 z-10">
                {lang === 'ar' ? <span className="dir-ltr" style={{ direction: 'ltr' }}>GCC Lead time 2-3 Weeks</span> : "GCC Lead time 2-3 Weeks"}
              </h3>
              <p className={clsx("font-normal text-sm text-muted z-10 max-w-[200px]", isRTL && "text-start")}>
                {lang === 'ar' ? "توزيع ولوجستيات صارمة عبر شبكات دولية متعددة." : "Rigorous distribution and logistics across multiple international networks."}
              </p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
