import React, { useState, useEffect, FC } from "react";
import Loader from "@/components/form/Loader";
import axios from "@/lib/axios";

export interface User {
    email_verified_at: boolean | undefined;
    phone_verified_at: boolean | undefined;
    email: string;
    id: string;
    name: string;
    phone: string;
}

const EditProfile: FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
    });
    const [errors, setErrors] = useState({
        name: "",
        phone: "",
        email: ""
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("/patient/user");
                setUser(response.data);
                setFormData({
                    name: response.data.name,
                    phone: response.data.phone,
                    email: response.data.email,
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUser();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({ name: "", phone: "", email: "" });
        setSuccessMessage("");
        setLoading(true);

        try {
            await axios.put(`/api/users/${user?.id}`, formData);
            setSuccessMessage("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <Loader />;

    return (
        <div className="p-4 bg-white rounded-lg border max-w-4xl shadow-sm border-gray-200">
            <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
            {successMessage && (
                <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
                    {successMessage}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.name && (
                        <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-2">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:shadow-outline"
                        disabled={user.phone_verified_at}
                    />
                    {user.phone_verified_at && (
                        <p className="mt-2 text-sm text-gray-500">Phone number is verified and cannot be changed.</p>
                    )}
                    {errors.phone && (
                        <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:shadow-outline"
                        disabled={user.email_verified_at}
                    />
                    {user.email_verified_at && (
                        <p className="mt-2 text-sm text-gray-500">Email is verified and cannot be changed.</p>
                    )}
                    {errors.email && (
                        <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                    )}
                </div>

                <div className="flex justify-end gap-2">
                    {loading && <Loader />}
                    <button
                        type="submit"
                        className="px-4 py-3 bg-purple-700 text-white rounded-lg font-bold hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
