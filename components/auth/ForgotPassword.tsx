"use client"
import {useEffect, useState} from 'react';
import axios from "@/lib/axios";
import Loader from "@/components/form/Loader";
import {useUserContext} from "@/context/UserContext";
import {useRouter} from 'next/navigation';

const ForgotPassword = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const {user} = useUserContext()

    useEffect(() => {
        if (user?.token) {
            router.push('/dashboard');
        }
    }, [user, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            axios.post('/patient/forgot-password', {email})
                .then((res) => {
                    setMessage(res.data);
                })
                .catch((err) => {
                    setError(err.response.data);
                })
                .finally(() => setLoading(false));
        } catch (err) {
            console.error("Forgot Password Error:", err);
        }
    };

    return (
        <div className="page-wrap py-6 lg:py-10">
            <div className="mx-auto max-w-2xl hero-panel">
                <div className="relative z-10">
                <div className="section-kicker">Patient portal</div>
                <h2 className="mt-4 text-3xl font-black text-slate-900">Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="email" className="theme-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="theme-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {error && <div className="text-red-500 pt-2">{error}</div>}
                        {message && <div className="text-green-500 pt-2">{message}</div>}
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex gap-4 items-center">
                            <button
                                type="submit"
                                className={`theme-button ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </button>
                            {loading && <Loader/>}
                        </div>
                        <a href="/login" className="inline-block align-baseline text-sm text-purple-600 hover:text-pink-500">
                            Back to Login
                        </a>
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
