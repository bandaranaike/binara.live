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
        <div className="flex justify-center items-center lg:py-24 p-4 shadow-sm">
            <div className="bg-white lg:p-12 p-4 rounded-2xl border border-gray-200 shadow-sm w-dvw max-w-2xl">
                <h2 className="text-2xl font-bold mb-4 mt-2 lg:mt-0">Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-600 font-bold mb-2">Email or Phone</label>
                        <input
                            type="username"
                            id="username"
                            placeholder="Email or Phone"
                            className="border border-gray-300 rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:shadow-outline"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-600 font-bold mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="border border-gray-300 rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:shadow-outline"
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
                                className={`bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={loading} // Disable button while loading
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                            {loading && <Loader/>}
                            {error && <div className="text-red-500">{error}</div>}
                        </div>
                        <div className="flex gap-6">
                            <a href="/forget-password" className="inline-block align-baseline text-sm text-blue-600 hover:text-blue-700">
                                Forget password
                            </a>
                            <a href="/register" className="inline-block align-baseline text-sm text-blue-600 hover:text-blue-700">
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