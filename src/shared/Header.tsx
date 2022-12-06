import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Logo from "../assets/icon.png";
import { withStyles } from "@material-ui/core/styles/index";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Search from "@material-ui/icons/Search";
import { createStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
  createStyles({
    logo: {
      maxHeight: 45,
      maxWidth: 40,
      display: "inline-block",
      marginRight: 15,
    },
    toolbar: {
      justifyContent: "space-between",
    },
    content: {
      flex: "1 0 auto",
    },
    contentInner: {
      maxWidth: theme.breakpoints.values.lg,
      margin: "0 auto",
      position: "relative",
    },
  });

interface Props {
  toggleSearch: () => void;
  classes: {
    logo: string;
    toolbar: string;
    content: string;
    contentInner: string;
  };
}

export const Header = ({ classes, toggleSearch }: Props) => {
  return (
    <AppBar position="static" color="default">
      <div className={classes.content}>
        <div className={classes.contentInner}>
          <Toolbar className={classes.toolbar}>
            <Link to={`/`} aria-label="home">
              <img src={Logo} alt="" className={classes.logo} />
            </Link>

            <IconButton
              onClick={toggleSearch}
              color="primary"
              className="searchBtn"
            >
              <Search />
            </IconButton>
          </Toolbar>
        </div>
      </div>
    </AppBar>
  );
};

export default withStyles(styles)(Header);
