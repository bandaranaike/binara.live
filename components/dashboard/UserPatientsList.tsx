import React, {useState, useEffect} from "react";
import Loader from "@/components/form/Loader";
import axios from "@/lib/axios";
import {PencilSquareIcon, PlusIcon, TrashIcon} from "@heroicons/react/24/outline";

interface Patient {
    id: string;
    name: string;
    age: number;
    address: string;
    telephone: string;
    birthday: string;
    gender: string;
}

const UserPatientsList: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<Patient |null>({
        id: "",
        name: "",
        age: 0,
        address: "",
        telephone: "",
        birthday: "",
        gender: "",
    });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [patientToDelete, setPatientToDelete] = useState<string | null>(null);
    const [patientsFetchError, setPatientsFetchError] = useState<string | null>(null);

    // Fetch patients from API
    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        setPatientsFetchError('')
        setLoading(true)
        axios.get("/patient/user-patients")
            .then(response => setPatients(response.data))
            .catch(error => setPatientsFetchError(error.response.data.message))
            .finally(() => setLoading(false));
    };

    const handleEdit = (patient: Patient) => {
        setSelectedPatient(patient);
        setIsEditModalOpen(true);
    };

    const handleDelete = (id: string) => {
        setPatientToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (patientToDelete) {
            // Replace with your API call
            await fetch(`/api/patients/${patientToDelete}`, {method: "DELETE"});
            fetchPatients(); // Refresh the list
            setIsDeleteModalOpen(false);
            setPatientToDelete(null);
        }
    };

    const savePatient = async (patient: Patient) => {
        const url = patient.id ? `/api/patients/${patient.id}` : "/api/patients";
        const method = patient.id ? "PUT" : "POST";

        // Replace with your API call
        await fetch(url, {
            method,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(patient),
        });

        fetchPatients(); // Refresh the list
        setIsEditModalOpen(false);
        setIsCreateModalOpen(false);
        setSelectedPatient(null);
    };

    return (
        <div className="border border-gray-200 rounded-xl">
            <div className="border-b border-gray-200 p-4">
                <div className="flex justify-between">
                    <div>
                        <h3 className="text-xl font-bold mb-2">Appointment history</h3>
                        <p className="text-gray-500 text-sm">Manage your patients who have booked appointments under your account.</p>
                    </div>
                    <div>
                        <button
                            title="Add new patient"
                            onClick={() => setIsCreateModalOpen(true)}
                            className="mr-4 flex gap-1 border border-gray-300 rounded py-1 mt-4 px-2 text-sm hover:border-green-500"
                        >
                            <PlusIcon width={14}/> Add new patient
                        </button>
                    </div>
                </div>

            </div>

            {patientsFetchError && <div className="p-6 border-b border-gray-200 text-yellow-600">{patientsFetchError}</div>}
            {loading && <div className="p-6 border-t border-gray-200"><Loader/></div>}
            {patients.length &&

                <table className="w-full">
                    <thead>
                    <tr className="border-b-2 border-gray-200 text-left">
                        <th className="py-2 px-4 border-r">Name</th>
                        <th className="py-2 px-4 border-r">Age</th>
                        <th className="py-2 px-4 border-r">Address</th>
                        <th className="py-2 px-4 border-r">Telephone</th>
                        <th className="py-2 px-4 border-r">Birthday</th>
                        <th className="py-2 px-4 border-r">Gender</th>
                        <th className="py-2 px-4">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.id} className="border-b border-gray-200 last:border-b-0 text-sm">
                            <td className="py-2 px-4 border-r">{patient.name}</td>
                            <td className="py-2 px-4 border-r">{patient.age}</td>
                            <td className="py-2 px-4 border-r">{patient.address}</td>
                            <td className="py-2 px-4 border-r">{patient.telephone}</td>
                            <td className="py-2 px-4 border-r">{patient.birthday}</td>
                            <td className="py-2 px-4 border-r">{patient.gender}</td>
                            <td className="py-1 px-4 flex gap-2">
                                <button
                                    onClick={() => handleEdit(patient)}
                                    className="flex gap-1 border border-gray-300 rounded py-0.5 px-2 hover:border-yellow-500"
                                >
                                    <PencilSquareIcon width={14}/> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(patient.id)}
                                    className="flex gap-1 border border-gray-300 rounded py-0.5 px-2 hover:border-red-500"
                                >
                                    <TrashIcon width={14}/> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table> || <div className="p-6 text-sm text-center text-gray-400">There are no history records</div>}


            {/* Edit Modal */}
            {isEditModalOpen && selectedPatient && (
                <PatientModal
                    patient={selectedPatient}
                    onSave={savePatient}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )}

            {/* Create Modal */}
            {isCreateModalOpen && (
                <PatientModal
                    onSave={savePatient}
                    onClose={() => setIsCreateModalOpen(false)}
                />
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded">
                        <p>Are you sure you want to delete this patient?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

interface PatientModalProps {
    patient?: Patient;
    onSave: (patient: Patient) => void;
    onClose: () => void;
}

const PatientModal: React.FC<PatientModalProps> = ({patient, onSave, onClose}) => {
    const [formData, setFormData] = useState<Patient>(
        patient || {
            id: "",
            name: "",
            age: 0,
            address: "",
            telephone: "",
            birthday: "",
            gender: "",
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl w-1/3">
                <h2 className="text-xl font-bold mb-4">{patient ? "Edit Patient" : "Add New Patient"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Patient name"
                            value={formData.name || ''}
                            onChange={handleChange}
                            className="border shadow-sm border-gray-200 rounded-lg w-full focus:ring-purple-400 focus:border-purple-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Age</label>
                        <input
                            type="number"
                            placeholder="Patient age"
                            name="age"
                            value={formData.age || ''}
                            onChange={handleChange}
                            className="border shadow-sm border-gray-200 rounded-lg w-full focus:ring-purple-400 focus:border-purple-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Address</label>
                        <input
                            type="text"
                            placeholder="Address"
                            name="address"
                            value={formData.address || ''}
                            onChange={handleChange}
                            className="border shadow-sm border-gray-200 rounded-lg w-full focus:ring-purple-400 focus:border-purple-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Telephone</label>
                        <input
                            type="text"
                            name="telephone"
                            placeholder="Telephone"
                            value={formData.telephone || ''}
                            onChange={handleChange}
                            className="border shadow-sm border-gray-200 rounded-lg w-full focus:ring-purple-400 focus:border-purple-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Birthday</label>
                        <input
                            type="date"
                            name="birthday"
                            placeholder="Birthday"
                            value={formData.birthday || ''}
                            onChange={handleChange}
                            className="border shadow-sm border-gray-200 rounded-lg w-full focus:ring-purple-400 focus:border-purple-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Gender</label>
                        <input
                            type="text"
                            name="gender"
                            placeholder="Gender"
                            value={formData.gender || ''}
                            onChange={handleChange}
                            className="border shadow-sm border-gray-200 rounded-lg w-full focus:ring-purple-400 focus:border-purple-400"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border rounded-lg border-gray-600 bg-white inline-block"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="font-semibold px-8 py-2 border rounded-lg border-purple-800 bg-purple-700 text-white inline-block">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserPatientsList;