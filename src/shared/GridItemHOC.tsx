import React from "react";
import {  Grid } from "@material-ui/core";
import GridListTile from "@material-ui/core/GridListTile";
import { withStyles } from "@material-ui/core/styles";

interface Props {
  children: React.ReactNode;
  classes?: {
    cardInner: string;
  };
  inline?: boolean;
}

const GridItemHOC = ({ children, classes, inline }: Props) => {
  if (!inline) {
    return (
      <Grid item xs={6} sm={4} md={3} className={classes?.cardInner}>
        {children}
      </Grid>
    );
  }
  return <GridListTile className={classes?.cardInner}>{children}</GridListTile>;
};

export default withStyles(theme => ({
  cardInner: {
    padding: `0 ${theme.spacing}px`,
    width: "20%",
    [theme.breakpoints.down("md")]: {
      width: "30%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "40%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "45%",
    },
    display: "block",
    marginBottom: theme.spacing,
    cursor: "pointer",
  },
}))(GridItemHOC);
