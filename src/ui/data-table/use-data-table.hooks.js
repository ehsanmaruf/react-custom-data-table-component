import { useLazyGet } from "@/features/api";
import { cloneDeep, isEqual, merge, omit, pick } from "lodash";
import { useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import {
  DataTableSettingsKeys,
  InitialParams,
  persistTableKey,
} from "./constants";
import { DataTableAction as Actions } from "./data-table.actions";
import { DataTableReducer } from "./data-table.reducer";
import { usePrevious } from "react-use";

function separateTableProps(props, { data, isLoading, params }) {
  return {
    props: {
      ...omit(props, DataTableSettingsKeys),
      data,
      lazy: true,
      preDefinedParams: Object.keys(props?.params),
    },
    settings: {
      ...pick(props, DataTableSettingsKeys),
      params,
      isLoading,
    },
  };
}

export const useDatatable = (props) => {
  const tableId = `${persistTableKey}:${props?.tableId}`;
  const initialArgs = separateTableProps(props, {
    data: [],
    isLoading: false,
    params: { ...InitialParams, ...props?.params },
  });

  const [state, dispatch] = useReducer(
    DataTableReducer,
    initialArgs,
    (args) => {
      // recive localstorage params and pageMeta
      const stringMetaParams = localStorage.getItem(tableId);
      const parseParams = stringMetaParams
        ? JSON.parse(stringMetaParams)
        : null;

      if (!parseParams) {
        return args;
      }

      const getInitialParams = merge(cloneDeep(args), {
        settings: parseParams,
      });

      // if initial params is existing
      if (args?.props?.preDefinedParams?.length > 0) {
        const modifiedParams = merge(cloneDeep(getInitialParams), {
          settings: {
            params: pick(args?.settings?.params, args?.props?.preDefinedParams),
          },
        });
        return modifiedParams;
      }

      return getInitialParams;
    },
  );

  // set localstorage params and pageMeta
  useEffect(() => {
    if (props?.tableId) {
      const stringifiedParams = {
        params: state.settings?.params,
        pageMeta: state?.settings?.pageMeta,
      };
      localStorage.setItem(tableId, JSON.stringify(stringifiedParams));
    }
  }, [state, props?.tableId]);

  const prevParams = usePrevious(state.settings.params);
  const { data, isLoading, trigger, error } = useLazyGet(
    props?.url,
    state.settings.params,
  );

  // Keep synced with props
  useEffect(() => {
    const source = separateTableProps(props, {
      data: state.props.data || data?.data?.items || [],
      isLoading,
      params: state.settings.params,
    });
    const merged = merge(cloneDeep(state), source);
    dispatch({
      action: Actions.SetContextState,
      payload: merged,
    });
  }, [props]);

  // useEffect(() => {
  //   if (props?.refetch) {
  //     trigger();
  //   }
  // }, [props?.refetch]);

  // Fetch a page with current params from server
  useEffect(() => {
    if (!isEqual(state.settings.params, prevParams) || props?.refetch) {
      trigger();
    }
  }, [state.settings.params, props?.refetch]);

  useEffect(() => {
    if (props.changerow) {
      const rows =
        state.props.data?.map((row) => {
          if (row?._id === props.changeablerow?._id) {
            return props.changeablerow;
          }
          return row;
        }) || [];

      dispatch({
        action: Actions.SetRow,
        payload: {
          props: {
            data: rows,
          },
        },
      });

      props?.onDataLoaded?.();
    }
  }, [props.changerow]);

  // When is page is fetched update table data
  useEffect(() => {
    if (!isLoading && data) {
      const pageMeta = {
        page: data?.data?.pageNumber || InitialParams.pageNumber,
        limit: data?.data?.itemsPerPage || InitialParams.itemsPerPage,
        totalItems: data?.data?.totalItems,
        totalPages: data?.data?.totalPages,
      };

      dispatch({
        action: Actions.SetData,
        payload: {
          props: { data: data?.data?.items },
          settings: {
            pageMeta: pageMeta,
          },
        },
      });
      props?.onDataLoaded?.();
      props?.setOrginalData(data?.data);
    }
  }, [data, isLoading]);

  // Update loading state of the datatable
  useEffect(() => {
    dispatch({
      action: Actions.SetLoading,
      payload: { settings: { isLoading } },
    });
  }, [isLoading]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || error?.title);
    }
  }, [error]);

  return { ...state, dispatch };
};
