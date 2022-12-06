import React, {useEffect} from 'react';
import Layout from '../../../shared/Layout';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import {withStyles} from '@material-ui/core/styles';
import WithLoader from '../../../shared/WithLoader';
import Avatar from '@material-ui/core/Avatar';
import MovieList from '../../../shared/MovieList';
import TitleTextComponent from '../../../shared/TitleTextComponent';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import {fetchDetailPerson} from "../actions/PersonalDetail";
import {clear_personalDetail} from "../reducers/personalDetail";

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  bigAvatar: {
    width: 200,
    height: 200,
    margin: 'auto',
    background: '#cacaca',
  },
};

const PersonDetail = ({
                        classes,
                        match
                      }) => {
  const personalDetail = useSelector(state => state.personalDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    const {id} = match.params;
    dispatch((fetchDetailPerson(id)))
    window.scrollTo(0, 0);
    return () => {
      dispatch(clear_personalDetail())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    data,
    isLoading,
    movies
  } = personalDetail

  return (
    <Layout>
      <WithLoader isLoading={isLoading}>
        <Avatar
          alt={data.name}
          className={classes.bigAvatar}
          src={`https://image.tmdb.org/t/p/w400${data.profile_path}`}
        />
        <Typography variant="headline" gutterBottom align={'center'}>
          {data.name}
        </Typography>

        <TitleTextComponent
          title={'Birthday:'}
          text={data && moment(data.birthday).format('MMM DD YYYY')}
        />

        <TitleTextComponent
          title={'Place of birth:'}
          text={data.place_of_birth}
        />

        <TitleTextComponent title={'Biography:'} text={data.biography}/>

        <Typography variant="title" gutterBottom>
          Filmography:
        </Typography>

        {movies && (
          <MovieList data={movies} inline={true} type={'movie'} cols={2.2}/>
        )}
      </WithLoader>
    </Layout>
  );
};

PersonDetail.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  movies: PropTypes.array.isRequired,
  match: PropTypes.object,
  fetchDetailPerson: PropTypes.func,
  cleanPersonPage: PropTypes.func
};

export default withStyles(styles)(PersonDetail);
