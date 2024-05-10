import React, { useState } from 'react';

const EmailPrompt = ({ onSubmit }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Enter your email:</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full mb-4"
            required
          />
          <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailPrompt;