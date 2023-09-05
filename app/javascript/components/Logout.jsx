import React from "react";
import { useNavigate } from "react-router";

const Logout = ({setError, setUser}) => {

    const navigate = useNavigate();

    const logout = async (errorSetter)=>{
        try{
            await fetch(`/users/sign_out`, {
                method: 'delete',
                headers: {
                    "content-type": 'application/json',
                    "accept": "application/json",
                },
            }) 
        } catch (error){
            console.log('error!', error)
            errorSetter('Error!')
        }
    }

    const handleClick = async (e) =>{
        e.preventDefault()
        await logout(setError)
        alert(`Logged Out!`)
        setUser(false)
        navigate('/sign_in')
    }

    return <button className="button" onClick={handleClick}>Log Out</button>

};

export default Logout