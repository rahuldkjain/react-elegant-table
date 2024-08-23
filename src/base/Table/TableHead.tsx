import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import ArrowDownIcon from "../Icons/ArrowDown";
import TableColumn from "./TableColumn";
import TableRow from "./TableRow";
import { SortTypes, TableHeadProps } from "./types";

const getSortType = (type?: SortTypes) => {
  if (type) {
    if (type === SortTypes.desc) {
      return SortTypes.asc;
    }
    return SortTypes.desc;
  }
  return SortTypes.asc;
};

const TableHead: React.FC<TableHeadProps> = ({
  allRowsSelected = false,
  columns,
  isLoading = false,
  onSelect,
  onSort,
  sticky = false,
}) => {
  const [sortType, setSortType] = useState<SortTypes>();
  const [activeSortColumnKey, setActiveSortColumnKey] = useState<string>();

  const handleColumnClick = useCallback(
    (accessorKey: string) => {
      const type = getSortType(sortType);
      setActiveSortColumnKey(accessorKey);
      setSortType(type);
    },
    [sortType]
  );

  useEffect(() => {
    if (onSort && activeSortColumnKey && sortType) {
      onSort(activeSortColumnKey, sortType);
    }
  }, [sortType, activeSortColumnKey]);

  return (
    <thead
      className={clsx("text-black-500", {
        "sticky top-0 bg-white": sticky,
      })}
    >
      <TableRow>
        <>
          {onSelect !== undefined ? (
            <TableColumn className="w-5">
              <input
                type="checkbox"
                checked={isLoading ? false : allRowsSelected}
                onChange={(event) => {
                  if (onSelect) {
                    onSelect(event.target.checked);
                  }
                }}
              />
            </TableColumn>
          ) : null}
          {columns.map(
            ({
              accessorKey,
              className,
              header,
              sortable,
              sticky = false,
              width,
            }) => (
              <TableColumn
                className={clsx(
                  "select-none group",
                  {
                    "cursor-pointer": sortable && onSort,
                    "sticky left-0 border border-black": sticky,
                  },
                  className
                )}
                key={accessorKey}
                onClick={() => {
                  if (sortable && onSort && accessorKey) {
                    handleColumnClick(accessorKey);
                  }
                }}
                style={{ width }}
              >
                {sortable && onSort ? (
                  <div className="flex items-center group">
                    {header}&nbsp;
                    <ArrowDownIcon
                      className={clsx(
                        "rotate-0 transition-all opacity-0",
                        activeSortColumnKey === accessorKey && sortType
                          ? "group-hover:opacity-100"
                          : "group-hover:opacity-50",
                        {
                          "opacity-100":
                            activeSortColumnKey === accessorKey && sortType,
                          "rotate-0":
                            activeSortColumnKey === accessorKey &&
                            sortType === SortTypes.asc,
                          "rotate-180":
                            activeSortColumnKey === accessorKey &&
                            sortType === SortTypes.desc,
                        }
                      )}
                    />
                  </div>
                ) : (
                  header
                )}
              </TableColumn>
            )
          )}
        </>
      </TableRow>
    </thead>
  );
};

export default TableHead;
