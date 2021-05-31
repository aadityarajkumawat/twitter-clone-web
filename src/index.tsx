import { ChakraProvider } from "@chakra-ui/react";
import "dotenv/config";
import ReactDOM from "react-dom";
import { Provider as UrqlProvider } from "urql";
import App from "./App";
import { client } from "./configs/urqlClient";
import "./index.css";
import { theme } from "./theme";

ReactDOM.render(
    <ChakraProvider theme={theme}>
        <UrqlProvider value={client}>
            <App />
        </UrqlProvider>
    </ChakraProvider>,
    document.getElementById("root")
);
