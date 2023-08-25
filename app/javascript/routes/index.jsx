import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Transactions from "../components/Transactions";
import Accounts from "../components/Accounts";
import Budgets from "../components/Budgets";
import Categories from "../components/Categories";
import Account from "../components/Account";
import Transaction from "../components/Transaction";
import Category from "../components/Category";
import Budget from "../components/Budget";
import Error from "../components/Error";
import Institution from "../components/Institution"
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transactions_list" element={<Transactions />} />
        <Route path="/accounts_list" element={<Accounts />} />
        <Route path="/budgets_list" element={<Budgets />} />
        <Route key="monthly" path="/categories_list" element={<Categories />} />
        <Route path="/accounts_list/:id" element={<Account />} />
        <Route path="/transactions_list/:id" element={<Transaction />} />
        <Route key="monthly" path="/categories_list/:id" element={<Category />} />
        <Route path="/budgets_list/:id" element={<Budget />} />
        <Route path="/institutions/:id" element={<Institution />} />
        <Route path="/*" element={<Error message="There's nothing at this URL!" />} />
      </Routes>
      <Footer />
    </Router>
  );