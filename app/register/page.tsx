import React from "react";
import {notFound} from "next/navigation";
import {createPageMetadata, siteConfig} from "@/lib/site";

export const metadata = createPageMetadata({
    title: `Register | ${siteConfig.name}`,
    description: "Create a patient account to book appointments and manage your details securely.",
    path: "/register",
    noindex: true,
});
const RegisterPage: React.FC = () => {
    notFound()
}

export default RegisterPage;
