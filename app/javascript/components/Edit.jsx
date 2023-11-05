import React from "react";

const Edit = ({setCreate, name}) => {

    return <button className="button" onClick={() => setCreate(true)} value='Edit!'>Edit {name}</button>

};

export default Edit