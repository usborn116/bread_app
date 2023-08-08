import React from "react";
import { useNavigate } from "react-router-dom";

const Error = ({message}) => {
    const navigate = useNavigate();

    return (
        <>
        <h1>ERROR!</h1>
        <p>Details Below:</p>
        <h4>{message}</h4>
        <button onClick={() => navigate(-1)}>Go Back!</button>
        </>
          )
};

export default Error