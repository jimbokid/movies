import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Layout from "../../../shared/Layout";
import deepOrange from "@material-ui/core/colors/deepOrange";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieWrapper from "./MovieWrapper";
import CardWrapper from "./CardWrapper";
import {
  fetchByGenre,
  fetchByKeyword,
  fetchResultsSearch,
} from "../actions/SearchDetail";
import { clear_state, SearchDetailState } from "../reducers/searchDetail";
import { useAppDispatch, useAppSelector } from "../../../config/utils/hooks";

export interface SearchDetailClasses {
  image: string;
  controls: string;
  playIcon: string;
  avatar: string;
  icon: string;
}

interface Props {
  classes: SearchDetailClasses;
  match: {
    params: {
      id: string;
      searchType: string;
      genreName: string;
    };
  };
}

const SearchDetail: React.FC<Props> = ({ classes, match }: Props) => {
  const searchDetailState = useAppSelector(
    (state) => state.searchDetail
  ) as SearchDetailState;
  const dispatch = useAppDispatch();

  function fetchResults() {
    const movieId = match.params.id;
    const searchType = match.params.searchType;

    switch (searchType) {
      case "searchByName":
        dispatch(fetchResultsSearch(movieId));
        break;
      case "searchByGenre":
        dispatch(fetchByGenre(movieId));
        break;
      case "searchByKeyword":
        dispatch(fetchByKeyword(movieId));
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    fetchResults();

    return () => {
      dispatch(clear_state());
    };
  }, []);

  const { movie_results, genres, searchResults } = searchDetailState;
  const { movie, tv, person } = searchResults;

  const { searchType, genreName } = match.params;

  let title: string = "";
  switch (searchType) {
    case "searchByName":
      break;
    case "searchByGenre":
      title = `Best in "${genreName}" genre`;
      break;
    case "searchByKeyword":
      title = `Best by "${genreName}" keyword`;
      break;
    default:
      title = "";
  }

  return (
    <Layout>
      {title.length > 0 && (
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      )}

      {movie && movie.results.length > 0 && (
        <div>
          {searchType === "searchByGenre" ||
          searchType === "searchByKeyword" ? (
            <InfiniteScroll
              dataLength={movie.results.length}
              next={fetchResults}
              hasMore={movie.results.length < movie_results}
              loader={false}
            >
              <MovieWrapper movie={movie} genres={genres} />
            </InfiniteScroll>
          ) : (
            <MovieWrapper movie={movie} genres={genres} />
          )}
        </div>
      )}

      {tv && tv.results.length > 0 && (
        <div>
          <Typography variant="h6" gutterBottom>
            Tv show
          </Typography>
          {tv &&
            tv.results.map((item) => {
              return (
                <CardWrapper
                  key={item.id}
                  item={item}
                  linkPath={"/moviedetail/tv"}
                  imagePath={"https://image.tmdb.org/t/p/w300_and_h450_bestv2"}
                  personCard={false}
                />
              );
            })}
        </div>
      )}

      {person && person.results.length > 0 && (
        <div id="personWrapper">
          <Typography variant="h6" gutterBottom>
            Person
          </Typography>
          {person &&
            person.results.map((item) => {
              return (
                <CardWrapper
                  key={item.id}
                  item={item}
                  linkPath={"/persondetail"}
                  imagePath={"https://image.tmdb.org/t/p/w300"}
                  personCard={true}
                />
              );
            })}
        </div>
      )}
    </Layout>
  );
};

export default withStyles(theme => ({
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing,
    paddingBottom: theme.spacing,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  avatar: {
    color: "#fff",
    backgroundColor: deepOrange[500],
    fontSize: 14,
  },
  icon: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    margin: "auto",
  },
}))(SearchDetail);
