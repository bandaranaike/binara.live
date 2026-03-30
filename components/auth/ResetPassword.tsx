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
        <div className="page-wrap py-6 lg:py-10">
            <div className="mx-auto max-w-2xl hero-panel">
                <div className="relative z-10">
                <div className="section-kicker">Patient portal</div>
                <h2 className="mt-4 text-3xl font-black text-slate-900">Reset Password</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                {message && <div className="text-green-500 mb-4">{message}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="password" className="theme-label">New Password</label>
                        <input
                            type="password"
                            id="password"
                            className="theme-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="passwordConfirmation" className="theme-label">Confirm Password</label>
                        <input
                            type="password"
                            id="passwordConfirmation"
                            className="theme-input"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className={`theme-button ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                        {loading && <Loader/>}
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
};

export default ResetPassword;
