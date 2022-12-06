import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MovieItem {
  profile_path: string;
  title: string;
  vote_average: number;
  name: string;
  original_name: string;
  poster_path: string;
  character: string;
  id: number;
}

export interface DashboardPayload {
  results: Array<MovieItem>;
  page: number;
  total_pages: number;
  total_results: number;
}

export interface DashboardState {
  popular: {
    results: Array<MovieItem>;
  };
  page: number;
  total_pages: number;
  total_results: number;
  isLoading: boolean;
}

const initialState: DashboardState = {
  popular: {
    results: [],
  },
  page: 1,
  total_pages: 0,
  total_results: 0,
  isLoading: false,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    dashboard_handle_loading: (state) => {
      state.isLoading = !state.isLoading;
    },
    dashboard_fetch_success: (
      state,
      action: PayloadAction<DashboardPayload>
    ) => {
      const { payload } = action;

      return {
        ...state,
        popular: {
          results: state.popular.results.concat(payload.results),
        },
        page: payload.page + 1,
        total_pages: payload.total_pages,
        total_results: payload.total_results,
        error: null,
      };
    },
    clear_state: () => {
      return initialState;
    },
  },
});

export const {
  dashboard_handle_loading,
  dashboard_fetch_success,
  clear_state,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
