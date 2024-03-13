import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../main.jsx";

const HomePage = () => {

  return (
    <div>
      <div className="flex w-screen flex-col items-start gap-2.5">
        <div className="w-full h-[63rem] bg-white">
          <div className="w-[35rem] h-[31.5rem] absolute left-[9.5rem] top-[14.4rem]">
            <p className="font-sans text-6xl font-extrabold bg-gradient-to-b from-[#6941C6] to-[#27164F] bg-clip-text text-transparent">
              Welcome to DiSA
            </p>
            <p className="text-2xl text-gray-600 mt-2 mb-4">
              Digitally Signed Archive is a platform that allows you to save and sign files with authenticity and integrity guarantee.
            </p>
            <form className="w-[34.5rem] shrink-0">
              <div className="flex flex-col justify-center items-start shrink-0">
                <div className="flex p-5 pr-6 items-center flex-[1_0_0] self-stretch rounded-2xl border border-gray-400 bg-gray-50 mt-4">
                  <input
                    placeholder="Insert link here"
                  ></input>
                  <button
                    type="button"
                    className="flex w-[13rem] h-[3.35rem] p-4 flex-col gap-2.5 shrink-0 rounded-[0.625rem] bg-gray-950"
                  >
                    <div className="flex justify-center items-center gap-2">
                      <p className="text-white text-base font-bold text-white">
                        Confirm
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
