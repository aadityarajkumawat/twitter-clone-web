import { SubscriptionClient } from "subscriptions-transport-ws";

const SUB_URL = process.env.REACT_APP_SUB_API_URL;
const SUB_URL_FALLBACK = "ws://localhost:4001/graphql";

export const subscriptionClient = new SubscriptionClient(
    SUB_URL ? SUB_URL : SUB_URL_FALLBACK
);
