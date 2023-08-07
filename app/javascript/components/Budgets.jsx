import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData, load } from "./helpers/api_helpers";
import { LoadContext } from "./contexts/LoadContext";
import Loading from "./Loading";

const Budgets = () => {
    const navigate = useNavigate();
    const [budgets, setBudgets] = useState([])
    const {loading, setLoading} = useContext(LoadContext)

    useEffect(() => {
        setLoading(true)
        const url = "/budgets";
        getData(url, setBudgets, navigate)
        load(setLoading, budgets)
    }, []);

    const allBudgets = budgets.map((b, index) => (
        <div key={index} className="row">
            <Link to={"" + b.id} className="btn btn-lg custom-button" role="button">{b.month}</Link>
        </div>
    ));

    //            

    const noBudgets = (
        <div>
            <div>NONE!</div>
        </div>
    )

    return (
        <>
        {loading ? <Loading /> : 
        <div>
            <h1 className="display-4">Budgets</h1>
            <div className="table budgets">
                {budgets.length > 0 ? allBudgets : noBudgets}
                
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

export default Budgets