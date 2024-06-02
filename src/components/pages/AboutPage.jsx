import React, { useState } from 'react';
import Navbar from '../layout/Navbar.jsx';
import Footer from '../layout/Footer.jsx';
import Background from '../layout/Background.jsx';
import FAQItem from '../layout/FAQItem.jsx';

const AboutPage = () => {
  // State to manage the visibility of each FAQ item's answer
  const [faqAnswersVisible, setFaqAnswersVisible] = useState({});

  // Function to toggle the visibility of an FAQ item's answer
  const toggleFAQ = (question) => {
    setFaqAnswersVisible((prevState) => ({
      ...prevState,
      [question]: !prevState[question],
    }));
  };

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
            <div className="border bg-white rounded-xl p-8 opacity-80 shadow-md">
              <h2 className="font-sans text-4xl font-bold mb-6 ">Frequently Asked Questions</h2>
              <div className="text-lg text-gray-600">
                <FAQItem
                  question="1 - What led us to create this platform?"
                  answer="The growing need for secure and reliable digital archiving solutions inspired the creation of DiSA. We aim to provide organizations and individuals a way to preserve important documents with full confidence in their integrity and authenticity."
                  isVisible={faqAnswersVisible["What led us to create this platform?"]}
                  onClick={() => toggleFAQ("What led us to create this platform?")}
                />
                <FAQItem
                  question="2 - How do I submit files?"
                  answer="You will need our client-side app and our website. Firstly create or log in to your account, then copy your login token to the app. Now just follow the app's instructions and see the results here on the website!"
                  isVisible={faqAnswersVisible["How do I submit files?"]}
                  onClick={() => toggleFAQ("How do I submit files?")}
                />
                <FAQItem
                  question="3 - How do I share files?"
                  answer="You can share files through the dashboard's share menu (requires being logged in and having submitted files). Just add the email you want to share them with!"
                  isVisible={faqAnswersVisible["How can I access my files if I have a link to the file?"]}
                  onClick={() => toggleFAQ("How can I access my files if I have a link to the file?")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
