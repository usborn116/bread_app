import React, {useRef} from "react";

const Form = ({endpoint, item, updater, id, setter, setLoading, setError, setEdit, children}) => {

    const formRef = useRef()

    const onSubmit = (e) =>{
        e.preventDefault()
        const formData=new FormData(formRef.current)
        const data=Object.fromEntries(formData)
        const info = {}
        info[item] = { name: data.name, available: data.available} //account
        info[item] = {account_id: data.account_id, amount: data.amount, date: data.date, name: data.name, 
            merchant: data.merchant, description: data.description, user_id: data.user_id,
                transaction_type: data.transaction_type, transaction_id: data.transaction_id, category_id: data.category_id} //transaction
        updater(`/${endpoint}/${id}`, setter, info, setLoading, setError)
        setEdit(false)
    }

    return (
        <div className="form">
            <form ref={formRef} onSubmit={onSubmit}>
                {children}
            </form>
        </div>
          )
};

export default Form