import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EMAIL_REGEX } from '../../constants';

const EmailPrompt = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Invalid email');
      return;
    }
    onSubmit(email);
  };

  const validateEmail = (email) => {
    return EMAIL_REGEX.test(email);
  };

  const handleBackToHome = () => {
    navigate('/');
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
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-between">
            <button type="button" onClick={handleBackToHome} className="bg-gray-500 text-white rounded px-4 py-2">
              Back to Home
            </button>
            <button type="submit" className="bg-purple-600 text-white rounded px-4 py-2">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailPrompt;
