import DataTable from "react-data-table-component";
import { data } from "./data";

export const TestDataTable = () => {
  //The columns we want in our data-table-component
  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
    },
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Year",
      selector: (row) => row.year,
    },
  ];

  //Custom style for the table
  const customStyles = {
    rows: {
      style: {
        minHeight: "60px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
  };

  //Override options for the built in pagination component.
  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: "ALL",
  };

  return (
    <>
      <h3>This is a custom react-data-table component</h3>
      {/* Basic use of the custom react-data-table component */}
      <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
        pagination
        paginationComponentOptions={paginationComponentOptions}
        // Can be passed other general properties....
      />
    </>
  );
};
