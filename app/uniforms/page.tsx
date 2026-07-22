"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import {
  BadgeCheck,
  Factory,
  Flame,
  Layers3,
  Ruler,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Wrench,
} from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { useLanguage } from "@/components/LanguageContext";

const copy = {
  en: {
    eyebrow: "Industrial Workwear · Made to Specification",
    title: "Uniforms built for",
    titleAccent: "the work ahead.",
    intro:
      "Purpose-built industrial uniforms for demanding sites - developed around safety, durability, comfort, and a consistent professional identity.",
    quote: "Request a uniform quote",
    portfolioLabel: "Workwear portfolio",
    portfolioTitle: "One workforce. Every environment.",
    portfolioIntro:
      "Choose a proven garment type or brief us on the role, site conditions, branding, and protection requirements.",
    categories: [
      ["Standard Industrial Coveralls", "Durable everyday coveralls with reinforced seams, practical pockets, and flexible fabric options."],
      ["Flame-Resistant Coveralls", "FR fabric options for welding, electrical, oil and gas, and heat-exposed industrial duties."],
      ["High-Visibility Workwear", "Reflective coveralls, jackets, vests, and trousers for road, logistics, and low-light operations."],
      ["Oil, Gas & Petrochemical Wear", "Protective garments configured for refinery, processing, offshore, and maintenance teams."],
      ["Disposable Coveralls", "Lightweight single-use protection options for controlled, maintenance, and cleaning environments."],
      ["Winter & Insulated Workwear", "Insulated coveralls, jackets, trousers, and cold-store suits for low-temperature work."],
      ["Maintenance & Mechanic Workwear", "Flexible, abrasion-conscious uniforms with useful storage and reinforced stress points."],
    ],
    featuresLabel: "Designed around the job",
    featuresTitle: "Protection in every detail.",
    features: [
      ["Fabric choice", "Cotton, poly-cotton, technical, FR, high-visibility, disposable, and insulated options."],
      ["Durable construction", "Reinforced stress points, double stitching, heavy-duty closures, and functional pocket layouts."],
      ["Comfort on shift", "Breathable and moisture-conscious options for long hours and demanding climates."],
      ["Size flexibility", "Standard and extended sizing, with custom measurements available for workforce programmes."],
    ],
    customLabel: "Custom manufacturing",
    customTitle: "Your uniform, properly resolved.",
    customBody:
      "Create a coordinated range across roles and locations. Select garment colours, fabric weight, reflective-tape configuration, pocket layout, closures, sizing, and approved branding placement.",
    customItems: ["Logo embroidery", "Logo printing", "Name embroidery", "Colour customisation", "Reflective tape options", "Corporate branding"],
    partnerTitle: "Produced with a specialist partner manufacturer.",
    partnerBody:
      "Two in One manages the commercial brief, product selection, customisation requirements, and delivery coordination. Manufacturing is carried out by a partner manufacturer specialising in industrial workwear.",
    ctaTitle: "Let’s protect your workforce.",
    ctaBody: "Tell us the industry, garment type, quantity, sizes, colours, branding, and required delivery date. We’ll develop a tailored proposal.",
  },
  ar: {
    eyebrow: "ملابس عمل صناعية · تصنيع حسب المواصفات",
    title: "زي موحد مصمم",
    titleAccent: "لطبيعة العمل.",
    intro: "ملابس عمل صناعية مخصصة للبيئات الصعبة، تجمع بين السلامة والمتانة والراحة والهوية المهنية الموحدة.",
    quote: "اطلب عرض سعر للزي الموحد",
    portfolioLabel: "مجموعة ملابس العمل",
    portfolioTitle: "قوة عاملة واحدة. لكل بيئة.",
    portfolioIntro: "اختر نوعاً مجرباً من الملابس أو زودنا بمتطلبات الوظيفة والموقع والهوية ومستوى الحماية المطلوب.",
    categories: [
      ["أفرولات صناعية قياسية", "أفرولات يومية متينة بخياطة معززة وجيوب عملية وخيارات متعددة للأقمشة."],
      ["أفرولات مقاومة للهب", "خيارات أقمشة مقاومة للهب لأعمال اللحام والكهرباء والنفط والغاز والحرارة."],
      ["ملابس عالية الوضوح", "أفرولات وسترات وصديريات وسراويل عاكسة للطرق والخدمات اللوجستية والعمل الليلي."],
      ["ملابس النفط والغاز والبتروكيماويات", "ملابس وقائية لفرق المصافي والمعالجة والمنشآت البحرية والصيانة."],
      ["أفرولات للاستخدام الواحد", "خيارات خفيفة للحماية في البيئات المراقبة وأعمال الصيانة والتنظيف."],
      ["ملابس شتوية ومعزولة", "أفرولات وسترات وسراويل وبدلات مخازن باردة للعمل في درجات الحرارة المنخفضة."],
      ["ملابس الصيانة والميكانيكا", "ملابس مرنة ومتينة بجيوب عملية ونقاط إجهاد معززة."],
    ],
    featuresLabel: "مصمم وفق طبيعة العمل",
    featuresTitle: "حماية في كل تفصيل.",
    features: [
      ["اختيار القماش", "خيارات قطنية ومخلوطة وتقنية ومقاومة للهب وعالية الوضوح ومعزولة."],
      ["تصنيع متين", "خياطة مزدوجة ونقاط معززة وإغلاقات قوية وتوزيع عملي للجيوب."],
      ["راحة أثناء العمل", "خيارات قابلة للتنفس ومناسبة لساعات العمل الطويلة والمناخات الصعبة."],
      ["مرونة المقاسات", "مقاسات قياسية وممتدة مع إمكانية القياسات الخاصة لبرامج القوى العاملة."],
    ],
    customLabel: "تصنيع مخصص",
    customTitle: "زيك الموحد، بكل تفاصيله.",
    customBody: "أنشئ مجموعة متناسقة لمختلف الوظائف والمواقع عبر اختيار اللون ووزن القماش والشريط العاكس والجيوب والإغلاقات والمقاسات ومكان الهوية المعتمد.",
    customItems: ["تطريز الشعار", "طباعة الشعار", "تطريز الاسم", "تخصيص الألوان", "خيارات الشريط العاكس", "الهوية المؤسسية"],
    partnerTitle: "الإنتاج بالتعاون مع مصنع شريك متخصص.",
    partnerBody: "تدير شركة اثنين في واحد المتطلبات التجارية واختيار المنتجات والتخصيص وتنسيق التسليم، بينما يتم التصنيع لدى مصنع شريك متخصص في ملابس العمل الصناعية.",
    ctaTitle: "لنحمي فريق عملك.",
    ctaBody: "أرسل لنا القطاع ونوع الملابس والكمية والمقاسات والألوان ومتطلبات الهوية وموعد التسليم، وسنعد عرضاً مخصصاً.",
  },
} as const;

