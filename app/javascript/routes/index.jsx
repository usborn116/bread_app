import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Transactions from "../components/Transactions";
import Accounts from "../components/Accounts";
import Budgets from "../components/Budgets";
import Categories from "../components/Categories";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/transactions_list" element={<Transactions />} />
      <Route path="/accounts_list" element={<Accounts />} />
      <Route path="/budgets_list" element={<Budgets />} />
      <Route path="/category_list" element={<Categories />} />
    </Routes>
  </Router>
);