import { GenreItem, Genres } from "../reducers/movieDetail";

export const genreGroup = (genres: Genres) => {
  return genres.reduce((prev: object, item: GenreItem) => {
    return {
      ...prev,
      [item.id]: item.name,
    };
  }, {});
};
