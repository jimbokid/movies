import React, {useState} from 'react';
import Header from './Header';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Search from "./Search/components/Search";
// import SearchField from './SearchField';

const styles = theme => ({
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    margin: -theme.spacing.unit,
    '& *': {
      boxSizing: 'border-box',
    },
  },
  content: {
    flex: '1 0 auto',

  },
  contentInner: {
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px`,
    position: 'relative',
  },
  searchWrapperBox: {
    maxWidth: theme.breakpoints.values.lg,
    position: 'relative',
    margin: '0 auto',
  },
  searchWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    background: '#fff',
    paddingTop: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
});

export const Layout = ({classes, children}) => {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <div className={classes.container}>
      <Header toggleSearch={() => {
        setOpenSearch(!openSearch)
      }}/>
      {openSearch && (
        <div className={classes.content}>
          <div className={classes.searchWrapperBox}>
            <div className={classes.searchWrapper}>
              <Search toggleSearch={() => {
                setOpenSearch(!openSearch)
              }}/>
            </div>
          </div>
        </div>
      )}
      <div className={classes.content}>
        <div className={classes.contentInner}>{children}</div>
      </div>
    </div>
  )
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

export default withStyles(styles, {name: 'Layout'})(Layout);
