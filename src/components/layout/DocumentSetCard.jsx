import React, { useState } from 'react';
import { API_BASE_URL } from "../../constants/index.jsx";
import { useNavigate } from 'react-router-dom';

import { RiSettingsFill } from 'react-icons/ri';

const DocumentSetCard = ({collection}) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const navigate = useNavigate();

  const cardName = collection.name? collection.name : 'Untitled';
  const sharingState = collection.share_state? collection.share_state : 'Unknown';
  const date = collection.date? collection.date : 'Unknown';
  const link = 'https://doi.org/10.5281/';

  const handleManageCollection = () => {
    navigate('/dashboard/collection', { state: { collection: collection } });
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
    <div className="flex justify-center p-4">
      <div className="w-2/3 border-2 border-gray-600 rounded-lg bg-white p-4">
        <div className="flex items-center justify-between mb-4 text-2xl font-bold text-gray-600">
          <h2>{cardName}</h2>
          <button onClick={handleManageCollection}>
            <div className="flex gap-2 border-2 border-black rounded-lg ">
              <p className="text-xl text-gray-600">Manage collection</p>
              <RiSettingsFill /></div>
          </button>
        </div>

        <hr className="border-t border-purple-500 mb-4" />

        <div className="flex gap-20 justify-between">
          <p className="text-xl text-gray-600">Submission Date: {date}</p>
          <p className="text-xl text-gray-600">
            Share State:
            <span className={
              sharingState === 'public' ? 'text-green-600' :
                sharingState === 'private' ? 'text-red-600' :
                  sharingState === 'embargoed' ? 'text-yellow-600' :
                    sharingState === 'restricted' ? 'text-orange-600' :
                      'text-gray-600'
            }> {sharingState}
            </span>
          </p>
          <div className="flex gap-2">
            <p className="text-xl text-gray-600">Link: </p>
            <span
              className="text-xl text-purple-500 underline cursor-pointer"
              onClick={handleLinkCopy}
            >
              {link}
            </span>
          </div>
        </div>
        {copySuccess && <p className="flex justify-end text-xl text-green-600">Link copied!</p>}
      </div>
    </div>
  );
};

export default DocumentSetCard;
