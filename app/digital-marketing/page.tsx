"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";

const content = {
  en: {
    eyebrow: "TWO IN ONE LLC / DIGITAL MARKETING",
    title: "DIGITAL MARKETING",
    subtitle: "CONTENT WITH PURPOSE. A CONSISTENT BRAND.",
    intro:
      "Build your digital presence through social media management, professional photography, video production and advertising support.",
    explore: "EXPLORE OUR SERVICES",
    servicesTitle: "OUR DIGITAL MARKETING SERVICES",
    servicesIntro:
      "Creative and practical support tailored to your brand, audience and business goals.",
    services: [
      {
        title: "Social Media Management",
        text: "Content calendars, publishing, page management and community engagement.",
      },
      {
        title: "Content Strategy & Planning",
        text: "Content ideas, campaign concepts, scripts and shot lists aligned with your brand.",
      },
      {
        title: "Photography & Videography",
        text: "Visual content for businesses, products, interiors, projects and events.",
      },
      {
        title: "Reels & Video Editing",
        text: "Short-form videos, editing, subtitles and platform-ready content.",
      },
      {
        title: "Social Media Design & Copy",
        text: "Posts, stories and captions in English and Arabic with a consistent visual identity.",
      },
      {
        title: "Advertising & Reporting",
        text: "Social media advertising support, performance reviews and practical recommendations.",
      },
    ],
    partnerLabel: "BUSINESS PARTNER",
    partnerName: "AVVIO",
    partnerTitle: "CREATIVE CONTENT & DIGITAL MARKETING",
    partnerText:
      "Avvio works with Two in One LLC as a business partner for digital marketing and content creation, bringing together planning, photography, video and social media support.",
    contactTitle: "LET'S DISCUSS YOUR BRAND.",
    contactText:
      "Tell us about your business, your audience and the services you need.",
    whatsapp: "CHAT ON WHATSAPP",
    call: "CALL US",
    email: "EMAIL BUSINESS",
    enquiry: "SEND AN ENQUIRY",
    back: "BACK TO HOME",
  },
  ar: {
    eyebrow: "تو إن ون / التسويق الرقمي",
    title: "التسويق الرقمي",
    subtitle: "محتوى هادف. وهوية متناسقة.",
    intro:
      "عزّز حضورك الرقمي من خلال إدارة وسائل التواصل الاجتماعي والتصوير الاحترافي وإنتاج الفيديو ودعم الحملات الإعلانية.",
    explore: "استكشف خدماتنا",
    servicesTitle: "خدمات التسويق الرقمي",
    servicesIntro:
      "دعم إبداعي وعملي يتناسب مع علامتك التجارية وجمهورك وأهداف عملك.",
    services: [
      {
        title: "إدارة وسائل التواصل الاجتماعي",
        text: "إعداد جداول المحتوى والنشر وإدارة الصفحات والتفاعل مع الجمهور.",
      },
      {
        title: "استراتيجية المحتوى والتخطيط",
        text: "أفكار للمحتوى والحملات وكتابة السيناريوهات وإعداد قوائم اللقطات بما يتناسب مع علامتك التجارية.",
      },
      {
        title: "التصوير الفوتوغرافي وإنتاج الفيديو",
        text: "محتوى بصري للشركات والمنتجات والمساحات الداخلية والمشاريع والفعاليات.",
      },
      {
        title: "الريلز ومونتاج الفيديو",
        text: "إنتاج مقاطع قصيرة ومونتاج وإضافة ترجمات وتجهيز المحتوى للنشر.",
      },
      {
        title: "تصميم وكتابة محتوى التواصل الاجتماعي",
        text: "منشورات وقصص ونصوص بالعربية والإنجليزية بهوية بصرية متناسقة.",
      },
      {
        title: "الإعلانات وتقارير الأداء",
        text: "دعم إعلانات وسائل التواصل الاجتماعي ومراجعة الأداء وتقديم توصيات عملية.",
      },
    ],
    partnerLabel: "شريك أعمال",
    partnerName: "AVVIO",
    partnerTitle: "المحتوى الإبداعي والتسويق الرقمي",
    partnerText:
      "تتعاون أفيو مع تو إن ون كشريك أعمال في التسويق الرقمي وصناعة المحتوى، من خلال التخطيط والتصوير وإنتاج الفيديو ودعم وسائل التواصل الاجتماعي.",
    contactTitle: "دعنا نتحدث عن علامتك التجارية.",
    contactText:
      "أخبرنا عن نشاطك التجاري وجمهورك والخدمات التي تحتاجها.",
    whatsapp: "تواصل عبر واتساب",
    call: "اتصل بنا",
    email: "راسلنا عبر البريد",
    enquiry: "أرسل استفسارك",
    back: "العودة إلى الرئيسية",
  },
};

