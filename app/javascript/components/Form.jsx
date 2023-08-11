import React, {useRef} from "react";

const Form = ({endpoint, item, updater, id, setter, setLoading, setError, setEdit, children}) => {

    const formRef = useRef()

    const onSubmit = (e) =>{
        e.preventDefault()
        const formData=new FormData(formRef.current)
        const data=Object.fromEntries(formData)
        const info = {}
        if(item == 'account'){info[item] = { name: data.name, available: data.available}}
        if(item == 'transaction'){info[item] = {account_id: data.account_id, amount: data.amount, date: data.date, name: data.name, 
            merchant: data.merchant, description: data.description, user_id: data.user_id,
            transaction_type: data.transaction_type, transaction_id: data.transaction_id, category_id: data.category_id}}
        if(item == 'budget'){info[item] = {month: data.month, year: data.year}}
        if(item == 'category'){info[item] = {category_type: data.category_type, name: data.name, current: data.current,
        budget_amt: data.budget_amt, user_id: data.user_id, account_id: data.account_id}}
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