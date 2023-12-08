// Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
const Login = ({setAuthenticate}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    userRole: 'admin', // Default user role
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const url = 'http://localhost:5001/login'
    const response = await axios.post(url, {
      username: formData.username,
      password: formData.password,
      userRole: formData.userRole,
    });

  
    if (response.status === 200  ) {
      // Redirect based on user role
      setAuthenticate(true);
      if (formData.userRole === 'admin') {
        navigate('/admindashboard');
      } else {
        navigate('/userdashboard');
      }
    } else {
      setError('Invalid credentials. Please try again.');
    }
  } catch (error) {
    console.error('Error during login:', error);
    setError('Invalid credentials. Please try again.');
  }
};


  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" className="block mb-2">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />

          <label htmlFor="password" className="block mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />

          <label className="block mb-2">User Role:</label>
          <div className="mb-4">
            <label className="mr-4">
              <input
                type="radio"
                id="admin"
                name="userRole"
                value="admin"
                checked={formData.userRole === 'admin'}
                onChange={handleChange}
              />
              Admin
            </label>
            <label>
              <input
                type="radio"
                id="user"
                name="userRole"
                value="user"
                checked={formData.userRole === 'user'}
                onChange={handleChange}
              />
              User
            </label>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Login
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <p className="mt-4">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
