import React, { useCallback, useEffect, useRef, useState } from "react";

import { Table as BaseTable } from "../base";
import TableActions from "../base/Table/TableActions";
import TableContainer from "../base/Table/TableContainer";
import TableDescription from "../base/Table/TableDescription";
import TablePagination from "../base/Table/TablePagination";
import { SortDetails, SortTypes, TableProps } from "../base/Table/types";
import { LooseObject } from "../types";

const INITIAL_PAGE_NUMBER = 1;
const Table: React.FC<TableProps> = ({
  actions,
  columns,
  defaultActiveRowId,
  dependencies = [],
  fetchRows,
  header,
  isLoading,
  onInitialRowsFetched,
  onRowClicked,
  onRowSelect,
  onSort,
  pageSize = 10,
  pagination,
  placeholder,
  rowKey,
  rows,
  scrollWidth,
  showAlternateRowColored = false,
  sticky,
}) => {
  const [currentRows, setCurrentRows] = useState<LooseObject[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(INITIAL_PAGE_NUMBER);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  const [selection, setSelection] = useState<LooseObject>({});
  const [areAllRowsSelected, setAllRowsSelected] = useState<boolean>(false);
  const hasInitialRowsFetched = useRef<boolean>(false);
  const sortDetailsRef = useRef<SortDetails>();

  // backward compatibility for pageSize prop
  // TODO: remove this in next major release
  const _pageSize =
    typeof pagination !== "boolean"
      ? pagination?.pageSize ?? pageSize
      : pageSize;

  const handleRowSelect = (data: LooseObject, checked = false) => {
    if (checked) {
      setSelection({ ...selection, [data[rowKey]]: data });
    } else {
      const newSelection = { ...selection };
      delete newSelection[data[rowKey]];
      setSelection(newSelection);
    }
    setAllRowsSelected(false);
  };

  const handleAllRowSelect = (checked = false) => {
    if (checked) {
      const newSelection: { [key: string]: any } = {};
      currentRows.forEach((row) => {
        newSelection[row[rowKey]] = row;
      });
      setSelection(newSelection);
    } else {
      setSelection([]);
    }
    setAllRowsSelected(checked);
  };

  const updatePagination = (
    list: LooseObject[],
    hasNextPage: boolean,
    actualPage: number
  ) => {
    setCurrentRows(list);
    setHasNextPage(hasNextPage);
    setCurrentPage(actualPage);
  };

  const updateTable = useCallback(
    async (page?: number) => {
      if (isLoading === undefined) {
        setIsTableLoading(true);
      }
      try {
        let list: LooseObject[] = [];
        let hasNextPage = false;
        const actualPage = page ?? currentPage; // current page for initial update
        if (rows?.length) {
          list = rows.slice(
            (actualPage - 1) * _pageSize,
            actualPage * _pageSize
          );
          hasNextPage = actualPage < Math.ceil(rows.length / _pageSize);
        } else if (fetchRows) {
          const result = await fetchRows(
            actualPage,
            _pageSize,
            sortDetailsRef.current
          );
          list = result.list;
          hasNextPage = result.hasNextPage;
          if (!hasInitialRowsFetched.current) {
            hasInitialRowsFetched.current = true;
            if (onInitialRowsFetched) {
              onInitialRowsFetched(result);
            }
          }
        }
        updatePagination(
          list.length ? list : [],
          list.length ? hasNextPage : false,
          actualPage
        );
      } catch (error: any) {
        console.log(error.message);
      } finally {
        if (isLoading === undefined) {
          setIsTableLoading(false);
        }
      }
    },
    [rows, fetchRows, _pageSize, onInitialRowsFetched]
  );

  const updateSelection = useCallback(
    (currentPageRows: LooseObject[]) => {
      const currentPageRowsLength = currentPageRows.length;
      let matchedRowsLength = 0;
      currentPageRows.forEach((currentRow) => {
        let value = currentRow[rowKey];
        if (typeof value === "number") {
          value = value.toString();
        }
        if (Object.keys(selection).includes(value)) {
          matchedRowsLength += 1;
        }
      });
      setAllRowsSelected(currentPageRowsLength === matchedRowsLength);
    },
    [rowKey, selection]
  );

  const handleSort = (sortKey: string, sortType: SortTypes) => {
    if (fetchRows) {
      sortDetailsRef.current = {
        sortKey,
        sortType,
      };
      updateTable();
    } else if (onSort) {
      onSort(sortKey, sortType);
    }
  };

  const resetSelection = () => {
    setSelection({});
    setAllRowsSelected(false);
  };

  useEffect(() => {
    if (onRowSelect) {
      onRowSelect(selection);
    }
  }, [selection]);

  useEffect(() => {
    hasInitialRowsFetched.current = false;
    updateTable(INITIAL_PAGE_NUMBER);
  }, [...dependencies]);

  useEffect(() => {
    if (rows !== undefined) {
      if (hasInitialRowsFetched.current) {
        updateTable();
      } else {
        updateTable(INITIAL_PAGE_NUMBER);
      }
      if (onRowSelect) {
        resetSelection();
      }
    }
  }, [rows]);

  useEffect(() => {
    if (onRowSelect) {
      updateSelection(currentRows);
    }
  }, [currentRows]);

  return (
    <TableContainer>
      {header ? <TableDescription {...header} /> : null}
      {actions ? <TableActions {...actions} /> : null}
      <BaseTable
        columns={columns}
        defaultActiveRowId={defaultActiveRowId}
        isLoading={isLoading === undefined ? isTableLoading : isLoading}
        onRowClicked={onRowClicked}
        onSort={handleSort}
        pageSize={_pageSize}
        placeholder={placeholder}
        rowKey={rowKey}
        rows={currentRows}
        rowSelection={
          onRowSelect
            ? {
                areAllRowsSelected,
                onAllRowSelect: handleAllRowSelect,
                onRowSelect: handleRowSelect,
                selectedRowIds: Object.keys(selection),
              }
            : undefined
        }
        scrollWidth={scrollWidth}
        showAlternateRowColored={showAlternateRowColored}
        sticky={sticky}
      />
      {pagination && currentRows.length ? (
        <TablePagination
          currentPage={currentPage}
          disabled={isTableLoading || isLoading}
          hasNextPage={hasNextPage}
          onPageChange={updateTable}
          totalPageCount={
            typeof pagination !== "boolean"
              ? pagination.totalPageCount
              : undefined
          }
        />
      ) : null}
    </TableContainer>
  );
};

export default Table;
