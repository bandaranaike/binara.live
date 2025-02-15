"use client"
import {useState, useEffect} from 'react';
import {useSearchParams, useParams, useRouter} from 'next/navigation';
import axios from "@/lib/axios";
import Loader from "@/components/form/Loader";

const ResetPassword = () => {
    const router = useRouter();
    const params = useParams(); // Get token from URL path
    const searchParams = useSearchParams();
    const token = params?.token;
    const email = searchParams.get("email"); // Extract email from URL

    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!token) {
            setError("Invalid or expired reset link.");
        }
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        if (!token) {
            setError("Invalid token.");
            setLoading(false);
            return;
        }

        try {
            axios.post('/patient/reset-password', {token, email, password, password_confirmation: passwordConfirmation})
                .then((res) => {
                    setMessage(res.data.message);
                    router.push('/login'); // Redirect to login page
                })
                .catch((err) => {
                    setError(err.response.data);
                })
                .finally(() => setLoading(false));
        } catch (err) {
            console.error("Reset Password Error:", err);
        }
    };

    return (
        <div className="flex justify-center items-center py-24 shadow-sm">
            <div className="bg-white p-12 rounded-2xl border border-gray-200 shadow-sm w-dvw max-w-2xl">
                <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                {message && <div className="text-green-500 mb-4">{message}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600 font-bold mb-2">New Password</label>
                        <input
                            type="password"
                            id="password"
                            className="border border-gray-300 rounded-lg w-full py-3 px-6 leading-tight focus:outline-none focus:shadow-outline"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="passwordConfirmation" className="block text-gray-600 font-bold mb-2">Confirm Password</label>
                        <input
                            type="password"
                            id="passwordConfirmation"
                            className="border border-gray-300 rounded-lg w-full py-3 px-6 leading-tight focus:outline-none focus:shadow-outline"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className={`bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                        {loading && <Loader/>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
