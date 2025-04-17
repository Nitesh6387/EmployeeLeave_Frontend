import { useSelector } from "react-redux";
import { GetLeavesByEmpId } from "../Services";
import { useEffect, useState } from "react";

export default function UserViewLeaves() {
    const user = useSelector((state) => state.auth.session)

    const [leaves, setLeaves] = useState([])
    const fetchLeavesData = async () => {
        const res = await GetLeavesByEmpId(user._id)
        if (res?.success) {
            setLeaves(res?.data)
        }
    }
    useEffect(() => {
        fetchLeavesData()
    }, [])
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
                    Your Leave History
                </h2>

                {leaves.length === 0 ? (
                    <p className="text-center text-gray-600">No leave records found.</p>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                        {leaves.map((leave, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow p-4 border-x-4"
                                style={{
                                    borderColor:
                                        leave.status === "Approved"
                                            ? "green"
                                            : leave.status === "Rejected"
                                                ? "red"
                                                : "orange",
                                }}
                            >
                                <p><strong>Type:</strong> {leave.type}</p>
                                <p><strong>From:</strong> {leave.from}</p>
                                <p><strong>To:</strong> {leave.to}</p>
                                <p><strong>Reason:</strong> {leave.reason}</p>
                                <p>
                                    <strong>Status:</strong>{" "}
                                    <span
                                        className={`font-semibold ${leave.status === "Approved"
                                            ? "text-green-600"
                                            : leave.status === "Rejected"
                                                ? "text-red-600"
                                                : "text-yellow-600"
                                            }`}
                                    >
                                        {leave.status}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
