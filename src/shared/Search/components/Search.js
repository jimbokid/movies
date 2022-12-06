import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';
import moment from 'moment/moment';
import Avatar from '@material-ui/core/Avatar';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSearch} from "../actions/Search";
import {clear_state} from "../reducers/search";

const styles = theme => ({
  textField: {
    width: '100%',
    marginTop: 0,
  },
  clearBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  dropdownWrapper: {
    position: 'relative',
    zIndex: 1,
  },
  dropdownInner: {
    width: '100%',
    background: '#fff',
    maxHeight: 'calc(100vh - 56px)',
    overflowY: 'scroll',
  },
  avatar: {
    fontSize: 12,
    marginRight: theme.spacing.unit,
  },
  item: {
    textDecoration: 'none',
  },
  menuItem: {
    height: 'auto',
    paddingLeft: 2,
    paddingRight: 2,
  },
});

export const SearchField = ({
                              classes,
                              toggleSearch
                            }) => {
  const [movieName, setMovieName] = useState('');
  const searchResultsState = useSelector(state => state.search);
  const dispatch = useDispatch();

  function handleChange(event) {
    const value = event.target.value
    setMovieName(value);

    dispatch(fetchSearch(value))
  }

  function closeSearchBar() {
    toggleSearch()
    clearSearch()
  }

  function clearSearch() {
    setMovieName('');
  }

  const searchResults = searchResultsState.data.results;

  useEffect(() => {
    return () => {
      dispatch(clear_state())
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        <TextField
          id="name"
          label="Search for a movie, tv show, person..."
          className={classes.textField}
          value={movieName}
          onChange={handleChange}
          margin="normal"
          autoComplete="section-blue"
          autoFocus
        />

        {movieName.length > 0 && (
          <IconButton
            onClick={clearSearch}
            id="clearBtn"
            className={classes.clearBtn}
          >
            <Clear/>
          </IconButton>
        )}
      </div>
      <div className={classes.dropdownWrapper}>
        <div className={classes.dropdownInner}>
          {movieName.length > 0 && (
            <Link
              to={`/SearchDetail/searchByName/${movieName}/null`}
              className={classes.item}
              onClick={closeSearchBar}
            >
              <MenuItem>
                Detail search for &quot;{movieName}&quot;
              </MenuItem>
            </Link>
          )}

          {searchResults.map((item) => {
            return (
              <Link
                to={
                  item.media_type === 'person'
                    ? `/persondetail/${item.id}`
                    : `/moviedetail/${item.media_type}/${item.id}`
                }
                key={item.id}
                className={classes.item}
                onClick={closeSearchBar}
              >
                <MenuItem className={classes.menuItem}>
                  <Avatar className={classes.avatar}>
                    {item.media_type}
                  </Avatar>
                  {item.name ? item.name : item.original_title}
                  <span>
                      ({moment(item.release_date || item.first_air_date).format(
                    'MMM Do YYYY',
                  )})
                    </span>
                </MenuItem>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  )
}


SearchField.propTypes = {
  classes: PropTypes.object,
  search: PropTypes.any,
  clearSearch: PropTypes.func,
  toggleSearch: PropTypes.func,
  fetchSearch: PropTypes.func
};

export default (withStyles(styles)(SearchField));
