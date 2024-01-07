import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../../shared/Layout";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import MovieList from "../../../shared/MovieList";
import moment from "moment";
import WithLoader from "../../../shared/WithLoader";
import ErrorMessage from "../../../shared/ErrorMessage";
import TitleTextComponent from "../../../shared/TitleTextComponent";
import GenreList from "../../../shared/GenreList";
import ShareBtns from "../../../shared/ShareBtns";
import { useEffect, useState } from "react";
import { fetchDetailMovie } from "../actions/MovieDetail";
import VideoWrapper from "./VideoWrapper";
import { clear_state, MovieDetailState } from "../reducers/movieDetail";
import { useAppSelector, useAppDispatch } from "../../../config/utils/hooks";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "150%",
    background: "#949494",
  },
  movieInfo: {
    background: "rgba(255,255,255,.8)",
    padding: "16px 8px",
  },
  movieTitle: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(255,255,255,0.8)",
    padding: 15,
    textAlign: "center",
  },
  chip: {
    "& > *": {
      margin: theme.spacing(0.5),
    },
    height: 26,
    cursor: "pointer",
  },
  chipWrapper: {
    textDecoration: "none",
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
  gridList: {
    width: "100%",
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  infoWrapper: {
    paddingTop: theme.spacing,
  },
  button: {
    marginTop: theme.spacing,
    marginBottom: theme.spacing,
  },
  header: {
    paddingTop: "20%",
    [theme.breakpoints.down("md")]: {
      paddingTop: "30%",
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: "40%",
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: "56.25%",
    },
  },
}));

interface StyledProps {
  backdrop_path: string;
}

export const StyledHeader = styled.div<StyledProps>`
  background: #949494 URL(https://image.tmdb.org/t/p/w1400_and_h450_face${(
    props
  ) => props.backdrop_path});
  background-size: cover;
  background-position: center center;
  margin: -32px -16px 0;
  position: relative;
`;

interface Props {
  match: {
    params: {
      id: string;
      type: string;
    };
  };
  classes?: {
    media: string;
    movieInfo: string;
    movieTitle: string;
    chip: string;
    chipWrapper: string;
    poster: string;
    gridList: string;
    infoWrapper: string;
    button: string;
    header: string;
  };
}

const MovieDetail: React.FC<Props> = ({ match }: Props) => {
  const classes = useStyles();

  const { id, type } = match.params;
  const movieDetail = useAppSelector(
    (state) => state.movieDetail
  ) as MovieDetailState;
  const dispatch = useAppDispatch();

  const [openVideo, setOpenVideo] = useState<boolean>(false);
  const [showVideoClicked, setShowVideoClicked] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      dispatch(clear_state());
    };
  }, []);

  useEffect(() => {
    dispatch(fetchDetailMovie(id, type));
    window.scrollTo(0, 0);
  }, [id]);

  function handleVideo() {
    setOpenVideo(!openVideo);
    setShowVideoClicked(true);
  }

  const { data, similar, credits, genres, isLoading, error, videos, keywords } =
    movieDetail;

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <Layout>
      <WithLoader isLoading={isLoading}>
        <div className={classes?.movieInfo}>
          <StyledHeader
            backdrop_path={data.backdrop_path}
            className={classes?.header}
          >
            <Typography className={classes?.movieTitle}>
              {data.title || data.original_name}
            </Typography>
          </StyledHeader>

          <div className={classes?.infoWrapper}>
            <ShareBtns title={data.title || data.original_name} />
            <GenreList
              dataGenres={data.genres}
              genres={genres}
              searchBy={"searchByGenre"}
              title={"Genres"}
            />
            <GenreList
              keywords={keywords}
              searchBy={"searchByKeyword"}
              title={"Keywords"}
            />

            {!!data.vote_average && (
              <TitleTextComponent
                title={"Vote average:"}
                text={String(data.vote_average)}
              />
            )}
            <TitleTextComponent
              title={"Release Date:"}
              text={
                (data.release_date &&
                  moment(data.release_date).format("MMM DD YYYY")) ||
                (data.first_air_date &&
                  moment(data.first_air_date).format("MMM DD YYYY"))
              }
            />
            <TitleTextComponent title={"Overview:"} text={data.overview} />
            <VideoWrapper
              data={videos.results}
              handleVideo={handleVideo}
              openVideo={openVideo}
              showVideoClicked={showVideoClicked}
            />
            <Typography variant="h6" gutterBottom>
              Cast:
            </Typography>
            {credits && (
              <MovieList
                data={credits.cast}
                inline={true}
                type={type}
                cast={true}
              />
            )}
            <Typography variant="h6" gutterBottom>
              You can also watch:
            </Typography>
            {similar && (
              <MovieList data={similar.results} inline={true} type={type} />
            )}
          </div>
        </div>
      </WithLoader>
    </Layout>
  );
};

export default MovieDetail;
