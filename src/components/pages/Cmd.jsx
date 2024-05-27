import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../constants";
import Background from "../layout/Background";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";

export default function CMDRegister() {
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const [params, setParams] = useSearchParams();
    const [form, setForm] = useState({
        email: "",
    });

    // So.. the hook to parse params only works with the standard ? for the first param
    // But the api form auth.gov always uses a # sign instead.
    if (window.location.href.includes("#")) {
        window.location.href = window.location.href.replace("#", "?");
    }

    // make sure the response comes form a request made by this app
    useEffect(() => {
        if (document.cookie.split("=")[1] !== params.get("state")) {
            // TODO: display this error better
            alert("CMD Session does not correspond to website state")
            return navigate("/register")
        }
    }, []);


    const handleChange = (e) => {
        setForm({
            email: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setFormErrors({});
        const newErrors = {};
        if (!form.email) {
            newErrors.email = "Email field is required and should be a valid email";
        }

        let submit_form = {
            cmd_token: params.get("access_token"),
            email: form.email,
        }

        //No errors, send the POST request
        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await fetch(API_BASE_URL + "/users/cmd", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(submit_form),
                });
                const data = await response.json();
                console.log("REGISTER RESPONSE:", data);
                if (response.ok) {
                    sessionStorage.setItem("access_token", data.token)
                    navigate("/dashboard");
                }
            } catch (error) {
                console.error("ERROR IN REGISTER:", error);
                alert("Error registering user, please try again later.");
            }

            //Clean up to avoid resending the same data
            setForm({
                email: "",
            });
        } else {
            setFormErrors(newErrors);
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <Background />
            <div className="flex flex-col flex-grow">
                <Navbar />
                <div className="flex justify-center h-full p-20 pt-40">
                    <div className="w-[60%]">
                        <form className="w-full max-w-lg mx-auto border  bg-white rounded-lg p-8 shadow-md">
                            <h1 className="font-sans text-6xl font-extrabold bg-gradient-to-b from-[#6941C6] to-[#27164F] bg-clip-text text-transparent text-center mb-8">
                                Create a DiSA account
                            </h1>
                            <p className="font-semibold text-center mb-4">
                                To finish the creation of your account please input a valid email address.
                            </p>
                            <div className="mb-6">
                                <label htmlFor="email" className="block text-gray-600 font-bold mb-2">Email</label>
                                <input type="email" id="email" name="email" value={form.email} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 leading-tight focus:outline-none focus:shadow-outline" placeholder="Insert your email here" />
                                {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}
                            </div>
                            <div className="flex items-center justify-between">
                                <Link to="/" className="text-purple-600 hover:text-indigo-400">Back to HomePage</Link>
                                <button type="submit" onClick={handleRegister} className="bg-purple-600 hover:bg-indigo-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
