import React from "react";
import Navbar from "../layout/Navbar.jsx";
import Footer from "../layout/Footer.jsx";
import Background from "../layout/Background.jsx";

const AboutPage = () => {
  return (
    <div>
      <Background />
      <div className="flex flex-col">
        <Navbar />
        <div className="flex flex-row w-full h-full">
          <div className="lg:w-[60%] sm:w-full h-full p-20">
            <h1 className="font-sans text-6xl font-extrabold bg-gradient-to-b from-[#6941C6] to-[#27164F] bg-clip-text text-transparent mb-10">
              About DiSA
            </h1>
            <p className="text-3xl text-gray-600 mt-2 mb-10">
              Our platform specializes in the archiving and preservation of digital files with authenticity guarantees, utilizing blockchain technology and integration with auth.gov for signatures.
            </p>
            <h2 className="font-sans text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="text-lg text-gray-600">
              <h3 className="font-bold text-gray-800 mb-2">What led us to create this platform?</h3>
              <p className="mb-4">
                The growing need for secure and reliable digital archiving solutions inspired the creation of DiSA. We aim to provide organizations and individuals a way to preserve important documents with full confidence in their integrity and authenticity.
              </p>
              <h3 className="font-bold text-gray-800 mb-2">Are my files really secure?</h3>
              <p className="mb-4">
                Yes, your files are protected with state-of-the-art blockchain technology that ensures data integrity and security throughout the archiving process.
              </p>
              <h3 className="font-bold text-gray-800 mb-2">How can I access my files if I have a link to the file?</h3>
              <p className="mb-4">
                You can access your files by entering the provided link into our platform's search function. This direct access is safeguarded to ensure that only authorized users can retrieve their archived data.
              </p>
              <h3 className="font-bold text-gray-800 mb-2">How do I submit files?</h3>
              <p className="mb-4">
                To submit files for archiving, simply register or log into your account on our platform, and follow the prompts to upload your documents securely. Each file will be encrypted and stored with a unique digital signature and a personal link.
              </p>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
