import React, {useState} from "react";
import Routes from "../routes";
import { LoadContext } from "./contexts/LoadContext";
import Loading from "./Loading";

const props=() => {

    const [loading, setLoading] = useState(true)
    const load_val = { loading, setLoading}

    return (
        <>
            <LoadContext.Provider value={load_val}>
                {Routes}
            </LoadContext.Provider>
        </>
        )
};

export default props