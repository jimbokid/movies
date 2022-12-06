import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      minHeight: "100vh",
      height: "100%",
      width: "100%",
    },
    loaderContainer: {
      position: "absolute",
      left: -theme.spacing.unit,
      top: -theme.spacing.unit * 2,
      right: -theme.spacing.unit,
      bottom: 0,
      backgroundColor: "rgba(255,255,255,.5)",
      zIndex: 2,
    },
    loader: {
      position: "absolute",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      margin: "auto",
    },
    content: {
      position: "relative",
      zIndex: 1,
    },
  });

interface Props {
  children: React.ReactNode;
  classes?: {
    root: string;
    loaderContainer: string;
    loader: string;
    content: string;
  };
  isLoading: boolean;
}

export const WithLoader: React.FC<Props> = ({
  classes,
  children,
  isLoading,
}) => {
  return (
    <div className={classes?.root}>
      {isLoading && (
        <div className={`${classes?.loaderContainer} loaderContainer`}>
          <CircularProgress className={classes?.loader} />
        </div>
      )}
      <div className={classes?.content}>{children}</div>
    </div>
  );
};

export default withStyles(styles)(WithLoader);
