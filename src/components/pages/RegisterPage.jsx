import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../constants/index.jsx";

import Navbar from "../layout/Navbar.jsx";
import Footer from "../layout/Footer.jsx";
import Background from "../layout/Background.jsx";

import Auth from "/autenticacao_gov.png";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    nic: ""
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRegister = async () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 3) {
      newErrors.name = "Name field is required and should have at least 3 characters";
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email field is required and should be a valid email";
    }
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "Password field is required and should have at least 8 characters";
    }
    if (!formData.nic || formData.nic.length < 9 || !/^\d+$/.test(formData.nic)) {
      newErrors.nic = "Civil number is required and should have exclusively numbers (9 or more)";
    }

    //No errors, send the POST request
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch(API_BASE_URL + "/users/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        console.log("REGISTER RESPONSE:", data);
        if (response.ok) {
          alert("User registered successfully!");
          navigate("/login"); //TODO - auto login and send to dashboard?
        }
      } catch (error) {
        console.error("ERROR IN REGISTER:", error);
        alert("Error registering user, please try again later.");
      }

      //Clean up to avoid resending the same data
      setFormData({
        name: "",
        email: "",
        password: "",
        nic: ""
      });
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
              Create a DiSA account
            </h1>
            <form className="w-full max-w-lg mx-auto border  bg-white rounded-lg p-8 shadow-md">
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-600 font-bold mb-2">Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 leading-tight focus:outline-none focus:shadow-outline" placeholder="Insert your full name here"/>
                {formErrors.name && <p className="text-red-500">{formErrors.name}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-600 font-bold mb-2">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 leading-tight focus:outline-none focus:shadow-outline" placeholder="Insert your email here"/>
                {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-600 font-bold mb-2">Password</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 leading-tight focus:outline-none focus:shadow-outline" placeholder="Insert your password here"/>
                {formErrors.password && <p className="text-red-500">{formErrors.password}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="nic" className="block text-gray-600 font-bold mb-2">Civil Number</label>
                <input type="text" id="nic" name="nic" value={formData.nic} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 leading-tight focus:outline-none focus:shadow-outline" placeholder="Insert your civil number here [temporary]"/>
                {formErrors.nic && <p className="text-red-500">{formErrors.nic}</p>}
              </div>
              <div className="mb-6">
                <img src={Auth} className="w-1/2 mx-auto" alt="Autenticação com Chave Móvel Digital" />
              </div>
              <div className="flex items-center justify-between">
                <Link to="/" className="text-purple-600 hover:text-indigo-400">Back to HomePage</Link>
                <button type="button" onClick={handleRegister} className="bg-purple-600 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;
