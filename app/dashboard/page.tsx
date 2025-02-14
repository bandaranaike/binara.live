"use client"
import React, {useCallback, useEffect, useState} from "react";
import {useUserContext} from "@/context/UserContext";
import Link from "next/link";
import debounce from "debounce";
import axios from "@/lib/axios";
import Loader from "@/components/Loader";

interface ApointmentHistory {
    id: number;
    patientName: string;
    appointmentType: string;
    doctorName: string;
    date: string;
    paymentStatus: string;
    status: string;
}

const Dashboard: React.FC = () => {
    const [apointmentHistories, setApointmentHistories] = React.useState<ApointmentHistory[]>([]);

    const {user} = useUserContext();

    useEffect(() => {
        setLoading(true);
        getApointmentHistories();
    }, []);

    const [apointmentHistoriesGetError, setApointmentHistoriesGetError] = useState();
    const [loading, setLoading] = useState<boolean>(false);

    const getApointmentHistories = useCallback(debounce(() => {
        axios.get('/bookings/patients/history').then(result => {
            setApointmentHistories(result.data);
        }).catch(error => setApointmentHistoriesGetError(error.response.data.message)).finally(() => setLoading(false));
    }), [user])

    return (
        <div className="p-4 lg:pt-0 lg:pb-12">
            <div className="max-w-7xl mx-auto">
                {user ? (
                    <div>
                        <h1 className="my-4 lg:px-2 lg:my-8 text-2xl font-semibold lg:text-3xl">{user.name}&#39;s Dashboard</h1>
                        <div className="border border-gray-200 rounded-xl">
                            <div className="border-b border-gray-200 p-4">
                                <h3 className="text-xl font-bold mb-2">Appointment history</h3>
                                <p className="text-gray-500 text-sm">The Appointment History table provides a detailed overview of all your past and upcoming appointments. Use this
                                    table to monitor your healthcare activities and manage your appointments effectively.</p>
                            </div>
                            {apointmentHistoriesGetError && <div className="p-6 border-b border-gray-200 text-yellow-600">{apointmentHistoriesGetError}</div>}
                            {loading && <div className="p-6 border-t border-gray-200"><Loader/></div>}
                            {apointmentHistories.length &&
                                <table className="w-full">
                                    <thead>
                                    <tr className="border-b-2 border-gray-200 text-left">
                                        <th className="py-2 px-4 border-r">Patient name</th>
                                        <th className="py-2 px-4 border-r">Appointment type</th>
                                        <th className="py-2 px-4 border-r">Doctor&apos;s Name</th>
                                        <th className="py-2 px-4 border-r">Date</th>
                                        <th className="py-2 px-4 border-r">Payment status</th>
                                        <th className="py-2 px-4">Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {apointmentHistories.map((appointment) => (
                                        <tr key={appointment.id} className="border-b border-gray-200 last:border-b-0 text-sm">
                                            <td className="py-2 px-4 border-r">{appointment.patientName}</td>
                                            <td className="py-2 px-4 border-r">{appointment.appointmentType}</td>
                                            <td className="py-2 px-4 border-r">{appointment.doctorName}</td>
                                            <td className="py-2 px-4 border-r">{appointment.date}</td>
                                            <td className="py-2 px-4 border-r">{appointment.paymentStatus}</td>
                                            <td className="py-2 px-4">{appointment.status}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table> || <div className="p-6 text-sm text-center text-gray-400">There are no history records</div>}
                        </div>
                    </div>
                ) : (
                    <div className="text-yellow-500 mt-6">Please <Link href="/login" className="underline">Login</Link></div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;