import { Link } from "react-router-dom";

import Navbar from "../layout/Navbar.jsx";
import Footer from "../layout/Footer.jsx";
import Background from "../layout/Background.jsx";

import Auth from "/autenticacao_gov.png";

const RegisterPage = () => {
    let client_id = "";
    let state;

    if (!document.cookie.includes("state")) {
        state = crypto.randomUUID();
        document.cookie = `state=${state}; SameSite=Strict; Secure`;
    } else {
        state = document.cookie.split("=")[1]
    }

    return (
        <div className="flex flex-col h-screen">
            <Background />
            <div className="flex flex-col flex-grow">
                <Navbar />
                <div className="flex justify-center items-center h-full p-10">
                    <div className="w-[500px] bg-white rounded-xl shadow-md flex flex-col items-center justify-center p-5 opacity-80 max-h-[500px]">
                        <h1 className="font-sans text-6xl font-extrabold bg-gradient-to-b from-[#6941C6] to-[#27164F] bg-clip-text text-transparent text-center mb-8 mt-20">
                            Create a DiSA account
                        </h1>
                        <div className="flex-grow">
                        </div>
                        <div className="mb-20 p-5 flex flex-col items-center">
                            <p className="font-semibold text-center mb-4">
                                This app uses Autenticacao.gov to create accounts, please click the button bellow to start the registration process.
                            </p>
                            <Link
                                to={`https://preprod.autenticacao.gov.pt/oauth/askauthorization?redirect_uri=http://127.0.0.1:3000/cmd&client_id=${client_id}&state=${state}&scope=http://interop.gov.pt/MDC/Cidadao/NomeProprio%20http://interop.gov.pt/MDC/Cidadao/NIC&response_type=token`}
                                className="bg-purple-200 rounded-xl p-5 shadow-md hover:bg-purple-400 hover:shadow-xl">
                                <img src={Auth} className="h-16" alt="Autenticação com Chave Móvel Digital" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RegisterPage;
