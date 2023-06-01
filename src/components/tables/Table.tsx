import React, { useState } from "react";
import classNames from "classnames";
import "./Table.scss";

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
  type?: "radio" | "checkbox" | undefined;
}

interface TableProps {
  data: any[];
  columns: Column[];
}

const Table: React.FC<TableProps> = ({ data, columns }) => {
  const [selectedRows, setSelectedRows] = useState<Record<string, any>>({});

  const [sortedColumn, setSortedColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleCheckboxSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: any,
    key: string
  ) => {
    setSelectedRows((prevState) => ({
      ...prevState,
      [row.id]: {
        ...prevState[row.id],
        [key]: event.target.checked
          ? [...(prevState[row.id]?.[key] || []), event.target.value]
          : (prevState[row.id]?.[key] || []).filter(
              (val: string) => val !== event.target.value
            ),
      },
    }));
  };

  const handleRadioSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: any,
    key: string
  ) => {
    setSelectedRows((prevState) => ({
      ...prevState,
      [row.id]: {
        ...prevState[row.id],
        [key]: event.target.value,
      },
    }));
  };

  const renderCheckboxInput = (row: any, key: string, value: string) => (
    <input
      type="checkbox"
      value={value}
      checked={selectedRows[row.id]?.[key]?.includes(value) || false}
      onChange={(event) => handleCheckboxSelect(event, row, key)}
    />
  );

  const renderRadioInput = (row: any, key: string, value: string) => (
    <input
      type="radio"
      value={value}
      checked={selectedRows[row.id]?.[key] === value || false}
      onChange={(event) => handleRadioSelect(event, row, key)}
    />
  );

  const renderCellContent = (row: any, column: Column) => {
    const { key, render, type } = column;

    if (render) {
      return render(row[key], row);
    }

    if (type === "radio") {
      return (
        <fieldset style={{ display: "flex", justifyContent: "space-around" }}>
          <legend>{key}</legend>
          {row[key].map((item: any, idx: number) => (
            <span key={idx}>
              {renderRadioInput(row, key, item)}
              <label style={{ marginLeft: "0.2em" }}>{item}</label>
            </span>
          ))}
        </fieldset>
      );
    }

    if (type === "checkbox") {
      return row[key].map((item: any, idx: number) => (
        <span key={idx}>
          {renderCheckboxInput(row, key, item)}
          <label style={{ marginLeft: "0.2em" }}>{item}</label>
        </span>
      ));
    }

    return row[key];
  };

  const handleHeaderClick = (column: Column) => {
    if (sortedColumn === column.key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(column.key);
      setSortDirection("asc");
    }
  };

  const sortData = (data: any[]) => {
    if (sortedColumn) {
      return data.sort((a, b) => {
        const valueA = a[sortedColumn];
        const valueB = b[sortedColumn];

        if (valueA < valueB) {
          return sortDirection === "asc" ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return data;
  };

  const renderHeader = () => (
    <tr>
      {columns.map((column) => (
        <th
          key={column.key}
          className={classNames({
            "sort-asc": sortedColumn === column.key && sortDirection === "asc",
            "sort-desc":
              sortedColumn === column.key && sortDirection === "desc",
          })}
          onClick={() => handleHeaderClick(column)}
        >
          {column.label}
        </th>
      ))}
    </tr>
  );

  const renderRows = () =>
    sortData(data).map((row) => (
      <tr key={row.id}>
        {columns.map((column) => (
          <td key={column.key}>{renderCellContent(row, column)}</td>
        ))}
      </tr>
    ));

  return (
    <table className="table">
      <thead>{renderHeader()}</thead>
      <tbody>{renderRows()}</tbody>
    </table>
  );
};

export default Table;
