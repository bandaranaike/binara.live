"use client"
import React, {useEffect, useState} from 'react';
import axios from "@/lib/axios";
import Loader from "@/components/form/Loader";
import {useUserContext} from "@/context/UserContext";
import {useRouter} from "next/navigation";
import PhoneNumberInput from "@/components/form/PhoneNumberInput";
import parsePhoneNumber from "libphonenumber-js";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [phone, setPhone] = useState('');

    const router = useRouter();

    const {setUser, user} = useUserContext()

    useEffect(() => {
        if (user?.token) {
            router.push('/dashboard');
        }
    }, [user, router])

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        setError('');

        if (password !== password_confirmation) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        if (!phone) {
            setError('Please provide a valid phone number.');
            return;
        } else {
            const formatedPhone = parsePhoneNumber(phone, 'LK');
            if (!formatedPhone || (formatedPhone && !formatedPhone.isValid())) {
                setError('Please provide a valid phone number.');
                return;
            }
        }


        try {
            setLoading(true);
            axios.post('/patient/register', {name, email, password, password_confirmation, phone}).then(response => {
                setUser(response.data);
                router.push('/dashboard');
            }).catch(error => {
                setError(error.response.data.message); // Handle backend errors
            }).finally(() => setLoading(false));

        } catch (err) {
            console.error("Registration Error:", err);
        }
    };

    return (
        <div className="page-wrap py-6 lg:py-10">
            <div className="mx-auto max-w-2xl">
                <div className="section-kicker">Patient portal</div>
                <h2 className="mt-4 text-3xl font-black text-slate-900">Register</h2>
                <p className="mt-2 text-sm text-slate-600">Create your patient account to manage bookings more easily.</p>
                <form onSubmit={handleSubmit}>
                    <div className="">
                        <label htmlFor="name" className="theme-label">Name <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            placeholder="Your name"
                            id="name"
                            className="theme-input mb-3"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="">
                        <label htmlFor="phone" className="theme-label">Phone <span className="text-red-500">*</span></label>
                        <PhoneNumberInput onValidPhoneNumber={setPhone} isPhoneRequired={true}></PhoneNumberInput>
                    </div>
                    <div className="">
                        <label htmlFor="email" className="theme-label">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            id="email"
                            className="theme-input mb-3"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="">
                        <label htmlFor="password" className="theme-label">Password <span className="text-red-500">*</span></label>
                        <input
                            type="password"
                            placeholder="Password"
                            id="password"
                            className="theme-input mb-3"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password_confirmation" className="theme-label">Confirm Password <span className="text-red-500">*</span></label>
                        <input
                            type="password"
                            placeholder="Confirm password"
                            id="password_confirmation"
                            className="theme-input mb-3"
                            value={password_confirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="text-red-500 pb-3">{error}</div>}
                    <div className="flex items-center justify-between">
                        <div className="flex gap-4 items-center">
                            <button
                                type="submit"
                                className={`theme-button ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                                disabled={loading}
                            >
                                {loading ? 'Registering...' : 'Register'}

                            </button>
                            {loading && <Loader/>}
                        </div>
                        <a href="/login" className="inline-block align-baseline text-sm text-purple-600 hover:text-pink-500">
                            <span className="hidden lg:inline-block">Already have an account?</span> Log in
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
