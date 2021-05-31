import { createClient, defaultExchanges, subscriptionExchange } from "urql";
import { subscriptionClient as sub } from "./subscription";

const API_URL = process.env.REACT_APP_API_URL;
const API_URL_FALLBACK = "https://localhost:3000";

export const client = createClient({
    url: API_URL ? API_URL : API_URL_FALLBACK,
    fetchOptions: {
        credentials: "include",
    },
    exchanges: [
        ...defaultExchanges,
        subscriptionExchange({
            forwardSubscription: (operation) => sub.request(operation),
        }),
    ],
    requestPolicy: "cache-and-network",
});
