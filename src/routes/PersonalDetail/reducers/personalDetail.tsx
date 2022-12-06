import { createSlice } from "@reduxjs/toolkit";
import { MovieItem } from "../../Dashboard/reducers/dashboard";

export interface PersonalData {
  name: string;
  profile_path: string;
  birthday: string;
  place_of_birth: string;
  biography: string;
}

export interface MoviesListItem extends MovieItem {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface PersonalDetailState {
  data: PersonalData;
  isLoading: boolean;
  error: null;
  movies: Array<MoviesListItem>;
}

const initialState: PersonalDetailState = {
  data: {
    name: "",
    profile_path: "",
    birthday: "",
    place_of_birth: "",
    biography: "",
  },
  isLoading: false,
  error: null,
  movies: [],
};

export const movieDetailSlice = createSlice({
  name: "personalDetail",
  initialState,
  reducers: {
    fetch_personalDetail_start: (state) => {
      return {
        ...state,
        isLoading: !state.isLoading,
        error: null,
      };
    },
    fetch_personalDetail_success: (state, action) => {
      const { payload } = action;

      return {
        ...state,
        data: payload.data,
        movies: payload.movies,
        isLoading: false,
      };
    },
    fetch_personalDetail_error: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };
    },
    clear_personalDetail: () => {
      return initialState;
    },
  },
});

export const {
  fetch_personalDetail_start,
  fetch_personalDetail_success,
  fetch_personalDetail_error,
  clear_personalDetail,
} = movieDetailSlice.actions;

export default movieDetailSlice.reducer;
