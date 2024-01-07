import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieItem } from "../../Dashboard/reducers/dashboard";
import { PersonResultsItem } from "../../SearchDetail/reducers/searchDetail";
import { Option } from "../components/SuggestMovie";

export interface SuggestMovieState {
  results: Array<MovieItem>;
  genres: Array<{
    value: number;
    label: string;
  }>;
  popularPeople: Array<{
    value: number;
    label: string;
  }>;
  cast: Array<{
    value: number;
    label: string;
  }>;
  page: number;
  total_pages: number;
  total_results: number;
  isLoading: boolean;
  formValuesState: {
    genres: Array<Option>;
    cast: Array<Option>;
    popularPeople: Array<Option>;
  };
}

interface SuggestMoviePayload {
  results: Array<MovieItem>;
  page: number;
  total_pages: number;
  total_results: number;
  values: {
    genres: Array<Option>;
    cast: Array<Option>;
    popularPeople: Array<Option>;
  };
}

interface SuggestMoviePersonPayload {
  results: Array<PersonResultsItem>;
  page: number;
  total_pages: number;
  total_results: number;
}

const initialState: SuggestMovieState = {
  cast: [],
  results: [],
  genres: [],
  popularPeople: [],
  page: 1,
  total_pages: 0,
  total_results: 0,
  isLoading: false,
  formValuesState: {
    genres: [],
    cast: [],
    popularPeople: [],
  },
};

export interface SuggestMovieDataPayload {
  genres: Array<{
    id: number;
    name: string;
  }>;
  popularPeople: Array<
    PersonResultsItem & {
      known_for_department: string;
    }
  >;
}

export const suggestMovieSlice = createSlice({
  name: "suggestMovie",
  initialState,
  reducers: {
    suggest_movie_handle_loading: (state) => {
      state.isLoading = !state.isLoading;
    },

    suggest_fetch_search_data: (
      state,
      action: PayloadAction<SuggestMovieDataPayload>
    ) => {
      const { payload } = action;
      console.log(payload);

      return {
        ...state,
        genres: payload.genres.map((item) => ({
          value: item.id,
          label: item.name,
        })),
        popularPeople: payload.popularPeople
          .filter((i) => i.known_for_department === "Acting")
          .map((item) => ({
            value: item.id,
            label: item.name,
          })),
      };
    },

    suggest_fetch_movies: (
      state,
      action: PayloadAction<SuggestMoviePayload>
    ) => {
      const { payload } = action;
      const { page, total_pages, total_results, results, values } = payload;

      return {
        ...state,
        results: page === 1 ? results : [...state.results, ...results],
        page: page + 1,
        total_pages,
        total_results,
        formValuesState: values,
      };
    },

    suggest_fetch_person: (
      state,
      action: PayloadAction<SuggestMoviePersonPayload>
    ) => {
      state.cast = action.payload.results.map((item) => ({
        value: item.id,
        label: item.name,
      }));
    },

    clear_state: () => {
      return initialState;
    },
  },
});

export const {
  suggest_fetch_search_data,
  suggest_movie_handle_loading,
  suggest_fetch_movies,
  suggest_fetch_person,
  clear_state,
} = suggestMovieSlice.actions;

export default suggestMovieSlice.reducer;
