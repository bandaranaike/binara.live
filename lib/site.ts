import type {Metadata} from "next";

export const siteConfig = {
    name: "Binara Medical Centre",
    shortName: "Binara",
    description:
        "Binara Medical Centre in Kundasale, Kandy offers specialist channeling, OPD services, dental care, and online doctor availability booking.",
    url: normalizeSiteUrl(process.env.NEXT_PUBLIC_WEBSITE_URL?.trim() || "https://binara.live"),
    locale: "en_LK",
    keywords: [
        "Binara Medical Centre",
        "Kundasale doctor",
        "Kandy medical centre",
        "specialist channeling",
        "OPD services",
        "dental care",
        "doctor booking",
        "medical clinic Sri Lanka",
    ],
    telephone: process.env.NEXT_PUBLIC_APP_TELEPHONE || "081 242 4499",
    email: "info@binara.live",
    address: process.env.NEXT_PUBLIC_APP_ADDRESS || "No82. New Town, Kundasale",
};

function normalizeSiteUrl(value: string): string {
    if (!value) {
        return "https://binara.live";
    }

    if (/^https?:\/\//i.test(value)) {
        return value.replace(/\/+$/, "");
    }

    return `https://${value.replace(/\/+$/, "")}`;
}

export const defaultOpenGraphImage = {
    url: "/original-logo.png",
    width: 683,
    height: 251,
    alt: `${siteConfig.name} logo`,
};

export function createPageMetadata({
    title,
    description,
    path,
    noindex = false,
    keywords = siteConfig.keywords,
}: {
    title: string;
    description: string;
    path?: string;
    noindex?: boolean;
    keywords?: string[];
}): Metadata {
    const canonicalUrl = path ? new URL(path, siteConfig.url).toString() : undefined;

    return {
        title,
        description,
        keywords,
        alternates: canonicalUrl ? {canonical: canonicalUrl} : undefined,
        openGraph: {
            type: "website",
            locale: siteConfig.locale,
            url: canonicalUrl,
            siteName: siteConfig.name,
            title,
            description,
            images: [defaultOpenGraphImage],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [defaultOpenGraphImage.url],
        },
        robots: {
            index: !noindex,
            follow: !noindex,
            googleBot: {
                index: !noindex,
                follow: !noindex,
                "max-image-preview": "large",
                "max-snippet": -1,
                "max-video-preview": -1,
            },
        },
    };
}
