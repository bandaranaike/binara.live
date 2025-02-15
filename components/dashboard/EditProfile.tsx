import React, {useState, useEffect, FC} from "react";
import axios from "axios";
import Loader from "@/components/form/Loader";

export interface User {
    email_verified_at: boolean | undefined;
    phone_verified_at: boolean | undefined;
    email: string;
    id: string;
    name: string;
    phone: string;
}

const EditProfile: FC<{ user: User }> = ({user}) => {
    const [formData, setFormData] = useState({
        name: user.name,
        phone: user.phone,
        email: user.email,
    });
    const [errors, setErrors] = useState({
        name: "",
        phone: "",
        email: ""
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setFormData({
            name: user.name,
            phone: user.phone,
            email: user.email,
        });
    }, [user]);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({
            name: "",
            phone: "",
            email: ""
        });
        setSuccessMessage("");

        try {
            axios.put(`/api/users/${user.id}`, formData)
                .then(() => setSuccessMessage("Profile updated successfully!"))
                .finally(() => setLoading(false));
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

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
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border shadow-sm border-gray-200 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.name && (
                        <p className="mt-2 text-sm text-red-600">{errors.name[0]}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border shadow-sm border-gray-200 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={user.phone_verified_at}
                    />

                    {user.phone_verified_at && (
                        <p className="mt-2 text-sm text-gray-500">Phone number is verified and cannot be changed.</p>
                    )}
                    {errors.phone && (
                        <p className="mt-2 text-sm text-red-600">{errors.phone[0]}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 shadow-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={user.email_verified_at}
                    />
                    {user.email_verified_at && (
                        <p className="mt-2 text-sm text-gray-500">Email is verified and cannot be changed.</p>
                    )}
                    {errors.email && (
                        <p className="mt-2 text-sm text-red-600">{errors.email[0]}</p>
                    )}
                </div>

                <div className="flex justify-end gap-2">
                    <div className="">
                        {loading && <Loader/>}
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;