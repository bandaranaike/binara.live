"use client"
import {useState} from 'react';
import axios from "@/lib/axios";
import Loader from "@/components/form/Loader";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        if (newPassword !== confirmPassword) {
            setError("New password and confirmation do not match.");
            setLoading(false);
            return;
        }

        try {
            axios.post('/patient/change-password', {
                current_password: currentPassword,
                new_password: newPassword,
                new_password_confirmation: confirmPassword
            })
                .then((res) => {
                    setMessage(res.data.message);
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                })
                .catch((err) => {
                    setError(err.response?.data?.message || "Something went wrong.");
                })
                .finally(() => setLoading(false));
        } catch (err) {
            console.error("Change Password Error:", err);
        }
    };

    return (
        <div className="flex justify-center items-center  shadow-sm">
            <div className="bg-white p-12 rounded-2xl border border-gray-200 shadow-sm w-dvw max-w-2xl">
                <h2 className="text-2xl font-bold mb-4">Change Password</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                {message && <div className="text-green-500 mb-4">{message}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="currentPassword" className="block text-gray-600 font-bold mb-2">Current Password</label>
                        <input
                            type="password"
                            id="currentPassword"
                            className="border border-gray-300 rounded-lg w-full py-3 px-6 leading-tight focus:outline-none focus:shadow-outline"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block text-gray-600 font-bold mb-2">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            className="border border-gray-300 rounded-lg w-full py-3 px-6 leading-tight focus:outline-none focus:shadow-outline"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-600 font-bold mb-2">Confirm New Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="border border-gray-300 rounded-lg w-full py-3 px-6 leading-tight focus:outline-none focus:shadow-outline"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className={`bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update Password'}
                        </button>
                        {loading && <Loader/>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
