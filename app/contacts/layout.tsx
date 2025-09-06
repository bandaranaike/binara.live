import React from "react";

export const metadata = {
    title: "Contact us - " + process.env.NEXT_PUBLIC_APP_TITLE,
    description: "At Binara Medical Centre, we are dedicated to providing high-quality medical care tailored to your needs",
};

export default function ContactUsLayout({children}: { children: React.ReactNode }) {
    return <>{children}</>;
}
