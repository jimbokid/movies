import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import {
  GenreItem,
  Genres,
  KeywordItem,
} from "../routes/MovieDetail/reducers/movieDetail";

interface Props {
  keywords?: Array<KeywordItem>;
  dataGenres?: Array<GenreItem>;
  genres?: {
    [id: string]: string;
  };
  classes: {
    chip: string;
    chipWrapper: string;
  };
  searchBy: string;
  title: string;
}

export const GenreList: React.FC<Props> = ({
  dataGenres,
  keywords,
  genres,
  classes,
  searchBy,
  title,
}: Props) => {
  const list = title === "Genres" ? dataGenres : keywords;
  return (
    <div className={"genreList"}>
      <Typography variant="h6" gutterBottom>
        {title}:
      </Typography>
      {list &&
        list.map((item) => {
          return (
            <Link
              key={item.id}
              to={`/SearchDetail/${searchBy}/${item.id}/${
                genres ? genres[item.id] : item.name
              }`}
              className={classes.chipWrapper}
            >
              <Chip
                label={
                  genres ? (
                    <span>{genres[item.id]}</span>
                  ) : (
                    <span>{item.name}</span>
                  )
                }
                className={classes.chip}
              />
            </Link>
          );
        })}
    </div>
  );
};

export default withStyles(theme => ({
  chip: {
    marginRight: theme.spacing,
    marginBottom: theme.spacing,
    height: 26,
    cursor: "pointer",
  },
  chipWrapper: {
    textDecoration: "none",
  },
}))(GenreList);
