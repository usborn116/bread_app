import React from "react";
import { updateData } from "./helpers/api_helpers";
import { useDataGetter } from "./helpers/useDataGetter";
import {useParams} from "react-router-dom";
import Loading from "./Loading";
import Error from "./Error";
import Form from "./Form";
import Input from "./Input";
import Submit from "./Submit";
import Single from "./Single";

const Budget = () => {
    const {id} = useParams();

    const {data, loading, error, setData, setError, setLoading, create, setDeleting, setCreate} = useDataGetter({endpoint: '/budgets', id: id})

    const headers1 = ['Budget Month', 'Budget Balance', 'Budgeted Amount', 'Rollover Amount']
    const columns1 = [`${data?.month} ${data?.year}`, data?.balance?.toFixed(2) || 0, data?.budget_amount?.toFixed(2), data?.rollover?.toFixed(2) || 0 ]
    
    const headers2 = ['Budget Item', 'Budget Amount', 'Current Balance']

    const items = data?.categories?.map((c, i) => <Single id={c?.id} columns={[c.name, c.budget_amt?.toFixed(2), c.current]}/> );

    const headers3 = ['Transaction', 'Cost', 'Date', 'Category']

    const txns = data?.categories?.map((c, i) => (
        c?.transactions.map((t,i) => <Single columns={[t.name, t.amount?.toFixed(2), t.date, c.name]}/>)
    ));
    

    if (error) return <Error message={error}/>

    const theMonths = ["January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October", "November", "December"]
    const months = theMonths.map((m, i) => i = {id: m, name: m})

    if (create) return (
        <Form endpoint="budgets" item='budget' updater={updateData} id={id} setter={setData} setLoading={setLoading} setError={setError} setEdit={setCreate}>
                <Input type="select" name="month" val={data.month} options={months}/>
                <Input type="hidden" name="year" val={String(new Date().getFullYear())}/>
                <Submit/>
        </Form>
    )

   

    return (
        <>
        {loading ? <Loading/> : 
            <>
            <Single headers={headers1} columns={columns1} name={`${data?.month} ${data?.year}`} setCreate={setCreate}/>
            <Single headers={headers2}/>
            {items}
            <Single headers={headers3}/>
            {txns}
            </>
        }
        </>
          )
};

export default Budget