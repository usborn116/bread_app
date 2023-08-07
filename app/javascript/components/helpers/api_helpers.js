export const load = (setter) => {
    setTimeout(() => {
        setter(false)
        },300
    )
}

export const getData= async (endpoint, setter, navigate, loader)=>{
    try {
        const response=await fetch(`${endpoint}`)
        const data=await response.json()
        console.log('DATA!', data)
        setter(() => data)
    }
    catch(error){
        console.log(error)
        setter([])
        navigate('/')
    }
}