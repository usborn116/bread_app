import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateData } from "./helpers/api_helpers";
import {useParams} from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";
import Form from "./Form";
import Input from "./Input";
import Submit from "./Submit";
import { useDataGetter } from "./helpers/useDataGetter";
import Edit from "./Edit";

const Category = () => {
    const {id} = useParams();

    const {data, loading, error, setData, setError, setLoading, create, setDeleting, setCreate} = useDataGetter({endpoint: '/categories', id: id})
    
    const cat =
        <div className="row">
            <div>{data?.name} {data?.budget_month || ''}</div>
            <div>{data?.category_type}</div>
            <div>{data?.account?.name || 'None'}</div>
            <div>{data?.current?.toFixed(2) || 0.00}</div>
        </div>
    ;

    const category_options = [{id: 'fund', name: 'Savings Fund'}, {id: 'monthly', name: 'Monthly Budget'}]

    if (error) return <Error message={error}/>

    if (create) return (
        <Form endpoint="categories" item='category' updater={updateData} id={id} setter={setData} setLoading={setLoading} setError={setError} setEdit={setCreate}>
                <Input type="select" name="category_type" val={data.category_type} options={category_options}/>
                <Input type="text" name="name" val={data.name} />
                <Input type="text" name="current" val={data.current}/>
                <Input type="text" name="budget_amt" val={data?.budget_amt}/>
                <Input type="hidden" name="user_id" val={data.user_id} />
                <Input type="hidden" name="account_id" val={data.account_id}/>
                <Submit/>
        </Form>
    )

    return (
        <>
        {loading ? <Loading/> : 
        <div className="table accts">
              <div className='row'>
                    <div>Name</div>
                    <div>Budget Type</div>
                    <div>Account</div>
                    <div>Current</div>
                </div>
            {cat}
            <Edit setCreate={setCreate} name={data?.name}/>
            <Link to="/savings_funds" className="btn btn-lg custom-button" role="button">SAVINGS FUNDS</Link><br></br>
            <Link to="/monthly_categories" className="btn btn-lg custom-button" role="button">BUDGET CATEGORIES</Link>
        </div>
        }
        </>
          )
};

export default Category