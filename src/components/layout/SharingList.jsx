import React, { useEffect, useState } from 'react';
import { API_BASE_URL, EMAIL_REGEX } from "../../constants/index.jsx";
import { RiClipboardFill, RiDeleteBinFill, RiAddCircleFill } from 'react-icons/ri';

const SharingList = ({ collection, onClose }) => {
  const link = `http://localhost:3000/shared?col_uuid=${collection.id}`;
  const token = sessionStorage.getItem('access_token');
  const [sharedEmails, setSharedEmails] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Get a list of emails that have access to the collection (white-list)
    const fetchPermissions = async () => {
      try {
        const response = await fetch(API_BASE_URL + "/collections/permissions?col_uuid=" + collection.id, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch permissions');
        }
        const data = await response.json();
        console.log('Permissions:', data);
        setSharedEmails(data);
      } catch (error) {
        console.error('Error fetching permissions:', error);
        setErrorMessage('Failed to fetch permissions');
      }
    };

    fetchPermissions();
  }, [collection.id, token, sharedEmails.length]);

  // Function to add email to the white-list
  const addEmail = async () => {
    const trimedEmail = newEmail.trim();
    // If email is empty, do nothing
    if (trimedEmail === "") {
      setErrorMessage("Email cannot be empty, please enter a valid email and try again.");
      return;
    }

    // If it is not an email, alert with error
    if (!EMAIL_REGEX.test(trimedEmail)) {
      //alert("Invalid email, please enter a valid email and try again.");
      setErrorMessage("Invalid email, please enter a valid email and try again.");
      setNewEmail("");
      return;
    }

    // If email is in the list, alert with error
    if (sharedEmails.includes(trimedEmail)) {
      //alert("Email already in the list.");
      setErrorMessage("Email is already in the list, please try a different one.");
      setNewEmail("");
      return;
    }

    // Add email to the list
    try {
      const response = await fetch(API_BASE_URL + "/collections/permissions?col_uuid=" + collection.id + "&permission=read" + "&email=" + trimedEmail, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to add permission');
      }
      const data = await response.json();
      console.log('Permission added:', data);

      setSharedEmails(prevEmails => [...prevEmails, trimedEmail]);
      setErrorMessage("");
      setNewEmail("");
    } catch (error) {
      console.error('Error adding email:', error);
      setErrorMessage('Failed to add email');
    }
  };

  // Function to remove email from the white-list
  const removeEmail = async (emailToRemove) => {
    console.log('Removing email:', emailToRemove);
    try {
      const response = await fetch(API_BASE_URL + "/collections/permissions?col_uuid=" + collection.id + "&permission=read" + "&email=" + emailToRemove, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to remove permission');
      }
      const data = await response.json();
      console.log('Permission removed:', data);
      //setSharedEmails(prevEmails => prevEmails.filter(email => email !== emailToRemove));
      setSharedEmails(prevEmails => prevEmails.filter(email => email.email !== emailToRemove));
      setErrorMessage("");
    } catch (error) {
      console.error('Error removing email:', error);
      setErrorMessage('Failed to remove email');
    }
  };

  // Function to copy the share link to the clipboard
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
        <h2 className="text-2xl font-bold mb-8">Collection name: {collection.name}</h2>
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
            {sharedEmails
              .sort((a, b) => a.email > b.email ? 1 : -1)
              .map((permission, index) => (
                <li key={index} className="flex items-center justify-between py-2 ml-4">
                  <span>{permission.email}</span>
                  <button onClick={() => removeEmail(permission.email)} className="flex items-center rounded-lg text-white bg-red-600 hover:bg-red-400 px-3 py-1">
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
