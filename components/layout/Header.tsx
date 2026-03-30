"use client"
import React, {useState} from "react";
import '@/app/globals.css'
import Image from "next/image";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import {Dialog, DialogPanel} from "@headlessui/react";

const Header: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const navigation = [
        {name: 'About us', href: 'about'},
        {name: 'Contact', href: 'contacts'},
        {name: 'Doctors availability', href: 'availability-calendar'},
    ]

    return (
        <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 lg:px-6">
            <nav aria-label="Global" className="mx-auto max-w-7xl rounded-xl border border-purple-100/70 bg-white/90 p-3 shadow-[0_16px_36px_-30px_rgba(91,33,182,0.24)] backdrop-blur-md lg:px-6">
                <div className="flex items-center justify-between">
                    <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">{process.env.NEXT_PUBLIC_APP_TITLE}</span>
                            <Image
                                alt=""
                                src="/original-logo.png"
                                className="w-auto h-16"
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
                    <div className="hidden lg:flex lg:items-center lg:gap-x-2 text-sm font-semibold text-gray-600">
                        {navigation.map((item) => (
                            <Link key={item.name} href={item.href} className="rounded-md px-4 py-2 transition hover:bg-purple-50 hover:text-purple-700">
                                {item.name}
                            </Link>
                        ))}
                        <Link href="/login" className="theme-button ml-3 px-4 py-2">
                            Patient login
                        </Link>
                    </div>
                </div>
            </nav>
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
                                <Link href="/login" className="theme-button mt-4 w-full">
                                    Patient login
                                </Link>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}

export default Header;
