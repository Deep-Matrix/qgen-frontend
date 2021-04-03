import React from "react";
import "./App.css";
import Main from "./components/Main/Main";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Quiz from "./components/Quiz/Quiz";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/quiz">
            <Quiz />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
