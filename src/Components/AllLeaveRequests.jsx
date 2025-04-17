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
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
                    <thead className="bg-blue-100 text-blue-900">
                        <tr>
                            <th className="px-6 py-4 text-sm border-b border-blue-200">Employee Name</th>
                            <th className="px-6 py-4 text-sm border-b border-blue-200">Email</th>
                            <th className="px-6 py-4 text-sm border-b border-blue-200">Type</th>
                            <th className="px-6 py-4 text-sm border-b border-blue-200">From</th>
                            <th className="px-6 py-4 text-sm border-b border-blue-200">To</th>
                            <th className="px-6 py-4 text-sm border-b border-blue-200">Reason</th>
                            <th className="px-6 py-4 text-sm border-b border-blue-200">Status</th>
                            <th className="px-6 py-4 text-sm border-b border-blue-200 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaves.map((leave, index) => (
                            <tr
                                key={leave._id}
                                className={`hover:bg-blue-50 ${index % 2 === 1 ? "bg-blue-50/30" : "bg-white"
                                    }`}
                            >
                                <td className="px-6 py-4 border-b border-blue-100">{leave.employeeId.name}</td>
                                <td className="px-6 py-4 border-b border-blue-100">{leave.employeeId.email}</td>
                                <td className="px-6 py-4 border-b border-blue-100">{leave.type}</td>
                                <td className="px-6 py-4 border-b border-blue-100">{leave.from}</td>
                                <td className="px-6 py-4 border-b border-blue-100">{leave.to}</td>
                                <td className="px-6 py-4 border-b border-blue-100">{leave.reason}</td>
                                <td className="px-6 py-4 border-b border-blue-100 font-medium text-gray-700">
                                    {leave.status}
                                </td>
                                <td className="px-6 py-4 border-b border-blue-100 text-center">
                                    <div className="flex gap-2 justify-center">
                                        <button
                                            onClick={() => handleStatusUpdate(leave._id, "Approved")}
                                            className="bg-green-500 text-white px-3 py-1.5 rounded-md hover:bg-green-600 transition"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(leave._id, "Rejected")}
                                            className="bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </AdminDashboard>
    );

}
