import { useContext } from "react";
import { DataTableAction as Actions } from "./data-atable.actions";
import { DataTableContext } from "./data-table.contex.provider";

export function useDataTableContext() {
  const { dispatch, ...rest } = useContext(DataTableContext);

  const changeCurrentPage = (e) => {
    dispatch?.({
      action: Actions.ChangeCurrentPage,
      payload: {
        settings: {
          params: {
            pageNumber: e,
          },
        },
      },
    });
  };

  const changeItemsPerPage = (e) => {
    dispatch?.({
      action: Actions.ChangeItemsPerPage,
      payload: {
        settings: {
          params: {
            itemsPerPage: e,
          },
        },
      },
    });
  };
  const changeActiveStatus = (e) => {
    dispatch?.({
      action: Actions.ChangeActiveStatus,
      payload: {
        settings: {
          params: {
            isActive: e,
          },
        },
      },
    });
  };

  const onSortChange = (e) => {
    dispatch?.({
      action: Actions.SetSort,
      payload: {
        settings: {
          params: {
            sortBy: e.sortBy,
            sortOrder: e.sortOrder,
          },
        },
      },
    });
  };

  const onSearchChange = (s) => {
    dispatch?.({
      action: Actions.SetSearch,
      payload: {
        settings: {
          params: {
            search: s,
          },
        },
      },
    });
  };

  const setFilters = (filters) => {
    dispatch?.({
      action: Actions.SetFilters,
      payload: {
        settings: {
          params: filters,
        },
      },
    });
  };

  const resetFilters = () => {
    dispatch?.({
      action: Actions.ResetFilters,
    });
  };

  return {
    ...rest,
    changeCurrentPage,
    onSortChange,
    onSearchChange,
    setFilters,
    resetFilters,
    changeItemsPerPage,
    changeActiveStatus,
  };
}
