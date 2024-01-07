import React, { useState } from "react";
import Header from "./Header";
import { makeStyles } from "@material-ui/core/styles";
import Search from "./Search/components/Search";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    margin: -theme.spacing,
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
    padding: `${theme.spacing(2)}px ${theme.spacing}px`,
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
    paddingTop: theme.spacing,
    paddingLeft: theme.spacing,
    paddingRight: theme.spacing,
  },
}));

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

export const Layout: React.FC<Props> = ({ children }: Props) => {
  const classes = useStyles();

  const [openSearch, setOpenSearch] = useState<boolean>(false);

  console.log(classes);

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

export default Layout;
