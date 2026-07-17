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
import { Wheat, Droplets, Ship } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/lib/translations";
import AsciiRevealCanvas from "@/components/AsciiRevealCanvas";
import clsx from "clsx";

export default function AgriculturePage() {
  const { lang, isRTL } = useLanguage();
  const t = translations[lang];

  const lifecycleSteps = [
    {
      num: "01",
      title: t.home.agri.grainExports.title,
      desc: t.home.agri.grainExports.desc,
      icon: Wheat,
    },
    {
      num: "02",
      title: lang === 'ar' ? "اختبارات الجودة" : "Surveyor Testing",
      desc: t.home.agri.surveyorTesting.desc,
      icon: Droplets,
    },
    {
      num: "03",
      title: t.home.agri.logistics.title,
      desc: t.home.agri.logistics.desc,
      icon: Ship,
    },
  ];

  // Hero intro: ~3s swaying wheat-symbol field → real photo → typed headline.
  const [introDone, setIntroDone] = useState(false);
  const [hideField, setHideField] = useState(false);
  const [typed, setTyped] = useState(0);
  const [doneTyping, setDoneTyping] = useState(false);

  const line1 = lang === "ar" ? "الزراعة" : "Global";
  const line2 = lang === "ar" ? "العالمية" : "Agriculture";
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
        {/* Real hero image — fades in once the wheat-field intro completes */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/wheat_brays_hero.png"
            alt="Medium-Hard Wheat Field"
            fill
            priority
            className={clsx(
              "object-cover object-center saturate-150 transition-opacity duration-1000",
              introDone ? "opacity-40 hover:opacity-60" : "opacity-0"
            )}
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
            <AsciiRevealCanvas src="/images/wheat_brays_hero.png" charset=" .:-=+*#%@" className="absolute inset-0 h-full w-full" />
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
              <Wheat className="w-6 h-6 text-accent-2" />
              <span className="text-accent-2 font-serif italic tracking-wide">
                {t.agriculture.hero.titleGold}
              </span>
            </motion.div>

            <h1 className={clsx("text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white uppercase tracking-tighter leading-[0.85]", isRTL && "font-arabic")}>
              <span className="sr-only">{line1} {line2}</span>
              <span aria-hidden="true">
                {shown1}
                {caretOn1 && <span className="animate-caret font-sans font-normal text-accent-2">|</span>}
                <br />
                <span className="text-accent-2">{shown2}</span>
                {caretOn2 && <span className="animate-caret font-sans font-normal text-accent-2">|</span>}
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={doneTyping ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8"
            >
              <p className="text-white/80 text-base md:text-lg font-normal leading-relaxed max-w-xl text-balance">
                {t.agriculture.hero.desc}
              </p>
              <Link
                href="/contact"
                className="inline-flex mt-8 px-8 py-3 bg-accent-2 text-background font-bold tracking-widest text-xs rounded-sm hover:bg-white transition-colors uppercase"
              >
                {t.common.requestAQuote}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. SUPPLY CHAIN TIMELINE */}
      <section className="py-24 md:py-32 relative z-10 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <AnimatedSection direction="up" className="mb-16 md:mb-24 text-center">
            <h2 className={clsx("text-4xl md:text-6xl font-serif font-bold text-foreground uppercase tracking-tighter", isRTL && "font-arabic")}>
              {lang === 'ar' ? <>سلسلة <span className="text-accent-2 italic font-normal font-sans">التوريد.</span></> : <>Supply <span className="text-accent-2 italic font-normal">Chain.</span></>}
            </h2>
            <div className="w-24 h-px bg-accent-2 mx-auto mt-8" />
          </AnimatedSection>

          <div className="relative max-w-5xl mx-auto">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-line z-0" />

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
              {lifecycleSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <StaggerItem
                    key={step.num}
                    direction="up"
                    className="relative group bg-surface p-8 border border-line rounded-sm shadow-sm hover:shadow-xl transition-shadow duration-500"
                  >
                    <div className="w-16 h-16 bg-surface-2 text-accent-2 rounded-full flex items-center justify-center mb-8 md:-translate-y-16 mx-auto md:mx-0 group-hover:scale-110 transition-transform duration-500 shadow-lg border-4 border-background">
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="text-accent-2 font-mono text-sm tracking-widest font-bold mb-2 text-center md:text-left dir-ltr" style={{ direction: 'ltr' }}>
                      {step.num}
                    </div>
                    <h3 className={clsx("text-2xl font-serif font-bold text-foreground mb-4 text-center md:text-left", isRTL && "text-start font-arabic")}>
                      {step.title}
                    </h3>
                    <p className={clsx("text-muted font-normal leading-relaxed text-sm text-center md:text-left text-balance", isRTL && "text-start")}>
                      {step.desc}
                    </p>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* 3. OMANI DATES PORTFOLIO */}
      <section className="py-24 md:py-32 bg-surface relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <AnimatedSection direction="up" className="mb-14 flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <div className={clsx("flex items-center gap-3 mb-4", isRTL && "flex-row-reverse justify-end")}>
                <Wheat className="w-5 h-5 text-accent-2" />
                <span className={clsx("text-accent-2 text-xs uppercase font-bold tracking-widest", isRTL && "font-arabic")}>
                  {lang === 'ar' ? "التمور العُمانية الفاخرة" : "Premium Omani Dates"}
                </span>
              </div>
              <h2 className={clsx("text-3xl md:text-5xl font-serif font-bold text-foreground uppercase tracking-tighter", isRTL && "font-arabic")}>
                {lang === 'ar' ? <>تصدير <span className="text-accent-2 italic font-normal font-sans">التمور.</span></> : <>Dates <span className="text-accent-2 italic font-normal">Export.</span></>}
              </h2>
            </div>
            <p className={clsx("text-muted font-normal max-w-xl text-balance text-sm md:text-base", isRTL && "text-start")}>
              {lang === 'ar'
                ? "تصدير جميع أنواع التمور العُمانية الفاخرة، بما فيها أصناف مختارة بعناية من مزارع منتشرة في مختلف مناطق سلطنة عُمان - مع خيارات تعبئة متعددة لتناسب الأسواق العالمية."
                : "Export of all varieties of premium Omani dates, carefully selected from farms across the Sultanate of Oman. Each variety has its own unique character, taste, texture, origin, and packaging options tailored to global markets."}
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                key: "khalas",
                name: lang === 'ar' ? "الخلاص" : "Khalas",
                image: "/images/dates_khalas.png",
                desc: lang === 'ar'
                  ? "صنف فاخر ذو قوام طري وطعم يشبه العسل الكرميلي - يزرع في الباطنة والداخلية، ويُعبّأ في علب فاخرة 250 غ / 500 غ / 1 كغ."
                  : "A premium variety with a soft, dense flesh and honey-caramel notes - grown in Al-Batinah and the interior, packed in premium 250 g / 500 g / 1 kg gift boxes.",
              },
              {
                key: "fardh",
                name: lang === 'ar' ? "الفرض" : "Fardh",
                image: "/images/dates_fardh.png",
                desc: lang === 'ar'
                  ? "التمر التصديري الأول في عُمان - داكن اللون، مطاطي القوام، غني بالحلاوة. متوفر بأكياس صب 5 و10 كغ لأسواق آسيا وأفريقيا."
                  : "Oman's flagship export date - dark, glossy, chewy, and richly sweet. Available in 5 kg and 10 kg bulk cases for Asian and African markets.",
              },
              {
                key: "khunaizi",
                name: lang === 'ar' ? "الخنيزي" : "Khunaizi",
                image: "/images/dates_khunaizi.png",
                desc: lang === 'ar'
                  ? "تمر بلون بني محمر وحلاوة عميقة - ذو نكهة كثيفة تفضّلها الأسواق الخليجية. تعبئة 500 غ / 1 كغ / 5 كغ."
                  : "A red-brown variety with deep sweetness and dense flavor prized in Gulf markets. Packed in 500 g, 1 kg, and 5 kg formats.",
              },
              {
                key: "naghal",
                name: lang === 'ar' ? "النغال" : "Naghal",
                image: "/images/dates_naghal.png",
                desc: lang === 'ar'
                  ? "تمر صلب متوسط الحلاوة، يُقطف مبكراً - مثالي للاستهلاك الطازج والحلويات الحرفية. عبوات 1 و2 كغ."
                  : "A firm, mildly sweet date harvested early - ideal for fresh consumption and artisan confectionery. 1 kg and 2 kg trays.",
              },
              {
                key: "khasab",
                name: lang === 'ar' ? "الخصاب" : "Khasab",
                image: "/images/dates_khasab.png",
                desc: lang === 'ar'
                  ? "تمر أصفر مقرمش يُحصد في مرحلة الخلال - نكهة منعشة قابضة تناسب أسواق التمور الطازجة. عبوات مبردة 500 غ."
                  : "Bright yellow, crisp dates harvested at the khalal stage - refreshingly tannic, suited to fresh-date markets. Chilled 500 g clamshells.",
              },
              {
                key: "mabsali",
                name: lang === 'ar' ? "المبسلي" : "Mabsali",
                image: "/images/dates_mabsali.png",
                desc: lang === 'ar'
                  ? "تمر صغير رطب وحلو المذاق، من مزارع الداخلية - يُعبّأ للأسواق المتخصصة بعبوات 250 غ و 500 غ."
                  : "A small, moist, delicately sweet date from interior groves - packed for specialty markets in 250 g and 500 g formats.",
              },
            ].map((d) => (
              <StaggerItem
                key={d.key}
                direction="up"
                className="bg-surface-2 rounded-sm border border-line overflow-hidden group hover:border-accent-2/40 transition-colors"
              >
                <div className="relative w-full h-56 overflow-hidden">
                  <Image
                    src={d.image}
                    alt={d.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-2 via-surface-2/10 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className={clsx("text-xl font-serif font-bold text-foreground mb-2", isRTL && "font-arabic text-start")}>
                    {d.name}
                  </h3>
                  <div className="w-8 h-px bg-accent-2 mb-4 group-hover:w-12 transition-all" />
                  <p className={clsx("text-muted font-normal text-sm leading-relaxed text-balance", isRTL && "text-start")}>
                    {d.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 4. OPERATIONS GALLERY */}
      <section className="py-24 bg-surface relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <AnimatedSection direction="up" className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
            <h2 className={clsx("text-3xl md:text-5xl font-serif font-bold text-foreground uppercase tracking-tighter", isRTL && "font-arabic")}>
              {lang === 'ar' ? <>العمليات <span className="text-accent-2 italic font-normal font-sans">العالمية.</span></> : <>Global <span className="text-accent-2 italic font-normal">Operations.</span></>}
            </h2>
            <p className={clsx("text-muted font-normal max-w-md text-balance text-sm md:text-base", isRTL && "text-start")}>
              {lang === 'ar' ? "نعمل بحجم غير مسبوق لإدارة صادرات الحبوب والخدمات اللوجستية المعتمدة من الفاحصين في جميع أنحاء العالم." : "Operating at unprecedented scale to manage grain exports and surveyor-certified logistics worldwide."}
            </p>
          </AnimatedSection>

          {/* CSS Grid with Masonry effect fallback */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-12 gap-4 md:grid-rows-[300px_300px]">
             {/* Large Image */}
             <StaggerItem className="md:col-span-8 md:row-span-2 relative group overflow-hidden rounded-sm min-h-[400px] md:min-h-0">
              <Image
                src="/images/wheat_loading.png"
                alt="Wheat Logistics"
                fill
                className="object-cover object-center opacity-90 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06080b]/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 w-full transition-all duration-500">
                <span className="text-accent-2 text-xs tracking-widest uppercase font-bold mb-2 block">
                  {lang === 'ar' ? "تكامل الخدمات اللوجستية" : "Logistics Integration"}
                </span>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-white">
                  {lang === 'ar' ? "توزيع سفن الصب" : "Bulk Carrier Distribution"}
                </h3>
              </div>
            </StaggerItem>

            {/* Small Top Image */}
            <StaggerItem className="md:col-span-4 md:row-span-1 relative group overflow-hidden rounded-sm min-h-[300px] md:min-h-0">
              <Image
                src="/images/harvesting_brays_hero_product.png"
                alt="Grain Harvesting"
                fill
                className="object-cover object-center opacity-90 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06080b]/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-lg font-serif font-bold text-white">
                  {lang === 'ar' ? "حصاد واسع النطاق" : "Mass Scale Harvesting"}
                </h3>
              </div>
            </StaggerItem>

            {/* Solid Color / Text Block */}
            <StaggerItem className="md:col-span-4 md:row-span-1 bg-accent-2 text-background p-8 rounded-sm flex flex-col justify-center group relative overflow-hidden min-h-[300px] md:min-h-0">
              <div className="absolute inset-0 m-auto flex items-center justify-center opacity-15 pointer-events-none">
                <Wheat className="w-48 h-48 -translate-y-4" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4 z-10 relative">
                {lang === 'ar' ? "معتمد من الفاحصين" : "Surveyor Certified"}
              </h3>
              <p className={clsx("font-medium text-sm text-background/80 z-10 relative max-w-[200px]", isRTL && "text-start")}>
                {lang === 'ar' ? "عتبات نقاء رائدة في الصناعة للتجارة الدولية." : "Industry-leading purity thresholds for international trade."}
              </p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
