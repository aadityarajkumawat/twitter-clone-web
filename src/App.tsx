import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import { AppContext } from "./context/AppContext";
import { HomeContext } from "./context/HomeContext";
import Routes from "./routes/Routes";

function App() {
    return (
        <Router>
            <div>
                <AppContext>
                    <HomeContext>
                        <Switch>
                            <Routes />
                        </Switch>
                    </HomeContext>
                </AppContext>
            </div>
        </Router>
    );
}

export default App;
