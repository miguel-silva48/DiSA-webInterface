import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../constants/index.jsx";

import Navbar from "../layout/Navbar.jsx";
import Footer from "../layout/Footer.jsx";
import Background from "../layout/Background.jsx";
import Auth from "/autenticacao_gov.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [loginMethod, setLoginMethod] = useState('cmd'); // 'normal' or 'cmd'

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
          sessionStorage.setItem('access_token', data.access_token);
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

  let client_id = "";
  let state;

  if (!document.cookie.includes("state")) {
    state = crypto.randomUUID();
    document.cookie = `state=${state}; SameSite=Strict; Secure`;
  } else {
    state = document.cookie.split("=")[1];
  }

  return (
    <div className="flex flex-col h-screen">
      <Background />
      <div className="flex flex-col flex-grow">
        <Navbar />
        <div className="flex justify-center h-full p-20">
          <div className="w-[60%]">
            <h1 className="font-sans text-6xl font-extrabold bg-gradient-to-b from-[#6941C6] to-[#27164F] bg-clip-text text-transparent text-center mb-8 p-2">
              Log in to your DiSA account
            </h1>
            <div className="flex justify-center mb-8">
              <button
                className={`mr-4 p-2 rounded ${loginMethod === 'cmd' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-black'}`}
                onClick={() => setLoginMethod('cmd')}
              >
                Login with CMD
              </button>
              <button
                className={`p-2 rounded ${loginMethod === 'normal' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-black'}`}
                onClick={() => setLoginMethod('normal')}
              >
                Login with Email
              </button>
            </div>
            {loginMethod === 'cmd' ? (
              <div className="w-full max-w-lg mx-auto bg-white rounded-xl shadow-md flex flex-col items-center justify-center p-5 opacity-80 max-h-[500px] gap-10">
                <div className="flex-grow flex flex-col items-center">
                  <p className="font-semibold text-center mb-4">
                    This app uses Autenticacao.gov to authenticate accounts, please click the button below to login.
                  </p>
                  <Link
                    to={`https://preprod.autenticacao.gov.pt/oauth/askauthorization?redirect_uri=http://127.0.0.1:3000/cmdLogin&client_id=${client_id}&state=${state}&scope=http://interop.gov.pt/MDC/Cidadao/NomeProprio%20http://interop.gov.pt/MDC/Cidadao/NIC&response_type=token`}
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
                  <label htmlFor="username" className="block font-semibold mb-2">Email</label>
                  <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 leading-tight focus:outline-none focus:shadow-outline" placeholder="Insert your email here" />
                  {formErrors.username && <p className="text-red-500">{formErrors.username}</p>}
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="block font-semibold mb-2">Password</label>
                  <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 leading-tight focus:outline-none focus:shadow-outline" placeholder="Insert your password here" />
                  {formErrors.password && <p className="text-red-500">{formErrors.password}</p>}
                </div>
                <div className="flex items-center justify-between">
                  <Link to="/" className="text-purple-600 hover:text-indigo-400">Back to HomePage</Link>
                  <button type="button" onClick={handleLogin} className="bg-purple-600 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
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

export default LoginPage;
