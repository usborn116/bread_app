import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData, load } from "./helpers/api_helpers";

const Transactions = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const url = "/transactions";
        getData(url, setTransactions, navigate)
        load(setLoading, transactions)
    }, [loading]);

    const allTransactions = transactions.map((t, index) => (
        <tr key={index}>
            <td>{t.date}</td>
            <td>{t.name}</td>
            <td>{t.amount}</td>

            <td>{t.merchant}</td>
        </tr>
    ));

    //            <td>{t.group.name}</td>

    const noTransactions = (
        <tr>
            <td>There are no transactions!</td>
        </tr>
    )

    return (
        <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
              <h1 className="display-4">Transactions</h1>
              <table>
                  <thead>
                      <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Budget/Fund</th>
                        <th>Merchant</th>
                        <th>Account</th>
                        <th>Institution</th>
                      </tr>
                  </thead>
                  <tbody>
                  {transactions.length > 0 ? allTransactions : noTransactions}
                  </tbody>
              </table>
              
              <Link
                to="/transactions"
                className="btn btn-lg custom-button"
                role="button"
              >
                View Transactions
              </Link>
        </div>
          )
};

export default Transactions