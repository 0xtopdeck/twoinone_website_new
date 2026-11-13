"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";

const content = {
  en: {
    eyebrow: "TWO IN ONE LLC / UNIFORMS",
    title: "MILITARY UNIFORMS",
    subtitle: "DISCIPLINE. DURABILITY. PROFESSIONAL IDENTITY.",
    intro:
      "Explore professional uniform solutions for authorized military, security, and institutional teams, with a focus on comfort, practical design, and a consistent appearance.",
    explore: "EXPLORE OUR COLLECTION",
    collection: "PROFESSIONAL UNIFORM COLLECTION",
    description:
      "Uniform options for organizations seeking coordinated, functional clothing for their personnel.",
    products: [
      {
        title: "Service Uniforms",
        text: "Professional uniform options for formal duties and organizational representation.",
      },
      {
        title: "Field Uniforms",
        text: "Practical clothing options designed for everyday operational movement and comfort.",
      },
      {
        title: "Security Uniforms",
        text: "Coordinated uniforms for authorized security and facility personnel.",
      },
      {
        title: "Workwear Trousers",
        text: "Functional trouser options with practical fits and everyday comfort.",
      },
      {
        title: "Uniform Shirts & Jackets",
        text: "Professional shirts and jackets for coordinated team appearance.",
      },
      {
        title: "Uniform Accessories",
        text: "Complementary uniform accessories and approved identification options.",
      },
    ],
    customTitle: "UNIFORMS TAILORED TO YOUR REQUIREMENTS",
    customText:
      "Discuss fabric, colour, sizing, approved insignia, embroidery, and organizational requirements with our team. Product options and customization are subject to availability and applicable approvals.",
    quote: "REQUEST A QUOTE",
    back: "ALL UNIFORM CATEGORIES",
  },
  ar: {
    eyebrow: "تو إن ون ش.م.م / الزي الموحد",
    title: "الزي العسكري",
    subtitle: "الانضباط. المتانة. الهوية المهنية.",
    intro:
      "استكشف حلول الزي الموحد المهنية للجهات العسكرية والأمنية والمؤسسات المصرح لها، مع التركيز على الراحة والتصميم العملي والمظهر الموحد.",
    explore: "استكشف مجموعتنا",
    collection: "مجموعة الزي الموحد المهني",
    description:
      "خيارات الزي الموحد للمؤسسات التي تبحث عن ملابس عملية ومتناسقة لموظفيها.",
    products: [
      {
        title: "الزي الرسمي",
        text: "خيارات الزي المهني للمهام الرسمية وتمثيل المؤسسة.",
      },
      {
        title: "الزي الميداني",
        text: "خيارات ملابس عملية توفر الراحة وسهولة الحركة أثناء العمل اليومي.",
      },
      {
        title: "الزي الأمني",
        text: "زي موحد متناسق لموظفي الأمن والمرافق المصرح لهم.",
      },
      {
        title: "سراويل العمل",
        text: "خيارات سراويل عملية بتصاميم مريحة للاستخدام اليومي.",
      },
      {
        title: "القمصان والسترات",
        text: "قمصان وسترات مهنية لتعزيز المظهر الموحد للفريق.",
      },
      {
        title: "إكسسوارات الزي الموحد",
        text: "إكسسوارات مكملة وخيارات تعريف معتمدة للزي الموحد.",
      },
    ],
    customTitle: "زي موحد يلبي متطلبات مؤسستك",
    customText:
      "ناقش معنا خيارات الأقمشة والألوان والمقاسات والشعارات المعتمدة والتطريز ومتطلبات مؤسستك. تخضع الخيارات والتخصيص للتوفر والموافقات المعمول بها.",
    quote: "اطلب عرض سعر",
    back: "جميع فئات الزي الموحد",
  },
};

export default function MilitaryUniformsPage() {
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

            <a
              href="#collection"
              className="inline-block max-w-full bg-accent px-6 py-4 text-center text-sm font-bold text-background transition-opacity hover:opacity-90"
            >
              {c.explore}
            </a>
          </div>

          <div className="order-1 min-w-0 md:order-2">
            <img
              src="/images/IMG_6746.PNG"
              alt={
                lang === "ar"
                  ? "الزي العسكري والأمني"
                  : "Military and security uniforms"
              }
              className="block h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section
        id="collection"
        className="container mx-auto px-6 py-16 md:px-12 md:py-24"
      >
        <div className="mb-12 max-w-3xl">
          <h2 className="mb-6 break-words font-serif text-2xl font-bold md:text-4xl">
            {c.collection}
          </h2>

          <p className="leading-relaxed text-muted">
            {c.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {c.products.map((product, index) => (
            <article
              key={product.title}
              className="min-w-0 border border-line bg-surface p-8 transition-colors hover:border-accent"
            >
              <span className="text-sm font-bold text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="mb-4 mt-6 font-serif text-2xl font-bold">
                {product.title}
              </h3>

              <p className="leading-relaxed text-muted">
                {product.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* CUSTOM SOLUTIONS */}
      <section className="bg-surface py-16 md:py-24">
        <div className="container mx-auto px-6 text-center md:px-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-7 break-words font-serif text-2xl font-bold md:text-4xl">
              {c.customTitle}
            </h2>

            <p className="mb-10 leading-relaxed text-muted">
              {c.customText}
            </p>

            <Link
              href="/contact"
              className="inline-block max-w-full bg-accent px-6 py-4 text-center text-sm font-bold text-background transition-opacity hover:opacity-90"
            >
              {c.quote}
            </Link>
          </div>
        </div>
      </section>

      {/* BACK TO UNIFORMS */}
      <section className="px-6 py-16 text-center">
        <Link
          href="/uniforms"
          className="font-bold text-accent underline underline-offset-4"
        >
          {isRTL ? "→ " : "← "}
          {c.back}
        </Link>
      </section>
    </main>
  );
}
