import type {Metadata} from "next";
import Script from "next/script";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./calendar-styles.css";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {ThemeModeScript} from "flowbite-react";
import UserProvider from "@/context/UserContext";
import {defaultOpenGraphImage, siteConfig} from "@/lib/site";

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    applicationName: siteConfig.name,
    authors: [{name: siteConfig.name}],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        locale: siteConfig.locale,
        url: siteConfig.url,
        siteName: siteConfig.name,
        title: siteConfig.name,
        description: siteConfig.description,
        images: [defaultOpenGraphImage],
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.name,
        description: siteConfig.description,
        images: [defaultOpenGraphImage.url],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <head>
            <ThemeModeScript/>
            <Script
                id="google-analytics-src"
                strategy="afterInteractive"
                src="https://www.googletagmanager.com/gtag/js?id=G-P0S1W0KSQM"
            />
            <Script
                id="google-analytics-inline"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-P0S1W0KSQM');`,
                }}
            />
            <Script
                id="local-business-jsonld"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "MedicalClinic",
                        name: siteConfig.name,
                        url: siteConfig.url,
                        telephone: siteConfig.telephone,
                        email: siteConfig.email,
                        address: {
                            "@type": "PostalAddress",
                            streetAddress: siteConfig.address,
                            addressCountry: "LK",
                        },
                        areaServed: ["Kundasale", "Kandy", "Sri Lanka"],
                        image: `${siteConfig.url}${defaultOpenGraphImage.url}`,
                    }),
                }}
            />
        </head>
        <body
            className="site-shell antialiased text-gray-800"
        >

        <UserProvider>
            <Header/>
            {children}
            <Footer/>
        </UserProvider>

        </body>
        </html>
    );
}
