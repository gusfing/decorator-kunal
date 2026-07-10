import "./globals.css";
import "./redesign.css";
import "./webflow.css";
import type { Metadata } from "next";
import GSAPRouteCleaner from "@/components/GSAPRouteCleaner";
import ClientProviders from "@/components/ClientProviders";
import Script from "next/script";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Decor Lab | Architecture & Interior Design Studio",
  description: "Decor Lab is a premier architecture and interior design studio with over 32 years of expertise. Blending heritage with cutting-edge fluid design across India.",
  keywords: "Decor Lab, Decorlab, Raja Sinha, Rajdip Sinha, Interior Design, Architecture Kolkata, Luxury Residential Design, Commercial Design, India Architects",
  authors: [{ name: "Decor Lab" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/assets/Decorlab-favicon.png"
        />
      </head>
      <body>
        <GSAPRouteCleaner />
        <ClientProviders>
          {children}
        </ClientProviders>
        <Footer />
        <Script 
          src="https://chatbox.growbro.ai/assets/chatbox-widget-bundle.js" 
          data-ai-id="2d04f8f7-b7c7-49e5-8d48-3a58b019a863" 
          strategy="afterInteractive" 
        />
      </body>
    </html>
  );
}
