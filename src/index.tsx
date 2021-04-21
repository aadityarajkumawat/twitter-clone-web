import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {
  createClient,
  Provider as UrqlProvider,
  defaultExchanges,
  subscriptionExchange,
} from "urql";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Button: {
      variants: {
        dark: {
          backgroundColor: "#464646",
        },
      },
    },
  },
});

const sub = new SubscriptionClient("ws://localhost:4001/graphql");

export const cli = createClient({
  url: "http://localhost:4001/graphql",
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
  <UrqlProvider value={cli}>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </UrqlProvider>,
  document.getElementById("root")
);
