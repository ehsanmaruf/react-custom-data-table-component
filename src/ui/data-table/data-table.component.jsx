/* eslint-disable react/prop-types */
import { TableTabs } from "./table-tabs.component";
import { TableWrapper } from "./table-wrapper.component";
import { paginationPerPageOptions } from "./constants";
import { DataTableProvider } from "./data-table.provider";

/**
 * @typedef {Object} DataTableProps
 * @property {string} url
 * @property {Array} columns
 * @property {import("react").ReactNode} filterComp
 * @property {boolean} showActiveInactive
 * @property {import("react").ReactNode} tabComponent
 * @property {boolean} refetch
 * @property {() => void} onDataLoaded
 * @property {string} tableId
 * @property {Object} params
 * @property {boolean} disablePagination
 * @property {Array} paginationRowsPerPageOptions
 * @property {boolean} expandableRows
 * @property {import("react").ReactNode} expandableRowsComponent
 * @property {import("react-data-table-component").TableStyles} customStyles
 * @property {import("react").Dispatch<import("react").SetStateAction<string>>} setOrginalData
 */

/**
 * @template T
 * @param { DataTableProps & import("react-data-table-component").TableProps<T> } props
 */

export const DataTable = ({
  url,
  columns = [],
  filterComp,
  showActiveInactive = true,
  tabComponent = <TableTabs />,
  refetch = false,
  onDataLoaded,
  tableId,
  params = {},
  disablePagination = false,
  paginationRowsPerPageOptions = paginationPerPageOptions,
  expandableRows = false,
  expandableRowsComponent = <></>,
  customStyles = {},
  setOrginalData = () => {},
  ...rest
}) => {
  return (
    <DataTableProvider
      url={url}
      refetch={refetch}
      columns={columns}
      filterComp={filterComp}
      showActiveInactive={showActiveInactive}
      tabComponent={tabComponent}
      onDataLoaded={onDataLoaded}
      tableId={tableId}
      params={params}
      disablePagination={disablePagination}
      paginationRowsPerPageOptions={paginationRowsPerPageOptions}
      expandableRows={expandableRows}
      expandableRowsComponent={expandableRowsComponent}
      customStyles={customStyles}
      setOrginalData={setOrginalData}
      restProps={{ ...rest }}
    >
      <TableWrapper />
    </DataTableProvider>
  );
};
