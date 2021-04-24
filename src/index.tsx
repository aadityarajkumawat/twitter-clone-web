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
import "dotenv/config";

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
  url: process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "",
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
