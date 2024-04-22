/* eslint-disable react/prop-types */
import { CustomLoader } from "@/features/ui/custom-loader.component";
import { Card } from "react-bootstrap";
import { default as RDTCTable } from "react-data-table-component";

const styles = {
  headCells: {
    style: {
      // paddingLeft: "8px", // override the cell padding for head cells
      // paddingRight: "8px",
      overflow: "hidden",
      fontSize: "1rem",
      fontWeight: 600,
    },
  },
  cells: {
    style: {
      // paddingLeft: "8px", // override the cell padding for data cells
      // paddingRight: "8px",
      overflow: "hidden",
      wordBreak: "wrap",
      fontSize: "1rem",
    },
  },
  pagination: {
    style: {
      fontSize: "1rem",
    },
  },
};

export const Table = ({
  columns,
  tableData,
  handlePageChange,
  handlePerRowsChange,
  totalRows,
  progressPending,
  paginationPerPage,
  currentPage,
  handleSort,
  pagination,
  paginationRowsPerPageOptions,
  expandableRows,
  expandableRowsComponent,
  customStyles,
  ...rest
}) => {
  return (
    <Card>
      <Card.Body>
        <RDTCTable
          className="rc-data-table"
          customStyles={{
            ...styles,
            ...customStyles,
          }}
          columns={columns}
          data={tableData}
          pagination={pagination}
          sortServer
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          onSort={handleSort}
          defaultSortAsc={false}
          defaultSortFieldId="updatedAt"
          progressPending={progressPending}
          progressComponent={<CustomLoader variant="primary" />}
          paginationPerPage={paginationPerPage}
          paginationDefaultPage={currentPage}
          paginationRowsPerPageOptions={paginationRowsPerPageOptions}
          expandableRows={expandableRows}
          expandableRowsComponent={expandableRowsComponent}
          {...rest}
        />
      </Card.Body>
    </Card>
  );
};
