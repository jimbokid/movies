import {configureStore} from '@reduxjs/toolkit';
import dashboardReducer from "../../routes/Dashboard/reducers/dashboard";
import movieDetailReducer from "../../routes/MovieDetail/reducers/movieDetail";
import personalDetail from "../../routes/PersonalDetail/reducers/personalDetail";
import searchDetail from "../../routes/SearchDetail/reducers/searchDetail";
import search from "../../shared/Search/reducers/search";
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    movieDetail: movieDetailReducer,
    personalDetail: personalDetail,
    searchDetail: searchDetail,
    search: search
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});
