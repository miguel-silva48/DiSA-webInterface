import React from 'react';

import { RiClipboardFill, RiDeleteBinFill, RiAddCircleFill } from 'react-icons/ri';

const SharingList = ({ collection, onClose }) => {
  const link = `https://localhost:3000/shared?col_uuid=${collection.id}`;
  const [sharedEmails, setSharedEmails] = React.useState(["example@example.pt", "example2@example.pt"]);
  const [newEmail, setNewEmail] = React.useState("");
  const [copySuccess, setCopySuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const addEmail = () => {
    // If email is empty, do nothing
    if (newEmail.trim() === "") {
      setErrorMessage("Email cannot be empty, please enter a valid email and try again.");
      return;
    }

    // If it is not an email, alert with error
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail.trim())) {
      //alert("Invalid email, please enter a valid email and try again.");
      setErrorMessage("Invalid email, please enter a valid email and try again.");
      setNewEmail("");
      return;
    }

    // If email is in the list, alert with error
    if (sharedEmails.includes(newEmail.trim())) {
      //alert("Email already in the list.");
      setErrorMessage("Email is already in the list, please try a different one.");
      setNewEmail("");
      return;
    }

    // Add email to the list
    //TODO make api call adding this
    setSharedEmails(prevEmails => [...prevEmails, newEmail.trim()]);
    setErrorMessage("");
    setNewEmail("");
  };

  const removeEmail = (index) => {
    //TODO make api call removing this
    setSharedEmails(prevEmails => prevEmails.filter((email, i) => i !== index));
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
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg relative min-w-40 min-h-screen-3/4">
        <button className="absolute top-0 right-0 mt-2 mr-2 text-gray-600" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-8">Collection: {collection.name}</h2>
        <div className="flex justify-between items-center mb-8 gap-40">
          <h3 className="text-xl">Shared with:</h3>
          <button
            className="flex items-center text-white font-bold rounded-lg bg-purple-600 hover:bg-indigo-500 px-3 py-3"
            onClick={handleLinkCopy}>
            <RiClipboardFill className="text-2xl mr-2" />
            Copy Share Link
          </button>
          
        </div>
        {copySuccess && <span className="text-green-600">Link copied to clipboard!</span>}
        <hr className="border-t border-purple-600 mt-2 mb-2" />
        {sharedEmails.length > 0 ? (
          <ul>
            {sharedEmails.map((email, index) => (
              <li key={index} className="flex items-center justify-between py-2 ml-4">
                <span>{email}</span>
                <button onClick={() => removeEmail(index)} className="flex items-center rounded-lg text-white bg-red-600 hover:bg-red-400 px-3 py-1">
                  <RiDeleteBinFill className="text-xl mr-2" />
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven't shared this collection with anyone yet!</p>
        )}
        <hr className="border-t border-purple-600 mt-2 mb-8" />
        
        <div className="flex mt-4 justify-center">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Enter new email"
            className="border border-gray-400 p-2 mr-2 rounded-lg"
          />
          <button onClick={addEmail} className="flex items-center bg-blue-500 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg">
            <RiAddCircleFill className="text-xl mr-2" />
            Add Email
          </button>
          
        </div>
        <div className="flex flex-col justify-center mt-4">
          {errorMessage && <span className="text-red-600 ml-2">{errorMessage}</span>}
        <button className="bg-gray-500 text-white px-4 py-2 rounded-lg mt-4 ml-2" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default SharingList;
