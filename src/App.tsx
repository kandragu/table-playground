import React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Table from "./components/tables/Table";

function App() {
  return (
    <div className="App">
      <div>
        <h1>Basic Example test</h1>

        <p>
          This example demonstrates some of the core features of React Router
          including nested <code>&lt;Route&gt;</code>s,{" "}
          <code>&lt;Outlet&gt;</code>s, <code>&lt;Link&gt;</code>s, and using a
          "*" route (aka "splat route") to render a "not found" page when
          someone visits an unrecognized URL.
        </p>

        {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="table" element={<TablePage />} />

            {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/table">TablePage</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

const TablePage = () => {
  const columns = [
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    {
      key: "single-select",
      label: "Single Select",
      type: "radio" as "radio" | "checkbox" | undefined,
    },
    {
      key: "multi-select",
      label: "Multi Select",
      type: "checkbox" as "radio" | "checkbox" | undefined,
    },
  ];

  const data = [
    {
      id: 1,
      name: "John Doe",
      age: 25,
      "single-select": ["optionA", "optionB"],
      "multi-select": ["optionA", "optionB"],
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 30,
      "single-select": ["optionA", "optionB"],
      "multi-select": ["optionA", "optionB"],
    },
    {
      id: 3,
      name: "Bob Johnson",
      age: 35,
      "single-select": ["optionA", "optionB"],
      "multi-select": ["optionA", "optionB"],
    },
  ];

  // generate a more data
  for (let i = 0; i < 10; i++) {
    data.push({
      id: i + 4,
      name: `John Doe ${i}`,
      age: 25 + i,
      "single-select": ["optionA", "optionB"],
      "multi-select": ["optionA", "optionB"],
    });
  }

  return (
    <div>
      <h1>Table Example</h1>
      <Table data={data} columns={columns} />
    </div>
  );
};

export default App;
