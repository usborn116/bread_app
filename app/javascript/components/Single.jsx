import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Edit from "./Edit";
import Back from "./Back";
import Delete from "./Delete";

const Single = ({headers = [], columns = [], name = null, setCreate = null}) => {
    const navigate = useNavigate()
    const row =
        <div className="row" style={{gridTemplateColumns: `repeat(${columns.length}, 1fr)`}}>
            {columns.map((c, i) => <div key={i}>{c}</div>)}
        </div>
    ;

    return (
        <div className="table accts">
            <div className="button-container">
                {setCreate ? <Edit setCreate={setCreate} name={name}/> : ''}
                {name ? <Back/> : ''}
            </div>
            <div className='row headers' style={{gridTemplateColumns: `repeat(${headers.length}, 1fr)`}}>
                {headers.map((m, i) => <div key={i}>{m}</div>)}
            </div>
            {row}
            
        </div> 
          )
};

export default Single