import { useEffect, useState } from "react";
import AdminDashboard from "./AdminDashboard";
import { GetAllEmployees, GetAllLeaves } from "../Services";

export default function LeaveHistory() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmp, setSelectedEmp] = useState("");
    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const empRes = await GetAllEmployees();
            const leaveRes = await GetAllLeaves();
            if (empRes?.success) setEmployees(empRes.data);
            if (leaveRes?.success) setLeaves(leaveRes.data);
        };
        fetchData();
    }, []);

    const filteredLeaves = selectedEmp
        ? leaves.filter((leave) => leave.employeeId?._id === selectedEmp)
        : leaves;

    return (
        <AdminDashboard>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Leave History</h2>

                <div className="mb-4">
                    <label className="mr-2 font-medium text-gray-700">Select Employee:</label>
                    <select
                        className="border border-blue-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                        value={selectedEmp}
                        onChange={(e) => setSelectedEmp(e.target.value)}
                    >
                        <option value="">-- Select --</option>
                        {employees.map((emp) => (
                            <option key={emp?._id} value={emp?._id}>
                                {emp?.name} ({emp?.email})
                            </option>
                        ))}
                    </select>
                </div>

                {selectedEmp && (
                    <p className="mb-4 text-gray-700">
                        Total Leaves Taken:{" "}
                        <span className="inline-block bg-blue-100 text-blue-900 px-2 py-0.5 rounded font-semibold">
                            {filteredLeaves.length}
                        </span>
                    </p>
                )}

                {filteredLeaves.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-xl shadow-md overflow-hidden text-sm">
                            <thead className="bg-blue-100 text-blue-900">
                                <tr>
                                    <th className="px-6 py-5 border-b border-blue-200 text-left">Type</th>
                                    <th className="px-6 py-5 border-b border-blue-200 text-left">From</th>
                                    <th className="px-6 py-5 border-b border-blue-200 text-left">To</th>
                                    <th className="px-6 py-5 border-b border-blue-200 text-left">Reason</th>
                                    <th className="px-6 py-5 border-b border-blue-200 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLeaves.map((leave, index) => (
                                    <tr
                                        key={leave._id}
                                        className={
                                            index % 2 === 0
                                                ? "bg-white"
                                                : "bg-blue-50/30 hover:bg-blue-50"
                                        }
                                    >
                                        <td className="px-6 py-5 border-b border-blue-100">{leave?.type}</td>
                                        <td className="px-6 py-5 border-b border-blue-100">{leave?.from}</td>
                                        <td className="px-6 py-5 border-b border-blue-100">{leave?.to}</td>
                                        <td className="px-6 py-5 border-b border-blue-100">{leave?.reason}</td>
                                        <td className="px-6 py-5 border-b border-blue-100 font-bold text-lg">
                                            <span
                                                className={`px-2 py-1 rounded font-semibold text-sm${leave?.status === "Pending"? "bg-yellow-100 text-yellow-800": leave?.status === "Approved"? "bg-green-100 text-green-800" : leave?.status === "Rejected"? "bg-red-100 text-red-800": ""
                                                    }`}
                                            >
                                                {leave?.status}
                                            </span>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    selectedEmp && (
                        <p className="text-gray-600 italic mt-4">No leaves found for this employee.</p>
                    )
                )}
            </div>
        </AdminDashboard>
    );
}
