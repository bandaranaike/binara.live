"use client"
import React, {useState} from 'react';
import Loader from "@/components/form/Loader";
import {useUserContext} from "@/context/UserContext";
import axios from "@/lib/axios";

const ContactUs: React.FC = () => {
    const {user} = useUserContext()
    const [name, setName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [email, setEmail] = useState(user?.email || '');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [response, setResponse] = useState<{ message: string, reference: string }>();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setResponse(undefined);

        // Validation
        if (!name || !message) {
            setError('Name and Message are required.');
            return;
        }

        if (!phone && !email) {
            setError('Please provide either a phone number or an email.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            setError("")
            setResponse(undefined)
            axios.post('/contacts', {name, phone, email, message}).then(r => {
                setResponse(r.data);
                setName('');
                setPhone('');
                setEmail('');
                setMessage('');
            }).catch((e) => {
                const message = e.response?.data?.message ?? e.message ?? 'There was a problem with this request. Please try again.';
                setError(message);
            }).finally(() => {
                setLoading(false);
            })
        } catch (error: unknown) {
            console.error('Error :', error);
            setLoading(false);
            setError('Failed to send message. Please try again.');
        }
    };

    return (
        <div className="">
            <form onSubmit={handleSubmit}>
                <div className="lg:grid lg:grid-cols-3 lg:gap-4">
                    <div>
                        <label className="text-gray-700" htmlFor="name">Name: <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            className="border shadow-sm border-gray-200 rounded-lg w-full focus:ring-purple-400 focus:border-purple-400"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone: <span className="text-yellow-400">*</span></label>
                        <input
                            type="tel"
                            className="border shadow-sm border-gray-200 rounded-lg w-full focus:ring-purple-400 focus:border-purple-400"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:<span className="text-yellow-400">*</span></label>
                        <input
                            type="email"
                            className="border shadow-sm border-gray-200 rounded-lg w-full focus:ring-purple-400 focus:border-purple-400"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="col-span-3">
                        <label htmlFor="message">Message: <span className="text-red-500">*</span></label>
                        <textarea
                            id="message"
                            className="border shadow-sm  border-gray-200 rounded-lg w-full focus:ring-purple-400 focus:border-purple-400"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="flex gap-4 mt-4 items-center">
                    <button type="submit" disabled={loading}
                            className="px-6 py-3 border rounded-lg border-purple-800 bg-purple-700 text-white font-semibold inline-block">
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>
                    {loading && <Loader/>}
                </div>
                <div className="">
                    {error && <div
                        className="text-red-500 my-3 border border-red-400 bg-red-50 rounded-lg py-3 px-6 mt-4">{error}</div>}
                    {response &&
                        <div className="text-green-600 border border-green-400 bg-green-50 rounded-lg py-3 px-6 mt-4">
                            {response.message} Your reference is : <span
                            className="font-semibold">{response.reference}</span>
                        </div>}
                </div>
            </form>
        </div>
    );
};

export default ContactUs;