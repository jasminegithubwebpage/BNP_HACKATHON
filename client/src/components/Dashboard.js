import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext"; // Importing UserContext

function Dashboard() {
  const { user} = useUser(); // Accessing the user context
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    //logout(); // Clears the user context
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <div className="mb-4">
          {/* Display the username at the top of the sidebar */}
          {user ? (
            <div className="text-lg font-semibold">{user.username}</div>
          ) : (
            <div className="text-lg font-semibold">Guest</div>
          )}
        </div>
        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <a href="#dashboard" className="flex items-center space-x-2 hover:text-blue-400">
              &#8634; <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#reports" className="flex items-center space-x-2 hover:text-blue-400">
              &#128202; <span>Reports</span>
            </a>
          </li>
          <li>
            <a href="#transactions" className="flex items-center space-x-2 hover:text-blue-400">
              &#128179; <span>Transactions</span>
            </a>
          </li>
          <li>
            <a href="#settings" className="flex items-center space-x-2 hover:text-blue-400">
              &#9881; <span>Settings</span>
            </a>
          </li>
          <li>
            <a href="#help" className="flex items-center space-x-2 hover:text-blue-400">
              &#10067; <span>Help</span>
            </a>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 hover:text-red-400 mt-6"
            >
              &#x274C; <span>Logout</span>
            </button>
          </li>
        </ul>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 bg-gray-100">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Welcome to the Dashboard</h1>
        </header>
        <section id="dashboard" className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700">&#8634; Dashboard</h2>
          <p className="text-lg text-gray-600">Overview of your platform's activity and stats.</p>
        </section>
        <section id="reports" className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700">&#128202; Reports</h2>
          <p className="text-lg text-gray-600">View detailed analytics and performance reports here.</p>
        </section>
        <section id="transactions" className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700">&#128179; Transactions</h2>
          <p className="text-lg text-gray-600">Manage and view all your financial transactions here.</p>
        </section>
        <section id="settings" className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700">&#9881; Settings</h2>
          <p className="text-lg text-gray-600">Find answers to your questions or contact support.</p>
        </section>
        <section id="help" className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700">&#10067; Help</h2>
          <p className="text-lg text-gray-600">Adjust your preferences and account details.</p>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
