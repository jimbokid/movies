import React, { useEffect, useState, useMemo } from "react";
import { Layout } from "../../../shared/Layout";
import { Formik, Form } from "formik";
import { useAppDispatch, useAppSelector } from "../../../config/utils/hooks";
import {
  fetchPerson,
  fetchSuggestMovieData,
  getSuggestMovies,
} from "../actions/SuggestMovie";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import { SuggestMovieState } from "../reducers/suggestMovie";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MovieList from "../../../shared/MovieList";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import OptionsList from "./OptionsList";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  formWrapper: {
    padding: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

export type Option = {
  label: string;
  value: number;
};

export interface Values {
  genres: Array<Option>;
  cast: Array<Option>;
  popularPeople: Array<Option>;
}

const SuggestMovie = () => {
  const classes = useStyles();

  const [formValues, setFormValues] = useState<Values>({
    genres: [],
    cast: [],
    popularPeople: [],
  });
  const suggestMovieState = useAppSelector(
    (state) => state.suggestMovie
  ) as SuggestMovieState;

  const { genres, formValuesState, cast, popularPeople } = suggestMovieState;
  const dispatch = useAppDispatch();

  useEffect(() => {
    setFormValues(formValuesState);
    dispatch(fetchSuggestMovieData());
  }, []);

  const isFormEmpty = useMemo(() => {
    return (
      formValuesState.genres.length === 0 &&
      formValues.cast.length === 0 &&
      formValues.popularPeople.length === 0
    );
  }, [formValuesState]);

  return (
    <Layout>
      <div className={classes.formWrapper}>
        <Typography variant="h3" component="h3">
          Suggest Movies Search
        </Typography>

        <Formik
          enableReinitialize
          initialValues={formValues}
          onSubmit={(values: Values) => {
            setFormValues(values);
            dispatch(getSuggestMovies(values, true));
          }}
        >
          {(formik) => (
            <Form>
              <Typography variant="h6" component="h6">
                Genres:
              </Typography>

              <OptionsList options={genres} fieldName={"genres"} />

              <Typography variant="h6" component="h6">
                People
              </Typography>

              <OptionsList
                options={popularPeople}
                fieldName={"popularPeople"}
              />

              <Autocomplete
                onChange={(_, newValue) => {
                  formik.setFieldValue("cast", newValue);
                }}
                getOptionLabel={(option) => option.label}
                options={cast}
                id="cast"
                multiple
                renderInput={(
                  params: JSX.IntrinsicAttributes & TextFieldProps
                ) => (
                  <TextField
                    {...params}
                    label="People"
                    margin="dense"
                    name="cast"
                    onChange={(e) => {
                      dispatch(fetchPerson(e.target.value));
                    }}
                  />
                )}
              />

              <Button
                type="submit"
                color="primary"
                variant="outlined"
                className={classes.button}
              >
                Start Search
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      {suggestMovieState.results.length === 0 && !isFormEmpty && (
        <Alert severity="warning">
          Sorry, no result. Pls try to chain search params and try again.
        </Alert>
      )}

      <InfiniteScroll
        dataLength={suggestMovieState.results.length}
        next={() => {
          dispatch(getSuggestMovies(formValues));
        }}
        hasMore={
          suggestMovieState.results.length < suggestMovieState.total_results
        }
        loader={false}
      >
        <MovieList
          data={suggestMovieState.results}
          inline={false}
          type={"movie"}
        />
      </InfiniteScroll>
    </Layout>
  );
};

export default SuggestMovie;
