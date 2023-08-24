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


const Institution = () => {
    const {id} = useParams();

    const {data, loading, error, setData, setError, setLoading, create, setDeleting, setCreate} = useDataGetter({endpoint: '/categories', id: id})

    const headers1 = ['Accounts']

    const headers2 = ['Transaction', 'Amount']
    const columns = [`${data?.name} ${data?.budget_month || ''}`, data?.category_type, `${data?.account?.name || 'None'}`, `${data?.current?.toFixed(2) || 0.00}`]

    const category_options = [{id: 'fund', name: 'Savings Fund'}, {id: 'monthly', name: 'Monthly Budget'}]

    if (error) return <Error message={error}/>

    return (
        <>
        {loading ? <Loading/> : 
        <Single headers={headers1} columns={columns} name={data?.institution_name}/>
        }
        </>
          )
};

export default Institution