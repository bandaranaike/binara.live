"use client"
import React from "react";
import Image from "next/image";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100 lg:pt-16 lg:pb-8 border-t ">
            <div className="max-w-7xl mx-auto flex flex-wrap justify-between p-4 lg:p-0">
                <div className="p-4 lg:p-0">
                    <h3 className="text-2xl font-semibold mb-2">Contact Us</h3>
                    <p className="font-semibold mb-1">{process.env.NEXT_PUBLIC_APP_ADDRESS}</p>
                    <p>Phone: <span> {process.env.NEXT_PUBLIC_APP_TELEPHONE} </span></p>
                    <p>Fax: {process.env.NEXT_PUBLIC_APP_FAX} </p>
                    <p>Email: {process.env.NEXT_PUBLIC_APP_EMAIL}</p>
                </div>
                <div className="p-4 lg:p-0">

                </div>
                <div className="p-4 lg:p-0">
                    <h3 className="text-2xl font-semibold mb-2">About</h3>
                    <p>
                    <a href="/about">About Us</a> | <a href="/contacts">Contact Us</a>
                    </p>
                </div>
            </div>
            <div className="text-center mt-12">
                <Image
                    alt=""
                    src="/original-logo.png"
                    className="w-auto mx-auto h-24"
                    width={683}
                    height={251}
                />
            </div>
            <div className="text-center text-gray-500 text-sm p-6">
                <p>
                    &copy; 2025 Binara.live. All rights reserved.
                    <a href="https://erbitron.com/" target="_blank"> Built by Erbitron </a>
                    | <a href="/term-of-use">Terms of Service </a>
                    | <a href="/privacy-policy">Privacy Policy </a>
                    | <a href="/cookie-policy">Cookie Policy </a>
                </p>
            </div>
        </footer>
    )
}

export default Footer;