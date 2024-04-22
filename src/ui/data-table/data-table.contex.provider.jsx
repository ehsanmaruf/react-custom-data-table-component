import { createContext } from "react";

export const DataTableContext = createContext({
  props: {},
  settings: {
    url: "",
    columns: [],
  },
});
