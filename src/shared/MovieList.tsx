import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Avatar from "@material-ui/core/Avatar";
import indigo from "@material-ui/core/colors/indigo";
import CardMedia from "@material-ui/core/CardMedia";
import CameraAlt from "@material-ui/icons/CameraAlt";
import grey from "@material-ui/core/colors/grey";
import LazyLoad from "react-lazyload";
import { IMAGE_URL } from "../config/constants/appConstants";
import GridWrapperHOC from "./GridWrapperHOC";
import GridItemHOC from "./GridItemHOC";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { createStyles } from "@material-ui/core";
import { MovieItem } from "../routes/Dashboard/reducers/dashboard";

const styles = (theme: Theme) =>
  createStyles({
    cardInner: {
      padding: `0 ${theme.spacing.unit}px`,
      display: "block",
      marginBottom: theme.spacing.unit,
      cursor: "pointer",
    },
    media: {
      height: 0,
      paddingTop: "150%",
      background: "#949494",
      position: "relative",
    },
    cardLayout: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      width: "100%",
    },
    image: {
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      margin: "auto",
    },
    gridList: {
      width: "100%",
      flexWrap: "nowrap",
      transform: "translateZ(0)",
    },
    vote: {
      position: "absolute",
      top: theme.spacing.unit,
      right: theme.spacing.unit,
      fontSize: 13,
      backgroundColor: indigo[700],
    },
    cover: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: grey[200],
    },
    icon: {
      position: "absolute",
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      margin: "auto",
    },
  });

export const generateListItem = (
  cast: boolean,
  item: MovieItem,
  type: string
) => ({
  title: cast ? item.name : item.title || item.original_name,
  image: `${IMAGE_URL}${cast ? item.profile_path : item.poster_path}`,
  subtitle: cast ? item.character : null,
  link: cast ? `/persondetail/${item.id}` : `/moviedetail/${type}/${item.id}`,
});

interface Props {
  data: Array<MovieItem>;
  inline: boolean;
  type: string;
  cast?: boolean;
  cols?: number;
  classes?: {
    cardInner: string;
    media: string;
    cardLayout: string;
    image: string;
    gridList: string;
    vote: string;
    cover: string;
    icon: string;
  };
}

const MovieList = (props: Props) => {
  const { data, classes, inline, type, cast = false } = props;

  return (
    <GridWrapperHOC inline={inline}>
      {data.map((item, key) => {
        const listItem = generateListItem(cast, item, type);

        return (
          <GridItemHOC key={key} inline={inline}>
            <LazyLoad height={300} offset={100}>
              <Link to={listItem.link} aria-label="movie detail page">
                <div className={classes?.media}>
                  {item.profile_path !== null ? (
                    <CardMedia
                      className={classes?.image}
                      image={listItem.image}
                      title={item.title}
                    />
                  ) : (
                    <CameraAlt className={`${classes?.icon} cameraAltIcon`} />
                  )}

                  {!!item.vote_average && (
                    <Avatar className={`${classes?.vote} avatarItem`}>
                      {Math.round(item.vote_average * 10) / 10}
                    </Avatar>
                  )}

                  <GridListTileBar
                    title={listItem.title}
                    subtitle={listItem.subtitle}
                  />
                </div>
              </Link>
            </LazyLoad>
          </GridItemHOC>
        );
      })}
    </GridWrapperHOC>
  );
};

export default withStyles(styles)(MovieList);
