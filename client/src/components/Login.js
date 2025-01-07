import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
  const [role, setRole] = useState('user'); // Default role is 'user'
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    confirmPassword: '',
    adminId: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    email: '',
    confirmPassword: '',
    adminId: '',
  });

  const navigate = useNavigate(); // Hook for navigation
  const { setUser } = useUser(); // Set user context

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    // Clear role-specific fields when role changes
    setFormData({ ...formData, username: '', password: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (isSignup && role === 'user' && !formData.username) {
      newErrors.username = 'Username is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    if (isSignup) {
      if (role === 'user' && !formData.email) {
        newErrors.email = 'Email is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (role === 'admin' && !formData.adminId) {
        newErrors.adminId = 'Admin ID is required';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        let response;
        let endpoint;
        let method;

        // Determine the API endpoint and method based on the form type (signup or login)
        if (isSignup) {
          endpoint = '/signup'; // Replace with the actual signup API endpoint
          method = 'POST';
        } else {
          endpoint = '/login'; // Replace with the actual login API endpoint
          method = 'POST';
        }

        // Prepare the data to be sent to the backend
        const requestData = {
          username: formData.username,
          password: formData.password,
          email: formData.email,
          confirmPassword: formData.confirmPassword,
          adminId: formData.adminId,
          role, // Ensure role is included in the body
        };

        // Send the request to the backend
        response = await fetch(`http://localhost:5000${endpoint}`, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the response from the backend
        const responseData = await response.json();

        if (response.ok) {
          const userRole = responseData.role; // Backend role response
          console.log(userRole);
          setUser({
            username: formData.username,
            adminId: formData.adminId,
            role: userRole,
          });

          // Navigate based on role
          if (userRole === 'admin') {
            navigate('/adminDashBoard');
          } else if (userRole === 'user') {
            navigate('/home');
          } else {
            navigate('/home'); // Fallback route
          }
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing your request.');
      }
    }
  };
  
  return (
    <div className="w-full max-w-sm mx-auto mt-20 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6">{isSignup ? 'Sign Up' : 'Login'}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
          <select
            id="role"
            value={role}
            onChange={handleRoleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {isSignup && role === 'user' && (
          <>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.username && <div className="text-red-500 text-sm">{errors.username}</div>}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
            </div>
          </>
        )}

        {isSignup && role === 'admin' && (
          <div className="mb-4">
            <label htmlFor="adminId" className="block text-sm font-medium text-gray-700">Admin ID</label>
            <input
              type="text"
              id="adminId"
              name="adminId"
              value={formData.adminId}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.adminId && <div className="text-red-500 text-sm">{errors.adminId}</div>}
          </div>
        )}

        {!isSignup && role === 'user' && (
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && <div className="text-red-500 text-sm">{errors.username}</div>}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            {role === 'admin' ? 'Admin Password' : 'Password'}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
        </div>

        {isSignup && (
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && <div className="text-red-500 text-sm">{errors.confirmPassword}</div>}
          </div>
        )}

        <div className="mb-4">
          <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </form>

      <div className="text-center">
        {isSignup ? (
          <p>
            Already have an account?{' '}
            <button onClick={() => setIsSignup(false)} className="text-blue-500 hover:underline">Login</button>
          </p>
        ) : (
          <p>
            Don't have an account?{' '}
            <button onClick={() => setIsSignup(true)} className="text-blue-500 hover:underline">Sign Up</button>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
