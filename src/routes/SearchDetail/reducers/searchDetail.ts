import { createSlice } from "@reduxjs/toolkit";

export interface PersonResultsItem {
  id: number;
  name: string;
  popularity: number;
  profile_path?: string | null;
}

export interface TvResultsItem {
  backdrop_path?: string;
  first_air_date?: string;
  id: number;
  name: string;
  original_name?: string;
  overview?: string;
  popularity: number;
  poster_path?: string;
  voteAverage?: number;
  vote_count?: number;
  release_date?: string;
  date?: string;
}

export interface MovieResultsItem {
  backdrop_path: string;
  id: number;
  original_title: string;
  genre_ids?: number[];
  overview?: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count?: number;
}

export interface SearchDetailState {
  searchResults: {
    movie: {
      results: Array<MovieResultsItem>;
    };
    tv: {
      results: Array<TvResultsItem>;
    };
    person: {
      results: Array<PersonResultsItem>;
    };
  };
  genres: {
    [id: string]: string;
  };
  movie_results: number;
  movie_page: number;
  error: null;
  isLoading: boolean;
}

const initialState: SearchDetailState = {
  searchResults: {
    movie: {
      results: [],
    },
    tv: {
      results: [],
    },
    person: {
      results: [],
    },
  },
  genres: {},
  movie_results: 0,
  movie_page: 1,
  error: null,
  isLoading: false,
};

export const searchDetailSlice = createSlice({
  name: "searchDetail",
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
        searchResults: {
          movie: {
            ...state.searchResults.movie,
            results: state.searchResults.movie.results.concat(
              payload.movie.results
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
} = searchDetailSlice.actions;

export default searchDetailSlice.reducer;
