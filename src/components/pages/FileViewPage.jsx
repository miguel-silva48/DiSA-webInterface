import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from "../layout/Navbar.jsx";
import Background from "../layout/Background.jsx";
import DocumentSetContent from '../layout/DocumentSetContent.jsx';

import { RiArrowGoBackLine, RiPencilFill } from 'react-icons/ri';

const FileViewPage = () => {
  const [cardName, setName] = useState('Universidade de Aveiro');
  const [editingName, setEditingName] = useState(false);

  const sharingState = 'Embargoed';
  const date = '2021-10-10';
  const link = 'https://doi.org/10.5281/';
  const num_accesses = 0;

  const navigate = useNavigate();

  const handleNameSubmit = (event) => {
    event.preventDefault();
    setEditingName(false);
    //TODO enviar mudança de nome para backend
  };

  const handleLinkCopy = () => {
    navigator.clipboard.writeText(link).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }).catch((error) => {
      console.error('ERROR copying link:', error);
    });
  };

  const goBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div>
      <Background />
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="p-10">
          <h1 className="text-6xl text-gray-600 mt-2 mb-2">
            {editingName ? (
              <form onSubmit={handleNameSubmit}>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setName(e.target.value)}
                  className="text-6xl font-bold text-gray-600 ml-2 rounded-lg"
                />
                <button type="submit">
                  <RiPencilFill />
                </button>
              </form>
            ) : (
              <>
                <button onClick={() => goBackToDashboard()}>
                  <RiArrowGoBackLine />
                </button>
                {cardName}
                <button onClick={() => setEditingName(true)}>
                  <RiPencilFill />
                </button>
              </>
            )}
          </h1>
          <div className="flex flex-col justify-start ml-10 mb-10 space-y-2 text-xl text-gray-600">
            <p>Submission Date: {date}</p>
            <p>Share State:
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
              <p>Link: </p>
              <span
                className="text-purple-500 underline cursor-pointer"
                onClick={handleLinkCopy}
              >
                {link}
              </span>
            </div>
            <p>Number of accesses: {num_accesses} </p>
          </div>

          <DocumentSetContent />
        </div>
      </div>
    </div>
  );
};

export default FileViewPage;
