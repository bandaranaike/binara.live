"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '@/app/calendar-styles.css'; // Custom styles

interface DoctorAvailability {
    id: number;
    doctor_id: number;
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

    useEffect(() => {
        fetchAvailability(currentMonth);
    }, [currentMonth]);

    const fetchAvailability = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        axios.get(`api/doctors-availability?year=${year}&month=${month}`)
            .then(response => {
                setAvailability(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const renderDays = () => {
        const daysInMonth = getDaysInMonth(currentMonth);
        const days = [];
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
            const formattedDate = date.toISOString().split('T')[0];
            const dayAvailability = availability.filter(avail => avail.date === formattedDate);

            days.push(
                <div key={i} className="day border-b border-r border-gray-200 p-2 peer-last:border-r-0">
                    <div className="date font-bold">{i}</div>
                    {dayAvailability.length > 0 ? (
                        <ul className="list-disc">
                            {dayAvailability.map(avail => (
                                <li key={avail.id} className="text-xs text-gray-500">
                                    Doctor ID: {avail.doctor_id}, Available: {avail.available_seats}/{avail.seats}
                                </li>
                            ))}
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

    return (
        <div className="container mx-auto p-4">
            <div className="border border-gray-200 rounded-xl">
                <div className="flex justify-between mb-4 p-4">
                    <button onClick={handlePrevMonth} className="bg-gray-50 p-2 rounded">Previous</button>
                    <div className="font-bold">
                        {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
                    </div>
                    <button onClick={handleNextMonth} className="bg-gray-50 p-2 rounded">Next</button>
                </div>
                <div className="grid grid-cols-7">
                    {renderDays()}
                </div>
            </div>
        </div>
    );
};

export default DoctorsAvailability;