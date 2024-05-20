import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from "../../constants/index.jsx";
import { useSearchParams } from 'react-router-dom';
import { RiFileDownloadLine, RiFolderDownloadFill } from 'react-icons/ri';
import Navbar from "../layout/Navbar.jsx";
import Footer from "../layout/Footer.jsx";
import Background from "../layout/Background.jsx";
import EmailPrompt from "../layout/EmailPrompt.jsx";

const SharedPage = () => {
  const user_token = sessionStorage.getItem("access_token") || "";
  const [params, searchParams] = useSearchParams();
  const col_uuid = params.get("col_uuid");
  const [showEmailPrompt, setShowEmailPrompt] = useState(!user_token);
  const [collectionInfo, setCollectionInfo] = useState(null);

  useEffect(() => {
    if (!col_uuid) {
      alert("No collection UUID provided! You were given an invalid link.");
      window.location.href = "/";
    }

    if (!showEmailPrompt) {
      //user is logged in -> fetch collection info with username (email)
      fetchCollectionInfo(sessionStorage.getItem("username"));
    }
  }
    , [col_uuid]);

  // Fetch collection's information
  const fetchCollectionInfo = async (email) => {
    try {
      const response = await fetch(API_BASE_URL + "/collections/shared?col_uuid=" + col_uuid + "&email=" + email, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        alert("Error fetching collection information!");
        return;
      }

      const data = await response.json();
      setCollectionInfo(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching collection information:", error);
      setShowEmailPrompt(true);
    }
  };

  const handleEmailSubmit = async (email) => {
    setShowEmailPrompt(false);
    fetchCollectionInfo(email);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    return new Date(dateString).toLocaleDateString('en-UK', options);
  };

  const calculateTotalSize = (documents) => {
    let totalSize = 0;
    documents.forEach((document) => {
      totalSize += document.size;
    });
    return totalSize;
  };

  const handleObtainManifest = () => {
    //TODO - Handle manifest download
    console.log("TODO - Handle manifest download");
  };

  const handleDownloadCollection = () => {
    //TODO - Handle collection download
    console.log("TODO - Handle collection download");
  };


  return (
    <div className="flex flex-col min-h-screen">
      <Background />
      <Navbar />
      <div className="flex-grow p-10 text-center">
        <h1 className="font-sans text-6xl font-extrabold bg-gradient-to-b from-[#6941C6] to-[#27164F] bg-clip-text text-transparent mb-4">
          Shared Collection
        </h1>
        <h2 className="text-3xl text-gray-600 mt-2 mb-10">
          Here you can see information about the collection that was shared with you and download it!
        </h2>
        {showEmailPrompt && <EmailPrompt onSubmit={handleEmailSubmit} />}
        {!showEmailPrompt && collectionInfo && (
          <div className='w-full max-w-lg mx-auto border bg-slate-100 rounded-lg p-6 shadow-md'>
            <div className="items-center justify-center font-sans text-3xl font-bold text-gray-800">
              <p className="mb-4"> Collection name: {collectionInfo.name}</p>
              <p className="mb-4"> Submission Date: {formatDate(collectionInfo.created)}</p>
              <p className="mb-4"> Number of files: {collectionInfo.documents.length}</p>
              <p className="mb-4"> Total Collection Size: {calculateTotalSize(collectionInfo.documents)} bytes</p>
            </div>
            <div className="flex justify-center gap-4 mt-12">
              <button
                className="text-xl text-white font-bold rounded-lg bg-slate-600 hover:bg-indigo-400 px-6 py-3 transition duration-300 ease-in-out flex items-center gap-2"
                onClick={handleObtainManifest}
              >
                <RiFileDownloadLine className="text-2xl" />
                Obtain Manifest
              </button>
              <button
                className="text-xl text-white font-bold rounded-lg bg-purple-600 hover:bg-indigo-500 px-5 py-3 transition duration-300 ease-in-out flex items-center gap-2"
                onClick={handleDownloadCollection}
              >
                <RiFolderDownloadFill className="text-2xl" />
                Download Collection
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SharedPage;
