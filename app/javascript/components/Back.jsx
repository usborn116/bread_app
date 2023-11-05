import React from "react";
import { useNavigate } from "react-router";

const Back = () => {
    const navigate = useNavigate()

    return <button onClick={() => navigate(-1)} className="back button" role="button">BACK</button>

};

export default Back