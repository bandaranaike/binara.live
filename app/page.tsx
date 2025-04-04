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

export default function Home() {
    const [isBookingWindowOpen, setIsBookingWindowOpen] = useState<boolean>(false)
    const [todayDoctorsList, setTodayDoctorsList] = useState<TodayDoctors[]>([])
    const [todayDoctorsListError, setTodayDoctorsListError] = useState("")
    const [channelingDoctor, setChannelingDoctor] = useState<DoctorBookingData>()
    const [loadingTodayList, setLoadingTodayList] = useState<boolean>(true)

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
        fetchDoctors()
    }, []);

    const fetchDoctors = useCallback(() => {
        axios.get(`/doctor-availabilities/get-today-doctors`).then(response => {
            setTodayDoctorsList(response.data);
        }).catch(error => {
            setTodayDoctorsListError('Error fetching doctors: ' + error.response.data);
        }).finally(() => setLoadingTodayList(false));
    }, []);


    const showBookingWindow = (id: number = 0, type: string = "", name: string = "") => {
        setChannelingDoctor({id, type, name})
        setIsBookingWindowOpen(true)
    };
    return (
        <div>
            {/* Slider Section */}
            <section className="max-w-7xl mx-auto">
                <div className="lg:grid lg:grid-cols-3 lg:gap-6 pb-12 px-4 lg:px-0">
                    <Slider {...sliderSettings} className="lg:col-span-2 lg:my-0">
                        {sliders.map((slider, index) => (
                            <div className="relative" key={index}>
                                <img src={`/images/${slider.image}`} alt={slider.title}/>
                            </div>
                        ))}
                    </Slider>
                    <div className="content-center">
                        {todayDoctorsList.length > 0 && <div className="rounded-xl border mt-16 lg:mt-0 bg-gradient-to-br from-gray-50 to-purple-50">
                            <div className="bg-white py-3 px-4 rounded-t-xl border-b border-gray-200">
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
                            <div className="bg-white p-3 rounded-b-xl"><Link href={'availability-calendar'}>Full calendar</Link></div>
                        </div>}
                        {todayDoctorsListError && <div className="rounded-xl border bg-gradient-to-br mt-16 lg:mt-0 from-purple-50 to-rose-50">
                            <div className="text-red-500 py-6 px-8 text-xs">{todayDoctorsListError}</div>
                        </div>}
                        {loadingTodayList && <Loader/>}
                    </div>
                </div>
            </section>
            {/* Services Section */}
            <section className="bg-gradient-to-br from-amber-50 via-red-50 to-violet-50 lg:py-24 py-6">
                <div className="max-w-7xl mx-auto p-4 lg:p-0">
                    <div className="text-center pb-12">
                        <h2 className="text-4xl font-bold">Our Comprehensive Healthcare Services</h2>
                        <p className="text-gray-500 mt-6">At Binara Medical Centre, we are dedicated to providing high-quality medical care tailored to your needs. From specialist
                            consultations to routine checkups and advanced dental treatments, our experienced team is here to ensure your health and well-being. Explore our range
                            of services designed to keep you and your family healthy.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <div className="text-center  border-gray-200 rounded-xl bg-white" key={index}>
                                <div className={`text-9xl p-8 rounded-t-xl ${service.cssClass}`}>{service.image}</div>
                                <h2 className="text-2xl px-4 pt-10 font-semibold">{service.title}</h2>
                                <p className="text-gray-600 pb-12 px-6 pt-4">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section className="about-us p-4 py-12 lg:py-24">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-4xl font-bold">About Binara Medical Centre</h2>
                    <p className="text-gray-500 mt-6">
                        Binara Medical Centre has been a trusted name in healthcare since 2008. Located in the heart of Kundasale, Kandy, we are dedicated to providing high-quality
                        medical services to our community. Our team of experienced doctors and staff are committed to ensuring your well-being through personalized care and
                        state-of-the-art facilities. Whether you need specialist consultations, OPD services, or dental care, we are here to serve you with compassion and
                        expertise.
                    </p>
                    <a href={'/about'} className="mt-8 inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:bg-gradient-to-l transition duration-300">Learn More</a>
                </div>
            </section>
            {isBookingWindowOpen && channelingDoctor && <DoctorBooking doctorData={channelingDoctor} onCloseBookingWindow={() => setIsBookingWindowOpen(false)}/>}
        </div>
    );
}
