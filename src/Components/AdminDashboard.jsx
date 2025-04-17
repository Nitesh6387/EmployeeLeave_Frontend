import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function AdminDashboard({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen">
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } lg:block w-64 bg-gray-800 text-white p-6 fixed inset-0 z-50 md:z-auto md:static transition-all duration-300`}
      >
        <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <NavLink
            to="/admin/leaves"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-700 px-4 py-2 rounded-md"
                : "hover:bg-gray-700 px-4 py-2 rounded-md"
            }
          >
            All Leave Requests
          </NavLink>
          <NavLink
            to="/admin/leave-history"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-700 px-4 py-2 rounded-md"
                : "hover:bg-gray-700 px-4 py-2 rounded-md"
            }
          >
            Leave History
          </NavLink>
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="lg:hidden fixed inset-0 bg-black opacity-50 z-40"
        />
      )}

      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-[-5px] left-4 bg-blue-800 text-white p-1 rounded-md z-50"
      >
        {sidebarOpen ? "Close" : "Open"} Menu
      </button>

      <main
        className={`${
          sidebarOpen ? "w-full" : "ml-0"
        } flex-1 p-6 bg-blue-200 overflow-y-auto transition-all duration-300 lg:ml-0`}
      >
        {children}
      </main>
    </div>
  );
}
