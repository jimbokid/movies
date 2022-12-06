import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import { createStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { PersonResultsItem, TvResultsItem } from "../reducers/searchDetail";

const styles = (theme: Theme) =>
  createStyles({
    card: {
      display: "flex",
      justifyContent: "space-between",
      margin: `0 1px ${theme.spacing.unit}px`,
    },
    details: {
      display: "flex",
      flexDirection: "column",
      width: "60%",
    },
    content: {
      flex: "1 0 auto",
    },
    item: {
      textDecoration: "none",
    },
    cover: {
      width: "40%",
      backgroundColor: grey[200],
      paddingTop: "61%",
      height: "0",
      position: "relative",
    },
  });

interface Item extends TvResultsItem, PersonResultsItem {
  data?: string;
}

interface Props {
  classes: {
    card: string;
    details: string;
    content: string;
    item: string;
    cover: string;
  };
  linkPath: string;
  imagePath: string;
  personCard: boolean;
  item: Item;
}

const CardWrapper: React.FC<Props> = ({
  classes,
  linkPath,
  imagePath,
  personCard,
  item,
}: Props) => {
  const poster = personCard ? item.profile_path : item.poster_path;

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Link to={`${linkPath}/${item.id}`} className={classes.item}>
            <Typography variant="title" gutterBottom>
              {item.name}
            </Typography>
          </Link>
          <Typography variant="body2" color="textSecondary">
            {item.date}
          </Typography>
          <Avatar>{item.voteAverage}</Avatar>
        </CardContent>
      </div>
      <CardMedia className={classes.cover} image={`${imagePath}/${poster}`} />
    </Card>
  );
};

export default withStyles(styles)(CardWrapper);
