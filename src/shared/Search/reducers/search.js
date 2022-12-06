import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  data: {
    results: [],
  },
  error: null,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    fetch_search_start: (state) => {
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    },
    fetch_search_success: (state, action) => {
      const {payload} = action;
      return {
        ...state,
        data: payload.data,
        error: null,
        isLoading: false,
      };
    },
    fetch_search_error: (state, action) => {
      const {payload} = action;
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      }
    },
    clear_state: () => {
      return initialState
    }
  }
})

export const {
  fetch_search_start,
  fetch_search_success,
  fetch_search_error,
  clear_state
} = searchSlice.actions;

export default searchSlice.reducer;

