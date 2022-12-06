import { configureStore } from "@reduxjs/toolkit";
import dashboardSlice from "../../routes/Dashboard/reducers/dashboard";
import movieDetailSlice from "../../routes/MovieDetail/reducers/movieDetail";
import personalDetail from "../../routes/PersonalDetail/reducers/personalDetail";
import searchDetail from "../../routes/SearchDetail/reducers/searchDetail";
import searchSlice from "../../shared/Search/reducers/search";

export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice,
    movieDetail: movieDetailSlice,
    personalDetail: personalDetail,
    searchDetail: searchDetail,
    search: searchSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
