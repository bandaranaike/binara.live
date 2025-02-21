"use client"
import React from "react";
import Image from "next/image";
import {useUserContext} from "@/context/UserContext";

const Footer: React.FC = () => {
    const {user} = useUserContext()
    return (
        <footer className="bg-gray-100 lg:pt-16 lg:pb-8 border-t ">
            <div className="max-w-7xl mx-auto flex flex-wrap justify-between p-4 lg:p-0">
                <div className="p-4 lg:p-0">
                    <h3 className="text-2xl font-semibold mb-2">Contact Us</h3>
                    <p>Binara Medical Centre, No82. New Town, Kundasale</p>
                    <p>Phone: +94 817 213 239 / +94 812 421 942</p>
                    <p>Fax: +94 812 421 942 </p>
                    <p>Email: info@binara.live / binara82@gmail.com</p>
                </div>
                <div className="p-4 lg:p-0">
                    <h3 className="text-2xl font-semibold mb-2">Follow Us</h3>
                    <p>Facebook | Instagram | Twitter</p>
                </div>
                <div className="p-4 lg:p-0">
                    <h3 className="text-2xl font-semibold mb-2">Quick Links</h3>
                    <p>
                        {!user?.token &&
                            (<><a href="/login">Login </a> | <a href="/register"> Register </a> |</>) ||
                            (<><a href="/dashboard">Dashboard</a> |</>)} <a href="/about">About Us</a>
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