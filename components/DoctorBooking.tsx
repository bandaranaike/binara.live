import React, {useState, useEffect, ChangeEvent} from "react";

import {Button, Card, Select, Datepicker} from "flowbite-react";
import {Input} from "@headlessui/react";
import debounce from "debounce";
import parsePhoneNumber, {isValidPhoneNumber} from "libphonenumber-js";
import {InformationCircleIcon} from "@heroicons/react/24/outline";

interface DoctorBookingProps {
    onCloseBookingWindow: () => void;
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

const DoctorBooking: React.FC<DoctorBookingProps> = ({onCloseBookingWindow}) => {
    const [doctorType, setDoctorType] = useState("dental");
    const [doctors, setDoctors] = useState<{ id: number, name: string }[]>([]);
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [date, setDate] = useState<Date | null>(null);
    const [formData, setFormData] = useState({name: "", phone: "", age: ""});
    const [bookingResponse, setBookingResponse] = useState<BookingResponse | null>(null);
    const [doctorSelectError, setDoctorSelectError] = useState("");
    const [phoneError, setPhoneError] = useState<string | undefined>()

    useEffect(() => {

        fetch(`/api/proxy/doctors?type=${doctorType}`).then((res) => {
            console.log(res.json())
        }).catch(e => {
            setDoctorSelectError(e.response.data.message);
        });
    }, [doctorType]);


    const handleChange = debounce((e: ChangeEvent<HTMLInputElement>) => { // Type the event argument
        setFormData({...formData, [e.target.name]: e.target.value});
    }, 300);


    const handlePhoneChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
        const phone = e.target.value;
        if (!phone) {
            setPhoneError("Phone number is required");
        } else {
            const formatedPhone = parsePhoneNumber(phone, 'LK');
            const internationalPhone = formatedPhone?.formatInternational();
            if (!internationalPhone || (internationalPhone && !isValidPhoneNumber(internationalPhone, 'LK'))) {
                setPhoneError("Phone number is invalid");
            } else {
                setPhoneError("");
                setFormData({...formData, phone: internationalPhone});
            }
        }

    }, 300)

    const handleDateChange = (date: Date | null) => {
        setDate(date);
    }

    const handleBooking = async () => {
        try {
            const response = await fetch('/api/proxy/bills', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: 100,
                    description: 'Test bill',
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit bill');
            }

            const data = await response.json();
            setBookingResponse(data)
            console.log('Bill submitted successfully:', data);
        } catch (error) {
            console.error('Error submitting bill:', error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="max-w-lg mx-auto bg-white rounded-2xl">
                <div>
                    <div className="p-8 pb-0">
                        <h2 className="text-2xl font-bold mb-3">Doctor Appointment</h2>
                        <p className="text-gray-500">If you&#39;re logged in, you can also view your booking history for easy
                            access and management</p>
                    </div>

                    <div className="px-8 pt-6 pb-2">
                        <Select className="mb-3" value={doctorType} onChange={(e) => setDoctorType(e.target.value)}>
                            <option value="dental">Dental</option>
                            <option value="specialist">Specialist</option>
                        </Select>

                        <Datepicker
                            className="mb-3"
                            value={date}
                            onChange={handleDateChange}
                            minDate={new Date()}
                            maxDate={new Date(2025, 2, 20)}
                        />

                        <Select className="mb-1" value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
                            {doctors && doctors.map((doc) => (
                                <option key={doc.id} value={doc.name}>
                                    {doc.name}
                                </option>
                            ))}
                        </Select>

                        <div className="mb-3">
                            {doctorSelectError && (<div className="text-red-500 text-sm">{doctorSelectError}</div>)}
                        </div>


                        <Input
                            className="mb-3 w-full border border-gray-200 py-2 px-4 rounded-lg"
                            name="name"
                            placeholder="Patient's name"
                            onChange={handleChange}/>
                        <Input
                            className="mb-2 w-full border border-gray-200 py-2 px-4 rounded-lg"
                            name="phone"
                            placeholder="Your's phone"
                            onChange={handlePhoneChange}/>

                        {phoneError && <div className="text-red-500 text-sm mb-2 pl-1">
                            {phoneError}
                        </div>}

                        <div className="text-gray-400 mb-6 flex">
                            <InformationCircleIcon width={36} className="mb-2 mr-2 text-purple-600"/>
                            <span className="text-sm"> Enter the phone number you use regularly. This ensures your booking and clinical history are linked correctly.</span>
                        </div>

                        <Input
                            className="w-full border border-gray-200 py-2 mb-4 px-4 rounded-lg"
                            name="age"
                            placeholder="Patient's age"
                            onChange={handleChange}/>
                    </div>

                    <div className="flex gap-4 px-8">
                        <Button onClick={handleBooking} className="mt-4">Make Booking</Button>
                        <Button color={'gray'} onClick={onCloseBookingWindow} className="mt-4">Cancel</Button>
                    </div>
                </div>

                {bookingResponse && (
                    <Card className="mt-6">
                        <div>
                            <h3 className="text-lg font-bold">Booking Details</h3>
                            <p>Doctor: {bookingResponse.doctor_name}</p>
                            <p>Booking Number: {bookingResponse.booking_number}</p>
                            <p>Date: {bookingResponse.date}</p>
                            <p>Time: {bookingResponse.time}</p>
                            <p>Reference: {bookingResponse.reference}</p>
                            <p>Generated at: {bookingResponse.generated_at}</p>
                            <p>Bill ID: {bookingResponse.bill_id}</p>
                        </div>
                    </Card>
                )}


                <div className="p-8 text-center">
                    <a href="/login" className="mr-4 text-blue-500">Login</a>
                    <a href="/register" className="text-blue-500">Register</a>
                </div>
            </div>
        </div>
    );
}
export default DoctorBooking;