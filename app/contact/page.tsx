"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedSection";
import { Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import { COMPANY } from "@/lib/siteData";
import { Turnstile } from "@marsidev/react-turnstile";
import { useLanguage } from "@/components/LanguageContext";
import { useTheme } from "@/components/ThemeContext";
import { translations } from "@/lib/translations";
import AsciiRevealCanvas from "@/components/AsciiRevealCanvas";
import { useHeroIntro } from "@/components/useHeroIntro";
import clsx from "clsx";

export default function ContactPage() {
  const { lang, isRTL } = useLanguage();
  const { theme } = useTheme();
  const t = translations[lang];

  const [token, setToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const heroTitle = t.contact.hero.title;
  const { introDone, hideField, typed, doneTyping } = useHeroIntro(heroTitle.length);
  const shownTitle = doneTyping ? heroTitle : heroTitle.slice(0, typed);
  const caret = introDone && !doneTyping;

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
        {/* Real hero image — fades in once the intro completes */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/contact_us_hero.png"
            alt="Bulker ship representing global reach"
            fill
            priority
            className={clsx("object-cover object-center transition-opacity duration-1000", introDone ? "opacity-40 hover:opacity-60" : "opacity-0")}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06080b] via-[#06080b]/80 to-transparent" />
        </div>

        {/* ASCII "materialize" intro */}
        {!hideField && (
          <motion.div
            className="absolute inset-0 z-[1]"
            initial={{ opacity: 1 }}
            animate={{ opacity: introDone ? 0 : 1 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <AsciiRevealCanvas src="/images/contact_us_hero.png" className="absolute inset-0 h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06080b] via-[#06080b]/40 to-transparent" />
          </motion.div>
        )}

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className={clsx("text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white uppercase tracking-tighter leading-[0.85]", isRTL && "font-arabic")}>
              <span className="sr-only">{heroTitle}</span>
              <span aria-hidden="true">
                {shownTitle}
                {caret && <span className="animate-caret font-sans font-normal text-accent">|</span>}
              </span>
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={doneTyping ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className={clsx("text-white/80 text-base md:text-lg font-normal leading-relaxed max-w-xl text-balance mt-6", isRTL && "text-start")}>
                {t.contact.hero.desc}
              </p>
            </motion.div>
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
            <AnimatedSection direction="up" delay={0.2} className="bg-surface p-8 md:p-12 border border-line rounded-sm shadow-xl shadow-line h-fit">
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
                      <option value="agriculture">{t.nav.agriculture}</option>
                      <option value="construction">{t.nav.construction}</option>
                      <option value="sulfur">{t.nav.sulfur}</option>
                      <option value="food">{t.nav.food}</option>
                      <option value="auto-parts">{t.nav.autoParts}</option>
                      <option value="services">{t.nav.services}</option>
                      <option value="events">{t.nav.events}</option>
                      <option value="other">{t.common.explore}</option>
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
