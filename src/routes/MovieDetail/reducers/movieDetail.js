import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: {},
  isLoading: false,
  error: null,
  credits: {
    cast: [],
    crew: [],
  },
  similar: {
    results: [],
  },
  videos: {
    results: [],
  },
  images: {},
  genres: {},
  keywords: [],
};

export const movieDetailSlice = createSlice({
  name: 'movieDetail',
  initialState,
  reducers: {
    fetch_movieDetail_start: (state) => {
      return {
        ...state,
        isLoading: !state.isLoading,
        error: null
      }
    },
    fetch_movieDetail_success: (state, action) => {
      const {payload} = action;
      return {
        ...state,
        data: payload.data,
        credits: payload.credits,
        similar: payload.similar,
        images: payload.images,
        genres: payload.genreList,
        videos: payload.videos,
        keywords: payload.keywords,
        isLoading: false,
        error: null,
      }
    },
    clear_state: () => {
      return initialState
    }
  }
})

export const {fetch_movieDetail_start, fetch_movieDetail_success, clear_state} = movieDetailSlice.actions;

export default movieDetailSlice.reducer;
