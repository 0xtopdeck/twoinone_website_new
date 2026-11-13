"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";

const copy = {
en: {
label: "TWO IN ONE LLC / UNIFORMS",
title: "MEDICAL UNIFORMS",
subtitle: "PROFESSIONAL WEAR FOR HEALTHCARE TEAMS.",
intro:
"Explore medical uniform solutions for hospitals, clinics and healthcare professionals, with options for comfort, practical design and a consistent professional identity.",
collection: "MEDICAL UNIFORM CATEGORIES",
description:
"Discuss the right garment types, colours, sizes and branding requirements for your healthcare team.",
items: [
"Medical Scrub Sets",
"Doctor Coats",
"Nursing Uniforms",
"Healthcare Staff Uniforms",
"Laboratory Coats",
"Clinic & Reception Uniforms",
],
custom: "TAILORED TO YOUR TEAM",
details:
"Discuss fabric preferences, colours, sizing and logo customisation with our team. We can help you explore suitable options for your organisation.",
quote: "REQUEST A QUOTE",
back: "ALL UNIFORM CATEGORIES",
},
ar: {
label: "شركة تو إن ون / الزي الموحد",
title: "الزي الطبي",
subtitle: "ملابس مهنية لفرق الرعاية الصحية.",
intro:
"استكشف حلول الزي الطبي للمستشفيات والعيادات والعاملين في القطاع الصحي، مع خيارات تجمع بين الراحة والتصميم العملي والهوية المهنية الموحدة.",
collection: "فئات الزي الطبي",
description:
"ناقش أنواع الملابس والألوان والمقاسات ومتطلبات الهوية المناسبة لفريقك الطبي.",
items: [
"أطقم الملابس الطبية",
"معاطف الأطباء",
"زي التمريض",
"زي العاملين في الرعاية الصحية",
"معاطف المختبرات",
"زي العيادات والاستقبال",
],
custom: "حلول تناسب فريقك",
details:
"ناقش معنا خيارات الأقمشة والألوان والمقاسات وتخصيص الشعار لمساعدتك في استكشاف الخيارات المناسبة لمؤسستك.",
quote: "اطلب عرض سعر",
back: "جميع فئات الزي الموحد",
},
};

export default function MedicalUniformsPage() {
const { lang, isRTL } = useLanguage();
const c = copy[lang];

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
          src="/images/photo_2026-10-25_18-28-20.jpg"
          alt={
            lang === "ar"
              ? "الزي الطبي لفرق الرعاية الصحية"
              : "Medical uniforms for healthcare teams"
          }
          className="block h-auto w-full"
        />
      </div>
    </div>
  </section>

  {/* CATEGORIES */}
  <section
    id="collection"
    className="container mx-auto px-6 py-16 md:px-12 md:py-24"
  >
    <div className="mb-10 max-w-3xl">
      <h2 className="mb-6 break-words font-serif text-2xl font-bold md:text-4xl">
        {c.collection}
      </h2>
      <p className="leading-relaxed text-muted">
        {c.description}
      </p>
    </div>

    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {c.items.map((item) => (
        <li
          key={item}
          className="min-w-0 rounded-xl border border-line bg-foreground/5 p-6"
        >
          <h3 className="text-lg font-semibold">{item}</h3>
        </li>
      ))}
    </ul>
  </section>

  {/* CUSTOMISATION */}
  <section className="border-y border-line bg-foreground/5">
<div className="container mx-auto px-6 py-16 md:px-12">
      <div className="max-w-3xl">
        <h2 className="mb-6 break-words font-serif text-2xl font-bold md:text-4xl">
          {c.custom}
        </h2>

        <p className="mb-8 leading-relaxed text-muted">
          {c.details}
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
