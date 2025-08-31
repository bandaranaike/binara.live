import React, {FC} from "react";
import DoctorsAvailability from "@/components/DoctorsAvailability";

export const metadata = {
    title: "Doctors Availability - Binara Medical & Dental Centre",
};

const AvailabilityCalendar: FC = () => {
    return <div>
        <div className="lg:mx-8 mx-auto p-4 lg:mb-6">
            <h1 className="mb-4 text-3xl font-semibold">Doctors Availability</h1>
            <DoctorsAvailability/>
            <p className="text-gray-500 text-sm py-4">*Please note that the listed doctors and their availability times are subject to change. For the most accurate and up-to-date
                schedule, we
                recommend calling ahead to confirm appointment times. Thank you for your understanding!</p>
        </div>
    </div>
}

export default AvailabilityCalendar;