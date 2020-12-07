import React, { useContext } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Testt from "./pages/Testt";
import Routes from "./routes/Routes";
import AuthS from "./state-container/authState/AuthS";
import { appContext } from "./state-container/lib/createNewContext";

function App() {
  const con = useContext(appContext[0].context)
  return (
    <AuthS>
      <Router>
        <div>
          <Switch>
            <Routes />
          </Switch>
          <Testt />
        </div>
      </Router>
    </AuthS>
  );
}

export default App;
