"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import clsx from "clsx";
import { useLanguage } from "./LanguageContext";

const AUTOPLAY_DELAY = 7500;
const TRANSITION_DURATION = 850;

type HeroSlide = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  accentTitle: string;
  description: string;
  image: string;
  secondaryImage?: string;
  collageImages?: Array<{
    src: string;
    objectPosition: string;
  }>;
  objectPosition: string;
  secondaryObjectPosition?: string;
  href: string;
  cta: string;
  secondaryHref: string;
  secondaryCta: string;
  compactTitle?: boolean;
};

export default function HomeHeroCarousel() {
  const { lang, isRTL } = useLanguage();
  const ar = lang === "ar";

  const slides = useMemo<HeroSlide[]>(
    () =>
      ar
        ? [
            {
              id: "overview",
              label: "لمحة عامة",
              eyebrow: "شركة اثنين في واحد ش.م.م · عُمان",
              title: "نربط الخبرات والموارد والفرص",
              accentTitle: "لنقدّم حلولاً بلا حدود",
              description:
                "شركة عُمانية متعددة الأنشطة تجمع الخدمات والتجارة والتوريد والتصنيع من خلال تنسيق منضبط وشراكات موثوقة ومعيار واحد.",
              image: "/images/hvac_maintenance.png",
              collageImages: [
                { src: "/images/hvac_maintenance.png", objectPosition: "object-[50%_center] sm:object-[64%_center]" },
                { src: "/images/events-opera-house-twoinone.png", objectPosition: "object-[73%_center] sm:object-[68%_center]" },
                { src: "/images/harvesting_brays_hero_product.png", objectPosition: "object-[55%_center] sm:object-[58%_center]" },
                { src: "/images/tours-airport-welcome-flowers.png", objectPosition: "object-[72%_center] sm:object-[70%_center]" },
              ],
              objectPosition: "object-center",
              href: "#activities",
              cta: "استكشف أنشطتنا",
              secondaryHref: "/about",
              secondaryCta: "من نحن",
              compactTitle: true,
            },
            {
              id: "facilities",
              label: "خدمات المرافق",
              eyebrow: "خدمات المرافق",
              title: "خمس قدرات.",
              accentTitle: "معيار واحد.",
              description:
                "الصيانة والمرافق، والبناء والبنية الأساسية، وإدارة المرافق، والأنظمة الذكية، والتجارة والتوزيع — بتنفيذ منضبط في مختلف أنحاء عُمان.",
              image: "/images/hvac_maintenance.png",
              objectPosition: "object-[50%_center] sm:object-[64%_center]",
              href: "/services",
              cta: "استكشف خدمات المرافق",
              secondaryHref: "/contact",
              secondaryCta: "ناقش متطلباتك",
            },
            {
              id: "events",
              label: "الفعاليات",
              eyebrow: "الفعاليات والإنتاج",
              title: "من الفكرة",
              accentTitle: "إلى آخر ضيف.",
              description:
                "تنفيذ راقٍ للفعاليات وإنتاج إبداعي يجمع بين الدقة والتميّز البصري والتنسيق المتكامل.",
              image: "/images/events-opera-house-twoinone.png",
              objectPosition: "object-[73%_center] sm:object-[68%_center]",
              href: "/events",
              cta: "خطط لفعالية",
              secondaryHref: "/contact",
              secondaryCta: "تواصل معنا",
            },
            {
              id: "tours",
              label: "الجولات",
              eyebrow: "الجولات والتنقّل الفاخر",
              title: "استكشف عُمان",
              accentTitle: "بأقصى درجات الفخامة.",
              description:
                "استمتع بتجربة تنقّل راقية مع سيارات الدفع الرباعي الفاخرة، مع سائق محترف أو بخيار القيادة الذاتية، بما يلائم أسلوب حياتك واحتياجاتك.",
              image: "/images/tours-airport-welcome-flowers.png",
              objectPosition: "object-[72%_center] sm:object-[68%_center]",
              href: "/tours",
              cta: "استكشف الجولات",
              secondaryHref: "/contact",
              secondaryCta: "احجز رحلتك",
            },
           
            {
              id: "operational-supply",
              label: "التوريد التشغيلي",
              eyebrow: "الزي الموحد وملابس العمل",
              title: "مصمم للعمل.",
              accentTitle: "جاهز للتشغيل.",
              description:
               "نوفر الزي الموحد وملابس العمل والملابس الواقية المصممة لتلبية احتياجات فرق العمل في مختلف بيئات العمل.",
             image: "/images/uniforms-mechanic-custom.png",
              secondaryImage: "/images/uniforms-hero.png",
              objectPosition: "object-[50%_center] sm:object-center",
              secondaryObjectPosition: "object-[66%_center] sm:object-[68%_center]",
              href: "/uniforms",
              cta: "استكشف الزي المهني",
              secondaryHref: "/contact",
              secondaryCta: "تواصل معنا",
            },
          ]
        : [
            {
              id: "overview",
              label: "Overview",
              eyebrow: "Two in One LLC · Oman",
              title: "Connecting Expertise, Resources, and Opportunities",
              accentTitle: "Delivering Solutions Without Boundaries",
              description:
                "An Omani multi-sector company connecting services, trade, supply, and manufacturing through disciplined coordination, trusted partnerships, and one clear standard.",
              image: "/images/hvac_maintenance.png",
              collageImages: [
                { src: "/images/hvac_maintenance.png", objectPosition: "object-[50%_center] sm:object-[64%_center]" },
                { src: "/images/events-opera-house-twoinone.png", objectPosition: "object-[73%_center] sm:object-[68%_center]" },
                { src: "/images/harvesting_brays_hero_product.png", objectPosition: "object-[55%_center] sm:object-[58%_center]" },
                { src: "/images/tours-airport-welcome-flowers.png", objectPosition: "object-[72%_center] sm:object-[70%_center]" },
              ],
              objectPosition: "object-center",
              href: "#activities",
              cta: "Explore Our Activities",
              secondaryHref: "/about",
              secondaryCta: "About Us",
              compactTitle: true,
            },
            {
              id: "facilities",
              label: "Facilities",
              eyebrow: "Facility Services",
              title: "Five Capabilities.",
              accentTitle: "One Standard.",
              description:
                "Maintenance and utilities, construction and infrastructure, facilities management, smart systems, and trading and distribution—delivered across Oman to one uncompromising standard.",
              image: "/images/hvac_maintenance.png",
              objectPosition: "object-[50%_center] sm:object-[64%_center]",
              href: "/services",
              cta: "Explore Facility Services",
              secondaryHref: "/contact",
              secondaryCta: "Discuss a Requirement",
            },
            {
              id: "events",
              label: "Events",
              eyebrow: "Events & Production",
              title: "From Concept",
              accentTitle: "To the Final Guest.",
              description:
                "Refined event execution and creative production, combining precision, visual excellence, and seamless coordination.",
              image: "/images/events-opera-house-twoinone.png",
              objectPosition: "object-[73%_center] sm:object-[68%_center]",
              href: "/events",
              cta: "Plan an Event",
              secondaryHref: "/contact",
              secondaryCta: "Talk to Our Team",
            },
            {
              id: "tours",
              label: "Tours",
              eyebrow: "Tours & Luxury Mobility",
              title: "Experience Oman",
              accentTitle: "In Ultimate Luxury.",
              description:
                "Travel in world-class SUVs with professional chauffeur services or self-drive options, tailored to your lifestyle.",
              image: "/images/tours-airport-welcome-flowers.png",
              objectPosition: "object-[72%_center] sm:object-[68%_center]",
              href: "/tours",
              cta: "Explore Tours",
              secondaryHref: "/contact",
              secondaryCta: "Plan Your Journey",
            },
            
            {
              id: "operational-supply",
              label: "Operational Supply",
             eyebrow: "Uniforms & Workwear",
              title: "Built for Work.",
              accentTitle: "Ready for Operations.",
              description:
                Purpose-built workwear and protective clothing designed to support teams across demanding work environments.
            image: "/images/uniforms-mechanic-custom.png",
              secondaryImage: "/images/uniforms-hero.png",
              objectPosition: "object-[50%_center] sm:object-center",
              secondaryObjectPosition: "object-[66%_center] sm:object-[68%_center]",
              href: "/uniforms",
              cta: "Explore Uniforms",
              secondaryHref: "/contact",
              secondaryCta: "Contact Us",
            },
          ],
    [ar],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [documentHidden, setDocumentHidden] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const activeIndexRef = useRef(0);
  const touchStartX = useRef<number | null>(null);

  const changeSlide = useCallback(
    (nextIndex: number) => {
      const normalizedIndex = (nextIndex + slides.length) % slides.length;
      const currentIndex = activeIndexRef.current;

      if (normalizedIndex === currentIndex) return;

      setPreviousIndex(currentIndex);
      activeIndexRef.current = normalizedIndex;
      setActiveIndex(normalizedIndex);
    },
    [slides.length],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setReduceMotion(mediaQuery.matches);
      if (mediaQuery.matches) setIsPlaying(false);
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const handleVisibility = () => setDocumentHidden(document.hidden);
    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    if (previousIndex === null) return;

    const timer = window.setTimeout(
      () => setPreviousIndex(null),
      reduceMotion ? 0 : TRANSITION_DURATION + 100,
    );

    return () => window.clearTimeout(timer);
  }, [previousIndex, reduceMotion]);

  const activeSlide = slides[activeIndex];
  const rotationRunning =
    isPlaying && !interactionPaused && !documentHidden && !reduceMotion;
  const nextIndex = (activeIndex + 1) % slides.length;
  const layerIndices = Array.from(
    new Set(
      [nextIndex, previousIndex, activeIndex].filter(
        (index): index is number => index !== null,
      ),
    ),
  );

  const previousLabel = ar ? "الشريحة السابقة" : "Previous slide";
  const nextLabel = ar ? "الشريحة التالية" : "Next slide";
  const playLabel = ar ? "تشغيل التبديل التلقائي" : "Play automatic rotation";
  const pauseLabel = ar ? "إيقاف التبديل التلقائي" : "Pause automatic rotation";

  return (
    <section
      className="relative min-h-[820px] overflow-hidden bg-[#05080b] text-white sm:min-h-[800px] lg:min-h-[820px]"
      role="region"
      aria-roledescription="carousel"
      aria-label={ar ? "أنشطة شركة اثنين في واحد" : "Two in One company activities"}
      onMouseEnter={() => setInteractionPaused(true)}
      onMouseLeave={() => setInteractionPaused(false)}
      onFocusCapture={() => setInteractionPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setInteractionPaused(false);
        }
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const delta = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
        touchStartX.current = null;

        if (Math.abs(delta) < 56) return;

        const moveForward = isRTL ? delta > 0 : delta < 0;
        changeSlide(activeIndex + (moveForward ? 1 : -1));
      }}
    >
      <div className="absolute inset-0" aria-hidden="true">
        {layerIndices.map((index) => {
          const slide = slides[index];
          const isActive = index === activeIndex;
          const isPrevious = index === previousIndex;

          return (
            <div
              key={slide.id}
              className={clsx(
                "absolute inset-0 transition-opacity ease-out motion-reduce:transition-none",
                isActive || isPrevious ? "opacity-100" : "opacity-0",
                isActive ? "z-10" : "z-0",
              )}
              style={{
                transitionDuration: reduceMotion ? "0ms" : `${TRANSITION_DURATION}ms`,
              }}
            >
              <div
                className={clsx(
                  "absolute inset-0",
                  isActive && "hero-image-drift",
                  isActive && !rotationRunning && "hero-animation-paused",
                )}
              >
                {slide.collageImages ? (
                  <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                    {slide.collageImages.map((image, imageIndex) => (
                      <div
                        key={image.src}
                        className="relative overflow-hidden border-[0.5px] border-white/10"
                      >
                        <Image
                          src={image.src}
                          alt=""
                          fill
                          preload={index === 0 && imageIndex === 0}
                          sizes="50vw"
                          className={clsx("object-cover", image.objectPosition)}
                        />
                      </div>
                    ))}
                  </div>
                ) : slide.secondaryImage ? (
                  <div className="absolute inset-0 grid grid-rows-2 sm:grid-cols-2 sm:grid-rows-1">
                    <div className="relative">
                      <Image
                        src={slide.image}
                        alt=""
                        fill
                        sizes="50vw"
                        className={clsx("object-cover", slide.objectPosition)}
                      />
                    </div>
                    <div className="relative">
                      <Image
                        src={slide.secondaryImage}
                        alt=""
                        fill
                        sizes="50vw"
                        className={clsx(
                          "object-cover",
                          slide.secondaryObjectPosition ?? "object-center",
                        )}
                      />
                    </div>
                  </div>
                ) : (
                  <Image
                    src={slide.image}
                    alt=""
                    fill
                    preload={index === 0}
                    sizes="100vw"
                    className={clsx("object-cover", slide.objectPosition)}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute inset-0 z-10 bg-[linear-gradient(to_bottom,transparent_0%,transparent_44%,rgba(5,8,11,0.07)_56%,rgba(5,8,11,0.43)_78%,rgba(5,8,11,0.5)_100%)] sm:hidden" />
      <div className="absolute inset-0 z-10 hidden bg-gradient-to-r from-[#05080b] via-[#05080b]/84 to-[#05080b]/20 sm:block rtl:bg-gradient-to-l" />
      <div className="absolute inset-0 z-10 hidden bg-gradient-to-t from-[#05080b] via-transparent to-[#05080b]/25 sm:block" />
      {!reduceMotion && (
        <div
          key={`frame-${activeSlide.id}`}
          className={clsx(
            "hero-frame-trace absolute inset-x-6 top-6 bottom-32 z-[15] hidden rounded-2xl sm:block lg:inset-x-8 lg:top-8",
            !rotationRunning && "hero-animation-paused",
          )}
          aria-hidden="true"
        />
      )}

      <div className="container relative z-20 mx-auto flex min-h-[820px] items-end px-5 pb-32 pt-[38vh] sm:min-h-[800px] sm:items-center sm:px-8 sm:pb-40 sm:pt-10 lg:min-h-[820px] lg:px-12">
        <div
          key={`${lang}-${activeSlide.id}`}
          className={clsx(
            "hero-content-enter flex min-h-0 max-w-4xl flex-col justify-end pb-4 text-shadow-premium sm:min-h-[470px] sm:justify-center sm:pb-0 sm:[text-shadow:none]",
            isRTL && "text-start",
          )}
          role="group"
          aria-roledescription="slide"
          aria-label={`${activeIndex + 1} ${ar ? "من" : "of"} ${slides.length}: ${activeSlide.label}`}
          aria-live="off"
        >
          <div className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-accent sm:mb-6 sm:text-[11px]">
            <span className="h-px w-8 bg-accent" />
            {activeSlide.eyebrow}
          </div>

          <h1
            className={clsx(
              "max-w-4xl text-balance font-serif font-bold uppercase leading-[0.96] tracking-[-0.045em]",
              activeSlide.compactTitle
                ? "text-[clamp(1.7rem,7.5vw,2.25rem)] sm:text-[clamp(2rem,3.7vw,3.8rem)]"
                : "text-[clamp(2rem,9vw,2.75rem)] sm:text-[clamp(2.55rem,5.4vw,5.6rem)]",
              isRTL && "font-arabic leading-[1.14] tracking-normal",
            )}
          >
            {activeSlide.title}
            <span className="mt-2 block text-accent">{activeSlide.accentTitle}</span>
          </h1>

          <p className="mt-4 max-w-2xl text-balance text-[13px] leading-5 text-white/82 sm:mt-7 sm:text-base sm:leading-7 sm:text-white/76 lg:text-lg">
            {activeSlide.description}
          </p>

          <div className="mt-6 flex flex-col gap-2.5 sm:mt-9 sm:flex-row sm:gap-3">
            <Link
              href={activeSlide.href}
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-accent px-7 text-[11px] font-bold uppercase tracking-[0.16em] text-[#061016] transition-colors hover:bg-white"
            >
              {activeSlide.cta}
              <ArrowRight
                className={clsx(
                  "h-4 w-4 transition-transform group-hover:translate-x-1",
                  isRTL && "rotate-180 group-hover:-translate-x-1",
                )}
              />
            </Link>
            <Link
              href={activeSlide.secondaryHref}
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/35 bg-black/15 px-7 text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white hover:text-[#061016]"
            >
              {activeSlide.secondaryCta}
              <ArrowRight
                className={clsx(
                  "h-4 w-4 transition-transform group-hover:translate-x-1",
                  isRTL && "rotate-180 group-hover:-translate-x-1",
                )}
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-30 border-t border-white/12 bg-black/48 backdrop-blur-md">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden bg-white/8"
          aria-hidden="true"
        >
          {!reduceMotion && (
            <span
              key={`progress-${activeSlide.id}`}
              className="hero-rotation-progress absolute inset-0 origin-left bg-gradient-to-r from-accent/25 via-accent to-white/85 shadow-[0_0_10px_rgba(68,188,229,0.9)] rtl:origin-right"
              style={{
                animationDuration: `${AUTOPLAY_DELAY}ms`,
                animationPlayState: rotationRunning ? "running" : "paused",
              }}
              onAnimationEnd={() => {
                if (rotationRunning) {
                  changeSlide(activeIndexRef.current + 1);
                }
              }}
            />
          )}
        </div>
        <div className="container mx-auto flex min-h-24 items-center gap-2 px-4 py-3 sm:px-8 lg:px-12">
          <button
            type="button"
            onClick={() => changeSlide(activeIndex - 1)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-accent hover:text-accent"
            aria-label={previousLabel}
          >
            {isRTL ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>

          <div className="hidden min-w-0 flex-1 grid-cols-6 gap-1 md:grid">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => changeSlide(index)}
                aria-label={`${ar ? "عرض" : "Show"} ${slide.label}`}
                aria-current={index === activeIndex ? "true" : undefined}
                className={clsx(
                  "min-h-14 rounded-lg border px-3 py-2 text-start transition-colors",
                  index === activeIndex
                    ? "border-accent/70 bg-accent/12 text-white"
                    : "border-transparent text-white/48 hover:border-white/15 hover:text-white",
                )}
              >
                <span className="block text-[9px] font-bold tracking-[0.16em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-1 block truncate text-[10px] font-semibold uppercase tracking-[0.1em]">
                  {slide.label}
                </span>
              </button>
            ))}
          </div>

          <div className="flex min-w-0 flex-1 items-center justify-center gap-2 md:hidden">
            <span className="me-2 truncate text-[10px] font-bold uppercase tracking-[0.12em] text-white/75">
              {activeSlide.label}
            </span>
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => changeSlide(index)}
                aria-label={`${ar ? "عرض" : "Show"} ${slide.label}`}
                aria-current={index === activeIndex ? "true" : undefined}
                className={clsx(
                  "h-2.5 rounded-full transition-all",
                  index === activeIndex
                    ? "w-7 bg-accent"
                    : "w-2.5 bg-white/30 hover:bg-white/60",
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsPlaying((playing) => !playing)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-accent hover:text-accent"
            aria-label={isPlaying ? pauseLabel : playLabel}
            aria-pressed={!isPlaying}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={() => changeSlide(activeIndex + 1)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-accent hover:text-accent"
            aria-label={nextLabel}
          >
            {isRTL ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
