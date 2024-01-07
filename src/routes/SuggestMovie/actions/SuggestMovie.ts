import {
  suggest_fetch_movies,
  suggest_fetch_person,
  suggest_fetch_search_data,
} from "../reducers/suggestMovie";
import axios from "axios";
import { AppDispatch, RootState } from "../../../config/store/store";
import {
  API_PATH,
  API_TOKEN,
  LANGUAGE,
} from "../../../config/constants/appConstants";
import { Values } from "../components/SuggestMovie";

export const fetchSuggestMovieData = () => (dispatch: AppDispatch) => {
  const url = [`${API_PATH}genre/movie/list`, `${API_PATH}person/popular`];

  const promises = url.map((item) => {
    return axios.get(item, {
      params: {
        api_key: API_TOKEN,
        language: LANGUAGE,
      },
    });
  });

  return axios.all(promises).then((res) => {
    const [genres, popularPeople] = res;
    dispatch(
      suggest_fetch_search_data({
        genres: genres.data.genres,
        popularPeople: popularPeople.data.results,
      })
    );
    return res;
  });
};

export const getSuggestMovies =
  (values: Values, isNewSearch?: boolean | undefined) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const { page } = getState().suggestMovie;

    const payload = {
      withGenres: values.genres.map((i) => i.value).join(","),
      withCast: [...values.cast, ...values.popularPeople]
        .map((i) => i.value)
        .join(","),
    };

    return axios
      .get(`${API_PATH}discover/movie`, {
        params: {
          api_key: API_TOKEN,
          language: LANGUAGE,
          page: isNewSearch ? 1 : page,
          with_genres: payload.withGenres,
          with_cast: payload.withCast,
        },
      })
      .then((res) => {
        dispatch(
          suggest_fetch_movies({
            ...res.data,
            values,
          })
        );
      });
  };

export const fetchPerson = (person: string) => (dispatch: AppDispatch) => {
  return axios
    .get(`${API_PATH}search/person`, {
      params: {
        api_key: API_TOKEN,
        language: LANGUAGE,
        query: person,
      },
    })
    .then((res) => {
      dispatch(suggest_fetch_person(res.data));
    });
};
