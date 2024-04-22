/* eslint-disable react/prop-types */
import { HeaderWrapper } from "../header-wrapper";
import { Table } from "./table.component";
import { useDataTableContext } from "./use-data-table-context.hook";

export const TableWrapper = () => {
  // const [progressPending, setProgressPending] = useState(true);
  const ctx = useDataTableContext();

  const FilterComp = ctx.props?.filterComp;
  const showTabs = ctx.props?.showActiveInactive;
  const Tabs = ctx.props?.tabComponent;

  const props = ctx?.props;
  const settings = ctx?.settings;
  const disablePagination = props?.disablePagination;

  const items = props?.data;
  const loading = settings?.isLoading;
  const totalRows = settings?.pageMeta?.totalItems || 0;
  const columns = settings?.columns || [];
  const itemsPerPage = settings?.pageMeta?.limit;
  const pageNumber = settings?.pageMeta?.page;
  const paginationRowsPerPageOptions = props?.paginationRowsPerPageOptions;
  const expandableRows = props?.expandableRows;
  const expandableRowsComponent = props?.expandableRowsComponent;
  const customStyles = props?.customStyles;
  const restProps = props?.restProps;

  const formattedColumns = columns?.map((column) => {
    return {
      ...column,
      name: <HeaderWrapper>{column.name}</HeaderWrapper>,
      wrap: true,
    };
  });

  const handlePageChange = (pageNumber) => {
    ctx.changeCurrentPage(pageNumber);
  };

  const handlePerRowsChange = (itemsPerPage) => {
    ctx.changeItemsPerPage(itemsPerPage);
  };

  const handleSort = (column, sortDirection) => {
    ctx.onSortChange({
      sortBy: column?.sortField || "updatedAt",
      sortOrder: sortDirection,
    });
  };

  // useEffect(() => {
  //   if (loading) {
  //     setProgressPending(true);
  //   } else {
  //     setProgressPending((prev) => !prev);
  //   }
  // }, [loading]);
  return (
    <>
      {FilterComp && FilterComp}

      {showTabs && Tabs}
      <Table
        tableData={items}
        columns={formattedColumns}
        handlePageChange={handlePageChange}
        handlePerRowsChange={handlePerRowsChange}
        progressPending={loading}
        totalRows={totalRows}
        paginationPerPage={itemsPerPage}
        currentPage={pageNumber}
        handleSort={handleSort}
        pagination={!disablePagination}
        paginationRowsPerPageOptions={paginationRowsPerPageOptions}
        expandableRows={expandableRows}
        expandableRowsComponent={expandableRowsComponent}
        customStyles={customStyles}
        {...restProps}
      />
    </>
  );
};
