export const load = (setter) => {
    setTimeout(() => {
        setter(() => false)
        },300
    )
}

export const getData= async (endpoint, setter, navigate, loader, errorSetter)=>{
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
        console.log(error)
        setter([])
        if (errorSetter && error.message.match(/is not valid JSON/)) {return errorSetter(`${endpoint} not found`)};
        if (errorSetter) {errorSetter(error.message)};
        //navigate('/')
    }
}