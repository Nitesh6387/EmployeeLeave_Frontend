import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import LeaveForm from './Components/LeaveForm'
import Register from './Components/Register'
import AdminDashboard from './Components/AdminDashboard'
import UserDashboard from './Components/UserDashboard'
import UserViewLeaves from './Components/UserViewLeaves'
import AllLeaveRequests from './Components/AllLeaveRequests'
import LeaveHistory from './Components/LeaveHistory'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/apply-leave" element={<LeaveForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/leaves" element={<AllLeaveRequests />} />
        <Route path="/admin/leave-history" element={<LeaveHistory />} />

        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/my-leaves" element={<UserViewLeaves />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App