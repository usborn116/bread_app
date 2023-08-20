import React from "react";

const Edit = ({setCreate, name}) => {

    return <button onClick={() => setCreate(true)} value='Edit!'>Edit {name}</button>

};

export default Edit