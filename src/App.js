import React from "react";
import "./App.css";
import Auth from "./components/Auth/Auth";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/auth">
            <Auth />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
