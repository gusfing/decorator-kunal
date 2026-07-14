import "./globals.css";
import "./redesign.css";
import "./webflow.css";
import type { Metadata } from "next";
import GSAPRouteCleaner from "@/components/GSAPRouteCleaner";
import ClientProviders from "@/components/ClientProviders";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

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
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body>
        <GSAPRouteCleaner />
        <ClientProviders>
          {children}
        </ClientProviders>
        <Footer />
        <Chatbot />

      </body>
    </html>
  );
}
