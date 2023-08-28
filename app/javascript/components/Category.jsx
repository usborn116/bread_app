import React from "react";
import { updateData } from "./helpers/api_helpers";
import {useParams} from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";
import Form from "./Form";
import Input from "./Input";
import Submit from "./Submit";
import { useDataGetter } from "./helpers/useDataGetter";
import Single from "./Single";


const Category = () => {
    const {id} = useParams();

    const {data, loading, error, setData, setError, setLoading, create, setDeleting, setCreate} = useDataGetter({endpoint: '/categories', id: id})

    const headers = ['Name', 'Budget Type', 'Account', 'Current']
    const columns = [`${data?.name} ${data?.budget_month || ''}`, data?.category_type, `${data?.account?.name || 'None'}`, `${data?.current?.toFixed(2) || 0.00}`]

    const category_options = [{id: 'fund', name: 'Savings Fund'}, {id: 'monthly', name: 'Monthly Budget'}]

    if (error) return <Error message={error}/>

    if (create) return (
        <Form endpoint="categories" item='category' updater={updateData} id={id} setter={setData} setLoading={setLoading} setError={setError} setEdit={setCreate}>
                <Input type="select" name="category_type" val={data.category_type} options={category_options}/>
                <Input type="text" name="name" val={data.name} placeHolder='name' />
                <Input type="text" name="current" val={data.current} placeHolder='current amount'/>
                <Input type="text" name="budget_amt" val={data?.budget_amt} placeHolder='budgeted amount'/>
                <Input type="hidden" name="user_id" val={data.user_id} />
                <Input type="hidden" name="account_id" val={data.account_id}/>
                <Submit/>
        </Form>
    )

    return (
        <>
        {loading ? <Loading/> : 
        <Single headers={headers} columns={columns} name={data?.name} setCreate={setCreate}/>
        }
        </>
          )
};

export default Category