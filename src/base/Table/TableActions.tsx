import { ChangeEvent } from "react";

import FilterIcon from "../Icons/Filter";
import SearchIcon from "../Icons/Search";
import { TableActionsProps } from "./types";

const TableActions = (props: TableActionsProps) => {
  const { onFilter, onSearch, otherActions } = props;
  if (!(otherActions || onSearch || onFilter)) {
    return null;
  }
  return (
    <div className="w-full px-4 py-3 border-b border-black-500/10 flex items-center justify-between flex-wrap">
      <div>{otherActions ? otherActions : null}</div>
      <div className="flex items-center justify-end">
        {onSearch ? (
          <div className="flex items-center gap-2 border border-black/70 pl-2 rounded mr-2">
            <SearchIcon fillColor="#000000E6" />
            <input
              className="h-10 py-2.5 px-3.5 font-medium text-base w-full rounded-sm focus:!outline-none focus-visible:!outline-none"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                if (onSearch) {
                  onSearch(event);
                }
              }}
              placeholder="Search"
            />
          </div>
        ) : null}
        {onFilter ? (
          <div className="flex items-center border border-black/70 px-4 py-2 rounded">
            <FilterIcon fillColor="#000000E6" />
            <button
              className="ml-2"
              onClick={() => {
                if (onFilter) {
                  onFilter();
                }
              }}
            >
              Filter
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TableActions;
