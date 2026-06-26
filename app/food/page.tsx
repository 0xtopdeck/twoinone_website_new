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
import { Wheat, Truck, ShieldCheck, Ship } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/lib/translations";
import AsciiRevealCanvas from "@/components/AsciiRevealCanvas";
import clsx from "clsx";

const HERO_IMG = "/images/Food_export_import.png";

export default function FoodPage() {
  const { lang, isRTL } = useLanguage();
  const t = translations[lang];
  const ar = lang === "ar";

  const processSteps = [
    {
      num: "01",
      title: ar ? "التوريد العالمي" : "Global Sourcing",
      desc: ar
        ? "نختار المنتجين الموثوقين عبر آسيا وأوروبا والأمريكتين لكل سلعة - الأرز والسكر وزيوت الطهي والدقيق - بمعايير منشأ صارمة."
        : "We hand-pick trusted producers across Asia, Europe, and the Americas for every commodity - rice, sugar, cooking oils, and flour - with strict provenance standards.",
    },
    {
      num: "02",
      title: ar ? "فحص الجودة والشهادات" : "Quality & Certification",
      desc: ar
        ? "كل دفعة تخضع لاختبار طرف ثالث (SGS / Bureau Veritas) للنقاء والرطوبة وسلامة الغذاء قبل الشحن."
        : "Every batch is third-party tested (SGS / Bureau Veritas) for purity, moisture, and food safety before it ships.",
    },
    {
      num: "03",
      title: ar ? "الشحن والتوزيع" : "Shipping & Distribution",
      desc: ar
        ? "حاويات وشحنات صب من ميناء صلالة وموانئ خليجية أخرى - مع تتبع كامل من المصنع إلى مستودعكم."
        : "Containerized and bulk shipments from Salalah and other Gulf ports - with full track-and-trace from mill to your warehouse.",
    },
  ];

  const products = [
    {
      key: "rice",
      title: ar ? "الأرز" : "Rice",
      desc: ar
        ? "أرز بسمتي وأرز أبيض طويل الحبة وأرز مكسور بأكياس 5، 25، و50 كجم. درجات هندية وباكستانية وتايلاندية."
        : "Basmati, long-grain white, and broken rice in 5, 25, and 50 kg bags. Indian, Pakistani, and Thai grades.",
    },
    {
      key: "sugar",
      title: ar ? "السكر" : "Sugar",
      desc: ar
        ? "سكر أبيض مكرر ICUMSA 45 وسكر خام بنسبة بريكس 99.7+، في أكياس 50 كجم أو شحنات صب."
        : "Refined white sugar ICUMSA 45 and raw sugar at 99.7+ Brix, in 50 kg bags or bulk shipments.",
    },
    {
      key: "oil",
      title: ar ? "زيوت الطهي" : "Cooking Oils",
      desc: ar
        ? "زيت عباد الشمس وزيت النخيل وزيت الذرة - معبأ في عبوات 1، 5، 20 لتر أو ناقلات صب لسلسلة التموين."
        : "Sunflower, palm, and corn oils - packed in 1, 5, 20 L jerry cans, or bulk tankers for foodservice supply chains.",
    },
    {
      key: "flour",
      title: ar ? "الدقيق" : "Flour",
      desc: ar
        ? "دقيق قمح متعدد الأغراض وعالي البروتين للمخابز، بأكياس 25 و 50 كجم من مطاحن معتمدة دولياً."
        : "All-purpose and high-protein wheat flour for bakeries, in 25 and 50 kg bags, milled at internationally certified facilities.",
    },
  ];

  const tags = ar
    ? ["حلال", "ISO 22000", "HACCP", "SGS Tested", "Halal Certified"]
    : ["Halal", "ISO 22000", "HACCP", "SGS Tested", "Bureau Veritas"];

  // Hero intro: ASCII photo "materializes" → real photo → typed headline.
  const [introDone, setIntroDone] = useState(false);
  const [hideField, setHideField] = useState(false);
  const [typed, setTyped] = useState(0);
  const [doneTyping, setDoneTyping] = useState(false);

  const line1 = ar ? "تجارة" : "Food";
  const line2 = ar ? "الغذاء" : "Wholesale";
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
        {/* Real hero image - fades in once the intro completes */}
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_IMG}
            alt={ar ? "بضائع غذائية بالجملة للتصدير والاستيراد" : "Wholesale food products for export and import"}
            fill
            priority
            className={clsx("object-cover object-center transition-opacity duration-1000", introDone ? "opacity-50" : "opacity-0")}
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
            <AsciiRevealCanvas src={HERO_IMG} charset=" .:-=+*#%@" className="absolute inset-0 h-full w-full" />
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
              <Wheat className="w-6 h-6 text-accent" />
              <span className={clsx("text-accent font-serif italic tracking-wide", isRTL && "font-arabic")}>
                {ar ? "الأرز · السكر · الزيوت · الدقيق" : "Rice · Sugar · Oils · Flour"}
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
                {ar
                  ? "نستورد ونصدّر السلع الغذائية الأساسية بالجملة - الأرز، السكر، زيوت الطهي، والدقيق - من منتجين موثوقين عبر آسيا وأوروبا والأمريكتين، إلى تجار التجزئة والموزعين وقطاع الضيافة."
                  : "We import and export wholesale food staples - rice, sugar, cooking oils, and flour - from trusted producers across Asia, Europe, and the Americas, serving retailers, distributors, and the hospitality sector."}
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

      {/* 2. PROCESS TIMELINE */}
      <section className="py-24 md:py-32 relative z-10 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <AnimatedSection direction="up" className="mb-16 md:mb-24 text-center">
            <h2 className={clsx("text-3xl md:text-5xl font-serif font-bold text-foreground uppercase tracking-tighter", isRTL && "font-arabic")}>
              {ar ? <>من المنشأ <span className="text-accent italic font-normal font-sans">إلى رف المتجر.</span></> : <>From Origin <span className="text-accent italic font-normal">to Shelf.</span></>}
            </h2>
            <div className="w-24 h-px bg-accent mx-auto mt-8" />
          </AnimatedSection>

          <div className="relative max-w-5xl mx-auto">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-line z-0" />

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
              {processSteps.map((step) => (
                <StaggerItem
                  key={step.num}
                  direction="up"
                  className="relative group bg-surface p-8 border border-line rounded-sm shadow-sm hover:shadow-xl transition-shadow duration-500"
                >
                  <div className="w-16 h-16 bg-surface-2 text-accent rounded-full flex items-center justify-center font-serif text-xl font-bold mb-8 md:-translate-y-16 mx-auto md:mx-0 group-hover:scale-110 transition-transform duration-500 shadow-lg border-4 border-background" style={{ direction: "ltr" }}>
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

      {/* 3. PRODUCT GRID */}
      <section className="py-24 bg-surface relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <AnimatedSection direction="up" className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
            <h2 className={clsx("text-3xl md:text-5xl font-serif font-bold text-foreground uppercase tracking-tighter", isRTL && "font-arabic")}>
              {ar ? <>سلسلتنا <span className="text-muted italic font-normal font-sans">الغذائية.</span></> : <>Our Food <span className="text-muted italic font-normal">Portfolio.</span></>}
            </h2>
            <p className={clsx("text-muted font-normal max-w-md text-balance text-sm md:text-base", isRTL && "text-start")}>
              {ar
                ? "أربع فئات أساسية تخدم تجار التجزئة والموزعين والمطاعم والمخابز في جميع أنحاء الخليج وما بعده."
                : "Four core categories serving retailers, distributors, restaurants, and bakeries across the Gulf and beyond."}
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <StaggerItem
                key={p.key}
                direction="up"
                className="bg-surface-2 p-8 rounded-sm border border-line hover:border-accent/40 transition-colors group"
              >
                <h3 className={clsx("text-xl font-serif font-bold text-foreground mb-3", isRTL && "font-arabic text-start")}>
                  {p.title}
                </h3>
                <div className="w-8 h-px bg-accent mb-5 group-hover:w-12 transition-all" />
                <p className={clsx("text-muted font-normal text-sm leading-relaxed text-balance", isRTL && "text-start")}>
                  {p.desc}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Certification tags */}
          <AnimatedSection direction="up" delay={0.2} className="mt-16">
            <div className={clsx("flex items-center gap-3 mb-6", isRTL && "flex-row-reverse justify-end")}>
              <ShieldCheck className="w-5 h-5 text-accent" />
              <span className={clsx("text-accent text-xs uppercase font-bold tracking-widest", isRTL && "font-arabic")}>
                {ar ? "معايير الجودة" : "Quality Standards"}
              </span>
            </div>
            <div className={clsx("flex flex-wrap gap-2.5", isRTL && "justify-end")}>
              {tags.map((s) => (
                <span
                  key={s}
                  className={clsx("px-4 py-2 bg-background border border-line rounded-full text-xs font-bold uppercase tracking-widest text-foreground/80", isRTL && "font-arabic")}
                >
                  {s}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 4. LOGISTICS BAND */}
      <section className="py-20 md:py-24 bg-background relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection direction="up" className="bg-surface p-8 rounded-sm border border-line">
              <Truck className="w-7 h-7 text-accent mb-4" />
              <h3 className={clsx("text-lg font-serif font-bold text-foreground mb-2", isRTL && "font-arabic")}>
                {ar ? "تسليم الخليج" : "GCC Delivery"}
              </h3>
              <p className={clsx("text-muted text-sm leading-relaxed", isRTL && "text-start")}>
                {ar ? "تسليم بري عبر دول مجلس التعاون خلال 5-10 أيام، مع تخطيط مسبق للمسارات." : "Overland delivery across the GCC in 5-10 days, with pre-planned routing."}
              </p>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.1} className="bg-surface p-8 rounded-sm border border-line">
              <Ship className="w-7 h-7 text-accent mb-4" />
              <h3 className={clsx("text-lg font-serif font-bold text-foreground mb-2", isRTL && "font-arabic")}>
                {ar ? "الشحن البحري" : "Sea Freight"}
              </h3>
              <p className={clsx("text-muted text-sm leading-relaxed", isRTL && "text-start")}>
                {ar ? "حاويات وشحنات صب من ميناء صلالة والموانئ الخليجية الرئيسية إلى أفريقيا وآسيا." : "Containerized and bulk shipments from Salalah and major Gulf ports to Africa and Asia."}
              </p>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2} className="bg-surface p-8 rounded-sm border border-line">
              <ShieldCheck className="w-7 h-7 text-accent mb-4" />
              <h3 className={clsx("text-lg font-serif font-bold text-foreground mb-2", isRTL && "font-arabic")}>
                {ar ? "تتبع كامل" : "Full Traceability"}
              </h3>
              <p className={clsx("text-muted text-sm leading-relaxed", isRTL && "text-start")}>
                {ar ? "وثائق منشأ ودفعة وشهادات اختبار لكل شحنة، متاحة قبل المغادرة." : "Origin, batch, and test certificates for every shipment, available before departure."}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 5. CTA BAND */}
      <section className="py-20 md:py-28 bg-surface relative">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <Wheat className="w-8 h-8 text-accent mx-auto mb-6" />
          <h2 className={clsx("text-3xl md:text-5xl font-serif font-bold text-foreground uppercase tracking-tighter mb-6 text-balance", isRTL && "font-arabic")}>
            {ar ? "اطلب عرض سعر بالجملة." : "Request a Wholesale Quote."}
          </h2>
          <p className={clsx("text-muted font-normal max-w-xl mx-auto mb-10 text-balance", isRTL && "text-start")}>
            {ar
              ? "أخبرونا بفئة المنتج والكميات والوجهة المطلوبة، وسيعود إليكم فريقنا بتسعير وجدول زمني."
              : "Tell us the product category, volumes, and destination, and our team will return with pricing and a schedule."}
          </p>
          <Link
            href="/contact"
            className="inline-flex px-10 py-4 bg-accent text-background font-bold tracking-widest text-xs rounded-sm hover:bg-white transition-colors uppercase"
          >
            {t.common.requestAQuote}
          </Link>
        </div>
      </section>
    </div>
  );
}
