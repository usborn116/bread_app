export const load = (setter, items) => {
    setTimeout(() => {
        setter(false)
        },500
    )
    console.log(items)
}

export const getData= async (endpoint, setter, navigate)=>{
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