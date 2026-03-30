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
        <div className="content-panel">
            <div className="mb-6">
                <div className="section-kicker">Send a message</div>
                <h2 className="section-subtitle mt-4">We’re here to help</h2>
                <p className="section-copy mt-2">Share your question and our team will get back to you as soon as possible.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="lg:grid lg:grid-cols-3 lg:gap-4">
                    <div>
                        <label className="theme-label" htmlFor="name">Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            className="theme-input"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="theme-label" htmlFor="phone">Phone <span className="text-yellow-400">*</span></label>
                        <input
                            type="tel"
                            className="theme-input"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="theme-label" htmlFor="email">Email <span className="text-yellow-400">*</span></label>
                        <input
                            type="email"
                            className="theme-input"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="col-span-3">
                        <label className="theme-label" htmlFor="message">Message <span className="text-red-500">*</span></label>
                        <textarea
                            id="message"
                            className="theme-input min-h-36"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="flex gap-4 mt-4 items-center">
                    <button type="submit" disabled={loading} className="theme-button">
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>
                    {loading && <Loader/>}
                </div>
                <div className="">
                    {error && <div
                        className="mt-4 rounded-xl border border-red-200 bg-red-50 py-3 px-6 text-red-500">{error}</div>}
                    {response &&
                        <div className="mt-4 rounded-xl border border-green-200 bg-green-50 py-3 px-6 text-green-600">
                            {response.message} Your reference is : <span
                            className="font-semibold">{response.reference}</span>
                        </div>}
                </div>
            </form>
        </div>
    );
};

export default ContactUs;
