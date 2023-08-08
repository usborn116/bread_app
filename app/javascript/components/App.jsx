import React, {useState} from "react";
import Routes from "../routes";
import { LoadContext } from "./contexts/LoadContext";
import Loading from "./Loading";
import Error from "./Error";

const props=() => {

    const [loading, setLoading] = useState(true)
    const load_val = { loading, setLoading}
    const [error, setError] = useState(null)

    if (error) return <Error message={error}/>

    return (
        <>
            <LoadContext.Provider value={load_val}>
                {Routes}
            </LoadContext.Provider>
        </>
        )
};

export default props