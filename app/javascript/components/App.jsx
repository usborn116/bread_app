import React, {useState, useEffect} from "react";
import IndexRoutes from "../routes/IndexRoutes";
import Error from "./Error";
import { useLocation } from "react-router";
import Login from "./Login";

const props=() => {

    const [error, setError] = useState(null)
    const [user, setUser] = useState(1)

    console.log(user)

    if (error) return <Error message={error}/>

    if (!user) return <Login />

    return (
        <div className="bod">
            <IndexRoutes setError={setError} setUser={setUser}/>
        </div>
        )
};

export default props