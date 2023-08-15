import React from "react";
import {deleteData} from './helpers/api_helpers'

const Delete = ({endpoint, id, setter, setLoading, setError}) => {

    const handleClick = async (e) =>{
        e.preventDefault()
        await deleteData(`/${endpoint}${id ? `/${id}` : ''}`, setter, setLoading, setError)
    }

    return <button className="button" onClick={handleClick}>DELETE</button>

};

export default Delete