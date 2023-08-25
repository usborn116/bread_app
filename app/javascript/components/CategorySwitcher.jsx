import React from "react";

const CategorySwitcher = ({setMonthly, monthly}) => {

    return (
        <button className="button" onClick={() => monthly ? setMonthly(false) : setMonthly(true)} value='Edit!'>
            View {monthly ? 'Savings Funds' : 'Monthly Budgets'}
        </button>
    )

};

export default CategorySwitcher