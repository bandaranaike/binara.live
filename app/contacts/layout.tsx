import React from "react";

export const metadata = {
    title: "Contact us - " + process.env.NEXT_PUBLIC_APP_TITLE,
};

export default function ContactUsLayout({children}: { children: React.ReactNode }) {
    return <>{children}</>;
}
