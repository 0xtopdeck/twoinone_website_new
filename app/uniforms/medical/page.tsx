"use client";
import Image from "next/image"; import Link from "next/link"; import { useLanguage } from "@/components/LanguageContext";
const copy = { en: { label: "MEDICAL UNIFORMS", title: "PROFESSIONAL WEAR FOR HEALTHCARE TEAMS.", intro: "Explore medical uniform solutions for hospitals, clinics and healthcare professionals, with options for comfort, practical design and a consistent professional identity.", collection: "MEDICAL UNIFORM CATEGORIES", description: "Discuss the right garment types, colours, sizes and branding requirements for your healthcare team.", items: [ "Medical Scrub Sets", "Doctor Coats", "Nursing Uniforms", "Healthcare Staff Uniforms", "Laboratory Coats", "Clinic & Reception Uniforms" ], custom: "TAILORED TO YOUR TEAM", details: "Discuss fabric preferences, colours, sizing and logo customisation with our team. We can help you explore suitable options for your organisation.", quote: "REQUEST A QUOTE", back: "ALL UNIFORM CATEGORIES" }, ar: { label: "الزي الطبي", title: "ملابس مهنية لفرق الرعاية الصحية.", intro: "استكشف حلول الزي الطبي للمستشفيات والعيادات والعاملين في القطاع الصحي، مع خيارات تجمع بين الراحة والتصميم العملي والهوية المهنية الموحدة.", collection: "فئات الزي الطبي", description: "ناقش أنواع الملابس والألوان والمقاسات ومتطلبات الهوية المناسبة لفريقك الطبي.", items: [ "أطقم الملابس الطبية", "معاطف الأطباء", "زي التمريض", "زي العاملين في الرعاية الصحية", "معاطف المختبرات", "زي العيادات والاستقبال" ], custom: "حلول تناسب فريقك", details: "ناقش معنا خيارات الأقمشة والألوان والمقاسات وتخصيص الشعار لمساعدتك في استكشاف الخيارات المناسبة لمؤسستك.", quote: "اطلب عرض سعر", back: "جميع فئات الزي الموحد" } };
export default function MedicalUniformsPage() { const { lang, isRTL } = useLanguage(); const c = copy[lang];
return ( <main className="min-h-screen bg-background text-foreground"> <section className="bg-[#071018] text-white py-24 md:py-32"> <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center"> <div> <p className="text-accent text-sm font-bold tracking-widest mb-6"> {c.label} </p> <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-8"> {c.title} </h1> <p className="text-white/75 text-lg leading-relaxed mb-9"> {c.intro} </p> <Link
href="/contact"
className="inline-block bg-accent text-background px-8 py-4 font-bold"
> {c.quote} </Link> </div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
        <Image
          src="/images/photo_2026-10-25_18-28-20.jpg"
          alt="Medical uniforms for healthcare teams"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </div>
  </section>

  <section className="container mx-auto px-6 md:px-12 py-24">
    <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
      {c.collection}
    </h2>
    <p className="text-muted max-w-2xl mb-12 leading-relaxed">
      {c.description}
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {c.items.map((item, index) => (
        <div
          key={item}
          className="bg-surface border border-line p-8 hover:border-accent transition-colors"
        >
          <span className="text-accent text-sm font-bold">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-xl font-serif font-bold mt-6">
            {item}
          </h3>
        </div>
      ))}
    </div>
  </section>

  <section className="bg-surface py-24">
    <div className="container mx-auto px-6 md:px-12 text-center">
      <h2 className="text-3xl md:text-5xl font-serif font-bold mb-7">
        {c.custom}
      </h2>
      <p className="text-muted max-w-2xl mx-auto leading-relaxed mb-9">
        {c.details}
      </p>
      <Link
        href="/contact"
        className="inline-block bg-accent text-background px-8 py-4 font-bold"
      >
        {c.quote}
      </Link>
    </div>
  </section>

  <section className="text-center py-16 px-6">
    <Link
      href="/uniforms"
      "use client";
import Image from "next/image"; import Link from "next/link"; import { useLanguage } from "@/components/LanguageContext";
const copy = { en: { label: "MEDICAL UNIFORMS", title: "PROFESSIONAL WEAR FOR HEALTHCARE TEAMS.", intro: "Explore medical uniform solutions for hospitals, clinics and healthcare professionals, with options for comfort, practical design and a consistent professional identity.", collection: "MEDICAL UNIFORM CATEGORIES", description: "Discuss the right garment types, colours, sizes and branding requirements for your healthcare team.", items: [ "Medical Scrub Sets", "Doctor Coats", "Nursing Uniforms", "Healthcare Staff Uniforms", "Laboratory Coats", "Clinic & Reception Uniforms" ], custom: "TAILORED TO YOUR TEAM", details: "Discuss fabric preferences, colours, sizing and logo customisation with our team. We can help you explore suitable options for your organisation.", quote: "REQUEST A QUOTE", back: "ALL UNIFORM CATEGORIES" }, ar: { label: "الزي الطبي", title: "ملابس مهنية لفرق الرعاية الصحية.", intro: "استكشف حلول الزي الطبي للمستشفيات والعيادات والعاملين في القطاع الصحي، مع خيارات تجمع بين الراحة والتصميم العملي والهوية المهنية الموحدة.", collection: "فئات الزي الطبي", description: "ناقش أنواع الملابس والألوان والمقاسات ومتطلبات الهوية المناسبة لفريقك الطبي.", items: [ "أطقم الملابس الطبية", "معاطف الأطباء", "زي التمريض", "زي العاملين في الرعاية الصحية", "معاطف المختبرات", "زي العيادات والاستقبال" ], custom: "حلول تناسب فريقك", details: "ناقش معنا خيارات الأقمشة والألوان والمقاسات وتخصيص الشعار لمساعدتك في استكشاف الخيارات المناسبة لمؤسستك.", quote: "اطلب عرض سعر", back: "جميع فئات الزي الموحد" } };
export default function MedicalUniformsPage() { const { lang, isRTL } = useLanguage(); const c = copy[lang];
return ( <main className="min-h-screen bg-background text-foreground"> <section className="bg-[#071018] text-white py-24 md:py-32"> <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center"> <div> <p className="text-accent text-sm font-bold tracking-widest mb-6"> {c.label} </p> <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-8"> {c.title} </h1> <p className="text-white/75 text-lg leading-relaxed mb-9"> {c.intro} </p> <Link
href="/contact"
className="inline-block bg-accent text-background px-8 py-4 font-bold"
> {c.quote} </Link> </div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
        <Image
          src="/images/photo_2026-10-25_18-28-20.jpg"
          alt="Medical uniforms for healthcare teams"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </div>
  </section>

  <section className="container mx-auto px-6 md:px-12 py-24">
    <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
      {c.collection}
    </h2>
    <p className="text-muted max-w-2xl mb-12 leading-relaxed">
      {c.description}
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {c.items.map((item, index) => (
        <div
          key={item}
          className="bg-surface border border-line p-8 hover:border-accent transition-colors"
        >
          <span className="text-accent text-sm font-bold">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-xl font-serif font-bold mt-6">
            {item}
          </h3>
        </div>
      ))}
    </div>
  </section>

  <section className="bg-surface py-24">
    <div className="container mx-auto px-6 md:px-12 text-center">
      <h2 className="text-3xl md:text-5xl font-serif font-bold mb-7">
        {c.custom}
      </h2>
      <p className="text-muted max-w-2xl mx-auto leading-relaxed mb-9">
        {c.details}
      </p>
      <Link
        href="/contact"
        className="inline-block bg-accent text-background px-8 py-4 font-bold"
      >
        {c.quote}
      </Link>
    </div>
  </section>

  <section className="text-center py-16 px-6">
    <Link
      href="/uniforms"
      className="text-accent font-bold underline underline-offset-4"

    >

      {isRTL ? "→ " : "← "}

      {c.back}

    </Link>

  </section>

</main>

);

}
      
