"use client"
import React, {useEffect, useState} from 'react';
import axios from "@/lib/axios";
import Loader from "@/components/Loader";
import {useUserContext} from "@/context/UserContext";
import {useRouter} from "next/navigation";
import PhoneNumberInput from "@/components/PhoneNumberInput";

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
        setLoading(true);
        setError('');

        if (password !== password_confirmation) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        if (!phone && !email) {
            setError('Please provide either a phone number or an email.');
            return;
        }


        try {
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
        <div className="flex justify-center items-center py-24 bg-gray-100">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm w-dvw max-w-2xl">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="">
                        <label htmlFor="name" className="block text-gray-600 font-bold mb-2">Name <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            placeholder="Your name"
                            id="name"
                            className="mb-3 w-full border border-gray-200 py-2 px-4 rounded-lg"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="">
                        <label htmlFor="phone" className="block text-gray-600 font-bold mb-2">Phone <span className="text-yellow-400">*</span></label>
                        <PhoneNumberInput onValidPhoneNumber={setPhone}></PhoneNumberInput>
                    </div>
                    <div className="">
                        <label htmlFor="email" className="block text-gray-600 font-bold mb-2">Email <span className="text-yellow-400">*</span></label>
                        <input
                            type="email"
                            id="email"
                            className="mb-3 w-full border border-gray-200 py-2 px-4 rounded-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="">
                        <label htmlFor="password" className="block text-gray-600 font-bold mb-2">Password <span className="text-red-500">*</span></label>
                        <input
                            type="password"
                            id="password"
                            className="mb-3 w-full border border-gray-200 py-2 px-4 rounded-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password_confirmation" className="block text-gray-600 font-bold mb-2">Confirm Password <span className="text-red-500">*</span></label>
                        <input
                            type="password"
                            id="password_confirmation"
                            className="mb-3 w-full border border-gray-200 py-2 px-4 rounded-lg"
                            value={password_confirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex gap-4 items-center">
                            <button
                                type="submit"
                                className={`bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={loading}
                            >
                                {loading ? 'Registering...' : 'Register'}

                            </button>
                            {loading && <Loader/>}
                            {error && <div className="text-red-500">{error}</div>}
                        </div>
                        <a href="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-700">
                            Login
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;