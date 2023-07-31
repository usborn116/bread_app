import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Transactions from "../components/Transactions";
import Accounts from "../components/Accounts";
import Budgets from "../components/Budgets";
import Categories from "../components/Categories";
import Account from "../components/Account";
import Transaction from "../components/Transaction";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/transactions_list" element={<Transactions />} />
      <Route path="/accounts_list" element={<Accounts />} />
      <Route path="/budgets_list" element={<Budgets />} />
      <Route path="/monthly_categories" element={<Categories type='monthly' />} />
      <Route path="/savings_funds" element={<Categories type='fund' />} />
      <Route path="/accounts_list/:id" element={<Account />} />
      <Route path="/transactions_list/:id" element={<Transaction />} />
    </Routes>
  </Router>
);