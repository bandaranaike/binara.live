"use client"
import React, {useEffect, useState} from 'react';
import axios from "@/lib/axios";
import {useUserContext} from "@/context/UserContext";
import {useRouter} from 'next/navigation';
import CustomCheckbox from "@/components/form/CustomCheckbox";
import Loader from "@/components/form/Loader";

const Login = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [remember, setRemember] = useState<boolean>(false)

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

        try {
            axios.post('/patient/login', {username, password, remember}).then((res) => {
                setUser(res.data);
                router.push('/dashboard');
            }).catch((err) => {
                setError(err.response.data.message);
            }).finally(() => setLoading(false));

        } catch (err) {
            console.error("Login Error:", err); // Log the full error for debugging
        }
    };

    return (
        <div className="page-wrap py-6 lg:py-10">
            <div className="mx-auto max-w-2xl">
                    <div className="section-kicker">Patient portal</div>
                    <h2 className="mt-4 text-3xl font-black text-slate-900">Login</h2>
                    <p className="mt-2 text-sm text-slate-600">Access your dashboard, appointments, and account details.</p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="theme-label">Email or Phone</label>
                        <input
                            type="username"
                            id="username"
                            placeholder="Email or Phone"
                            className="theme-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="theme-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="theme-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6 flex gap-4">
                        <CustomCheckbox setChecked={setRemember} checked={remember}/> Remember me
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex gap-4 items-center">
                            <button
                                type="submit"
                                className={`theme-button ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                                disabled={loading} // Disable button while loading
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                            {loading && <Loader/>}
                            {error && <div className="text-red-500">{error}</div>}
                        </div>
                        <div className="flex gap-6">
                            <a href="/forget-password" className="inline-block align-baseline text-sm text-purple-600 hover:text-pink-500">
                                Forget password
                            </a>
                            <a href="/register" className="inline-block align-baseline text-sm text-purple-600 hover:text-pink-500">
                                Register
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
