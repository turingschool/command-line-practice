import React from 'react';
import Nav from '../Nav';
import Playground from '../Playground';
import Learn from '../Learn';
import Challenges from '../Challenges';
import Welcome from '../Welcome';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Nav />
        <Switch>
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route path="/intro">
            <Learn />
          </Route>
          <Route path="/playground">
          <Playground />
          </Route>
          <Route path="/challenges">
            <Challenges />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
