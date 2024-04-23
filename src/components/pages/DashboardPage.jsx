import { useEffect } from "react";
import Navbar from "../layout/Navbar.jsx";
import Footer from "../layout/Footer.jsx";
import Background from "../layout/Background.jsx";
import DocumentSetCard from "../layout/DocumentSetCard.jsx";

const DashboardPage = () => {
    const user_token = sessionStorage.getItem("access_token") || "";

    // Redirect to login page if user is not logged in and tries to access this
    useEffect(() => {
        if (sessionStorage.getItem("access_token") === null) {
            alert("You must be logged in to access this!");
            window.location.href = "/login";
        }
    }
        , []);

    //TODO - fetch user's documents and display them

    // Make token available to copy so that user can login the CLI
    const handleLinkCopy = () => {
        navigator.clipboard.writeText(user_token).then(() => {
            alert("User token copied to clipboard!");
        }).catch((error) => {
            alert("Error copying user token to clipboard!");
            console.error('ERROR copying link:', error);
        });
    };

    return (
        <div className="flex flex-col h-screen">
            <Background />
            <div className="flex flex-col flex-grow">
                <Navbar />
                <div className="text-center p-10">
                    <h1 className="font-sans text-6xl font-extrabold bg-gradient-to-b from-[#6941C6] to-[#27164F] bg-clip-text text-transparent">
                        Welcome to your DiSA dashboard!
                    </h1>
                    <h2 className="text-3xl text-gray-600 mt-2 mb-4">
                        Here you can check your submitted files, manage their accesses and much more!
                    </h2>
                    <p className="text-2xl text-gray-600">
                        To use the CLI tool,
                        <span
                            className="text-purple-500 underline cursor-pointer ml-2 mr-2"
                            onClick={handleLinkCopy}
                        >copy your token</span>
                        and paste it in the CLI tool.
                    </p>

                    <DocumentSetCard />
                    <DocumentSetCard />
                    <DocumentSetCard />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardPage;
