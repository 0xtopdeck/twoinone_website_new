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
import {
  HardHat,
  Sparkles,
  Cpu,
  Truck,
  Briefcase,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/lib/translations";
import AsciiRevealCanvas from "@/components/AsciiRevealCanvas";
import clsx from "clsx";

// Hero placeholder until a dedicated services hero is generated.
const HERO_IMG = "/images/steel_brays_hero_product.png";

export default function ServicesPage() {
  const { lang, isRTL } = useLanguage();
  const t = translations[lang];
  const ar = lang === "ar";

  // The four capability clusters. Each maps to multiple tender activities.
  const capabilities = [
    {
      key: "construction",
      roman: "I",
      icon: HardHat,
      label: ar ? "القدرة الأولى" : "Capability I",
      title: ar ? "البناء والبنية التحتية" : "Construction & Infrastructure",
      lead: ar
        ? "أعمال البناء العامة وأعمال البنية التحتية المدنية والرصف، بمعايير هندسية صارمة وتسليم في الوقت المحدد."
        : "General contracting, civil infrastructure, and paving works delivered to rigorous engineering standards and on schedule.",
      items: ar
        ? [
            "أعمال البناء والمقاولات العامة - السكنية والتجارية والصناعية والحكومية، بما في ذلك الصيانة والتجديد والتوسعات والتشطيبات الداخلية والخارجية.",
            "أعمال البنية التحتية - شبكات إمدادات المياه والصرف الصحي وخطوط المرافق العامة والوصلات تحت الأرض وأعمال الحفر والردم وجميع الأعمال الهندسية المدنية ذات الصلة.",
            "توريد وتركيب وصيانة أعمال الرصف - البلاط المتداخل والأرصفة والحجارة والساحات الخارجية والطرق والممرات ومواقف السيارات.",
          ]
        : [
            "General Construction & Contracting - residential, commercial, industrial, and government, including maintenance, renovation, expansion, and interior/exterior finishing.",
            "Infrastructure Works - water supply networks, sewerage systems, utility lines, underground service connections, excavation, backfilling, and related civil engineering.",
            "Paving & Hardscape - interlock paving, sidewalks, curbstones, courtyards, roads, walkways, vehicle parking areas, and external landscaping.",
          ],
    },
    {
      key: "facilities",
      roman: "II",
      icon: Sparkles,
      label: ar ? "القدرة الثانية" : "Capability II",
      title: ar ? "إدارة المرافق" : "Facilities Management",
      lead: ar
        ? "خدمات تشغيلية مستمرة تحافظ على المباني والمساحات الخضراء في حالتها المثلى - عقود نظافة متخصصة وصيانة الحدائق وشبكات الري."
        : "Ongoing operational services that keep buildings and green spaces at their best - specialized cleaning contracts, landscape upkeep, and irrigation maintenance.",
      items: ar
        ? [
            "خدمات النظافة العامة والمتخصصة - للمباني السكنية والتجارية والصناعية والحكومية، شاملةً التنظيف الدوري وتنظيف ما بعد البناء وحلول إدارة النظافة.",
            "صيانة وتطوير الحدائق العامة والخاصة والمساحات الخضراء - أعمال الري والتنسيق وزراعة الأشجار والتقليم والتجميل وصيانة شبكات الري.",
          ]
        : [
            "General & Specialized Cleaning Services - residential, commercial, industrial, and government facilities, including routine cleaning, post-construction cleaning, sanitation, and cleaning management solutions.",
            "Parks, Gardens & Green Space Maintenance - irrigation works, landscaping, tree planting, cultivation, pruning, beautification, and maintenance of irrigation systems for public and private estates.",
          ],
    },
    {
      key: "smart",
      roman: "III",
      icon: Cpu,
      label: ar ? "القدرة الثالثة" : "Capability III",
      title: ar ? "الأنظمة الذكية والأمن" : "Smart Systems & Security",
      lead: ar
        ? "أنظمة المراقبة والتحكم الإلكترونية ومنازل ذكية متكاملة - من كاميرات CCTV وأنظمة التحكم بالدخول إلى أتمتة المباني الكاملة."
        : "Electronic monitoring, access control, and fully-integrated smart-building automation - from CCTV and intrusion detection to centralized energy and HVAC control.",
      items: ar
        ? [
            "أنظمة الأمن والمراقبة الإلكترونية - كاميرات الدوائر التلفزيونية المغلقة (CCTV) وأنظمة التحكم في الدخول وأنظمة إنذار التسلل والحلول الأمنية المتكاملة (بعد الحصول على التراخيص اللازمة).",
            "أنظمة المنازل والمباني الذكية - أنظمة التحكم بالإضاءة، وأتمتة التكييف، وإدارة الطاقة، والأتمتة الكهربائية، وأنظمة التحكم بالستائر، والمراقبة والتحكم عن بُعد، والتكامل مع التقنيات الرقمية.",
          ]
        : [
            "Electronic Security & Surveillance - CCTV, access control, intrusion alarms, and integrated security solutions, subject to obtaining the required licenses and approvals.",
            "Smart Home & Smart Building Systems - lighting control, HVAC automation, energy management, electrical automation, curtain control, remote monitoring, and integration with digital and intelligent technologies.",
          ],
    },
    {
      key: "trading",
      roman: "IV",
      icon: Truck,
      label: ar ? "القدرة الرابعة" : "Capability IV",
      title: ar ? "التجارة والتوزيع" : "Trading & Distribution",
      lead: ar
        ? "استيراد وتصدير وتمثيل وكالات للمعدات والمواد والتقنيات المتعلقة بأنشطة الشركة - مع المشاركة في المناقصات الحكومية والخاصة."
        : "Import, export, and agency representation for equipment, materials, and technologies tied to our other capabilities - including participation in government and private tenders.",
      items: ar
        ? [
            "الاستيراد والتصدير والشراء والبيع والتوزيع لجميع المعدات والمواد والآلات والأجهزة والمنتجات والتقنيات المتعلقة بأنشطة الشركة.",
            "التمثيل والوكالات والتوزيع - العمل وكلاء أو موزعين أو ممثلين للشركات المحلية والإقليمية والدولية.",
            "المشاركة في المناقصات والعطاءات ومشاريع المشتريات الحكومية والخاصة.",
          ]
        : [
            "Import, Export, Purchase, Sale & Distribution of all equipment, materials, machinery, devices, products, and technologies related to the Company's activities.",
            "Agency & Representation - acting as agents, distributors, or representatives of local, regional, and international companies.",
            "Tenders & Procurement - participating in government and private tenders, bids, and procurement projects.",
          ],
    },
  ] as const;

  // Hero intro: ASCII reveal then typed two-line headline.
  const [introDone, setIntroDone] = useState(false);
  const [hideField, setHideField] = useState(false);
  const [typed, setTyped] = useState(0);
  const [doneTyping, setDoneTyping] = useState(false);

  const line1 = ar ? "القدرات" : "Capabilities";
  const line2 = ar ? "والخدمات" : "& Services";
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
            alt={ar ? "أعمال البناء والخدمات" : "Construction works and services"}
            fill
            priority
            className={clsx("object-cover object-center transition-opacity duration-1000", introDone ? "opacity-40" : "opacity-0")}
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
              <Briefcase className="w-6 h-6 text-accent" />
              <span className={clsx("text-accent font-serif italic tracking-wide", isRTL && "font-arabic")}>
                {ar
                  ? "أربع قدرات · معيار واحد"
                  : "Four Capabilities · One Standard"}
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
                  ? "من البناء العام والبنية التحتية إلى إدارة المرافق والأنظمة الذكية - نقدم خدماتنا في عمان بمعيار واحد لا يتزحزح، ونشارك في المناقصات الحكومية والخاصة."
                  : "From general construction and infrastructure to facilities management and smart systems - we deliver across Oman to a single uncompromising standard, and bid for government and private contracts."}
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

      {/* 2. CAPABILITIES OVERVIEW STRIP */}
      <section className="py-20 md:py-24 relative z-10 bg-background border-b border-line">
        <div className="container mx-auto px-4 md:px-8">
          <AnimatedSection direction="up" className="mb-12 md:mb-16 text-center">
            <h2 className={clsx("text-3xl md:text-5xl font-serif font-bold text-foreground uppercase tracking-tighter", isRTL && "font-arabic")}>
              {ar ? (
                <>أربع قدرات. <span className="text-accent italic font-normal font-sans">معيار واحد.</span></>
              ) : (
                <>Four Capabilities. <span className="text-accent italic font-normal">One Standard.</span></>
              )}
            </h2>
            <div className="w-24 h-px bg-accent mx-auto mt-8" />
            <p className={clsx("text-muted font-normal max-w-2xl mx-auto mt-8 text-balance", isRTL && "text-start")}>
              {ar
                ? "تعمل مجموعتنا عبر أربعة مجالات تكاملية - مدعومة بنفس الانضباط في الجودة الذي تقدمه أقسامنا الأخرى للسلع الزراعية والمواد الصناعية."
                : "Our group operates across four integrated areas - underwritten by the same quality discipline our agricultural commodities and industrial materials divisions are known for."}
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {capabilities.map((c) => {
              const Icon = c.icon;
              return (
                <StaggerItem
                  key={c.key}
                  direction="up"
                  className="bg-surface p-6 border border-line rounded-sm hover:border-accent/40 transition-colors group"
                >
                  <Icon className="w-7 h-7 text-accent mb-4 group-hover:scale-110 transition-transform" />
                  <span className={clsx("block text-[10px] uppercase tracking-[0.25em] text-muted font-bold mb-2", isRTL && "font-arabic")}>
                    {c.label}
                  </span>
                  <h3 className={clsx("text-base font-serif font-bold text-foreground leading-tight", isRTL && "font-arabic")}>
                    {c.title}
                  </h3>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* 3. DEEP-DIVE: alternating-side blocks for each capability */}
      {capabilities.map((c, idx) => {
        const Icon = c.icon;
        const flipped = idx % 2 === 1; // alternate sides
        // TODO: when section hero images exist at /images/services-{key}.png, replace the placeholder block.
        return (
          <section
            key={c.key}
            id={c.key}
            className={clsx(
              "py-20 md:py-28 relative overflow-hidden",
              idx % 2 === 0 ? "bg-background" : "bg-surface"
            )}
          >
            <div className="container mx-auto px-4 md:px-8">
              <div className={clsx("grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center", flipped && "lg:[direction:rtl]")}>
                {/* Visual block (left or right depending on idx). When ready, swap the
                    placeholder div for <Image src={`/images/services-${c.key}.png`} ... /> */}
                <div className={clsx("lg:col-span-5", flipped ? "lg:[direction:ltr]" : "")}>
                  <AnimatedSection
                    direction={flipped ? "left" : "right"}
                    className="relative aspect-[4/3] rounded-sm overflow-hidden border border-line bg-gradient-to-br from-surface-2 via-surface to-background flex items-center justify-center group"
                  >
                    <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_30%_20%,_var(--color-accent)_0%,_transparent_60%)]" />
                    <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_70%_80%,_var(--color-accent)_0%,_transparent_60%)]" />
                    <Icon className="relative w-32 h-32 md:w-40 md:h-40 text-accent/50 group-hover:scale-105 transition-transform duration-700" strokeWidth={1} />
                    <span className={clsx("absolute bottom-6 left-6 right-6 text-center text-[10px] uppercase tracking-[0.3em] text-muted font-bold", isRTL && "font-arabic")}>
                      {c.label} - {c.title}
                    </span>
                  </AnimatedSection>
                </div>

                {/* Copy column */}
                <div className={clsx("lg:col-span-7", flipped ? "lg:[direction:ltr]" : "")}>
                  <AnimatedSection direction="up">
                    <div className={clsx("flex items-center gap-3 mb-5", isRTL && "flex-row-reverse justify-end")}>
                      <Icon className="w-6 h-6 text-accent" />
                      <span className={clsx("text-accent text-xs uppercase font-bold tracking-widest", isRTL && "font-arabic")}>
                        {c.label}
                      </span>
                    </div>
                    <h2 className={clsx("text-3xl md:text-5xl font-serif font-bold text-foreground uppercase tracking-tighter mb-6", isRTL && "font-arabic text-start")}>
                      {c.title}
                    </h2>
                    <p className={clsx("text-muted font-normal leading-relaxed mb-8 text-balance", isRTL && "text-start")}>
                      {c.lead}
                    </p>

                    <ul className="space-y-4">
                      {c.items.map((item, i) => (
                        <li key={i} className={clsx("flex gap-3", isRTL && "flex-row-reverse text-start")}>
                          <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                          <span className={clsx("text-foreground/85 text-sm md:text-base leading-relaxed", isRTL && "font-arabic")}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </AnimatedSection>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* 4. LEGAL DISCLAIMER — activity #9 catch-all */}
      <section className="py-16 bg-background border-t border-line">
        <div className="container mx-auto px-4 md:px-8">
          <AnimatedSection direction="up">
            <p className={clsx("text-muted text-xs md:text-sm font-normal italic leading-relaxed text-balance max-w-4xl mx-auto text-center", isRTL && "font-arabic")}>
              {ar
                ? "تحتفظ الشركة بحق ممارسة جميع الأنشطة والأعمال والخدمات العَرَضية أو التكميلية أو المساعدة أو اللازمة لتحقيق أهدافها، بشرط الحصول على جميع التراخيص والتصاريح والموافقات المطلوبة من الجهات المختصة في سلطنة عُمان."
                : "The Company may undertake all activities, businesses, and services that are incidental, complementary, ancillary, or necessary to achieve its objectives, subject to obtaining the required licenses, permits, and approvals from the competent authorities in the Sultanate of Oman."}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 5. CTA BAND */}
      <section className="py-20 md:py-28 bg-surface relative">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <Briefcase className="w-8 h-8 text-accent mx-auto mb-6" />
          <h2 className={clsx("text-3xl md:text-5xl font-serif font-bold text-foreground uppercase tracking-tighter mb-6 text-balance", isRTL && "font-arabic")}>
            {ar ? "هل لديكم مشروع نناقشه؟" : "Have a Project to Discuss?"}
          </h2>
          <p className={clsx("text-muted font-normal max-w-xl mx-auto mb-10 text-balance", isRTL && "text-start")}>
            {ar
              ? "أرسلوا لنا نطاق العمل والموقع والجدول الزمني، وسيعود إليكم فريقنا بعرض تقني وتجاري."
              : "Send us your scope, location, and timeline, and our team will return with a technical and commercial proposal."}
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
