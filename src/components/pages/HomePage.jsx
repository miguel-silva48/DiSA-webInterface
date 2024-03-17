import React from "react";
import Navbar from "../layout/Navbar.jsx";
import Background from "../layout/Background.jsx";

import side_image from "/side_image.png";

const HomePage = () => {
  return (
    <div>
      <Background />
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-row w-full h-full">
        <div className="w-[60%] h-full p-10">
          <h1 className="font-sans text-6xl font-extrabold bg-gradient-to-b from-[#6941C6] to-[#27164F] bg-clip-text text-transparent">
            Welcome to DiSA
          </h1>
          <h2 className="text-3xl text-gray-600 mt-2 mb-4">
            Digitally Signed Archive is a platform that allows you to save and sign files with authenticity and integrity guarantee.
          </h2>
          <div className="flex justify-center">
          <form className="w-2/3 border border-black rounded-lg p-4">
            <h2 className="text-2xl font-bold text-gray-600 text-center mb-4">Want to submit files? <u className="text-purple-500">Find out how</u></h2>
            <hr className="border-t border-purple-500 mb-4" />
            <div className="flex flex-col justify-center items-start mb-4">
              <p className="text-xl text-gray-600">Please insert your link below:</p>
            </div>
            <div className="flex items-center">
              <input 
                className="w-4/5 border border-gray-400 rounded p-2 mr-4 flex-grow" 
                placeholder="Insert link here"></input>
              <button
                type="button"
                className="flex p-4 flex-col gap-2.5 shrink-0 rounded-[0.625rem] bg-gray-950"
              >
                <div className="flex justify-center items-center gap-2">
                  <p className="text-white text-base font-bold">
                    Confirm
                  </p>
                </div>
              </button>
            </div>
          </form>
          </div>
        </div>
        <div className="w-[40%] h-full p-10">
          <img src={side_image} className="lg:h-[80%] sm:h-auto justify-center items-center pr-4" alt="Side Image" />
        </div>
      </div>
    </div>
    </div>
  );
};

export default HomePage;