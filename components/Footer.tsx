"use client";

import Link from "next/link";
import { COMPANY } from "@/lib/siteData";
import { useLanguage } from "./LanguageContext";
import EmblemMark from "./EmblemMark";
import { translations } from "@/lib/translations";
import clsx from "clsx";

export default function Footer() {
  const { lang, isRTL } = useLanguage();
  const t = translations[lang];

  return (
    <footer id="contact" className={clsx("bg-surface text-foreground border-t border-line mt-auto py-16 relative overflow-hidden", isRTL && "font-arabic")}>
      {/* Decorative Top Border Gradient */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center group mb-8 -ml-2">
              <EmblemMark size="h-[110px] w-[110px]" />
            </Link>
            <p className="text-muted max-w-md font-normal text-sm md:text-base leading-relaxed text-balance italic">
              {t.footer.tagline}
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <h3 className="font-serif font-bold text-[10px] premium-tracking uppercase text-accent border-b border-accent/20 pb-4 inline-block">
              {t.footer.communication}
            </h3>
            <ul className="space-y-4 text-sm font-normal">
              <li>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-muted font-serif italic mb-1">
                  {t.footer.primaryEmail}
                </span>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className={clsx("hover:text-accent transition-colors block text-foreground font-semibold text-xs lowercase dir-ltr", isRTL ? "text-right" : "text-left")}
                  style={{ direction: 'ltr' }}
                >
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-muted font-serif italic mb-1">
                  {t.footer.generalInquiries}
                </span>
                <a
                  href={`mailto:${COMPANY.emailGeneral}`}
                  className={clsx("hover:text-accent transition-colors block text-foreground font-semibold text-xs lowercase dir-ltr", isRTL ? "text-right" : "text-left")}
                  style={{ direction: 'ltr' }}
                >
                  {COMPANY.emailGeneral}
                </a>
              </li>
              <li>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-muted font-serif italic mb-1">
                  {t.footer.directLine}
                </span>
                <a
                  href={`tel:${COMPANY.phone}`}
                  className={clsx("hover:text-accent transition-colors block text-foreground font-semibold text-xs tracking-wide dir-ltr", isRTL ? "text-right" : "text-left")}
                  style={{ direction: 'ltr' }}
                >
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-muted font-serif italic mb-2">
                  {t.footer.whatsapp}
                </span>
                <div className="flex flex-col gap-1.5 items-start">
                  {COMPANY.whatsapp.map((num) => (
                    <a
                      key={num}
                      href={`https://wa.me/${num.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={clsx("inline-flex items-center gap-2 hover:text-accent transition-colors text-foreground font-semibold text-xs tracking-wide dir-ltr", isRTL && "flex-row-reverse")}
                      style={{ direction: 'ltr' }}
                      aria-label={`Chat on WhatsApp ${num}`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-4 w-4 fill-current text-accent shrink-0"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.768.967-.941 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.83 9.83 0 0 1 6.991 2.898 9.83 9.83 0 0 1 2.892 6.994c-.003 5.45-4.437 9.884-9.889 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.82 11.82 0 0 0 20.464 3.488" />
                      </svg>
                      <span>{num}</span>
                    </a>
                  ))}
                </div>
              </li>
              <li>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-muted font-serif italic mb-1">
                  {t.footer.globalHq}
                </span>
                <address className={clsx("not-italic text-foreground font-semibold text-xs leading-relaxed max-w-[240px]", isRTL ? "text-right" : "text-left")}>
                  {COMPANY.address[lang]}
                </address>
              </li>
              <li>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-muted font-serif italic mb-3">
                  {t.footer.credentials}
                </span>
                <div className={clsx("flex flex-col gap-1 text-foreground font-semibold text-xs uppercase w-full", isRTL ? "items-start text-right" : "items-start text-left")}>
                  <span className={clsx("dir-ltr block w-full", isRTL ? "text-right" : "text-left")} style={{ direction: 'ltr' }}>CR: {COMPANY.cr}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Sectors */}
          <div className="space-y-8">
            <h3 className="font-serif font-bold text-[10px] premium-tracking uppercase text-accent border-b border-accent/20 pb-4 inline-block">
              {t.footer.sectors}
            </h3>
            <ul className="space-y-4 text-sm font-normal">
              {COMPANY.divisions.map((div) => (
                <li key={div.name}>
                  <Link
                    href={div.href}
                    className="text-muted hover:text-accent transition-all hover:translate-x-1 inline-block uppercase text-xs font-bold tracking-widest"
                  >
                    {lang === 'ar'
                      ? (div.name === "Agriculture" ? "الزراعة" : div.name === "Industrial Construction" ? "الإنشاءات الصناعية" : "تجارة الكبريت")
                      : div.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/food"
                  className="text-muted hover:text-accent transition-all hover:translate-x-1 inline-block uppercase text-xs font-bold tracking-widest"
                >
                  {lang === 'ar' ? "تجارة الغذاء" : "Food Wholesale"}
                </Link>
              </li>
              <li>
                <Link
                  href="/auto-parts"
                  className="text-muted hover:text-accent transition-all hover:translate-x-1 inline-block uppercase text-xs font-bold tracking-widest"
                >
                  {lang === 'ar' ? "قطع غيار الشاحنات" : "Truck Auto Parts"}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted hover:text-accent transition-all hover:translate-x-1 inline-block uppercase text-xs font-bold tracking-widest"
                >
                  {lang === 'ar' ? "الخدمات والقدرات" : "Services & Capabilities"}
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-muted hover:text-accent transition-all hover:translate-x-1 inline-block uppercase text-xs font-bold tracking-widest"
                >
                  {lang === 'ar' ? "تنظيم الفعاليات" : "Event Organizing"}
                </Link>
              </li>
              <li className="pt-4">
                <Link
                  href="/contact"
                  className="text-accent hover:bg-accent hover:text-background transition-colors uppercase text-xs font-black tracking-[0.2em] border border-accent/30 px-4 py-2 rounded-sm inline-block"
                >
                  {t.common.requestAQuote}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-10 border-t border-line flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-medium premium-tracking text-muted uppercase">
          <p>
            {t.common.copyright}
          </p>
          <div className="flex space-x-10">
            <Link href="/privacy" className="hover:text-accent transition-colors">
              {t.common.privacy}
            </Link>
            <Link href="/terms" className="hover:text-accent transition-colors">
              {t.common.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
