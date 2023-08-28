import React from "react";
import { Link } from "react-router-dom";
import Delete from "./Delete";
import Create from "./Create"
import CategorySwitcher from "./CategorySwitcher";
import Single from "./Single";

const List = ({headers, data, tablename, setCreate, setDeleting, setData, setLoading, setError, monthly = null, setMonthly = null}) => {

    const allData = data?.map(d => (
        <div className="table">
            <div className="row-span">
        <Single columns={[d?.date, d?.name, d?.amount?.toFixed(2), d?.category?.name,
            d?.merchant, d?.bank, `${d?.institution_name || 'Cash'}`]} name={d.name}/>
        <div className="button-container-vert">
        <Link to={"" + d.id} className="btn btn-lg custom-button" role="button">{tablename == 'Budgets' ? d.month : d.name}</Link>
        <Delete setDeleting={setDeleting} endpoint={tablename.toLowerCase()} id={d.id} setter={setData} setLoading={setLoading} setError={setError} />
        </div>
        </div>
        
        </div>
    ));
    
  

    return (
        <div>
            <h1 className="display-4">{tablename}</h1>
            <div className="button-container">
                <Create name='' setCreate={setCreate}/>
                <Link to="/" className="button" role="button">HOME</Link>
                { setMonthly ? <CategorySwitcher monthly={monthly} setMonthly={setMonthly}/> : ''}
            </div>
            <div className="table">
                <Single headers={headers} />
                {allData}
            </div>
        </div>
    )
};

export default List