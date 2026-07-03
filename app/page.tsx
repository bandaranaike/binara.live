import type {Metadata} from "next";
import HomePage from "@/components/home/HomePage";
import {createPageMetadata, siteConfig} from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
    title: siteConfig.name,
    description: siteConfig.description,
    path: "/",
});

export default function Page() {
    return <HomePage/>;
}