export default function DigitalMarketingPage() {
  const { lang, isRTL } = useLanguage();
  const c = content[lang];

  const buttonClass =
    "inline-block max-w-full bg-accent px-6 py-4 text-center text-sm font-bold text-background transition-opacity hover:opacity-90";

  return (
    <main
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-screen bg-background text-foreground"
    >
           {/* INTRODUCTION */}
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

            <a href="#services" className={buttonClass}>
              {c.explore}
            </a>
          </div>

          <div className="order-1 min-w-0 md:order-2">
            <img
             src="/images/digital-marketing.PNG.png"
              alt={
                lang === "ar"
                  ? "مساحة عمل لإنتاج المحتوى والتسويق الرقمي تضم كاميرا وحاسوباً وهاتفاً"
                  : "Digital marketing and content production workspace with a camera, laptop and smartphone"
              }
              width={1448}
              height={1086}
              loading="eager"
              decoding="async"
              className="block h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="container mx-auto px-6 py-16 md:px-12 md:py-24"
      >
        <div className="mb-12 max-w-3xl">
          <h2 className="mb-6 break-words font-serif text-2xl font-bold md:text-4xl">
            {c.servicesTitle}
          </h2>

          <p className="leading-relaxed text-muted">
            {c.servicesIntro}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {c.services.map((service, index) => (
            <article
              key={service.title}
              className="min-w-0 border border-line bg-surface p-8 transition-colors hover:border-accent"
            >
              <span className="text-sm font-bold text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="mb-4 mt-6 font-serif text-xl font-bold">
                {service.title}
              </h3>

              <p className="leading-relaxed text-muted">
                {service.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* BUSINESS PARTNER */}
      <section className="bg-surface py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0">
              <p className="mb-5 text-sm font-bold tracking-widest text-accent">
                {c.partnerLabel}
              </p>

              <h2 className="mb-6 font-serif text-4xl font-bold md:text-5xl">
                <span dir="ltr">{c.partnerName}</span>
              </h2>

              <h3 className="mb-5 text-lg font-semibold">
                {c.partnerTitle}
              </h3>

              <p className="max-w-2xl leading-relaxed text-muted">
                {c.partnerText}
              </p>
            </div>

            <div className="min-w-0 bg-[#071018] p-6 text-white sm:p-10">
              <h2 className="mb-6 break-words font-serif text-2xl font-bold md:text-3xl">
                {c.contactTitle}
              </h2>

              <p className="mb-8 leading-relaxed text-white/80">
                {c.contactText}
              </p>

              <div className="mb-8 space-y-4">
                <a
                  href="tel:+96893690004"
                  className="block text-accent hover:underline"
                >
                  <span className="block text-sm">{c.call}</span>
                  <span dir="ltr" className="inline-block font-semibold">
                    +968 9369 0004
                  </span>
                </a>

                <a
                  href="mailto:business@twoinone.llc"
                  className="block break-words text-accent hover:underline"
                >
                  <span className="block text-sm">{c.email}</span>
                  <span dir="ltr" className="inline-block">
                    business@twoinone.llc
                  </span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://wa.me/96893690004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass}
                >
                  {c.whatsapp}
                </a>

                <Link
                  href="/contact"
                  className="inline-block py-3 text-sm font-bold text-accent underline underline-offset-4"
                >
                  {c.enquiry}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 text-center">
        <Link
          href="/"
          className="font-bold text-accent underline underline-offset-4"
        >
          {isRTL ? "→ " : "← "}
          {c.back}
        </Link>
      </section>
    </main>
  );
}
