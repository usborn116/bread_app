import React from "react";
import { Link } from "react-router-dom";
import Delete from "./Delete";
import Create from "./Create"

const List = ({data, tablename, setCreate, setDeleting, setData, setLoading, setError}) => {

    const allData = data?.map(d => (
        <div className="row" key={d.id}>
        <Link to={"" + d.id} className="btn btn-lg custom-button" role="button">{tablename == 'Budgets' ? d.month : d.name}</Link>
        <Delete setDeleting={setDeleting} endpoint={tablename.toLowerCase()} id={d.id} setter={setData} setLoading={setLoading} setError={setError} />
        </div>
    ));

    return (
        <div>
            <h1 className="display-4">{tablename}</h1>
            <div className="table">
                <Create name='' setCreate={setCreate}/>
                <Link to="/" className="btn btn-lg custom-button" role="button">HOME</Link>
                {allData}
            </div>
        </div>
    )
};

export default List