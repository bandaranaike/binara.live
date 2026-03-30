import React, {useState, useEffect, useCallback, useRef} from 'react';
import axios from '@/lib/axios';
import debounce from 'debounce';
import CustomCheckbox from "@/components/form/CustomCheckbox";
import {XCircleIcon} from "@heroicons/react/24/outline";

interface Doctor {
    id: number;
    name: string;
    specialty_name: string;
    date: string;
    time: string;
}

interface DoctorsSearchProps {
    year: number;
    month: number;
    clearDataKey: string;
    onDoctorsSelect: (ids: number[]) => void;
}

const DoctorsSearch: React.FC<DoctorsSearchProps> = ({year, month, onDoctorsSelect, clearDataKey}) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [selectedDoctors, setSelectedDoctors] = useState<number[]>([]);
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const debouncedFetchDoctors = useRef(debounce((query) => fetchDoctors(query), 300)).current;

    useEffect(() => {
        return () => {
            debouncedFetchDoctors.clear();
        };
    }, [debouncedFetchDoctors]);

    useEffect(() => {
        if (searchQuery) {
            debouncedFetchDoctors(searchQuery);
        } else {
            setDoctors([]);
        }
    }, [searchQuery, debouncedFetchDoctors]);

    const fetchDoctors = useCallback((query: string) => {
        axios.get(`/doctor-availabilities/search-doctor?query=${query}&year=${year}&month=${month}`)
            .then(response => {
                setShowDropDown(response.data.length > 0);
                setDoctors(response.data);
            })
            .catch(error => {
                console.error('Error fetching doctors:', error);
            });
    }, [year, month]);

    useEffect(() => {
        setSelectedDoctors([]);
    }, [clearDataKey]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setSearchQuery('');
                setDoctors([]);
                setShowDropDown(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    const handleCheckboxChange = (doctorId: number) => {
        setSelectedDoctors(prevSelected => {
            if (prevSelected.includes(doctorId)) {
                return prevSelected.filter(id => id !== doctorId);
            } else {
                return [...prevSelected, doctorId];
            }
        });
    };

    const handleDone = () => {
        setShowDropDown(false);
        onDoctorsSelect(selectedDoctors);
    };

    const handleCancel = () => {
        setSearchQuery('')
        setShowDropDown(false);
        setSelectedDoctors([]);
        onDoctorsSelect([])
    };

    return (
        <div className="w-full">
            {showDropDown && <div className="w-screen h-screen absolute top-0 left-0 z-10 bg-black bg-opacity-5" onClick={() => setShowDropDown(false)}></div>}
            <div className="relative z-20">
                <div className="relative">
                    <input
                        type="text"
                        className={`theme-input ${showDropDown ? 'mb-0 pb-4' : 'mb-1 pb-3'}`}
                        placeholder="Search for doctors or specialties..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onClick={(e) => e.stopPropagation()} // Prevent event propagation
                    />
                    <XCircleIcon className="absolute right-3 top-3 text-slate-400 hover:text-red-500" width={20} onClick={handleCancel}/>
                </div>

                {showDropDown && (
                    <div className="absolute -mt-1 w-full rounded-b-2xl border border-purple-100 bg-white shadow-[0_18px_40px_-30px_rgba(91,33,182,0.35)]">
                        {doctors.map(doctor => (
                            <div key={`${doctor.id}-${doctor.date}`}
                                 className="flex max-w-xl gap-3 border-b border-purple-50 px-3 py-3 hover:bg-purple-50"
                                 onClick={(e) => e.stopPropagation()} // Prevent event propagation
                            >
                                <CustomCheckbox
                                    checked={selectedDoctors.includes(doctor.id)}
                                    setChecked={() => handleCheckboxChange(doctor.id)}
                                />
                                <div className="text-sm"> {doctor.name}
                                    <div className="text-gray-500 text-xs">{doctor.specialty_name}</div>
                                </div>
                            </div>
                        ))}
                        <div className="flex w-full justify-between p-2">
                            <button className="theme-button-secondary px-4 py-2" onClick={handleDone}>Search</button>
                            <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:border-rose-200 hover:text-rose-500" onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorsSearch;
