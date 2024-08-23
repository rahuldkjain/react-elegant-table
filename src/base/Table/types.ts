import React from "react";

import { LooseObject } from "../../types";

export enum SortTypes {
  asc = "asc",
  desc = "desc",
}

export interface RowSelectionProps {
  areAllRowsSelected: boolean;
  onAllRowSelect: (checked: boolean) => void;
  onRowSelect: (data: LooseObject, checked: boolean) => void;
  selectedRowIds: string[];
}
export interface TableColumnProps {
  accessorFn?: (row: LooseObject) => React.ReactNode;
  accessorKey?: string;
  className?: string;
  header: React.ReactNode | string; // Allow custom rendering in header cell
  sortable?: boolean;
  sticky?: boolean;
  width?: string;
}
export interface TablePaginationProps {
  className?: string;
  currentPage: number;
  disabled?: boolean;
  hasNextPage: boolean;
  onPageChange: (pageNumber: number) => void;
  totalPageCount?: number;
}

export interface BaseTableProps {
  columns: TableColumnProps[];
  defaultActiveRowId?: number | string;
  isLoading?: boolean;
  onRowClicked?: (row: LooseObject) => void;
  onSort?: (sortKey: string, type: SortTypes) => void;
  pageSize?: number;
  placeholder?: React.ReactNode | string;
  rowKey: string;
  rows: LooseObject[];
  rowSelection?: RowSelectionProps;
  scrollWidth?: string;
  showAlternateRowColored?: boolean;
  sticky?: boolean;
}

export interface TableHeadProps {
  allRowsSelected: boolean;
  columns: TableColumnProps[];
  isLoading?: boolean;
  onSelect?: (checked: boolean) => void;
  onSort?: (sortKey: string, type: SortTypes) => void; // Header cell click event for sorting
  sticky?: boolean;
}

export interface TableHeaderProps {
  actions?: React.ReactNode;
  infoText?: string;
  subtitle?: string;
  title: string;
}

export interface TableActionsProps {
  onFilter?: () => void;
  onSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  otherActions?: React.ReactNode;
}

export type SortDetails = {
  sortKey: string;
  sortType: SortTypes;
};

export interface TableProps {
  actions?: TableActionsProps;
  columns: TableColumnProps[];
  defaultActiveRowId?: number | string;
  dependencies?: string[];
  fetchRows?: (
    pageNumber: number,
    pageSize: number,
    sortDetails?: SortDetails
  ) => Promise<{ hasNextPage: boolean; list: LooseObject[] }>;
  header?: TableHeaderProps;
  isLoading?: boolean;
  onInitialRowsFetched?: (data: LooseObject) => void;
  onRowClicked?: (row: LooseObject) => void;
  onRowSelect?: (selection: LooseObject) => void;
  onSort?: (sortKey: string, type: SortTypes) => void;
  /**
   * @deprecated Use `pagination.pageSize` prop instead
   */
  pageSize?: number;
  pagination?:
    | {
        pageSize: number;
        totalPageCount?: number;
      }
    | {
        pageSize?: number;
        totalPageCount: number;
      }
    | boolean;
  placeholder?: React.ReactNode | string;
  rowKey: string;
  rows?: LooseObject[];
  scrollWidth?: string;
  showAlternateRowColored?: boolean;
  sticky?: boolean;
}
