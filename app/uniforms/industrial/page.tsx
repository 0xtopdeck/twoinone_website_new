"use client";
import Image from "next/image"; import Link from "next/link"; import { useLanguage } from "@/components/LanguageContext";
const content = { en: { label: "INDUSTRIAL UNIFORMS", title: "WORKWEAR BUILT FOR PERFORMANCE.", intro: "Professional industrial uniforms designed for demanding workplaces, combining durability, comfort, safety and corporate identity.", explore: "Explore our collection", collection: "INDUSTRIAL WORKWEAR COLLECTION", description: "Uniform solutions tailored to different industries, working conditions and team requirements.", products: [ "Standard Industrial Coveralls", "Flame-Resistant Coveralls", "High-Visibility Workwear", "Oil & Gas Workwear", "Disposable Protective Coveralls", "Winter & Insulated Workwear", "Maintenance & Mechanic Uniforms", ], customTitle: "CUSTOM UNIFORM SOLUTIONS", customText: "Choose fabrics, colours, sizing, reflective details, embroidery and company branding to create uniforms that match your workforce requirements.", cta: "REQUEST A QUOTE", back: "ALL UNIFORM CATEGORIES", }, ar: { label: "الزي الصناعي", title: "ملابس عمل مصممة للأداء.", intro: "ملابس عمل صناعية احترافية مصممة لبيئات العمل الصعبة، تجمع بين المتانة والراحة والسلامة والهوية المؤسسية.", explore: "استكشف مجموعتنا", collection: "مجموعة ملابس العمل الصناعية", description: "حلول زي موحد تناسب مختلف القطاعات وظروف العمل واحتياجات الفرق.", products: [ "أفرولات صناعية قياسية", "أفرولات مقاومة للهب", "ملابس عمل عالية الوضوح", "ملابس قطاع النفط والغاز", "أفرولات وقائية للاستخدام الواحد", "ملابس عمل شتوية ومعزولة", "ملابس الصيانة والميكانيكا", ], customTitle: "حلول الزي الموحد المخصص", customText: "اختر الأقمشة والألوان والمقاسات والتفاصيل العاكسة والتطريز والهوية المؤسسية بما يناسب متطلبات فريق العمل.", cta: "اطلب عرض سعر", back: "جميع فئات الزي الموحد", }, };
export default function IndustrialUniformsPage() { const { lang, isRTL } = useLanguage(); const c = content[lang];
return ( <main className="min-h-screen bg-background text-foreground"> <section className="relative min-h-[650px] flex items-center bg-[#071018]"> <Image
src="/images/uniforms-hero.png"
alt="Industrial uniforms"
fill
priority
className="object-cover opacity-45"
/> <div className="relative z-10 container mx-auto px-6 md:px-12 py-32"> <div className="max-w-3xl"> <p className="text-accent font-bold tracking-widest mb-6"> {c.label} </p> <h1 className="text-white text-5xl md:text-7xl font-serif font-bold leading-tight mb-8"> {c.title} </h1> <p className="text-white/80 text-lg leading-relaxed mb-10"> {c.intro} </p> <a
href="#collection"
className="inline-block bg-accent text-background px-8 py-4 font-bold"
> {c.explore} </a> </div> </div> </section>
  <section id="collection" className="container mx-auto px-6 md:px-12 py-24">
    <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
      {c.collection}
    </h2>
    <p className="text-muted max-w-2xl mb-12">
      {c.description}
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {c.products.map((product, index) => (
        <div
          key={product}
          className="bg-surface border border-line p-8 hover:border-accent transition-colors"
        >
          <span className="text-accent text-sm font-bold">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-xl font-serif font-bold mt-6">
            {product}
          </h3>
        </div>
      ))}
    </div>
  </section>

  <section className="bg-surface py-24">
    <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center">
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src="/images/uniforms-fr-oil-gas.png"
          alt="Protective industrial workwear"
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-7">
          {c.customTitle}
        </h2>
        <p className="text-muted leading-relaxed mb-9">
          {c.customText}
        </p>
        <Link
          href="/contact"
