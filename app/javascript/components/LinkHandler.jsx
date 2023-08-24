import React, { useState, useEffect } from "react";
import {usePlaidLink} from 'react-plaid-link';

const LinkHandler = ({id = null, access_token = null, setLoading = null}) => {

    const [linkToken, setLinkToken] = useState(null)

    const generateToken = async () => {
        const response = await fetch(`/create_link_token${access_token ? `_update/${access_token}` : ''}`, { method: 'post'});
        const data = await response.json();
        setLinkToken(data.link_token)
    };

    useEffect(() => {
        generateToken();
    }, []);

    const onSuccess = React.useCallback(async (public_token, metadata) => {
        if (!id){
            setLoading(true)
            const response = await fetch(`/exchange_public_token/${public_token}`, {method: 'POST'});
            setLoading(false)
            return response
            
        }
    })

    const config = {
        token: linkToken,
        onSuccess
    };

    const { open } = usePlaidLink(config);

    return <button onClick={() => open()} id='linkButton'>{id ? 'Last Sync Failed. ' : ''}Connect {id ? 'This' : 'A'} Bank</button>
};

export default LinkHandler