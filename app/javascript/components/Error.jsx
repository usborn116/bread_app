import React from "react";
import Back from "./Back";

const Error = ({message = 'Unknown Error!'}) => {
    return (
        <div className="table">
          <h1>ERROR!</h1>
          <h3>{message}</h3>
          <Back />
        </div>
          )
};

export default Error