import type {MetadataRoute} from "next";
import {siteConfig} from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        {url: "/", priority: 1, changeFrequency: "weekly" as const},
        {url: "/about", priority: 0.8, changeFrequency: "monthly" as const},
        {url: "/contacts", priority: 0.8, changeFrequency: "monthly" as const},
        {url: "/availability-calendar", priority: 0.9, changeFrequency: "daily" as const},
        {url: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const},
        {url: "/cookie-policy", priority: 0.3, changeFrequency: "yearly" as const},
        {url: "/term-of-use", priority: 0.3, changeFrequency: "yearly" as const},
    ];

    return routes.map((route) => ({
        url: new URL(route.url, siteConfig.url).toString(),
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }));
}
