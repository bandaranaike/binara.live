import React, {FC} from "react";
import DoctorsAvailability from "@/components/DoctorsAvailability";

export const metadata = {
    title: "Doctors Availability - Binara Medical & Dental Centre",
    description: "Check doctor availability and book appointments online. Find the best doctors in your area. Book your appointment with Binara Medical & Dental Centre.",
};

const AvailabilityCalendar: FC = () => {
    return <div className="px-4 py-6 lg:px-6 lg:py-10">
        <section className="mx-auto  hero-panel">
            <div className="relative z-10 max-w-3xl">
                <div className="section-kicker">Availability calendar</div>
                <h1 className="section-title mt-4">Find the right doctor and the right day.</h1>
                <p className="section-copy mt-4">See which doctors are available for the next month. Click any doctor’s block in the calendar to pick a time and book your appointment instantly.</p>
            </div>
        </section>
        <div className="content-panel mx-auto mt-8 ">
            <DoctorsAvailability/>
            <p className="pt-6 text-sm text-slate-500">*Please note that listed doctors and their availability times are subject to change. For the most accurate schedule, please call ahead to confirm appointment times.</p>
        </div>
    </div>
}

export default AvailabilityCalendar;
