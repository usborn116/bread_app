import React, {useState, useEffect }from "react";
import { newData } from "./helpers/api_helpers";
import { useDataGetter } from "./helpers/useDataGetter";
import Loading from "./Loading";
import Error from "./Error";
import Form from "./Form";
import Input from "./Input";
import Submit from "./Submit";
import List from "./List";

const Categories = () => {
    const [monthly, setMonthly] = useState(true)
    const endpoint = `/categories/${monthly ? "budget_categories" : "fund_categories"}`

    const {data, loading, error, setData, setError, setLoading, create, setDeleting, setCreate} = useDataGetter({endpoint: endpoint, monthly: monthly})

    const category_options = [{id: 'fund', name: 'Savings Fund'}, {id: 'monthly', name: 'Monthly Budget'}]

    const headers = ['Name', 'Budget Type', 'Account', 'Current']

    if (error) return <Error message={error}/>

    if (create) return (
        <Form endpoint="categories" item='category' updater={newData} setter={setData} setLoading={setLoading} setError={setError} setEdit={setCreate}>
                <Input type="select" name="category_type" options={category_options}/>
                <Input type="text" name="name" placeHolder='Name' />
                <Input type="text" name="current" placeHolder='Current Amount'/>
                <Input type="text" name="budget_amt" placeHolder='Budget Amount'/>
                <Input type="select" name="account_id" val='' options={data?.accounts}/>
                <Submit/>
        </Form>
    )

    return (
        <>
        {loading ? <Loading/> : 
        <List headers={headers} data={data?.budgets} tablename='Categories' setCreate={setCreate} setDeleting={setDeleting} setData={setData} setLoading={setLoading} setError={setError} monthly={monthly} setMonthly={setMonthly}/>
        }
        </>
          )
};

export default Categories