import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RiSettingsFill } from 'react-icons/ri';

const DocumentSetCard = () => {
  const [copySuccess, setCopySuccess] = useState(false);

  const navigate = useNavigate();

  const cardName = 'Universidade de Aveiro';
  const sharingState = 'Embargoed';
  const date = '2021-10-10';
  const link = 'https://doi.org/10.5281/';

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
          <button onClick={() => navigate('/files')}>
            <div className="flex gap-2 border-2 border-black rounded-lg ">
              <p className="text-xl text-gray-600">Manage files</p>
              <RiSettingsFill /></div>
          </button>
        </div>

        <hr className="border-t border-purple-500 mb-4" />

        <div className="flex gap-20 justify-between">
          <p className="text-xl text-gray-600">Submission Date: {date}</p>
          <p className="text-xl text-gray-600">
            Share State:
            <span className={
              sharingState === 'Available' ? 'text-green-600' :
                sharingState === 'Private' ? 'text-red-600' :
                  sharingState === 'Embargoed' ? 'text-yellow-600' :
                    sharingState === 'Restricted' ? 'text-orange-600' :
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
