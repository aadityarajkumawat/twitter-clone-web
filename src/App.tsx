import { Flex } from "@chakra-ui/layout";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import { LeftMenu } from "./components/left-menu/LeftMenu";
import { RightMenu } from "./components/right-menu/RightMenu";
import { AppContext } from "./context/AppContext";
import { HomeContext } from "./context/HomeContext";
import Routes from "./routes/Routes";

export function calc(w1: string, w2: string) {
    return `calc(${w1} - ${w2})`;
}

function App() {
    return (
        <Router>
            <Flex className="main-main">
                <AppContext>
                    <HomeContext>
                        <Flex
                            className="left"
                            justifyContent="flex-end"
                            w={calc("50%", "299px")}
                            bg="#222"
                            minWidth="70px"
                        >
                            <LeftMenu />
                        </Flex>
                        <Switch>
                            <Routes />
                        </Switch>
                        <Flex
                            className="right"
                            w={calc("50%", "299px")}
                            bg="#222"
                        >
                            <RightMenu />
                        </Flex>
                    </HomeContext>
                </AppContext>
            </Flex>
        </Router>
    );
}

export default App;
