import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from "../../constants/index.jsx";
import { useLocation } from 'react-router-dom';
import { RiPencilFill } from 'react-icons/ri';
import Navbar from "../layout/Navbar.jsx";
import Background from "../layout/Background.jsx";
import DocumentSetContent from '../layout/DocumentSetContent.jsx';

const CollectionPage = () => {
  const user_token = sessionStorage.getItem("access_token") || "";
  const location = useLocation();
  const { collection } = location.state;
  const [collectionHistory, setCollectionHistory] = useState([]);

  const [cardName, setName] = useState(collection.name || 'Untitled');
  const [editingName, setEditingName] = useState(false);

  const sharingState = collection.share_state || 'Unknown';
  const createdDate = collectionHistory.created || 'Unknown';

  const link = 'https://doi.org/10.5281/';
  const [copySuccess, setCopySuccess] = useState(false);
  const num_accesses = 0;

  useEffect(() => {
    // Fetch collection's history
    const fetchCollectionHistory = async () => {
      try {
        const response = await fetch(API_BASE_URL + "/collections/info?col_uuid=" + collection.id, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${user_token}`,
            "Content-Type": "application/json"
          },
        });

        if (!response.ok) {
          alert("Error fetching collection history!");
          return;
        }

        const data = await response.json();
        setCollectionHistory(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching collection history:", error);
      }
    };

    fetchCollectionHistory();
  }, []);

  const handleNameSubmit = (event) => {
    event.preventDefault();
    setEditingName(false);
    //TODO enviar mudança de nome para backend
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-UK', options);
   };

  const handleLinkCopy = () => {
    navigator.clipboard.writeText(link).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }).catch((error) => {
      console.error('ERROR copying link:', error);
    });
  };

  return (
    <div>
      <Background />
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="p-10">
        <h1 className="font-sans text-6xl font-extrabold bg-gradient-to-b from-[#6941C6] to-[#27164F] bg-clip-text text-transparent mb-4">
            Collection Information
          </h1>
          <div className="ml-8 grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-2xl col-span-2">
              <h2 className="text-gray-600 font-bold mb-2">
                {editingName ? (
                  <form onSubmit={handleNameSubmit} className="flex items-center">
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setName(e.target.value)}
                      className="text-xl font-bold text-gray-600 rounded-lg border border-gray-300 px-3 py-2 mr-2"
                    />
                    <button type="submit" className="text-purple-600">
                      <RiPencilFill />
                    </button>
                  </form>
                ) : (
                  <>
                    {cardName}
                    <button onClick={() => setEditingName(true)} className="text-purple-600">
                      <RiPencilFill />
                    </button>
                  </>
                )}
              </h2>
              <p className="text-gray-600">Submission Date: {formatDate(createdDate)}</p>
              <p className="text-gray-600">Share State: <span className={
                sharingState === 'available' ? 'text-green-600' :
                  sharingState === 'private' ? 'text-red-600' :
                    sharingState === 'embargoed' ? 'text-yellow-600' :
                      sharingState === 'restricted' ? 'text-orange-600' :
                        'text-gray-600'
              }> {sharingState}</span></p>
              <div className="flex gap-2 text-gray-600">
                <p>Link: </p>
                <span
                  className="text-purple-500 underline cursor-pointer"
                  onClick={handleLinkCopy}
                >
                  {link}
                </span>
              </div>
              <p className="text-gray-600">Number of accesses: {num_accesses}</p>
            </div>

          </div>
          {collectionHistory.documents && <DocumentSetContent documents={collectionHistory.documents} />}
        </div>
        <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 bg-purple-600 text-white p-2 rounded-full"
      >
        ↑ Back to top
      </button>
      </div>
    </div>
  );
};

export default CollectionPage;
