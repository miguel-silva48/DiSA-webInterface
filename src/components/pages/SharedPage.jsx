import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from "../../constants/index.jsx";
import { useLocation } from 'react-router-dom';

import Navbar from "../layout/Navbar.jsx";
import Background from "../layout/Background.jsx";
import DocumentSetContent from '../layout/DocumentSetContent.jsx';

const SharedPage = () => {
  const user_token = sessionStorage.getItem("access_token") || "";
  const location = useLocation();
  const { collection } = location.state;
  const [collectionHistory, setCollectionHistory] = useState([]);

  const cardName = useState(collection.name || 'Untitled');

  const sharingState = collection.share_state || 'Unknown';
  const createdDate = collectionHistory.created || 'Unknown';

  const link = 'https://doi.org/10.5281/';


  //TODO prompt to ask for email before sharing
  useEffect(() => {k




    // Fetch collection's history
    // const fetchCollectionHistory = async () => {
    //   try {
    //     const response = await fetch(API_BASE_URL + "/collections/info?col_uuid=" + collection.id, {
    //       method: "GET",
    //       headers: {
    //         "Authorization": `Bearer ${user_token}`,
    //         "Content-Type": "application/json"
    //       },
    //     });

    //     if (!response.ok) {
    //       alert("Error fetching collection history!");
    //       return;
    //     }

    //     const data = await response.json();
    //     setCollectionHistory(data);
    //     console.log(data);
    //   } catch (error) {
    //     console.error("Error fetching collection history:", error);
    //   }
    // };

    // fetchCollectionHistory();
  }, []);


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-UK', options);
  };


  return (
    <div>
      <Background />
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="p-10">
          <h1 className="font-sans text-6xl font-extrabold bg-gradient-to-b from-[#6941C6] to-[#27164F] bg-clip-text text-transparent mb-4">
            Shared Collection
          </h1>
          <div className="ml-8 grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-2xl col-span-2">
              <h2 className="text-gray-600 font-bold mb-2"> {cardName}</h2>
              <p className="text-gray-600">Submission Date: {formatDate(createdDate)}</p>
              <p className="text-gray-600">Share State: <span className={
                sharingState === 'available' ? 'text-green-600' :
                  sharingState === 'private' ? 'text-red-600' :
                    sharingState === 'embargoed' ? 'text-yellow-600' :
                      sharingState === 'restricted' ? 'text-orange-600' :
                        'text-gray-600'
              }> {sharingState}</span></p>
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

export default SharedPage;
