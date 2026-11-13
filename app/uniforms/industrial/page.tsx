"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";

const content = {
  en: {
    label: "INDUSTRIAL UNIFORMS",
    title: "WORKWEAR BUILT FOR PERFORMANCE.",
    intro:
      "Professional industrial uniforms designed for demanding workplaces, combining durability, comfort, safety and corporate identity.",
    explore: "Explore our collection",
    collection: "INDUSTRIAL WORKWEAR COLLECTION",
    description:
      "Uniform solutions tailored to different industries, working conditions and team requirements.",
    products: [
      "Standard Industrial Coveralls",
      "Flame-Resistant Coveralls",
      "High-Visibility Workwear",
      "Oil & Gas Workwear",
      "Disposable Protective Coveralls",
      "Winter & Insulated Workwear",
      "Maintenance & Mechanic Uniforms",
    ],
    customTitle: "CUSTOM UNIFORM SOLUTIONS",
    customText:
      "Choose fabrics, colours, sizing, reflective details, embroidery and company branding to create uniforms that match your workforce requirements.",
    cta: "REQUEST A QUOTE",
    back: "ALL UNIFORM CATEGORIES",
  },
  ar: {
    label: "الزي الصناعي",
    title: "ملابس عمل مصممة للأداء.",
    intro:
      "ملابس عمل صناعية احترافية مصممة لبيئات العمل الصعبة، تجمع بين المتانة والراحة والسلامة والهوية المؤسسية.",
    explore: "استكشف مجموعتنا",
    collection: "مجموعة ملابس العمل الصناعية",
    description:
      "حلول زي موحد تناسب مختلف القطاعات وظروف العمل واحتياجات الفرق.",
    products: [
      "أفرولات صناعية قياسية",
      "أفرولات مقاومة للهب",
      "ملابس عمل عالية الوضوح",
      "ملابس قطاع النفط والغاز",
      "أفرولات وقائية للاستخدام الواحد",
      "ملابس عمل شتوية ومعزولة",
      "ملابس الصيانة والميكانيكا",
    ],
    customTitle: "حلول الزي الموحد المخصص",
    customText:
      "اختر الأقمشة والألوان والمقاسات والتفاصيل العاكسة والتطريز والهوية المؤسسية بما يناسب متطلبات فريق العمل.",
    cta: "اطلب عرض سعر",
    back: "جميع فئات الزي الموحد",
  },
};

export default function IndustrialUniformsPage() {
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
              {c.label}
            </p>

            <h1 className="mb-6 break-words font-serif text-3xl font-bold leading-tight lg:text-5xl">
              {c.title}
            </h1>

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
              src="/images/uniforms-hero.png"
              alt={
                lang === "ar"
                  ? "الزي الصناعي وملابس العمل"
                  : "Industrial uniforms and workwear"
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
        <h2 className="mb-6 break-words font-serif text-2xl font-bold md:text-4xl">
          {c.collection}
        </h2>

        <p className="mb-12 max-w-2xl leading-relaxed text-muted">
          {c.description}
        </p>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {c.products.map((product, index) => (
            <div
              key={product}
              className="min-w-0 border border-line bg-surface p-8 transition-colors hover:border-accent"
            >
              <span className="text-sm font-bold text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="mt-6 font-serif text-xl font-bold">
                {product}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* CUSTOM SOLUTIONS */}
      <section className="bg-surface py-16 md:py-24">
        <div className="container mx-auto grid grid-cols-1 items-center gap-8 px-6 md:px-12 lg:grid-cols-2 lg:gap-12">
          <div className="relative aspect-[3/2] min-w-0 overflow-hidden">
            <Image
              src="/images/uniforms-fr-oil-gas.png"
              alt={
                lang === "ar"
                  ? "ملابس العمل الصناعية الوقائية"
                  : "Protective industrial workwear"
              }
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain"
            />
          </div>

          <div className="min-w-0 text-start">
            <h2 className="mb-7 break-words font-serif text-2xl font-bold md:text-4xl">
              {c.customTitle}
            </h2>

            <p className="mb-9 leading-relaxed text-muted">
              {c.customText}
            </p>

            <Link
              href="/contact"
              className="inline-block max-w-full bg-accent px-6 py-4 text-center text-sm font-bold text-background transition-opacity hover:opacity-90"
            >
              {c.cta}
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
