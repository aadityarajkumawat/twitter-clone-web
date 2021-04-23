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
      },
    },
  },
});

const sub = new SubscriptionClient("ws://localhost:4001/graphql");

console.log({ api: process.env.API_URL });
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
