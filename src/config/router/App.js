import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import DashboardContainer from "../../routes/Dashboard/components/DashboardContainer";
import MovieDetailContainer from "../../routes/MovieDetail/components/MovieDetailContainer";
import PersonalDetailContainer from "../../routes/PersonalDetail/components/PersonalDetailContainer";
import SearchDetail from "../../routes/SearchDetail/components/SearchDetail";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={DashboardContainer}/>
        <Route
          path="/moviedetail/:type/:id"
          component={MovieDetailContainer}
        />
        <Route
          path="/persondetail/:id"
          component={PersonalDetailContainer}
        />
        <Route
          path="/searchDetail/:searchType/:id/:genreName"
          component={SearchDetail}
        />
      </Switch>
    </Router>
  );
}

export default App;
