import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData, load, newData } from "./helpers/api_helpers";
import PropTypes from 'prop-types';
import { LoadContext } from "./contexts/LoadContext";
import Loading from "./Loading";
import Error from "./Error";
import Form from "./Form";
import Input from "./Input";
import Submit from "./Submit";

const Categories = ({type}) => {
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const {loading, setLoading} = useContext(LoadContext)
    const [error, setError] = useState(null)
    const [create, setCreate] = useState(false)

    useEffect(() => {
        const url = `/categories/${type == 'monthly' ? "budget_categories" : "fund_categories"}`
        setLoading(true)
        getData(url, setData, navigate)
        load(setLoading, data)
    }, [create]);

    const allCategories = data?.budgets?.map((d, index) => (
        <div key={index} className="row">
            <Link to={"" + d.id} className="btn btn-lg custom-button" role="button">{d.name}</Link>
        </div>
    ));

    const category_options = [{id: 'fund', name: 'Savings Fund'}, {id: 'monthly', name: 'Monthly Budget'}]

    if (error) return <Error message={error}/>

    if (create) return (
        <Form endpoint="categories" item='category' updater={newData} setter={setData} setLoading={setLoading} setError={setError} setEdit={setCreate}>
                <Input type="select" name="category_type" options={category_options}/>
                <Input type="text" name="name" placeHolder='Name' />
                <Input type="text" name="current" placeHolder='Current Amount'/>
                <Input type="text" name="budget_amt" placeHolder='Budget Amount'/>
                <Input type="select" name="account_id" val='' options={data?.accounts}/>
                <Submit/>
        </Form>
    )

    return (
        <>
        {loading ? <Loading/> : 
        <div>
            <h1 className="display-4">Categories</h1>
            <div className="table budgets">
            <button onClick={() => setCreate(true)}>CREATE</button>
                {allCategories}
                
                <Link
                    to="/"
                    className="btn btn-lg custom-button"
                    role="button"
                >
                    HOME
                </Link>
            </div>
        </div>
        }
        </>
          )
};

Categories.propTypes = {
    type: PropTypes.string.isRequired,
  };

export default Categories