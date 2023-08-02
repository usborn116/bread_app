import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData, load } from "./helpers/api_helpers";
import {useParams} from "react-router-dom";

const Category = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const url = `/categories/${id}`;
        getData(url, setCategory, navigate)
        load(setLoading, category)
      }, [loading]);  
    
    const cat =
        <div className="row">
            
            <div>{category.name} {category.budget_month ? category.budget_month : ''}</div>
            <div>{category.category_type}</div>
            <div>{category.account ? category.account.name : 'None'}</div>
            <div>{category.current ? category.current.toFixed(2) : 0}</div>
        </div>
    ;

    return (
        <div className="table accts">
              <div className='row'>
                    <div>Name</div>
                    <div>Budget Type</div>
                    <div>Account</div>
                    <div>Current</div>
                </div>
            {cat}
            <Link to="/savings_funds" className="btn btn-lg custom-button" role="button">SAVINGS FUNDS</Link><br></br>
            <Link to="/monthly_categories" className="btn btn-lg custom-button" role="button">BUDGET CATEGORIES</Link>
        </div>
          )
};

export default Category