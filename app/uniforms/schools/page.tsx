"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";

const content = {
  en: {
    eyebrow: "TWO IN ONE LLC / UNIFORMS",
    title: "SCHOOL UNIFORMS",
    subtitle: "A CONSISTENT IDENTITY. A CONFIDENT START.",
    intro:
      "Explore practical school uniform solutions designed around comfort, everyday wear and a consistent school identity.",
    categoriesTitle: "SCHOOL UNIFORM CATEGORIES",
    categoriesIntro:
      "From classroom essentials to sportswear, explore uniform options for students and school teams.",
    categories: [
      {
        title: "Shirts & Polo Shirts",
        description:
          "Everyday school shirts and polo options for different age groups.",
      },
      {
        title: "Trousers & Skirts",
        description:
          "Practical uniform options suited to daily school activities.",
      },
      {
        title: "Sports & PE Uniforms",
        description:
          "Comfortable sportswear options for physical education and activities.",
      },
      {
        title: "Blazers & Jackets",
        description:
          "Outerwear options that complement a school's uniform identity.",
      },
      {
        title: "School Accessories",
        description:
          "Explore complementary uniform items and accessories.",
      },
      {
        title: "School Staff Uniforms",
        description:
          "Professional clothing options for teaching and support teams.",
      },
    ],
    customLabel: "PERSONALISED SOLUTIONS",
    customTitle: "YOUR SCHOOL. YOUR IDENTITY.",
    customText:
      "Discuss your school's colours, garment styles, sizing needs and branding preferences with our team. We can help you explore uniform options suited to your requirements.",
    contactTitle: "LET'S DISCUSS YOUR REQUIREMENTS.",
    contactText:
      "Planning uniforms for a school or educational institution? Contact our team to discuss your needs and request a quotation.",
    quote: "REQUEST A QUOTE",
    back: "BACK TO ALL UNIFORMS",
  },
  ar: {
    eyebrow: "تو إن ون / الزي الموحد",
    title: "الزي المدرسي",
    subtitle: "هوية موحدة. بداية واثقة.",
    intro:
      "استكشف حلول الزي المدرسي العملية التي تراعي الراحة والاستخدام اليومي وتعزز الهوية الموحدة للمدرسة.",
    categoriesTitle: "فئات الزي المدرسي",
    categoriesIntro:
      "من الملابس المدرسية اليومية إلى الملابس الرياضية، استكشف الخيارات المناسبة للطلاب وفرق العمل المدرسية.",
    categories: [
      {
        title: "القمصان وقمصان البولو",
        description:
          "خيارات القمصان المدرسية اليومية لمختلف الفئات العمرية.",
      },
      {
        title: "البناطيل والتنانير",
        description:
          "خيارات عملية مناسبة للأنشطة المدرسية اليومية.",
      },
      {
        title: "الزي الرياضي المدرسي",
        description:
          "خيارات مريحة للتربية البدنية والأنشطة الرياضية.",
      },
      {
        title: "السترات والمعاطف",
        description:
          "خيارات ملابس خارجية تتناسب مع هوية المدرسة.",
      },
      {
        title: "الإكسسوارات المدرسية",
        description:
          "استكشف مستلزمات وإكسسوارات الزي المدرسي المكملة.",
      },
      {
        title: "زي الكادر المدرسي",
        description:
          "خيارات ملابس مهنية للمعلمين وفرق الدعم.",
      },
    ],
    customLabel: "حلول مخصصة",
    customTitle: "مدرستك. هويتك.",
    customText:
      "ناقش معنا ألوان مدرستك وتصاميم الملابس والمقاسات ومتطلبات الهوية المؤسسية لاستكشاف الخيارات المناسبة لاحتياجاتك.",
    contactTitle: "دعنا نناقش متطلباتك.",
    contactText:
      "هل تخطط لتوفير الزي الموحد لمدرسة أو مؤسسة تعليمية؟ تواصل مع فريقنا لمناقشة احتياجاتك وطلب عرض سعر.",
    quote: "اطلب عرض سعر",
    back: "العودة إلى جميع فئات الزي الموحد",
  },
};

