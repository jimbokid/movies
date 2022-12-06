import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { createStyles } from "@material-ui/core";
import {
  GenreItem,
  Genres,
  KeywordItem,
} from "../routes/MovieDetail/reducers/movieDetail";

const styles = (theme: Theme) =>
  createStyles({
    chip: {
      marginRight: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
      height: 26,
      cursor: "pointer",
    },
    chipWrapper: {
      textDecoration: "none",
    },
  });

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
      <Typography variant="title" gutterBottom>
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

export default withStyles(styles)(GenreList);
