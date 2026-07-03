import React, {FC} from "react";
import DoctorsAvailability from "@/components/DoctorsAvailability";
import {createPageMetadata, siteConfig} from "@/lib/site";

export const metadata = createPageMetadata({
    title: `Doctors availability | ${siteConfig.name}`,
    description: "Check doctor availability at Binara Medical Centre and book appointments online.",
    path: "/availability-calendar",
});

const AvailabilityCalendar: FC = () => {
    return <div className="">
        <div className="page-wrap page-stack">
            <div className="section-stack">
                <section className="">
                    <div className="max-w-3xl">
                        <div className="section-kicker">Availability calendar</div>
                        <h1 className="section-title mt-4">Find the right doctor and the right day.</h1>
                        <p className="section-copy mt-4">See which doctors are available for the next month. Click any
                            doctor’s block in the calendar to pick a time and book your appointment instantly.</p>
                    </div>
                </section>
            </div>
        </div>
        <section className="p-8">
            <DoctorsAvailability/>
            <p className="pt-6 text-sm text-slate-500">*Please note that listed doctors and their availability times are
                subject to change. For the most accurate schedule, please call ahead to confirm appointment times.</p>
        </section>
    </div>
}

export default AvailabilityCalendar;
