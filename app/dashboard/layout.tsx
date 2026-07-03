import React from "react";
import {createPageMetadata, siteConfig} from "@/lib/site";

export const metadata = createPageMetadata({
    title: `Dashboard | ${siteConfig.name}`,
    description: "Patient dashboard for managing appointments, profiles, and account settings.",
    path: "/dashboard",
    noindex: true,
});

export default function ContactUsLayout({children}: { children: React.ReactNode }) {
    return <>{children}</>;
}
