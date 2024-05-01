import React, { useState } from 'react';
import { API_BASE_URL } from "../../constants/index.jsx";
import { useNavigate } from 'react-router-dom';
import SharingList from '../layout/SharingList.jsx';

import { RiSettingsFill, RiShareFill } from 'react-icons/ri';

const DocumentSetCard = ({collection}) => {
  const navigate = useNavigate();
  const [showSharingModal, setShowSharingModal] = useState(false);

  const cardName = collection.name? collection.name : 'Untitled';
  const sharingState = collection.share_state? collection.share_state : 'Unknown';
  const date = collection.date? collection.date : 'Unknown';
  const link = collection.id? 'https://localhost:3000/shared?col_uuid=' + collection.id : null;

  const handleManageCollection = () => {
    navigate('/dashboard/collection', { state: { collection: collection } });
  };

  const handleShareCollection = () => {
    setShowSharingModal(true);
  };

  return (
    <div className="flex justify-center text-gray-600 p-4">
      <div className="w-2/3 border-2 border-gray-600 rounded-lg bg-white p-4">
        <div className="flex items-center justify-between mb-4 text-2xl font-bold">
          <h2>{cardName}</h2>
          <button onClick={handleManageCollection}>
            <div className="flex gap-2 border-2 border-black rounded-lg ">
              <p className="text-xl font-bold">Manage collection</p>
              <RiSettingsFill /></div>
          </button>
        </div>

        <hr className="border-t border-purple-500 mb-4" />

        <div className="flex gap-20 justify-between">
          <p className="text-xl">Submission Date: {date}</p>
          <p className="text-xl">
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
          <button onClick={handleShareCollection}>
            <div className="flex gap-2 border-2 border-black rounded-lg ">
              <p className="text-xl font-bold">Share collection</p>
              <RiShareFill className='text-2xl'/></div>
          </button>
        </div>
        {showSharingModal && <SharingList collection={collection} onClose={() => setShowSharingModal(false)} />}
      </div>
    </div>
  );
};

export default DocumentSetCard;
