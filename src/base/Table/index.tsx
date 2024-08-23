import { get } from "../../utils";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { LooseObject } from "../../types";
import TableCell from "./TableCell";
import TableHead from "./TableHead";
import TableRow from "./TableRow";
import { BaseTableProps, TableColumnProps } from "./types";

const BaseTable: React.FC<BaseTableProps> = ({
  columns,
  defaultActiveRowId,
  isLoading,
  onRowClicked,
  onSort,
  pageSize = 10,
  placeholder = "no entries found",
  rowKey,
  rows,
  rowSelection,
  scrollWidth,
  showAlternateRowColored = false,
  sticky = false,
}) => {
  // state to keep track of the selected row to highlight it.
  const [activeRow, setActiveRow] = useState<number | string>("");

  useEffect(() => {
    setActiveRow(defaultActiveRowId ?? "");
  }, [defaultActiveRowId]);

  const getCellData = (
    row: LooseObject,
    column: TableColumnProps
  ): React.ReactNode | string => {
    const { accessorFn, accessorKey } = column;

    if (accessorFn) {
      return accessorFn(row);
    }

    if (accessorKey) {
      return get(row, accessorKey, "");
    }

    return "";
  };

  const handleRowSelection = (data: LooseObject, checked: boolean) => {
    if (rowSelection) {
      rowSelection.onRowSelect(data, checked);
    }
  };

  const isChecked = (data: { [key: string]: any }) => {
    if (rowSelection) {
      const id = data[rowKey];
      return rowSelection.selectedRowIds.includes(id.toString());
    }
    return false;
  };

  return (
    <div className="w-full overflow-x-auto relative">
      <table
        className="table-fixed min-w-full"
        style={{ width: scrollWidth ?? "100%" }}
      >
        <TableHead
          allRowsSelected={rowSelection?.areAllRowsSelected ?? false}
          columns={columns}
          isLoading={isLoading}
          onSelect={rowSelection?.onAllRowSelect}
          onSort={onSort}
          sticky={sticky}
        />
        <tbody>
          {rows.length ? (
            <>
              {rows.map((data, index) => {
                return (
                  <React.Fragment key={`row-${index}`}>
                    <TableRow
                      className={clsx(
                        "hover:bg-white-300",
                        activeRow === data[rowKey]
                          ? "border border-black-500 bg-white-400 active-row"
                          : "border-t border-black-500/10",
                        {
                          "bg-gray-50":
                            showAlternateRowColored && index % 2 === 1,
                          "hover:cursor-pointer": onRowClicked !== undefined,
                        }
                      )}
                      onClick={() => {
                        if (onRowClicked) {
                          setActiveRow(data[rowKey]);
                          onRowClicked(data);
                        }
                      }}
                    >
                      {rowSelection ? (
                        <TableCell
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isLoading ? false : isChecked(data)}
                            onChange={(event) => {
                              handleRowSelection(data, event.target.checked);
                            }}
                          />
                        </TableCell>
                      ) : null}
                      {columns.map((column) => (
                        <TableCell
                          className={clsx(
                            activeRow === data[rowKey]
                              ? "bg-white-400 active-row-cell"
                              : "inherit",
                            {
                              "sticky left-0": column.sticky,
                            }
                          )}
                          key={column.accessorKey}
                        >
                          {isLoading ? (
                            <div className="w-full h-full bg-white-300 animate-pulse" />
                          ) : (
                            getCellData(data, column)
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </>
          ) : (
            <>
              {Array(pageSize)
                .fill("", 0, 9)
                .map((_, index) => {
                  return (
                    <TableRow key={`row-${index}`}>
                      {rowSelection ? (
                        <TableCell className="bg-white-500">
                          {isLoading ? (
                            <div className="w-full h-full bg-white-300 animate-pulse" />
                          ) : (
                            ""
                          )}
                        </TableCell>
                      ) : null}
                      {columns.map((column) => (
                        <TableCell
                          className="bg-white-500"
                          key={column.accessorKey}
                        >
                          {isLoading ? (
                            <div className="w-full h-full bg-white-300 animate-pulse" />
                          ) : (
                            ""
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
            </>
          )}
        </tbody>
      </table>
      {rows.length === 0 && isLoading === false ? (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-medium text-black-500/50">
          {placeholder}
        </div>
      ) : null}
    </div>
  );
};

export default BaseTable;
