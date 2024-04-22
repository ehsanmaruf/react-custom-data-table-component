/* eslint-disable react/prop-types */
import { DataTableContext } from "./data-table.contex.provider";
import { useDatatable } from "./use-data-table.hooks";

export const DataTableProvider = (props) => {
  const context = useDatatable(props);

  return (
    <DataTableContext.Provider value={context}>
      {props.children}
    </DataTableContext.Provider>
  );
};
