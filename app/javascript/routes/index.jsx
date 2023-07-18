import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Transactions from "../components/Transactions";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/transactions_list" element={<Transactions />} />
    </Routes>
  </Router>
);