const categoryIcons = [Layers3, Flame, Sparkles, ShieldCheck, BadgeCheck, Snowflake, Wrench];

export default function UniformsPage() {
  const { lang, isRTL } = useLanguage();
  const c = copy[lang];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative min-h-[680px] h-[82vh] flex items-center overflow-hidden bg-[#071018]">
        <Image src="/images/uniforms-hero.png" alt="Industrial workers in purpose-built uniforms" fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071018] via-[#071018]/82 to-[#071018]/10" />
        <div className="container mx-auto px-6 md:px-12 relative z-10 pt-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-accent mb-7">
              <Factory className="w-5 h-5" />
              <span className={clsx("text-xs font-bold uppercase tracking-[0.24em]", isRTL && "font-arabic")}>{c.eyebrow}</span>
            </div>
            <h1 className={clsx("text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white uppercase tracking-tighter leading-[0.88]", isRTL && "font-arabic")}>{c.title}<br /><span className="text-accent italic font-normal">{c.titleAccent}</span></h1>
            <p className={clsx("mt-8 max-w-2xl text-white/78 text-base md:text-lg leading-relaxed", isRTL && "text-start")}>{c.intro}</p>
            <Link href="/contact" className="inline-flex mt-9 px-8 py-4 bg-accent text-background font-bold tracking-widest text-xs rounded-sm hover:bg-white transition-colors uppercase">{c.quote}</Link>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <AnimatedSection direction="up" className="max-w-3xl mb-16">
            <p className="text-accent text-xs font-bold uppercase tracking-[0.24em] mb-5">{c.portfolioLabel}</p>
            <h2 className={clsx("text-4xl md:text-6xl font-serif font-bold uppercase tracking-tighter", isRTL && "font-arabic")}>{c.portfolioTitle}</h2>
            <p className="text-muted mt-6 leading-relaxed max-w-2xl">{c.portfolioIntro}</p>
          </AnimatedSection>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.categories.map(([title, desc], index) => {
              const Icon = categoryIcons[index];
              return <StaggerItem key={title} direction="up" className={clsx("p-7 md:p-8 bg-surface border border-line rounded-sm group hover:border-accent/50 transition-colors", index === 6 && "lg:col-span-3")}>
                <div className="flex items-center justify-between mb-8"><Icon className="w-7 h-7 text-accent" /><span className="text-foreground/15 font-serif text-4xl">0{index + 1}</span></div>
                <h3 className={clsx("text-xl font-serif font-bold mb-3", isRTL && "font-arabic")}>{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </StaggerItem>;
            })}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-surface py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-14 items-center">
          <AnimatedSection direction="left" className="relative aspect-[3/2] rounded-sm overflow-hidden"><Image src="/images/uniforms-fr-oil-gas.png" alt="Flame-resistant industrial coveralls" fill className="object-cover" /></AnimatedSection>
          <AnimatedSection direction="right">
            <p className="text-accent text-xs font-bold uppercase tracking-[0.24em] mb-5">{c.featuresLabel}</p>
            <h2 className={clsx("text-4xl md:text-6xl font-serif font-bold uppercase tracking-tighter mb-10", isRTL && "font-arabic")}>{c.featuresTitle}</h2>
            <div className="space-y-7">{c.features.map(([title, desc], index) => <div key={title} className="grid grid-cols-[auto_1fr] gap-5"><span className="w-9 h-9 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-bold">0{index + 1}</span><div><h3 className="font-serif font-bold text-lg mb-1">{title}</h3><p className="text-muted text-sm leading-relaxed">{desc}</p></div></div>)}</div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-6 mb-16">
            <AnimatedSection direction="up" className="relative aspect-[3/2] rounded-sm overflow-hidden"><Image src="/images/uniforms-hi-vis-insulated.png" alt="High-visibility insulated workwear" fill className="object-cover" /></AnimatedSection>
            <AnimatedSection direction="up" delay={0.1} className="relative aspect-[3/2] rounded-sm overflow-hidden"><Image src="/images/uniforms-mechanic-custom.png" alt="Mechanic and custom workwear" fill className="object-cover" /></AnimatedSection>
          </div>
          <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-12 items-start">
            <AnimatedSection direction="up">
              <p className="text-accent text-xs font-bold uppercase tracking-[0.24em] mb-5">{c.customLabel}</p>
              <h2 className={clsx("text-4xl md:text-6xl font-serif font-bold uppercase tracking-tighter mb-6", isRTL && "font-arabic")}>{c.customTitle}</h2>
              <p className="text-muted leading-relaxed max-w-2xl">{c.customBody}</p>
            </AnimatedSection>
            <StaggerContainer className="grid sm:grid-cols-2 gap-3">{c.customItems.map((item) => <StaggerItem key={item} direction="up" className="flex items-center gap-3 bg-surface border border-line rounded-sm p-4"><Ruler className="w-4 h-4 text-accent shrink-0" /><span className="text-sm font-semibold">{item}</span></StaggerItem>)}</StaggerContainer>
          </div>
        </div>
      </section>

      <section className="bg-[#0a1822] text-white py-18 md:py-22">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-8 md:items-center">
          <div className="w-14 h-14 bg-accent/15 text-accent flex items-center justify-center rounded-full shrink-0"><Factory className="w-7 h-7" /></div>
          <div><h2 className={clsx("text-2xl md:text-3xl font-serif font-bold mb-3", isRTL && "font-arabic")}>{c.partnerTitle}</h2><p className="text-white/65 leading-relaxed max-w-4xl">{c.partnerBody}</p></div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-surface text-center">
        <ShieldCheck className="w-9 h-9 text-accent mx-auto mb-6" />
        <h2 className={clsx("text-4xl md:text-6xl font-serif font-bold uppercase tracking-tighter", isRTL && "font-arabic")}>{c.ctaTitle}</h2>
        <p className="text-muted max-w-2xl mx-auto mt-6 mb-9 leading-relaxed px-6">{c.ctaBody}</p>
        <Link href="/contact" className="inline-flex px-10 py-4 bg-accent text-background font-bold tracking-widest text-xs rounded-sm hover:bg-foreground hover:text-background transition-colors uppercase">{c.quote}</Link>
      </section>
    </div>
  );
}
