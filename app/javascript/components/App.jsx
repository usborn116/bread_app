import React, {useState} from "react";
import Routes from "../routes";
import Error from "./Error";

const props=() => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    if (error) return <Error message={error}/>

    return (
        <>
            {Routes}
        </>
        )
};

export default props