import React, { useEffect, useState, ChangeEvent } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Clear from "@material-ui/icons/Clear";
import moment from "moment/moment";
import Avatar from "@material-ui/core/Avatar";
import { fetchSearch } from "../actions/Search";
import { clear_state, SearchState } from "../reducers/search";
import { useAppDispatch, useAppSelector } from "../../../config/utils/hooks";

interface Props {
  classes: {
    textField: string;
    clearBtn: string;
    dropdownWrapper: string;
    dropdownInner: string;
    avatar: string;
    item: string;
    menuItem: string;
  };
  toggleSearch: () => void;
}

export const SearchField = ({ classes, toggleSearch }: Props) => {
  const [movieName, setMovieName] = useState<string>("");
  const searchResultsState = useAppSelector(
    (state) => state.search
  ) as SearchState;
  const dispatch = useAppDispatch();

  function handleChange(event: ChangeEvent<HTMLInputElement>):void {
    const value = event.target.value;
    setMovieName(value);

    dispatch(fetchSearch(value));
  }

  function closeSearchBar():void {
    toggleSearch();
    clearSearch();
  }

  function clearSearch():void {
    setMovieName("");
  }

  const searchResults = searchResultsState.data.results;

  useEffect(() => {
    return () => {
      dispatch(clear_state());
    };
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
            <Clear />
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
              <MenuItem>Detail search for &quot;{movieName}&quot;</MenuItem>
            </Link>
          )}

          {searchResults.map((item) => {
            return (
              <Link
                to={
                  item.media_type === "person"
                    ? `/persondetail/${item.id}`
                    : `/moviedetail/${item.media_type}/${item.id}`
                }
                key={item.id}
                className={classes.item}
                onClick={closeSearchBar}
              >
                <MenuItem className={classes.menuItem}>
                  <Avatar className={classes.avatar}>{item.media_type}</Avatar>
                  {item.name ? item.name : item.original_title}
                  <span>
                    (
                    {moment(item.release_date || item.first_air_date).format(
                      "MMM Do YYYY"
                    )}
                    )
                  </span>
                </MenuItem>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default withStyles(theme => ({
  textField: {
    width: "100%",
    marginTop: 0,
  },
  clearBtn: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
  },
  dropdownWrapper: {
    position: "relative",
    zIndex: 1,
  },
  dropdownInner: {
    width: "100%",
    background: "#fff",
    maxHeight: "calc(100vh - 56px)",
    overflowY: "scroll",
  },
  avatar: {
    fontSize: 12,
    marginRight: theme.spacing,
  },
  item: {
    textDecoration: "none",
  },
  menuItem: {
    height: "auto",
    paddingLeft: 2,
    paddingRight: 2,
  },
}))(SearchField);
