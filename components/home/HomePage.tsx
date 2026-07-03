"use client";

import React, {useCallback, useEffect, useState} from 'react';
import {
    CalendarDaysIcon,
    ClockIcon,
    MapPinIcon,
    PhoneIcon,
    ShieldCheckIcon,
    SparklesIcon,
} from "@heroicons/react/24/outline";
import DoctorBooking from "@/components/DoctorBooking";
import axios from "@/lib/axios";
import Link from "next/link";
import {DoctorBookingData} from "@/types/interfaces";
import Loader from "@/components/form/Loader";

interface TodayDoctors {
    id: string;
    doctor: string;
    doctor_id: number;
    doctor_type: string;
    specialty: string;
    time: string;
    seats: string;
    available_seats: string;
}

interface TodayHolidayStatus {
    date: string;
    is_closed: boolean;
    holiday_name: string | null;
    message: string | null;
}

export default function HomePage() {
    const [isBookingWindowOpen, setIsBookingWindowOpen] = useState<boolean>(false)
    const [todayDoctorsList, setTodayDoctorsList] = useState<TodayDoctors[]>([])
    const [todayDoctorsListError, setTodayDoctorsListError] = useState("")
    const [channelingDoctor, setChannelingDoctor] = useState<DoctorBookingData>()
    const [loadingTodayList, setLoadingTodayList] = useState<boolean>(true)
    const [todayHolidayStatus, setTodayHolidayStatus] = useState<TodayHolidayStatus | null>(null)

    const services = [
        {
            image: "👨‍⚕️", title: "Specialist Channeling", description: "Consult with experienced specialists in various fields. Book your appointment today.",
            cssClass: "bg-gradient-to-r from-rose-100 to-teal-100"
        },
        {
            image: "🏥",
            title: "OPD Services",
            description: "Outpatient services for all your general healthcare needs. Walk in or book online.",
            cssClass: "bg-gradient-to-tr from-violet-100 to-orange-100"
        },
        {
            image: "🦷",
            title: "Dental Care",
            description: "Comprehensive dental services for a healthy smile. From cleanings to advanced treatments.",
            cssClass: "bg-gradient-to-r from-blue-100 to-cyan-100"
        },
    ];

    const trustSignals = [
        {label: "Serving since", value: "2008"},
        {label: "Care areas", value: "OPD, dental, specialist"},
        {label: "Location", value: "Kundasale, Kandy"},
    ];

    useEffect(() => {
        setLoadingTodayList(true)
        fetchHomePageData()
    }, []);

    const fetchHomePageData = useCallback(() => {
        Promise.all([
            axios.get(`/holidays/today-status`),
            axios.get(`/doctor-availabilities/get-today-doctors`),
        ]).then(([holidayResponse, doctorsResponse]) => {
            setTodayHolidayStatus(holidayResponse.data);
            setTodayDoctorsList(doctorsResponse.data);
            setTodayDoctorsListError("");
        }).catch(error => {
            setTodayDoctorsListError('Error loading homepage data. Please try again later.');
            setTodayHolidayStatus(null);
            setTodayDoctorsList([]);
            console.error(error);
        }).finally(() => setLoadingTodayList(false));
    }, []);

    const closureMessage = todayHolidayStatus?.message
        || "Our medical centre is closed today. Please check back tomorrow or review the availability calendar for upcoming sessions.";


    const showBookingWindow = (id: number = 0, type: string = "", name: string = "") => {
        return null;
        setChannelingDoctor({id, type, name})
        setIsBookingWindowOpen(true)
    };
    return (
        <div className="page-stack">
            <section className="px-4 pt-2 lg:px-0">
                <div className="max-w-7xl mx-auto">
                    <div className="relative overflow-hidden rounded-3xl border border-teal-100 bg-[linear-gradient(135deg,#f8fbff_0%,#fff7f2_48%,#edfdf8_100%)] shadow-[0_34px_90px_-54px_rgba(15,23,42,0.42)] dark:border-slate-700 dark:bg-[linear-gradient(135deg,#06151d_0%,#102033_52%,#182018_100%)]">
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-400 via-rose-400 to-amber-300"/>
                        <div className="absolute inset-0 opacity-[0.28] dark:opacity-[0.16]" style={{
                            backgroundImage: "linear-gradient(rgba(15,23,42,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.08) 1px, transparent 1px)",
                            backgroundSize: "42px 42px",
                        }}/>
                        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[linear-gradient(120deg,transparent_0%,rgba(20,184,166,0.12)_42%,rgba(251,113,133,0.16)_100%)] lg:block dark:bg-[linear-gradient(120deg,transparent_0%,rgba(20,184,166,0.16)_42%,rgba(251,113,133,0.10)_100%)]"/>
                        <div className="relative z-10 grid gap-8 px-5 py-8 sm:px-8 lg:px-10 lg:py-10 xl:grid-cols-[minmax(0,1fr)_380px] xl:items-end xl:px-12 xl:py-12">
                            <div className="flex max-w-4xl flex-col justify-end xl:min-h-[430px]">
                                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase text-teal-700 shadow-sm backdrop-blur-md dark:border-teal-400/25 dark:bg-white/[0.08] dark:text-teal-100">
                                    <ShieldCheckIcon className="h-4 w-4"/>
                                    Binara Medical Centre
                                </div>
                                <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.04] text-slate-950 sm:text-5xl xl:text-6xl dark:text-white">
                                    Medical, dental, and specialist care close to home.
                                </h1>
                                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 lg:text-lg dark:text-slate-200">
                                    Check doctor availability, plan your visit, and connect with a trusted Kundasale care team serving families across Kandy since 2008.
                                </p>
                                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                                    <Link href="availability-calendar" className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-[0_18px_45px_-28px_rgba(15,23,42,0.65)] transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-teal-50">
                                        <CalendarDaysIcon className="h-5 w-5"/>
                                        View doctor availability
                                    </Link>
                                    <Link href="contacts" className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white/70 px-5 py-3 text-sm font-bold text-slate-900 backdrop-blur-md transition hover:bg-white dark:border-white/20 dark:bg-white/[0.08] dark:text-white dark:hover:bg-white/[0.14]">
                                        <PhoneIcon className="h-5 w-5"/>
                                        Contact the centre
                                    </Link>
                                </div>
                                <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
                                    {trustSignals.map((signal) => (
                                        <div key={signal.label} className="rounded-xl border border-white/70 bg-white/[0.66] px-4 py-3 shadow-sm backdrop-blur-md dark:border-white/[0.12] dark:bg-white/[0.08]">
                                            <div className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">{signal.label}</div>
                                            <div className="mt-1 text-sm font-bold text-slate-950 dark:text-white">{signal.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <aside className="w-full self-end rounded-2xl border border-white/80 bg-white/[0.92] p-5 shadow-[0_24px_70px_-42px_rgba(15,23,42,0.45)] backdrop-blur-xl xl:max-w-[380px] dark:border-white/[0.12] dark:bg-slate-950/[0.78]">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase text-emerald-700 dark:bg-emerald-400/12 dark:text-emerald-200">
                                            <SparklesIcon className="h-4 w-4"/>
                                            Today
                                        </div>
                                        <h2 className="mt-4 text-2xl font-black text-slate-950 dark:text-white">
                                            {todayHolidayStatus?.is_closed ? "Centre closed today" : "Plan today's visit"}
                                        </h2>
                                    </div>
                                    <div className="rounded-full bg-slate-950 p-3 text-white dark:bg-white dark:text-slate-950">
                                        <ClockIcon className="h-6 w-6"/>
                                    </div>
                                </div>
                                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                    {todayHolidayStatus?.is_closed
                                        ? closureMessage
                                        : "Review today's available doctors or open the full calendar for the next month."}
                                </p>
                                <div className="mt-5 grid grid-cols-2 gap-3">
                                    <div className="rounded-xl bg-slate-50 p-4 dark:bg-white/[0.08]">
                                        <div className="text-2xl font-black text-slate-950 dark:text-white">
                                            {loadingTodayList ? "--" : todayDoctorsList.length}
                                        </div>
                                        <div className="mt-1 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Doctors today</div>
                                    </div>
                                    <div className="rounded-xl bg-rose-50 p-4 dark:bg-rose-400/12">
                                        <div className="text-2xl font-black text-rose-700 dark:text-rose-200">
                                            {todayHolidayStatus?.is_closed ? "Closed" : "Open"}
                                        </div>
                                        <div className="mt-1 text-xs font-semibold uppercase text-rose-500 dark:text-rose-300">Centre status</div>
                                    </div>
                                </div>
                                <div className="mt-5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 dark:border-white/[0.12] dark:bg-white/[0.08] dark:text-slate-200">
                                    <MapPinIcon className="h-5 w-5 text-rose-500"/>
                                    No82. New Town, Kundasale
                                </div>
                                <Link href="availability-calendar" className="theme-button mt-5 w-full gap-2">
                                    <CalendarDaysIcon className="h-5 w-5"/>
                                    Open full calendar
                                </Link>
                            </aside>
                            <div className="rounded-2xl border border-white/80 bg-white/[0.72] p-4 shadow-[0_24px_70px_-54px_rgba(15,23,42,0.32)] backdrop-blur-xl dark:border-white/[0.12] dark:bg-white/[0.08] xl:col-span-2">
                                <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 dark:border-white/[0.1] sm:flex-row sm:items-end sm:justify-between">
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-200">
                                            {todayHolidayStatus?.is_closed ? "Availability" : "Available today"}
                                        </div>
                                        <h3 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">
                                            {todayHolidayStatus?.is_closed ? "No sessions today" : "Today's doctors"}
                                        </h3>
                                    </div>
                                    <p className="max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                                        {todayHolidayStatus?.is_closed
                                            ? closureMessage
                                            : "Quickly scan today's available sessions, then open the full calendar when you need more dates."}
                                    </p>
                                </div>
                                {loadingTodayList && (
                                    <div className="px-4 py-5">
                                        <Loader/>
                                    </div>
                                )}
                                {!loadingTodayList && todayDoctorsListError && (
                                    <div className="py-5 text-sm font-semibold text-red-600">{todayDoctorsListError}</div>
                                )}
                                {!loadingTodayList && !todayDoctorsListError && !todayHolidayStatus?.is_closed && todayDoctorsList.length === 0 && (
                                    <div className="py-5 text-sm leading-6 text-slate-600 dark:text-slate-300">No doctors are listed for today. Please open the calendar for upcoming sessions.</div>
                                )}
                                {!loadingTodayList && !todayDoctorsListError && !todayHolidayStatus?.is_closed && todayDoctorsList.length > 0 && (
                                    <ul className="mt-4 grid max-h-64 gap-3 overflow-y-auto no-scrollbar md:grid-cols-2 xl:grid-cols-3">
                                        {todayDoctorsList.map((todayDoctor) => (
                                            <li
                                                className="group cursor-pointer rounded-xl border border-white/80 bg-white/[0.82] p-4 transition hover:-translate-y-0.5 hover:border-teal-200 hover:bg-teal-50/80 hover:shadow-[0_18px_48px_-38px_rgba(15,23,42,0.45)] dark:border-white/[0.12] dark:bg-slate-950/[0.46] dark:hover:border-teal-300/30 dark:hover:bg-white/[0.1]"
                                                key={todayDoctor.id}
                                                onClick={() => showBookingWindow(todayDoctor.doctor_id, todayDoctor.doctor_type, todayDoctor.doctor)}
                                            >
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="min-w-0">
                                                        <h4 className="truncate font-bold text-slate-950 group-hover:text-teal-700 dark:text-white dark:group-hover:text-teal-200">{todayDoctor.doctor}</h4>
                                                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{todayDoctor.specialty}</p>
                                                    </div>
                                                    <div className="shrink-0 rounded-lg bg-slate-950 px-3 py-2 text-right text-white dark:bg-white dark:text-slate-950">
                                                        <div className="text-[10px] font-bold uppercase opacity-60">Today</div>
                                                        <div className="text-sm font-black">{todayDoctor.time.substring(0, 5)}</div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="page-wrap mt-8 lg:mt-12">
                <div className="section-stack">
                    <section className="relative overflow-hidden py-6 lg:py-10">
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-300 to-transparent dark:via-teal-500/40"/>
                        <div className="absolute inset-x-[-2rem] top-8 h-64 bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.13),transparent_68%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.12),transparent_70%)]"/>
                        <div className="relative z-10">
                        <div className="text-center pb-12">
                            <div className="inline-flex items-center rounded-full border border-teal-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-teal-700 shadow-sm dark:border-teal-400/25 dark:bg-white/[0.08] dark:text-teal-100">What we offer</div>
                            <h2 className="mt-4 text-4xl font-black text-slate-950 dark:text-white">Our Comprehensive Healthcare Services</h2>
                            <p className="mx-auto mt-6 max-w-4xl text-slate-600 dark:text-slate-300">At Binara Medical Centre, we are dedicated to providing high-quality medical care tailored to your needs. From specialist
                                consultations to routine checkups and advanced dental treatments, our experienced team is here to ensure your health and well-being. Explore our range
                                of services designed to keep you and your family healthy.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {services.map((service, index) => (
                                <div className="text-center" key={index}>
                                    <div className={`mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-white/80 text-6xl shadow-[0_18px_50px_-40px_rgba(15,23,42,0.45)] ${service.cssClass} dark:border-white/[0.12] dark:from-white/[0.08] dark:to-teal-400/[0.12]`}>
                                        {service.image}
                                    </div>
                                    <h3 className="px-4 pt-7 text-2xl font-black text-slate-950 dark:text-white">{service.title}</h3>
                                    <p className="mx-auto max-w-sm px-4 pt-4 text-slate-600 dark:text-slate-300">{service.description}</p>
                                </div>
                            ))}
                        </div>
                        </div>
                    </section>

                    <section className="relative overflow-hidden py-8 lg:py-12">
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent dark:via-rose-500/40"/>
                        <div className="absolute inset-x-[-2rem] top-8 h-56 bg-[radial-gradient(ellipse_at_center,rgba(251,113,133,0.12),transparent_68%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(251,113,133,0.10),transparent_72%)]"/>
                        <div className="mx-auto max-w-4xl text-center">
                            <div className="inline-flex items-center rounded-full border border-teal-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-teal-700 shadow-sm dark:border-teal-400/25 dark:bg-white/[0.08] dark:text-teal-100">About Binara</div>
                            <h2 className="mt-4 text-4xl font-black text-slate-950 dark:text-white">About Binara Medical Centre</h2>
                            <p className="mt-6 text-slate-600 dark:text-slate-300">
                                Binara Medical Centre has been a trusted name in healthcare since 2008. Located in the heart of Kundasale, Kandy, we are dedicated to providing high-quality
                                medical services to our community. Our team of experienced doctors and staff are committed to ensuring your well-being through personalized care and
                                state-of-the-art facilities. Whether you need specialist consultations, OPD services, or dental care, we are here to serve you with compassion and
                                expertise.
                            </p>
                            <a href={'/about'} className="theme-button mt-8">Learn More</a>
                        </div>
                    </section>
                </div>
            </div>
            {isBookingWindowOpen && channelingDoctor && <DoctorBooking doctorData={channelingDoctor} onCloseBookingWindow={() => setIsBookingWindowOpen(false)}/>}
        </div>
    );
}
