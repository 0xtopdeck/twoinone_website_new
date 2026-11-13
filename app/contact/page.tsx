"use client";

import { useState } from "react";
import Image from "next/image";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedSection";
import { Mail, MapPin, Phone } from "lucide-react";
import { COMPANY } from "@/lib/siteData";
import { Turnstile } from "@marsidev/react-turnstile";
import { useLanguage } from "@/components/LanguageContext";
import { useTheme } from "@/components/ThemeContext";
import { translations } from "@/lib/translations";
import clsx from "clsx";

export default function ContactPage() {
  const { lang, isRTL } = useLanguage();
  const { theme } = useTheme();
  const t = translations[lang];

  const [token, setToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const heroTitle = t.contact.hero.title;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) {
      alert(t.contact.form.errorBot || "Please complete the bot protection check.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: (document.getElementById("name") as HTMLInputElement).value,
          email: (document.getElementById("email") as HTMLInputElement).value,
          division: (document.getElementById("division") as HTMLSelectElement).value,
          message: (document.getElementById("message") as HTMLTextAreaElement).value,
          token,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert(t.contact.form.errorSubmit || "Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      alert(t.contact.form.errorGeneric || "An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center overflow-hidden bg-[#06080b]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/contact_us_hero.png"
            alt="Bulker ship representing global reach"
            fill
            priority
            className="object-cover object-center opacity-40 hover:opacity-60 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06080b] via-[#06080b]/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className={clsx("text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white uppercase tracking-tighter leading-[0.85]", isRTL && "font-arabic")}>
              {heroTitle}
            </h1>
            <div>
              <p className={clsx("text-white/80 text-base md:text-lg font-normal leading-relaxed max-w-xl text-balance mt-6", isRTL && "text-start")}>
                {t.contact.hero.desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTACT DETAILS & FORM */}
      <section className="py-24 md:py-32 relative z-10 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Contact Details */}
            <div>
              <AnimatedSection direction="up" className="mb-12">
                <h2 className={clsx("text-3xl md:text-4xl font-serif font-bold text-foreground mb-4", isRTL && "font-arabic")}>
                  {t.contact.details.title}
                </h2>
                <div className="w-16 h-px bg-accent mb-8" />
                <p className={clsx("text-muted font-normal text-lg mb-12 text-balance leading-relaxed", isRTL && "text-start")}>
                  {t.contact.details.desc}
                </p>
              </AnimatedSection>

              <StaggerContainer className="space-y-8">
                {/* Email */}
                <StaggerItem direction={isRTL ? "right" : "left"} className={clsx("flex items-start gap-6 group", isRTL && "flex-row-reverse text-end")}>
                  <div className="p-4 bg-surface rounded-full group-hover:bg-accent/10 transition-colors">
                    <Mail className="w-6 h-6 text-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <div>
                    <h3 className={clsx("font-serif font-bold text-xl text-foreground mb-1", isRTL && "font-arabic")}>{t.contact.details.emailInquiry}</h3>
                    <a 
                      href={`mailto:${COMPANY.email}`}
                      className="text-muted font-normal hover:text-accent transition-colors lowercase"
                      style={{ direction: 'ltr', display: 'inline-block' }}
                    >
                      {COMPANY.email}
                    </a>
                  </div>
                </StaggerItem>

                {/* Phone */}
                <StaggerItem direction={isRTL ? "right" : "left"} className={clsx("flex items-start gap-6 group", isRTL && "flex-row-reverse text-end")}>
                  <div className="p-4 bg-surface rounded-full group-hover:bg-accent/10 transition-colors">
                    <Phone className="w-6 h-6 text-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <div>
                    <h3 className={clsx("font-serif font-bold text-xl text-foreground mb-1", isRTL && "font-arabic")}>{t.contact.details.directLine}</h3>
                    <a 
                      href={`tel:${COMPANY.phone}`}
                      className="text-muted font-normal hover:text-accent transition-colors"
                      style={{ direction: 'ltr', display: 'inline-block' }}
                    >
                      {COMPANY.phone}
                    </a>
                  </div>
                </StaggerItem>

                {/* Location */}
                <StaggerItem direction={isRTL ? "right" : "left"} className={clsx("flex items-start gap-6 group", isRTL && "flex-row-reverse text-end")}>
                  <div className="p-4 bg-surface rounded-full group-hover:bg-accent/10 transition-colors">
                    <MapPin className="w-6 h-6 text-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <div>
                    <h3 className={clsx("font-serif font-bold text-xl text-foreground mb-1", isRTL && "font-arabic")}>{t.contact.details.hq}</h3>
                    <address className={clsx("text-muted font-normal not-italic leading-relaxed max-w-[200px]", isRTL && "font-arabic")}>
                      {COMPANY.address[lang]}
                    </address>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>

            {/* Contact Form */}
            <AnimatedSection direction="up" className="bg-surface p-8 md:p-12 border border-line rounded-sm shadow-xl shadow-line h-fit">
              <h3 className={clsx("font-serif font-bold text-2xl text-foreground mb-6", isRTL && "text-start font-arabic")}>{t.contact.form.title}</h3>
              
              {submitted ? (
                <div className="bg-surface-2 p-8 text-center rounded-sm border border-line">
                  <h4 className={clsx("text-accent font-serif font-bold text-xl mb-3", isRTL && "font-arabic")}>{t.contact.form.successTitle}</h4>
                  <p className="text-muted font-normal text-sm">
                    {t.contact.form.successDesc}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className={clsx("text-xs font-bold uppercase tracking-widest text-muted block", isRTL && "text-start")}>
                        {t.contact.form.fullNameCompany}
                      </label>
                      <input 
                        type="text" 
                        id="name"
                        required 
                        className={clsx("w-full bg-surface-2 border border-line px-4 py-3 rounded-sm focus:outline-none focus:border-accent transition-colors text-foreground font-normal", isRTL && "text-end")}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className={clsx("text-xs font-bold uppercase tracking-widest text-muted block", isRTL && "text-start")}>
                        {t.contact.form.email}
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        required
                        className={clsx("w-full bg-surface-2 border border-line px-4 py-3 rounded-sm focus:outline-none focus:border-accent transition-colors text-foreground font-normal", isRTL && "text-end")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="division" className={clsx("text-xs font-bold uppercase tracking-widest text-muted block", isRTL && "text-start")}>
                      {t.contact.form.division}
                    </label>
                    <select 
                      id="division" 
                      required
                      className={clsx("w-full bg-surface-2 border border-line px-4 py-3 rounded-sm focus:outline-none focus:border-accent transition-colors text-foreground font-normal appearance-none", isRTL && "text-start pr-10")}
                    >
                      <option value="">{t.contact.form.selectDivision}</option>
                      <option value="tours">{t.nav.tours}</option>
                      <option value="events">{t.nav.events}</option>
                      <option value="facility-services">{t.nav.facilityServices}</option>
                      <option value="uniforms">{t.nav.uniforms}</option>
                      <option value="medical-uniforms">{lang === "ar" ? "الزي الطبي" : "Medical Uniforms"}</option>
                      <option value="auto-parts">{t.nav.machineryAutoParts}</option>
                      <option value="commodities">{t.nav.commodities}</option>
                      <option value="other">{t.common.other}</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className={clsx("text-xs font-bold uppercase tracking-widest text-muted block", isRTL && "text-start")}>
                      {t.contact.form.message}
                    </label>
                    <textarea 
                      id="message" 
                      rows={5}
                      required
                      className={clsx("w-full bg-surface-2 border border-line px-4 py-3 rounded-sm focus:outline-none focus:border-accent transition-colors text-foreground font-normal resize-none", isRTL && "text-end")}
                    ></textarea>
                  </div>

                  <div className={clsx("pt-2 flex", isRTL && "justify-end")}>
                    <Turnstile
                      siteKey="0x4AAAAAACul__dWFbvMuQKG"
                      onSuccess={(token) => setToken(token)}
                      options={{ size: "normal", theme }}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting || !token}
                    className="w-full bg-accent hover:bg-accent/90 disabled:bg-accent/50 text-background font-medium uppercase tracking-widest text-sm py-4 rounded-sm transition-colors mt-6 flex justify-center items-center"
                  >
                    {isSubmitting ? t.contact.form.submitting : t.contact.form.send}
                  </button>
                </form>
              )}
            </AnimatedSection>
            
          </div>
        </div>
      </section>
    </div>
  );
}
