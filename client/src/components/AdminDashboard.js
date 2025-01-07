import React from "react";
import { useNavigate } from "react-router-dom";


function AdminDashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
    //logout(); // Clears the user context
    navigate("/login"); // Redirect to login page
  };
    const transactions = [
      { name: "Ethan Pierce", type: "Cash-out", id: "001", amount: "$10.00" },
      { name: "Julian Rivera", type: "Cash-out", id: "101", amount: "$235.00" },
      { name: "Liam Davies", type: "Cash-out", id: "346", amount: "$54.75" },
      { name: "Alexander Chen", type: "Cash-in", id: "125", amount: "$2005.50", highlight: true },
      { name: "Noah Bennett", type: "Cash-out", id: "890", amount: "$2100.05" },
      { name: "Gabriel Ramirez", type: "Cash-out", id: "123", amount: "$100.00" },
      { name: "Elijah Walker", type: "Cash-in", id: "689", amount: "$601.00" },
      { name: "Mateo Hernandez", type: "Cash-out", id: "114", amount: "$10.99" },
      { name: "Luca Johnson", type: "Cash-in", id: "178", amount: "$500.00" },
      { name: "Caleb Moore", type: "Cash-out", id: "758", amount: "$18.79" },
    ];
  
    return (
      <div className="bg-blue-100 p-4 min-h-screen">
        <div className="max-w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex">
          {/* Sidebar */}
          <div className="w-1/4 bg-teal-700 text-white">
            <div className="p-4">
              <h1 className="text-2xl font-bold">InnoFort</h1>
            </div>
            <ul>
              {transactions.map((transaction, index) => (
                <li
                  key={index}
                  className={`border-b border-teal-600 px-4 py-2 flex items-center justify-between ${
                    transaction.highlight ? "bg-teal-800" : ""
                  }`}
                >
                  <span>{transaction.name}</span>
                  <span
                    className={transaction.type === "Cash-in" ? "text-green-500" : "text-red-500"}
                  >
                    {transaction.type}
                  </span>
                  <span>{transaction.id}</span>
                  <span>{transaction.amount}</span>
                </li>
              ))}
            </ul>
          </div>
  
          {/* Main Content */}
          <div className="w-3/4 bg-white">
            <div className="p-4 border-b bg-teal-50">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">Fraudulent Activity Alert</h2>
                <div className="flex items-center text-gray-600">
                  <i className="fas fa-user-circle mr-2"></i>
                  <span>Liam Hernandez</span>
                </div>
                <div className="flex items-center text-gray-600">
                <button
              onClick={handleLogout}
              className="flex items-center space-x-2 hover:text-red-400 mt-6"
            >
              &#x274C; <span>Logout</span>
            </button>
                </div>
                
              </div>
            </div>
            <div className="p-4">
              <div className="bg-teal-800 text-white p-4 rounded flex items-center justify-between">
                <div>
                  <span className="block text-lg font-semibold">Alexander Chen</span>
                  <span className="text-sm">923128 | 11/5/2022 3:12 PST</span>
                </div>
                
                <div>
                  <span>Cash-in</span>
                  <span className="text-lg font-semibold">$2005.50</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {/* Summary Section */}
                <div className="p-4 border rounded">
                  <h3 className="font-bold">Summary</h3>
                  <div className="flex items-center mt-2">
                    <span className="font-semibold mr-2">Payment:</span>
                    <img
                      src="https://placehold.co/20x20"
                      alt="Visa logo"
                      className="inline-block"
                    />
                  </div>
                  <div className="mt-2">
                    <span className="font-semibold">CVV2 Response: </span>
                    <span className="text-red-500">CVV2 Match (M)</span>
                  </div>
                  <div className="mt-2">
                    <span className="font-semibold">AVS Response: </span>
                    <span className="text-green-500">Full Match (Y)</span>
                  </div>
                  <div className="mt-2">
                    <span className="font-semibold">Number: </span>
                    <span>1237 45xx xxxx</span>
                  </div>
                  <div className="mt-2">
                    <span className="font-semibold">Bank: </span>
                    <span>AMERICAN EXPRESS INTERNATIONAL (NZ) INC.</span>
                  </div>
                </div>
                {/* ATM Section */}
                <div className="p-4 border rounded">
                  <h3 className="font-bold">ATM</h3>
                  <div className="mt-2">332 Patterson Street</div>
                  <img
                    src="https://placehold.co/300x200"
                    alt="Map showing location at 332 Patterson Street"
                    className="mt-2 w-full h-full border rounded"
                  />
                </div>
              </div>
              <div className="mt-4 p-4 border rounded">
                <h3 className="font-bold">Account</h3>
                <div className="mt-2">
                  <span className="font-semibold">Number: </span>
                  <span>923128</span>
                </div>
                <div className="mt-2">
                  <span className="font-semibold">Order Amount: </span>
                  <span>$2005.50</span>
                </div>
                <div className="mt-2">
                  <span className="font-semibold">Creation Date: </span>
                  <span>11/5/2022 3:12 PST</span>
                </div>
                <div className="mt-2">
                  <span className="font-semibold">Update Date: </span>
                  <span>11/5/2022 3:12 PST</span>
                </div>
                <div className="mt-2">
                  <span className="font-semibold">Last Order Ext. ID: </span>
                  <span>871100455592</span>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button className="bg-teal-800 text-white px-4 py-2 rounded-lg">Approve</button>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg">Decline</button>
                <button className="bg-teal-600 text-white px-4 py-2 rounded-lg">Analyze</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  

export default AdminDashboard;
