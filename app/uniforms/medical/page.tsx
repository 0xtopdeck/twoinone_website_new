"use client";

import Image from "next/image";
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
{/* HERO SECTION */}
<section className="relative flex min-h-[650px] items-center overflow-hidden bg-[#071018] text-white">
<Image
src="/images/photo_2026-10-25_18-28-20.jpg"
alt="Medical uniforms for healthcare teams"
fill
priority
className="object-cover object-center"
sizes="100vw"
/>

    {/* DARK OVERLAY */}
    <div className="absolute inset-0 bg-[#071018]/55" />

    <div className="absolute inset-0 bg-gradient-to-r from-[#071018]/90 via-[#071018]/65 to-[#071018]/30" />

    {/* HERO CONTENT */}
    <div className="relative z-10 container mx-auto px-6 py-20 md:px-12 md:py-28">
      <div className="max-w-3xl">
        <p className="mb-8 text-sm font-bold tracking-[0.16em] text-accent md:text-base">
          {c.label}
        </p>

        <h1 className="mb-8 text-5xl font-extrabold leading-[1.08] tracking-tight md:text-7xl">
          {c.title}
        </h1>

        <h2 className="mb-8 text-2xl font-bold leading-snug text-accent md:text-3xl">
          {c.subtitle}
        </h2>

        <p className="mb-12 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
          {c.intro}
        </p>

        <Link
          href="/contact"
          className="inline-block bg-accent px-8 py-5 text-center font-bold text-background transition-opacity hover:opacity-90"
        >
          {c.quote}
        </Link>
      </div>
    </div>
  </section>

  {/* MEDICAL UNIFORM CATEGORIES */}
  <section className="container mx-auto px-6 py-24 md:px-12">
    <h2 className="mb-6 text-3xl font-bold md:text-5xl">
      {c.collection}
    </h2>

    <p className="mb-12 max-w-2xl leading-relaxed text-muted">
      {c.description}
    </p>

    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {c.items.map((item, index) => (
        <div
          key={item}
          className="border border-line bg-surface p-8 transition-colors hover:border-accent"
        >
          <span className="text-sm font-bold text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>

          <h3 className="mt-6 text-xl font-bold">
            {item}
          </h3>
        </div>
      ))}
    </div>
  </section>

  {/* CUSTOM UNIFORMS */}
  <section className="bg-surface py-24">
    <div className="container mx-auto px-6 text-center md:px-12">
      <h2 className="mb-7 text-3xl font-bold md:text-5xl">
        {c.custom}
      </h2>

      <p className="mx-auto mb-9 max-w-2xl leading-relaxed text-muted">
        {c.details}
      </p>

      <Link
        href="/contact"
        className="inline-block bg-accent px-8 py-4 font-bold text-background transition-opacity hover:opacity-90"
      >
        {c.quote}
      </Link>
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
