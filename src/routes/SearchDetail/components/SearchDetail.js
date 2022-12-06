import React, {useEffect} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Layout from '../../../shared/Layout';
import moment from 'moment';
import deepOrange from '@material-ui/core/colors/deepOrange';
import InfiniteScroll from 'react-infinite-scroll-component';
import PropTypes from 'prop-types';
import MovieWrapper from "./MovieWrapper";
import CardWrapper from "./CardWrapper";
import {useDispatch, useSelector} from "react-redux";
import {fetchByGenre, fetchByKeyword, fetchResultsSearch} from "../actions/SearchDetail";
import {clear_state} from "../reducers/searchDetail";

const styles = theme => ({
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  avatar: {
    color: '#fff',
    backgroundColor: deepOrange[500],
    fontSize: 14,
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    margin: 'auto',
  },
});

const SearchDetail = (props) => {
  const searchDetailState = useSelector(state => state.searchDetail);
  const dispatch = useDispatch();

  function fetchResults() {
    const {
      match,
    } = props;
    const movieId = match.params.id;
    const searchType = match.params.searchType;

    switch (searchType) {
      case 'searchByName':
        dispatch(fetchResultsSearch(movieId));
        break;
      case 'searchByGenre':
        dispatch(fetchByGenre(movieId));
        break;
      case 'searchByKeyword':
        dispatch(fetchByKeyword(movieId));
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    fetchResults()

    return () => {
      dispatch(clear_state())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    classes,
    match,

  } = props;

  const {
    movie_results,
    genres,
    searchResults
  } = searchDetailState
  const {
    movie, tv, person
  } = searchResults;

  const {searchType, genreName} = match.params;

  let title = '';
  switch (searchType) {
    case 'searchByName':
      break;
    case 'searchByGenre':
      title = `Best in "${genreName}" genre`;
      break;
    case 'searchByKeyword':
      title = `Best by "${genreName}" keyword`;
      break;
    default:
      title = null;
  }

  return (
    <Layout>
      {title.length > 0 && (
        <Typography variant="title" gutterBottom>
          {title}
        </Typography>
      )}

      {movie &&
        movie.results.length > 0 && (
          <div id="movieWrapper">
            {searchType === 'searchByGenre' ||
            searchType === 'searchByKeyword' ? (
              <InfiniteScroll
                dataLength={movie.results.length}
                next={fetchResults}
                hasMore={movie.results.length < movie_results}
              >
                <MovieWrapper
                  movie={movie}
                  genres={genres}
                />
              </InfiniteScroll>
            ) : (
              <MovieWrapper
                movie={movie}
                id={'test'}
                genres={genres}
              />
            )}
          </div>
        )}

      {tv &&
        tv.results.length > 0 && (
          <div id="tvWrapper">
            <Typography variant="title" gutterBottom>
              Tv show
            </Typography>
            {tv &&
              tv.results.map((item, key) => {
                const date = moment(item.release_date).format(
                  'MMM Do YYYY',
                );
                return (
                  <CardWrapper
                    classes={classes}
                    key={key}
                    item={item}
                    date={date}
                    linkPath={'/moviedetail/tv'}
                    imagePath={
                      'https://image.tmdb.org/t/p/w300_and_h450_bestv2'
                    }
                    personCard={false}
                  />
                );
              })}
          </div>
        )}

      {person &&
        person.results.length > 0 && (
          <div id="personWrapper">
            <Typography variant="title" gutterBottom>
              Person
            </Typography>
            {person &&
              person.results.map((item, key) => {
                return (
                  <CardWrapper
                    key={key}
                    item={item}
                    linkPath={'/persondetail'}
                    imagePath={'https://image.tmdb.org/t/p/w300'}
                    personCard={true}
                  />
                );
              })}
          </div>
        )}
    </Layout>
  );
}

SearchDetail.propTypes = {
  data: PropTypes.object,
  classes: PropTypes.object,
  match: PropTypes.object,
  fetchByGenre: PropTypes.func,
  fetchByKeyword: PropTypes.func,
  fetchResultsSearch: PropTypes.func,
  clearSearch: PropTypes.func,
  movie_results: PropTypes.any,
  genres: PropTypes.object,
  isLoading: PropTypes.bool
};


export default withStyles(styles)(SearchDetail);
