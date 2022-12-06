import { createSlice } from "@reduxjs/toolkit";

export interface VideoItem {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
}

export interface GenreItem {
  id: string;
  name: string;
}

export interface KeywordItem {
  id: number;
  name: string;
}

export interface Genres extends Array<GenreItem> {}

export interface MovieDetail {
  title: string;
  original_name: string;
  genres: Genres;
  vote_average: number;
  release_date: string;
  first_air_date: string;
  overview: string;
  backdrop_path: string;
}

export interface MovieDetailState {
  data: MovieDetail;
  isLoading: boolean;
  error: null;
  credits: {
    cast: [];
    crew: [];
  };
  similar: {
    results: [];
  };
  videos: {
    results: Array<VideoItem>;
  };
  images: {
    backdrops: [];
    id: number | null;
    logos: [];
    posters: [];
  };
  genres: {
    [id: string]: string;
  };
  keywords: Array<KeywordItem>;
}

const initialState: MovieDetailState = {
  data: {
    title: "",
    original_name: "",
    genres: [],
    vote_average: 0,
    release_date: "",
    first_air_date: "",
    overview: "",
    backdrop_path: "",
  },
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
  images: {
    backdrops: [],
    id: null,
    logos: [],
    posters: [],
  },
  genres: {},
  keywords: [],
};

export const movieDetailSlice = createSlice({
  name: "movieDetail",
  initialState,
  reducers: {
    fetch_movieDetail_start: (state) => {
      return {
        ...state,
        isLoading: !state.isLoading,
        error: null,
      };
    },
    fetch_movieDetail_success: (state, action) => {
      const { payload } = action;
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
      };
    },
    clear_state: () => {
      return initialState;
    },
  },
});

export const {
  fetch_movieDetail_start,
  fetch_movieDetail_success,
  clear_state,
} = movieDetailSlice.actions;

export default movieDetailSlice.reducer;
