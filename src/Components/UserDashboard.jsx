import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GetLeavesByEmpId } from "../Services";
import { logout } from '../Redux/Slices/authSlice'
import Swal from "sweetalert2";
export default function UserDashboard() {
    const user = useSelector((state) => state?.auth?.session);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const totalLeaves = 12;
    const [remainingLeaves, setRemainingLeaves] = useState(12);
    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        const fetchLeavesData = async () => {
            const res = await GetLeavesByEmpId(user?._id);
            if (res?.success) setLeaves(res?.data);
        };
        fetchLeavesData();
    }, []);

    useEffect(() => {
        setRemainingLeaves(totalLeaves - leaves?.length);
    }, [leaves]);

    const handleLogout = () => {
        Swal.fire({
            title: "Logout?",
            text: "Are you sure to want to Logout!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Logout!",
                    text: "Lougout Successfull",
                    icon: "success"
                });
                dispatch(logout());
                navigate("/");
            }
        });

    };

    if (user == null) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <h2 className="">You have to Login First to Access this page Content</h2>
                <button onClick={() => navigate('/')} className="px-6 py-2 border rounded-md bg-green-500 text-white">Login</button>
            </div>
        )
    }
    return (
        <div className="min-h-screen bg-gradient-to-r from-sky-100 to-blue-200 p-6">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold text-blue-800">User Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-100 hover:bg-red-200 text-red-700 font-semibold px-4 py-2 rounded-xl"
                    >
                        Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Link to="/apply-leave" className="block bg-green-100 hover:bg-green-200 text-green-800 font-semibold p-4 rounded-xl text-center">
                        Apply for Leave
                    </Link>
                    <Link to="/my-leaves" className="block bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-semibold p-4 rounded-xl text-center">
                        View My Leaves
                    </Link>
                    <div className="block bg-blue-100 text-blue-800 font-semibold p-4 rounded-xl text-center">
                        <p>Total Leave Balance: <span className="text-xl font-bold">{totalLeaves}</span></p>
                        <p>Total Leave Requested: <span className="text-xl font-bold">{leaves.length}</span></p>
                        <p>Remaining Leave Balance: <span className="text-xl font-bold">{remainingLeaves}</span></p>
                    </div>
                </div>

                <div className="mt-8 text-center text-gray-600">
                    Welcome, <span className="font-semibold capitalize">{user?.name}</span>!
                </div>
            </div>
        </div>
    );
}
