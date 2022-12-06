import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: {},
  isLoading: false,
  error: null,
  movies: [],
}

export const movieDetailSlice = createSlice({
  name: 'personalDetail',
  initialState,
  reducers: {
    fetch_personalDetail_start: state => {
      return {
        ...state,
        isLoading: !state.isLoading,
        error: null
      }
    },
    fetch_personalDetail_success: (state, action) => {
      const {payload} = action;

      console.log(payload)
      return {
        ...state,
        data: payload.data,
        movies: payload.movies,
        isLoading: false,
      }
    },
    fetch_personalDetail_error: (state, action) => {
      const {payload} = action;
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      }
    },
    clear_personalDetail: () => {
      return initialState
    }
  }
})

export const {
  fetch_personalDetail_start,
  fetch_personalDetail_success,
  fetch_personalDetail_error,
  clear_personalDetail
} = movieDetailSlice.actions;

export default movieDetailSlice.reducer;
