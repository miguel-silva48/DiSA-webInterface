import React from "react";
import Navbar from "../layout/Navbar.jsx";
import Footer from "../layout/Footer.jsx";
import Background from "../layout/Background.jsx";

import side_image from "/side_image.png";

const HomePage = () => {
  return (
    <div className="h-[100vh] flex flex-col">
      <Background />
      <main className="flex-grow">
        <div className="flex flex-col">
          <Navbar />
          <div className="flex flex-row w-full h-full">
            <div className="lg:w-[60%] sm:w-full h-full p-20">
              <h1 className="font-sans text-6xl font-extrabold bg-gradient-to-b from-[#6941C6] to-[#27164F] bg-clip-text text-transparent mb-10">
                Welcome to DiSA
              </h1>
              <h2 className="text-3xl text-gray-600 mt-2 mb-10">
                Digitally Signed Archive is a platform that allows you to save and sign files with authenticity and integrity guarantee.
              </h2>
              <div className="flex justify-start">
                <form className="w-3/5 border-2 border-gray-600 rounded-lg bg-white p-8">
                  <h2 className="text-2xl font-bold text-gray-600 text-center mb-6">Want to submit files? <u className="text-purple-500">Find out how</u></h2>
                  <hr className="border-t border-purple-500 mb-4" />
                  <h2 className="text-2xl font-bold text-gray-600 text-center mb-2">Want to retrieve files?</h2>
                  <div className="flex items-center">
                    <input
                      className="w-4/5 border border-gray-400 rounded p-2 mr-4 flex-grow"
                      placeholder="Insert your link here"></input>
                    <button
                      type="button"
                      className="text-xl text-white font-bold rounded-lg bg-purple-600 hover:bg-indigo-500 px-5 py-3 transition duration-300 ease-in-out"
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
            <div className="hidden lg:block w-[40%] h-full p-20">
              <img src={side_image} className="lg:h-[80%] sm:h-auto justify-center items-center pr-4" alt="Side Image" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
