import React from "react";
import Form from "./Form";
import Input from "./Input";
import Submit from "./Submit";
import { logIn } from "./helpers/api_helpers";
import { useNavigate } from "react-router";

const Login = ({setUser, setError, user}) => {


    return (
        <>
        <h1>Log In</h1>
        <Form endpoint="users/sign_in" item='login' updater={logIn} setError={setError} setter={setUser}>
                <Input type="email" name="email" placeHolder='email address'/>
                <Input type="password" name="password" placeHolder='password' />
                <Submit/>
        </Form>
        </>
    )

};

export default Login