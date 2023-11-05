import React from "react";
import Form from "./Form";
import Input from "./Input";
import Submit from "./Submit";
import { signup } from "./helpers/api_helpers";

const Signup = ({setUser, setError, user}) => {


    return (
        <>
        <h1>Sign Up</h1>
        <Form endpoint="users" item='signup' updater={signup} setError={setError} setter={setUser}>
                <Input type="email" name="email" placeHolder='email address'/>
                <Input type="password" name="password" placeHolder='password' />
                <Input type="password" name="password_confirmation" placeHolder='confirm password' />
                <Submit/>
        </Form>
        </>
    )

};

export default Signup