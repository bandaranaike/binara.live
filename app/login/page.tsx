import React from "react";
import {notFound} from "next/navigation";
import {createPageMetadata, siteConfig} from "@/lib/site";

export const metadata = createPageMetadata({
    title: `Login | ${siteConfig.name}`,
    description: "Login to your patient account to manage appointments and profile details.",
    path: "/login",
    noindex: true,
});

const LoginPage: React.FC = () => {
    notFound()
}

export default LoginPage;
