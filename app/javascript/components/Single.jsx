import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Edit from "./Edit";

const Single = ({headers = [], columns = [], name = null, setCreate = null}) => {
    const navigate = useNavigate()
    const row =
        <div className="row">
            {columns.map((c, i) => <div key={i}>{c}</div>)}
        </div>
    ;

    return (
        <div className="table accts">
            {setCreate ? <Edit setCreate={setCreate} name={name}/> : ''}
            {setCreate ? <button onClick={() => navigate(-1)} className="btn btn-lg custom-button" role="button">BACK</button> : ''}
            <div className='row'>
                {headers.map((m, i) => <div key={i}>{m}</div>)}
            </div>
            {row}
            
        </div> 
          )
};

export default Single