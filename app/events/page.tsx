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
import { CalendarDays, CheckCircle2, ClipboardCheck, Handshake, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/lib/translations";
import AsciiRevealCanvas from "@/components/AsciiRevealCanvas";
import clsx from "clsx";

const HERO_IMG = "/images/Conference_TwoInOne_Speaker.png";
const REGISTRATION_IMG = "/images/Conference_TwoInOne_Registration.png";

export default function EventsPage() {
  const { lang, isRTL } = useLanguage();
  const t = translations[lang];
  const ar = lang === "ar";

  const processSteps = [
    {
      num: "01",
      title: ar ? "المفهوم والتنسيق" : "Concept & Curation",
      desc: ar
        ? "نحدد أهداف الحدث وجدول الأعمال وقائمة المتحدثين والهوية البصرية - ونصمم تجربة مبنية حول رسالتكم."
        : "We define your objectives, agenda, speaker line-up, and visual identity - designing an experience built around your message.",
    },
    {
      num: "02",
      title: ar ? "الإنتاج والخدمات اللوجستية" : "Production & Logistics",
      desc: ar
        ? "المكان، والمسرح، والصوت والإضاءة، والتسجيل، والضيافة، والسفر - يُدار كل تفصيل بدقة وضمن الجدول الزمني."
        : "Venue, staging, AV, registration, hospitality, and travel - every detail managed with precision and on schedule.",
    },
    {
      num: "03",
      title: ar ? "التنفيذ والاستضافة" : "Execution & Hosting",
      desc: ar
        ? "إدارة ميدانية كاملة يوم الحدث، وتجربة سلسة للحضور، وتقارير شاملة بعد انتهاء الفعالية."
        : "Full on-site management on the day, a flawless delegate experience, and comprehensive post-event reporting.",
    },
  ];

  const services = ar
    ? ["المؤتمرات", "القمم", "المعارض", "إطلاق المنتجات", "حفلات الشركات", "ورش العمل"]
    : ["Conferences", "Summits", "Exhibitions", "Product Launches", "Corporate Galas", "Workshops"];

  const productionCapabilities = ar
    ? [
        "تنفيذ وتجهيز الفعاليات",
        "حلول المسارح والهياكل المعدنية",
        "تنسيق الصوت والإضاءة",
        "ديكور مواقع الفعاليات",
        "تنسيق الفعالية ودعم المفهوم الإبداعي",
        "تجهيز المعارض والأجنحة",
        "عناصر الهوية والعرض البصري",
        "دعم الإنتاج الكامل",
      ]
    : [
        "Event Execution & Setup",
        "Stage & Truss Solutions",
        "Sound & Lighting Coordination",
        "Venue Decoration",
        "Event Styling & Concept Support",
        "Exhibition & Booth Setup",
        "Branding & Visual Elements",
        "Full Production Support",
      ];

  // Hero intro: ASCII photo "materializes" → real photo → typed headline.
  const [introDone, setIntroDone] = useState(false);
  const [hideField, setHideField] = useState(false);
  const [typed, setTyped] = useState(0);
  const [doneTyping, setDoneTyping] = useState(false);

  const line1 = ar ? "تنظيم" : "Event";
  const line2 = ar ? "الفعاليات" : "Organizing";
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
            alt={ar ? "متحدث على منصة المؤتمر" : "Conference speaker on stage"}
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
              <CalendarDays className="w-6 h-6 text-accent" />
              <span className={clsx("text-accent font-serif italic tracking-wide", isRTL && "font-arabic")}>
                {ar ? "المؤتمرات · القمم · فعاليات الشركات" : "Conferences · Summits · Corporate Events"}
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
                  ? "نقدم تنفيذًا راقيًا للفعاليات وحلول إنتاج إبداعية تجمع بين الدقة والتميز البصري والتنسيق السلس للفعاليات المؤسسية والخاصة وفعاليات الجهات والمنظمات."
                  : "We deliver refined event execution and creative production solutions, combining precision, visual excellence, and seamless coordination across corporate, private, and organization-led events."}
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
              {ar ? <>كيف <span className="text-accent italic font-normal font-sans">ننفّذ.</span></> : <>How We <span className="text-accent italic font-normal">Deliver.</span></>}
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

      {/* 3. EVENT PRODUCTION CAPABILITIES */}
      <section className="py-24 md:py-32 bg-surface border-y border-line">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-14 lg:gap-20 items-start">
            <AnimatedSection direction="up">
              <div className={clsx("flex items-center gap-3 mb-6", isRTL && "flex-row-reverse justify-end")}>
                <Sparkles className="w-6 h-6 text-accent" />
                <span className={clsx("text-accent text-xs uppercase font-bold tracking-widest", isRTL && "font-arabic")}>
                  {ar ? "التنفيذ والإنتاج" : "Execution & Production"}
                </span>
              </div>
              <h2 className={clsx("text-3xl md:text-5xl font-serif font-bold text-foreground uppercase tracking-tighter mb-7", isRTL && "font-arabic text-start")}>
                {ar ? <>تجارب مصممة <span className="text-accent italic font-normal font-sans">لتترك أثرًا.</span></> : <>Experiences Crafted <span className="text-accent italic font-normal">to Leave an Impression.</span></>}
              </h2>
              <p className={clsx("text-muted leading-relaxed text-base md:text-lg text-balance", isRTL && "text-start")}>
                {ar
                  ? "نمتلك خبرة في الفعاليات المؤسسية والخاصة وفعاليات الجهات والمنظمات، ونتعامل مع كل مشروع من خلال موازنة دقيقة بين التفاصيل الجمالية والتكامل التقني والتنفيذ المنظم. نلتزم بتقديم تجربة متقنة بمعايير رفيعة وتنسيق مدروس يضمن سلاسة كل مرحلة ويترك انطباعًا دائمًا."
                  : "With proven experience across corporate, private, and organization-led events, we approach every project through a considered balance of aesthetic detail, technical integration, and structured execution. Our focus is flawless delivery, elevated standards, and thoughtfully crafted experiences that leave a lasting impression."}
              </p>
            </AnimatedSection>

            <StaggerContainer className="grid sm:grid-cols-2 gap-3">
              {productionCapabilities.map((capability) => (
                <StaggerItem
                  key={capability}
                  direction="up"
                  className={clsx("flex items-start gap-3 bg-background border border-line rounded-sm p-5", isRTL && "flex-row-reverse text-start")}
                >
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className={clsx("text-sm font-semibold leading-relaxed", isRTL && "font-arabic")}>{capability}</span>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <AnimatedSection direction="up" delay={0.2} className="mt-14 bg-[#0a1822] text-white border border-white/10 rounded-sm p-7 md:p-9 flex flex-col md:flex-row gap-6 md:items-center">
            <div className="w-12 h-12 rounded-full bg-accent/15 text-accent flex items-center justify-center shrink-0">
              <Handshake className="w-6 h-6" />
            </div>
            <div>
              <h3 className={clsx("text-xl md:text-2xl font-serif font-bold mb-2", isRTL && "font-arabic text-start")}>
                {ar ? "التنفيذ بالتعاون مع شريك موثوق ومتخصص." : "Executed with a trusted specialist partner."}
              </h3>
              <p className={clsx("text-white/65 text-sm md:text-base leading-relaxed max-w-4xl", isRTL && "text-start")}>
                {ar
                  ? "تدير شركة اثنين في واحد متطلبات الفعالية والتنسيق التجاري والإشراف على المشروع، بينما يتم تنفيذ أعمال التنظيم والإنتاج الفني بالتعاون مع شريك موثوق ومتخصص في تجهيز الفعاليات."
                  : "Two in One manages the event brief, commercial coordination, and project oversight, while event organization and technical production are delivered with a trusted specialist partner experienced in event setup and execution."}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 4. REGISTRATION FEATURE */}
      <section className="py-24 bg-surface relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <AnimatedSection
              direction={isRTL ? "left" : "right"}
              className="relative group overflow-hidden rounded-sm min-h-[360px] md:min-h-[480px]"
            >
              <Image
                src={REGISTRATION_IMG}
                alt={ar ? "تسجيل الحضور في المؤتمر" : "Delegate registration at the conference"}
                fill
                className="object-cover object-center opacity-90 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06080b]/70 via-transparent to-transparent" />
            </AnimatedSection>

            {/* Copy */}
            <AnimatedSection direction="up">
              <div className={clsx("flex items-center gap-3 mb-6", isRTL && "flex-row-reverse justify-end")}>
                <ClipboardCheck className="w-6 h-6 text-accent" />
                <span className={clsx("text-accent font-serif italic tracking-wide", isRTL && "font-arabic")}>
                  {ar ? "تجربة الحضور" : "Delegate Experience"}
                </span>
              </div>
              <h2 className={clsx("text-3xl md:text-5xl font-serif font-bold text-foreground uppercase tracking-tighter mb-6", isRTL && "font-arabic text-start")}>
                {ar ? <>تسجيل سلس <span className="text-accent italic font-normal font-sans">من أول لحظة.</span></> : <>Seamless Registration, <span className="text-accent italic font-normal">From Arrival.</span></>}
              </h2>
              <p className={clsx("text-muted font-normal leading-relaxed text-balance mb-8", isRTL && "text-start")}>
                {ar
                  ? "نُدير تسجيل الحضور واعتماد الشارات واستقبال كبار الشخصيات بسلاسة تامة - بحيث يشعر ضيوفكم بالترحيب والتنظيم من اللحظة الأولى، مع تسجيل مسبق وتسجيل فوري في الموقع وبيانات حضور دقيقة في الوقت الفعلي."
                  : "We manage check-in, badge accreditation, and VIP reception with total ease - so your guests feel welcomed and organized from the first moment. Pre-registration, on-site check-in, and accurate real-time attendance data."}
              </p>
              <div className={clsx("flex flex-wrap gap-2.5", isRTL && "justify-end")}>
                {services.map((s) => (
                  <span
                    key={s}
                    className={clsx("px-4 py-2 bg-surface-2 border border-line rounded-full text-xs font-bold uppercase tracking-widest text-foreground/80", isRTL && "font-arabic")}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 5. CTA BAND */}
      <section className="py-20 md:py-28 bg-background relative">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <Sparkles className="w-8 h-8 text-accent mx-auto mb-6" />
          <h2 className={clsx("text-3xl md:text-5xl font-serif font-bold text-foreground uppercase tracking-tighter mb-6 text-balance", isRTL && "font-arabic")}>
            {ar ? "لنخطط لفعاليتكم القادمة." : "Let's Plan Your Next Event."}
          </h2>
          <p className={clsx("text-muted font-normal max-w-xl mx-auto mb-10 text-balance", isRTL && "text-start")}>
            {ar
              ? "أخبرونا بأهدافكم وحجم الحضور والموعد المستهدف، وسيعود إليكم فريقنا بمقترح متكامل."
              : "Tell us your objectives, audience size, and target date, and our team will return with a complete proposal."}
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
