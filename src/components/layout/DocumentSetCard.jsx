import React, { useState } from 'react';

import { RiPencilFill, RiCheckboxCircleFill, RiSettingsFill } from 'react-icons/ri';

const DocumentSetCard = () => {
  const [name, setName] = useState('Universidade de Aveiro');
  const [editingName, setEditingName] = useState(false);
  const [sharingState, setSharingState] = useState('Embargoed');
  const [editingSharingState, setEditingSharingState] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const date = '2021-10-10';
  const accesses = 0;
  const files = 0;
  const link = 'https://doi.org/10.5281/';

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

  return (
    <div className="flex justify-center p-4">
      <div className="w-2/3 border-4 border-gray-600 rounded-lg bg-gray-200 p-4">
        <div className="flex items-center justify-center mb-4">
          {/*Editing card name part*/}
          {editingName ? (
            <form onSubmit={handleNameSubmit}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-2xl font-bold rounded-lg text-gray-600"
              />
              <button type="submit">
                <RiCheckboxCircleFill className='text-2xl font-bold text-gray-600' />
              </button>
            </form>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-600 mr-2">{name}</h2>
              <button onClick={() => setEditingName(true)}>
                <RiPencilFill className='text-2xl font-bold text-gray-600' />
              </button>
            </>
          )}
        </div>

        {/*Rest of the card content*/}
        <div className="flex mb-4 gap-20 justify-between">
          <p className="text-xl text-gray-600">Submission Date: {date}</p>
          <div className="flex gap-2">
          <p className="text-xl text-gray-600">
            Share State:    
            <span className={
              sharingState === 'Available' ? 'text-green-600' :
              sharingState === 'Private' ? 'text-red-600' :
              sharingState === 'Embargoed' ? 'text-yellow-600' :
              'text-gray-600'
            }>
              {sharingState}
            </span>
          </p>
          <button onClick={() => console.log('Settings clicked -- TODO handle this')}>
            <RiSettingsFill className='text-xl font-bold text-gray-600'/>
          </button>
          </div>
          <div className="flex gap-2">
            <p className="text-xl text-gray-600">Link: </p>
            <span
              className="text-xl text-purple-500 underline cursor-pointer"
              onClick={handleLinkCopy}
            >
              {link}
            </span>
            {copySuccess && <p className="text-xl text-green-600">Link copied!</p>}
          </div>
        </div>
        <hr className="border-t border-purple-500 mb-4" />
        <div className="flex justify-center mb-4 gap-20">
          <p className="text-xl text-gray-600">Total Accesses: {accesses}</p>
          <p className="text-xl text-gray-600">Number of files: {files}</p>
        </div>
      </div>
    </div>
  );
};

export default DocumentSetCard;
