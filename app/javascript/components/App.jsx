import React, {useState, useEffect} from "react";
import IndexRoutes from "../routes/IndexRoutes";
import Error from "./Error";
import { useLocation } from "react-router";
import Login from "./Login";
import Footer from "./Footer";

const props=() => {

    const [error, setError] = useState(null)
    const [user, setUser] = useState(true)

    console.log(user)

    if (error) return <Error message={error}/>

    if (!user) return (
        <div className="bod">
            <div className="nav"><h1 className="nav">Welcome to 🍞</h1></div>
            <Login />
            <Footer />
        </div>
    )

    return (
        <div className="bod">
            <IndexRoutes setError={setError} setUser={setUser}/>
        </div>
        )
};

export default props