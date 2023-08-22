import React from "react";
import { useDataGetter } from "./helpers/useDataGetter";
import Loading from "./Loading";
import Error from "./Error";
import LinkHandler from './LinkHandler'
import Single from "./Single";

const Institutions = () => {
    const endpoint = `/plaid_credentials`

    const {data, loading, error, setData, setError, setLoading, create, setDeleting, setCreate} = useDataGetter({endpoint: endpoint})

    const headers = ['Institution Name', 'Institution ID', 'Notices']

    const columns = data?.map((cred) => <Single columns={[cred.id, cred.institution_name, cred.institution_id, 
        `${cred?.notice?.split(' ')[0] == 'Failed' ? <LinkHandler id={cred.id} access_token={cred.access_token}/> : `${cred.notice}`}`]} 
        setCreate={setCreate} 
        name={cred.institution_name}/>
    )

    if (error) return <Error message={error}/>

    return (
        <>
        {loading ? <Loading/> : 
        <>
            <Single headers={headers}/>
            {columns}
        </>
        }
        </>
          )
};

export default Institutions