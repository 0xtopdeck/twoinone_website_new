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
<main className="min-h-screen bg-background text-foreground">
<section className="relative flex min-h-[580px] items-center overflow-hidden bg-[#071018]">
<div className="absolute inset-0 bg-gradient-to-br from-[#172b38] via-[#071018] to-black" />

    <div className="relative z-10 container mx-auto px-6 py-28 md:px-12">
      <div className="max-w-4xl">
        <p className="mb-6 font-bold tracking-widest text-accent">
          {c.eyebrow}
        </p>

        <h1 className="mb-7 font-serif text-4xl font-bold leading-tight text-white md:text-6xl">
          {c.title}
        </h1>

        <h2 className="mb-6 text-xl font-semibold text-white">
          {c.subtitle}
        </h2>

        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-white/80">
          {c.intro}
        </p>

        <a
          href="#collection"
          className="inline-block bg-accent px-8 py-4 font-bold text-background transition-opacity hover:opacity-90"
        >
          {c.explore}
        </a>
      </div>
    </div>
  </section>

  <section
[11/7/2026 10:13 AM] Sahereh Khs: id="collection"
    className="container mx-auto px-6 py-24 md:px-12"
  >
    <div className="mb-12 max-w-3xl">
      <h2 className="mb-6 font-serif text-3xl font-bold md:text-5xl">
        {c.collection}
      </h2>

      <p className="leading-relaxed text-muted">
        {c.description}
      </p>
    </div>

    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {c.products.map((product, index) => (
        <article
          key={product.title}
          className="border border-line bg-surface p-8 transition-colors hover:border-accent"
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

  <section className="bg-surface py-24">
    <div className="container mx-auto px-6 text-center md:px-12">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-7 font-serif text-3xl font-bold md:text-5xl">
          {c.customTitle}
        </h2>

        <p className="mb-10 leading-relaxed text-muted">
          {c.customText}
        </p>

        <Link
          href="/contact"
          className="inline-block bg-accent px-8 py-4 font-bold text-background transition-opacity hover:opacity-90"
        >
          {c.quote}
        </Link>
      </div>
    </div>
  </section>

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
