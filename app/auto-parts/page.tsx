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
import { Truck, Plane, Ship, ShieldCheck, Wrench, Package } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/lib/translations";
import AsciiRevealCanvas from "@/components/AsciiRevealCanvas";
import clsx from "clsx";

const HERO_IMG = "/images/auto-parts-hero.png";

export default function AutoPartsPage() {
  const { lang, isRTL } = useLanguage();
  const t = translations[lang];
  const ar = lang === "ar";

  const processSteps = [
    {
      num: "01",
      title: ar ? "التوريد من المصنّع الأصلي" : "Genuine OEM Sourcing",
      desc: ar
        ? "قطع غيار أصلية 100% من قنوات المصنّع المعتمدة لكل من فولفو ومان ورينو ومرسيدس وهينو - مع أرقام قطع مطابقة ووثائق منشأ لكل شحنة."
        : "100% genuine parts sourced through authorized manufacturer channels for Volvo, MAN, Renault, Mercedes, and Hino - with matching part numbers and origin documentation on every shipment.",
    },
    {
      num: "02",
      title: ar ? "الشحن الجوي للطوارئ" : "Emergency Air Freight",
      desc: ar
        ? "طلبات AOG (شاحنة متوقفة) تُشحن جواً بأولوية قصوى. أنظمة إعادة تعبئة مضغوطة تجعل الإرساليات آمنة ومدمجة وفعّالة من حيث التكلفة."
        : "AOG (truck-off-road) orders shipped by air with top priority. Compact repacking systems keep consignments secure, dense, and cost-efficient.",
    },
    {
      num: "03",
      title: ar ? "شحن الحاويات عبر مراكزنا العالمية" : "Container Shipments via Global Hubs",
      desc: ar
        ? "للأحجام الكبيرة نجمع الحاويات عبر مراكزنا في هولندا والهند وكوريا الجنوبية ودبي. قنوات إمداد بديلة تضمن استمرارية التزويد رغم التحديات الإقليمية."
        : "For larger volumes we consolidate containers via our hubs in the Netherlands, India, South Korea, and Dubai. Alternative supply channels keep flow steady despite regional disruption.",
    },
  ];

  const brands = [
    {
      key: "volvo",
      title: ar ? "شاحنات فولفو" : "Volvo Trucks",
      desc: ar
        ? "قطع غيار أصلية لسلاسل FH وFM وFMX وFH16 - محركات وناقلات حركة وأنظمة كبح وقطع هيكل، مطابقة لمواصفات المصنع الأصلي."
        : "Genuine parts for the FH, FM, FMX, and FH16 series - engines, drivetrain, braking, and chassis components matched to OEM specification.",
    },
    {
      key: "man",
      title: ar ? "شاحنات مان" : "MAN Trucks",
      desc: ar
        ? "قطع غيار TGX وTGS وTGM - وحدات حقن، أنظمة عادم، مكونات كبح، وقطع كابينة أصلية من موردي مان المعتمدين."
        : "TGX, TGS, and TGM parts - injection units, exhaust systems, brake components, and cabin parts from MAN-authorized suppliers.",
    },
    {
      key: "renault",
      title: ar ? "شاحنات رينو" : "Renault Trucks",
      desc: ar
        ? "قطع غيار لسلسلتي T وK - قطع محرك، ناقل حركة، تعليق، وأنظمة كهربائية بشهادة رينو تراكس."
        : "Parts for the T and K series - engine, transmission, suspension, and electrical components with Renault Trucks certification.",
    },
    {
      key: "mercedes",
      title: ar ? "شاحنات مرسيدس" : "Mercedes Trucks",
      desc: ar
        ? "قطع غيار Actros وArocs وAtego الأصلية - MB Genuine Parts مع فواتير Daimler الأصلية ورموز أرقام القطع الكاملة."
        : "Genuine Actros, Arocs, and Atego parts - MB Genuine Parts with original Daimler invoicing and full part-number traceability.",
    },
    {
      key: "hino",
      title: ar ? "شاحنات هينو" : "Hino Trucks",
      desc: ar
        ? "قطع غيار سلاسل 300 و500 و700 - محركات J-Series وناقلات حركة ومنظومات كبح من منظومة موردي هينو اليابانية."
        : "Series 300, 500, and 700 parts - J-Series engines, transmissions, and brake assemblies from Hino's Japanese supplier network.",
    },
  ];

  const tags = ar
    ? ["أصلي 100%", "أرقام قطع OEM", "شهادة ضمان", "AOG جاهز", "مطابق للـ VIN"]
    : ["100% Genuine", "OEM Part Numbers", "Warranty Certified", "AOG Ready", "VIN-Verified"];

  const [introDone, setIntroDone] = useState(false);
  const [hideField, setHideField] = useState(false);
  const [typed, setTyped] = useState(0);
  const [doneTyping, setDoneTyping] = useState(false);

  const line1 = ar ? "قطع" : "Auto";
  const line2 = ar ? "الغيار" : "Parts";
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
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_IMG}
            alt={ar ? "قطع غيار أصلية للشاحنات الثقيلة" : "Genuine heavy-truck spare parts"}
            fill
            priority
            className={clsx("object-cover object-center transition-opacity duration-1000", introDone ? "opacity-50" : "opacity-0")}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06080b] via-[#06080b]/80 to-transparent" />
        </div>

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
              <Truck className="w-6 h-6 text-accent" />
              <span className={clsx("text-accent font-serif italic tracking-wide", isRTL && "font-arabic")}>
                {ar ? "فولفو · مان · رينو · مرسيدس · هينو" : "Volvo · MAN · Renault · Mercedes · Hino"}
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
                  ? "قطع غيار أصلية 100% للشاحنات الثقيلة - فولفو، مان، رينو، مرسيدس، وهينو - عبر قنوات المصنّع المعتمدة. شحن جوي طارئ لطلبات AOG، وحاويات مدمجة عبر مراكزنا في هولندا والهند وكوريا الجنوبية ودبي."
                  : "100% genuine spare parts for heavy trucks - Volvo, MAN, Renault, Mercedes, and Hino - through authorized manufacturer channels. Emergency air freight for AOG orders, and consolidated container shipments via our hubs in the Netherlands, India, South Korea, and Dubai."}
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
              {ar ? <>من المصنّع <span className="text-accent italic font-normal font-sans">إلى مرآبك.</span></> : <>From Factory <span className="text-accent italic font-normal">to Your Bay.</span></>}
            </h2>
            <div className="w-24 h-px bg-accent mx-auto mt-8" />
          </AnimatedSection>

          <div className="relative max-w-5xl mx-auto">
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

      {/* 3. BRAND GRID */}
      <section className="py-24 bg-surface relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <AnimatedSection direction="up" className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
            <h2 className={clsx("text-3xl md:text-5xl font-serif font-bold text-foreground uppercase tracking-tighter", isRTL && "font-arabic")}>
              {ar ? <>ماركاتنا <span className="text-muted italic font-normal font-sans">المعتمدة.</span></> : <>Our Authorized <span className="text-muted italic font-normal">Brands.</span></>}
            </h2>
            <p className={clsx("text-muted font-normal max-w-md text-balance text-sm md:text-base", isRTL && "text-start")}>
              {ar
                ? "خمس ماركات شاحنات ثقيلة رئيسية بقنوات إمداد أصلية معتمدة، تخدم أساطيل النقل والصيانة عبر الخليج وشرق أفريقيا."
                : "Five leading heavy-truck brands with authorized OEM channels, serving fleet operators and workshops across the Gulf and East Africa."}
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((b) => (
              <StaggerItem
                key={b.key}
                direction="up"
                className="bg-surface-2 p-8 rounded-sm border border-line hover:border-accent/40 transition-colors group"
              >
                <h3 className={clsx("text-xl font-serif font-bold text-foreground mb-3", isRTL && "font-arabic text-start")}>
                  {b.title}
                </h3>
                <div className="w-8 h-px bg-accent mb-5 group-hover:w-12 transition-all" />
                <p className={clsx("text-muted font-normal text-sm leading-relaxed text-balance", isRTL && "text-start")}>
                  {b.desc}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection direction="up" delay={0.2} className="mt-16">
            <div className={clsx("flex items-center gap-3 mb-6", isRTL && "flex-row-reverse justify-end")}>
              <ShieldCheck className="w-5 h-5 text-accent" />
              <span className={clsx("text-accent text-xs uppercase font-bold tracking-widest", isRTL && "font-arabic")}>
                {ar ? "معايير الأصالة" : "Authenticity Standards"}
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
            <AnimatedSection direction="up" className="bg-surface rounded-sm border border-line overflow-hidden group">
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src="/images/auto-parts-airfreight.png"
                  alt={ar ? "شحن جوي طارئ لقطع الغيار" : "Emergency air-freight parts pallet"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
              </div>
              <div className="p-8">
                <Plane className="w-7 h-7 text-accent mb-4" />
                <h3 className={clsx("text-lg font-serif font-bold text-foreground mb-2", isRTL && "font-arabic")}>
                  {ar ? "شحن جوي طارئ" : "Emergency Air Freight"}
                </h3>
                <p className={clsx("text-muted text-sm leading-relaxed", isRTL && "text-start")}>
                  {ar ? "طلبات AOG (شاحنة متوقفة) تُشحن جواً بأولوية قصوى، مع إعادة تعبئة مدمجة تخفض الحجم والتكلفة." : "AOG (truck-off-road) orders airfreighted with top priority, using compact repacking to cut volume and cost."}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.1} className="bg-surface rounded-sm border border-line overflow-hidden group">
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src="/images/auto-parts-containers.png"
                  alt={ar ? "شحن حاويات عبر مراكزنا العالمية" : "Container shipments via our global hubs"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
              </div>
              <div className="p-8">
                <Ship className="w-7 h-7 text-accent mb-4" />
                <h3 className={clsx("text-lg font-serif font-bold text-foreground mb-2", isRTL && "font-arabic")}>
                  {ar ? "حاويات مجمّعة" : "Consolidated Containers"}
                </h3>
                <p className={clsx("text-muted text-sm leading-relaxed", isRTL && "text-start")}>
                  {ar ? "شحنات حاويات مجمّعة عبر مراكزنا في هولندا والهند وكوريا الجنوبية ودبي، لأحجام أسطول كبيرة." : "Consolidated container shipments via our hubs in the Netherlands, India, South Korea, and Dubai for fleet-scale volumes."}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2} className="bg-surface rounded-sm border border-line overflow-hidden group">
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src="/images/auto-parts-warehouse.png"
                  alt={ar ? "مستودع مخزون مع قطع غيار أصلية معتمدة" : "Warehouse stock with genuine OEM parts"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
              </div>
              <div className="p-8">
                <Wrench className="w-7 h-7 text-accent mb-4" />
                <h3 className={clsx("text-lg font-serif font-bold text-foreground mb-2", isRTL && "font-arabic")}>
                  {ar ? "استمرارية الإمداد" : "Supply Continuity"}
                </h3>
                <p className={clsx("text-muted text-sm leading-relaxed", isRTL && "text-start")}>
                  {ar ? "قنوات إمداد بديلة تحافظ على تدفق ثابت رغم اضطرابات المنطقة، بلا وقف تشغيلي للأسطول." : "Alternative supply channels maintain steady flow despite regional disruption, keeping fleets uptime-first."}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 5. CTA BAND */}
      <section className="py-20 md:py-28 bg-surface relative">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <Package className="w-8 h-8 text-accent mx-auto mb-6" />
          <h2 className={clsx("text-3xl md:text-5xl font-serif font-bold text-foreground uppercase tracking-tighter mb-6 text-balance", isRTL && "font-arabic")}>
            {ar ? "اطلب قائمة قطع الغيار." : "Request Your Parts List."}
          </h2>
          <p className={clsx("text-muted font-normal max-w-xl mx-auto mb-10 text-balance", isRTL && "text-start")}>
            {ar
              ? "أرسل لنا أرقام القطع أو رقم VIN مع طراز الشاحنة، وسنعود إليك بسعر ومدة توريد - جواً أو بحراً."
              : "Send us part numbers or the truck VIN and model, and our team returns with pricing and lead time - by air or by sea."}
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
