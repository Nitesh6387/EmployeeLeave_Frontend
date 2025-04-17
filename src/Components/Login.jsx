import { useState } from "react";
import { EmpLogin } from "../Services";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { login } from "../Redux/Slices/authSlice";

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const userLogin = async (e) => {
    e.preventDefault()
    const res = await EmpLogin({ email })
    if (res?.success) {
      Swal.fire({
        title: "Login",
        text: res?.message,
        icon: "success"
      })
      dispatch(login(res?.data))
      navigate('/user-dashboard')
    }
    else {
      Swal.fire({
        title: "Login",
        text: res?.message,
        icon: "error"
      })
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <form onSubmit={userLogin} className="bg-white p-8 rounded-2xl shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-700">Employee Login</h2>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
        <p className="text-center">Dont have an account? <Link to='/register' className="text-blue-400 font-semibold">Register</Link></p>
      </form>
      <p>Or</p>
      <button onClick={() => navigate('/admin/leaves')} className=" border bg-blue-600 text-white p-2 mt-2 rounded-md">GotoAdminDashboardPage</button>
    </div>
  );
}
