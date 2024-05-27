import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../constants/index.jsx";
import Navbar from "../layout/Navbar.jsx";
import Footer from "../layout/Footer.jsx";
import Background from "../layout/Background.jsx";
import DocumentSetCard from "../layout/DocumentSetCard.jsx";
import { AiOutlineClose } from "react-icons/ai";

const DashboardPage = () => {
  const user_token = sessionStorage.getItem("access_token") || "";
  const [collections, setCollections] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("access_token") === null) {
      alert("You must be logged in to access this!");
      window.location.href = "/login";
    }

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
      } catch (error) {
        console.error("Error fetching user collections:", error);
      }
    };

    fetchUserCollections();
  }, []);

  const filteredCollections = searchTerm
    ? collections.filter(collection =>
        collection.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : collections;

  return (
    <div className="flex flex-col h-screen">
      <Background />
      <div className="flex flex-col flex-grow">
        <Navbar />
        <div className="text-center p-10">
          <h1 className="font-sans text-6xl font-extrabold bg-gradient-to-b from-[#6941C6] to-[#27164F] bg-clip-text text-transparent">
            Welcome to your DiSA dashboard!
          </h1>
          <h2 className="text-3xl text-gray-600 mt-2 mb-4">
            Here you can check your submitted files, manage their accesses and much more!
          </h2>
          <p className="text-2xl text-gray-600">
            To use our app,
            <span
              className="text-purple-500 underline cursor-pointer ml-2 mr-2"
              onClick={() => navigator.clipboard.writeText(user_token)}
            >
              copy your token
            </span>
            and paste it there!.
          </p>

          {/* Search Bar */}
          <div className="flex justify-center items-center space-x-4 mt-8 relative w-1/4 mx-auto">
            <input
              type="text"
              placeholder="Search collections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-2 border-gray-300 rounded-lg p-2 w-full"
            />
            {searchTerm && (
              <AiOutlineClose
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-700"
              />
            )}
          </div>

          {filteredCollections.length > 0 ? (
            <>
              <p className="text-xl font-semibold mt-4">
                Showing {filteredCollections.length} of {collections.length} collections
              </p>
              {filteredCollections.map((collection) => (
                <DocumentSetCard key={collection.id} token={user_token} collection={collection} />
              ))}
            </>
          ) : (
            <p className="mt-10 text-4xl">
              {searchTerm
                ? "No collections match your search criteria."
                : "You don't have any collections yet. Try using our app to submit files!"}
            </p>
          )}

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
