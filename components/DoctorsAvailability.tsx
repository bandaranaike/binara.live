"use client"
import React, {useState, useEffect} from 'react';
import axios from '@/lib/axios';
import '@/app/calendar-styles.css';
import DoctorsSearch from "@/components/form/DoctorsSearch";
import {monthsInYear} from "date-fns/constants";
import {param} from "ts-interface-checker";
import Loader from "@/components/form/Loader"; // Custom styles

interface DoctorAvailability {
    id: number;
    doctor_id: number;
    doctor: { id: number, name: string };
    date: string;
    time: string;
    seats: number;
    available_seats: number;
    status: string;
    created_at: string;
    updated_at: string;
}

const DoctorsAvailability: React.FC = () => {
    const [availability, setAvailability] = useState<DoctorAvailability[]>([]);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [loadingError, setLoadingError] = useState("");
    const [clearDataKey, setclearDataKey] = useState("");

    useEffect(() => {
        fetchAvailability(currentMonth, []);
    }, [currentMonth]);

    const fetchAvailability = (date: Date, ids: number[]) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        setLoading(true)
        axios.get("doctor-availabilities", {
            params: {
                year,
                month,
                doctor_ids: ids
            }
        })
            .then(response => {
                setAvailability(response.data);
                // setSelectedDoctorIds([])
                setclearDataKey((Math.random() + 1).toString(36).substring(7))
            })
            .catch(error => {
                setLoadingError('Error fetching data:' + error.response.data);
            }).finally(() => setLoading(false));
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const renderDays = () => {
        const daysInMonth = getDaysInMonth(currentMonth);
        const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

        // Convert firstDayOfMonth (0 = Sunday) to start from Monday (1 = Monday)
        const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

        const days = [];

        const doctorColors = [
            "bg-gray-200", "bg-blue-200", "bg-green-200", "bg-yellow-100",
            "bg-red-200", "bg-purple-200", "bg-pink-200", "bg-indigo-200",
            "bg-teal-200", "bg-orange-200", "bg-amber-200", "bg-lime-200",
            "bg-emerald-200", "bg-cyan-200", "bg-sky-200", "bg-violet-200",
            "bg-fuchsia-200", "bg-rose-200", "bg-slate-200", "bg-zinc-200",
            "bg-stone-200", "bg-neutral-200"
        ];


        // Add empty slots before the first day to align with Monday
        for (let i = 0; i < startOffset; i++) {
            days.push(<div key={`empty-${i}`} className="border-b hidden lg:flex min-h-24 border-r border-gray-200 p-2"></div>);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
            const formattedDate = date.toISOString().split('T')[0];
            const dayAvailability = availability.filter(avail => avail.date === formattedDate);

            days.push(
                <div key={i} className="min-h-24 border-b border-r border-gray-200 p-2">
                    <div className="font-bold mb-2">{i}</div>
                    {dayAvailability.length > 0 ? (
                        <ul className="">
                            {dayAvailability.map(avail => {
                                const doctorColor = doctorColors[avail.doctor.id % doctorColors.length]; // Assign a color
                                return (
                                    <li key={avail.id} className={`text-xs flex content-center text-gray-700 border border-gray-200 rounded-lg mb-1 ${doctorColor}`}>
                                        <div className="px-2 py-1 flex-grow">{avail.doctor?.name} </div>
                                        <div className="flex items-center px-1 py-1 border-l text-xs text-gray-500">
                                            {avail.time.substring(0, 5)}
                                        </div>
                                        {avail.seats > 0 && (
                                            <div className="flex items-center px-1 py-1 border-l text-xs text-gray-500">
                                                {avail.available_seats}/{avail.seats}
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <div className="text-xs text-gray-500">No availability</div>
                    )}
                </div>
            );
        }

        return days;
    };

    const handlePrevMonth = () => {
        const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
        setCurrentMonth(prevMonth);
    };

    const handleNextMonth = () => {
        const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
        setCurrentMonth(nextMonth);
    };

    const fetchAvailabilityForDoctors = (ids: number[]) => {
        fetchAvailability(currentMonth, ids)
    }

    return (
        <div>
            <div className="my-3 flex content-center max-w-lg min-w-">
                <DoctorsSearch clearDataKey={clearDataKey} onDoctorsSelect={fetchAvailabilityForDoctors} month={currentMonth.getMonth() + 1} year={currentMonth.getFullYear()}/>
            </div>

            <div className="border border-gray-200 rounded-xl shadow-sm relative">
                {loading && <div className="absolute right-0 -mt-12"><Loader/></div>}
                <div className="flex justify-between content-center p-4">
                    <button onClick={handlePrevMonth} className="border border-gray-300 py-2 px-4 rounded-lg hover:border-purple-500">Previous</button>
                    <div className="font-bold text-xl p-2">
                        {currentMonth.toLocaleString('default', {month: 'long'})} {currentMonth.getFullYear()}
                    </div>
                    <button onClick={handleNextMonth} className="border border-gray-300 py-2 px-4 rounded-lg hover:border-purple-500">Next</button>
                </div>
                <div className="hidden lg:grid last-item-rb-0 grid-cols-2 lg:grid-cols-7 border-t border-gray-200">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                        <div key={day} className="border-r text-gray-500 text-sm text-center border-gray-200 p-2">{day}</div>
                    ))}
                </div>
                <div className="grid last-item-rb-0 grid-cols-2 border-t lg:grid-cols-7 border-gray-200">
                    {renderDays()}
                </div>
                <div className="p-4 calendar-bottom border-t border-gray-200 flex justify-between content-center">
                    <button onClick={handlePrevMonth} className="border border-gray-300 py-2 px-4 rounded-lg hover:border-purple-500">Previous</button>
                    <div className="font-bold text-xl p-2">
                        {currentMonth.toLocaleString('default', {month: 'long'})} {currentMonth.getFullYear()}
                    </div>
                    <button onClick={handleNextMonth} className="border border-gray-300 py-2 px-4 rounded-lg hover:border-purple-500">Next</button>

                </div>
            </div>
            {loadingError && <div className="text-red-500 mx-3">{loadingError}</div>}
        </div>
    );
};

export default DoctorsAvailability;