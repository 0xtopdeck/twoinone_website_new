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

          "Everyday school shirts and polo options for different age groups."

      },

      {

        title: "Trousers & Skirts",

        description:

          "Practical uniform options suited to daily school activities."

      },

      {

        title: "Sports & PE Uniforms",

        description:

          "Comfortable sportswear options for physical education and activities."

      },

      {

        title: "Blazers & Jackets",

        description:

          "Outerwear options that complement a school's uniform identity."

      },

      {

        title: "School Accessories",

        description:

          "Explore complementary uniform items and accessories."

      },

      {

        title: "School Staff Uniforms",

        description:

          "Professional clothing options for teaching and support teams."

      }

    ],

    customLabel: "PERSONALISED SOLUTIONS",

    customTitle: "YOUR SCHOOL. YOUR IDENTITY.",

    customText:

      "Discuss your school's colours, garment styles, sizing needs and branding preferences with our team. We can help you explore uniform options suited to your requirements.",

    contactTitle: "LET'S DISCUSS YOUR REQUIREMENTS.",

    contactText:

      "Planning uniforms for a school or educational institution? Contact our team to discuss your needs and request a quotation.",

    quote: "REQUEST A QUOTE",

    back: "BACK TO ALL UNIFORMS"

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

          "خيارات القمصان المدرسية اليومية لمختلف الفئات العمرية."

      },

      {

        title: "البناطيل والتنانير",

        description:

          "خيارات عملية مناسبة للأنشطة المدرسية اليومية."

      },

      {

        title: "الزي الرياضي المدرسي",

        description:

          "خيارات مريحة للتربية البدنية والأنشطة الرياضية."

      },

      {

        title: "السترات والمعاطف",

        description:

          "خيارات ملابس خارجية تتناسب مع هوية المدرسة."

      },

      {

        title: "الإكسسوارات المدرسية",

        description:

          "استكشف مستلزمات وإكسسوارات الزي المدرسي المكملة."

      },

      {

        title: "زي الكادر المدرسي",

        description:

          "خيارات ملابس مهنية للمعلمين وفرق الدعم."

      }

    ],

    customLabel: "حلول مخصصة",

    customTitle: "مدرستك. هويتك.",

    customText:

      "ناقش معنا ألوان مدرستك وتصاميم الملابس والمقاسات ومتطلبات الهوية المؤسسية لاستكشاف الخيارات المناسبة لاحتياجاتك.",

    contactTitle: "دعنا نناقش متطلباتك.",

    contactText:

      "هل تخطط لتوفير الزي الموحد لمدرسة أو مؤسسة تعليمية؟ تواصل مع فريقنا لمناقشة احتياجاتك وطلب عرض سعر.",

    quote: "اطلب عرض سعر",

    back: "العودة إلى جميع فئات الزي الموحد"

  }

};

export default function SchoolsUniformsPage() {

  const { lang, isRTL } = useLanguage();

  const c = content[lang];

  return (

    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden bg-[#071018] text-white">
        <div
  className={isRTL ? "absolute inset-y-0 w-1/2 bg-no-repeat bg-contain bg-center left-0" : "absolute inset-y-0 w-1/2 bg-no-repeat bg-contain bg-center right-0"}
   style={{
  backgroundImage:   "linear-gradient(90deg, rgba(7,16,24,0.92), rgba(7,16,24,0.55)), url('/images/IMG_6748.PNG')",
  }}
/>

        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/10" />

        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full border border-white/10" />

        <div className="relative container mx-auto px-6 md:px-12 py-28 md:py-40">

          <div className="max-w-4xl">

            <p className="text-accent text-sm font-bold tracking-widest mb-8">

              {c.eyebrow}

            </p>

            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-7">

              {c.title}

            </h1>

            <h2 className="text-xl md:text-2xl font-semibold text-accent mb-8">

              {c.subtitle}

            </h2>

            <p className="text-lg text-white/75 leading-relaxed max-w-2xl mb-10">

              {c.intro}

            </p>

            <Link

              href="/contact"

              className="inline-block bg-accent text-background px-8 py-4 font-bold hover:opacity-90 transition-opacity"

            >

              {c.quote}

            </Link>

          </div>

        </div>

      </section>

      <section className="container mx-auto px-6 md:px-12 py-24">

        <div className="max-w-3xl mb-14">

          <p className="text-accent text-sm font-bold tracking-widest mb-5">

            TWO IN ONE

          </p>

          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-7">

            {c.categoriesTitle}

          </h2>

          <p className="text-muted leading-relaxed">

            {c.categoriesIntro}

          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

          {c.categories.map((item, index) => (

            <article

              key={index}

              className="group bg-surface border border-line p-8 min-h-[240px] hover:border-accent transition-colors"

            >

              <div className="flex items-center justify-between mb-10">

                <span className="text-accent text-sm font-bold">

                  {String(index + 1).padStart(2, "0")}

                </span>

                <span className="w-10 h-px bg-accent" />

              </div>

              <h3 className="text-xl md:text-2xl font-serif font-bold mb-4">

                {item.title}

              </h3>

              <p className="text-muted text-sm leading-relaxed">

                {item.description}

              </p>

            </article>

          ))}

        </div>

      </section>

      <section className="bg-surface py-24">

        <div className="container mx-auto px-6 md:px-12">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div>

              <p className="text-accent text-sm font-bold tracking-widest mb-6">

                {c.customLabel}

              </p>

              <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-8">

                {c.customTitle}

              </h2>

              <p className="text-muted leading-relaxed">

                {c.customText}

              </p>

            </div>

            <div className="bg-[#071018] text-white p-10 md:p-14">

              <div className="w-16 h-1 bg-accent mb-10" />

              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-6">

                {c.contactTitle}

              </h3>

              <p className="text-white/70 leading-relaxed mb-10">

                {c.contactText}

              </p>

              <Link

                href="/contact"

                className="inline-block bg-accent text-background px-8 py-4 font-bold hover:opacity-90 transition-opacity"

              >

                {c.quote}

              </Link>

            </div>

          </div>

        </div>

      </section>

      <section className="text-center px-6 py-16">

        <Link

          href="/uniforms"

          className="inline-block text-accent font-bold underline underline-offset-4"

        >
          {isRTL ? "→ " : "← "}

          {c.back}

        </Link>

      </section>

    </main>

  );

}
