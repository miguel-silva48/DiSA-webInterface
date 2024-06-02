import React from 'react';

const FAQItem = ({ question, answer, isVisible, onClick }) => {
  return (
    <div className="text-lg text-gray-600 cursor-pointer border border-gray-400 rounded-xl p-2 mb-2" onClick={onClick}>
      <h3 className="font-bold text-gray-800 mb-2">{question}</h3>
      {isVisible && (
        <div className="mb-4">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FAQItem;
