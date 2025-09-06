import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {ThemeModeScript} from "flowbite-react";
import UserProvider from "@/context/UserContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: process.env.NEXT_PUBLIC_APP_TITLE,
    description: "At Binara Medical Centre, we are dedicated to providing high-quality medical care tailored to your needs",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <head>
            <ThemeModeScript/>
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white pt-24 text-gray-800`}
        >

        <UserProvider>
            <Header/>
            {children}
            <Footer/>
        </UserProvider>

        </body>
        </html>
    );
}
