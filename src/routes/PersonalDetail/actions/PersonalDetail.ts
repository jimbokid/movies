import {
  fetch_personalDetail_error,
  fetch_personalDetail_start,
  fetch_personalDetail_success,
} from "../reducers/personalDetail";
import {
  API_PATH,
  API_TOKEN,
  LANGUAGE,
} from "../../../config/constants/appConstants";
import axios from "axios";
import _ from "lodash";
import { AppDispatch } from "../../../config/store/store";

export const fetchDetailPerson = (id: string) => (dispatch: AppDispatch) => {
  dispatch(fetch_personalDetail_start());

  const url = [
    `${API_PATH}person/${id}`,
    `${API_PATH}person/${id}/movie_credits`,
  ];

  const promises = url.map((item) => {
    return axios.get(item, {
      params: {
        api_key: API_TOKEN,
        language: LANGUAGE,
      },
    });
  });

  return axios
    .all(promises)
    .then(
      axios.spread((detail, movies) => {
        console.log(movies.data.cast);
        const sortedMovies = _.reverse(
          _.sortBy(movies.data.cast, "popularity")
        );

        dispatch(
          fetch_personalDetail_success({
            data: detail.data,
            movies: sortedMovies,
          })
        );
        return [detail, movies];
      })
    )
    .catch((error) => {
      dispatch(fetch_personalDetail_error(error));
      return error;
    });
};
