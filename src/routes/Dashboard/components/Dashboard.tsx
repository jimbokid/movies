import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../config/utils/hooks";
import { fetchDashboard } from "../actions/Dashboard";
import withStyles from "@material-ui/core/styles/withStyles";
import { DashboardState } from "../reducers/dashboard";
import { createStyles } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import Layout from "../../../shared/Layout";
import MovieList from "../../../shared/MovieList";

const styles = () =>
  createStyles({
    card: {
      height: "100%",
    },
    media: {
      height: 0,
      paddingTop: "150%", // 16:9
    },
    infoWrapper: {
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    poster: {
      position: "absolute",
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      margin: "auto",
      width: "100%",
    },
  });

interface Props {
  classes?: {
    card: string;
    media: string;
    infoWrapper: string;
    poster: string;
  };
}

const Dashboard: React.FC<Props> = ({ classes }: Props) => {
  const dashboardState = useAppSelector(
    (state) => state.dashboard
  ) as DashboardState;
  const dispatch = useAppDispatch();
  const { popular, total_results } = dashboardState;

  useEffect(() => {
    dispatch(fetchDashboard());
  }, []);

  return (
    <Layout>
      <InfiniteScroll
        dataLength={popular.results.length}
        next={() => {
          dispatch(fetchDashboard());
        }}
        hasMore={popular.results.length < total_results}
        loader={false}
      >
        <MovieList data={popular.results} inline={false} type={"movie"} />
      </InfiniteScroll>
    </Layout>
  );
};

export default withStyles(styles)(Dashboard);
