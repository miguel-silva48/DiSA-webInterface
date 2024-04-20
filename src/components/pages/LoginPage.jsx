import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../constants/index.jsx";

import Navbar from "../layout/Navbar.jsx";
import Footer from "../layout/Footer.jsx";
import Background from "../layout/Background.jsx";


const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogin = async () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = "Username field is required!";
    }
    if (!formData.password) {
      newErrors.password = "Password field is required!";
    }
  
    // No errors, send the POST request
    if (Object.keys(newErrors).length === 0) {
      try {
        const params = new URLSearchParams();
        params.append('username', formData.username);
        params.append('password', formData.password);
  
        const response = await fetch(API_BASE_URL + "/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params.toString(),
        });
  
        if (!response.ok) {
          alert("Invalid credentials!");
          return;
        }
  
        const data = await response.json();
        console.log("LOGIN RESPONSE:", data);
        if (response.ok) {
            sessionStorage.setItem('username', formData.username);
            sessionStorage.setItem('token', data.token);
          alert("User logged in successfully!");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error('Error logging in:', error);
      }
    } else {
      setFormErrors(newErrors);
    }
  };
  

  return (
    <div>
      <Background />
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex justify-center h-full p-20">
          <div className="w-[60%]">
            <h1 className="font-sans text-6xl font-extrabold bg-gradient-to-b from-[#6941C6] to-[#27164F] bg-clip-text text-transparent text-center mb-8">
              Log in to your DiSA account
            </h1>
            <form className="w-full max-w-lg mx-auto border  bg-white rounded-lg p-8 shadow-md">
              <div className="mb-6">
                <label htmlFor="username" className="block text-gray-600 font-bold mb-2">Username</label>
                <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 leading-tight focus:outline-none focus:shadow-outline" placeholder="Insert your username here"/>
                {formErrors.username && <p className="text-red-500">{formErrors.username}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-600 font-bold mb-2">Password</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 leading-tight focus:outline-none focus:shadow-outline" placeholder="Insert your password here"/>
                {formErrors.password && <p className="text-red-500">{formErrors.password}</p>}
              </div>
              <div className="flex items-center justify-between">
                <Link to="/" className="text-purple-600 hover:text-indigo-400">Back to HomePage</Link>
                <button type="button" onClick={handleLogin} className="bg-purple-600 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
