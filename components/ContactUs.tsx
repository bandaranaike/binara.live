"use client"
import React, {useState} from 'react';
import Loader from "@/components/Loader";
import {useUserContext} from "@/context/UserContext";

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
            const response = await fetch('/api/proxy/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, phone, email, message}),
            });

            if (!response.ok) {
                setError('There was a problem with this request.');
            } else {
                const result = await response.json();
                setResponse(result);
                setName('');
                setPhone('');
                setEmail('');
                setMessage('');
            }

        } catch (error) {
            console.error('Error:', error);
            setError('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="">
            <form onSubmit={handleSubmit}>
                <div className="lg:grid lg:grid-cols-3 lg:gap-4">
                    <div>
                        <label htmlFor="name">Name: <span className="text-red-500">*</span> </label>
                        <input
                            type="text"
                            className="border border-gray-300 rounded-lg bg-gray-50 w-full focus:ring-purple-400 focus:border-purple-400"
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
                            className="border border-gray-300 rounded-lg bg-gray-50 w-full focus:ring-purple-400 focus:border-purple-400"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:<span className="text-yellow-400">*</span></label>
                        <input
                            type="email"
                            className="border border-gray-300 rounded-lg bg-gray-50 w-full focus:ring-purple-400 focus:border-purple-400"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="col-span-3 mt-2">
                        <label htmlFor="message">Message: <span className="text-red-500">*</span></label>
                        <textarea
                            id="message"
                            className="border border-gray-300 rounded-lg bg-gray-50 w-full focus:ring-purple-400 focus:border-purple-400"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="flex gap-4 mt-6 items-center">
                    <button type="submit" disabled={loading} className="px-6 py-3 border rounded-full border-purple-600 bg-purple-600 text-white inline-block">
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>
                    {loading && <Loader/>}
                </div>
                <div className="">
                    {error && <div className="text-red-500">{error}</div>}
                    {response && <div className="text-green-600 border border-green-400 bg-green-50 rounded-lg py-3 px-6 mt-4">
                        {response.message} Your reference is : <span className="font-semibold">{response.reference}</span>
                    </div>}
                </div>
            </form>
        </div>
    );
};

export default ContactUs;