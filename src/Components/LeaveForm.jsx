import { useState } from "react";
import Swal from "sweetalert2";
import { EmpLeaveApply } from "../Services";
import { useSelector } from "react-redux";
export default function ApplyLeave() {
  const user = useSelector((state) => state.auth.session)
  // console.log(user);

  const [leaveData, setLeaveData] = useState({
    employeeId: user?._id,
    from: "",
    to: "",
    type: "Sick Leave",
    reason: "",
  });


  // console.log(new Date().toISOString());
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveData({ ...leaveData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (leaveData.from < today || leaveData.to < today) {
      Swal.fire({
        title: "Invalid Input",
        text: "Dates can't be in the past.",
        icon: "error"
      });
      return;
    }
    if (leaveData.from > leaveData.to) {
      Swal.fire({
        title: "Invalid Input",
        text: "From date must be before To date.",
        icon: "error"
      });
      return;
    }
    else {
      const res = await EmpLeaveApply(leaveData)
      console.log(res);

      console.log("Leave Data:", leaveData);
      if (res?.success) {
        Swal.fire({
          title: "Leave",
          text: res.message,
          icon: "success"
        });
      }
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Apply for Leave</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">From Date</label>
            <input
              type="date"
              name="from"
              value={leaveData.from}
              onChange={handleChange}
              min={today}
              required
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">To Date</label>
            <input
              type="date"
              name="to"
              value={leaveData.to}
              onChange={handleChange}
              min={today}
              required
              className="w-full border px-4 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Leave Type</label>
            <select
              name="type"
              value={leaveData.type}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded-md"
            >
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Paid Leave">Paid Leave</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Reason</label>
            <textarea
              name="reason"
              value={leaveData.reason}
              onChange={handleChange}
              placeholder="Reason for leave"
              required
              className="w-full border px-4 py-2 rounded-md"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Submit Leave
          </button>
        </form>
      </div>
    </div>
  );
}
