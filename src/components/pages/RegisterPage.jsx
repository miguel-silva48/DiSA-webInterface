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
  const [registrationError, setRegistrationError] = useState(false);
  const [registrationMethod, setRegistrationMethod] = useState('cmd'); // 'cmd' or 'normal'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRegister = async () => {
    setFormErrors({});
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
    if (!formData.nic || formData.nic.length != 8 || !/^\d+$/.test(formData.nic)) {
      newErrors.nic = "Civil number is required and should have 8 numbers";
    }

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
          navigate("/login");
        }
      } catch (error) {
        console.error("ERROR IN REGISTER:", error);
        setRegistrationError(true);
      }

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

  let client_id = "9113170755799990166";
  let state;

  if (!document.cookie.includes("state")) {
    state = crypto.randomUUID();
    document.cookie = `state=${state}; SameSite=Strict; Secure`;
  } else {
    state = document.cookie.split("=")[1]
  }

  return (
    <div className="flex flex-col h-screen">
      <Background />
      <div className="flex flex-col flex-grow">
        <Navbar />
        <div className="flex justify-center h-full p-20">
          <div className="w-[60%]">
            <h1 className="font-sans text-6xl font-extrabold bg-gradient-to-b from-[#6941C6] to-[#27164F] bg-clip-text text-transparent text-center mb-8 p-2">
              Create a DiSA account
            </h1>
            <div className="flex justify-center mb-8">
              <button
                className={`mr-4 p-2 rounded ${registrationMethod === 'cmd' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-black'}`}
                onClick={() => setRegistrationMethod('cmd')}
              >
                Register with CMD
              </button>
              <button
                className={`p-2 rounded ${registrationMethod === 'normal' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-black'}`}
                onClick={() => setRegistrationMethod('normal')}
              >
                Register with Email
              </button>
            </div>
            {registrationMethod === 'cmd' ? (
              <div className="w-full max-w-lg mx-auto bg-white rounded-xl shadow-md flex flex-col items-center justify-center p-5 opacity-80 max-h-[500px] gap-10">
                <div className="flex-grow flex flex-col items-center">
                  <p className="font-semibold text-center mb-4">
                    This app uses Autenticacao.gov to create accounts, please click the button below to start the registration process.
                  </p>
                  <Link
                    to={`https://preprod.autenticacao.gov.pt/oauth/askauthorization?redirect_uri=http://127.0.0.1:3000/cmd&client_id=${client_id}&state=${state}&scope=http://interop.gov.pt/MDC/Cidadao/NomeProprio%20http://interop.gov.pt/MDC/Cidadao/NIC&response_type=token`}
                    className="shadow-xl relative overflow-hidden flex items-center justify-center">
                    <img src={Auth} className="h-16 z-10 relative" alt="Autenticação com Chave Móvel Digital" />
                  </Link>
                </div>
                <div className="flex items-center justify-between">
                  <Link to="/" className="text-purple-600 hover:text-indigo-400">Back to HomePage</Link>
                </div>
              </div>
            ) : (
              <form className="w-full max-w-lg mx-auto border bg-white rounded-xl p-8 opacity-80 shadow-md">
                <div className="mb-6">
                  <label htmlFor="name" className="block font-semibold mb-2">Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 leading-tight focus:outline-none focus:shadow-outline" placeholder="Insert your full name here" />
                  {formErrors.name && <p className="text-red-500">{formErrors.name}</p>}
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block font-semibold mb-2">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 leading-tight focus:outline-none focus:shadow-outline" placeholder="Insert your email here" />
                  {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="block font-semibold mb-2">Password</label>
                  <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 leading-tight focus:outline-none focus:shadow-outline" placeholder="Insert your password here" />
                  {formErrors.password && <p className="text-red-500">{formErrors.password}</p>}
                </div>
                <div className="mb-6">
                  <label htmlFor="nic" className="block font-semibold mb-2">Civil Number</label>
                  <input type="text" id="nic" name="nic" value={formData.nic} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 leading-tight focus:outline-none focus:shadow-outline" placeholder="Insert your civil number here" />
                  {formErrors.nic && <p className="text-red-500">{formErrors.nic}</p>}
                </div>
                {registrationError && <p className="text-red-500 text-center">Registration Error: Invalid data!</p>}
                <div className="flex items-center justify-between">
                  <Link to="/" className="text-purple-600 hover:text-indigo-400">Back to HomePage</Link>
                  <button type="button" onClick={handleRegister} className="bg-purple-600 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;
