import React from "react";
import {deleteData} from './helpers/api_helpers'

const Delete = ({setDeleting, endpoint, id, setter, setLoading, setError}) => {

    const handleClick = async (e) =>{
        e.preventDefault()
        setDeleting(true)
        await deleteData(`/${endpoint}${id ? `/${id}` : ''}`, setter, setLoading, setError)
        alert(`${endpoint.toUpperCase().slice(0, endpoint.length - 1)} deleted!`)
        setDeleting(false)
    }

    return <button className="button" onClick={handleClick}>DELETE</button>

};

export default Delete