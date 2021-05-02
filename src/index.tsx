import { ChakraProvider, extendTheme } from "@chakra-ui/react";
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

const theme = extendTheme({
  components: {
    Button: {
      variants: {
        dark: {
          backgroundColor: "#464646",
        },
        "edit-profile": {
          backgroundColor: "#585858",
          margin: "10px",
          color: "white",
          fontWeight: 400,
          fontSize: 14,
          _hover: { bg: "#464646" },
        },
      },
    },
  },
});

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
  <UrqlProvider value={cli}>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </UrqlProvider>,
  document.getElementById("root")
);
