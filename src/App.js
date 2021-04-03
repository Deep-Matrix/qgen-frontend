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
import Auth from "./components/Auth/Auth";
import CustomModal from "./components/CustomModal/CustomModal";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/modal">
            <CustomModal />
          </Route>
          <Route path="/quiz">
            <Quiz />
          </Route>
          <Route path="/auth">
            <Auth />
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
