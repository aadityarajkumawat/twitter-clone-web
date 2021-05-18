import { Flex } from "@chakra-ui/layout";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import { MenuLeft } from "./components/menus/MenuLeft";
import { MenuRight } from "./components/menus/MenuRight";
import { AppContext } from "./context/AppContext";
import { HomeContext } from "./context/HomeContext";
import Routes from "./routes/Routes";

function App() {
    return (
        <Router>
            <Flex className="main-main">
                <AppContext>
                    <HomeContext>
                        <MenuLeft />
                        <Switch>
                            <Routes />
                        </Switch>
                        <MenuRight />
                    </HomeContext>
                </AppContext>
            </Flex>
        </Router>
    );
}

export default App;
