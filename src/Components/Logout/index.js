import { useEffect } from "react";
import { Redirect } from "react-router-dom";


const Logout = () => {

    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("type");
        alert("Logged out successfully")
        window.location.reload(true);
    }, []);
    return <Redirect to="/" />
};

export default Logout;