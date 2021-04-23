import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import { HomeContext } from "./context/HomeContext";
import Routes from "./routes/Routes";

function App() {
  return (
    <Router>
      <div>
        <HomeContext>
          <Switch>
            <Routes />
          </Switch>
        </HomeContext>
      </div>
    </Router>
  );
}

export default App;
