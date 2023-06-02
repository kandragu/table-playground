import { __spreadArray } from "tslib/tslib.es6.js";
import React, { useState, useCallback, useMemo } from "react";
import classNames from "classnames";
import "../../index.css";

var Table = function (_a) {
  var data = _a.data,
    columns = _a.columns,
    radio = _a.radio,
    checkbox = _a.checkbox,
    _b = _a.variant,
    variant = _b === void 0 ? "primary" : _b;
  var _c = useState([]),
    selectedRows = _c[0],
    setSelectedRows = _c[1];
  var _d = useState(""),
    sortedColumn = _d[0],
    setSortedColumn = _d[1];
  var _e = useState("asc"),
    sortDirection = _e[0],
    setSortDirection = _e[1];
  var handleCheckboxSelect = useCallback(
    function (event, row) {
      if (event.target.checked) {
        setSelectedRows(function (prevRows) {
          return __spreadArray(
            __spreadArray([], prevRows, true),
            [row.id],
            false
          );
        });
      } else {
        setSelectedRows(
          selectedRows.filter(function (id) {
            return id !== row.id;
          })
        );
      }
    },
    [selectedRows]
  );
  var renderCellContent = useCallback(function (row, column) {
    var key = column.key,
      render = column.render;
    column.type;
    if (!row[key]) return null;
    if (render) {
      return render(row[key], row);
    }
    return row[key];
  }, []);
  var handleHeaderClick = useCallback(
    function (column) {
      if (sortedColumn === column.key) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        setSortedColumn(column.key);
        setSortDirection("asc");
      }
    },
    [sortedColumn, sortDirection]
  );
  var sortData = useMemo(
    function () {
      return function (data) {
        if (sortedColumn) {
          return data.sort(function (a, b) {
            var valueA = a[sortedColumn];
            var valueB = b[sortedColumn];
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
    },
    [data, sortedColumn, sortDirection]
  );
  var renderHeader = useCallback(
    function () {
      return React.createElement(
        "tr",
        null,
        radio || checkbox ? React.createElement("th", null) : null,
        columns.map(function (column) {
          return React.createElement(
            "th",
            {
              key: column.key,
              className: classNames({
                "sort-asc":
                  sortedColumn === column.key && sortDirection === "asc",
                "sort-desc":
                  sortedColumn === column.key && sortDirection === "desc",
              }),
              onClick: function () {
                return handleHeaderClick(column);
              },
            },
            column.label
          );
        })
      );
    },
    [columns, sortedColumn, sortDirection, radio, checkbox, handleHeaderClick]
  );
  var renderSelectionButon = useCallback(
    function (row) {
      if (radio) {
        return React.createElement(
          "td",
          null,
          React.createElement("input", {
            type: "radio",
            id: row.id,
            className: "selectionBtn",
            checked:
              selectedRows === null || selectedRows === void 0
                ? void 0
                : selectedRows.includes(row.id),
            onChange: function () {
              return setSelectedRows([row.id]);
            },
          })
        );
      } else if (checkbox) {
        return React.createElement(
          "td",
          null,
          React.createElement("input", {
            type: "checkbox",
            className: "selectionBtn",
            id: row.id,
            onChange: function (event) {
              return handleCheckboxSelect(event, row);
            },
          })
        );
      } else {
        return null;
      }
    },
    [radio, checkbox, selectedRows, handleCheckboxSelect, setSelectedRows]
  );
  var renderRows = useCallback(
    function () {
      return sortData(data).map(function (row) {
        var _a;
        return React.createElement(
          "tr",
          {
            key: row.id,
            className: classNames(
              ((_a = {}),
              (_a["table-selected-row-".concat(variant)] =
                selectedRows === null || selectedRows === void 0
                  ? void 0
                  : selectedRows.includes(row.id)),
              _a)
            ),
          },
          renderSelectionButon(row),
          columns.map(function (column) {
            return React.createElement(
              "td",
              { key: column.key },
              renderCellContent(row, column)
            );
          })
        );
      });
    },
    [
      columns,
      selectedRows,
      sortData,
      renderSelectionButon,
      renderCellContent,
      selectedRows.length,
    ]
  );
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "div",
      { className: "mobile-header" },
      "Contact details"
    ),
    React.createElement(
      "table",
      { className: classNames("table", "table-".concat(variant)) },
      React.createElement("thead", null, renderHeader()),
      React.createElement("tbody", null, renderRows())
    )
  );
};

export { Table as default };
//# sourceMappingURL=Table.js.map
