import React, {useState, useEffect, ChangeEvent} from "react";

import {Button, Select, Datepicker} from "flowbite-react";
import {Input} from "@headlessui/react";
import debounce from "debounce";
import parsePhoneNumber from "libphonenumber-js";
import {CheckCircleIcon, InformationCircleIcon, MinusCircleIcon, XCircleIcon} from "@heroicons/react/24/outline";
import Loader from "@/components/form/Loader";
import axios from "@/lib/axios";
import {useUserContext} from "@/context/UserContext";
import {DoctorBookingData} from "@/types/interfaces";

interface DoctorBookingProps {
    onCloseBookingWindow: () => void;
    onAppointmentBooked?: () => void;
    channelingDate?: string;
    doctorData: DoctorBookingData
}

interface BookingResponse {
    doctor_name: string;
    booking_number: string;
    date: string;
    time: string;
    reference: string;
    generated_at: string;
    bill_id: string;
}

interface Doctor {
    id: number;
    name: string;
    specialty_name: string
}

interface ApiError {
    response?: {
        data?: {
            message?: string;
        };
    };
}

const DoctorBooking: React.FC<DoctorBookingProps> = ({onCloseBookingWindow, doctorData, onAppointmentBooked}) => {
    const {user} = useUserContext();

    const [doctorType, setDoctorType] = useState(doctorData.type ?? "specialist");
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [selectedDoctor, setSelectedDoctor] = useState(doctorData.id);
    const [date, setDate] = useState<Date | null>(doctorData.date ? new Date(Date.parse(doctorData.date)) : new Date());
    const [formData, setFormData] = useState({name: "", phone: "", age: "", email: ""});
    const [bookingResponse, setBookingResponse] = useState<BookingResponse | null>(null);
    const [doctorSelectError, setDoctorSelectError] = useState("");
    const [bookingCreateError, setBookingCreateError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState<string | undefined>()
    const [nameError, setNameError] = useState<string | undefined>()
    const [ageError, setAgeError] = useState<string | undefined>()
    const [isDoctorsLoading, setIsDoctorsLoading] = useState<boolean>(false)
    const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false)

    const [searchQuery, setSearchQuery] = useState(doctorData.name ?? "");


    const fetchDoctors = debounce(async (doctorType, setDoctors, setDoctorSelectError) => {
        try {
            axios.get("doctor-availabilities/search-booking-doctors", {
                params: {
                    type: doctorType,
                    query: searchQuery
                }
            }).then(response => {
                setDoctors(response.data);
                setDoctorSelectError("");
            }).catch(error => {
                setDoctorSelectError('Error fetching data:' + error.response.data.message);
            }).finally(() => setIsDoctorsLoading(false));

        } catch (e) {
            const error = e as ApiError;
            setDoctorSelectError(error.response?.data?.message || "An error occurred");
        }
    }, 200);

    useEffect(() => {
        setIsDoctorsLoading(true)
        if (doctorType) {
            fetchDoctors(doctorType, setDoctors, setDoctorSelectError);
        }
    }, [doctorType]);

    useEffect(() => {
        fetchDoctors(doctorType, setDoctors, setDoctorSelectError)
    }, [searchQuery]);

    useEffect(() => {
        if (formData.phone) setPhoneError("")
        if (formData.age) setAgeError("")
        if (formData.name) setNameError("")
    }, [formData]);

    const handleChange = debounce((e: ChangeEvent<HTMLInputElement>) => { // Type the event argument
        setFormData({...formData, [e.target.name]: e.target.value});
    }, 300);


    const handlePhoneChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
        const phone = e.target.value;
        if (!phone) {
            setPhoneError("Phone number is required");
        } else {
            const formatedPhone = parsePhoneNumber(phone, 'LK');
            if (!formatedPhone || (formatedPhone && !formatedPhone.isValid())) {
                setPhoneError("Phone number is invalid");
            } else {
                setPhoneError("");
                setFormData({...formData, phone: formatedPhone?.number});
            }
        }

    }, 300)

    const handleDateChange = (date: Date | null) => {
        setDate(date);
    }

    const changeDoctor = (doctorId: string) => {
        setDoctorSelectError("")
        setSelectedDoctor(doctorId);
    }


    const areAllInputsValid = () => {
        let valid = true;
        // Validate all fields
        if (!selectedDoctor) {
            setDoctorSelectError("Please select a doctor");
            valid = false;
        }

        if (!user && !formData.phone) {
            setPhoneError('Phone number is required')
            valid = false;
        }

        if (!date) {
            setBookingCreateError("Please select a date");
            valid = false;
        }

        if (!formData.name.trim()) {
            setNameError("Patient's name is required");
            valid = false;
        }

        if (!formData.age.trim()) {
            setAgeError("Patient's age is required");
            valid = false;
        }

        if (formData.email.trim() && !(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email))) {
            setEmailError("Please enter valid email address");
            valid = false;
        }
        return valid;
    }

    const handleBooking = async () => {

        if (areAllInputsValid()) {
            try {
                setIsFormSubmitting(true);
                setBookingCreateError("")
                setPhoneError("")
                setDoctorSelectError("")
                setBookingResponse(null)

                const body = {
                    ...formData,
                    phone: user && !formData.phone ? user.phone : formData.phone,
                    doctor_id: selectedDoctor,
                    doctor_type: doctorType,
                    user_id: user?.id,
                    date: date ? date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                }

                axios.post('/bookings/make-appointment', body).then(response => {
                    if (onAppointmentBooked) onAppointmentBooked();
                    setBookingResponse(response.data)
                }).catch(error => {
                    if (error.response?.data?.message) setBookingCreateError(error.response.data.message);
                    else if (error.response?.data) setBookingCreateError(error.response.data);
                }).finally(() => setIsFormSubmitting(false));

            } catch (e) {
                const error = e as ApiError;
                setBookingCreateError(error.response?.data?.message || "An error occurred");
                setIsFormSubmitting(false);
            }
        }
    };

    const removeSelectedDoctor = () => {
        setSelectedDoctor(0)
        setSearchQuery("")
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="max-w-2xl flex-grow max-h-full overflow-y-scroll lg:mx-auto mx-4 bg-white rounded-2xl">
                <div>
                    <div className="p-8 pb-0 relative">
                        <button title="Close window" className="absolute right-0 mr-4 -mt-4 text-gray-500 hover:text-purple-500" onClick={onCloseBookingWindow}>
                            <XCircleIcon width={30}/>
                        </button>
                        <h2 className="text-2xl font-bold mb-2">Doctor Appointment</h2>
                        <p className="text-gray-500">{!user?.token ? 'If you\'re logged in' : 'If you visit the dashboard'}, you can also view your booking history for easy
                            access and management.</p>
                    </div>

                    <div className="px-8 pt-6 pb-2">
                        <div className="lg:grid lg:grid-cols-4 gap-4">
                            <div>
                                <Select className="mb-3" value={doctorType} onChange={(e) => setDoctorType(e.target.value)}>
                                    <option value="dental">Dental</option>
                                    <option value="specialist">Specialist</option>
                                </Select>
                            </div>
                            <div className="lg:col-span-3 relative">
                                {(selectedDoctor && selectedDoctor != 0) ? <div
                                    className="absolute text-gray-600 -mt-6 right-2 flex gap-1 text-xs hover:text-yellow-700 cursor-pointer "
                                    onClick={() => removeSelectedDoctor()}
                                >
                                    <MinusCircleIcon width={16}/>Clear Doctor
                                </div> : ''}
                                {!isDoctorsLoading && <Select className="mb-1" value={selectedDoctor} onChange={(e) => changeDoctor(e.target.value)}>
                                    <option value="0">Please select...</option>
                                    {doctors && doctors.map((doc) => (
                                        <option key={doc.id} value={doc.id}>
                                            {doc.name}
                                        </option>
                                    ))}
                                </Select> || <div className="pt-1.5 pb-1"><Loader/></div>}

                                <div className="mb-3">
                                    {doctorSelectError && (<div className="text-red-500 text-sm">{doctorSelectError}</div>)}
                                </div>
                            </div>
                        </div>
                        <div className="lg:grid lg:grid-cols-2 gap-4">

                            <Datepicker
                                className="mb-3"
                                value={date}
                                onChange={handleDateChange}
                                minDate={new Date()}
                                maxDate={new Date(2025, 2, 20)}
                            />
                            <div>
                                <Input
                                    className="w-full border border-gray-200 py-2 mb-3 px-4 rounded-lg"
                                    name="age"
                                    placeholder="Patient's age *"
                                    onChange={handleChange}/>
                                {ageError && <div className="text-red-500 text-sm mb-3 -mt-2 pl-1">{ageError}</div>}
                            </div>
                        </div>

                        <Input
                            className="mb-3 w-full border border-gray-200 py-2 px-4 rounded-lg"
                            name="name"
                            placeholder="Patient's name *"
                            onChange={handleChange}/>

                        {nameError && <div className="text-red-500 text-sm mb-3 -mt-2 pl-1">{nameError}</div>}

                        <Input
                            className="mb-3 w-full border border-gray-200 py-2 px-4 rounded-lg"
                            name="email"
                            placeholder="Your email"
                            onChange={handleChange}/>

                        {emailError && <div className="text-red-500 text-sm mb-3 -mt-2 pl-1">{emailError}</div>}

                        <Input
                            className="mb-3 w-full border border-gray-200 py-2 px-4 rounded-lg"
                            name="phone"
                            placeholder={`Your phone number ${user ? '' : '*'}`}
                            onChange={handlePhoneChange}/>

                        {phoneError && <div className="text-red-500 text-sm mb-3 -mt-2 pl-1">{phoneError}</div>}

                        <div className="flex">
                            <InformationCircleIcon width={20} className="mb-2 mr-2 text-purple-600 w-10 lg:w-8 "/>
                            <span className="text-gray-500 text-sm">
                                Enter the phone number you use regularly. This ensures your booking and clinical history are linked correctly.
                            </span>

                        </div>
                    </div>

                    {bookingCreateError && <div className="text-red-500 text-sm px-8 py-3">{bookingCreateError}</div>}

                    {bookingResponse && bookingResponse.bill_id && (
                        <div className="mx-8 my-1 rounded-lg border-2 border-green-500">
                            <div className="pt-5 pb-4 px-6">
                                <h3 className="text-lg font-bold mb-2">Booking Details</h3>
                                <p>Doctor: <span className="font-semibold"> {bookingResponse.doctor_name}</span></p>
                                <p>Appointment Number: <span className="font-semibold"> {bookingResponse.booking_number}</span></p>
                                <p>Date: <span className="font-semibold"> {bookingResponse.date}</span></p>
                                <p>Bill ID: <span className="font-semibold"> {bookingResponse.bill_id}</span></p>
                            </div>
                            <div className="bg-gray-100 rounded-b-xl pt-3 pb-5 px-6 text-sm text-gray-500">
                                <p>Reference: <span className="font-semibold"> {bookingResponse.reference}</span></p>
                                <p>Generated at: <span className="font-semibold"> {bookingResponse.generated_at}</span></p>
                            </div>
                        </div>
                    )}

                    <div className="flex gap-4 px-8">
                        <Button onClick={handleBooking} color={"purple"} className="mt-4">Make Booking</Button>
                        <Button color={'gray'} onClick={onCloseBookingWindow} className="mt-4">Close</Button>
                        {isFormSubmitting && <div className="pt-5"><Loader/></div>}
                        {bookingResponse && bookingResponse.bill_id &&
                            <div className="text-green-600 mt-4 flex items-center">
                                <CheckCircleIcon width={20} className="mr-1"/> Booking success!
                            </div>
                        }
                    </div>
                </div>
                <div className="px-8 pb-8 pt-6 flex justify-between">
                    <div className="text-sm">For inquiries, please contact us at {process.env.NEXT_PUBLIC_APP_TELEPHONE}</div>
                    {!user?.token && <div className="text-right text-sm">
                        <a href="/login" className="mr-4 text-blue-500">Login</a>
                        <a href="/register" className="text-blue-500">Register</a></div>}
                </div>
            </div>
        </div>
    );
}
export default DoctorBooking;