import React from "react";
import { Link} from "react-router-dom";
import Edit from "./Edit";

const Single = ({headers, columns, data}) => {
    const row =
        <div className="row">
            {columns.map(c => <div>{data?.c}</div>)}
        </div>
    ;

    return (
        <div className="table accts">
            <div className='row'>
                {headers.map(m => <div>{m}</div>)}
            </div>
            {row}
            <Edit setCreate={setCreate} name={data?.name}/>
            <Link to="/accounts_list" className="btn btn-lg custom-button" role="button">ACCOUNTS</Link>
        </div> 
          )
};

export default Single