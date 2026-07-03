import React from "react";
import {createPageMetadata, siteConfig} from "@/lib/site";

export const metadata = createPageMetadata({
    title: `Contact us | ${siteConfig.name}`,
    description: "Contact Binara Medical Centre in Kundasale, Kandy for appointments, doctor availability, and patient support.",
    path: "/contacts",
});

export default function ContactUsLayout({children}: { children: React.ReactNode }) {
    return <>{children}</>;
}
