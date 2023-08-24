const errorHandler = (errorSetter, error, endpoint) => {
    console.log(error)
    if (error?.message?.match(/is not valid JSON/)) {return errorSetter(`${endpoint} not found`)};
    if (errorSetter) {errorSetter(error.message ? error.message : error)};
}

export const getData= async (endpoint, setter, errorSetter)=>{
    try {
        const response=await fetch(`${endpoint}`)
        if (response.status > 400){
            throw new Error(`${response.status}: ${response.statusText}`)
        }
        const data=await response.json()
        console.log('data',data)
        setter(() => data)
    }
    catch(error){
        errorHandler(errorSetter, error, endpoint)
    }
}

export const load = (setter) => {
    setTimeout(() => {
        setter(() => false)
        },300
    )
}

export const updateData = async (endpoint, setter, info, loader, errorSetter) => {
    try{
        const response=await fetch(`${endpoint}`, {
            method: 'put',
            headers: {
                "content-type": 'application/json',
                "accept": "application/json",
            },
            body: JSON.stringify(info)
        }) 
        const data=await response.json()
        if(!response.ok) throw data.error
        getData(endpoint, setter, 2, loader, errorSetter)
    } catch (error){
        errorHandler(errorSetter, error, endpoint)
    }
}

export const deleteData = async (endpoint, setter, loader, errorSetter)=>{
    try{
        const response=await fetch(`${endpoint}`, {
            method: 'delete',
            headers: {
                "content-type": 'application/json',
                "accept": "application/json",
            },
        }) 
        const data=await response.json()
        if(!response.ok) throw data.error
        //getData(endpoint, setter, 2, loader, errorSetter)
    } catch (error){
        errorHandler(errorSetter, error, endpoint)
    }
}

export const newData = async (endpoint, setter, info, loader, errorSetter)=>{
    try{
        const response=await fetch(`${endpoint}`, {
            method: 'post',
            headers: {
                "content-type": 'application/json',
                "accept": "application/json",
            },
            body: JSON.stringify(info)
        }) 
        const data=await response.json()
        if(!response.ok) throw data.error
    } catch (error){
        errorHandler(errorSetter, error, endpoint)
    }
}

export const getTransactions = async function (setLoading){
    setLoading(true)
    await fetch('/sync_transactions', {
        headers: {
            "content-type": "application/json"
        },
        method: "get"
    })
    setLoading(false)
}