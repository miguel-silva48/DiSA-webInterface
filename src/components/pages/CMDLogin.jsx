import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API_BASE_URL } from "../../constants";

export default function CMDLogin() {
    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();

    // So.. the hook to parse params only works with the standard ? for the first param
    // But the api form auth.gov always uses a # sign instead.
    if (window.location.href.includes("#")) {
        window.location.href = window.location.href.replace("#", "?");
    }

    // make sure the response comes form a request made by this app
    useEffect(() => {
        if (document.cookie.split("=")[1] !== params.get("state")) {
            alert("CMD Session does not correspond to website state")
            return navigate("/login")
        }

        const id_token = params.get("access_token");

        try {
            fetch(`${API_BASE_URL}/users/login/cmd?id_token=${id_token}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(
                (res) => res.json()
            ).then((data) => {
                if (data.detail === "Couldn't validate the CMD session") {
                    console.error("ERROR IN LOGIN:", data.error);
                    alert("Error logging in, please try again later.");
                    return navigate("/login");
                }
                console.log("LOGIN RESPONSE:", data);
                sessionStorage.setItem("access_token", data.access_token)
                navigate("/dashboard");
            }).catch((error) => {
                console.error("ERROR IN LOGIN:", error);
                alert("Error logging in, please try again later.");
            });

        } catch (error) {
            console.error("ERROR IN LOGIN:", error);
            alert("Error logging in, please try again later.");
        }

    }, []);

    // TODO: Make a page in case of error
    return (
        <>
        </>
    )
}
