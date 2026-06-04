"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedSection";
import { Users, Briefcase, MapPin, Globe, CheckCircle2, FileText } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import { useLanguage } from "@/components/LanguageContext";
import { translations } from "@/lib/translations";
import AsciiRevealCanvas from "@/components/AsciiRevealCanvas";
import { useHeroIntro } from "@/components/useHeroIntro";
import clsx from "clsx";

export default function CareersPage() {
  const { lang, isRTL } = useLanguage();
  const t = translations[lang];

  const [token, setToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fileError, setFileError] = useState("");

  const heroTitle = t.careers.hero.title;
  const { introDone, hideField, typed, doneTyping } = useHeroIntro(heroTitle.length);
  const shownTitle = doneTyping ? heroTitle : heroTitle.slice(0, typed);
  const caret = introDone && !doneTyping;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setFileError(t.careers.form.errorPdf);
        e.target.value = "";
      } else if (file.size > 5 * 1024 * 1024) {
        setFileError(t.careers.form.errorSize);
        e.target.value = "";
      } else {
        setFileError("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) {
      alert(t.careers.form.errorBot);
      return;
    }
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append("name", (document.getElementById("name") as HTMLInputElement).value);
      formData.append("email", (document.getElementById("email") as HTMLInputElement).value);
      formData.append("position", (document.getElementById("position") as HTMLSelectElement).value);
      
      const fileInput = document.getElementById("cv") as HTMLInputElement;
      if (fileInput.files?.[0]) {
        formData.append("cv", fileInput.files[0]);
      }

      const response = await fetch("/api/careers", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert(t.careers.form.errorSubmit);
      }
    } catch (error) {
      console.error(error);
      alert(t.careers.form.errorGeneric);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center overflow-hidden bg-[#06080b]">
        {/* Real hero image — fades in once the intro completes (desktop, as before) */}
        <div className="absolute inset-0 z-0 hidden md:block">
          <Image
            src="/images/careers_hero.png"
            alt="Careers Hero"
            fill
            priority
            className={clsx("object-cover object-[65%_center] md:object-center transition-opacity duration-1000", introDone ? "opacity-40 hover:opacity-60" : "opacity-0")}
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
            <AsciiRevealCanvas src="/images/careers_hero.png" className="absolute inset-0 h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06080b] via-[#06080b]/40 to-transparent" />
          </motion.div>
        )}

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 flex items-center gap-3"
            >
              <Users className="w-6 h-6 text-accent" />
              <span className="text-accent font-serif italic tracking-wide">
                {t.careers.hero.join}
              </span>
            </motion.div>

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
                {t.careers.hero.desc}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. OPENINGS & APPLICATION FORM */}
      <section className="py-24 md:py-32 relative z-10 bg-background overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left: Job Postings & General Info */}
          <div className="lg:col-span-7 flex flex-col gap-16">
            
            {/* ICC Lawyer Opening */}
            <div>
              <AnimatedSection direction="up">
                <h2 className={clsx("text-3xl md:text-4xl font-serif font-bold text-foreground mb-4", isRTL && "font-arabic")}>
                  {t.careers.openings.title}
                </h2>
                <div className="w-16 h-px bg-accent mb-12" />
              </AnimatedSection>

              <AnimatedSection direction="up" delay={0.1} className="bg-surface border border-line p-8 md:p-10 rounded-sm shadow-xl shadow-forest/5 hover:border-accent/50 transition-colors group">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <h3 className={clsx("text-2xl font-serif font-bold text-foreground group-hover:text-accent transition-colors", isRTL && "text-start font-arabic")}>
                    {t.careers.openings.iccLawyer}
                  </h3>
                  <span className="bg-surface-2 text-foreground font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-full whitespace-nowrap">
                    {t.careers.openings.active}
                  </span>
                </div>

                <p className={clsx("text-muted font-normal leading-relaxed mb-8", isRTL && "text-start")}>
                  {t.careers.openings.iccDesc}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={clsx("flex items-center gap-3 text-muted font-medium text-sm", isRTL && "flex-row-reverse text-end")}>
                    <Briefcase className="w-5 h-5 text-accent" />
                    <span>{t.careers.openings.fullTime}</span>
                  </div>
                  <div className={clsx("flex items-center gap-3 text-muted font-medium text-sm", isRTL && "flex-row-reverse text-end")}>
                    <MapPin className="w-5 h-5 text-accent" />
                    <span>{t.careers.openings.location}</span>
                  </div>
                  <div className={clsx("flex items-center gap-3 text-muted font-medium text-sm md:col-span-2", isRTL && "flex-row-reverse text-end")}>
                    <Globe className="w-5 h-5 text-accent" />
                    <span>{t.careers.openings.bilingual}</span>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* General Submission */}
            <AnimatedSection direction="up" delay={0.2} className={clsx("bg-surface text-foreground p-10 rounded-sm relative overflow-hidden", isRTL ? "border-r-4 border-accent" : "border-l-4 border-accent")}>
              <Users className={clsx("absolute -bottom-8 w-48 h-48 text-foreground/5 pointer-events-none", isRTL ? "-left-8" : "-right-8")} />
              <h3 className={clsx("text-2xl font-serif font-bold mb-4 relative z-10", isRTL && "text-start font-arabic")}>
                {t.careers.general.title}
              </h3>
              <p className={clsx("text-muted font-normal leading-relaxed relative z-10 max-w-lg", isRTL && "text-start")}>
                {t.careers.general.desc}
              </p>
            </AnimatedSection>

          </div>

          {/* Right: Application Form */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32">
              <AnimatedSection direction={isRTL ? "right" : "left"} delay={0.3} className="bg-surface p-8 md:p-10 border border-line rounded-sm shadow-xl shadow-forest/5">
                <h3 className={clsx("font-serif font-bold text-2xl text-foreground mb-6", isRTL && "text-start font-arabic")}>{t.careers.form.title}</h3>

                {submitted ? (
                  <div className="bg-surface-2 p-8 text-center rounded-sm border border-line mt-4">
                    <CheckCircle2 className="w-12 h-12 text-accent mx-auto mb-4" />
                    <h4 className={clsx("text-accent font-serif font-bold text-xl mb-3", isRTL && "font-arabic")}>{t.careers.form.successTitle}</h4>
                    <p className="text-muted font-normal text-sm">
                      {t.careers.form.successDesc}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className={clsx("text-xs font-bold uppercase tracking-widest text-muted block", isRTL && "text-start")}>
                        {t.careers.form.fullName}
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        className={clsx("w-full bg-surface-2 border border-line px-4 py-3 rounded-sm focus:outline-none focus:border-accent transition-colors text-foreground font-normal placeholder:text-muted", isRTL && "text-end")}
                        placeholder={t.careers.form.placeholderName}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className={clsx("text-xs font-bold uppercase tracking-widest text-muted block", isRTL && "text-start")}>
                        {t.careers.form.email}
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        className={clsx("w-full bg-surface-2 border border-line px-4 py-3 rounded-sm focus:outline-none focus:border-accent transition-colors text-foreground font-normal placeholder:text-muted", isRTL && "text-end")}
                        placeholder={t.careers.form.placeholderEmail}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="position" className={clsx("text-xs font-bold uppercase tracking-widest text-muted block", isRTL && "text-start")}>
                        {t.careers.form.position}
                      </label>
                      <select
                        id="position"
                        required
                        className={clsx("w-full bg-surface-2 border border-line px-4 py-3 rounded-sm focus:outline-none focus:border-accent transition-colors text-foreground font-normal appearance-none", isRTL && "text-start pr-10")}
                      >
                        <option value="icc_lawyer">{t.careers.openings.iccLawyer}</option>
                        <option value="general">{t.careers.form.generalApp}</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="cv" className={clsx("text-xs font-bold uppercase tracking-widest text-muted block flex items-center gap-2", isRTL && "flex-row-reverse")}>
                        {t.careers.form.uploadCv} <span className="text-[10px] lowercase font-normal">{t.careers.form.pdfOnly}</span>
                      </label>
                      <div className="relative group">
                        <input
                          type="file"
                          id="cv"
                          accept=".pdf"
                          required
                          onChange={handleFileChange}
                          className={clsx("w-full text-muted bg-surface-2 border border-line px-4 py-3 rounded-sm focus:outline-none focus:border-accent transition-colors text-sm file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-accent/10 file:text-accent hover:file:bg-accent/20", isRTL ? "file:ml-4" : "file:mr-4")}
                        />
                      </div>
                      {fileError && <p className={clsx("text-red-500 text-xs font-medium mt-1", isRTL && "text-start")}>{fileError}</p>}
                    </div>

                    <div className={clsx("pt-2 flex", isRTL && "justify-end")}>
                      <Turnstile
                        siteKey="1x00000000000000000000AA"
                        onSuccess={(token) => setToken(token)}
                        options={{ size: "normal", theme: "light" }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !token || !!fileError}
                      className="w-full bg-accent hover:bg-accent/90 disabled:bg-accent/50 text-background font-medium uppercase tracking-widest text-sm py-4 rounded-sm transition-colors mt-6 flex justify-center items-center"
                    >
                      {isSubmitting ? t.careers.form.submitting : t.careers.form.submit}
                    </button>
                  </form>
                )}
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
