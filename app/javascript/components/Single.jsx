import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Edit from "./Edit";
import Back from "./Back";
import Delete from "./Delete";

const Single = ({id = null, endpoint = null, headers = [], columns = [], name = null, setCreate = null,
    setDeleting, setter, setLoading, setError}) => {

    return (
        <>
        { headers.length > 0 ? 
        <div className="table">
            <div className="button-container">
                {setCreate ? <Edit setCreate={setCreate} name={name}/> : ''}
                {setCreate ? <Back/> : ''}
            </div>
            <div className='row headers' style={{gridTemplateColumns: `repeat(${headers.length + 1}, 1fr)`}}>
                {headers.map((m, i) => <div key={i}>{m}</div>)}
            </div>
            <div className="row" style={{gridTemplateColumns: `repeat(${columns.length + 1}, 1fr)`}}>
                <div><Link to={'/' + endpoint + '_list/' + id} className="header-button" role="button">{columns[0]}</Link></div>
                {columns.slice(1).map((c, i) => <div key={i}>{c}</div>)}
                {id ? <Delete setDeleting={setDeleting} endpoint={endpoint} id={id} setter={setter} setLoading={setLoading} setError={setError} /> : ''}
            </div>
        </div> :  
        <div className="row" style={{gridTemplateColumns: `repeat(${columns.length + 1}, 1fr)`}}>
            <div><Link to={'/' + endpoint + '_list/' + id} className="header-button" role="button">{columns[0]}</Link></div>
            {columns.slice(1).map((c, i) => <div key={i}>{c}</div>)}
            {id ? <Delete setDeleting={setDeleting} endpoint={endpoint} id={id} setter={setter} setLoading={setLoading} setError={setError} /> : ''}
        </div> }
        </>
    )
};

export default Single