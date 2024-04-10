import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../layout/Navbar.jsx";
import Footer from "../layout/Footer.jsx";
import Background from "../layout/Background.jsx";

import Auth from "/autenticacao_gov.png";

const RegisterPage = () => {
  // Função para lidar com o clique no botão de autenticação com a chave móvel digital
  const handleMobileKeyAuthentication = () => {
    // Coloque aqui a lógica para iniciar o processo de autenticação com a chave móvel digital
    // Por exemplo, você pode redirecionar o usuário para uma página externa de autenticação com a CMD
    // Ou abrir uma janela modal para que o usuário insira seu número de telefone e inicie a autenticação
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
                <input type="text" id="name" className="w-full border border-gray-300 rounded px-3 py-2 leading-tight focus:outline-none focus:shadow-outline" placeholder="Insert your full name here"/>
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-600 font-bold mb-2">Email</label>
                <input type="email" id="email" className="w-full border border-gray-300 rounded px-3 py-2 leading-tight focus:outline-none focus:shadow-outline" placeholder="Insert your email here"/>
              </div>
              <div className="mb-6">
                <img src={Auth} className="w-1/2 mx-auto" alt="Autenticação com Chave Móvel Digital" />
              </div>
              <div className="flex items-center justify-between">
                <Link to="/" className="text-purple-600 hover:text-indigo-400">Back to HomePage</Link>
                <button type="button" className="bg-purple-600 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
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
