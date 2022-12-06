import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchDashboard} from "../actions/Dashboard";
import withStyles from '@material-ui/core/styles/withStyles';
import InfiniteScroll from "react-infinite-scroll-component";
import Layout from "../../../shared/Layout";
import MovieList from '../../../shared/MovieList';

const styles = () => ({
  card: {
    height: '100%',
  },
  media: {
    height: 0,
    paddingTop: '150%', // 16:9
  },
  infoWrapper: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  poster: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    margin: 'auto',
    width: '100%',
  },
});

const DashboardContainer = ({classes}) => {
  const dashboardState = useSelector(state => state.dashboard);
  const dispatch = useDispatch();
  const {
    popular,
    total_results
  } = dashboardState

  useEffect(() => {
    dispatch(fetchDashboard())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (

    <Layout>
      <div className={classes.cardLayout}>
        <InfiniteScroll
          dataLength={popular.results.length}
          next={() => {
            dispatch(fetchDashboard(false))
          }}
          hasMore={popular.results.length < total_results}
        >
          <MovieList data={popular.results} inline={false} type={'movie'} cols={4}/>
        </InfiniteScroll>
      </div>
    </Layout>
  );
};

DashboardContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DashboardContainer);
