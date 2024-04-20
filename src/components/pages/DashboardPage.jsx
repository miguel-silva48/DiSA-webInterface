import React, { useEffect } from "react";
import Navbar from "../layout/Navbar.jsx";
import Footer from "../layout/Footer.jsx";
import Background from "../layout/Background.jsx";
import DocumentSetCard from "../layout/DocumentSetCard.jsx";

const DashboardPage = () => {

// Redirect to login page if user is not logged in and tries to access this
useEffect(() => {
  if (sessionStorage.getItem("access_token") === null) {
    window.location.href = "/login";
  }
}
, []);


  return (
    <div>
      <Background />
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="text-center p-10">
          <h1 className="font-sans text-6xl font-extrabold bg-gradient-to-b from-[#6941C6] to-[#27164F] bg-clip-text text-transparent">
            Welcome to your DiSA dashboard!
          </h1>
          <h2 className="text-3xl text-gray-600 mt-2 mb-4">
            Here you can check your submitted files, manage their accesses and much more!
          </h2>
          <DocumentSetCard />
          <DocumentSetCard />
          <DocumentSetCard />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;