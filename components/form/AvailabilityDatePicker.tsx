import React, {useState, useRef, useEffect} from 'react';
import {format, isSameDay, startOfMonth, endOfMonth, addDays, isSameMonth, parseISO, subMonths, addMonths} from 'date-fns';
import {ArrowLeftIcon} from "@heroicons/react/24/solid";
import {ArrowRightIcon, CalendarIcon} from "@heroicons/react/24/outline";

interface DatePickerProps {
    selectedDate: Date | null;
    onDateChange: (date: Date | null) => void;
    availableDates: string[]; // Array of ISO date strings
    disabled?: boolean; // Array of ISO date strings
}

const AvailabilityDatePicker: React.FC<DatePickerProps> = ({selectedDate, onDateChange, availableDates, disabled = false}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(selectedDate ? startOfMonth(selectedDate) : startOfMonth(new Date()));
    const datePickerRef = useRef<HTMLDivElement>(null);

    const availableDatesParsed = availableDates.map(dateString => parseISO(dateString));

    const isDateAvailable = (date: Date) => {
        return availableDatesParsed.some(availableDate => isSameDay(date, availableDate));
    };

    const handleDateClick = (date: Date) => {
        if (isDateAvailable(date)) {
            onDateChange(date);
            setIsOpen(false);
        }
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const renderDays = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(currentMonth);
        const startDate = addDays(monthStart, -monthStart.getDay());
        const endDate = addDays(monthEnd, 6 - monthEnd.getDay());

        const rows = [];
        let days = [];
        let day = startDate;

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const cloneDay = day;
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                const isCurrentMonthDay = isSameMonth(day, currentMonth);
                const isDisabled = !isDateAvailable(day);

                days.push(
                    <td
                        key={day.toISOString()}
                        className="p-px"
                    >
                        <div className={`text-center text-sm font-semibold leading-9 ${
                            !isCurrentMonthDay ?
                                'text-gray-500 cursor-not-allowed ' :
                                isDisabled ?
                                    'text-gray-500 cursor-not-allowed' :
                                    'hover:text-white cursor-pointer rounded-lg bg-purple-100 hover:bg-purple-700'
                        } ${isSelected ? 'bg-purple-600 text-white rounded-lg' : ''}`}
                             onClick={() => !isDisabled && handleDateClick(cloneDay)}> {format(day, 'd')}</div>
                    </td>
                );
                day = addDays(day, 1);
            }
            rows.push(<tr key={day.toISOString()}>{days}</tr>);
            days = [];
        }

        return rows;
    };

    return (
        <div ref={datePickerRef} className="relative">
            <button
                disabled={disabled}
                type="button"
                className={`border border-gray-200 rounded-lg py-2 px-3 w-full text-left flex gap-2 ${disabled ? 'cursor-not-allowed':''}`}
                onClick={handleToggle}
            >
                <CalendarIcon width={20} className="text-gray-600"/> {selectedDate ? format(selectedDate, 'yyyy-MM-dd') : 'Select date'}
            </button>
            {isOpen && (
                <div className="absolute z-10 bg-white border rounded-xl shadow-lg mt-1 pb-2">
                    <div className="p-4">
                        <div className="flex justify-between content-center items-center mt-2 mb-6">
                            <ArrowLeftIcon width={20} className="ml-2 cursor-pointer" onClick={prevMonth}/>
                            <span className="font-semibold text-sm mx-auto">{format(currentMonth, 'MMMM yyyy')}</span>
                            <ArrowRightIcon width={20} className="mr-2 cursor-pointer" onClick={nextMonth}/>
                        </div>
                        <table className="w-full">
                            <thead>
                            <tr>
                                <th className="h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400 w-10">Sun</th>
                                <th className="h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400 w-10">Mon</th>
                                <th className="h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400 w-10">Tue</th>
                                <th className="h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400 w-10">Wed</th>
                                <th className="h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400 w-10">Thu</th>
                                <th className="h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400 w-10">Fri</th>
                                <th className="h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400 w-10">Sat</th>
                            </tr>
                            </thead>
                            <tbody>{renderDays()}</tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AvailabilityDatePicker;