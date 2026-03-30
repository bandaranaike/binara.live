"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
    return (
        <footer className="px-4 pb-6 pt-16 lg:px-0 lg:pb-10">
            <div className="page-wrap">
                <div className="hero-panel">
                    <div className="relative z-10 grid gap-8 lg:grid-cols-[1.3fr_0.9fr_0.8fr] lg:items-start">
                        <div>
                            <div className="section-kicker">Binara Medical Centre</div>
                            <h3 className="mt-4 text-3xl font-black text-slate-900">Care that stays close to home.</h3>
                            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
                                We provide trusted medical, dental, and specialist care with a patient-first booking experience.
                            </p>
                        </div>
                        <div className="content-panel p-5 lg:p-6">
                            <h4 className="text-lg font-bold text-slate-900">Contact</h4>
                            <p className="mt-3 text-sm font-semibold text-slate-700">{process.env.NEXT_PUBLIC_APP_ADDRESS}</p>
                            <p className="mt-2 text-sm text-slate-600">Phone: {process.env.NEXT_PUBLIC_APP_TELEPHONE}</p>
                            <p className="text-sm text-slate-600">Fax: {process.env.NEXT_PUBLIC_APP_FAX}</p>
                            <p className="text-sm text-slate-600">Email: {process.env.NEXT_PUBLIC_APP_EMAIL}</p>
                        </div>
                        <div className="content-panel p-5 lg:p-6">
                            <h4 className="text-lg font-bold text-slate-900">Explore</h4>
                            <div className="mt-3 flex flex-col gap-2 text-sm font-semibold text-slate-600">
                                <Link href="/about" className="hover:text-purple-600">About us</Link>
                                <Link href="/contacts" className="hover:text-purple-600">Contact us</Link>
                                <Link href="/availability-calendar" className="hover:text-purple-600">Doctors availability</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex flex-col items-center gap-5 text-center">
                    <Image
                        alt=""
                        src="/original-logo.png"
                        className="h-20 w-auto"
                        width={683}
                        height={251}
                    />
                    <p className="text-sm text-slate-500">
                        &copy; 2025 Binara.live. All rights reserved.
                        <a href="https://erbitron.com/" target="_blank" className="ml-1 hover:text-purple-600">Built by Erbitron</a>
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-slate-500">
                        <Link href="/term-of-use" className="hover:text-purple-600">Terms of Service</Link>
                        <Link href="/privacy-policy" className="hover:text-purple-600">Privacy Policy</Link>
                        <Link href="/cookie-policy" className="hover:text-purple-600">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
