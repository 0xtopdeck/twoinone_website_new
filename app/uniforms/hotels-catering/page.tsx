"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";

const content = {
en: {
eyebrow: "TWO IN ONE LLC / UNIFORMS",
title: "HOTELS & CATERING UNIFORMS",
subtitle: "PROFESSIONAL STYLE. EVERYDAY COMFORT.",
intro:
"Uniform solutions for hospitality and catering teams, designed to support a polished appearance, practical daily wear, and a consistent brand identity.",
explore: "EXPLORE OUR COLLECTION",
collection: "HOSPITALITY UNIFORM COLLECTION",
description:
"Explore uniform options for hotel departments, restaurants, catering operations, and guest-facing teams.",
products: [
{
title: "Hotel Reception Uniforms",
text: "Professional attire options for front desk and guest relations teams.",
},
{
title: "Housekeeping Uniforms",
text: "Practical uniform options designed for comfort and daily movement.",
},
{
title: "Chef Jackets & Trousers",
text: "Kitchen uniform options for chefs and culinary teams.",
},
{
title: "Restaurant & Waitstaff Uniforms",
text: "Coordinated clothing options for restaurant and service staff.",
},
{
title: "Catering Staff Uniforms",
text: "Professional uniform options for catering teams and event service.",
},
{
title: "Aprons & Accessories",
text: "Complementary aprons and accessories for hospitality operations.",
},
],
customTitle: "CUSTOM UNIFORMS FOR YOUR BRAND",
customText:
"Explore fabric, colour, sizing, embroidery, and branding options to create a consistent look across your hospitality team. Share your requirements with us to discuss suitable solutions.",
quote: "REQUEST A QUOTE",
back: "ALL UNIFORM CATEGORIES",
},
ar: {
eyebrow: "تو إن ون ش.م.م / الزي الموحد",
title: "الزي الموحد للفنادق والضيافة والتموين",
subtitle: "مظهر احترافي. راحة طوال اليوم.",
intro:
"حلول الزي الموحد لفرق الضيافة والتموين، مصممة لتعزيز المظهر الأنيق والراحة أثناء العمل والهوية الموحدة للعلامة التجارية.",
explore: "استكشف مجموعتنا",
collection: "مجموعة الزي الموحد للضيافة",
description:
"استكشف خيارات الزي الموحد لأقسام الفنادق والمطاعم وخدمات التموين وفرق استقبال الضيوف.",
products: [
{
title: "زي موظفي استقبال الفنادق",
text: "خيارات ملابس احترافية لفرق الاستقبال وخدمة الضيوف.",
},
{
title: "زي موظفي التدبير الفندقي",
text: "خيارات عملية توفر الراحة وسهولة الحركة أثناء العمل اليومي.",
},
{
title: "سترات وسراويل الطهاة",
text: "خيارات الزي الموحد للطهاة وفرق العمل في المطابخ.",
},
{
title: "زي موظفي المطاعم والخدمة",
text: "خيارات ملابس متناسقة لفرق المطاعم والخدمة.",
},
{
title: "زي موظفي خدمات التموين",
text: "خيارات زي احترافية لفرق التموين وخدمة الفعاليات.",
},
{
title: "المرايل والإكسسوارات",
text: "مرايل وإكسسوارات مكملة لعمليات الضيافة.",
},
],
customTitle: "زي موحد مخصص لهوية علامتك التجارية",
customText:
"استكشف خيارات الأقمشة والألوان والمقاسات والتطريز وإضافة شعار الشركة لتوحيد مظهر فريق الضيافة. شاركنا متطلباتك لمناقشة الحلول المناسبة.",
quote: "اطلب عرض سعر",
back: "جميع فئات الزي الموحد",
},
};

export default function HotelsCateringUniformsPage() {
const { lang, isRTL } = useLanguage();
const c = content[lang];

return (
<main className="min-h-screen bg-background text-foreground">
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
    src="/images/IMG_6747.PNG"
    alt={
      lang === "ar"
        ? "الزي الموحد لفرق الفنادق والضيافة"
        : "Uniforms for hotel and hospitality teams"
    }
    className="block h-auto w-full"
  />
</div>


  <section
    id="collection"
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
