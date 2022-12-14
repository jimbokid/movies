import React from 'react';
import PropTypes from 'prop-types';
import {Grid} from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import {withStyles} from "@material-ui/core/styles";

const styles = () => ({
  cardLayout: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  gridList: {
    width: '100%',
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
});

const GridWrapperHOC = props => {
  const {
    children,
    inline,
    classes
  } = props;

  if (!inline) {
    return (
      <Grid container spacing={0}>
        {children}
      </Grid>
    )
  }

  return (
    <GridList
      className={classes.gridList}
      cellHeight={'auto'}
      style={{
        margin: 0,
      }}
    >
      {children}
    </GridList>
  );
};

GridWrapperHOC.propTypes = {
  inline: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  cols: PropTypes.number
};

export default withStyles(styles)(GridWrapperHOC);
