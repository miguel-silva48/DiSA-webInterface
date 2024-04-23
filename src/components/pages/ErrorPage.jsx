import React from 'react';

const ErrorPage = () => {
    return (
        <div className="text-center p-10">
            <h1 className="font-sans text-6xl font-extrabold bg-gradient-to-b from-[#6941C6] to-[#27164F] bg-clip-text text-transparent">
                Error 404 - Page not found
            </h1>
            <h2 className="text-3xl text-gray-600 mt-2 mb-4">
                The page you are looking for does not exist. Please check the URL and try again!
            </h2>
            <button
                type="button"
                className="text-xl text-white font-bold rounded-lg bg-purple-600 hover:bg-indigo-500 px-5 py-3 transition duration-300 ease-in-out"
                onClick={() => window.location.href = "/"}
            >
                Back to HomePage
            </button>
        </div>
    );
};

export default ErrorPage;