export const DefaultPageSize = 10;

export const InitialParams = {
  pageNumber: 1,
  itemsPerPage: DefaultPageSize,
  sortBy: "updatedAt",
  sortOrder: "desc",
  isActive: true,
};

export const DataTableSettingsKeys = [
  "url",
  "isLoading",
  "columns",
  "params",
  "pageMeta",
];

export const FixedParamKeys = [
  "isActive",
  "itemsPerPage",
  "pageNumber",
  "sortBy",
  "sortOrder",
  // "search",
];

export const persistTableKey = "dtpersist";

export const paginationPerPageOptions = [10, 25, 50, 75, 100];
