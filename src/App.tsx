import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Routes from "./routes/Routes";

function App() {
  return (
      <Router>
        <div>
          <Switch>
            <Routes />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
