import React from "react";

import { TableHeaderProps } from "./types";

const TableDescription = (props: TableHeaderProps) => {
  const { actions, infoText = "", subtitle = "", title = "" } = props;
  return (
    <div className="w-full px-6 py-5 flex justify-between flex-wrap text-black-500 border-b border-black-500/10">
      <div className="mr-4">
        <div className="flex">
          <div className="text-lg font-semibold">{title}</div>
          {infoText ? (
            <div className="ml-2 border border-black/10 px-2 py-1 rounded-full text-xs font-semibold bg-white-400">
              {infoText}
            </div>
          ) : null}
        </div>
        {subtitle ? (
          <div className="text-sm font-medium text-black-500/50 mt-1">
            {subtitle}
          </div>
        ) : null}
      </div>
      {actions ? actions : null}
    </div>
  );
};

export default React.memo(TableDescription);
