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
        <div className="flex justify-center items-center py-24 shadow-sm">
            <div className="bg-white p-12 rounded-2xl border border-gray-200 shadow-sm w-dvw max-w-2xl">
                <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-600 font-bold mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="border border-gray-300 rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:shadow-outline"
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
                                className={`bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </button>
                            {loading && <Loader/>}
                        </div>
                        <a href="/login" className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-700">
                            Back to Login
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
