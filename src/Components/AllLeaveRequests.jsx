import { useEffect, useState } from "react";
import AdminDashboard from "./AdminDashboard";
import { GetAllLeaves, UpdateLeaveStatus } from "../Services";

export default function AllLeaveRequests() {
    const [leaves, setLeaves] = useState([]);
    const getAllLeaveRequests = async () => {
        const res = await GetAllLeaves();
        if (res?.success) {
            setLeaves(res?.data);
        }
    };
    const handleStatusUpdate = async (id, status) => {
        try {
            const res = await UpdateLeaveStatus(id, status);
            if (res?.success) {
                getAllLeaveRequests(); // refresh the list
            }
        } catch (err) {
            console.error("Failed to update leave status", err);
        }
    };

    useEffect(() => {
        getAllLeaveRequests();
    }, []);

    return (
        <AdminDashboard>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">All Leave Requests</h2>
                <div className="space-y-4">
                    {leaves.map((leave) => (
                        <div
                            key={leave._id}
                            className="bg-gray-100 p-4 rounded-xl shadow-sm border flex flex-col gap-2"
                        >
                            <div>
                                <p className="font-semibold">{leave.employeeId.name}</p>
                                <p className="text-sm text-gray-500">{leave.employeeId.email}</p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mt-2">
                                <p>
                                    <span className="font-medium">Type:</span> {leave.type}
                                </p>
                                <p>
                                    <span className="font-medium">From:</span> {leave.from}
                                </p>
                                <p>
                                    <span className="font-medium">To:</span> {leave.to}
                                </p>
                                <p>
                                    <span className="font-medium">Reason:</span> {leave.reason}
                                </p>
                                <p>
                                    <span className="font-medium">Status:</span> {leave.status}
                                </p>
                            </div>

                            <div className="flex gap-3 mt-2">
                                <button
                                    onClick={() => handleStatusUpdate(leave._id, "Approved")}
                                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate(leave._id, "Rejected")}
                                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminDashboard>
    );
}
