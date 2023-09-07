import React, {useState, useEffect} from "react";
import IndexRoutes from "../routes/IndexRoutes";
import Error from "./Error";
import { useLocation } from "react-router";
import Login from "./Login";
import Footer from "./Footer";
import { getUser } from "./helpers/api_helpers";
import Signup from "./Signup";

const props=() => {

    const [error, setError] = useState(null)
    const [user, setUser] = useState(() => getUser())
    const [existing, setExisting] = useState(true)

    console.log('user!', user)
    console.log(existing)

    const clickHandler = (e) => {
        e.preventDefault()
        setExisting(true ? false : true)
    }


    if (error) return <Error message={error}/>

    if (!user) return (
        <div className="bod">
            <div className="nav"><h1 className="nav">Welcome to 🍞</h1></div>
            <div className="button" onClick={() => existing ? setExisting(false) : setExisting(true)}>{existing ? 'Switch to Signup' : 'Switch to Login'}</div>
            { existing ? <Login setError={setError} setUser={setUser} user={user}/> :
            <Signup setError={setError} setUser={setUser} uesr={user}/>}
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