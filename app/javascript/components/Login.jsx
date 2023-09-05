import React from "react";
import Form from "./Form";
import Input from "./Input";
import Submit from "./Submit";

const Login = ({setUser}) => {

    const handleClick = async (e) =>{
        e.preventDefault()
        setDeleting(true)
        await deleteData(`/${endpoint}${id ? `/${id}` : ''}`, setter, setLoading, setError)
        alert(`${endpoint.toUpperCase().slice(0, endpoint.length - 1)} deleted!`)
        setDeleting(false)
    }

    return (
        <>
        <h1>Log In</h1>
        <Form endpoint="/users/sign_in" item='category' updater={setUser}>
                <Input type="email" name="email" placeHolder='email address'/>
                <Input type="password" name="password" placeHolder='password' />
                <Submit/>
        </Form>
        </>
    )

};

export default Login