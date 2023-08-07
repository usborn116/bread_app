import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData, load } from "./helpers/api_helpers";
import PropTypes from 'prop-types';
import { LoadContext } from "./contexts/LoadContext";
import Loading from "./Loading";

const Categories = ({type}) => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([])
    const {loading, setLoading} = useContext(LoadContext)

    useEffect(() => {
        const url = `/categories/${type == 'monthly' ? "budget_categories" : "fund_categories"}`
        setLoading(true)
        getData(url, setCategories, navigate)
        load(setLoading, categories)
    }, []);

    const allCategories = categories.map((c, index) => (
        <div key={index} className="row">
            <Link to={"" + c.id} className="btn btn-lg custom-button" role="button">{c.name}</Link>
        </div>
    ));

    //            

    const noCategories = (
        <div>
            <div>NONE!</div>
        </div>
    )

    return (
        <>
        {loading ? <Loading/> : 
        <div>
            <h1 className="display-4">Categories</h1>
            <div className="table budgets">
                
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
        }
        </>
          )
};

Categories.propTypes = {
    type: PropTypes.string.isRequired,
  };

export default Categories