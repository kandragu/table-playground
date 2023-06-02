import React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { columns, data } from "./data/table";
import "./App.css";

import { Table } from "./Table";

function App() {
  return (
    <div className="App">
      <h1>Table Playground</h1>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="table" element={<TablePrimary />} />
          <Route path="st-table" element={<TableSecondary />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/table">Default</Link>
          </li>
          <li>
            <Link to="/st-table">Secondary</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

const TablePrimary = () => {
  return <Table data={data} columns={columns} radio />;
};

const TableSecondary = () => {
  return <Table data={data} columns={columns} checkbox variant="secondary" />;
};

export default App;
