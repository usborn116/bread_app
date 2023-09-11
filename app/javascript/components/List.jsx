import React from "react";
import { Link } from "react-router-dom";
import Create from "./Create"
import CategorySwitcher from "./CategorySwitcher";
import Single from "./Single";
import Back from "./Back";

const List = ({headers, data, tablename, setCreate, setDeleting, setData, setLoading, setError, monthly = null, setMonthly = null}) => {

    const column_maker = (d, tablename) => {
        let columns = null
        switch(tablename){
            case 'Transactions':
                columns = [d?.name, d?.date, d?.amount?.toFixed(2), d?.category?.name,
                d?.merchant, d?.bank, `${d?.institution_name || 'Cash'}`]
                break;
            case 'Accounts':
                const available = d.available ? d.available : d.current
                columns = [d?.name, available.toFixed(2), d?.last_four, d?.subtype, d?.institution_name]
                break;
            case 'Budgets':
                columns = [`${d?.month} ${d?.year}`, d?.balance?.toFixed(2) || 0, d?.budget_amount?.toFixed(2), d?.rollover?.toFixed(2) || 0 ]
                break;
            case 'Categories':
                columns = [`${d?.name} ${d?.budget_month || ''}`, d?.category_type, `${d?.account?.name || 'None'}`, `${d?.current?.toFixed(2) || 0.00}`]
                break;
        }
        return columns
    }
    const allData = data?.map(d => (
        <Single key={d.id} columns={column_maker(d, tablename)} name={d.name}
                setDeleting={setDeleting} endpoint={tablename.toLowerCase()} id={d.id} 
                setter={setData} setLoading={setLoading} setError={setError}/>
    ));
    
  

    return (
        <>
            <h1 className="display-4">{tablename}</h1>
            <div className="button-container">
                <Create name='' setCreate={setCreate}/>
                <Link to="/" className="button" role="button">HOME</Link>
                <Back />
                { tablename == 'Categories' ? <CategorySwitcher monthly={monthly} setMonthly={setMonthly}/> : ''}
            </div>
            <div className="table">
                <div className="row headers" style={{gridTemplateColumns: `repeat(${headers.length + 1}, 1fr)`}}>
                    {headers.map((m, i) => <div key={i}>{m}</div>)}
                </div>
                {allData}
            </div>
        </>
    )
};

export default List