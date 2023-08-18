import { useState, useEffect } from 'react';
import { getData } from './api_helpers';

export function useDataGetter({endpoint, id = null}) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [create, setCreate] = useState(false)
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        setLoading(true)
        const url = `${endpoint}${id ? `/${id}` : ''}`;
        getData(url, setData, setError)
        setLoading(false)
      }, [create, deleting, loading]); 
    
    const response = {data: data, loading: loading, error: error, create: create, deleting: deleting, setData: setData, setLoading: setLoading,
        setError: setError, setCreate: setCreate, setDeleting: setDeleting }
    return response
}


