"use client"
import React, {useEffect, useState} from "react";
import '@/app/globals.css'
import Image from "next/image";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import {Dialog, DialogPanel} from "@headlessui/react";

const Header: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isPinned, setIsPinned] = useState(false)

    const navigation = [
        {name: 'About us', href: 'about'},
        {name: 'Contact', href: 'contacts'},
        {name: 'Doctors availability', href: 'availability-calendar'},
    ]

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const isScrollable = document.documentElement.scrollHeight > window.innerHeight + 24;
            const scrollingUp = currentScrollY < lastScrollY;
            const pastTopThreshold = currentScrollY > 96;

            setIsPinned(isScrollable && pastTopThreshold && scrollingUp);
            lastScrollY = currentScrollY;
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, {passive: true});

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`relative z-40 h-[6.75rem] px-3 pt-3 lg:h-28 lg:px-6 ${isPinned ? "z-50" : ""}`}>
            <div className={`${isPinned ? "fixed inset-x-0 top-0 z-50 px-3 pt-3 lg:px-6" : "absolute inset-x-0 top-0"}`}>
                <nav
                    aria-label="Global"
                    className={`mx-auto max-w-7xl rounded-xl border border-purple-100/70 p-3 backdrop-blur-md transition-all duration-300 lg:px-6 ${
                        isPinned
                            ? "bg-white/95 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.32)]"
                            : "bg-white/88 shadow-[0_16px_36px_-30px_rgba(91,33,182,0.24)]"
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex lg:flex-1">
                            <Link href="/" className="-m-1.5 p-1.5">
                                <span className="sr-only">{process.env.NEXT_PUBLIC_APP_TITLE}</span>
                                <Image
                                    alt=""
                                    src="/original-logo.png"
                                    className="h-16 w-auto"
                                    width={683}
                                    height={251}
                                />
                            </Link>
                        </div>
                        <div className="flex lg:hidden">
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(true)}
                                className="-m-2.5 inline-flex items-center justify-center rounded-lg border border-purple-100 bg-white p-2.5 text-gray-700"
                            >
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="size-6"/>
                            </button>
                        </div>
                        <div className="hidden text-sm font-semibold text-gray-600 lg:flex lg:items-center lg:gap-x-2">
                            {navigation.map((item) => (
                                <Link key={item.name} href={item.href} className="rounded-md px-4 py-2 transition hover:bg-purple-50 hover:text-purple-700">
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </nav>
            </div>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50"/>
                <DialogPanel
                    className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white/95 px-6 py-6 backdrop-blur-md sm:max-w-sm sm:ring-1 sm:ring-purple-100">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">{process.env.NEXT_PUBLIC_APP_TITLE}</span>
                            <Image
                                alt={process.env.NEXT_PUBLIC_APP_TITLE ?? ''}
                                src="/logo.png"
                                className="w-auto h-12"
                                width={657}
                                height={179}
                            />
                        </Link>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-lg border border-purple-100 p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6"/>
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-purple-100">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-4 py-3 text-base font-semibold text-gray-900 hover:bg-purple-50"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}

export default Header;
