import React, {FC} from "react";
import DoctorsAvailability from "@/components/DoctorsAvailability";

export const metadata = {
    title: "Doctors Availability - Binara Medical & Dental Centre",
    description: "Check doctor availability and book appointments online. Find the best doctors in your area. Book your appointment with Binara Medical & Dental Centre.",
};

const AvailabilityCalendar: FC = () => {
    return <div>
        <div className="lg:mx-8 mx-auto p-4 lg:mb-6">
            <h1 className="mb-1 text-3xl font-semibold">Doctor Availability Calendar</h1>
            <p className="mb-5">See which doctors are available for the next month. Click any doctor’s block in the calendar to pick a time and book your appointment instantly.</p>
            <DoctorsAvailability/>
            <p className="text-gray-500 text-sm py-4">*Please note that the listed doctors and their availability times are subject to change. For the most accurate and up-to-date
                schedule, we
                recommend calling ahead to confirm appointment times. Thank you for your understanding!</p>
        </div>
    </div>
}

export default AvailabilityCalendar;