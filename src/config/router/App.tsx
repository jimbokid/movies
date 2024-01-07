import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Dashboard from "../../routes/Dashboard/components/Dashboard";
import MovieDetailContainer from "../../routes/MovieDetail/components/MovieDetailContainer";
import PersonalDetailContainer from "../../routes/PersonalDetail/components/PersonalDetailContainer";
import SearchDetail from "../../routes/SearchDetail/components/SearchDetail";
import SuggestMovie from "../../routes/SuggestMovie/components/SuggestMovie";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/moviedetail/:type/:id" component={MovieDetailContainer} />
        <Route path="/persondetail/:id" component={PersonalDetailContainer} />
        <Route
          path="/searchDetail/:searchType/:id/:genreName"
          component={SearchDetail}
        />

        <Route
          path="/suggestMovie"
          component={SuggestMovie}
        />
      </Switch>
    </Router>
  );
}

export default App;
