import {
  dashboard_handle_loading,
  dashboard_fetch_success,
} from "../reducers/dashboard";
import axios from "axios";
import {
  API_PATH,
  API_TOKEN,
  CURRENT_YEAR,
  INCLUDE_ADULT,
  LANGUAGE,
  REGION,
  START_DATE_POPULAR,
} from "../../../config/constants/appConstants";
import { AppDispatch, RootState } from "../../../config/store/store";

/**
 * Fetch movies for dashboard
 * @returns {function(*, *): Promise<[AxiosResponse<any>,AxiosResponse<any>] | AxiosResponse<*>>}
 */
export const fetchDashboard =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const { page } = getState().dashboard;

    dispatch(dashboard_handle_loading());

    return axios
      .get(`${API_PATH}discover/movie`, {
        params: {
          api_key: API_TOKEN,
          language: LANGUAGE,
          region: REGION,
          sort_by: `popularity.desc`,
          include_adult: INCLUDE_ADULT,
          page: page,
          primary_release_year: CURRENT_YEAR,
          primary_release_date: { lte: START_DATE_POPULAR },
        },
      })
      .then((res) => {
        dispatch(dashboard_fetch_success(res.data));
        return res;
      });
  };
