export const load = (setter) => {
    setTimeout(() => {
        setter(false)
        },300
    )
}

export const getData= async (endpoint, setter, navigate, loader)=>{
    loader(true)
    try {
        const response=await fetch(`${endpoint}`)
        const data=await response.json()
        console.log('DATA!', data)
        setter(() => data)
        loader(false)
    }
    catch(error){
        console.log(error)
        setter([])
        navigate('/')
    }
}