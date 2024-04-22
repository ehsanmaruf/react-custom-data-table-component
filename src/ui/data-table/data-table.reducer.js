import { isEqual, pick } from "lodash";
import { DefaultPageSize, FixedParamKeys } from "./constants";
import { DataTableAction as Action } from "./data-table.actions";

export const DataTableReducer = (state, { action, payload }) => {
  switch (action) {
    case Action.SetLoading: {
      return {
        ...state,
        settings: {
          ...state.settings,
          isLoading: !!payload?.settings?.isLoading,
        },
      };
    }

    case Action.SetData: {
      return {
        props: {
          ...state.props,
          data: payload?.props?.data || [],
        },
        settings: {
          ...state.settings,
          pageMeta: payload?.settings?.pageMeta,
        },
      };
    }

    case Action.SetContextState: {
      return payload;
    }

    case Action.ChangeCurrentPage: {
      return {
        ...state,
        settings: {
          ...state.settings,
          params: {
            ...state.settings.params,
            pageNumber: payload?.settings?.params?.pageNumber || 1,
          },
        },
      };
    }

    case Action.ChangeItemsPerPage: {
      return {
        ...state,
        settings: {
          ...state.settings,
          params: {
            ...state.settings.params,
            itemsPerPage:
              payload?.settings?.params?.itemsPerPage || DefaultPageSize,
          },
        },
      };
    }

    case Action.ChangeActiveStatus: {
      return {
        ...state,
        settings: {
          ...state.settings,
          params: {
            ...state.settings.params,
            isActive: payload?.settings?.params?.isActive,
          },
        },
      };
    }

    case Action.SetSort: {
      return {
        ...state,
        settings: {
          ...state.settings,
          params: {
            ...state.settings.params,
            sortBy: payload?.settings?.params?.sortBy || "",
            sortOrder: payload?.settings?.params?.sortOrder || "asc",
          },
        },
      };
    }

    case Action.SetSearch: {
      return {
        ...state,
        settings: {
          ...state.settings,
          params: {
            ...state.settings.params,
            search: payload?.settings?.params?.search || "",
          },
        },
      };
    }

    case Action.SetFilters: {
      // return {
      //   ...state,
      //   settings: {
      //     ...state.settings,
      //     params: {
      //       ...state.settings.params,
      //       ...payload?.settings?.params,
      //     },
      //   },
      // };
      const newFilter = payload?.settings?.params;
      const params = state?.settings?.params;
      const preDefinedParams = state?.props?.preDefinedParams;

      const filter = preDefinedParams
        ? pick(params, FixedParamKeys, preDefinedParams)
        : pick(params, FixedParamKeys);

      if (!isEqual(params, newFilter)) {
        return {
          ...state,
          settings: {
            ...state.settings,
            params: {
              ...filter,
              ...newFilter,
            },
          },
        };
      }
      return state;
    }

    case Action.ResetFilters: {
      const preDefinedParams = state?.props?.preDefinedParams;
      return {
        ...state,
        settings: {
          ...state.settings,
          params: preDefinedParams
            ? pick(state.settings.params, FixedParamKeys, preDefinedParams)
            : pick(state.settings.params, FixedParamKeys),
        },
      };
    }

    case Action.SetRow: {
      return {
        ...state,
        props: {
          ...state.props,
          data: payload?.props?.data || [],
        },
      };
    }

    default: {
      return state;
    }
  }
};
