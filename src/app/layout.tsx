import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/ui/FloatingButtons";
import { Toaster } from "@/components/ui/sonner";
import PageTransition from "@/components/animations/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Surana Stonex - Premium Marbles & Natural Stones | Italian, Blue, Pink Marble",
    template: "%s | Surana Stonex Premium Marbles"
  },
  description: "Leading supplier of premium Italian marble, blue marble, pink marble, and rare onyx. Expert marble installation, custom fabrication, and maintenance services in Rajasthan, India. Contact +91 9829051903.",
  keywords: [
    "premium marble",
    "Italian marble",
    "blue marble",
    "pink marble",
    "rare onyx",
    "marble supplier",
    "marble installation",
    "custom marble fabrication",
    "marble maintenance",
    "Rajasthan marble",
    "Kishangarh marble",
    "Carrara marble",
    "Calacatta marble",
    "Bahia blue marble",
    "Estremoz pink marble",
    "Patagonia onyx",
    "marble countertops",
    "marble flooring",
    "luxury marble",
    "natural stone"
  ],
  authors: [{ name: "Surana Stonex" }],
  creator: "Surana Stonex",
  publisher: "Surana Stonex",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.suranastonex.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.suranastonex.com',
    siteName: 'Surana Stonex Premium Marbles',
    title: 'Surana Stonex - Premium Marbles & Natural Stones',
    description: 'Leading supplier of premium Italian marble, blue marble, pink marble, and rare onyx. Expert marble installation, custom fabrication, and maintenance services in Rajasthan, India.',
    images: [
      {
        url: '/logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'Surana Stonex Premium Marbles Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Surana Stonex - Premium Marbles & Natural Stones',
    description: 'Leading supplier of premium Italian marble, blue marble, pink marble, and rare onyx. Expert marble installation and custom fabrication services.',
    images: ['/logo.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual Google Search Console verification code
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.suranastonex.com/#organization",
        "name": "Surana Stonex",
        "alternateName": "Surana Stonex Premium Marbles",
        "url": "https://www.suranastonex.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.suranastonex.com/logo.jpeg",
          "width": 300,
          "height": 300
        },
        "description": "Leading supplier of premium Italian marble, blue marble, pink marble, and rare onyx. Expert marble installation, custom fabrication, and maintenance services in Rajasthan, India.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Surana Stonex Marble Works",
          "addressLocality": "Kishangarh",
          "addressRegion": "Rajasthan",
          "postalCode": "305801",
          "addressCountry": "IN"
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+91-9829051903",
            "contactType": "customer service",
            "areaServed": "IN",
            "availableLanguage": ["English", "Hindi"]
          },
          {
            "@type": "ContactPoint",
            "telephone": "+91-9887971903",
            "contactType": "customer service",
            "areaServed": "IN",
            "availableLanguage": ["English", "Hindi"]
          }
        ],
        "email": "suranastonexindia@gmail.com",
        "openingHours": [
          "Mo-Sa 10:30-18:30"
        ],
        "sameAs": [
          "https://www.instagram.com/suranastonex",
          "https://www.facebook.com/suranastonex",
          "https://www.linkedin.com/company/suranastonex",
          "https://www.youtube.com/@suranastonex"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.suranastonex.com/#website",
        "url": "https://www.suranastonex.com",
        "name": "Surana Stonex Premium Marbles",
        "description": "Premium marble supplier offering Italian marble, blue marble, pink marble, and rare onyx with expert installation and fabrication services.",
        "publisher": {
          "@id": "https://www.suranastonex.com/#organization"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://www.suranastonex.com/marbles?search={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.suranastonex.com/#localbusiness",
        "name": "Surana Stonex Marble Works",
        "image": "https://www.suranastonex.com/logo.jpeg",
        "description": "Premium marble supplier and installation service provider specializing in Italian marble, blue marble, pink marble, and rare onyx.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Surana Stonex Marble Works",
          "addressLocality": "Kishangarh",
          "addressRegion": "Rajasthan",
          "postalCode": "305801",
          "addressCountry": "IN"
        },
        "telephone": "+91-9829051903",
        "email": "suranastonexindia@gmail.com",
        "url": "https://www.suranastonex.com",
        "openingHours": [
          "Mo-Sa 10:30-18:30"
        ],
        "priceRange": "$$",
        "currenciesAccepted": "INR",
        "paymentAccepted": "Cash, Credit Card, Bank Transfer",
        "areaServed": {
          "@type": "Country",
          "name": "India"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Premium Marble Collection",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Italian Marble",
                "description": "Premium Italian marble including Carrara, Calacatta, and Statuario varieties"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Blue Marble",
                "description": "Exclusive blue marble from Bahia, Brazil with unique ocean-like patterns"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Pink Marble",
                "description": "Elegant pink marble from Estremoz, Portugal with romantic rose hues"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Rare Onyx",
                "description": "Mystical onyx from Patagonia, Chile with translucent crystal formations"
              }
            }
          ]
        }
      }
    ]
  };

  return (
    <html lang="en" className="light">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased custom-scrollbar`}
      >
        <Navbar />
        <main className="pt-[100px] sm:pt-[108px] lg:pt-[116px]">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
        <FloatingButtons />
        <Toaster theme="dark" />
      </body>
    </html>
  );
}
