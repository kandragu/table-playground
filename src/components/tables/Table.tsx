import React, { useState, useMemo, useCallback } from "react";
import classNames from "classnames";
import "./Table.scss";

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
  type?: "radio" | "checkbox" | "search" | undefined;
}

interface TableProps {
  data: Record<string, string | number>[];
  columns: Column[];
  radio?: boolean;
  checkbox?: boolean;
}

const Table: React.FC<TableProps> = ({ data, columns, radio, checkbox }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const [sortedColumn, setSortedColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleCheckboxSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, row: any) => {
      if (event.target.checked) {
        setSelectedRows((prevRows) => [...prevRows, row.id]);
      } else {
        setSelectedRows(
          (selectedRows as string[]).filter((id) => id !== row.id)
        );
      }
    },
    [selectedRows]
  );

  const renderCellContent = useCallback((row: any, column: Column) => {
    const { key, render, type } = column;

    if (!row[key]) return null;

    if (render) {
      return render(row[key], row);
    }

    return row[key];
  }, []);

  const handleHeaderClick = useCallback(
    (column: Column) => {
      if (sortedColumn === column.key) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        setSortedColumn(column.key);
        setSortDirection("asc");
      }
    },
    [sortedColumn, sortDirection]
  );

  const sortData = useMemo(
    () => (data: any[]) => {
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
    },
    [data, sortedColumn, sortDirection]
  );

  const renderHeader = useCallback(
    () => (
      <tr>
        {radio || checkbox ? <th></th> : null}
        {columns.map((column) => (
          <th
            key={column.key}
            className={classNames({
              "sort-asc":
                sortedColumn === column.key && sortDirection === "asc",
              "sort-desc":
                sortedColumn === column.key && sortDirection === "desc",
            })}
            onClick={() => handleHeaderClick(column)}
          >
            {column.label}
          </th>
        ))}
      </tr>
    ),
    [columns, sortedColumn, sortDirection, radio, checkbox, handleHeaderClick]
  );

  const renderSelectionButon = useCallback(
    (row: any) => {
      if (radio) {
        return (
          <td>
            <input
              type="radio"
              id={row.id}
              className={"selectionBtn"}
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
              className={"selectionBtn"}
              id={row.id}
              onChange={(event) => handleCheckboxSelect(event, row)}
            />
          </td>
        );
      } else {
        return null;
      }
    },
    [radio, checkbox, selectedRows, handleCheckboxSelect, setSelectedRows]
  );

  const renderRows = useCallback(
    () =>
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
      )),
    [
      columns,
      selectedRows,
      sortData,
      renderSelectionButon,
      renderCellContent,
      selectedRows.length,
    ]
  );

  return (
    <>
      <div className="mobile-header">Contact details</div>
      <table className="table">
        <thead>{renderHeader()}</thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </>
  );
};

export default Table;
