import type { Metadata } from "next";
import { Fraunces, Inter, Cairo, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { LanguageProvider } from "@/components/LanguageContext";
import { ThemeProvider } from "@/components/ThemeContext";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Two in One LLC",
  description:
    "Agricultural wholesale, industrial construction, machinery, food wholesale, professional uniforms, and services - sourced, surveyed, and delivered with sovereign-grade precision.",
};

// Applies the saved theme before first paint to avoid a flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('preferred-theme');var d=document.documentElement;if(t==='light'){d.classList.remove('dark');d.classList.add('light');d.style.colorScheme='light';}else{d.classList.add('dark');d.style.colorScheme='dark';}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth overflow-x-clip" suppressHydrationWarning>
      <body className={`${inter.variable} ${fraunces.variable} ${cairo.variable} ${geistMono.variable} antialiased bg-background text-foreground selection:bg-accent/30 selection:text-foreground flex flex-col min-h-screen font-sans overflow-x-clip relative`}>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            <main className="flex-1 w-full">
              {children}
            </main>
            <Footer />
            <ScrollToTop />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
