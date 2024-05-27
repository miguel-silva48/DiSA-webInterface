import React, { useState } from 'react';
import { API_BASE_URL } from "../../constants/index.jsx";
import { useNavigate } from 'react-router-dom';
import SharingList from '../layout/SharingList.jsx';

import { RiPencilFill, RiShareFill, RiCheckboxCircleFill, RiDownloadFill } from 'react-icons/ri';

const DocumentSetCard = ({ token, collection }) => {
  const navigate = useNavigate();
  const [showSharingModal, setShowSharingModal] = useState(false);
  const username = sessionStorage.getItem("username");

  const [cardName, setName] = useState(collection.name || 'Untitled');
  const [editingName, setEditingName] = useState(false);
  const [nameError, setNameError] = useState(null);

  const createdDate = collection.created ? collection.created : 'Unknown';
  const link = collection.id ? 'https://localhost:3000/shared?col_uuid=' + collection.id : null;

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-UK', options);
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    // Check no changes were made
    if (cardName === collection.name) {
      setEditingName(false);
      setNameError(null);
      return;
    }

    // Check valid name
    if (!cardName || cardName.length < 4 || cardName.length > 50) {
      setNameError('Try inserting a name with 4 to 50 characters.');
      setEditingName(false);
      setName(collection.name);
      return;
    }

    try {
      const response = await fetch(API_BASE_URL + "/collections/name?col_uuid=" + collection.id + "&name=" + cardName, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating collection name:", errorData.message);
        setNameError('Error updating collection name.');
        setEditingName(false);
        setName(collection.name);
        return;
      }

      const data = await response.json();
      console.log(data);
      setNameError(null);
      setEditingName(false);
      setName(cardName);
    } catch (error) {
      console.error("Error updating collection name:", error.message);
      setNameError('Error updating collection name.');
      setEditingName(false);
      setName(collection.name);
    }
  };

  const handleDownloadCollection = async () => {
    try {
      const response = await fetch(API_BASE_URL + "/collections/download?col_uuid=" + collection.id + "&email=" + username, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          //TODO - Add token (was complaining about 2 authentication methods)
          // Authorization: `Bearer ${token}`,
        },
      });
      window.open(response.url, '_blank').focus();
    }
    catch (error) {
      console.error("Error downloading collection:", error);
    }
  };


  const handleShareCollection = () => {
    setShowSharingModal(true);
  };

  return (
    <div className="flex justify-center text-gray-600 p-4">
      <div className="w-2/3 border-2 border-gray-600 rounded-lg bg-white p-4">
        <div className="flex items-center justify-between mb-4 text-2xl font-bold">
          <div className="flex gap-2">
            <h2 className="text-gray-600 font-bold mb-2">
              {editingName ? (
                <form onSubmit={handleNameSubmit} className="flex items-center">
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setName(e.target.value)}
                    className="text-xl font-bold text-gray-600 rounded-lg border border-purple-600 px-3 py-2 mr-2"
                  />
                  <button type="submit" className="text-purple-600">
                    <RiCheckboxCircleFill />
                  </button>
                </form>
              ) : (
                <>
                  Collection name: {cardName}
                  <button onClick={() => setEditingName(true)} className="text-purple-600 ml-2">
                    <RiPencilFill />
                  </button>
                </>
              )}
            </h2>
            {nameError && <p className="text-base text-red-600">{nameError}</p>}
          </div>
          <button onClick={handleShareCollection}>
            <div className="flex gap-2 border-2 border-black rounded-lg ">
              <p className="text-xl font-bold">Share</p>
              <RiShareFill className='text-2xl' /></div>
          </button>
        </div>

        <hr className="border-t border-purple-500 mb-4" />

        <div className="flex gap-20 justify-between">
          <p className="text-xl">Submission Date: {formatDate(createdDate)}</p>
          <button onClick={handleDownloadCollection}>
            <div className="flex gap-2 border-2 border-black rounded-lg ">
              <p className="text-xl font-bold">Download</p>
              <RiDownloadFill className='text-2xl' /></div>
          </button>

        </div>
        {showSharingModal && <SharingList collection={collection} onClose={() => setShowSharingModal(false)} />}
      </div>
    </div>
  );
};

export default DocumentSetCard;
