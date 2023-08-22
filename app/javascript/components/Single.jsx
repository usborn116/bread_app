import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Edit from "./Edit";

const Single = ({headers = [], columns = [], name = null, setCreate = null}) => {
    const navigate = useNavigate()
    const row =
        <div className="row">
            {columns.map(c => <div>{c}</div>)}
        </div>
    ;

    return (
        <div className="table accts">
            {name ? <Edit setCreate={setCreate} name={name}/> : ''}
            {name ? <button onClick={() => navigate(-1)} className="btn btn-lg custom-button" role="button">BACK</button> : ''}
            <div className='row'>
                {headers.map(m => <div>{m}</div>)}
            </div>
            {row}
            
        </div> 
          )
};

export default Single