import type {MetadataRoute} from "next";
import {siteConfig} from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: ["/"],
            disallow: ["/dashboard/", "/login", "/register", "/forget-password", "/password-reset/"],
        },
        sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
    };
}
