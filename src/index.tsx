import { ChakraProvider } from "@chakra-ui/react";
import "dotenv/config";
import ReactDOM from "react-dom";
import { SubscriptionClient } from "subscriptions-transport-ws";
import {
    createClient,
    defaultExchanges,
    Provider as UrqlProvider,
    subscriptionExchange,
} from "urql";
import App from "./App";
import "./index.css";
import { theme } from "./theme";

const sub = new SubscriptionClient(
    process.env.REACT_APP_SUB_API_URL
        ? process.env.REACT_APP_SUB_API_URL
        : "ws://localhost:4001/graphql"
);

export const cli = createClient({
    url: process.env.REACT_APP_API_URL
        ? process.env.REACT_APP_API_URL
        : "http://localhost:3000",
    fetchOptions: {
        credentials: "include",
    },
    exchanges: [
        ...defaultExchanges,
        subscriptionExchange({
            forwardSubscription: (operation) => sub.request(operation),
        }),
    ],
});

ReactDOM.render(
    <ChakraProvider theme={theme}>
        <UrqlProvider value={cli}>
            <App />
        </UrqlProvider>
    </ChakraProvider>,
    document.getElementById("root")
);
