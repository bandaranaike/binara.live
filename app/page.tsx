"use client"
import React, {useCallback, useEffect, useState} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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

export default function Home() {
    const [isBookingWindowOpen, setIsBookingWindowOpen] = useState<boolean>(false)
    const [todayDoctorsList, setTodayDoctorsList] = useState<TodayDoctors[]>([])
    const [todayDoctorsListError, setTodayDoctorsListError] = useState("")
    const [channelingDoctor, setChannelingDoctor] = useState<DoctorBookingData>()
    const [loadingTodayList, setLoadingTodayList] = useState<boolean>(true)
    const [todayHolidayStatus, setTodayHolidayStatus] = useState<TodayHolidayStatus | null>(null)

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000,
    };

    const sliders = [
        {title: "Your Trusted Healthcare Partner", image: "gallery-1.jpg"},
        {title: "Comprehensive Care for All Ages", image: "gallery-2.jpg"},
    ];

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

    const closureTitle = todayHolidayStatus?.holiday_name
        ? `${todayHolidayStatus.holiday_name} closure`
        : "Today we are closed";

    const closureMessage = todayHolidayStatus?.message
        || "Our medical centre is closed today. Please check back tomorrow or review the availability calendar for upcoming sessions.";


    const showBookingWindow = (id: number = 0, type: string = "", name: string = "") => {
        return null;
        setChannelingDoctor({id, type, name})
        setIsBookingWindowOpen(true)
    };
    return (
        <div className="page-stack">
            {todayHolidayStatus?.is_closed && (
                <section className="px-4 pt-4 lg:px-0">
                    <div className="max-w-7xl mx-auto">
                        <div className="hero-panel">
                            <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div className="max-w-3xl">
                                    <div className="section-kicker">
                                        Important notice
                                    </div>
                                    <h1 className="mt-3 section-title">
                                        {closureTitle}
                                    </h1>
                                    <p className="mt-3 max-w-2xl section-copy">
                                        {closureMessage}
                                    </p>
                                </div>
                                <div className="content-panel p-5">
                                    <div className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">Status</div>
                                    <div className="mt-2 text-2xl font-black text-slate-900">Closed today</div>
                                    <Link
                                        href={'availability-calendar'}
                                        className="theme-button mt-4"
                                    >
                                        View upcoming availability
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            <div className="page-wrap">
                <div className="section-stack">
                    {/* Slider Section */}
                    <section>
                        <div className={`lg:grid lg:grid-cols-3 lg:gap-6 ${todayHolidayStatus?.is_closed ? 'pt-6' : 'pt-0'}`}>
                            <div className="section-card lg:col-span-2 overflow-hidden">
                                <Slider {...sliderSettings} className="lg:my-0">
                                    {sliders.map((slider, index) => (
                                        <div className="relative" key={index}>
                                            <img src={`/images/${slider.image}`} alt={slider.title}/>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                            <div className="content-center">
                                {todayHolidayStatus?.is_closed && <div className="section-card mt-16 lg:mt-0 bg-gradient-to-br from-purple-50 to-rose-50">
                                    <div className="rounded-t-xl border-b border-gray-200 bg-white py-3 px-4">
                                        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-600">Closure update</div>
                                        <h3 className="mt-2 text-2xl font-black text-slate-900">Today the centre is closed</h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-600">{closureMessage}</p>
                                    </div>
                                    <div className="rounded-b-xl bg-white p-4">
                                        <div className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-4 text-white">
                                            <div className="text-sm font-semibold text-purple-100">Need another date?</div>
                                            <div className="mt-1 text-sm text-white/90">Please use the full calendar to find the next available doctor sessions.</div>
                                            <Link href={'availability-calendar'} className="mt-4 inline-flex rounded-md bg-white px-4 py-2 text-sm font-semibold text-purple-600 transition duration-300 hover:bg-purple-50">
                                                Open full calendar
                                            </Link>
                                        </div>
                                    </div>
                                </div>}
                                {!todayHolidayStatus?.is_closed && todayDoctorsList.length > 0 && <div className="section-card mt-16 lg:mt-0 bg-gradient-to-br from-gray-50 to-purple-50">
                                    <div className="rounded-t-xl border-b border-gray-200 bg-white py-3 px-4">
                                        <h3 className="font-semibold text-xl">Today&#39;s doctors list</h3>
                                        <div className="text-gray-500 text-xs">View available doctors and their specialties. Book your appointment now!</div>
                                    </div>
                                    <ul className="overflow-y-scroll no-scrollbar max-h-96">
                                        {todayDoctorsList.map((todayDoctor) => {
                                                return (<li
                                                    className={`border-b border-gray-200 py-1 px-3 flex items-center justify-between cursor-pointer`}
                                                    key={todayDoctor.id}
                                                    onClick={() => showBookingWindow(todayDoctor.doctor_id, todayDoctor.doctor_type, todayDoctor.doctor)}
                                                >
                                                    <div>
                                                        <h4 className="font-semibold">{todayDoctor.doctor}</h4>
                                                        <p className="text-sm text-gray-500">{todayDoctor.specialty}</p>
                                                    </div>
                                                    <div className="">
                                                        <div className="text-gray-500 text-xs">Today</div>
                                                        <div className="text-purple-600 text-sm font-semibold">{todayDoctor.time.substring(0, 5)}</div>
                                                    </div>
                                                </li>)
                                            }
                                        )}
                                    </ul>
                                    <div className="rounded-b-xl bg-white p-3"><Link href={'availability-calendar'}>Full calendar</Link></div>
                                </div>}
                                {todayDoctorsListError && <div className="section-card mt-16 lg:mt-0 bg-gradient-to-br from-purple-50 to-rose-50">
                                    <div className="text-red-500 py-6 px-8 text-xs">{todayDoctorsListError}</div>
                                </div>}
                                {loadingTodayList && <Loader/>}
                            </div>
                        </div>
                    </section>

                    {/* Services Section */}
                    <section className="section-surface-contrast">
                        <div className="text-center pb-12">
                            <div className="section-kicker">What we offer</div>
                            <h2 className="mt-4 text-4xl font-black">Our Comprehensive Healthcare Services</h2>
                            <p className="mx-auto mt-6 max-w-4xl text-gray-500">At Binara Medical Centre, we are dedicated to providing high-quality medical care tailored to your needs. From specialist
                                consultations to routine checkups and advanced dental treatments, our experienced team is here to ensure your health and well-being. Explore our range
                                of services designed to keep you and your family healthy.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {services.map((service, index) => (
                                <div className="overflow-hidden rounded-xl border border-purple-100 bg-white/90 text-center" key={index}>
                                    <div className={`text-9xl p-8 rounded-t-xl ${service.cssClass}`}>{service.image}</div>
                                    <h2 className="px-4 pt-10 text-2xl font-semibold">{service.title}</h2>
                                    <p className="px-6 pb-12 pt-4 text-gray-600">{service.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* About Us Section */}
                    <section className="">
                        <div className="mx-auto text-center">
                            <div className="section-kicker">About Binara</div>
                            <h2 className="mt-4 text-4xl font-black">About Binara Medical Centre</h2>
                            <p className="mt-6 text-gray-600">
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
