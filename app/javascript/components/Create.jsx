import React from "react";

const Create = ({setCreate, name}) => {

    return <button onClick={() => setCreate(true)} value='Edit!'>Create {name}</button>

};

export default Create