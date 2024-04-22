import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../constants/index.jsx";
import Navbar from "../layout/Navbar.jsx";
import Footer from "../layout/Footer.jsx";
import Background from "../layout/Background.jsx";
import DocumentSetCard from "../layout/DocumentSetCard.jsx";

const DashboardPage = () => {
  const user_token = sessionStorage.getItem("access_token") || "";
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    // Redirect to login page if user is not logged in and tries to access this
    if (sessionStorage.getItem("access_token") === null) {
      alert("You must be logged in to access this!");
      window.location.href = "/login";
    }

    // Fetch user's collections and display them
    const fetchUserCollections = async () => {
      try {
        const response = await fetch(API_BASE_URL + "/collections/user", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${user_token}`
          }
        });

        if (!response.ok) {
          alert("Error fetching user collections!");
          return;
        }

        const data = await response.json();
        setCollections(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching user collections:", error);
      }
    };

    fetchUserCollections();
  }, []);

  // Make token available to copy so that user can login the CLI
  const handleLinkCopy = () => {
    navigator.clipboard.writeText(user_token).then(() => {
      setCopySuccess(true);
      alert("User token copied to clipboard!");
    }).catch((error) => {
      alert("Error copying user token to clipboard!");
      console.error('ERROR copying link:', error);
    });
  };

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
          <p className="text-2xl text-gray-600">
            To use the CLI tool,           
            <span 
              className="text-purple-500 underline cursor-pointer ml-2 mr-2"
              onClick={handleLinkCopy}
            >copy your token</span> 
            and paste it in the CLI tool.
          </p>

          {collections.length > 0 ? (
            collections.map((collection) => (
              <DocumentSetCard key={collection.id} collection={collection} />
            ))
          ) : (
            <p className="mt-10 text-4xl">You don't have any collections yet. Try using our CLI tool to submit files!</p>
          )}

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;