import { createSlice } from "@reduxjs/toolkit";

export interface SearchItem {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title?: string;
  name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface SearchState {
  isLoading: boolean;
  data: {
    results: Array<SearchItem>;
  };
  error: null;
}

const initialState: SearchState = {
  isLoading: false,
  data: {
    results: [],
  },
  error: null,
};

export const searchSlice = createSlice({
  name: "search",
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
      const { payload } = action;
      return {
        ...state,
        data: payload.data,
        error: null,
        isLoading: false,
      };
    },
    fetch_search_error: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };
    },
    clear_state: () => {
      return initialState;
    },
  },
});

export const {
  fetch_search_start,
  fetch_search_success,
  fetch_search_error,
  clear_state,
} = searchSlice.actions;

export default searchSlice.reducer;
