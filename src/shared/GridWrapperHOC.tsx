import React from "react";
import { createStyles, Grid } from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import { withStyles } from "@material-ui/core/styles";

const styles = () =>
  createStyles({
    cardLayout: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      width: "100%",
    },
    gridList: {
      width: "100%",
      flexWrap: "nowrap",
      transform: "translateZ(0)",
    },
  });

interface Props {
  children: React.ReactNode;
  classes?: {
    cardLayout: string;
    gridList: string;
  };
  inline: boolean;
}
const GridWrapperHOC = ({ children, inline, classes }: Props) => {
  if (!inline) {
    return (
      <Grid container spacing={0}>
        {children}
      </Grid>
    );
  }

  return (
    <GridList
      className={classes?.gridList}
      cellHeight={"auto"}
      style={{
        margin: 0,
      }}
    >
      {children}
    </GridList>
  );
};

export default withStyles(styles)(GridWrapperHOC);
