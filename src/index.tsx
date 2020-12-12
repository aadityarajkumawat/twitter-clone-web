import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createClient, Provider as UrqlProvider } from "urql";
import { callContext } from "./stithi/callContext";

const cli = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
});

callContext();

ReactDOM.render(
  <React.StrictMode>
    <UrqlProvider value={cli}>
      <App />
    </UrqlProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
