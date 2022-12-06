import {
  fetch_movieDetail_start,
  fetch_movieDetail_success,
} from "../reducers/movieDetail";
import {
  API_TOKEN,
  API_PATH,
  LANGUAGE,
} from "../../../config/constants/appConstants";
import { genreGroup } from "../utils/movieDetailHelpers";
import axios from "axios";
import { AppDispatch } from "../../../config/store/store";

export const fetchDetailMovie =
  (id: string, type: string) => (dispatch: AppDispatch) => {
    dispatch(fetch_movieDetail_start());
    const url = [
      `${API_PATH}${type}/${id}`,
      `${API_PATH}${type}/${id}/similar`,
      `${API_PATH}${type}/${id}/credits`,
      `${API_PATH}${type}/${id}/images`,
      `${API_PATH}genre/movie/list`,
      `${API_PATH}${type}/${id}/videos`,
      `${API_PATH}${type}/${id}/keywords`,
    ];

    const promises = url.map((item) =>
      axios.get(item, {
        params: {
          api_key: API_TOKEN,
          language: LANGUAGE,
        },
      })
    );

    return axios.all(promises).then(
      axios.spread(
        (movie, similar, credits, images, genre, videos, keywords) => {
          const genreList: { [id: string]: string } = genreGroup(
            genre.data.genres
          );

          dispatch(
            fetch_movieDetail_success({
              data: movie.data,
              similar: similar.data,
              credits: credits.data,
              images: images.data,
              genreList: genreList,
              videos: videos.data,
              keywords: keywords.data.keywords,
            })
          );
          return [movie, similar, credits, images, genre, keywords];
        }
      )
    );
  };
