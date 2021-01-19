import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Routes from "./routes/Routes";
import { ImageUpload } from "./testing/ImageUpload";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Routes />
          {/* <ImageUpload /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
