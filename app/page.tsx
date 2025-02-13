"use client"
import React, {useState} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import DoctorBooking from "@/components/DoctorBooking";

export default function Home() {
    const [isBookingWindowOpen, setIsBookingWindowOpen] = useState<boolean>(false)
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
    };

    const sliders = [
        {title: "Your Trusted Healthcare Partner", description: "Specialist Channeling, OPD, and Dental Care in Kundasale, Kandy."},
        {title: "Comprehensive Care for All Ages", description: "From routine checkups to specialized treatments, we’ve got you covered."},
        {title: "Serving the Community Since 2008", description: "Experience compassionate care at Binara Medical Centre."},
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

    const showBookingWindow = () => {
        setIsBookingWindowOpen(true)
    };
    return (
        <div>
            {/* Slider Section */}
            <section className="max-w-7xl mx-auto">
                <div className="lg:grid lg:grid-cols-3 lg:gap-6 py-8 px-4 lg:px-0">
                    <Slider {...sliderSettings} className="lg:col-span-2 lg:my-16">
                        {sliders.map((slider, index) => (
                            <div className="slider-item" key={index}>
                                <h1 className="text-5xl font-bold">{slider.title}</h1>
                                <p className="text-gray-600 mt-6">{slider.description}</p>
                                <button
                                    onClick={showBookingWindow}
                                    className=" bg-purple-900 text-white mt-8 text-sm rounded-full py-4 px-8 mb-6">Book an Appointment
                                </button>
                            </div>
                        ))}
                    </Slider>
                    <div className="rounded-xl border bg-gradient-to-br mt-16 lg:mt-0 from-purple-50 to-rose-50">
                        <ul className="overflow-y-scroll max-h-fit">
                            <li className="bg-white p-4 rounded-t-xl text-xl font-semibold border-b border-gray-200">Today&#39;s doctors list</li>
                            {Array.from(Array(4)).map((item, i) =>
                                <li className="border-b border-gray-200 py-2 px-4 flex items-center justify-between" key={i}>
                                    <div>
                                        <h4 className="font-semibold">Doctor Alahakoon</h4>

                                        <p className="text-sm text-gray-500">Obstetrics and Gynecology</p>
                                    </div>
                                    <div className="">
                                        <div className="text-gray-500 text-xs">Today</div>
                                        <div className="text-purple-600 text-sm font-semibold">5.30PM - 8.30PM</div>
                                    </div>
                                </li>
                            )}
                            <li className="bg-white p-3 rounded-b-xl">Full calendar</li>
                        </ul>
                    </div>
                </div>
            </section>
            {/* Services Section */}
            <section className="bg-gradient-to-br from-amber-50 via-red-50 to-violet-50 lg:py-24">
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
                </div>
            </section>
            {isBookingWindowOpen && <DoctorBooking onCloseBookingWindow={() => setIsBookingWindowOpen(false)}/>}
        </div>
    );
}
