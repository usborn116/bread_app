import React from "react";
import { newData } from "./helpers/api_helpers";
import Loading from "./Loading";
import Error from "./Error";
import Form from "./Form";
import Input from "./Input";
import Submit from "./Submit";
import { useDataGetter } from "./helpers/useDataGetter";
import List from "./List";

const Budgets = () => {
    const {data, loading, error, setData, setError, setLoading, create, setDeleting, setCreate} = useDataGetter({endpoint: 'budgets'})         
    
    const theMonths = ["January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October", "November", "December"]
    const months = theMonths.map((m, i) => i = {id: m, name: m})
    
    if (error) return <Error message={error}/>

    if (create) return (
        <Form endpoint="budgets" item='budget' updater={newData} setter={setData} setLoading={setLoading} setError={setError} setEdit={setCreate}>
                <Input type="select" name="month" val={data.month} options={months}/>
                <Input type="hidden" name="year" val={String(new Date().getFullYear())}/>
                <Submit/>
        </Form>
    )

    return (
        <>
        {loading ? <Loading /> : 
        <List data={data} tablename='Budgets' setCreate={setCreate} setDeleting={setDeleting} setData={setData} setLoading={setLoading} setError={setError}/>
        }
        </>
          )
};

export default Budgets