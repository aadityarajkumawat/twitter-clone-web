import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { getContextState } from "stithi";
import "./App.css";
import Routes from "./routes/Routes";
import { contextNames } from "./stithi/callContext";

function App() {
  const LikeState = getContextState(contextNames.likeClick);
  return (
    <LikeState>
      <Router>
        <div>
          <Switch>
            <Routes />
          </Switch>
        </div>
      </Router>
    </LikeState>
  );
}

export default App;
