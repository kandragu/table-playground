import React, { useState } from "react";
import classNames from "classnames";
import "./Table.scss";

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface TableProps {
  data: any[];
  columns: Column[];
}

const Table: React.FC<TableProps> = ({ data, columns }) => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [sortedColumn, setSortedColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleRowSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: any
  ) => {
    const selectedRowIds = selectedRows.map((selectedRow) => selectedRow.id);
    let updatedSelectedRows;

    if (event.target.checked) {
      updatedSelectedRows = [...selectedRows, row];
    } else {
      updatedSelectedRows = selectedRows.filter(
        (selectedRow) => selectedRow.id !== row.id
      );
    }

    setSelectedRows(updatedSelectedRows);
  };

  const handleRadioSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: any
  ) => {
    setSelectedRows([row]);
  };

  const isRowSelected = (row: any) =>
    selectedRows.some((selectedRow) => selectedRow.id === row.id);

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

  const renderCellContent = (row: any, column: Column) => {
    const { key, render } = column;

    if (render) {
      return render(row[key], row);
    }

    return row[key];
  };

  const renderRadioInput = (row: any) => (
    <input
      type="radio"
      name="radioSelect"
      checked={isRowSelected(row)}
      onChange={(event) => handleRadioSelect(event, row)}
    />
  );

  const renderCheckboxInput = (row: any) => (
    <input
      type="checkbox"
      checked={isRowSelected(row)}
      onChange={(event) => handleRowSelect(event, row)}
    />
  );

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
      <th>Select</th>
    </tr>
  );

  const renderRows = () =>
    sortData(data).map((row) => (
      <tr key={row.id}>
        {columns.map((column) => (
          <td key={column.key}>{renderCellContent(row, column)}</td>
        ))}
        <td className="select-column">{renderCheckboxInput(row)}</td>
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
