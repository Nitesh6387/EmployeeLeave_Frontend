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
    const filteredLeaves = selectedEmp ? leaves.filter((leave) => leave.employeeId?._id === selectedEmp) : leaves;
    return (
        <AdminDashboard>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Leave History</h2>
                <div className="mb-4">
                    <label className="mr-2 font-medium">Select Employee:</label>
                    <select
                        className="border px-2 py-1 rounded"
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
                        Total Leaves Taken: <span className="font-semibold">{filteredLeaves.length}</span>
                    </p>
                )}
                <div className="space-y-4">
                    {filteredLeaves.map((leave) => (

                        <div
                            key={leave._id}
                            className="border rounded p-4 bg-white shadow-sm text-sm"
                        >
                            <p><b>Employee:</b> {leave?.employeeId?.email}</p>
                            <p><b>Type:</b> {leave?.type}</p>
                            <p><b>From:</b> {leave?.from}</p>
                            <p><b>To:</b> {leave?.to}</p>
                            <p><b>Reason:</b> {leave?.reason}</p>
                            <p><b>Status:</b> {leave?.status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </AdminDashboard>
    );
}
