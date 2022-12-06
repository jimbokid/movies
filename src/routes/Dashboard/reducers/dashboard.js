import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  popular: {
    results: [],
  },
  page: 1,
  total_pages: null,
  total_results: null,
  isLoading: false
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    dashboard_handle_loading: (state) => {
      state.isLoading = !state.isLoading
    },
    dashboard_fetch_success: (state, action) => {
      const {payload} = action;

      return {
        popular: {
          results: state.popular.results.concat(payload.results),
        },
        page: payload.page + 1,
        total_pages: payload.total_pages,
        total_results: payload.total_results,
        error: null,
      }
    },
    clear_state: () => {
      return initialState
    }
  }
})

export const {dashboard_handle_loading, dashboard_fetch_success, clear_state} = dashboardSlice.actions;

export default dashboardSlice.reducer;
