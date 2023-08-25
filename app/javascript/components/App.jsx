import React, {useState, useEffect} from "react";
import Routes from "../routes";
import Error from "./Error";
import { useLocation } from "react-router";

const props=() => {

    const [error, setError] = useState(null)
    
    if (error) return <Error message={error}/>

    return (
        <div>
            {Routes}
        </div>
        )
};

export default props