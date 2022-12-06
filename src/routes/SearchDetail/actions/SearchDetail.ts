import {
  fetch_search_start,
  fetch_search_success,
  fetch_search_error,
} from "../reducers/searchDetail";
import {
  API_PATH,
  API_TOKEN,
  INCLUDE_ADULT,
  LANGUAGE,
  REGION,
} from "../../../config/constants/appConstants";
import axios from "axios";
import { genreGroup } from "../../MovieDetail/utils/movieDetailHelpers";
import { AppDispatch, RootState } from "../../../config/store/store";

/**
 * Fetch search results for detail search page
 * @param {string} name - Search parameter - movie name
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export const fetchResultsSearch = (name: string) => (dispatch: AppDispatch) => {
  dispatch(fetch_search_start());
  const url = [
    `${API_PATH}search/movie`,
    `${API_PATH}search/tv`,
    `${API_PATH}search/person`,
    `${API_PATH}genre/movie/list`,
  ];

  const promises = url.map((item) => {
    return axios.get(item, {
      params: {
        api_key: API_TOKEN,
        language: LANGUAGE,
        query: name,
      },
    });
  });

  return axios
    .all(promises)
    .then(
      axios.spread((movie, tv, person, genre) => {
        let genreList: { [id: string]: string } = genreGroup(genre.data.genres);

        dispatch(
          fetch_search_success({
            movie: movie.data,
            tv: tv.data,
            person: person.data,
            genres: genreList,
          })
        );
        return [movie, tv, person, genre];
      })
    )
    .catch((error) => {
      dispatch(fetch_search_error(error));
      return error;
    });
};

/**
 * Fetch search results for detail search page
 * @param {string} id - Search parameter - genre id
 * @returns {function(*, *): Promise<[AxiosResponse<any>,AxiosResponse<any>] | AxiosResponse<*>>}
 */
export const fetchByGenre =
  (id: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(fetch_search_start());
    const store = getState();
    const { movie_page } = store.searchDetail;

    const url = [
      `${API_PATH}genre/${id}/movies`,
      `${API_PATH}genre/movie/list`,
    ];

    const promises = url.map((item) => {
      return axios.get(item, {
        params: {
          api_key: API_TOKEN,
          language: LANGUAGE,
          page: movie_page,
          region: REGION,
          include_adult: INCLUDE_ADULT,
        },
      });
    });

    return axios
      .all(promises)
      .then(
        axios.spread((res, genre) => {
          const genreList: { [id: string]: string } = genreGroup(
            genre.data.genres
          );

          dispatch(
            fetch_search_success({
              movie: res.data,
              tv: null,
              person: null,
              genres: genreList,
            })
          );

          return [res, genre];
        })
      )
      .catch((error) => {
        dispatch(fetch_search_error(error));
        return error;
      });
  };

/**
 * Fetch search results for detail search page
 * @param {string} keyword_id - Search parameter - keyword id
 * @returns {function(*, *): Promise<[AxiosResponse<any>,AxiosResponse<any>] | AxiosResponse<*>>}
 */
export const fetchByKeyword =
  (keyword_id: string) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(fetch_search_start());
    const url = [
      `${API_PATH}keyword/${keyword_id}/movies`,
      `${API_PATH}genre/movie/list`,
    ];
    const store = getState();
    const { movie_page } = store.searchDetail;

    const promises = url.map((item) => {
      return axios.get(item, {
        params: {
          api_key: API_TOKEN,
          language: LANGUAGE,
          region: REGION,
          page: movie_page,
          include_adult: INCLUDE_ADULT,
        },
      });
    });

    return axios
      .all(promises)
      .then(
        axios.spread((res, genre) => {
          const genreList: { [id: string]: string } = genreGroup(
            genre.data.genres
          );

          dispatch(
            fetch_search_success({
              movie: res.data,
              tv: null,
              person: null,
              genres: genreList,
            })
          );
          return [res, genre];
        })
      )
      .catch((error) => {
        dispatch(fetch_search_error(error));
        return error;
      });
  };
