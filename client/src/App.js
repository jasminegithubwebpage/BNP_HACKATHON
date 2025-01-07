import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import UserContext, { UserProvider }  from './components/UserContext'
import PredictionPage from './components/PredictionPage'
function App() {
  return (
    <div className="App">
      <UserProvider>
        <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PredictionPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home"  element={<Dashboard />} />
          <Route path="/adminDashBoard" element={<AdminDashboard />} />
        </Routes>
        </Router>
        </UserProvider>
    </div>
  );
}

export default App;