export default function SchoolsUniformsPage() {
  const { lang, isRTL } = useLanguage();
  const c = content[lang];

  return (
    <main
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-screen bg-background text-foreground"
    >
      {/* HERO */}
      <section className="overflow-hidden bg-[#071018] text-white">
        <div className="container mx-auto grid grid-cols-1 items-center gap-8 px-6 py-10 md:grid-cols-2 md:gap-12 md:px-12 md:py-20">
          <div className="order-2 min-w-0 text-start md:order-1">
            <p className="mb-5 text-xs font-bold tracking-widest text-accent md:text-sm">
              {c.eyebrow}
            </p>

            <h1 className="mb-6 break-words font-serif text-3xl font-bold leading-tight lg:text-5xl">
              {c.title}
            </h1>

            <h2 className="mb-5 text-lg font-semibold leading-relaxed text-accent md:text-xl">
              {c.subtitle}
            </h2>

            <p className="mb-8 text-base leading-relaxed text-white/80 md:text-lg">
              {c.intro}
            </p>

            <Link
              href="/contact"
              className="inline-block max-w-full bg-accent px-6 py-4 text-center text-sm font-bold text-background transition-opacity hover:opacity-90"
            >
              {c.quote}
            </Link>
          </div>

          <div className="order-1 min-w-0 md:order-2">
            <img
              src="/images/IMG_6748.PNG"
              alt={
                lang === "ar"
                  ? "الزي المدرسي للطلاب"
                  : "School uniforms for students"
              }
              className="block h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container mx-auto px-6 py-16 md:px-12 md:py-24">
        <div className="mb-14 max-w-3xl">
          <p className="mb-5 text-sm font-bold tracking-widest text-accent">
            TWO IN ONE
          </p>

          <h2 className="mb-7 break-words font-serif text-2xl font-bold md:text-4xl">
            {c.categoriesTitle}
          </h2>

          <p className="leading-relaxed text-muted">
            {c.categoriesIntro}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {c.categories.map((item, index) => (
            <article
              key={item.title}
              className="min-h-[240px] min-w-0 border border-line bg-surface p-8 transition-colors hover:border-accent"
            >
              <div className="mb-10 flex items-center justify-between">
                <span className="text-sm font-bold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden="true"
                  className="h-px w-10 bg-accent"
                />
              </div>

              <h3 className="mb-4 font-serif text-xl font-bold md:text-2xl">
                {item.title}
              </h3>

              <p className="text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* PERSONALISED SOLUTIONS */}
      <section className="bg-surface py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0">
              <p className="mb-6 text-sm font-bold tracking-widest text-accent">
                {c.customLabel}
              </p>

              <h2 className="mb-8 break-words font-serif text-2xl font-bold leading-tight md:text-4xl">
                {c.customTitle}
              </h2>

              <p className="leading-relaxed text-muted">
                {c.customText}
              </p>
            </div>

            <div className="min-w-0 bg-[#071018] p-6 text-white sm:p-10 md:p-14">
              <div
                aria-hidden="true"
                className="mb-10 h-1 w-16 bg-accent"
              />

              <h3 className="mb-6 break-words font-serif text-2xl font-bold md:text-3xl">
                {c.contactTitle}
              </h3>

              <p className="mb-10 leading-relaxed text-white/70">
                {c.contactText}
              </p>

              <Link
                href="/contact"
                className="inline-block max-w-full bg-accent px-6 py-4 text-center text-sm font-bold text-background transition-opacity hover:opacity-90"
              >
                {c.quote}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BACK TO UNIFORMS */}
      <section className="px-6 py-16 text-center">
        <Link
          href="/uniforms"
          className="inline-block font-bold text-accent underline underline-offset-4"
        >
          {isRTL ? "→ " : "← "}
          {c.back}
        </Link>
      </section>
    </main>
  );
}
