import React, {useState, useEffect} from "react";
import IndexRoutes from "../routes/IndexRoutes";
import Error from "./Error";
import { useLocation } from "react-router";
import Login from "./Login";
import Footer from "./Footer";
import { getUser } from "./helpers/api_helpers";

const props=() => {

    const [error, setError] = useState(null)
    const [user, setUser] = useState(() => getUser())

    console.log('user!', user)


    if (error) return <Error message={error}/>

    if (!user) return (
        <div className="bod">
            <div className="nav"><h1 className="nav">Welcome to 🍞</h1></div>
            <Login setError={setError} setUser={setUser} user={user}/>
            <Footer />
        </div>
    )

    return (
        <div className="bod">
            <IndexRoutes setError={setError} setUser={setUser} user={user}/>
        </div>
        )
};

export default props