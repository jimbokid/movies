import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  searchResults: {
    movie: {
      results: [],
    },
  },
  genre: {},
  movie_results: 0,
  movie_page: 1,
  error: null,
  isLoading: false,
}

export const searchDetailSlice = createSlice({
  name: 'searchDetail',
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
        searchResults: {
          movie: {
            ...state.searchResults.movie,
            results: state.searchResults.movie.results.concat(
              payload.movie.results,
            ),
          },
          tv: payload.tv,
          person: payload.person,
        },
        movie_page: payload.movie.page + 1,
        movie_pages: payload.movie.total_pages,
        movie_results: payload.movie.total_results,
        genres: payload.genres,
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
      };
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
} = searchDetailSlice.actions;

export default searchDetailSlice.reducer;
