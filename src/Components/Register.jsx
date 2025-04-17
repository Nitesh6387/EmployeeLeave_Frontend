import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EmpRegister } from "../Services";
import Swal from "sweetalert2";
export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
   
    e.preventDefault();
    const res = await EmpRegister(formData);
    // console.log(res);
    if (res?.code == 201) {
      Swal.fire({
        title: "Register",
        text: res?.message,
        icon: "success"
      })
      navigate('/')
    }
    else {
      Swal.fire({
        title: "Register",
        text: res?.message,
        icon: "error"
      })
    }

  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center text-green-700">Employee Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Register
        </button>
        <p className="text-center">Dont have an account? <Link to='/' className="text-blue-400 font-semibold">Login</Link></p>

      </form>
    </div>
  );
}
