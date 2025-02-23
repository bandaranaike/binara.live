"use client"
import React, {useEffect, useState} from "react";
import {useUserContext} from "@/context/UserContext";
import Link from "next/link";
import {useRouter} from 'next/navigation';
import UserPatientsList from "@/components/dashboard/UserPatientsList";
import UserAppointmentsList from "@/components/dashboard/UserAppointmentsList";
import EditProfile from "@/components/dashboard/EditProfile";
import ChangePassword from "@/components/dashboard/ChangePassword";
import Loader from "@/components/form/Loader";

const Dashboard: React.FC = () => {
    const {user} = useUserContext();
    const [activeTab, setActiveTab] = useState("appointments"); // Default tab

    const router = useRouter();
    useEffect(() => {
        if (!user?.token) {
            router.push('/login');
        }
    }, [user, router])

    return (
        <div className="p-4 lg:pt-0 lg:pb-12">
            <div className="max-w-7xl mx-auto">
                {user ? (
                    <div>
                        <h1 className="my-4 lg:px-2 lg:mb-4 lg:mt-10 text-2xl font-semibold lg:text-3xl">
                            {user.name}&#39;s Dashboard
                        </h1>

                        {/* Tabs */}
                        <div className="mb-6 border-b border-gray-200">
                            <nav className="-mb-px flex space-x-4">
                                <button
                                    onClick={() => setActiveTab("appointments")}
                                    className={`${
                                        activeTab === "appointments"
                                            ? "border-indigo-500 text-indigo-700"
                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                >
                                    Appointments
                                </button>
                                <button
                                    onClick={() => setActiveTab("patients")}
                                    className={`${
                                        activeTab === "patients"
                                            ? "border-indigo-500 text-indigo-700"
                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                >
                                    Patients
                                </button>
                                <button
                                    onClick={() => setActiveTab("edit-profile")}
                                    className={`${
                                        activeTab === "edit-profile"
                                            ? "border-indigo-500 text-indigo-700"
                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                >
                                    Edit profile
                                </button>
                            </nav>
                        </div>

                        {/* Conditional Rendering based on Tab */}
                        {activeTab === "appointments" && (
                            <UserAppointmentsList user={user}/>
                        )}
                        {activeTab === "patients" && (
                            <UserPatientsList/>
                        )}
                        {activeTab === "edit-profile" && (
                            <div className="grid grid-cols-2 gap-4">
                                <EditProfile/>
                                <ChangePassword/>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-yellow-500 mt-6 mx-auto content-center text-center">
                        <div className="my-12"><Loader/></div>
                        Please <Link href="/login" className="text-purple-600">Login</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;