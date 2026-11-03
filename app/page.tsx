"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarCheck,
  CarFront,
  Cog,
  PackageSearch,
  Shirt,
  Sparkles,
} from "lucide-react";
import clsx from "clsx";
import { AnimatedSection } from "@/components/AnimatedSection";
import HomeHeroCarousel from "@/components/HomeHeroCarousel";
import { useLanguage } from "@/components/LanguageContext";

const fleet = [
  { name: "Range Rover", price: "120 OMR" },
  { name: "LX600", price: "100 OMR" },
  { name: "Land Cruiser", price: "80 OMR" },
];

export default function Home() {
  const { lang, isRTL } = useLanguage();
  const ar = lang === "ar";

  const stories = [
    {
      key: "facilities",
      title: ar ? "خدمات المرافق" : "Facility Services",
      description: ar
        ? "صيانة وإدارة مرافق وأنظمة ذكية ودعم تشغيلي بمعيار واحد واضح."
        : "Maintenance, facility management, smart systems, and operational support under one clear standard.",
      image: "/images/hvac_maintenance.png",
      objectPosition: "object-[64%_center]",
      href: "/services",
      label: ar ? "استكشف خدمات المرافق" : "Explore Facility Services",
      icon: Building2,
    },
    {
      key: "events",
      title: ar ? "الفعاليات والإنتاج" : "Events & Production",
      description: ar
        ? "تنفيذ متقن، وإنتاج إبداعي، وتنسيق سلس للفعاليات المؤسسية والخاصة."
        : "Refined execution, creative production, and seamless coordination for corporate and private occasions.",
      image: "/images/events-opera-house-twoinone.png",
      objectPosition: "object-[68%_center]",
      href: "/events",
      label: ar ? "خطط لفعاليتك" : "Plan an Event",
      icon: CalendarCheck,
    },
    {
      key: "tours",
      title: ar ? "الجولات والتنقل الفاخر" : "Tours & Luxury Mobility",
      description: ar
        ? "تنقّل راقٍ وجولات خاصة في أنحاء عُمان، مع سائق محترف أو بخيار القيادة الذاتية."
        : "Refined mobility and private journeys across Oman, with a professional driver or self-drive.",
      image: "/images/tours-airport-welcome-flowers.png",
      objectPosition: "object-[70%_center]",
      href: "/tours",
      label: ar ? "استكشف الجولات" : "Explore Tours",
      icon: CarFront,
    },
   
    {
      key: "uniforms",
      title: ar ? "الزي المهني" : "Professional Uniforms",
      description: ar
        ? "ملابس عمل وحماية مصنّعة حسب متطلبات القطاع."
        : "Purpose-built workwear and protective clothing.",
      image: "/images/uniforms-hero.png",
      objectPosition: "object-[70%_center]",
      href: "/uniforms",
      label: ar ? "استكشف الزي المهني" : "Explore Uniforms",
      icon: Shirt,
    },
    
  ];

  return (
    <main className="overflow-hidden bg-background">
      <HomeHeroCarousel />

      <section id="activities" className="scroll-mt-24 px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="container mx-auto">
          <AnimatedSection
            direction="up"
            className={clsx(
              "mb-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end",
              isRTL && "text-start"
            )}
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
                {ar ? "أنشطة متكاملة" : "Integrated Activities"}
              </span>
              <h2
                className={clsx(
                  "mt-5 text-balance text-4xl font-bold uppercase leading-[0.98] tracking-tight text-foreground md:text-6xl",
                  isRTL && "font-arabic leading-[1.15]"
                )}
              >
                {ar ? "ستة مجالات. شركة واحدة مترابطة." : "Six specializations. One connected company."}
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-muted md:text-lg">
              {ar
                ? "نجمع خدمات المرافق والفعاليات والجولات والتجارة والتصنيع والتوريد التشغيلي ضمن علاقة تجارية واحدة واضحة ومنضبطة."
                : "We connect facility services, events, journeys, trade, manufacturing, and operational supply through one clear and accountable commercial relationship."}
            </p>
          </AnimatedSection>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {stories.map((story) => {
              const Icon = story.icon;
              return (
                <AnimatedSection
                  key={story.key}
                  direction="up"
                  className="group relative min-h-[440px] overflow-hidden rounded-2xl bg-[#081017] shadow-premium"
                >
                  <Link
                    href={story.href}
                    aria-label={story.label}
                    className="absolute inset-0 z-20"
                  />
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className={clsx(
                      "object-cover transition-transform duration-700 group-hover:scale-[1.025]",
                      story.objectPosition,
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05080b] via-[#05080b]/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 z-10 p-7 text-white md:p-10">
                    <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/25 backdrop-blur-sm">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="text-3xl font-bold md:text-4xl">{story.title}</h3>
                    <p className="mt-4 max-w-xl text-sm leading-6 text-white/70 md:text-base">
                      {story.description}
                    </p>
                    <div className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-accent">
                      {story.label}
                      <ArrowRight className={clsx("h-4 w-4", isRTL && "rotate-180")} />
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-surface px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="container mx-auto grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <AnimatedSection
            direction="left"
            className="relative aspect-[16/10] overflow-hidden rounded-2xl"
          >
            <Image
              src="/images/tours-white-fleet-fully-branded.png"
              alt={ar ? "أسطول من ثلاث سيارات دفع رباعي بيضاء فاخرة" : "Fleet of three white luxury SUVs"}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </AnimatedSection>

          <AnimatedSection direction="right" className={clsx(isRTL && "text-start")}>
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
              {ar ? "تنقّل مصمم حولك" : "Mobility designed around you"}
            </span>
            <h2
              className={clsx(
                "mt-5 text-4xl font-bold uppercase leading-none tracking-tight text-foreground md:text-6xl",
                isRTL && "font-arabic leading-[1.18]"
              )}
            >
              {ar ? "عُمان، بطريقتك." : "Oman, your way."}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted">
              {ar
                ? "اختر سيارتك البيضاء المفضلة، مع سائق محترف أو بدون سائق. مثالية للاجتماعات والتنقل اليومي والرحلات الخاصة."
                : "Choose your preferred white SUV, with a professional driver or without. Ideal for meetings, daily movement, and private touring."}
            </p>

            <div className="mt-8 divide-y divide-line border-y border-line">
              {fleet.map((vehicle) => (
                <div
                  key={vehicle.name}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <span className="font-serif text-lg font-semibold text-foreground">
                    {vehicle.name}
                  </span>
                  <span className="text-sm font-bold text-accent" dir="ltr">
                    {vehicle.price}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/tours"
              className="group mt-8 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-accent"
            >
              {ar ? "عرض السيارات والوجهات" : "See vehicles and destinations"}
              <ArrowRight
                className={clsx(
                  "h-4 w-4 transition-transform group-hover:translate-x-1",
                  isRTL && "rotate-180 group-hover:-translate-x-1"
                )}
              />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-[#06090d] px-5 py-24 text-white sm:px-8 md:py-32 lg:px-12">
        <div className="container mx-auto grid gap-8 lg:grid-cols-2">
          <AnimatedSection
            direction="up"
            className="relative min-h-[520px] overflow-hidden rounded-2xl"
          >
            <Image
              src="/images/Conference_TwoInOne_Speaker.png"
              alt={ar ? "فعالية مؤسسية بإنتاج متكامل" : "Corporate event with integrated production"}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
          </AnimatedSection>

          <AnimatedSection
            direction="up"
            className={clsx("flex flex-col justify-center lg:px-10", isRTL && "text-start")}
          >
            <Sparkles className="h-7 w-7 text-accent" />
            <span className="mt-6 text-xs font-bold uppercase tracking-[0.28em] text-accent">
              {ar ? "تجارب تُذكر" : "Experiences, precisely delivered"}
            </span>
            <h2
              className={clsx(
                "mt-5 text-balance text-4xl font-bold uppercase leading-none tracking-tight md:text-6xl",
                isRTL && "font-arabic leading-[1.18]"
              )}
            >
              {ar ? "من الفكرة إلى آخر ضيف." : "From concept to the final guest."}
            </h2>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/65">
              {ar
                ? "نجمع بين التنسيق المنظّم والتفاصيل الجمالية والتكامل التقني لتقديم فعاليات مؤسسية وخاصة بمعيار مرتفع، بالتعاون مع شريكنا الموثوق في التنفيذ."
                : "We combine structured coordination, aesthetic detail, and technical integration to deliver corporate and private events at an elevated standard, together with our trusted execution partner."}
            </p>
            <Link
              href="/events"
              className="group mt-9 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-accent"
            >
              {ar ? "خدمات الفعاليات" : "Discover Event Services"}
              <ArrowRight
                className={clsx(
                  "h-4 w-4 transition-transform group-hover:translate-x-1",
                  isRTL && "rotate-180 group-hover:-translate-x-1"
                )}
              />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="container mx-auto grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <AnimatedSection
            direction="left"
            className={clsx("lg:pr-8 rtl:lg:pl-8 rtl:lg:pr-0", isRTL && "text-start")}
          >
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
              {ar ? "أماكن تعمل بشكل أفضل" : "Places that work beautifully"}
            </span>
            <h2
              className={clsx(
                "mt-5 text-balance text-4xl font-bold uppercase leading-none tracking-tight text-foreground md:text-6xl",
                isRTL && "font-arabic leading-[1.18]"
              )}
            >
              {ar ? "خمسة مجالات. معيار واحد." : "Five capabilities. One standard."}
            </h2>
            <p className="mt-7 max-w-xl text-base leading-7 text-muted">
              {ar
                ? "من الصيانة والمرافق إلى الأنظمة الذكية والتوزيع، نوفّر دعماً عملياً واضحاً للمواقع والأصول والعمليات."
                : "From maintenance and facility management to smart systems and distribution, we provide practical, accountable support for sites, assets, and operations."}
            </p>
            <Link
              href="/services"
              className="group mt-9 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-accent"
            >
              {ar ? "استكشف خدمات المرافق" : "Explore Facility Services"}
              <ArrowRight
                className={clsx(
                  "h-4 w-4 transition-transform group-hover:translate-x-1",
                  isRTL && "rotate-180 group-hover:-translate-x-1"
                )}
              />
            </Link>
          </AnimatedSection>

          <AnimatedSection
            direction="right"
            className="relative aspect-[16/11] overflow-hidden rounded-2xl"
          >
            <Image
              src="/images/Facility_management.png"
              alt={ar ? "خدمات إدارة المرافق في عُمان" : "Facility management services in Oman"}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </AnimatedSection>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <AnimatedSection
          direction="up"
          className="container mx-auto overflow-hidden rounded-3xl bg-accent px-6 py-16 text-center text-[#041018] md:px-12 md:py-20"
        >
          <span className="text-xs font-bold uppercase tracking-[0.28em]">
            {ar ? "ابدأ المحادثة" : "Start the conversation"}
          </span>
          <h2
            className={clsx(
              "mx-auto mt-5 max-w-4xl text-balance text-4xl font-bold uppercase leading-none tracking-tight md:text-6xl",
              isRTL && "font-arabic leading-[1.18]"
            )}
          >
            {ar ? "نحن في خدمتكم." : "We are at your service."}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#041018]/70">
            {ar
              ? "خدمة مرافق، فعالية، رحلة، توريد، أو متطلب تشغيلي — سننسّق الخطوة التالية بوضوح وعناية."
              : "Facility support, an event, a journey, sourcing, or an operational requirement—we will coordinate the next step with clarity and care."}
          </p>
          <Link
            href="/contact"
            className="mt-9 inline-flex min-h-12 items-center justify-center rounded-full bg-[#041018] px-8 text-xs font-bold uppercase tracking-[0.18em] text-white transition-transform hover:-translate-y-0.5"
          >
            {ar ? "تواصل معنا" : "Contact Two in One"}
          </Link>
        </AnimatedSection>
      </section>
    </main>
  );
}
