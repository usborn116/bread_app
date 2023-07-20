import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData, load } from "./helpers/api_helpers";
import PropTypes from 'prop-types';

const Categories = ({type}) => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const url = `/categories/${type == 'monthly' ? "budget_categories" : "fund_categories"}`
        console.log(url)
        getData(url, setCategories, navigate)
        load(setLoading, categories)
    }, [loading]);

    const allCategories = categories.map((c, index) => (
        <div key={index} className="row">
            <div>{c.name}</div>
            <div>{c.category_type}</div>
            <div>{c.account ? c.account.name : 'None'}</div>
            <div>{c.current.toFixed(2)}</div>
        </div>
    ));

    //            

    const noCategories = (
        <div>
            <div>NONE!</div>
        </div>
    )

    return (
        <div>
            <h1 className="display-4">Categories</h1>
            <div className="table budgets">
                
                <div className='row'>
                    <div>Name</div>
                    <div>Budget Type</div>
                    <div>Account</div>
                    <div>Current</div>
                </div>
                {categories.length > 0 ? allCategories : noCategories}
                
                <Link
                    to="/"
                    className="btn btn-lg custom-button"
                    role="button"
                >
                    HOME
                </Link>
            </div>
            </div>
          )
};

Categories.propTypes = {
    type: PropTypes.string.isRequired,
  };

export default Categories