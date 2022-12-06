import React, { useState } from "react";
import Header from "./Header";
import { withStyles } from "@material-ui/core/styles";
import Search from "./Search/components/Search";
import { createStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      margin: -theme.spacing.unit,
      "& *": {
        boxSizing: "border-box",
      },
    },
    content: {
      flex: "1 0 auto",
    },
    contentInner: {
      maxWidth: theme.breakpoints.values.lg,
      margin: "0 auto",
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px`,
      position: "relative",
    },
    searchWrapperBox: {
      maxWidth: theme.breakpoints.values.lg,
      position: "relative",
      margin: "0 auto",
    },
    searchWrapper: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: "#fff",
      paddingTop: theme.spacing.unit,
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
    },
  });

interface Props {
  id?: string;
  children: React.ReactNode;
  classes?: {
    container: string;
    content: string;
    contentInner: string;
    searchWrapperBox: string;
    searchWrapper: string;
  };
}

export const Layout: React.FC<Props> = ({ classes, children }: Props) => {
  const [openSearch, setOpenSearch] = useState<boolean>(false);

  return (
    <div className={classes?.container}>
      <Header
        toggleSearch={() => {
          setOpenSearch(!openSearch);
        }}
      />
      {openSearch && (
        <div className={classes?.content}>
          <div className={classes?.searchWrapperBox}>
            <div className={classes?.searchWrapper}>
              <Search
                toggleSearch={() => {
                  setOpenSearch(!openSearch);
                }}
              />
            </div>
          </div>
        </div>
      )}
      <div className={classes?.content}>
        <div className={classes?.contentInner}>{children}</div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Layout);
