import React from "react";
import { useNavigate } from "react-router-dom";
import Back from "./Back";

const Error = ({message = 'Unknown Error!'}) => {
    const navigate = useNavigate();

    return (
        <div className="table">
        <h1>ERROR!</h1>
        <h4>{message}</h4>
        <Back />
        </div>
          )
};

export default Error