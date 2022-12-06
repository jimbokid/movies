import {
  fetch_search_start,
  fetch_search_success,
  fetch_search_error,
} from "../reducers/search";
import {
  API_PATH,
  API_TOKEN,
  INCLUDE_ADULT,
  LANGUAGE,
  REGION,
} from "../../../config/constants/appConstants";
import axios from "axios";
import { AppDispatch } from "../../../config/store/store";

/**
 * Fetch search results for input search
 * @param {string} name - Search parameter typed by user in input
 * @returns {function(*): Promise<AxiosResponse<any>>}
 */
export const fetchSearch = (name: string) => (dispatch: AppDispatch) => {
  if (name.length === 0) {
    return false;
  }

  dispatch(fetch_search_start());

  return axios
    .get(`${API_PATH}search/multi`, {
      params: {
        api_key: API_TOKEN,
        language: LANGUAGE,
        region: REGION,
        query: name,
        include_adult: INCLUDE_ADULT,
      },
    })
    .then((res) => {
      dispatch(
        fetch_search_success({
          data: res.data,
          name: name,
        })
      );
      return res;
    })
    .catch((error) => {
      dispatch(fetch_search_error(error));
      return error;
    });
};
