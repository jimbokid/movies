import React from "react";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";
import CameraAlt from "@material-ui/icons/CameraAlt";
import deepOrange from "@material-ui/core/colors/deepOrange";
import { withStyles } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import GridItemHOC from "../../../shared/GridItemHOC";
import GridWrapperHOC from "../../../shared/GridWrapperHOC";
import { createStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { MovieResultsItem } from "../reducers/searchDetail";

const styles = (theme: Theme) =>
  createStyles({
    item: {
      textDecoration: "none",
      height: "100%",
    },
    card: {
      display: "flex",
      justifyContent: "space-between",
      margin: `0 1px ${theme.spacing.unit}px`,
      height: "100%",
      position: "relative",
      width: "100%",
    },
    details: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      zIndex: 1,
      flexShrink: 0,
    },
    content: {
      flex: "1 0 auto",
    },
    chip: {
      marginRight: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
      height: 26,
      cursor: "pointer",
    },
    avatar: {
      color: "#fff",
      backgroundColor: deepOrange[500],
      fontSize: 14,
    },
    cover: {
      width: "100%",
      backgroundColor: grey[200],
      height: "100%",
      position: "absolute",
      top: 0,
    },
    image: {
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      opacity: 0.1,
    },
  });

interface Props {
  classes: {
    item: string;
    card: string;
    details: string;
    content: string;
    chip: string;
    avatar: string;
    cover: string;
    image: string;
  };
  movie: {
    results: Array<MovieResultsItem>;
  };
  genres: {
    [id: string]: string;
  };
}

const MovieWrapper: React.FC<Props> = ({ movie, classes, genres }: Props) => {
  return (
    <React.Fragment>
      <Typography variant="title" gutterBottom>
        Movies
      </Typography>
      <GridWrapperHOC inline={false}>
        {movie &&
          movie.results.map((item) => {
            const date = moment(item.release_date).format("MMM Do YYYY");

            return (
              <GridItemHOC key={item.id}>
                <Link
                  to={`/moviedetail/movie/${item.id}`}
                  className={classes.item}
                  aria-label="movie detail page"
                >
                  <Card className={classes.card}>
                    <div className={classes.details}>
                      <CardContent className={classes.content}>
                        <Typography variant="title" gutterBottom>
                          {item.original_title}
                        </Typography>

                        <Typography variant="subheading" color="textSecondary">
                          {date}
                        </Typography>
                        {item.genre_ids?.map((inner: number) => {
                          const genreValue: string = genres[inner];
                          return (
                            <Chip
                              label={<span>{genreValue}</span>}
                              className={classes.chip}
                              key={`gengeId-${inner}`}
                            />
                          );
                        })}

                        <Avatar className={classes.avatar}>
                          {item.vote_average}
                        </Avatar>
                      </CardContent>
                    </div>

                    <div className={classes.cover}>
                      {item.poster_path ? (
                        <CardMedia
                          className={classes.image}
                          image={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                        />
                      ) : (
                        <CameraAlt />
                      )}
                    </div>
                  </Card>
                </Link>
              </GridItemHOC>
            );
          })}
      </GridWrapperHOC>
    </React.Fragment>
  );
};

export default withStyles(styles)(MovieWrapper);
