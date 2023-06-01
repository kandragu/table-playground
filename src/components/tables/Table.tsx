import React, { useState } from "react";
import classNames from "classnames";
import "./Table.scss";

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
  type?: "radio" | "checkbox" | "search" | undefined;
}

interface TableProps {
  data: any[];
  columns: Column[];
  radio?: boolean;
  checkbox?: boolean;
}

const Table: React.FC<TableProps> = ({ data, columns, radio, checkbox }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const [sortedColumn, setSortedColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleCheckboxSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: any
  ) => {
    if (event.target.checked) {
      setSelectedRows([...(selectedRows as string[]), row.id]);
    } else {
      setSelectedRows((selectedRows as string[]).filter((id) => id !== row.id));
    }
  };

  const renderCellContent = (row: any, column: Column) => {
    const { key, render, type } = column;

    if (!row[key]) return null;

    if (render) {
      return render(row[key], row);
    }

    //check if row.id is in selectedRows
    // if (selectedRows?.includes(row.id)) {
    //   return <span className="selected">{row[key]}</span>;
    // }

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
      {radio || checkbox ? <th></th> : null}
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

  const renderSelectionButon = (row: any) => {
    if (radio) {
      return (
        <td>
          <input
            type="radio"
            id={row.id}
            checked={selectedRows?.includes(row.id)}
            onChange={() => setSelectedRows([row.id])}
          />
        </td>
      );
    } else if (checkbox) {
      return (
        <td>
          <input
            type="checkbox"
            id={row.id}
            onChange={(event) => handleCheckboxSelect(event, row)}
          />
        </td>
      );
    } else {
      return null;
    }
  };

  const renderRows = () =>
    sortData(data).map((row) => (
      <tr
        key={row.id}
        className={classNames({
          "selected-row": selectedRows?.includes(row.id),
        })}
      >
        {renderSelectionButon(row)}
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
