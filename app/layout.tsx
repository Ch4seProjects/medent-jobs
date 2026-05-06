import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://medent-jobs.vercel.app",
  ),
  title: {
    default: "Medent Jobs | Medical Careers in New Zealand",
    template: "%s | Medent Jobs",
  },
  description:
    "Browse specialist medical job opportunities across New Zealand. Find roles in paediatrics, emergency medicine, general practice, anaesthesia, psychiatry, and more.",
  keywords: [
    "medical jobs New Zealand",
    "doctor jobs NZ",
    "specialist physician careers",
    "healthcare jobs Auckland",
    "healthcare jobs Wellington",
    "GP jobs NZ",
    "consultant jobs New Zealand",
  ],
  authors: [{ name: "Medenterprises" }],
  creator: "Medenterprises",
  openGraph: {
    type: "website",
    locale: "en_NZ",
    siteName: "Medent Jobs",
    title: "Medent Jobs | Medical Careers in New Zealand",
    description:
      "Browse specialist medical job opportunities across New Zealand. Find roles in paediatrics, emergency medicine, general practice, anaesthesia, psychiatry, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Medent Jobs | Medical Careers in New Zealand",
    description:
      "Browse specialist medical job opportunities across New Zealand. Find roles in paediatrics, emergency medicine, general practice, anaesthesia, psychiatry, and more.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION_ID,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Medenterprises",
                url:
                  process.env.NEXT_PUBLIC_SITE_URL ??
                  "https://medent-jobs.vercel.app",
                description:
                  "Medenterprises connects specialist medical professionals with leading healthcare employers across New Zealand.",
                areaServed: {
                  "@type": "Country",
                  name: "New Zealand",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Medent Jobs",
                url:
                  process.env.NEXT_PUBLIC_SITE_URL ??
                  "https://medent-jobs.vercel.app",
                description:
                  "Browse specialist medical job opportunities across New Zealand.",
                potentialAction: {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://medent-jobs.vercel.app"}/?department={department}&type={type}`,
                  },
                  "query-input": "required name=department",
                },
              },
            ]),
          }}
        />
        {children}
      </body>
    </html>
  );
}
